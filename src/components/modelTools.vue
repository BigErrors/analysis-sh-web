<template>
  <div class="modelTools_container">
    <div class="head">
      <div class="left">
        <div class="back" @click="changeRouter({type: 'module',url:'moduleChoose'})"></div>
      </div>
      <div class="right"><span>{{timeCom}}</span></div>
    </div>
    <div class="body">
      <div class="cover">
        <img class="cover_img" src="/static/renmintjNew/model_title.png"/>
      </div>
      <div class="flex_main">
        <el-carousel indicator-position="outside" :autoplay="autoplay" :height="elHeight">
          <el-carousel-item>
            <flex-box :options="foptions" @getClick="changeRouter"></flex-box>
          </el-carousel-item>
          <el-carousel-item>
            <flex-box :options="foptions2" @getClick="changeRouter"></flex-box>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import flexBox from './flexBox.vue'
export default {
  components: {
    flexBox
  },
  data () {
    return {
      time: new Date(),
      foptions: {
        height: '220',
        fontPosition: 'leftBottom',
        fontColor: 'white',
        fontSize: '20px',
        margin: '5px',
        matrix: [
          [{
            flex: 1,
            bgColor: '',
            description: 'insight++',
            fontColor: '',
            bgImg: '/static/renmintjNew/icon_insight.png',
            url: 'http://192.168.91.223:8088',
            type: 'website'
          }, {
            flex: 1,
            bgColor: '',
            description: '同案同调',
            fontColor: '',
            bgImg: '/static/renmintjNew/icon_search.png',
            url: 'http://192.168.91.34:8880/tatt/pages/index.html',
            type: 'website'
          }, {
            flex: 1,
            bgColor: '',
            description: '赔偿金额',
            fontColor: '',
            bgImg: '/static/renmintjNew/icon_compensation.png',
            url: 'compensation',
            type: 'module'
          }, {
            flex: 1,
            bgColor: '',
            description: '重点事件',
            fontColor: '',
            bgImg: '/static/renmintjNew/icon_event.png',
            url: 'importantEvent',
            type: 'module'
          }],
          [{
            flex: 1,
            bgColor: '',
            description: '重点人员',
            fontColor: '',
            bgImg: '/static/renmintjNew/icon_zhongdry.png',
            url: ''
          }, {
            flex: 1,
            bgColor: '',
            description: '重点机构',
            fontColor: '',
            bgImg: '/static/renmintjNew/icon_zhongdianjg.png',
            url: ''
          }, {
            flex: 1,
            bgColor: '',
            description: '难解纠纷',
            fontColor: '',
            bgImg: '/static/renmintjNew/icon_nanjjf.png',
            url: '',
            type: 'module'
          }, {
            flex: 1,
            bgColor: 'rgb(84, 179, 253)',
            description: '纠纷情绪',
            fontColor: '',
            bgImg: '/static/renmintjNew/icon_jiufenqx.png',
            url: '',
            type: 'module'
          }]
        ]
      },
      foptions2: {
        height: '220',
        fontPosition: 'leftBottom',
        fontColor: 'white',
        fontSize: '20px',
        margin: '5px',
        matrix: [
          [{
            flex: 1,
            bgColor: '',
            description: '多维分析',
            fontColor: '',
            bgImg: '/static/renmintjNew/icon_duoweifx.png',
            url: '',
            type: 'module'
          }, {
            flex: 1,
            bgColor: '',
            description: '热词态势',
            fontColor: '',
            bgImg: '/static/renmintjNew/icon_recits.png',
            url: '',
            type: 'module'
          }, {
            flex: 1,
            bgColor: '',
            description: '事件密度',
            fontColor: '',
            bgImg: '/static/renmintjNew/icon_shijianmd.png',
            url: '',
            type: 'module'
          }, {
            flex: 1,
            bgColor: '',
            description: '家暴态势',
            fontColor: '',
            bgImg: '/static/renmintjNew/icon_jiabaots.png',
            url: '',
            type: 'module'
          }],
          [{
            flex: 1,
            bgColor: '',
            description: '正在研发...',
            fontColor: '',
            bgImg: '/static/renmintjNew/icon_zhengzaiyf.png',
            url: '',
            type: 'module'
          }, {
            flex: 1,
            bgColor: '',
            description: '正在研发...',
            fontColor: '',
            bgImg: '/static/renmintjNew/icon_zhengzaiyf.png',
            url: '',
            type: 'module'
          }]
        ]
      },
      autoplay: false
    }
  },
  computed: {
    timeCom () {
      let now = this.time
      let day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()]
      let minute = (now.getMinutes() >= 10) ? (now.getMinutes().toString()) : ('0' + now.getMinutes().toString())
      return now.getFullYear().toString() + '/' + (now.getMonth() + 1).toString() + '/' + now.getDate().toString() +
          ' ' + now.getHours().toString() + ':' + minute + ' ' + day
    },
    elHeight () {
      return parseInt(this.foptions.height) * 2 + parseInt(this.foptions.margin) + 'px'
    }
  },
  methods: {
    changeRouter (target) {
      if (target.type === 'website') {
        window.open(target.url)
      } else if (target.type === 'module') {
        if (target.url !== '') {
          this.$router.push(target.url)
        } else {
          this.$notify.warning(`${target.description}模块暂未开放`)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.modelTools_container{
  background-image:url('/static/renmintjNew/model_back.png');
  background-position: center center;
  background-size: 100% 100%;
  position: absolute;
  width: 100%;
  height: 100%;
  min-width:1366px;
  min-height: 766px;
  .head{
    display: block;
    height: 108px;
    position: relative;
    .left{
      padding:30px 0 0px 35px;
      float: left;
      .back{
        background: url('/static/renmintj/btn_back.png');
        width: 137px;
        height: 35px;
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer;
      }
    }
    .right{
      float: right;
      padding:30px 35px 0 0;
      span{
        font-size:12px;
        font-family:HiraginoSansGB-W3;
        color:rgba(237,237,237,1);
      }
    }
  }
  .body{
    position: absolute;
    top: calc(50%);
    left: 0;
    width: 100%;
    transform: translate(0,-50%);
    .cover{
      display: block;
      height: 120px;
      display: flex;
      align-items: center;/*垂直居中*/
      justify-content: center;/*水平居中*/
      text-align: center;
      width: 100%;
      .cover_img{
        display: inline-block;
        margin:0 10px;
      }
    }
    .flex_main{
      width: 70%;
      display: block;
      margin: auto;
      margin-top:25px;
    }
    .flex_container{
      padding:0 100px;
    }
  }
}
</style>
