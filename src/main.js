import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'
import Content from './components/Content.vue'
import Checkout from './components/Checkout.vue'
import Boleto from './components/Boleto.vue'
import Card from './components/Card.vue'
import CardJs from 'card'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  { path: '/', component: Content },
  { path: '/checkout', component: Checkout },
  { path: '/checkout/boleto', component: Boleto },
  { path: '/checkout/card', component: Card }
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

var $ = require("jquery");
// The current card.js code does not explictly require jQuery, but instead uses the global, so this line is needed.
window.jQuery = $;
var card = require("card");
