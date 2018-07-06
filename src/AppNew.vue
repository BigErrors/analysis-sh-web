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
    min-width:1366px;
    min-height: 766px;
  }
  .el-loading-parent--relative{
    position: static!important;
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
    background-color: rgba(255,255,255,0) !important;
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
  /* 去除百度地图左下角内容 */
  .BMap_cpyCtrl {
    display: none;
  }
  .anchorBL{
    display:none;
  }
.el-cascader__label{
font-size:16px;
font-family:HiraginoSansGB-W3;
color:rgba(94,126,203,1);
border-radius: 2px;
}
.el-input--suffix .el-input__inner::-webkit-input-placeholder{
color:rgba(94,126,203,1);
}
.el-input--suffix .el-input__inner{
background:rgba(8,79,211,0.2);
font-size:16px;
border: rgba(123,149,246,0.98);
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
  width: 4px;
  background-color: rgba(1,24,84,1);
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
  border-radius: 2px;
  background-color: transparent;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
  height: 4px;
  border-radius: 2px;
  background-color: #dedfe0;
}

.clearfix:after{
    content:'';
    display:block;
    width:0;
    clear:both
}

  .businessNumCityList .el-input--suffix .el-input__inner {
    background: rgba(8,79,211,0) !important;
    border: 0 !important;
  }
  .businessNumCityList .el-cascader__label {
    font-size: 35px !important;
    color: #FFF225 !important;
  }
  .index_container .el-cascader__label {
    font-size:32px;
    font-family:HiraginoSansGB-W3;
    color: #FFF225 !important;
  }

  /* 新的首页 */
  .index_container .el-input--suffix .el-input__inner {
    background: rgba(0,0,0,0) !important;
    border: 0 !important;
  }
  .el-cascader-menu{
    background: rgba(0,0,0,0.98)!important;
  }
  .el-cascader-menu__item.is-active{
    color: #FFF225 !important;
  }
  .index_container .el-cascader-menu__item{
    color: #ffffff !important;
  }
  .index_container .el-cascader-menu__item:focus:not(:active), .el-cascader-menu__item:hover{
    background:#FFF225!important;
    color:#ffffff !important;
  }
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  .el-cascader-menu::-webkit-scrollbar
  {
    width: 4px;
    background-color: rgba(0,0,0,1)!important;
  }
  /* 业务类型页面新 */
  .busiTypes_container .el-input--suffix .el-input__inner{
    font-size:11px;
    font-family:HiraginoSansGB-W3;
    color:rgba(219,228,255,1);
    height: 28px;
    line-height: 26px;
    border:1px solid #157BD3;
  }

  /* 机构排名新 */
  .institutionRanking_container .el-range-editor.el-input__inner{
    height: 30px;
    background: rgba(8,79,211,1);
    border-color: #7B95F6;
  }
  .institutionRanking_container .el-date-editor .el-range__icon{
    line-height: 23px;
  }
  .institutionRanking_container .el-date-editor .el-range-separator{
    line-height: 22px;
  }
  .institutionRanking_container .el-date-editor .el-range-input{
    background: rgba(8,79,211,1);
    color: #5E7ECB;
  }
  .institutionRanking_container .el-input--suffix .el-input__inner{
    height: 30px;
    background: rgba(8,79,211,1);
    color: #5E7ECB;
  }
  .institutionRanking_container .el-input__icon{
    line-height: 30px;
  }
  /* 人员排名新 */
  .pepleRanking_container .el-range-editor.el-input__inner{
    height: 30px;
    background: rgba(8,79,211,1);
    border-color: #7B95F6;
  }
  .pepleRanking_container .el-date-editor .el-range__icon{
    line-height: 23px;
  }
  .pepleRanking_container .el-date-editor .el-range-separator{
    line-height: 22px;
  }
  .pepleRanking_container .el-date-editor .el-range-input{
    background: rgba(8,79,211,1);
    color: #5E7ECB;
  }
  .pepleRanking_container .el-input--suffix .el-input__inner{
    height: 30px;
    background: rgba(8,79,211,1);
    color: #5E7ECB;
  }
  .pepleRanking_container .el-input__icon{
    line-height: 30px;
  }
  .el-date-editor .el-range__close-icon{
    display: none!important
  }
  /* 趋势分析新 */
  .trendAnalysis_container .el-range-editor.el-input__inner{
    height: 30px;
    background: rgba(8,79,211,1);
    border-color: #7B95F6;
  }
  .trendAnalysis_container .el-date-editor .el-range__icon{
    line-height: 23px;
  }
  .trendAnalysis_container .el-date-editor .el-range-separator{
    line-height: 22px;
  }
  .trendAnalysis_container .el-date-editor .el-range-input{
    background: rgba(8,79,211,1);
    color: #5E7ECB;
  }
  .trendAnalysis_container .el-input--suffix .el-input__inner{
    height: 30px;
    background: rgba(8,79,211,1);
    color: #5E7ECB;
  }
  .trendAnalysis_container .el-input__icon{
    line-height: 30px;
  }
</style>
