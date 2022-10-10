import useFetch from "src/hooks/useFetch"
import ChampionsMasteryTable from "../championsMasteryTable"
import styles from "./styles.module.css"
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

  if (isLoading) return <LoadingComponent />

  if (!response.isOkay) {
    return (
      <Error language={language} status={response.status} reload={reload} />
    )
  }

  const { data: summonerMastery } = response
  const { masteryCounts, totalSummonerMastery, chestsEarned } = summonerMastery

  return (
    <div
      style={{
        paddingTop: "15px",
      }}
    >
      <div className={styles.masteryGeneral}>
        <h2>{script.title}</h2>
        <p>
          {script.generalStats.playedChampions}
          {summonerMastery.championsMastery.length}
        </p>
        <p>
          {script.generalStats.totalPoints} {totalSummonerMastery}
        </p>
        <p>
          {script.generalStats.chestsGranted} {chestsEarned.got} /{" "}
          {chestsEarned.total}
        </p>
      </div>
      <ChampionsMasteryTable
        language={language}
        gameVersion={gameVersion}
        championsData={summonerMastery.championsMastery}
        LoadingComponent={LoadingComponent}
      />
    </div>
  )
}
