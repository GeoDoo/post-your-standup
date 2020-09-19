import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import { Auth0Provider } from '@auth0/auth0-react'

import client from './client'

import App from './App'

const Root = () => {
  return (
    <Auth0Provider
      domain={process.env.AUTH_DOMAIN}
      clientId={process.env.AUTH_CLIENT_ID}
      redirectUri={window.location.origin}
      audience={process.env.AUTH_AUDIENCE}
      scope="read:workspaces"
    >
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Auth0Provider>
  )
}

render(<Root />, document.getElementById('root'))
