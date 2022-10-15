import Image from "next/image"
import useFetch from "src/hooks/useFetch"
import scripts from "./languages"
import Error from "src/components/error"

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

  return (
    <section className="section box box--secundary">
      <h2>{script.title}</h2>
      {isLoading ? (
        <LoadingComponent />
      ) : response.isOkay ? (
        <>
          <div className={"matchList"}>
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
                  <div className={`match box--primary`} key={index}>
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
                      className={"box box--secundary"}
                    >
                      <p className={"match__box__text"}>
                        {win ? script.result.win : script.result.loss}
                      </p>
                      <p className={"match__box__text"}>
                        {script.queues[queueId]}
                      </p>
                      <p
                        className={"match__box__text"}
                      >{`${kills} / ${deaths} / ${assists}`}</p>
                    </div>
                    <div className={"match__box"}>
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
        </>
      ) : (
        <Error status={response.status} language={language} reload={reload} />
      )}

      <style jsx>
        {`
          .matchList {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }

          .match {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 10px;
            --borderRadius: 15px;
          }

          .match:first-child {
            border-top-right-radius: var(--borderRadius);
            border-top-left-radius: var(--borderRadius);
          }
          .match:last-child {
            border-bottom-right-radius: var(--borderRadius);
            border-bottom-left-radius: var(--borderRadius);
          }


          .match__box__text {
            color: var(--text);
            text-align: center;
            padding: 0;
            margin: 0;
          }
        `}
      </style>
    </section>
  )
}
