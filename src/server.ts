import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import App from './App'
import api from './api'
import NotFound from './app/NotFound'
import { ssr } from './ssr/middleware'

const app = new Hono()
app.route('/api', api)
app.get('/assets/*', serveStatic({ root: './public' }))

app.get(
  '*',
  ssr(App, {
    notFound: NotFound,
    helmetReplacer: (html, head) => {
      html = html.replace(/<!--head-->/, head.title.toString())
      return html
    },
  })
)

export default app
