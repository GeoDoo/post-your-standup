require('module-alias/register')
require('dotenv').config()

const { ApolloServer, gql, AuthenticationError } = require('apollo-server')
const jsonwebtoken = require('jsonwebtoken')
const jwksClient = require('jwks-rsa')

const { getConnection } = require('@db')
const { findAll } = require('@db/models/Workspace')
const config = require('@web/config')

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
    workspaces: async (_parent, _args, context) => {
      try {
        await context.user

        return await findAll()
      } catch (e) {
        throw new AuthenticationError(e)
      }
    },
  },
}

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH_DOMAIN}/.well-known/jwks.json`,
})

const getKey = (header, cb) => {
  client.getSigningKey(header.kid, (_err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey

    cb(null, signingKey)
  })
}

const options = {
  audience: process.env.AUTH_AUDIENCE,
  issuer: `https://${process.env.AUTH_DOMAIN}/`,
  algorithms: ['RS256'],
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const jwt = req.headers.authorization
    const user = new Promise((resolve, reject) =>
      jsonwebtoken.verify(jwt, getKey, options, (err, decoded) => {
        if (err) {
          return reject(err)
        }

        resolve(decoded)
      }),
    )

    return {
      user,
    }
  },
})

server.listen(config.server.port).then(({ url }) => {
  console.log(`🚀 Dashboard API ready at ${url}`)
})
