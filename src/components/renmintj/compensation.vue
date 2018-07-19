<template>
  <div class="compensation_container">
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
        <span>首页 > 赔偿金额</span>
      </div>
      <div class="nav2 clearfix">
        <div class="navLeft">
          <span class="navspan active">赔偿金额分析</span>
        </div>
      </div>
      <div class="container">
        <div class="left">
          <div class="top">
            <div class="blocks1">
              <span class="span1"><span class="spans">本月赔偿金额数</span></span>
              <span class="span2">{{$echarts.format.addCommas((thismouthmoeny/10000).toFixed(0))}}</span>
              <span class="span3">万元</span>
            </div>
            <div class="blocks2">
              <span class="span1"><span class="spans">本年度赔偿金额数</span></span>
              <span class="span2">{{$echarts.format.addCommas((allmoeny/10000).toFixed(0))}}</span>
              <span class="span3">万元</span>
            </div>
            <div class="blocks2">
              <span class="span1"><span class="spans">本年度赔偿案件数</span></span>
              <span class="span2">{{$echarts.format.addCommas(allcase)}}</span>
              <span class="span3">件</span>
            </div>
          </div>
          <div class="bottom">
            <div class="title">
              <div class="border"></div>
              <span>赔偿金额排名（TOP5）</span>
            </div>
            <div class="content_container">
              <div class="choose">
                <div class="left">
                  <span class="btn" :class="{active:freq==='year'}" @click="freq='year'">本年</span>
                  <span class="btn" :class="{active:freq==='mouth'}" @click="freq='mouth'">本月</span>
                </div>
                <div class="right">
                  <el-cascader
                    class="cascader"
                    style="z-index:1;height:28px;line-height:28px;font-size:12px;width:120px;border:1px solid #C5C5C5;border-radius:2px"
                    :options="area"
                    placeholder="区域"
                    v-model="areaDefault"
                  ></el-cascader>
                </div>
              </div>
              <div class="table">
                <div class="table_head">
                  <div class="row row1"><span>排名</span></div>
                  <div class="row row2"><span>名称</span></div>
                  <div class="row row3"><span>金额数量(万元)</span></div>
                </div>
                <div class="table_body">
                  <div v-for="(item,index) in top5" :key="index" class="line">
                    <div class="row row1">
                      <span v-if="index>2">{{index+1}}</span>
                      <img class="img"  v-if ="index===0" src='/static/renmintj/jingpai.png' />
                      <img class="img"  v-if ="index===1" src='/static/renmintj/yinpai.png' />
                      <img class="img"  v-if ="index===2" src='/static/renmintj/tongpai.png' />
                    </div>
                    <div class="row row2"><span>{{item.name}}</span></div>
                    <div class="row row3"><span>{{parseInt(item.values/10000)}}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="title">
            <div class="border"></div>
            <span>本年度纠纷类型与赔偿金额</span>
          </div>
          <div class="echarts_container target1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/util/httpUtil'
import urlConfig from '@/util/urlConfig'
import eosNew from '@/util/echartsOptionsNew'
export default {
  data () {
    return {
      time: new Date(),
      area: [{label: '区局', value: 'tiaojiej'}, {label: '调委会', value: 'tiaojiewyh'}, {label: '司法所', value: 'tiaojies'}],
      areaDefault: ['tiaojiej'],
      freq: 'year',
      thismouthmoeny: 0,
      allmoeny: 0,
      allcase: 0,
      top5: []
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
    areaDefault (to, from) {
      this.getData()
    },
    freq (to, from) {
      this.getData()
    }
  },
  methods: {
    getData () {
      let baseUrl = urlConfig.baseUrl
      let url = '/caseMoeny'
      let param = {label: this.areaDefault[0], freq: this.freq}
      let _this = this
      http.post(baseUrl + url, param, (data) => {
        this.allmoeny = data.allmoeny
        this.thismouthmoeny = data.thismouthmoeny
        this.allcase = data.allcase
        this.top5 = data.top5
        this.$echarts.init(document.getElementsByClassName('target1')[0]).setOption(eosNew.setTreemap(_this, data.tree))
      }, 'application/json')
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
@blockBack:#171c26;
@table:#131821;
@table2:rgba(40,45,58,0.3);
@fontWhite:#f1f1f1;
@fontGray:rgba(241,241,241,0.4);
.compensation_container{
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
      height: calc(100% - 93px);
      margin-top: 16px;
      margin-bottom: 8px;
      padding: 0 24px;
      box-sizing: border-box;
      display: flex;
      .left{
        flex: 1;
        .top{
          height: 36%;
          width: 100%;
          background: @blockBack;
          .blocks1{
            height: 50%;
            width: 100%;
            position: relative;
            .span1{
              height: 40%;
              width: 100%;
              display: block;
              position: relative;
              .spans{
                position: absolute;
                bottom:10px;
                left:20px;
                color:@fontGray;
                font-size: 12px;
              }
            }
            .span2{
              display: inline-block;
              font-size: 33px;
              padding-left:20px;
              color:@fontWhite;
            }
            .span3{
              display: inline-block;
              font-size: 12px;
              color:@fontGray;
              padding-left: 10px;
            }
          }
          .blocks2{
            height: 50%;
            width:50%;
            float: left;
            .span1{
              height: 25%;
              width: 100%;
              display: block;
              position: relative;
              .spans{
                position: absolute;
                bottom:10px;
                left:20px;
                color:@fontGray;
                font-size: 12px;
              }
            }
            .span2{
              display: inline-block;
              font-size: 18px;
              padding-left:20px;
              color:@fontWhite;
            }
            .span3{
              display: inline-block;
              font-size: 12px;
              color:@fontGray;
              padding-left: 10px;
            }
          }
        }
        .bottom{
          height: calc(64% - 8px);
          margin-top:8px;
          width: 100%;
          background: @blockBack;
          position: relative;
          .content_container{
            width: 100%;
            height: calc(100% - 26px);
            box-sizing: border-box;
            padding:0 14px;
            position: relative;
            .choose{
              height: 28px;
              width: 100%;
              padding:18px 0;
              .left{
                float: left;
                border:1px solid @fontGray;
                border-radius: 2px;
                .btn{
                  display: inline-block;
                  padding:1px 6px;
                  color:@fontWhite;
                  font-size:12px;
                  height: 24px;
                  line-height: 24px;
                  cursor: pointer;
                  border-radius: 2px;
                  &:nth-child(1){
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                  }
                  &:nth-child(1){
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                  }
                }
                .active{
                  background: #4D84FE;
                }
              }
              .right{
                float:right;
              }
            }
            .table{
              height: calc(100% - 64px);
              box-sizing: border-box;
              padding-bottom: 10px;
              position: relative;
              .table_head{
                height: 24px;
                color:@fontGray;
                font-size:12px;
              }
              .table_body{
                height: calc(100% - 24px);
                display: block;
                position: relative;
                font-size: 12px;
                color:@fontWhite;
                .line{
                  height: 20%;
                }
              }
              .row{
                float: left;
                height: 100%;
                text-align: center;
                position: relative;
                span{
                  width: 100%;
                  position: absolute;
                  left: 0;
                  top:50%;
                  transform: translateY(-50%);
                }
                .img{
                  position: absolute;
                  left: 50%;
                  top:50%;
                  transform: translate(-50%,-50%);
                  font-size: 12px;
                }
              }
              .row1{
                width: 15%;
              }
              .row2{
                width:55%;
              }
              .row3{
                width:30%;
              }
            }
          }
        }
      }
      .right{
        flex: 3;
        margin-left: 8px;
        background: @blockBack;
        position: relative;
        .echarts_container{
          height: calc(100% - 26px);
          width: 100%;
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
