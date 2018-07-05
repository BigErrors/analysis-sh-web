<template>
  <div id='businessNum' class='shade'>
    <div class="businessNum_header">
      <div class="businessNum_back" @click="changeRouter('index4renmintj')"></div>
    </div>
    <div class="businessNum_nav">
      <span class="businessNum_nav_span">首页 > 业务数量</span>
    </div>
    <div class="businessNum_nav2">
      <span class="businessNum_nav2_span" :class="{'businessNum_nav2_span_active':type==='人民调解'?true:false}" @click="type='人民调解'">人民调解</span>
      <span class="businessNum_nav2_span " :class="{'businessNum_nav2_span_active':type==='110联动'?true:false}" @click="type='110联动'">110联动</span>
      <span class="businessNum_nav2_span " :class="{'businessNum_nav2_span_active':type==='公共法律服务'?true:false}" @click="type='公共法律服务'">公共法律服务</span>
      <span class="businessNum_nav2_span " :class="{'businessNum_nav2_span_active':type==='纠纷排查'?true:false}" @click="type='纠纷排查'">纠纷排查</span>
    </div>
    <div class="businessNum_content">
      <div class="businessNum_content_top">
        <div class="businessNumCityList">
          <el-cascader
            :options="area"
            placeholder="区域"
            v-model="areaDefault"
          ></el-cascader>
        </div>
        <div class="statistics">
          <span class="title">全年累计</span>
          <br>
          <digitalRolling class="num" :height='30' :width='20' :number='statistics.year' :fontSize='30' :fontColor='"#FFFFFF"'></digitalRolling>
        </div>
        <div class="statistics">
          <span class="title">本月新增</span>
          <br>
          <digitalRolling class="num" :height='30' :width='20' :number='statistics.month' :fontSize='30' :fontColor='"#FFFFFF"'></digitalRolling>
        </div>
        <div class="statistics" v-if="type==='110联动'">
          <span class="title">本日新增</span>
          <br>
          <digitalRolling class="num" :height='30' :width='20' :number='statistics.day' :fontSize='30' :fontColor='"#FFFFFF"'></digitalRolling>
        </div>
      </div>
      <div class="businessNum_content_top">
        <div class="businessNum_content_title">
          <div class=" businessNum_content_title_left">
            <span class="businessNum_content_span1">案件类型</span>
          </div>
          <div class=" businessNum_content_title_right">
            <span class="businessNum_content_span5" :class="{'businessNum_content_active':timeType==='month'?true:false}" @click="timeType='month'">本月</span>
            <span class="businessNum_content_span5" :class="{'businessNum_content_active':timeType==='year'?true:false}" @click="timeType='year'">今年</span>
          </div>
        </div>
        <div class='target2'></div>
        <div class="businessNum_detail">
          <div class="businessNum_detail_main">
            <div class="businessNum_detail_title">{{type2Title}}</div>
            <div class="businessNum_detail_content" v-for="(item,index) in table" :key="index" @click="setType3Data(item.type2)">
              <span class="businessNum_detail_span1">{{item.type2}}</span>
              <span class="businessNum_detail_span2">{{item.value}}</span>
            </div>
          </div>
        </div>
        <div class="businessNum_detail">
          <div class="businessNum_detail_main2">
            <div class="target3"></div>
          </div>
        </div>
      </div>
      <div class="businessNum_content_bottom">
        <div class="businessNum_content_title clearfix">
          <div class="businessNum_content_title_left">
            <span class="businessNum_content_span1" v-text="title4"></span>
          </div>
        </div>
        <div class="target4"></div>
      </div>
      <div class="businessNum_content_bottom">
        <div class="businessNum_content_title clearfix">
          <div class="businessNum_content_title_left">
            <span class="businessNum_content_span1" v-text="title5"></span>
          </div>
        </div>
        <div class="target5"></div>
      </div>
      <div class="businessNum_content_bottom">
        <div class="businessNum_content_title clearfix">
          <div class="businessNum_content_title_left">
            <span class="businessNum_content_span1" v-text="title6"></span>
          </div>
        </div>
        <div class="target6"></div>
      </div>
    </div>

</div>
</template>

<script>
import eos from '@/util/echartsOptions'
import http from '@/util/httpUtil'
import urlConfig from '@/util/urlConfig'
import digitalRolling from '../digitalRolling.vue'
import json from '@/util/dictionaryMapping'

export default {
  name: 'businessNum',
  components: {
    digitalRolling
  },
  data () {
    return {
      myChart: {},
      type: '人民调解',
      statistics: {
        year: 0,
        month: 0,
        day: 0
      },
      timeType: 'year',
      pieData: [],
      tableData: [],
      lineData: [],
      type2Title: '',
      table: [],
      keyMap: {'人民调解': 'MBM_CASE', '110联动': 'MMS_ALARM110INFO', '公共法律服务': 'WWS_CONSULT', '纠纷排查': 'CDS_INVESTIGATIONFEEDBAC'},
      area: json.area,
      areaDefault: ['SHJCK01000'],
      title4: '各区案件数量(TOP10)',
      title5: '来源分布',
      title6: '处理状态'
    }
  },
  watch: {
    type: function (newValue, oldValue) {
      this.getData()
    },
    areaDefault: function (newValue, oldValue) {
      this.getData()
    },
    timeType: function (newValue, oldValue) {
      this.setTypeData()
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
          vue.setType2Data(params.name)
        })
      }
    },
    changeRouter (name) {
      this.$router.push({name: name})
    },
    setTypeData () {
      let vue = this
      let data = []
      vue.pieData.map(item => {
        if (vue.timeType === item.timetype) {
          data.push({name: item.type1, value: parseInt(item.value)})
        }
      })
      if (data.length > 0) {
        data = data.sort((a, b) => {
          if (a.value >= b.value) {
            return -1
          } else {
            return 1
          }
        })
        vue.draw('target2', eos.setPie2(data))
        vue.setType2Data(data[0].name)
      } else {
        vue.draw('target2', eos.setPie2([{name: '暂无数据', value: 0}]))
        vue.type2Title = '暂无数据'
        vue.table = [{type2: '暂无数据', value: 0}]
        vue.draw('target3', eos.setLine6([{name: '暂无数据', value: 0}], 'integer'))
      }
    },
    setType2Data (type) {
      let vue = this
      vue.type2Title = type
      vue.table = vue.tableData.filter(item => {
        if (vue.timeType === item.timetype && vue.type2Title === item.type1) {
          return item
        }
      })
      vue.setType3Data(vue.table[0].type2)
    },
    setType3Data (type) {
      let vue = this
      let data = []
      vue.lineData.map(item => {
        if (vue.timeType === item.timetype && vue.type2Title === item.type1 && type === item.type2) {
          data = item.value.sort((a, b) => {
            if (parseInt(a.name) >= parseInt(b.name)) {
              return 1
            } else {
              return -1
            }
          })
        }
      })
      vue.draw('target3', eos.setLine6(data, 'integer', type))
      // this.$notify.success(`时间:${this.timeType},类别:${this.type},一级分类:${this.type2Title},二级分类:${type}`)
    },
    getData () {
      let vue = this
      let reqParam = {area: this.areaDefault[0], biaoming: this.keyMap[this.type]}
      let baseUrl = urlConfig.baseUrl
      let url = ''
      url = '/caseTypeDown'
      http.get(baseUrl + url, reqParam, (data) => {
        vue.statistics.year = data.year
        vue.statistics.month = data.month
        vue.statistics.day = data.day
        vue.pieData = data.pie
        vue.tableData = data.table
        vue.lineData = data.line
        vue.$nextTick(function () {
          vue.setTypeData()
        })
      })
      url = '/caseDistDown'
      http.get(baseUrl + url, reqParam, (data) => {
        if (data.length === 0) {
          data = [{name: '暂无数据', value: 0}]
        } else {
          data = data.slice(0, 10).reverse()
        }
        vue.$nextTick(function () {
          if (vue.type === '人民调解') {
            vue.title4 = '各区案件数量(TOP10)'
          } else if (vue.type === '110联动') {
            vue.title4 = '各区受理排名(TOP10)'
          } else if (vue.type === '公共法律服务') {
            vue.title4 = '各区服务数量(TOP10)'
          } else if (vue.type === '纠纷排查') {
            vue.title4 = '各机构排查排名(TOP10)'
          }
          vue.draw('target4', eos.setBar3(data, ['#4D84FE', '#B3CAFF'], 'horizon', 'integer'))
        })
      })
      url = '/caseCountDown1'
      http.get(baseUrl + url, reqParam, (data) => {
        if (vue.type === '公共法律服务') {
          data = data.map(item => {
            return {name: item.time, type: item.type, value: item.value}
          })
        }
        if (data.length === 0) {
          data = [{name: '暂无数据', value: 0}]
        }
        vue.$nextTick(function () {
          if (vue.type === '人民调解') {
            vue.title5 = '案件来源分布'
            vue.draw('target5', eos.setPie3(data))
          } else if (vue.type === '110联动') {
            vue.title5 = '处置情况'
            vue.draw('target5', eos.setBar3(data, ['#F8E228', '#FF9C00'], 'vertical', 'integer', 36, undefined, false, 30))
          } else if (vue.type === '公共法律服务') {
            vue.title5 = '服务热点'
            vue.draw('target5', eos.setLine7(data, 'integer', undefined, true))
          } else if (vue.type === '纠纷排查') {
            vue.title5 = '处理结果'
            vue.draw('target5', eos.setPie2(data))
          }
        })
      })
      url = '/caseCountDown2'
      http.get(baseUrl + url, reqParam, (data) => {
        if (data.length === 0) {
          data = [{name: '暂无数据', value: 0}]
        }
        vue.$nextTick(function () {
          if (vue.type === '人民调解') {
            vue.title6 = '案件处理状态'
            vue.draw('target6', eos.setBar3(data, ['#F8E228', '#FF9C00'], 'vertical', 'integer', 36, undefined, false, 30))
          } else if (vue.type === '110联动') {
            vue.title6 = '所在人群'
            vue.draw('target6', eos.setPie3(data))
          } else if (vue.type === '公共法律服务') {
            vue.title6 = '调解占比'
            vue.draw('target6', eos.setPie2(data))
          } else if (vue.type === '纠纷排查') {
            vue.title6 = '所在人群'
            vue.draw('target6', eos.setPie3(data))
          }
        })
      })
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
  #businessNum {
    min-height: 1080px;
    min-width: 1920px;
    overflow-y: auto;
  }
  .shade {
    background: url('/static/renmintj/pic_bg.png');
    background-repeat:no-repeat;
    background-position:center;
  }
  .businessNum_header{
    width: 100%;
    min-width: 1920px;
    height: 87px;
    background: url('/static/renmintj/pic_title.png');
    background-repeat:no-repeat;
    background-position:center;
    z-index: 99;
    position:relative;
  }
  .businessNum_back{
    background:url('/static/renmintj/btn_back.png');
    position:absolute;
    left:22px;
    width:137px;
    height: 35px;
    background-position: center;
    top: 28px;
    cursor:pointer;
  }
  .businessNum_nav{
    height: 24px;
    margin:6px 0 20px 0;
    padding-left: 34px;
    width: 100%;
    box-sizing: border-box;
  }
  .businessNum_nav_span{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(94,126,203,1);
  }
  .businessNum_nav2{
    margin-left: 34px;
    border-bottom: 1px solid rgba(15,59,186,1);
    display: inline-block;
  }
  .businessNum_nav2_span{
    font-size:20px;
    font-family:HiraginoSansGB-W3;
    padding-bottom: 10px;
    display: inline-block;
    width: 6em;
    text-align: center;
    cursor:pointer;
    color:rgba(94,126,203,1);
  }
  .businessNum_nav2_span_active{
    color:rgba(255,198,0,1);
    border-bottom: 3px solid rgba(255,198,0,1);
  }
  .businessNum_content{
    width: 100%;
    height: 903px;
    box-sizing: border-box;
    padding: 13px 20px 20px 20px;
  }
  .businessNum_content_top{
    width: 974px;
    height: 483px;
    float: left;
    margin-bottom: 14px;
    margin-right: 14px;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
  }
  .businessNum_content_top:nth-of-type(1){
    width: 318px;
  }
  .businessNum_content_top:nth-of-type(2){
    width: 1547px;
    margin-right: 0px;
  }
  .businessNum_content_bottom{
    width: 614px;
    height: 371px;
    float: left;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
    margin-right: 14px;
  }
  .businessNum_content_bottom:nth-of-type(5){
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
    height: 100%;
  }
  .target4,.target5,.target6{
    width: calc(100% - 20px);
    height: 320px;
    padding: 0 10px;
  }
  .businessNum_content_title{
    width: 100%;
    color: white;
  }
  .businessNum_content_title_left{
    width: 50%;
    float: left;
    margin-top: 21px;
  }
  .businessNum_content_span1{
    font-size:22px;
    font-family:MicrosoftYaHei;
    color:rgba(125,165,254,1);
    padding-left: 8px;
    margin-left: 28px;
    border-left: 3px solid rgba(125,165,254,1);
    display:block;
  }
  .businessNum_content_span2{
    display:block;
    font-size:18px;
    font-family:MicrosoftYaHei;
    color:rgba(125,165,254,1);
    padding-left: 42px;
  }
  .businessNum_content_title_right{
    width: 50%;
    float: right;
    margin-top: 26px;
  }
  .businessNum_content_span_container{
    float:right;
    padding-left:79px;
  }

  .businessNum_content_span3{
    font-size:38px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,198,0,1);
    display:block;
    text-align:center;
    padding-right:40px;
  }
  .businessNum_content_span4{
    font-size:16px;
    font-family:HiraginoSansGB-W3;
    color:rgba(77,132,254,1);
    display:block;
    text-align:center;
    padding-right:40px;
  }
  .businessNum_content_span5{
    font-size:16px;
    font-family:MicrosoftYaHei;
    padding:2px 12px;
    float:right;
    border-radius:15px;
    margin-right:16px;
    color:rgba(153,153,153,1);
    cursor:pointer;
  }
  .businessNum_content_active{
    color:rgba(255,255,255,1);
    background:rgba(77,132,254,1);
  }
  .businessNum_content_span5:first-child{
    margin-right:38px;
  }
  .right2{
    margin-top:25px;
  }
  .businessNum_detail{
    width:420px;
    height:389px;
    float:left;
    background:url("/static/renmintjOther/icon_directing.png");
    background-repeat:no-repeat;
    background-position:left center;
  }
  .businessNum_detail_main{
    width:307px;
    height:264px;
    background:url('/static/renmintjOther/pic_frame.png');
    margin-top:67px;
    margin-left:77px;
    max-height: 264px;
    overflow-y: auto;
  }
  .businessNum_detail_main::-webkit-scrollbar{
    width: 4px;
    background-color: #ffffff;
  }
  .businessNum_detail_main::-webkit-scrollbar-thumb{
    background:#ebeaee;
    border-radius:4px;
  }
  .businessNum_detail_main2{
    width:485px;
    height:264px;
    margin-top:67px;
    margin-left:77px;
  }
  .businessNum_detail_title{
    height:34px;
    display:block;
    color:rgba(174,195,255,1);
    line-height:34px;
    font-size:20px;
    padding-left:8px;
    margin-bottom:2px;
  }
  .businessNum_detail_content{
    height:38px;
    display:block;
    line-height:38px;
    margin:0 1px;
  }
  .businessNum_detail_content:nth-of-type(2n){
    background:rgba(19,38,101,1);
  }
  .businessNum_detail_span1{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(184,206,255,1);
    padding-left:61px;
    display:inline-block;
    width:70%;
    box-sizing:border-box;
  }
  .businessNum_detail_span2{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,198,0,1);
    display:inline-block;
    width:25%;
  }
  .businessNumCityList {
   float: left;
   width: 260px;
   height: 60px;
   padding-top:  40px;
   padding-left: 32px;
  }
  .statistics{
    float: left;
    width: 260px;
    height: 60px;
    padding-left: 40px;
    padding-top: 45px;
  }
  .statistics::before{
    float: left;
    width: 69px;
    height: 80px;
    content: url('/static/renmintj/icon_document2.png');
    padding-right: 10px;
  }
  .statistics .num {
    display: inline-block;
    color: #FFFFFF;
    font-size: 30px;
    vertical-align: middle;
  }
  .statistics .title {
    display: inline-block;
    color: #79BEF2;
    font-size: 14px;
    vertical-align: middle;
  }
</style>
