import styles from "./styles.module.css"
import scripts from "./languages"

export default function Error({ reload, language, status }) {
  const script = scripts[language]
  const errorScript = script.status[status] || script.status.default

  return (
    <div className={styles.errorCard}>
      <div className={styles.errorCard__text}>
        <h2>{`${errorScript.title} `}</h2>
        <h3>{errorScript.desc}</h3>
        <h3>{`Error ${status}`}</h3>
        {reload && (
          <button className={styles.errorCard__btn} onClick={reload}>
            <i className="fa-solid fa-rotate-right" />
          </button>
        )}
      </div>
    </div>
  )
}
