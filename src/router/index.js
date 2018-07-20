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
import importantEventDetail from '@/components/renmintj/importantEventDetail'
import trendAnalysis from '@/components/renmintj/trendAnalysis'
import institutionRanking from '@/components/renmintj/institutionRanking'
import compensation from '@/components/renmintj/compensation'
import documentQuality from '@/components/renmintj/documentQuality'
import regionalAnalysis from '@/components/renmintj/regionalAnalysis'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'moduleChoose',
    component: moduleChoose
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
    path: '*',
    component: moduleChoose
  }]
})

export default router
