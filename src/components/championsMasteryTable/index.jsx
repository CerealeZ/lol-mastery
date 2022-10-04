import { useState, useCallback } from "react"
import styles from "./styles.module.css"
import useFetch from "src/hooks/useFetch"
import scripts from "./languages"

export default function ChampionsMasteryTable({
  championsData,
  language,
  gameVersion,
}) {
  const [sortedBy, setSortedBy] = useState("championPoints")
  const [isAscendant, setAscendant] = useState(false)
  const { response: championsInfo, isLoading } = useFetch(
    `https://ddragon.leagueoflegends.com/cdn/${gameVersion}/data/${language}/champion.json`,
    undefined,
    (patchInfo) => Object.entries(patchInfo.data) //Riot Api gives us an object with champions data, so we need to convert it into an array
  )
  const script = scripts[language]
  const getChampionDataById = useCallback(
    (championId) => {
      if (!championsInfo?.isOkay) return
      const [foundChampion] = championsInfo.data.filter(
        ([, championData]) => championData.key == championId
      )
      return foundChampion[1]
    },
    [championsInfo]
  )
  const sortHandle = (sortProperty) => () => {
    if (sortedBy === sortProperty) {
      setAscendant((prev) => !prev)
      return
    }
    setSortedBy(sortProperty)
    setAscendant(false)
  }
  if (isLoading) return <div>loading...</div>

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <caption>{script.caption}</caption>
        <thead className={styles.thead}>
          <tr>
            <th onClick={sortHandle("name")}>{script.name}</th>
            <th onClick={sortHandle("championLevel")}>{script.level}</th>
            <th onClick={sortHandle("championPoints")}>{script.points}</th>
            <th onClick={sortHandle("lastPlayTime")}>{script.lastPlay}</th>
            <th onClick={sortHandle("chestGranted")}>{script.chest}</th>
          </tr>
        </thead>
        <tbody>
          {championsData
            .map(function setName(championData) {
              return {
                ...championData,
                name: getChampionDataById(championData.championId).name,
              }
            })
            .sort((a, b) => {
              if (typeof a[sortedBy] === "string") {
                const getSort = (a, b) => {
                  if (a < b) return 1
                  if (a > b) return -1
                  return 0
                }
                return (
                  getSort(a[sortedBy], b[sortedBy]) * (isAscendant ? 1 : -1)
                )
              }

              return (a[sortedBy] - b[sortedBy]) * (isAscendant ? 1 : -1)
            })
            .map(
              ({
                championId,
                championLevel,
                championPoints,
                lastPlayTime,
                chestGranted,
                name,
              }) => (
                <tr key={championId} className={styles.tr}>
                  <td>{name}</td>
                  <td>{championLevel}</td>
                  <td>{championPoints}</td>
                  <td>{new Date(lastPlayTime).toLocaleDateString()}</td>
                  <td>{chestGranted ? "✔" : "❌"}</td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  )
}
