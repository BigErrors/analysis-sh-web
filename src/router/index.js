import Vue from 'vue'
import Router from 'vue-router'
import mapApp from '@/components/mapApp'
import login from '@/components/login'
import m110 from '@/components/mockpages/110'
import mfalvzx from '@/components/mockpages/falvzx'
import mrenmintj from '@/components/mockpages/renmintj'
import mzhongdianjg from '@/components/mockpages/zhongdianjg'
import mzhongdianry from '@/components/mockpages/zhongdianry'
import mzhongdiansj from '@/components/mockpages/zhongdiansj'

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
    },
    {
      path: '/110',
      name: '110',
      component: m110
    },
    {
      path: '/falvzx',
      name: 'falvzx',
      component: mfalvzx
    },
    {
      path: '/renmintj',
      name: 'renmintj',
      component: mrenmintj
    },
    {
      path: '/zhongdianjg',
      name: 'zhongdianjg',
      component: mzhongdianjg
    },
    {
      path: '/zhongdianry',
      name: 'zhongdianry',
      component: mzhongdianry
    },
    {
      path: '/zhongdiansj',
      name: 'zhongdiansj',
      component: mzhongdiansj
    }
  ]
})

export default router
