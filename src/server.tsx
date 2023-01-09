import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import { ssr } from './ssr-middleware'

import api from './api'

import { h } from 'preact'
import App from './app/App'

const app = new Hono()
app.route('/api', api)

app.get('*', ssr()) // SSR Middleware
app.get('/', async (c) => {
  const html = await c.get('renderer')(<App />)
  return c.html(html)
})

app.get('*', serveStatic({ root: './public' }))

export default app
