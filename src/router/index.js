import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index4renmintj from '@/components/renmintj/index4renmintj5'
import peopleRanking from '@/components/renmintj/peopleRanking'
import peoplePortrait from '@/components/renmintj/peoplePortrait'
import businessNum from '@/components/renmintj/businessNum'
import businessTypes from '@/components/renmintj/businessTypes'
import eventDetail from '@/components/renmintj/eventDetail'
import trendAnalysis from '@/components/renmintj/trendAnalysis'
import institutionRanking from '@/components/renmintj/institutionRanking'
import institutionDetail from '@/components/renmintj/institutionDetail'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    redirect: {
      name: 'index4renmintj'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/index4renmintj',
    name: 'index4renmintj',
    component: index4renmintj
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
    path: '*',
    component: index4renmintj
  }]
})

export default router
