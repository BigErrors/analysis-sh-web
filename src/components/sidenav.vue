<template>
  <div class="nav_container" :class="{show:show,unshow:!show}">
    <div class="box box2" @click="$router.push('/')">
      <div class="img"></div>
      <span class="description">返回转盘</span>
    </div>
    <div class="box box10" @click="$router.push('/index4renmintj')">
      <div class="img"></div>
      <span class="description">返回首页</span>
    </div>
    <div class="box box5" @click="$router.push({name:'businessNum', params: {type: '人民调解'}})">
      <div class="img"></div>
      <span class="description">业务数量</span>
    </div>
    <div class="box box6" @click="$router.push('/businessTypes')">
      <div class="img"></div>
      <span class="description">业务类型</span>
    </div>
    <div class="box box1" @click="$router.push('/importantEvent')">
      <div class="img"></div>
      <span class="description">重点关注</span>
    </div>
    <div class="box box7" @click="$router.push('/regionalAnalysis')">
      <div class="img"></div>
      <span class="description">区域分析</span>
    </div>
    <div class="box box8" @click="$router.push('/trendAnalysis')">
      <div class="img"></div>
      <span class="description">趋势分析</span>
    </div>
    <div class="box box3" @click="$router.push('/institutionRanking')">
      <div class="img"></div>
      <span class="description">机构排名</span>
    </div>
    <div class="box box9" @click="$router.push('/peopleRanking')">
      <div class="img"></div>
      <span class="description">人员排名</span>
    </div>
    <div class="box box4" @click="$router.push('/documentQuality')">
      <div class="img"></div>
      <span class="description">工作质量</span>
    </div>
    <div class="switch" @click="show=!show" :class="{open:!show,close:show}"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  }
}

</script>

<style lang="less" scoped>
  @fontWhite: #f1f1f1;
  @fontGray: rgba(241, 241, 241, 0.4);
  .nav_container {
    position: fixed;
    right: 0;
    top: 50%;
    width: 86px;
    background: rgba(8, 9, 9, 0.7);
    transform: translate(0, -50%);
    transition: 0.3s linear;
    z-index: 99;
    .box {
      height: 65px;
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      color: @fontGray;
      cursor: pointer;
      &:hover {
        color: #FFDA00;
        background: rgba(67, 70, 71, 0.2);
      }
      .img {
        display: block;
        height: 25px;
        background-repeat: no-repeat;
        background-position: center center;
      }
      .description {
        height: 20px;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        display: block;
      }
    }
    .switch {
      height: 38px;
      border-right: 16px solid rgba(32, 141, 249, 0.7);
      border-top: 14px solid transparent;
      border-bottom: 14px solid transparent;
      position: absolute;
      left: 0%;
      top: 50%;
      transform: translate(-100%, -50%);
      cursor: pointer;
    }
    .open {
      background: url('/static/renmintjNew/icon_open.png') no-repeat left 5px center;
    }
    .close {
      background: url('/static/renmintjNew/icon_close.png') no-repeat left 5px center;
    }
    .box1 {
      .img {
        background-image: url('/static/renmintjNew/icon_1.png')
      }
      &:hover {
        .img {
          background-image: url('/static/renmintjNew/icon_1_y.png')
        }
      }
    }
    .box2 {
      .img {
        background-image: url('/static/renmintjNew/icon_2.png')
      }
      &:hover {
        .img {
          background-image: url('/static/renmintjNew/icon_2_y.png')
        }
      }
    }
    .box3 {
      .img {
        background-image: url('/static/renmintjNew/icon_3.png')
      }
      &:hover {
        .img {
          background-image: url('/static/renmintjNew/icon_3_y.png')
        }
      }
    }
    .box4 {
      .img {
        background-image: url('/static/renmintjNew/icon_4.png')
      }
      &:hover {
        .img {
          background-image: url('/static/renmintjNew/icon_4_y.png')
        }
      }
    }
    .box5 {
      .img {
        background-image: url('/static/renmintjNew/icon_5.png')
      }
      &:hover {
        .img {
          background-image: url('/static/renmintjNew/icon_5_y.png')
        }
      }
    }
    .box6 {
      .img {
        background-image: url('/static/renmintjNew/icon_6.png')
      }
      &:hover {
        .img {
          background-image: url('/static/renmintjNew/icon_6_y.png')
        }
      }
    }
    .box7 {
      .img {
        background-image: url('/static/renmintjNew/icon_7.png')
      }
      &:hover {
        .img {
          background-image: url('/static/renmintjNew/icon_7_y.png')
        }
      }
    }
    .box8 {
      .img {
        background-image: url('/static/renmintjNew/icon_8.png')
      }
      &:hover {
        .img {
          background-image: url('/static/renmintjNew/icon_8_y.png')
        }
      }
    }
    .box9 {
      .img {
        background-image: url('/static/renmintjNew/icon_9.png')
      }
      &:hover {
        .img {
          background-image: url('/static/renmintjNew/icon_9_y.png')
        }
      }
    }
    .box10 {
      .img {
        background-image: url('/static/renmintjNew/icon_10.png')
      }
      &:hover {
        .img {
          background-image: url('/static/renmintjNew/icon_10_y.png')
        }
      }
    }
  }

  .show {
    right: 0;
  }

  .unshow {
    right: -86px;
  }

</style>
