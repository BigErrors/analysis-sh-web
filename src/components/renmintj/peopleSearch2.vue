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
      <!-- <div class="left-bar">
        <p class="title">区域</p>
        <p :class="(key === areaActive)?'area active':'area'" v-for="(overview,key) in areaOverviews" :key="key" v-text="overview.mincgheng+'('+overview.shuzhi+')'"
          @click="selectArea(key,overview)"></p>
      </div> -->
      <div class="mediators_container">
        <div class = "mediators_filter">
          <div class="sortLeft">
            <el-cascader
              class="cascader"
              :options="areaOverview"
              :filterable = true
              placeholder="请输入要选择的区域"
              v-model="areaOverviewDefault"
              @change="areaChange"
            ></el-cascader>
          </div>
          <div class="sortLeft">
            <el-cascader
              class="cascader"
              :options="option"
              :filterable = true
              placeholder="调委会类型"
              v-model="optionDefault"
              @change="optionChange"
            ></el-cascader>
          </div>
          <div class="sortLeft">
            <el-input
              placeholder="请输入人名搜索"
              suffix-icon="el-icon-search"
              v-model="searchName"
               @change="search">
            </el-input>
          </div>
          <div class="sortRight" :class="{activeshang:sortValue === 'wsscore'&&sortType,activexia:sortValue === 'wsscore' &&!sortType}"><span @click="changeSort('wsscore')" style="cursor:pointer">文书质量</span></div>
          <div class="sortRight" :class="{activeshang:sortValue === 'tjsuccessscore'&&sortType,activexia:sortValue ==='tjsuccessscore'&&!sortType}"><span @click="changeSort('tjsuccessscore')" style="cursor:pointer">调解成功率</span></div>
          <div class="sortRight" :class="{activeshang:sortValue === 'tjnumber'&&sortType,activexia:sortValue ==='tjnumber'&&!sortType}"><span @click="changeSort('tjnumber')" style="cursor:pointer">调解数量</span></div>
        </div>
        <div class="mediators-content">
          <!-- <div v-for="row in Math.ceil(mediators.length/5)" :key="'row'+row" :row="row" class="mediators-image">
            <div class="mediator-info" v-for="col in 5" :key="'col'+(row*5+col)" v-if="(row-1)*5+col<=mediators.length" :col="(row-1)*5+(col-1)" @click="changeRouter('peoplePortrait')" style="cursor: pointer;">
              <img v-if="mediators[(row-1)*5+(col-1)].zhaopiandz!==''" :src="'/static/mediatorsImg/'+mediators[(row-1)*5+(col-1)].zhaopiandz"/>
              <img v-if="mediators[(row-1)*5+(col-1)].zhaopiandz===''" :src="(mediators[(row-1)*5+(col-1)].xingbie ==='2')?'/static/mediatorsImg/Male/2 (86).jpg':'/static/mediatorsImg/Female/1 (41).jpg'"/>
              <p v-text="mediators[(row-1)*5+(col-1)].xingming" class="mediator-name"></p>
              <p class="mediator-committee" v-text="mediators[(row-1)*5+(col-1)].tiaojiewyh"></p>
            </div>
          </div> -->
          <div class="mediators_img_container" v-for="(item,index) in mediators" :key="index">
            <img class="media_info_jb" v-if ="index===0 && sortType" src="/static/renmintj/jing.png"/>
            <img class="media_info_jb" v-if ="index===1 && sortType" src="/static/renmintj/yin.png"/>
            <img class="media_info_jb" v-if ="index===2 && sortType" src="/static/renmintj/tong.png"/>
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
// import mediators from '@/../static/json/renmintj/huaxiangfx_renyuanqd'
export default {
  name: 'peopleSearch',
  data () {
    return {
      areaOverview: [
        {
          'label': '全部区域',
          'value': 0
        }, {
          'label': '闵行区',
          'value': '闵行'
        }, {
          'label': '徐汇区',
          'value': '徐汇'
        }, {
          'label': '宝山区',
          'value': '宝山'
        }, {
          'label': '崇明区',
          'value': '崇明'
        }, {
          'label': '浦东区',
          'value': '浦东'
        }, {
          'label': '松江区',
          'value': '松江'
        }, {
          'label': '奉贤区',
          'value': '奉贤'
        }, {
          'label': '嘉定区',
          'value': '嘉定'
        }, {
          'label': '青浦区',
          'value': '青浦'
        }, {
          'label': '杨浦区',
          'value': '杨浦'
        }, {
          'label': '黄浦区',
          'value': '黄浦'
        }, {
          'label': '金山区',
          'value': '金山'
        }, {
          'label': '普陀区',
          'value': '普陀'
        }, {
          'label': '静安区',
          'value': '静安'
        }, {
          'label': '长宁区',
          'value': '长宁'
        }, {
          'label': '虹口区',
          'value': '虹口'
        }
      ],
      mediators: [],
      areaActive: 0,
      pageInfo: {
        currentPage: 1,
        pageSize: 18,
        total: 0
      },
      option: [{
        label: '全部',
        value: '0'
      }, {
        label: '居（社区）调委会',
        value: '居（社区）调委会'
      }, {
        label: '村调委会',
        value: '村调委会'
      }, {
        label: '行业性、专业性调委会',
        value: '4',
        children: [{
          label: '医患纠纷',
          value: '6'
        }, {
          label: '专业事故',
          value: '7'
        }, {
          label: '劳动争议',
          value: '8'
        }, {
          label: '物业纠纷',
          value: '9'
        }, {
          label: '消费纠纷',
          value: '10'
        }, {
          label: '旅游纠纷',
          value: '11'
        }, {
          label: '电子商务',
          value: '12'
        }, {
          label: '社校纠纷',
          value: '13'
        }, {
          label: '知识产权',
          value: '14'
        }]
      }, {
        label: '街道调委会',
        value: '街道调委会'
      }, {
        label: '乡镇调委会',
        value: '乡镇调委会'
      }, {
        label: '企事业单位调委会',
        value: '企事业单位调委会'
      }, {
        label: '其它调委会',
        value: '其它调委会'
      }],
      searchName: '',
      sortValue: 'tjnumber',
      sortType: true,
      areaOverviewDefault: [0],
      optionDefault: ['0']
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
    selectArea: function (key, overview) {
      this.areaActive = key
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
    areaChange (val) {
      this.areaOverviewDefault = val
      this.getData()
    },
    optionChange (val) {
      this.optionDefault = val
      this.getData()
    },
    currentChange (currentPage) {
      this.pageInfo.currentPage = currentPage
      this.getData()
    },
    search () {
      this.pageInfo.currentPage = 1
      this.getData()
    },
    getData () {
      let vue = this
      let reqParam = {
        location: this.areaOverviewDefault[0],
        mediationtype: this.optionDefault[0],
        professiontype: this.optionDefault[1] ? this.optionDefault[1] : '',
        type: this.sortValue,
        keyword: this.searchName,
        pagesize: this.pageInfo.pageSize,
        currentpage: this.pageInfo.currentPage,
        sort: this.sortType ? 1 : 0
      }
      let url = ''
      url = '/peopleMediate/portrayaList'
      http.post(url, reqParam, (data) => {
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
