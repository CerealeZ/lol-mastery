import Head from "next/head"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import AppContext from "src/context/AppContext"
import useFetch from "src/hooks/useFetch"
import { summonerNavButtons } from "src/components/summonerDetails/buttonsList"
import SummonerPreview from "src/components/summonerPreview"
import NavBar from "src/components/navBar"

export default function SummonerProfile() {
  const { summoner_name, region } = useRouter().query
  const { language, gameVersion } = useContext(AppContext)
  const { data: summonerInfo } = useFetch(
    summoner_name && region
      ? `/api/summoner-info?name=${summoner_name}&region=${region}`
      : ""
  )
  const [Component, setComponent] = useState()
  const requeriedsToRender = [
    summoner_name,
    region,
    language,
    gameVersion,
    summonerInfo,
  ]
  const isAllLoaded = requeriedsToRender.every((state) => state)

  if (!isAllLoaded) {
    return (
      <div
      // className={styles.summonerDetails}
      >
        <Head>
          <title>{"Buscando..."}</title>
        </Head>
        <i className="fa-solid fa-hourglass"></i>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>{summoner_name} - League's Mastery</title>
      </Head>
      <div style={{ position: "sticky", top: 0, left: 0 }}>
        <SummonerPreview
          {...summonerInfo}
          gameVersion={gameVersion}
          language={language}
        />
        <NavBar
          buttons={summonerNavButtons}
          actualComponent={Component}
          setComponent={setComponent}
        />
      </div>
      {Component && (
        <Component
          summonerInfo={summonerInfo}
          gameVersion={gameVersion}
          language={language}
        />
      )}
    </div>
  )
}
