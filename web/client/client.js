import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import config from '../config'

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? `${config.server.prod.host}/graphql`
      : `http://localhost:${config.server.port}/graphql`,
})

const authLink = setContext((_, { headers }) => {
  const jwt = localStorage.getItem('post-your-standup-jwt') || ''

  return {
    headers: {
      ...headers,
      authorization: jwt,
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
