import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

const App = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api')
      const data = await res.json()
      setMessage(data.message)
    }
    fetchData()
  }, [])
  return <h2>{message}</h2>
}

export default App
