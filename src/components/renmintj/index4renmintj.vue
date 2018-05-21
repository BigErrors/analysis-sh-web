<template>
<div id='renmintj' class='shade'>
  <div class='renmintj_header'>
    <!-- <div class="renmintj_back" @click="changeRouter('mapApp')" style="cursor: pointer;"></div> -->
  </div>
  <div class='renmintj_container'>
    <div class="renmintj_left">
      <div class="renmintj_left_once" @click="changeRouter('totalNum')" style="cursor: pointer;">
        <span class="renmintj_title_span">业务数量</span>
        <div class="renmintj_main">
          <div class="renmintj_main_once">
            <div class="renmintj_main_title">调解案件</div>
            <div class="renmintj_main_today">
              <span class="renmintj_main_span1">275</span>
              <span class="renmintj_main_span2">今日新增</span>
            </div>
            <div class="renmintj_main_year">
              <span class="renmintj_main_span1">27522</span>
              <span class="renmintj_main_span2">全年累计</span>
            </div>
          </div>
          <div class="renmintj_main_once">
            <div class="renmintj_main_title">调解案件</div>
            <div class="renmintj_main_today">
              <span class="renmintj_main_span1">275</span>
              <span class="renmintj_main_span2">今日新增</span>
            </div>
            <div class="renmintj_main_year">
              <span class="renmintj_main_span1">27522</span>
              <span class="renmintj_main_span2">全年累计</span>
            </div>
          </div>
          <div class="renmintj_main_once">
            <div class="renmintj_main_title">调解案件</div>
            <div class="renmintj_main_today">
              <span class="renmintj_main_span1">275</span>
              <span class="renmintj_main_span2">今日新增</span>
            </div>
            <div class="renmintj_main_year">
              <span class="renmintj_main_span1">27522</span>
              <span class="renmintj_main_span2">全年累计</span>
            </div>
          </div>
        </div>
      </div>
      <div class="renmintj_left_once" @click="changeRouter('totalType')" style="cursor: pointer;">
        <span class="renmintj_title_span">类型分布</span>
        <div class='zIndex3 pie'></div>
      </div>
      <div class="renmintj_left_once">
        <span class="renmintj_title_span">趋势分析</span>
        <div class='zIndex3 line'></div>
      </div>
    </div>
    <div class="renmintj_center">
      <div class="renmintj_center_map">
        <span class="renmintj_title_span">案件分布</span>
        <baidu-map  class='map' :center='center' :zoom='zoom' :minZoom='minZoom' @ready='handler'>
          <bm-circle :center="circlePath.center" :radius="circlePath.radius" fillColor="#FDCD0F" :fillOpacity="1" strokeColor='#FDCD0F' :strokeOpacity="1" :strokeWeight="0">
          </bm-circle>
          <bm-label  :position="circlePath.center" :content='circlePath.content' :labelStyle="{color: '#fff', border:0, background:'#FDCD0F', fontSize : '16px'}" :offset="{width: -18, height: -8}"/>
          <bm-circle :center="circlePath1.center" :radius="circlePath1.radius" fillColor="#FDCD0F" :fillOpacity="1" strokeColor='#FDCD0F' :strokeOpacity="1" :strokeWeight="0">
          </bm-circle>
          <bm-label  :position="circlePath1.center" :content='circlePath1.content' :labelStyle="{color: '#fff', border:0, background:'#FDCD0F', fontSize : '16px'}" :offset="{width: -18, height: -8}"/>
        </baidu-map>
      </div>
      <div class="renmintj_center_once">
        <span class="renmintj_title_span">区域分析</span>
        <div class='zIndex3 bar'></div>
      </div>
    </div>
    <div class="renmintj_right">
      <div class="renmintj_right_once">
        <span class="renmintj_title_span">机构总数</span>
        <div class="renmintj_right_jigou">
          <div class="renmintj_right_circle circle1">
            <span class="renmintj_right_span1">233</span>
            <span class="renmintj_right_span2">司法所</span>
          </div>
          <div class="renmintj_right_circle circle2">
            <span class="renmintj_right_span1">6579</span>
            <span class="renmintj_right_span2">调委会</span>
          </div>
          <div class="renmintj_right_circle circle3">
            <span class="renmintj_right_span1">410</span>
            <span class="renmintj_right_span2">公共法律服务站</span>
          </div>
          <div class="renmintj_right_circle circle4">
            <span class="renmintj_right_span1">350</span>
            <span class="renmintj_right_span2">公共法律服务室</span>
          </div>
          <div class="renmintj_right_fr">
            <div class='zIndex3 renmintj 1'></div>
          </div>
        </div>
      </div>
      <div class="renmintj_right_once" @click="changeRouter('peopleNum')" style="cursor: pointer;">
        <span class="renmintj_title_span">人员总数</span>
        <div class="renmintj_right_renyuan">
          <div class="renmintj_right_fl">
            <div class="renmintj_renyuan_once">
              <span class="renmintj_renyuan_span1">1287</span>
              <span class="renmintj_renyuan_span2">调解员</span>
            </div>
            <div class="renmintj_renyuan_once">
              <span class="renmintj_renyuan_span1">1287</span>
              <span class="renmintj_renyuan_span2">文员</span>
            </div>
            <div class="renmintj_renyuan_once">
              <span class="renmintj_renyuan_span1">339</span>
              <span class="renmintj_renyuan_span2">志愿者</span>
            </div>
            <div class="renmintj_renyuan_once">
              <span class="renmintj_renyuan_span1">1287</span>
              <span class="renmintj_renyuan_span2">公务员</span>
            </div>
            <div class="renmintj_renyuan_once">
              <span class="renmintj_renyuan_span1">1287</span>
              <span class="renmintj_renyuan_span2">社工</span>
            </div>
            <div class="renmintj_renyuan_once">
              <span class="renmintj_renyuan_span1">1287</span>
              <span class="renmintj_renyuan_span2">居村法律顾问</span>
            </div>
          </div>
          <div class="renmintj_right_fr">
              <div class='zIndex3 renmintj 2'></div>
          </div>
        </div>
      </div>
      <div class="renmintj_right_once">
        <span class="renmintj_title_span">重点事件</span>
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
            <tr>
              <td class='td'>absolute</td>
              <td class='td'>baidu</td>
              <td class='td'>cellspacing</td>
              <td class='td'>data</td>
            </tr>
            <tr>
              <td class='td'>absolute</td>
              <td class='td'>baidu</td>
              <td class='td'>cellspacing</td>
              <td class='td'>data</td>
            </tr>
            <tr>
              <td class='td'>absolute</td>
              <td class='td'>baidu</td>
              <td class='td'>cellspacing</td>
              <td class='td'>data</td>
            </tr>
            <tr>
              <td class='td'>absolute</td>
              <td class='td'>baidu</td>
              <td class='td'>cellspacing</td>
              <td class='td'>data</td>
            </tr>
            <tr>
              <td class='td'>absolute</td>
              <td class='td'>baidu</td>
              <td class='td'>cellspacing</td>
              <td class='td'>data</td>
            </tr>
             <tr>
              <td class='td'>absolute</td>
              <td class='td'>baidu</td>
              <td class='td'>cellspacing</td>
              <td class='td'>data</td>
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
import style from '@/json/mapStyle'
import qushifx from '@/json/shehuimd_qushifx'
import gequqk from '@/json/shehuimd_gequqk'
export default {
  name: 'renmintj',
  data () {
    return {
      center: {lng: 0, lat: 0},
      zoom: 11,
      minZoom: 11,
      circlePath: {
        center: {
          lng: 121.504934,
          lat: 31.130371
        },
        radius: 6000,
        content: '2000'
      },
      circlePath1: {
        center: {
          lng: 121.604934,
          lat: 31.230371
        },
        radius: 2000,
        content: '123'
      }
    }
  },
  methods: {
    // 绘制echarts
    draw (domName, option) {
      let myChart = this.$echarts.init(document.getElementsByClassName(domName)[0])
      myChart.setOption(option)
    },
    // 地图配置
    handler ({BMap, map}) {
      this.center.lng = 121.504934
      this.center.lat = 31.130371
      this.zoom = 11
      // 设置地图样式
      map.setMapStyle({styleJson: style})
      // 开启关系拖拽
      map.enableInertialDragging()
      // 开启鼠标滚动缩放
      // map.enableScrollWheelZoom()
      // 地图数据初始化
    },
    changeRouter (name) {
      this.$router.push({name: name})
    }
  },
  created () {},
  mounted () {
    this.draw('1', eos.setFill(0.72, '#FDBF5E', '司法所专项编制\n\r\r\r\r\r\r-落实率-', [0.72], '17', '#7BA6ED'))
    this.draw('2', eos.setFill(0.3, '#FF7279', '村居法律顾问\n\r\r\r\r-覆盖率-', [0.3], '17', '#7BA6ED'))
    this.draw('pie', eos.setPie([{value: 679, name: '其他'}, {value: 1548, name: '专调'}], [{value: 310, name: '婚姻家庭'}, {value: 369, name: '邻里纠纷'}, {value: 1048, name: '知识产权'}, {value: 251, name: '涉校纠纷'}, {value: 249, name: '医患纠纷'}]))
    this.draw('line', eos.setLine(qushifx))
    this.draw('bar', eos.setBar2(gequqk))
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
    background-color: #0b1740;
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
    width:169px;
    display:inline-block;
    height:38px;
    line-height:38px;
    font-size:20px;
    font-family:HiraginoSansGB-W3;
    color:rgba(121,190,242,1);
    padding-left:8px;
    box-sizing:border-box;
  }
  .renmintj_left{
    float:left;
    width:508px;
    margin:0 16px 22px 22px;

  }
  .renmintj_left_once{
    width:100%;
    height:313px;
    background:url('/static/renmintj/pic_frame1.png');
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
    background:url('/static/renmintj/pic_frame2.png');
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
  .anchorBL{
    display:none;
  }
  .renmintj_center_once{
    width:100%;
    height:313px;
    background:url('/static/renmintj/pic_frame3.png');
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
    background:url('/static/renmintj/pic_frame1.png');
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
