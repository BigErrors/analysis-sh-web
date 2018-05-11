<template>
  <div id='mzhongdianjg' @click='changeRouter("mapApp")'></div>
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

<style>
 #mzhongdianjg{
   height: 100%;
   background: url('/static/mackpages/重点机构分析.png') no-repeat fixed top;
   background-size:  1920px 1080px;
 }
</style>
