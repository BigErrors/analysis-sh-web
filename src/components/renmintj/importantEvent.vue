<template>
<div id='importantEvent' class='shade'>
  <div class="importantEvent_header">
    <div class="importantEvent_back"  @click="changeRouter('index4renmintj')" style="cursor: pointer;"></div>
  </div>
  <div class="importantEvent_nav">
    <span class="importantEvent_nav_span">首页 > 重点事件</span>
  </div>
  <div class="importantEvent_content">
    <div class="importantEvent_content_top clearfix">
      <div class="statistics"><digitalRolling class="num" :height='41' :width='25' :number='jinrixz' :fontSize='41' :fontColor='"#1194F8"'></digitalRolling><br><span class="title">今日新增</span></div>
      <div class="cutLine"></div>
      <div class="statistics"><digitalRolling class="num" :height='41' :width='25' :number='quannianlj' :fontSize='41' :fontColor='"#1194F8"'></digitalRolling><br><span class="title">全年累计</span></div>
    </div>
    <div class="importantEvent_content_top">
      <div class="importantEvent_content_title clearfix">
        <div class="importantEvent_content_title_left">
          <span class="importantEvent_content_span1">重点事件变化趋势</span>
        </div>
      </div>
      <div class="target2"></div>
    </div>
    <div class="importantEvent_content_top">
      <div class="importantEvent_content_title clearfix">
        <div class="importantEvent_content_title_left">
          <span class="importantEvent_content_span1">重点事件变化来源</span>
        </div>
      </div>
      <div class="target3"></div>
    </div>
    <div class="importantEvent_content_middle">
      <div class="importantEvent_content_title clearfix">
        <div class="importantEvent_content_title_left">
          <span class="importantEvent_content_span1">重点事件处理状态</span>
        </div>
      </div>
      <div class="target4"></div>
    </div>
    <div class="importantEvent_content_middle">
      <div class="importantEvent_content_title clearfix">
        <div class="importantEvent_content_title_left">
          <span class="importantEvent_content_span1">新增重点事件变化</span>
        </div>
      </div>
      <div class="target5"></div>
    </div>
    <div class="importantEvent_content_middle">
      <div class="importantEvent_content_title clearfix">
        <div class="importantEvent_content_title_left">
          <span class="importantEvent_content_span1">重点事件类型</span>
        </div>
      </div>
      <div class="target6"></div>
    </div>
    <div class="importantEvent_content_bottom">
      <div class="importantEvent_content_title clearfix">
        <div class="importantEvent_content_title_left">
          <span class="importantEvent_content_span1">各区重点事件</span>
        </div>
      </div>
      <div class="target7"></div>
    </div>
    <div class="importantEvent_content_bottom">
      <div class="importantEvent_content_title clearfix">
        <div class="importantEvent_content_title_left">
          <span class="importantEvent_content_span1">重点事件</span>
        </div>
      </div>
      <div class='renmintj_center_table target8'>
        <div class="renmintj_table_thead">
          <span class='td num'>序号</span>
          <span class='td'>分类</span>
          <span class='td'>行政区</span>
          <span class='td'>日期</span>
          <span class='td'>描述</span>
          <span class='td'>状态</span>
          <span class='td detail'>操作</span>
        </div>
        <rollScreen :dLength='table.dLength' :height='33' :lineNum='table.lineNum' class="renminttj_table_body">
          <div class="renmintj_table_tr" slot="slide" v-for="(item, index) in table.zhongdiansj" :key="index">
            <span class='td num'>{{item.xuhao}}</span>
            <span class='td'>{{item.shijianlx}}</span>
            <span class='td'>{{item.diqu}}</span>
            <span class='td'>{{item.riqi}}</span>
            <span class='td'>{{item.jianshu}}</span>
            <span class='td'>{{item.zhuangtai}}</span>
            <span class='td detail'><span>详情</span></span>
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

export default {
  name: 'importantEvent',
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
      jinrixz: 0,
      quannianlj: 0
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
    },
    changeNum () {
      let _this = this
      this.timer = setInterval(function () {
        _this.jinrixz = parseInt(Math.random() * 90) + 10
        _this.quannianlj = parseInt(Math.random() * 90000) + 10000
      }, 5000)
    },
    // 路由跳转
    changeRouter (name) {
      this.$router.push({name: name})
    },
    getData () {
      let vue = this
      let reqParam = {}
      let url = ''
      url = '/peopleMediate/ZdsjUnder'
      http.get(url, reqParam, (data) => {
        [vue.table.dLength, vue.table.lineNum, vue.table.zhongdiansj] = [data.KeyEvents.length, 7, data.KeyEvents]
        vue.jinrixz = data['DigitalDisplay']['jinrixz']
        vue.quannianlj = data['DigitalDisplay']['zongshu']
        data['KeyEvents_Number'] = data['KeyEvents_Number'].map(item => { return {name: item.time, value: item.number} })
        data['KeyEvents_AddCounts'] = data['KeyEvents_AddCounts'].map(item => { return {name: item.time, value: item.value} })
        vue.$nextTick(function () {
          vue.draw('target2', eos.setBar3(data['KeyEvents_Number'], ['#1194F8', '#86CBFF'], 'vertical', 'integer', 32))
          vue.draw('target3', eos.setPie6(data['KeyEvents_Source'].reverse()))
          vue.draw('target4', eos.setBar3(data['KeyEvents_Status'], ['#1194F8', '#86CBFF'], 'vertical', 'integer', 32))
          vue.draw('target5', eos.setLine4([data['KeyEvents_AddCounts']].reverse(), 'integer'))
          vue.draw('target6', eos.setPie6(data['KeyEvents_Type'], true))
          vue.draw('target7', eos.setBar3(data['KeyEvents_EachArea'].reverse(), ['#4D84FE', '#B3CAFF'], 'hortizon', 'integer', 11))
        })
      })
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    // this.changeNum()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
  #importantEvent {
    min-height: 1080px;
    min-width: 1920px;
    overflow-y: hidden;
  }
  .shade {
    background: url('/static/renmintj/pic_bg.png');
    background-repeat:no-repeat;
    background-position:center;
  }
  .target1,.target2,.target3,.target4,.target5,.target6,.target7,.target8 {
    float: left;
    width: calc(100% - 20px);
    height: calc(100% - 10px);
    padding: 0 10px;
  }
  .target1 {
    height: 100%;
  }
  .importantEvent_header{
    width: 100%;
    min-width: 1920px;
    height: 87px;
    background: url('/static/renmintj/pic_title.png');
    background-repeat:no-repeat;
    background-position:center;
    z-index: 99;
    position:relative;
  }
  .importantEvent_back{
    background:url('/static/renmintj/btn_back.png');
    position:absolute;
    left:22px;
    width:137px;
    height: 35px;
    background-position: center;
    top: 28px;
    cursor:pointer;
  }
  .importantEvent_nav{
    height: 24px;
    margin:6px 0 20px 0;
    padding-left: 34px;
    width: 100%;
    box-sizing: border-box;
  }
  .importantEvent_nav_span{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(94,126,203,1);
  }
  .importantEvent_content{
    width: 100%;
    height: 903px;
    box-sizing: border-box;
    padding: 13px 24px 24px 24px;
  }
   .importantEvent_content_top{
    width: 675px;
    height: 268px;
    float: left;
    margin-bottom: 20px;
    margin-right: 20px;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
  }
  .importantEvent_content_top:nth-of-type(1){
    width: 462px;
  }
  .importantEvent_content_top:nth-of-type(3){
    margin-right: 0;
  }
  .importantEvent_content_middle{
    width: 675px;
    height: 258px;
    float: left;
    margin-bottom: 20px;
    margin-right: 20px;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
  }
  .importantEvent_content_middle:nth-of-type(4){
    width: 462px;
  }
  .importantEvent_content_middle:nth-of-type(6){
    margin-right: 0;
  }
  .importantEvent_content_bottom{
    width: 1362px;
    height: 352px;
    float: left;
    margin-right: 20px;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
  }
  .importantEvent_content_bottom:nth-of-type(7){
    width: 462px;
  }
  .importantEvent_content_bottom:nth-of-type(8){
    margin-right: 0;
  }
  .importantEvent_content_title{
    width: 100%;
    color: white;
  }
  .importantEvent_content_title_left{
    width: 50%;
    float: left;
    margin-top: 15px;
  }
  .importantEvent_content_span1{
    font-size:22px;
    font-family:MicrosoftYaHei;
    color:rgba(125,165,254,1);
    padding-left: 8px;
    margin-left: 28px;
    border-left: 3px solid rgba(125,165,254,1);
    display:block;
    height: 22px;
    line-height: 22px;
  }
  .statistics{
    float: left;
    width: calc(50% - 41px);
    height: 60px;
    margin-top: calc((285px - 60px)/2);
    padding-left: 40px;
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
  .cutLine{
    float: left;
    width: 1px;
    height: 28px;
    margin-top: calc((285px - 28px)/2);
    background: #AAADB6;
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
    width: calc((100% - 160px)/5);
    line-height:33px;
    text-align: center;
    color: #4D84FE;
  }
  .renmintj_center_table div .num{
    width: 60px;
  }
  .renmintj_center_table div .detail{
    width: 80px;
  }
  .renmintj_table_thead{
    color:rgba(17,148,248,1);
    line-height:42px;
  }
  .renmintj_table_tr .detail>span{
    color: #FFFFFF;
    background: #1194F8;
    width: 50px;
    line-height: 22px;
    margin: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  /* .renmintj_table_tr:nth-of-type(2n-1){
    background: rgba(7,30,74,0.8)
  } */
</style>
