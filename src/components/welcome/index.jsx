import { useRouter } from "next/router"
import scripts from "./languages"

const MY_SUMMONER_QUERY = "la1/Rolling%20Typhoon"

export default function Welcome({ getScript, theme }) {
  const router = useRouter()
  const script = getScript(scripts)
  return (
    <div className={"welcome"}>
      <div>
        <h1>{script.title}</h1>
      </div>
      <div className="desc">
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
            display: flex;
            flex-direction: column;
            gap: 20px;
            text-align: center;
            background-color: ${theme.background.primary};
            color: ${theme.text.primary};
            padding: 10px;
            border-radius: 15px;
          }
          .desc {
            background-color: ${theme.background.secundary};
            color: ${theme.text.secundary};
            padding: 10px;
            border-radius: 15px;
          }
        `}
      </style>
    </div>
  )
}
