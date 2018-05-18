<template>
<div id='peopleNum' class='shade'>
  <div v-show="false" class='zIndex3 area1 target1'></div>
  <div v-show="false" class='zIndex3 area1 target2'></div>
  <div v-show="false" class='zIndex3 area2 target3'></div>
  <div v-show="false" class='zIndex3 area2 target4'></div>
   <div class="totalType_header">
    <div class="totalType_back"></div>
  </div>
  <div class="totalType_nav">
    <span class="totalType_nav_span">首页 > 调解案件</span>
  </div>
  <div class="totalType_nav2">
    <span class="totalType_nav2_span ">数量分析</span>
    <span class="totalType_nav2_span active">类型分析</span>
  </div>
  <div class="totalType_content">
    <div class="totalType_content_once">
      <div class="totalType_content_title">
        <span class="totalType_content_span">类型</span>
      </div>
    </div>
    <div class="totalType_content_once">
      <div class="totalType_content_title">
        <span class="totalType_content_span">行专占比变化趋势</span>
      </div>
    </div>
    <div class="totalType_content_once">
      <div class="totalType_content_title">
        <span class="totalType_content_span">来源分析</span>
      </div>
    </div>
    <div class="totalType_content_once">
      <div class="totalType_content_title">
        <span class="totalType_content_span">来源变化趋势图</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import eos from '@/util/echartsOptions'
export default {
  name: 'peopleNum',
  data () {
    return {}
  },
  methods: {
    // 绘制echarts
    draw (domName, option) {
      let myChart = this.$echarts.init(document.getElementsByClassName(domName)[0])
      myChart.setOption(option)
    }
  },
  created () {},
  mounted () {
    this.draw('target1', eos.setPie2([{value: 82, name: '民事案件'}, {value: 9, name: '行政案件'}, {value: 4, name: '其他纠纷'}, {value: 4, name: '商事纠纷'}, {value: 1, name: '刑事案件'}]))
    this.draw('target2', eos.setLine4(([[{name: 2015, value: 9}, {name: 2016, value: 12}, {name: 2017, value: 15}, {name: 2018, value: 52}]])))
  }
}
</script>

<style scope>
  #peopleNum {
    min-height: 1080px;
    min-width: 1920px;
    overflow-y: auto;
  }
  .shade {
    background-color: #0b1740;
  }

  .zIndex3 {
    z-index: 3;
  }

  .area1 {
    float: left;
    width: 929px;
    height: 558px;
  }

  .area2 {
    float: left;
    width: 929px;
    height: 304px;
  }
  .totalType_header{
    width: 100%;
    min-width: 1920px;
    height: 87px;
    background: url('/static/renmintj/pic_title.png');
    background-repeat:no-repeat;
    background-position:center;
    z-index: 99;
    position:relative;
  }
  .totalType_back{
    background:url('/static/renmintj/btn_back.png');
    position:absolute;
    left:22px;
    width:137px;
    height: 35px;
    background-position: center;
    top: 28px;
    cursor:pointer;
  }
  .totalType_nav{
    height: 24px;
    margin:6px 0 20px 0;
    padding-left: 34px;
    width: 100%;
    box-sizing: border-box;
  }
  .totalType_nav_span{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(94,126,203,1);
  }
  .totalType_nav2{
    margin-left: 34px;
    border-bottom: 1px solid rgba(15,59,186,1);
    display: inline-block;
  }
  .totalType_nav2_span{
    font-size:20px;
    font-family:HiraginoSansGB-W3;
    padding-bottom: 10px;
    display: inline-block;
    width: 5em;
    text-align: center;
    cursor:pointer;
    color:rgba(94,126,203,1);
  }
  .active{
    color:rgba(255,198,0,1);
    border-bottom: 3px solid rgba(255,198,0,1);
  }
  .totalType_content{
    width: 100%;
    height: 903px;
    box-sizing: border-box;
    padding: 13px 24px 24px 24px;
  }
  .totalType_content_once{
    width:929px;
    height:439px;
    background: linear-gradient( rgba(0,33,129,1),rgba(0,33,129,0));
    float:left;
  }
  .totalType_content_once:nth-of-type(2n){
    margin-left: 14px;
  }
  .totalType_content_title{
    display:block;
    margin-top: 21px;
  }
  .totalType_content_span{
    font-size:22px;
    font-family:MicrosoftYaHei;
    color:rgba(125,165,254,1);
    padding-left: 8px;
    margin-left: 28px;
    border-left: 3px solid rgba(125,165,254,1);
    display:block;
  }
</style>
