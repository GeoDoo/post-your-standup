import React from 'react'

import UserMenu from '../components/UserMenu'

import './Header.pcss'

const Header = () => {
  return (
    <header>
      <UserMenu />
      <a className="logo" href="/">
        Post Your Standup
      </a>
    </header>
  )
}

export default Header
