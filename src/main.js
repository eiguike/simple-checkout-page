import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'
import About from './components/About.vue'
import Content from './components/Content.vue'
import ShoppingCart from './components/ShoppingCart.vue'
import Checkout from './components/Checkout.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  { path: '/', component: Content },
  { path: '/about', component: About },
  { path: '/shoppingcart', component: ShoppingCart },
  { path: '/checkout', component: Checkout }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})

