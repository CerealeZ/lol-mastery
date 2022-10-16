import Image from "next/image"

export default function SummonerPreview({
  name,
  profileIconId,
  summonerLevel,
  gameVersion,
}) {
  return (
    <header className="profileBlock profileBlock--header">
      <Image
        height={50}
        width={50}
        src={`https://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/profileicon/${profileIconId}.png`}
        alt={`${name}'s profile icon`}
      />
      <div className="data">
        <h1>{name}</h1>
        <span>LvL: {summonerLevel}</span>
      </div>

      <style jsx>
        {`
          .data {
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </header>
  )
}
