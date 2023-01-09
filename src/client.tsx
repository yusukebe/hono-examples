import { h, hydrate } from 'preact'
import App from './app/App'

hydrate(<App />, document.getElementById('root'))
