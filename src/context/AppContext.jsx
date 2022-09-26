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

  return (
    <AppContext.Provider
      value={{
        gameVersion,
        language,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
