import styles from "./styles.module.css"
import { useEffect } from "react"

export const buttons = [
  {
    title: "Rank",
    value: "rank",
    icon: "fa-solid fa-ranking-star",
  },
  {
    title: "Matchs",
    value: "history",
    icon: "fa-regular fa-file-lines",
  },
  {
    title: "Champion Ranking",
    value: "mastery",
    icon: "fa-solid fa-medal",
  },
]

export default function NavBar({ setComponent, actualComponent }) {
  return (
    <div className={styles.navBar}>
      {buttons.map(({ title, icon, value }, index) => {
        return (
          <div
            key={index}
            title={title || "Coming soon"}
            onClick={() => setComponent(value)}
            className={styles.navBar__button}
            style={{
              ...(value === actualComponent && {
                backgroundColor: "var(--btnBack)",
                color: "var(--btnText)",
              }),
            }}
          >
            <i className={icon || "fa-solid fa-question"}></i>
          </div>
        )
      })}
    </div>
  )
}
