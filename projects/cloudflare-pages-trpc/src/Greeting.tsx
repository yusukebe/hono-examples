import { trpc } from './utils/trpc'

export default function Greeting() {
  const greeting = trpc.greeting.useQuery({ name: 'Hono!' })
  if (!greeting.data) return <div>Loading...</div>
  return (
    <div>
      <p>{greeting.data.text}</p>
    </div>
  )
}
