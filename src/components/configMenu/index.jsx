import scripts from "./languages"
import styles from "./styles.module.css"

export default function ConfigMenu({
  setNewLanguage,
  setNewTheme,
  theme,
  language,
}) {
  const script = scripts[language]

  return (
    <form className={styles.form}>
      <h2>{script.title}</h2>
      <div className={styles.form__box}>
        <label>{script.languages}</label>
        <select
          className={styles.form__input}
          defaultValue={language}
          onChange={(e) => setNewLanguage(e.target.value)}
        >
          <option value={"en_US"}>English</option>
          <option value={"es_MX"}>Español</option>
        </select>
        <label>{script.themes}</label>
        <select
          className={styles.form__input}
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
    </form>
  )
}
