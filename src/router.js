import VueRouter from 'vue-router'
import Vue from 'vue'
import upload from "./components/upload"
import gallery from "./components/gallery"
import view from "./components/view"

Vue.use(VueRouter)

const routes = [
    { path: '/upload', component: upload },
    { path: '/', component: gallery},
    { path: '/view/:videoid', component: view }
  ]
  
const router = new VueRouter({
    mode: 'history',
    routes : routes// short for `routes: routes`
})

export default router