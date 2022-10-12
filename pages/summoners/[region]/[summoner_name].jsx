import Head from "next/head"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import AppContext from "src/context/AppContext"
import useFetch from "src/hooks/useFetch"
import SummonerPreview from "src/components/summonerPreview"
import NavBar from "src/components/navBar"

import SummonerRank from "src/components/summonerRank"
import SummonerMastery from "src/components/summonerMastery"
import MatchHistory from "src/components/matchsHistory"
import Loading from "src/components/loading"
import Error from "src/components/error"
import SummonerProfileTemplate from "src/templates/summonerProfile"

const renderSummonerTab = (type, props) => {
  const componentCase = {
    rank: SummonerRank,
    history: MatchHistory,
    mastery: SummonerMastery,
  }
  const FinalComponent = componentCase[type]
  return <FinalComponent {...props} />
}

export default function SummonerProfile() {
  const { summoner_name, region } = useRouter().query
  const { language, gameVersion } = useContext(AppContext)
  const {
    response: summonerInfo,
    isLoading,
    reload,
  } = useFetch(
    summoner_name && region
      ? `/api/summoner-info?name=${summoner_name}&region=${region}`
      : ""
  )
  const [component, setComponent] = useState("rank")
  const requeriedsToRender = [
    summoner_name,
    region,
    language,
    gameVersion,
    !isLoading,
  ]
  const isAllLoaded = requeriedsToRender.every((state) => state)
  
  if (!isAllLoaded) {
    return (
      <>
        <Head>
          <title>{`Searching ${summoner_name}`}</title>
        </Head>
        <Loading />
      </>
    )
  }

  if (!summonerInfo.isOkay) {
    return (
      <>
        <Head>
          <title>{`Error`}</title>
        </Head>
        <Error
          status={summonerInfo.status}
          language={language}
          reload={summonerInfo.status !== 404 && reload}
        />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{`${summoner_name} - League's Mastery`}</title>
      </Head>
      <SummonerProfileTemplate
        profileViewer={
          <SummonerPreview
            {...summonerInfo.data}
            gameVersion={gameVersion}
            language={language}
            LoadingComponent={<Loading />}
          />
        }
        navigation={
          <NavBar actualComponent={component} setComponent={setComponent} />
        }
      >
        {renderSummonerTab(component, {
          summonerInfo: summonerInfo.data,
          language,
          gameVersion,
          LoadingComponent: Loading,
        })}
      </SummonerProfileTemplate>
    </>
  )
}
