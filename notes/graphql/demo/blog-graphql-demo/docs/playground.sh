# Write your query or mutation here
query {
  Articles {
    title
    id
    description
    content
  }
}

# query {
#   Article(id: "5c98c8778a5f484f385c19a6") {
# 		content
#     description
#     id
#     title
#   }
# }

# mutation {
#   createArticle(
#     input: {
#       title:"xx1"
#       description:"xx"
#       content:"xx"
#     }
#   ) {
#     title
#     id
#     content
#     description
#   }
# }

# mutation {
#   deleteArticle(
#     input: {
#       id: "5c98c8648a5f484f385c19a5"
#     }
#   ) {
#     id
#   }
# }

# mutation {
#   updateArticle(
#     input: {
#       id: "5c98c8778a5f484f385c19a6",
#       title:"title updated"
#     }
#   ) {
#     id
#     content
#     title
#     description
#   }
# }