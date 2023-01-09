# Preact on Cloudflare Workers

* Preact
* SSR
* Hydrate

## Hono SSR Middleware

This is made possible by Hono middleware.

```tsx
import { ssr } from './ssr-middleware'

import { h } from 'preact'
import App from './app/App'

const app = new Hono()

app.get('*', ssr()) // SSR Middleware
app.get('/', async (c) => {
  return c.get('renderer')(<App />)
})
```

## Author

Yusuke Wada <https://github.com/yusukebe>

## License

MIT
