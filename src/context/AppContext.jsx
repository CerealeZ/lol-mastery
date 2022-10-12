import { createContext, useState, useEffect } from "react"
import useFetch from "src/hooks/useFetch"
import themes from "./themes.module.css"

const AppContext = createContext()

const getDeviceType = (windowWidth) => {
  const sizes = [
    // Size must be descendent
    { name: "desktop", size: 1024 },
    { name: "mobile", size: 600 },
  ]
  const { name } = sizes.find(({ size }) => windowWidth >= size) || sizes.at(-1)
  return name
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
      }}
    >
      <div className={themes[`theme${theme}`]}>
        {gameVersion?.isOkay && children}
      </div>
    </AppContext.Provider>
  )
}

export default AppContext
