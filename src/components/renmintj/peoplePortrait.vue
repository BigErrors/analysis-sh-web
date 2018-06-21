<template>
<div id='peoplePortrait' class='shade'>
  <div class="peoplePortrait_header">
    <div class="peoplePortrait_back"  @click="changeRouter('index4renmintj')"></div>
  </div>
  <div class="peoplePortrait_nav">
    <span class="peoplePortrait_nav_span">首页 > 调解员画像分析 >详情</span>
  </div>
  <div class="peoplePortrait_nav2">
    <span class="peoplePortrait_nav2_span"  @click="changeRouter('peopleNum')">数量分析</span>
    <span class="peoplePortrait_nav2_span"  @click="changeRouter('peopleType')">属性分析</span>
    <span class="peoplePortrait_nav2_span active"  @click="changeRouter('peopleSearch')">画像分析</span>
  </div>
  <div class="peoplePortrait_content">
   <div class="peoplePortrait_content_left">
     <div class="peoplePortrait_content_leftTitle1">
       <div class="peoplePortrait_content_leftTitle1_name">{{detail.name}}</div>
       <div class="peoplePortrait_content_leftTitle1_year">{{detail.year + '年'}}</div>
       <div class="peoplePortrait_content_leftTitle1_phone">{{detail.phone}}</div>
     </div>
     <div class="peoplePortrait_content_leftTitle2">
       <div class="peoplePortrait_content_leftTitle2_address" :title='detail.address'>{{detail.address}}</div>
     </div>
     <div class="peoplePortrait_content_leftContent" :style="{background:background}">
       <canvas  class="peoplePortrait_content_leftContent_canvas" width="184px" height="647px"></canvas>
     </div>
   </div>
   <div class="peoplePortrait_content_right1">
     <div class="module">
       <div class="peoplePortrait_content_rightTitle">整体概览</div>
       <div class="moduleContent">
         <div class="module1">
           <div class="module1Item" v-for="(item,index) in detail.info" :key="index"><span class="module1Num">{{item.value}}</span><br><span class="module1Title">{{item.name}}</span></div>
         </div>
       </div>
     </div>
     <div class="module">
       <div class="peoplePortrait_content_rightTitle">类型对比</div>
       <div class="moduleContent module2"></div>
     </div>
     <div class="module">
       <div class="peoplePortrait_content_rightTitle">综合能力</div>
       <div class="moduleContent module3"></div>
     </div>
   </div>
   <div class="peoplePortrait_content_right2">
     <div class="peoplePortrait_content_rightTitle">案件列表</div>
      <div class="moduleContent module4">
          <div class='renmintj_center_table'>
            <div class="renmintj_table_thead">
              <span class='td'>序号</span>
              <span class='td'>案例名称</span>
              <span class='td'>受理时间</span>
              <span class='td'>结案时间</span>
              <span class='td'>调解效率</span>
              <span class='td'>文书质量</span>
              <span class='td'>综合评分</span>
            </div>
            <rollScreen :dLength='table.dLength' :height='42' :lineNum='table.lineNum' class="renminttj_table_body">
              <div class="renmintj_table_tr" slot="slide" v-for="(item, index) in table.list" :key="index">
               <span class='td' >{{item.xuhao}}</span>
               <span class='td'>{{item.mingcheng}}</span>
               <span class='td'>{{item.shoulisj}}</span>
               <span class='td'>{{item.jieansj}}</span>
               <span class='td'>{{item.tiaojielx}}</span>
               <span class='td'>{{item.wenshuzl}}</span>
               <span class='td'>{{item.zhonghepf}}</span>
              </div>
            </rollScreen>
          </div>
      </div>
   </div>
  </div>
</div>
</template>

<script>
import eos from '@/util/echartsOptions'
import wos from '@/util/wordcloudOptions'
import http from '@/util/httpUtil'
import rollScreen from '../rollScreen.vue'

export default {
  name: 'peoplePortrait',
  components: {
    rollScreen
  },
  data () {
    return {
      detail: {
        name: '',
        year: '',
        phone: '',
        address: ''
      },
      table: {
        dLength: 0,
        lineNum: 0,
        list: []
      },
      background: ''
    }
  },
  methods: {
    // 绘制echarts
    draw (domName, option) {
      let myChart = this.$echarts.init(document.getElementsByClassName(domName)[0])
      if (domName === 'peoplePortrait_content_leftContent') {
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
    drawWordcloud2 (data, type) {
      data = data.map((item, index) => {
        return [item.name, parseInt(item.value)]
      })
      let option = wos.setOption(data)
      let vue = this
      let ctx = document.getElementsByClassName('peoplePortrait_content_leftContent_canvas')[0].getContext('2d')
      vue.background = type === '女' ? 'url(/static/renmintjOther/pic_girl1.png) no-repeat' : 'url(/static/renmintjOther/pic_boy1.png) no-repeat'
      let img = new Image()
      img.src = type === '女' ? '/static/renmintjOther/pic_girl2.png' : '/static/renmintjOther/pic_boy2.png'
      img.onload = function () {
        ctx.drawImage(img, 0, 0)
        vue.$wordcloud(document.getElementsByClassName('peoplePortrait_content_leftContent_canvas')[0], option)
      }
    },
    getData () {
      let vue = this
      let reqParam = {id: this.$route.params.id}
      let url = ''
      url = '/peopleMediate/portrait/detail'
      http.get(url, reqParam, (data) => {
        [vue.detail.name, vue.detail.year, vue.detail.phone, vue.detail.address, vue.detail.gender, vue.detail.info, vue.table.dLength, vue.table.list, vue.table.lineNum] =
         [data.name, data.gongzuonx, data.dianhauhm, data.tiaojiewyh, data.gender, data.zhengti, data.anjianlb.length, data.anjianlb, 7]
        vue.$nextTick(function () {
          vue.draw('module2', eos.setBar3(data.leixingdb.reverse(), ['#1194F8', '#97D2FF'], 'horizon', 'integer', 21, 'portrait'))
          vue.draw('module3', eos.setRadar2(data.data_polt, data.indicator))
          vue.drawWordcloud2(data.ciyun, data.gender)
        })
      }, 'application/json')
    }
  },
  created () {
    this.getData()
  },
  mounted () {
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
    background: url('/static/renmintj/pic_bg.png');
    background-repeat:no-repeat;
    background-position:center;
  }
  .peoplePortrait_header{
    width: 100%;
    min-width: 1920px;
    height: 87px;
    background: url('/static/renmintj/pic_title.png');
    background-repeat:no-repeat;
    background-position:center;
    z-index: 99;
    position:relative;
  }
  .peoplePortrait_back{
    background:url('/static/renmintj/btn_back.png');
    position:absolute;
    left:22px;
    width:137px;
    height: 35px;
    background-position: center;
    top: 28px;
    cursor:pointer;
  }
  .peoplePortrait_nav{
    height: 24px;
    margin:6px 0 20px 0;
    padding-left: 34px;
    width: 100%;
    box-sizing: border-box;
  }
  .peoplePortrait_nav_span{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(94,126,203,1);
  }
  .peoplePortrait_nav2{
    margin-left: 34px;
    border-bottom: 1px solid rgba(15,59,186,1);
    display: inline-block;
  }
  .peoplePortrait_nav2_span{
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
  .peoplePortrait_content{
    width: 100%;
    height: 903px;
    box-sizing: border-box;
    padding: 13px 24px 24px 24px;
  }
  .peoplePortrait_content_left{
    float: left;
    width: 489px;
    height: 868px;
    margin-right: 13px;
    background: rgba(0,33,129,0.3);
  }
  .peoplePortrait_content_leftTitle1{
    height: 66px;
    margin-top: 32px;
    margin-left: 23px;
  }
  .peoplePortrait_content_leftTitle1_name{
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
  .peoplePortrait_content_leftTitle1_year{
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
  .peoplePortrait_content_leftTitle1_phone{
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
  .peoplePortrait_content_leftTitle2{
    height: 23px;
    margin-top: 15px;
    margin-left: 23px;
    line-height: 23px;
  }
  .peoplePortrait_content_leftTitle2_address{
    background: url('/static/renmintjOther/pic_title_5.png') no-repeat;
    height: 23px;
    width: 452px;
    font-size: 16px;
    color: #FFFFFF;
    box-sizing:border-box;
    padding-left: 26px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .peoplePortrait_content_leftContent{
    width: 184px;
    height: 647px;
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
  }

  .peoplePortrait_content_right1{
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
  .peoplePortrait_content_right2{
    float: left;
    width: 1360px;
    height: 430px;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
    margin-bottom: 10px;
  }
  .peoplePortrait_content_rightTitle{
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
  .renmintj_center_table {
    width: 100%;
    padding:0 24px;
    box-sizing:border-box;
    font-size:16px;
  }
  .renmintj_center_table div{
    width: 100%;
    height: 42px;
  }
  .renmintj_center_table div span {
    float: left;
    display: block;
    width: 14.2%;
    line-height:42px;
    text-align: center;
    color:rgba(118,187,239,1);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
 .renmintj_table_thead{
    color:rgba(17,148,248,1);
  }
  .renmintj_table_tr span{
    color: #DFF1FF !important;
  }
  .renmintj_table_tr:nth-of-type(2n-1){
    background: rgba(7,30,74,0.8)
  }
</style>
