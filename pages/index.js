import Head from "next/head"
import Welcome from "src/components/welcome"

export default function Home() {
  return (
    <>
      <Head>
        <title>{`League's Mastery - Home`}</title>
      </Head>
      <Welcome />
    </>
  )
}
