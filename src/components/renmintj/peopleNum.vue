<template>
<div id='peopleNum' class='shade'>
  <div class="totalNum_header">
    <div class="totalNum_back"  @click="changeRouter('index4renmintj')" style="cursor: pointer;"></div>
  </div>
  <div class="totalNum_nav">
    <span class="totalNum_nav_span">首页 > 调解案件</span>
  </div>
  <div class="totalNum_nav2">
    <span class="totalNum_nav2_span active"  @click="changeRouter('peopleNum')">数量分析</span>
    <span class="totalNum_nav2_span"  @click="changeRouter('peopleType')">属性分析</span>
    <span class="totalNum_nav2_span"  @click="changeRouter('peopleSearch')">画像分析</span>
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
      <div class='area1 target1'></div>
    </div>
    <div class="totalNum_content_top">
      <div class="totalNum_content_title clearfix">
        <div class="totalNum_content_title_left">
          <span class="totalNum_content_span1">历年新增人员趋势</span>
        </div>
        <div class="totalNum_content_title_right">
          <div class="totalNum_content_span_container bg1">
            <span class="totalNum_content_span3">354人</span>
            <span class="totalNum_content_span4">新增人员（今年）</span>
          </div>
        </div>
      </div>
      <div class='area1 target2'></div>
    </div>
    <div class="totalNum_content_bottom">
      <div class="totalNum_content_title clearfix">
        <div class="totalNum_content_title_left">
          <span class="totalNum_content_span1">各区调解员人数</span>
        </div>
      </div>
      <div class='area2 target3'></div>
    </div>
    <div class="totalNum_content_bottom">
      <div class="totalNum_content_title clearfix">
        <div class="totalNum_content_title_left">
          <span class="totalNum_content_span1">各区新增调解员</span>
        </div>
      </div>
      <div class='area2 target4'></div>
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
    this.draw('target1', eos.setLine4([[{name: '2015', value: 9}, {name: '2016', value: 12}, {name: '2017', value: 15}, {name: '2018', value: 52}]], 'percent'))
    this.draw('target2', eos.setLine4([[{name: '2015', value: 9}, {name: '2016', value: 12}, {name: '2017', value: 15}, {name: '2018', value: 52}]], 'percent'))
    this.draw('target3', eos.setBar3([{ value: 131, name: '虹口' }, { value: 175, name: '长宁' }, { value: 209, name: '静安' }, { value: 232, name: '普陀' }, { value: 234, name: '金山' }, { value: 252, name: '黄埔' }, { value: 279, name: '杨浦' }, { value: 321, name: '青浦' }, { value: 325, name: '嘉定' }, { value: 351, name: '奉贤' }, { value: 364, name: '松江' }, { value: 375, name: '浦东' }, { value: 423, name: '崇明' }, { value: 447, name: '宝山' }, { value: 496, name: '徐汇' }, { value: 631, name: '闵行' }], ['#4D84FE', '#B3CAFF'], 'horizon', 'integer'))
    this.draw('target4', eos.setBar3([{ value: 27, name: '虹口' }, { value: 27, name: '长宁' }, { value: 17, name: '静安' }, { value: 22, name: '普陀' }, { value: 14, name: '金山' }, { value: 16, name: '黄埔' }, { value: 19, name: '杨浦' }, { value: 27, name: '青浦' }, { value: 24, name: '嘉定' }, { value: 29, name: '奉贤' }, { value: 21, name: '松江' }, { value: 8, name: '浦东' }, { value: 17, name: '崇明' }, { value: 30, name: '宝山' }, { value: 24, name: '徐汇' }, { value: 23, name: '闵行' }], ['#FF9C00', '#F8E228'], 'horizon', 'integer'))
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

  .area1 {
    float: left;
    width: 929px;
    height: 270px;
  }

  .area2 {
    float: left;
    width: 929px;
    height: 436px;
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
