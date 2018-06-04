<template>
  <div id='peopleSearch' class='shade'>
    <div class="totalNum_header">
      <div class="totalNum_back" @click="changeRouter('index4renmintj')" style="cursor: pointer;"></div>
    </div>
    <div class="totalNum_nav">
      <span class="totalNum_nav_span">首页 > 调解员画像分析</span>
    </div>
    <div class="totalNum_nav2">
      <span class="totalNum_nav2_span" @click="changeRouter('peopleNum')">数量分析</span>
      <span class="totalNum_nav2_span" @click="changeRouter('peopleType')">属性分析</span>
      <span class="totalNum_nav2_span active" @click="changeRouter('peopleSearch')">画像分析</span>
    </div>
    <div class="totalNum_content mediators-info">
      <div class="left-bar">
        <p class="title">区域</p>
        <p :class="(key === areaActive)?'area active':'area'" v-for="(overview,key) in areaOverviews" :key="key" v-text="overview.mincgheng+'('+overview.shuzhi+')'"
          @click="selectArea(key,overview)"></p>
      </div>
      <div class="mediators-content">
        <div v-for="row in Math.ceil(mediators.length/5)" :key="'row'+row" :row="row" class="mediators-image">
          <div class="mediator-info" v-for="col in 5" :key="'col'+(row*5+col)" v-if="(row-1)*5+col<=mediators.length" :col="(row-1)*5+(col-1)" @click="changeRouter('peoplePortrait')" style="cursor: pointer;">
            <img v-if="mediators[(row-1)*5+(col-1)].zhaopiandz!==''" :src="'/static/mediatorsImg/'+mediators[(row-1)*5+(col-1)].zhaopiandz"/>
            <img v-if="mediators[(row-1)*5+(col-1)].zhaopiandz===''" :src="(mediators[(row-1)*5+(col-1)].xingbie ==='2')?'/static/mediatorsImg/Male/2 (86).jpg':'/static/mediatorsImg/Female/1 (41).jpg'"/>
            <p v-text="mediators[(row-1)*5+(col-1)].xingming" class="mediator-name"></p>
            <p class="mediator-committee" v-text="mediators[(row-1)*5+(col-1)].tiaojiewyh"></p>
          </div>
        </div>
      </div>
      <el-pagination :current-page.sync="currentPage" :page-size="15" layout="total, prev, pager, next" :total="89" class="ej-pagination">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import areaOverviews from '@/../static/json/renmintj/huaxiangfx_quyu'
import mediators from '@/../static/json/renmintj/huaxiangfx_renyuanqd'
export default {
  name: 'peopleSearch',
  data () {
    return {
      areaOverviews: [],
      mediators: [],
      areaActive: 0,
      currentPage: 1
    }
  },
  methods: {
    // 绘制echarts
    draw (domName, option) {
      let myChart = this.$echarts.init(document.getElementsByClassName(domName)[0])
      myChart.setOption(option)
    },
    changeRouter (name) {
      this.$router.push({
        name: name
      })
    },
    selectArea: function (key, overview) {
      this.areaActive = key
    }
  },
  created () {
    this.areaOverviews = areaOverviews
    this.mediators = mediators
  },
  mounted () {}
}

</script>

<style scoped>
  .mediators-content {
    margin-left: 281px;
    height: 675px;
    width: calc(100% - 366px);
    padding: 25px 0px 0px 85px;
  }
.ej-pagination{
      text-align: center;
    margin-top: 15px;
}
  .mediators-image:not(:first-child) {
    margin-top: 40px;
  }

  .mediator-info {
    width: 138px;
    height: 137px;
    display: inline-block;
    background-image: url(/static/renmintjOther/pic_circle.png);
    text-align: center;
  }

  .mediator-name {
    font-size: 20px;
    color: rgba(255, 255, 255, 1);
    padding-top: 30px;
  }

  .mediator-committee {
    font-size: 14px;
    color: #686C80;
  }

  .mediator-info img {
    width: 90px;
    height: 91px;
    margin-top: 23px;
    border-radius: 50%;
  }

  .mediator-info:not(:nth-child(5n+1)) {
    margin-left: 150px;
  }

  .mediator-info::nth-child(5n+1) {
    display: inherit;
  }

  .left-bar {
    width: 281px;
    background-color: #0E1B4A;
    float: left;
    height: 700px;
  }

  .mediators-info p {
    text-align: center;
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
  }

  .left-bar .title {
    height: 58px;
    line-height: 58px;
    color: rgba(94, 126, 203, 1);
    background: rgba(16, 30, 81, 1);
  }

  .left-bar .area {
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    color: rgba(77, 132, 254, 1);
  }

  .left-bar .active {
    background: rgba(21, 123, 211, 1);
    color: rgba(255, 255, 255, 1);
  }

  #peopleSearch {
    min-height: 1080px;
    min-width: 1920px;
    overflow-y: auto;
  }

  .shade {
    background-color: #0b1740;
  }

  .totalNum_header {
    width: 100%;
    min-width: 1920px;
    height: 87px;
    background: url('/static/renmintj/pic_title.png');
    background-repeat: no-repeat;
    background-position: center;
    z-index: 99;
    position: relative;
  }

  .totalNum_back {
    background: url('/static/renmintj/btn_back.png');
    position: absolute;
    left: 22px;
    width: 137px;
    height: 35px;
    background-position: center;
    top: 28px;
    cursor: pointer;
  }

  .totalNum_nav {
    height: 24px;
    margin: 6px 0 20px 0;
    padding-left: 34px;
    width: 100%;
    box-sizing: border-box;
  }

  .totalNum_nav_span {
    font-size: 18px;
    font-family: HiraginoSansGB-W3;
    color: rgba(94, 126, 203, 1);
  }

  .totalNum_nav2 {
    margin-left: 34px;
    border-bottom: 1px solid rgba(15, 59, 186, 1);
    display: inline-block;
  }

  .totalNum_nav2_span {
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    padding-bottom: 10px;
    display: inline-block;
    width: 5em;
    text-align: center;
    cursor: pointer;
    color: rgba(94, 126, 203, 1);
  }

  .totalNum_nav2 .active {
    color: rgba(255, 198, 0, 1);
    border-bottom: 3px solid rgba(255, 198, 0, 1);
  }

  .totalNum_content {
    width: 100%;
    height: 903px;
    box-sizing: border-box;
    padding: 13px 24px 24px 24px;
  }

</style>
