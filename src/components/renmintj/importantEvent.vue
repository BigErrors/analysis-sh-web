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
          <div class="statistics">
            <digitalRolling class="num" :height='41' :width='25' :number='benYueXZ' :fontSize='41' :fontColor='"#1194F8"'></digitalRolling>
            <br>
            <span class="title">本月新增</span>
          </div>
          <div class="cutLine"></div>
          <div class="statistics">
            <digitalRolling class="num" :height='41' :width='25' :number='jinNianZS' :fontSize='41' :fontColor='"#1194F8"'></digitalRolling>
            <br>
            <span class="title">全年累计</span>
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
          <div class='table'>
            <div class="table_thead">
              <span class='td num'>序号</span>
              <span class='td'>分类</span>
              <span class='td'>行政区</span>
              <span class='td'>日期</span>
              <span class='td'>描述</span>
              <span class='td'>状态</span>
              <span class='td detail'>操作</span>
            </div>
            <rollScreen :dLength='table.dLength' :height='33' :lineNum='table.lineNum' class="renminttj_table_body">
              <div class="table_tr" slot="slide" v-for="(item, index) in table.zhongDianSJ" :key="index">
                <span class='td num'>{{item.xuHao}}</span>
                <span class='td'>{{item.shiJianLX}}</span>
                <span class='td'>{{item.diQu}}</span>
                <span class='td'>{{item.riQi}}</span>
                <span class='td'>{{item.jianShu}}</span>
                <span class='td'>{{item.zhuangTai}}</span>
                <span class='td detail'>
                  <span @click="changeRouter('importantEventDetail',item.id)">详情</span>
                </span>
              </div>
            </rollScreen>
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
import rollScreen from '../rollScreen.vue'
import digitalRolling from '../digitalRolling.vue'
export default {
  name: 'importantEvent',
  components: {
    rollScreen,
    digitalRolling
  },
  data () {
    return {
      myChart: {},
      table: {
        zhongDianSJ: [],
        dLength: 0,
        lineNum: 0
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
        [vue.table.dLength, vue.table.lineNum, vue.table.zhongDianSJ] = [data.zhongDianSJ.length, 7, data.zhongDianSJ]
        vue.benYueXZ = data['shuZhiTJ']['benYueXZ']
        vue.jinNianZS = data['shuZhiTJ']['jinNianZS']
        vue.$nextTick(function () {
          vue.draw('target2', eos.setBar4(data['zhongDianSJBHQS']))
          vue.draw('target3', eos.setBar3(data['geQuZDSJ'].reverse(), ['#4D84FE', '#B3CAFF'], 'horizon', 'integer', 11))
          vue.draw('target4', eos.setPie6(data['zhongDianSJLX'], 'integer', true))
          vue.draw('target5', eos.setPie6(data['zhongDianSJLY'], 'integer'))
        })
      })
    }
  },
  created () {
    this.getData()
  },
  mounted () {},
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
      .statistics {
        float: left;
        width: calc(50% - 41px);
        height: 60px;
        margin-top: calc((285px - 60px)/2);
        padding-left: 40px;
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
      .statistics .title {
        display: inline-block;
        color: #AAADB6;
        font-size: 16px;
        line-height: 16px;
        padding-left: 54px;
      }
      .cutLine {
        float: left;
        width: 1px;
        height: 28px;
        margin-top: calc((285px - 28px)/2);
        background: #AAADB6;
      }
      .table {
        width: 100%;
        padding: 0 24px;
        box-sizing: border-box;
        font-size: 14px;
      }
      .table div {
        width: 100%;
        height: 33px;
      }
      .table div span {
        float: left;
        display: block;
        width: calc((100% - 160px)/5);
        line-height: 33px;
        text-align: center;
        color: #4D84FE;
      }
      .table div .num {
        width: 60px;
      }
      .table div .detail {
        width: 80px;
      }
      .table_thead {
        color: rgba(17, 148, 248, 1);
        line-height: 42px;
      }
      .table_tr .detail>span {
        color: #FFFFFF;
        background: #1194F8;
        width: 50px;
        line-height: 22px;
        margin: 5px 15px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
</style>
