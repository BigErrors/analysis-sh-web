<template>
<div id='peoplePortrait' class='shade'>
  <div class="totalNum_header">
    <div class="totalNum_back"  @click="changeRouter('index4renmintj')" style="cursor: pointer;"></div>
  </div>
  <div class="totalNum_nav">
    <span class="totalNum_nav_span">首页 > 调解员画像分析 >详情</span>
  </div>
  <div class="totalNum_nav2">
    <span class="totalNum_nav2_span"  @click="changeRouter('peopleNum')">数量分析</span>
    <span class="totalNum_nav2_span"  @click="changeRouter('peopleType')">属性分析</span>
    <span class="totalNum_nav2_span active"  @click="changeRouter('peopleSearch')">画像分析</span>
  </div>
  <div class="totalNum_content">
   <div class="totalNum_content_left">
     <div class="totalNum_content_leftTitle1">
       <div class="totalNum_content_leftTitle1_name">{{renyuanxq.person[0].name}}</div>
       <div class="totalNum_content_leftTitle1_year">{{renyuanxq.person[0].gongzuonx}}</div>
       <div class="totalNum_content_leftTitle1_phone">{{renyuanxq.person[0].dianhauhm}}</div>
     </div>
     <div class="totalNum_content_leftTitle2">
       <div class="totalNum_content_leftTitle2_address">{{renyuanxq.person[0].tiaojiewyh}}</div>
     </div>
     <div class="totalNum_content_leftContent">
       <canvas  class="totalNum_content_leftContent1" width="184px" height="647px"></canvas>
     </div>
   </div>
   <div class="totalNum_content_right1">
     <div class="module">
       <div class="totalNum_content_rightTitle">整体概览</div>
       <div class="moduleContent">
         <div class="module1">
           <div class="module1Item"><span class="module1Num">{{renyuanxq.person[0].zhengti[0].value}}</span><br><span class="module1Title">{{renyuanxq.person[0].zhengti[0].name}}</span></div>
           <div class="module1Item"><span class="module1Num">{{renyuanxq.person[0].zhengti[1].value}}</span><br><span class="module1Title">{{renyuanxq.person[0].zhengti[1].name}}</span></div>
           <div class="module1Item"><span class="module1Num">{{renyuanxq.person[0].zhengti[2].value}}</span><br><span class="module1Title">{{renyuanxq.person[0].zhengti[2].name}}</span></div>
         </div>
       </div>
     </div>
     <div class="module">
       <div class="totalNum_content_rightTitle">类型对比</div>
       <div class="moduleContent module2"></div>
     </div>
     <div class="module">
       <div class="totalNum_content_rightTitle">综合能力</div>
       <div class="moduleContent module3"></div>
     </div>
   </div>
   <div class="totalNum_content_right2">
     <div class="totalNum_content_rightTitle">案件列表</div>
      <div class="moduleContent module4">
      <table class='totalNum_table' cellspacing='0'>
        <thead class="totalNum_table_thead">
        <tr>
          <td width="14.27%" class='td'>序号</td>
          <td width="14.27%" class='td'>案例名称</td>
          <td width="14.27%" class='td'>受理时间</td>
          <td width="14.27%" class='td'>结案时间</td>
          <td width="14.27%" class='td'>调节效率</td>
          <td width="14.27%" class='td'>文书质量</td>
          <td width="14.27%" class='td'>综合评分</td>
        </tr>
        </thead>
        <tbody class="totalNum_table_tbody">
        <tr v-for="(item,index) in renyuanxq.person[0].anjianlb" :key="index" v-if="index<=4">
          <td class='td'><span class="circle circle1" :class="'circle'+(index+1)">{{index+1}}</span></td>
          <td class='td'>{{item.mingcheng}}</td>
          <td class='td'>{{item.shoulisj}}</td>
          <td class='td'>{{item.jieansj}}</td>
          <td class='td'>{{item.tiaojielx}}</td>
          <td class='td'>{{item.wenshuzl}}</td>
          <td class='td'>{{item.zhonghepf}}</td>
        </tr>
        </tbody>
      </table>
      </div>
   </div>
  </div>
</div>
</template>

<script>
import eos from '@/util/echartsOptions'
import wos from '@/util/wordcloudOptions'
import renyuanxq from '@/../static/json/renmintj/huaxiangfx_renyuanxq'
export default {
  name: 'peoplePortrait',
  data () {
    return {
      renyuanxq: renyuanxq
    }
  },
  methods: {
    // 绘制echarts
    draw (domName, option) {
      let myChart = this.$echarts.init(document.getElementsByClassName(domName)[0])
      if (domName === 'totalNum_content_leftContent') {
        option.maskImage.onload = function () {
          myChart.setOption(option.option)
        }
      } else {
        myChart.setOption(option)
      }
    },
    changeRouter (name) {
      this.$router.push({name: name})
    },
    drawWordcloud () {
      let myChart = this.$echarts.init(document.getElementsByClassName('totalNum_content_leftContent')[0])
      let maskImage = new Image()
      maskImage.src = '/static/renmintjOther/pic_boy1.png'
      let option = eos.setWordcloud(renyuanxq.person[0].ciyun, maskImage)
      maskImage.onload = () => {
        myChart.setOption(option)
        myChart.on('click', function (params) {
          console.log(params.name)
        })
      }
    },
    drawWordcloud2 () {
      let option = wos.setOption(renyuanxq.person[0].ciyun.map((item) => {
        return [item.name, item.value * 10]
      }))
      let vue = this
      let ctx = document.getElementsByClassName('totalNum_content_leftContent1')[0].getContext('2d')
      let img = new Image()
      img.src = 'static/renmintjOther/pic_boy.png'
      img.onload = function () {
        ctx.drawImage(img, 0, 0)
        vue.$wordcloud(document.getElementsByClassName('totalNum_content_leftContent1')[0], option)
      }
    },
    drawWordcloud3 () {
      let option = wos.setOption(renyuanxq.person[0].ciyun.map((item) => {
        return [item.name, item.value * 10]
      }))
      this.$wordcloud(document.getElementsByClassName('totalNum_content_leftContent')[0], option)
    }
  },
  created () {},
  mounted () {
    this.draw('module2', eos.setBar3(renyuanxq.person[0].leixingdb, ['#1194F8', '#97D2FF'], 'horizon', 'integer', 21, 'portrait'))
    this.draw('module3', eos.setRadar2(renyuanxq.person[0].data, renyuanxq.person[0].indicator))
    // this.drawWordcloud()
    this.drawWordcloud2()
    // this.drawWordcloud3()
  }
}
</script>

<style scoped>
  #peoplePortrait {
    min-height: 1080px;
    min-width: 1920px;
    overflow-y: auto;
  }
  .shade {
    background-color: #0b1740;
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
  .clearfix:after{
    content:'';
    display:block;
    width:0;
    clear:both
  }
  .totalNum_content_left{
    float: left;
    width: 489px;
    height: 868px;
    margin-right: 13px;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
  }
  .totalNum_content_leftTitle1{
    height: 66px;
    margin-top: 32px;
    margin-left: 23px;
  }
  .totalNum_content_leftTitle1_name{
    float: left;
    background: url('/static/renmintjOther/pic_title_3.png') no-repeat;
    height: 66px;
    width: 195px;
    margin-right: 20px;
    line-height: 66px;
    font-size: 26px;
    color: #00DEFF;
    box-sizing:border-box;
    padding-left: 26px;
  }
  .totalNum_content_leftTitle1_year{
    float: left;
    background: url('/static/renmintjOther/pic_title_2.png') no-repeat;
    height: 23px;
    width: 68px;
    margin-top: 20px;
    margin-right: 10px;
    line-height: 23px;
    font-size: 16px;
    color: #FFFFFF;
    box-sizing:border-box;
    padding-left: 26px;
  }
  .totalNum_content_leftTitle1_phone{
    float: left;
    background: url('/static/renmintjOther/pic_title_4.png') no-repeat;
    height: 23px;
    width: 153px;
    margin-top: 20px;
    line-height: 23px;
    font-size: 16px;
    color: #FFFFFF;
    box-sizing:border-box;
    padding-left: 26px;
  }
  .totalNum_content_leftTitle2{
    height: 23px;
    margin-top: 15px;
    margin-left: 23px;
    line-height: 23px;
  }
  .totalNum_content_leftTitle2_address{
    background: url('/static/renmintjOther/pic_title_5.png') no-repeat;
    height: 23px;
    width: 452px;
    font-size: 16px;
    color: #FFFFFF;
    box-sizing:border-box;
    padding-left: 26px;
  }
  .totalNum_content_leftContent{
    background: url('/static/renmintjOther/pic_boy.png') no-repeat;
    height: 647px;
    width: 184px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 32px;
  }
  .totalNum_content_right1{
    float: left;
    width: 1360px;
    height: 430px;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
    margin-bottom: 10px;
  }
  .module {
    float: left;
    width: 446px;
    height: 430px;
  }
  .module:nth-child(2) {
    margin-left: 10px;
    margin-right: 10px;
  }
  .moduleContent{
    height: 340px;
  }
  .totalNum_content_right2{
    float: left;
    width: 1360px;
    height: 430px;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
    margin-bottom: 10px;
  }
  .totalNum_content_rightTitle{
    background: url('/static/renmintjOther/pic_title_1.png') no-repeat;
    height: 42px;
    width: 156px;
    margin-left: 28px;
    margin-top: 40px;
    color: #7EBCFD;
    font-size: 22px;
    line-height: 42px;
    padding-left: 20px;
  }
  .module1{
    background: url('/static/renmintjOther/pic_base_map.png') no-repeat;
    width: 280px;
    height: 290px;
    margin-left: 88px;
    margin-top: 20px;
  }
  .module1Item{
    float: left;
    text-align: center;
  }
  .module1Item:first-child{
    margin-left: 105px;
    margin-top: 75px;
  }
  .module1Item:nth-child(2){
    margin-left: 60px;
    margin-top: 40px;
  }
  .module1Item:nth-child(3){
    margin-left: 40px;
    margin-top: 40px;
  }
  .module1Num{
    font-size: 28px;
    color: #00E4FF;
  }
  .module1Title{
    font-size: 16px;
    color: #7EBCFD;
  }
  .totalNum_table{
    width: 100%;
    padding:28px 38px 0 38px;
    box-sizing:border-box;
    color:white;
  }
  .totalNum_table_thead td{
    font-size:18px;
    font-family:MicrosoftYaHei;
    color:rgba(77,132,254,1);
    line-height:42px;
    text-align:center;
     border-bottom:2px dashed rgba(16,54,165,1);
  }
  .totalNum_table_tbody{
    font-size:16px;
    font-family:MicrosoftYaHei;
    color:rgba(225,234,255,1);
    text-align:center;
  }
  .totalNum_table_tbody td{
    padding:15px 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .totalNum_table_tbody tr:nth-of-type(2n){
    background:rgba(19,38,101,1);
  }
  .circle{
    border-radius:100%;
    width:23px;
    height:23px;
    display:inline-block;
  }
  .circle1{
    background:rgba(255,105,126,1);
  }
  .circle2{
    background:rgba(251,178,74,1);
  }
  .circle3{
    background:rgba(111,155,253,1);
  }
  .circle4{
    background:rgba(205,205,205,0.5);
  }
  .circle5{
    background:rgba(205,205,205,0.5);
  }
</style>
