<template>
  <div id='mfalvzx' @click='changeRouter("mapApp")'></div>
</template>

<script>
export default {
  methods: {
    changeRouter (name) {
      this.$router.push({name: name})
    }
  }
}
</script>

<style scoped>
 #mfalvzx{
   height: 100%;
   background: url('/static/mackpages/法律咨询服务.png');
   background-size:  1920px 1080px;
 }
</style>
