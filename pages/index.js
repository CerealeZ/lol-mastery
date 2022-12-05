import Head from "next/head"
import Welcome from "src/components/Welcome"
import { useContext } from "react"
import AppContext from "src/context/AppContext"
import WelcomeTemplate from "src/templates/welcomeTemplate"

export default function Home() {
  const { devices, getScript, theme } = useContext(AppContext)
  return (
    <>
      <Head>
        <title>{`League's Mastery - Home`}</title>
      </Head>
      <WelcomeTemplate devices={devices}>
        <Welcome getScript={getScript} theme={theme} />
      </WelcomeTemplate>
    </>
  )
}
