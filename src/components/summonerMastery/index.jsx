import useFetch from "src/hooks/useFetch"
import ChampionsMasteryTable from "../championsMasteryTable"

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
    <div>
      <table>
        <caption>{"General Summary"}</caption>
        <tbody>
          <tr>
            <th rowSpan={2}>{"Mastery Levels"}</th>
            <th>7</th>
            <th>6</th>
            <th>5</th>
            <th>4</th>
            <th>3</th>
            <th>2</th>
            <th>1</th>
            <th>Total</th>
          </tr>
          <tr>
            <td>{masteryCounts[7]}</td>
            <td>{masteryCounts[6]}</td>
            <td>{masteryCounts[5]}</td>
            <td>{masteryCounts[4]}</td>
            <td>{masteryCounts[3]}</td>
            <td>{masteryCounts[2]}</td>
            <td>{masteryCounts[1]}</td>
            <td>{totalSummonerMastery}</td>
          </tr>
          <tr>
            <th rowSpan={2}>Chest reclamed</th>
            <th colSpan={4}>Earned</th>
            <th colSpan={4}>Total</th>
          </tr>

          <tr>
            <td colSpan={4}>{chestsEarned.got}</td>
            <td colSpan={4}>{chestsEarned.total}</td>
          </tr>
        </tbody>
      </table>
      <ChampionsMasteryTable
        language={language}
        gameVersion={gameVersion}
        championsData={summonerMastery.championsMastery}
      />
    </div>
  )
}
