<template>
  <div class="insdetail_container">
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
      <sidenav></sidenav>
      <div class="nav">
        <span>首页 > 机构列表 > 详情 </span>
      </div>
      <div class="nav2 clearfix">
        <div class="navLeft">
          <span class="navspan">机构详情</span>
        </div>
        <div class="navRight">
          <span class="navbtn" :class="{active:timec==='jinNian'}" @click="timec='jinNian'">今年</span>
          <span class="navbtn" :class="{active:timec==='benYue'}" @click="timec='benYue'">本月</span>
        </div>
      </div>
      <div class="content_container">
        <div class="left">
          <div class="lTop">
            <div class="lTitle">
              <span>{{jigouXx.tiaoWeiHMZ}}</span>
            </div>
            <div class="lContent">
              <div class="position">
                <div class="line">
                  <label class="des">联系地址：</label>
                  <span class="content">{{jigouXx.lianXiDZ}}</span>
                </div>
                <div class="line">
                  <label class="des">联系电话：</label>
                  <span class="content">{{jigouXx.lianXiDH}}</span>
                </div>
                <div class="line">
                  <label class="des">机构类型：</label>
                  <span class="content">{{jigouXx.jiGouLX}}</span>
                </div>
                <div class="line">
                  <label class="des" v-show="jigouXx.jiGouLX!=='司法局'&&jigouXx.jiGouLX!=='司法所'">业务类型：</label>
                  <span v-for="(item,index) in jigouXx.yeWuLX" v-if="index<4" :key="index" class="btn">{{item.name}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="lBottom">
            <div style="padding-left:11px" class="title">
              <div class="border"></div>
              <span>调解员信息</span>
            </div>
            <div class="box">
              <div class="bLeft">
                <div class="rect">
                  <div class="border righttop"></div>
                  <div class="border lefttop"></div>
                  <div class="border rightbottom"></div>
                  <div class="border leftbottom"></div>
                  <span class="number">{{tiaoJieYSL}}</span>
                  <span class="numberT">调解员数量(人)</span>
                </div>
              </div>
              <div class="bRight target"></div>
            </div>
            <div class="box">
              <div class="bTitle">受理案件排名</div>
              <div class="line" v-for="(item,index) in shouLiAJRYPM" :key="index">
                <div class="lineCenter">
                  <div class="line_span">
                    <span class="span_name">{{item.name}}</span>
                    <span class="span_rate">{{item.labelValue}}</span>
                  </div>
                  <div class="line_rate">
                    <div class="line_rating" :style="{width:100*item.value+'%'}"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="rTop">
             <div class="box">
              <div class="l_container clearfix">
                <span class="span_title">受理纠纷量</span>
                <div class="span_content clearfix">
                  <span class="span1">{{shouLiJFSL|numFormat}}</span>
                  <span class="span2">件</span>
                </div>
              </div>
              <div class="border"></div>
            </div>
            <div class="box">
              <div class="l_container clearfix">
                <span class="span_title">调节成功率</span>
                <div class="span_content clearfix">
                  <span class="span1">{{tiaoJieCGL|rateFormat}}</span>
                </div>
              </div>
              <div class="border"></div>
            </div>
            <div class="box">
              <div class="l_container clearfix">
                <span class="span_title">调解赔付金额</span>
                <div class="span_content clearfix">
                  <span class="span1">{{$echarts.format.addCommas(parseInt(tiaoJiePFJE/10000))}}</span>
                  <span class="span2">万元</span>
                </div>
              </div>
              <div class="border"></div>
            </div>
            <div class="box">
              <div class="l_container clearfix">
                <span class="span_title">平均调解时长</span>
                <div class="span_content clearfix">
                  <span class="span1">{{shouLiJFSL|numFormat}}</span>
                  <span class="span2">时</span>
                </div>
              </div>
            </div>
          </div>
          <div class="rBottom">
            <div class="title">
              <div class="border"></div>
              <span>案件列表</span>
            </div>
            <div class="table_container">
              <div class="line table_head">
                <div class="row row1"><span>序号</span></div>
                <div class="row row2"><span>分类</span></div>
                <div class="row row3"><span>名称</span></div>
                <div class="row row4"><span>日期</span></div>
                <div class="row row5"><span>状态</span></div>
                <div class="row row6"><span>操作</span></div>
              </div>
              <div class="line table_body" v-for ="(item,index) in shouLiAJLB" :key="index">
                <div class="row row1">
                  <span v-if="item.xuHao<=3" class="circle" :class="'circle'+(item.xuHao)">{{item.xuHao}}</span>
                  <span v-if="item.xuHao>3" class="circle" :class="'circle4'">{{item.xuHao}}</span>
                </div>
                <div class="row row2"><span>{{item.fenLei}}</span></div>
                <div class="row row3"><span>{{item.mingChen}}</span></div>
                <div class="row row4"><span>{{item.riQi.slice(0,11)}}</span></div>
                <div class="row row5"><span>{{item.zhuangTai}}</span></div>
                <div class="row row6"><span class="detail" @click="changeRouter('eventDetail',item.id)">详情</span></div>
              </div>
            </div>
            <div class="page">
              <el-pagination class="ej-pagination" current-page.sync="0" :page-size="7"
                layout="prev, pager, next, total" @current-change="handleCurrentChange" :total="shouLiJFSL">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/util/httpUtil'
import urlConfig from '@/util/urlConfig'
import eosNew from '@/util/echartsOptionsNew'
import jsonUtil from '@/util/jsonUtil'

export default {
  data () {
    return {
      jigouXx: {
        jiGouLX: '',
        tiaoWeiHMZ: '',
        lianXiDH: '',
        lianXiDZ: '',
        zhaoPian: '',
        yeWuLX: []
      },
      pingJunTJSC: 0,
      shouLiJFSL: 0,
      tiaoJiePFJE: 0,
      tiaoJieCGL: 0,
      shouLiAJRYPM: [{
        name: '',
        labelValue: '',
        value: 0
      }, {
        name: '',
        labelValue: '',
        value: 0
      }, {
        name: '',
        labelValue: '',
        value: 0
      }],
      tiaoJieYSL: 0,
      shouLiAJLB: [],
      page: 1,
      myChart: {},
      timec: 'benYue'
    }
  },
  computed: {
    timeCom () {
      return jsonUtil.dateFormat(new Date(), 'yyyy/MM/dd hh:mm D')
    }
  },
  filters: {
    numFormat (num) {
      num = num || 0
      return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    },
    rateFormat (rate) {
      return parseInt(rate * 100) + '%'
    }
  },
  watch: {
    timec: function (to, from) {
      this.getData()
    }
  },
  methods: {
    handleCurrentChange (page) {
      this.page = page
      this.getList()
    },
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
    getData () {
      let _this = this
      let id = _this.$route.params.id || ''
      let type = this.$route.params.type
      let baseUrl = urlConfig.baseUrl
      let url = '/organizationDetails'
      http.get(baseUrl + url, {id: id, time: _this.timec, categoryType: type}, (res) => {
        _this.jigouXx.jiGouLX = res.jiGouLX
        _this.jigouXx.tiaoWeiHMZ = res.tiaoWeiHMZ
        _this.jigouXx.lianXiDH = res.lianXiDH
        _this.jigouXx.lianXiDZ = res.lianXiDZ
        _this.jigouXx.zhaoPian = res.zhaoPian
        _this.jigouXx.yeWuLX = res.yeWuLX
        _this.pingJunTJSC = res.pingJunTJSC
        _this.shouLiJFSL = res.shouLiJFSL
        _this.tiaoJiePFJE = res.tiaoJiePFJE
        _this.tiaoJieCGL = res.tiaoJieCGL
        _this.shouLiAJRYPM = res.shouLiAJRYPM
        _this.tiaoJieYSL = res.tiaoJieYSL
        let echartsData = [
          {value: res.zhuanZhiZB, name: '专职'},
          {value: res.jianZhiZB, name: '兼职'},
          {value: res.weiDengLZB, name: '未记录'}
        ]
        _this.draw('target', eosNew.setPie5(echartsData))
      })
    },
    getList () {
      let _this = this
      let id = _this.$route.params.id || ''
      let type = this.$route.params.type
      let baseUrl = urlConfig.baseUrl
      let url = '/organizationDetailsCaseList'
      http.get(baseUrl + url, {id: id, time: _this.timec, categoryType: type, pageNumber: _this.page, pageCapacity: 7}, (res) => {
        this.shouLiAJLB = res.pageData
      })
    }
  },
  mounted () {
    this.getData()
    this.getList()
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
.insdetail_container {
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
        font-size: @fontSamll;
        font-family: HiraginoSansGB-W3;
        color: @fontGray;
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
        // border-bottom:1px solid @fontGray;
        .navspan{
          font-size:14px;
          font-family:HiraginoSansGB-W3;
          color:@fontGray;
          display: inline-block;
          padding:0 2px 4px 2px;
          width: 6em;
          text-align: left;
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
      .navRight{
        float: right;
        .navbtn{
          font-size: @fontSamll;
          color: @fontGray;
          line-height: 25px;
          border-radius: 12.5px;
          height: 25px;
          padding:0 8px;
          cursor: pointer;
        }
        .active{
          background: #2E89FD;
          color:@fontWhite;
        }
      }
    }
    .content_container{
      height: calc(100% - 97px);
      margin-top:16px;
      margin-bottom:8px;
      width: 100%;
      box-sizing: border-box;
      padding:0 24px;
      position: relative;
      display: flex;
      .left{
        flex: 396;
        display: flex;
        flex-direction: column;
        .lTop{
          flex:257;
          background: #1B212D;
          box-sizing: border-box;
          padding:0 25px;
          position: relative;
          .lTitle{
            height: 40%;
            background: url('/static/renmintjNew/jigou.png') no-repeat left center;
            padding-left: 130px;
            position: relative;
            border-bottom: 1px dashed #D5D1D1;
            span{
              position: absolute;
              transform: translateY(-50%);
              top:50%;
              font-size: @fontMiddle;
              color:@fontWhite;
            }
          }
          .lContent{
            height: 60%;
            position: relative;
            width: 100%;
            .position{
              position: absolute;
              top:50%;
              transform: translateY(-50%);
              width: 100%;
            }
            .line{
              height: 30px;
              line-height: 30px;
              font-size: @fontSamll;
              position: relative;
              width: 100%;
              display: block;
              .des{
                color:@fontGray;
                margin-right: 2px;
                float: left;
              }
              .content{
                color:@fontWhite;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width:calc(100% - 99px);
                float: left;
                height: 30px;
              }
              .btn{
                height: 28px;
                line-height: 28px;
                margin-right: 5px;
                border:1px solid #27FF88;
                background: rgba(39,255,136,0.4);
                color:#27FF88;
                font-size: @fontSamll;
                padding:0 4px;
                border-radius: 4px;
              }
            }
          }
        }
        .lBottom{
          flex: 366;
          background: @blockBack;
          position: relative;
          .box{
            height: calc((100% - 51px)/2);
            position: relative;
            padding: 0 20px;
            .bLeft{
              width: 45%;
              float: left;
              height: 100%;
              position: relative;
              .rect{
                width: 63%;
                height: 44%;
                position: absolute;
                top:50%;
                left: 3px;
                transform: translate(0,-50%);
                background: #1B212D;
                .border{
                  width: 6px;
                  height: 6px;
                  border: 2px solid #5cb4ff;
                  position: absolute;
                }
                .righttop{
                  right: -3px;
                  top: -3px;
                  border-left: 0;
                  border-bottom: 0;
                }
                .lefttop{
                  left:-3px;
                  top:-3px;
                  border-right: 0;
                  border-bottom: 0;
                }
                .rightbottom{
                  right: -3px;
                  bottom: -3px;
                  border-left: 0;
                  border-top: 0;
                }
                .leftbottom{
                  left: -3px;
                  bottom: -3px;
                  border-right: 0;
                  border-top: 0;
                }
              }
            }
            .bRight{
              width: 55%;
              float: right;
              height: 100%;
            }
            .number{
              font-size: 26px;
              color:@fontWhite;
              position: absolute;
              bottom:40%;
              width: 100%;
              text-align: center;
            }
            .numberT{
              font-size: @fontSamll;
              color:@fontGray;
              position: absolute;
              top:62%;
              width: 100%;
              text-align: center;
            }
            .bTitle{
              height: 20px;
              font-size: @fontSamll;
              color:@fontWhite;
              line-height: 20px;
              text-align: left;
            }
            .line{
              height: calc((100% - 20px)/3);
              width: 100%;
              position: relative;
              .lineCenter{
                height: 26px;
                width: 100%;
                position: absolute;
                top: 50%;
                transform: translate(0,-50%);
              }
              .line_span{
                font-size:@fontSamll;
                height: 18px;
                line-height: 18px;
                .span_name{
                  color:@fontGray;
                  float: left;
                }
                .span_rate{
                  color:@fontWhite;
                  float: right;
                  transform: scale(0.9)
                }
              }
              .line_rate{
                height: 4px;
                margin:2px 0;
                background: #3C4A59;
                border-radius: 2px;
                .line_rating{
                  width: 0%;
                  transition: 0.6s linear;
                  height: 4px;
                  background: #0A96D7;
                  border-radius: 2px;
                }
              }
            }
          }
        }
      }
      .right{
        flex: 919;
        margin-left:8px;
        display: flex;
        flex-direction: column;
        .rTop{
          flex:173;
          background: @blockBack;
          display: flex;
          .box{
            flex: 1;
            position: relative;
            .l_container{
              position: absolute;
              height: 56px;
              left: 50%;
              top: 50%;
              transform: translate(-50%,-50%);
              .span_title{
                display: block;
                height: 24px;
                line-height: 24px;
                font-size:@fontSamll;
                color:@fontGray;
              }
              .span_content{
                display: block;
                height: 32px;
                .span1{
                  height: 32px;
                  float: left;
                  font-size:27px;
                  font-family:'Impact';
                  color:@fontWhite;
                }
                .span2{
                  height: 16px;
                  float: left;
                  margin:12px 0 0 12px;
                  font-size:@fontSamll;
                  font-family:HiraginoSansGB-W3;
                  color:@fontGray;
                }
              }
              .span3{
                position: absolute;
                bottom:-22px;
                left: 0;
                font-size:@fontSamll;
                font-family:HiraginoSansGB-W3;
                color:@fontGray;
                width: 200px;
                transform-origin: left;
                transform:scale(0.9);
              }
            }
            .border{
              width: 1px;
              height: 33%;
              background: #F1F1F1;
              position: absolute;
              top: 50%;
              right: 1px;
              transform: translate(0,-50%);
            }
          }
        }
        .rBottom{
          flex: 438;
          background: @blockBack;
          margin-top:8px;
          .table_container{
            width: 100%;
            height: calc(100% - 112px);
            .table_head{
              color:@fontGray;
              height: calc(100% / 8 );
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
              }
              .row6{
                span{
                  background: #F59B5B;
                  padding:0 8px;
                  border-radius: 12px;
                  cursor: pointer;
                }
              }
            }
            .line{
              width: 100%;
              height: calc(100% / 8 );
              position: relative;
              font-size:@fontSamll;
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
                  transform: translate(-50%,-50%);
                }
              }
              .row1{
                width:10%;
              }
              .row2{
                width:20%;
                span{
                  width: 100%;
                  text-align: center;
                }
              }
              .row3{
                width:35%;
                span{
                  width: 100%;
                  text-align: center;
                }
              }
              .row4{
                width:10%;
                span{
                  width: 100%;
                  text-align: center;
                }
              }
              .row5{
                width:15%;
              }
              .row6{
                width:10%;
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
      .title{
        display: block;
        box-sizing: border-box;
        padding:15px 0;
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
      }
      .conCenter{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    }
  }
}
</style>
