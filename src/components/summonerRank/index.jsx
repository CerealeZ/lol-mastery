import useFetch from "src/hooks/useFetch"
import styles from "./styles.module.css"
import scripts from "./languages"
import Image from "next/image"

export default function SummonerRank({
  summonerInfo: { region, id },
  language,
}) {
  const { data } = useFetch(`/api/summoner-rank?region=${region}&id=${id}`)
  const script = scripts[language]

  if (!data) return <div>Loading...</div>

  return (
    <div className={styles.summonerRank}>
      <h1>{script.title}</h1>
      {data.map(
        (
          {
            losses,
            wins,
            queueType,
            rank,
            tier,
            leaguePoints,
            winrate,
            miniSeriesProgress,
          },
          index
        ) => {
          return (
            <div className={styles.summonerRank__queue} key={index}>
              <h2>{script[queueType]}</h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div>
                  <Image
                    src={`/ranked_embleds/Emblem_${tier}.png`}
                    height={150}
                    width={150}
                  />
                </div>
                <div className={styles.summonerRank__queue__info}>
                  <p>
                    {script.tier.tiers[tier] || tier} {rank}
                  </p>
                  <p>
                    {!miniSeriesProgress
                      ? `${script.points} ${leaguePoints}`
                      : miniSeriesProgress}
                  </p>
                  <p>
                    {script.winrate} {winrate}
                  </p>
                  <p>
                    {script.wins} {wins}
                  </p>
                  <p>
                    {script.losses} {losses}
                  </p>
                </div>
              </div>
            </div>
          )
        }
      )}
    </div>
  )
}

// leagueId  Player's division ID
// queueType The game mode, e.g .: RANKED_SOLO_5x5 or RANKED_FLEX_SR
// tier  Tier, like Bronze, Challenger, Diamond
// rank  I, II, III, IV
// summonerId  Player's summoner Id
// summonerName  Player's name
// leaguePoints  League Points (LP) of player
// wins  Wins of the player.
// losses  A player's losses
// veteran  The player has played more than 100 games in the division
// inactive  No longer actively plays
// freshBlood  Is new to the division
// hotStreak  Winning streak of 3 or higher
//  here are different types of miniseries. "target" indicates how many wins you need, "wins" and "losses" indicate wins and losses
// and "progress" is a short version of the games.In the example above, "progress" would be "defeat, victory, defeat, victory, not played"
// (W = victory, L = defeat, N = open)
