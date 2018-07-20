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

  .index_container .el-cascader__label {
    font-size: 32px !important;
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
    padding: 0 6px !important;
    border-radius: 50% !important;
    width: 28px !important;
    height: 28px !important;
  }

  .el-pagination button:disabled {
    color: #FFFFFF !important;
    background-color: rgba(255, 255, 255, 0) !important;
    cursor: not-allowed !important;
    margin: 0 15px !important;
  }

  .el-pagination__total {
    margin: 0 20px !important;
    font-weight: 400 !important;
    color: #FFFFFF !important;
  }

  /* 下拉框样式 */

  .el-cascader-menus {
    background: rgba(255, 255, 255, 0) !important;
    border: 1px solid #30373e !important;
  }

  .el-cascader-menu {
    background: rgba(11, 19, 28, 0.9) !important;
  }

  .el-cascader-menu__item.is-active {
    color: #f1f1f1 !important;
  }

  .el-cascader-menu__item:hover {
    background: #2e89fd !important;
    color: #f1f1f1 !important;
  }

  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
    border-color: #30373e !important;
  }

  /* 业务类型页面新 */

  .busiTypes_container .el-input--suffix .el-input__inner {
    font-size: 11px !important;
    background: #0B131C !important;
    height: 28px !important;
    line-height: 26px !important;
    border: 1px solid #30373e !important;
  }

  .busiTypes_container .el-cascader__label {
    color: rgba(241, 241, 241, 0.4) !important;
    font-size: 12px !important;
  }

  /* 机构排名新 */

  .institutionRanking_container .el-range-editor.el-input__inner {
    height: 30px !important;
    background: #0B131C !important;
    border-color: #30373e !important;
  }

  .institutionRanking_container .el-date-editor .el-range__icon {
    line-height: 23px !important;
  }

  .institutionRanking_container .el-date-editor .el-range-separator {
    line-height: 22px !important;
  }

  .institutionRanking_container .el-date-editor .el-range-input {
    background: #0B131C !important;
    color: rgba(241, 241, 241, 0.4) !important;
  }

  .institutionRanking_container .el-date-editor .el-range-separator {
    color: rgba(241, 241, 241, 0.4) !important;
  }

  .institutionRanking_container .el-input--suffix .el-input__inner {
    height: 28px !important;
    background: #0B131C !important;
    color: rgba(241, 241, 241, 0.4) !important;
  }

  .institutionRanking_container .el-input--suffix .el-input__inner::-webkit-input-placeholder {
    color: rgba(241, 241, 241, 0.4) !important;
    font-size: 12px !important;
  }

  .institutionRanking_container .el-cascader {
    height: 28px !important;
  }

  .institutionRanking_container .el-input__icon {
    line-height: 30px !important;
  }

  .institutionRanking_container .el-cascader__label {
    color: rgba(241, 241, 241, 0.4) !important;
    font-size: 12px !important;
  }

  /* 人员排名新 */

  .pepleRanking_container .el-range-editor.el-input__inner {
    height: 30px !important;
    background: #0B131C !important;
    border-color: #30373e !important;
  }

  .pepleRanking_container .el-date-editor .el-range__icon {
    line-height: 23px !important;
  }

  .pepleRanking_container .el-date-editor .el-range-separator {
    line-height: 22px !important;
  }

  .pepleRanking_container .el-date-editor .el-range-input {
    background: #0B131C !important;
    color: rgba(241, 241, 241, 0.4) !important;
  }

  .pepleRanking_container .el-date-editor .el-range-separator {
    color: rgba(241, 241, 241, 0.4) !important;
  }

  .pepleRanking_container .el-input--suffix .el-input__inner {
    height: 28px !important;
    background: #0B131C !important;
    color: rgba(241, 241, 241, 0.4) !important;
  }

  .pepleRanking_container .el-input--suffix .el-input__inner::-webkit-input-placeholder {
    color: rgba(241, 241, 241, 0.4) !important;
    font-size: 12px !important;
  }

  .pepleRanking_container .el-cascader {
    height: 28px !important;
  }

  .pepleRanking_container .el-input__icon {
    line-height: 30px !important;
  }

  .pepleRanking_container .el-cascader__label {
    color: rgba(241, 241, 241, 0.4) !important;
    font-size: 12px !important;
  }

  .el-date-editor .el-range__close-icon {
    display: none !important;
  }

  /* 趋势分析新 */

  .trendAnalysis_container .el-range-editor.el-input__inner {
    height: 30px !important;
    background: #0B131C !important;
    border-color: #30373e !important;
  }

  .trendAnalysis_container .el-date-editor .el-range__icon {
    line-height: 23px !important;
  }

  .trendAnalysis_container .el-date-editor .el-range-separator {
    line-height: 22px !important;
  }

  .trendAnalysis_container .el-date-editor .el-range-input {
    background: #0B131C !important;
    color: rgba(241, 241, 241, 0.4) !important;
  }

  .trendAnalysis_container .el-date-editor .el-range-separator {
    color: rgba(241, 241, 241, 0.4) !important;
  }

  .trendAnalysis_container .el-input--suffix .el-input__inner {
    height: 28px !important;
    background: #0B131C !important;
    color: rgba(241, 241, 241, 0.4) !important;
  }

  .trendAnalysis_container .el-input--mini {
    border: 1px solid #C5C5C5 !important;
    border-radius: 2px !important;
  }

  .trendAnalysis_container .el-input--suffix .el-input__inner::-webkit-input-placeholder {
    color: rgba(241, 241, 241, 0.4) !important;
    font-size: 12px !important;
  }

  .trendAnalysis_container .el-cascader {
    height: 28px !important;
  }

  .trendAnalysis_container .el-input__icon {
    line-height: 30px !important;
  }

  .trendAnalysis_container .el-cascader__label {
    color: rgba(241, 241, 241, 0.4) !important;
    font-size: 12px !important;
  }

  /* 业务数量新 */

  .busiNum_container .el-input--suffix .el-input__inner {
    background: rgba(0, 0, 0, 0) !important;
    border: 0 !important;
  }

  .busiNum_container .el-cascader-menu__item {
    color: #FFFFFF !important;
  }

  .busiNum_container .el-cascader-menu__item:focus:not(:active),
  .busiNum_container .el-cascader__label {
    font-size: 32px !important;
    color: #F1F1F1 !important;
  }

  .index_container .mapboxgl-popup {
    min-width: 210px !important;
    max-width: 15.5% !important;
    font-size: 12px !important;
    color: #FFFFFF !important;
    z-index: 999 !important;
  }

  .index_container .mapboxgl-popup-content {
    padding: 15px 20px !important;
    background: rgba(0, 0, 0, 0.4) !important;
  }

  .index_container .mapboxgl-popup-tip {
    border-top-color: rgba(0, 0, 0, 0.4) !important;
  }

  .index_container .mapboxgl-popup-close-button {
    color: #FFFFFF !important;
    font-size: 16px !important;
    background-color: rgba(255, 0, 222, 0) !important;
    border: 0 !important;
    padding: 5px !important;
  }

  /* 区域分析新 */

  .regional_container .el-range-editor.el-input__inner {
    height: 30px !important;
    background: #0B131C !important;
    border-color: #C5C5C5 !important;
  }

  .regional_container .el-date-editor .el-range__icon {
    line-height: 23px !important;
  }

  .regional_container .el-date-editor .el-range-separator {
    line-height: 22px !important;
  }

  .regional_container .el-date-editor .el-range-input {
    background: #0B131C !important;
    color: rgba(241, 241, 241, 0.4) !important;
  }

  .regional_container .el-date-editor .el-range-separator {
    color: rgba(241, 241, 241, 0.4) !important;
  }

  .regional_container .el-input--suffix .el-input__inner {
    height: 28px !important;
    background: #0B131C !important;
    color: rgba(241, 241, 241, 0.4) !important;
  }

  .regional_container .el-input--mini {
    border: 1px solid #C5C5C5 !important;
    border-radius: 2px !important;
  }

  .regional_container .el-input--suffix .el-input__inner::-webkit-input-placeholder {
    color: rgba(241, 241, 241, 0.4) !important;
    font-size: 12px !important;
  }

  .regional_container .el-cascader {
    height: 28px !important;
  }

  .regional_container .el-input__icon {
    line-height: 30px !important;
  }

  .regional_container .el-cascader__label {
    color: rgba(241, 241, 241, 0.4) !important;
    font-size: 12px !important;
  }

  /* 赔偿金额 */

  .compensation_container .el-range-editor.el-input__inner {
    height: 30px !important;
    background: #0B131C !important;
    border-color: #C5C5C5 !important;
  }

  .compensation_container .el-date-editor .el-range__icon {
    line-height: 23px !important;
  }

  .compensation_container .el-date-editor .el-range-separator {
    line-height: 22px !important;
  }

  .compensation_container .el-date-editor .el-range-input {
    background: #0B131C !important;
    color: rgba(241, 241, 241, 0.4) !important;
  }

  .compensation_container .el-date-editor .el-range-separator {
    color: rgba(241, 241, 241, 0.4) !important;
  }

  .compensation_container .el-input--suffix .el-input__inner {
    height: 28px !important;
    background: #0B131C !important;
    color: rgba(241, 241, 241, 0.4) !important;
  }

  .compensation_container .el-input--mini {
    border: 1px solid #C5C5C5 !important;
    border-radius: 2px !important;
  }

  .compensation_container .el-input--suffix .el-input__inner::-webkit-input-placeholder {
    color: rgba(241, 241, 241, 0.4) !important;
    font-size: 12px !important;
  }

  .compensation_container .el-cascader {
    z-index:1 !important;
    height:28px !important;
    line-height:28px !important;
    font-size:12px !important;
    width:120px !important;
  }

  .compensation_container .el-input__icon {
    line-height: 30px !important;
  }

  .compensation_container .el-cascader__label {
    color: rgba(241, 241, 241, 0.4) !important;
    font-size: 12px !important;
  }

  /* 模型工具 */

  .el-carousel__arrow {
    border: 2px solid #f1f1f1 !important;
  }

  .hide {
    display: none;
  }
  .show {
    display: block;
  }

</style>
