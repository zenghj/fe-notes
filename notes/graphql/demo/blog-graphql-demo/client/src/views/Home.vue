<template>
  <div class="home">
    <h1>All Articles</h1>
    <div class="list">
      <div class="article-card" v-for="(item, index) in Articles" :key="index">
        <router-link :to="{
          name: 'article',
          params: {
            id: item.id
          }
        }">
          <h2 class="title">{{item.title}}</h2>
          <p class="description">{{item.description}}</p>
        </router-link>
        <div class="actions" v-if="isLogin">
          <router-link :to="{
            name: 'createArticle',
            query: {
              id: item.id
            }
          }"><button class="edit">edit</button></router-link>
          <button class="delete" @click="deleteArticle($event, item.id)">delete</button>
        </div>
      </div>
    </div>
    <button @click="loadingMore" class="load-more">loading more</button>
  </div>
</template>

<script>
// @ is an alias to /src
import gql from 'graphql-tag'
import { mapState } from 'vuex'

export default {
  name: 'home',
  data() {
    return {
      Articles: []
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  apollo: {
    Articles: {
      query: gql`query getArticles__($input: PageInfo){
        Articles(pageinfo: $input) {
          title
          id
          description
        }
      }`,
      variables: {
        input: {
          limit: 6,
          offset: 0
        }
      },
      // 不加这个的话，创建新文章，然后回到此页不会更新新的数据
      fetchPolicy: 'network-only' 
    },

  },
  created() {
    // this.$apollo.queries.Articles.refresh()
  },
  methods: {
    deleteArticle(e, id) {
      this.$apollo.mutate({
        mutation: gql`mutation ($input: DeleteArticle) {
          deleteArticle(input: $input) {
            id
          }
        }`,
        variables: {
          input: {
            id
          }
        }
      }).then(() => {
        // this.$apollo.queries.Articles.refresh()
        let index = this.Articles.find(item => item.id = id)
        this.Articles.splice(index, 1)
      }, err => {
        alert(err.message || 'fail to delete')
      })
    },
    loadingMore() {
      // console.log(this)
      this.$apollo.queries.Articles.fetchMore({
        variables: {
          input: {
            limit: 6,
            offset: this.Articles.length
          }
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newArticles = fetchMoreResult.Articles
          if (newArticles.length === 0) {
            alert('no more data')
          }
          return {
            Articles: [...previousResult.Articles, ...newArticles]
          }
        }
      })
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
  .home {
    padding: 30px;
  }
  .article-card {
    position: relative;
    box-shadow: 0 0 0.5em #ddd;
    border-radius: 1em;
    padding: 1em;
    margin-bottom: 1em;
    .actions {
      position: absolute;
      right: 1em;
      top: 1em;
    }
  }
</style>