import Image from "next/image"

export default function SummonerPreview({
  name,
  profileIconId,
  summonerLevel,
  gameVersion,
}) {
  return (
    <header className="summonerPreview box box--secundary">
      <Image
        height={50}
        width={50}
        src={`https://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/profileicon/${profileIconId}.png`}
        alt={`${name}'s profile icon`}
      />
      <div className="summonerPreview__data">
        <h1>{name}</h1>
        <span>LvL: {summonerLevel}</span>
      </div>
      <style jsx>
        {`
          .summonerPreview {
            display: flex;
            align-items: center;
            gap: 20px;
          }

          .summonerPreview__data {
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </header>
  )
}
