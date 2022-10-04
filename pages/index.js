import Head from "next/head"
import Welcome from "src/components/welcome"
import { useContext } from "react"
import AppContext from "src/context/AppContext"

export default function Home() {
  const { language } = useContext(AppContext)
  return (
    <>
      <Head>
        <title>{`League's Mastery - Home`}</title>
      </Head>
      <Welcome language={language} />
    </>
  )
}
