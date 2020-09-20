import React from 'react'

import LoginMenuItem from './LoginMenuItem'
import LogoutMenuItem from './LogoutMenuItem'
import DashboardMenuItem from './DashboardMenuItem'

import './UserMenu.pcss'

const UserMenu = () => {
  return (
    <nav id="user-menu">
      <ul className="menu">
        <LoginMenuItem />
        <LogoutMenuItem />
        <DashboardMenuItem />
      </ul>
    </nav>
  )
}

export default UserMenu
