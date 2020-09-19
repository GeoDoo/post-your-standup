import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Logout = () => {
  const { isAuthenticated, logout } = useAuth0()

  return isAuthenticated ? (
    <li>
      <a
        href="#"
        onClick={e => {
          e.preventDefault()
          localStorage.clear()
          logout({ returnTo: window.location.origin })
        }}
      >
        Log Out
      </a>
    </li>
  ) : null
}

export default Logout
