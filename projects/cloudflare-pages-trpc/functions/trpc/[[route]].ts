import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'
import { trpcServer } from '@hono/trpc-server'
import { appRouter } from '../../src/router'
import { cors } from 'hono/cors'

const app = new Hono()

app.all(
  '*',
  cors(),
  trpcServer({
    router: appRouter,
  })
)

export const onRequest = handle(app)
