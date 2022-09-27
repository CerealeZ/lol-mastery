import styles from "./styles.module.css"
import { useRouter } from "next/router"
import { useContext } from "react"
import AppContext from "src/context/AppContext"
import scripts from "./languages"

const MY_SUMMONER_QUERY = "la1/Rolling+Typhoon"

export default function Welcome() {
  const router = useRouter()
  const { language } = useContext(AppContext)
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
