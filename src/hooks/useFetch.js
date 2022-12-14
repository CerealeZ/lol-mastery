import { useState, useEffect, useCallback } from "react"
import axios from "axios"

const responseFormat = {
  data: undefined,
  status: undefined,
  isOkay: undefined,
}

const useFetch = (url, callback) => {
  const [response, setResponse] = useState(responseFormat)
  const [isLoading, setLoading] = useState(true)
  const fetch = useCallback(async () => {
    if (!url) return
    try {
      setLoading(true)
      const response = await axios.get(url)
      const { data, status } = response
      const finalResponse = {
        data: callback ? callback(data) : data,
        status,
        isOkay: true,
      }
      setResponse(finalResponse)
    } catch (err) {
      const { response } = err
      setResponse({
        status: response?.status || 500,
        data: response.data,
        isOkay: false,
      })
    } finally {
      setLoading(false)
    }
  }, [url, callback])

  useEffect(() => {
    fetch()
  }, [url, fetch])

  return {
    response,
    isLoading,
    reload: fetch,
  }
}

export default useFetch
