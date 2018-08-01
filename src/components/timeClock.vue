<template>
  <span>{{time}}</span>
</template>

<script>
import jsonUtil from '@/util/jsonUtil'
export default {
  props: {
    dateType: {
      default: 'yyyy/MM/dd hh:mm:ss D',
      type: String
    }
  },
  data () {
    return {
      interval: '',
      time: ''
    }
  },
  computed: {},
  created () {
    let vue = this
    vue.interval = setInterval(function () {
      vue.time = jsonUtil.dateFormat(new Date(), vue.dateType)
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style>

</style>
