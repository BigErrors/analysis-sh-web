<template>
  <div id='mzhongdiansj' @click='changeRouter("mapApp")'></div>
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
  #mzhongdiansj {
    height: 100%;
    background: url('/static/mackpages/重点事件分析.png') no-repeat fixed top;
    background-size: 1920px 1080px;
  }

</style>
