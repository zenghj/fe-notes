const { ApolloServer, gql } = require('apollo-server-express')
const { articleType, articleResolves } = require('./resources/article')
const { tradeTokenForUser } = require('./auth-helper')
const HEADER_NAME = 'authorization'

const typeDefs = gql`
  ${articleType}
`
const resolvers = Object.assign({}, articleResolves)

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null
    let currentUser = null

    try {
      authToken = req.headers[HEADER_NAME]

      if (authToken) {
        currentUser = await tradeTokenForUser(authToken)
      }
    } catch (e) {
      console.warn(`Unable to authenticate using auth token: ${authToken}`)
    }

    return {
      authToken,
      currentUser
    }
  }
})
