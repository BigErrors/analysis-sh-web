<template>
  <div id='m110' @click='changeRouter("mapApp")'></div>
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
   background: url('/static/mackpages/110联动.png');
 }
</style>
