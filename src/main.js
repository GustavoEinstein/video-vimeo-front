import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './sass/main.scss'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import router from "./router"
import vueVimeoPlayer from 'vue-vimeo-player'
import vGallery from 'v-gallery'
import store from "./store"

Vue.use(vGallery)

Vue.use(vueVimeoPlayer)

Vue.use(Vuex)

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  vuetify,router,
  store,
  render: h => h(App),
}).$mount('#app')
