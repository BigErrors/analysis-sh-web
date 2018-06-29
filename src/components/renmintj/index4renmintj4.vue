/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-05-30 09:31:53
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-06-29 13:29:53
 * @content: echarts 二维地理坐标系 动态散点 时间轴
 */
<template>
<div id='renmintj' class='shade'>
  <div class='renmintj_header'>
    <!-- <div class="renmintj_back" @click="changeRouter('mapApp')" style="cursor: pointer;"></div> -->
  </div>
  <div class='renmintj_container'>
    <div class="renmintj_left">
      <div class="renmintj_left_once">
        <span class="renmintj_title_span renmintj_title_span_center" @click="changeRouter('businessNum')">业务数量</span>
        <div class="renmintj_main">
          <div class="renmintj_main_once">
            <div class="pie yewusl1"></div>
            <div class="yewusl_title">人民调解</div>
            <div class="yewusl_subtitle"><span v-text="casestatistics.MBM_CASE"></span><br/><span>本月</span></div>
          </div>
          <div class="renmintj_main_once">
            <div class="pie yewusl2"></div>
            <div class="yewusl_title">110联动</div>
            <div class="yewusl_subtitle"><span v-text="casestatistics.MMS_ALARM110INFO"></span><br/><span>本月</span></div>
          </div>
          <div class="renmintj_main_once">
            <div class="pie yewusl3"></div>
            <div class="yewusl_title">公共法律服务</div>
            <div class="yewusl_subtitle"><span v-text="casestatistics.WWS_CONSULT"></span><br/><span>本月</span></div>
          </div>
          <div class="renmintj_main_once">
            <div class="pie yewusl4"></div>
            <div class="yewusl_title">纠纷排查</div>
            <div class="yewusl_subtitle"><span v-text="casestatistics.CDS_INVESTIGATIONFEEDBAC"></span><br/><span>本月</span></div>
          </div>
        </div>
      </div>
      <div class="renmintj_left_once">
        <!-- businessTypes -->
        <span class="renmintj_title_span renmintj_title_span_center" @click="changeRouter('businessTypes')">业务类型</span>
        <div class='renmintj_left_yewulx_content1'>
          <div class="pie1"></div>
        </div>
        <div class='renmintj_left_yewulx_content2'>
          <div class="chart"></div>
        </div>
      </div>
      <div class="renmintj_left_once">
        <span class="renmintj_title_span renmintj_title_span_center" @click="changeRouter('trendAnalysis')">趋势分析</span>
            <span class="renmintj_nav">
              <span class="nav_a" :class="{'renmintj_nav_active':target1==='data_tj'?true:false}" @click="target1='data_tj'">人民调解</span>|
              <span class="nav_a" :class="{'renmintj_nav_active':target1==='data_110'?true:false}" @click="target1='data_110'">110联动</span>|
              <span class="nav_a" :class="{'renmintj_nav_active':target1==='data_jc'?true:false}" @click="target1='data_jc'">公共法律服务</span>|
              <span class="nav_a" :class="{'renmintj_nav_active':target1==='data_pc'?true:false}" @click="target1='data_pc'">纠纷排查</span>
            </span>
        <div class='line'></div>
      </div>
    </div>
    <div class="renmintj_center">
      <div class="renmintj_center_map">
        <span class="renmintj_title_span renmintj_title_span_left">案件分布</span>
        <div class="map_title">
          <span>业务总量</span><span><digitalRolling :height='30' :width='18' :number='yewusl' :fontSize='30' :fontColor='"#FFFFFF"'></digitalRolling></span>
        </div>
        <div class="map_subtitle">
          <span>同比今年</span><span><digitalRolling :height='14' :width='10' :number='yewutb' :fontSize='14' :fontColor='"#FFFFFF"' :numberDigits='3'></digitalRolling>%</span>
        </div>
        <div class="map_cityList">
          <el-cascader
            class="cascader"
            style="z-index: 1;"
            :options="area"
            placeholder="区域"
            v-model="areaDefault"
          ></el-cascader>
        </div>
        <div class='map'></div>
      </div>
      <div class="renmintj_center_once">
        <span class="renmintj_title_span renmintj_title_span_center" style="padding-left:35px;" @click="changeRouter('importantEvent')">重点事件</span>
          <div class='renmintj_center_table'>
            <div class="renmintj_table_thead">
              <span class='td'>序号</span>
              <span class='td'>事件</span>
              <span class='td'>日期</span>
              <span class='td'>地区</span>
              <span class='td'>简述</span>
            </div>
            <rollScreen :dLength='table.dLength' :height='33' :lineNum='table.lineNum' class="renminttj_table_body">
              <div class="renmintj_table_tr" slot="slide" v-for="(item, index) in table.zhongdiansj" :key="index" @click="changeRouter('importantEventDetail',item.id)">
               <span class='td'>{{item.xuHao}}</span>
               <span class='td'>{{item.shiJianLX}}</span>
               <span class='td'>{{item.riQi}}</span>
               <span class='td'>{{item.diQu}}</span>
               <span class='td'>{{item.jianShu}}</span>
              </div>
            </rollScreen>
          </div>
      </div>
    </div>
    <div class="renmintj_right">
      <div class="renmintj_right_once">
        <!-- institutionRanking -->
        <span class="renmintj_title_span renmintj_title_span_center" @click="changeRouter('institutionRanking')">机构总数</span>
        <div class="renmintj_right_jigou">
          <div class="renmintj_right_circle" :class="'circle'+(index+1)" v-for="(item, index) in MechanismNumber" :key="index" v-if="index<=3">
            <span class="renmintj_right_span1">{{item.shuliang}}</span>
            <span class="renmintj_right_span2">{{item.mingcheng}}</span>
          </div>
          <div class="renmintj_right_fr">
            <div class='renmintj fill1'></div>
          </div>
        </div>
      </div>
      <div class="renmintj_right_once">
        <span class="renmintj_title_span renmintj_title_span_center" @click="changeRouter('peopleNum')">人员总数</span>
        <div class="renmintj_right_renyuan">
          <div class="renmintj_right_fl">
            <div class="renmintj_renyuan_once" v-for="(item,index) in peopleCount" :key="index" v-if="index<=5">
              <span class="renmintj_renyuan_span1">{{item.shuliang}}</span>
              <span class="renmintj_renyuan_span2">{{item.mingcheng}}</span>
            </div>
          </div>
          <div class="renmintj_right_fr">
              <div class='renmintj fill2'></div>
          </div>
        </div>
      </div>
      <div class="renmintj_right_once">
        <span class="renmintj_title_span renmintj_title_span_center">工作质量</span>
        <div class="renmintj_right_gongzuo">
          <div class="renmintj_right_fl">
            <div class="renmintj_right_fl_content">
              <div class="renmintj_right_fl_content_line"><span class="numColor" v-text="workQuality.xieYiS_number"></span><span class="typeColor">协议书</span></div>
              <div class="renmintj_right_fl_content_line"><span class="numColor" v-text="workQuality.tiaoJieCG"></span><span class="typeColor">调解成功</span></div>
            </div>
            <div class="renmintj_right_fl_content">
              <div class="pie2"></div>
            </div>
          </div>
          <div class="renmintj_right_fr renmintj_right_fr_gongzuo">
              <div class='renmintj fill3'></div>
              <div class='renmintj fill4'></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import eos from '@/util/echartsOptions'
import rollScreen from '../rollScreen.vue'
import digitalRolling from '../digitalRolling.vue'
import genJson4shanghai from '@/../static/json/genJson4shanghai'
import http from '@/util/httpUtil'
import json from '@/util/dictionaryMapping'

export default {
  name: 'renmintj',
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
      casestatistics: {
        MBM_CASE: 0,
        MMS_ALARM110INFO: 0,
        WWS_CONSULT: 0,
        CDS_INVESTIGATIONFEEDBAC: 0
      },
      qushifx: {},
      MechanismNumber: [],
      peopleCount: [],
      workQuality: {
        xieYiS_number: 0,
        tiaoJieCG: 0
      },
      yewusl: 0,
      yewutb: 0,
      yewuslList: [],
      timer: '',
      target1: 'data_tj',
      area: json.area,
      areaDefault: ['SHJCK01000']
    }
  },
  watch: {
    target1: function (newValue, oldValue) {
      this.draw('line', eos.setLine2(this.qushifx[newValue], true))
    },
    areaDefault: function (newValue, oldValue) {
      this.getData()
    }
  },
  methods: {
    // 绘制echarts
    draw (domName, option) {
      if (this.myChart[domName]) {
        this.$echarts.dispose(this.myChart[domName])
      }
      this.myChart[domName] = this.$echarts.init(document.getElementsByClassName(domName)[0])
      if (domName === 'map') {
        let vue = this
        this.$echarts.registerMap('shanghai', genJson4shanghai)
        this.myChart[domName].on('timelineChanged', function (params) {
          vue.yewusl = vue.yewuslList[params.currentIndex].yewuzongliang
          vue.yewutb = vue.yewuslList[params.currentIndex].tongbi.split('.')[0]
        })
      }
      this.myChart[domName].setOption(option)
    },
    // 路由跳转
    changeRouter (name, id) {
      let target = {name: name}
      if (name === 'importantEventDetail') {
        target = {name: name, params: { id: id }}
      }
      this.$router.push(target)
    },
    getData () {
      let vue = this
      let reqParam = { area: this.areaDefault[0] }
      let baseUrl = '/peopleMediate/V1.0.0.2'
      let url = ''
      url = '/mainPage_Dist_Count'
      http.get(baseUrl + url, reqParam, (data) => {
        let colorList = [[44, 204, 250], [240, 104, 127], [109, 239, 39], [255, 231, 62]]
        data.yewusl.map((item, index) => {
          vue.casestatistics[item['biao']] = item['benyue']
          vue.$nextTick(function () {
            vue.draw(`yewusl${index + 1}`, eos.setPie5(item['quannian'], colorList[index]))
          })
        })
        vue.yewuslList = data.yewufb.yewuzs.reverse()
        vue.yewusl = vue.yewuslList[0].yewuzongliang
        vue.yewytb = vue.yewuslList[0].tongbi.split('.')[0]
        vue.draw('map', eos.setMap(data.yewufb.fenbu))
      })
      url = '/category'
      http.get(baseUrl + url, reqParam, (data) => {
        vue.$nextTick(function () {
          vue.draw('pie1', eos.setPie4([(data.hangZhuanBL * 100).toFixed(1), ((1 - data.hangZhuanBL) * 100).toFixed(1)], '行专占比'))
          vue.draw('chart', eos.setBar4(data.yeWuLXHSL, ['#FF9C00', '#F8E228'], 'vertical', 'integer', 1))
        })
      })
      url = '/trend'
      http.get(baseUrl + url, reqParam, (data) => {
        vue.$nextTick(function () {
          this.qushifx = data
          vue.draw('line', eos.setLine2(this.qushifx['data_110'], true))
        })
      })
      url = '/keyEvents'
      http.get(baseUrl + url, reqParam, (data) => {
        [vue.table.dLength, vue.table.lineNum, vue.table.zhongdiansj] = [data.length, 6, data]
      })
      url = '/mechanismNumber'
      http.get(baseUrl + url, reqParam, (data) => {
        vue.MechanismNumber = [{mingcheng: '司法所', shuliang: data['siFaS']}, {mingcheng: '调委会', shuliang: data['tiaoWeiH']}, {mingcheng: '公共法律服务站', shuliang: data['gongGongFLFWZ']}, {mingcheng: '公共法律服务室', shuliang: data['gongGongFLFWS']}]
        vue.$nextTick(function () {
          vue.draw('fill1', eos.setFill(data['siFaSZXBZLSL'].toFixed(3), '#FDBF5E', '司法所专项编制\n\r\r\r\r\r\r-落实率-', [data['siFaSZXBZLSL'].toFixed(3)], '17', '#7BA6ED'))
        })
      })
      url = '/staffNumber'
      http.get(baseUrl + url, reqParam, (data) => {
        vue.peopleCount = [{mingcheng: '调解员', shuliang: data['tiaoJieY']}, {mingcheng: '公务员', shuliang: data['gongWuY']}, {mingcheng: '文员', shuliang: data['wenYuan']}, {mingcheng: '社工', shuliang: data['sheGong']}, {mingcheng: '志愿者', shuliang: data['zhiYuanZ']}, {mingcheng: '法律顾问', shuliang: data['juCunFLGW']}]
        vue.$nextTick(function () {
          vue.draw('fill2', eos.setFill(parseFloat(data['juCunFLGW_cover']).toFixed(3), '#FF7279', '村居法律顾问\n\r\r\r\r-覆盖率-', [parseFloat(data['juCunFLGW_cover']).toFixed(3)], '17', '#7BA6ED'))
        })
      })
      url = '/workQuality'
      http.get(baseUrl + url, reqParam, (data) => {
        vue.workQuality.xieYiS_number = data.xieYiS_number
        vue.workQuality.tiaoJieCG = data.tiaoJieCG
        vue.$nextTick(function () {
          vue.draw('pie2', eos.setPie4([(data.xieYiS_cover * 100).toFixed(1), ((1 - data.xieYiS_cover) * 100).toFixed(1)], '协议书占比'))
          vue.draw('fill3', eos.setFill(parseFloat(data.wenShuZL).toFixed(1), '#FDBF5E', '\r\r\r\r文书质量\n', [0.3], '17', '#7BA6ED'))
          vue.draw('fill4', eos.setFill(parseFloat(data.anJianSB).toFixed(1), '#FDBF5E', '\r\r\r\r案例上报率\n', [0.3], '17', '#7BA6ED'))
        })
      })
    },
    getUpdateData () {
      this.timer = setInterval(function () {
      }, 10000)
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    // this.draw('map', eos.setMap2([[121.394878, 31.072511, 10], [121.555854, 30.8803, 20], [121.491, 31.237, 5], [121.440296, 31.401281, 6], [121.512, 31.27, 7], [121.43, 31.227, 2], [121.07968, 31.141832, 9], [121.541702, 31.270352, 3],
    //  [121.736377, 31.088346, 3], [121.454, 31.234, 6], [121.20573, 31.372673, 5], [121.178709, 30.992306, 5], [121.43452, 31.170563, 7], [121.563184, 31.631849, 3], [121.233758, 30.816867, 4]]))
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
  #renmintj {
    min-height: 1080px;
    min-width: 1920px;
    overflow-y: hidden;
  }
  .shade {
    background: url('/static/renmintj/pic_bg.png');
    background-repeat:no-repeat;
    background-position:center;
  }

  .renmintj_container{
    width:100%;
    display:block;
    position:relative;
    box-sizing:border-box;
    padding-top: 42px;
  }
  .renmintj_header{
    width: 100%;
    min-width: 1920px;
    height: 77px;
    background: url('/static/renmintj/pic_title.png');
    background-repeat:no-repeat;
    background-position:center;
    z-index: 99;
    position:relative;
  }
  .renmintj_back{
    background:url('/static/renmintj/btn_back.png');
    position:absolute;
    left:22px;
    width:137px;
    height: 35px;
    background-position: center;
    top: 28px;
    cursor:pointer;
  }
  .renmintj_title_span{
    display:inline-block;
    height:38px;
    line-height:38px;
    font-size:20px;
    color:rgba(121,190,242,1);
    box-sizing:border-box;
    cursor: pointer;
  }
  .renmintj_title_span_center{
    width:100%;
    padding-left:0;
    text-align: center;
  }
  .renmintj_title_span_left{
    width:169px;
    padding-left:22px;
  }
  .pie{
    height: 97px;
    width: 97px;
  }
  .yewusl_title{
    color: #76BBEF;
    font-size: 14px;
    line-height:62px;
    text-align: center;
    border-bottom: 1px dashed #5E7ECB;
  }
  .yewusl_subtitle{
    margin-top: 8px;
    text-align: center;
  }
  .yewusl_subtitle>span:nth-of-type(1){
    color: #49EAEE;
    font-size: 14px;
    line-height: 26px;
  }
  .yewusl_subtitle>span:nth-of-type(2){
    color: #1194F8;
    font-size: 12px;
  }
  .renmintj_left_yewulx_content1{
    float: left;
    width: 120px;
    height: 260px;
  }
  .pie1{
    padding-top: 80px;
    width: 120px;
    height: 130px;
  }
  .chart{
    width: 100%;
    height: 100%;
  }
  .renmintj_left_yewulx_content2{
    float: left;
    width: calc(100% - 120px);
    height: 260px;
  }
  .renmintj_nav{
    display:inline-block;
    width: 100%;
    height:20px;
    line-height:20px;
    font-size:13px;
    color:rgba(17,148,248,1);
    box-sizing:border-box;
    text-align: center;
  }
  .renmintj_nav>span{
    padding: 0 10px;
    cursor: pointer;
  }
  .renmintj_nav>span:hover{
    color: rgba(255,242,37,1);
  }
  .renmintj_nav_active {
    color: rgba(255,242,37,1);
  }
  .renmintj_left{
    float:left;
    width:464px;
    margin:0 24px 27px 40px;

  }
  .renmintj_left_once{
    width:100%;
    height:301px;
    background:url('/static/renmintj/pic_up.png');
    background-size:464px 301px;
  }
  .renmintj_left_once:nth-of-type(2){
    margin:22px 0;
  }
  .renmintj_left_once:nth-of-type(3){
    height:286px;
    background-size:464px 286px;
  }
  .line {
    width: calc(464px - 20px);
    padding: 0 10px;
    height: 220px;
  }
  .renmintj_center{
    width:863px;
    float:left;
  }
  .renmintj_center_map{
    width:100%;
    height:627px;
    background:url('/static/renmintj/pic_middle.png');
    background-size:863px 627px;
    margin-bottom:16px;
    position:relative;
  }
  .map{
    width: 100%;
    height: 627px;
    position:absolute;
    top:0px;
    left:0px;
  }
  .map_title{
    width: 165px;
    height: 30px;
    position:absolute;
    top: 55px;
    left:0px;
    border-bottom: 1px solid #1A3DAC;
    padding: 5px;
  }
  .map_title>span:nth-of-type(1){
    color: #79BEF2;
    font-size: 14px;
    padding-right: 10px;
    display: block;
    float: left;
    line-height: 34px;
  }
  .map_title>span:nth-of-type(2){
    color: #FFFFFF;
    font-size: 30px;
    display: block;
    float: left;
    height: 30px;
  }
  .map_subtitle{
    width: 165px;
    height: 30px;
    position:absolute;
    top: 95px;
    left:0px;
    padding: 5px;
  }
  .map_subtitle>span:nth-of-type(1){
    color: #79BEF2;
    font-size: 14px;
    padding-right: 10px;
    display: block;
    float: left;
    line-height: 34px;
  }
  .map_subtitle>span:nth-of-type(2){
    /* color: #EF687F; */
    color: #FFFFFF;
    font-size: 14px;
    display: block;
    float: right;
    padding-right: 20px;
    padding-top: 10px;
    /* line-height: 36px; */
  }
  .map_cityList{
    width: 110px;
    height: 30px;
    position:absolute;
    top: 00px;
    right:10px;
  }
  .renmintj_center_once{
    width:100%;
    height:286px;
    background:url('/static/renmintj/pic_middle2.png');
    background-size:863px 286px;
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
    width: 20%;
    line-height:33px;
    text-align: center;
    color:rgba(118,187,239,1);
  }
  .renmintj_table_thead{
    color:rgba(17,148,248,1);
    line-height:42px;
  }
  .renmintj_table_tr {
    cursor: pointer;
  }
  .renmintj_table_tr:nth-of-type(2n-1){
    background: rgba(7,30,74,0.8)
  }
  .renmintj_right{
    float:right;
    width:464px;
    margin:0 40px 27px 24px;
  }
  .renmintj_right_once{
    width:100%;
    height:301px;
    background:url('/static/renmintj/pic_up.png');
    background-size:464px 301px;
  }
  .renmintj_right_once:nth-of-type(2){
    margin:22px 0;
  }
  .renmintj_right_once:nth-of-type(3){
    height:286px;
    background-size:464px 286px;
  }
  .renmintj_right_jigou{
    width:100%;
    height:260px;
    background:url('/static/renmintj/icon_.png');
    background-position:61px center;
    background-repeat:no-repeat;
    position:relative;
  }
  .renmintj_right_circle{
    position:absolute;
    padding-left:50px;
    height:50px;
    width:120px;
  }
  .renmintj_right_span1{
    height:31px;
    /* vertical-align:top; */
    font-size:21px;
    font-family:FZLTZHK--GBK1-0;
    color:rgba(0,246,255,1);
    display:block;
  }
  .renmintj_right_span2{
    height:19px;
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(17,148,248,1);
    /* vertical-align:bottom; */
    display:block;
  }
  .circle1{
    top:25px;
    left:60px;
    background:url('/static/renmintj/pic_2.png');
    background-repeat:no-repeat;
    background-position:left center;
  }
  .circle2{
    top:82px;
    left:116px;
    background:url('/static/renmintj/pic_1.png');
    background-repeat:no-repeat;
    background-position:left center;
  }
  .circle3{
    top:141px;
    left:116px;
    background:url('/static/renmintj/pic_4.png');
    background-repeat:no-repeat;
    background-position:left center;
  }
  .circle4{
    top:199px;
    left:60px;
    background:url('/static/renmintj/pic_3.png');
    background-repeat:no-repeat;
    background-position:left center;
  }
  .renmintj_right_fr{
    float:right;
    width:140px;
    height:260px;
    box-sizing:border-box;
    padding:75px 20px;
  }
  .renmintj {
    width: 90px;
    height: 125px;
  }
  .renmintj_right_renyuan{
    width:100%;
    height:260px;
    position:relative;
    padding-left:32px;
    box-sizing:border-box;
  }
  .renmintj_right_fl{
    float:left;
    width:290px;
  }
  .renmintj_renyuan_once{
    width:127px;
    height:54px;
    background:url('/static/renmintj/icon_user.png');
    float:left;
    margin:28px 11px 0 0;
  }
  .renmintj_renyuan_span1{
    display: inline-block;
    width: 44px;
    text-align: center;
    font-size: 14px;
    font-family: FZLTZHK--GBK1-0;
    color: rgba(0,246,255,1);
    line-height: 44px;
  }
  .renmintj_renyuan_span2{
    display: inline-block;
    width: 78px;
    text-align: left;
    font-size: 12px;
    font-family: HiraginoSansGB-W3;
    color: rgba(118,187,239,1);
    line-height: 52px;
  }
  .renmintj_right_gongzuo{
    width:100%;
    height:244px;
    position:relative;
    padding-left:32px;
    box-sizing:border-box;
  }
  .renmintj_right_gongzuo > div{
    height: 244px;
  }
  .renmintj_right_fl_content{
     width: 170px;
     height: 122px;
     text-align: center;
  }
  .renmintj_right_fl_content_line{
    line-height: 50px;
    font-size: 20px;
  }
  .renmintj_right_fl_content_line:nth-of-type(1){
    border-bottom: 2px solid #0F75C9;
    opacity: 0.6;
  }
  .renmintj_right_fl_content_line:nth-of-type(2){
    opacity: 1;
  }
  .renmintj_right_fl_content_line>span:nth-of-type(1) {
    padding-right: 14px;
  }
  .numColor{
    color: #00F6FF;
  }
  .typeColor{
    color: #1194F8;
  }
  .pie2{
    width: 90px;
    height: 122px;
    padding-left: 45px;
  }
  .renmintj_right_fr_gongzuo{
    padding: 0;
  }
  .renmintj_right_fr_gongzuo > div{
    margin-left: 23px;
    height: 122px;
  }
  .renmintj_main{
    width:100%;
    height:275px;
    position:relative;
  }
  .renmintj_main_once{
    float: left;
    height: 229px;
    width: 97px;
    margin-left: 15px;
    background: url('/static/renmintj/pic_reproduction.png')
  }
  .renmintj_main_title{
    width:40%;
    font-size:20px;
    box-sizing:border-box;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,255,255,1);
    float:left;
    padding-left:18px;
    line-height:91px;
    height:91px;
  }
  .renmintj_main_today{
    width:15%;
    height:91px;
    float:left;
    padding-top:23px;
    box-sizing:border-box;
  }
  .renmintj_main_year{
    width:45%;
    height:91px;
    float:left;
    padding-right:54px;
    box-sizing:border-box;
    padding-top:23px;
  }
  .renmintj_main_span1{
    font-size:24px;
    font-family:FZLTZHK--GBK1-0;
    color:rgba(0,246,255,1);
    display:block;
    text-align:right;
  }
    .renmintj_main_span2{
    height:40px;
    font-size:16px;
    font-family:HiraginoSansGB-W3;
    color:rgba(17,148,248,1);
    display:block;
    text-align:right;
  }

</style>
