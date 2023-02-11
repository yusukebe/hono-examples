import type { MiddlewareHandler } from 'hono'
import { Hono } from 'hono'
import { HTTPException } from 'hono/utils/http-exception'

const ALLOW_LIST = ['test.txt']

type Env = {
  Bindings: {
    AUTH_KEY_SECRET: string
    MY_BUCKET: R2Bucket
  }
}

const app = new Hono<Env>()

const validateMiddleware: MiddlewareHandler = async (c, next) => {
  if (c.req.header('X-Custom-Auth-Key') !== c.env.AUTH_KEY_SECRET) {
    throw new HTTPException(403)
  }
  await next()
}

app.get('/:key', async (c) => {
  const key = c.req.param('key')

  if (!ALLOW_LIST.includes(key)) {
    throw new HTTPException(403)
  }

  const object = await c.env.MY_BUCKET.get(key)

  if (object === null) {
    return c.notFound()
  }

  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('etag', object.httpEtag)

  return new Response(object.body, {
    headers,
  })
})

app.put('/:key', validateMiddleware, async (c) => {
  const key = c.req.param('key')
  await c.env.MY_BUCKET.put(key, c.req.body)
  return c.text(`Put ${key} successfully!`)
})

app.put('/:key', validateMiddleware, async (c) => {
  const key = c.req.param('key')
  await c.env.MY_BUCKET.delete(key)
  return c.text('Deleted!')
})

export default app
