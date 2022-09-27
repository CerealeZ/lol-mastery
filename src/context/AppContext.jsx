import { createContext, useState, useEffect } from "react"
import useFetch from "src/hooks/useFetch"

const AppContext = createContext()

export function AppProvider({ children }) {
  const { data: gameVersion } = useFetch(
    "https://ddragon.leagueoflegends.com/api/versions.json",
    undefined,
    (versions) => versions[0]
  )
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
      {(language || gameVersion) && children}
    </AppContext.Provider>
  )
}

export default AppContext
