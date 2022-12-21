import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import api from './api'
import { html } from './html'

const app = new Hono()
app.get('/', (c) => {
  return c.html('<!DOCTYPE html>' + html())
})

app.route('/api', api)
app.get('/build/*', serveStatic({ root: './' }))

export default app
