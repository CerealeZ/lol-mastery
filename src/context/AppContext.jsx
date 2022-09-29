import { createContext, useState, useEffect } from "react"
import useFetch from "src/hooks/useFetch"
import themes from "./themes.module.css"

const AppContext = createContext()

export function AppProvider({ children }) {
  const { data: gameVersion } = useFetch(
    "https://ddragon.leagueoflegends.com/api/versions.json",
    undefined,
    (versions) => versions[0]
  )
    const [themeType, setThemeType] = useState(1)

  const [language, setLanguage] = useState("")

  useEffect(function getUserLanguage() {
    const prefUserLanguage = localStorage.getItem("lang") || "en_US"
    setLanguage(prefUserLanguage)
  }, [])

  const setNewLanguage = (language) => {
    localStorage.setItem("lang", language)
    setLanguage(language)
  }

  return (
    <AppContext.Provider
      value={{
        gameVersion,
        language,
        setNewLanguage,
      }}
    >
      <div className={themes[`theme${themeType}`]}>
        {(language || gameVersion) && children}
      </div>
    </AppContext.Provider>
  )
}

export default AppContext
