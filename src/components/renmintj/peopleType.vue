<template>
<div id='peopleNum' class='shade'>
  <div class='zIndex3 area target1'></div>
  <div class='zIndex3 area target2'></div>
  <div class='zIndex3 area target3'></div>
  <div class='zIndex3 area target4'></div>
  <div class='zIndex3 area target5'></div>
  <div class='zIndex3 area target6'></div>
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
    this.draw('target1', eos.setPie3([{name: '硕士及以上', value: 2246}, {name: '本科', value: 2873}, {name: '大专', value: 3201}, {name: '高中或中专', value: 3013}, {name: '初中及以下', value: 4017}, {name: '未知', value: 5245}]))
    this.draw('target2', eos.setBar3([{value: 57, name: '闵行'}, {value: 2847, name: '徐汇'}, {value: 2504, name: '宝山'}, {value: 189, name: '崇明'}], ['#FF9C00', '#F8E228'], 'vertical', 'integer', 25))
    this.draw('target3', eos.setLine4([[{name: '20-29', value: 407}, {name: '30-39', value: 2454}, {name: '40-49', value: 2572}, {name: '50-59', value: 1813}, {name: '60-69', value: 905}, {name: '70以上', value: 250}], [{name: '20-29', value: 516}, {name: '30-39', value: 1906}, {name: '40-49', value: 1688}, {name: '50-59', value: 2304}, {name: '60-69', value: 1425}, {name: '70以上', value: 385}]], 'integer', ['男性', '女性']))
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

  .area {
    float: left;
    width: 617px;
    height: 435px
  }
</style>
