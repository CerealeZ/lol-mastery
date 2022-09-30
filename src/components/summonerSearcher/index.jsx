import { useState } from "react"
import { useRouter } from "next/router"
import styles from "./styles.module.css"

const handleInput =
  (setter) =>
  ({ target: { name: property, value } }) => {
    setter((prev) => ({ ...prev, [property]: value }))
  }

const preventDefault = (fn) => (e) => {
  e.preventDefault()
  return fn(e)
}
export default function SummonerSearcher() {
  const router = useRouter()
  const [query, setQuery] = useState({
    name: "",
    region: "la1", // TODO: Change it dinamyc
  })
  const [hasError, setError] = useState(false)

  const searchUser = async ({ name, region }) => {
    // TODO: do a form checker
    if (!name.trim()) {
      setError(true)
      return
    } else {
      setError(false)
    }
    router.push(`/summoners/${region}/${encodeURIComponent(name)}`)
  }
  return (
    <form
      className={styles.searchBox}
      onSubmit={preventDefault(() => searchUser(query))}
    >
      <input
        type={"text"}
        value={query.name}
        name="name"
        placeholder="Summoner's name"
        className={`${styles.searchBox__input} ${
          styles["searchBox__input--name"]
        } ${hasError ? styles["searchBox__input--error"] : ""}`}
        onInput={handleInput(setQuery)}
        required
      />
      <select
        id={"region"}
        name="region"
        className={`${styles.searchBox__input} ${styles["searchBox__input--select"]}`}
        value={query.region}
        onChange={handleInput(setQuery)}
      >
        <option value={"la1"}>LAN</option>
        <option value={"na1"}>NA</option>
        <option value={"br1"}>BR</option>
        <option value={"eun1"}>EUNE</option>
        <option value={"euw1"}>EUW</option>
        <option value={"la2"}>LAS</option>
        <option value={"oc1"}>OCE</option>
        <option value={"ru1"}>RU</option>
        <option value={"tr1"}>TR</option>
        <option value={"jp1"}>JP</option>
        <option value={"kr"}>KR</option>
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
