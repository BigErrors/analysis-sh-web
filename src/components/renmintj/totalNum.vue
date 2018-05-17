<template>
<div id='renmintj' class='shade'>
  <div class='zIndex3 renmintj 1'></div>
  <div class='zIndex3 renmintj 2'></div>
  <div class='zIndex3 pie'></div>
  <div class='zIndex3 line'></div>
  <div class='zIndex3 bar'></div>
  <baidu-map class='zIndex3 map' :center='center' :zoom='zoom' :minZoom='minZoom' @ready='handler'>
    <bm-circle :center="circlePath.center" :radius="circlePath.radius" fillColor="#FDCD0F" :fillOpacity="1" strokeColor='#FDCD0F' :strokeOpacity="1" :strokeWeight="0">
    </bm-circle>
    <bm-label  :position="circlePath.center" :content='circlePath.content' :labelStyle="{color: '#fff', border:0, background:'#FDCD0F', fontSize : '16px'}" :offset="{width: -18, height: -8}"/>
    <bm-circle :center="circlePath1.center" :radius="circlePath1.radius" fillColor="#FDCD0F" :fillOpacity="1" strokeColor='#FDCD0F' :strokeOpacity="1" :strokeWeight="0">
    </bm-circle>
    <bm-label  :position="circlePath1.center" :content='circlePath1.content' :labelStyle="{color: '#fff', border:0, background:'#FDCD0F', fontSize : '16px'}" :offset="{width: -18, height: -8}"/>
  </baidu-map>
</div>
</template>

<script>
import eos from '@/util/echartsOptions'
import style from '@/json/mapStyle'
import qushifx from '@/json/shehuimd_qushifx'
import gequqk from '@/json/shehuimd_gequqk'
export default {
  name: 'renmintj',
  data () {
    return {
      center: {lng: 0, lat: 0},
      zoom: 11,
      minZoom: 11,
      circlePath: {
        center: {
          lng: 121.504934,
          lat: 31.130371
        },
        radius: 6000,
        content: '2000'
      },
      circlePath1: {
        center: {
          lng: 121.604934,
          lat: 31.230371
        },
        radius: 3000,
        content: '123'
      }
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
      // 设置地图样式
      map.setMapStyle({styleJson: style})
      // 开启关系拖拽
      map.enableInertialDragging()
      // 开启鼠标滚动缩放
      map.enableScrollWheelZoom()
      // 地图数据初始化
    }
  },
  created () {},
  mounted () {
    this.draw('1', eos.setFill(0.72, '#FDBF5E', '司法所专项编制\n\r\r\r\r\r\r-落实率-', [0.72], '17', '#7BA6ED'))
    this.draw('2', eos.setFill(0.3, '#FF7279', '村居法律顾问\n\r\r\r\r-覆盖率-', [0.3], '17', '#7BA6ED'))
    this.draw('pie', eos.setPie([{value: 679, name: '一般调解'}, {value: 1548, name: '专业调解'}], [{value: 310, name: '婚姻家庭'}, {value: 369, name: '邻里纠纷'}, {value: 1048, name: '知识产权'}, {value: 251, name: '涉校纠纷'}, {value: 249, name: '医患纠纷'}]))
    this.draw('line', eos.setLine(qushifx))
    this.draw('bar', eos.setBar2(gequqk))
  }
}
</script>

<style scope>
  #renmintj {
    min-height: 1080px;
    min-width: 1920px;
    overflow-y: auto;
  }
  .shade {
    background-color: #0b1740;
  }
  /* .shade{
    width:100%;
    height: 100%;
    position: fixed;
    background: url('/static/图层 1.png');
    background-size: 1920px 1080px;
    left: 0;
    top: 0;
    z-index: 2;
    pointer-events: none;
  } */

  .zIndex3 {
    z-index: 2;
  }

  .renmintj {
    float: left;
    width: 90px;
    height: 126px;
  }

  .pie {
    float: left;
    width: 500px;
    height: 500px;
  }

  .line {
    float: left;
    width: 391px;
    height: 264px;
  }

  .bar {
    float: left;
    width: 963px;
    height: 265px;
  }

  .map{
    float: left;
    width: 831px;
    height: 607px;
  }
</style>
