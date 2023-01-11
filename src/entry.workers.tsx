import app from './entry.hono'
import { serveStatic } from 'hono/serve-static.module'

app.get('*', serveStatic({ root: './' }))

export default app
