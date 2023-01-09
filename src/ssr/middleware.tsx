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

export type SSRElement = ({ path }: { path?: string }) => h.JSX.Element

type Replacer = (html: string, content: string) => string
type SSROptions = {
  indexPath: string
  replacer: Replacer
}

const defaultOptions: SSROptions = {
  indexPath: 'public/index.html',
  replacer: (html: string, content: string) =>
    html.replace(/<div id="root"><\/div>/, `<div id="root">${content}</div>`),
}

export const ssr = (App: SSRElement, options: SSROptions = defaultOptions): MiddlewareHandler => {
  return async (c, _next) => {
    const path = new URL(c.req.url).pathname
    const content = renderPreact(<App path={path} />)

    const buffer = await getContentFromKVAsset(options.indexPath, {
      manifest: manifest,
      namespace: c.env.__STATIC_CONTENT,
    })
    const view = bufferToString(buffer)
    const html = options.replacer(view, content)

    return c.html(html)
  }
}
