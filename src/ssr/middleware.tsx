import { h } from 'preact'
import { render as renderPreact } from 'preact-render-to-string'
// @ts-ignore
import manifest from '__STATIC_CONTENT_MANIFEST'
import { bufferToString } from 'hono/utils/buffer'
import { getContentFromKVAsset } from 'hono/utils/cloudflare'
import type { MiddlewareHandler } from 'hono'
import { StatusCode } from 'hono/utils/http-status'

export type SSRElement = ({ path }: { path?: string }) => h.JSX.Element

type Replacer = (html: string, content: string) => string
type SSROptions = {
  indexPath: string
  replacer: Replacer
  notFound: SSRElement
}

export const ssr = (App: SSRElement, options: Partial<SSROptions>): MiddlewareHandler => {
  return async (c, next) => {
    const path = new URL(c.req.url).pathname
    let content = renderPreact(<App path={path} />)
    let statusCode: StatusCode = 200

    if (content === '') {
      if (options.notFound) {
        content = renderPreact(options.notFound({ path }))
        statusCode = 404
      } else {
        return await next()
      }
    }

    const buffer = await getContentFromKVAsset(options.indexPath || 'public/index.html', {
      manifest: manifest,
      namespace: c.env.__STATIC_CONTENT,
    })
    const view = bufferToString(buffer)
    let replacer = options.replacer

    if (!replacer) {
      replacer = (html: string, content: string) =>
        html.replace(/<div id="root"><\/div>/, `<div id="root">${content}</div>`)
    }
    const html = replacer(view, content)

    return c.html(html, statusCode)
  }
}
