const { ApolloServer, gql } = require('apollo-server')
require('dotenv').config()
const { getConnection } = require('../../db')
const { findAll } = require('../../db/models/Workspace')

getConnection()

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # This "Workspace" type defines the queryable fields for every workspace in our data source.
  type Workspace {
    teamId: String
    domain: String
    project: String
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "workspaces" query returns an array of zero or more Workspaces (defined above).
  type Query {
    workspaces: [Workspace]
  }
`

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves workspaces from the "workspaces" array above.
const resolvers = {
  Query: {
    workspaces: async () => await findAll(),
  },
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers })

// The `listen` method launches a web server.
server.listen({ port: 4100 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
