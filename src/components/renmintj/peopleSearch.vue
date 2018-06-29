<template>
  <div id='peopleSearch' class='shade'>
    <div class="peopleSearch_header">
      <div class="peopleSearch_back" @click="changeRouter('index4renmintj')"></div>
    </div>
    <div class="peopleSearch_nav">
      <span class="peopleSearch_nav_span">首页 > 调解员画像分析</span>
    </div>
    <div class="peopleSearch_nav2">
      <span class="peopleSearch_nav2_span" @click="changeRouter('peopleNum')">数量分析</span>
      <span class="peopleSearch_nav2_span" @click="changeRouter('peopleType')">属性分析</span>
      <span class="peopleSearch_nav2_span active" @click="changeRouter('peopleSearch')">排名分析</span>
    </div>
    <div class="peopleSearch_content mediators-info">
      <div class="mediators_container">
        <div class = "mediators_filter">
          <div class="sortLeft">
            <el-cascader
              class="cascader"
              :options="area"
              :filterable = true
              placeholder="请输入要选择的区域"
              v-model="areaDefault"
            ></el-cascader>
          </div>
          <div class="sortLeft">
            <el-cascader
              class="cascader"
              :options="option"
              :filterable = true
              placeholder="调委会类型"
              v-model="optionDefault"
            ></el-cascader>
          </div>
          <div class="sortLeft">
            <el-input
              placeholder="请输入人名搜索"
              suffix-icon="el-icon-search"
              v-model="searchName">
            </el-input>
          </div>
          <div class="sortRight" :class="{activeshang:sortValue === 'wsscore'&&sortType,activexia:sortValue === 'wsscore' &&!sortType}"><span @click="changeSort('wsscore')" style="cursor:pointer">文书质量</span></div>
          <div class="sortRight" :class="{activeshang:sortValue === 'tjsuccessscore'&&sortType,activexia:sortValue ==='tjsuccessscore'&&!sortType}"><span @click="changeSort('tjsuccessscore')" style="cursor:pointer">调解成功率</span></div>
          <div class="sortRight" :class="{activeshang:sortValue === 'tjnumber'&&sortType,activexia:sortValue ==='tjnumber'&&!sortType}"><span @click="changeSort('tjnumber')" style="cursor:pointer">调解数量</span></div>
        </div>
        <div class="mediators-content">
          <div class="mediators_img_container" v-for="(item,index) in mediators" :key="index">
            <img class="media_info_jb" v-if ="index===0 && sortType && pageInfo.currentPage===1" src="/static/renmintj/jing.png"/>
            <img class="media_info_jb" v-if ="index===1 && sortType && pageInfo.currentPage===1" src="/static/renmintj/yin.png"/>
            <img class="media_info_jb" v-if ="index===2 && sortType && pageInfo.currentPage===1" src="/static/renmintj/tong.png"/>
            <img @click="changeRouter('peoplePortrait', item.id)" class="media_info_img" v-if="item.gender==='男'||item.gender==='0'" src="/static/renmintj/boy.png" onerror="src='/static/renmintj/boy.png'"/>
            <img @click="changeRouter('peoplePortrait', item.id)" class="media_info_img" v-if="item.gender==='女'" src="/static/renmintj/girl.png" onerror="src='/static/renmintj/girl.png'"/>
            <p class="mediator-name" v-text="item.name" ></p>
            <p class="mediator-committee" v-text="item.shortname"></p>
          </div>
        </div>
        <el-pagination  @current-change="currentChange" :current-page.sync="pageInfo.currentPage" :page-size="pageInfo.pageSize" layout="total, prev, pager, next" :total="pageInfo.total" class="ej-pagination">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/util/httpUtil'
import json from '@/util/dictionaryMapping'

export default {
  name: 'peopleSearch',
  data () {
    return {
      mediators: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 18,
        total: 0
      },
      area: json.area,
      areaDefault: ['SHJCK01000'],
      option: json.tiaoWeiHLX,
      optionDefault: [0],
      searchName: '',
      sortValue: 'tjnumber',
      sortType: true
    }
  },
  watch: {
    areaDefault: function (newValue, oldValue) {
      this.getData()
    },
    optionDefault: function (newValue, oldValue) {
      this.getData()
    },
    searchName: function (newValue, oldValue) {
      this.pageInfo.currentPage = 1
      this.getData()
    }
  },
  methods: {
    // 绘制echarts
    draw (domName, option) {
      let myChart = this.$echarts.init(document.getElementsByClassName(domName)[0])
      myChart.setOption(option)
    },
    changeRouter (name, id) {
      let target = {name: name}
      if (name === 'peoplePortrait') {
        target = {name: name, params: { id: id }}
      }
      this.$router.push(target)
    },
    changeSort: function (val) {
      if (this.sortValue === val) {
        this.sortType = !this.sortType
      } else {
        this.sortValue = val
        this.sortType = true
      }
      this.getData()
    },
    currentChange (currentPage) {
      this.pageInfo.currentPage = currentPage
      this.getData()
    },
    getData () {
      let vue = this
      let reqParam = {
        location: this.areaDefault[0],
        mediationtype: this.optionDefault[0],
        professiontype: this.optionDefault[1] ? this.optionDefault[1] : '',
        type: this.sortValue,
        keyword: this.searchName,
        pagesize: this.pageInfo.pageSize,
        currentpage: this.pageInfo.currentPage,
        sort: this.sortType ? 1 : 0
      }
      let baseUrl = ''
      let url = ''
      url = '/peopleMediate/portrayaList'
      http.post(baseUrl + url, reqParam, (data) => {
        vue.mediators = data.pageData
        vue.pageInfo.total = data.pageinfo.total
      }, 'application/json')
    }
  },
  created () {
    this.getData()
  },
  mounted () {}
}

</script>

<style scoped>
  .shade {
    background: url('/static/renmintj/pic_bg.png');
    background-repeat:no-repeat;
    background-position:center;
  }
  .mediators_container{
    width: calc(100%);
    float: left;
  }
  .mediators_container::after{
    content:'';
    display:block;
    width: 0;
    height: 0;
    clear: both;
  }
  .mediators_filter{
     width: calc(100%);
     float: left;
     height: 42px;
     padding-right: 35px;
     margin-top:25px;
     box-sizing: border-box;
  }
  .mediators-content {
    float: left;
    max-height: 711px;
    width: calc(100%);
    padding: 45px 0px 0px 40px;
    box-sizing: border-box;
  }
  .mediators-content::after{
    content:'';
    display:block;
    width: 0;
    height: 0;
    clear: both;
  }
  .sortLeft{
    float: left;
    margin-right: 35px;
    border:1px solid #7B95F6;
    border-radius:2px
  }
  .sortRight{
    font-size:16px;
    font-family:HiraginoSansGB-W3;
    color:rgba(94,126,203,1);
    height: 42px;
    float: right;
    margin-left: 64px;
    line-height: 42px;
  }
  .activeshang{
    padding-right: 35px;
    color:#FFDA00;
    background: url('/static/renmintj/icon_shang.png');
    background-repeat: no-repeat;
    background-position:right center;
  }
  .activexia{
    padding-right: 35px;
    color:#FFDA00;
    background: url('/static/renmintj/icon_xia.png');
    background-repeat: no-repeat;
    background-position:right center;
  }
  .mediators_img_container{
    width: 138px;
    height: 182px;
    background-image: url(/static/renmintjOther/pic_circle.png);
    background-repeat:no-repeat;
    text-align: center;
    float: left;
    margin-left:182px;
    margin-bottom:40px;
    position: relative;
  }
  .mediators_img_container:nth-of-type(6n+1){
    margin-left:0
  }
  .media_info_img{
    width: 90px;
    height: 91px;
    margin-top: 23px;
    border-radius: 50%;
  }
  .media_info_jb{
    position: absolute;
    right: 0;
    top:100px;
  }
.ej-pagination{
    margin:auto;
    text-align: center;
    margin-top: 15px;
    float: left;
    width: 100%;
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
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
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

  .peopleSearch_header {
    width: 100%;
    min-width: 1920px;
    height: 87px;
    background: url('/static/renmintj/pic_title.png');
    background-repeat: no-repeat;
    background-position: center;
    z-index: 99;
    position: relative;
  }

  .peopleSearch_back {
    background: url('/static/renmintj/btn_back.png');
    position: absolute;
    left: 22px;
    width: 137px;
    height: 35px;
    background-position: center;
    top: 28px;
    cursor: pointer;
  }

  .peopleSearch_nav {
    height: 24px;
    margin: 6px 0 20px 0;
    padding-left: 34px;
    width: 100%;
    box-sizing: border-box;
  }

  .peopleSearch_nav_span {
    font-size: 18px;
    font-family: HiraginoSansGB-W3;
    color: rgba(94, 126, 203, 1);
  }

  .peopleSearch_nav2 {
    margin-left: 34px;
    border-bottom: 1px solid rgba(15, 59, 186, 1);
    display: inline-block;
  }

  .peopleSearch_nav2_span {
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    padding-bottom: 10px;
    display: inline-block;
    width: 5em;
    text-align: center;
    cursor: pointer;
    color: rgba(94, 126, 203, 1);
  }

  .peopleSearch_nav2 .active {
    color: rgba(255, 198, 0, 1);
    border-bottom: 3px solid rgba(255, 198, 0, 1);
  }

  .peopleSearch_content {
    width: 100%;
    height: 903px;
    box-sizing: border-box;
    padding: 13px 24px 24px 24px;
  }

</style>
