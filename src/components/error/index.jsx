import scripts from "./languages"

export default function Error({ reload, status, theme, getScript }) {
  const script = getScript(scripts)
  const errorScript = script.status[status] || script.status.default

  return (
    <div className={"errorCard"}>
      <div className={"errorCard__text"}>
        <h2>{errorScript.title}</h2>
        <h3>{errorScript.desc}</h3>
        <h3>{`Error ${status}`}</h3>
        {reload && (
          <button className={"btn"} onClick={reload}>
            <i className="fa-solid fa-rotate-right" />
          </button>
        )}
      </div>

      <style jsx>
        {`
          .errorCard {
            padding: 15px;
            color: ${theme.text.primary};
            background-color: ${theme.background.primary};
          }

          .errorCard__text {
            color: ${theme.text.secundary};
            background-color: ${theme.background.secundary};
            text-align: center;
            border-radius: 15px;
            padding: 10px;
          }
        `}
      </style>
    </div>
  )
}
