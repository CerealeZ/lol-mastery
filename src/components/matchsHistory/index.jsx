import Image from "next/image"
import useFetch from "src/hooks/useFetch"
import styles from "./styles.module.css"
import scripts from "./languages"
import Error from "src/components/error"

const queueTranslate = {
  400: "Normal Recruit",
  420: "Solo / Duo",
  430: "Blind Pick",
  440: "Flex",
  450: "ARAM",
  700: "Clash",
  1400: "Ultimate Spell Book",
}

export default function MatchHistory({
  summonerInfo,
  gameVersion,
  language,
  LoadingComponent,
}) {
  const { response, isLoading, reload } = useFetch(
    `/api/summoner-matchs?puuid=${summonerInfo.puuid}&region=${summonerInfo.region}`
  )

  const script = scripts[language]

  if (isLoading) return <LoadingComponent />

  if (!response.isOkay) {
    return (
      <Error status={response.status} language={language} reload={reload} />
    )
  }

  return (
    <div className={styles.history}>
      <h1>{script.title}</h1>
      <div className={styles.matchList}>
        {response.data.map(
          (
            {
              isOkay,
              data: {
                championName,
                kills,
                deaths,
                assists,
                win,
                itemIds,
                queueId,
              },
            },
            index
          ) => {
            if (!isOkay) {
              return (
                // TODO: Do a better error component
                <div key={index}>
                  <p>Not data found, maybe too many requests</p>
                </div>
              )
            }

            return (
              <div className={styles.match} key={index}>
                <div>
                  <Image
                    width={100}
                    height={100}
                    src={`https://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/champion/${championName}.png`}
                    alt={championName}
                  ></Image>
                </div>
                <div
                  style={{
                    minWidth: "5rem",
                  }}
                  className={styles.match__box}
                >
                  <p className={styles.match__box__text}>
                    {win ? script.result.win : script.result.loss}
                  </p>
                  <p className={styles.match__box__text}>
                    {script.queues[queueId]}
                  </p>
                  <p
                    className={styles.match__box__text}
                  >{`${kills} / ${deaths} / ${assists}`}</p>
                </div>
                <div className={styles.match__box}>
                  {itemIds.map((id, index) => (
                    <Image
                      key={index}
                      src={
                        id
                          ? `https://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/item/${id}.png`
                          : `https://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/spell/Summoner_UltBookPlaceholder.png`
                      }
                      alt={""}
                      height={35}
                      width={35}
                    />
                  ))}
                </div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}
