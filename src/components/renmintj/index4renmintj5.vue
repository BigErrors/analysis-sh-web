/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-06-29 13:11:45
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-07-06 10:28:49
 * @content: echarts 三位地理坐标系 mapbox
 */

<template>
  <div class="index_container">
    <div class="head clearfix">
      <div class="title">基层司法大数据子平台</div>
      <!-- <img src="" class="background"> -->
      <div class="left">
        <el-cascader class="cascader" style="z-index: 1;" :options="area" placeholder="区域" v-model="areaDefault"></el-cascader>
      </div>
      <div class="right">
        <span>{{timeCom}}</span>
      </div>
    </div>
    <div class="body clearfix">
      <div class="left">
        <!--  @click="changeRouter('businessTypes')" -->
        <div class="title">
          <span class="title_china">业务类型</span>
          <span class="title_english">Business type</span>
        </div>
        <div class="left1">
          <div class="line">
            <label>行专</label>
            <img v-for="item in parseInt(pro1/10)" :key="item+'a'" src="/static/renmintjNew/docAll.png" />
            <img v-if="parseInt(pro1%10)-5>=0" src="/static/renmintjNew/docHalf.png" />
            <img v-if="parseInt(pro1%10)-5<0" src="/static/renmintjNew/docNull.png" />
            <img v-for="item in parseInt((100-pro1)/10)" :key="item+'b'" src="/static/renmintjNew/docNull.png" />
            <span>{{pro1+'%'}}</span>
          </div>
          <div class="line">
            <label>一般</label>
            <img v-for="item in parseInt(pro2/10)" :key="item+'c'" src="/static/renmintjNew/docAll.png" />
            <img v-if="parseInt(pro2%10)-5>=0" src="/static/renmintjNew/docHalf.png" />
            <img v-if="parseInt(pro2%10)-5<0" src="/static/renmintjNew/docNull.png" />
            <img v-for="item in parseInt((100-pro2)/10)" :key="item+'d'" src="/static/renmintjNew/docNull.png" />
            <span>{{pro2+'%'}}</span>
          </div>
        </div>
        <!-- 业务类型柱状图 -->
        <div class="left2 businessTypes"></div>
        <div class="title" @click="changeRouter('trendAnalysis')">
          <span class="title_china">趋势分析</span>
          <span class="title_english">Trend analysis</span>
        </div>
        <div class="left3">
          <div class="nav clearfix">
            <span @click="trendType='data_pc'" :class="{active:trendType==='data_pc'}">纠纷排查</span>
            <span @click="trendType='data_jc'" :class="{active:trendType==='data_jc'}">公共法律服务</span>
            <span @click="trendType='data_110'" :class="{active:trendType==='data_110'}">110联动</span>
            <span @click="trendType='data_tj'" :class="{active:trendType==='data_tj'}">人民调解</span>
          </div>
          <!-- 趋势分析图dom容器 -->
          <div class="trendAnalysis"></div>
        </div>
      </div>
      <div class="right">
        <div class="title" @click="changeRouter('importantEvent')">
          <span class="title_china">重点关注</span>
          <span class="title_english">Priority order</span>
        </div>
        <div class="right1">
          <div class="table">
            <div class="table_tr clearfix">
              <span class="once th">事件</span>
              <span class="once th">地区</span>
              <span class="once th">日期</span>
            </div>
            <!-- 判断下重点事件是否>6，如果不是则不轮播，正常显示即可 -->
            <div v-if="importantEvent.length>=6" class="table_body">
              <rollScreen :dLength='20' :height='25' :lineNum='6'>
                <div v-for="(item,index) in importantEvent" :key="index" class="table_tr clearfix" @click="changeRouter('importantEventDetail',item.id)"
                  slot="slide">
                  <span class="once">{{item.shiJianLX}}</span>
                  <span class="once">{{item.diQu}}</span>
                  <span class="once">{{item.riQi}}</span>
                </div>
              </rollScreen>
            </div>
            <div v-if="importantEvent.length<6" class="table_body">
              <div v-for="(item,index) in importantEvent" :key="index" class="table_tr clearfix" @click="changeRouter('importantEventDetail',item.id)"
                slot="slide">
                <span class="once">{{item.shiJianLX}}</span>
                <span class="once">{{item.diQu}}</span>
                <span class="once">{{item.riQi}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="title">
          <span class="title_china">工作质量</span>
          <span class="title_english">Work quality</span>
        </div>
        <div class="right2">
          <div class="rContainer">
            <div class="rTop">
              <span class="span1">{{workQuality.xieYiS_number}}</span>
              <span class="span2">协议书</span>
            </div>
            <div class="rBottom">
              <span class="span3">{{workQuality.tiaoJieCG}}</span>
              <span class="span4">调解成功</span>
            </div>
          </div>
          <div class="rContainer">
            <img class="rIcon" src="/static/renmintjNew/icon_wenshuzl.png" />
            <div class="rRight">
              <div class="rTop" style="border:0;margin:0">
                <span class="span5">文书质量</span>
              </div>
              <div class="rBottom">
                <span class="span6">{{workQuality.wenShuZL}}</span>
              </div>
            </div>
          </div>
          <!-- 协议书占比留空 -->
          <div class="rContainer xieyis" style="padding:10px"></div>
          <div class="rContainer">
            <img class="rIcon" src="/static/renmintjNew/icon_anjiansbs.png" />
            <div class="rRight">
              <div class="rTop" style="border:0;margin:0">
                <span class="span5">案例上报数</span>
              </div>
              <div class="rBottom">
                <span class="span6">{{workQuality.anJianSB}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="right3">
          <div class="rLeft">
            <img class="rImg" src="/static/renmintjNew/icon_zaixianry.png" />
            <div class="rSpanC">
              <div>
                <span class="spanT">在线人数</span>
              </div>
              <div>
                <span class="spanB">7312</span>
              </div>
            </div>
          </div>
          <div class="rRight"></div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom1" @click="changeRouter('institutionRanking')">
          <div class="bTitle">机构总数</div>
          <div class="bContent">
            <img src="/static/renmintjNew/icon_sifas.png" />
            <div class="bSpanC">
              <span class="bSpan1">司法所</span>
              <span class="bSpan2">{{MechanismNumber.siFaS}}</span>
            </div>
          </div>
          <div class="bContent">
            <img src="/static/renmintjNew/icon_tiaoweih.png" />
            <div class="bSpanC">
              <span class="bSpan1">调委会</span>
              <span class="bSpan2">{{MechanismNumber.tiaoWeiH}}</span>
            </div>
          </div>
          <div class="bContent">
            <img src="/static/renmintjNew/icon_gonggongflz.png" />
            <div class="bSpanC">
              <span class="bSpan1">公共法律站</span>
              <span class="bSpan2">{{MechanismNumber.gongGongFLFWZ}}</span>
            </div>
          </div>
          <div class="bContent">
            <img src="/static/renmintjNew/icon_falvfws.png" />
            <div class="bSpanC">
              <span class="bSpan1">法律服务室</span>
              <span class="bSpan2">{{MechanismNumber.gongGongFLFWS}}</span>
            </div>
          </div>
        </div>
        <div class="bottom2" @click="changeRouter('peopleNum')">
          <div class="bTitle">人员总数</div>
          <div class="bContent">
            <img src="/static/renmintjNew/icon_tiaojiey.png" />
            <div class="bSpanC">
              <span class="bSpan1">调解员</span>
              <span class="bSpan2">{{peopleCount.tiaoJieY}}</span>
            </div>
          </div>
          <div class="bContent">
            <img src="/static/renmintjNew/icon_gongzhiry.png" />
            <div class="bSpanC">
              <span class="bSpan1">公职人员</span>
              <span class="bSpan2">{{peopleCount.gongWuY}}</span>
            </div>
          </div>
          <div class="bContent">
            <img src="/static/renmintjNew/icon_guwenls.png" />
            <div class="bSpanC">
              <span class="bSpan1">顾问律师</span>
              <span class="bSpan2">{{peopleCount.guWenLS}}</span>
            </div>
          </div>
          <div class="bContent">
            <img src="/static/renmintjNew/icon_falvfwz.png" />
            <div class="bSpanC">
              <span class="bSpan1">法律服务者</span>
              <span class="bSpan2">{{peopleCount.faLvFWZ}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="top clearfix" @click="changeRouter('businessNum')">
        <div class="topY">
          <span class="h1"></span>
          <span class="h2 topYh">本月</span>
          <span class="h3 topYh">全年</span>
        </div>
        <div class="topX">
          <span class="h1">人民调解</span>
          <span class="h2">{{casestatistics.MBM_CASE}}</span>
          <span class="h3">{{casestatisticsAll.MBM_CASE}}</span>
        </div>
        <div class="topX">
          <span class="h1">110联动</span>
          <span class="h2">{{casestatistics.MMS_ALARM110INFO}}</span>
          <span class="h3">{{casestatisticsAll.MMS_ALARM110INFO}}</span>
        </div>
        <div class="topX">
          <span class="h1">公共法律服务</span>
          <span class="h2">{{casestatistics.WWS_CONSULT}}</span>
          <span class="h3">{{casestatisticsAll.WWS_CONSULT}}</span>
        </div>
        <div class="topX">
          <span class="h1">纠纷排查</span>
          <span class="h2">{{casestatistics.CDS_INVESTIGATIONFEEDBAC}}</span>
          <span class="h3">{{casestatisticsAll.CDS_INVESTIGATIONFEEDBAC}}</span>
        </div>
      </div>
    </div>
    <!-- 中间地图留个空 -->
    <div class="middle">
      <!-- 地图容器 -->
      <div class="map"></div>
      <!-- 重点事件遮罩层 -->
      <div class="other"></div>
    </div>
    <div class="dialog" :style="{'left': offsetX,'top': offsetY}" v-if="showDialog">
      <div style="cursor: pointer;text-align:right;" @click="showDialog=false">x</div>
      <div style="text-align:left;">
        <span>{{dialogData.name}}</span><br>
        <span>{{'案件数量: '+dialogData.value + '件'}}</span>
     </div>
    </div>
  </div>
</template>

<script>
import json from '@/util/dictionaryMapping'
import eos from '@/util/echartsOptions'
import eosNew from '@/util/echartsOptionsNew'
import http from '@/util/httpUtil'
import urlConfig from '@/util/urlConfig'
import rollScreen from '../rollScreen.vue'
import digitalRolling from '../digitalRolling.vue'

export default {
  components: {
    rollScreen,
    digitalRolling
  },
  data: () => ({
    area: json.area,
    areaDefault: ['SHJCK01000'],
    pro1: 0,
    pro2: 0,
    trendType: 'data_tj',
    trendData: {},
    myChart: {},
    workQuality: {
      xieYiS_number: 0,
      tiaoJieCG: 0,
      wenShuZL: 0,
      anJianSB: 0
    },
    importantEvent: [],
    casestatistics: {
      MBM_CASE: 0,
      MMS_ALARM110INFO: 0,
      WWS_CONSULT: 0,
      CDS_INVESTIGATIONFEEDBAC: 0
    },
    casestatisticsAll: {
      MBM_CASE: 0,
      MMS_ALARM110INFO: 0,
      WWS_CONSULT: 0,
      CDS_INVESTIGATIONFEEDBAC: 0
    },
    MechanismNumber: [],
    peopleCount: {},
    time: new Date(),
    offsetX: '0',
    offsetY: '0',
    showDialog: false,
    dialogData: {
      name: '',
      value: ''
    }
  }),
  computed: {
    timeCom () {
      let now = this.time
      let day = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'][now.getDay()]
      let minute = (now.getMinutes() >= 10) ? (now.getMinutes().toString()) : ('0' + now.getMinutes().toString())
      return now.getFullYear().toString() + '/' + (now.getMonth() + 1).toString() + '/' + now.getDate().toString() + ' ' + now.getHours().toString() + ':' + minute + ' ' + day
    }
  },
  watch: {
    trendType: function (to, from) {
      this.draw('trendAnalysis', eosNew.setLine(this.trendData[to].reverse().slice(0, 6).reverse(), true, true))
    },
    areaDefault: function (newValue, oldValue) {
      this.showDialog = false
      this.getData()
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    let vue = this
    window.addEventListener('resize', function () {
      vue.$nextTick(function () {
        vue.myChart['map'].resize()
      })
    })
  },
  methods: {
    draw (domName, option) {
      if (this.myChart[domName]) {
        this.$echarts.dispose(this.myChart[domName])
      }
      this.myChart[domName] = this.$echarts.init(document.getElementsByClassName(domName)[0])
      this.myChart[domName].setOption(option)
      let vue = this
      if (domName === 'map') {
        this.myChart[domName].on('click', function (params) {
          console.log(params)
          if (params.seriesName === '分布') {
            vue.dialogData.name = params.name
            vue.dialogData.value = params.value[2]
            vue.offsetX = event.offsetX + 'px'
            vue.offsetY = event.offsetY + 'px'
            vue.showDialog = true
          }
        })
      }
    },
    getData () {
      let vue = this
      let baseUrl = urlConfig.baseUrl
      let reqParam = { area: this.areaDefault[0] }
      let url = ''
      // 趋势分析
      url = '/trend'
      http.get(baseUrl + url, reqParam, (data) => {
        vue.$nextTick(function () {
          vue.trendData = data
          vue.draw('trendAnalysis', eosNew.setLine(vue.trendData[vue.trendType].reverse().slice(0, 6).reverse(), true, true))
        })
      })
      // 工作质量
      url = '/workQuality'
      http.get(baseUrl + url, reqParam, (data) => {
        vue.workQuality.xieYiS_number = data.xieYiS_number
        vue.workQuality.tiaoJieCG = data.tiaoJieCG
        vue.workQuality.wenShuZL = data.wenShuZL
        vue.workQuality.anJianSB = data.anJianSB
        vue.$nextTick(function () {
          vue.draw('xieyis', eosNew.setPie([(data.xieYiS_cover * 100).toFixed(1), ((1 - data.xieYiS_cover) * 100).toFixed(1)], '协议书占比', 0, 0))
        })
      })
      // 业务类型
      url = '/category'
      http.get(baseUrl + url, reqParam, (data) => {
        vue.pro1 = (data.hangZhuanBL * 100).toFixed(1)
        vue.pro2 = (100 - data.hangZhuanBL * 100).toFixed(1)
        vue.draw('businessTypes', eosNew.setBar(data.yeWuLXHSL.reverse()))
      })
      // 业务数量
      url = '/businessCount'
      http.get(baseUrl + url, reqParam, (data) => {
        data.map((item, index) => {
          vue.casestatistics[item['biao']] = item['benYue']
          vue.casestatisticsAll[item['biao']] = item['quanNian']
        })
      })
      // 机构总数
      url = '/mechanismNumber'
      http.get(baseUrl + url, reqParam, (data) => {
        vue.MechanismNumber = data
      })
      // 人员数量
      url = '/staffNumber'
      http.get(baseUrl + url, reqParam, (data) => {
        vue.peopleCount = data
      })
      // 案件分布、重点关注
      let querylist = [{url: baseUrl + '/caseDistribution', param: reqParam}, {url: baseUrl + '/keyEvents', param: reqParam}]
      http.all(querylist, (dataList) => {
        // 重点关注
        vue.importantEvent = dataList[1].data.data
        // 案件分布
        let caseDistributionData = dataList[0].data.data
        if (caseDistributionData.length > 0) {
          caseDistributionData = caseDistributionData.map((item, index) => {
            return {name: item.diQu, value: [item.jinDu, item.weiDu, item.jianShu]}
          })
        }
        let keyEventsData = dataList[1].data.data
        keyEventsData = keyEventsData.map(item => {
          return {name: item.jianShu, value: [item.jinDu, item.weiDu, 200], type: item.shiJianLX, detail: item.xiangQing, area: item.diQu, date: item.riQi}
        })
        vue.$nextTick(function () {
          vue.draw('map', eos.setMapbox(caseDistributionData, keyEventsData))
        })
      })
    },
    // 路由跳转
    changeRouter (name, id) {
      let target = {name: name}
      if (name === 'importantEventDetail') {
        target = {name: name, params: { id: id }}
      }
      this.$router.push(target)
    }
  }
}
</script>

<style lang="less" scoped>
  .index_container {
    position: absolute;
    width: 100%;
    height: 100%;
    min-width: 1366px;
    min-height: 766px;
    background: #171415;
    background-size: 100% 100%;
    .head {
      z-index: 1;
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
      }
      .right {
        float: right;
        padding: 30px 0 0 0;
        span {
          font-size: 12px;
          font-family: HiraginoSansGB-W3;
          color: rgba(237, 237, 237, 1);
        }
      }
    }
    .body {
      height: calc(100% - 100px);
      margin-top: 5px;
      position: relative;
      display: block;
      .left {
        z-index: 1; // width: 22%;
        width: 301px;
        height: 100%;
        float: left;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 2));
        position: relative;
        .left1 {
          height: calc((100% - 150px) * 0.15);
          position: relative;
          box-sizing: border-box;
          padding: 8px 0 8px 12px;
          .line {
            height: 50%;
            display: block;
            align-items: center;
            display: flex;
            margin-left: 10px;
            label {
              font-size: 12px;
              font-family: MicrosoftYaHei;
              color: rgba(186, 186, 186, 1);
              line-height: calc(50%)
            }
            img {
              float: left;
              margin-left: 4px;
              &:nth-child(2) {
                margin-left: 6px;
              }
              &:nth-last-child(2) {
                margin-right: 6px;
              }
            }
            span {
              font-size: 12px;
              font-family: FZLTZHK--GBK1-0;
              color: rgba(254, 254, 254, 1);
            }
          }
        }
        .left2 {
          height: calc((100% - 150px) * 0.50);
          position: relative;
          padding-left: 12px;
        }
        .left3 {
          height: calc((100% - 150px) * 0.35);
          position: relative;
          .nav {
            display: block;
            padding-right: 25px;
            span {
              font-size: 12px;
              font-family: HiraginoSansGB-W3;
              color: rgba(186, 186, 186, 1);
              float: right;
              border-left: 1px solid rgba(186, 186, 186, 1);
              padding: 0 4px;
              cursor: pointer;
              &:last-child {
                border: 0
              }
            }
            .active {
              color: #FFF225
            }
          }
          .trendAnalysis {
            position: absolute;
            width: calc(100% - 10px);
            height: calc(100% - 26px);
            box-sizing: border-box;
            top: 16px;
            padding: 10px;
          }
        }
      }
      .right {
        z-index: 1; // width: 22%;
        width: 301px;
        height: 100%;
        float: right;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 2));
        position: relative;
        .right1 {
          height: calc((100% - 150px) * 0.4);
          position: relative;
          box-sizing: border-box;
          padding: 8px 20px;
          .table {
            position: relative;
            width: 100%;
            box-sizing: border-box;
            .table_tr {
              width: 100%;
              height: 25px;
              .once {
                height: 25px;
                width: 33.3%;
                line-height: 25px;
                text-align: center;
                float: left;
                font-size: 12px;
                font-family: HiraginoSansGB-W3;
                color: rgba(255, 255, 255, 1);
              }
              .th {
                color: rgba(186, 186, 186, 1);
              }
            }
            .table_body {
              height: 150px;
              overflow: hidden;
            }
          }
        }
        .right2 {
          height: calc((100% - 150px) * 0.38);
          position: relative;
          box-sizing: border-box;
          padding: 8px 20px;
          .rContainer {
            width: 50%;
            height: 50%;
            float: left;
            position: relative;
            box-sizing: border-box;
            .rTop {
              display: block;
              height: 50%;
              box-sizing: border-box;
              margin: 0 20px;
              border-bottom: 1px solid rgba(186, 186, 186, 1);
              position: relative;
              .span1 {
                font-size: 14px;
                font-family: FZLTZHK--GBK1-0;
                color: rgba(255, 255, 255, 0.3);
                width: 50%;
                text-align: right;
                padding-right: 5px;
                box-sizing: border-box;
                position: absolute;
                bottom: 6px;
              }
              .span2 {
                font-size: 12px;
                font-family: HiraginoSansGB-W3;
                color: rgba(186, 186, 186, 0.3);
                width: 50%;
                text-align: left;
                box-sizing: border-box;
                position: absolute;
                bottom: 7px;
                left: 50%;
              }
            }
            .rBottom {
              display: block;
              height: 50%;
              position: relative;
              .span3 {
                font-size: 14px;
                font-family: FZLTZHK--GBK1-0;
                color: rgba(255, 255, 255, 1);
                width: 50%;
                text-align: right;
                padding-right: 5px;
                box-sizing: border-box;
                position: absolute;
                top: 6px;
              }
              .span4 {
                font-size: 12px;
                font-family: FZLTZHK--GBK1-0;
                color: rgba(186, 186, 186, 1);
                width: 50%;
                text-align: left;
                padding-right: 5px;
                box-sizing: border-box;
                position: absolute;
                top: 6px;
                left: 50%;
              }
            }
            .rRight {
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              padding-left: 58px;
              .span5 {
                font-size: 10px;
                font-family: 'HiraginoSansGB-W3';
                color: rgba(186, 186, 186, 1);
                text-align: left;
                display: inline-block;
                width: 100%;
                position: absolute;
                bottom: 6px;
              }
              .span6 {
                font-size: 14px;
                font-family: 'FZLTZHK--GBK1-0';
                color: rgba(255, 255, 255, 1);
                text-align: left;
                display: inline-block;
                width: 100%;
                position: absolute;
                top: 6px;
              }
            }
            .rIcon {
              position: absolute;
              top: 50%;
              left: 8px;
              transform: translateY(-50%);
              z-index: 5;
            }
          }
        }
        .right3 {
          height: calc((100% - 150px) * 0.22);
          position: relative;
          box-sizing: border-box;
          padding: 8px 20px;
          .rLeft {
            width: 60%;
            height: 100%;
            float: left;
            position: relative;
            .rImg {
              position: absolute;
              left: 16px;
              top: 50%;
              transform: translateY(-50%);
              z-index: 5;
            }
            .rSpanC {
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              padding-left: 65px;
              position: relative;
              .spanT {
                font-size: 20px;
                font-family: FZLTZHK--GBK1-0;
                color: rgba(255, 255, 255, 1);
                position: absolute;
                bottom: 0px;
              }
              .spanB {
                font-size: 14px;
                font-family: HiraginoSansGB-W3;
                color: rgba(186, 186, 186, 1);
                position: absolute;
                top: 6px;
              }
              div {
                height: 50%;
                display: block;
                position: relative;
              }
            }
          }
          .rRight {
            width: 40%;
            height: 100%;
            float: right;
            background: url('/static/renmintjNew/动画.gif');
            background-position: center center;
            background-repeat: no-repeat;
          }
        }
      }
      .bottom {
        z-index: 1;
        position: absolute;
        width: calc(100% - 632px);
        height: 66px;
        bottom: 5px;
        left: 50%;
        transform: translate(-50%);
        padding: 0 16px;
        box-sizing: border-box;
        .bottom1 {
          width: 49%;
          height: 66px;
          float: left;
          background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
          padding-top: 5px;
        }
        .bottom2 {
          width: 49%;
          height: 66px;
          float: right;
          background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
          padding-top: 5px;
        }
        .bTitle {
          font-size: 12px;
          font-family: HiraginoSansGB-W3;
          color: rgba(186, 186, 186, 1);
          padding: 0 0 0 20px;
          background: url('/static/renmintj/icon_open.png');
          background-repeat: no-repeat;
          background-position: left 5px center;
          cursor: pointer;
        }
        .bContent {
          width: 25%;
          float: left;
          height: 50px;
          margin: 0;
          position: relative;
          img {
            width: 26px;
            height: 26px;
            position: absolute;
            left: 26%;
            top: 12px;
            transform: translate(-120%)
          }
          .bSpanC {
            height: 100%;
            position: absolute;
            top: 0;
            left: 25%;
            .bSpan1 {
              height: 25px;
              display: block;
              font-size: 10px;
              font-family: 'HiraginoSansGB-W3';
              color: rgba(186, 186, 186, 1);
              line-height: 34px;
            }
            .bSpan2 {
              height: 25px;
              display: block;
              font-size: 12px;
              font-family: 'FZLTZHK--GBK1-0';
              color: rgba(255, 255, 255, 1);
              line-height: 21px;
            }
          }
        }
      }
      .top {
        z-index: 1;
        cursor: pointer;
        position: absolute;
        width: 36%;
        height: 104px;
        left: 50%;
        top: 32px;
        transform: translate(-50%);
        background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
        .topY {
          width: 8%;
          float: left;
          height: 104px;
          box-sizing: border-box;
          text-align: center;
          .topYh {
            border: 0;
            font-size: 12px;
            font-family: HiraginoSansGB-W3;
            color: rgba(186, 186, 186, 1);
          }
        }
        .topX {
          width: 22%;
          float: left;
          height: 104px;
          box-sizing: border-box;
          padding: 0 18px;
        }
        .h1 {
          display: block;
          height: 24px;
          border: 0;
          font-size: 10px;
          font-family: HiraginoSansGB-W3;
          color: rgba(186, 186, 186, 1);
          text-align: center;
          line-height: 24px;
        }
        .h2 {
          display: block;
          height: 47px;
          border: 0;
          box-sizing: border-box;
          border-bottom: 1px dashed rgba(186, 186, 186, 0.5);
          ;
          line-height: 46px;
          font-size: 24px;
          font-family: FZLTZHK--GBK1-0;
          color: rgba(73, 234, 238, 1);
          text-align: center;
          font-weight: bold;
        }
        .h3 {
          display: block;
          height: 33px;
          border: 0;
          font-size: 12px;
          font-family: FZLTZHK--GBK1-0;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          line-height: 33px;
        }
      }
      .title {
        width: 100%;
        padding: 18px 0 20px 29px;
        background: url('/static/renmintj/icon_open.png');
        background-repeat: no-repeat;
        background-position: left 11px center;
        box-sizing: border-box;
        cursor: pointer;
        .title_china {
          display: block;
          font-size: 16px;
          font-family: HiraginoSansGB-W3;
          color: rgba(237, 237, 237, 1);
        }
        .title_english {
          display: block;
          font-size: 10px;
          font-family: ArialMT;
          color: rgba(237, 237, 237, 1);
        }
      }
    }
    .middle {
      z-index: -1;
      .map {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: fixed;
      }
    }
    .dialog {
      position: absolute;
      width: 220px;
      height: 60px;
      padding: 15px 20px;
      background: rgba(0,0,0,0.8);
      font-size: 12px;
      color: #ffffff;
    }
  }
</style>
