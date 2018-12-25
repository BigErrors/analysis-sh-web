<template>
  <div class="regional_container">
     <div class="head clearfix">
      <div class="title">智慧调解大数据平台</div>
      <div class="left">
        <div class="back" @click="changeRouter('index4renmintj')"></div>
      </div>
      <div class="right">
        <time-clock></time-clock>
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
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions">
          </el-date-picker>
         <el-button size="small" plain style='margin-left:20px;' @click="reset">重置</el-button>
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
            <span class="span2">{{tiaoJieCGL.toFixed(2)+'%'}}</span>
          </div>
          <div class="box">
            <span class="span1"><span class="spans">调解赔付金额</span></span>
            <span class="span2">{{$echarts.format.addCommas(tiaoJiePCJE.toFixed(2))}}</span>
            <span class="span3">万元</span>
          </div>
          <div class="box">
            <span class="span1"><span class="spans">平均调解时长</span></span>
            <span class="span2">{{$echarts.format.addCommas(pingJunTJSC)}}</span>
            <span class="span3">小时</span>
          </div>
        </div>
        <div class="midlle">
          <svg id="sankey"></svg>
        </div>
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
                  <span class="span_rate">{{item.labelValue}}</span>
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
                  <span class="span_rate">{{parseInt(item.labelValue*100)+'%'}}</span>
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
                  <span class="span_rate">{{item.labelValue}}</span>
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
                  <span class="span_rate">{{item.labelValue}}</span>
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
import json from '@/util/dictionaryMapping'
import * as d3 from 'd3'
import * as viz from '../../../static/viz'

export default {
  data () {
    return {
      date: jsonUtil.defaultDataRage(),
      pickerOptions: jsonUtil.pickerOptions,
      anJianSLWRBPM: [{name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}],
      pingJunPCJEPM: [{name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}],
      pingJunTJSCPM: [{name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}, {name: '', value: 0}],
      tiaoJieSBLPM: [{name: '', value: 0, labelValue: 0}, {name: '', value: 0, labelValue: 0}, {name: '', value: 0, labelValue: 0}, {name: '', value: 0, labelValue: 0}, {name: '', value: 0, labelValue: 0}],
      pingJunTJSC: 0,
      jiuFenZL: 0,
      tiaoJieCGL: 0,
      tiaoJiePCJE: 0,
      area: localStorage.getItem('area')
    }
  },
  computed: {},
  watch: {
    date (newValue, oldValue) {
      this.area = localStorage.getItem('area')
      this.getSankeyData()
      this.getOtherData()
    },
    area (newValue, oldValue) {
      this.getOtherData()
    }
  },
  methods: {
    getSankeyData () {
      let _this = this
      let baseUrl = urlConfig.baseUrl
      let url = '/regionalAnalysis'
      let param = { area: localStorage.getItem('area'), startDate: _this.date[0], endDate: _this.date[1] }
      http.get(baseUrl + url, param, (data) => {
        let sankeyData = data.sangJiT.links.map(item => { return [item.source, item.target, item.value] })
        _this.$nextTick(function () {
          document.getElementById('sankey').innerHTML = ''
          _this.setSankey(sankeyData)
        })
      })
    },
    getOtherData () {
      let _this = this
      let baseUrl = urlConfig.baseUrl
      let url = '/regionalAnalysis'
      let param = { area: _this.area, startDate: _this.date[0], endDate: _this.date[1] }
      http.get(baseUrl + url, param, (data) => {
        _this.anJianSLWRBPM = data.anJianSLWRBPM
        _this.pingJunPCJEPM = data.pingJunPCJEPM
        _this.pingJunTJSCPM = data.pingJunTJSCPM
        _this.tiaoJieSBLPM = data.tiaoJieSBLPM
        _this.pingJunTJSC = data.pingJunTJSC
        _this.jiuFenZL = data.jiuFenZL
        _this.tiaoJieCGL = data.tiaoJieCGL
        _this.tiaoJiePCJE = data.tiaoJiePCJE
      })
    },
    setSankey (data) {
      let clientFlowData = data
      let makeClientFlowColor = d3.scaleOrdinal(d3.schemeCategory20)
      let clientFlowColor = {}
      for (let i = 0, l = clientFlowData.length; i < l; i++) {
        let name = clientFlowData[i][1]
        if (clientFlowColor[name]) {
          continue
        }
        clientFlowColor[name] = makeClientFlowColor(name)
      }
      let bp = viz.bP()
      let width = document.getElementsByClassName('midlle')[0].clientWidth
      let height = document.getElementsByClassName('midlle')[0].clientHeight
      bp.data(clientFlowData)
        .min(0)
        .pad(20)
        .height(height - 80)
        .width(width)
        .orient('horizontal')
        .barSize(15)
        .fill(d => clientFlowColor[d.secondary])
        .edgeOpacity(0.7)

      let board = d3.select('#sankey')
      board.attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('viewBox', '0 -20 ' + width + ' ' + (height))
      let flow = board.append('g')
        .attr('transform', 'translate(0,0)') // 16 = 20-4 20是左右边缘
        .call(bp)
      flow.selectAll('.mainBars').append('text').attr('class', 'label')
        .attr('x', d => {
          return d.part === 'primary' ? -d.width : (-d.width + 7)
        })
        .attr('fill', '#ddd')
        .attr('text-anchor', 'start')
        .attr('y', d => {
          return d.part === 'primary' ? -12 : 10
        })
        .attr('writing-mode', d => {
          return d.part === 'primary' ? null : 'tb'
        })
        .attr('font-size', '11')
        .attr('cursor', 'pointer')
        .text(d => {
          return d.key
        })

      flow.selectAll('.mainBars').on('click', handleMouseClick)
      let vue = this
      function handleMouseClick (d, i) {
        let areaValue = json.area.filter(item => {
          if (item.label === d.key) {
            return true
          }
        })
        if (areaValue[0]) {
          d3.selectAll('text').attr('fill', '#ddd')
          d3.select(this).select('.label').attr('fill', 'orange')
          vue.area = areaValue[0]['value']
        }
      }
    },
    reset () {
      this.date = jsonUtil.defaultDataRage()
      this.area = localStorage.getItem('area')
    },
    changeRouter (name) {
      this.$router.push({name: name})
    }
  },
  created () {
    this.getSankeyData()
    this.getOtherData()
  },
  mounted () {}
}
</script>

<style lang="less" scoped>
@blockBack:#171c26;
@table:#131821;
@fontWhite:#f1f1f1;
@fontGray:rgba(241,241,241,0.8);
@fontBig:20px;
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
      font-size:@fontBig;
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
        width: 100px;
        height: 48px;
        background-position: center;
        background-repeat: no-repeat;
        &:hover{
          cursor: pointer;
          background: url('/static/renmintj/btn_backHover.png');
          background-position: center;
          background-repeat: no-repeat;
        }
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
    height: calc(100% - 97px);
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
