import { buttons } from "./buttons.js"

export default function NavBar({ setComponent, actualComponent }) {
  return (
    <div className={"navBar"}>
      {buttons.map(({ title, icon, value }, index) => {
        return (
          <div
            key={index}
            title={title || "Coming soon"}
            onClick={() => setComponent(value)}
            className={`${"navBar__button"} ${
              actualComponent === value ? "navBar__button--selected" : ""
            }`}
          >
            <i className={icon || "fa-solid fa-question"}></i>
          </div>
        )
      })}

      <style>
        {`
          .navBar {
            display: flex;
            width: 100vw;
            overflow: auto;
            height: 50px;
            background-color: var(--cardBack);
            color: var(--cardText);
            /* border-top: 1px solid #fffffe; */
            /* justify-content: center; */
          }
          
          .navBar__button {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: none;
            width: 22%;
            /* border-right: 1px solid #fffffe; */
          }
          
          .navBar__button--selected {
            background-color: var(--btnBack);
            color: var(--btnText);
          }`}
      </style>
    </div>
  )
}
