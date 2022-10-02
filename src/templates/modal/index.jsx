import styles from "./styles.module.css"

export default function ModalBox({ children, onRemoveClick, style }) {
  return (
    <div className={styles.modalBackground}>
      <div
        style={style}
        onClick={(e) => e.stopPropagation()}
        className={styles.modalBox}
      >
        {onRemoveClick && (
          <button
            type="button"
            className={styles.modalBox__button}
            onClick={onRemoveClick}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
        <div style={{ overflow: "auto" }}>{children}</div>
      </div>
    </div>
  )
}
