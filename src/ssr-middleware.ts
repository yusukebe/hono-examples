import { render as renderPreact } from 'preact-render-to-string'
// @ts-ignore
import manifest from '__STATIC_CONTENT_MANIFEST'
import { bufferToString } from 'hono/utils/buffer'
import { getContentFromKVAsset } from 'hono/utils/cloudflare'
import { MiddlewareHandler } from 'hono'

declare module 'hono' {
  interface ContextVariableMap {
    renderer: (App: any) => Promise<string>
  }
}

export const ssr = (): MiddlewareHandler => {
  return async (c, next) => {
    const renderer = async (App: any): Promise<string> => {
      const buffer = await getContentFromKVAsset('public/index.html', {
        manifest: manifest,
        namespace: c.env.__STATIC_CONTENT,
      })
      const view = bufferToString(buffer)
      const content = renderPreact(App)
      const html = view.replace(/<div id="root"><\/div>/, `<div id="root">${content}</div>`)
      return html
    }
    c.set('renderer', renderer)
    await next()
  }
}
