<template>
  <div id='market' @click='changeRouter("moduleChoose")'></div>
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
 #market{
   height: 100%;
   background: url('/static/marketImages/market.png') no-repeat fixed top;
   background-size:  1920px 1080px;
 }
</style>
