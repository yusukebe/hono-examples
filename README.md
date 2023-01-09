# Preact on Cloudflare Workers

* Preact
* SSR
* Hydrate

## Hono SSR Middleware

```tsx
import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import App from './App'
import api from './api'
import { ssr } from './ssr/middleware'

const app = new Hono()
app.route('/api', api)
app.get('/assets/*', serveStatic({ root: './public' }))

app.get('*', ssr(App))

export default app
```

## Author

Yusuke Wada <https://github.com/yusukebe>

## License

MIT
