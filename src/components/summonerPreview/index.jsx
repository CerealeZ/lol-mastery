import Image from "next/image"

export default function SummonerPreview({
  summonerInfo: { name, profileIconId, summonerLevel },
  gameVersion,
}) {
  return (
    <header>
      <Image
        height={50}
        width={50}
        src={`https://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/profileicon/${profileIconId}.png`}
        alt={`${name}'s profile icon`}
      />
      <div className="data">
        <h1>{name}</h1>
        <p>LvL: {summonerLevel}</p>
      </div>
      <style jsx>
        {`
          header {
            display: flex;
            gap: 15px;
          }
        `}
      </style>
    </header>
  )
}
