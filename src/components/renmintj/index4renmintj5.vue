/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-06-29 13:11:45
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-06-29 13:30:02
 * @content: echarts 三位地理坐标系 mapbox
 */

<template>
  <div class="index_container">
    <div class="head clearfix">
      <div class="title">基层司法大数据子平台</div>
      <div class="left">
        <el-cascader
          class="cascader"
          style="z-index: 1;"
          :options="area"
          placeholder="区域"
          v-model="areaDefault"
        ></el-cascader>
      </div>
      <div class="right">
        <span>{{timeCom}}</span>
      </div>
    </div>
    <div class="body clearfix">
      <div class="left">
        <div class="title">
          <span class="title_china">业务类型</span>
          <span class="title_english">Business type</span>
        </div>
        <div class="left1">
          <div class="line">
            <label>行专调解</label>
            <img v-for="item in parseInt(pro1/10)" :key="item+'a'" src="/static/renmintjNew/docAll.png" />
            <img v-if="parseInt(pro1%10)-5>=0" src="/static/renmintjNew/docHalf.png" />
            <img v-if="parseInt(pro1%10)-5<0" src="/static/renmintjNew/docNull.png" />
            <img v-for="item in parseInt((100-pro1)/10)" :key="item+'b'" src="/static/renmintjNew/docNull.png" />
            <span>{{pro1+'%'}}</span>
          </div>
          <div class="line">
            <label>一般调解</label>
            <img v-for="item in parseInt(pro2/10)" :key="item+'c'" src="/static/renmintjNew/docAll.png" />
            <img v-if="parseInt(pro2%10)-5>=0" src="/static/renmintjNew/docHalf.png" />
            <img v-if="parseInt(pro2%10)-5<0" src="/static/renmintjNew/docNull.png" />
            <img v-for="item in parseInt((100-pro2)/10)" :key="item+'d'" src="/static/renmintjNew/docNull.png" />
            <span>{{pro2+'%'}}</span>
          </div>
        </div>
        <!-- 业务类型柱状图 -->
        <div class="left2 ywlx"></div>
        <div class="title">
          <span class="title_china">趋势分析</span>
          <span class="title_english">Trend analysis</span>
        </div>
        <div class="left3">
          <div class="nav clearfix">
            <span @click="target1='data_tj'" :class="{active:target1==='data_tj'}">人民调解</span>
            <span @click="target1='data_110'" :class="{active:target1==='data_110'}">110联动</span>
            <span @click="target1='data_jc'" :class="{active:target1==='data_jc'}">公共法律服务</span>
            <span @click="target1='data_pc'" :class="{active:target1==='data_pc'}">纠纷排查</span>
          </div>
          <!-- 趋势分析图dom容器 -->
          <div class="qsfx"></div>
        </div>
      </div>
      <div class="right">
        <div class="title">
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
            <div v-if="zhongdiangz.length>=6" class="table_body">
               <rollScreen :dLength='20' :height='25' :lineNum='6'>
                <div v-for="(item,index) in zhongdiangz" :key="index" class="table_tr clearfix" @click="changeRouter('importantEventDetail',item.id)" slot="slide">
                  <span class="once">{{item.shiJianLX}}</span>
                  <span class="once">{{item.diQu}}</span>
                  <span class="once">{{item.riQi}}</span>
                </div>
               </rollScreen>
            </div>
            <div v-if="zhongdiangz.length<6" class="table_body">
              <div v-for="(item,index) in zhongdiangz" :key="index" class="table_tr clearfix" slot="slide">
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
            <img class="rIcon" src="/static/renmintjNew/icon_wenshuzl.png"/>
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
            <img class="rIcon" src="/static/renmintjNew/icon_anjiansbs.png"/>
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
            <img class="rImg"  src="/static/renmintjNew/icon_zaixianry.png"/>
            <div class="rSpanC">
              <div><span class="spanT">在线人数</span></div>
              <div><span class="spanB">7312</span></div>
            </div>
          </div>
          <div class="rRight"></div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom1">
          <div class="bTitle">机构总数</div>
          <div class="bContent">
            <img src="/static/renmintjNew/icon_sifas.png"/>
            <div class="bSpanC">
              <span class="bSpan1">司法所</span>
              <span class="bSpan2">{{MechanismNumber.siFaS}}</span>
            </div>
          </div>
          <div class="bContent">
            <img src="/static/renmintjNew/icon_tiaoweih.png"/>
            <div class="bSpanC">
              <span class="bSpan1">调委会</span>
              <span class="bSpan2">{{MechanismNumber.tiaoWeiH}}</span>
            </div>
          </div>
          <div class="bContent">
            <img src="/static/renmintjNew/icon_gonggongflz.png"/>
            <div class="bSpanC">
              <span class="bSpan1">公共法律站</span>
              <span class="bSpan2">{{MechanismNumber.gongGongFLFWZ}}</span>
            </div>
          </div>
          <div class="bContent">
            <img src="/static/renmintjNew/icon_falvfws.png"/>
            <div class="bSpanC">
              <span class="bSpan1">法律服务室</span>
              <span class="bSpan2">{{MechanismNumber.gongGongFLFWS}}</span>
            </div>
          </div>
        </div>
        <div class="bottom2">
          <div class="bTitle">人员总数</div>
          <div class="bContent">
            <img src="/static/renmintjNew/icon_tiaojiey.png"/>
            <div class="bSpanC">
              <span class="bSpan1">调解员</span>
              <span class="bSpan2">{{peopleCount.tiaoJieY}}</span>
            </div>
          </div>
          <div class="bContent">
            <img src="/static/renmintjNew/icon_gongzhiry.png"/>
            <div class="bSpanC">
              <span class="bSpan1">公职人员</span>
              <span class="bSpan2">{{peopleCount.gongWuY}}</span>
            </div>
          </div>
          <div class="bContent">
            <img src="/static/renmintjNew/icon_guwenls.png"/>
            <div class="bSpanC">
              <span class="bSpan1">顾问律师</span>
              <span class="bSpan2">{{peopleCount.juCunFLGW}}</span>
            </div>
          </div>
          <div class="bContent">
            <img src="/static/renmintjNew/icon_falvfwz.png"/>
            <div class="bSpanC">
              <span class="bSpan1">法律服务者</span>
              <span class="bSpan2">{{peopleCount.zhiYuanZ}}</span>
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
      <!-- 中间地图留个空 -->
      <div class="middle">
        <!-- 地图容器 -->
        <div class="map"></div>
        <!-- 重点事件遮罩层 -->
        <div class="other"></div>
      </div>
    </div>
  </div>
</template>

<script>
import json from '@/util/dictionaryMapping'
import eosNew from '@/util/echartsOptionsNew'
import http from '@/util/httpUtil'
import rollScreen from '../rollScreen.vue'
import digitalRolling from '../digitalRolling.vue'
import mapData from '@/../static/json/data'

export default {
  components: {
    rollScreen,
    digitalRolling
  },
  data: () => ({
    area: json.area,
    areaDefault: ['SHJCK01000'],
    pro1: 81.2,
    pro2: 26.6,
    target1: 'data_110',
    qushifx: {},
    myChart: {},
    workQuality: {
      xieYiS_number: 0,
      tiaoJieCG: 0,
      wenShuZL: 0,
      anJianSB: 0
    },
    zhongdiangz: [],
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
    peopleCount: [],
    time: new Date()
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
    target1: function (to, from) {
      this.draw('qsfx', eosNew.setLine(this.qushifx[to], true, true))
    },
    areaDefault: function (newValue, oldValue) {
      this.getData()
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.init()
  },
  methods: {
    draw (domName, option) {
      if (this.myChart[domName]) {
        this.$echarts.dispose(this.myChart[domName])
      }
      this.myChart[domName] = this.$echarts.init(document.getElementsByClassName(domName)[0])
      this.myChart[domName].setOption(option)
      if (domName === 'map') {
        this.myChart[domName].on('click', function (params) {
          console.log(params)
        })
      }
    },
    init () {
      const option = {
        visualMap: [{
          type: 'continuous',
          show: false,
          max: 100000,
          calculable: true,
          realtime: false,
          inRange: {
            color: ['#2830aa', '#2b3fed', '#3a6aff', '#46aaff', '#a5ffff ', '#ceffff', '#ffffff']
          },
          outOfRange: {
            colorAlpha: 0
          },
          seriesIndex: [0]
        }],
        mapbox: {
          style: 'mapbox://styles/mapbox/dark-v9',
          // 地图中心经纬度。经纬度用数组
          center: [121.5693, 31.123070],
          // 地图的缩放等级
          zoom: 10,
          // 视角俯视的倾斜角度
          pitch: 50,
          // 地图的旋转角度
          bearing: -10,
          boxHeight: 20,
          // 后处理特效的相关配置
          postEffect: {
            enable: true,
            // 环境光遮蔽
            SSAO: {
              enable: true,
              // 质量，支持'low', 'medium', 'high', 'ultra'
              quality: 'low',
              // 采样半径。半径越大效果越自然，但是需要设置较高的'quality'。
              radius: 2,
              // 强度。值越大颜色越深。
              intensity: 1.5
            }
          },
          // 光照相关的设置
          light: {
            // 场景主光源的设置
            main: {
              // 主光源的强度
              intensity: 1,
              // 主光源是否投射阴影
              shadow: false,
              // 阴影的质量
              shadowQuality: 'medium'
            },
            // 全局的环境光设置。
            ambient: {
              // 环境光的强度。
              intensity: 0.5
            }
          }
        },
        series: [{
          name: '分布',
          type: 'bar3D',
          coordinateSystem: 'mapbox',
          shading: 'realistic',
          barSize: 0.5,
          data: mapData,
          silent: false
        },
        {
          name: '重点事件',
          type: 'bar3D',
          coordinateSystem: 'mapbox',
          shading: 'realistic',
          barSize: 0.5,
          data: [
            {name: '重点事件1', value: [121.642938, 30.880678, 100000], type: '类别', date: '日期', address: '地址'},
            {name: '重点事件2', value: [121.542938, 30.880678, 100000], type: '类别', date: '日期', address: '地址'},
            {name: '重点事件3', value: [121.442938, 30.880678, 100000], type: '类别', date: '日期', address: '地址'},
            {name: '重点事件4', value: [121.342938, 30.880678, 100000], type: '类别', date: '日期', address: '地址'},
            {name: '重点事件5', value: [121.242938, 30.880678, 100000], type: '类别', date: '日期', address: '地址'}
          ],
          // symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAABRCAYAAABcxs+uAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkUyMDNFQkVDNzlCOTExRThCMDgxRDE1NjA0MUE5NzQ2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkUyMDNFQkVENzlCOTExRThCMDgxRDE1NjA0MUE5NzQ2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTIwM0VCRUE3OUI5MTFFOEIwODFEMTU2MDQxQTk3NDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTIwM0VCRUI3OUI5MTFFOEIwODFEMTU2MDQxQTk3NDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5eA6HCAAAMvUlEQVR42qxZ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',
          // symbolSize: [64, 128],
          silent: false
        }]
      }
      this.draw('map', option)
    },
    getData () {
      let vue = this
      let baseUrl = '/peopleMediate/V1.0.0.2'
      let reqParam = { area: this.areaDefault[0] }
      let url = ''
      // 趋势分析
      url = '/trend'
      http.get(baseUrl + url, reqParam, (data) => {
        vue.$nextTick(function () {
          vue.qushifx = data
          // 趋势分析数据模拟
          vue.qushifx['data_110'] = [
            {
              'name': '12月',
              'value': 2160
            },
            {
              'name': '11月',
              'value': 10042
            },
            {
              'name': '10月',
              'value': 9049
            },
            {
              'name': '9月',
              'value': 8167
            },
            {
              'name': '8月',
              'value': 9562
            },
            {
              'name': '7月',
              'value': 10246
            },
            {
              'name': '6月',
              'value': 10090
            },
            {
              'name': '5月',
              'value': 10996
            },
            {
              'name': '4月',
              'value': 9857
            },
            {
              'name': '3月',
              'value': 11106
            },
            {
              'name': '2月',
              'value': 11977
            },
            {
              'name': '1月',
              'value': 11530
            }
          ]
          vue.draw('qsfx', eosNew.setLine(vue.qushifx['data_110'], true, true))
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
      // 重点事件
      url = '/keyEvents'
      http.get(baseUrl + url, reqParam, (data) => {
        vue.zhongdiangz = data
      })
      // 行专占比
      url = '/category'
      http.get(baseUrl + url, reqParam, (data) => {
        vue.pro1 = (data.hangZhuanBL * 100).toFixed(1)
        vue.pro2 = (100 - data.hangZhuanBL * 100).toFixed(1)
        vue.draw('ywlx', eosNew.setBar(data.yeWuLXHSL))
      })
      // 业务数量
      url = '/mainPage_Dist_Count'
      http.get(baseUrl + url, reqParam, (data) => {
        data.yewusl.map((item, index) => {
          vue.casestatistics[item['biao']] = item['benyue']
          vue.casestatisticsAll[item['biao']] = item['quannian']
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
    },
    changeRouter (url, val) {
      if (url === 'importantEventDetail') {
        this.$router.push({name: 'importantEventDetail', params: {id: val}})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.index_container{
  // background: #171415;
  position: absolute;
  width: 100%;
  height: 100%;
  min-width:1366px;
  min-height: 766px;
  .head{
    display: block;
    background-image: url('/static/renmintjNew/headback.png') no-repeat;
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
    }
    .right{
      float: right;
      padding:30px 0 0 0;
      span{
        font-size:12px;
        font-family:HiraginoSansGB-W3;
        color:rgba(237,237,237,1);
      }
    }
  }
  .body{
    height: calc(100% - 100px);
    margin-top: 5px;
    position: relative;
    display: block;
    .left{
      width: 22%;
      height: 100%;
      float: left;
      background:linear-gradient(to left,rgba(0,0,0,0.2), rgba(0,0,0,0));
      position: relative;
      .left1{
        height: calc((100% - 150px) * 0.15);
        position: relative;
        box-sizing:border-box;
        padding:8px 0 8px 12px;
        .line{
          height: 50%;
          display: block;
          align-items:center;
          display:flex;
          label{
            font-size:12px;
            font-family:MicrosoftYaHei;
            color:rgba(186,186,186,1);
            line-height: calc(50%)
          }
          img{
            float: left;
            margin-left:4px;
            &:nth-child(2){
              margin-left:6px;
            }
            &:nth-last-child(2){
              margin-right: 6px;
            }
          }
          span{
            font-size:12px;
            font-family:FZLTZHK--GBK1-0;
            color:rgba(254,254,254,1);
          }
        }
      }
      .left2{
        height: calc((100% - 150px) * 0.50);
        position: relative;
        padding-left:12px;
      }
      .left3{
        height: calc((100% - 150px) * 0.35);
        position: relative;
        .nav{
          display: block;
          padding-right: 8px;
          span{
            font-size:12px;
            font-family:HiraginoSansGB-W3;
            color:rgba(186,186,186,1);
            float: right;
            border-left:1px solid rgba(186,186,186,1);
            padding:0 4px;
            cursor: pointer;
            &:last-child{
              border:0
            }
          }
          .active{
            color:#FFF225
          }
        }
        .qsfx{
          position: absolute;
          width: 100%;
          height: calc(100% - 16px);
          box-sizing: border-box;
          top:16px;
        }
      }
    }
    .right{
      width: 22%;
      height: 100%;
      float: right;
      background:linear-gradient(to right,rgba(0,0,0,0.2), rgba(0,0,0,0));
      position: relative;
      .right1{
        height: calc((100% - 150px) * 0.4);
        position: relative;
        box-sizing:border-box;
        padding:8px 20px;
        .table{
          position: relative;
          width: 100%;
          box-sizing: border-box;
          .table_tr{
            width: 100%;
            height: 25px;
            .once{
              height: 25px;
              width: 33.3%;
              line-height: 25px;
              text-align: center;
              float: left;
              font-size:12px;
              font-family:HiraginoSansGB-W3;
              color:rgba(255,255,255,1);
            }
            .th{
              color:rgba(186,186,186,1);
            }
          }
          .table_body{
            height: 150px;
            overflow:hidden;
          }
        }
      }
      .right2{
        height: calc((100% - 150px) * 0.38);
        position: relative;
        box-sizing:border-box;
        padding:8px 20px;
        .rContainer{
          width: 50%;
          height: 50%;
          float: left;
          position: relative;
          box-sizing: border-box;
          .rTop{
            display: block;
            height: 50%;
            box-sizing: border-box;
            margin:0 20px;
            border-bottom:1px solid rgba(186,186,186,1);
            position: relative;
            .span1{
              font-size:14px;
              font-family:FZLTZHK--GBK1-0;
              color:rgba(255,255,255,0.3);
              width: 50%;
              text-align: right;
              padding-right: 5px;
              box-sizing: border-box;
              position: absolute;
              bottom:6px;
            }
            .span2{
              font-size:12px;
              font-family:HiraginoSansGB-W3;
              color:rgba(186,186,186,0.3);
              width: 50%;
              text-align: left;
              box-sizing: border-box;
              position: absolute;
              bottom:7px;
              left: 50%;
            }
          }
          .rBottom{
            display: block;
            height: 50%;
            position: relative;
            .span3{
              font-size:14px;
              font-family:FZLTZHK--GBK1-0;
              color:rgba(255,255,255,1);
              width: 50%;
              text-align: right;
              padding-right: 5px;
              box-sizing: border-box;
              position: absolute;
              top:6px;
            }
            .span4{
              font-size:12px;
              font-family:FZLTZHK--GBK1-0;
              color:rgba(186,186,186,1);
              width: 50%;
              text-align: left;
              padding-right: 5px;
              box-sizing: border-box;
              position: absolute;
              top:6px;
              left: 50%;
            }
          }
          .rRight{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding-left:58px;
            .span5{
              font-size:10px;
              font-family:'HiraginoSansGB-W3';
              color:rgba(186,186,186,1);
              text-align: left;
              display: inline-block;
              width: 100%;
              position: absolute;
              bottom:6px;
            }
            .span6{
              font-size:14px;
              font-family:'FZLTZHK--GBK1-0';
              color:rgba(255,255,255,1);
              text-align: left;
              display: inline-block;
              width: 100%;
              position: absolute;
              top:6px;
            }
          }
          .rIcon{
            position: absolute;
            top: 50%;
            left: 8px;
            transform: translateY(-50%);
            z-index: 5;
          }
        }
      }
      .right3{
        height: calc((100% - 150px) * 0.22);
        position: relative;
        box-sizing:border-box;
        padding:8px 20px;
        .rLeft{
          width: 60%;
          height: 100%;
          float: left;
          position: relative;
          .rImg{
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 5;
          }
          .rSpanC{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding-left: 65px;
            position: relative;
            .spanT{
              font-size:20px;
              font-family:FZLTZHK--GBK1-0;
              color:rgba(255,255,255,1);
              position: absolute;
              bottom: 0px;
            }
            .spanB{
              font-size:14px;
              font-family:HiraginoSansGB-W3;
              color:rgba(186,186,186,1);
              position: absolute;
              top: 6px;
            }
            div{
              height: 50%;
              display: block;
              position: relative;
            }
          }
        }
        .rRight{
          width: 40%;
          height: 100%;
          float: right;
          background: url('/static/renmintjNew/动画.gif');
          background-position: center center;
          background-repeat: no-repeat;
        }
      }
    }
    .bottom{
      position: absolute;
      width: 56%;
      height: 66px;
      bottom: 5px;
      left: 50%;
      transform: translate(-50%);
      padding:0 16px;
      box-sizing: border-box;
      .bottom1{
        width: 49%;
        height: 61px;
        float: left;
        background:linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0));
        padding-top:5px;
      }
      .bottom2{
        width: 49%;
        height: 66px;
        float: right;
        background:linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0));
        padding-top:5px;
      }
      .bTitle{
        font-size:12px;
        font-family:HiraginoSansGB-W3;
        color:rgba(186,186,186,1);
        padding:0 0 0 20px;
        background: url('/static/renmintj/icon_open.png');
        background-repeat: no-repeat;
        background-position: left 5px center;
        cursor: pointer;
      }
      .bContent{
        width: 25%;
        float: left;
        height: 50px;
        margin:0;
        position: relative;
        img{
          width: 26px;
          height: 26px;
          position: absolute;
          left:25%;
          top:12px;
          transform: translate(-120%)
        }
        .bSpanC{
          height: 100%;
          position: absolute;
          top:0;
          left: 25%;
          .bSpan1{
            height: 25px;
            display: block;
            font-size:10px;
            font-family:'HiraginoSansGB-W3';
            color:rgba(186,186,186,1);
            line-height: 34px;
          }
          .bSpan2{
            height: 25px;
            display: block;
            font-size:12px;
            font-family:'FZLTZHK--GBK1-0';
            color:rgba(255,255,255,1);
            line-height: 21px;
          }
        }
      }
    }
    .top{
      position: absolute;
      width: 36%;
      height: 104px;
      left: 50%;
      top:32px;
      transform: translate(-50%);
      background: rgba(0,0,0,0.2);
      .topY{
        width: 8%;
        float: left;
        height: 104px;
        box-sizing: border-box;
        text-align: center;
        .topYh{
          border:0;
          font-size:12px;
          font-family:HiraginoSansGB-W3;
          color:rgba(186,186,186,1);
        }
      }
      .topX{
        width: 22%;
        float: left;
        height: 104px;
        box-sizing: border-box;
        padding:0 18px;
      }
      .h1{
        display: block;
        height: 24px;
        border:0;
        font-size:10px;
        font-family:HiraginoSansGB-W3;
        color:rgba(186,186,186,1);
        text-align: center;
        line-height: 24px;
      }
      .h2{
        display: block;
        height: 47px;
        border:0;
        box-sizing: border-box;
        border-bottom: 1px dashed rgba(186,186,186,0.5);;
        line-height: 46px;
        font-size:24px;
        font-family:FZLTZHK--GBK1-0;
        color:rgba(73,234,238,1);
        text-align: center;
        font-weight: bold;
      }
      .h3{
        display: block;
        height: 33px;
        border:0;
        font-size:12px;
        font-family:FZLTZHK--GBK1-0;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 33px;
      }
    }
    .middle{
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -1;
      .map {
        width: 100%;
        height: 100%;
        position: absolute;
      }
    }
    .title{
      width: 100%;
      padding:18px 0 20px 29px;
      background: url('/static/renmintj/icon_open.png');
      background-repeat: no-repeat;
      background-position: left 11px center;
      box-sizing: border-box;
      cursor: pointer;
      .title_china{
        display: block;
        font-size:16px;
        font-family:HiraginoSansGB-W3;
        color:rgba(237,237,237,1);
      }
      .title_english{
        display: block;
        font-size:10px;
        font-family:ArialMT;
        color:rgba(237,237,237,1);
      }
    }
  }
}
</style>
