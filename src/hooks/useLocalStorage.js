import { useState, useEffect } from "react"

export default function useLocalStorage(token, defaultState) {
  const [state, setState] = useState(defaultState)
  const isObject = typeof defaultState === "object"

  useEffect(function getFromLocal() {
    const tokenData = localStorage.getItem(token)
    if (!tokenData) return
    setState(isObject ? JSON.parse(tokenData) : tokenData)
  }, [])

  const setNewState = (state) => {
    setState(state)
    localStorage.setItem(token, isObject ? JSON.stringify(state) : state)
  }

  return [state, setNewState]
}
