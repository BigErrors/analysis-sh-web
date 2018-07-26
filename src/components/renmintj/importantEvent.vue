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
      <sidenav></sidenav>
      <div class="nav">
        <span>首页 > 重点事件</span>
      </div>
      <div class="left">
        <div class="area clearfix">
          <div class="statistics statistics1">
            <div class="roll">
              {{benYueXZ}}
            </div>
            <div class="title">本月新增</div>
          </div>
          <div class="cutLine"></div>
          <div class="statistics statistics2">
            <div class="roll">
              {{jinNianZS}}
            </div>
            <div class="title">全年累计</div>
          </div>
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
            <span>重点事件变化趋势</span>
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
              <td width="15%" class='td'>描述</td>
              <td width="15%" class='td'>日期</td>
              <td width="15%" class='td'>状态</td>
              <td width="15%" class='td'>操作</td>
            </tr>
            </thead>
            <tbody class="tbody">
            <tr v-for="(item,index) in table.currentList" :key="index" v-if="index<=9">
              <td class='td'>
                <span v-if="item.xuHao<=3" class="circle" :class="'circle'+(item.xuHao)">{{item.xuHao}}</span>
                <span v-if="item.xuHao>3" class="circle" :class="'circle4'">{{item.xuHao}}</span>
              </td>
              <td class='td'>{{item.shiJianLX}}</td>
              <td class='td'>{{item.diQu}}</td>
              <td class='td'>{{item.jianShu}}</td>
              <td class='td'>{{item.riQi.slice(0,11)}}</td>
              <td class='td'>{{item.zhuangTai}}</td>
              <td class='td'><span class="detail" @click="changeRouter('eventDetail',item.id)">详情</span></td>
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
import jsonUtil from '@/util/jsonUtil'

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
      jinNianZS: 0
    }
  },
  computed: {
    timeCom () {
      return jsonUtil.dateFormat(new Date(), 'yyyy/MM/dd hh:mm D')
    }
  },
  methods: {
    // 绘制echarts
    draw (domName, option) {
      if (!this.myChart[domName]) {
        this.myChart[domName] = this.$echarts.init(document.getElementsByClassName(domName)[0])
      }
      this.myChart[domName].setOption(option)
    },
    // 路由跳转
    changeRouter (name, id) {
      let target = {name: name}
      if (name === 'eventDetail') {
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
          vue.draw('target3', eos.setBar3(data['geQuZDSJ'].reverse(), ['#4D84FE', '#B3CAFF'], 'horizon', 'integer', 6))
          vue.draw('target4', eos.setPie6(data['zhongDianSJLX'], 'integer', true))
          vue.draw('target5', eos.setBar4(data['zhongDianSJBHQS']))
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
  @blockBack:#171c26;
  @table:#131821;
  @table2:rgba(40,45,58,0.3);
  @tableHover:rgba(113, 116, 120, 0.2);
  @fontWhite:#f1f1f1;
  @fontGray:rgba(241,241,241,0.8);
  @fontSamll:14px;
  @fontMiddle:16px;
  .importantEvent_container {
    background: #0B131C;
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
      border-top: 14px solid #0B131C;
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
      .right {
        float: right;
        padding: 30px 0 0 0;
        span {
          font-size: @fontSamll;
          font-family: HiraginoSansGB-W3;
          color: @fontGray;
        }
      }
    }
    .body {
      height: calc(100% - 97px);
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
          font-size: @fontSamll;
          font-family: HiraginoSansGB-W3;
          color: @fontGray;
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
          background: @fontWhite;
          display: inline-block;
          margin-left: 10px;
          margin-right: 5px;
        }
        span {
          font-size: 16px;
          font-family: HiraginoSansGB-W3;
          color: @fontWhite;
        }
      }
      .left {
        float: left;
        width: calc(26% - 49px);
        height: calc(100% - 54px);
        margin: 0 15px 10px 34px;
        .area {
          float: left;
          width: 100%;
          height: calc(33.33% - 10px);
          margin-bottom: 10px;
          background: @blockBack;
          position: relative;
        }
        .area:nth-of-type(2){
          height: 66.66%;
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
          background: @blockBack;
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
          left: 62px;
          font-size:30px;
          color:@fontWhite;
        }
        .title{
          height: 19px;
          position: absolute;
          bottom: 2px;
          left: 68px;
          color:@fontGray;
        }
      }
      .statistics1 {
        transform: translate(-100%,-50%)
      }
      .statistics2{
        transform: translate(10%,-50%)
      }
      .statistics::before {
        content: '';
        width: 44px;
        height: 59px;
        background-image:url('/static/renmintj/icon_document2.png');
        background-size: 100% 100%;
        position: absolute;
        left: 0px;
        top:0;
        padding-right: 5px;
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
            font-size:@fontSamll;
            font-family:MicrosoftYaHei;
            color:@fontGray;
            height:22px;
            text-align:center;
          }
        }
        .tbody{
          .td{
            font-size:@fontSamll;
            font-family:MicrosoftYaHei;
            color:@fontWhite;
            text-align:center;
            .detail{
              font-size:@fontSamll;
              font-family:MicrosoftYaHei;
              color:rgba(255,255,255,1);
              padding: 4px 15px;
              border-radius: 15px;
              background:#F59B5B;
              &:hover{
               cursor: pointer;
                background:#de7326;
              }
            }
          }
          tr{
            &:nth-of-type(2n-1){
              background:@table;
            }
            &:hover{
              cursor: pointer;
              background: @tableHover;
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
          color:#030F46;
          background:rgba(209,209,209,1);
        }
      }
      .page{
        display: block;
        height: 45px;
        text-align: center;
        box-sizing: border-box;
        padding-top:16px;
      }
    }
  }
</style>
