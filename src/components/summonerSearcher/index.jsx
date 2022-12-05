import { useRouter } from "next/router"
import { regions } from "./regions.js"
import scripts from "./languajes"
import useForm from "src/hooks/useForm.js"

export default function SummonerSearcher({ getScript }) {
  const script = getScript(scripts)
  const router = useRouter()
  const {
    state: query,
    set: setQueryField,
    status: queryStatus,
  } = useForm(
    {
      name: "",
      region: "la1", // TODO: Change it dinamyc
    },
    {
      name: [[(value) => value.trim(), "Name is empty"]],
      region: [[(value) => value.trim(), "Region is empty"]],
    }
  )
  const searchUser = async () => {
    const { name, region } = query
    if (queryStatus.hasError) return
    router.push(`/summoners/${region}/${encodeURIComponent(name)}`)
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
        className={`searchBox__input searchBox__input--name`}
        onInput={setQueryField("name")}
      />
      <select
        id={"region"}
        name="region"
        className={`searchBox__input searchBox__input--select`}
        value={query.region}
        onInput={setQueryField("region")}
      >
        {regions.map(({ value, name }, index) => (
          <option key={index} value={value}>
            {name}
          </option>
        ))}
      </select>

      <button className={`btn`} type="submit">
        <i className="fa-solid fa-magnifying-glass" />
      </button>

      <style jsx>
        {`
          .searchBox {
            display: flex;
            gap: 10px;
          }

          .searchBox__input {
            padding: 10px;
            border-radius: 15px;
            border-width: 1px;
            border-color: transparent;
          }

          .searchBox__input--name {
            width: 0;
            flex-grow: 1;
          }

          .searchBox__input--select {
            border: none;
            appearance: none;
          }
        `}
      </style>
    </form>
  )
}
