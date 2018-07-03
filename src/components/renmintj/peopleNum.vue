<template>
<div id='peopleNum' class='shade'>
  <div class="peopleNum_header">
    <div class="peopleNum_back"  @click="changeRouter('index4renmintj')"></div>
  </div>
  <div class="peopleNum_nav">
    <span class="peopleNum_nav_span">首页 > 调解员数量分析</span>
  </div>
  <div class="peopleNum_nav2">
    <span class="peopleNum_nav2_span active" @click="changeRouter('peopleNum')">数量分析</span>
    <span class="peopleNum_nav2_span" @click="changeRouter('peopleType')">属性分析</span>
    <span class="peopleNum_nav2_span" @click="changeRouter('pepleRanking')">排名分析</span>
  </div>
  <div class="peopleNum_content">
    <div class="peopleNum_content_top">
      <div class="peopleNum_content_title clearfix">
        <div class="peopleNum_content_title_left">
          <span class="peopleNum_content_span1">调解员人数变化趋势</span>
        </div>
        <div class="peopleNum_content_title_right">
          <div class="peopleNum_content_span_container bg1">
            <span class="peopleNum_content_span3" v-text="totalPeople"></span>
            <span class="peopleNum_content_span4">调解员总数</span>
          </div>
        </div>
      </div>
      <div class='area1 target1'></div>
    </div>
    <div class="peopleNum_content_top">
      <div class="peopleNum_content_title clearfix">
        <div class="peopleNum_content_title_left">
          <span class="peopleNum_content_span1">历年新增人员趋势</span>
        </div>
        <div class="peopleNum_content_title_right">
          <div class="peopleNum_content_span_container bg1">
            <span class="peopleNum_content_span3" v-text="newPeople"></span>
            <span class="peopleNum_content_span4">新增人员（今年）</span>
          </div>
        </div>
      </div>
      <div class='area1 target2'></div>
    </div>
    <div class="peopleNum_content_bottom">
      <div class="peopleNum_content_title clearfix">
        <div class="peopleNum_content_title_left">
          <span class="peopleNum_content_span1">各区调解员人数</span>
        </div>
      </div>
      <div class='area2 target3'></div>
    </div>
    <div class="peopleNum_content_bottom">
      <div class="peopleNum_content_title clearfix">
        <div class="peopleNum_content_title_left">
          <span class="peopleNum_content_span1">各区新增调解员</span>
        </div>
      </div>
      <div class='area2 target4'></div>
    </div>
  </div>
</div>
</template>

<script>
import eos from '@/util/echartsOptions'
import http from '@/util/httpUtil'

export default {
  name: 'peopleNum',
  data () {
    return {
      myChart: {},
      totalPeople: 0 + '人',
      newPeople: 0 + '人'
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
      url = '/peopleMediate/quantityAnalysis'
      http.get(url, reqParam, (data) => {
        data['n_tjy'] = data['n_tjy'].map(item => { return { name: item['shijian'], value: item['shuzhi'] } })
        data['nnew_tjy'] = data['nnew_tjy'].map(item => { return { name: item['shijian'], value: item['shuzhi'] } })
        data['n_locationtjy'] = data['n_locationtjy'].map(item => { return { name: item['mingcheng'], value: item['shuzhi'] } })
        data['new_locationtiy'] = data['new_locationtiy'].map(item => { return { name: item['mingcheng'], value: item['shuzhi'] } })
        vue.totalPeople = data['n_tjy'][data['n_tjy'].length - 1].value
        vue.newPeople = data['nnew_tjy'][data['nnew_tjy'].length - 1].value
        vue.$nextTick(function () {
          vue.draw('target1', eos.setLine4([data['n_tjy']], 'integer'))
          vue.draw('target2', eos.setLine4([data['nnew_tjy']], 'integer'))
          vue.draw('target3', eos.setBar3(data['n_locationtjy'].reverse(), ['#4D84FE', '#B3CAFF'], 'horizon', 'integer'))
          vue.draw('target4', eos.setBar3(data['new_locationtiy'].reverse(), ['#FF9C00', '#F8E228'], 'horizon', 'integer'))
        })
      })
    }
  },
  created () {
    this.getData()
  },
  mounted () {}
}
</script>

<style scoped>
  #peopleNum {
    min-height: 1080px;
    min-width: 1920px;
    overflow-y: auto;
  }
  .shade {
    background: url('/static/renmintj/pic_bg.png');
    background-repeat:no-repeat;
    background-position:center;
  }

  .area1 {
    float: left;
    width: 929px;
    height: 270px;
  }

  .area2 {
    float: left;
    width: 929px;
    height: 436px;
  }
  .peopleNum_header{
    width: 100%;
    min-width: 1920px;
    height: 87px;
    background: url('/static/renmintj/pic_title.png');
    background-repeat:no-repeat;
    background-position:center;
    z-index: 99;
    position:relative;
  }
  .peopleNum_back{
    background:url('/static/renmintj/btn_back.png');
    position:absolute;
    left:22px;
    width:137px;
    height: 35px;
    background-position: center;
    top: 28px;
    cursor:pointer;
  }
  .peopleNum_nav{
    height: 24px;
    margin:6px 0 20px 0;
    padding-left: 34px;
    width: 100%;
    box-sizing: border-box;
  }
  .peopleNum_nav_span{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(94,126,203,1);
  }
  .peopleNum_nav2{
    margin-left: 34px;
    border-bottom: 1px solid rgba(15,59,186,1);
    display: inline-block;
  }
  .peopleNum_nav2_span{
    font-size:20px;
    font-family:HiraginoSansGB-W3;
    padding-bottom: 10px;
    display: inline-block;
    width: 5em;
    text-align: center;
    cursor:pointer;
    color:rgba(94,126,203,1);
  }
  .active{
    color:rgba(255,198,0,1);
    border-bottom: 3px solid rgba(255,198,0,1);
  }
  .peopleNum_content{
    width: 100%;
    height: 903px;
    box-sizing: border-box;
    padding: 13px 24px 24px 24px;
  }
   .peopleNum_content_top{
    width: 929px;
    height: 367px;
    float: left;
    margin-bottom: 14px;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
  }
  .peopleNum_content_top:first-child{
    margin-right: 14px;
  }
  .peopleNum_content_bottom{
    width: 929px;
    height: 506px;
    float: left;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
  }
  .peopleNum_content_bottom:last-child{
    margin-left: 14px;
  }
  .peopleNum_content_title{
    width: 100%;
    color: white;
  }
  .peopleNum_content_title_left{
    width: 50%;
    float: left;
    margin-top: 21px;
  }
  .peopleNum_content_span1{
    font-size:22px;
    font-family:MicrosoftYaHei;
    color:rgba(125,165,254,1);
    padding-left: 8px;
    margin-left: 28px;
    border-left: 3px solid rgba(125,165,254,1);
    display:block;
  }
  .peopleNum_content_span2{
    display:block;
    font-size:18px;
    font-family:MicrosoftYaHei;
    color:rgba(125,165,254,1);
    padding-left: 42px;
  }
  .peopleNum_content_title_right{
    width: 50%;
    float: right;
    margin-top:16px;
  }
  .peopleNum_content_span_container{
    float:right;
    padding-left:79px;
  }
  .bg1{
    background:url("/static/renmintjOther/icon_user.png");
    background-repeat:no-repeat;
    background-position:left center;
  }
  .peopleNum_content_span3{
    font-size:38px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,198,0,1);
    display:block;
    text-align:center;
    padding-right:40px;
  }
  .peopleNum_content_span4{
    font-size:16px;
    font-family:HiraginoSansGB-W3;
    color:rgba(77,132,254,1);
    display:block;
    text-align:center;
    padding-right:40px;
  }
  .peopleNum_content_span5{
    font-size:16px;
    font-family:MicrosoftYaHei;
    padding:2px 12px;
    float:right;
    border-radius:15px;
    margin-right:16px;
    color:rgba(153,153,153,1);
    cursor:pointer;
  }
  .peopleNum_content_active{
    color:rgba(255,255,255,1);
    background:rgba(77,132,254,1);
  }
  .peopleNum_content_span5:first-child{
    margin-right:38px;
  }
  .right2{
    margin-top:25px;
  }
</style>
