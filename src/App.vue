<template>
  <div id='App' class='container columnDirection'>
    <div class='item top'></div>
    <div class='item container rowDirection content'>
      <div class='item left container columnDirection'>
        <div class='l1'>
          <div class='num'>7.2</div>
        </div>
        <div class='l2'>
          <div class='l2Content'>
            <p v-for='(item,index) in zhibiaofx' v-if='index>=0&&index<=5' :key='index'>{{item.zhibiao}}  {{item.tongbi}}  {{item.quannianlj}}</p>
          </div>
        </div>
        <div class='l3'>
          <div class='l3Content'></div>
        </div>
      </div>
      <div class='item center container columnDirection'>
        <div class='c1'>
          <baidu-map class='c11' @click='print(1)' :center='center' :zoom='zoom' @ready='handler'></baidu-map>
          <div class='c12' @click='print(2)'></div>
        </div>
        <div class='c2'>
          <div class='c2Content'>
          </div>
        </div>
      </div>
      <div class='item right container columnDirection'>
        <div class='r1'></div>
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
          <div class='r3Content r37'></div>
          <div class='r3Content r38'></div>
        </div>
        <div class='r4'></div>
      </div>
    </div>
  </div>
</template>
<script>
import eos from '@/util/echartsOptions'
import style from '@/json/mapStyle'
import chulixl from '@/json/shehuimd_chulixl'
import qushifx from '@/json/shehuimd_qushifx'
import gequqk from '@/json/shehuimd_gequqk'
import zhishufx from '@/json/shehuimd_zhishufx'
import zhibiaofx from '@/json/shehuimd_zhibiaofx'

export default {
  name: 'App',
  data () {
    return {
      zhishufx: [],
      zhibiaofx: [],
      center: {lng: 0, lat: 0},
      zoom: 3
    }
  },
  methods: {
    print (text) {
      console.log(text)
    },
    // 绘制echarts
    draw (domName, option) {
      let myChart = this.$echarts.init(document.getElementsByClassName(domName)[0])
      myChart.setOption(option)
    },
    handler ({BMap, map}) {
      this.center.lng = 121.474934
      this.center.lat = 31.230371
      this.zoom = 11
      map.setMapStyle({styleJson: style})
      // 开启关系拖拽
      map.enableInertialDragging()
      // 开启鼠标滚动缩放
      map.enableScrollWheelZoom()
    }
  },
  created () {
  },
  mounted () {
    this.zhishufx = zhishufx
    this.zhibiaofx = zhibiaofx
    this.draw('l3Content', eos.setLine(qushifx))
    this.draw('c2Content', eos.setBar(gequqk))
    this.draw('r2Content', eos.setRadar(chulixl))
    for (let index = 1; index <= 4; index++) {
      this.draw(`r3${index}`, eos.setFill(0.2))
    }
  }
}
</script>

<style>
  html,
  body {
    margin: 0px;
    height: 100%;
    min-height: 1080px;
    min-width: 1920px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  html,
  body::-webkit-scrollbar{
    width: 4px;
    background-color: #ffffff;
  }

  html,
  body::-webkit-scrollbar-thumb{
    background:#ebeaee;
    border-radius:4px;
  }

  #App {
    height: 100%;
    background: url('/static/图层 1.png');
  }

  .container {
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

  .rowDirection {
    flex-direction: row;
  }

  .columnDirection {
    flex-direction: column;
  }

  .top {
    width: 100%;
    min-width: 1920px;
    /* height: 113px; */
    height: 99px;
    background: url('/static/头部.png');
  }

  .content {
    height: 100%;
  }

  .left {
    flex: none;
    max-width: 445px;
    min-width: 445px;
  }

  .right {
    flex: none;
    max-width: 445px;
    min-width: 445px;
  }

  .center {
    flex: auto;
    min-width: 1030px;
  }

  .c1 {
    position: relative;
    width: 1003px;
    height: 634px;
    margin: 10px 13px 14px 13px;
  }

  .c11 {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    /* margin: 0 13px 14px 13px; */
  }

  .c12 {
    position: absolute;
    right: 15px;
    bottom: 48px;
    width: 123px;
    height: 302px;
    z-index: 1;
    background: rgba(22,105,238,0.2) url('/static/矢量智能对象.png');
    /* margin: 0 13px 14px 13px; */
  }

  /* 去除百度地图左下角内容 */
  .BMap_cpyCtrl {
    display: none;
  }

  .anchorBL {
    display: none;
  }

  .c2{
    width: 1003px;
    height: 315px;
    margin: 0 13px 17px 13px;
    background: url('/static/各区情况.png');
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

  .l1 .num {
    font-size: 36px;
    color: rgba(255,255,255,1);
    line-height: 36px;
    margin: 66px 0px 41px 28px;
  }

  .l2 {
    width: 431px;
    height: 480px;
    margin: 0 0 14px 14px;
    background: url('/static/形状 31 拷贝.png');
  }

  .l2Content {
    width: 391px;
    height: 430px;
    box-sizing: border-box;
    margin: 30px 20px 20px 20px;
  }

  .l2Content p {
    line-height: 63px;
    color: #ffffff;
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
    margin: 0 15px 12px 0;
    background: url('/static/形状 1553.png');
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
    margin: 50px 10px 0px 15px;
  }

  .r4 {
    width: 431px;
    height: 314px;
    margin: 0 13px 17px 0;
    background: url('/static/重点事件.png');
  }
</style>
