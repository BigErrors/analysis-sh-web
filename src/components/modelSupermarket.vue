<template>
  <div class="supermarket_container">
    <div class="supermarket_header" style='cursor: pointer;' @click='changeRouter("moduleChoose")'>
      <img class="supermarket_header_icon" src="/static/loginImages/icon_logo.png" />
      <span class="supermarket_header_title">上海市司法局-社会矛盾风险感控大数据平台</span>
    </div>
    <div class="supermarket_nav_main" style="margin: 10px 30px;">
      <img class="supermarket_nav_logo" src="/static/marketImages/icon_logo.png"/>
      <span class="supermarket_nav_span">模型超市</span>
      <div class="supermarket_nav_search">
        <input class="supermarket_nav_input" placeholder="请输入模型名称" />
        <i class="supermarket_nav_icon"></i>
      </div>
      <div v-if="showWhich==='dial'" class="supermarket_changed">
        <i class="supermarket_changed_icon changed_icon1"></i>
        <i class="supermarket_changed_icon changed_icon2" @click="showWhich='paved'"></i>
      </div>
      <div v-if="showWhich==='paved'" class="supermarket_changed">
        <i class="supermarket_changed_icon changed_icon3" @click="showWhich='dial'"></i>
        <i class="supermarket_changed_icon changed_icon4"></i>
      </div>
    </div>
    <div v-if="showWhich==='paved'" class="supermarket_content">
      <!-- <div class="supermarket_nav_main">
        <img class="supermarket_nav_logo" src="/static/marketImages/icon_logo.png"/>
        <span class="supermarket_nav_span">模型超市</span>
      </div> -->
      <div class="supermarket_main">
        <div class="supermarket_main_row">
          <div class="supermaket_main_col">
            <img class="col1" src="/static/marketImages/1.png" />
            <span class="col1">家暴专题模型</span>
          </div>
          <div class="supermaket_main_col">
            <img class="col1" src="/static/marketImages/7.png" />
            <span class="col1">重点事件挖掘</span>
          </div>
        </div>
        <div class="supermarket_main_row">
          <div class="supermaket_main_col">
            <img class="col2" src="/static/marketImages/10.png" />
            <span class="col2">案件密度模型</span>
          </div>
          <div class="supermaket_main_col">
            <img class="col2" src="/static/marketImages/5.png" />
            <span class="col2">重点机构挖掘</span>
          </div>
        </div>
        <div class="supermarket_main_row">
          <div class="supermaket_main_col">
            <img class="col2" src="/static/marketImages/4.png" />
            <span class="col2">数据碰撞分析</span>
          </div>
          <div class="supermaket_main_col">
            <img class="col2" src="/static/marketImages/3.png" />
            <span class="col2">重点人员挖掘</span>
          </div>
        </div>
        <div class="supermarket_main_row">
          <div class="supermaket_main_col">
            <img class="col2" src="/static/marketImages/2.png" />
            <span class="col2">案件热词分析</span>
          </div>
          <div class="supermaket_main_col">
            <img class="col2" src="/static/marketImages/6.png" />
            <span class="col2">调解员画像分析</span>
          </div>
        </div>
         <div class="supermarket_main_row">
          <div class="supermaket_main_col">
            <img class="col3" src="/static/marketImages/9.png" />
            <span class="col3">情绪指数</span>
          </div>
         <div class="supermaket_main_col">
            <img class="col3" src="/static/marketImages/8.png" />
            <span class="col3">和谐指数</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showWhich==='dial'" class="supermarket_content2">
      <div class="supermarket_carousel_page">{{whichPage}}/10</div>
      <el-carousel
        :interval="5000"
        type="card"
        height="505px"
        indicator-position='none'
        @change="carouselChanged">
        <el-carousel-item>
          <img class="supermarket_card_img" src="/static/marketImages/1.png" />
          <span class="supermarket_card_span">家暴专题模型</span>
          <span v-show="this.whichPage===1" class="supermarket_card_span2">凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快了</span>
        </el-carousel-item>
        <el-carousel-item>
          <img class="supermarket_card_img" src="/static/marketImages/2.png" />
          <span class="supermarket_card_span">家暴专题模型</span>
          <span v-show="this.whichPage===2" class="supermarket_card_span2">凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快了</span>
        </el-carousel-item>
        <el-carousel-item>
          <img class="supermarket_card_img" src="/static/marketImages/3.png" />
          <span class="supermarket_card_span">家暴专题模型</span>
          <span  v-show="this.whichPage===3" class="supermarket_card_span2">凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快了</span>
        </el-carousel-item>
        <el-carousel-item>
          <img class="supermarket_card_img" src="/static/marketImages/4.png" />
          <span class="supermarket_card_span">家暴专题模型</span>
          <span v-show="this.whichPage===4" class="supermarket_card_span2">凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快了</span>
        </el-carousel-item>
        <el-carousel-item>
          <img class="supermarket_card_img" src="/static/marketImages/5.png" />
          <span class="supermarket_card_span">家暴专题模型</span>
          <span v-show="this.whichPage===5" class="supermarket_card_span2">凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快了</span>
        </el-carousel-item>
        <el-carousel-item>
          <img class="supermarket_card_img" src="/static/marketImages/6.png" />
          <span class="supermarket_card_span">家暴专题模型</span>
          <span v-show="this.whichPage===6" class="supermarket_card_span2">凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快了</span>
        </el-carousel-item>
        <el-carousel-item>
          <img class="supermarket_card_img" src="/static/marketImages/7.png" />
          <span class="supermarket_card_span">家暴专题模型</span>
          <span v-show="this.whichPage===7" class="supermarket_card_span2">凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快了</span>
        </el-carousel-item>
        <el-carousel-item>
          <img class="supermarket_card_img" src="/static/marketImages/8.png" />
          <span class="supermarket_card_span">家暴专题模型</span>
          <span v-show="this.whichPage===8" class="supermarket_card_span2">凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快了</span>
        </el-carousel-item>
        <el-carousel-item>
          <img class="supermarket_card_img" src="/static/marketImages/9.png" />
          <span class="supermarket_card_span">家暴专题模型</span>
          <span v-show="this.whichPage===9" class="supermarket_card_span2">凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快了</span>
        </el-carousel-item>
        <el-carousel-item>
          <img class="supermarket_card_img" src="/static/marketImages/10.png" />
          <span class="supermarket_card_span">家暴专题模型</span>
          <span v-show="this.whichPage===10" class="supermarket_card_span2">凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快凉快了</span>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      showWhich: 'dial',
      whichPage: 1
    }
  },
  methods: {
    changeRouter (name) {
      if (name !== '') {
        this.$router.push({name: name})
      }
    },
    carouselChanged (to, from) {
      this.whichPage = to + 1
    }
  }
}
</script>

<style>
input::-ms-clear{display:none;}
.supermarket_container{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.supermarket_header{
  width: 100%;
  height: 75px;
  background:rgba(6,20,57,1);
  padding-left: 53px;
}
.supermarket_header_icon{
  width: 33px;
  height: 34px;
  position: absolute;
  left: 12px;
  top:18px;
}
.supermarket_header_title{
  line-height: 75px;
  color: white;
  font-size: 25px;
}
.supermarket_content{
  width: 100%;
  box-sizing: border-box;
  padding:0 100px;
  position: relative;
}
.supermarket_nav_main{
  height:61px;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(220,220,220);
  margin-bottom: 30px;
  line-height: 60px;
  position: relative;
}
.supermarket_nav_logo{
  position: absolute;
  left: 0;
  top:16px;
}
.supermarket_nav_span{
  padding-left: 35px;
  font-size:20px;
  font-family:'HiraginoSansGB-W3';
  color:rgba(17,148,248,1);
}
.supermarket_nav_search{
  float: right;
  width: 170px;
  height: 26px;
  margin-top:17px;
}
.supermarket_nav_input{
  width:130px;
  height: 26px;
  padding: 0;
  background: white;
  border:0;
  outline: none;
  border-style:none;
  float: left;
  font-size: 12px;
  padding-left: 7px;
  box-sizing: border-box;
  border-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.supermarket_nav_icon{
  float: right;
  width: 40px;
  height: 26px;
  background: url('/static/marketImages/icon_search.png');
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
  background-color:#1194F8;
  border-radius: 4px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.supermarket_changed{
  float: right;
  width: 66px;
  height: 26px;
  margin-top:17px;
  margin-right: 32px;
}
.supermarket_changed_icon{
  background-repeat: no-repeat;
  background-position: center center;
  width:26px;
  height: 26px;
}
.changed_icon1{
  float: left;
  background-image:url('/static/marketImages/icon_dial_blue.png')
}
.changed_icon2{
  float: right;
  background-image:url('/static/marketImages/icon_paved_gray.png');
  cursor: pointer;
}
.changed_icon3{
  float: left;
  background-image:url('/static/marketImages/icon_dial_gray.png');
  cursor: pointer;
}
.changed_icon4{
  float: right;
  background-image:url('/static/marketImages/icon_paved_blue.png')
}
.supermarket_main{
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content:center;
  align-items:flex-start;
  padding-top: 30px;
}
.supermarket_main_row{
  flex: 1;
  display:flex;
  flex-direction: column;
}
.supermaket_main_col{
  margin-bottom:34px;
  box-sizing: border-box;
}

.supermaket_main_col img{
  width: 80%;
  display: block;
  cursor: pointer;
  border-radius: 4px;
}
.supermaket_main_col span{
  display: block;
  width: 80%;
  text-align: center;
  margin-top: 18px;
  font-size: 16px;
  color: #717171;
  cursor: pointer;
}

.supermaket_main_col img:hover{
  box-shadow: 0px 4px 20px #1194F8;
}

.col1{
  margin-left: 0%;
}
.col2{
  margin:0 10%;
}
.col3{
  margin-left: 20%
}
.supermarket_content2{
  width: 100%;
  box-sizing: border-box;
  padding:0 200px;
  position: relative;
}
.supermarket_carousel_page{
  text-align: center;
  font-size:41px;
  font-family:FZLTCXHJW-GB1-0;
  color:rgba(113,113,113,1);
  line-height:41px;
  margin-top:53px;
}
.el-carousel__mask{
  background: transparent!important;
}
.supermarket_card_img{
  width: 80%;
  margin:auto;
  display: block;
  border-radius: 4px;
  margin-top:34px;
}
.supermarket_card_span{
  display: block;
  width: 100%;
  text-align: center;
  font-size:21px;
  color:rgba(17,148,248,1);
  font-family:HiraginoSansGB-W3;
  margin-top:10px;
}
.supermarket_card_span2{
  display: block;
  width: 60%;
  font-size:14px;
  font-family:HiraginoSansGB-W3;
  color:rgba(166,167,169,1);
  text-align: center;
  margin:auto;
  margin-top:12px;
  line-height: 24px;
}

</style>
