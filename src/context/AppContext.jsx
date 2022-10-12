import { createContext, useState, useEffect } from "react"
import useFetch from "src/hooks/useFetch"
import themes from "./themes.module.css"

const AppContext = createContext()

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

  useEffect(function getDataFromUser() {
    const getUserLanguage = () => {
      languageHelper("get", "en_US")
    }
    const getUserTheme = () => {
      themeHelper("get", 1)
    }
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
      }}
    >
      <div className={themes[`theme${theme}`]}>
        {gameVersion?.isOkay && children}
      </div>
    </AppContext.Provider>
  )
}

export default AppContext
