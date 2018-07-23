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
        <!-- <div class="midlle"></div> -->
        <svg class="midlle" viewBox="0,0,2000,1000" preserveAspectRatio="xMinYMin meet"></svg>
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
import * as d3 from 'd3'
import * as viz from '../../../static/viz'

export default {
  data () {
    return {
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
    getData () {
      let _this = this
      let baseUrl = urlConfig.baseUrl
      let url = '/regionalAnalysis'
      let param = {area: 'SHJCK01000',
        startDate: jsonUtil.dateTimeFormat(_this.date[0]).slice(0, 9),
        endDate: jsonUtil.dateTimeFormat(_this.date[1]).slice(0, 9)}
      http.get(baseUrl + url, param, (data) => {
        _this.anJianSLWRBPM = data.anJianSLWRBPM
        _this.pingJunPCJEPM = data.pingJunPCJEPM
        _this.pingJunTJSCPM = data.pingJunTJSCPM
        _this.tiaoJieSBLPM = data.tiaoJieSBLPM
        _this.pingJunTJSC = data.pingJunTJSC
        _this.jiuFenZL = data.jiuFenZL
        _this.tiaoJieCGL = data.tiaoJieCGL
        _this.tiaoJiePCJE = data.tiaoJiePCJE
        let sankeyData = data.sangJiT.links.map(item => { return [item.source, item.target, item.value] })
        // let sankeyData = [['嘉定区', '交通纠纷', 202], ['奉贤区', '交通纠纷', 14], ['宝山区', '交通纠纷', 3], ['崇明区', '交通纠纷', 630], ['徐汇区', '交通纠纷', 75], ['普陀区', '交通纠纷', 427], ['杨浦区', '交通纠纷', 604], ['松江区', '交通纠纷', 404], ['金山区', '交通纠纷', 150], ['长宁区', '交通纠纷', 1], ['闵行区', '交通纠纷', 2587], ['青浦区', '交通纠纷', 1053], ['静安区', '交通纠纷', 2], ['黄浦区', '交通纠纷', 9], ['嘉定区', '其他纠纷', 123], ['奉贤区', '其他纠纷', 316], ['宝山区', '其他纠纷', 44], ['崇明区', '其他纠纷', 206], ['徐汇区', '其他纠纷', 161], ['普陀区', '其他纠纷', 181], ['杨浦区', '其他纠纷', 523], ['松江区', '其他纠纷', 103], ['浦东新区', '其他纠纷', 3], ['虹口区', '其他纠纷', 78], ['金山区', '其他纠纷', 217], ['长宁区', '其他纠纷', 116], ['闵行区', '其他纠纷', 672], ['青浦区', '其他纠纷', 377], ['静安区', '其他纠纷', 143], ['黄浦区', '其他纠纷', 1163], ['嘉定区', '养育纠纷', 14], ['奉贤区', '养育纠纷', 18], ['宝山区', '养育纠纷', 6], ['崇明区', '养育纠纷', 20], ['徐汇区', '养育纠纷', 21], ['普陀区', '养育纠纷', 33], ['杨浦区', '养育纠纷', 15], ['松江区', '养育纠纷', 16], ['浦东新区', '养育纠纷', 1], ['虹口区', '养育纠纷', 14], ['金山区', '养育纠纷', 7], ['长宁区', '养育纠纷', 27], ['闵行区', '养育纠纷', 39], ['青浦区', '养育纠纷', 19], ['静安区', '养育纠纷', 25], ['黄浦区', '养育纠纷', 1], ['嘉定区', '劳动纠纷', 62], ['奉贤区', '劳动纠纷', 16], ['宝山区', '劳动纠纷', 1], ['崇明区', '劳动纠纷', 11], ['徐汇区', '劳动纠纷', 316], ['普陀区', '劳动纠纷', 33], ['杨浦区', '劳动纠纷', 4], ['松江区', '劳动纠纷', 22], ['虹口区', '劳动纠纷', 40], ['金山区', '劳动纠纷', 29], ['长宁区', '劳动纠纷', 13], ['闵行区', '劳动纠纷', 357], ['青浦区', '劳动纠纷', 212], ['静安区', '劳动纠纷', 36], ['黄浦区', '劳动纠纷', 178], ['嘉定区', '医患纠纷', 1], ['徐汇区', '医患纠纷', 8], ['松江区', '医患纠纷', 18], ['闵行区', '医患纠纷', 3], ['黄浦区', '医患纠纷', 7], ['嘉定区', '合同纠纷', 2], ['奉贤区', '合同纠纷', 45], ['宝山区', '合同纠纷', 1], ['崇明区', '合同纠纷', 6], ['徐汇区', '合同纠纷', 237], ['普陀区', '合同纠纷', 8], ['杨浦区', '合同纠纷', 1], ['松江区', '合同纠纷', 105], ['虹口区', '合同纠纷', 1], ['金山区', '合同纠纷', 8], ['长宁区', '合同纠纷', 5], ['闵行区', '合同纠纷', 15], ['青浦区', '合同纠纷', 9], ['黄浦区', '合同纠纷', 91], ['嘉定区', '噪音', 29], ['奉贤区', '噪音', 21], ['宝山区', '噪音', 18], ['崇明区', '噪音', 22], ['徐汇区', '噪音', 52], ['普陀区', '噪音', 113], ['杨浦区', '噪音', 122], ['松江区', '噪音', 16], ['虹口区', '噪音', 102], ['金山区', '噪音', 14], ['长宁区', '噪音', 77], ['闵行区', '噪音', 149], ['青浦区', '噪音', 16], ['静安区', '噪音', 80], ['黄浦区', '噪音', 17], ['嘉定区', '婚姻纠纷', 4], ['奉贤区', '婚姻纠纷', 3], ['崇明区', '婚姻纠纷', 34], ['徐汇区', '婚姻纠纷', 60], ['普陀区', '婚姻纠纷', 35], ['杨浦区', '婚姻纠纷', 21], ['松江区', '婚姻纠纷', 28], ['虹口区', '婚姻纠纷', 10], ['金山区', '婚姻纠纷', 60], ['长宁区', '婚姻纠纷', 24], ['闵行区', '婚姻纠纷', 34], ['静安区', '婚姻纠纷', 16], ['黄浦区', '婚姻纠纷', 2], ['嘉定区', '家庭纠纷', 9], ['奉贤区', '家庭纠纷', 12], ['宝山区', '家庭纠纷', 5], ['崇明区', '家庭纠纷', 21], ['徐汇区', '家庭纠纷', 16], ['普陀区', '家庭纠纷', 49], ['杨浦区', '家庭纠纷', 53], ['松江区', '家庭纠纷', 5], ['虹口区', '家庭纠纷', 42], ['金山区', '家庭纠纷', 18], ['长宁区', '家庭纠纷', 105], ['闵行区', '家庭纠纷', 32], ['青浦区', '家庭纠纷', 12], ['静安区', '家庭纠纷', 50], ['黄浦区', '家庭纠纷', 437], ['奉贤区', '家暴纠纷', 1], ['崇明区', '家暴纠纷', 2], ['徐汇区', '家暴纠纷', 3], ['普陀区', '家暴纠纷', 9], ['杨浦区', '家暴纠纷', 6], ['松江区', '家暴纠纷', 1], ['虹口区', '家暴纠纷', 14], ['金山区', '家暴纠纷', 2], ['长宁区', '家暴纠纷', 30], ['闵行区', '家暴纠纷', 8], ['静安区', '家暴纠纷', 13], ['黄浦区', '家暴纠纷', 1], ['嘉定区', '恋爱纠纷', 2], ['奉贤区', '恋爱纠纷', 1], ['宝山区', '恋爱纠纷', 1], ['崇明区', '恋爱纠纷', 1], ['普陀区', '恋爱纠纷', 1], ['松江区', '恋爱纠纷', 2], ['虹口区', '恋爱纠纷', 1], ['长宁区', '恋爱纠纷', 6], ['闵行区', '恋爱纠纷', 5], ['青浦区', '恋爱纠纷', 2], ['静安区', '恋爱纠纷', 5], ['嘉定区', '房产纠纷', 64], ['奉贤区', '房产纠纷', 136], ['宝山区', '房产纠纷', 9], ['崇明区', '房产纠纷', 239], ['徐汇区', '房产纠纷', 339], ['普陀区', '房产纠纷', 80], ['杨浦区', '房产纠纷', 355], ['松江区', '房产纠纷', 225], ['虹口区', '房产纠纷', 65], ['金山区', '房产纠纷', 377], ['长宁区', '房产纠纷', 25], ['闵行区', '房产纠纷', 363], ['青浦区', '房产纠纷', 32], ['静安区', '房产纠纷', 103], ['黄浦区', '房产纠纷', 50], ['闵行区', '民事纠纷', 1], ['嘉定区', '治安刑事', 28], ['奉贤区', '治安刑事', 12], ['宝山区', '治安刑事', 3], ['崇明区', '治安刑事', 61], ['徐汇区', '治安刑事', 86], ['普陀区', '治安刑事', 168], ['杨浦区', '治安刑事', 264], ['松江区', '治安刑事', 4], ['浦东新区', '治安刑事', 3], ['虹口区', '治安刑事', 2], ['金山区', '治安刑事', 27], ['长宁区', '治安刑事', 4], ['闵行区', '治安刑事', 836], ['青浦区', '治安刑事', 101], ['静安区', '治安刑事', 61], ['黄浦区', '治安刑事', 39], ['奉贤区', '消费纠纷', 8], ['崇明区', '消费纠纷', 38], ['徐汇区', '消费纠纷', 1747], ['松江区', '消费纠纷', 6], ['金山区', '消费纠纷', 21], ['长宁区', '消费纠纷', 65], ['闵行区', '消费纠纷', 11], ['青浦区', '消费纠纷', 1], ['静安区', '消费纠纷', 75], ['黄浦区', '消费纠纷', 13], ['奉贤区', '涉校纠纷', 1], ['崇明区', '涉校纠纷', 1], ['松江区', '涉校纠纷', 1], ['金山区', '涉校纠纷', 1], ['闵行区', '涉校纠纷', 1], ['青浦区', '涉校纠纷', 1], ['嘉定区', '漏水', 85], ['奉贤区', '漏水', 131], ['宝山区', '漏水', 96], ['崇明区', '漏水', 57], ['徐汇区', '漏水', 219], ['普陀区', '漏水', 462], ['杨浦区', '漏水', 523], ['松江区', '漏水', 72], ['虹口区', '漏水', 270], ['金山区', '漏水', 117], ['长宁区', '漏水', 181], ['闵行区', '漏水', 331], ['青浦区', '漏水', 86], ['静安区', '漏水', 236], ['黄浦区', '漏水', 87], ['普陀区', '知识产权', 47], ['闵行区', '知识产权', 51], ['嘉定区', '继承纠纷', 28], ['奉贤区', '继承纠纷', 16], ['宝山区', '继承纠纷', 3], ['崇明区', '继承纠纷', 327], ['徐汇区', '继承纠纷', 277], ['普陀区', '继承纠纷', 22], ['杨浦区', '继承纠纷', 38], ['松江区', '继承纠纷', 16], ['浦东新区', '继承纠纷', 4], ['虹口区', '继承纠纷', 12], ['金山区', '继承纠纷', 111], ['长宁区', '继承纠纷', 4], ['闵行区', '继承纠纷', 11], ['青浦区', '继承纠纷', 1], ['静安区', '继承纠纷', 11], ['黄浦区', '继承纠纷', 2], ['嘉定区', '邻里纠纷', 118], ['奉贤区', '邻里纠纷', 78], ['宝山区', '邻里纠纷', 75], ['崇明区', '邻里纠纷', 209], ['徐汇区', '邻里纠纷', 223], ['普陀区', '邻里纠纷', 446], ['杨浦区', '邻里纠纷', 716], ['松江区', '邻里纠纷', 66], ['浦东新区', '邻里纠纷', 1], ['虹口区', '邻里纠纷', 407], ['金山区', '邻里纠纷', 112], ['长宁区', '邻里纠纷', 284], ['闵行区', '邻里纠纷', 421], ['青浦区', '邻里纠纷', 141], ['静安区', '邻里纠纷', 339], ['黄浦区', '邻里纠纷', 3757], ['嘉定区', '采光', 2], ['宝山区', '采光', 1], ['崇明区', '采光', 7], ['徐汇区', '采光', 3], ['普陀区', '采光', 6], ['杨浦区', '采光', 5], ['松江区', '采光', 2], ['虹口区', '采光', 10], ['金山区', '采光', 3], ['长宁区', '采光', 3], ['闵行区', '采光', 13], ['青浦区', '采光', 4], ['静安区', '采光', 3], ['黄浦区', '采光', 1]]
        _this.$nextTick(function () {
          _this.setSankey(sankeyData)
        })
      })
    },
    setSankey (data) {
      var clientFlowData = data
      var makeClientFlowColor = d3.scaleOrdinal(d3.schemeCategory20)
      var clientFlowColor = {}
      for (var i = 0, l = clientFlowData.length; i < l; i++) {
        var name = clientFlowData[i][1]
        if (clientFlowColor[name]) {
          continue
        }
        clientFlowColor[name] = makeClientFlowColor(name)
      }
      var bp = viz.bP()
      bp.data(clientFlowData)
        .min(125)
        .pad(20)
        .height(760)
        .width(3400)
        .orient('horizontal')
        .barSize(20)
        .fill(d => clientFlowColor[d.secondary])
        .edgeOpacity(0.7)

      var board = d3.select('.midlle')

      // 客流图坐标
      var flow = board.append('g')
        .attr('transform', 'translate(50,80)') // 16 = 20-4 20是左右边缘
        .call(bp)

      flow.selectAll('.mainBars').append('text').attr('class', 'label')
        .attr('x', d => {
          return d.part === 'primary' ? -d.width : (-d.width + 7)
        })
        .attr('fill', '#ddd')
        .attr('text-anchor', 'start')
        .attr('y', d => {
          return d.part === 'primary' ? -12 : 12
        })
        .attr('writing-mode', d => {
          return d.part === 'primary' ? null : 'tb'
        })
        .attr('font-size', '30')
        .text(d => {
          return d.key
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
  mounted () {}

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
