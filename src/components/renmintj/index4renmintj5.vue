/* * @Author: wupeiwen javapeiwen2010@gmail.com * @Date: 2018-06-29 13:11:45 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
* @Last Modified time: 2018-07-11 15:39:59 * @content: echarts 三位地理坐标系 mapbox */

<template>
  <div class="index_container">
    <div class="head clearfix">
      <div class="title" @click="changeRouter('moduleChoose')">基层司法大数据子平台</div>
      <div class="left">
        <el-cascader class="cascader" style="z-index: 1;" :options="area" placeholder="区域" v-model="areaDefault"></el-cascader>
      </div>
      <div class="right">
        <span>{{timeCom}}</span>
      </div>
    </div>
    <div class="body clearfix">
      <sidenav></sidenav>
      <div class="left">
        <div class="title" @click="changeRouter('businessTypes')">
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
            <div class="border"></div>
            <span @click="trendType='data_jc'" :class="{active:trendType==='data_jc'}">公共法律服务</span>
            <div class="border"></div>
            <span @click="trendType='data_110'" :class="{active:trendType==='data_110'}">110联动</span>
            <div class="border"></div>
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
              <rollScreen :dLength='importantEvent.length' :height='25' :lineNum='6'>
                <div v-for="(item,index) in importantEvent" :key="index" class="table_tr clearfix" @click="changeRouter('eventDetail',item.id)"
                  slot="slide">
                  <span class="once">{{item.shiJianLX}}</span>
                  <span class="once">{{item.diQu}}</span>
                  <span class="once">{{item.riQi.split(' ')[0]}}</span>
                </div>
              </rollScreen>
            </div>
            <div v-if="importantEvent.length<6" class="table_body">
              <div v-for="(item,index) in importantEvent" :key="index" class="table_tr clearfix" @click="changeRouter('eventDetail',item.id)"
                slot="slide">
                <span class="once">{{item.shiJianLX}}</span>
                <span class="once">{{item.diQu}}</span>
                <span class="once">{{item.riQi.split(' ')[0]}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="title">
          <span class="title_china" @click="changeRouter('documentQuality')">工作质量</span>
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
          <div class="rContainer xieyis" style="padding-top:10px"></div>
          <div class="rContainer">
            <img class="rIcon" src="/static/renmintjNew/icon_anjiansbs.png" />
            <div class="rRight">
              <div class="rTop" style="border:0;margin:0">
                <span class="span5">案例上报</span>
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
                <span class="spanB">----</span>
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
      <div class="top clearfix">
        <div class="topY">
          <span class="h1"></span>
          <span class="h2 topYh">本月</span>
          <span class="h3 topYh">全年</span>
        </div>
        <div class="topX" @click="changeRouter('businessNum','人民调解')">
          <span class="h1">人民调解</span>
          <span class="h2"><digitalRolling :nothing='nothing' :height='32' :width='18' :number='casestatistics.MBM_CASE' :fontSize='24' :fontColor='"rgba(73, 234, 238, 1)"'></digitalRolling></span>
          <span class="h3">{{casestatisticsAll.MBM_CASE}}</span>
        </div>
        <div class="topX" @click="changeRouter('businessNum','110联动')">
          <span class="h1">110联动</span>
          <span class="h2"><digitalRolling :nothing='nothing' :height='32' :width='18' :number='casestatistics.MMS_ALARM110INFO' :fontSize='24' :fontColor='"rgba(73, 234, 238, 1)"'></digitalRolling></span>
          <span class="h3">{{casestatisticsAll.MMS_ALARM110INFO}}</span>
        </div>
        <div class="topX" @click="changeRouter('businessNum','公共法律服务')">
          <span class="h1">公共法律服务</span>
          <span class="h2"><digitalRolling :nothing='nothing' :height='32' :width='18' :number='casestatistics.WWS_CONSULT' :fontSize='24' :fontColor='"rgba(73, 234, 238, 1)"'></digitalRolling></span>
          <span class="h3">{{casestatisticsAll.WWS_CONSULT}}</span>
        </div>
        <div class="topX" @click="changeRouter('businessNum','纠纷排查')">
          <span class="h1">纠纷排查</span>
          <span class="h2"><digitalRolling :nothing='nothing' :height='32' :width='18' :number='casestatistics.CDS_INVESTIGATIONFEEDBAC' :fontSize='24' :fontColor='"rgba(73, 234, 238, 1)"'></digitalRolling></span>
          <span class="h3">{{casestatisticsAll.CDS_INVESTIGATIONFEEDBAC}}</span>
        </div>
      </div>
    </div>
    <div class="middle">
      <!-- 地图容器 -->
      <div class="map" id="map"></div>
      <!-- 选择框 -->
      <div class="other">
        <div class="once once1" @click="layerType='disputesDistribution'" :class="{active1:layerType==='disputesDistribution'}">纠纷态势</div>
        <div class="once once2" @click="layerType='importantEvent'" :class="{active2:layerType==='importantEvent'}">重点关注</div>
        <!-- <div class="once once3" @click="layerType='mechanismDistribution'" :class="{active3:layerType==='mechanismDistribution'}">机构分布</div> -->
      </div>
      <!-- 区域分析 -->
      <div class="leftChoose" @click="changeRouter('regionalAnalysis')"></div>
    </div>
    <!-- 案件分布弹框 -->
    <div class="dialog" :style="{'left': offsetX,'top': offsetY}" v-if="showDialog">
      <div class="close" @click="showDialog=false">X</div>
      <div class="content">
        <span class="address">{{dialogData.name}}</span>
        <br><span class="number">{{dialogData.value + '件'}}</span>
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
import jsonUtil from '@/util/jsonUtil'
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')

export default {
  name: 'index',
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
    offsetX: '0',
    offsetY: '0',
    showDialog: false,
    dialogData: {
      name: '',
      value: ''
    },
    nothing: 0.1,
    interval: '',
    layerType: 'disputesDistribution',
    mapboxStyle: {
      'version': 8,
      'glyphs': `${urlConfig.osmUrl}/fonts/{fontstack}/{range}.pbf`,
      'sprite': 'http://7xu37n.com1.z0.glb.clouddn.com/sprite5',
      'sources': {
        'osm-tiles': {
          'type': 'raster',
          'tiles': [
            `${urlConfig.osmUrl}/styles/dark-matter/{z}/{x}/{y}.png`
          ],
          'tileSize': 256
        },
        'points': {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': ''
          }
        }
      },
      'layers': [{
        'id': 'background',
        'type': 'raster',
        'source': 'osm-tiles',
        'minzoom': 0,
        'maxzoom': 22
      },
      {
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
        'layout': {
          'icon-image': '{icon}',
          'icon-size': 1
        }
      }
      ]
    }
  }),
  computed: {
    timeCom () {
      return jsonUtil.dateFormat(new Date(), 'yyyy/MM/dd hh:mm D')
    }
  },
  watch: {
    trendType: function (to, from) {
      this.draw('trendAnalysis', eosNew.setLine(this.trendData[to].slice(6, 12), true, true))
    },
    areaDefault: function (newValue, oldValue) {
      this.showDialog = false
      this.getData()
    },
    layerType: function (newValue, oldValue) {
      let vue = this
      let map
      let coordinates
      let description
      let popup = new mapboxgl.Popup()
      if (newValue === 'importantEvent') {
        vue.mapboxStyle.sources.points.data.features = vue.keyEventsData.map((item, index) => {
          return {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [item.value[0], item.value[1]]
            },
            'properties': {
              'description': `<span style="font-size: 14px;color: #49EAEE;line-height:16px;">${item.type}</span>
                      <br><span style="line-height:28px;padding-left:18px;background:url('/static/renmintjNew/didian.png') no-repeat left center">${item.area}</span>
                      <br><span style="line-height:28px;padding-left:18px;background:url('/static/renmintjNew/shizhong.png') no-repeat left center">${item.date}</span>
                      <br><span style="line-height:18px;padding-left:18px;background:url('/static/renmintjNew/miaoshu.png') no-repeat left center">${item.detail}</span>`,
              'icon': 'importantEvent'
            }
          }
        })
        document.getElementById('map').innerHTML = ''
        map = new mapboxgl.Map({
          container: 'map',
          style: vue.mapboxStyle,
          // 地图中心经纬度。经纬度用数组
          center: [121.5193, 31.263070],
          // 地图的缩放等级
          zoom: 11,
          // 视角俯视的倾斜角度
          pitch: 60,
          // 地图的旋转角度
          bearing: -10
        })
        map.on('load', function (event) {
          map.on('click', 'points', function (e) {
            vue.showDialog = false
            coordinates = e.features[0].geometry.coordinates.slice()
            description = e.features[0].properties.description
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
            }
            popup.setLngLat(coordinates)
              .setHTML(description)
              .addTo(map)
          })
        })
      } else {
        document.getElementById('map').innerHTML = ''
        vue.draw('map', eos.setMapbox(vue.caseDistributionData))
      }
    }
  },
  created () {
    this.getData()
    let vue = this
    let list = ['data_tj', 'data_110', 'data_jc', 'data_pc']
    let i = 0
    vue.interval = setInterval(function () {
      vue.nothing = 0.01 * Math.random()
      if (i < 3) {
        i++
      } else {
        i = 0
      }
      vue.trendType = list[i]
    }, 6000)
  },
  mounted () {
    let vue = this
    window.addEventListener('resize', function () {
      vue.$nextTick(function () {
        vue.myChart['map'].resize()
      })
    })
  },
  beforeDestroy () {
    clearInterval(this.interval)
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
      let reqParam = {
        area: this.areaDefault[0]
      }
      let url = ''
      // 趋势分析
      url = '/trend'
      http.get(baseUrl + url, reqParam, (data) => {
        vue.$nextTick(function () {
          vue.trendData = data
          vue.draw('trendAnalysis', eosNew.setLine(vue.trendData[vue.trendType].slice(6, 12), true, true))
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
          vue.draw('xieyis', eosNew.setPie([(data.xieYiS_cover * 100).toFixed(1), ((1 - data.xieYiS_cover) *
              100).toFixed(1)], '协议书占比', 0))
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
      let querylist = [{
        url: baseUrl + '/caseDistribution',
        param: reqParam
      }, {
        url: baseUrl + '/keyEvents',
        param: reqParam
      }]
      http.all(querylist, (dataList) => {
        // 重点关注
        vue.importantEvent = dataList[1].data.data
        // 案件分布
        vue.caseDistributionData = dataList[0].data.data
        if (vue.caseDistributionData.length > 0) {
          vue.caseDistributionData = vue.caseDistributionData.map((item, index) => {
            return {
              name: item.diQu,
              value: [item.jinDu, item.weiDu, item.jianShu]
            }
          })
        }
        vue.keyEventsData = dataList[1].data.data.map(item => {
          return {
            name: item.jianShu,
            value: [item.jinDu, item.weiDu],
            type: item.shiJianLX,
            detail: item.xiangQing,
            area: item.xiangXiDZ,
            date: item.riQi2
          }
        })
        vue.$nextTick(function () {
          vue.draw('map', eos.setMapbox(vue.caseDistributionData))
        })
      })
    },
    // 路由跳转
    changeRouter (name, param) {
      let target = {
        name: name
      }
      if (name === 'eventDetail') {
        target = {
          name: name,
          params: {
            id: param
          }
        }
      } else if (name === 'businessNum') {
        target = {
          name: name,
          params: {
            type: param
          }
        }
      }
      this.$router.push(target)
    }
  }
}

</script>

<style lang="less" scoped>
@fontSamll:14px;
@fontMiddle:16px;
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
      cursor: pointer;
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
        font-size: @fontSamll;
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
      width: 289px;
      height: 100%;
      float: left;
      background: linear-gradient(to right, rgba(45,42,44,0.8), rgba(45,42,44,0.8));
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
            font-size: @fontSamll;
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
            font-size: @fontSamll;
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
            padding: 0 4px;
            cursor: pointer;
            &:last-child {
              border: 0
            }
          }
          .border{
            width: 1px;
            background: rgba(186, 186, 186, 1);
            height: 10px;
            float: right;
            margin-top: 3px;
          }
          .active {
            color: #FFF225;
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
      width: 289px;
      height: 100%;
      float: right;
      background: linear-gradient(to right, rgba(45,42,44,0.8), rgba(45,42,44,0.8));
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
              font-size: @fontSamll;
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
            .table_tr:hover {
              .once{
                cursor: pointer;
                color: #149CFA;
              }
            }
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
            margin: 0 12px;
            border-bottom: 1px solid rgba(186, 186, 186, 1);
            position: relative;
            .span1 {
              font-size: @fontMiddle;
              font-family: FZLTZHK--GBK1-0;
              color: rgba(255, 255, 255, 0.8);
              width: 50%;
              text-align: right;
              padding-right: 5px;
              box-sizing: border-box;
              position: absolute;
              bottom: 6px;
            }
            .span2 {
              font-size: @fontSamll;
              font-family: HiraginoSansGB-W3;
              color: rgba(186, 186, 186, 0.8);
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
              font-size: @fontMiddle;
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
              font-size: @fontSamll;
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
              font-size: @fontSamll;
              font-family: HiraginoSansGB-W3;
              color: rgba(186, 186, 186, 1);
              text-align: left;
              display: inline-block;
              width: 100%;
              position: absolute;
              bottom: 6px;
            }
            .span6 {
              font-size: @fontMiddle;
              font-family: FZLTZHK--GBK1-0;
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
              font-size: 14px;
              font-family: FZLTZHK--GBK1-0;
              color: rgba(186, 186, 186, 1);
              position: absolute;
              bottom: 0px;
            }
            .spanB {
              font-size: 20px;
              font-family: HiraginoSansGB-W3;
              color:#ffffff;
              position: absolute;
              top: 6px;
              font-weight: bold;
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
          background: url('/static/renmintjNew/pic_animation.gif');
          background-position: center center;
          background-repeat: no-repeat;
        }
      }
    }
    .bottom {
      z-index: 1;
      position: absolute;
      width: calc(100% - 580px);
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
        background: linear-gradient(to right, rgba(45,42,44,0.8), rgba(45,42,44,0.8));
        padding-top: 5px;
      }
      .bottom2 {
        width: 49%;
        height: 66px;
        float: right;
        background: linear-gradient(to right, rgba(45,42,44,0.8), rgba(45,42,44,0.8));
        padding-top: 5px;
      }
      .bTitle {
        font-size: @fontMiddle;
        font-family: HiraginoSansGB-W3;
        color: rgba(186, 186, 186, 1);
        padding: 0 0 0 20px;
        background: url('/static/renmintj/icon_open.png');
        background-repeat: no-repeat;
        background-position: left 5px center;
      }
      .bTitle:hover {
        cursor: pointer;
        color: #149CFA;
      }
      .bContent {
        width: 25%;
        float: left;
        height: 50px;
        margin: 0;
        position: relative;
        img {
          width: 24px;
          height: 24px;
          position: absolute;
          left:2px;
          top: 14px;
        }
        .bSpanC {
          height: 100%;
          position: absolute;
          top: 0;
          left: 28px;
          .bSpan1 {
            height: 25px;
            display: block;
            font-size: 12px;
            font-family: 'HiraginoSansGB-W3';
            color: rgba(186, 186, 186, 1);
            line-height: 34px;
          }
          .bSpan2 {
            height: 25px;
            display: block;
            font-size: @fontSamll;
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
      background: linear-gradient(to right, rgba(45,42,44,0.8), rgba(45,42,44,0.8));
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
      .topX:hover {
        background: rgba(114,105,105,0.2);
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
        font-size: @fontSamll;
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
      color: rgba(237, 237, 237, 1);
      .title_china {
        display: block;
        font-size: 16px;
        font-family: HiraginoSansGB-W3;
      }
      .title_english {
        display: block;
        font-size: 10px;
        font-family: ArialMT;
      }
    }
    .title:hover {
      cursor: pointer;
      color: #149CFA;
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
    .other{
      position: absolute;
      right: 311px;
      bottom:11%;
      width:123px;
      // height:108px;
      height:72px;
      background: linear-gradient(to right, rgba(45,42,44,0.8), rgba(45,42,44,0.8));
      .once{
        display: block;
        height: 36px;
        color:rgba(241,241,241,0.8);
        box-sizing: border-box;
        padding-left: 42px;
        font-size: @fontSamll;
        line-height: 36px;
        cursor: pointer;
        background-position: left 12px center;
        background-repeat: no-repeat;
        &:hover{
          color:#FFF225;
        }
      }
      .once1{
        background-image: url('/static/renmintjNew/icon_disputes.png');
        &:hover{
          background-image: url('/static/renmintjNew/icon_disputes_y.png');
        }
      }
      .active1{
        color:#FFF225;
        background-image: url('/static/renmintjNew/icon_disputes_y.png');
      }
      .once2{
        background-image: url('/static/renmintjNew/icon_import.png');
        &:hover{
          background-image: url('/static/renmintjNew/icon_import_y.png');
        }
      }
      .active2{
        color:#FFF225;
        background-image: url('/static/renmintjNew/icon_import_y.png');
      }
      .once3{
        background-image: url('/static/renmintjNew/icon_institutions.png');
        &:hover{
          background-image: url('/static/renmintjNew/icon_institutions_y.png');
        }
      }
      .active3{
        color:#FFF225;
        background-image: url('/static/renmintjNew/icon_institutions_y.png');
      }
    }
    .leftChoose{
      position: absolute;
      left: 311px;
      bottom:11%;
      width: 100px;
      height: 100px;
      background: url('/static/renmintjNew/pic_regionalAnalysis.png') no-repeat center center;
      &:hover{
        cursor: pointer;
        background: url('/static/renmintjNew/pic_regionalAnalysisHover.png') no-repeat center center;
      }
    }
  }
  .dialog {
    position: absolute;
    min-width: 210px;
    max-width: 15.5%;
    z-index: 999;
    padding: 5px 15px 20px 15px;
    background: rgba(0, 0, 0, 0.8);
    font-size: 12px;
    color: #ffffff;
    .close {
      cursor: pointer;
      text-align: right;
    }
    .address {
      line-height: 28px;
      padding-left: 18px;
      background: url('/static/renmintjNew/didian.png') no-repeat left center;
    }
    .number {
      line-height: 18px;
      padding-left: 18px;
      background: url('/static/renmintjNew/miaoshu.png') no-repeat left center;
    }
  }
}

</style>
