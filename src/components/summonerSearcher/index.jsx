import { useState } from "react"
import { useRouter } from "next/router"
import { regions } from "./regions.js"
import styles from "./styles.module.css"
import scripts from "./languajes"

const handleInputValue = (setter) => (event) => {
  const { name, value } = event.target
  setter((prev) => {
    const newValue = {
      ...prev,
      [name]: value,
    }
    return newValue
  })
}

export default function SummonerSearcher({ language }) {
  const router = useRouter()
  const [query, setQuery] = useState({
    name: "",
    region: "la1", // TODO: Change it dinamyc
  })
  const [hasError, setError] = useState(false)
  const script = scripts[language]
  const handleQuery = handleInputValue(setQuery)

  const searchUser = async () => {
    const { name, region } = query
    if (!name.trim() || !region.trim()) {
      setError(true)
      return
    }
    router.push(`/summoners/${region}/${encodeURIComponent(name)}`)
    setError(false)
  }

  return (
    <form
      className={styles.searchBox}
      onSubmit={(e) => {
        e.preventDefault()
        searchUser()
      }}
    >
      <input
        type={"text"}
        value={query.name}
        name="name"
        placeholder={script.placeholder}
        className={`${styles.searchBox__input} ${
          styles["searchBox__input--name"]
        } ${hasError ? styles["searchBox__input--error"] : ""}`}
        onInput={handleQuery}
        required
      />
      <select
        id={"region"}
        name="region"
        className={`${styles.searchBox__input} ${styles["searchBox__input--select"]}`}
        value={query.region}
        onInput={handleQuery}
      >
        {regions.map(({ value, name }, index) => (
          <option key={index} value={value}>
            {name}
          </option>
        ))}
      </select>

      <button
        className={`${styles.searchBox__input} ${styles["searchBox__input--button"]}`}
        type="submit"
      >
        <i className="fa-solid fa-magnifying-glass" />
      </button>
    </form>
  )
}
