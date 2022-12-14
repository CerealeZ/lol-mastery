export default function ModalBox({ children, onRemoveClick, style }) {
  return (
    <div className={"modalBackground"}>
      <div
        style={style}
        onClick={(e) => e.stopPropagation()}
        className={"modalBox"}
      >
        {onRemoveClick && (
          <button
            type="button"
            className={"modalBox__button"}
            onClick={onRemoveClick}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
        <div style={{ overflow: "auto" }}>{children}</div>
      </div>

      <style jsx>
        {`
          .modalBackground {
            display: flex;
            position: fixed;
            flex-direction: column;
            align-items: center;
            height: 100vh;
            width: 100vw;
            padding-top: 10vh;
            top: 0;
            left: 0;
            z-index: 9999;
            background-color: rgba(0, 0, 0, 0.4);
          }

          .modalBox {
            display: flex;
            flex-direction: column;
            background-color: white;
            padding: 30px;
            border-radius: 30px;
            gap: 20px;
            max-width: 80%;
            max-height: 80%;
            min-width: 50%;
            overflow: auto;
            transition: width 2s, height 2s;
          }

          .modalBox__button {
            align-self: flex-end;
            background: none;
            border: none;
            font-size: 1.5em;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  )
}
