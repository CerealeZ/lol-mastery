import "../styles/normalize.css"
import "../styles/globals.css"
import "styles/fontawesome/css/all.css"

import { AppProvider } from "src/context/AppContext"

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
