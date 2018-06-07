<template>
  <div id='mrenmintj' @click='changeRouter("mapApp")'></div>
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
 #mrenmintj{
   height: 100%;
   background: url('/static/mackpages/人民调解.png');
   background-size:  1920px 1080px;
 }
</style>
