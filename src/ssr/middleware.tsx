import { h, JSX } from 'preact'
import { render as renderPreact } from 'preact-render-to-string'
// @ts-ignore
import manifest from '__STATIC_CONTENT_MANIFEST'
import type { MiddlewareHandler } from 'hono'
import { bufferToString } from 'hono/utils/buffer'
import { getContentFromKVAsset } from 'hono/utils/cloudflare'
import { StatusCode } from 'hono/utils/http-status'

export type SSRElement = ({ path }: { path?: string }) => JSX.Element

type HTMLReplacer = (html: string, content: string) => string
type Hook = (html: string) => string
type SSROptions = {
  indexPath: string
  replacer: HTMLReplacer
  notFound: SSRElement
  hook: Hook
}

export const ssr = (App: SSRElement, options?: Partial<SSROptions>): MiddlewareHandler => {
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

    const buffer = await getContentFromKVAsset(options?.indexPath || 'public/index.html', {
      manifest: manifest,
      namespace: c.env?.__STATIC_CONTENT,
    })

    const view = bufferToString(buffer!)
    let replacer = options?.replacer

    if (!replacer) {
      replacer = (html: string, content: string) =>
        html.replace(/<div id="root"><\/div>/, `<div id="root">${content}</div>`)
    }

    let html = replacer(view, content)

    if (options?.hook) {
      html = options.hook(html)
    }

    return c.html(html, statusCode)
  }
}
