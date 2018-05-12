<template>
  <div id='App'>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  },
  watch: {},
  computed: {},
  filters: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>

<style>
  html,
  body {
    margin: 0px;
    height: 100%;
    width: 100%;
    /* min-height: 1080px; */
    min-width: 1920px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  html,
  body::-webkit-scrollbar{
    width: 4px;
    background-color: #ffffff;
  }

  html,
  body::-webkit-scrollbar-thumb{
    background:#ebeaee;
    border-radius:4px;
  }

  #App {
    height: 100%;
  }
</style>
