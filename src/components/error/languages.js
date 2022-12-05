const es_MX = {
  status: {
    404: {
      title: "Datos no encontrados",
      desc: "No se encontró los datos solicitados",
    },
    429: {
      title: "Falla en la API de Riot",
      desc: "Debido a muchas peticiones, se excedió el límite permitido. Por favor, recargue el componente",
    },
    default: {
      title: "Error general",
      desc: "Hubo un error no especificado. Es posible que se deba a tu conexión de internet",
    },
  },
}

const en_US = {
  status: {
    404: {
      title: "Not found",
      desc: "There is no data",
    },
    429: {
      title: "Riot Api Failed",
      desc: "Too many requests in short time. Reload Component",
    },
    default: {
      title: "General Error",
      desc: "Check your internet",
    },
  },
}

const languages = {
  es_MX,
  en_US,
}

export default languages
