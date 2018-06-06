<template>
  <div id='totalNum' class='shade'>
    <div class="totalNum_header">
      <div class="totalNum_back" @click="changeRouter('index4renmintj')" style="cursor: pointer;"></div>
    </div>
    <div class="totalNum_nav">
      <span class="totalNum_nav_span">首页 > 业务数量</span>
    </div>
    <div class="totalNum_nav2">
      <span class="totalNum_nav2_span totalNum_nav2_span_active">人民调解</span>
      <span class="totalNum_nav2_span">110联动</span>
      <span class="totalNum_nav2_span">公共法律服务</span>
      <span class="totalNum_nav2_span">纠纷排查</span>
    </div>
    <div class="totalNum_content">
      <div class="totalNum_content_top">
        <div class="statistics">
          <digitalRolling class="num" :height='41' :width='20' :number='jinrixz' :fontSize='41' :fontColor='"#1194F8"'></digitalRolling>
          <br>
          <span class="title">今日新增</span>
        </div>
        <div class="statistics">
          <digitalRolling class="num" :height='41' :width='20' :number='quannianlj' :fontSize='41' :fontColor='"#1194F8"'></digitalRolling>
          <br>
          <span class="title">全年累计</span>
        </div>
      </div>
      <div class="totalNum_content_top">
        <div class="totalNum_content_title">
          <div class=" totalNum_content_title_left">
            <span class="totalNum_content_span1">类型</span>
          </div>
          <div class=" totalNum_content_title_right">
            <span class=" totalNum_content_span5" @click='changeTypeData("week",$event)'>本周</span>
            <span class=" totalNum_content_span5" @click='changeTypeData("month",$event)'>本月</span>
            <span class=" totalNum_content_span5 totalNum_content_active" @click='changeTypeData("year",$event)'>今年</span>
          </div>
        </div>
        <div class='target2'></div>
        <div class="totalNum_detail">
          <div class="totalNum_detail_main">
            <div class="totalNum_detail_title">{{leixinfx2Title}}</div>
            <div class="totalNum_detail_content" v-for="(item,index) in leixinfx2" :key="index">
              <span class="totalNum_detail_span1">{{item.xiaolei}}</span>
              <span class="totalNum_detail_span2">{{item.xiaoleivalue}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="totalNum_content_top">
        <div class="totalNum_content_title clearfix">
          <div class="totalNum_content_title_left">
            <span class="totalNum_content_span1">案件处理状态</span>
          </div>
        </div>
        <div class="target3"></div>
      </div>
      <div class="totalNum_content_bottom">
        <div class="totalNum_content_title clearfix">
          <div class="totalNum_content_title_left">
            <span class="totalNum_content_span1">各区案件数量</span>
          </div>
        </div>
        <div class="target4"></div>
      </div>
      <div class="totalNum_content_bottom">
        <div class="totalNum_content_title clearfix">
          <div class="totalNum_content_title_left">
            <span class="totalNum_content_span1">案件来源分布</span>
          </div>
        </div>
        <div class="target5"></div>
      </div>
      <div class="totalNum_content_bottom">
        <div class="totalNum_content_title clearfix">
          <div class="totalNum_content_title_left">
            <span class="totalNum_content_span1">待办申请案件</span>
          </div>
        </div>
        <div class='renmintj_center_table'>
          <div class="renmintj_table_thead">
            <span class='td'>类型</span>
            <span class='td'>行政区</span>
            <span class='td'>申请日期</span>
            <span class='td'>简述</span>
          </div>
          <rollScreen :dLength='table.dLength' :height='33' :lineNum='table.lineNum' class="renminttj_table_body">
            <div class="renmintj_table_tr" slot="slide" v-for="(item, index) in table.zhongdiansj" :key="index">
              <span class='td'>{{item.shijianlx}}</span>
              <span class='td'>{{item.diqu}}</span>
              <span class='td'>{{item.riqi}}</span>
              <span class='td'>{{item.jianshu}}</span>
            </div>
          </rollScreen>
        </div>
      </div>
    </div>

</div>
</template>

<script>
import eos from '@/util/echartsOptions'
import http from '@/util/httpUtil'
import rollScreen from '../rollScreen.vue'
import digitalRolling from '../digitalRolling.vue'
import leixinfx1 from '@/../static/json/renmintj/tiaojieaj_leixinfx_1'
import leixinfx2 from '@/../static/json/renmintj/tiaojieaj_leixinfx_2'
import gequxztjy from '@/../static/json/renmintj/tiaojieslxfx_gequxztjy'
import xuelilx from '@/../static/json/renmintj/tiaojieysxfx_xuelilx'

export default {
  name: 'totalNum',
  components: {
    rollScreen,
    digitalRolling
  },
  data () {
    return {
      myChart: {},
      table: {
        zhongdiansj: [],
        dLength: 0,
        lineNum: 0
      },
      timer: '',
      jinrixz: 32,
      quannianlj: 65432,
      leixinfx2Title: '',
      leixinfx2: []
    }
  },
  methods: {
    // 绘制echarts
    draw (domName, option) {
      if (this.myChart[domName]) {
        this.$echarts.dispose(this.myChart[domName])
      }
      this.myChart[domName] = this.$echarts.init(document.getElementsByClassName(domName)[0])
      this.myChart[domName].setOption(option)
      if (domName === 'target2') {
        let vue = this
        this.myChart[domName].on('click', function (params) {
          vue.changeType2Data(params.name)
        })
      }
    },
    changeNum () {
      let _this = this
      this.timer = setInterval(function () {
        _this.jinrixz = parseInt(Math.random() * 90) + 10
        _this.quannianlj = parseInt(Math.random() * 90000) + 10000
      }, 5000)
    },
    changeRouter (name) {
      this.$router.push({name: name})
    },
    changeTypeData (type, event) {
      document.getElementsByClassName('totalNum_content_span5')[0].className = 'totalNum_content_span5'
      document.getElementsByClassName('totalNum_content_span5')[1].className = 'totalNum_content_span5'
      document.getElementsByClassName('totalNum_content_span5')[2].className = 'totalNum_content_span5'
      event.target.className = 'totalNum_content_span5 totalNum_content_active'
      this.timetype = type
      this.leixinfx2Title = '民事纠纷'
      this.draw('target2', eos.setPie2(leixinfx1.filter((item) => {
        if (item.timetype === type) { return true }
      })))
      this.leixinfx2 = leixinfx2.filter((item) => {
        if (item.timetype === type && item.dalei === '民事纠纷') { return true }
      })
    },
    changeType2Data (type) {
      this.leixinfx2Title = type
      this.leixinfx2 = leixinfx2.filter((item) => {
        if (item.timetype === this.timetype && item.dalei === type) { return true }
      })
    },
    getData () {
      let vue = this
      let reqParam = {}
      let url = ''
      url = '/peopleMediate/zdsj'
      http.get(url, reqParam, (data) => {
        [vue.table.dLength, vue.table.lineNum, vue.table.zhongdiansj] = [data.length, 6, data]
      })
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.changeNum()
    this.draw('target2', eos.setPie2(leixinfx1.filter((item) => {
      if (item.timetype === 'year') { return true }
    })))
    this.leixinfx2Title = '民事纠纷'
    this.leixinfx2 = leixinfx2.filter((item) => {
      if (item.timetype === 'year' && item.dalei === '民事纠纷') { return true }
    })
    this.draw('target3', eos.setBar3(gequxztjy.reverse(), ['#FF9C00', '#F8E228'], 'vertical', 'integer'))
    this.draw('target4', eos.setBar3(gequxztjy.reverse().slice(0, 10), ['#4D84FE', '#B3CAFF'], 'hortizon', 'integer'))
    this.draw('target5', eos.setPie3(xuelilx))
  }
}
</script>

<style scoped>
  #totalNum {
    min-height: 1080px;
    min-width: 1920px;
    overflow-y: auto;
  }
  .shade {
    background: url('/static/renmintj/pic_bg.png');
    background-repeat:no-repeat;
    background-position:center;
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
    width: 6em;
    text-align: center;
    cursor:pointer;
    color:rgba(94,126,203,1);
  }
  .totalNum_nav2_span_active{
    color:rgba(255,198,0,1);
    border-bottom: 3px solid rgba(255,198,0,1);
  }
  .totalNum_content{
    width: 100%;
    height: 903px;
    box-sizing: border-box;
    padding: 13px 20px 20px 20px;
  }
  .totalNum_content_top{
    width: 974px;
    height: 483px;
    float: left;
    margin-bottom: 14px;
    margin-right: 14px;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
  }
  .totalNum_content_top:nth-of-type(1){
    width: 266px;
    margin-right: 0px;
  }
  .totalNum_content_top:nth-of-type(3){
    width: 622px;
    margin-right: 0px;
  }
  .totalNum_content_bottom{
    width: 614px;
    height: 371px;
    float: left;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
    margin-right: 14px;
  }
  .totalNum_content_bottom:nth-of-type(6){
    width: 622px;
    margin-right: 0px;
  }
  .target2{
    float: left;
    width: 400px;
    height: 371px;
  }
  .target3{
    width: 100%;
    height: 401px;
  }
  .target4,.target5,.target6{
    width: calc(100% - 20px);
    height: 320px;
    padding: 0 10px;
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
    margin-top: 26px;
  }
  .totalNum_content_span_container{
    float:right;
    padding-left:79px;
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
  .totalNum_detail{
    width:420px;
    height:389px;
    float:left;
    background:url("/static/renmintjOther/icon_directing.png");
    background-repeat:no-repeat;
    background-position:left center;
  }
  .totalNum_detail_main{
    width:307px;
    height:264px;
    background:url('/static/renmintjOther/pic_frame.png');
    margin-top:67px;
    margin-left:56px;
    max-height: 264px;
    overflow-y: auto;
  }
  .totalNum_detail_main::-webkit-scrollbar{
    width: 4px;
    background-color: #ffffff;
  }
  .totalNum_detail_main::-webkit-scrollbar-thumb{
    background:#ebeaee;
    border-radius:4px;
  }
  .totalNum_detail_title{
    height:34px;
    display:block;
    color:rgba(174,195,255,1);
    line-height:34px;
    font-size:20px;
    padding-left:8px;
    margin-bottom:2px;
  }
  .totalNum_detail_content{
    height:38px;
    display:block;
    line-height:38px;
    margin:0 1px;
  }
  .totalNum_detail_content:nth-of-type(2n){
    background:rgba(19,38,101,1);
  }
  .totalNum_detail_span1{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(184,206,255,1);
    padding-left:61px;
    display:inline-block;
    width:70%;
    box-sizing:border-box;
  }
  .totalNum_detail_span2{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,198,0,1);
    display:inline-block;
    width:25%;
  }
  .statistics{
    width: 200px;
    height: 60px;
    padding-left: 40px;
  }
  .statistics:nth-of-type(1){
    padding-top: 140px;
  }
  .statistics:nth-of-type(2){
    padding-top: 60px;
  }
  .statistics::before{
    width: 44px;
    height: 51px;
    content: url('/static/renmintj/icon_document.png');
    padding-right: 10px;
  }
  .statistics .num {
    display: inline-block;
  }
  .statistics .title {
    display: inline-block;
    color: #AAADB6;
    font-size: 16px;
    line-height: 16px;
    padding-left: 54px;
  }
  .renmintj_center_table {
    width: 100%;
    padding:0 24px;
    box-sizing:border-box;
    font-size:14px;
  }
  .renmintj_center_table div{
    width: 100%;
    height: 33px;
  }
  .renmintj_center_table div span {
    float: left;
    display: block;
    width: 25%;
    line-height:33px;
    text-align: center;
    color:rgba(118,187,239,1);
  }
  .renmintj_table_thead{
    color:rgba(17,148,248,1);
    line-height:42px;
  }
  .renmintj_table_tr:nth-of-type(2n-1){
    background: rgba(7,30,74,0.8)
  }
</style>
