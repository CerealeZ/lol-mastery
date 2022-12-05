import scripts from "./languages"

export default function ConfigMenu({
  setNewLanguage,
  setNewThemeName,
  theme,
  themeName,
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
          defaultValue={themeName}
          onChange={(e) => setNewThemeName(e.target.value)}
        >
          <option value={"black"}>Night</option>
          <option value={"white"}>Day</option>
        </select>
      </div>

      <style jsx>
        {`
          .form {
            display: flex;
            flex-direction: column;
            gap: 20px;
            background-color: ${theme.background.primary};
            color: ${theme.text.primary};
          }

          .form__box {
            display: flex;
            flex-direction: column;
            background-color: ${theme.background.secundary});
            color: ${theme.text.secundary};
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
