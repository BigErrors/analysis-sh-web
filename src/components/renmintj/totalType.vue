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
    this.draw('target1', eos.setPie2([{value: 82, name: '民事案件'}, {value: 9, name: '行政案件'}, {value: 4, name: '其他纠纷'}, {value: 4, name: '商事纠纷'}, {value: 1, name: '刑事案件'}]))
    this.draw('target2', eos.setLine4([[{name: 2015, value: 9}, {name: 2016, value: 12}, {name: 2017, value: 15}, {name: 2018, value: 52}]], 'percent'))
    this.draw('target4', eos.setLine4([[{name: 2015, value: 76}, {name: 2016, value: 57}, {name: 2017, value: 58}, {name: 2018, value: 85}], [{name: 2015, value: 13}, {name: 2016, value: 33}, {name: 2017, value: 31}, {name: 2018, value: 3}], [{name: 2015, value: 12}, {name: 2016, value: 11}, {name: 2017, value: 11}, {name: 2018, value: 2}]], 'percent'))
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
