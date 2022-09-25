import SummonerRank from "../summonerRank"
import SummonerMastery from "../summonerMastery"
import MatchHistory from "../matchsHistory"

export const summonerNavButtons = [
  {
    title: "Profile",
    icon: "fa-solid fa-ranking-star",
    Component: SummonerRank,
  },
  {
    title: "Matchs",
    icon: "fa-regular fa-file-lines",
    Component: MatchHistory,
  },
  {
    title: "Champion Ranking",
    icon: "fa-solid fa-medal",
    Component: SummonerMastery,
  },
]
