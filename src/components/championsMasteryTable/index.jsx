import { useState, useCallback } from "react"
import styles from "./styles.module.css"
import useFetch from "src/hooks/useFetch"

export default function ChampionsMasteryTable({
  championsData,
  language,
  gameVersion,
}) {
  const [sortedBy, setSortedBy] = useState("championPoints")
  const [isAscendant, setAscendant] = useState(false)
  const { data: championsInfo } = useFetch(
    `https://ddragon.leagueoflegends.com/cdn/${gameVersion}/data/${language}/champion.json`,
    undefined,
    (patchInfo) => Object.entries(patchInfo.data) //Riot Api gives us an object with champions data, so we need to convert it into an array
  )
  const getChampionDataById = useCallback(
    (championId) => {
      if (!championsInfo) return
      const [foundChampion] = championsInfo.filter(
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
  if (!championsInfo) return <div></div>

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <caption>Champions resumen</caption>
        <thead className={styles.thead}>
          <tr>
            <th onClick={sortHandle("name")}>{"Name"}</th>
            <th onClick={sortHandle("championLevel")}>{"Mastery Level"}</th>
            <th onClick={sortHandle("championPoints")}>{"Mastery Points"}</th>
            <th onClick={sortHandle("lastPlayTime")}>{"Last Play"}</th>
            <th onClick={sortHandle("chestGranted")}>{"Chest Granted"}</th>
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
