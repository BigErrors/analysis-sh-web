<template>
<div id='peopleType' class='shade'>
  <div class="peopleType_header">
    <div class="peopleType_back"  @click="changeRouter('index4renmintj')" style="cursor: pointer;"></div>
  </div>
  <div class="peopleType_nav">
    <span class="peopleType_nav_span">首页 > 调解员类型分析</span>
  </div>
  <div class="peopleType_nav2">
    <span class="peopleType_nav2_span"  @click="changeRouter('peopleNum')">数量分析</span>
    <span class="peopleType_nav2_span active"  @click="changeRouter('peopleType')">属性分析</span>
    <span class="peopleType_nav2_span"  @click="changeRouter('peopleSearch')">画像分析</span>
  </div>
  <div class="peopleType_content">
    <div class="peopleType_content_top">
      <div class="peopleType_content_title clearfix">
        <div class="peopleType_content_title_left">
          <span class="peopleType_content_span1">学历类型</span>
        </div>
      </div>
      <div class='area target1'></div>
    </div>
    <div class="peopleType_content_top">
      <div class="peopleType_content_title clearfix">
        <div class="peopleType_content_title_left">
          <span class="peopleType_content_span1">政治面貌</span>
        </div>
      </div>
      <div class='area target2'></div>
    </div>
    <div class="peopleType_content_top">
      <div class="peopleType_content_title clearfix">
        <div class="peopleType_content_title_left">
          <span class="peopleType_content_span1">年龄段</span>
        </div>
      </div>
      <div class='area target3'></div>
    </div>
    <div class="peopleType_content_bottom">
      <div class="peopleType_content_title clearfix">
        <div class="peopleType_content_title_left">
          <span class="peopleType_content_span1">本科及以上学历占比排名（区局）</span>
        </div>
      </div>
      <table class='totalNum_table' cellspacing='0'>
        <thead class="totalNum_table_thead">
        <tr>
          <td width="15%" class='td'>排名</td>
          <td width="60%" class='td'>名称</td>
          <td width="25%" class='td'>占比</td>
        </tr>
        </thead>
        <tbody class="totalNum_table_tbody">
        <tr v-for="(item,index) in benkejysxlzbpm" :key="index" v-if="index<=4">
          <td class='td'><span class="circle" :class="'circle'+(index+1)">{{index+1}}</span></td>
          <td class='td'>{{item.mingcheng}}</td>
          <td class='td'>{{item.zhanbi|numFormat}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="peopleType_content_bottom">
      <div class="peopleType_content_title clearfix">
        <div class="peopleType_content_title_left">
          <span class="peopleType_content_span1">各区调解员人数</span>
        </div>
      </div>
      <table class='totalNum_table' cellspacing='0'>
        <thead class="totalNum_table_thead">
        <tr>
          <td width="15%" class='td'>排名</td>
          <td width="60%" class='td'>名称</td>
          <td width="25%" class='td'>占比</td>
        </tr>
        </thead>
        <tbody class="totalNum_table_tbody">
        <tr v-for="(item,index) in dangyuanzbpm" :key="index" v-if="index<=4">
          <td class='td'><span class="circle" :class="'circle'+(index+1)">{{index+1}}</span></td>
          <td class='td'>{{item.mingcheng}}</td>
          <td class='td'>{{item.zhanbi|numFormat}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="peopleType_content_bottom">
      <div class="peopleType_content_title clearfix">
        <div class="peopleType_content_title_left">
          <span class="peopleType_content_span1">各区新增调解员</span>
        </div>
      </div>
      <table class='totalNum_table' cellspacing='0'>
        <thead class="totalNum_table_thead">
        <tr>
          <td width="15%" class='td'>排名</td>
          <td width="60%" class='td'>名称</td>
          <td width="25%" class='td'>占比</td>
        </tr>
        </thead>
        <tbody class="totalNum_table_tbody">
        <tr v-for="(item,index) in suiyxzbpm" :key="index" v-if="index<=4">
          <td class='td'><span class="circle" :class="'circle'+(index+1)">{{index+1}}</span></td>
          <td class='td'>{{item.mingcheng}}</td>
          <td class='td'>{{item.zhanbi|numFormat}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import eos from '@/util/echartsOptions'
import http from '@/util/httpUtil'

export default {
  name: 'peopleType',
  data () {
    return {
      myChart: {},
      benkejysxlzbpm: [],
      dangyuanzbpm: [],
      suiyxzbpm: []
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
      url = '/peopleMediate/attAnalysis'
      http.get(url, reqParam, (data) => {
        data['education_label'] = data['education_label'].map(item => { return { name: item['leixing'], value: item['shuzhi'] } })
        data['politic'] = data['politic'].map(item => { return { name: item['leixing'], value: item['shuzhi'] } })
        data['age_LV'] = data['age_LV'].map(item => { return { name: item['nianlingd'], value: item['shuzhi'], xingbie: item['xingbie'] } })
        vue['benkejysxlzbpm'] = data['edu_proportion']
        vue['dangyuanzbpm'] = data['tjy_location']
        vue['suiyxzbpm'] = data['new_tjy']
        vue.$nextTick(function () {
          vue.draw('target1', eos.setPie3(data['education_label']))
          vue.draw('target2', eos.setBar3(data['politic'].reverse(), ['#FF9C00', '#F8E228'], 'vertical', 'integer', 25))
          vue.draw('target3', eos.setLine4([data['age_LV'].filter((item) => {
            if (item.xingbie === '男') {
              return true
            }
          }).reverse(), data['age_LV'].filter((item) => {
            if (item.xingbie === '女') {
              return true
            }
          }).reverse()], 'integer', ['男性', '女性']))
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
  #peopleType {
    min-height: 1080px;
    min-width: 1920px;
    overflow-y: auto;
  }
  .shade {
    background: url('/static/renmintj/pic_bg.png');
    background-repeat:no-repeat;
    background-position:center;
  }
  .area {
    float: left;
    width: 600px;
    height: 380px
  }
  .peopleType_header{
    width: 100%;
    min-width: 1900px;
    height: 87px;
    background: url('/static/renmintj/pic_title.png');
    background-repeat:no-repeat;
    background-position:center;
    z-index: 99;
    position:relative;
  }
  .peopleType_back{
    background:url('/static/renmintj/btn_back.png');
    position:absolute;
    left:22px;
    width:137px;
    height: 35px;
    background-position: center;
    top: 28px;
    cursor:pointer;
  }
  .peopleType_nav{
    height: 24px;
    margin:6px 0 20px 0;
    padding-left: 34px;
    width: 100%;
    box-sizing: border-box;
  }
  .peopleType_nav_span{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(94,126,203,1);
  }
  .peopleType_nav2{
    margin-left: 34px;
    border-bottom: 1px solid rgba(15,59,186,1);
    display: inline-block;
  }
  .peopleType_nav2_span{
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
  .peopleType_content{
    width: 100%;
    height: 903px;
    box-sizing: border-box;
    padding: 13px 24px 24px 24px;
  }
   .peopleType_content_top{
    width: 600px;
    height: 435px;
    float: left;
    margin-bottom: 14px;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
  }
  .peopleType_content_top:nth-child(2){
    margin-left: 14px;
    margin-right: 14px;
  }
  .peopleType_content_bottom{
    width: 600px;
    height: 435px;
    float: left;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
  }
  .peopleType_content_bottom:nth-child(5){
    margin-left: 14px;
    margin-right: 14px;
  }
  .peopleType_content_title{
    width: 100%;
    color: white;
  }
  .peopleType_content_title_left{
    width: 70%;
    float: left;
    margin-top: 21px;
  }
  .peopleType_content_span1{
    font-size:22px;
    font-family:MicrosoftYaHei;
    color:rgba(125,165,254,1);
    padding-left: 8px;
    margin-left: 28px;
    border-left: 3px solid rgba(125,165,254,1);
    display:block;
  }
  .peopleType_content_span2{
    display:block;
    font-size:18px;
    font-family:MicrosoftYaHei;
    color:rgba(125,165,254,1);
    padding-left: 42px;
  }
  .peopleType_content_title_right{
    width: 30%;
    float: right;
    margin-top:16px;
  }
  .peopleType_content_span_container{
    float:right;
    padding-left:79px;
  }
  .bg1{
    background:url("/static/renmintjOther/icon_user.png");
    background-repeat:no-repeat;
    background-position:left center;
  }
  .peopleType_content_span3{
    font-size:38px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,198,0,1);
    display:block;
    text-align:center;
    padding-right:40px;
  }
  .peopleType_content_span4{
    font-size:16px;
    font-family:HiraginoSansGB-W3;
    color:rgba(77,132,254,1);
    display:block;
    text-align:center;
    padding-right:40px;
  }
  .peopleType_content_span5{
    font-size:16px;
    font-family:MicrosoftYaHei;
    padding:2px 12px;
    float:right;
    border-radius:15px;
    margin-right:16px;
    color:rgba(153,153,153,1);
    cursor:pointer;
  }
  .peopleType_content_active{
    color:rgba(255,255,255,1);
    background:rgba(77,132,254,1);
  }
  .peopleType_content_span5:first-child{
    margin-right:38px;
  }
  .right2{
    margin-top:25px;
  }
  .totalNum_table{
    width: 100%;
    padding:28px 38px 0 38px;
    box-sizing:border-box;
    color:white;
  }
  .totalNum_table_thead td{
    font-size:18px;
    font-family:MicrosoftYaHei;
    color:rgba(77,132,254,1);
    line-height:42px;
    text-align:center;
     border-bottom:2px dashed rgba(16,54,165,1);
  }
  .totalNum_table_tbody{
    font-size:16px;
    font-family:MicrosoftYaHei;
    color:rgba(225,234,255,1);
    text-align:center;
  }
  .totalNum_table_tbody td{
    padding:15px 0;
  }
  .totalNum_table_tbody tr:nth-of-type(2n){
    background:rgba(19,38,101,1);
  }
  .circle{
    border-radius:100%;
    width:23px;
    height:23px;
    display:inline-block;
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
</style>
