import useFetch from "src/hooks/useFetch"
import styles from "./styles.module.css"

const queueTranslate = {
  ["RANKED_SOLO_5x5"]: "SoloQ 5x5",
  ["RANKED_FLEX_SR"]: "Flex 5x5",
}

export default function SummonerProfile({ summonerInfo: { region, id } }) {
  const { data } = useFetch(`/api/summoner-rank?region=${region}&id=${id}`)

  if (!data) return <div>Cargando...</div>

  return (
    <div className={styles.summonerRank}>
      <h1>Ranked Information</h1>
      {data.map(
        ({
          losses,
          wins,
          queueType,
          rank,
          tier,
          leaguePoints,
          miniSeries,
          winrate,
          miniSeriesProgress,
        }, index) => {
          return (
            <table key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                width: "100%",
              }}
              className={styles.summonerRank__table}
            >
              <caption
                style={{
                  display: "block",
                  textAlign: "left",
                  fontSize: "2rem",
                }}
              >
                {queueTranslate[queueType]}
              </caption>
              <tbody
                style={{
                  display: "table",
                }}
              >
                <tr className={styles.summonerRank__table__tr}>
                  <th
                    className={styles.summonerRank__table__th}
                    rowSpan={2}
                    scope={"rowgroup"}
                    id="ranking"
                  >
                    Ranking
                  </th>
                  <th className={styles.summonerRank__table__th} id="tier">
                    Tier
                  </th>

                  {miniSeries ? (
                    <th className={styles.summonerRank__table__th} id="series">
                      Series
                    </th>
                  ) : (
                    <th className={styles.summonerRank__table__th} id="lp">
                      LP
                    </th>
                  )}
                </tr>
                <tr className={styles.summonerRank__table__tr}>
                  <td
                    className={styles.summonerRank__table__td}
                    headers="tier"
                  >{`${tier} ${rank}`}</td>
                  {miniSeries ? (
                    <td
                      className={styles.summonerRank__table__td}
                      headers="series"
                    >
                      {miniSeriesProgress}
                    </td>
                  ) : (
                    <td className={styles.summonerRank__table__td} headers="lp">
                      {leaguePoints}
                    </td>
                  )}
                </tr>
                <tr className={styles.summonerRank__table__tr}>
                  <th
                    rowSpan={2}
                    className={styles.summonerRank__table__th}
                    scope={"rowgroup"}
                  >
                    Matchs
                  </th>
                  <th className={styles.summonerRank__table__th} id="winrate">
                    Winrate
                  </th>
                  <th className={styles.summonerRank__table__th} id="winloss">
                    Win/Loss
                  </th>
                </tr>
                <tr className={styles.summonerRank__table__tr}>
                  <td
                    className={styles.summonerRank__table__td}
                    headers="winrate"
                  >{`${winrate}%`}</td>
                  <td
                    className={styles.summonerRank__table__td}
                    headers="winloss"
                  >{`${wins}V / ${losses}L`}</td>
                </tr>
              </tbody>
            </table>
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
