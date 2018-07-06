<template>
  <div class='importantEvent_container'>
    <div class="head clearfix">
      <div class="title">基层司法大数据子平台</div>
      <div class="left">
        <div class="back" @click="changeRouter('index4renmintj')"></div>
      </div>
      <div class="right">
        <span>{{timeCom}}</span>
      </div>
    </div>
    <div class="body">
      <div class="nav">
        <span>首页 > 重点事件</span>
      </div>
      <div class="left">
        <div class="area clearfix">
          <div class="statistics statistics1">
            <div class="roll">
              <digitalRolling class="num" :height='41' :width='25' :number='benYueXZ' :fontSize='41' :fontColor='"#1194F8"'></digitalRolling>
            </div>
            <div class="title">本月新增</div>
          </div>
          <div class="cutLine"></div>
          <div class="statistics statistics2">
            <div class="roll">
              <digitalRolling class="num" :height='41' :width='25' :number='jinNianZS' :fontSize='41' :fontColor='"#1194F8"'></digitalRolling>
            </div>
            <div class="title">全年累计</div>
          </div>
        </div>
        <div class="area">
          <div class="title">
            <div class="border"></div>
            <span>重点事件变化趋势</span>
          </div>
          <div class="target2"></div>
        </div>
        <div class="area">
          <div class="title">
            <div class="border"></div>
            <span>各区重点事件(TOP10)</span>
          </div>
          <div class="target3"></div>
        </div>
      </div>
      <div class="right">
        <div class="area">
          <div class="title">
            <div class="border"></div>
            <span>重点事件类型</span>
          </div>
          <div class="target4"></div>
        </div>
        <div class="area">
          <div class="title">
            <div class="border"></div>
            <span>重点事件来源</span>
          </div>
          <div class="target5"></div>
        </div>
        <div class="area">
          <div class="title">
            <div class="border"></div>
            <span>重点事件</span>
          </div>
          <table class='table' cellspacing='0'>
            <thead class="thead">
            <tr>
              <td width="10%" class='td'>序号</td>
              <td width="15%" class='td'>分类</td>
              <td width="15%" class='td'>行政区</td>
              <td width="15%" class='td'>日期</td>
              <td width="15%" class='td'>描述</td>
              <td width="15%" class='td'>状态</td>
              <td width="15%" class='td'>操作</td>
            </tr>
            </thead>
            <tbody class="tbody">
            <tr v-for="(item,index) in table.currentList" :key="index" v-if="index<=9">
              <td class='td'>
                <span v-if="item.xuHao<=2" class="circle" :class="'circle'+(item.xuHao)">{{item.xuHao}}</span>
                <span v-if="item.xuHao>2" class="circle" :class="'circle4'">{{item.xuHao}}</span>
              </td>
              <td class='td'>{{item.shiJianLX}}</td>
              <td class='td'>{{item.diQu}}</td>
              <td class='td'>{{item.riQi}}</td>
              <td class='td'>{{item.jianShu}}</td>
              <td class='td'>{{item.zhuangTai}}</td>
              <td class='td'><span class="detail" @click="changeRouter('importantEventDetail',item.id)">详情</span></td>
            </tr>
            </tbody>
          </table>
          <div class="page">
            <el-pagination class="ej-pagination" @current-change="handleCurrentChange" :current-page.sync="table.currentPage" :page-size="10"
              layout="prev, pager, next, total" :total="table.total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eos from '@/util/echartsOptions'
import http from '@/util/httpUtil'
import urlConfig from '@/util/urlConfig'
import digitalRolling from '../digitalRolling.vue'
export default {
  name: 'importantEvent',
  components: {
    digitalRolling
  },
  data () {
    return {
      myChart: {},
      table: {
        dLength: 0,
        lineNum: 0,
        list: [],
        currentList: [],
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      benYueXZ: 0,
      jinNianZS: 0,
      time: new Date()
    }
  },
  computed: {
    timeCom () {
      let now = this.time
      let day = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'][now.getDay()]
      let minute = (now.getMinutes() >= 10) ? (now.getMinutes().toString()) : ('0' + now.getMinutes().toString())
      return now.getFullYear().toString() + '/' + (now.getMonth() + 1).toString() + '/' + now.getDate().toString() + ' ' + now.getHours().toString() + ':' + minute + ' ' + day
    }
  },
  methods: {
    // 绘制echarts
    draw (domName, option) {
      if (this.myChart[domName]) {
        this.$echarts.dispose(this.myChart[domName])
      }
      this.myChart[domName] = this.$echarts.init(document.getElementsByClassName(domName)[0])
      this.myChart[domName].setOption(option)
    },
    // 路由跳转
    changeRouter (name, id) {
      let target = {name: name}
      if (name === 'importantEventDetail') {
        target = {name: name, params: { id: id }}
      }
      this.$router.push(target)
    },
    getData () {
      let vue = this
      let reqParam = {}
      let baseUrl = urlConfig.baseUrl
      let url = ''
      url = '/keyEventsAnalysis'
      http.get(baseUrl + url, reqParam, (data) => {
        vue.table.list = data.zhongDianSJ
        vue.table.currentList = vue.table.list.slice(0, 10)
        vue.table.total = vue.table.list.length
        vue.benYueXZ = data['shuZhiTJ']['benYueXZ']
        vue.jinNianZS = data['shuZhiTJ']['jinNianZS']
        vue.$nextTick(function () {
          vue.draw('target2', eos.setBar4(data['zhongDianSJBHQS']))
          vue.draw('target3', eos.setBar3(data['geQuZDSJ'].reverse(), ['#4D84FE', '#B3CAFF'], 'horizon', 'integer', 11))
          vue.draw('target4', eos.setPie6(data['zhongDianSJLX'], 'integer', true))
          vue.draw('target5', eos.setPie6(data['zhongDianSJLY'], 'integer'))
        })
      })
    },
    handleCurrentChange (val) {
      let startIndex = (val - 1) * this.table.pageSize
      let endIndex = val * this.table.pageSize
      // console.log('currenrPage:', val)
      // console.log('startIndex-endIndex:', startIndex + '-' + endIndex)
      this.table.currentList = this.table.list.slice(startIndex, endIndex)
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    let vue = this
    window.addEventListener('resize', function () {
      vue.$nextTick(function () {
        vue.myChart['target2'].resize()
        vue.myChart['target3'].resize()
        vue.myChart['target4'].resize()
        vue.myChart['target5'].resize()
      })
    })
  },
  beforeDestroy () {}
}
</script>

<style lang="less" scoped>
  .importantEvent_container {
    background: #171415;
    position: absolute;
    width: 100%;
    height: 100%;
    min-width: 1366px;
    min-height: 766px;
    .head {
      display: block;
      background: url('/static/renmintjNew/headback.png') no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      position: relative;
      box-sizing: border-box;
      margin: 0 28px;
      border-top: 14px solid rgba(0, 0, 0, 0);
      .title {
        position: absolute;
        top: 17px;
        font-size: 20px;
        font-family: RTWSYueGoTrial-Regular;
        color: rgba(254, 254, 254, 1);
        left: 50%;
        transform: translate(-50%)
      }
      .left {
        padding: 25px 0 10px 0px;
        float: left;
        .back {
          background: url('/static/renmintj/btn_back.png');
          width: 137px;
          height: 35px;
          background-position: center;
          background-repeat: no-repeat;
          cursor: pointer;
        }
      }
      .right {
        float: right;
        padding: 30px 0 0 0;
        span {
          font-size: 12px;
          font-family: HiraginoSansGB-W3;
          color: rgba(237, 237, 237, 1);
        }
      }
    }
    .body {
      height: calc(100% - 84px);
      width: 100%;
      display: block;
      position: relative;
      .nav {
        height: 24px;
        margin: 0px 0 20px 0;
        padding-left: 34px;
        padding-top: 6px;
        width: 100%;
        box-sizing: border-box;
        line-height: 24px;
        span {
          font-size: 12px;
          font-family: HiraginoSansGB-W3;
          color: rgba(94, 126, 203, 1);
        }
      }
      .title {
        display: block;
        box-sizing: border-box;
        padding-top: 5px;
        position: relative;
        .border {
          width: 2px;
          height: 12px;
          background: #1194F8;
          display: inline-block;
          margin-left: 10px;
          margin-right: 5px;
        }
        span {
          font-size: 16px;
          font-family: HiraginoSansGB-W3;
          color: #7DA5FE;
        }
      }
      .left {
        float: left;
        width: calc(26% - 25px);
        height: calc(100% - 54px);
        margin: 0 15px 10px 10px;
        .area {
          float: left;
          width: 100%;
          height: calc(33.33% - 10px);
          margin-bottom: 10px;
          background: linear-gradient( rgba(0,0,0,1),rgba(0,0,0,1));
          position: relative;
        }
        .area:nth-of-type(3){
          height: 33.33%;
          margin-bottom: 0;
        }
      }
      .right {
        float: left;
        width: calc(74% - 20px);
        height: calc(100% - 54px);
        margin: 0 10px 10px 0;
        .area {
          float: left;
          width: 50%;
          height: calc(33.33% - 10px);
          margin-bottom: 10px;
          background: linear-gradient( rgba(0,0,0,1),rgba(0,0,0,1));
        }
        .area:nth-of-type(1) {
          width: calc(50% - 10px);
          margin-right: 10px;
        }
        .area:nth-of-type(3) {
          width: 100%;
          height: 66.66%;
          margin-bottom: 0;
        }
      }
      .target2,
      .target3,
      .target4,
      .target5 {
        width: 100%;
        height: calc(100% - 16px);
      }
      .statistics{
        width: 45%;
        height: 60px;
        position: absolute;
        left: 50%;
        top: 50%;
        .roll{
          height: 41px;
          position: absolute;
          top: -13px;
          left: 60px;
        }
        .title{
          height: 19px;
          position: absolute;
          bottom: 2px;
          left: 62px;
          color:rgba(170,173,182,1);
        }
      }
      .statistics1 {
        transform: translate(-100%,-50%)
      }
      .statistics2{
        transform: translate(10%,-50%)
      }
      .statistics::before {
        width: 44px;
        height: 51px;
        content: url('/static/renmintj/icon_document.png');
        padding-right: 10px;
      }
      .statistics .num {
        display: inline-block;
      }
      .cutLine {
        width: 1px;
        height: 28px;
        background: #AAADB6;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-5px,-50%)
      }
      .table{
        width: 100%;
        height: calc(100% - 85px);
        padding-top:15px;
        .thead{
          .td{
            font-size:12px;
            font-family:MicrosoftYaHei;
            color:rgba(77,132,254,1);
            height:22px;
            text-align:center;
          }
        }
        .tbody{
          .td{
            font-size:12px;
            font-family:MicrosoftYaHei;
            color:#4D84FE;
            text-align:center;
            .detail{
              font-size:12px;
              font-family:MicrosoftYaHei;
              color:rgba(255,255,255,1);
              padding:4px 8px;
              border-radius: 4px;
              background:rgba(17,148,248,1);
              cursor: pointer;
            }
          }
          tr{
            &:nth-of-type(2n-1){
              background:rgba(19,38,101,0.3);
            }
          }
        }
        .circle{
          color:rgba(225,234,255,1);
          border-radius:100%;
          width:23px;
          height:23px;
          display:inline-block;
          line-height: 23px;
        }
        .circle1{
          color:rgba(225,234,255,1);
          background:rgba(255,105,126,1);
        }
        .circle2{
          color:rgba(225,234,255,1);
          background:rgba(251,178,74,1);
        }
        .circle3{
          color:rgba(225,234,255,1);
          background:rgba(111,155,253,1);
        }
        .circle4{
          color:rgba(225,234,255,1);
          background:rgba(205,205,205,0.5);
        }
      }
      .page{
        display: block;
        height: 45px;
        text-align: center;
        box-sizing: border-box;
        padding-top:5px;
      }
    }
  }
</style>
