import { Hono } from 'hono'
import { ssr } from './middleware'

import App from '../App'

const routes = new Hono()
routes.get('*', ssr(App))

export default routes
