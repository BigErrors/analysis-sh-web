import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import moduleChoose from '@/components/moduleChoose'
import modelSupermarket from '@/components/modelSupermarket'
import modelDataApp from '@/components/modelDataApp'
import index4renmintj from '@/components/renmintj/index4renmintj4'
import peopleNum from '@/components/renmintj/peopleNum'
import peopleType from '@/components/renmintj/peopleType'
import peopleSearch from '@/components/renmintj/peopleSearch'
import peoplePortrait from '@/components/renmintj/peoplePortrait'
import businessNum from '@/components/renmintj/businessNum'
import businessTypes from '@/components/renmintj/businessTypes'
import importantEvent from '@/components/renmintj/importantEvent'
import importantEventDetail from '@/components/renmintj/importantEventDetail'
import trendAnalysis from '@/components/renmintj/trendAnalysis'
import institutionRanking from '@/components/renmintj/institutionRanking'

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
      path: '/peoplePortrait/:id',
      name: 'peoplePortrait',
      component: peoplePortrait
    }, {
      path: '/businessNum',
      name: 'businessNum',
      component: businessNum
    }, {
      path: '/importantEvent',
      name: 'importantEvent',
      component: importantEvent
    }, {
      path: '/importantEventDetail/:id',
      name: 'importantEventDetail',
      component: importantEventDetail
    }, {
      path: '/businessTypes',
      name: 'businessTypes',
      component: businessTypes
    }, {
      path: '/institutionRanking',
      name: 'institutionRanking',
      component: institutionRanking
    }, {
      path: '/trendAnalysis',
      name: 'trendAnalysis',
      component: trendAnalysis
    }
  ]
})

export default router
