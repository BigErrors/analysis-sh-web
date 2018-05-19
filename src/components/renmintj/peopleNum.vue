<template>
<div id='peopleNum' class='shade'>
  <div v-show="false" class='zIndex3 area1 target1'></div>
  <div v-show="false" class='zIndex3 area1 target2'></div>
  <div v-show="false" class='zIndex3 area2 target3'></div>
  <div v-show="false" class='zIndex3 area2 target4'></div>
  <div class="totalNum_header">
    <div class="totalNum_back"></div>
  </div>
  <div class="totalNum_nav">
    <span class="totalNum_nav_span">首页 > 调解案件</span>
  </div>
  <div class="totalNum_nav2">
    <span class="totalNum_nav2_span active">数量分析</span>
    <span class="totalNum_nav2_span">属性分析</span>
    <span class="totalNum_nav2_span">画像分析</span>
  </div>
  <div class="totalNum_content">
    <div class="totalNum_content_top">
      <div class="totalNum_content_title clearfix">
        <div class="totalNum_content_title_left">
          <span class="totalNum_content_span1">调解员人数变化趋势</span>
        </div>
        <div class="totalNum_content_title_right">
          <div class="totalNum_content_span_container bg1">
            <span class="totalNum_content_span3">5245人</span>
            <span class="totalNum_content_span4">调解员总数</span>
          </div>
        </div>
      </div>
    </div>
    <div class="totalNum_content_top"></div>
    <div class="totalNum_content_bottom"></div>
    <div class="totalNum_content_bottom"></div>
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
    this.draw('target1', eos.setLine3([{month: '2017-10', num: 199}, {month: '2017-11', num: 194}, {month: '2017-12', num: 165}, {month: '2018-01', num: 78}, {month: '2018-02', num: 104}, {month: '2018-03', num: 7}]))
    this.draw('target2', eos.setBar3([{value: 0, name: '松江'}, {value: 0, name: '浦东'}, {value: 1, name: '普陀'}, {value: 3, name: '奉贤'}, {value: 6, name: '虹口'}, {value: 6, name: '长宁'}, {value: 6, name: '崇明'}, {value: 6, name: '金山'}, {value: 7, name: '嘉定'}, {value: 14, name: '闵行'}, {value: 16, name: '宝山'}, {value: 16, name: '黄浦'}, {value: 18, name: '青浦'}, {value: 26, name: '徐汇'}, {value: 27, name: '静安'}, {value: 37, name: '杨浦'}], ['#4D84FE', '#B3CAFF'], 'horizon', 'integer'))
    this.draw('target4', eos.setBar3([{value: 57, name: '2015年'}, {value: 2847, name: '2016年'}, {value: 2504, name: '2017年'}, {value: 189, name: '2018年'}], ['#FF9C00', '#F8E228'], 'vertical', 'integer', '标题', '更新时间', 25))
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
  .totalNum_header{
    width: 100%;
    min-width: 1920px;
    height: 87px;
    background: url('/static/renmintj/pic_title.png');
    background-repeat:no-repeat;
    background-position:center;
    z-index: 99;
    position:relative;
  }
  .totalNum_back{
    background:url('/static/renmintj/btn_back.png');
    position:absolute;
    left:22px;
    width:137px;
    height: 35px;
    background-position: center;
    top: 28px;
    cursor:pointer;
  }
  .totalNum_nav{
    height: 24px;
    margin:6px 0 20px 0;
    padding-left: 34px;
    width: 100%;
    box-sizing: border-box;
  }
  .totalNum_nav_span{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(94,126,203,1);
  }
  .totalNum_nav2{
    margin-left: 34px;
    border-bottom: 1px solid rgba(15,59,186,1);
    display: inline-block;
  }
  .totalNum_nav2_span{
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
  .totalNum_content{
    width: 100%;
    height: 903px;
    box-sizing: border-box;
    padding: 13px 24px 24px 24px;
  }
   .totalNum_content_top{
    width: 929px;
    height: 367px;
    float: left;
    margin-bottom: 14px;
    background: linear-gradient( rgba(0,33,129,1),rgba(0,33,129,0));
  }
  .totalNum_content_top:first-child{
    margin-right: 14px;
  }
  .totalNum_content_bottom{
    width: 929px;
    height: 506px;
    float: left;
    background: linear-gradient( rgba(0,33,129,1),rgba(0,33,129,0));
  }
  .totalNum_content_bottom:last-child{
    margin-left: 14px;
  }
  .totalNum_content_title{
    width: 100%;
    color: white;
  }
  .totalNum_content_title_left{
    width: 50%;
    float: left;
    margin-top: 21px;
  }
  .totalNum_content_span1{
    font-size:22px;
    font-family:MicrosoftYaHei;
    color:rgba(125,165,254,1);
    padding-left: 8px;
    margin-left: 28px;
    border-left: 3px solid rgba(125,165,254,1);
    display:block;
  }
  .totalNum_content_span2{
    display:block;
    font-size:18px;
    font-family:MicrosoftYaHei;
    color:rgba(125,165,254,1);
    padding-left: 42px;
  }
  .totalNum_content_title_right{
    width: 50%;
    float: right;
    margin-top:16px;
  }
  .totalNum_content_span_container{
    float:right;
    padding-left:79px;
  }
  .bg1{
    background:url("/static/renmintjOther/icon_user.png");
    background-repeat:no-repeat;
    background-position:left center;
  }
  .totalNum_content_span3{
    font-size:38px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,198,0,1);
    display:block;
    text-align:center;
    padding-right:40px;
  }
  .totalNum_content_span4{
    font-size:16px;
    font-family:HiraginoSansGB-W3;
    color:rgba(77,132,254,1);
    display:block;
    text-align:center;
    padding-right:40px;
  }
  .totalNum_content_span5{
    font-size:16px;
    font-family:MicrosoftYaHei;
    padding:2px 12px;
    float:right;
    border-radius:15px;
    margin-right:16px;
    color:rgba(153,153,153,1);
    cursor:pointer;
  }
  .totalNum_content_active{
    color:rgba(255,255,255,1);
    background:rgba(77,132,254,1);
  }
  .totalNum_content_span5:first-child{
    margin-right:38px;
  }
  .right2{
    margin-top:25px;
  }
</style>
