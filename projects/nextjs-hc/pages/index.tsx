import { useEffect, useState } from 'react'
import { hc, InferResponseType } from 'hono/client'
import { AppType } from './api/hello'

export default function Home() {
  const client = hc<AppType>('/api')
  const req = client.hello
  type ResType = InferResponseType<typeof req>

  const [data, setData] = useState<ResType>()

  useEffect(() => {
    const fetchData = async () => {
      const res = await req.$get({
        query: {
          name: 'Next.js',
        },
      })
      setData(await res.json())
    }
    fetchData()
  }, [])

  if (!data) return <p>Loading...</p>

  return <p>{data.message}</p>
}
