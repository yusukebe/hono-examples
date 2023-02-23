import { Container, Center, Heading } from '@chakra-ui/react'
import { AddTaskForm } from './components/AddTaskForm'
import { TaskList } from './components/TaskList'

function App() {
  return (
    <Center>
      <Container maxW='xl' mt={10}>
        <Heading mb={4}>Todo List</Heading>
        <TaskList />
        <AddTaskForm />
      </Container>
    </Center>
  )
}

export default App
