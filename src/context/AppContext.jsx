import { createContext, useState, useEffect } from "react"
import useFetch from "src/hooks/useFetch"
import getTheme from "src/context/colors"
import useLocalStorage from "src/hooks/useLocalStorage"

const AppContext = createContext()

const devices = {
  desktop: 1024,
  mobile: 600,
}

const scriptSelector = function setLanguage(language, defaultLanguage) {
  return function setScriptFile(script) {
    return script[language] || script[defaultLanguage]
  }
}

const getDeviceType = (windowWidth) => {
  const devices = [
    // Size must be descendent
    { name: "desktop", size: 1024 },
    { name: "mobile", size: 600 },
  ]
  const device =
    devices.find(({ size }) => windowWidth >= size) || devices.at(-1)
  return device
}

export function AppProvider({ children }) {
  const { response: gameVersion } = useFetch(
    "https://ddragon.leagueoflegends.com/api/versions.json",
    undefined,
    (versions) => versions[0]
  )
  const [themeName, setThemeName] = useLocalStorage("theme", "black")
  const [language, setLanguage] = useLocalStorage("lang", "en_US")
  const [device, setDevice] = useState("")

  useEffect(function getDataFromUser() {
    const getDevice = () => {
      setDevice(getDeviceType(window.innerWidth))
      window.onresize = () => setDevice(getDeviceType(window.innerWidth))
    }

    getDevice()
  }, [])

  const theme = getTheme(themeName)

  return (
    <AppContext.Provider
      value={{
        gameVersion: gameVersion?.data,
        language,
        setNewLanguage: setLanguage,
        theme,
        setNewThemeName: setThemeName,
        themeName,
        device,
        devices,
        getScript: scriptSelector(language, "en_US"),
      }}
    >
      <div>
        {gameVersion?.isOkay && children}
        <style jsx global>
          {`
            * {
              font-family: RobotoNormal;
            }
            p,
            span,
            h1,
            h2,
            h3,
            h4,
            h3 {
              margin: 0;
              padding: 0;
            }

            .centered {
              display: flex;
              align-items: center;
              flex-direction: column;
            }
            .centered__child {
              width: 100%;
              max-width: ${devices.desktop}px;
            }

            .btn {
              background-color: ${theme.button.normal.backgroundColor};
              color: ${theme.button.normal.color};
              padding: 10px;
              border-radius: 15px;
              border-width: 1px;
              border-color: transparent;
              cursor: pointer;
            }
          `}
        </style>
      </div>
    </AppContext.Provider>
  )
}

export default AppContext
