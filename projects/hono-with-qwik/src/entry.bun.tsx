import app from './entry.hono'
import { serveStatic } from 'hono/serve-static.bun'

app.get('*', serveStatic({ root: './dist' }))

export default app
