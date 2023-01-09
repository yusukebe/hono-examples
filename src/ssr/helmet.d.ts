declare module 'preact-helmet' {
  import { ComponentType, JSX } from 'preact'

  interface HelmetProperties {
    htmlAttributes?: JSX.HTMLAttributes<HTMLHtmlElement>
    title?: string
    titleTemplate?: string
    defaultTitle?: string
    titleAttributes?: JSX.HTMLAttributes<HTMLTitleElement>
    base?: JSX.HTMLAttributes<HTMLBaseElement>
    meta?: Array<JSX.HTMLAttributes<HTMLMetaElement>>
    link?: Array<JSX.HTMLAttributes<HTMLLinkElement>>
    script?: Array<JSX.HTMLAttributes<HTMLScriptElement>>
    noscript?: Array<JSX.HTMLAttributes<HTMLElement>>
    style?: Array<JSX.HTMLAttributes<HTMLStyleElement>>
  }

  export interface HelmetData {
    base: HelmetDatum
    htmlAttributes: HelmetDatum
    link: HelmetDatum
    meta: HelmetDatum
    script: HelmetDatum
    style: HelmetDatum
    title: HelmetDatum
  }

  interface HelmetDatum {
    toString(): string
    toComponent(): preact.Component<any, any>
  }

  const Helmet: ComponentType<HelmetProperties> & {
    rewind: () => HelmetData
  }
  export default Helmet
}
