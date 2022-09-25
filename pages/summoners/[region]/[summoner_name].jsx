import { useRouter } from "next/router"
import { useEffect } from "react"

import SummonerSearcher from "src/components/summonerSearcher"
import SummonerDetails from "src/components/summonerDetails"
export default function SummonerProfile() {
  const router = useRouter()
  useEffect(() => {
    console.log(window.location.hash.substring(1))
  }, [])

  if (!router.query.region) return <></>
  return (
    <>
      <SummonerSearcher />
      <SummonerDetails
        searchQuery={{
          region: router.query.region,
          name: router.query.summoner_name,
        }}
      ></SummonerDetails>
    </>
  )
}
