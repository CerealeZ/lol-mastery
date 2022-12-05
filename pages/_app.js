import "../styles/normalize.css"
import "../styles/globals.css"
import "styles/fontawesome/css/all.css"
import AppContext, { AppProvider } from "src/context/AppContext"
import ModalBox from "src/templates/modal"
import SummonerSearcher from "src/components/summonerSearcher"
import ConfigMenu from "src/components/configMenu"
import { useState, useContext } from "react"

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}

function Layout({ children }) {
  const {
    getScript,
    theme,
    language,
    setNewLanguage,
    setNewThemeName,
    devices,
    themeName
  } = useContext(AppContext)
  const [isSettingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className={"layout"}>
      <div className="layout__headerContainer centered">
        <div className={"header centered__child"}>
          <div className={"header__searcherContainer"}>
            <SummonerSearcher getScript={getScript} />
          </div>
          <div className="header__buttonContainer">
            <button
              className={"btn"}
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
            backgroundColor: theme.background.primary,
          }}
          onRemoveClick={() => setSettingsOpen(false)}
        >
          <ConfigMenu
            language={language}
            setNewLanguage={setNewLanguage}
            theme={theme}
            themeName={themeName}
            getScript={getScript}
            setNewThemeName={setNewThemeName}
          />
        </ModalBox>
      )}

      <style jsx>
        {`
          .layout {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background-color: ${theme.background.primary};
          }
          .layout__headerContainer {
            background-color: ${theme.background.secundary};
            padding: 10px;
          }

          .layout__children {
            flex-grow: 1;
          }

          .header {
            display: flex;
            gap: 15px;
          }

          .header__searcherContainer {
            flex-grow: 1;
          }

          @media (min-width: ${devices.desktop}px) {
            .layout {
              gap: 20px;
            }
          }
        `}
      </style>
    </div>
  )
}

export default MyApp
