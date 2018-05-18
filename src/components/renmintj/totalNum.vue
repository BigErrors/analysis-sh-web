<template>
<div id='peopleNum' class='shade'>
  <div class='zIndex3 area1 target1'></div>
  <div class='zIndex3 area1 target2'></div>
  <div class='zIndex3 area2 target3'></div>
  <div class='zIndex3 area2 target4'></div>
</div>
</template>

<script>
import eos from '@/util/echartsOptions'
export default {
  name: 'peopleNum',
  data () {
    return {}
  },
  methods: {
    // 绘制echarts
    draw (domName, option) {
      let myChart = this.$echarts.init(document.getElementsByClassName(domName)[0])
      myChart.setOption(option)
    }
  },
  created () {},
  mounted () {
    this.draw('target1', eos.setLine3([{month: '2017-10', num: 199}, {month: '2017-11', num: 194}, {month: '2017-12', num: 165}, {month: '2018-01', num: 78}, {month: '2018-02', num: 104}, {month: '2018-03', num: 7}]))
    this.draw('target2', eos.setBar3([{value: 0, name: '松江'}, {value: 0, name: '浦东'}, {value: 1, name: '普陀'}, {value: 3, name: '奉贤'}, {value: 6, name: '虹口'}, {value: 6, name: '长宁'}, {value: 6, name: '崇明'}, {value: 6, name: '金山'}, {value: 7, name: '嘉定'}, {value: 14, name: '闵行'}, {value: 16, name: '宝山'}, {value: 16, name: '黄浦'}, {value: 18, name: '青浦'}, {value: 26, name: '徐汇'}, {value: 27, name: '静安'}, {value: 37, name: '杨浦'}], ['#4D84FE', '#B3CAFF'], 'horizon', 'integer'))
    this.draw('target4', eos.setBar3([{value: 57, name: '2015年'}, {value: 2847, name: '2016年'}, {value: 2504, name: '2017年'}, {value: 189, name: '2018年'}], ['#FF9C00', '#F8E228'], 'vertical', 'integer', '标题', '更新时间', 25))
  }
}
</script>

<style scope>
  #peopleNum {
    min-height: 1080px;
    min-width: 1920px;
    overflow-y: auto;
  }
  .shade {
    background-color: #0b1740;
  }

  .zIndex3 {
    z-index: 3;
  }

  .area1 {
    float: left;
    width: 929px;
    height: 558px;
  }

  .area2 {
    float: left;
    width: 929px;
    height: 304px;
  }
</style>
