export default function Summonerlayout({
  status,
  onLoading,
  onError,
  device,
  components,
  actualComponent,
  theme,
}) {
  const renders = {
    loading: onLoading,
    error: onError,
    fine: {
      desktop: <DesktopProfileLayout components={components} theme={theme} />,
    }[device.name] || (
      <MobileProfileLayout
        components={components}
        actualComponent={actualComponent}
        theme={theme}
      />
    ),
  }

  return renders[status]
}

const DesktopProfileLayout = ({
  components: { ranks, matchs, masteries, profile },
  theme,
}) => {
  const defaultHeight = "200px"
  return (
    <div className="layout">
      <div className="layout__profile">{profile}</div>
      <main>
        <div className="layout__ranks">{ranks}</div>
        <div className="layout__matchs">{matchs}</div>
        <div className="layout__masteries">{masteries}</div>
      </main>

      <style jsx>
        {`
          .layout {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          main {
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-template-areas:
              "ranks matchs"
              "masteries matchs";
            gap: 20px;
          }

          main div {
            min-height: ${defaultHeight};
          }

          .layout :global(article),
          .layout :global(header) {
            border-radius: 15px;
            padding: 10px;
            background-color: ${theme.background.secundary};
            color: ${theme.text.secundary};
          }

          .layout :global(section) {
            display: flex;
            flex-direction: column;
            gap: 5px;
            border-radius: 15px;
            padding: 10px;
            color: ${theme.text.primary};
            min-height: ${defaultHeight};
          }

          .layout__profile {
            grid-area: profile;
          }
          .layout__ranks {
            grid-area: ranks;
          }

          .layout__matchs {
            grid-area: matchs;
          }

          .layout__masteries {
            grid-area: masteries;
          }
        `}
      </style>
    </div>
  )
}

const MobileProfileLayout = ({ components, actualComponent, theme }) => {
  const { profile, navigation } = components
  return (
    <div className={"layout"}>
      <div className={"layout__headerContainer"}>
        {profile}
        {navigation}
      </div>
      <main className={"layout__children"}>{components[actualComponent]}</main>
      <style jsx>
        {`
          .layout {
            display: flex;
            flex-direction: column;
          }

          .layout__headerContainer {
            display: flex;
            flex-direction: column;
            position: sticky;
            top: 0;
            left: 0;
            z-index: 5000;
          }

          .layout__children {
            flex-grow: 1;
          }

          .layout :global(header),
          .layout :global(section) {
            color: ${theme.text.primary};
            background-color: ${theme.background.primary};
          }

          .layout :global(section) {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 5px;
          }

          .layout :global(article) {
            border-radius: 10px;
            padding: 10px;
            background-color: ${theme.background.secundary};
            color: ${theme.text.secundary};
          }
        `}
      </style>
    </div>
  )
}
