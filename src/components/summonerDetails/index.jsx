import styles from "./styles.module.css"
import useFetch from "src/hooks/useFetch"
import { summonerNavButtons } from "src/components/summonerDetails/buttonsList"
import SummonerPreview from "src/components/summonerPreview"
import NavBar from "src/components/navBar"
import { useState } from "react"

export default function SummonerDetails({ searchQuery: { name, region } }) {
  const { data: summonerInfo } = useFetch(
    `/api/summoner-info?name=${name}&region=${region}`
  )
  const [Component, setComponent] = useState()

  if (!summonerInfo)
    return (
      <div className={styles.summonerDetails}>
        <i className="fa-solid fa-hourglass"></i>
      </div>
    )

  if (summonerInfo.status === "error") {
    return (
      <div className={styles["summonerDetails--error"]}>
        <p className={styles["summonerDetails--error__message"]}>
          No se pudo encontrar al invocador
        </p>
      </div>
    )
  }
  return (
    <div>
      <div style={{ position: "sticky", top: 0, left: 0 }}>
        <div>{<SummonerPreview {...summonerInfo} />}</div>
        <div>
          {
            <NavBar
              buttons={summonerNavButtons}
              actualComponent={Component}
              setComponent={setComponent}
            />
          }
        </div>
      </div>
      <div>{Component && <Component summonerInfo={summonerInfo} />}</div>
    </div>
  )
}
