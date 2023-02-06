import Router from 'preact-router'
import About from './app/About'
import Home from './app/Home'

const App = ({ path }: { path?: string }) => {
  return (
    <Router url={path}>
      <Home path='/' />
      <About path='/about' />
    </Router>
  )
}

export default App
