import { createContext, useState, useEffect } from "react"
import useFetch from "src/hooks/useFetch"
import themes from "./themes.module.css"

const AppContext = createContext()

const devices = {
  desktop: 1024,
  mobile: 600,
}

const getDeviceType = (windowWidth) => {
  const devices = [
    // Size must be descendent
    { name: "desktop", size: 1024 },
    { name: "mobile", size: 600 },
  ]
  const device =
    devices.find(({ size }) => windowWidth >= size) || devices.at(-1)
  return device
}

const localStoreHelper = (key, setter) => (method, newValue) => {
  const methodCase = {
    get: () => {
      const value = localStorage.getItem(key)
      setter(value || newValue)
    },
    set: () => {
      localStorage.setItem(key, newValue)
      setter(newValue)
    },
  }
  methodCase[method]()
}

export function AppProvider({ children }) {
  const { response: gameVersion } = useFetch(
    "https://ddragon.leagueoflegends.com/api/versions.json",
    undefined,
    (versions) => versions[0]
  )
  const [theme, setTheme] = useState(0)
  const themeHelper = localStoreHelper("theme", setTheme)

  const [language, setLanguage] = useState("")
  const languageHelper = localStoreHelper("lang", setLanguage)

  const [device, setDevice] = useState("")

  useEffect(function getDataFromUser() {
    const getUserLanguage = () => {
      languageHelper("get", "en_US")
    }
    const getUserTheme = () => {
      themeHelper("get", 1)
    }
    const getDevice = () => {
      setDevice(getDeviceType(window.innerWidth))
      window.onresize = () => setDevice(getDeviceType(window.innerWidth))
    }

    getDevice()
    getUserLanguage()
    getUserTheme()
  }, [])

  const setNewLanguage = (language) => {
    languageHelper("set", language)
  }
  const setNewTheme = (theme) => {
    themeHelper("set", theme)
  }

  return (
    <AppContext.Provider
      value={{
        gameVersion: gameVersion?.data,
        language,
        setNewLanguage,
        setNewTheme,
        theme,
        device,
        devices,
      }}
    >
      <div className={themes[`theme${theme}`]}>
        {gameVersion?.isOkay && children}
        <style jsx global>
          {`
            p,
            span,
            h1,
            h2,
            h3,
            h4,
            h3 {
              margin: 0;
              padding: 0;
              font-family: RobotoNormal;
            }

            .box {
              padding: 10px;
              border-radius: 15px;
            }

            .profileBlock {
              display: flex;
              background-color: var(--back);
              color: var(--text);
            }

            .profileBlock--section {
              flex-direction: column;
              padding: 5px;
              gap: 5px;
            }

            .profileBlock--header {
              flex-direction: row;
              gap: 10px;
            }

            .profileBlock__child {
              padding: 10px;
              background-color: var(--cardBack);
              color: var(--cardText);
              border-radius: 15px;
            }

            .profileBlock__child--contracted {
              align-self: start;
            }

            .centered {
              display: flex;
              align-items: center;
              flex-direction: column;
            }
            .centered__child {
              width: 100%;
              max-width: ${devices.desktop}px;
            }

            .btn {
              background-color: var(--btnBack);
              color: var(--btnText);
              padding: 10px;
              border-radius: 15px;
              border-width: 1px;
              border-color: transparent;
              cursor: pointer;
            }

            @media (min-width: ${devices.desktop}px) {
              .profileBlock {
                border-radius: 15px;
                padding: 10px;
              }
              .profileBlock--section {
                gap: 10px;
                background-color: var(--cardBack);
                color: var(--cardText);
              }

              .profileBlock--header {
                background-color: var(--cardBack);
                color: var(--cardText);
                gap: 10px;
              }

              .profileBlock__child {
                background-color: var(--back);
                color: var(--text);
              }
            }
          `}
        </style>
      </div>
    </AppContext.Provider>
  )
}

export default AppContext
