import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const withAuth = Component => {
  const WithAuth = () => {
    const {
      isLoading,
      isAuthenticated,
      getAccessTokenSilently,
      loginWithRedirect,
    } = useAuth0()

    useEffect(() => {
      const getToken = async () => {
        const token = await getAccessTokenSilently({
          audience: process.env.AUTH_AUDIENCE,
          scope: 'read:workspaces',
        })

        localStorage.setItem('post-your-standup-jwt', token)
      }

      getToken()
    }, [])

    if (isLoading) {
      return null
    }

    if (isAuthenticated) {
      return <Component />
    }

    loginWithRedirect()
    return null
  }

  return WithAuth
}

export default withAuth
