import scripts from "./languages"

export default function ConfigMenu({
  setNewLanguage,
  setNewTheme,
  theme,
  language,
}) {
  const script = scripts[language]

  return (
    <form className={"form"}>
      <h2>{script.title}</h2>
      <div className={"form__box"}>
        <label>{script.languages}</label>
        <select
          className={"form__input"}
          defaultValue={language}
          onChange={(e) => setNewLanguage(e.target.value)}
        >
          <option value={"en_US"}>English</option>
          <option value={"es_MX"}>Español</option>
        </select>
        <label>{script.themes}</label>
        <select
          className={"form__input"}
          defaultValue={theme}
          onChange={(e) => setNewTheme(e.target.value)}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      <style jsx>
        {`
          .form {
            display: flex;
            flex-direction: column;
            gap: 20px;
            background-color: var(--back);
            color: var(--text);
            font-family: RobotoNormal;
          }

          .form__box {
            display: flex;
            flex-direction: column;
            background-color: var(--cardBack);
            color: var(--cardText);
            border-radius: 30px;
            padding: 20px;
            gap: 20px;
          }

          .form__input {
            align-self: start;
            border: none;
            padding: 10px;
            border-radius: 15px;
            border-width: 1px;
            border-color: transparent;
          }
        `}
      </style>
    </form>
  )
}
