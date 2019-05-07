import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
import './assets/styles/reset.css'

// Vue.use(ElementUI)
Vue.config.productionTip = false
if (localStorage.getItem('apollo-token')) {
  store.commit('login')
}
window.app = new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
