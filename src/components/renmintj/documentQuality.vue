<template>
  <div class="documentQuality_container">
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
        <span>首页 > 文书质量</span>
      </div>
      <div class="nav2 clearfix">
        <div class="navLeft">
          <span class="navspan active">文书质量评估</span>
        </div>
      </div>
      <div class="container">
        <div class="top">
          <div class="box box1">
            <div class="blocks">
              <span class="span1"><span class="spans">协议书总量</span></span>
              <span class="span2">{{datas.docnumber|changeNum}}</span>
              <span class="span3">件</span>
            </div>
            <div class="blocks">
              <span class="span1"><span class="spans">协议书总体质量评分</span></span>
              <span class="span2">{{datas.docLV}}</span>
            </div>
          </div>
          <div class="box box2">
            <div class="title">
              <div class="border"></div>
              <span>优秀协议书提供者</span>
              <span class="topn">(TOP6)</span>
            </div>
            <div class="table_container">
              <div class="line table_head">
                <div class="row row1"><span>排名</span></div>
                <div class="row row2"><span>姓名</span></div>
                <div class="row row3"><span>所属单位</span></div>
                <div class="row row4"><span>优秀协议书质量</span></div>
              </div>
              <div class="line table_body" v-for ="(item,index) in datas.topdoc" :key="index">
                <div class="row row1"><span :class="index<3?'bg'+(index+1):'bg4'">{{index+1}}</span></div>
                <div class="row row2"><span>{{item.name}}</span></div>
                <div class="row row3"><span>{{item.danwei}}</span></div>
                <div class="row row4"><span>{{item.number}}</span></div>
              </div>
            </div>
          </div>
          <div class="box box3">
            <div class="title">
              <div class="border"></div>
              <span>协议书质量评估标准</span>
            </div>
            <div class="content_container">
              <div class="line">
                <div class="circle"></div>
                <span>申请人:协议书应当对当事人介绍。内容包括姓名、联系方式等</span>
              </div>
              <div class="line">
                <div class="circle"></div>
                <span>纠纷描述:纠纷主要事实、争议事项及各方请求应当做简要载明</span>
              </div>
              <div class="line">
                <div class="circle"></div>
                <span>履行方式:针对具体调解结果载明协议的履行方式、时限</span>
              </div>
              <div class="line">
                <div class="circle"></div>
                <span>达成情况:协议书中应当载明协议双方的达成情况及涉及调解员、调解机构的确认</span>
              </div>
              <div class="line">
                <div class="circle"></div>
                <span>文书长度:协议文书的长度应当适宜，偏少不利于阐述事实，过多不利于审阅</span>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="title">
            <div class="border"></div>
            <span>各区协议书质量</span>
          </div>
          <div class="echarts_container">
            <div class="target1"></div>
            <div class="middle"></div>
            <div class="target2"></div>
          </div>
        </div>
      </div>
      <sidenav></sidenav>
    </div>
  </div>
</template>

<script>
import http from '@/util/httpUtil'
import urlConfig from '@/util/urlConfig'
import eosNew from '@/util/echartsOptionsNew'
import json from '@/util/jsonUtil'
export default {
  data () {
    return {
      time: new Date(),
      datas: {
        docLV: '',
        docnumber: 0,
        heatmap: {},
        indicator: [],
        radar: [],
        topdoc: []
      }
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
  filters: {
    changeNum (value) {
      return parseInt(value).toLocaleString()
    }
  },
  methods: {
    getRader (params) {
      let area = json.area
      // location 字典查询
      let location = area.map((item) => {
        return item.label === params.name ? item['value'] : ''
      }).filter(item => item)
      let dengji = ['E', 'D', 'C', 'B', 'A'][[0, 1, 2, 3, 4].indexOf(params.value[1])]
      let baseUrl = urlConfig.baseUrl
      let url = '/documentsAQuality'
      let param = {location: location[0], dengji: dengji}
      http.get(baseUrl + url, param, (data) => {
        this.$echarts.init(document.getElementsByClassName('target2')[0]).setOption(eosNew.setRadar([{value: data.radar}], data.indicator, 'documqua'))
      })
    },
    changeRouter (name) {
      this.$router.push({name: name})
    }
  },
  mounted () {
    let baseUrl = urlConfig.baseUrl
    let url = '/documentsAQuality'
    let param = {}
    let _this = this
    http.get(baseUrl + url, param, (data) => {
      this.datas = data
      this.datas.topdoc = data.topdoc.slice(0, 6)
      // echarts 热力图
      this.$echarts.init(document.getElementsByClassName('target1')[0]).setOption(eosNew.setheatmap(data.heatmap))
      this.$echarts.init(document.getElementsByClassName('target1')[0]).on('click', function (params) {
        _this.getRader(params)
      })
      // echarts 雷达图
      this.$echarts.init(document.getElementsByClassName('target2')[0]).setOption(eosNew.setRadar([{value: data.radar}], data.indicator, 'documqua'))
    })
  }
}
</script>

<style lang="less">
@blockBack:#171c26;
@table:#131821;
@table2:rgba(40,45,58,0.3);
@fontWhite:#f1f1f1;
@fontGray:rgba(241,241,241,0.4);
.documentQuality_container{
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
        font-size:12px;
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
        font-size: 12px;
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
        .navspan{
          font-size:14px;
          font-family:HiraginoSansGB-W3;
          color:@fontWhite;
          display: inline-block;
          padding:0 2px 4px 2px;
          width: 6em;
          text-align: center;
          cursor: pointer;
        }
      }
      .navRight{
        float: right;
        .cas_container{
          float: right;
          .cas_container_span{
            font-size:11px;
            font-family:HiraginoSansGB-W3;
            color:@fontGray;
          }
        }
      }
    }
    .container{
      width: 100%;
      height: calc(100% - 85px);
      margin-top: 16px;
      padding: 0 24px;
      box-sizing: border-box;
      .top{
        height: 46%;
        width: 100%;
        display: flex;
        .box{
          background: @blockBack;
        }
        .box1{
          flex: 1.4;
          margin-right: 8px;
          .blocks{
            height: 50%;
            display: block;
            .span1{
              display: block;
              font-size: 12px;
              color:@fontGray;
              height: 45%;
              position: relative;
            }
            .span2{
              display: inline-block;
              font-size: 27px;
              padding-left:20px;
              color:@fontWhite;
            }
            .span3{
              display: inline-block;
              font-size: 12px;
              color:@fontGray;
              padding-left: 5px;
            }
            .spans{
              position: absolute;
              left: 20px;
              bottom:10px;
            }
          }
        }
        .box2{
          flex: 4;
          margin-right: 8px;
          .table_container{
            width: 100%;
            display: block;
            box-sizing: border-box;
            height: calc(100% - 50px);
            margin:12px 0;
            padding:0 22px;
            .table_head{
              color:@fontGray;
            }
            .table_body{
              color:@fontWhite;
              .row1{
                span{
                  width: 15px;
                  height: 15px;
                  border-radius: 50%;
                  text-align: center;
                  line-height: 14px;
                }
                .bg1{
                  background: #FF697E;
                }
                .bg2{
                  background: #FBB24A;
                }
                .bg3{
                  background: #6F9BFD;
                }
                .bg4{
                  background: #CDCDCD;
                }
              }
              .row4{
                span{
                  padding:0 8px;
                  background: linear-gradient(#00C6FB,#005BEA);
                  height: 16px;
                  border-radius: 7.5px;
                  line-height: 16px;
                }
              }
            }
            .line{
              width: 100%;
              height: calc(100% / 7 );
              position: relative;
              font-size:12px;
              &:nth-of-type(2n-1){
                background: @table;
              }
              .row{
                float: left;
                height: 100%;
                position: relative;
                span{
                  position: absolute;
                  left: 50%;
                  top:50%;
                  transform: translate(-50%,-50%)
                }
              }
              .row1{
                width:10%;
              }
              .row2{
                width:15%;
              }
              .row3{
                width:45%;
                span{
                  width: 100%;
                  text-align: center;
                  position: absolute;
                  left: 0%;
                  top:50%;
                  transform: translate(0%,-50%)
                }
              }
              .row4{
                width:30%;
              }
            }
          }
        }
        .box3{
          flex: 3;
          .content_container{
            width: 100%;
            display: block;
            box-sizing: border-box;
            height: calc(100% - 50px);
            margin:12px 0;
            padding:0 22px;
            .line{
              width: 100%;
              height: calc(100% / 5 );
              position: relative;
              font-size:12px;
              font-family:HiraginoSansGB-W3;
              color:@fontGray;
              .circle{
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #FF697E;
                position: absolute;
                left: 10px;
                top:50%;
                transform: translate(0%,-50%)
              }
              span{
                width: 100%;
                text-align: left;
                position: absolute;
                left: 30px;
                top:50%;
                transform: translate(0%,-50%)
              }
            }
          }
        }
      }
      .bottom{
        margin:8px 0;
        width: 100%;
        background: #f1f1f1;
        height: calc(54% - 16px);
        background: @blockBack;
        .echarts_container{
          display: block;
          box-sizing: border-box;
          height: calc(100% - 50px);
          margin: 12px 0;
          padding: 0 22px;
          .target1{
            float: left;
            width: 55%;
            height: 100%;
          }
          .middle{
            width:5%;
            float: left;
            height: 100%;
            background:url('/static/renmintjOther/icon_directing.png') no-repeat center center;
          }
          .target2{
            float: right;
            height: 100%;
            width: 40%;
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
          background: @fontWhite;
          display: inline-block;
          margin-left:10px;
          margin-right: 5px;
        }
        span{
          font-size:16px;
          font-family:HiraginoSansGB-W3;
          color:@fontWhite;
        }
        .topn{
          font-size:12px;
          font-family:HiraginoSansGB-W3;
          color:@fontGray;
        }
      }
    }
  }
}
</style>
