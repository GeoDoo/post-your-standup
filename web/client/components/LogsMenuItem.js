import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const LogsMenuItem = () => {
  const { isAuthenticated } = useAuth0()

  return isAuthenticated ? (
    <li>
      <NavLink exact activeClassName="active" to="/logs">
        Logs
      </NavLink>
    </li>
  ) : null
}

export default LogsMenuItem
