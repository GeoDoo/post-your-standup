import React from 'react'

import LoginMenuItem from './LoginMenuItem'
import LogoutMenuItem from './LogoutMenuItem'
import DashboardMenuItem from './DashboardMenuItem'
import LogsMenuItem from './LogsMenuItem'

import './UserMenu.pcss'

const UserMenu = () => {
  return (
    <nav id="user-menu">
      <ul className="menu">
        <LoginMenuItem />
        <LogoutMenuItem />
        <DashboardMenuItem />
        <LogsMenuItem />
      </ul>
    </nav>
  )
}

export default UserMenu
