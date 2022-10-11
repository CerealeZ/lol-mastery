import styles from "./styles.module.css"

export default function Loading() {
  return (
    <div className={styles.ldsContainer}>
      <div className={styles["lds-ring"]}>
        <div className={styles.child}></div>
        <div className={styles.child}></div>
        <div className={styles.child}></div>
        <div className={styles.child}></div>
      </div>
    </div>
  )
}
