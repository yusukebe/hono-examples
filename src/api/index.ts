import { Hono } from 'hono'

const api = new Hono()

api.get('/', (c) => {
  return c.json({ message: 'Hello!' })
})

export default api
