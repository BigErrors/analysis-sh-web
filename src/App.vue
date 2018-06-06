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
.el-cascader-menu{
background:rgba(1,24,84,0.98);
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
</style>
