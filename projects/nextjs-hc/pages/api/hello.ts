import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { handle } from 'hono/nextjs'
import { z } from 'zod'

export const config = {
  runtime: 'edge',
}

const api = new Hono()

const route = api.get(
  '/hello',
  zValidator(
    'query',
    z.object({
      name: z.string(),
    })
  ),
  (c) => {
    const { name } = c.req.valid('query')
    return c.jsonT({
      message: `Hello ${name}!!`,
    })
  }
)

export type AppType = typeof route

const app = new Hono()
app.route('/api', api)

export default handle(app)
