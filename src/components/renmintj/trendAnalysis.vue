<template>
<div id='trendAnalysis' class='shade'>
  <div class="trendAnalysis_header">
    <div class="trendAnalysis_back"  @click="changeRouter('index4renmintj')" style="cursor: pointer;"></div>
  </div>
  <div class="trendAnalysis_nav">
    <span class="trendAnalysis_nav_span">首页 > 趋势分析</span>
  </div>
  <div class="trendAnalysis_nav2">
    <span class="trendAnalysis_nav2_span trendAnalysis_nav2_span_active">人民调解</span>
    <span class="trendAnalysis_nav2_span">110联动</span>
    <span class="trendAnalysis_nav2_span">公共法律服务</span>
    <span class="trendAnalysis_nav2_span">纠纷排查</span>
  </div>
  <div class="cas_container">
    <el-cascader
      class="cascader"
      :options="area"
      placeholder="区域"
      v-model="areaDefault"
    ></el-cascader>
  </div>
  <div class="trendAnalysis_content">
    <div class="trendAnalysis_content_left">
      <div class="trendAnalysis_content_left_once">
        <div class="trendAnalysis_content_left_once_children">
          <span class="span1">纠纷数量</span><br>
          <span class="span2">{{ count | numFormat }}</span>
          <span class="span1">件</span>
        </div>
        <div class="trendAnalysis_content_left_once_children">
          <span class="span1">重点事件</span><br>
          <span class="span2">{{ importantNum | numFormat }}</span>
          <span class="span1">件</span>
        </div>
        <div class="trendAnalysis_content_left_once_children">
          <span class="span1">单月最高</span><br>
          <span class="span2">{{max | numFormat }}</span>
          <span class="span1">件</span><br>
          <span class="span3">（出现在2018/04）</span>
        </div>
        <div class="trendAnalysis_content_left_once_children">
          <span class="span1">月均</span><br>
          <span class="span2">{{average | numFormat }}</span>
          <span class="span1">件</span>
        </div>
      </div>
      <div class="trendAnalysis_content_left_once">
        <div class="target2"></div>
      </div>
    </div>
    <div class="trendAnalysis_content_right">
      <div class="trendAnalysis_content_right_once">
        <div class="trendAnalysis_content_title clearfix">
          <div class="trendAnalysis_content_title_left">
            <span class="trendAnalysis_content_span1">纠纷类型</span>
          </div>
        </div>
        <div class="target3"></div>
      </div>
      <div class="trendAnalysis_content_right_once">
        <div class="trendAnalysis_content_title clearfix">
          <div class="trendAnalysis_content_title_left">
            <span class="trendAnalysis_content_span1">纠纷热词</span>
          </div>
        </div>
        <div class="target4"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import eos from '@/util/echartsOptions'
import wos from '@/util/wordcloudOptions'
import http from '@/util/httpUtil'
import rollScreen from '../rollScreen.vue'
import digitalRolling from '../digitalRolling.vue'
import gequxztjy from '@/../static/json/renmintj/tiaojieslxfx_gequxztjy'
import renyuanxq from '@/../static/json/renmintj/huaxiangfx_renyuanxq'

export default {
  name: 'trendAnalysis',
  components: {
    rollScreen,
    digitalRolling
  },
  data () {
    return {
      myChart: {},
      table: {
        zhongdiansj: [],
        dLength: 0,
        lineNum: 0
      },
      timer: '',
      count: 154688,
      importantNum: 210,
      max: 1366,
      average: 1469,
      area: [{
        'label': '全市',
        'value': 0
      }, {
        'label': '闵行区',
        'value': '闵行'
      }, {
        'label': '徐汇区',
        'value': '徐汇'
      }, {
        'label': '宝山区',
        'value': '宝山'
      }, {
        'label': '崇明区',
        'value': '崇明'
      }, {
        'label': '浦东区',
        'value': '浦东'
      }, {
        'label': '松江区',
        'value': '松江'
      }, {
        'label': '奉贤区',
        'value': '奉贤'
      }, {
        'label': '嘉定区',
        'value': '嘉定'
      }, {
        'label': '青浦区',
        'value': '青浦'
      }, {
        'label': '杨浦区',
        'value': '杨浦'
      }, {
        'label': '黄浦区',
        'value': '黄浦'
      }, {
        'label': '金山区',
        'value': '金山'
      }, {
        'label': '普陀区',
        'value': '普陀'
      }, {
        'label': '静安区',
        'value': '静安'
      }, {
        'label': '长宁区',
        'value': '长宁'
      }, {
        'label': '虹口区',
        'value': '虹口'
      }],
      areaDefault: [0]
    }
  },
  filters: {
    numFormat (num) {
      num = num || 0
      console.log(num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'))
      return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
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
        this.myChart[domName].on('datazoom', function (params) {
          console.log(params)
        })
      }
    },
    drawWordcloud2 (domName) {
      let option = wos.setOption(renyuanxq.person[0].ciyun.map((item) => {
        return [item.name, item.value]
      }))
      this.$wordcloud(document.getElementsByClassName(domName)[0], option)
    },
    changeNum () {
      let _this = this
      this.timer = setInterval(function () {
        _this.count = parseInt(Math.random() * 900) + 150000
        _this.importantNum = parseInt(Math.random() * 90) + 200
        _this.max = parseInt(Math.random() * 900) + 1000
        _this.average = parseInt(Math.random() * 900) + 1000
      }, 5000)
    },
    // 路由跳转
    changeRouter (name) {
      this.$router.push({name: name})
    },
    getData () {
      let vue = this
      let reqParam = {}
      let url = ''
      url = '/peopleMediate/zdsj'
      http.get(url, reqParam, (data) => {
        [vue.table.dLength, vue.table.lineNum, vue.table.zhongdiansj] = [data.length, 7, data]
      })
    }
  },
  created () {
    // this.getData()
  },
  mounted () {
    // this.changeNum()
    this.draw('target2', eos.setLine5())
    this.draw('target3', eos.setBar3(gequxztjy.reverse(), ['#4D84FE', '#B3CAFF'], 'hortizon', 'integer'))
    this.drawWordcloud2('target4')
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
  #trendAnalysis {
    min-height: 1080px;
    min-width: 1920px;
    overflow-y: hidden;
  }
  .shade {
    background: url('/static/renmintj/pic_bg.png');
    background-repeat:no-repeat;
    background-position:center;
  }
  /* .target1,.target2,.target3,.target4,.target5,.target6,.target7,.target8 {
    float: left;
    width: calc(100% - 20px);
    height: calc(100% - 52px);
    padding: 0 10px;
  } */
  /* .target1 {
    height: 100%;
  } */
  .trendAnalysis_header{
    width: 100%;
    min-width: 1920px;
    height: 87px;
    background: url('/static/renmintj/pic_title.png');
    background-repeat:no-repeat;
    background-position:center;
    z-index: 99;
    position:relative;
  }
  .trendAnalysis_back{
    background:url('/static/renmintj/btn_back.png');
    position:absolute;
    left:22px;
    width:137px;
    height: 35px;
    background-position: center;
    top: 28px;
    cursor:pointer;
  }
  .trendAnalysis_nav{
    height: 24px;
    margin:6px 0 20px 0;
    padding-left: 34px;
    width: 100%;
    box-sizing: border-box;
  }
  .trendAnalysis_nav_span{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(94,126,203,1);
  }
  .trendAnalysis_nav2{
    margin-left: 34px;
    border-bottom: 1px solid rgba(15,59,186,1);
    display: inline-block;
  }
  .trendAnalysis_nav2_span{
    font-size:20px;
    font-family:HiraginoSansGB-W3;
    padding-bottom: 10px;
    display: inline-block;
    width: 6em;
    text-align: center;
    cursor:pointer;
    color:rgba(94,126,203,1);
  }
  .trendAnalysis_nav2_span_active{
    color:rgba(255,198,0,1);
    border-bottom: 3px solid rgba(255,198,0,1);
  }
  .trendAnalysis_content{
    width: 100%;
    height: 903px;
    box-sizing: border-box;
    padding: 12px 20px 18px 20px;
  }
  .trendAnalysis_content_left{
    width: 1241px;
    float: left;
    margin-right: 16px;
  }
  .trendAnalysis_content_left_once{
    width: 1241px;
    height: 140px;
    float: left;
    margin-bottom: 17px;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
  }
  .trendAnalysis_content_left_once:nth-of-type(2){
    height: 720px;
    margin-bottom: 0;
  }
  .trendAnalysis_content_left_once_children {
    float: left;
    width: calc(305px - 90px);
    height: 60px;
    margin-top: calc((140px - 60px) / 2);
    margin-left: 90px;
    border-right: 1px solid  #1F3490;
  }
  .trendAnalysis_content_left_once_children .span1{
    color: #5E7ECB;
    font-size: 14px;
  }
  .trendAnalysis_content_left_once_children .span2{
    color: #F6FBFF;
    font-size: 38px;
  }
  .trendAnalysis_content_left_once_children .span3{
    color: #00C6FF;
    font-size: 12px;
  }
  .trendAnalysis_content_left_once_children:last-of-type {
    border-right: 0px;
  }
  .target2 {
    width: 1241px;
    height: 720px;
  }
  .trendAnalysis_content_right{
    width: 622px;
    float: left;
  }
  .trendAnalysis_content_right_once{
    width: 622px;
    height: 483px;
    float: left;
    margin-bottom: 23px;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
  }
  .trendAnalysis_content_right_once:nth-of-type(2){
    height: 371px;
    margin-bottom: 0;
  }
  .target3 {
    width: 622px;
    height: 443px;
  }
  .target4 {
    width: 622px;
    height: 331px;
  }
  .trendAnalysis_content_title{
    width: 100%;
    color: white;
  }
  .trendAnalysis_content_title_left{
    width: 50%;
    float: left;
    margin-top: 15px;
  }
  .trendAnalysis_content_span1{
    font-size:22px;
    font-family:MicrosoftYaHei;
    color:rgba(125,165,254,1);
    padding-left: 8px;
    margin-left: 28px;
    border-left: 3px solid rgba(125,165,254,1);
    display:block;
    height: 22px;
    line-height: 22px;
  }
  .cas_container{
    float: right;
    margin-right: 25px;
  }
  .cas_container_span{
    font-size:16px;
    font-family:HiraginoSansGB-W3;
    color:rgba(94,126,203,1);
  }
</style>
