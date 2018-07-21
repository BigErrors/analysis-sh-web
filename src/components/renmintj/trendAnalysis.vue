<template>
  <div class='trendAnalysis_container' v-loading="loading"
    element-loading-text="数据加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="head clearfix">
      <div class="title">基层司法大数据子平台</div>
      <div class="left">
        <div class="back" @click="changeRouter('index4renmintj')"></div>
      </div>
      <div class="right">
        <span>{{timeCom}}</span>
      </div>
    </div>
    <div class="body">
      <sidenav></sidenav>
      <div class="nav">
        <span>首页 > 趋势分析</span>
      </div>
      <div class="nav2 clearfix">
        <div class="navLeft">
          <span class="navspan">{{typeDefault[0]}}</span>
        </div>
        <div class="navRight">
          <div class="date_container">
            <el-cascader
              class="cascader"
              style="z-index:1;height:30px;line-height:30px;font-size:12px;width:120px"
              :options="type"
              placeholder="类型"
              v-model="typeDefault"
            ></el-cascader>
          </div>
          <div class="date_container">
            <el-cascader
              class="cascader"
              style="z-index:1;height:30px;line-height:30px;font-size:@fontSamll;width:120px"
              :options="area"
              placeholder="区域"
              v-model="areaDefault"
            ></el-cascader>
          </div>
        </div>
      </div>
      <div class="content_container">
        <div class="left">
          <div class="top">
            <div class="box">
              <div class="l_container clearfix">
                <span class="span_title">纠纷数量</span>
                <div class="span_content clearfix">
                  <span class="span1">{{ count | numFormat }}</span>
                  <span class="span2">件</span>
                </div>
              </div>
              <div class="border"></div>
            </div>
            <div class="box">
              <div class="l_container clearfix">
                <span class="span_title">重点事件数</span>
                <div class="span_content clearfix">
                  <span class="span1">{{ importantNum | numFormat }}</span>
                  <span class="span2">件</span>
                </div>
              </div>
              <div class="border"></div>
            </div>
            <div class="box">
              <div class="l_container clearfix">
                <span class="span_title">单月最高</span>
                <div class="span_content clearfix">
                  <span class="span1">{{max | numFormat }}</span>
                  <span class="span2">件</span>
                </div>
                <span class="span3">{{'(出现在' + maxMonth + ')' }}</span>
              </div>
              <div class="border"></div>
            </div>
            <div class="box">
              <div class="l_container clearfix">
                <span class="span_title">月均</span>
                <div class="span_content clearfix">
                  <span class="span1">{{ average | numFormat }}</span>
                  <span class="span2">件</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom target2">
          </div>
        </div>
        <div class="right">
          <div class="top">
            <div class="title">
              <div class="border"></div>
              <span>纠纷类型（TOP10）</span>
            </div>
            <div class="echarts_container target3"></div>
          </div>
          <div class="bottom">
            <div class="title">
              <div class="border"></div>
              <span>纠纷热词</span>
            </div>
            <div class="echarts_container target4">
              <canvas class="target4_canvas" width="360" height="204"></canvas>
            </div>
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
import digitalRolling from '../digitalRolling.vue'

export default {
  name: 'trendAnalysis',
  components: {
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
      loading: false,
      time: new Date()
    }
  },
  computed: {
    timeCom () {
      let now = this.time
      let day = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'][now.getDay() - 1]
      let minute = (now.getMinutes() >= 10) ? (now.getMinutes().toString()) : ('0' + now.getMinutes().toString())
      return now.getFullYear().toString() + '/' + (now.getMonth() + 1).toString() + '/' + now.getDate().toString() + ' ' + now.getHours().toString() + ':' + minute + ' ' + day
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
      ctx.clearRect(0, 0, 360, 204)
      let img = new Image()
      img.src = '/static/renmintjNew/ciyun2.png'
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
      vue.loading = true
      let reqParam = {area: this.areaDefault[0], source: this.typeDefault[0], startDate: this.dateRange.start, endDate: this.dateRange.end}
      let baseUrl = urlConfig.baseUrl
      let url = ''
      url = '/trendAnalysis'
      http.get(baseUrl + url, reqParam, (data) => {
        vue.loading = false
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
          if (data.jiuFenCY.length > 0) {
            vue.drawWordcloud2('target4', data.jiuFenCY)
          } else {
            vue.drawWordcloud2('target4', [{name: '无数据', value: 1}])
          }
        })
      })
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    let vue = this
    window.addEventListener('resize', function () {
      vue.$nextTick(function () {
        vue.myChart['target2'].resize()
        vue.myChart['target3'].resize()
        vue.myChart['target4'].resize()
      })
    })
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
@blockBack:#171c26;
@table:#131821;
@table2:rgba(40,45,58,0.3);
@fontWhite:#f1f1f1;
@fontGray:rgba(241,241,241,0.8);
@fontSamll:14px;
@fontMiddle:16px;
.trendAnalysis_container {
  background: #0B131C;
  position: absolute;
  width: 100%;
  height: 100%;
  min-width: 1366px;
  min-height: 766px;
  .head {
    display: block;
    background: url('/static/renmintjNew/headback.png') no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    position: relative;
    box-sizing: border-box;
    margin: 0 28px;
    border-top: 14px solid rgba(0, 0, 0, 0);
    .title {
      position: absolute;
      top: 17px;
      font-size: 20px;
      font-family: RTWSYueGoTrial-Regular;
      color: rgba(254, 254, 254, 1);
      left: 50%;
      transform: translate(-50%)
    }
    .left {
      padding: 25px 0 10px 0px;
      float: left;
      .back {
        background: url('/static/renmintj/btn_back.png');
        width: 137px;
        height: 35px;
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer;
      }
    }
    .right {
      float: right;
      padding: 30px 0 0 0;
      span {
        font-size: @fontSamll;
        font-family: HiraginoSansGB-W3;
        color: @fontGray;
      }
    }
  }
  .body{
    height: calc(100% - 85px);
    width: 100%;
    display: block;
    position: relative;
    .nav{
      height: 24px;
      margin: 0px 0 20px 0;
      padding-left: 34px;
      padding-top:6px;
      width: 100%;
      box-sizing: border-box;
      line-height: 24px;
      span{
        font-size: @fontSamll;
        font-family: HiraginoSansGB-W3;
        color:@fontGray;
      }
    }
    .nav2{
      display: block;
      padding: 0 34px;
      box-sizing: border-box;
      .navLeft{
        float: left;
        // border-bottom:1px solid @fontGray;
        .navspan{
          font-size:14px;
          font-family:HiraginoSansGB-W3;
          color:@fontGray;
          display: inline-block;
          padding:0 2px 4px 2px;
          width: 6em;
          text-align: center;
          cursor: pointer;
          position: relative;
        }
        .active{
          color:@fontWhite;
          // border-bottom: 3px solid #2E89FD;
          &::after{
            content: '';
            position: absolute;
            width: 100%;
            height: 3px;
            background: #2E89FD;
            left: 0;
            bottom:-1px;
          }
        }
      }
      .navRight{
        float: right;
        .date_container{
          float: right;
          margin-right: 15px;
        }
      }
    }
    .content_container{
      height: calc(100% - 89px);
      margin-top:16px;
      width: 100%;
      box-sizing: border-box;
      padding:0 24px;
      position: relative;
      display: flex;
      .left{
        flex: 0.65;
        height: 100%;
        position: relative;
        margin-right: 8px;
        .top{
          width: 100%;
          height: 20%;
          background: @blockBack;
          display: flex;
          .box{
            flex: 1;
            position: relative;
            .l_container{
              position: absolute;
              height: 56px;
              left: 50%;
              top: 50%;
              transform: translate(-50%,-50%);
              .span_title{
                display: block;
                height: 24px;
                line-height: 24px;
                font-size:@fontSamll;
                color:@fontGray;
              }
              .span_content{
                display: block;
                height: 32px;
                .span1{
                  height: 32px;
                  float: left;
                  font-size:27px;
                  font-family:'Impact';
                  color:@fontWhite;
                }
                .span2{
                  height: 16px;
                  float: left;
                  margin:12px 0 0 12px;
                  font-size:@fontSamll;
                  font-family:HiraginoSansGB-W3;
                  color:@fontGray;
                }
              }
              .span3{
                position: absolute;
                bottom:-22px;
                left: 0;
                font-size:@fontSamll;
                font-family:HiraginoSansGB-W3;
                color:@fontGray;
                width: 200px;
                transform-origin: left;
                transform:scale(0.9);
              }
            }
            .border{
              width: 1px;
              height: 33%;
              background: #F1F1F1;
              position: absolute;
              top: 50%;
              right: 1px;
              transform: translate(0,-50%);
            }
          }
        }
        .bottom{
          width: 100%;
          height: calc(80% - 16px);
          margin:8px 0;
          background: @blockBack;
          .time{
            font-size:@fontSamll;
            font-family:HiraginoSansGB-W3;
            color:rgba(0,198,255,1);
            padding-left: 20px;
          }
        }
      }
      .right{
        flex: 0.35;
        height: 100%;
        position: relative;
        .top{
          width: 100%;
          height: 54%;
          background: @blockBack;
        }
        .bottom{
          width: 100%;
          height: calc(46% - 16px);
          margin:8px 0;
          background: @blockBack;
          position: relative;
          .target4_canvas{
            position: absolute;
            top: 50%;
            left: 50%;
            background: url('/static/renmintjNew/ciyun.png');
            transform: translate(-50%,-50%);
          }
        }
      }
      .echarts_container{
        height: calc(100% - 26px);
        width: 100%;
      }
      .title{
        display: block;
        box-sizing: border-box;
        padding-top:5px;
        position: relative;
        .border{
          width: 2px;
          height: 12px;
          background: @fontWhite;
          display: inline-block;
          margin-left:10px;
          margin-right: 5px;
        }
        span{
          font-size:16px;
          font-family:HiraginoSansGB-W3;
          color:@fontWhite
        }
      }
    }
  }
}
</style>
