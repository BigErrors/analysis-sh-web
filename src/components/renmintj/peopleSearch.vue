<template>
<div id='peopleSearch' class='shade'>
  <div class="totalNum_header">
    <div class="totalNum_back"  @click="changeRouter('index4renmintj')" style="cursor: pointer;"></div>
  </div>
  <div class="totalNum_nav">
    <span class="totalNum_nav_span">首页 > 调解案件</span>
  </div>
  <div class="totalNum_nav2">
    <span class="totalNum_nav2_span"  @click="changeRouter('peopleNum')">数量分析</span>
    <span class="totalNum_nav2_span"  @click="changeRouter('peopleType')">属性分析</span>
    <span class="totalNum_nav2_span active"  @click="changeRouter('peopleSearch')">画像分析</span>
  </div>
  <div class="totalNum_content">

  </div>
</div>
</template>

<script>
import eos from '@/util/echartsOptions'
export default {
  name: 'peopleSearch',
  data () {
    return {}
  },
  methods: {
    // 绘制echarts
    draw (domName, option) {
      let myChart = this.$echarts.init(document.getElementsByClassName(domName)[0])
      myChart.setOption(option)
    },
    changeRouter (name) {
      this.$router.push({name: name})
    }
  },
  created () {},
  mounted () {
    this.draw('target1', eos.setLine4([[{name: '2015', value: 9}, {name: '2016', value: 12}, {name: '2017', value: 15}, {name: '2018', value: 52}]], 'percent'))
    this.draw('target2', eos.setLine4([[{name: '2015', value: 9}, {name: '2016', value: 12}, {name: '2017', value: 15}, {name: '2018', value: 52}]], 'percent'))
    this.draw('target3', eos.setBar3([{ value: 131, name: '虹口' }, { value: 175, name: '长宁' }, { value: 209, name: '静安' }, { value: 232, name: '普陀' }, { value: 234, name: '金山' }, { value: 252, name: '黄埔' }, { value: 279, name: '杨浦' }, { value: 321, name: '青浦' }, { value: 325, name: '嘉定' }, { value: 351, name: '奉贤' }, { value: 364, name: '松江' }, { value: 375, name: '浦东' }, { value: 423, name: '崇明' }, { value: 447, name: '宝山' }, { value: 496, name: '徐汇' }, { value: 631, name: '闵行' }], ['#4D84FE', '#B3CAFF'], 'horizon', 'integer'))
    this.draw('target4', eos.setBar3([{ value: 27, name: '虹口' }, { value: 27, name: '长宁' }, { value: 17, name: '静安' }, { value: 22, name: '普陀' }, { value: 14, name: '金山' }, { value: 16, name: '黄埔' }, { value: 19, name: '杨浦' }, { value: 27, name: '青浦' }, { value: 24, name: '嘉定' }, { value: 29, name: '奉贤' }, { value: 21, name: '松江' }, { value: 8, name: '浦东' }, { value: 17, name: '崇明' }, { value: 30, name: '宝山' }, { value: 24, name: '徐汇' }, { value: 23, name: '闵行' }], ['#FF9C00', '#F8E228'], 'horizon', 'integer'))
  }
}
</script>

<style scoped>
  #peopleSearch {
    min-height: 1080px;
    min-width: 1920px;
    overflow-y: auto;
  }
  .shade {
    background-color: #0b1740;
  }
  .totalNum_header{
    width: 100%;
    min-width: 1920px;
    height: 87px;
    background: url('/static/renmintj/pic_title.png');
    background-repeat:no-repeat;
    background-position:center;
    z-index: 99;
    position:relative;
  }
  .totalNum_back{
    background:url('/static/renmintj/btn_back.png');
    position:absolute;
    left:22px;
    width:137px;
    height: 35px;
    background-position: center;
    top: 28px;
    cursor:pointer;
  }
  .totalNum_nav{
    height: 24px;
    margin:6px 0 20px 0;
    padding-left: 34px;
    width: 100%;
    box-sizing: border-box;
  }
  .totalNum_nav_span{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(94,126,203,1);
  }
  .totalNum_nav2{
    margin-left: 34px;
    border-bottom: 1px solid rgba(15,59,186,1);
    display: inline-block;
  }
  .totalNum_nav2_span{
    font-size:20px;
    font-family:HiraginoSansGB-W3;
    padding-bottom: 10px;
    display: inline-block;
    width: 5em;
    text-align: center;
    cursor:pointer;
    color:rgba(94,126,203,1);
  }
  .active{
    color:rgba(255,198,0,1);
    border-bottom: 3px solid rgba(255,198,0,1);
  }
  .totalNum_content{
    width: 100%;
    height: 903px;
    box-sizing: border-box;
    padding: 13px 24px 24px 24px;
  }

</style>
