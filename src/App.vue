<template>
  <div id='App' class='container columnDirection'>
    <div class='item top'></div>
    <div class='item container rowDirection content'>
      <div class='item left container columnDirection'>
        <div class='l1'>l1</div>
        <div class='l2'>l2</div>
        <div class='l3'>l3</div>
      </div>
      <div class='item center' id='center'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class='item right container columnDirection'>
        <div class='r1'>r1</div>
        <div class='r2'>r2</div>
        <div class='r3'>r3</div>
        <div class='r4'>r4</div>
      </div>
    </div>
  </div>
</template>

<script>
import eos from '@/util/echartsOptions'
export default {
  name: 'App',
  data () {
    return {}
  },
  methods: {
    // 绘制echarts
    draw (domID, option) {
      let myChart = this.$echarts.init(document.getElementById(domID))
      myChart.setOption(option)
    }
  },
  created () {
  },
  mounted () {
    this.draw('center', eos.setPie(['#a0a0a0', '#565656'], [{value: 0.45}, {value: 0.55}]))
  }
}
</script>

<style>
  html,
  body {
    margin: 0px;
    height: 100%;
  }

  #App {
    height: 100%;
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
    height: 89px;
    background: rgba(22, 105, 238, 1);
    opacity: 0.2;
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

  .l1 {
    width: 431px;
    height: 138px;
    margin: 0 7px;
    background: rgba(22, 105, 238, 1);
  }

  .l2 {
    width: 431px;
    height: 480px;
    margin: 0 7px;
    background: rgba(22, 105, 238, 1);
  }

  .l3 {
    width: 431px;
    height: 314px;
    margin: 0 7px;
    background: rgba(22, 105, 238, 1);
  }

  .r1 {
    width: 431px;
    height: 112px;
    margin: 0 7px;
    background: rgba(22, 105, 238, 1);
  }

  .r2 {
    width: 431px;
    height: 230px;
    margin: 0 7px;
    background: rgba(22, 105, 238, 1);
  }

  .r3 {
    width: 431px;
    height: 292px;
    margin: 0 7px;
    background: rgba(22, 105, 238, 1);
  }

  .r4 {
    width: 431px;
    height: 314px;
    margin: 0 7px;
    background: rgba(22, 105, 238, 1);
  }

</style>
