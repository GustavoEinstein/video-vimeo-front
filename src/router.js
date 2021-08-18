import VueRouter from 'vue-router'
import Vue from 'vue'
import upload from "./components/upload"
import index from "./components/index"
import gallery from "./components/gallery"

Vue.use(VueRouter)

const routes = [
    { path: '/', component: index },
    { path: '/upload', component: upload },
    { path: '/2', component: gallery}
  ]
  
const router = new VueRouter({
    mode: 'history',
    routes : routes// short for `routes: routes`
})

export default router