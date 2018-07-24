<template>
  <div class="busiNum_container">
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
        <span>首页 > 业务数量</span>
      </div>
      <div class="nav2 clearfix">
        <div class="navLeft">
          <span class="navspan" :class="{'active':type==='人民调解'?true:false}" @click="type='人民调解'">人民调解</span>
          <span class="navspan" :class="{'active':type==='110联动'?true:false}" @click="type='110联动'">110联动</span>
          <span class="navspan" :class="{'active':type==='公共法律服务'||type==='村居服务'}" @click="type='公共法律服务'">公共法律服务</span>
          <span class="navspan" :class="{'active':type==='纠纷排查'?true:false}" @click="type='纠纷排查'">纠纷排查</span>
        </div>
      </div>
      <div class="content_container">
        <div class="top">
          <div class="left" v-if="type==='人民调解'">
            <div class="el_cont">
              <el-cascader
                :options="area"
                placeholder="区域"
                v-model="areaDefault"
              ></el-cascader>
            </div>
            <div class="others">
              <div class="rm rm_1">
                <span class="span2">{{statistics.month}}</span>
                <span class="span1">本月新增</span>
                <!-- <span class="span3">件</span> -->
              </div>
              <div class="rm rm_2">
                <span class="span2">{{statistics.year}}</span>
                <span class="span1">全年累计</span>
                <!-- <span class="span3">件</span> -->
              </div>
            </div>
          </div>
           <div class="left left_2" v-if="type==='110联动'">
            <div class="el_cont">
              <el-cascader
                :options="area"
                placeholder="区域"
                v-model="areaDefault"
              ></el-cascader>
            </div>
            <div class="others">
              <div class="ld ld1">
                <span class="span4">{{statistics.year}}</span>
                <span class="span1">全年累计</span>
                <!-- <span class="span3 span5">件</span> -->
              </div>
              <div class="ld ld2">
                <span class="span2">{{statistics.month}}</span>
                <span class="span1">本月新增</span>
                <!-- <span class="span3">件</span> -->
              </div>
              <div class="ld ld3">
                <span class="span2">{{statistics.day}}</span>
                <span class="span1">今日新增</span>
                <!-- <span class="span3">件</span> -->
              </div>
            </div>
          </div>
           <div class="left" v-if="type==='公共法律服务'||type==='村居服务'">
            <div class="el_cont">
              <el-cascader
                :options="area"
                placeholder="区域"
                v-model="areaDefault"
              ></el-cascader>
            </div>
            <div class="btn_cont">
              <div class="btn btn1" :class="{'active':type==='公共法律服务'}" @click="type='公共法律服务'">法律咨询</div>
              <div class="btn btn2" :class="{'active':type==='村居服务'}" @click="type='村居服务'">村居服务</div>
            </div>
            <div class="others others2">
              <div class="rm rm_1">
                <span class="span2">{{statistics.month}}</span>
                <span class="span1">本月新增</span>
                <!-- <span class="span3">件</span> -->
              </div>
              <div class="rm rm_2">
                <span class="span2">{{statistics.year}}</span>
                <span class="span1">全年累计</span>
                <!-- <span class="span3">件</span> -->
              </div>
            </div>
          </div>
           <div class="left" v-if="type==='纠纷排查'">
            <div class="el_cont">
              <el-cascader
                :options="area"
                placeholder="区域"
                v-model="areaDefault"
              ></el-cascader>
            </div>
            <div class="others">
              <div class="rm rm_1">
                <span class="span2">{{statistics.month}}</span>
                <span class="span1">本月排查</span>
                <!-- <span class="span3">件</span> -->
              </div>
              <div class="rm rm_2">
                <span class="span2">{{statistics.year}}</span>
                <span class="span1">全年累计</span>
                <!-- <span class="span3">件</span> -->
              </div>
            </div>
          </div>
          <div class="right" :class="{right_2:type==='110联动'}">
            <div class="title">
              <div class="border"></div>
              <span>案件类型</span>
              <div class="right_btn r_btn2" :class="{active:timeType==='month'}" @click="timeType='month'">本月</div>
              <div class="right_btn r_btn1" :class="{active:timeType==='year'}" @click="timeType='year'">今年</div>
            </div>
            <div class="r_container">
              <div class="r_left target2"></div>
              <div class="r_middle">
                <div class="table">
                  <div class="t_title">{{type2Title}}</div>
                  <div class="t_ul">
                    <div class="t_li">
                      <span class="span1">名称</span>
                      <span class="span2">占比</span>
                    </div>
                    <div class="t_li" v-for="(item,index) in table" :key="index" @click="setType3Data(item.type2)">
                      <el-tooltip v-if="item.type2.length>6" :content='item.type2' placement="top">
                        <span class="span1">{{item.type2}}</span>
                      </el-tooltip>
                      <span class="span1" v-if="item.type2.length<=6">{{item.type2}}</span>
                      <span class="span2">
                        <i class="i_container">
                          <i class="i_rate" :style="{width:changeToRate(item.value)}"></i>
                        </i>
                      </span>
                      <span class="span3">{{changeToRate(item.value)}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="r_right target3"></div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="box">
            <div class="title">
              <div class="border"></div>
              <span>{{title4}}</span>
            </div>
            <div class="echarts_container target4"></div>
          </div>
          <div class="box">
            <div class="title">
              <div class="border"></div>
              <span>{{title5}}</span>
            </div>
            <div class="echarts_container target5"></div>
          </div>
          <div class="box">
            <div class="title">
              <div class="border"></div>
              <span>{{title6}}</span>
            </div>
            <div class="echarts_container target6"></div>
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
import json from '@/util/dictionaryMapping'
import eosNew from '@/util/echartsOptionsNew'
export default {
  name: 'businessNum',
  components: {
    digitalRolling
  },
  data () {
    return {
      myChart: {},
      type: '人民调解',
      statistics: {
        year: 0,
        month: 0,
        day: 0
      },
      timeType: 'month',
      pieData: [],
      tableData: [],
      lineData: [],
      type2Title: '',
      table: [],
      keyMap: {'人民调解': 'MBM_CASE', '110联动': 'MMS_ALARM110INFO', '公共法律服务': 'WWS_CONSULT', '纠纷排查': 'CDS_INVESTIGATIONFEEDBAC', '村居服务': 'AMS_VILLAGESERVICELOG'},
      area: json.area,
      areaDefault: ['SHJCK01000'],
      title4: '各区案件数量(TOP10)',
      title5: '来源分布',
      title6: '处理状态',
      time: new Date()
    }
  },
  computed: {
    timeCom () {
      let now = this.time
      let day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()]
      let minute = (now.getMinutes() >= 10) ? (now.getMinutes().toString()) : ('0' + now.getMinutes().toString())
      return now.getFullYear().toString() + '/' + (now.getMonth() + 1).toString() + '/' + now.getDate().toString() +
          ' ' + now.getHours().toString() + ':' + minute + ' ' + day
    }
  },
  watch: {
    type: function (newValue, oldValue) {
      this.areaDefault = ['SHJCK01000']
    },
    areaDefault: function (newValue, oldValue) {
      this.getData()
    },
    timeType: function (newValue, oldValue) {
      this.setTypeData()
    }
  },
  methods: {
    changeToRate (value) {
      let sum = 0
      for (let i = 0; i < this.table.length; i++) {
        sum += parseInt(this.table[i].value)
      }
      return (value / sum * 100).toFixed(2) + '%'
    },
    // 绘制echarts
    draw (domName, option) {
      if (this.myChart[domName]) {
        this.$echarts.dispose(this.myChart[domName])
      }
      this.myChart[domName] = this.$echarts.init(document.getElementsByClassName(domName)[0])
      this.myChart[domName].setOption(option)
      if (domName === 'target2') {
        let vue = this
        this.myChart[domName].on('click', function (params) {
          vue.setType2Data(params.name)
        })
      }
    },
    changeRouter (name) {
      this.$router.push({name: name})
    },
    setTypeData () {
      let vue = this
      let data = []
      vue.pieData.map(item => {
        if (vue.timeType === item.timetype) {
          data.push({name: item.type1, value: parseInt(item.value)})
        }
      })
      if (data.length > 0) {
        data = data.sort((a, b) => {
          if (a.value >= b.value) {
            return -1
          } else {
            return 1
          }
        })
        vue.draw('target2', eosNew.setPie4(data))
        vue.setType2Data(data[0].name)
      } else {
        vue.draw('target2', eosNew.setPie4([{name: '暂无数据', value: 0}]))
        vue.type2Title = '暂无数据'
        vue.table = [{type2: '暂无数据', value: 0}]
        vue.draw('target3', eos.setLine6([{name: '暂无数据', value: 0}], 'integer'))
      }
    },
    setType2Data (type) {
      let vue = this
      vue.type2Title = type
      vue.table = vue.tableData.filter(item => {
        if (vue.timeType === item.timetype && vue.type2Title === item.type1) {
          return item
        }
      })
      vue.setType3Data(vue.table[0].type2)
    },
    setType3Data (type) {
      let vue = this
      let data = []
      vue.lineData.map(item => {
        if (vue.timeType === item.timetype && vue.type2Title === item.type1 && type === item.type2) {
          data = item.value
          // 处理年份数据倒序的问题
          if (item.timetype === 'year') {
            data = data.sort(function (a, b) {
              if (a.name > b.name) {
                return 1
              } else {
                return -1
              }
            })
          }
        }
      })
      vue.draw('target3', eos.setLine6(data, 'integer', type))
    },
    getData () {
      let vue = this
      let reqParam = {area: this.areaDefault[0], biaoming: this.keyMap[this.type]}
      let baseUrl = urlConfig.baseUrl
      let url = ''
      url = '/caseTypeDown'
      http.get(baseUrl + url, reqParam, (data) => {
        vue.statistics.year = data.year
        vue.statistics.month = data.month
        vue.statistics.day = data.day
        vue.pieData = data.pie
        vue.tableData = data.table
        vue.lineData = data.line
        vue.$nextTick(function () {
          vue.timeType = 'month'
          vue.setTypeData()
        })
      })
      url = '/caseDistDown'
      http.get(baseUrl + url, reqParam, (data) => {
        if (data.length === 0) {
          data = [{name: '暂无数据', value: 0}]
        } else {
          data = data.slice(0, 10).reverse()
        }
        vue.$nextTick(function () {
          if (vue.type === '人民调解') {
            vue.title4 = '各区案件数量(TOP10)'
          } else if (vue.type === '110联动') {
            vue.title4 = '各区受理排名(TOP10)'
          } else if (vue.type === '公共法律服务') {
            vue.title4 = '各区服务数量(TOP10)'
          } else if (vue.type === '纠纷排查') {
            vue.title4 = '各机构排查排名(TOP10)'
          }
          vue.draw('target4', eos.setBar3(data, ['#4D84FE', '#B3CAFF'], 'horizon', 'integer'))
        })
      })
      url = '/caseCountDown1'
      http.get(baseUrl + url, reqParam, (data) => {
        if (vue.type === '公共法律服务') {
          data = data.map(item => {
            return {name: item.time, type: item.type, value: item.value}
          })
        }
        if (data.length === 0) {
          data = [{name: '暂无数据', value: 0}]
        }
        vue.$nextTick(function () {
          if (vue.type === '人民调解') {
            vue.title5 = '案件来源分布'
            vue.draw('target5', eosNew.setPie4(data))
          } else if (vue.type === '110联动') {
            vue.title6 = '处置情况'
            vue.draw('target6', eosNew.setBar6(data, ['#4D92E0', '#1167CC'], 'vertical', 'integer', 36, undefined, false, 30))
          } else if (vue.type === '公共法律服务') {
            vue.title5 = '服务热点'
            vue.draw('target5', eos.setLine7(data, 'integer', undefined, true))
          } else if (vue.type === '纠纷排查') {
            vue.title6 = '处理结果'
            vue.draw('target6', eosNew.setPie4(data))
          }
        })
      })
      url = '/caseCountDown2'
      http.get(baseUrl + url, reqParam, (data) => {
        if (data.length === 0) {
          data = [{name: '暂无数据', value: 0}]
        }
        vue.$nextTick(function () {
          if (vue.type === '人民调解') {
            vue.title6 = '案件处理状态'
            vue.draw('target6', eosNew.setBar6(data, ['#4D92E0', '#1167CC'], 'vertical', 'integer', 36, undefined, false, 30))
          } else if (vue.type === '110联动') {
            vue.title5 = '所在人群'
            vue.draw('target5', eosNew.setPie4(data))
          } else if (vue.type === '公共法律服务') {
            vue.title6 = '调解占比'
            vue.draw('target6', eosNew.setPie4(data))
          } else if (vue.type === '纠纷排查') {
            vue.title5 = '所在人群'
            vue.draw('target5', eosNew.setPie4(data))
          }
        })
      })
    }
  },
  created () {
    this.type = this.$route.params.type
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
        vue.myChart['target6'].resize()
      })
    })
  }
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
.busiNum_container{
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
      font-size:20px;
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
        width: 137px;
        height: 35px;
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer;
      }
    }
    .right{
      float: right;
      padding:30px 0 0 0;
      span{
        font-size:@fontSamll;
        font-family:HiraginoSansGB-W3;
        color:@fontGray;
      }
    }
  }
  .body{
    height: calc(100% - 84px);
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
        border-bottom:1px solid @fontGray;
        .navspan{
          font-size:14px;
          font-family:HiraginoSansGB-W3;
          color:@fontGray;
          display: inline-block;
          padding:0 2px 4px 2px;
          width: 5em;
          text-align: center;
          cursor: pointer;
          position: relative;
          &:nth-child(3){
            width: 6em;
          }
        }
        .active{
          color:@fontWhite;
          // border-bottom: 3px solid #2E89FD;
          &::after{
            content: '';
            position: absolute;
            width: 100%;
            height: 3px;
            background: #2E89FD;
            left: 0;
            bottom:-1px;
          }
        }
      }
      .navRight{
        float: right;
        .cas_container{
          float: right;
          .cas_container_span{
            font-size:11px;
            font-family:HiraginoSansGB-W3;
            color:rgba(94,126,203,1);
          }
        }
      }
    }
    .content_container{
      height: calc(100% - 89px);
      margin-top: 16px;
      padding: 0 24px;
      display: block;
      .top{
        height: 53%;
        width: 100%;
        display: flex;
        .left{
          flex:0.21;
          margin-right:8px;
          background: @blockBack;
          .el_cont{
            height: 40px;
            padding:28px;
            text-align: center;
          }
          .others{
            height: calc(100% - 96px);
            position: relative;
            display: block;
            .rm{
              height: 57px;
              width: 60%;
              position: absolute;
              box-sizing: border-box;
              padding-left:66px;
              background-image: url('/static/renmintj/icon_document2.png') ;
              background-size: 49px 57px;
              background-position: left center;
              background-repeat: no-repeat;
              left: 50%;
              top: 50%;
              .span1{
                height:22px;
                font-size:12px;
                font-family:HiraginoSansGB-W3;
                color:@fontGray;
                display: block;
                line-height: 22px;
              }
              .span2{
                font-size:20px;
                font-family:Impact;
                color:@fontWhite;
                width: 80%;
                display: inline-block;
                height: 35px;
                line-height: 35px;
                position: relative;
              }
              .span3{
                font-size:12px;
                font-family:HiraginoSansGB-W3;
                color:@fontGray;
                width: 15%;
                display: inline-block;
                height: 35px;
                line-height: 35px;
                transform-origin: left;
                transform: scale(0.9);
              }
            }
            .rm_1{
              transform: translate(-50%,-150%);
            }
            .rm_2{
              transform: translate(-50%,5%);
            }
            .ld{
              height: 57px;
              position: absolute;
              box-sizing: border-box;
              padding-left:62px;
              background-image: url('/static/renmintj/icon_document2.png') ;
              background-size: 49px 57px;
              background-position: left center;
              background-repeat: no-repeat;
              top: 50%;
              .span1{
                height:22px;
                font-size:12px;
                font-family:HiraginoSansGB-W3;
                color:@fontGray;
                display: block;
                line-height: 22px;
              }
              .span2{
                font-size:20px;
                font-family:Impact;
                color:@fontWhite;
                width: 68%;
                display: inline-block;
                height: 35px;
                line-height: 35px;
              }
              .span3{
                font-size:12px;
                font-family:HiraginoSansGB-W3;
                color:@fontGray;
                width: 25%;
                display: inline-block;
                height: 35px;
                line-height: 35px;
                transform-origin: left;
                transform: scale(0.9);
              }
              .span4{
                font-size:44px;
                color:rgba(255,255,255,1);
                width: 88%;
                display: inline-block;
              }
              .span5{
                width:9%;
              }
            }
            .ld1{
              left: 50%;
              width: 90%;
              transform: translate(-50%,-150%);
              height: 78px;
            }
            .ld2{
              left: 5%;
              width: 45%;
              transform: translate(0%,10%);
            }
            .ld3{
              right: 5%;
              width: 45%;
              transform: translate(0%,10%);
            }
          }
          .others2{
            height: calc(100% - 126px);
          }
          .btn_cont{
            height: 30px;
            display: block;
            position: relative;
            .btn{
              height: 28px;
              border:1px solid rgba(94,126,203,1);
              background: rgba(94,126,203,0.2);
              position: absolute;
              border-radius: 4px;
              font-size:13px;
              font-family:HiraginoSansGB-W3;
              color:rgba(94,126,203,1);
              cursor: pointer;
              line-height: 28px;
              left: 50%;
              padding:0 8px;
            }
            .active{
              color:rgba(255,198,0,1);
              border:1px solid #FFC600;
              background: rgba(255,198,0,0.2);
            }
            .btn1{
              transform: translateX(-100%-12px)
            }
            .btn2{
              transform: translateX(12px)
            }
          }
        }
        .right{
          flex: 0.79;
          background: @blockBack;
          .r_container{
            height: calc(100% - 36px);
            display: flex;
            .r_left{
              height: 100%;
              flex: 1.1;
            }
            .r_middle{
              height: calc(100% - 20px);
              margin-bottom: 20px;
              flex: 1.1;
              background: url(/static/renmintjOther/icon_directing.png);
              background-repeat: no-repeat;
              background-position: left center;
              padding-left:29px;
              position: relative;
              .table{
                position: absolute;
                width: 69%;
                height: 93%;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                .t_title{
                  height: 34px;
                  font-size:14px;
                  font-family:HiraginoSansGB-W3;
                  color:@fontWhite;
                  display: block;
                  line-height: 34px;
                  padding-left: 6px;
                  text-align: center;
                }
                .t_ul{
                  height: calc(100% - 44px);
                  overflow-x: hidden;
                  overflow-y: auto;
                  margin-top: 10px;
                  .t_li{
                    height: 28px;
                    position: relative;
                    color:@fontGray;
                    cursor: pointer;
                    &:nth-of-type(2n-1){
                      background: @table;
                    }
                    &:hover{
                      color:@fontWhite
                    }
                    .span1{
                      float: left;
                      width: 36%;
                      font-size:12px;
                      font-family:HiraginoSansGB-W3;
                      height: 28px;
                      line-height: 28px;
                      box-sizing: border-box;
                      padding-left: 22px;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    }
                    .span2{
                      width: 40%;
                      float: left;
                      height: 28px;
                      font-size:12px;
                      font-family:HiraginoSansGB-W3;
                      line-height: 28px;
                      position: relative;
                      padding-left: 10%;
                      box-sizing: border-box;
                      .i_container{
                        width: 80%;
                        height: 8px;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                        background: rgba(16,21,30,1);
                        border-radius: 4px;
                        .i_rate{
                          min-width:5px;
                          height:8px;
                          background: rgba(46,116,255,1);
                          display: block;
                          border-radius: 4px;
                        }
                      }
                    }
                    .span3{
                      float: left;
                      width: 24%;
                      font-size:12px;
                      font-family:HiraginoSansGB-W3;
                      height: 28px;
                      line-height: 28px;
                    }
                  }
                }
              }
            }
            .r_right{
              height: 100%;
              flex: 1.6;
              background: url(/static/renmintjOther/icon_directing.png);
              background-repeat: no-repeat;
              background-position: left center;
              padding-left:29px;
            }
          }
        }
        .left_2{
          flex: 0.25
        }
        .right_2{
          flex: 0.75
        }
      }
      .bottom{
        height: calc(47% - 16px);
        width: 100%;
        margin:8px 0;
        display: flex;
        .box{
          flex: 1.1;
          margin-right: 8px;
          background: @blockBack;
          &:nth-last-of-type(1){
            margin: 1.1
          }
          &:nth-of-type(2){
            flex:1
          }
          &:nth-of-type(3){
            flex:1.6
          }
        }
      }
    }
    .title{
      display: block;
      box-sizing: border-box;
      padding-top: 20px;
      position: relative;
      .border{
        width: 2px;
        height: 12px;
        background: @fontWhite;
        display: inline-block;
        margin-left:18px;
        margin-right: 5px;
      }
      span{
        font-size:16px;
        font-family:HiraginoSansGB-W3;
        color:@fontWhite;
      }
      .right_btn{
        padding:0 4px;
        height:21px;
        float: right;
        width: 40px;
        border-radius: 10px;
        font-size: 12px;
        color: white;
        text-align: center;
        line-height: 21px;
        margin-right: 20px;
        cursor: pointer;
      }
      .active{
        background:rgba(77,132,254,1);
      }
    }
    .echarts_container{
      height: calc(100% - 36px);
      display: block;
    }
  }
}
</style>
