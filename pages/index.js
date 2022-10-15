import Head from "next/head"
import Welcome from "src/components/welcome"
import { useContext } from "react"
import AppContext from "src/context/AppContext"
import WelcomeTemplate from "src/templates/welcomeTemplate"

export default function Home() {
  const { language, devices } = useContext(AppContext)
  return (
    <>
      <Head>
        <title>{`League's Mastery - Home`}</title>
      </Head>
      <WelcomeTemplate devices={devices}>
        <Welcome language={language} />
      </WelcomeTemplate>
    </>
  )
}
