<template>
  <div class="peopleNum_container">
    <div class="head clearfix">
      <div class="title">司法大数据服务应用系统</div>
      <div class="left">
        <div class="back" @click="changeRouter('index4renmintj')"></div>
      </div>
      <div class="right">
        <time-clock></time-clock>
      </div>
    </div>
    <div class="body">
      <sidenav></sidenav>
      <div class="nav">
        <span>首页 > 人员列表</span>
      </div>
      <div class="nav2 clearfix">
        <div class="navLeft">
          <span class="navspan active" @click="changeRouter('peopleNum')">数量分析</span>
          <span class="navspan" @click="changeRouter('peopleType')">属性分析</span>
          <span class="navspan" @click="changeRouter('peopleRanking')">排名分析</span>
        </div>
      </div>
      <div class="content_container">
        <div class="top">
          <div class="box">
            <div class="title">
              <div class="border"></div>
              <span>调解员人数变化趋势</span>
            </div>
            <div class="container target1"></div>
          </div>
          <div class="box">
            <div class="title">
              <div class="border"></div>
              <span>历年新增人员趋势</span>
            </div>
            <div class="container target2"></div>
          </div>
        </div>
        <div class="bottom">
          <div class="box">
            <div class="title">
              <div class="border"></div>
              <span>各区调解员人数</span>
            </div>
            <div class="container target3"></div>
          </div>
          <div class="box">
            <div class="title">
              <div class="border"></div>
              <span>各区新增调解员</span>
            </div>
            <div class="container target4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eosNew from '@/util/echartsOptionsNew'
import http from '@/util/httpUtil'
import urlConfig from '@/util/urlConfig'

export default {
  name: 'peopleNum',
  data () {
    return {
      myChart: {},
      totalPeople: 0 + '人',
      newPeople: 0 + '人'
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
    changeRouter (name) {
      this.$router.push({name: name})
    },
    getData () {
      let vue = this
      let reqParam = {}
      let baseUrl = urlConfig.baseUrl
      let url = ''
      url = '/quantityAnalysis'
      http.get(baseUrl + url, reqParam, (data) => {
        data['n_tjy'] = data['n_tjy'].map(item => { return { name: item['shijian'], value: item['shuzhi'] } })
        data['nnew_tjy'] = data['nnew_tjy'].map(item => { return { name: item['shijian'], value: item['shuzhi'] } })
        data['n_locationtjy'] = data['n_locationtjy'].map(item => { return { name: item['mingcheng'], value: item['shuzhi'] } })
        data['new_locationtiy'] = data['new_locationtiy'].map(item => { return { name: item['mingcheng'], value: item['shuzhi'] } })
        vue.totalPeople = data['n_tjy'][data['n_tjy'].length - 1].value
        vue.newPeople = data['nnew_tjy'][data['nnew_tjy'].length - 1].value
        vue.$nextTick(function () {
          vue.draw('target1', eosNew.setLine3([data['n_tjy']], 'integer'))
          vue.draw('target2', eosNew.setLine3([data['nnew_tjy']], 'integer'))
          vue.draw('target3', eosNew.setBar3(data['n_locationtjy'].reverse(), ['#2E89FD', '#B6CDFF'], 'horizon', 'integer'))
          vue.draw('target4', eosNew.setBar3(data['new_locationtiy'].reverse(), ['#00CDAC', '#8DDAD5'], 'horizon', 'integer'))
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
        vue.myChart['target1'].resize()
        vue.myChart['target2'].resize()
        vue.myChart['target3'].resize()
        vue.myChart['target4'].resize()
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
@fontBig:20px;
.peopleNum_container{
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
    border-top:14px solid #0B131C;
    .title{
      position: absolute;
      top: 17px;
      font-size:@fontBig;
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
      .top{
        display: flex;
        height: 40%;
        width: 100%;
      }
      .bottom{
        display: flex;
        height: 58%;
        width: 100%;
        transform: translateY(2%)
      }
      .box{
        flex: 1;
        height: 100%;
        margin:0 5px;
        background: @blockBack;
        .container{
          width: 100%;
          height: calc(100% - 26px);
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
        .sort{
          font-size:12px;
          font-family:MicrosoftYaHei;
          color:rgba(153,153,153,1);
          height: 21px;
          float: right;
          line-height: 21px;
          padding-left:24px;
          margin-right: 24px;
          background-image: url('/static/renmintj/icon_shang.png');
          background-position: left center;
          background-repeat: no-repeat;
          background-size: 16px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
