import Head from "next/head"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import SummonerDetails from "src/components/summonerDetails"
import AppContext from "src/context/AppContext"
export default function SummonerProfile() {
  const router = useRouter()

  const { language, gameVersion } = useContext(AppContext)
  if (!router.query.region) return <></>
  return (
    <>
      <Head>
        <title>{`${router.query.summoner_name} - League's Mastery`}</title>
      </Head>
      <SummonerDetails
        searchQuery={{
          region: router.query.region,
          name: router.query.summoner_name,
        }}
        language={language}
        gameVersion={gameVersion}
      />
    </>
  )
}
