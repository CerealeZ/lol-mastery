import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import SummonerDetails from "src/components/summonerDetails"
import AppContext from "src/context/AppContext"
export default function SummonerProfile() {
  const router = useRouter()
  useEffect(() => {
    console.log(window.location.hash.substring(1))
  }, [])
  const { language, gameVersion } = useContext(AppContext)
  if (!router.query.region) return <></>
  return (
    <SummonerDetails
      searchQuery={{
        region: router.query.region,
        name: router.query.summoner_name,
      }}
      language={language}
      gameVersion={gameVersion}
    />
  )
}
