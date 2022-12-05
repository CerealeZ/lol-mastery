import Image from "next/image"
import useFetch from "src/hooks/useFetch"
import scripts from "./languages"

export default function MatchHistory({
  summonerInfo,
  gameVersion,
  getScript,
  Loading,
  Error,
}) {
  const { response, isLoading, reload } = useFetch(
    `/api/summoner-matchs?puuid=${summonerInfo.puuid}&region=${summonerInfo.region}`
  )

  const script = getScript(scripts)

  return (
    <section>
      <h2>{script.title}</h2>
      {isLoading ? (
        <Loading />
      ) : response.isOkay ? (
        response.data.map(
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
              <article key={index}>
                <div className={`match`} key={index}>
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
                    className={""}
                  >
                    <p className={"match__text"}>
                      {win ? (
                        <span
                          style={{
                            color: "#9e9eff",
                          }}
                        >
                          {script.result.win}
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "red",
                          }}
                        >
                          {script.result.loss}
                        </span>
                      )}
                    </p>
                    <p className={"match__text"}>{script.queues[queueId]}</p>
                    <p
                      className={"match__text"}
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
              </article>
            )
          }
        )
      ) : (
        <Error status={response.status} reload={reload} />
      )}
      <style jsx>
        {`
          .match {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }

          .match__text {
            text-align: center;
          }
        `}
      </style>
    </section>
  )
}
