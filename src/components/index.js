import sidenav from './sidenav.vue'
import timeClock from './timeClock.vue'
export default {
  install: function (vue) {
    vue.component('sidenav', sidenav)
    vue.component('timeClock', timeClock)
  }
}
