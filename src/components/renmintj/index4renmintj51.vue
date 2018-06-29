/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-06-26 13:36:36
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-06-27 17:48:18
 * @content: echarts map
 */

<template>
 <div id="renmintj" class="target">
 </div>
</template>

<script>
// import eos from '@/util/echartsOptions'
// import http from '@/util/httpUtil'
import data from '@/../static/json/data'
export default {
  name: 'renmintj',
  components: {},
  data () {
    return {
      myChart: {}
    }
  },
  watch: {},
  methods: {
    // 绘制echarts
    draw (domName, option) {
      if (this.myChart[domName]) {
        this.$echarts.dispose(this.myChart[domName])
      }
      this.myChart[domName] = this.$echarts.init(document.getElementsByClassName(domName)[0])
      this.myChart[domName].setOption(option)
      if (domName === 'target') {
        this.myChart[domName].on('click', function (params) {
          console.log(params)
        })
      }
    },
    // 路由跳转
    changeRouter (name, id) {
      let target = {name: name}
      if (name === 'importantEventDetail') {
        target = {name: name, params: { id: id }}
      }
      this.$router.push(target)
    },
    // getData () {
    //   let vue = this
    //   let reqParam = { area: this.areaDefault[0] }
    //   let baseUrl = '/peopleMediate/V1.0.0.2'
    //   let url = ''
    //   url = '/category'
    //   http.get(baseUrl + url, reqParam, (data) => {
    //     vue.$nextTick(function () {
    //       vue.draw('pie1', eos.setPie4([(data.hangZhuanBL * 100).toFixed(1), ((1 - data.hangZhuanBL) * 100).toFixed(1)], '行专占比'))
    //       vue.draw('chart', eos.setBar4(data.yeWuLXHSL, ['#FF9C00', '#F8E228'], 'vertical', 'integer', 1))
    //     })
    //   })
    // }
    init () {
      const option = {
        visualMap: [{
          type: 'continuous',
          show: true,
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
          data: data,
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
      this.draw('target', option)
    }
  },
  created () {},
  mounted () {
    this.init()
  },
  beforeDestroy () {}
}
</script>

<style scoped>
  #renmintj {
    min-height: 1080px;
    min-width: 1920px;
    overflow-y: hidden;
  }
  .test{
    position: absolute;
    top: 736px;
    left: 83px;
    background: green;
    width: 100px;
    height: 100px;
    z-index: 99999;
  }
</style>
