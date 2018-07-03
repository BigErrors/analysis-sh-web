<template>
  <div id='businessTypes' class='shade'>
    <div class="businessTypes_header">
      <div class="businessTypes_back" @click="changeRouter('index4renmintj')"></div>
    </div>
    <div class="businessTypes_nav">
      <span class="businessTypes_nav_span">首页 > 业务类型</span>
    </div>
    <div class="businessTypes_nav2_container">
      <div class="businessTypes_nav2">
        <!--  @click="changeRouter('')" -->
        <span class="businessTypes_nav2_span" :class="{'active':tjtype==='行专调解'?true:false}" @click="tjtype='行专调解'">行专调解</span>
        <span class="businessTypes_nav2_span" :class="{'active':tjtype==='一般调解'?true:false}" @click="tjtype='一般调解'">一般调解</span>
      </div>
      <div class="cas_container">
        <span class="cas_container_span">类型：</span>
        <el-cascader
          class="cascader"
          :options="type"
          placeholder="类型"
          v-model="typeDefault"
        ></el-cascader>
      </div>
      <div class="cas_container">
        <span class="cas_container_span">区域：</span>
        <el-cascader
          class="cascader"
          :options="area"
          placeholder="区域"
          v-model="areaDefault"
        ></el-cascader>
      </div>
    </div>
    <div class="businessTypes_content">
      <div class="businessTypes_column1">
        <div class="businessTypes_line1">
          <div class="businessTypes_content_title">
            <div class="businessTypes_content_title_right">
              <span class="businessTypes_content_title_span" :class="{'active':target1==='type3'?true:false}" @click="target1='type3'">本周</span>
              <span class="businessTypes_content_title_span" :class="{'active':target1==='type2'?true:false}" @click="target1='type2'">本月</span>
              <span class="businessTypes_content_title_span" :class="{'active':target1==='type1'?true:false}" @click="target1='type1'">今年</span>
            </div>
          </div>
          <div class="businessTypes_content_main">
            <div class="businessTypes_content_1">
              <span class="businessTypes_content_span1">{{xingZhuanTJS}}</span>
              <span class="businessTypes_content_span2">行专调解数</span>
            </div>
            <div class="border"></div>
            <div class="businessTypes_content_2">
              <span class="businessTypes_content_span3">{{tiaoJieAJS}}</span>
              <span class="businessTypes_content_span4">调解案件总数</span>
            </div>
            <div class="businessTypes_content_3 target1">
            </div>
          </div>
        </div>
        <div class="businessTypes_line2">
          <div class="businessTypes_content_title">
            <div class="businessTypes_content_title_left">案件数量变化</div>
            <div class="businessTypes_content_title_right">
              <span class="businessTypes_content_title_span" :class="{'active':target2==='type2'?true:false}" @click="target2='type2'">按月</span>
              <span class="businessTypes_content_title_span" :class="{'active':target2==='type1'?true:false}" @click="target2='type1'">按年</span>
            </div>
          </div>
          <div class="businessTypes_content_main target2">
          </div>
        </div>
        <div class="businessTypes_line3">
          <div class="businessTypes_content_title">
            <div class="businessTypes_content_title_left">案件受理数(TOP5)</div>
            <div class="businessTypes_content_title_right">
              <span class="businessTypes_content_title_span" :class="{'active':target3==='type2'?true:false}" @click="target3='type2'">调解员</span>
              <span class="businessTypes_content_title_span" :class="{'active':target3==='type1'?true:false}" @click="target3='type1'">机构</span>
            </div>
          </div>
          <div class="businessTypes_content_main">
            <div class="businessTypes_table_header">
              <span class="businessTypes_table_h1">排名</span>
              <span class="businessTypes_table_h2">名称</span>
              <span class="businessTypes_table_h3">受理数量</span>
            </div>
            <div class="businessTypes_table_body" v-for="(item, index) in anJianSLS" :key="index">
              <span class="businessTypes_table_b1">{{item.paiming}}</span>
              <span class="businessTypes_table_b2">{{item.name}}</span>
              <span class="businessTypes_table_b3">{{item.number}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="businessTypes_column2">
        <div class="businessTypes_line1">
          <div class="businessTypes_content_title">
            <div class="businessTypes_content_title_left">案件类型</div>
          </div>
          <div class="businessTypes_content_main target4">
          </div>
        </div>
        <div class="businessTypes_line2">
          <div class="businessTypes_content_title">
            <div class="businessTypes_content_title_left">案件处理状态</div>
          </div>
          <div class="businessTypes_content_main target5">
          </div>
        </div>
        <div class="businessTypes_line3">
          <div class="businessTypes_content_title">
            <div class="businessTypes_content_title_left">案件处理结果</div>
          </div>
          <div class="businessTypes_content_main">
            <div class="businessTypes_content_main_small target61"></div>
            <div class="businessTypes_content_main_small target62"></div>
            <div class="businessTypes_content_main_small target63"></div>
          </div>
        </div>
      </div>
      <div class="businessTypes_column3">
        <div class="businessTypes_line1">
          <div class="businessTypes_content_title">
            <div class="businessTypes_content_title_left">今日上报案件</div>
          </div>
          <div class="businessTypes_content_main" v-if="true">
            <div class="businessTypes_table_header">
              <span class="businessTypes_table_h4">序号</span>
              <span class="businessTypes_table_h5">名称</span>
              <span class="businessTypes_table_h5">类型</span>
              <span class="businessTypes_table_h5">地区</span>
              <span class="businessTypes_table_h5">状态</span>
            </div>
            <div class="businessTypes_table_body_container">
             <rollScreen :dLength='15' :height='35' :lineNum='5' class="left">
              <div class="businessTypes_table_body2" slot="slide" v-for="(item, index) in 15" :key="index">
                <span class="businessTypes_table_b4">{{index+1}}</span>
                <span class="businessTypes_table_b5">上报事件名称</span>
                <span class="businessTypes_table_b5">上报事件类型</span>
                <span class="businessTypes_table_b5">上报事件地区</span>
                <span class="businessTypes_table_b5">上报事件状态</span>
              </div>
            </rollScreen>
            </div>
          </div>
        </div>
        <div class="businessTypes_line2">
          <div class="businessTypes_content_title">
            <div class="businessTypes_content_title_left">当事人分析</div>
            <div class="businessTypes_content_title_right">
              <span class="businessTypes_content_title_span" :class="{'active':target8==='type2'?true:false}" @click="target8='type2'">被申请人</span>
              <span class="businessTypes_content_title_span" :class="{'active':target8==='type1'?true:false}" @click="target8='type1'">申请人</span>
            </div>
          </div>
          <div class="businessTypes_content_main">
            <div class="businessTypes_content_4">
              <span class="businessTypes_content_4_span1">性别占比</span>
              <img class="businessTypes_content_4_img1" src="/static/renmintj/bunan.png">
              <span class="businessTypes_content_4_span2">{{man + '%'}}</span>
              <img class="businessTypes_content_4_img2" src="/static/renmintj/bunv.png">
              <span class="businessTypes_content_4_span3">{{woman + '%'}}</span>
            </div>
            <div class="businessTypes_content_5 target81">
              <span class="businessTypes_content_5_span1">户籍占比</span>
            </div>
            <div class="businessTypes_content_6 target82"></div>
          </div>
        </div>
        <div class="businessTypes_line3">
          <div class="businessTypes_content_title">
            <div class="businessTypes_content_title_left">赔偿金额</div>
          </div>
          <div class="businessTypes_content_main">
            <div class="businessTypes_content_4">
              <span class="businessTypes_content_4_span4">本年度累计</span>
              <span class="businessTypes_content_4_span5">{{total}}</span>
              <span class="businessTypes_content_4_span6">万元</span>
            </div>
            <div class="businessTypes_content_5">
              <span class="businessTypes_content_5_span2">单笔最大</span>
              <span class="businessTypes_content_5_span3">{{max}}</span>
              <span class="businessTypes_content_5_span4">万元</span>
              <span class="businessTypes_content_5_span5">平均每笔</span>
              <span class="businessTypes_content_5_span6">{{avg}}</span>
              <span class="businessTypes_content_5_span7">万元</span>
            </div>
            <div class="businessTypes_content_6 target9"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eos from '@/util/echartsOptions'
import urlConfig from '@/util/urlConfig'
import rollScreen from '../rollScreen.vue'
import http from '@/util/httpUtil'
import json from '@/util/dictionaryMapping'

export default {
  components: {
    rollScreen
  },
  data: function () {
    return {
      myChart: {},
      target1: 'type1',
      target2: 'type1',
      target3: 'type1',
      target8: 'type1',
      table: {
        dLength: 0,
        lineNum: 0,
        data: []
      },
      tjtype: '行专调解',
      area: json.area,
      areaDefault: ['SHJCK01000'],
      type: json.caseType,
      typeDefault: ['交通'],
      xingZhuanTJS: 0,
      tiaoJieAJS: 0,
      anjianslbh: {
        year_casenumber: [],
        month_casenumber: []
      },
      anjiansls: {
        tjy_casenumber: [],
        jg_casenumber: []
      },
      anJianSLS: [],
      woman: 0,
      man: 0,
      total: 0,
      max: 0,
      avg: 0
    }
  },
  watch: {
    target1: function (newValue, oldValue) {
      switch (newValue) {
        case 'type1':
          newValue = 'year'
          break
        case 'type2':
          newValue = 'month'
          break
        case 'type3':
          newValue = 'week'
          break
      }
      this.xingZhuanTJS = this.tiaojiezlzb[newValue + '_number1']
      this.tiaoJieAJS = this.tiaojiezlzb[newValue + '_number2']
      this.draw('target1', eos.setPie4([(this.tiaojiezlzb[newValue + '_zhanbi'] * 100).toFixed(1), ((1 - this.tiaojiezlzb[newValue + '_zhanbi']) * 100).toFixed(1)], '占比'))
    },
    target2: function (newValue, oldValue) {
      if (newValue === 'type1') {
        newValue = 'year'
      } else {
        newValue = 'month'
      }
      this.draw('target2', eos.setLine2(this.anjianslbh[newValue + '_casenumber']))
    },
    target3: function (newValue, oldValue) {
      if (newValue === 'type1') {
        newValue = 'jg'
      } else {
        newValue = 'tjy'
      }
      this.anJianSLS = this.anjiansls[newValue + '_casenumber']
    },
    target8: function (newValue, oldValue) {
      if (newValue === 'type1') {
        newValue = 'sqr'
      } else {
        newValue = 'bsqr'
      }
      this.man = this.formatData(this.dangshirfx[newValue + '_data'].gender_man)
      this.woman = this.formatData(this.dangshirfx[newValue + '_data'].gender_woman)
      this.draw('target81', eos.setPie6([{name: '本地户口', value: this.formatData(this.dangshirfx[newValue + '_data'].huji_bendi)}, {name: '外地户口', value: this.formatData(this.dangshirfx[newValue + '_data'].huji_waidi)}, {name: '未知', value: this.formatData(this.dangshirfx[newValue + '_data'].huji_weizhi)}], 'percent', false, true))
      this.draw('target82', eos.setBar3(this.dangshirfx[newValue + '_data'].nlfb.map(item => {
        return {name: item.age, value: parseInt(item.number)}
      }), ['#2D65DD', '#2D65DD'], 'vertical', 'integer', 32, false, false))
    },
    tjtype: function (newValue, oldValue) {
      this.getData()
    },
    areaDefault: function (newValue, oldValue) {
      this.getData()
    },
    typeDefault: function (newValue, oldValue) {
      this.getData()
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
    formatData (data) {
      return (data * 100).toFixed(1)
    },
    getData () {
      let vue = this
      let baseUrl = urlConfig.baseUrl
      let url = '/categoryAnalysis'
      let param = { area: this.areaDefault[0], type: this.typeDefault[0], tjtype: this.tjtype }
      http.get(baseUrl + url, param, (data) => {
        vue.tiaojiezlzb = data.tiaojiezlzb
        vue.xingZhuanTJS = vue.tiaojiezlzb.year_number1
        vue.tiaoJieAJS = vue.tiaojiezlzb.year_number2
        vue.anjianslbh.year_casenumber = data.anjianslbh.year_casenumber.reverse()
        vue.anjianslbh.month_casenumber = data.anjianslbh.month_casenumber.reverse()
        vue.anjiansls.jg_casenumber = data.anjiansls.jg_casenumber
        vue.anjiansls.tjy_casenumber = data.anjiansls.tjy_casenumber
        vue.anJianSLS = vue.anjiansls.jg_casenumber
        vue.dangshirfx = data.dangshirfx
        vue.man = vue.formatData(data.dangshirfx.sqr_data.gender_man)
        vue.woman = vue.formatData(data.dangshirfx.sqr_data.gender_woman)
        vue.total = data.peichangje.benniandlj
        vue.max = data.peichangje.danbizd
        vue.avg = data.peichangje.pingjunmb
        vue.$nextTick(function () {
          vue.draw('target1', eos.setPie4([vue.formatData(vue.tiaojiezlzb.year_zhanbi), vue.formatData(1 - vue.tiaojiezlzb.year_zhanbi)], '占比'))
          vue.draw('target2', eos.setLine2(vue.anjianslbh.year_casenumber))
          vue.draw('target4', eos.setPie3(data.anjianlx.map(item => {
            return {name: item.name, value: parseInt(item.number)}
          }), 'radius'))
          vue.draw('target5', eos.setBar3([{name: '状态1', value: 246}, {name: '状态2', value: 123}], ['#F8E228', '#FF9C00'], 'vertical', 'integer', 32, false, false))
          vue.draw('target61', eos.setPie4([vue.formatData(data.anjiancljg.cg_bili), vue.formatData(1 - data.anjiancljg.cg_bili)], '调解成功', 0, 'top'))
          vue.draw('target62', eos.setPie4([vue.formatData(data.anjiancljg.xys_bili), vue.formatData(1 - data.anjiancljg.xys_bili)], '协议书', 0, 'top'))
          vue.draw('target63', eos.setPie4([vue.formatData(data.anjiancljg.sfjd_bili), vue.formatData(1 - data.anjiancljg.sfjd_bili)], '司法确认', 0, 'top'))
          vue.draw('target81', eos.setPie6([{name: '本地户口', value: vue.formatData(data.dangshirfx.sqr_data.huji_bendi)}, {name: '外地户口', value: vue.formatData(data.dangshirfx.sqr_data.huji_waidi)}, {name: '未知', value: vue.formatData(data.dangshirfx.sqr_data.huji_weizhi)}], 'percent', false, true))
          vue.draw('target82', eos.setBar3(data.dangshirfx.sqr_data.nlfb.map(item => {
            return {name: item.age, value: parseInt(item.number)}
          }), ['#2D65DD', '#2D65DD'], 'vertical', 'integer', 32, false, false))
          vue.draw('target9', eos.setBar3(data.peichangje.peichangjebh.reverse().map(item => {
            return {name: item.time, value: item.value}
          }), ['#2D65DD', '#2D65DD'], 'vertical', 'integer', 32, false, false))
        })
      })
    }
  },
  created () {
    this.getData()
  }
}

</script>

<style scoped>
  .shade {
    background: url(/static/renmintj/pic_bg.png);
    background-repeat: no-repeat;
    background-position: center;
  }

  .businessTypes_header {
    width: 100%;
    min-width: 1920px;
    height: 87px;
    background: url('/static/renmintj/pic_title.png');
    background-repeat: no-repeat;
    background-position: center;
    z-index: 99;
    position: relative;
  }

  .businessTypes_back {
    background: url('/static/renmintj/btn_back.png');
    position: absolute;
    left: 22px;
    width: 137px;
    height: 35px;
    background-position: center;
    top: 28px;
    cursor: pointer;
  }

  .businessTypes_nav {
    height: 24px;
    margin: 6px 0 20px 0;
    padding-left: 34px;
    width: 100%;
    box-sizing: border-box;
  }

  .businessTypes_nav_span {
    font-size: 18px;
    font-family: HiraginoSansGB-W3;
    color: rgba(94, 126, 203, 1);
  }

  .businessTypes_nav2 {
    border-bottom: 1px solid rgba(15, 59, 186, 1);
    display: inline-block;
  }

  .businessTypes_nav2_span {
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    padding-bottom: 10px;
    display: inline-block;
    width: 5em;
    text-align: center;
    cursor: pointer;
    color: rgba(94, 126, 203, 1);
  }

  .businessTypes_nav2 .active {
    color: rgba(255, 198, 0, 1);
    border-bottom: 3px solid rgba(255, 198, 0, 1);
  }

  .businessTypes_content {
    width: 100%;
    height: 903px;
    box-sizing: border-box;
    padding: 13px 24px 24px 24px;
  }
  .businessTypes_column1{
    width: 462px;
    display: inline-block;
    height: 866px;
  }
  .businessTypes_column2{
    width: 675px;
    height: 866px;
    display: inline-block;
    margin:0 20px;
  }
  .businessTypes_column3{
    width: 675px;
    height: 866px;
    display: inline-block;
  }
  .businessTypes_line1{
    width:100%;
    height: 281px;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
  }
  .businessTypes_line2{
    width:100%;
    height: 281px;
    margin:16px 0;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
  }
  .businessTypes_line3{
    width:100%;
    height: 281px;
    background: linear-gradient( rgba(0,33,129,0.5),rgba(0,33,129,0));
  }
  .businessTypes_content_title{
    display: block;
    width: 100%;
    height: 39px;
    padding:0 14px;
    padding-top: 10px;
    position: relative;
    box-sizing: border-box;
  }
  .businessTypes_content_title_left{
    font-size: 22px;
    font-family: MicrosoftYaHei;
    color: rgba(125,165,254,1);
    padding-left: 8px;
    border-left: 3px solid rgba(125,165,254,1);
    display: block;
    float: left;
  }
  .businessTypes_content_title_right{
    width:50%;
    float: right;
    height: 29px;
  }
  .businessTypes_content_title_span{
    font-size: 16px;
    font-family: MicrosoftYaHei;
    padding: 2px 12px;
    float: right;
    border-radius: 15px;
    margin-right: 16px;
    color: rgba(153,153,153,1);
    cursor: pointer;
  }
  .businessTypes_content_title_right .active{
    color: rgba(255,255,255,1);
    background: rgba(77,132,254,1);
  }
  .businessTypes_content_main{
    width: 100%;
    height: 242px;
    /* background: red; */
    box-sizing: border-box;
    position:relative;
    float:left;
  }

  .businessTypes_content_main_small{
    width: calc(33.33% - 60px);
    height: calc(242px - 60px);
    padding: 30px;
    /* box-sizing: border-box; */
    position:relative;
    float:left;
  }
  .businessTypes_content_main_small:nth-of-type(2),.businessTypes_content_main_small:nth-of-type(3){
    background:url("/static/renmintjOther/icon_directing.png");
    background-repeat:no-repeat;
    background-position:left center;
  }
  .businessTypes_content_1{
    position:absolute;
    width:60%;
    height: 50%;
    top:0;
    left: 0;
  }
  .businessTypes_content_2{
    position:absolute;
    width:60%;
    height: 50%;
    bottom:0;
    left: 0;
  }
  .businessTypes_content_3{
    position:absolute;
    width:40%;
    height: 100%;
    right:0;
    top: 0;
  }
  .businessTypes_content_span1{
    position: absolute;
    left:25px;
  }
  .businessTypes_content_span1{
    position: absolute;
    left:25px;
    top:100%;
    transform: translate(0,-120%);
    font-size:20px;
    font-family:'FZLTZHK--GBK1-0';
    color:rgba(0,246,255,1);
  }
  .businessTypes_content_span2{
    position: absolute;
    left:122px;
    top:100%;
    transform: translate(0,-130%);
    font-size:17px;
    font-family:HiraginoSansGB-W3;
    color:rgba(17,148,248,1);
  }
  .businessTypes_content_span3{
    position: absolute;
    left:25px;
    top:0%;
    transform: translate(0,20%);
    font-size:20px;
    font-family:'FZLTZHK--GBK1-0';
    color:rgba(0,246,255,1);
    opacity: 0.3;
  }
  .businessTypes_content_span4{
    position: absolute;
    left:122px;
    top:0%;
    transform: translate(0,20%);
    font-size:17px;
    font-family:'FZLTZHK--GBK1-0';
    color:rgba(17,148,248,1);
    opacity: 0.3;
  }
  .border{
    position: absolute;
    width:73px;
    height:1px;
    background:rgba(15,117,201,1);
    left: 25px;
    top:50%;
  }
  .businessTypes_table_header{
    width: 100%;
    height: 36px;
    line-height: 36px;
    font-family:'HiraginoSansGB-W3';
    color:rgba(17,148,248,1);
    text-align: center;
    padding-top:16px;
  }
  .businessTypes_table_h1{
    float: left;
    width: 25%
  }
  .businessTypes_table_h2{
    float: left;
    width: 45%
  }
  .businessTypes_table_h3{
    float: left;
    width: 30%
  }
  .businessTypes_table_body_container{
    width: 100%;
    height: 175px;
  }
  .businessTypes_table_body{
    width: 100%;
    height: 35px;
    line-height: 35px;
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(118,187,239,1);
    text-align: center;
  }
  .businessTypes_table_body span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .businessTypes_table_b1{
    float: left;
    width: 25%
  }
  .businessTypes_table_b2{
    float: left;
    width: 45%
  }
  .businessTypes_table_b3{
    float: left;
    width: 30%
  }
  .businessTypes_table_body:nth-of-type(2n){
    background: rgba(7,30,74,0.3);
  }
  .businessTypes_table_h4{
    float: left;
    width: 12%;
  }
  .businessTypes_table_h5{
    float: left;
    width: 22%;
  }
  .businessTypes_table_b4{
    float: left;
    width: 12%;
  }
  .businessTypes_table_b5{
    float: left;
    width: 22%;
  }
  .left{
    float: left;
  }
  .businessTypes_table_body2{
    width: 100%;
    height: 35px;
    line-height: 35px;
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(118,187,239,1);
    text-align: center;
  }
  .businessTypes_table_body2:nth-of-type(2n-1){
    background: rgba(7,30,74,0.3);
  }
  .businessTypes_content_4{
    position:absolute;
    width:35%;
    height: 45%;
    left:0;
    top: 0;
  }
  .businessTypes_content_5{
    position:absolute;
    width:35%;
    height: 55%;
    left:0;
    bottom: 0;
  }
  .businessTypes_content_6{
    position:absolute;
    width:65%;
    height: 100%;
    right:0;
    top: 0;
  }
  .businessTypes_content_4_span1{
    position: absolute;
    top: 17px;
    left: 37px;
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(17,148,248,1);
  }
  .businessTypes_content_4_img1{
    position: absolute;
    left:44px;
    top:62px;
  }
  .businessTypes_content_4_span2{
    position: absolute;
    font-size:18px;
    font-family:Impact;
    color:rgba(237,247,255,1);
    left: 82px;
    top:68px;
  }
  .businessTypes_content_4_img2{
    position: absolute;
    left:136px;
    top:62px;
  }
  .businessTypes_content_4_span3{
    position: absolute;
    font-size:18px;
    font-family:Impact;
    color:rgba(237,247,255,1);
    left: 172px;
    top:68px;
  }
  .businessTypes_content_5_span1{
    position: absolute;
    top: 5px;
    left: 37px;
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(17,148,248,1);
  }
  .businessTypes_content_4_span4{
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(17,148,248,1);
    position: absolute;
    top:17px;
    left: 37px;
  }
  .businessTypes_content_4_span5{
    font-size:47px;
    font-family:Impact;
    color:rgba(237,247,255,1);
    position: absolute;
    top:38px;
    left:37px;
  }
  .businessTypes_content_4_span6{
    font-size:12px;
    font-family:HiraginoSansGB-W3;
    color:rgba(17,148,248,1);
    position: absolute;
    top:72px;
    left:192px;
  }
  .businessTypes_content_5_span2{
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(17,148,248,1);
    position: absolute;
    top:12px;
    left:37px;
  }
  .businessTypes_content_5_span3{
    font-size:25px;
    font-family:Impact;
    color:rgba(237,247,255,1);
    position: absolute;
    top:44px;
    left:37px;
  }
  .businessTypes_content_5_span4{
    font-size:12px;
    font-family:HiraginoSansGB-W3;
    color:rgba(17,148,248,1);
    position: absolute;
    top:55px;
    left:95px;
  }
  .businessTypes_content_5_span5{
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(17,148,248,1);
    position: absolute;
    top:12px;
    left:154px;
  }
  .businessTypes_content_5_span6{
    font-size:25px;
    font-family:Impact;
    color:rgba(237,247,255,1);
    position: absolute;
    top:44px;
    left:154px;
  }
  .businessTypes_content_5_span7{
    font-size:12px;
    font-family:HiraginoSansGB-W3;
    color:rgba(17,148,248,1);
    position: absolute;
    top:55px;
    left:199px;
  }
  .businessTypes_nav2_container{
    display: block;
    box-sizing: border-box;
    margin:0 34px;
  }
  .cas_container{
    float: right;
  }
  .cas_container:nth-last-child(2){
    margin-left:48px;
  }
  .cas_container_span{
    font-size:16px;
    font-family:HiraginoSansGB-W3;
    color:rgba(94,126,203,1);
  }
</style>
