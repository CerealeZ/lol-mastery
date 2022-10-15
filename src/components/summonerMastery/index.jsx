import useFetch from "src/hooks/useFetch"
import ChampionsMasteryTable from "../championsMasteryTable"
import scripts from "./languages"
import Error from "src/components/error"

export default function SummonerMastery({
  summonerInfo: { region, id },
  language,
  gameVersion,
  LoadingComponent,
}) {
  const { response, isLoading, reload } = useFetch(
    `/api/summoner-mastery?region=${region}&id=${id}`
  )
  const script = scripts[language]
  const { data: summonerMastery } = response

  return (
    <div className={"section box box--secundary"}>
      <h2>{script.title}</h2>
      {isLoading ? (
        <LoadingComponent />
      ) : response.isOkay ? (
        <>
          <div className="box box--primary">
            <p>
              {script.generalStats.playedChampions}{" "}
              {summonerMastery.championsMastery.length}
            </p>
            <p>
              {script.generalStats.totalPoints}{" "}
              {summonerMastery.totalSummonerMastery}
            </p>
            <p>
              {script.generalStats.chestsGranted}{" "}
              {summonerMastery.chestsEarned.got} /{" "}
              {summonerMastery.chestsEarned.total}
            </p>
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
    </div>
  )
}
