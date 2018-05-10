import Vue from 'vue'
import Router from 'vue-router'
import mapApp from '@/components/mapApp'
import login from '@/components/login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'mapApp',
      component: mapApp
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

export default router
