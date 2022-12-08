import useFetch from "src/hooks/useFetch"
import scripts from "./languages"

export default function SummonerMastery({
  summonerInfo: { region, id },
  getScript,
  Loading,
  Error,
}) {
  const { response, isLoading, reload } = useFetch(
    `/api/summoner-mastery?region=${region}&id=${id}`
  )
  const script = getScript(scripts)
  const { data: summonerMastery } = response

  return (
    <section>
      <h2>{script.title}</h2>
      {isLoading ? (
        <Loading />
      ) : response.isOkay ? (
        <>
          <article>
            <h3>{script.generalStats.playedChampions}</h3>
            <p>{summonerMastery.totalChampionsPlayed}</p>
          </article>
          <article>
            <h3>{script.generalStats.totalPoints}</h3>
            <p>{summonerMastery.totalSummonerMastery}</p>
          </article>
          <article>
            <h3>{script.generalStats.chestsGranted}</h3>
            <p>{summonerMastery.totalChestsEarned}</p>
          </article>
        </>
      ) : (
        <Error status={response.status} reload={reload} />
      )}

      <style jsx>
        {`
          article {
            display: flex;
            align-items: baseline;
          }
          article p {
            margin-left: auto;
            font-weight: bold;
          }
        `}
      </style>
    </section>
  )
}
