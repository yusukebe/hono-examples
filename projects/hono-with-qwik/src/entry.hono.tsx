import qwikCityPlan from '@qwik-city-plan'
import render from './entry.ssr'
import { qwikMiddleware } from './middleware/qwik-city'
import { logger } from 'hono/logger'

import { Hono } from 'hono'

const app = new Hono()
app.get('*', logger())

app.get('*', qwikMiddleware({ render, qwikCityPlan }))

export default app
