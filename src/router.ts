import * as vueRouter from 'vue-router'

import Home from './views/Main.vue'
import Results from './views/OmikujiResults.vue'

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/logs', component: Results }
  ]
})

export default router