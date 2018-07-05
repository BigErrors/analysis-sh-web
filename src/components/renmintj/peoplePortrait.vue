<template>
  <div class="peoplePortrait_container">
    <div class="head clearfix">
      <div class="title">基层司法大数据子平台</div>
      <div class="left">
        <div class="back" @click="$router.back(-1)"></div>
      </div>
      <div class="right">
        <span>{{timeCom}}</span>
      </div>
    </div>
    <div class="body">
      <div class="nav">
        <span>首页 > 人员列表 > 详情</span>
      </div>
      <div class="nav2 clearfix">
        <div class="navLeft">
          <span class="navspan">数量分析</span>
          <span class="navspan">属性分析</span>
          <span class="navspan active">排名分析</span>
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
            <div class="bTitle" style="padding-top:5px">整体概览</div>
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
              <tr v-for="(item,index) in table.currentList" :key="index" v-if="index<=4">
                <td class='td'><span class="circle" :class="'circle'+(item.xuhao)">{{item.xuhao}}</span></td>
                <td class='td'>{{item.mingcheng}}</td>
                <td class='td'>{{item.shoulisj}}</td>
                <td class='td'>{{item.jieansj}}</td>
                <td class='td'>{{item.tiaojielx}}</td>
                <td class='td'>{{item.wenshuzl}}</td>
                <td class='td'>{{item.zhonghepf}}</td>
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

export default {
  name: 'peoplePortrait',
  data () {
    return {
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
      background: '',
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
      let myChart = this.$echarts.init(document.getElementsByClassName(domName)[0])
      if (domName === 'peoplePortrait_content_leftContent') {
        option.maskImage.onload = function () {
          myChart.setOption(option.option)
        }
      } else {
        myChart.setOption(option)
      }
    },
    changeRouter (name) {
      this.$router.push({name: name})
    },
    drawWordcloud2 (data, type) {
      data = data.map((item, index) => {
        return [item.name, parseInt(item.value)]
      })
      let option = wos.setOption(data)
      let vue = this
      let ctx = document.getElementsByClassName('canv')[0].getContext('2d')
      vue.background = type === '女' ? 'url(/static/renmintjOther/pic_girl1.png) no-repeat' : 'url(/static/renmintjOther/pic_boy1.png) no-repeat'
      let img = new Image()
      img.src = type === '女' ? '/static/renmintjOther/pic_girl2.png' : '/static/renmintjOther/pic_boy2.png'
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
  }
}
</script>

<style lang="less" scoped>
@blockBack:#000000;
.peoplePortrait_container{
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
        }
        .active{
          color:rgba(255,198,0,1);
          border-bottom: 3px solid #FFC600;
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
            font-size: 12px;
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
            font-size: 12px;
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
          font-size: 12px;
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
          height:calc(100% - 86px);
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
            margin:0 5px;
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
                  font-size:12px;
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
            width: 100%;
            height: calc(100% - 90px);
            .thead{
              .td{
                font-size:12px;
                font-family:MicrosoftYaHei;
                color:rgba(77,132,254,1);
                line-height:42px;
                text-align:center;
                border-bottom:2px dashed rgba(16,54,165,1);
              }
            }
            .tbody{
              .td{
                font-size:12px;
                font-family:MicrosoftYaHei;
                color:rgba(225,234,255,1);
                text-align:center;
              }
              tr{
                &:nth-of-type(2n){
                  background:rgba(19,38,101,0.3);
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
        color:rgba(126,188,253,1);
        line-height: 30px;
        text-align: center;
        margin:5px;
      }
    }
  }
}
</style>
