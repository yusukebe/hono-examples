import { Hono } from 'hono'
import api from './api'
import { serveStatic } from 'hono/serve-static.module'

const app = new Hono()

app.route('/api', api)
app.get('*', serveStatic({ root: './public' }))

export default app
