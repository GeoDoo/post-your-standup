import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Login = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  return !isAuthenticated ? (
    <li>
      <a
        href="#"
        onClick={e => {
          e.preventDefault()
          loginWithRedirect()
        }}
      >
        Log In
      </a>
    </li>
  ) : null
}

export default Login
