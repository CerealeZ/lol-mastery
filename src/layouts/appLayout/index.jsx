import SummonerSearcher from "src/components/summonerSearcher"
import ConfigMenu from "src/components/configMenu"
import { useContext, useState } from "react"
import AppContext from "src/context/AppContext"
import ModalBox from "src/templates/modal"

export default function Layout({ children }) {
  const { language, theme, setNewLanguage, setNewTheme, devices } =
    useContext(AppContext)
  const [isSettingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className={"layout"}>
      <div className="layout__headerContainer">
        <div className={"layout__header"}>
          <div className={"layout__header__searcherContainer"}>
            <SummonerSearcher language={language} />
          </div>
          <div className={"layout__header__configButtonContainer"}>
            <button
              className={"layout__header__configButton"}
              type="button"
              onClick={() => setSettingsOpen((prev) => !prev)}
            >
              <i className="fa-solid fa-screwdriver-wrench" />
            </button>
          </div>
        </div>
      </div>
      <div className={"layout__children centered"}>
        <div className="centered__child">{children}</div>
      </div>
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

      <style jsx>
        {`
          .layout {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          .layout__headerContainer {
            background-color: var(--cardBack);
          }

          .layout__header {
            display: flex;
            gap: 15px;
            padding: 15px;
          }

          .layout__header__searcherContainer {
            flex-grow: 1;
          }

          .layout__header__configButtonContainer {
            display: flex;
            align-items: center;
            background-color: var(--cardBack);
          }

          .layout__header__configButton {
            background-color: var(--btnBack);
            color: var(--btnText);
            padding: 10px;
            border-radius: 15px;
            border-width: 1px;
            border-color: transparent;
            cursor: pointer;
          }

          .layout__children {
            flex-grow: 1;
            background-color: var(--back);
            // max-width: ${devices.desktop}px;
          }

          @media (min-width: ${devices.desktop}px) {
            .layout__header {
              padding: 10px;
              box-sizing: border-box;
              min-width: ${devices.desktop}px;
            }

            .layout__headerContainer {
              display: flex;
              justify-content: center;
            }

            .layout__header__configButtonContainer {
              margin-left: auto;
            }
          }
        `}
      </style>
    </div>
  )
}
