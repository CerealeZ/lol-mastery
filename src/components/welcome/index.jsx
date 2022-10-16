import { useRouter } from "next/router"
import scripts from "./languages"

const MY_SUMMONER_QUERY = "la1/Rolling+Typhoon"

export default function Welcome({ language }) {
  const router = useRouter()
  const script = scripts[language]

  if (!script) return <></>
  return (
    <div className={"welcome"}>
      <div className={"box box--primary"}>
        <h1>{script.title}</h1>
      </div>
      <div className={"box box--secundary"}>
        <h2>{script.desc}</h2>
        <p>{script.meeting[1]}</p>
        <button
          onClick={() => {
            router.push(`/summoners/${MY_SUMMONER_QUERY}`)
          }}
          className={"btn"}
        >
          {script.meeting[2]}
        </button>
      </div>

      <style jsx>
        {`
          .welcome {
            text-align: center;
          }
        `}
      </style>
    </div>
  )
}
