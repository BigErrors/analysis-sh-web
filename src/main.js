// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import liquidfill from 'echarts-liquidfill'
import BaiduMap from 'vue-baidu-map'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$echarts.liquidfill = liquidfill

Vue.use(BaiduMap, {
  ak: 'ADGWqzwMFscPinh5G8sxGIS4609KHzsV'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
