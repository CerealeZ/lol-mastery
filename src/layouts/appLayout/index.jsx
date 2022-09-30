import SummonerSearcher from "src/components/summonerSearcher"
import ConfigMenu from "src/components/configMenu"
import { useContext, useState } from "react"
import AppContext from "src/context/AppContext"

export default function Layout({ children }) {
  const { language, theme, setNewLanguage, setNewTheme } =
    useContext(AppContext)
  const [isSettingsOpen, setSettingsOpen] = useState(false)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "15px",
          padding: "15px",
          backgroundColor: "var(--cardBack)",
        }}
      >
        <div
          style={{
            flexGrow: 1,
          }}
        >
          <SummonerSearcher />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "var(--cardBack)",
          }}
        >
          <button
            style={{
              backgroundColor: "var(--btnBack)",
              color: "var(--btnText)",
              padding: "10px",
              borderRadius: "15px",
              borderWidth: "1px",
              borderColor: "transparent",
              // backgroundColor: "#fffffe",
            }}
            type="button"
            onClick={() => setSettingsOpen((prev) => !prev)}
          >
            <i className="fa-solid fa-screwdriver-wrench" />
          </button>
        </div>
      </div>
      <div
        style={{
          flexGrow: 1,
          backgroundColor: "var(--back)",
        }}
      >
        {children}
        <div>
          {isSettingsOpen && (
            <ConfigMenu
              language={language}
              setNewLanguage={setNewLanguage}
              theme={theme}
              setNewTheme={setNewTheme}
            />
          )}
        </div>
      </div>
    </div>
  )
}
