import styles from "./styles.module.css"
import { useRouter } from "next/router"
import scripts from "./languages"

const MY_SUMMONER_QUERY = "la1/Rolling+Typhoon"

export default function Welcome({ language }) {
  const router = useRouter()
  const script = scripts[language]

  if (!script) return <></>
  return (
    <div className={styles.welcome}>
      <div className={styles.welcome__title}>
        <h1>{script.title}</h1>
      </div>
      <div className={styles.welcome__desc}>
        <h2>{script.desc}</h2>
        <p>{script.meeting[1]}</p>
        <button
          onClick={() => {
            router.push(`/summoners/${MY_SUMMONER_QUERY}`)
          }}
          className={styles["welcome__desc--button"]}
        >
          {script.meeting[2]}
        </button>
      </div>
    </div>
  )
}
