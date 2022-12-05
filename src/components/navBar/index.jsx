export default function NavBar({
  setComponent,
  actualComponent,
  buttons,
  theme,
}) {
  return (
    <div className={"navBar"}>
      {buttons.map(({ title, icon, value }, index) => {
        return (
          <div
            key={index}
            title={title || "Coming soon"}
            onClick={() => setComponent(value)}
            className={`${"navBar__button"} ${
              actualComponent === value ? "navBar__button--selected" : ""
            }`}
          >
            <i className={icon || "fa-solid fa-question"}></i>
          </div>
        )
      })}

      <style jsx>
        {`
          .navBar {
            display: flex;
            overflow: auto;
            height: 50px;
            background-color: ${theme.background.secundary};
            color: ${theme.text.secundary};
          }

          .navBar__button {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: none;
            width: 22%;
          }

          .navBar__button--selected {
            background-color: ${theme.button.normal.backgroundColor};
            color: ${theme.button.normal.color};
          }
        `}
      </style>
    </div>
  )
}
