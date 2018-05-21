<template>
  <div id='mapApp' class='container columnDirection'>
    <div class='item container rowDirection content'>
      <div class='item top' style='cursor: pointer;' @click='changeRouter("moduleChoose")'></div>
      <div class='item left container columnDirection'>
        <div class='l1'>
          <div class='num1'>{{zhishufxNow.gankongzs}}</div>
          <div class='num2' :style='{"color": zhishufxNow.tongbi>0?"#FC4A4A":"#67FF6B"}'>{{`${Math.round(zhishufxNow.tongbi*100)}%`}}</div>
          <div class='chart'></div>
        </div>
        <div class='l2'>
          <table class='l2Content' cellspacing='0'>
           <thead></thead>
           <tbody>
            <tr v-for='(value, key, index) in zhibiaofxNow' :key='key + index' :class='{"stripe": index%2 ===0 ? true:false}'>
              <td class='td type cursor' @click='changeRouter(key)'>{{key | nameFormat}}</td>
              <td  class='td '>
                <span class="today">{{value.jinrixz | numFormat}}</span><br>
                <span class="text" :class='{"paddingLeft":(key==="110"||key==="falvzx"||key==="renmintj")?true:false}'>今日新增</span>
                <span v-if='key==="110"||key==="falvzx"||key==="renmintj"' :class="(value.tongbi<0)?'green':'red'">{{`${Math.round(value.tongbi*100)}%`}}</span>
              </td>
              <td class='td year'>
                <span class="today">{{value.quannianlj | numFormat}}</span><br>
                <span class="text">全年累计</span>
              </td>
            </tr>
           </tbody>
          </table>
        </div>
        <div class='l3'>
          <div class='l3Content'></div>
        </div>
      </div>
      <div class='item center container columnDirection'>
        <div class='c1'>
          <div class="shade"></div>
          <baidu-map class='c11' :center='center' :zoom='zoom' @ready='handler' :minZoom='minZoom' @zoomend = zoomChange>
            <bm-marker v-for = "item in zhongdianjg" :position="{'lng':item.lon,'lat':item.lat}" :key=item.xuhao :icon="{url: '/static/重点机构.png', size: {width: 21, height: 30}}"></bm-marker>
            <bm-marker v-for = "item in zhongdianry" :position="{'lng':item.lon,'lat':item.lat}" :key=item.xuhao :icon="{url: '/static/重点人员.png', size: {width: 21, height: 30}}"></bm-marker>
            <bm-marker v-for = "item in sifas" :position="{'lng':item.lon,'lat':item.lat}" :key=item.xuhao :icon="{url: '/static/司法所.png', size: {width: 21, height: 30}}"></bm-marker>
            <!-- 展示弹框的一种方式，这种方案样式不好改
            <bm-info-window :show="xuhao === item.xuhao"  :position="{'lng':item.lon,'lat':item.lat}"  @close="changeXuhao('')"  :title="item.biaoti"> <p>{{item.dizhi}}</p></bm-info-window>-->
            <!-- 重点事件的点 -->
            <bm-marker  @click="changeLabelInfo(item.xuhao,$event)" v-for = "item in zhongdiansj2" :position="{'lng':item.lon,'lat':item.lat}" :key=item.xuhao :icon="{url: '/static/pointer.gif', size: {width: 38, height: 38}}">
              <bm-label v-if="labelXuhao===item.xuhao" :content="item.biaoti+'</br>'+item.shijian+'</br>'+item.dizhi"  :position="{'lng':item.lon,'lat':item.lat}" :labelStyle="labelStyle" title=""/>
            </bm-marker>
            <!-- <bm-marker  @click="test(item)" v-for = "item in zhongdiansj" :position="{'lng':item.lon,'lat':item.lat}" :key=item.xuhao :icon="{url: '/static/pointer.png', size: {width: 19, height: 19}}"></bm-marker> -->
            <!-- 海量点 -->
            <!-- bm-point-collection标签的顺序对应cavans图层的绘制顺序 -->
            <bm-point-collection :points="blueEvent" shape="BMAP_POINT_SHAPE_CIRCLE" color="rgba(0,255,253,1)" size="BMAP_POINT_SIZE_SMALL"></bm-point-collection>
            <bm-point-collection :points="yellowEvent" shape="BMAP_POINT_SHAPE_CIRCLE" color="rgba(255,255,0,1)" ></bm-point-collection>
            <!-- 重要事件现在改为全部展示 -->
            <!-- <bm-point-collection :points="redEvent" shape="BMAP_POINT_SHAPE_CIRCLE" color="rgba(255,70,68,1)" size="BMAP_POINT_SIZE_BIG"></bm-point-collection> -->
            <!-- <bm-marker v-for = "(item,index) in redEvent" :position="{'lng':item.lon,'lat':item.lat}" :key=index :icon="{url: '/static/pointer.png', size: {width: 19, height: 19}}">
              <bm-label :content="item.biaoti+'</br>'+item.shijian+'</br>'+item.dizhi"  :position="{'lng':item.lon,'lat':item.lat}" :labelStyle="labelStyle" title=""/>
            </bm-marker> -->
          </baidu-map>
          <div class='c12' :class="{c12anmishow:showall,c12anmihide:hideall}">
            <div class="c12content choosed" @click="ifshow">
              <img v-if="chooseEventVal ==='all'" class="c12img" src="/static/全部事件t.png" />
              <img v-if="chooseEventVal ==='s110ld'" class="c12img" src="/static/110联动t.png" />
              <img v-if="chooseEventVal ==='sfalvzx'" class="c12img" src="/static/法律咨询t.png" />
              <img v-if="chooseEventVal ==='stiaojieanj'" class="c12img" src="/static/调解案件t.png" />
              <img v-if="chooseEventVal ==='zhongdiansj'" class="c12img" src="/static/重点事件t.png" />
              {{chooseEventName}}</div>
            <div v-if="chooseEventVal!=='all'" class="c12content" @click="ifshow() ;chooseEvent('all')"><img class="c12img" src="/static/全部事件f.png" />全部事件</div>
            <div v-if="chooseEventVal!=='s110ld'" class="c12content" @click="ifshow() ;chooseEvent('s110ld')"><img class="c12img" src="/static/110联动f.png" />110联动</div>
            <div v-if="chooseEventVal!=='sfalvzx'" class="c12content" @click="ifshow() ;chooseEvent('sfalvzx')"><img class="c12img" src="/static/法律咨询f.png" />法律咨询</div>
            <div v-if="chooseEventVal!=='stiaojieanj'" class="c12content" @click="ifshow() ;chooseEvent('stiaojieanj')"><img class="c12img" src="/static/调解案件f.png" />调解案件</div>
            <div v-if="chooseEventVal!=='zhongdiansj'" class="c12content" @click="ifshow() ;chooseEvent('zhongdiansj')"><img class="c12img" src="/static/重点事件f.png" />重点事件</div>
          </div>
          <div class='c12 c13' :class="{c12anmishow2:showall2,c12anmihide2:hideall2}">
            <div class="c12content choosed" @click="ifshow2">
              <img v-if ="chooseEventVal2 ==='nothing'" class="c12img" src="/static/不显示t.png" />
              <img v-if ="chooseEventVal2 ==='zhongdianry'" class="c12img" src="/static/重点人员t.png" />
              <img v-if ="chooseEventVal2 ==='zhongdianjg'" class="c12img" src="/static/重点机构t.png" />
              <img v-if ="chooseEventVal2 ==='sifas'" class="c12img" src="/static/司法所t.png" />
              {{chooseEventName2}}</div>
            <div class="c12content" v-if="chooseEventVal2 !=='nothing'" @click="ifshow2();chooseEvent2('nothing')"><img class="c12img" src="/static/不显示f.png" />不显示</div>
            <div class="c12content" v-if="chooseEventVal2 !=='zhongdianry'" @click="ifshow2();;chooseEvent2('zhongdianry')"><img class="c12img" src="/static/重点人员f.png" />重点人员</div>
            <div class="c12content" v-if="chooseEventVal2 !=='zhongdianjg'" @click="ifshow2();;chooseEvent2('zhongdianjg')"><img class="c12img" src="/static/重点机构f.png" />重点机构</div>
            <div class="c12content" v-if="chooseEventVal2 !=='sifas'" @click="ifshow2();;chooseEvent2('sifas')"><img class="c12img" src="/static/司法所f.png" />司法所</div>
          </div>
          <div class="c14">
            <span class="c14content" v-for = "(item,index) in allEventLength" :key=index>{{item}}</span>
            <div class="c14title">全年累计事件量</div>
          </div>
           <div class="c15">
            <span class="c14content" v-for = "(item,index) in todayEventLength" :key=index>{{item}}</span>
            <div class="c14title">今日事件量</div>
          </div>
        </div>
        <div class='c2'>
          <div class='c2Content'>
          </div>
        </div>
      </div>
      <div class='item right container columnDirection'>
        <div class='r1'>
          <div class="r11">
            <span class="percent">{{chuliqk.shuzhi + '%'}}</span>
            <span class="level">{{chuliqk.zhuangtai}}</span>
          </div>
          <div class="r12">
            <span class="bar disable" v-for="index in 20-Math.ceil(chuliqk.shuzhi/5) " :key="'disable'+index"></span>
            <span class="bar active" v-for="index in Math.ceil(chuliqk.shuzhi/5) " :key="'active'+index"></span>
            <span style="float: right; width: 95px;font-size: 20px;font-family:HiraginoSansGB-W3;color:rgba(17,148,248,1);">处理情况</span>
          </div>
        </div>
        <div class='r2'>
          <div class='r2Content'></div>
        </div>
        <div class='r3'>
          <div class='r3Content r31'></div>
          <div class='r3Content r32'></div>
          <div class='r3Content r33'></div>
          <div class='r3Content r34'></div>
          <div class='r3Content r35'></div>
          <div class='r3Content r36'></div>
        </div>
        <div class='r4'>
          <table class='r4Content' cellspacing='0'>
           <thead>
            <tr><td class='td blue'>事件</td><td class='td blue'>日期</td><td class='td blue'>地区</td><td class='td blue'>详情</td></tr>
           </thead>
           <tbody>
            <tr v-for='(item, index) in zhongdiansj' :key='"zd" + index' :class='{"stripe": index%2 ===0 ? true:false}'>
              <td class='td'>{{item.shijianlx}}</td>
              <td class='td'>{{item.riqi}}</td>
              <td class='td'>{{item.diqu}}</td>
              <td class='td'>{{item.xiangqing}}</td>
            </tr>
           </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import eos from '@/util/echartsOptions'
import jsonUtil from '@/util/jsonUtil'
import style from '@/../static/json/mapStyle'
import zhishufx from '@/../static/json/shehuimd_zhishufx'
import zhibiaofx from '@/../static/json/shehuimd_zhibiaofx'
import qushifx from '@/../static/json/shehuimd_qushifx'
import gequqk from '@/../static/json/shehuimd_gequqk'
import chuliqk from '@/../static/json/shehuimd_chuliqk'
import chulixl from '@/../static/json/shehuimd_chulixl'
import fuwuzl from '@/../static/json/shehuimd_fuwuzl'
import zhongdiansj from '@/../static/json/shehuimd_zhongdiansj'
import s110ld from '@/../static/json/shehuimd_ditusj_110ld'
import sfalvzx from '@/../static/json/shehuimd_ditusj_falvzx'
import stiaojieanj from '@/../static/json/shehuimd_ditusj_tiaojieaj'
import zhongdianjg from '@/../static/json/shehuimd_ditusj_zhongdianjg'
import zhongdianry from '@/../static/json/shehuimd_ditusj_zhongdianry'
import sifas from '@/../static/json/shehuimd_ditusj_sifas'
import zhongdiansj2 from '@/../static/json/shehuimd_ditusj_zhongdiansj'
import shijians from '@/../static/json/shehuimd_shijians'

export default {
  name: 'mapApp',
  data () {
    return {
      zhishufxNow: {},
      zhishufx: [],
      zhibiaofxNow: {},
      zhibiaofx: {},
      center: {lng: 0, lat: 0},
      zoom: 11,
      minZoom: 11,
      chuliqk: {},
      zhongdiansj: [],
      zhongdiansjBackup: [],
      labelStyle: {
        'background': 'url("/static/label.png")',
        'font-size': '14px',
        'color': 'white',
        'width': '254px',
        'height': '124px',
        'box-sizing': 'border-box',
        'padding': '10px 10px 15px 10px',
        'border': '0px',
        'transform': 'translate(-110px,-124px)',
        'z-index': '1000'
      }, // 弹框样式设计，写死会报错
      timer: '', // 弹框消失定时器
      showall: false,
      showall2: false,
      hideall: false,
      hideall2: false,
      chooseEventVal: 'all',
      chooseEventVal2: 'nothing',
      locked: false, // 给重点事件自动弹框上锁
      allEventLength: '123,856',
      todayEventLength: '0,042',
      s110ld: [],
      s110ld1: [],
      s110ld2: [],
      s110ld3: [],
      sfalvzx: [],
      sfalvzx1: [],
      sfalvzx2: [],
      sfalvzx3: [],
      stiaojieanj: [],
      stiaojieanj1: [],
      stiaojieanj2: [],
      stiaojieanj3: [],
      zhongdianjg: [],
      zhongdianry: [],
      zhongdiansj2: [],
      sifas: [],
      labelXuhao: ''
    }
  },
  filters: {
    nameFormat (value) {
      let types = ['110', 'falvzx', 'renmintj', 'zhongdiansj', 'zhongdianry', 'zhongdianjg']
      switch (value) {
        case types[0]:
          return '110联动'
        case types[1]:
          return '法律咨询'
        case types[2]:
          return '人民调解'
        case types[3]:
          return '重点事件'
        case types[4]:
          return '重点人员'
        case types[5]:
          return '重点机构'
      }
    },
    numFormat (num) {
      num = (num.replace(/(^\s*)|(\s*$)/g, '') || 0).toString()
      if (num.length > 3) {
        num = num.slice(0, num.length - 3) + ',' + num.slice(-3)
      }
      return num
    }
  },
  methods: {
    // 绘制echarts
    draw (domName, option) {
      let myChart = this.$echarts.init(document.getElementsByClassName(domName)[0])
      myChart.setOption(option)
    },
    // 地图配置
    handler ({BMap, map}) {
      this.center.lng = 121.504934
      this.center.lat = 31.130371
      this.zoom = 11
      map.setMapStyle({styleJson: style})
      // 开启关系拖拽
      map.enableInertialDragging()
      // 开启鼠标滚动缩放
      map.enableScrollWheelZoom()
      // 地图数据初始化
      this.init(this.s110ld, 's110ld')
      this.init(this.sfalvzx, 'sfalvzx')
      this.init(this.stiaojieanj, 'stiaojieanj')
      this.zhongdiansj2 = this.redEvent
    },
    // 构建初始化数据
    initData () {
      // 指数分析数据
      this.zhishufxNow = zhishufx[0]
      this.zhishufx = zhishufx
      // 指标分析数据--将6类数据分类
      let types = ['110', 'falvzx', 'renmintj', 'zhongdiansj', 'zhongdianry', 'zhongdianjg']
      types.map((type) => { this.zhibiaofx[type] = jsonUtil.merge(zhibiaofx, type) })
      this.zhibiaofxNow['110'] = this.zhibiaofx['110'][0]
      this.zhibiaofxNow['falvzx'] = this.zhibiaofx['falvzx'][0]
      this.zhibiaofxNow['renmintj'] = this.zhibiaofx['renmintj'][0]
      this.zhibiaofxNow['zhongdianjg'] = this.zhibiaofx['zhongdianjg'][0]
      this.zhibiaofxNow['zhongdianry'] = this.zhibiaofx['zhongdianry'][0]
      this.zhibiaofxNow['zhongdiansj'] = this.zhibiaofx['zhongdiansj'][0]
      // 处理情况数据
      this.chuliqk = chuliqk[0]
      // 重点事件
      this.zhongdiansj = zhongdiansj.slice(0, 6)
      // 地图--人员、机构、司法所点位数据
      this.s110ld = s110ld
      this.sfalvzx = sfalvzx
      this.stiaojieanj = stiaojieanj
      // 事件量数据
      this.allEventLength = this.strFormat(shijians[0]['quannianlj'])
      this.todayEventLength = this.strFormat(shijians[0]['jinri'])
    },
    // 事件量数据格式化--千位分隔
    strFormat (str) {
      if (str.length === 2) {
        str = '00' + str
      } else if (str.length === 3) {
        str = '0' + str
      }
      return ((str || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'))
    },
    // 初始化图表
    initChart () {
      this.draw('chart', eos.setLine2(zhishufx))
      this.draw('l3Content', eos.setLine(qushifx))
      this.draw('c2Content', eos.setBar(gequqk))
      this.draw('r2Content', eos.setRadar(chulixl))
      this.draw('r31', eos.setFill(fuwuzl[0].shuzhi, '#1194F8', fuwuzl[0].mingcheng))
      this.draw('r32', eos.setFill(fuwuzl[1].shuzhi, '#1194F8', fuwuzl[1].mingcheng))
      this.draw('r33', eos.setFill(fuwuzl[2].shuzhi, '#1194F8', fuwuzl[2].mingcheng))
      this.draw('r34', eos.setFill(fuwuzl[3].shuzhi, '#64C583', fuwuzl[3].mingcheng))
      this.draw('r35', eos.setFill(fuwuzl[4].shuzhi, '#64C583', fuwuzl[4].mingcheng))
      this.draw('r36', eos.setFill(fuwuzl[5].shuzhi, '#64C583', fuwuzl[5].mingcheng))
    },
    // 定时更新数据
    updateData () {
      let vue = this
      let i = 0
      let time1 = 0
      let time2 = 0
      setInterval(() => {
        // 重点事件数据更新
        i = i + 6
        let len = 6
        if (i < (zhongdiansj.length - 1)) {
          vue.zhongdiansj = zhongdiansj.slice(i, i + len)
        } else {
          i = 0
          vue.zhongdiansj = zhongdiansj.slice(i, i + len)
        }
        // 半小时数据更新
        time1++
        if (time1 <= 48) {
          vue.chuliqk = chuliqk[time1]
          vue.zhibiaofxNow['110'] = vue.zhibiaofx['110'][time1]
          vue.zhibiaofxNow['falvzx'] = vue.zhibiaofx['falvzx'][time1]
          vue.zhibiaofxNow['renmintj'] = vue.zhibiaofx['renmintj'][time1]
          vue.zhibiaofxNow['zhongdianjg'] = vue.zhibiaofx['zhongdianjg'][time1]
          vue.zhibiaofxNow['zhongdianry'] = vue.zhibiaofx['zhongdianry'][time1]
          vue.zhibiaofxNow['zhongdiansj'] = vue.zhibiaofx['zhongdiansj'][time1]
          // 事件量--全年与今日
          vue.allEventLength = vue.strFormat(shijians[time1]['quannianlj'])
          vue.todayEventLength = vue.strFormat(shijians[time1]['jinri'])
        } else {
          time1 = 0
          vue.chuliqk = chuliqk[time1]
        }
        // 三小时数据更新
        time2++
        if (time2 <= 8) {
          vue.zhishufxNow = zhishufx[time2]
        } else {
          time2 = 0
          vue.zhishufxNow = zhishufx[time2]
        }
      }, 10000)
    },
    updateMapData () {
      let _this = this
      // 写个定时器，来随机显示重点事件详情
      setInterval(function () {
        if (_this.locked === false) {
          let length = _this.zhongdiansj2.length
          let i = parseInt(Math.random() * length)
          _this.labelXuhao = _this.zhongdiansj2[i].xuhao
          _this.$nextTick(function () {
            document.getElementsByClassName('BMapLabel')[1].parentElement.style.zIndex = 1
          })
        }
      }, 5000)
    },
    init (arr, name) {
      for (let item in arr) {
        if (parseInt(arr[item].jibie) === 3) {
          this[name + '3'].push({'lng': arr[item].lon, 'lat': arr[item].lat, 'dengji': arr[item].dengji})
        } else if (parseInt(arr[item].jibie) === 2) {
          this[name + '2'].push({'lng': arr[item].lon, 'lat': arr[item].lat, 'dengji': arr[item].dengji})
        } else {
          this[name + '1'].push({'lon': arr[item].lon, 'lat': arr[item].lat, 'dengji': arr[item].dengji, 'biaoti': arr[item].biaoti, 'dizhi': arr[item].dizhi, 'shijian': arr[item].shijian, 'xuhao': arr[item].xuhao})
        }
      }
    },
    changeLabelInfo (info, ev) {
      this.locked = true
      this.labelXuhao = info
      var _this = this
      this.$nextTick(function () {
        ev.currentTarget.Ac.style.zIndex = 1
      })
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(function () {
        _this.labelXuhao = ''
        _this.locked = false
      }, 5000)
    },
    ifshow () {
      if (this.showall === false && this.hideall === false) {
        this.showall = true
      } else if (this.showall === true && this.hideall === false) {
        this.showall = false
        this.hideall = true
      } else if (this.showall === false && this.hideall === true) {
        this.showall = true
        this.hideall = false
      }
    },
    ifshow2 () {
      if (this.showall2 === false && this.hideall2 === false) {
        this.showall2 = true
      } else if (this.showall2 === true && this.hideall2 === false) {
        this.showall2 = false
        this.hideall2 = true
      } else if (this.showall2 === false && this.hideall2 === true) {
        this.showall2 = true
        this.hideall2 = false
      }
    },
    chooseEvent (name) {
      this.chooseEventVal = name
    },
    chooseEvent2 (name) {
      this.chooseEventVal2 = name
    },
    changeRouter (name) {
      if (name === 'renmintj') {
        name = 'index4renmintj'
      }
      this.$router.push({name: name})
    },
    // 地图缩放事件
    zoomChange (ev) {
      this.zoom = ev.target.getZoom()
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    this.initChart()
    this.updateData()
    this.updateMapData()
  },
  computed: {
    blueEvent: function () {
      let arr = []
      let _zoom = this.zoom
      let _s110ld3 = this.s110ld3
      let _sfalvzx3 = this.sfalvzx3
      let _stiaojieanj3 = this.stiaojieanj3
      if (_zoom === 11) {
        _s110ld3 = this.s110ld3.filter(item => item.dengji === '11')
        _sfalvzx3 = this.sfalvzx3.filter(item => item.dengji === '11')
        _stiaojieanj3 = this.stiaojieanj3.filter(item => item.dengji === '11')
      } else if (_zoom === 12) {
        _s110ld3 = this.s110ld3.filter(item => item.dengji === '11' || item.dengji === '12')
        _sfalvzx3 = this.sfalvzx3.filter(item => item.dengji === '11' || item.dengji === '12')
        _stiaojieanj3 = this.stiaojieanj3.filter(item => item.dengji === '11' || item.dengji === '12')
      } else if (_zoom === 13) {
        _s110ld3 = this.s110ld3.filter(item => item.dengji === '11' || item.dengji === '12' || item.dengji === '13')
        _sfalvzx3 = this.sfalvzx3.filter(item => item.dengji === '11' || item.dengji === '12' || item.dengji === '13')
        _stiaojieanj3 = this.stiaojieanj3.filter(item => item.dengji === '11' || item.dengji === '12' || item.dengji === '13')
      } else if (_zoom === 14) {
        _s110ld3 = this.s110ld3.filter(item => item.dengji === '11' || item.dengji === '12' || item.dengji === '13' || item.dengji === '14')
        _sfalvzx3 = this.sfalvzx3.filter(item => item.dengji === '11' || item.dengji === '12' || item.dengji === '13' || item.dengji === '14')
        _stiaojieanj3 = this.stiaojieanj3.filter(item => item.dengji === '11' || item.dengji === '12' || item.dengji === '13' || item.dengji === '14')
      } else if (_zoom >= 15) {
        _s110ld3 = this.s110ld3
        _sfalvzx3 = this.sfalvzx3
        _stiaojieanj3 = this.stiaojieanj3
      }
      return arr.concat(_s110ld3, _sfalvzx3, _stiaojieanj3)
    },
    yellowEvent: function () {
      let arr = []
      let _zoom = this.zoom
      let _s110ld2 = this.s110ld2
      let _sfalvzx2 = this.sfalvzx2
      let _stiaojieanj2 = this.stiaojieanj2
      if (_zoom === 11) {
        _s110ld2 = this.s110ld2.filter(item => item.dengji === '11')
        _sfalvzx2 = this.sfalvzx2.filter(item => item.dengji === '11')
        _stiaojieanj2 = this.stiaojieanj2.filter(item => item.dengji === '11')
      } else if (_zoom === 12) {
        _s110ld2 = this.s110ld2.filter(item => item.dengji === '11' || item.dengji === '12')
        _sfalvzx2 = this.sfalvzx2.filter(item => item.dengji === '11' || item.dengji === '12')
        _stiaojieanj2 = this.stiaojieanj2.filter(item => item.dengji === '11' || item.dengji === '12')
      } else if (_zoom === 13) {
        _s110ld2 = this.s110ld2.filter(item => item.dengji === '11' || item.dengji === '12' || item.dengji === '13')
        _sfalvzx2 = this.sfalvzx2.filter(item => item.dengji === '11' || item.dengji === '12' || item.dengji === '13')
        _stiaojieanj2 = this.stiaojieanj2.filter(item => item.dengji === '11' || item.dengji === '12' || item.dengji === '13')
      } else if (_zoom === 14) {
        _s110ld2 = this.s110ld2.filter(item => item.dengji === '11' || item.dengji === '12' || item.dengji === '13' || item.dengji === '14')
        _sfalvzx2 = this.sfalvzx2.filter(item => item.dengji === '11' || item.dengji === '12' || item.dengji === '13' || item.dengji === '14')
        _stiaojieanj2 = this.stiaojieanj2.filter(item => item.dengji === '11' || item.dengji === '12' || item.dengji === '13' || item.dengji === '14')
      } else if (_zoom >= 15) {
        _s110ld2 = this.s110ld2
        _sfalvzx2 = this.sfalvzx2
        _stiaojieanj2 = this.stiaojieanj2
      }
      return arr.concat(_s110ld2, _sfalvzx2, _stiaojieanj2)
    },
    redEvent: function () {
      let arr = []
      return arr.concat(this.s110ld1, this.sfalvzx1, this.stiaojieanj1)
    },
    chooseEventName: function () {
      if (this.chooseEventVal === 'all') {
        return '全部事件'
      } else if (this.chooseEventVal === 's110ld') {
        return '110联动'
      } else if (this.chooseEventVal === 'sfalvzx') {
        return '法律咨询'
      } else if (this.chooseEventVal === 'stiaojieanj') {
        return '调解案件'
      } else if (this.chooseEventVal === 'zhongdiansj') {
        return '重点事件'
      }
    },
    chooseEventName2: function () {
      if (this.chooseEventVal2 === 'nothing') {
        return '不显示'
      } else if (this.chooseEventVal2 === 'zhongdianry') {
        return '重点人员'
      } else if (this.chooseEventVal2 === 'zhongdianjg') {
        return '重点机构'
      } else if (this.chooseEventVal2 === 'sifas') {
        return '司法所'
      }
    }
  },
  watch: {
    chooseEventVal: function (to, from) {
      if (to === 's110ld') {
        this.zhongdiansj2 = this.redEvent
        this.init(this.s110ld, 's110ld')
        this.sfalvzx1 = []
        this.sfalvzx2 = []
        this.sfalvzx3 = []
        this.stiaojieanj1 = []
        this.stiaojieanj2 = []
        this.stiaojieanj3 = []
      } else if (to === 'sfalvzx') {
        this.zhongdiansj2 = this.redEvent
        this.init(this.sfalvzx, 'sfalvzx')
        this.s110ld1 = []
        this.s110ld2 = []
        this.s110ld3 = []
        this.stiaojieanj1 = []
        this.stiaojieanj2 = []
        this.stiaojieanj3 = []
      } else if (to === 'stiaojieanj') {
        this.zhongdiansj2 = this.redEvent
        this.init(this.stiaojieanj, 'stiaojieanj')
        this.s110ld1 = []
        this.s110ld2 = []
        this.s110ld3 = []
        this.sfalvzx1 = []
        this.sfalvzx2 = []
        this.sfalvzx3 = []
      } else if (to === 'all') {
        this.zhongdiansj2 = this.redEvent
        this.init(this.s110ld, 's110ld')
        this.init(this.sfalvzx, 'sfalvzx')
        this.init(this.stiaojieanj, 'stiaojieanj')
      } else if (to === 'zhongdiansj') {
        this.locked = false
        this.s110ld1 = []
        this.s110ld2 = []
        this.s110ld3 = []
        this.sfalvzx1 = []
        this.sfalvzx2 = []
        this.sfalvzx3 = []
        this.stiaojieanj1 = []
        this.stiaojieanj2 = []
        this.stiaojieanj3 = []
        this.zhongdiansj2 = zhongdiansj2
      }
    },
    chooseEventVal2: function (to, from) {
      if (to === 'nothing') {
        this.zhongdianjg = []
        this.zhongdianry = []
        this.sifas = []
      } else if (to === 'zhongdianjg') {
        this.zhongdianry = []
        this.sifas = []
        this.zhongdianjg = zhongdianjg
      } else if (to === 'zhongdianry') {
        this.zhongdianjg = []
        this.sifas = []
        this.zhongdianry = zhongdianry
      } else if (to === 'sifas') {
        this.zhongdianjg = []
        this.zhongdianry = []
        this.sifas = sifas
      }
    }
  }
}
</script>

<style scoped>
  #mapApp {
    /* height: 100%; */
    min-height: 1080px;
    min-width: 1920px;
  }
  .shade{
    width:100%;
    height: 100%;
    position: fixed;
    background: url('/static/图层 1.png');
    background-size: 1920px 1080px;
    left: 0;
    top: 0;
    z-index: 2;
    pointer-events: none;
  }

  #mapApp .container {
    display: -webkit-flex;
    display: flex;
    /* flex-wrap属性定义，如果一条轴线排不下，如何换行。 */
    /* flex-wrap: nowrap(默认,不换行）| wrap(换行，第一行在上方) | wrap-reverse(换行，第一行在下方); */
    flex-wrap: nowrap;
    /* justify-body属性定义了项目在主轴上的对齐方式 */
    /* justify-body: flex-start(默认值，左对齐) | flex-end(右对齐) | center(居中) | space-between(两端对齐，项目之间的间隔都相等) | space-around(每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍); */
    justify-body: space-between;
    /* align-items属性定义项目在交叉轴上如何对齐 */
    /* align-items: flex-start(交叉轴的起点对齐) | flex-end(交叉轴的终点对齐) | center(交叉轴的中点对齐) | baseline(项目的第一行文字的基线对齐) | stretch(默认值,如果项目未设置高度或设为auto，将占满整个容器的高度); */
    align-items: stretch;
  }

  #mapApp .rowDirection {
    flex-direction: row;
  }

  #mapApp .columnDirection {
    flex-direction: column;
  }

  #mapApp .top {
    width: 100%;
    min-width: 1920px;
    height: 99px;
    background: url('/static/头部.png');
    z-index: 99;
    position: absolute;
    left: 0;
    top:0;
  }

  #mapApp .content {
    height: 100%;
    padding-top:99px;
  }

  #mapApp .left {
    flex: none;
    max-width: 445px;
    min-width: 445px;
    z-index: 99;
  }

  #mapApp .right {
    flex: none;
    max-width: 445px;
    min-width: 445px;
    z-index: 99;
  }

  #mapApp .center {
    flex: auto;
    min-width: 1030px;
  }

  .c1 {
    position: relative;
    width: 1003px;
    height: 626px;
    margin: 10px 13px 14px 13px;
  }

  .c11 {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    /* margin: 0 13px 14px 13px; */
  }

  .c12 {
    position: absolute;
    right: 167px;
    bottom: 23px;
    width: 129px;
    height: 35px;
    box-sizing: border-box;
    border:1px solid #1669ee;
    background:rgba(22,105,238,0.2);
    box-shadow:inset 0 0 10px #1b9bfe;
    z-index: 3;
    color:#039dff;
    overflow: hidden;
    border-radius: 6px;
    /* margin: 0 13px 14px 13px; */
  }
  .c12content{
    cursor: pointer;
    height: 33px;
    line-height: 33px;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    padding-left:36px
  }
  .choosed{
    color:rgb(255,198,62)
  }
  .c12img{
    position: absolute;
    width: 22px;
    height: 22px;
    left: 4px;
    top: 5.5px;
  }
  .c12anmishow{
    animation: show 1s forwards
  }
  .c12anmihide{
    animation: hide 1s forwards
  }
  .c12anmishow2{
    animation: show2 1s forwards
  }
  .c12anmihide2{
    animation: hide2 1s forwards
  }
  @keyframes show{
    from{height: 35px}
    to{height: 167px}
  }
  @keyframes hide{
    from{height: 167px}
    to{height: 35px}
  }
  @keyframes show2{
    from{height: 35px}
    to{height: 135px}
  }
  @keyframes hide2{
    from{height: 135px}
    to{height: 35px}
  }
  .c13{
    right: 15px;
  }

  .c14{
    position: absolute;
    top:8px;
    left: 50%;
    transform: translate(-97%);
    z-index: 99;
  }
  .c15{
    position: absolute;
    top:8px;
    left: 50%;
    transform: translate(33%);
    z-index: 99;
  }
  .c14content{
    display: inline-block;
    width: 40px;
    height: 58px;
    border:1px solid #1669ee;
    color: white;
    font-size:41px;
    font-weight: 400;
    text-align: center;
    line-height: 56px;
    margin-right: 2px;
    background: rgba(22,105,238,0.2);
    font-family:'impact'
  }
  .c14content:nth-last-child(4n+1){
    border: 0px;
    width: 20px;
    background: transparent;
  }
  .c14title{
    padding-top:10px;
    font-size: 16px;
    text-align: center;
    color:#2ba3ff
  }
  /* 去除百度地图左下角内容 */
  .BMap_cpyCtrl {
    display: none;
  }

  .anchorBL{
    display:none;
  }

  .c2{
    width: 1003px;
    height: 315px;
    margin: 0 13px 17px 13px;
    background: url('/static/各区情况.png');
    z-index: 99;
  }

  .c2Content {
    width: 963px;
    height: 265px;
    box-sizing: border-box;
    margin: 30px 20px 20px 20px;
  }

  .l1 {
    width: 431px;
    height: 138px;
    margin: 0 0 17px 14px;
    background: url('/static/形状 31.png');
  }

  .l1 .num1 {
    float: left;
    margin: 56px 0px 41px 40px;
    height: 56px;
    width: 50px;
    line-height: 56px;
    font-size: 36px;
    color: #ffffff;
    font-family: 'impact';
  }
  .l1 .num2 {
    float: left;
    margin: 56px 0px 41px 13px;
    height: 56px;
    width: 50px;
    line-height: 70px;
    font-size: 18px;
    color: green;

  }
  .l1 .chart {
    float: left;
    margin: 40px 10px 21px 6px;
    height: 90px;
    width: 250px;
  }

  .l2 {
    width: 431px;
    height: 480px;
    margin: 0 0 14px 14px;
    background: url('/static/形状 31 拷贝.png');
  }

  .l2Content {
    width: 401px;
    height: 380px;
    box-sizing: border-box;
    margin: 65px 17px 35px 13px;
    color: #ffffff;
  }

  .l2Content td{
    text-align: center;
  }

  .l2Content .stripe{
    background: rgba(7,30,74,0.8)
  }

  .r4Content .stripe{
    background: rgba(7,30,74,0.8)
  }

  .cursor{
    cursor: pointer;
  }

  .l2Content .type{
    color: #C2C2C4;
    font-size: 16px;
  }

  .l2Content .paddingLeft{
    padding-left: 35px;
  }

  .l2Content .today{
    color: #FFFFFF;
    font-size: 22px;
  }

  .l2Content .text{
    margin-right: 7px;
    font-size: 14px;
    color: #1194F8;
  }

  .l2Content .red{
    color: #FC4A4A;
    margin-right: 10px;
  }

  .l2Content .green{
    color: #67FF6B;
    margin-right: 10px;
  }

  .l2Content .year{
    color: #FFFFFF;
    font-size: 22px;
  }

  .l3 {
    width: 431px;
    height: 314px;
    margin: 0 0 17px 14px;
    background: url('/static/趋势分析.png');
  }

  .l3Content {
    width: 391px;
    height: 264px;
    box-sizing: border-box;
    margin: 30px 20px 20px 20px;
  }

  .r1 {
    width: 431px;
    height: 112px;
    margin: -18px 15px 12px 0;
    background: url('/static/形状 1553.png');
  }

  .r11 {
    margin-top: 32px;
    text-align: right;
    padding-right: 28px;
  }

  .r1 .percent {
    width: 64px;
    height: 25px;
    font-size: 28px;
    font-family: impact;
    color: rgba(0, 226, 253, 1);
    line-height: 25px;
  }

  .r1 .level {
    width: 51px;
    height: 26px;
    font-size: 27px;
    font-family: HiraginoSansGB-W3;
    color: rgba(17, 148, 248, 1);
    line-height: 25px;
  }

  .r1 .r12 {
    height: 24px;
    width: 330px;
    margin-top: 16px;
    padding: 2px 25px 2px 95px;
  }

  .r1 .bar{
    width: 6px;
    height: 23px;
    border-radius: 2px;
    display: inline-block;
    margin-left: 4px;
  }

  .r1 .bar.active{
    background: rgba(0,226,253,1);
  }

  .r1 .bar.disable{
    background:rgba(6,30,99,1);
  }

  .r2 {
    width: 431px;
    height: 230px;
    margin: 0 13px 11px 0;
    background: url('/static/处理效率.png');
  }

  .r2Content{
    width: 391px;
    height: 170px;
    box-sizing: border-box;
    margin: 30px 20px 20px 20px;
  }

  .r3 {
    width: 431px;
    height: 292px;
    margin: 0 13px 11px 0;
    background: url('/static/服务质量.png');
  }

  .r3Content {
    float: left;
    width: 79px;
    height: 79px;
    box-sizing: border-box;
    margin: 50px 30px 0px 30px;
  }

  .r4 {
    width: 431px;
    height: 314px;
    margin: 0 13px 17px 0;
    background: url('/static/重点事件.png');
  }

  .r4Content {
    width: 391px;
    height: 264px;
    margin: 40px 20px 10px 20px;
    color: #ffffff;
  }

  .r4Content td{
    text-align: center;
    font-size: 14px;
  }

  .r4Content .blue {
    color: #1194F8;
  }
</style>
