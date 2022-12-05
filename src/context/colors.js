const themes = {
  black: {
    background: {
      primary: "#242629",
      secundary: "#16161a",
    },
    text: {
      primary: "#fffffe",
      secundary: "#94a1b2",
    },
    button: {
      normal: {
        backgroundColor: "#7f5af0",
        color: "#fffffe",
      },
    },
  },
  white: {
    background: {
      primary: "#fffffe",
      secundary: "#f8f5f2",
    },
    text: {
      primary: "#222525",
      secundary: "#222525",
    },
    button: {
      normal: {
        backgroundColor: "#078080",
        color: "#fffffe",
      },
    },
  },
}

export default function getTheme(theme) {
  const myTheme = themes[theme] || themes["black"]
  return myTheme
}
