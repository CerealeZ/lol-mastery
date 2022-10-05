import axios from "axios"

const miniSeriesCase = {
  W: "✔",
  L: "❌",
  N: "•",
}

export default async function summonerRank(req, res) {
  if (req.method !== "GET") return res.status(500)
  const { region, id } = req.query
  try {
    const { data: response } = await axios.get(
      `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.RIOT_API}`
    )
    const ranks = response.map((rankInfo) => {
      const { wins, losses, miniSeries } = rankInfo
      const totalRankedMatchs = wins + losses
      const winrate = `${Math.round((wins / totalRankedMatchs) * 100)}%`
      const miniSeriesProgress =
        miniSeries &&
        miniSeries.progress
          .split("")
          .map((char) => miniSeriesCase[char])
          .join("")

      return {
        ...rankInfo,
        winrate,
        miniSeriesProgress,
      }
    })

    res.status(200).json(ranks)
  } catch (error) {
    const { response } = error
    res.status(response.status).json(error)
  }
}
