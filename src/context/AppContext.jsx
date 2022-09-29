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
  const [theme, setTheme] = useState(0)
  const [language, setLanguage] = useState("")

  useEffect(() => {
    const getUserLanguage = () => {
      const prefUserLanguage = localStorage.getItem("lang") || "en_US"
      setLanguage(prefUserLanguage)
    }
    const getUserTheme = () => {
      const prefUserTheme = localStorage.getItem("theme") || 1
      setTheme(prefUserTheme)
    }

    getUserLanguage()
    getUserTheme()
  }, [])

  const setNewLanguage = (language) => {
    localStorage.setItem("lang", language)
    setLanguage(language)
  }

  const setNewTheme = (theme) => {
    localStorage.setItem("theme", theme)
    setTheme(theme)
  }

  return (
    <AppContext.Provider
      value={{
        gameVersion,
        language,
        setNewLanguage,
        setNewTheme,
        theme,
      }}
    >
      <div className={themes[`theme${theme}`]}>
        {(language || gameVersion) && children}
      </div>
    </AppContext.Provider>
  )
}

export default AppContext
