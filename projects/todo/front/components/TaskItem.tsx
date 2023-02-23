import { CloseIcon } from '@chakra-ui/icons'
import { Card, CardBody, Text, Checkbox, IconButton, useToast } from '@chakra-ui/react'
import type { FC } from 'react'
import { useSWRConfig } from 'swr'
import type { Task } from '../../common/types'
import { client } from '../client'

type Props = {
  task: Task
}

const deleteTask = async (id: number) => {
  const res = await client.tasks[':id'].$delete({
    param: {
      id: id.toString(),
    },
  })
  if (res.status !== 200) {
    throw new Error(res.statusText)
  }
}

const updateTask = async (id: number, done: boolean) => {
  const res = await client.tasks[':id'].$put({
    param: {
      id: id.toString(),
    },
    json: {
      done: done,
    },
  })
  if (res.status !== 200) {
    console.log(res)
    throw new Error(res.statusText)
  }
}

export const TaskItem: FC<Props> = ({ task }) => {
  const { mutate } = useSWRConfig()
  const toast = useToast()

  const handleDeleteTask = async () => {
    try {
      await mutate('tasks', deleteTask(task.id), {
        optimisticData: (tasks: Task[]) => {
          tasks.filter((t) => {
            return t.id !== task.id
          })
        },
        revalidate: true,
        throwOnError: true,
      })
      toast({
        title: 'Deleted Task',
        status: 'success',
      })
    } catch (e) {
      toast({
        title: 'Error occurred',
        status: 'error',
      })
    }
  }

  const handleTaskUpdate = async () => {
    await mutate('tasks', updateTask(task.id, !task.done), {
      optimisticData: (tasks: Task[]) =>
        tasks.map((t) => {
          if (t.id === task.id) return { ...t, done: !t.done }
          return t
        }),
      revalidate: true,
    })
  }

  return (
    <Card key={task.id}>
      <CardBody display='flex' justifyContent='center' alignItems='center' gap={4}>
        <Checkbox size='lg' isChecked={task.done} onChange={handleTaskUpdate} />
        <Text flex='1'>{task.title}</Text>
        <IconButton
          aria-label='Delete Task'
          size='sm'
          colorScheme='red'
          icon={<CloseIcon />}
          onClick={handleDeleteTask}
        />
      </CardBody>
    </Card>
  )
}
