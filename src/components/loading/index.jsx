export default function Loading() {
  return (
    <div className={"ldsContainer"}>
      <div className={"lds-ring"}>
        <div className={"child"}></div>
        <div className={"child"}></div>
        <div className={"child"}></div>
        <div className={"child"}></div>
      </div>

      <style jsx>
        {`
          .ldsContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .lds-ring {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
          }
          .lds-ring .child {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 64px;
            height: 64px;
            margin: 8px;
            border: 8px solid var(--cardText);
            border-radius: 50%;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: var(--cardText) transparent transparent transparent;
          }
          .lds-ring .child :nth-child(1) {
            animation-delay: -0.45s;
          }
          .lds-ring .child :nth-child(2) {
            animation-delay: -0.3s;
          }
          .lds-ring .child :nth-child(3) {
            animation-delay: -0.15s;
          }
          @keyframes lds-ring {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  )
}
