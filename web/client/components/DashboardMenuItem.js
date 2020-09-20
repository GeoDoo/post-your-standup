import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const DashboardMenuItem = () => {
  const { isAuthenticated } = useAuth0()

  return isAuthenticated ? (
    <li>
      <NavLink exact activeClassName="active" to="/dashboard">
        Dashboard
      </NavLink>
    </li>
  ) : null
}

export default DashboardMenuItem
