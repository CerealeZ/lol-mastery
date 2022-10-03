import styles from "./styles.module.css"
import { useEffect } from "react"

export default function NavBar({ setComponent, buttons, actualComponent }) {
  useEffect(function setDefaultComponent() {
    setComponent(() => buttons[0].Component)
  }, [])

  return (
    <div className={styles.navBar}>
      {buttons.map(({ title, icon, Component }, index) => {
        return (
          <div key={index}
            title={title || "Coming soon"}
            onClick={() => setComponent(() => Component)}
            className={styles.navBar__button}
            style={{
              ...(Component === actualComponent && {
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
