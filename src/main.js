// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import 'echarts-gl'
import wordcloud from 'wordcloud'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'mapbox-gl/dist/mapbox-gl.css'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$wordcloud = wordcloud

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
