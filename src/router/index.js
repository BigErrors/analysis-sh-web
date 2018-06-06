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
import moduleChoose from '@/components/moduleChoose'
import modelSupermarket from '@/components/modelSupermarket'
import modelDataApp from '@/components/modelDataApp'
import index4renmintj from '@/components/renmintj/index4renmintj4'
import peopleNum from '@/components/renmintj/peopleNum'
import peopleType from '@/components/renmintj/peopleType'
import peopleSearch from '@/components/renmintj/peopleSearch2'
import peoplePortrait from '@/components/renmintj/peoplePortrait'
import totalNum from '@/components/renmintj/totalNum2'
import totalType from '@/components/renmintj/totalType2'
import importantEvent from '@/components/renmintj/importantEvent'
import trendAnalysis from '@/components/renmintj/trendAnalysis'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index4renmintj',
      component: index4renmintj
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
    }, {
      path: '/moduleChoose',
      name: 'moduleChoose',
      component: moduleChoose
    }, {
      path: '/modelSupermarket',
      name: 'modelSupermarket',
      component: modelSupermarket
    }, {
      path: '/modelDataApp',
      name: 'modelDataApp',
      component: modelDataApp
    }, {
      path: '/index4renmintj',
      name: 'index4renmintj',
      component: index4renmintj
    }, {
      path: '/peopleNum',
      name: 'peopleNum',
      component: peopleNum
    }, {
      path: '/peopleType',
      name: 'peopleType',
      component: peopleType
    }, {
      path: '/peopleSearch',
      name: 'peopleSearch',
      component: peopleSearch
    }, {
      path: '/peoplePortrait',
      name: 'peoplePortrait',
      component: peoplePortrait
    }, {
      path: '/totalNum',
      name: 'totalNum',
      component: totalNum
    }, {
      path: '/totalType',
      name: 'totalType',
      component: totalType
    }, {
      path: '/importantEvent',
      name: 'importantEvent',
      component: importantEvent
    }, {
      path: '/trendAnalysis',
      name: 'trendAnalysis',
      component: trendAnalysis
    }
  ]
})

export default router
