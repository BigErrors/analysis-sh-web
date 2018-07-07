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
      <div class="nav">
        <span>首页 > 业务数量</span>
      </div>
      <div class="nav2 clearfix">
        <div class="navLeft">
          <span class="navspan" :class="{'active':type==='人民调解'?true:false}" @click="type='人民调解'">人民调解</span>
          <span class="navspan" :class="{'active':type==='110联动'?true:false}" @click="type='110联动'">110联动</span>
          <span class="navspan" :class="{'active':type==='公共法律服务'?true:false}" @click="type='公共法律服务'">公共法律服务</span>
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
                <span class="span1">今日新增</span>
                <span class="span2">{{statistics.day}}</span>
                <span class="span3">件</span>
              </div>
              <div class="rm rm_2">
                <span class="span1">全年累计</span>
                <span class="span2">{{statistics.year}}</span>
                <span class="span3">件</span>
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
                <span class="span1">全年累计</span>
                <span class="span4">{{statistics.year}}</span>
                <span class="span3 span5">件</span>
              </div>
              <div class="ld ld2">
                <span class="span1">本月新增</span>
                <span class="span2">{{statistics.month}}</span>
                <span class="span3">件</span>
              </div>
              <div class="ld ld3">
                <span class="span1">今日新增</span>
                <span class="span2">{{statistics.day}}</span>
                <span class="span3">件</span>
              </div>
            </div>
          </div>
           <div class="left" v-if="type==='公共法律服务'">
            <div class="el_cont">
              <el-cascader
                :options="area"
                placeholder="区域"
                v-model="areaDefault"
              ></el-cascader>
            </div>
            <div class="btn_cont">
              <div class="btn btn1 active">法律咨询</div>
              <div class="btn btn2">村居服务</div>
            </div>
            <div class="others others2">
              <div class="rm rm_1">
                <span class="span1">今日新增</span>
                <span class="span2">364</span>
                <span class="span3">件</span>
              </div>
              <div class="rm rm_2">
                <span class="span1">全年累计</span>
                <span class="span2">36224</span>
                <span class="span3">件</span>
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
                <span class="span1">本月排查</span>
                <span class="span2">{{statistics.month}}</span>
                <span class="span3">件</span>
              </div>
              <div class="rm rm_2">
                <span class="span1">全年累计</span>
                <span class="span2">{{statistics.year}}</span>
                <span class="span3">件</span>
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
                    <div class="t_li" v-for="(item,index) in table" :key="index" @click="setType3Data(item.type2)">
                      <span class="span1"></span>
                      <span class="span2">{{item.type2}}</span>
                      <span class="span3">{{item.value}}</span>
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
      timeType: 'year',
      pieData: [],
      tableData: [],
      lineData: [],
      type2Title: '',
      table: [],
      keyMap: {'人民调解': 'MBM_CASE', '110联动': 'MMS_ALARM110INFO', '公共法律服务': 'WWS_CONSULT', '纠纷排查': 'CDS_INVESTIGATIONFEEDBAC'},
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
      let day = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'][now.getDay()]
      let minute = (now.getMinutes() >= 10) ? (now.getMinutes().toString()) : ('0' + now.getMinutes().toString())
      return now.getFullYear().toString() + '/' + (now.getMonth() + 1).toString() + '/' + now.getDate().toString() + ' ' + now.getHours().toString() + ':' + minute + ' ' + day
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
        vue.draw('target2', eos.setPie2(data))
        vue.setType2Data(data[0].name)
      } else {
        vue.draw('target2', eos.setPie2([{name: '暂无数据', value: 0}]))
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
          data = item.value.sort((a, b) => {
            if (parseInt(a.name) >= parseInt(b.name)) {
              return 1
            } else {
              return -1
            }
          })
        }
      })
      vue.draw('target3', eos.setLine6(data, 'integer', type))
      // this.$notify.success(`时间:${this.timeType},类别:${this.type},一级分类:${this.type2Title},二级分类:${type}`)
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
          vue.timeType = 'year'
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
            vue.draw('target5', eos.setPie3(data))
          } else if (vue.type === '110联动') {
            vue.title5 = '处置情况'
            vue.draw('target5', eos.setBar3(data, ['#F8E228', '#FF9C00'], 'vertical', 'integer', 36, undefined, false, 30))
          } else if (vue.type === '公共法律服务') {
            vue.title5 = '服务热点'
            vue.draw('target5', eos.setLine7(data, 'integer', undefined, true))
          } else if (vue.type === '纠纷排查') {
            vue.title5 = '处理结果'
            vue.draw('target5', eos.setPie2(data))
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
            vue.draw('target6', eos.setBar3(data, ['#F8E228', '#FF9C00'], 'vertical', 'integer', 36, undefined, false, 30))
          } else if (vue.type === '110联动') {
            vue.title6 = '所在人群'
            vue.draw('target6', eos.setPie3(data))
          } else if (vue.type === '公共法律服务') {
            vue.title6 = '调解占比'
            vue.draw('target6', eos.setPie2(data))
          } else if (vue.type === '纠纷排查') {
            vue.title6 = '所在人群'
            vue.draw('target6', eos.setPie3(data))
          }
        })
      })
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
        vue.myChart['target6'].resize()
      })
    })
  }
}
</script>

<style lang="less" scoped>
@blockBack:#000000;
.busiNum_container{
  background: #171415;
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
        font-size:12px;
        font-family:HiraginoSansGB-W3;
        color:rgba(237,237,237,1);
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
        font-size: 12px;
        font-family: HiraginoSansGB-W3;
        color:rgba(94,126,203,1);
      }
    }
    .nav2{
      display: block;
      padding: 0 34px;
      box-sizing: border-box;
      .navLeft{
        float: left;
        border-bottom:1px solid #0F3BBA;
        .navspan{
          font-size:14px;
          font-family:HiraginoSansGB-W3;
          color:rgba(94,126,203,1);
          display: inline-block;
          padding:0 2px 4px 2px;
          width: 5em;
          text-align: center;
          cursor: pointer;
          &:nth-child(3){
            width: 6em;
          }
        }
        .active{
          color:rgba(255,198,0,1);
          border-bottom: 3px solid #FFC600;
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
                color:rgba(121,190,242,1);
                display: block;
                line-height: 22px;
              }
              .span2{
                font-size:20px;
                font-family:Impact;
                color:rgba(255,255,255,1);
                width: 80%;
                display: inline-block;
                height: 35px;
                line-height: 35px;
              }
              .span3{
                font-size:12px;
                font-family:HiraginoSansGB-W3;
                color:rgba(121,190,242,1);
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
                color:rgba(121,190,242,1);
                display: block;
                line-height: 22px;
              }
              .span2{
                font-size:20px;
                font-family:Impact;
                color:rgba(255,255,255,1);
                width: 68%;
                display: inline-block;
                height: 35px;
                line-height: 35px;
              }
              .span3{
                font-size:12px;
                font-family:HiraginoSansGB-W3;
                color:rgba(121,190,242,1);
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
            height: calc(100% - 26px);
            display: flex;
            .r_left{
              height: 100%;
              flex: 1.1;
            }
            .r_middle{
              height: 100%;
              flex: 1.1;
              background: url(/static/renmintjOther/icon_directing.png);
              background-repeat: no-repeat;
              background-position: left center;
              padding-left:29px;
              position: relative;
              .table{
                position: absolute;
                width: 69%;
                height: 80%;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                border:1px solid #123697;
                .t_title{
                  height: 34px;
                  font-size:14px;
                  font-family:HiraginoSansGB-W3;
                  color:rgba(174,195,255,1);
                  display: block;
                  line-height: 34px;
                  padding-left: 6px;
                  background-image: url(/static/renmintjOther/pic_frame.png);
                  background-repeat: no-repeat;
                  // background-position: 0 0;
                  // background-size:74px 26px;
                }
                .t_ul{
                  height: calc(100% - 44px);
                  overflow-x: hidden;
                  overflow-y: auto;
                  margin-top: 10px;
                  .t_li{
                    height: 28px;
                    position: relative;
                    color:rgba(184,206,255,1);
                    cursor: pointer;
                    &:hover{
                      color:#FFC600
                    }
                    .span1{
                      position: absolute;
                      width: 8px;
                      height: 8px;
                      border-radius: 4px;
                      background: rgba(184,206,255,1);
                      left: 22px;
                      top:50%;
                      transform: translateY(-4px)
                    }
                    .span2{
                      float: left;
                      width: 76%;
                      font-size:12px;
                      font-family:HiraginoSansGB-W3;
                      height: 28px;
                      line-height: 28px;
                      box-sizing: border-box;
                      padding-left: 46px;
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
          flex: 1;
          margin-right: 8px;
          background: @blockBack;
          &:nth-last-of-type(1){
            margin: 0
          }
        }
      }
    }
    .title{
      display: block;
      box-sizing: border-box;
      padding-top:5px;
      position: relative;
      .border{
        width: 2px;
        height: 12px;
        background: #1194F8;
        display: inline-block;
        margin-left:10px;
        margin-right: 5px;
      }
      span{
        font-size:16px;
        font-family:HiraginoSansGB-W3;
        color:#7DA5FE;
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
      height: calc(100% - 26px);
      display: block;
    }
  }
}
</style>
