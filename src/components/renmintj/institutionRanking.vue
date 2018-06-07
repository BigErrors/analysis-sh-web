<template>
  <div id='institutionRanking' class='shade'>
    <div class="institutionRanking_header">
      <div class="institutionRanking_back" @click="changeRouter('index4renmintj')" style="cursor: pointer;"></div>
    </div>
    <div class="institutionRanking_nav">
      <span class="institutionRanking_nav_span">首页 > 机构排名</span>
    </div>
    <div class="institutionRanking_nav2_container">
      <div class="institutionRanking_nav2">
        <span class="institutionRanking_nav2_span active" @click="changeRouter('')">机构排名</span>
        <span class="institutionRanking_nav2_span" @click="changeRouter('')"></span>
      </div>
    </div>
    <div class="institutionRanking_nav3">
      <div class="institutionRanking_nav3_left active">区局</div>
      <div class="institutionRanking_nav3_left">司法所</div>
      <div class="institutionRanking_nav3_left">调委会</div>
      <div class="institutionRanking_nav3_right">导出Excel</div>
      <div class="institutionRanking_nav3_date">
         <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
    </div>
    <div class="institutionRanking_content">
      <table cellspacing="0" class="institutionRanking_content_table">
        <thead class="institutionRanking_content_thead">
          <tr>
            <th><span class="institutionRanking_content_span">排名</span></th>
            <th><span class="institutionRanking_content_span">名称</span></th>
            <th><span class="institutionRanking_content_span">人员数量</span><i class="bg1"></i></th>
            <th><span class="institutionRanking_content_span">业务总量</span><i class="bg2"></i></th>
            <th><span class="institutionRanking_content_span">调解案件数</span><i class="bg3"></i></th>
            <th><span class="institutionRanking_content_span">排查反馈数</span><i class="bg1"></i></th>
            <th><span class="institutionRanking_content_span">调节案例上报数</span><i class="bg1"></i></th>
            <th><span class="institutionRanking_content_span">咨询管理日志数</span><i class="bg1"></i></th>
            <th><span class="institutionRanking_content_span">村居服务数</span><i class="bg1"></i></th>
            <th><span class="institutionRanking_content_span">法宣活动数</span><i class="bg1"></i></th>
            <th><span class="institutionRanking_content_span">业务系统使用率</span><i class="bg1"></i></th>
          </tr>
        </thead>
        <tbody class="institutionRanking_content_tbody">
          <tr>
            <td><img class="institutionRanking_content_jp" src='/static/renmintj/jingpai.png' /></td>
            <td><div class="institutionRanking_content_jg">徐汇区司法局</div></td>
            <td><span class="institutionRanking_content_rysl">1234</span></td>
            <td><span class="institutionRanking_content_span2">1234</span></td>
            <td><span class="institutionRanking_content_span2">1234</span></td>
            <td><span class="institutionRanking_content_span2">1234</span></td>
            <td><span class="institutionRanking_content_span2">1234</span></td>
            <td><span class="institutionRanking_content_span3">1234</span></td>
            <td><span class="institutionRanking_content_span3">1234</span></td>
            <td><span class="institutionRanking_content_span3">1234</span></td>
            <td><span class="institutionRanking_content_span4">1234</span></td>
          </tr>
           <tr>
            <td><img class="institutionRanking_content_jp" src='/static/renmintj/jingpai.png' /></td>
            <td><div class="institutionRanking_content_jg">徐汇区司法局</div></td>
            <td><span class="institutionRanking_content_rysl">1234</span></td>
            <td><span class="institutionRanking_content_span2">1234</span></td>
            <td><span class="institutionRanking_content_span2">1234</span></td>
            <td><span class="institutionRanking_content_span2">1234</span></td>
            <td><span class="institutionRanking_content_span2">1234</span></td>
            <td><span class="institutionRanking_content_span3">1234</span></td>
            <td><span class="institutionRanking_content_span3">1234</span></td>
            <td><span class="institutionRanking_content_span3">1234</span></td>
            <td><span class="institutionRanking_content_span4">1234</span></td>
          </tr>
           <tr>
            <td><img class="institutionRanking_content_jp" src='/static/renmintj/jingpai.png' /></td>
            <td><div class="institutionRanking_content_jg">徐汇区司法局</div></td>
            <td><span class="institutionRanking_content_rysl">1234</span></td>
            <td><span class="institutionRanking_content_span2">1234</span></td>
            <td><span class="institutionRanking_content_span2">1234</span></td>
            <td><span class="institutionRanking_content_span2">1234</span></td>
            <td><span class="institutionRanking_content_span2">1234</span></td>
            <td><span class="institutionRanking_content_span3">1234</span></td>
            <td><span class="institutionRanking_content_span3">1234</span></td>
            <td><span class="institutionRanking_content_span3">1234</span></td>
            <td><span class="institutionRanking_content_span4">1234</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      date: ''
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

.institutionRanking_header {
  width: 100%;
  min-width: 1920px;
  height: 87px;
  background: url('/static/renmintj/pic_title.png');
  background-repeat: no-repeat;
  background-position: center;
  z-index: 99;
  position: relative;
}

.institutionRanking_back {
  background: url('/static/renmintj/btn_back.png');
  position: absolute;
  left: 22px;
  width: 137px;
  height: 35px;
  background-position: center;
  top: 28px;
  cursor: pointer;
}

.institutionRanking_nav {
  height: 24px;
  margin: 6px 0 20px 0;
  padding-left: 34px;
  width: 100%;
  box-sizing: border-box;
}

.institutionRanking_nav_span {
  font-size: 18px;
  font-family: HiraginoSansGB-W3;
  color: rgba(94, 126, 203, 1);
}

.institutionRanking_nav2 {
  border-bottom: 1px solid rgba(15, 59, 186, 1);
  display: inline-block;
}

.institutionRanking_nav2_span {
  font-size: 20px;
  font-family: HiraginoSansGB-W3;
  padding-bottom: 10px;
  display: inline-block;
  width: 5em;
  text-align: center;
  cursor: pointer;
  color: rgba(94, 126, 203, 1);
}

.institutionRanking_nav2 .active {
  color: rgba(255, 198, 0, 1);
  border-bottom: 3px solid rgba(255, 198, 0, 1);
}
.institutionRanking_nav2_container{
  display: block;
  box-sizing: border-box;
  margin:0 34px;
}
.institutionRanking_nav3{
  margin:18px 34px;
  display: block;
  height: 42px;
}
.institutionRanking_nav3_left{
  width:75px;
  height: 36px;
  box-sizing: border-box;
  border:1px solid #7B95F6;
  text-align: center;
  font-size:16px;
  font-family:HiraginoSansGB-W3;
  color:rgba(94,126,203,1);
  line-height: 34px;
  float: left;
  border-radius:2px;
  margin:2px 32px 2px 0;
}
.institutionRanking_nav3 .active{
  color:rgba(255,198,0,1);
  border:1px solid #FFC600
}
.institutionRanking_nav3_right{
  float: right;
  height:36px;
  margin:2px 0px 2px 10px;
  background:rgba(255,198,0,1);
  font-size:16px;
  font-family:HiraginoSansGB-W3;
  color:rgba(255,255,255,1);
  text-align: center;
  line-height: 36px;
  border-radius: 2px;
  width: 100px;
}
.institutionRanking_nav3_date{
  float: right;
  height: 42px;
  box-sizing: border-box;
  padding: 1px 0;
}
.institutionRanking_content{
  width: 100%;
  box-sizing: border-box;
  display: block;
  position: relative;
  height: 825px;
  padding:0 34px 0 34px;
}
.institutionRanking_content_table{
  width: 100%;
}
.institutionRanking_content_thead{
  height: 44px;
  font-size:16px;
  font-family:HiraginoSansGB-W3;
  color:rgba(17,148,248,1);
}
.institutionRanking_content_span{
  height: 36px;
  line-height: 36px;
  display: inline-block;
}
.institutionRanking_content_thead th{
  padding:0;
}
.institutionRanking_content_thead .bg1{
  width: 9px;
  height: 36px;
  margin-left:5px;
  display: inline-block;
  background: url('/static/renmintj/jiantou.png');
  background-repeat: no-repeat;
  vertical-align: middle;
  background-position: left 1px top 9px;
}
.institutionRanking_content_thead .bg2{
  width: 9px;
  height: 36px;
  margin-left:5px;
  display: inline-block;
  background: url('/static/renmintj/jiantou.png');
  background-repeat: no-repeat;
  vertical-align: middle;
  background-position: left -7px top 9px;
}
.institutionRanking_content_thead .bg3{
  width: 9px;
  height: 36px;
  margin-left:5px;
  display: inline-block;
  background: url('/static/renmintj/jiantou.png');
  background-repeat: no-repeat;
  vertical-align: middle;
  background-position: left -16px top 9px;
}
.institutionRanking_content_tbody tr{
  height: 76px;
  text-align: center
}
.institutionRanking_content_jp{
  vertical-align: middle;
}
.institutionRanking_content_jg{
  height: 60px;
  background:url('/static/renmintj/jigoumc.png');
  display: inline-block;
  background-repeat: no-repeat;
  background-position: left center;
  padding-left:110px;
  font-size:14px;
  font-family:HiraginoSansGB-W3;
  color:rgba(204,233,255,1);
  line-height: 60px;
}
.institutionRanking_content_rysl{
  background: linear-gradient(left, #4481EB,#04BEFE);
  padding:4px 8px;
  border-radius: 6px;
  font-size:16px;
  font-family:HiraginoSansGB-W3;
  color:rgba(255,255,255,1);
}
.institutionRanking_content_span2{
  font-size:16px;
  font-family:HiraginoSansGB-W3;
  color:rgba(255,255,255,1);
  opacity:0.4;
}
.institutionRanking_content_span3{
  background:rgba(77,132,254,1);
  opacity:0.4;
  border-radius:2px;
  padding:4px 8px;
  height:51px;
  color:rgba(255,255,255,1);
}
.institutionRanking_content_span4{
  font-size:16px;
  font-family:HiraginoSansGB-W3;
  color:rgba(255,255,255,1);
  opacity:0.4;
  padding-left:5px;
}
.institutionRanking_content_tbody tr:nth-of-type(2n-1) td{
  background: rgba(7,30,74,0.8);
}
</style>
