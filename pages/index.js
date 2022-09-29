import ConfigMenu from "src/components/configMenu"
import SummonerSearcher from "src/components/summonerSearcher"
import Welcome from "src/components/welcome"
import AppContext from "src/context/AppContext"
import { useContext } from "react"

export default function Home() {
  const { language, setNewLanguage, setNewTheme, theme } =
    useContext(AppContext)

  return (
    <>
      <SummonerSearcher />
      <Welcome />
      <ConfigMenu
        setNewLanguage={setNewLanguage}
        theme={theme}
        setNewTheme={setNewTheme}
        language={language}
      />
    </>
  )
}
