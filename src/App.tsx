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
  return (
    <div>
      <h2>Message from API</h2>
      <p>{message}</p>
    </div>
  )
}

export default App
