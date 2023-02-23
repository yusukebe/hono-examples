import { Flex, Input, Button, useToast } from '@chakra-ui/react'
import type { FC, FormEvent, ChangeEvent } from 'react'
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { client } from '../client'

const addTask = async (_: string, { arg }: { arg: string }) => {
  const res = await client.tasks.$post({
    json: {
      title: arg,
    },
  })
  if (res.status !== 201) {
    throw new Error(res.statusText)
  }
}

export const AddTaskForm: FC = () => {
  const toast = useToast()
  const { trigger, isMutating } = useSWRMutation('tasks', addTask, {
    onSuccess: () =>
      toast({
        title: 'Added Task',
        status: 'success',
      }),
    onError: () =>
      toast({
        title: 'Error occurred',
        status: 'error',
      }),
  })
  const [input, setInput] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (input === '') return
    trigger(input)
    setInput('')
  }

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <Flex gap={4} as='form' onSubmit={handleSubmit}>
      <Input placeholder='Task' value={input} onChange={onChange} />
      <Button colorScheme='blue' type='submit' isLoading={isMutating} disabled={isMutating}>
        Add
      </Button>
    </Flex>
  )
}
