import { Hono } from 'hono'

const api = new Hono()

api.get('/', (c) => {
  return c.json({ message: 'foo' })
})

export default api
