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

      /* 分页相关 */
  .ej-pagination .el-pager li.number,
  .ej-pagination .btn-prev,
  .ej-pagination .btn-next {
    border-radius: 50% !important;
  }

  .ej-pagination .el-pager li.number:not(.active),
  .ej-pagination .btn-prev,
  .ej-pagination .btn-next,
  .ej-pagination .el-icon-more {
    background-color: #0A133A !important;
    color:rgba(190,222,251,1);
  }
  .ej-pagination .el-pager li.number.active{
    background:rgba(21,123,211,1);
    color:rgba(254,254,254,1);
  }

  .ej-pagination .el-icon-more:before {
    font-size: 12px;
  }

  .ej-pagination .el-pagination {
    bottom: 40px;
    text-align: center;
    width: 100%;
    font-size: 12px !important;
    font-weight: 400;
  }
</style>
