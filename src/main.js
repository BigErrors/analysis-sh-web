// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import 'echarts-gl'
import echartsLiquidfill from 'echarts-liquidfill'
import echartsWordcloud from 'echarts-wordcloud'
import wordcloud from 'wordcloud'
import BaiduMap from 'vue-baidu-map'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$echarts.liquidfill = echartsLiquidfill
Vue.prototype.$echarts.wordcloud = echartsWordcloud
Vue.prototype.$wordcloud = wordcloud

Vue.use(ElementUI)

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
