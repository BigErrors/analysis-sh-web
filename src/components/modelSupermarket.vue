<template>
  <div class="supermarket_container">
    <div class="supermarket_header">
      <img class="supermarket_header_icon" src="" />
      <span class="supermarket_header_title">上海市司法局-社会矛盾风险感控大数据平台</span>
    </div>
    <div class="supermarket_content">
      <div class="supermarket_nav_main">
        <img class="supermarket_nav_logo" src="/static/marketImages/icon_logo.png"/>
        <span class="supermarket_nav_span">模型超市</span>
      </div>
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
          <div class="supermaket_main_col">
            <img class="col1" src="/static/marketImages/8.png" />
            <span class="col1">和谐指数</span>
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
          <div class="supermaket_main_col">
            <img class="col2" src="/static/marketImages/9.png" />
            <span class="col2">情绪指数</span>
          </div>
        </div>
        <div class="supermarket_main_row">
          <div class="supermaket_main_col">
            <img class="col3" src="/static/marketImages/2.png" />
            <span class="col3">案件热词分析</span>
          </div>
          <div class="supermaket_main_col">
            <img class="col3" src="/static/marketImages/6.png" />
            <span class="col3">调解员画像分析</span>
          </div>
        </div>
        <div class="supermarket_main_row">
          <div class="supermaket_main_col">
            <img class="col4" src="/static/marketImages/3.png" />
            <span class="col4">重点人员挖掘</span>
          </div>
          <div class="supermaket_main_col">
            <img class="col4" src="/static/marketImages/4.png" />
            <span class="col4">数据碰撞分析</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.supermarket_container{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.supermarket_header{
  width: 100%;
  height: 55px;
  background:rgba(6,20,57,1);
  padding-left: 50px;
}
.supermarket_header_icon{
  width: 33px;
  height: 34px;
  position: absolute;
  left: 12px;
  top:10px;
}
.supermarket_header_title{
  line-height: 55px;
  color: white;
}
.supermarket_content{
  width: 100%;
  box-sizing: border-box;
  padding:0 30px;
  position: relative;
}
.supermarket_nav_main{
  width: 100%;
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
.supermarket_main{
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content:center;
  align-items:flex-start
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
  width: 70%;
  display: block;
  cursor: pointer;
}
.supermaket_main_col span{
  display: block;
  width: 70%;
  text-align: center;
  margin-top: 18px;
  font-size:14px;
  cursor: pointer;
}
.supermaket_main_col:hover{
  color:#1194F8
}
.col1{
  margin-left: 0;
}
.col2{
  margin-left: 10%;
}
.col3{
  margin-left: 20%;
}
.col4{
  margin-left: 30%;
}

</style>
