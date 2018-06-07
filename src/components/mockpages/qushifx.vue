<template>
  <div id='mqushifx' @click='changeRouter("index4renmintj")'></div>
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
 #mqushifx{
   height: 100%;
   background: url('/static/mackpages/3趋势分析.png');
   background-size:  1920px 1080px;
 }
</style>
