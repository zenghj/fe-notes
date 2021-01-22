const { gql } = require('apollo-server-express')

module.exports = gql`
  type Article {
    id: ID!
    "文章标题"
    title: String!
    "文章描述"
    description: String!
    "文章内容"
    content: String!
    "文章创建时间"
    createdAt: String
    "文章更新时间"
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
