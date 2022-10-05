export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="lds-ring">
        <div className="child"></div>
        <div className="child"></div>
        <div className="child"></div>
        <div className="child"></div>
      </div>
    </div>
  )
}
