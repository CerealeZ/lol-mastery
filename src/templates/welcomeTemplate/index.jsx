export default function WelcomeTemplate({ children, devices }) {
  return (
    <div className="layout">
      <div className="layout__children">{children}</div>
      <style jsx>
        {`
          .layout {
            display: flex;
            flex-direction: column;
          }
          .layout__children {
          }

          @media (min-width: ${devices.desktop}px) {
            .layout {
              align-items: center;
            }

            .layout__children {
              max-width: 600px;
            }
          }
        `}
      </style>
    </div>
  )
}
