<template>
<div id='peopleNum' class='shade'>
   <div class="totalType_header">
    <div class="totalType_back" @click="changeRouter('index4renmintj')" style="cursor: pointer;"></div>
  </div>
  <div class="totalType_nav">
    <span class="totalType_nav_span">首页 > 调解员属性分析</span>
  </div>
  <div class="totalType_nav2">
    <span class="totalType_nav2_span"  @click="changeRouter('totalNum')">数量分析</span>
    <span class="totalType_nav2_span active"  @click="changeRouter('totalType')">类型分析</span>
  </div>
  <div class="totalType_content">
    <div class="totalType_content_once">
      <div class="totalType_content_title">
        <div class=" totalType_content_title_left">
          <span class="totalType_content_span">类型</span>
        </div>
        <div class=" totalType_content_title_right">
          <span class=" totalType_content_span5">本周</span>
          <span class=" totalType_content_span5">本月</span>
          <span class=" totalType_content_span5 totalType_content_active">今年</span>
        </div>
      </div>
      <div class='zIndex3 area1 target1'></div>
      <div class="totalType_detail">
        <div class="totalType_detail_main">
          <div class="totalType_detail_title">民事纠纷</div>
          <div class="totalType_detail_content">
            <span class="totalType_detail_span1">邻里纠纷</span>
            <span class="totalType_detail_span2">34%</span>
          </div>
          <div class="totalType_detail_content">
            <span class="totalType_detail_span1">邻里纠纷</span>
            <span class="totalType_detail_span2">34%</span>
          </div>
          <div class="totalType_detail_content">
            <span class="totalType_detail_span1">邻里纠纷</span>
            <span class="totalType_detail_span2">34%</span>
          </div>
          <div class="totalType_detail_content">
            <span class="totalType_detail_span1">邻里纠纷</span>
            <span class="totalType_detail_span2">34%</span>
          </div>
          <div class="totalType_detail_content">
            <span class="totalType_detail_span1">邻里纠纷</span>
            <span class="totalType_detail_span2">34%</span>
          </div>
          <div class="totalType_detail_content">
            <span class="totalType_detail_span1">邻里纠纷</span>
            <span class="totalType_detail_span2">34%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="totalType_content_once">
      <div class="totalType_content_title">
        <span class="totalType_content_span">行专占比变化趋势</span>
        <div class="totalType_echarts_container1">
          <div class='zIndex3 area2 target2'></div>
        </div>
      </div>
    </div>
    <div class="totalType_content_once">
      <div class="totalType_content_title">
        <span class="totalType_content_span">来源分析</span>
        <div class='zIndex3 area3 target3'></div>
      </div>
    </div>
    <div class="totalType_content_once">
      <div class="totalType_content_title">
        <span class="totalType_content_span">来源变化趋势图</span>
      </div>
      <div class="totalType_echarts_container2">
          <div class='zIndex3 area2 target4'></div>
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
    },
    changeRouter (name) {
      this.$router.push({name: name})
    }
  },
  created () {},
  mounted () {
    this.draw('target1', eos.setPie2([{value: 82, name: '民事案件'}, {value: 9, name: '行政案件'}, {value: 4, name: '其他纠纷'}, {value: 4, name: '商事纠纷'}, {value: 1, name: '刑事案件'}]))
    this.draw('target2', eos.setLine4([[{name: '2015', value: 9}, {name: '2016', value: 12}, {name: '2017', value: 15}, {name: '2018', value: 52}]], 'percent'))
    this.draw('target3', eos.setFunnel([{value: 20, name: '信访', other: 1}, {value: 40, name: '其他', other: 1}, {value: 60, name: '主动调解', other: 1}, {value: 80, name: '公安移送', other: 1}, {value: 100, name: '当事人申请', other: 1}]))
    this.draw('target4', eos.setLine4([[{name: 2015, value: 76}, {name: 2016, value: 57}, {name: 2017, value: 58}, {name: 2018, value: 85}], [{name: 2015, value: 13}, {name: 2016, value: 33}, {name: 2017, value: 31}, {name: 2018, value: 3}], [{name: 2015, value: 12}, {name: 2016, value: 11}, {name: 2017, value: 11}, {name: 2018, value: 2}]], 'percent', ['当事人申请', '委托调解', '主动调解']))
  }
}
</script>

<style scoped>
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
    width: 501px;
    height: 389px;
  }

  .area2 {
    width: 900px;
    height: 370px;
  }

  .area3 {
    width: 700px;
    height: 389px;
    margin: 0 100px;
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
    width:921px;
    height:433px;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
    float:left;
  }
  .totalType_content_once:nth-of-type(2n){
    margin-left: 14px;
  }
   .totalType_content_once:nth-of-type(1){
     margin-bottom:14px;
   }
   .totalType_content_once:nth-of-type(2){
     margin-bottom:14px;
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
  .totalType_content_title_left{
    width: 50%;
    float: left;
    margin-top: 21px;
  }
  .totalType_content_span2{
    display:block;
    font-size:18px;
    font-family:MicrosoftYaHei;
    color:rgba(125,165,254,1);
    padding-left: 42px;
  }
  .totalType_content_title_right{
    width: 50%;
    float: right;
    margin-top:16px;
  }
  .totalType_content_span5{
    font-size:16px;
    font-family:MicrosoftYaHei;
    padding:2px 12px;
    float:right;
    border-radius:15px;
    margin-right:16px;
    color:rgba(153,153,153,1);
    cursor:pointer;
  }
  .totalType_content_active{
    color:rgba(255,255,255,1);
    background:rgba(77,132,254,1);
  }
  .totalType_content_span5:first-child{
    margin-right:38px;
  }
  .right2{
    margin-top:25px;
  }
  .totalType_detail{
    width:420px;
    height:389px;
    float:left;
    background:url("/static/renmintjOther/icon_directing.png");
    background-repeat:no-repeat;
    background-position:left center;
  }
  .totalType_detail_main{
    width:307px;
    height:264px;
    background:url('/static/renmintjOther/pic_frame.png');
    margin-top:67px;
    margin-left:56px;
  }
  .totalType_detail_title{
    height:34px;
    display:block;
    color:rgba(174,195,255,1);
    line-height:34px;
    font-size:20px;
    padding-left:8px;
    margin-bottom:2px;
  }
  .totalType_detail_content{
    height:38px;
    display:block;
    line-height:38px;
    margin:0 1px;
  }
  .totalType_detail_content:nth-of-type(2n){
    background:rgba(19,38,101,1);
  }
  .totalType_detail_span1{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(184,206,255,1);
    padding-left:61px;
    display:inline-block;
    width:70%;
    box-sizing:border-box;
  }
  .totalType_detail_span2{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,198,0,1);
    display:inline-block;
    width:25%;
  }
  .totalType_echarts_container1{
    width:900px;
    margin-left:28px;
    height:370px;
    margin-top:19px;
  }
  .totalType_echarts_container2{
    width:900px;
    height:370px;
    margin-top:19px;
    margin-left:28px;
  }

</style>
