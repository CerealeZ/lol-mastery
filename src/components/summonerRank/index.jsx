import useFetch from "src/hooks/useFetch"
import scripts from "./languages"
import Image from "next/image"

export default function SummonerRank({
  summonerInfo: { region, id },
  getScript,
  Loading,
  Error,
}) {
  const { response, isLoading, reload } = useFetch(
    `/api/summoner-rank?region=${region}&id=${id}`
  )
  const script = getScript(scripts)

  return (
    <section>
      <h2>{script.title}</h2>
      {isLoading ? (
        <Loading />
      ) : response.isOkay ? (
        response.data.map(
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
          ) => (
            <article key={index}>
              <h3>{script[queueType]}</h3>
              <div className="queueBox__details">
                <div>
                  <Image
                    src={`/ranked_embleds/Emblem_${tier}.png`}
                    height={100}
                    width={100}
                    alt={""}
                  />
                </div>
                <div className="queueBox__textBox">
                  <div className="queueBox__titleBox">
                    <p>
                      {script.tier.tiers[tier] || tier} {rank}
                    </p>
                    <p>
                      {!miniSeriesProgress
                        ? `${leaguePoints} ${"LP"}`
                        : miniSeriesProgress}
                    </p>
                  </div>
                  <div>
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
            </article>
          )
        )
      ) : (
        <Error
          status={response.status}
          reload={response.status !== 404 && reload}
        />
      )}
      <style jsx>{`
        .queueBox__details {
          display: flex;
          gap: 10px;
        }
        .queueBox__textBox {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-grow: 1;
        }
        .queueBox__titleBox {
          grid-area: rank;
          display: flex;
          gap: 10px;
          align-items: baseline;
        }
      `}</style>
    </section>
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
