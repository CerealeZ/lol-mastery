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

const getStatus = ({ isLoading, isError }) => {
  if (isLoading) return "loading"
  if (isError) return "error"
  return "fine"
}

export default function SummonerProfile() {
  const { summoner_name, region } = useRouter().query
  const { getScript, gameVersion, device, theme } = useContext(AppContext)
  const {
    response: summonerInfo,
    isLoading,
    reload,
  } = useFetch(
    summoner_name &&
      region &&
      `/api/summoner-info?name=${summoner_name}&region=${region}`
  )
  const [actualComponent, setActualComponent] = useState("ranks")
  const basicComponentProps = {
    summonerInfo: summonerInfo.data,
    getScript,
    device,
    gameVersion,
    theme,
    Loading: () => <Loading theme={theme} />,
    Error: (props) => (
      <Error language={language} getScript={getScript} {...props}></Error>
    ),
  }

  return (
    <>
      <Head>
        <title>{`${summoner_name} - League's Mastery`}</title>
      </Head>

      <SummonerProfileTemplate
        device={device}
        theme={theme}
        onLoading={<Loading theme={theme} />}
        onError={
          <Error
            theme={theme}
            status={summonerInfo.status}
            getScript={getScript}
            reload={summonerInfo.status !== 404 && reload}
          />
        }
        status={getStatus({
          isError: !summonerInfo.isOkay,
          isLoading: isLoading,
        })}
        components={{
          profile: <SummonerPreview {...basicComponentProps} />,
          navigation: (
            <NavBar
              actualComponent={actualComponent}
              theme={theme}
              buttons={[
                {
                  title: "Rank",
                  value: "ranks",
                  icon: "fa-solid fa-ranking-star",
                },
                {
                  title: "Matchs",
                  value: "matchs",
                  icon: "fa-regular fa-file-lines",
                },
                {
                  title: "Champion Ranking",
                  value: "masteries",
                  icon: "fa-solid fa-medal",
                },
              ]}
              setComponent={setActualComponent}
            />
          ),
          ranks: <SummonerRank {...basicComponentProps} />,
          matchs: <MatchHistory {...basicComponentProps} />,
          masteries: <SummonerMastery {...basicComponentProps} />,
        }}
        actualComponent={actualComponent} // Usually for mobile
      />
    </>
  )
}
