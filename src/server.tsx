import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import ssrRoute from './ssr'
import api from './api'

const app = new Hono()
app.route('/api', api)
app.get('/assets/*', serveStatic({ root: './public' }))

app.route('/', ssrRoute)

export default app
