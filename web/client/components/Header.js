import React from 'react'

import UserMenu from '../components/UserMenu'

import './Header.pcss'

const Header = () => {
  return (
    <header>
      <a className="logo" href="/">
        Post Your Standup
      </a>
      <UserMenu />
    </header>
  )
}

export default Header
