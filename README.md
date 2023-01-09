# Preact on Cloudflare Workers

* Preact
* SSR
* Hydrate

## Hono SSR Middleware

This is made possible by Hono middleware.

```ts
import { ssr } from './ssr-middleware'

import { h } from 'preact'
import App from './app/App'

const app = new Hono()

app.get('*', ssr()) // SSR Middleware
app.get('/', async (c) => {
  const html = await c.get('renderer')(<App />)
  return c.html(html)
})
```

## Author

Yusuke Wada <https://github.com/yusukebe>

## License

MIT
