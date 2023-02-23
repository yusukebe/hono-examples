import { Stack, Spinner, Center } from '@chakra-ui/react'
import type { InferRequestType } from 'hono/client'
import type { FC } from 'react'
import useSWR from 'swr'
import { client } from '../client'
import { TaskItem } from './TaskItem'

const $get = client.tasks.$get

const fetcher = async (arg: InferRequestType<typeof $get>) => {
  const res = await $get(arg)
  return await res.json()
}

export const TaskList: FC = () => {
  const {
    data: tasks,
    isLoading,
    isValidating,
  } = useSWR('tasks', fetcher, {
    keepPreviousData: true,
  })

  if ((isLoading && !isValidating) || !tasks)
    return (
      <Center my={10}>
        <Spinner size='lg' />
      </Center>
    )

  return (
    <Stack my={4} gap={4}>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id.toString()} />
      ))}
    </Stack>
  )
}
