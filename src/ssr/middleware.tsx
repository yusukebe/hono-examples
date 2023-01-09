import { h } from 'preact'
import { render as renderPreact } from 'preact-render-to-string'
// @ts-ignore
import manifest from '__STATIC_CONTENT_MANIFEST'
import { bufferToString } from 'hono/utils/buffer'
import { getContentFromKVAsset } from 'hono/utils/cloudflare'
import type { MiddlewareHandler } from 'hono'

declare module 'hono' {
  interface ContextVariableMap {
    renderer: (App: any) => Promise<Response>
  }
}

export const ssr = (App: any): MiddlewareHandler => {
  return async (c, _next) => {
    const path = new URL(c.req.url).pathname
    const content = renderPreact(<App url={path} />)

    const buffer = await getContentFromKVAsset('public/index.html', {
      manifest: manifest,
      namespace: c.env.__STATIC_CONTENT,
    })
    const view = bufferToString(buffer)

    const html = view.replace(/<div id="root"><\/div>/, `<div id="root">${content}</div>`)

    return c.html(html)
  }
}
