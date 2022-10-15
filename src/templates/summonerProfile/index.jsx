export default function SummonerProfileTemplate({
  profileViewer,
  navigation,
  error,
  loading,
  children,
  device,
  components,
}) {
  if (device.name === "desktop") {
    const { ranks, masteries, matchs } = components

    return (
      <>
        {!loading && !error ? (
          <div className="container">
            <div className="layout">
              <div className="layout__profile">{profileViewer}</div>
              <div className="layout__ranks">{ranks}</div>
              <div className="layout__matchs ">{matchs}</div>
              <div className="layout__masteries">{masteries}</div>
            </div>
            <style jsx>
              {`
                .container {
                  max-width: 1024px;
                  margin: auto;
                }
                .layout {
                  display: grid;
                  grid-template-columns: 1fr 2fr;
                  grid-template-areas:
                    "profile profile"
                    "ranks matchs"
                    "masteries masteries";
                  gap: 20px;
                  padding: 20px;

                  --defaultHeight: 400px;
                }

                .layout__profile {
                  grid-area: profile;
                }
                .layout__ranks {
                  grid-area: ranks;
                  min-height: var(--defaultHeight);
                }

                .layout__matchs {
                  grid-area: matchs;
                  min-height: var(--defaultHeight);
                }

                .layout__masteries {
                  grid-area: masteries;
                  min-height: var(--defaultHeight);
                }
              `}
            </style>
          </div>
        ) : (
          <>{loading || error}</>
        )}
      </>
    )
  }

  return (
    <div className={"profileTemplate"}>
      {loading || error}
      {!loading && !error && (
        <>
          <div className={"profileTemplate___headerContainer"}>
            {profileViewer}
            {navigation}
          </div>
          <div className={"profileTemplate__children"}>{children}</div>
        </>
      )}

      <style jsx>
        {`
          .profileTemplate {
            display: flex;
            flex-direction: column;
          }

          .profileTemplate___headerContainer {
            position: sticky;
            top: 0;
            left: 0;
          }

          .profileTemplate__children {
            flex-grow: 1;
          }
        `}
      </style>
    </div>
  )
}
