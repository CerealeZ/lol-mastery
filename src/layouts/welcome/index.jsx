export default function WelcomeLayout({ children, devices }) {
  return (
    <div className="welcome-template">
      {children}
      <style jsx>
        {`
          .welcome-template {
            display: flex;
            padding: 15px;
            flex-direction: column;
          }

          @media (min-width: ${devices.desktop}px) {
            .welcome-template {
              align-items: center;
            }
          }
        `}
      </style>
    </div>
  )
}
