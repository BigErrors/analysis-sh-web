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
    overflow-y: auto;
    overflow-x: hidden;
    min-width: 1366px;
    min-height: 766px;
  }

  .el-loading-parent--relative{
    position: static!important;
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

  .index_container .el-cascader__label {
    font-size: 32px;
    font-family: HiraginoSansGB-W3;
    color: #FFF225 !important;
  }

  .index_container .el-input--suffix .el-input__inner {
    background: rgba(0, 0, 0, 0) !important;
    border: 0 !important;
  }

  .el-cascader-menu {
    background: rgba(0, 0, 0, 0.98) !important;
  }

  .el-cascader-menu__item.is-active {
    color: #FFF225 !important;
  }

  .el-cascader-menu__item {
    color: #ffffff !important;
  }

  .el-cascader-menu__item:focus:not(:active),
  .el-cascader-menu__item:hover {
    background: #FFF225 !important;
    color: #ffffff !important;
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

  .el-table th {
    color: #7EBCFD !important;
  }

  .el-table tr {
    color: #DFF1FF !important;
  }

  .el-table th,
  .el-table tr {
    background: rgba(0, 0, 0, 0) !important;
  }

  .el-table tr:nth-of-type(2n) {
    background: rgba(19, 24, 33, 1) !important;
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

  ::-webkit-scrollbar {
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

  .el-pagination .btn-next,
  .el-pagination .btn-prev {
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

  .el-pagination .btn-next,
  .el-pagination .btn-prev {
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

  /* 业务类型页面新 */

  .busiTypes_container .el-input--suffix .el-input__inner {
    font-size: 11px;
    font-family: HiraginoSansGB-W3;
    color: rgba(219, 228, 255, 1);
    height: 28px;
    line-height: 26px;
    border: 1px solid #157BD3;
  }

  /* 机构排名新 */

  .institutionRanking_container .el-range-editor.el-input__inner {
    height: 30px;
    background: rgba(8, 79, 211, 0.3);
    border-color: #7B95F6;
  }

  .institutionRanking_container .el-date-editor .el-range__icon {
    line-height: 23px;
  }

  .institutionRanking_container .el-date-editor .el-range-separator {
    line-height: 22px;
  }

  .institutionRanking_container .el-date-editor .el-range-input {
    background: rgba(8, 79, 211, 0);
    color: #5E7ECB;
  }

  .institutionRanking_container .el-input--suffix .el-input__inner {
    height: 30px;
    background: rgba(8, 79, 211, 0.3);
    color: #5E7ECB;
  }

  .institutionRanking_container .el-input__icon {
    line-height: 30px;
  }

  /* 人员排名新 */

  .pepleRanking_container .el-range-editor.el-input__inner {
    height: 30px;
    background: rgba(8, 79, 211, 0.3);
    border-color: #7B95F6;
  }

  .pepleRanking_container .el-date-editor .el-range__icon {
    line-height: 23px;
  }

  .pepleRanking_container .el-date-editor .el-range-separator {
    line-height: 22px;
  }

  .pepleRanking_container .el-date-editor .el-range-input {
    background: rgba(8, 79, 211, 0);
    color: #5E7ECB;
  }

  .pepleRanking_container .el-input--suffix .el-input__inner {
    height: 30px;
    background: rgba(8, 79, 211, 0.3);
    color: #5E7ECB;
  }

  .pepleRanking_container .el-input__icon {
    line-height: 30px;
  }

  .el-date-editor .el-range__close-icon {
    display: none !important
  }
  /* 趋势分析新 */

  .trendAnalysis_container .el-input--suffix .el-input__inner {
    height: 30px;
    background: rgba(8, 79, 211, 0.3);
    color: #5E7ECB;
  }
  .trendAnalysis_container .el-input__icon{
    line-height: 30px;
  }
</style>
