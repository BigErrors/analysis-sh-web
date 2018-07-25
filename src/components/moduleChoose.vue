<template>
  <div class="moduleChoose_container">
    <div class="head">
      <div class="title"></div>
      <div class="time">{{timeCom}}</div>
      <div class="close"></div>
    </div>
    <div class="body">
      <div class="container">
        <div class="top"></div>
        <div class="middle">
          <div class="six bg1" :class="{six_1:mark===1,six_2:mark===2,six_3:mark===3,six_4:mark===4,six_5:mark===5,six_6:mark===6}" @click="changeRouter('modelTools')">
            <div v-if="mark===2" class="border righttop"></div>
            <div v-if="mark===2" class="border lefttop"></div>
            <div v-if="mark===2" class="border rightbottom"></div>
            <div v-if="mark===2" class="border leftbottom"></div>
            <div class="cover"><img class="cover_img_left" src="/static/moduleImages/right.png" /><span class="cover_span">模型工具</span><img class="cover_img_right" src="/static/moduleImages/left.png"/></div>
          </div>
          <div class="six bg2" :class="{six_2:mark===1,six_3:mark===2,six_4:mark===3,six_5:mark===4,six_6:mark===5,six_1:mark===6}" @click="changeRouter('http://rmtj.justice.gov.cn/')">
            <div v-if="mark===1" class="border righttop"></div>
            <div v-if="mark===1" class="border lefttop"></div>
            <div v-if="mark===1" class="border rightbottom"></div>
            <div v-if="mark===1" class="border leftbottom"></div>
            <div class="cover"><img class="cover_img_left" src="/static/moduleImages/right.png" /><span class="cover_span">业务应用</span><img class="cover_img_right" src="/static/moduleImages/left.png"/></div>
          </div>
          <div class="six bg3" :class="{six_3:mark===1,six_4:mark===2,six_5:mark===3,six_6:mark===4,six_1:mark===5,six_2:mark===6}" @click="changeRouter('index4renmintj')">
            <div v-if="mark===6" class="border righttop"></div>
            <div v-if="mark===6" class="border lefttop"></div>
            <div v-if="mark===6" class="border rightbottom"></div>
            <div v-if="mark===6" class="border leftbottom"></div>
            <div class="cover"><img class="cover_img_left" src="/static/moduleImages/right.png" /><span class="cover_span">数据洞察</span><img class="cover_img_right" src="/static/moduleImages/left.png"/></div>
          </div>
          <div class="six bg1" :class="{six_4:mark===1,six_5:mark===2,six_6:mark===3,six_1:mark===4,six_2:mark===5,six_3:mark===6}" @click="changeRouter('modelTools')">
            <div v-if="mark===5" class="border righttop"></div>
            <div v-if="mark===5" class="border lefttop"></div>
            <div v-if="mark===5" class="border rightbottom"></div>
            <div v-if="mark===5" class="border leftbottom"></div>
            <div class="cover"><img class="cover_img_left" src="/static/moduleImages/right.png" /><span class="cover_span">模型工具</span><img class="cover_img_right" src="/static/moduleImages/left.png"/></div>
          </div>
          <div class="six bg2" :class="{six_5:mark===1,six_6:mark===2,six_1:mark===3,six_2:mark===4,six_3:mark===5,six_4:mark===6}" @click="changeRouter('http://rmtj.justice.gov.cn/')">
            <div v-if="mark===4" class="border righttop"></div>
            <div v-if="mark===4" class="border lefttop"></div>
            <div v-if="mark===4" class="border rightbottom"></div>
            <div v-if="mark===4" class="border leftbottom"></div>
            <div class="cover"><img class="cover_img_left" src="/static/moduleImages/right.png" /><span class="cover_span">业务应用</span><img class="cover_img_right" src="/static/moduleImages/left.png"/></div>
          </div>
          <div class="six bg3" :class="{six_6:mark===1,six_1:mark===2,six_2:mark===3,six_3:mark===4,six_4:mark===5,six_5:mark===6}" @click="changeRouter('index4renmintj')">
            <div v-if="mark===3" class="border righttop"></div>
            <div v-if="mark===3" class="border lefttop"></div>
            <div v-if="mark===3" class="border rightbottom"></div>
            <div v-if="mark===3" class="border leftbottom"></div>
            <div class="cover"><img class="cover_img_left" src="/static/moduleImages/right.png" /><span class="cover_span">数据洞察</span><img class="cover_img_right" src="/static/moduleImages/left.png"/></div>
          </div>
          <div class="left" @click="changemark('last')"></div>
          <div class="right" @click="changemark('next')"></div>
        </div>
        <div class="bottom"></div>
      </div>
    </div>
  </div>
</template>

<script>
import jsonUtil from '@/util/jsonUtil'

export default {
  data: function () {
    return {
      mark: 1,
      timer: '',
      timerOut: '', // 这个timer给鼠标移动事件，鼠标移动就给循环上锁
      lockClick: false // 给点击上锁，防止连续点击
    }
  },
  computed: {
    timeCom () {
      return jsonUtil.dateFormat(new Date(), 'yyyy/MM/dd hh:mm D')
    }
  },
  methods: {
    // 路由跳转
    changeRouter (name) {
      if (name === 'http://rmtj.justice.gov.cn/') {
        window.open('http://rmtj.justice.gov.cn/')
      } else {
        this.$router.push(name)
      }
    },
    changemark: function (fn) {
      let _this = this
      clearInterval(_this.timer)
      _this.timer = null
      if (fn === 'next' && this.lockClick === false) {
        this.lockClick = true
        if (this.mark < 6) {
          this.mark++
        } else {
          this.mark = 1
        }
        setTimeout(function () {
          _this.timer = setInterval(_this.timerFn, 5000)
          _this.lockClick = false
        }, 2000)
      } else if (fn === 'last' && this.lockClick === false) {
        this.lockClick = true
        if (this.mark > 1) {
          this.mark--
        } else {
          this.mark = 6
        }
        setTimeout(function () {
          _this.timer = setInterval(_this.timerFn, 5000)
          _this.lockClick = false
        }, 2000)
      }
    },
    timerFn: function () {
      if (this.mark < 6) {
        this.mark++
      } else {
        this.mark = 1
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
    this.timer = setInterval(_this.timerFn, 5000)
  }
}
</script>

<style lang="less" scoped>
.moduleChoose_container{
  background-image:url('/static/renmintjNew/module_back.png');
  background-position: center center;
  background-size: 100% 100%;
  position: absolute;
  width: 100%;
  height: 100%;
  min-width:1366px;
  min-height: 766px;
  .head{
    background-image: url('/static/renmintjNew/module_title.png');
    background-repeat: no-repeat;
    background-position: top 12px center;
    display: block;
    height: 108px;
    position: relative;
    .title{
      background-image: url('/static/renmintjNew/module_content.png');
      background-repeat: no-repeat;
      background-position: center center;
      width: 200px;
      height: 80px;
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%,-50%)
    }
    .time{
      position: absolute;
      left: 50%;
      bottom:4px;
      transform: scale(0.9) translate(-50%,-50%);
      font-size:12px;
      font-family:'DigifaceWide';
      color:rgba(114,195,255,1);
    }
    .close{
      position: absolute;
      right: 5%;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      width: 23px;
      height: 23px;
      background-image: url('/static/renmintjNew/module_close.png');
      background-position: center center;
      background-repeat: no-repeat;
      &:hover{
        background-image: url('/static/renmintjNew/module_open.png');
      }
    }
  }
  .body{
    width: 100%;
    height: calc(100% - 108px);
    display: block;
    box-sizing: border-box;
    position: relative;
    .container{
      width: 100%;
      height: 555px;
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      .top{
        position: absolute;
        width: 100%;
        height: 33px;
        top: 30px;
        background-image: url('/static/renmintjNew/font.png');
        background-position: center center;
        background-repeat: no-repeat;
      }
      .middle{
        height: 330px;
        width: 100%;
        top:88px;
        position: absolute;
        transform-style: preserve-3d;
        transform: rotatex(0);
        perspective: 5000;
        -webkit-perspective: 5000;
        z-index: 1;
        .six{
          width: 550px;
          height: 330px;
          position: absolute;
          transition: all 1s linear,border 0.1s;
          background-position:center;
          background-repeat:no-repeat;
          background-size:100% 100%;
          border:2px solid #5cb4ff;
          left: 50%;
          &:hover{
            box-shadow:0 0 50px #3298fe
          }
          .border{
            width: 34px;
            height: 34px;
            border: 3px solid #5cb4ff;
            position: absolute;
            transition: 0.4s;
          }
          .righttop{
            right: -6px;
            top: -6px;
            border-left: 0;
            border-bottom: 0;
          }
          .lefttop{
            left:-6px;
            top:-6px;
            border-right: 0;
            border-bottom: 0;
          }
          .rightbottom{
            right: -6px;
            bottom: -6px;
            border-left: 0;
            border-top: 0;
          }
          .leftbottom{
            left: -6px;
            bottom: -6px;
            border-right: 0;
            border-top: 0;
          }
        }
        .cover{
          position: absolute;
          bottom:0;
          height: 60px;
          background: rgba(1,26,81,0.58);
          display: flex;
          align-items: center;/*垂直居中*/
          justify-content: center;/*水平居中*/
          text-align: center;
          width: 100%;
          .cover_span{
            line-height: 60px;
            font-size: 19px;
            color:#ffffff;
            font-family: 'FZLTZHK--GBK1-0';
            display: inline-block;
            margin:0 10px;
          }
        }
        .bg1{
          background-image: url('/static/moduleImages/1.png')
        }
        .bg2{
          background-image: url('/static/moduleImages/2.png')
        }
        .bg3{
          background-image: url('/static/moduleImages/3.png')
        }
        .six_1{
          transform: translateX(-150% - 5px) rotateY(-60deg);
          transform-origin: right center;
        }
        .six_2{
          transform: translateX(-50%)
        }
        .six_3{
          transform: translateX(50% + 5px) rotateY(60deg);
          transform-origin: left center;
        }
        .six_4{
          transform: translate3d(493px,0px,-576px) rotateY(120deg);
          transform-origin: left center;
          opacity: 0;
        }
        .six_5{
          transform: translate(-50%) translateZ(-972px);
          opacity: 0;
        }
        .six_6{
          transform: translate3d(-1131px,0,-493px) rotateY(-120deg);
          transform-origin: right center;
          opacity: 0;
        }
        .left{
          position: absolute;
          right: calc(50% + 613px);
          top:50%;
          transform: translate(0,-50%);
          cursor: pointer;
          width: 80px;
          height: 86px;
          background: url('/static/moduleImages/last.png');
          background-position:center center;
          background-repeat: no-repeat;
          &:hover{
            background: url('/static/moduleImages/last发光.png')
          }
        }
        .right{
          position: absolute;
          left: calc(50% + 613px);
          top:50%;
          transform: translate(0,-50%);
          cursor: pointer;
          width: 80px;
          height: 86px;
          background: url('/static/moduleImages/next.png');
          background-position:center center;
          background-repeat: no-repeat;
          &:hover{
            background: url('/static/moduleImages/next发光.png')
          }
        }
      }
      .bottom{
        position: absolute;
        width: 98%;
        height: 180px;
        bottom: 0;
        background-image: url('/static/renmintjNew/module_role.png');
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
  }
}
</style>
