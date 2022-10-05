import axios from "axios"

const getNewMasteryCount = (previousMasteryCount, championLevel) => {
  const count = (previousMasteryCount[championLevel] ?? 0) + 1
  return {
    ...previousMasteryCount,
    [championLevel]: count,
  }
}

const getChestEarned = (previousChestCount, chestGranted) => {
  return {
    ...previousChestCount,
    got: previousChestCount.got + (chestGranted ? 1 : 0),
  }
}

const getTotalSummonerMastery = (previousMasteryCount, championLevel) => {
  return previousMasteryCount + championLevel
}

export default async function getSummonerMastery(req, res) {
  if (req.method !== "GET") return res.status(500)

  const { id, region } = req.query
  try {
    const { data: summonerMastery } = await axios.get(
      `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${process.env.RIOT_API}`
    )

    const masteryStuff = summonerMastery.reduce(
      (prev, { championLevel, chestGranted }) => {
        return {
          masteryCounts: getNewMasteryCount(prev.masteryCounts, championLevel),
          chestsEarned: getChestEarned(prev.chestsEarned, chestGranted),
          totalSummonerMastery: getTotalSummonerMastery(
            prev.totalSummonerMastery,
            championLevel
          ),
        }
      },
      {
        masteryCounts: {
          7: 0,
          6: 0,
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0,
        },
        totalSummonerMastery: 0,
        chestsEarned: {
          got: 0,
          total: summonerMastery.length,
        },
      }
    )

    res.status(200).json({
      championsMastery: summonerMastery,
      ...masteryStuff,
    })
  } catch (error) {
    const { response } = error
    res.status(response.status).json(error)
  }
}
