<template>
  <div class="regional_container">
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
        <span>首页 > 区域分析</span>
        <div class="date_container">
          <el-date-picker
            v-model="date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </div>
      <div class="content_container">
        <div class="top">
          <div class="box">
            <span class="span1"><span class="spans">纠纷总量</span></span>
            <span class="span2">{{$echarts.format.addCommas(jiuFenZL)}}</span>
            <span class="span3">件</span>
          </div>
          <div class="box">
            <span class="span1"><span class="spans">调解成功率</span></span>
            <span class="span2">{{tiaoJieCGL+'%'}}</span>
          </div>
          <div class="box">
            <span class="span1"><span class="spans">调解赔付金额</span></span>
            <span class="span2">{{$echarts.format.addCommas(tiaoJiePCJE)}}</span>
            <span class="span3">万元</span>
          </div>
          <div class="box">
            <span class="span1"><span class="spans">平均调解时长</span></span>
            <span class="span2">{{$echarts.format.addCommas(pingJunTJSC)}}</span>
            <span class="span3">小时</span>
          </div>
        </div>
        <div class="midlle"></div>
        <div class="bottom">
          <div class="box">
            <div class="title">
              <div class="border"></div>
              <span>案件万人比排名</span>
            </div>
            <div class="echarts_container">
              <div v-for="(item,index) in anJianSLWRBPM" :key="index" class="line">
                <div class="line_span">
                  <span class="span_name">{{item.name}}</span>
                  <span class="span_rate">{{parseInt(item.value*100)+'%'}}</span>
                </div>
                <div class="line_rate">
                  <div class="line_rating" :style="{width:100*item.value+'%'}"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="box">
            <div class="title">
              <div class="border"></div>
              <span>调解失败率排名</span>
            </div>
            <div class="echarts_container">
              <div v-for="(item,index) in tiaoJieSBLPM" :key="index" class="line">
                <div class="line_span">
                  <span class="span_name">{{item.name}}</span>
                  <span class="span_rate">{{parseInt(item.value*100)+'%'}}</span>
                </div>
                <div class="line_rate">
                  <div class="line_rating" :style="{width:100*item.value+'%'}"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="box">
            <div class="title">
              <div class="border"></div>
              <span>平均赔偿金额排名（万元）</span>
            </div>
            <div class="echarts_container">
              <div v-for="(item,index) in pingJunPCJEPM" :key="index" class="line">
                <div class="line_span">
                  <span class="span_name">{{item.name}}</span>
                  <span class="span_rate">{{parseInt(item.value*100)+'%'}}</span>
                </div>
                <div class="line_rate">
                  <div class="line_rating" :style="{width:100*item.value+'%'}"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="box">
            <div class="title">
              <div class="border"></div>
              <span>平均调解时长排名（h）</span>
            </div>
            <div class="echarts_container">
              <div v-for="(item,index) in pingJunTJSCPM" :key="index" class="line">
                <div class="line_span">
                  <span class="span_name">{{item.name}}</span>
                  <span class="span_rate">{{parseInt(item.value*100)+'%'}}</span>
                </div>
                <div class="line_rate">
                  <div class="line_rating" :style="{width:100*item.value+'%'}"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/util/httpUtil'
import urlConfig from '@/util/urlConfig'
import jsonUtil from '@/util/jsonUtil'
import eos from '@/util/echartsOptions'

export default {
  data () {
    return {
      myChart: {},
      time: new Date(),
      date: [(new Date()).getTime() - 3600 * 1000 * 24 * 4800, new Date()],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一年',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      anJianSLWRBPM: [{name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}],
      pingJunPCJEPM: [{name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}],
      pingJunTJSCPM: [{name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}],
      tiaoJieSBLPM: [{name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}],
      pingJunTJSC: 0,
      jiuFenZL: 0,
      tiaoJieCGL: 0,
      tiaoJiePCJE: 0
    }
  },
  computed: {
    timeCom () {
      let now = this.time
      let day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()]
      let minute = (now.getMinutes() >= 10) ? (now.getMinutes().toString()) : ('0' + now.getMinutes().toString())
      return now.getFullYear().toString() + '/' + (now.getMonth() + 1).toString() + '/' + now.getDate().toString() +
          ' ' + now.getHours().toString() + ':' + minute + ' ' + day
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
      if (domName === 'midlle') {
        // let vue = this
        this.myChart[domName].on('click', function (params) {
          if (params.dataType === 'node') {
            console.log(params.data.name)
          } else if (params.dataType === 'edge') {
            console.log(params.data.source, params.data.target)
          }
        })
      }
    },
    getData () {
      let _this = this
      let baseUrl = urlConfig.baseUrl
      let url = '/regionalAnalysis'
      let param = {area: 'SHJCK01000',
        startDate: jsonUtil.dateTimeFormat(_this.date[0]).slice(0, 9),
        endDate: jsonUtil.dateTimeFormat(_this.date[1]).slice(0, 9)}
      http.get(baseUrl + url, param, (data) => {
        this.anJianSLWRBPM = data.anJianSLWRBPM
        this.pingJunPCJEPM = data.pingJunPCJEPM
        this.pingJunTJSCPM = data.pingJunTJSCPM
        this.tiaoJieSBLPM = data.tiaoJieSBLPM
        this.pingJunTJSC = data.pingJunTJSC
        this.jiuFenZL = data.jiuFenZL
        this.tiaoJieCGL = data.tiaoJieCGL
        this.tiaoJiePCJE = data.tiaoJiePCJE
      })
    },
    changeRouter (name) {
      this.$router.push({name: name})
    }
  },
  watch: {
    date (to, from) {
      this.getData()
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.draw('midlle', eos.setGraph())
  }

}
</script>

<style lang="less" scoped>
@blockBack:#171c26;
@table:#131821;
@fontWhite:#f1f1f1;
@fontGray:rgba(241,241,241,0.8);
.regional_container{
  background: #0B131C;
  position: absolute;
  width: 100%;
  height: 100%;
  min-width:1366px;
  min-height: 766px;
  .head{
    display: block;
    background: url('/static/renmintjNew/headback.png') no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    position: relative;
    box-sizing: border-box;
    margin:0 28px;
    border-top:14px solid rgba(0,0,0,0);
    .title{
      position: absolute;
      top: 17px;
      font-size:20px;
      font-family:RTWSYueGoTrial-Regular;
      color:rgba(254,254,254,1);
      left: 50%;
      transform: translate(-50%)
    }
    .left{
      padding:25px 0 10px 0px;
      float: left;
      .back{
        background: url('/static/renmintj/btn_back.png');
        width: 137px;
        height: 35px;
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer;
      }
    }
    .right{
      float: right;
      padding:30px 0 0 0;
      span{
        font-size:12px;
        font-family:HiraginoSansGB-W3;
        color:@fontGray;
      }
    }
  }
  .body{
    height: calc(100% - 84px);
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
        font-size: 12px;
        font-family: HiraginoSansGB-W3;
        color:@fontGray;
      }
      .date_container{
       position: absolute;
       right: 28px;
       top: 8px;
      }
    }
    .content_container{
      height: calc(100% - 44px);
      width: 100%;
      display: block;
      box-sizing: border-box;
      padding: 0 24px 10px 24px;
      .top{
        height: 102px;
        width: 100%;
        background: @blockBack;
        position: relative;
        .box{
          float: left;
          width: 25%;
          height: 100%;
          .span1{
            display: block;
            font-size: 12px;
            color:@fontGray;
            height: 45%;
            position: relative;
          }
          .span2{
            display: inline-block;
            font-size: 27px;
            padding-left:100px;
            color:@fontWhite;
          }
          .span3{
            display: inline-block;
            font-size: 12px;
            color:@fontGray;
            padding-left: 5px;
          }
          .spans{
            position: absolute;
            left: 100px;
            bottom:10px;
          }
        }
      }
      .midlle{
        height: calc(100% - 302px);
        width: 100%;
        margin:10px 0;
      }
      .bottom{
        height: 180px;
        width:100%;
        background: @blockBack;
        .box{
          float: left;
          width: 25%;
          height: 100%;
          padding-right: 5%;
          box-sizing: border-box;
          position: relative;
          .echarts_container{
            height: calc(100% - 26px);
            width: 100%;
            box-sizing: border-box;
            padding:12px;
            position: relative;
            .line{
              height: 20%;
              width: 100%;
              .line_span{
                font-size:12px;
                height: 18px;
                line-height: 18px;
                .span_name{
                  color:@fontGray;
                  float: left;
                }
                .span_rate{
                  color:@fontWhite;
                  float: right;
                  transform: scale(0.9)
                }
              }
              .line_rate{
                height: 4px;
                margin:2px 0;
                background: #3C4A59;
                border-radius: 2px;
                .line_rating{
                  width: 0%;
                  transition: 0.6s linear;
                  height: 4px;
                  background: #0A96D7;
                  border-radius: 2px;
                }
              }
            }
          }
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
            color:@fontWhite;
          }
          .topn{
            font-size:12px;
            font-family:HiraginoSansGB-W3;
            color:@fontGray;
          }
        }
      }
    }
  }
}
</style>
