import axios from "axios"

const regionsTranslate = {
  americas: ["la1", "la2", "na1", "br1"],
  asia: ["kr", "jp1"],
  europe: ["tr1", "ru1", "eun1", "euw1"],
  sea: ["oce1"],
}

const getRoutingName = (region) => {
  const [routingName] = Object.entries(regionsTranslate).find(
    ([, routingRegions]) => {
      return routingRegions.some((routingRegion) => routingRegion === region)
    }
  )

  return routingName
}

export default async function getSummonerMatchs(req, res) {
  if (req.method !== "GET") return res.status(500)
  const { puuid, region } = req.query
  try {
    const routingName = getRoutingName(region)
    const { data: matchsId } = await axios.get(
      `https://${routingName}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=4&api_key=${process.env.RIOT_API}`
    )
    const matchsRawInfo = await Promise.allSettled(
      matchsId.map((id) =>
        axios.get(
          `https://${routingName}.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${process.env.RIOT_API}`
        )
      )
    )

    const matchPrettyInfo = matchsRawInfo.map((response) => {
      if (response.status === "rejected") {
        const { reason } = response
        return {
          isOkay: false,
          data: {
            code: reason.code,
          },
          status: reason.status,
        }
      }
      const { value } = response
      const { info } = value.data
      const summonerScore = info.participants.find(
        (participant) => participant.puuid === puuid
      )
      const { kills, deaths, assists, championId, win, championName } =
        summonerScore
      const itemIds = Array.from(
        { length: 7 },
        (v, i) => summonerScore[`item${i}`]
      )
      return {
        isOkay: true,
        data: {
          queueId: info.queueId,
          itemIds,
          championId,
          kills,
          deaths,
          assists,
          win,
          championName,
        },
        status: value.status,
      }
    })

    res.status(200).json(matchPrettyInfo)
  } catch (error) {
    const { response } = error
    res
    .status(response?.status || 500)
    .json({ message: response?.data?.status?.message || "Failed to fetch" })
  }
}
