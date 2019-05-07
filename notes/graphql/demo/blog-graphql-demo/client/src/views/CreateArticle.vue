<template>
  <div class="create-article">
    <div class="form-item">
      <label for="Title">Title</label><input type="text" v-model="Article.title">
    </div>
    <div class="form-item">
      <label for="Title">Description</label><input type="text" v-model="Article.description">
    </div>
    <div class="form-item">
      <label for="Title">Content</label><textarea type="text" rows="20" v-model="Article.content" />
    </div>
    <div class="actions">
      <button @click="submit">{{Article.id ? 'update' : 'create'}}</button>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  data() {
    return {
      Article: {
        id: '',
        title: '',
        description: '',
        content: ''
      }
    }
  },
  apollo: {
    Article() {
      let id = this.$route.query.id
      return {
        query: gql`query getArticle($id: ID!) {
          Article(id: $id) {
            id
            title
            description
            content
          }
        }`,
        variables: {
          id: id
        },
        skip: !id // 如果不存在则跳过查询
      }
    }
  },
  methods: {
    submit() {
      const article = {
        id: this.Article.id,
        title: this.Article.title,
        description: this.Article.description,
        content: this.Article.content
      }
      let promise
      let action = this.Article.id ? 'updateArticle' : 'createArticle'
      if (!this.Article.id) {
        delete article.id
        promise = this.$apollo.mutate({
          mutation: gql`mutation ($input: NewArticle) {
            ${action}(input: $input) {
              id
              title
            }
          }
          `,
          variables: {
            input: article
          }
        })
      } else {
        promise = this.$apollo.mutate({
          mutation: gql`mutation ($input: UpdateArticle) {
            ${action}(input: $input) {
              id
              title
            }
          }`,
          variables: {
            input: article
          }
        })
      }
      promise.then(({data}) => {
        console.log(data)
        this.$router.push({
          name: 'article',
          params: {
            id: data[action].id
          }
        })
      }, err => {
        alert(err.message || 'operation failed')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .create-article {
    padding: 30px;
    .form-item {
      display: flex;
      margin-top: 1em;
      label {
        width: 100px;
        & + input, & + textarea {
          width: calc(100% - 100px);
        }
      }
    }
  }
</style>
