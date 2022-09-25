import Image from "next/image"
import useFetch from "src/hooks/useFetch"

export default function MatchHistory({ summonerInfo }) {
  const { data } = useFetch(
    `/api/summoner-matchs?puuid=${summonerInfo.puuid}&region=${summonerInfo.region}`
  )

  console.log(data)
  if (!data) return <div>Loading</div>
  return (
    <div>
      {data.map(({ championName, kills, deaths, assists }, index) => {
        return (
          <div key={index}>
            <Image
              width={50}
              height={50}
              src={`http://ddragon.leagueoflegends.com/cdn/12.18.1/img/champion/${championName}.png`}
              alt={championName}
            ></Image>
            <p>
              KDA: {kills} / {deaths} / {assists}
            </p>
          </div>
        )
      })}
    </div>
  )
}
