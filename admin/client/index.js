import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/client'

import Workspaces from './Workspaces'
import client from './client'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Dashboard</h1>
        <Workspaces />
      </div>
    </ApolloProvider>
  )
}

render(<App />, document.getElementById('root'))
