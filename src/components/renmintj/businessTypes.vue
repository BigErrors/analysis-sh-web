<template>
  <div class="busiTypes_container">
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
        <span>首页 > 业务类型</span>
      </div>
      <div class="nav2 clearfix">
        <div class="navLeft">
          <span class="navspan" :class="{'active':tjtype==='行专调解'?true:false}" @click="tjtype='行专调解'">行专调解</span>
          <span class="navspan" :class="{'active':tjtype==='一般调解'?true:false}" @click="tjtype='一般调解'">一般调解</span>
        </div>
        <div class="navRight">
          <div class="cas_container">
            <span class="cas_container_span">类型：</span>
            <el-cascader
              class="cascader"
              :options="type"
              placeholder="类型"
              v-model="selectDefault['typeDefault']"
            ></el-cascader>
          </div>
          <div class="cas_container" style="margin-right: 25px;">
            <span class="cas_container_span">区域：</span>
            <el-cascader
              class="cascader"
              :options="area"
              placeholder="区域"
              v-model="selectDefault['areaDefault']"
            ></el-cascader>
          </div>
        </div>
      </div>
      <div class="content_container">
        <div class="left">
          <div class="top">
            <div class="title clearfix" style="z-index:2">
              <div class="right_btn" :class="{'active':target1==='type3'?true:false}" @click="target1='type3'">本周</div>
              <div class="right_btn" :class="{'active':target1==='type2'?true:false}" @click="target1='type2'">本月</div>
              <div class="right_btn" :class="{'active':target1==='type1'?true:false}" @click="target1='type1'">今年</div>
            </div>
            <div class="contentLT">
              <span class="span1">{{xingZhuanTJS}}</span>
              <span class="span2">{{tjtype+'数'}}</span>
            </div>
            <div class="border"></div>
            <div class="contentLB">
              <span class="span1">{{tiaoJieAJS}}</span>
              <span class="span2">调解案件总数</span>
            </div>
            <div class="contentR target1"></div>
          </div>
          <div class="bottom">
            <div class="title">
              <div class="border"></div>
              <span>案件受理数(TOP5)</span>
              <div class="right_btn" :class="{'active':target3==='type2'?true:false}" @click="target3='type2'">调解员</div>
              <div class="right_btn" :class="{'active':target3==='type1'?true:false}" @click="target3='type1'">机构</div>
            </div>
            <div class="table_container">
              <div class="t_head">
                <div class="row row1">排名</div>
                <div class="row row2">名称</div>
                <div class="row row3">受理数量</div>
              </div>
              <div class="t_body">
                <div class="line" v-for="(item, index) in anJianSLSBG" :key="index" @click="changeRouter(target3==='type1'?'institutionPortrait':'peoplePortrait',item.id)">
                  <div class="row row1">
                    <span v-if="index>2">{{index+1}}</span>
                    <img class="img"  v-if ="index===0" src='/static/renmintj/jingpai.png' />
                    <img class="img"  v-if ="index===1" src='/static/renmintj/yinpai.png' />
                    <img class="img"  v-if ="index===2" src='/static/renmintj/tongpai.png' />
                  </div>
                  <div class="row row2"><span>{{item.name}}</span></div>
                  <div class="row row3"><span>{{item.value}}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <div class="title">
              <div class="border"></div>
              <span>当事人分析</span>
              <div class="right_btn" :class="{'active':target8==='type2'?true:false}" @click="target8='type2'">被申请人</div>
              <div class="right_btn" :class="{'active':target8==='type1'?true:false}" @click="target8='type1'">申请人</div>
            </div>
            <div class="contentT">
              <div class="contentTL">
                <div class="boy">{{man + '%'}}</div>
                <div class="cBorder"></div>
                <div class="girl">{{woman + '%'}}</div>
              </div>
              <div class="contentTR target81"></div>
            </div>
            <div class="contentTitle">年龄分布</div>
            <div class="echarts_container target82"></div>
          </div>
          <div class="bottom">
            <div class="title">
              <div class="border"></div>
              <span>案件数量变化</span>
              <div class="right_btn" :class="{'active':target2==='type2'?true:false}" @click="target2='type2'">按月</div>
              <div class="right_btn" :class="{'active':target2==='type1'?true:false}" @click="target2='type1'">按年</div>
            </div>
            <div class="con target2"></div>
          </div>
        </div>
        <div class="right right2">
          <div class="top">
            <div class="title">
              <div class="border"></div>
              <span>赔偿金额</span>
            </div>
            <div class="contentT">
              <div class="sLeft">
                <span class="span1">本年度累计</span>
                <span class="span2">{{total}}</span>
                <span class="span3">万元</span>
              </div>
              <div class="sBorder"></div>
              <div class="sRight">
                <div class="once">
                  <span class="span1">单笔最大</span>
                  <span class="span2">{{max}}</span>
                  <span class="span3">万元</span>
                </div>
                <div class="once">
                  <span class="span1">平均每笔</span>
                  <span class="span2">{{avg}}</span>
                  <span class="span3">万元</span>
                </div>
              </div>
            </div>
            <div class="contentTitle">赔偿金额变化</div>
            <div class="echarts_container target9"></div>
          </div>
          <div class="bottom">
            <div class="title">
              <div class="border"></div>
              <span>案件类型</span>
            </div>
            <div class="con target4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eos from '@/util/echartsOptions'
import urlConfig from '@/util/urlConfig'
import http from '@/util/httpUtil'
import json from '@/util/dictionaryMapping'
import eosNew from '@/util/echartsOptionsNew'
import jsonUtil from '@/util/jsonUtil'

export default {
  data: function () {
    return {
      myChart: {},
      target1: 'type1',
      target2: 'type2',
      target3: 'type1',
      target8: 'type1',
      table: {
        dLength: 0,
        lineNum: 0,
        data: []
      },
      tjtype: '行专调解',
      area: json.area,
      selectDefault: {
        areaDefault: ['SHJCK01000'],
        typeDefault: ['民事']
      },
      xingZhuanTJS: 0,
      tiaoJieAJS: 0,
      anJianSLBH: {
        year_casenumber: [],
        yueAnJSLBH: []
      },
      anJianSLS: {
        tiaoJieYAJSLS: [],
        jiGouAJSLS: []
      },
      anJianSLSBG: [],
      anJianLX: [],
      woman: 0,
      man: 0,
      total: 0,
      max: 0,
      avg: 0
    }
  },
  computed: {
    timeCom () {
      return jsonUtil.dateFormat(new Date(), 'yyyy/MM/dd hh:mm D')
    },
    type () {
      if (this.tjtype === '行专调解') {
        return json.caseType
      } else {
        return json.commonCaseType
      }
    }
  },
  watch: {
    target1: function (newValue, oldValue) {
      switch (newValue) {
        case 'type1':
          newValue = 'nian'
          break
        case 'type2':
          newValue = 'yue'
          break
        case 'type3':
          newValue = 'zhou'
          break
      }
      this.xingZhuanTJS = this.shuZhiTJ[newValue + 'HangZTJS']
      this.tiaoJieAJS = this.shuZhiTJ[newValue + 'TiaoJAJZS']
      this.draw('target1', eosNew.setPie3([(this.shuZhiTJ[newValue + 'ZhanB'] * 100).toFixed(1), ((1 - this.shuZhiTJ[newValue + 'ZhanB']) * 100).toFixed(1)], '占比'))
    },
    target2: function (newValue, oldValue) {
      if (newValue === 'type1') {
        newValue = 'nian'
      } else {
        newValue = 'yue'
      }
      this.draw('target2', eos.setLine2(this.anJianSLBH[newValue + 'AnJSLBH']))
    },
    target3: function (newValue, oldValue) {
      if (newValue === 'type1') {
        newValue = 'jiGou'
      } else {
        newValue = 'tiaoJieY'
      }
      this.anJianSLSBG = this.anJianSLS[newValue + 'AJSLS']
    },
    target8: function (newValue, oldValue) {
      if (newValue === 'type1') {
        newValue = 'shenQingRFX'
      } else {
        newValue = 'beiShenQRFX'
      }
      this.man = this.formatData(this.dangShiRFX[newValue].nanXingZB)
      this.woman = this.formatData(this.dangShiRFX[newValue].nvXingZB)
      this.draw('target81', eos.setPie6([{name: '本地户口', value: this.formatData(this.dangShiRFX[newValue].benDiHJ)}, {name: '外地户口', value: this.formatData(this.dangShiRFX[newValue].waiDiHJ)}], 'percent', false, ['rgba(0, 236, 246, 1)', '#383E4E']))
      let nianLingFB = this.dangShiRFX[newValue].nianLingFB
      this.draw('target82', eosNew.setBar5(nianLingFB, ['#2D65DD', '#2D65DD'], 'vertical', 'integer', 32, false, false))
    },
    tjtype: function (newValue, oldValue) {
      this.selectDefault.areaDefault = ['SHJCK01000']
      this.selectDefault.typeDefault = ['民事']
    },
    selectDefault: {
      handler: function (newValue, oldValue) {
        this.getData()
      },
      deep: true
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
    changeRouter (name, id) {
      let target = {name: name}
      if (name === 'peoplePortrait' || name === 'institutionPortrait') {
        target = {name: name, params: { id: id }}
      }
      this.$router.push(target)
    },
    formatData (data) {
      return (data * 100).toFixed(1)
    },
    getData () {
      let vue = this
      let baseUrl = urlConfig.baseUrl
      let url = '/categoryAnalysis'
      let param = { area: this.selectDefault.areaDefault[0], type: this.selectDefault.typeDefault[0], tjtype: this.tjtype }
      http.get(baseUrl + url, param, (data) => {
        vue.shuZhiTJ = data.shuZhiTJ
        vue.xingZhuanTJS = vue.shuZhiTJ.nianHangZTJS
        vue.tiaoJieAJS = vue.shuZhiTJ.nianTiaoJAJZS
        vue.anJianSLBH.nianAnJSLBH = data.anJianSLBH.nianAnJSLBH
        vue.anJianSLBH.yueAnJSLBH = data.anJianSLBH.yueAnJSLBH
        vue.anJianSLS.jiGouAJSLS = data.anJianSLS.jiGouAJSLS || []
        vue.anJianSLS.tiaoJieYAJSLS = data.anJianSLS.tiaoJieYAJSLS || []
        vue.anJianSLSBG = vue.anJianSLS.jiGouAJSLS
        vue.dangShiRFX = data.dangShiRFX
        vue.man = vue.formatData(data.dangShiRFX.shenQingRFX.nanXingZB)
        vue.woman = vue.formatData(data.dangShiRFX.shenQingRFX.nvXingZB)
        vue.total = data.peiChangJE.benNianDLJ
        vue.max = data.peiChangJE.danBiZD
        vue.avg = data.peiChangJE.pingJunMB
        vue.$nextTick(function () {
          vue.target1 = 'type1'
          vue.target2 = 'type2'
          vue.target3 = 'type1'
          vue.target8 = 'type1'
          vue.draw('target1', eosNew.setPie3([vue.formatData(vue.shuZhiTJ.nianZhanB), vue.formatData(1 - vue.shuZhiTJ.nianZhanB)], '占比'))
          vue.draw('target2', eos.setLine2(vue.anJianSLBH.yueAnJSLBH))
          vue.draw('target4', eos.setPie3(data.anJianLX, 'radius'))
          vue.draw('target81', eos.setPie6([{name: '本地户口', value: vue.formatData(data.dangShiRFX.shenQingRFX.benDiHJ)}, {name: '外地户口', value: vue.formatData(data.dangShiRFX.shenQingRFX.waiDiHJ)}], 'percent', false, ['rgba(0, 236, 246, 1)', '#383E4E']))
          let nianLingFB = data.dangShiRFX.shenQingRFX.nianLingFB
          vue.draw('target82', eosNew.setBar5(nianLingFB, ['#2D65DD', '#2D65DD'], 'vertical', 'integer', 32, false, false))
          vue.draw('target9', eosNew.setBar5(data.peiChangJE.peiChangJEBH, ['#2D65DD', '#2D65DD'], 'vertical', 'integer', 32, false, false))
        })
      })
    }
  },
  created () {
    this.getData()
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
.busiTypes_container{
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
      .navRight{
        float: right;
        .cas_container{
          float: right;
          .cas_container_span{
            font-size:@fontSamll;
            font-family:HiraginoSansGB-W3;
            color:@fontGray;
          }
        }
      }
    }
    .content_container{
      height: calc(100% - 104px);
      margin-top: 16px;
      padding: 0 24px;
      display: flex;
      .left{
        flex:0.26;
        .top{
          height: 31%;
          display: block;
          background: @blockBack;
          position: relative;
          .contentLT{
            position: absolute;
            width: 60%;
            height: 50%;
            top: 0;
            left: 0;
            .span1{
              position: absolute;
              left: 25px;
              top: 100%;
              -webkit-transform: translate(0,-120%);
              transform: translate(0,-120%);
              font-size: 20px;
              font-family: 'FZLTZHK--GBK1-0';
              color: rgba(241,241,241,1);
              width: 33%;
              text-align: center;
            }
            .span2{
              position: absolute;
              left: 50%;
              top: 100%;
              -webkit-transform: translate(0,-130%);
              transform: translate(0,-130%);
              font-size: 17px;
              font-family: HiraginoSansGB-W3;
              color: rgba(241,241,241,0.8);
              width: 51%;
              text-align: center;
            }
          }
          .border{
            position: absolute;
            width: 20%;
            height: 1px;
            background: @fontGray;
            left: 25px;
            top: 50%;
            opacity: 0.3;
          }
          .contentLB{
            position: absolute;
            width: 60%;
            height: 50%;
            bottom: 0;
            left: 0;
            .span1{
              position: absolute;
              left: 25px;
              top: 0%;
              -webkit-transform: translate(0,20%);
              transform: translate(0,20%);
              font-size: 20px;
              font-family: 'FZLTZHK--GBK1-0';
              color:@fontGray;
              opacity: 0.3;
              width: 33%;
              text-align: center;
            }
            .span2{
              position: absolute;
              left: 50%;
              top: 0%;
              -webkit-transform: translate(0,20%);
              transform: translate(0,20%);
              font-size: 17px;
              font-family: 'FZLTZHK--GBK1-0';
              color:@fontGray;
              opacity: 0.3;
              width: 51%;
              text-align: center;
            }
          }
          .contentR{
            position: absolute;
            right: 0px;
            top: 0px;
            width: 40%;
            height: 100%;
          }
        }
        .bottom{
          height: calc(69% - 16px);
          margin:8px 0;
          display: block;
          position: relative;
          background: @blockBack;
          .table_container{
            height: calc(100% - 52px);
            margin-top:26px;
            width: 100%;
            box-sizing: border-box;
            padding:0 24px;
            .t_head{
              height: 24px;
              width: 100%;
              background: @table;
              .row{
                color: @fontGray;
              }
            }
            .row{
              line-height: 24px;
              font-size:12px;
              font-family:HiraginoSansGB-W3;
              color:@fontWhite;
              float: left;
              text-align: center;
              box-sizing: border-box;
              position: relative;
            }
            .row1{
              width: 10%;
            }
            .row2{
              width: 70%;
              span{
                width: 100%;
                transform: translate(-50%,-50%)!important;
                left: 50%!important;
              }
            }
            .row3{
              width: 20%;
            }
            .t_body{
              height: calc(100% - 24px);
              position: relative;
              display: block;
              .line{
                height: 20%;
                display: block;
                position:relative;
                &:nth-of-type(2n){
                  background: @table;
                }
                &:hover{
                  cursor: pointer;
                  background: @tableHover;
                }
                .row{
                  float: left;
                  height: 100%;
                  box-sizing: border-box;
                  text-align: center;
                  position: relative;
                  span{
                    position: absolute;
                    left: 50%;
                    top:50%;
                    transform: translate(-50%,-50%);
                    font-size: 12px;
                  }
                }
                .img{
                  position: absolute;
                  left: 50%;
                  top:50%;
                  transform: translate(-50%,-50%);
                  font-size: @fontSamll;
                }
              }
            }
          }
        }
      }
      .right{
        flex: 0.37;
        margin:0 8px;
        .top{
          height: 58%;
          display: block;
          background: @blockBack;
          .contentT{
            margin-top: 20px;
            height: 99px;
            display: block;
            background: #1B212D;
            position: relative;
            .contentTL{
              width: 55%;
              height: 100%;
              float: left;
              position: relative;
              .boy{
                position: absolute;
                width: 50%;
                height: 100%;
                left: 0;
                background-image: url('/static/renmintj/bunan.png');
                background-repeat: no-repeat;
                background-position: right 80px center;
                font-size:@fontMiddle;
                font-family:HiraginoSansGB-W3;
                color:rgba(241,241,241,1);
                text-align: right;
                padding-right: 20px;
                box-sizing: border-box;
                line-height: 99px;
              }
              .cBorder{
                width: 1px;
                height: 30%;
                position: absolute;
                background: transparent;
                border-left: 1px dashed #2a2f3d;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
              }
              .girl{
                position: absolute;
                width: 50%;
                height: 100%;
                right: 0;
                background-image: url('/static/renmintj/bunv.png');
                background-repeat: no-repeat;
                background-position: left 20px center;
                font-size:@fontMiddle;
                font-family:HiraginoSansGB-W3;
                color:rgba(241,241,241,1);
                padding-left: 65px;
                box-sizing: border-box;
                line-height: 99px;
              }
            }
            .contentTR{
              width: 45%;
              height: 100%;
              float: right;
            }
          }
          .contentTitle{
            font-size:@fontSamll;
            height: 24px;
            display: block;
            margin-left: 20px;
            color:rgba(241,241,241,1);
            line-height:29px;
            line-height: 24px;
          }
          .echarts_container{
            height: calc(100% - 169px);
            display: block;
          }
        }
        .bottom{
          height: calc(42% - 16px);
          margin:8px 0;
          display: block;
          background: @blockBack;
          .con{
            height: calc(100% - 26px);
            display: block;
          }
        }
      }
      .right2{
        margin: 0;
        .sLeft{
          width: 40%;
          height: 100%;
          position: absolute;
          left:0;
          top:0;
          .span1{
            font-size:@fontSamll;
            font-family:HiraginoSansGB-W3;
            color:@fontGray;
            display: block;
            margin:18px 0 10px 22px;
          }
          .span2{
            font-size:33px;
            font-family:HiraginoSansGB-W3;
            color:@fontWhite;
            display: inline-block;
            margin-left: 22px;
          }
          .span3{
            font-size:@fontSamll;
            font-family:HiraginoSansGB-W3;
            color:@fontGray;
          }
        }
        .sBorder{
          width: 1px;
          height: 30%;
          position: absolute;
          background: transparent;
          border-left: 1px dashed #2a2f3d;
          left: 40%;
          top: 50%;
          transform: translate(-50%,-50%);
        }
        .sRight{
          height: 100%;
          width:60%;
          position: absolute;
          right: 0;
          top: 0;
          .once{
            width: 50%;
            height: 100%;
            float: left;
            .span1{
              font-size:@fontSamll;
              font-family:HiraginoSansGB-W3;
              color:@fontGray;
              display: block;
              margin:30px 0 14px 35px;
            }
            .span2{
              font-size:18px;
              font-family:HiraginoSansGB-W3;
              color:@fontWhite;
              display: inline-block;
              margin-left:35px;
            }
            .span3{
              font-size:@fontSamll;
              font-family:HiraginoSansGB-W3;
              color:@fontGray;
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
        .right_btn{
          padding:0 8px;
          height:21px;
          float: right;
          border-radius: 10px;
          font-size: @fontSamll;
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
    }
  }
}
</style>
