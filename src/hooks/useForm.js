import { useEffect, useReducer, useState } from "react"

const reducer = (state, action) => {
  switch (action.type) {
    case "change":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      }
    case "set": {
      return action.payload
    }
    default:
      return state
  }
}

const setField = (field, value) => {
  return {
    type: "change",
    payload: {
      field,
      value,
    },
  }
}

const setState = (object) => {
  return {
    type: "set",
    payload: object,
  }
}

const initialStatus = {
  errors: {},
  hasError: true,
}

export default function useForm(initial, tests) {
  const [state, dispatch] = useReducer(reducer, initial)
  const [status, setStatus] = useState(initialStatus)
  const [formValidations] = useState(tests)

  useEffect(
    function checkForm() {
      if (!formValidations) return
      const errors = Object.entries(state).map(([key, value]) => {
        const valueTests = formValidations[key]
        if (!valueTests) {
          return [key, []]
        }
        const errors = valueTests.reduce((prev, [test, message]) => {
          const hasPassed = test(value)
          if (!hasPassed) return [...prev, message]
          return prev
        }, [])
        return [key, errors]
      })
      const hasError = errors.some(([, errorMessages]) => errorMessages.length)
      setStatus({
        errors: Object.fromEntries(errors),
        hasError,
      })
    },
    [state, formValidations]
  )

  return {
    state,
    reset: () => dispatch(setState(initial)),
    set: (field) => (event) => dispatch(setField(field, event.target.value)),
    status,
  }
}
