import SummonerSearcher from "src/components/summonerSearcher"
import ConfigMenu from "src/components/configMenu"
import { useContext, useState } from "react"
import AppContext from "src/context/AppContext"
import ModalBox from "src/templates/modal"
import styles from "./styles.module.css"

export default function Layout({ children }) {
  const { language, theme, setNewLanguage, setNewTheme } =
    useContext(AppContext)
  const [isSettingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className={styles.layout}>
      <div className={styles.layout__header}>
        <div className={styles.layout__header__searcherContainer}>
          <SummonerSearcher language={language} />
        </div>
        <div className={styles.layout__header__configButtonContainer}>
          <button
            className={styles.layout__header__configButton}
            type="button"
            onClick={() => setSettingsOpen((prev) => !prev)}
          >
            <i className="fa-solid fa-screwdriver-wrench" />
          </button>
        </div>
      </div>
      <div className={styles.layout__children}>{children}</div>
      {isSettingsOpen && (
        <ModalBox
          style={{
            backgroundColor: "var(--back)",
          }}
          onRemoveClick={() => setSettingsOpen(false)}
        >
          <ConfigMenu
            language={language}
            setNewLanguage={setNewLanguage}
            theme={theme}
            setNewTheme={setNewTheme}
          />
        </ModalBox>
      )}
    </div>
  )
}
