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

  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/

  ::-webkit-scrollbar {
    width: 4px;
    background-color: rgba(0, 0, 0, 0);
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
    background-color: #434851;
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
    padding:0 6px;
    border-radius: 50%;
    width: 28px;
    height: 28px;
  }

  .el-pagination button:disabled {
    color: #FFFFFF !important;
    background-color: rgba(255, 255, 255, 0) !important;
    cursor: not-allowed !important;
    margin:0 15px;
  }

  .el-pagination__total {
    margin: 0 20px !important;
    font-weight: 400 !important;
    color: #FFFFFF !important;
  }

  /* 下拉框样式 */
  .el-cascader-menus {
    background: rgba(255,255,255,0) !important;
    border: 1px solid #30373e;
  }
  .el-cascader-menu {
    background: rgba(11,19,28,0.9) !important;
  }

  .el-cascader-menu__item.is-active {
    color: #f1f1f1 !important;
  }

  .el-cascader-menu__item:hover {
    background: #2e89fd;
    color: #f1f1f1;
  }

  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
    border-color: #30373e
  }

  /* 业务类型页面新 */

  .busiTypes_container .el-input--suffix .el-input__inner {
    font-size: 11px;
    font-family: HiraginoSansGB-W3;
    background: #0B131C;
    height: 28px;
    line-height: 26px;
    border: 1px solid #30373e;
  }

  .busiTypes_container .el-cascader__label {
    color: rgba(241, 241, 241, 0.4);
    font-size: 12px;
  }

  /* 机构排名新 */

  .institutionRanking_container .el-range-editor.el-input__inner {
    height: 30px;
    background: #0B131C;
    border-color: #30373e;
  }

  .institutionRanking_container .el-date-editor .el-range__icon {
    line-height: 23px;
  }

  .institutionRanking_container .el-date-editor .el-range-separator {
    line-height: 22px;
  }

  .institutionRanking_container .el-date-editor .el-range-input {
    background: #0B131C;
    color: rgba(241, 241, 241, 0.4);
  }

  .institutionRanking_container .el-date-editor .el-range-separator {
    color: rgba(241, 241, 241, 0.4);
  }

  .institutionRanking_container .el-input--suffix .el-input__inner {
    height: 28px;
    background: #0B131C;
    color: rgba(241, 241, 241, 0.4);
  }

  .institutionRanking_container .el-input--suffix .el-input__inner::-webkit-input-placeholder {
    color: rgba(241, 241, 241, 0.4);
    font-size: 12px;
  }

  .institutionRanking_container .el-cascader {
    height: 28px;
  }

  .institutionRanking_container .el-input__icon {
    line-height: 30px;
  }

  .institutionRanking_container .el-cascader__label {
    color: rgba(241, 241, 241, 0.4);
    font-size: 12px;
  }

  /* 人员排名新 */

  .pepleRanking_container .el-range-editor.el-input__inner {
    height: 30px;
    background: #0B131C;
    border-color: #30373e;
  }

  .pepleRanking_container .el-date-editor .el-range__icon {
    line-height: 23px;
  }

  .pepleRanking_container .el-date-editor .el-range-separator {
    line-height: 22px;
  }

  .pepleRanking_container .el-date-editor .el-range-input {
    background: #0B131C;
    color: rgba(241, 241, 241, 0.4);
  }

  .pepleRanking_container .el-date-editor .el-range-separator {
    color: rgba(241, 241, 241, 0.4);
  }

  .pepleRanking_container .el-input--suffix .el-input__inner {
    height: 28px;
    background: #0B131C;
    color: rgba(241, 241, 241, 0.4);
  }

  .pepleRanking_container .el-input--suffix .el-input__inner::-webkit-input-placeholder {
    color: rgba(241, 241, 241, 0.4);
    font-size: 12px;
  }

  .pepleRanking_container .el-cascader {
    height: 28px;
  }

  .pepleRanking_container .el-input__icon {
    line-height: 30px;
  }

  .pepleRanking_container .el-cascader__label {
    color: rgba(241, 241, 241, 0.4);
    font-size: 12px;
  }

  .el-date-editor .el-range__close-icon {
    display: none !important
  }

  /* 趋势分析新 */

  .trendAnalysis_container .el-range-editor.el-input__inner {
    height: 30px;
    background: #0B131C;
    border-color: #30373e;
  }

  .trendAnalysis_container .el-date-editor .el-range__icon {
    line-height: 23px;
  }

  .trendAnalysis_container .el-date-editor .el-range-separator {
    line-height: 22px;
  }

  .trendAnalysis_container .el-date-editor .el-range-input {
    background: #0B131C;
    color: rgba(241, 241, 241, 0.4);
  }

  .trendAnalysis_container .el-date-editor .el-range-separator {
    color: rgba(241, 241, 241, 0.4);
  }

  .trendAnalysis_container .el-input--suffix .el-input__inner {
    height: 28px;
    background: #0B131C;
    color: rgba(241, 241, 241, 0.4);
  }

  .trendAnalysis_container .el-input--mini {
    border: 1px solid #C5C5C5;
    border-radius: 2px;
  }

  .trendAnalysis_container .el-input--suffix .el-input__inner::-webkit-input-placeholder {
    color: rgba(241, 241, 241, 0.4);
    font-size: 12px;
  }

  .trendAnalysis_container .el-cascader {
    height: 28px;
  }

  .trendAnalysis_container .el-input__icon {
    line-height: 30px;
  }

  .trendAnalysis_container .el-cascader__label {
    color: rgba(241, 241, 241, 0.4);
    font-size: 12px;
  }

  /* 业务数量新 */

  .busiNum_container .el-input--suffix .el-input__inner {
    background: rgba(0, 0, 0, 0) !important;
    border: 0 !important;
  }

  .busiNum_container .el-cascader-menu__item {
    color: #ffffff !important;
  }

  .busiNum_container .el-cascader-menu__item:focus:not(:active),

  .busiNum_container .el-cascader__label {
    font-size: 32px;
    font-family: HiraginoSansGB-W3;
    color: #f1f1f1 !important;
  }

  .index_container .mapboxgl-popup {
    width: 220px;
    font-size: 12px;
    color: #FFFFFF;
    z-index: 999;
  }

  .index_container .mapboxgl-popup-content {
    padding: 15px 20px;
    background: rgba(0, 0, 0, 0.4);
  }

  .index_container .mapboxgl-popup-tip {
    border-top-color: rgba(0, 0, 0, 0.4);
  }

  .index_container .mapboxgl-popup-close-button {
    color: #FFFFFF;
    font-size: 16px;
    background-color: rgba(255, 0, 222, 0);
    border: 0;
    padding: 5;
  }
  .el-input__inner{
    border-color:#30373e
  }

</style>
