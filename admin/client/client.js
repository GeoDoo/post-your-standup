import { ApolloClient, InMemoryCache } from '@apollo/client'

import config from '../config'

const client = new ApolloClient({
  uri: `http://localhost:${config.server.port}`,
  cache: new InMemoryCache(),
})

export default client
