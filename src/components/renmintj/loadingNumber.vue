<template>
  <div class="loadingNumber_container">
     <div class="head clearfix">
      <div class="title">智慧调解大数据平台</div>
      <div class="left">
        <div class="back" @click="changeRouter('index4renmintj')"></div>
      </div>
      <div class="right">
        <time-clock></time-clock>
      </div>
    </div>
    <div class="body">
      <sidenav></sidenav>
      <div class="nav">
        <span>首页 > 登录人次</span>
      </div>
      <div class="nav2 clearfix">
        <div class="navLeft">
          <span class="navspan">登录人次和热度统计</span>
        </div>
        <div class="navRight">
          <div class="date_container">
            <el-date-picker
              v-model="date"
              type="week"
              format="yyyy 第 WW 周"
              :pickerOptions="pickerOptions">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="content_container">
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/util/httpUtil'
import urlConfig from '@/util/urlConfig'
import jsonUtil from '@/util/jsonUtil'
import eos from '@/util/echartsOptions'

export default {
  data () {
    return {
      date: jsonUtil.findWeekRangeByToday(new Date(), 1),
      pickerOptions: jsonUtil.pickerDisabledDate,
      myChart: {}
    }
  },
  computed: {},
  watch: {
    date (newValue, oldValue) {
      this.getData()
    }
  },
  methods: {
    draw (domName, option) {
      if (!this.myChart[domName]) {
        this.myChart[domName] = this.$echarts.init(document.getElementsByClassName(domName)[0])
      }
      this.myChart[domName].setOption(option)
    },
    getData () {
      let _this = this
      let baseUrl = urlConfig.baseUrl
      let url = '/peopleHotCount'
      let monday = jsonUtil.dateFormat(jsonUtil.findWeekRangeByToday(_this.date, 1), 'yyyy-MM-dd')
      let friday = jsonUtil.dateFormat(jsonUtil.findWeekRangeByToday(_this.date, 7), 'yyyy-MM-dd')
      let param = { startdate: monday, enddate: friday }
      http.get(baseUrl + url, param, (data) => {
        _this.$nextTick(() => {
          let dataRange = `${jsonUtil.dateFormat(monday, 'yyyy年MM月dd日')}—${jsonUtil.dateFormat(friday, 'yyyy年MM月dd日')}`
          _this.draw('content_container', eos.setBar5(dataRange, data))
        })
      })
    },
    changeRouter (name) {
      this.$router.push({name: name})
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    let vue = this
    window.addEventListener('resize', function () {
      vue.$nextTick(function () {
        vue.myChart['content_container'].resize()
      })
    })
  }
}
</script>

<style lang="less" scoped>
@blockBack:#171c26;
@table:#131821;
@fontWhite:#f1f1f1;
@fontGray:rgba(241,241,241,0.8);
@fontSamll:14px;
@fontBig:20px;
.loadingNumber_container{
  background: #0B131C;
  position: absolute;
  width: 100%;
  height: 100%;
  min-width:1366px;
  min-height: 766px;
  .head{
    display: block;
    background: url('/static/renmintjNew/headback.png') no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    position: relative;
    box-sizing: border-box;
    margin:0 28px;
    border-top:14px solid rgba(0,0,0,0);
    .title{
      position: absolute;
      top: 17px;
      font-size:@fontBig;
      font-family:RTWSYueGoTrial-Regular;
      color:rgba(254,254,254,1);
      left: 50%;
      transform: translate(-50%)
    }
    .left{
      padding:25px 0 10px 0px;
      float: left;
      .back{
        background: url('/static/renmintj/btn_back.png');
        width: 100px;
        height: 48px;
        background-position: center;
        background-repeat: no-repeat;
        &:hover{
          cursor: pointer;
          background: url('/static/renmintj/btn_backHover.png');
          background-position: center;
          background-repeat: no-repeat;
        }
      }
    }
    .right{
      float: right;
      padding:30px 0 0 0;
      span{
        font-size:12px;
        font-family:HiraginoSansGB-W3;
        color:@fontGray;
      }
    }
  }
  .body{
    height: calc(100% - 112px);
    width: 100%;
    display: block;
    position: relative;
    .nav{
      height: 24px;
      margin: 0px 0 20px 0;
      padding-left: 34px;
      padding-top:6px;
      width: 100%;
      box-sizing: border-box;
      line-height: 24px;
      span{
        font-size: @fontSamll;
        font-family: HiraginoSansGB-W3;
        color:@fontGray;
      }
    }
    .nav2{
      display: block;
      padding: 0 34px;
      box-sizing: border-box;
      .navLeft{
        float: left;
        // border-bottom:1px solid @fontGray;
        .navspan{
          font-size:14px;
          font-family:HiraginoSansGB-W3;
          color:@fontWhite;
          display: inline-block;
          padding:0 2px 4px 2px;
          width: 10em;
          text-align: center;
          cursor: pointer;
          position: relative;
        }
      }
      .navRight{
        float: right;
        .date_container{
          float: right;
          margin-right: 15px;
        }
      }
    }
    .content_container{
      height: calc(100% - 89px);
      width: calc(100% - 68px);
      display: block;
      box-sizing: border-box;
      margin: 10px 34px;
      padding: 10px 0;
      background: #171C26;
    }
  }
}
</style>
