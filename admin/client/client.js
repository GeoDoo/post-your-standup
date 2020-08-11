import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4100',
  cache: new InMemoryCache(),
})

export default client
