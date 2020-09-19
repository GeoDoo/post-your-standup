import React from 'react'

import Login from './Login'
import Logout from './Logout'

const UserMenu = () => {
  return (
    <nav id="user-menu">
      <ul>
        <Login />
        <Logout />
      </ul>
    </nav>
  )
}

export default UserMenu
