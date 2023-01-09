import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import { ssr } from './ssr/middleware'
import api from './api'
import App from './App'
import NotFound from './app/NotFound'

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
