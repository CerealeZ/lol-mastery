import styles from "./styles.module.css"
import { buttons } from "./buttons.js"

export default function NavBar({ setComponent, actualComponent }) {
  return (
    <div className={styles.navBar}>
      {buttons.map(({ title, icon, value }, index) => {
        return (
          <div
            key={index}
            title={title || "Coming soon"}
            onClick={() => setComponent(value)}
            className={`${styles.navBar__button} ${
              actualComponent === value
                ? styles["navBar__button--selected"]
                : ""
            }`}
          >
            <i className={icon || "fa-solid fa-question"}></i>
          </div>
        )
      })}
    </div>
  )
}
