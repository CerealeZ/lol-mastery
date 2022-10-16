import { useState } from "react"
import { useRouter } from "next/router"
import { regions } from "./regions.js"
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
      className={"searchBox"}
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
        className={`searchBox__input searchBox__input--name ${
          hasError ? "searchBox__input--error" : ""
        }`}
        onInput={handleQuery}
        required
      />
      <select
        id={"region"}
        name="region"
        className={`searchBox__input searchBox__input--select`}
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
        className={`searchBox__input searchBox__input--button`}
        type="submit"
      >
        <i className="fa-solid fa-magnifying-glass" />
      </button>

      <style jsx>
        {`
          .searchBox {
            font-family: RobotoNormal;
            display: flex;
            gap: 10px;
            background-color: var(--cardBack);
          }

          .searchBox__input {
            padding: 10px;
            border-radius: 15px;
            border-width: 1px;
            border-color: transparent;
            background-color: #fffffe;
          }

          .searchBox__input:focus {
            outline-color: #078080;
          }

          .searchBox__input--name {
            width: 0;
            flex-grow: 1;
            /* flex-grow: 1; */
          }

          .searchBox__input--select {
            border: none;
            appearance: none;
          }

          .searchBox__input--button {
            background-color: var(--btnBack);
            color: var(--btnText);
          }

          .searchBox__input--error {
            border: 1px solid rgb(250, 54, 54);
          }
        `}
      </style>
    </form>
  )
}
