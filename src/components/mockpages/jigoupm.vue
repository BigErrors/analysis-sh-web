<template>
  <div id='mjigoupm' @click='changeRouter("index4renmintj")'></div>
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
 #mjigoupm{
   height: 100%;
   background: url('/static/mackpages/6机构排名.png');
   background-size:  1920px 1080px;
 }
</style>
