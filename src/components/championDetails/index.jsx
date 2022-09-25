import { useEffect, useRef } from "react"
import styles from "./styles.module.css"

const requiredProgressByLevel = {
  1: 1800,
  2: 6000,
  3: 12600,
  4: 21600,
}

const requiredTokensByLevel = {
  5: 2,
  6: 3,
}

export default function ChampionDetails({
  name,
  title,
  image,
  championLevel,
  chestGranted,
  championPoints,
  lastPlayTime,
  championPointsUntilNextLevel,
  tokensEarned,
}) {
  return (
    <div className={styles.championDetails}>
      <div className={styles.championDetails__bio}>
        <h2 className={styles.championDetails__bio__text}>{name}</h2>
        {/* <img
          src={`http://ddragon.leagueoflegends.com/cdn/12.15.1/img/champion/${image.full}`}
        /> */} 

        <p
          className={`${styles.championDetails__bio__text} ${styles["championDetails__bio__text--title"]}`}
        >
          {title}
        </p>
      </div>

      <table className={styles.infoTable}>
        <caption>
          <span className={styles.infoTable__caption}>
            Información de maestria
          </span>
        </caption>
        <tbody>
          <tr>
            <th className={styles.tableHeader}>Puntos de maestria</th>
            <td className={styles.tableCell}>{championPoints}</td>
          </tr>
          <tr>
            <th className={styles.tableHeader}>Nivel de maestria</th>
            <td className={styles.tableCell}>{championLevel}</td>
          </tr>
          {championLevel < 7 && (
            <tr>
              <th className={styles.tableHeader}>
                Progreso para el siguiente nivel
              </th>
              <td className={styles.tableCell}>
                {championLevel < 5 ? (
                  <>
                    <span>{championPointsUntilNextLevel} puntos faltan</span>
                    <br />
                    <progress
                      style={{ width: "100%" }}
                      value={championPoints}
                      max={requiredProgressByLevel[championLevel]}
                    />
                  </>
                ) : (
                  `${tokensEarned}/${requiredTokensByLevel[championLevel]} Tokens conseguidas`
                )}
              </td>
            </tr>
          )}
          <tr>
            <th className={styles.tableHeader}>Última vez jugado</th>
            <td className={styles.tableCell}>
              {new Date(lastPlayTime).toLocaleDateString()}
            </td>
          </tr>
          <tr>
            <th className={styles.tableHeader}>¿Caja conseguida?</th>
            <td className={styles.tableCell}>{chestGranted ? "Sí" : "No"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
