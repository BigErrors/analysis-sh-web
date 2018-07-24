<template>
  <div class="peopleType_container">
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
        <span>首页 > 人员列表</span>
      </div>
      <div class="nav2 clearfix">
        <div class="navLeft">
          <span class="navspan" @click="changeRouter('peopleNum')">数量分析</span>
          <span class="navspan active" @click="changeRouter('peopleType')">属性分析</span>
          <span class="navspan" @click="changeRouter('peopleRanking')">排名分析</span>
        </div>
      </div>
      <div class="content_container">
        <div class="top">
          <div class="box">
            <div class="title">
              <div class="border"></div>
              <span>学历类型</span>
            </div>
            <div class="container target1"></div>
          </div>
          <div class="box">
            <div class="title">
              <div class="border"></div>
              <span>政治面貌</span>
            </div>
            <div class="container target2"></div>
          </div>
          <div class="box">
            <div class="title">
              <div class="border"></div>
              <span>年龄段</span>
            </div>
            <div class="container target3"></div>
          </div>
        </div>
        <div class="bottom">
          <div class="box">
            <div class="title">
              <div class="border"></div>
              <span>本科及以上学历占比排名（区局）</span>
            </div>
            <div class="container">
              <table class='table' cellspacing='0'>
                <thead class="thead">
                <tr>
                  <td width="15%" class='td'>排名</td>
                  <td width="60%" class='td'>名称</td>
                  <td width="25%" class='td'>占比</td>
                </tr>
                </thead>
                <tbody class="tbody">
                <tr v-for="(item,index) in benkejysxlzbpm" :key="index" v-if="index<=4">
                  <td class='td'><span class="circle" :class="'circle'+(index+1)">{{index+1}}</span></td>
                  <td class='td'>{{item.mingcheng}}</td>
                  <td class='td'>{{item.zhanbi|numFormat}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="box">
            <div class="title">
              <div class="border"></div>
              <span>党员占比排名（区局）</span>
              <!-- <label class="sort">顺序</label> -->
            </div>
            <div class="container">
              <table class='table' cellspacing='0'>
                <thead class="thead">
                <tr>
                  <td width="15%" class='td'>排名</td>
                  <td width="60%" class='td'>名称</td>
                  <td width="25%" class='td'>占比</td>
                </tr>
                </thead>
                <tbody class="tbody">
                <tr v-for="(item,index) in dangyuanzbpm" :key="index" v-if="index<=4">
                  <td class='td'><span class="circle" :class="'circle'+(index+1)">{{index+1}}</span></td>
                  <td class='td'>{{item.name}}</td>
                  <td class='td'>{{item.values|numFormat}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="box">
            <div class="title">
              <div class="border"></div>
              <span>40岁以下占比排名</span>
              <!-- <label class="sort">顺序</label> -->
            </div>
            <div class="container">
              <table class='table' cellspacing='0'>
                <thead class="thead">
                <tr>
                  <td width="15%" class='td'>排名</td>
                  <td width="60%" class='td'>名称</td>
                  <td width="25%" class='td'>占比</td>
                </tr>
                </thead>
                <tbody class="tbody">
                <tr v-for="(item,index) in suiyxzbpm" :key="index" v-if="index<=4">
                  <td class='td'><span class="circle" :class="'circle'+(index+1)">{{index+1}}</span></td>
                  <td class='td'>{{item.name}}</td>
                  <td class='td'>{{item.values|numFormat}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eosNew from '@/util/echartsOptionsNew'
import http from '@/util/httpUtil'

export default {
  name: 'peopleType',
  data () {
    return {
      myChart: {},
      benkejysxlzbpm: [],
      dangyuanzbpm: [],
      suiyxzbpm: [],
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
  filters: {
    numFormat (value) {
      return parseInt(value * 100) + '%'
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
    changeRouter (name) {
      this.$router.push({name: name})
    },
    getData () {
      let vue = this
      let reqParam = {}
      let url = ''
      url = '/peopleMediate/V1.0.0.3/attributeAnalysis'
      http.get(url, reqParam, (data) => {
        data['education_label'] = data['education_label'].map(item => { return { name: item['leixing'], value: item['shuzhi'] } })
        data['politic'] = data['politic'].map(item => { return { name: item['leixing'], value: item['shuzhi'] } })
        data['age_LV'] = data['age_LV'].map(item => { return { name: item['nianlingd'], value: item['shuzhi'], xingbie: item['xingbie'] } })
        vue['benkejysxlzbpm'] = data['edu_proportion']
        vue['dangyuanzbpm'] = data['tjy_location'][0]
        vue['suiyxzbpm'] = data['new_tjy'][0]
        vue.$nextTick(function () {
          vue.draw('target1', eosNew.setPie2(data['education_label'].reverse()))
          vue.draw('target2', eosNew.setBar2(data['politic'], ['#B6CDFF', '#2E89FD'], 'vertical', 'integer', 25))
          vue.draw('target3', eosNew.setLine2([data['age_LV'].filter((item) => {
            if (item.xingbie === '男') {
              return true
            }
          }), data['age_LV'].filter((item) => {
            if (item.xingbie === '女') {
              return true
            }
          })], 'integer', ['男性', '女性']))
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
.peopleType_container{
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
        height: 49%;
        width: 100%;
      }
      .bottom{
        display: flex;
        height: 49%;
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
          font-size:@fontSamll;
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
      .table{
        width: 100%;
        height: calc(100% - 15px);
        padding-top:15px;
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
          }
          tr{
            &:nth-of-type(2n){
              background:@table;
            }
             &:nth-of-type(2n-1){
              background:@table2;
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
    }
  }
}
</style>
