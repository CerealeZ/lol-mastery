import "../styles/normalize.css"
import "../styles/globals.css"
import "styles/fontawesome/css/all.css"
import { AppProvider } from "src/context/AppContext"
import Layout from "src/layouts/appLayout"

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}

export default MyApp
