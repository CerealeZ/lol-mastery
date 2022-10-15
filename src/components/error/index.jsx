import scripts from "./languages"

export default function Error({ reload, language, status }) {
  const script = scripts[language]
  const errorScript = script.status[status] || script.status.default

  return (
    <div className={"errorCard"}>
      <div className={"errorCard__text"}>
        <h2>{`${errorScript.title} `}</h2>
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
            font-family: RobotoNormal;
            padding: 15px;
            background-color: var(--back);
          }

          .errorCard__text {
            background-color: var(--cardBack);
            color: var(--cardText);
            text-align: center;
            border-radius: 15px;
            padding: 10px;
          }

          .errorCard__btn {
            background-color: var(--btnBack);
            color: var(--btnText);
            padding: 10px;
            border-radius: 15px;
            border-width: 1px;
            border-color: transparent;
          }
        `}
      </style>
    </div>
  )
}
