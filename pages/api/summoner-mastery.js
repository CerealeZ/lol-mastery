import axios from "axios"

const countChestsEarned = (previousChestCount, chestGranted) => {
  return previousChestCount + (chestGranted ? 1 : 0)
}

const countSummonerMasteryLevel = (previousMasteryCount, championLevel) => {
  return previousMasteryCount + championLevel
}

export default async function getSummonerMastery(req, res) {
  if (req.method !== "GET") return res.status(500)

  const { id, region } = req.query
  try {
    const { data: summonerMastery } = await axios.get(
      `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${process.env.RIOT_API}`
    )

    const masteryResume = summonerMastery.reduce(
      (prev, { championLevel, chestGranted }) => ({
        totalSummonerMastery: countSummonerMasteryLevel(
          prev.totalSummonerMastery,
          championLevel
        ),
        totalChestsEarned: countChestsEarned(
          prev.totalChestsEarned,
          chestGranted
        ),
      }),
      {
        totalSummonerMastery: 0,
        totalChestsEarned: 0,
      }
    )

    res
      .status(200)
      .json({ totalChampionsPlayed: summonerMastery.length, ...masteryResume })
  } catch (error) {
    const { response } = error
    res.status(response?.status || 500).json(error)
  }
}
