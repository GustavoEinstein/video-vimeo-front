import VueRouter from 'vue-router'
import Vue from 'vue'
import upload from "./components/upload"
import gallery from "./components/gallery"

Vue.use(VueRouter)

const routes = [
    { path: '/upload', component: upload },
    { path: '/', component: gallery}
  ]
  
const router = new VueRouter({
    mode: 'history',
    routes : routes// short for `routes: routes`
})

export default router