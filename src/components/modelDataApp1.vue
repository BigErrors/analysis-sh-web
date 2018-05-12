<template>
  <div id='dataApp' @click='changeRouter("moduleChoose")'></div>
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
 #dataApp{
   height: 100%;
   background: url('/static/dataAppImages/dataApp.png') no-repeat fixed top;
   background-size:  1920px 1080px;
 }
</style>
