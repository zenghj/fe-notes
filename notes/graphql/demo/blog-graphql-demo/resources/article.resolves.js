const Article = require('./article.model')
const { authenticated } = require('../auth-guard')

const getArticle = (root, { id }) => {
  return Article.findById(id).exec()
}
const getArticles = (root, { pageinfo }) => {
  return Article.find({})
    .sort({
      createdAt: -1
    })
    .limit(pageinfo.limit || 6)
    .skip(pageinfo.offset)
}
const createArticle = authenticated(async (root, { input }) => {
  const { title, description, content } = input
  let article = await Article.findOne({ title })
  if (article) {
    throw new Error('article already exists!')
  }
  article = {
    title,
    description,
    content
  }
  return Article.create(article)
})

const updateArticle = authenticated((root, { input }) => {
  const { id, ...update } = input
  return Article.findByIdAndUpdate(id, update, { new: true })
})

const deleteArticle = authenticated((root, { input }) => {
  const { id } = input
  return Article.findByIdAndRemove(id).exec()
})

module.exports = {
  Query: {
    Article: getArticle,
    Articles: getArticles
  },
  Mutation: {
    createArticle,
    updateArticle,
    deleteArticle
  }
}
