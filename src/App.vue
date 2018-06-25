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
  body::-webkit-scrollbar {
    width: 4px;
    background-color: #ffffff;
  }

  html,
  body::-webkit-scrollbar-thumb {
    background: #ebeaee;
    border-radius: 4px;
  }

  #App {
    height: 100%;
  }

  /* 去除百度地图左下角内容 */

  .BMap_cpyCtrl {
    display: none;
  }

  .anchorBL {
    display: none;
  }

  .el-cascader__label {
    font-size: 16px;
    font-family: HiraginoSansGB-W3;
    color: rgba(94, 126, 203, 1);
    border-radius: 2px;
  }

  .el-input--suffix .el-input__inner::-webkit-input-placeholder {
    color: rgba(94, 126, 203, 1) !important;
  }

  .el-input--suffix .el-input__inner {
    background: rgba(8, 79, 211, 0.2) !important;
    font-size: 16px !important;
    border: rgba(123, 149, 246, 0.98) !important;
  }

  .el-cascader-menu {
    background: rgba(1, 24, 84, 0.98) !important;
  }

  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/

  ::-webkit-scrollbar {
    width: 4px;
    background-color: rgba(1, 24, 84, 1);
  }

  /*定义滚动条轨道 内阴影+圆角*/

  ::-webkit-scrollbar-track {
    border-radius: 2px;
    background-color: transparent;
  }

  /*定义滑块 内阴影+圆角*/

  ::-webkit-scrollbar-thumb {
    height: 4px;
    border-radius: 2px;
    background-color: #dedfe0;
  }

  .clearfix:after {
    content: '';
    display: block;
    width: 0;
    clear: both
  }

  .businessNumCityList .el-input--suffix .el-input__inner {
    background: rgba(8, 79, 211, 0) !important;
    border: 0 !important;
  }

  .businessNumCityList .el-cascader__label {
    font-size: 35px !important;
    color: #FDC91C !important;
  }

  .el-table {
    background: rgba(0, 0, 0, 0) !important;
  }

  .el-table::before {
    height: 0 !important;
  }
  .el-table th{
    color: #7EBCFD !important;
  }
  .el-table tr{
    color: #DFF1FF !important;
  }
  .el-table th, .el-table tr {
    background: rgba(0, 0, 0, 0) !important;
  }

  .el-table tr:nth-of-type(2n){
    background: rgba(7,30,74,0.8) !important;
  }

  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background: rgba(0, 0, 0, 0) !important;
  }

  .el-table td {
    text-align: center !important;
    border-bottom: 1px !important;
  }
   .el-table th.is-leaf {
    text-align: center !important;
    border-bottom: 1px dashed #D5D1D1 !important;
  }

  .el-table td .cell {
    text-overflow: ellipsis !important;
    overflow: hidden !important;
    white-space: nowrap !important;
  }

  ::-webkit-scrollbar{
    width: 6px !important;
    background-color: rgba(1, 24, 84, 0) !important;
  }
  ::-webkit-scrollbar-thumb {
    height: 20px !important;
    border-radius: 2px !important;
    background-color: #dedfe0 !important;
  }

  .el-pagination {
    color: #FFFFFF !important;
  }
  .el-pager li {
    background: rgba(255, 255, 255, 0) !important;
  }
  .el-pagination .btn-next, .el-pagination .btn-prev{
    background: center center no-repeat rgba(255, 255, 255, 0) !important;
    border: 1px solid #BDBDBD !important;
    border-radius: 28px !important;
  }
  .el-pager li.active {
    color: #FEFEFE !important;
    cursor: default !important;
    border-radius: 28px !important;
    background: #409EFF !important;
  }
  .el-pagination .btn-next, .el-pagination .btn-prev {
    color: #FFFFFF !important;
  }
  .el-pagination button:disabled {
    color: #FFFFFF !important;
    background-color: rgba(255, 255, 255, 0) !important;
    cursor: not-allowed !important;
  }
  .el-pagination__total {
    margin: 0 20px !important;
    font-weight: 400 !important;
    color: #FFFFFF !important;
  }
</style>
