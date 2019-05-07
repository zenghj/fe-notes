<template>
  <div class="article">
    <h1 class="title">
      <span>
        {{Article.title}} 
        <router-link 
          v-if="isLogin"
          :to="{
            name: 'createArticle',
            query: {
              id: Article.id
            }
          }">
          <button>edit</button>
        </router-link>
      </span>
      <span class="create-time">
        createdAt: {{(new Date(+ Article.createdAt)).toString()}}
      </span>
    </h1>
    <div class="description">{{Article.description}}</div>
    <div class="content" v-html="Article.content.replace(/\n/g, '<br/>')"></div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'
export default {
  name: 'Article',
  data() {
    return {
      Article: {
        title: '',
        description: '',
        content: '',
        id: ''
      }
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  apollo: {
    Article() {
      return {
        query: gql`query getArticle($id: ID!) {
          Article(id: $id) {
            id
            title
            description
            content
            createdAt
            updatedAt
          }
        }`,
        variables: {
          id: this.$route.params.id
        },
        fetchPolicy: 'network-only'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  padding: 30px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #999;
    .create-time {
      color: #999;
      font-size: 12px;
    }
  }
  .description {
    border-left: 2px solid #ccc;
    padding-left: 1em;
    background: #eee;
  }
  .content {
    margin-top: 1em;
  }

}
</style>