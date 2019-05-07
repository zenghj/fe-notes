import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/article/:id',
      name: 'article',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "Article" */ './views/Article.vue')
    },
    {
      path: '/createArticle',
      name: 'createArticle',
      component: () =>
        import(/* webpackChunkName: "CreateArticle" */ './views/CreateArticle.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () =>
        import(/* webpackChunkName: "CreateArticle" */ './views/Login.vue')
    }
  ]
})
