import Image from "next/image"
import styles from "./styles.module.css"

export default function SummonerPreview({
  name,
  profileIconId,
  summonerLevel,
  gameVersion
}) {
  return (
    <div className={styles.summonerPreview}>
      <Image
        height={50}
        width={50}
        src={`https://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/profileicon/${profileIconId}.png`}
        alt={`${name}'s profile icon`}
      ></Image>
      <div className={styles.summonerPreview__data}>
        <span>{name}</span>
        <span>LvL: {summonerLevel}</span>
      </div>
    </div>
  
  )
}
