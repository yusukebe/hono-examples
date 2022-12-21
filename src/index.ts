import { Hono } from 'hono'
import api from './api'
import view from './index.html'
import { serveStatic } from 'hono/serve-static.module'

const app = new Hono()
app.get('/', (c) => c.html(view))

app.route('/api', api)
app.get('/build/*', serveStatic({ root: './' }))

export default app
