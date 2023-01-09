import Router from 'preact-router'
import { h } from 'preact'

import Home from './app/Home'
import About from './app/About'

const App = ({ path }: { path?: string }) => {
  return (
    <Router url={path}>
      <Home path='/' />
      <About path='/about' />
    </Router>
  )
}

export default App
