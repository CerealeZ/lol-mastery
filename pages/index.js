import Head from "next/head"
import Welcome from "src/components/Welcome"
import { useContext } from "react"
import AppContext from "src/context/AppContext"
import WelcomeLayout from "src/layouts/welcome"

export default function Home() {
  const { devices, getScript, theme } = useContext(AppContext)
  return (
    <>
      <Head>
        <title>{`League's Mastery - Home`}</title>
      </Head>
      <WelcomeLayout devices={devices}>
        <Welcome getScript={getScript} theme={theme} />
      </WelcomeLayout>
    </>
  )
}

const pepito = [2,34].reduce(prev => prev)