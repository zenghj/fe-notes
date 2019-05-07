<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Blog demo using graphql</router-link>
      <template v-if="isLogin">
        <div>
          <router-link class="create-article" :to="{
            name: 'createArticle'
          }"><button>New article</button></router-link>
          <button class="logout" @click="logout">logout</button>
        </div>
      </template>
      <template v-else>
        <router-link to="/login"><button>login</button></router-link>
      </template>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { onLogout } from './vue-apollo.js'
export default {
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    ...mapMutations({
      storeLogout: 'logout'
    }),
    logout() {
      // normally invalid the token
      this.storeLogout()
      onLogout(this.$apolloProvider.defaultClient)
      this.$router.push('/')
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background: #2c3e50;
  color: #fff;
  font-weight: bold;
}
</style>
