import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import { ssr } from './ssr/middleware'
import api from './api'
import App from './App'

const app = new Hono()
app.route('/api', api)
app.get('/assets/*', serveStatic({ root: './public' }))

app.get('*', ssr(App))

export default app
