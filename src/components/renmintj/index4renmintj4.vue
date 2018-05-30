/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-05-30 09:31:53
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-05-30 15:58:25
 */
<template>
<div id='renmintj' class='shade'>
  <div class='renmintj_header'>
    <!-- <div class="renmintj_back" @click="changeRouter('mapApp')" style="cursor: pointer;"></div> -->
  </div>
  <div class='renmintj_container'>
    <div class="renmintj_left">
      <div class="renmintj_left_once" @click="changeRouter('totalNum')" style="cursor: pointer;">
        <span class="renmintj_title_span renmintj_title_span_center">业务数量</span>
        <div class="renmintj_main">
          <div class="renmintj_main_once">
            <div class="renmintj_main_title">调解案件</div>
            <div class="renmintj_main_today">
              <span class="renmintj_main_span1">275</span>
              <span class="renmintj_main_span2">今日新增</span>
            </div>
            <div class="renmintj_main_year">
              <span class="renmintj_main_span1">23371</span>
              <span class="renmintj_main_span2">全年累计</span>
            </div>
          </div>
          <div class="renmintj_main_once">
            <div class="renmintj_main_title">110联动</div>
            <div class="renmintj_main_today">
              <span class="renmintj_main_span1">158</span>
              <span class="renmintj_main_span2">今日新增</span>
            </div>
            <div class="renmintj_main_year">
              <span class="renmintj_main_span1">64785</span>
              <span class="renmintj_main_span2">全年累计</span>
            </div>
          </div>
          <div class="renmintj_main_once">
            <div class="renmintj_main_title">公共法律服务</div>
            <div class="renmintj_main_today">
              <span class="renmintj_main_span1">654</span>
              <span class="renmintj_main_span2">今日新增</span>
            </div>
            <div class="renmintj_main_year">
              <span class="renmintj_main_span1">14561</span>
              <span class="renmintj_main_span2">全年累计</span>
            </div>
          </div>
        </div>
      </div>
      <div class="renmintj_left_once" @click="changeRouter('totalType')" style="cursor: pointer;">
        <span class="renmintj_title_span renmintj_title_span_center">类型分布</span>
        <div class='zIndex3 pie'></div>
      </div>
      <div class="renmintj_left_once">
        <span class="renmintj_title_span renmintj_title_span_center">趋势分析</span>
        <div class='zIndex3 line'></div>
      </div>
    </div>
    <div class="renmintj_center">
      <div class="renmintj_center_map">
        <span class="renmintj_title_span renmintj_title_span_left">案件分布</span>
        <div class='map'></div>
      </div>
      <div class="renmintj_center_once">
        <span class="renmintj_title_span renmintj_title_span_center">区域分析</span>
        <div class='zIndex3 bar'></div>
      </div>
    </div>
    <div class="renmintj_right">
      <div class="renmintj_right_once">
        <span class="renmintj_title_span renmintj_title_span_center">机构总数</span>
        <div class="renmintj_right_jigou">
          <div class="renmintj_right_circle" :class="'circle'+(index+1)" v-for="(item, index) in jigouzs" :key="index" v-if="index<=3">
            <span class="renmintj_right_span1">{{item.shuliang}}</span>
            <span class="renmintj_right_span2">{{item.mingcheng}}</span>
          </div>
          <div class="renmintj_right_fr">
            <div class='zIndex3 renmintj fill1'></div>
          </div>
        </div>
      </div>
      <div class="renmintj_right_once" @click="changeRouter('peopleNum')" style="cursor: pointer;">
        <span class="renmintj_title_span renmintj_title_span_center">人员总数</span>
        <div class="renmintj_right_renyuan">
          <div class="renmintj_right_fl">
            <div class="renmintj_renyuan_once" v-for="(item,index) in renyuanzs" :key="index" v-if="index<=5">
              <span class="renmintj_renyuan_span1">{{item.shuliang}}</span>
              <span class="renmintj_renyuan_span2">{{item.mingcheng}}</span>
            </div>
          </div>
          <div class="renmintj_right_fr">
              <div class='zIndex3 renmintj fill2'></div>
          </div>
        </div>
      </div>
      <div class="renmintj_right_once">
        <span class="renmintj_title_span renmintj_title_span_center">重点事件</span>
        <table class='renmintj_right_table' cellspacing='0'>
           <thead class="renmintj_table_thead">
            <tr>
              <td class='td'>事件</td>
              <td class='td'>日期</td>
              <td class='td'>地区</td>
              <td class='td'>详情</td>
            </tr>
           </thead>
           <tbody class="renmintj_table_tbody">
            <tr v-for="(item, index) in zhongdiansj" :key="index">
              <td class='td'>{{item.shijianlx}}</td>
              <td class='td'>{{item.riqi}}</td>
              <td class='td'>{{item.diqu}}</td>
              <td class='td'>{{item.xiangqing}}</td>
            </tr>
           </tbody>
          </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import eos from '@/util/echartsOptions'
import qushifx from '@/../static/json/renmintj/jicengsfdsjzpt_qushifx'
import quyufx from '@/../static/json/renmintj/jicengsfdsjzpt_quyufx'
import zhongdiansj from '@/../static/json/renmintj/jicengsfdsjzpt_zhongdiansj'
import renyuanzs from '@/../static/json/renmintj/jicengsfdsjzpt_renyuanzs'
import jigouzs from '@/../static/json/renmintj/jicengsfdsjzpt_jigouzs'
import genJson4shanghai from '@/../static/json/genJson4shanghai'

export default {
  name: 'renmintj',
  data () {
    return {
      center: {lng: 0, lat: 0},
      zoom: 11,
      minZoom: 11,
      circlePathList: [],
      zhongdiansj: zhongdiansj.slice(0, 6),
      renyuanzs: renyuanzs,
      jigouzs: jigouzs,
      timer: ''
    }
  },
  methods: {
    // 绘制echarts
    draw (domName, option) {
      this.$echarts.dispose(document.getElementsByClassName(domName)[0])
      let myChart = this.$echarts.init(document.getElementsByClassName(domName)[0])
      if (domName === 'map') {
        this.$echarts.registerMap('shanghai', genJson4shanghai)
      }
      myChart.setOption(option)
    },
    updateTableData () {
      let i = 1
      let len = 6
      let vue = this
      vue.timer = setInterval(function () {
        i++
        if (i > zhongdiansj.length - 6) {
          i = 1
        }
        vue.zhongdiansj = zhongdiansj.slice(i, i + len)
      }, 1500)
    },
    changeRouter (name) {
      this.$router.push({name: name})
    }
  },
  created () {},
  mounted () {
    this.draw('fill1', eos.setFill(jigouzs[4].shuliang, '#FDBF5E', '司法所专项编制\n\r\r\r\r\r\r-落实率-', [jigouzs[4].shuliang], '17', '#7BA6ED'))
    this.draw('fill2', eos.setFill(renyuanzs[6].shuliang, '#FF7279', '村居法律顾问\n\r\r\r\r-覆盖率-', [renyuanzs[6].shuliang], '17', '#7BA6ED'))
    this.draw('pie', eos.setPie([{value: 8729, name: '普通'}, {value: 4327, name: '专调'}], [{value: 6324, name: '邻里纠纷'}, {value: 2260, name: '损害赔偿'}, {value: 1225, name: '婚姻家庭'}, {value: 540, name: '治安案件'}, {value: 517, name: '不动产'}, {value: 361, name: '劳动争议'}, {value: 332, name: '消费纠纷'}, {value: 1497, name: '其他'}]))
    this.draw('line', eos.setLine(qushifx))
    this.draw('bar', eos.setBar2(quyufx))
    this.updateTableData()
    this.draw('map', eos.setMap2([[121.394878, 31.072511, 10], [121.555854, 30.8803, 20], [121.491, 31.237, 5], [121.440296, 31.401281, 6], [121.512, 31.27, 7], [121.43, 31.227, 2], [121.07968, 31.141832, 9], [121.541702, 31.270352, 3],
      [121.736377, 31.088346, 3], [121.454, 31.234, 6], [121.20573, 31.372673, 5], [121.178709, 30.992306, 5], [121.43452, 31.170563, 7], [121.563184, 31.631849, 3], [121.233758, 30.816867, 4]]))
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
  #renmintj {
    min-height: 1080px;
    min-width: 1920px;
    overflow-y: auto;
  }
  .shade {
    background: url('/static/renmintj/pic_bg.png');
    background-repeat:no-repeat;
    background-position:center;
  }

  .renmintj_container{
    width:100%;
    display:block;
    position:relative;
    box-sizing:border-box;
  }
  .renmintj_header{
    width: 100%;
    min-width: 1920px;
    height: 87px;
    background: url('/static/renmintj/pic_title.png');
    background-repeat:no-repeat;
    background-position:center;
    z-index: 99;
    position:relative;
  }
  .renmintj_back{
    background:url('/static/renmintj/btn_back.png');
    position:absolute;
    left:22px;
    width:137px;
    height: 35px;
    background-position: center;
    top: 28px;
    cursor:pointer;
  }
  .renmintj_title_span{
    display:inline-block;
    height:38px;
    line-height:38px;
    font-size:20px;
    font-family:HiraginoSansGB-W3;
    color:rgba(121,190,242,1);
    box-sizing:border-box;
  }
  .renmintj_title_span_center{
    width:100%;
    padding-left:0;
    text-align: center;
  }
  .renmintj_title_span_left{
    width:169px;
    padding-left:22px;
  }
  .renmintj_left{
    float:left;
    width:508px;
    margin:0 16px 22px 22px;

  }
  .renmintj_left_once{
    width:100%;
    height:313px;
    background:url('/static/renmintj/pic_up.png');
    background-size:508px 313px;
  }
  .renmintj_left_once:nth-of-type(2){
    margin:16px 0;
  }
  .pie {
    width: 508px;
    height: 275px;
  }
  .line {
    width: 495px;
    height: 265px;
  }
  .renmintj_center{
    width:828px;
    float:left;
  }
  .renmintj_center_map{
    width:100%;
    height:642px;
    background:url('/static/renmintj/pic_middle.png');
    background-size:828px 642px;
    margin-bottom:16px;
    position:relative;
  }
  .map{
    width: 825px;
    height: 600px;
    position:absolute;
    top:39px;
    left:1px;
  }
  .renmintj_center_once{
    width:100%;
    height:313px;
    background:url('/static/renmintj/pic_middle2.png');
    background-size:828px 313px;
  }
  .bar{
    width:815px;
    height:265px;
  }
  .renmintj_right{
    float:right;
    width:508px;
    margin:0 22px 22px 16px;
  }
  .renmintj_right_once{
    width:100%;
    height:313px;
    background:url('/static/renmintj/pic_up.png');
    background-size:508px 313px;
  }
  .renmintj_right_once:nth-of-type(2){
    margin:16px 0;
  }
  .renmintj_right_jigou{
    width:100%;
    height:275px;
    background:url('/static/renmintj/icon_.png');
    background-position:61px center;
    background-repeat:no-repeat;
    position:relative;
  }
  .renmintj_right_circle{
    position:absolute;
    padding-left:50px;
    height:50px;
    width:120px;
  }
  .renmintj_right_span1{
    height:31px;
    vertical-align:top;
    font-size:21px;
    font-family:FZLTZHK--GBK1-0;
    color:rgba(0,246,255,1);
    display:block;
  }
  .renmintj_right_span2{
    height:19px;
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(17,148,248,1);
    vertical-align:bottom;
    display:block;
  }
  .circle1{
    top:25px;
    left:60px;
    background:url('/static/renmintj/pic_2.png');
    background-repeat:no-repeat;
    background-position:left center;
  }
  .circle2{
    top:82px;
    left:116px;
    background:url('/static/renmintj/pic_1.png');
    background-repeat:no-repeat;
    background-position:left center;
  }
  .circle3{
    top:141px;
    left:116px;
    background:url('/static/renmintj/pic_4.png');
    background-repeat:no-repeat;
    background-position:left center;
  }
  .circle4{
    top:199px;
    left:60px;
    background:url('/static/renmintj/pic_3.png');
    background-repeat:no-repeat;
    background-position:left center;
  }
  .renmintj_right_fr{
    float:right;
    width:186px;
    height:275px;
    box-sizing:border-box;
    padding:75px 48px;
  }
  .renmintj {
    width: 90px;
    height: 125px;
  }
  .renmintj_right_renyuan{
    width:100%;
    height:275px;
    position:relative;
    padding-left:32px;
    box-sizing:border-box;
  }
  .renmintj_right_fl{
    float:left;
    width:290px;
  }
  .renmintj_renyuan_once{
    width:127px;
    height:54px;
    background:url('/static/renmintj/icon_user.png');
    float:left;
    margin:28px 11px 0 0;
  }
  .renmintj_renyuan_span1{
    display: inline-block;
    width: 44px;
    text-align: center;
    font-size: 14px;
    font-family: FZLTZHK--GBK1-0;
    color: rgba(0,246,255,1);
    line-height: 44px;
  }
  .renmintj_renyuan_span2{
    display: inline-block;
    width: 78px;
    text-align: left;
    font-size: 12px;
    font-family: HiraginoSansGB-W3;
    color: rgba(118,187,239,1);
    line-height: 52px;
  }
  .zIndex3 {
    z-index: 3;
  }

  .renmintj_right_table {
    width: 100%;
    padding:24px;
    box-sizing:border-box;
    color:white;
  }
  .renmintj_table_thead{
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(17,148,248,1);
    line-height:42px;
  }
  .renmintj_table_tbody tr{
    height:33px;
  }
  .renmintj_table_tbody tr:nth-of-type(2n-1){
    background: rgba(7,30,74,0.8)
  }
  .renmintj_main{
    width:100%;
    height:275px;
    position:relative;
  }
  .renmintj_main_once{
    height:91px;
    box-sizing:border-box;
    margin:0 2px;
  }
  .renmintj_main_once:nth-of-type(2n){
    background:rgba(7,30,74,0.8)
  }
  .renmintj_main_title{
    width:40%;
    font-size:20px;
    box-sizing:border-box;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,255,255,1);
    float:left;
    padding-left:18px;
    line-height:91px;
    height:91px;
  }
  .renmintj_main_today{
    width:15%;
    height:91px;
    float:left;
    padding-top:23px;
    box-sizing:border-box;
  }
  .renmintj_main_year{
    width:45%;
    height:91px;
    float:left;
    padding-right:54px;
    box-sizing:border-box;
    padding-top:23px;
  }
  .renmintj_main_span1{
    font-size:24px;
    font-family:FZLTZHK--GBK1-0;
    color:rgba(0,246,255,1);
    display:block;
    text-align:right;
  }
    .renmintj_main_span2{
    height:40px;
    font-size:16px;
    font-family:HiraginoSansGB-W3;
    color:rgba(17,148,248,1);
    display:block;
    text-align:right;
  }

</style>
