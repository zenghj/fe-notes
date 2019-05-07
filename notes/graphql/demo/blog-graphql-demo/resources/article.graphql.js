const { gql } = require('apollo-server-express')

module.exports = gql`
  type Article {
    id: ID!
    title: String!
    description: String!
    content: String!
    createdAt: String
    updatedAt: String
  }
  input NewArticle {
    title: String!
    description: String!
    content: String!
  }
  input UpdateArticle {
    id: ID!
    title: String
    description: String
    content: String
  }
  input DeleteArticle {
    id: ID!
  }
  input PageInfo {
    limit: Int!
    offset: Int!
  }

  type Query {
    Article(id: ID!): Article!
    Articles(pageinfo: PageInfo): [Article]
  }
  type Mutation {
    createArticle(input: NewArticle): Article!
    updateArticle(input: UpdateArticle): Article!
    deleteArticle(input: DeleteArticle): Article!
  }
`
