import VueRouter from 'vue-router'
import Vue from 'vue'
import upload2 from "./components/upload2"
import gallery from "./components/gallery"
import userVideos from "./components/userVideos"
import view from "./components/view"
import index from "./components/index"

Vue.use(VueRouter)

const routes = [
    { path: '/upload', component: upload2},
    { path: '/', component: index},
    { path: '/gallery', component: gallery},
    { path: '/userVideos', component: userVideos},
    { path: '/view/:videoid', component: view }
  ]
  
const router = new VueRouter({
    mode: 'history',
    routes : routes// short for `routes: routes`
})

export default router