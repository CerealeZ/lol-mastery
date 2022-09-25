import styles from "./styles.module.css"
import { useRouter } from "next/router"

const MY_SUMMONER_QUERY = "la1/Rolling+Typhoon"

export default function Welcome() {
  const router = useRouter()
  return (
    <div className={styles.welcome}>
      <div className={styles.welcome__title}>
        <h1>{"Welcome to League's Mastery"}</h1>
      </div>
      <div className={styles.welcome__desc}>
        <h2>{"Search a summoner's profile"}</h2>
        <p>{"Or..."}</p>
        <button onClick={()=>{
          router.push(`/summoners/${MY_SUMMONER_QUERY}`)
        }} className={styles["welcome__desc--button"]}>{"Search me!"}</button>
      </div>
    </div>
  )
}
