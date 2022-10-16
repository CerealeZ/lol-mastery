import useFetch from "src/hooks/useFetch"
import ChampionsMasteryTable from "../championsMasteryTable"
import scripts from "./languages"
import Error from "src/components/error"

export default function SummonerMastery({
  summonerInfo: { region, id },
  language,
  gameVersion,
  LoadingComponent,
  device,
}) {
  const { response, isLoading, reload } = useFetch(
    `/api/summoner-mastery?region=${region}&id=${id}`
  )
  const script = scripts[language]
  const { data: summonerMastery } = response

  return (
    <div className={"profileBlock profileBlock--section"}>
      <h2>{script.title}</h2>
      {isLoading ? (
        <LoadingComponent />
      ) : response.isOkay ? (
        <>
          <div className={`stats`}>
            <StatCard>
              <p>{script.generalStats.playedChampions}</p>
              <p>{summonerMastery.championsMastery.length}</p>
            </StatCard>
            <StatCard>
              <p>{script.generalStats.totalPoints}</p>
              <p>{summonerMastery.totalSummonerMastery}</p>
            </StatCard>
            <StatCard>
              <p>{script.generalStats.chestsGranted}</p>
              <p>
                {summonerMastery.chestsEarned.got}/
                {summonerMastery.chestsEarned.total}
              </p>
            </StatCard>
          </div>
          <ChampionsMasteryTable
            language={language}
            gameVersion={gameVersion}
            championsData={summonerMastery.championsMastery}
            LoadingComponent={LoadingComponent}
          />
        </>
      ) : (
        <Error language={language} status={response.status} reload={reload} />
      )}

      <style jsx>
        {`
          .stats {
            display: flex;
            justify-content: center;
            gap: 15px;
            text-align: center;
          }
        `}
      </style>
    </div>
  )
}

const StatCard = ({ children }) => {
  return <div className="profileBlock__child">{children}</div>
}
