import useFetch from "src/hooks/useFetch"
import ChampionsMasteryTable from "../championsMasteryTable"
import styles from "./styles.module.css"

export default function SummonerMastery({
  summonerInfo: { region, id },
  language,
  gameVersion,
}) {
  const { data: summonerMastery } = useFetch(
    `/api/summoner-mastery?region=${region}&id=${id}`
  )

  console.log(summonerMastery)

  if (!summonerMastery) return <div>Cargando...</div>

  const { masteryCounts, totalSummonerMastery, chestsEarned } = summonerMastery

  return (
    <div style={{
      paddingTop:"15px"
    }}>
      <div className={styles.masteryGeneral}>
        <h2>General info</h2>
        <p>Campeones jugados: {summonerMastery.championsMastery.length}</p>
        <p>Puntos total de maestria: {totalSummonerMastery}</p>
        <p>
          Cofres conseguidos : {chestsEarned.got} / {chestsEarned.total}
        </p>
      </div>
      <ChampionsMasteryTable
        language={language}
        gameVersion={gameVersion}
        championsData={summonerMastery.championsMastery}
      />
    </div>
  )
}
