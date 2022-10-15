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
  const { language, gameVersion, device, devices } = useContext(AppContext)
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

  const basicComponentProps = {
    summonerInfo: summonerInfo.data,
    language,
    gameVersion,
    LoadingComponent: Loading,
    device,
    devices,
  }

  return (
    <>
      <Head>
        <title>{`${summoner_name} - League's Mastery`}</title>
      </Head>

      <SummonerProfileTemplate
        device={device}
        devices={devices}
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
        loading={isLoading && <Loading />}
        error={
          !summonerInfo.isOkay && (
            <Error
              status={summonerInfo.status}
              language={language}
              reload={summonerInfo.status !== 404 && reload}
            />
          )
        }
        components={{
          ranks: <SummonerRank {...basicComponentProps} />,
          matchs: <MatchHistory {...basicComponentProps} />,
          masteries: <SummonerMastery {...basicComponentProps} />,
        }}
      >
        {renderSummonerTab(component, basicComponentProps)}
      </SummonerProfileTemplate>
    </>
  )
}
