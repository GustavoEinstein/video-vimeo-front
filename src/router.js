import VueRouter from 'vue-router'
import Vue from 'vue'
import upload from "./components/upload"
import index from "./components/index"

Vue.use(VueRouter)

const routes = [
    { path: '/', component: index },
    { path: '/upload', component: upload }
  ]
  
const router = new VueRouter({
    mode: 'history',
    routes : routes// short for `routes: routes`
})

export default router