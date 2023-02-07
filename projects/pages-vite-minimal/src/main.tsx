import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'

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

  return <h1>{message}</h1>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
