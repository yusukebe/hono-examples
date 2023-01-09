import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import Header from './Header'

const App = () => {
  const [message, setMessage] = useState('')
  const [count, setCount] = useState(0)

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
      <Header />
      <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      <h2>Message from API</h2>
      <p>{message}</p>
    </div>
  )
}

export default App
