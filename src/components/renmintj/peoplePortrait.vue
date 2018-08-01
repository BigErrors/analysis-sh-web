<template>
  <div class="peoplePortrait_container">
    <div class="head clearfix">
      <div class="title">基层司法大数据子平台</div>
      <div class="left">
        <div class="back" @click="$router.back(-1)"></div>
      </div>
      <div class="right">
        <time-clock></time-clock>
      </div>
    </div>
    <div class="body">
      <sidenav></sidenav>
      <div class="nav">
        <span>首页 > 人员列表 > 详情</span>
      </div>
      <div class="nav2 clearfix">
        <div class="navLeft">
          <span class="navspan" @click="changeRouter('peopleNum')">数量分析</span>
          <span class="navspan" @click="changeRouter('peopleType')">属性分析</span>
          <span class="navspan active" @click="changeRouter('peopleRanking')">排名分析</span>
        </div>
      </div>
      <div class="content_container">
        <div class="left">
          <div class="lTitle clearfix">
            <div class="name">{{detail.name}}</div>
            <div class="year">{{detail.year + '年'}}</div>
            <div class="phone">{{detail.phone}}</div>
          </div>
          <div class="lAddress">{{detail.address}}</div>
          <div class="ciyun" :class="{bgnan:detail.gender==='男',bgnv:detail.gender==='女'}">
            <canvas class="canv" width="150px" height="460px"></canvas>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <div class="box">
              <div class="bTitle">整体概览</div>
              <div class="bContent back1">
                <div v-if="detail.info[0]" class="once_block once_block_1">
                  <span class="span1">{{detail.info[0].value}}</span>
                  <span class="span2">{{detail.info[0].name}}</span>
                </div>
                <div v-if="detail.info[1]" class="once_block once_block_2">
                  <span class="span1">{{detail.info[1].value}}</span>
                  <span class="span2">{{detail.info[1].name}}</span>
                </div>
                <div v-if="detail.info[2]" class="once_block once_block_3">
                  <span class="span1">{{detail.info[2].value}}</span>
                  <span class="span2">{{detail.info[2].name}}</span>
                </div>
              </div>
            </div>
            <div class="box">
              <div class="bTitle">类型对比</div>
              <div class="bContent module2"></div>
            </div>
            <div class="box">
              <div class="bTitle">综合能力</div>
              <div class="bContent module3"></div>
            </div>
          </div>
          <div class="bottom">
            <div class="bTitle">案件列表</div>
            <table class='table' cellspacing='0'>
              <thead class="thead">
              <tr>
                <td width="10%" class='td'>序号</td>
                <td width="30%" class='td'>案例名称</td>
                <td width="15%" class='td'>受理时间</td>
                <td width="15%" class='td'>结案时间</td>
                <td width="10%" class='td'>调解效率</td>
                <td width="10%" class='td'>文书质量</td>
                <td width="10%" class='td'>综合评分</td>
              </tr>
              </thead>
              <tbody class="tbody">
              <tr v-for="(item,index) in table.currentList" :key="index" v-if="index<=4" @click="changeRouter('eventDetail', item.caseid)">
                <td width="10%" class='td'><span class="circle" :class="'circle'+(item.xuhao)">{{item.xuhao}}</span></td>
                <el-tooltip :content='item.mingcheng' placement="top">
                  <td width="30%" class='td'><span class="span1">{{item.mingcheng}}</span></td>
                </el-tooltip>
                <td width="15%" class='td'>{{item.shoulisj}}</td>
                <td width="15%" class='td'>{{item.jieansj}}</td>
                <td width="10%" class='td'>{{item.tiaojielx}}</td>
                <td width="10%" class='td'>{{item.wenshuzl}}</td>
                <td width="10%" class='td'>{{item.zhonghepf}}</td>
              </tr>
              </tbody>
            </table>
            <div class="page">
              <el-pagination class="ej-pagination" @current-change="handleCurrentChange" :current-page.sync="table.currentPage" :page-size="5"
                layout="prev, pager, next, total" :total="table.total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eosNew from '@/util/echartsOptionsNew'
import wos from '@/util/wordcloudOptions'
import http from '@/util/httpUtil'
import urlConfig from '@/util/urlConfig'
import timeClock from '../timeClock.vue'

export default {
  name: 'peoplePortrait',
  components: {
    timeClock
  },
  data () {
    return {
      myChart: {},
      detail: {
        name: '',
        year: '',
        phone: '',
        address: '',
        gender: '男',
        info: []
      },
      table: {
        dLength: 0,
        lineNum: 0,
        list: [],
        currentList: [],
        total: 0,
        pageSize: 5,
        currentPage: 1
      },
      background: ''
    }
  },
  computed: {},
  methods: {
    // 绘制echarts
    draw (domName, option) {
      if (!this.myChart[domName]) {
        this.myChart[domName] = this.$echarts.init(document.getElementsByClassName(domName)[0])
      }
      this.myChart[domName].setOption(option)
    },
    changeRouter (name, id) {
      let target = {name: name}
      if (name === 'eventDetail') {
        target = {name: name, params: { id: id }}
      }
      this.$router.push(target)
    },
    drawWordcloud2 (data, type) {
      data = data.map((item, index) => {
        return [item.name, parseInt(item.value)]
      })
      let option = wos.setOption(data)
      let vue = this
      let ctx = document.getElementsByClassName('canv')[0].getContext('2d')
      vue.background = type === '女' ? 'url(/static/renmintjNew/nv.png) no-repeat' : 'url(/static/renmintjNew/nan.png) no-repeat'
      let img = new Image()
      img.src = type === '女' ? '/static/renmintjNew/nv2.png' : '/static/renmintjNew/nan2.png'
      img.onload = function () {
        ctx.drawImage(img, 0, 0)
        vue.$wordcloud(document.getElementsByClassName('canv')[0], option)
      }
    },
    getData () {
      let vue = this
      let reqParam = {id: this.$route.params.id}
      let baseUrl = urlConfig.baseUrl
      let url = ''
      url = '/portraitDetail'
      http.get(baseUrl + url, reqParam, (data) => {
        [vue.detail.name, vue.detail.year, vue.detail.phone, vue.detail.address, vue.detail.gender, vue.detail.info, vue.table.dLength, vue.table.list, vue.table.lineNum] =
         [data.name, data.gongzuonx, data.dianhauhm, data.tiaojiewyh, data.gender, data.zhengti, data.anjianlb.length, data.anjianlb, 7]
        vue.table.currentList = vue.table.list.slice(0, 5)
        vue.table.total = vue.table.list.length
        vue.$nextTick(function () {
          vue.draw('module2', eosNew.setBar4(data.leixingdb.reverse(), ['#1194F8', '#97D2FF'], 'horizon', 'integer', 21, 'portrait'))
          vue.draw('module3', eosNew.setRadar(data.data_polt, data.indicator))
          vue.drawWordcloud2(data.ciyun, data.gender)
        })
      }, 'application/json')
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
        vue.myChart['module2'].resize()
        vue.myChart['module3'].resize()
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
.peoplePortrait_container{
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
        font-size:@fontSamll;
        font-family:HiraginoSansGB-W3;
        color:@fontGray;
      }
    }
  }
  .body{
    height: calc(100% - 97px);
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
    }
    .content_container{
      height: calc(100% - 89px);
      margin-top:16px;
      width: 100%;
      box-sizing: border-box;
      padding:0 24px;
      position: relative;
      .left{
        width: 353px;
        height: 100%;
        float: left;
        background: @blockBack;
        .lTitle{
          margin:8px 0 13px 6px;
          display: block;
          position: relative;
          .name{
            float: left;
            background: url(/static/renmintjOther/pic_title_3.png) no-repeat;
            background-size: 100% 100%;
            background-position: center;
            height: 47px;
            width: 138px;
            margin-right: 8px;
            line-height: 45px;
            font-size: 16px;
            color: #00DEFF;
            box-sizing: border-box;
            text-align: center;
          }
          .year{
            float: left;
            background: url(/static/renmintjOther/pic_title_2.png) no-repeat;
            background-size: 100% 100%;
            background-position: center;
            height: 18px;
            width: 48px;
            margin-top: 14px;
            margin-right: 10px;
            line-height: 18px;
            font-size: @fontSamll;
            color: #FFFFFF;
            box-sizing: border-box;
            text-align: center;
          }
          .phone{
            float: left;
            background: url(/static/renmintjOther/pic_title_4.png) no-repeat;
            background-size: 100% 100%;
            background-position: center;
            height: 18px;
            width: 11em;
            margin-top: 14px;
            line-height: 18px;
            font-size: @fontSamll;
            color: #FFFFFF;
            box-sizing: border-box;
            text-align: center;
          }
        }
        .lAddress{
          background: url(/static/renmintjOther/pic_title_5.png) no-repeat;
          background-size: 100% 100%;
          background-position: center;
          height: 18px;
          line-height: 18px;
          width: 100%;
          font-size: @fontSamll;
          color: #FFFFFF;
          box-sizing: border-box;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          text-align: left;
          padding-left: 12px;
        }
        .ciyun{
          width: 100%;
          height:calc(100% - 100px);
          position: relative;
          background-repeat:no-repeat;
          background-size: 150px 460px;
          background-position: center;
          .canv{
            position: absolute;
            top:50%;
            left: 50%;
            transform: translate(-50%,-50%);
          }
        }
        .bgnan{
          background-image:url(/static/renmintjNew/nan.png)
        }
        .bgnv{
          background-image:url(/static/renmintjNew/nv.png)
        }
      }
      .right{
        width:calc(100% - 363px);
        height: 100%;
        float: right;
        .top{
          width:100%;
          height: 51%;
          display: flex;
          .box{
            flex: 1;
            height: 100%;
            margin:0;
            background: @blockBack;
            position: relative;
            .bContent{
              display: block;
              width: 100%;
              height: calc(100% - 50px);
              .once_block{
                position: absolute;
                width:69px;
                height:80px;
                left: 50%;
                top:50%;
                .span1{
                  font-size:18px;
                  font-family:MicrosoftYaHei;
                  color:rgba(0,228,255,1);
                  display: block;
                  height: 40px;
                  line-height: 55px;
                  text-align: center;
                }
                .span2{
                  font-size:@fontSamll;
                  font-family:MicrosoftYaHei;
                  color:rgba(126,188,253,1);
                  display: block;
                  height: 40px;
                  line-height: 30px;
                  text-align: center;
                }
              }
              .once_block_1{
                transform: translate(-50%,-80%)
              }
              .once_block_2{
                transform: translate(-109%,13%)
              }
              .once_block_3{
                transform: translate(9%,13%)
              }
            }
            .back1{
              background: url(/static/renmintjOther/pic_base_map.png) no-repeat;
              background-position: center;
              background-size:220px 229px;
            }
          }
        }
        .bottom{
          width:100%;
          height: calc(49% - 5px);
          margin-top:5px;
          background: @blockBack;
          .table{
            width: calc(100% - 40px);
            height: calc(100% - 90px);
            margin: 0px 20px;
            .thead{
              .td{
                font-size:@fontSamll;
                font-family:MicrosoftYaHei;
                color:@fontGray;
                line-height:42px;
                text-align:center;
              }
            }
            .tbody{
              .td{
                font-size:@fontSamll;
                font-family:MicrosoftYaHei;
                color:@fontWhite;
                text-align:center;
                position: relative;
                .span1{
                  position:absolute;
                  max-width: 100%;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%,-50%);
                }
              }
              tr{
                &:nth-of-type(2n-1){
                  background:@table2;
                }
                &:hover{
                  cursor: pointer;
                  background:@tableHover;
                }
              }
            }
            .circle{
              border-radius:100%;
              width:23px;
              height:23px;
              display:inline-block;
              line-height: 23px;
            }
            .circle1{
              background:rgba(255,105,126,1);
            }
            .circle2{
              background:rgba(251,178,74,1);
            }
            .circle3{
              background:rgba(111,155,253,1);
            }
            .circle4{
              background:rgba(205,205,205,0.5);
            }
            .circle5{
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
      .bTitle{
        display: block;
        width: 110px;
        height:30px ;
        background: url('/static/renmintjOther/pic_title_1.png') no-repeat;
        background-position:left center;
        background-size:110px 30px;
        font-size:16px;
        font-family:HiraginoSansGB-W3;
        color:@fontWhite;
        line-height: 30px;
        text-align: center;
        margin:5px;
      }
    }
  }
}
</style>
