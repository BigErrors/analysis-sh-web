import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import moduleChoose from '@/components/moduleChoose'
import modelTools from '@/components/modelTools'
import index4renmintj from '@/components/renmintj/index4renmintj5'
import peopleNum from '@/components/renmintj/peopleNum'
import peopleType from '@/components/renmintj/peopleType'
import peopleRanking from '@/components/renmintj/peopleRanking'
import peoplePortrait from '@/components/renmintj/peoplePortrait'
import businessNum from '@/components/renmintj/businessNum'
import businessTypes from '@/components/renmintj/businessTypes'
import importantEvent from '@/components/renmintj/importantEvent'
import eventDetail from '@/components/renmintj/eventDetail'
import trendAnalysis from '@/components/renmintj/trendAnalysis'
import institutionRanking from '@/components/renmintj/institutionRanking'
import institutionDetail from '@/components/renmintj/institutionDetail'
import compensation from '@/components/renmintj/compensation'
import documentQuality from '@/components/renmintj/documentQuality'
import regionalAnalysis from '@/components/renmintj/regionalAnalysis'
import loadingNumber from '@/components/renmintj/loadingNumber'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    redirect: {
      name: 'login'
    }
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
    path: '/modelTools',
    name: 'modelTools',
    component: modelTools
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
    path: '/peopleRanking',
    name: 'peopleRanking',
    component: peopleRanking
  }, {
    path: '/peoplePortrait/:id',
    name: 'peoplePortrait',
    component: peoplePortrait
  }, {
    path: '/businessNum/:type',
    name: 'businessNum',
    component: businessNum
  }, {
    path: '/importantEvent',
    name: 'importantEvent',
    component: importantEvent
  }, {
    path: '/eventDetail/:id',
    name: 'eventDetail',
    component: eventDetail
  }, {
    path: '/businessTypes',
    name: 'businessTypes',
    component: businessTypes
  }, {
    path: '/institutionRanking',
    name: 'institutionRanking',
    component: institutionRanking
  }, {
    path: '/institutionDetail/:id/:type',
    name: 'institutionDetail',
    component: institutionDetail
  }, {
    path: '/trendAnalysis',
    name: 'trendAnalysis',
    component: trendAnalysis
  }, {
    path: '/compensation',
    name: 'compensation',
    component: compensation
  }, {
    path: '/documentQuality',
    name: 'documentQuality',
    component: documentQuality
  }, {
    path: '/regionalAnalysis',
    name: 'regionalAnalysis',
    component: regionalAnalysis
  }, {
    path: '/loadingNumber',
    name: 'loadingNumber',
    component: loadingNumber
  }, {
    path: '*',
    component: moduleChoose
  }]
})

export default router
