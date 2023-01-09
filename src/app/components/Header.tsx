import { h } from 'preact'

const Header = () => {
  return (
    <header>
      <h1>Preact SSR on Cloudflare Workers</h1>
      <p>
        <a href='/'>Home</a>&nbsp;
        <a href='/about'>About</a>
      </p>
    </header>
  )
}

export default Header
