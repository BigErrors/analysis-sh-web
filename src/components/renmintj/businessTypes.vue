<template>
  <div id='businessTypes' class='shade'>
    <div class="businessTypes_header">
      <div class="businessTypes_back" @click="changeRouter('index4renmintj')" style="cursor: pointer;"></div>
    </div>
    <div class="businessTypes_nav">
      <span class="businessTypes_nav_span">首页 > 业务类型</span>
    </div>
    <div class="businessTypes_nav2_container">
      <div class="businessTypes_nav2">
        <!--  @click="changeRouter('')" -->
        <span class="businessTypes_nav2_span active">行专调节</span>
        <span class="businessTypes_nav2_span">一般调节</span>
      </div>
      <div class="cas_container">
        <span class="cas_container_span">区域：</span>
        <el-cascader
          class="cascader"
          :options="option"
          placeholder="调委会类型"
          v-model="optionDefault"
        ></el-cascader>
      </div>
      <div class="cas_container">
        <span class="cas_container_span">类型：</span>
        <el-cascader
          class="cascader"
          :options="option"
          placeholder="调委会类型"
          v-model="optionDefault"
        ></el-cascader>
      </div>
    </div>
    <div class="businessTypes_content">
      <div class="businessTypes_column1">
        <div class="businessTypes_line1">
          <div class="businessTypes_content_title">
            <div class="businessTypes_content_title_right">
              <span class="businessTypes_content_title_span">本周</span>
              <span class="businessTypes_content_title_span">本月</span>
              <span class="businessTypes_content_title_span active">今年</span>
            </div>
          </div>
          <div class="businessTypes_content_main">
            <div class="businessTypes_content_1">
              <span class="businessTypes_content_span1">217523</span>
              <span class="businessTypes_content_span2">行专调解数</span>
            </div>
            <div class="border"></div>
            <div class="businessTypes_content_2">
              <span class="businessTypes_content_span3">355197</span>
              <span class="businessTypes_content_span4">调解案件总数</span>
            </div>
            <div class="businessTypes_content_3">
            </div>
          </div>
        </div>
        <div class="businessTypes_line2">
          <div class="businessTypes_content_title">
            <div class="businessTypes_content_title_left">案件数量变化</div>
            <div class="businessTypes_content_title_right">
              <span class="businessTypes_content_title_span">按月</span>
              <span class="businessTypes_content_title_span active">按年</span>
            </div>
          </div>
          <div class="businessTypes_content_main">
          </div>
        </div>
        <div class="businessTypes_line3">
          <div class="businessTypes_content_title">
            <div class="businessTypes_content_title_left">案件受理数(TOP5)</div>
            <div class="businessTypes_content_title_right">
              <span class="businessTypes_content_title_span">调解员</span>
              <span class="businessTypes_content_title_span active">机构</span>
            </div>
          </div>
          <div class="businessTypes_content_main">
            <div class="businessTypes_table_header">
              <span class="businessTypes_table_h1">排名</span>
              <span class="businessTypes_table_h2">名称</span>
              <span class="businessTypes_table_h3">受理数量</span>
            </div>
            <div class="businessTypes_table_body">
              <span class="businessTypes_table_b1">1</span>
              <span class="businessTypes_table_b2">XXX委员会</span>
              <span class="businessTypes_table_b3">1234</span>
            </div>
            <div class="businessTypes_table_body">
              <span class="businessTypes_table_b1">1</span>
              <span class="businessTypes_table_b2">XXX委员会</span>
              <span class="businessTypes_table_b3">1234</span>
            </div>
            <div class="businessTypes_table_body">
              <span class="businessTypes_table_b1">1</span>
              <span class="businessTypes_table_b2">XXX委员会</span>
              <span class="businessTypes_table_b3">1234</span>
            </div>
            <div class="businessTypes_table_body">
              <span class="businessTypes_table_b1">1</span>
              <span class="businessTypes_table_b2">XXX委员会</span>
              <span class="businessTypes_table_b3">1234</span>
            </div>
            <div class="businessTypes_table_body">
              <span class="businessTypes_table_b1">1</span>
              <span class="businessTypes_table_b2">XXX委员会</span>
              <span class="businessTypes_table_b3">1234</span>
            </div>
          </div>
        </div>
      </div>
      <div class="businessTypes_column2">
        <div class="businessTypes_line1">
          <div class="businessTypes_content_title">
            <div class="businessTypes_content_title_left">案件类型</div>
          </div>
          <div class="businessTypes_content_main">
          </div>
        </div>
        <div class="businessTypes_line2">
          <div class="businessTypes_content_title">
            <div class="businessTypes_content_title_left">案件处理状态</div>
          </div>
          <div class="businessTypes_content_main">
          </div>
        </div>
        <div class="businessTypes_line3">
          <div class="businessTypes_content_title">
            <div class="businessTypes_content_title_left">案件处理结果</div>
          </div>
          <div class="businessTypes_content_main">
          </div>
        </div>
      </div>
      <div class="businessTypes_column3">
        <div class="businessTypes_line1">
          <div class="businessTypes_content_title">
            <div class="businessTypes_content_title_left">今日上报案件</div>
          </div>
          <div class="businessTypes_content_main">
            <div class="businessTypes_table_header">
              <span class="businessTypes_table_h4">序号</span>
              <span class="businessTypes_table_h5">名称</span>
              <span class="businessTypes_table_h5">类型</span>
              <span class="businessTypes_table_h5">地区</span>
              <span class="businessTypes_table_h5">状态</span>
            </div>
            <div class="businessTypes_table_body_container">
             <rollScreen :dLength='zhongdiansj.length' :height='35' :lineNum='5' class="left">
              <div class="businessTypes_table_body2" slot="slide" v-for="(item, index) in zhongdiansj" :key="index">
                <span class="businessTypes_table_b4">{{item.xuhao}}</span>
                <span class="businessTypes_table_b5">上报事件1</span>
                <span class="businessTypes_table_b5">{{item.shijianlx}}</span>
                <span class="businessTypes_table_b5">{{item.diqu}}</span>
                <span class="businessTypes_table_b5">代办申请</span>
              </div>
            </rollScreen>
            </div>
          </div>
        </div>
        <div class="businessTypes_line2">
          <div class="businessTypes_content_title">
            <div class="businessTypes_content_title_left">当事人分析</div>
            <div class="businessTypes_content_title_right">
              <span class="businessTypes_content_title_span">被申请人</span>
              <span class="businessTypes_content_title_span active">申请人</span>
            </div>
          </div>
          <div class="businessTypes_content_main">
            <div class="businessTypes_content_4">
              <span class="businessTypes_content_4_span1">性别占比</span>
              <img class="businessTypes_content_4_img1" src="/static/renmintj/bunan.png">
              <span class="businessTypes_content_4_span2">57%</span>
              <img class="businessTypes_content_4_img2" src="/static/renmintj/bunv.png">
              <span class="businessTypes_content_4_span3">43%</span>
            </div>
            <div class="businessTypes_content_5">
              <span class="businessTypes_content_5_span1">户籍占比</span>
            </div>
            <div class="businessTypes_content_6"></div>
          </div>
        </div>
        <div class="businessTypes_line3">
          <div class="businessTypes_content_title">
            <div class="businessTypes_content_title_left">赔偿金额</div>
          </div>
          <div class="businessTypes_content_main">
            <div class="businessTypes_content_4">
              <span class="businessTypes_content_4_span4">本年度累计</span>
              <span class="businessTypes_content_4_span5">13652</span>
              <span class="businessTypes_content_4_span6">万元</span>
            </div>
            <div class="businessTypes_content_5">
              <span class="businessTypes_content_5_span2">单笔最大</span>
              <span class="businessTypes_content_5_span3">500</span>
              <span class="businessTypes_content_5_span4">万元</span>
              <span class="businessTypes_content_5_span5">平均每笔</span>
              <span class="businessTypes_content_5_span6">70</span>
              <span class="businessTypes_content_5_span7">万元</span>
            </div>
            <div class="businessTypes_content_6"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rollScreen from '../rollScreen.vue'
import zhongdiansj from '@/../static/json/renmintj/jicengsfdsjzpt_zhongdiansj'
export default {
  components: {
    rollScreen
  },
  data: function () {
    return {
      zhongdiansj: zhongdiansj,
      option: [{
        'label': '全部区域',
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
      optionDefault: [0]
    }
  },
  methods: {
    changeRouter (name) {
      this.$router.push({name: name})
    }
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
    box-sizing: border-box;
    position:relative;
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
