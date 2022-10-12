import { useState, useEffect, useCallback } from "react"
import axios from "axios"

const useFetch = (url, initialData = undefined, callback) => {
  const [response, setResponse] = useState(initialData)
  const [isLoading, setLoading] = useState(true)
  const fetch = useCallback(async () => {
    setResponse(initialData)
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
  }, [url, initialData])

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
