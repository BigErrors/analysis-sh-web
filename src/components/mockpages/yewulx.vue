<template>
  <div id='m110' @click='changeRouter("index4renmintj")'></div>
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
 #m110{
   height: 100%;
   background: url('/static/mackpages/2业务类型.png');
   background-size:  1920px 1080px;
 }
</style>
