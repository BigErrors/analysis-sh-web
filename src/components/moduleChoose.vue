<template>
  <div class="module_container">
    <div class="module_header">
      <div class="module_userInfo"></div>
    </div>
    <div class="module_center"></div>
    <div class="module_content">
      <div class="enjoy_carousel_container">
        <div class="enjoy_carousel_once_6 bg1" @click='changeRouter("")' :class="{once_6_first:mark===1,once_6_second:mark===2,once_6_third:mark===3,once_6_fourth:mark===4,once_6_fifth:mark===5,once_6_sixth:mark===6}">
          <div v-if="mark===2" class="righttop"></div>
          <div v-if="mark===2" class="lefttop"></div>
          <div v-if="mark===2" class="rightbottom"></div>
          <div v-if="mark===2" class="leftbottom"></div>
          <div class="cover"><img class="cover_img_left" src="/static/moduleImages/right.png" /><span class="cover_span">模型超市</span><img class="cover_img_right" src="/static/moduleImages/left.png"/></div>
        </div>
        <div class="enjoy_carousel_once_6 bg2" @click='changeRouter("")' :class="{once_6_first:mark===6,once_6_second:mark===1,once_6_third:mark===2,once_6_fourth:mark===3,once_6_fifth:mark===4,once_6_sixth:mark===5}">
          <div v-if="mark===1" class="righttop"></div>
          <div v-if="mark===1" class="lefttop"></div>
          <div v-if="mark===1" class="rightbottom"></div>
          <div v-if="mark===1" class="leftbottom"></div>
          <div class="cover"><img class="cover_img_left" src="/static/moduleImages/right.png" /><span class="cover_span">数据应用</span><img class="cover_img_right" src="/static/moduleImages/left.png"/></div>
        </div>
        <div class="enjoy_carousel_once_6 bg3" @click='changeRouter("mapApp")' :class="{once_6_first:mark===5,once_6_second:mark===6,once_6_third:mark===1,once_6_fourth:mark===2,once_6_fifth:mark===3,once_6_sixth:mark===4}">
          <div v-if="mark===6" class="righttop"></div>
          <div v-if="mark===6" class="lefttop"></div>
          <div v-if="mark===6" class="rightbottom"></div>
          <div v-if="mark===6" class="leftbottom"></div>
          <div class="cover"><img class="cover_img_left" src="/static/moduleImages/right.png" /><span class="cover_span">数据展示</span><img class="cover_img_right" src="/static/moduleImages/left.png"/></div>
        </div>
        <div class="enjoy_carousel_once_6 bg4" @click='changeRouter("")' :class="{once_6_first:mark===4,once_6_second:mark===5,once_6_third:mark===6,once_6_fourth:mark===1,once_6_fifth:mark===2,once_6_sixth:mark===3}">
          <div v-if="mark===5" class="righttop"></div>
          <div v-if="mark===5" class="lefttop"></div>
          <div v-if="mark===5" class="rightbottom"></div>
          <div v-if="mark===5" class="leftbottom"></div>
          <div class="cover"><img class="cover_img_left" src="/static/moduleImages/right.png" /><span class="cover_span">模型超市</span><img class="cover_img_right" src="/static/moduleImages/left.png"/></div>
        </div>
        <div class="enjoy_carousel_once_6 bg5" @click='changeRouter("")' :class="{once_6_first:mark===3,once_6_second:mark===4,once_6_third:mark===5,once_6_fourth:mark===6,once_6_fifth:mark===1,once_6_sixth:mark===2}">
          <div v-if="mark===4" class="righttop"></div>
          <div v-if="mark===4" class="lefttop"></div>
          <div v-if="mark===4" class="rightbottom"></div>
          <div v-if="mark===4" class="leftbottom"></div>
          <div class="cover"><img class="cover_img_left" src="/static/moduleImages/right.png" /><span class="cover_span">数据应用</span><img class="cover_img_right" src="/static/moduleImages/left.png"/></div>
        </div>
        <div class="enjoy_carousel_once_6 bg6" @click='changeRouter("mapApp")' :class="{once_6_first:mark===2,once_6_second:mark===3,once_6_third:mark===4,once_6_fourth:mark===5,once_6_fifth:mark===6,once_6_sixth:mark===1}">
          <div v-if="mark===3" class="righttop"></div>
          <div v-if="mark===3" class="lefttop"></div>
          <div v-if="mark===3" class="rightbottom"></div>
          <div v-if="mark===3" class="leftbottom"></div>
          <div class="cover"><img class="cover_img_left" src="/static/moduleImages/right.png" /><span class="cover_span">数据展示</span><img class="cover_img_right" src="/static/moduleImages/left.png"/></div>
        </div>
        <div class="module_footer"></div>
        <div class="module_last"  @click="changemark('last')"></div>
        <div class="module_next"  @click="changemark('next')"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      mark: 1,
      timer: '',
      timer2: '', // 这个timer给鼠标移动事件，鼠标移动就给循环上锁
      lockTimer: false, // 给循环上锁
      lockClick: false // 给点击上锁，防止连续点击
    }
  },
  methods: {
    changeRouter (name) {
      if (name !== '') {
        this.$router.push({name: name})
      }
    },
    changemark: function (fn) {
      let _this = this
      this.timer = ''
      if (fn === 'next' && this.lockClick === false) {
        this.lockClick = true
        if (this.mark < 6) {
          this.mark++
        } else {
          this.mark = 1
        }
        setTimeout(function () {
          _this.lockClick = false
          _this.lockTimer = false
        }, 2000)
      } else if (fn === 'last' && this.lockClick === false) {
        this.lockClick = true
        if (this.mark > 1) {
          this.mark--
        } else {
          this.mark = 6
        }
        setTimeout(function () {
          _this.lockClick = false
          _this.lockTimer = false
        }, 2000)
      }
    },
    moving: function () {
      // let _this = this
      // if (this.timer2) {
      //   clearTimeout(this.timer2)
      // }
      // this.$nextTick(function () {
      //   _this.lockTimer = true
      // })
      // this.timer2 = setTimeout(function () {
      //   _this.lockTimer = false
      // }, 5000)
    }
  },
  mounted: function () {
    let _this = this
    this.timer = setInterval(function () {
      console.log(_this.lockTimer)
      if (_this.mark < 6 && _this.lockTimer === false) {
        _this.mark++
      } else {
        _this.mark = 1
      }
    }, 5000)
  }
}
</script>

<style scoped>
.module_container{
  height: 100%;
  width: 100%;
  background: url('/static/moduleImages/back.png');
  padding:0;
  margin:0;
  overflow: hidden
}
.module_header{
  height: 94px;
  width: 100%;
  background: url('/static/moduleImages/上海市司法局.png');
  background-position: center;
  background-repeat:no-repeat;
}
.module_center{
  width: 100%;
  margin:95px 0 45px 0;
  height: 47px;
  background:url('/static/moduleImages/社会矛盾风险感控大数据平台.png');
  background-position: center;
  background-repeat:no-repeat;
}
.module_content{
  width: 100%;
  box-sizing: border-box;
  height:578px;
  margin:auto;
  z-index: 2;
}
.module_footer{
  width: 100%;
  background:url('/static/moduleImages/footer.png');
  background-position: center;
  background-repeat:no-repeat;
  position: absolute;
  height: 289px;
  bottom: 0;
  transform: translate3d(0,250px,-600px)
}
.enjoy_carousel_container {
  width: 100%;
  height: 100%;
  position: relative;
  left: 0;
  top: 0;
  transform-style: preserve-3d;
  transform: rotatex(0deg);
  perspective: 5000;
}
.enjoy_carousel_container .enjoy_carousel_once_6 {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  transition: all 1s linear,border 0.4s;
  background-position:center;
  background-repeat:no-repeat;
  border:3px solid #5cb4ff;
}
.enjoy_carousel_once_6:hover{
  box-shadow:0 0 25px #3298fe
}
.bg1{
  background: url('/static/moduleImages/1.png')
}
.bg2{
  background: url('/static/moduleImages/2.png')
}
.bg3{
  background: url('/static/moduleImages/3.png')
}
.bg4{
  background: url('/static/moduleImages/1.png')
}
.bg5{
  background: url('/static/moduleImages/2.png')
}
.bg6{
  background: url('/static/moduleImages/3.png')
}
.righttop{
  width: 46px;
  height: 46px;
  border: 3px solid #5cb4ff;
  position: absolute;
  right: -6px;
  top: -6px;
  border-left: 0;
  border-bottom: 0;
  transition: 0.4s;
}
.lefttop{
  width: 46px;
  height: 46px;
  border: 3px solid #5cb4ff;
  position: absolute;
  left:-6px;
  top:-6px;
  border-right: 0;
  border-bottom: 0;
  transition: 0.4s;
}
.rightbottom{
  width: 46px;
  height: 46px;
  border: 3px solid #5cb4ff;
  position: absolute;
  right: -6px;
  bottom: -6px;
  border-left: 0;
  border-top: 0;
  transition: 0.4s;
}
.leftbottom{
  width: 46px;
  height: 46px;
  border: 3px solid #5cb4ff;
  position: absolute;
  left: -6px;
  bottom: -6px;
  border-right: 0;
  border-top: 0;
  transition: 0.4s;
}
.enjoy_carousel_container .once_6_first {
  width: 650px;
  transform: translate3d(-205px, 0, 0) rotatey(-60deg);
  transform-origin: right center;
}
.enjoy_carousel_container .once_6_second {
  width:954px;
  transform: translate3d(483px, 0, 0);
}
.enjoy_carousel_container .once_6_third {
  width: 650px;
  transform: translate3d(1476px, 0, 0) rotatey(60deg);
  transform-origin: left center;
}
.enjoy_carousel_container .once_6_fourth {
  width: 650px;
  transform: translate3d(1917px, 0, -1218px) rotatey(120deg);
  transform-origin: left center;
  opacity: 0;
}
.enjoy_carousel_container .once_6_fifth {
  width: 953px;
  transform: translate3d(483px, 0, -867px);
  opacity: 0;
}
.enjoy_carousel_container .once_6_sixth {
  width: 650px;
  transform: translate3d(-579px, 0, -915px) rotatey(-120deg);
  transform-origin: right center;
  opacity: 0;
}

.cover{
  position: absolute;
  bottom:0;
  height: 106px;
  background: rgba(1,26,81,0.58);
  display: flex;
  align-items: center;/*垂直居中*/
  justify-content: center;/*水平居中*/
  text-align: center;
  width: 100%
}
.cover_span{
  text-align: center;
  height: 106px;
  line-height: 106px;
  font-size: 33px;
  color:#ffffff;
  font-family: 'FZLTZHK--GBK1-0';
  display: inline-block;
  margin:0 10px;
}
.module_last{
  position: absolute;
  left: 65px;
  top:50%;
  transform: translate(0,-50%);
  cursor: pointer;
  width: 80px;
  height: 86px;
  background: url('/static/moduleImages/last.png');
  background-position:center center;
  background-repeat: no-repeat;
}
.module_last:hover{
  background: url('/static/moduleImages/last发光.png')
}
.module_next{
  position: absolute;
  right: 65px;
  top:50%;
  transform: translate(0,-50%);
  cursor: pointer;
  width: 80px;
  height: 86px;
  background: url('/static/moduleImages/next.png');
  background-position:center center;
  background-repeat: no-repeat;
}
.module_next:hover{
   background: url('/static/moduleImages/next发光.png')
}

</style>
