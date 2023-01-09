# Preact on Cloudflare Workers

* Preact
* SSR
* Hydrate

## Hono SSR Middleware

This is made possible by Hono middleware.
But you just edit `src/App.tsx`.

```tsx
import Router from 'preact-router'
import { h } from 'preact'

import Home from './app/Home'
import About from './app/About'

const App = ({ path }: { path?: string }) => {
  return (
    <Router url={path}>
      <Home path='/' />
      <About path='/about' />
    </Router>
  )
}

export default App
```

## Author

Yusuke Wada <https://github.com/yusukebe>

## License

MIT
