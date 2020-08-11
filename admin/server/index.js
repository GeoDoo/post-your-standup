const { ApolloServer, gql } = require('apollo-server')
require('dotenv').config()

const { getConnection } = require('../../db')
const { findAll } = require('../../db/models/Workspace')
const config = require('../config')

getConnection()

const typeDefs = gql`
  type Workspace {
    teamId: String
    domain: String
    project: String
  }

  type Query {
    workspaces: [Workspace]
  }
`

const resolvers = {
  Query: {
    workspaces: async () => await findAll(),
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen({ port: config.server.port }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
