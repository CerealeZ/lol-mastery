import Image from "next/image"
import useFetch from "src/hooks/useFetch"
import styles from "./styles.module.css"

const queueTranslate = {
  400: "Normal Recruit",
  420: "Solo / Duo",
  430: "Blind Pick",
  440: "Flex",
  450: "ARAM",
  700: "Clash",
  1400: "Ultimate Spell Book",
}

export default function MatchHistory({ summonerInfo }) {
  const { data } = useFetch(
    `/api/summoner-matchs?puuid=${summonerInfo.puuid}&region=${summonerInfo.region}`
  )

  console.log(data)
  if (!data) return <div>Loading</div>
  return (
    <div>
      <h1
        style={{
          fontFamily: "RobotoNormal",
        }}
      >
        Match History
      </h1>
      <div>
        {data.map(
          (
            { championName, kills, deaths, assists, win, itemIds, queueId },
            index
          ) => {
            return (
              <div className={styles.match} key={index}>
                <div className={styles.match__box}>
                  <Image
                    width={100}
                    height={100}
                    src={`https://ddragon.leagueoflegends.com/cdn/12.18.1/img/champion/${championName}.png`}
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
                    {win ? "Victory" : "Defeated"}
                  </p>
                  <p className={styles.match__box__text}>
                    {queueTranslate[queueId]}
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
                          ? `https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/${id}.png`
                          : "https://ddragon.leagueoflegends.com/cdn/12.18.1/img/spell/Summoner_UltBookPlaceholder.png"
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
