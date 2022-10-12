import styles from "./styles.module.css"

export default function SummonerProfileTemplate({
  profileViewer,
  navigation,
  children,
}) {
  return (
    <div className={styles.profileTemplate}>
      <div className={styles.profileTemplate___headerContainer}>
        {profileViewer}
        {navigation}
      </div>
      <div className={styles.profileTemplate__children}>{children}</div>
    </div>
  )
}
