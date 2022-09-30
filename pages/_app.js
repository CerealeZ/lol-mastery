import "../styles/normalize.css"
import "../styles/globals.css"
import "styles/fontawesome/css/all.css"
import SummonerSearcher from "src/components/summonerSearcher"
import ConfigMenu from "src/components/configMenu"
import { useContext } from "react"

import AppContext, { AppProvider } from "src/context/AppContext"

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
  // TODO: Find a better place for it
  const { language } = useContext(AppContext)
  

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
          >
            <i className="fa-solid fa-screwdriver-wrench" />
          </button>
        </div>
      </div>
      <div
        style={{
          flexGrow: 1,
        }}
      >
        {children}
        <div>
          <ConfigMenu language={language} />
        </div>
      </div>
    </div>
  )
}

export default MyApp
