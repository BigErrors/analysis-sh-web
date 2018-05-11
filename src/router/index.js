import Vue from 'vue'
import Router from 'vue-router'
import mapApp from '@/components/mapApp'
import login from '@/components/login'
import moduleChoose from '@/components/moduleChoose'

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
    },
    {
      path: '/mapApp',
      name: 'mapApp',
      component: mapApp
    }, {
      path: '/moduleChoose',
      name: 'moduleChoose',
      component: moduleChoose
    }
  ]
})

export default router
