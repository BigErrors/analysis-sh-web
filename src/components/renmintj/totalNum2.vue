<template>
  <div id='totalNum' class='shade'>
    <div class="totalNum_header">
      <div class="totalNum_back" @click="changeRouter('index4renmintj')" style="cursor: pointer;"></div>
    </div>
    <div class="totalNum_nav">
      <span class="totalNum_nav_span">首页 > 业务数量</span>
    </div>
    <div class="totalNum_nav2">
      <span class="totalNum_nav2_span" :class="{'totalNum_nav2_span_active':type==='人民调解'?true:false}" @click="type='人民调解'">人民调解</span>
      <span class="totalNum_nav2_span " :class="{'totalNum_nav2_span_active':type==='110联动'?true:false}" @click="type='110联动'">110联动</span>
      <span class="totalNum_nav2_span " :class="{'totalNum_nav2_span_active':type==='公共法律服务'?true:false}" @click="type='公共法律服务'">公共法律服务</span>
      <span class="totalNum_nav2_span " :class="{'totalNum_nav2_span_active':type==='纠纷排查'?true:false}" @click="type='纠纷排查'">纠纷排查</span>
    </div>
    <div class="totalNum_content">
      <div class="totalNum_content_top">
        <div class="statistics">
          <digitalRolling class="num" :height='41' :width='25' :number='statistics.day' :fontSize='41' :fontColor='"#1194F8"'></digitalRolling>
          <br>
          <span class="title">今日新增</span>
        </div>
        <div class="statistics">
          <digitalRolling class="num" :height='41' :width='25' :number='statistics.year' :fontSize='41' :fontColor='"#1194F8"'></digitalRolling>
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
          <span class="totalNum_content_span5" :class="{'totalNum_content_active':timeType==='本周'?true:false}" @click="timeType='本周'">本周</span>
          <span class="totalNum_content_span5" :class="{'totalNum_content_active':timeType==='本月'?true:false}" @click="timeType='本月'">本月</span>
          <span class="totalNum_content_span5" :class="{'totalNum_content_active':timeType==='今年'?true:false}" @click="timeType='今年'">今年</span>
          </div>
        </div>
        <div class='target2'></div>
        <div class="totalNum_detail">
          <div class="totalNum_detail_main">
            <div class="totalNum_detail_title">{{type2Title}}</div>
            <div class="totalNum_detail_content" v-for="(item,index) in type2" :key="index">
              <span class="totalNum_detail_span1">{{item.name}}</span>
              <span class="totalNum_detail_span2">{{item.value}}</span>
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
        <div class="target3" v-if="false"></div>
      </div>
      <div class="totalNum_content_bottom">
        <div class="totalNum_content_title clearfix">
          <div class="totalNum_content_title_left">
            <span class="totalNum_content_span1">各区案件数量(TOP10)</span>
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
        <div class='renmintj_center_table' v-if="false">
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

export default {
  name: 'totalNum',
  components: {
    rollScreen,
    digitalRolling
  },
  data () {
    return {
      myChart: {},
      type: '人民调解',
      statistics: {
        year: 0,
        day: 0
      },
      numData: {
        arenmintj: {},
        a110: {},
        afalvfw: {},
        ajiufenpc: {}
      },
      timeType: '今年',
      typeData: {},
      type2Title: '',
      type2: [],
      barData: {
        arenmintj: [],
        a110: [],
        afalvfw: [],
        ajiufenpc: []
      },
      table: {
        zhongdiansj: [],
        dLength: 0,
        lineNum: 0
      },
      sourceData: [],
      keyMap: {'人民调解': 'arenmintj', '110联动': 'a110', '公共法律服务': 'afalvfw', '纠纷排查': 'ajiufenpc'},
      keyMap2: {'人民调解': 'source_rmtj', '110联动': 'source_110', '公共法律服务': 'source_jc', '纠纷排查': 'source_pc'}
    }
  },
  watch: {
    type: function (newValue, oldValue) {
      this.statistics = this.numData[this.keyMap[newValue]]
      this.setTypeData()
      this.draw('target4', eos.setBar3(this.barData[this.keyMap[newValue]], ['#4D84FE', '#B3CAFF'], 'hortizon', 'integer'))
      this.draw('target5', eos.setPie3(this.sourceData[this.keyMap2[newValue]]))
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
      this.draw('target2', eos.setPie2(this.dataFormatter3(this.typeData[this.type][this.timeType])))
      this.type2Title = '民事纠纷'
      this.type2 = this.dataFormatter4(this.typeData[this.type][this.timeType][this.type2Title])
    },
    setType2Data (type) {
      this.type2Title = type
      this.type2 = this.dataFormatter4(this.typeData[this.type][this.timeType][this.type2Title])
    },
    dataFormatter (data) {
      // 声明空对象
      let tempObj = {}
      // 声明空数组，用于存储类别
      let typeList = []
      data.map(item => {
        tempObj[item.name] = item.value
        // 存储筛选类别
        if (item.name.split('_day').length > 1) {
          typeList.push(item.name.split('_day')[0])
        }
      })
      let typeObj = {}
      // 对临时对象中的数据按照类别分类, 存储在新的对象中
      typeList.map(item => {
        typeObj[item] = {year: tempObj[item], day: tempObj[item + '_day']}
      })
      return typeObj
    },
    dataFormatter2 (data) {
      //  声明空数组
      let tempList = []
      // 将对象{'闸北': '123','徐汇':'456'}转成数组[{name: '闸北',value: 123},{name: '徐汇',value: 123}]
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          tempList.push({name: key, value: parseInt(data[key])})
        }
      }
      // 对数组进行排序
      tempList.sort((item1, item2) => {
        if (item1.value < item2.value) {
          return 1
        }
        if (item1.value > item2.value) {
          return -1
        }
        return 0
      })
      // 返回处理好的数据(top10)
      return tempList.splice(0, 10).reverse()
    },
    dataFormatter3 (data) {
      //  声明空数组
      let tmpList = []
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          tmpList.push({name: key, value: parseInt(data[key]['总数'])})
        }
      }
      return tmpList
    },
    dataFormatter4 (data) {
      //  声明空数组
      let tmpList = []
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (key !== '总数') {
            tmpList.push({name: key, value: parseInt(data[key])})
          }
        }
      }
      return tmpList
    },
    dataFormatter5 (data) {
      // 声明空对象
      let tmpObj = {}
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          tmpObj[key] = data[key].map((item) => {
            return {name: item.source, value: item.number}
          })
        }
      }
      return tmpObj
    },
    getData () {
      let vue = this
      let reqParam = {}
      let url = ''
      url = '/peopleMediate/ywsj_casestatistics_count'
      http.get(url, reqParam, (data) => {
        let newData = vue.dataFormatter(data)
        vue.numData.arenmintj = newData.mbm_case_count
        vue.numData.a110 = newData.mms_alarm110info_count
        vue.numData.afalvfw = newData.wws_consult_count
        vue.numData.ajiufenpc = newData.cds_invest_count
        // 初始化渲染
        vue.statistics = vue.numData.arenmintj
      })
      url = '/peopleMediate/ywsj_casecount_down_detial_2'
      http.get(url, reqParam, (data) => {
        vue.barData.arenmintj = vue.dataFormatter2(data.mbm_case_count_sql)
        vue.barData.a110 = vue.dataFormatter2(data.mms_alarm110info_count_sql)
        vue.barData.afalvfw = vue.dataFormatter2(data.wws_consult_count_sql)
        vue.barData.ajiufenpc = vue.dataFormatter2(data.cds_invest_count_sql)
        // 初始化渲染
        vue.$nextTick(function () {
          vue.draw('target4', eos.setBar3(vue.barData.arenmintj, ['#4D84FE', '#B3CAFF'], 'hortizon', 'integer'))
        })
      })
      url = '/peopleMediate/ywsj_casecount_down_detial_1'
      http.get(url, reqParam, (data) => {
        vue.typeData = data
        // 初始化渲染
        vue.$nextTick(function () {
          vue.setTypeData()
        })
      })
      url = '/peopleMediate/YewuslSource'
      http.get(url, reqParam, (data) => {
        vue.sourceData = vue.dataFormatter5(data)
        // 初始化渲染
        vue.$nextTick(function () {
          vue.draw('target5', eos.setPie3(vue.sourceData[vue.keyMap2[vue.type]]))
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
    width: 260px;
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
