import axios from "axios"

export default async function getSummonerInfo(req, res) {
  if (req.method !== "GET") return res.status(500)
  const { name, region } = req.query
  try {
    const { data: summonerInfo } = await axios.get(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(
        name
      )}?api_key=${process.env.RIOT_API}`
    )
    res.status(200).json({
      ...summonerInfo,
      region,
    })
  } catch (error) {
    const { response } = error
    res.status(response?.status || 500).json(error)
  }
}
