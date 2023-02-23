import type { D1Database } from '@cloudflare/workers-types'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import type { Task } from '../common/types'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

const route = app
  .post(
    '/tasks',
    zValidator(
      'json',
      z.object({
        title: z.string(),
      })
    ),
    async (c) => {
      const task = c.req.valid('json')
      await c.env.DB.prepare('INSERT INTO tasks(title) VALUES (?);').bind(task.title).run()
      return c.jsonT(
        {
          message: `${task.title} is created!`,
        },
        201
      )
    }
  )
  .get('/tasks', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM tasks;').all<Task>()
    const tasks = results || []
    return c.jsonT(tasks)
  })
  .delete('/tasks/:id', async (c) => {
    const taskId = c.req.param('id')
    await c.env.DB.prepare('DELETE FROM tasks WHERE id = ?;').bind(taskId).run()
    return c.jsonT({
      message: `${taskId} is deleted`,
    })
  })
  .put(
    '/tasks/:id',
    zValidator(
      'json',
      z.object({
        done: z.boolean(),
      })
    ),
    async (c) => {
      const taskId = c.req.param('id')
      const { done } = c.req.valid('json')
      await c.env.DB.prepare('UPDATE tasks SET done = ? WHERE id = ?;')
        .bind(done ? 1 : 0, taskId)
        .run()
      return c.jsonT({
        message: `${taskId} is updated`,
      })
    }
  )

export type AppType = typeof route
export default app
