import { h } from 'preact'
import render from 'preact-render-to-string'
import App from './App'

export const html = () =>
  render(
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
      </head>
      <body>
        <h1>Hono with Preact</h1>
        <div id='root'>
          <App />
        </div>
        <script src='build/app.js'></script>
      </body>
    </html>
  )
