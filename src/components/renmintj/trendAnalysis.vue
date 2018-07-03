<template>
<div id='trendAnalysis' class='shade'>
  <div class="trendAnalysis_header">
    <div class="trendAnalysis_back"  @click="changeRouter('index4renmintj')"></div>
  </div>
  <div class="trendAnalysis_nav">
    <span class="trendAnalysis_nav_span">首页 > 趋势分析</span>
  </div>
  <div class="trendAnalysis_nav2">
    <span class="trendAnalysis_nav2_span trendAnalysis_nav2_span_active">{{typeDefault[0]}}</span>
  </div>
  <div class="cas_container">
    <el-cascader
      class="cascader"
      :options="type"
      placeholder="类型"
      v-model="typeDefault"
    ></el-cascader>
    <el-cascader
      class="cascader"
      :options="area"
      placeholder="区域"
      v-model="areaDefault"
    ></el-cascader>
  </div>
  <div class="trendAnalysis_content">
    <div class="trendAnalysis_content_left">
      <div class="trendAnalysis_content_left_once">
        <div class="trendAnalysis_content_left_once_children">
          <span class="span1">纠纷数量</span><br>
          <span class="span2">{{ count | numFormat }}</span>
          <span class="span1">件</span>
        </div>
        <div class="trendAnalysis_content_left_once_children">
          <span class="span1">重点事件</span><br>
          <span class="span2">{{ importantNum | numFormat }}</span>
          <span class="span1">件</span>
        </div>
        <div class="trendAnalysis_content_left_once_children">
          <span class="span1">单月最高</span><br>
          <span class="span2">{{max | numFormat }}</span>
          <span class="span1">件</span><br>
          <span class="span3">{{ '（出现在' + maxMonth + '）' }}</span>
        </div>
        <div class="trendAnalysis_content_left_once_children">
          <span class="span1">月均</span><br>
          <span class="span2">{{ average | numFormat }}</span>
          <span class="span1">件</span>
        </div>
      </div>
      <div class="trendAnalysis_content_left_once">
        <div class="target2"></div>
      </div>
    </div>
    <div class="trendAnalysis_content_right">
      <div class="trendAnalysis_content_right_once">
        <div class="trendAnalysis_content_title clearfix">
          <div class="trendAnalysis_content_title_left">
            <span class="trendAnalysis_content_span1">纠纷类型(TOP10)</span>
          </div>
        </div>
        <div class="target3"></div>
      </div>
      <div class="trendAnalysis_content_right_once">
        <div class="trendAnalysis_content_title clearfix">
          <div class="trendAnalysis_content_title_left">
            <span class="trendAnalysis_content_span1">纠纷热词</span>
          </div>
        </div>
        <div class="target4">
          <canvas class="target4_canvas" width="530px" height="300px"></canvas>
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
import json from '@/util/dictionaryMapping'
import urlConfig from '@/util/urlConfig'
import rollScreen from '../rollScreen.vue'
import digitalRolling from '../digitalRolling.vue'

export default {
  name: 'trendAnalysis',
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
      count: 0,
      importantNum: 0,
      max: 0,
      average: 0,
      maxMonth: '0000-00',
      area: json.area,
      areaDefault: ['SHJCK01000'],
      type: json.businessType,
      typeDefault: ['人民调解'],
      date: [],
      dateLength: 0,
      limit: 0,
      dateRange: {
        start: '',
        end: ''
      },
      loading: ''
    }
  },
  watch: {
    typeDefault: function (newValue, oldValue) {
      this.limit = 0
      this.dateRange.start = ''
      this.dateRange.end = ''
      this.getData()
    },
    areaDefault: function (newValue, oldValue) {
      this.limit = 0
      this.dateRange.start = ''
      this.dateRange.end = ''
      this.getData()
    },
    dateRange: {
      handler: function (newValue, oldValue) {
        this.getData()
      },
      deep: true
    }
  },
  filters: {
    numFormat (num) {
      num = num || 0
      return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
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
        this.myChart[domName].on('datazoom', function (params) {
          vue.dateRange.start = vue.date[Math.round(params.start / 100 * vue.dateLength)]
          let endIndex = Math.round(params.end / 100 * vue.dateLength)
          endIndex = (endIndex >= vue.dateLength) ? (vue.dateLength - 1) : endIndex
          vue.dateRange.end = vue.date[endIndex]
        })
      }
    },
    drawWordcloud2 (domName, data) {
      let option = wos.setOption(data.map((item) => {
        return [item.name, item.value]
      }))
      let vue = this
      let ctx = document.getElementsByClassName(domName + '_canvas')[0].getContext('2d')
      ctx.clearRect(0, 0, 530, 300)
      let img = new Image()
      img.src = '/static/renmintj/cloud1.png'
      img.onload = function () {
        ctx.drawImage(img, 0, 0)
        vue.$wordcloud(document.getElementsByClassName(domName + '_canvas')[0], option)
      }
    },
    // 路由跳转
    changeRouter (name) {
      this.$router.push({name: name})
    },
    getData () {
      let vue = this
      vue.loading = vue.$loading({
        lock: true,
        text: '数据加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
      })
      let reqParam = {area: this.areaDefault[0], source: this.typeDefault[0], startDate: this.dateRange.start, endDate: this.dateRange.end}
      let baseUrl = urlConfig.baseUrl
      let url = ''
      url = '/trendAnalysis'
      http.get(baseUrl + url, reqParam, (data) => {
        vue.$nextTick(function () {
          vue.limit++
          vue.count = data.jiuFenSL
          vue.importantNum = data.zhongDianSJS
          vue.max = data.danYueZG
          vue.maxMonth = data.danYueZGSJ
          vue.average = data.yueJun
          if (vue.limit === 1) {
            vue.draw('target2', eos.setLine5(data.meiYueAJSL, (date) => {
              vue.date = date
              vue.dateLength = date.length
            }))
          }
          data.jiuFenLX = data.jiuFenLX.sort(function (a, b) {
            if (a.value >= b.value) {
              return 1
            } else {
              return -1
            }
          }).slice(0, 10)
          vue.draw('target3', eos.setBar3(data.jiuFenLX, ['#4D84FE', '#B3CAFF'], 'horizon', 'integer'))
          vue.drawWordcloud2('target4', data.jiuFenCY)
          vue.loading.close()
        })
      })
    }
  },
  created () {
    this.getData()
  },
  mounted () {},
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
  #trendAnalysis {
    min-height: 1080px;
    min-width: 1920px;
    overflow-y: hidden;
  }
  .shade {
    background: url('/static/renmintj/pic_bg.png');
    background-repeat:no-repeat;
    background-position:center;
  }

  .trendAnalysis_header{
    width: 100%;
    min-width: 1920px;
    height: 87px;
    background: url('/static/renmintj/pic_title.png');
    background-repeat:no-repeat;
    background-position:center;
    z-index: 99;
    position:relative;
  }
  .trendAnalysis_back{
    background:url('/static/renmintj/btn_back.png');
    position:absolute;
    left:22px;
    width:137px;
    height: 35px;
    background-position: center;
    top: 28px;
    cursor:pointer;
  }
  .trendAnalysis_nav{
    height: 24px;
    margin:6px 0 20px 0;
    padding-left: 34px;
    width: 100%;
    box-sizing: border-box;
  }
  .trendAnalysis_nav_span{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(94,126,203,1);
  }
  .trendAnalysis_nav2{
    margin-left: 34px;
    /* border-bottom: 1px solid rgba(15,59,186,1); */
    border-bottom: 0px solid rgba(15,59,186,1);
    display: inline-block;
  }
  .trendAnalysis_nav2_span{
    font-size:20px;
    font-family:HiraginoSansGB-W3;
    padding-bottom: 10px;
    display: inline-block;
    width: 6em;
    text-align: center;
    cursor:pointer;
    color:rgba(94,126,203,1);
  }
  .trendAnalysis_nav2_span_active{
    color:rgba(255,198,0,1);
    /* border-bottom: 3px solid rgba(255,198,0,1);     */
    border-bottom: 0px solid rgba(255,198,0,1);
  }
  .trendAnalysis_content{
    width: 100%;
    height: 903px;
    box-sizing: border-box;
    padding: 12px 20px 18px 20px;
  }
  .trendAnalysis_content_left{
    width: 1241px;
    float: left;
    margin-right: 16px;
  }
  .trendAnalysis_content_left_once{
    width: 1241px;
    height: 140px;
    float: left;
    margin-bottom: 17px;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
  }
  .trendAnalysis_content_left_once:nth-of-type(2){
    height: 720px;
    margin-bottom: 0;
  }
  .trendAnalysis_content_left_once_children {
    float: left;
    width: calc(305px - 90px);
    height: 60px;
    margin-top: calc((140px - 60px) / 2);
    margin-left: 90px;
    border-right: 1px solid  #1F3490;
  }
  .trendAnalysis_content_left_once_children .span1{
    color: #5E7ECB;
    font-size: 14px;
  }
  .trendAnalysis_content_left_once_children .span2{
    color: #F6FBFF;
    font-size: 38px;
  }
  .trendAnalysis_content_left_once_children .span3{
    color: #00C6FF;
    font-size: 12px;
  }
  .trendAnalysis_content_left_once_children:last-of-type {
    border-right: 0px;
  }
  .target2 {
    width: 1241px;
    height: 720px;
  }
  .trendAnalysis_content_right{
    width: 622px;
    float: left;
  }
  .trendAnalysis_content_right_once{
    width: 622px;
    height: 483px;
    float: left;
    margin-bottom: 23px;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
  }
  .trendAnalysis_content_right_once:nth-of-type(2){
    height: 371px;
    margin-bottom: 0;
  }
  .target3 {
    width: 622px;
    height: 443px;
  }
  .target4 {
    width: 532px;
    height: 301px;
    margin: 15px 45px;
    background: url('/static/renmintj/cloud2.png') no-repeat;
  }
  .trendAnalysis_content_title{
    width: 100%;
    color: white;
  }
  .trendAnalysis_content_title_left{
    width: 50%;
    float: left;
    margin-top: 15px;
  }
  .trendAnalysis_content_span1{
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
  .cas_container{
    float: right;
    margin-right: 25px;
  }
  .cas_container_span{
    font-size:16px;
    font-family:HiraginoSansGB-W3;
    color:rgba(94,126,203,1);
  }
</style>
