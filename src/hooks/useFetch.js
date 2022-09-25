import { useState, useEffect, useCallback } from "react"
import axios from "axios"

const useFetch = (url, initialData = undefined, callback) => {
  const [data, setData] = useState(initialData)
  const [isLoading, setLoading] = useState(false)
  const fetch = useCallback(async () => {
    setData(initialData)
    if (!url) return
    try {
      setLoading(true)
      const { data } = await axios.get(url)
      setData(callback ? callback(data) : data)
    } catch (err) {
      setData({
        status: "error",
        msg: err,
      })
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetch()
  }, [url, fetch])

  return {
    data,
    isLoading,
    fetch,
  }
}

export default useFetch
