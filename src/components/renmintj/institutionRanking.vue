<template>
  <div class="institutionRanking_container" v-loading="loading"
    element-loading-text="数据加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="head clearfix">
      <div class="title">基层司法大数据子平台</div>
      <div class="left">
        <div class="back" @click="changeRouter('index4renmintj')"></div>
      </div>
      <div class="right">
        <span>{{timeCom}}</span>
      </div>
    </div>
    <div class="body">
      <div class="nav">
        <span>首页 > 机构排名</span>
      </div>
      <div class="nav2 clearfix">
        <div class="navLeft">
          <span class="navspan active">机构排名</span>
        </div>
        <div class="navRight">
          <div class="excel_btn" @click="getData(1)">导出Excel</div>
          <div class="date_container">
            <el-date-picker
              v-model="date"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :clearable='false'
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div class="date_container">
            <el-cascader
              class="cascader"
              style="z-index:1;height:30px;line-height:30px;font-size:12px;"
              :options="chooseArr"
              placeholder="选择"
              v-model="chooseDefault"
            ></el-cascader>
          </div>
        </div>
      </div>
      <div class="table_container">
        <div class="t_head">
          <div class="row row1">排名</div>
          <div class="row row2">名称</div>
          <div class="row row3"><span :class="{yellowf:obj==='renyuansl'}" @click="sort('renyuansl')">人员数量</span><i @click="sort('renyuansl')" class="init" :class="{'bottom':obj==='renyuansl'&&reorder==='DESC','top':obj==='renyuansl'&&reorder==='ASC'}"></i></div>
          <div class="row row4"><span :class="{yellowf:obj==='yewusl'}" @click="sort('yewusl')">业务数量</span><i @click="sort('yewusl')" class="init" :class="{bottom:obj==='yewusl'&&reorder==='DESC',top:obj==='yewusl'&&reorder==='ASC'}"></i></div>
          <div class="row row5"><span :class="{yellowf:obj==='tiaojieaj'}" @click="sort('tiaojieaj')">调解案件数</span><i @click="sort('tiaojieaj')" class="init" :class="{bottom:obj==='tiaojieaj'&&reorder==='DESC',top:obj==='tiaojieaj'&&reorder==='ASC'}"></i></div>
          <div class="row row6"><span :class="{yellowf:obj==='paichafk'}" @click="sort('paichafk')">排查反馈数</span><i @click="sort('paichafk')" class="init" :class="{bottom:obj==='paichafk'&&reorder==='DESC',top:obj==='paichafk'&&reorder==='ASC'}"></i></div>
          <div class="row row7"><span :class="{yellowf:obj==='shangbaosl'}" @click="sort('shangbaosl')">调解案例上报数</span><i @click="sort('shangbaosl')" class="init" :class="{bottom:obj==='shangbaosl'&&reorder==='DESC',top:obj==='shangbaosl'&&reorder==='ASC'}"></i></div>
          <div class="row row8"><span :class="{yellowf:obj==='zixunrz'}" @click="sort('zixunrz')">咨询管理日志数</span><i @click="sort('zixunrz')" class="init" :class="{bottom:obj==='zixunrz'&&reorder==='DESC',top:obj==='zixunrz'&&reorder==='ASC'}"></i></div>
          <div class="row row9"><span :class="{yellowf:obj==='chunjufw'}" @click="sort('chunjufw')">村居服务数</span><i @click="sort('chunjufw')" class="init" :class="{bottom:obj==='chunjufw'&&reorder==='DESC',top:obj==='chunjufw'&&reorder==='ASC'}"></i></div>
          <div class="row row10"><span :class="{yellowf:obj==='faxuanhd'}" @click="sort('faxuanhd')">法宣活动数</span><i @click="sort('faxuanhd')" class="init" :class="{bottom:obj==='faxuanhd'&&reorder==='DESC',top:obj==='faxuanhd'&&reorder==='ASC'}"></i></div>
          <div class="row row11"><span :class="{yellowf:obj==='yewusyl'}" @click="sort('yewusyl')">业务系统使用率</span><i @click="sort('yewusyl')" class="init" :class="{bottom:obj==='yewusyl'&&reorder==='DESC',top:obj==='yewusyl'&&reorder==='ASC'}"></i></div>
        </div>
        <div class="t_body">
          <div class="line" v-for="(item,index) in list" :key = index>
            <div class="row row1">
              <span v-if="(index>2||pageInfo.currentPage>1)&&reorder==='DESC'" class="institutionRanking_content_span2">{{index+1+(pageInfo.currentPage-1)*10}}</span>
              <span v-if="reorder==='ASC'" class="institutionRanking_content_span2">{{pageInfo.total-(index)-(pageInfo.currentPage-1)*10}}</span>
              <img v-if="index===0&&pageInfo.currentPage===1&&reorder==='DESC'" class="img" src='/static/renmintj/jingpai.png' />
              <img v-if="index===1&&pageInfo.currentPage===1&&reorder==='DESC'" class="img" src='/static/renmintj/yinpai.png' />
              <img v-if="index===2&&pageInfo.currentPage===1&&reorder==='DESC'" class="img" src='/static/renmintj/tongpai.png' />
            </div>
            <div class="row row2">
              <el-tooltip v-if="item.name.length>12" :content='item.name' placement="top">
                <span class="spanhid">{{item.name}}</span>
              </el-tooltip>
              <span v-if="item.name.length<=12">{{item.name}}</span>
            </div>
            <div class="row row3"><span>{{item.renyuansl}}</span></div>
            <div class="row row4"><span>{{item.yewusl}}</span></div>
            <div class="row row5"><span>{{item.tiaojieaj}}</span></div>
            <div class="row row6"><span>{{item.paichafk}}</span></div>
            <div class="row row7"><span>{{item.shangbaosl}}</span></div>
            <div class="row row8"><span>{{item.zixunrz}}</span></div>
            <div class="row row9"><span>{{item.chunjufw}}</span></div>
            <div class="row row10"><span>{{item.faxuanhd}}</span></div>
            <!-- 暂时还没有业务系统使用率 -->
            <!-- <div class="row row11"><i class="icon_rate red"></i><span>47%</span></div> -->
            <div class="row row11"><span>{{"--%"}}</span></div>
          </div>
        </div>
      </div>
      <div class="page_container">
        <el-pagination
          layout="total, prev, pager, next"
          :total="pageInfo.total"
          :page-size="10"
          :current-page.sync="pageInfo.currentPage"
          @current-change="handleCurrentChange"
          class="ej-pagination">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/util/httpUtil'
import urlConfig from '@/util/urlConfig'
import jsonUtil from '@/util/jsonUtil'
export default {
  data: function () {
    return {
      date: [(new Date()).getTime() - 3600 * 1000 * 24 * 90, new Date()],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近半年',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一年',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      list: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      reorder: 'DESC',
      obj: 'renyuansl',
      loading: '',
      time: new Date(),
      chooseArr: [{
        label: '区局',
        value: 'JUSTICEBUREAU'
      }, {
        label: '司法所',
        value: 'JUSTICEOFFICE'
      }, {
        label: '调委会',
        value: 'MEDIATIONCOMMITTEE'
      }],
      chooseDefault: ['JUSTICEBUREAU']
    }
  },
  computed: {
    timeCom () {
      let now = this.time
      let day = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'][now.getDay()]
      let minute = (now.getMinutes() >= 10) ? (now.getMinutes().toString()) : ('0' + now.getMinutes().toString())
      return now.getFullYear().toString() + '/' + (now.getMonth() + 1).toString() + '/' + now.getDate().toString() + ' ' + now.getHours().toString() + ':' + minute + ' ' + day
    }
  },
  watch: {
    chooseDefault: function (newValue, oldValue) {
      this.pageInfo.currentPage = 1
      this.getData()
    },
    date: function (newValue, oldValue) {
      this.pageInfo.currentPage = 1
      this.getData()
    }
  },
  created: function () {
    this.getData()
  },
  methods: {
    getData (excl) {
      let _this = this
      _this.loading = true
      let excel = excl || 0
      let baseUrl = urlConfig.baseUrl
      let url = '/institutionalRankings'
      let param = {
        'startdate': jsonUtil.dateTimeFormat(_this.date[0]),
        'enddate': jsonUtil.dateTimeFormat(_this.date[1]),
        'lable': _this.chooseDefault[0],
        'obj': _this.obj,
        'reorder': _this.reorder,
        'excl': excel,
        'pagesize': 10,
        'currentpage': _this.pageInfo.currentPage
      }
      if (excel === 0) {
        http.post(baseUrl + url, param, (data) => {
          _this.list = data.pageData
          _this.pageInfo.total = data.pageinfo.total
          _this.loading = false
        }, 'application/json')
      } else {
        http.post(baseUrl + url, param, (data) => {
          let date = new Date()
          let filefix = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
          let blob = new Blob([data]) // 创建一个blob对象
          let a = document.createElement('a') // 创建一个<a></a>标签
          a.href = URL.createObjectURL(blob) // response is a blob
          a.download = filefix + '表格.xls' // 文件名称
          a.style.display = 'none'
          document.body.appendChild(a)
          a.click()
          a.remove()
          _this.loading = false
        }, 'application/json', 'arraybuffer')
      }
    },
    // 分页
    handleCurrentChange (val) {
      this.pageInfo.currentPage = val
      this.getData()
    },
    // 排序
    sort (val) {
      if (val !== this.obj) {
        this.reorder = 'DESC'
      } else {
        if (this.reorder === 'DESC') {
          this.reorder = 'ASC'
        } else {
          this.reorder = 'DESC'
        }
      }
      this.obj = val
      this.getData()
    },
    // 路由跳转
    changeRouter (name) {
      this.$router.push({name: name})
    }
  }
}
</script>

<style lang="less" scoped>
.institutionRanking_container{
  background: #171415;
  position: absolute;
  width: 100%;
  height: 100%;
  min-width:1366px;
  min-height: 766px;
  .head{
    display: block;
    background: url('/static/renmintjNew/headback.png') no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    position: relative;
    box-sizing: border-box;
    margin:0 28px;
    border-top:14px solid rgba(0,0,0,0);
    .title{
      position: absolute;
      top: 17px;
      font-size:20px;
      font-family:RTWSYueGoTrial-Regular;
      color:rgba(254,254,254,1);
      left: 50%;
      transform: translate(-50%)
    }
    .left{
      padding:25px 0 10px 0px;
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
      padding:30px 0 0 0;
      span{
        font-size:12px;
        font-family:HiraginoSansGB-W3;
        color:rgba(237,237,237,1);
      }
    }
  }
  .body{
    height: calc(100% - 84px);
    width: 100%;
    display: block;
    position: relative;
    .nav{
      height: 24px;
      margin: 0px 0 20px 0;
      padding-left: 34px;
      padding-top:6px;
      width: 100%;
      box-sizing: border-box;
      line-height: 24px;
      span{
        font-size: 12px;
        font-family: HiraginoSansGB-W3;
        color:rgba(94,126,203,1);
      }
    }
    .nav2{
      display: block;
      padding: 0 34px;
      box-sizing: border-box;
      .navLeft{
        float: left;
        border-bottom:1px solid #0F3BBA;
        .navspan{
          font-size:14px;
          font-family:HiraginoSansGB-W3;
          color:rgba(94,126,203,1);
          display: inline-block;
          padding:0 2px 4px 2px;
          width: 5em;
          text-align: center;
          cursor: pointer;
        }
        .active{
          color:rgba(255,198,0,1);
          border-bottom: 3px solid #FFC600;
        }
      }
      .navRight{
        float: right;
        .date_container{
          float: right;
          margin-right: 30px;
        }
        .excel_btn{
          float: right;
          height:26px;
          background: #F89200;
          padding:2px 12px;
          color:white;
          border-radius: 4px;
          line-height: 26px;
          font-size:12px;
          font-family:'HiraginoSansGB-W3';
          cursor: pointer;
        }
      }
    }
    .table_container{
      height: calc(100% - 146px);
      margin-top:16px;
      width: 100%;
      box-sizing: border-box;
      padding:0 24px;
      .t_head{
        height: 18px;
        width: 100%;
        .bottom{
          width: 9px;
          height: 14px;
          margin-left: 5px;
          display: inline-block;
          background: url(/static/renmintj/jiantou.png);
          background-repeat: no-repeat;
          background-position: left -7px top 0px;
          cursor: pointer;
          vertical-align: middle;
          margin-bottom: 1px;
        }
        .top{
          width: 9px;
          height: 14px;
          margin-left: 5px;
          display: inline-block;
          background: url(/static/renmintj/jiantou.png);
          background-repeat: no-repeat;
          background-position: left -15px top 0px;
          cursor: pointer;
          vertical-align: middle;
          margin-bottom: 1px;
        }
        i{
          width: 9px;
          height: 14px;
          margin-left: 5px;
          display: inline-block;
          background: url(/static/renmintj/jiantou.png);
          background-repeat: no-repeat;
          background-position: left 1px top 0px;
          cursor: pointer;
          vertical-align: middle;
          margin-bottom: 1px;
        }
        span{
          cursor: pointer;
        }
        .row{
          line-height: 18px;
          font-size:12px;
          font-family:HiraginoSansGB-W3;
          color:rgba(17,148,248,1);
          float: left;
          text-align: center;
          box-sizing: border-box;
          .yellowf{
            color:#FFC600;
          }
        }
        .row1{
          width: 5%;
        }
        .row2{
          width: 17%;
          text-align: left;
          padding-left: 12px;
        }
        .row3{
          width: 8%;
        }
        .row4{
          width: 8%;
        }
        .row5{
          width: 8%;
        }
        .row6{
          width: 8%;
        }
        .row7{
          width: 10%;
        }
        .row8{
          width: 10%;
        }
        .row9{
          width: 8%;
        }
        .row10{
          width: 8%;
        }
        .row11{
          width: 10%;
        }
      }
      .t_body{
        height: calc(100% - 26px);
        .line{
          height: 10%;
          position: relative;
          display: block;
          .row{
            float: left;
            height: 100%;
            box-sizing: border-box;
            text-align: center;
            position: relative;
            span{
              position: absolute;
              left: 50%;
              top:50%;
              transform: translate(-50%,-50%);
              font-size: 12px;
            }
          }
          .row1{
            width: 5%;
            span{
              font-size: 12px;
              font-family: HiraginoSansGB-W3;
              color: rgba(255,255,255,1);
              opacity: 0.4;
            }
            .img{
              position: absolute;
              left: 50%;
              top:50%;
              transform: translate(-50%,-50%);
              font-size: 12px;
            }
          }
          .row2{
            width: 17%;
            text-align: left;
            background: url(/static/renmintj/jigoumc.png);
            display: inline-block;
            background-repeat: no-repeat;
            background-position: left 4px center;
            background-size: 42px 42px;
            padding-left: 52px;
            font-size: 12px;
            font-family: HiraginoSansGB-W3;
            color: rgba(204,233,255,1);
            line-height: 60px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            span{
              left:60px;
              transform: translate(0,-50%)
            }
            .spanhid{
              width: 12em;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
          .row3{
            width: 8%;
            span{
              background: linear-gradient(left, #4481EB,#04BEFE);
              padding:4px 8px;
              border-radius: 6px;
              font-size:12px;
              font-family:HiraginoSansGB-W3;
              color:rgba(255,255,255,1);
            }
          }
          .row4{
            width: 8%;
            span{
              font-size: 12px;
              font-family: HiraginoSansGB-W3;
              color: rgba(255,255,255,1);
              opacity: 0.4;
            }
          }
          .row5{
            width: 8%;
            span{
              font-size: 12px;
              font-family: HiraginoSansGB-W3;
              color: rgba(255,255,255,1);
              opacity: 0.4;
            }
          }
          .row6{
            width: 8%;
            span{
              font-size: 12px;
              font-family: HiraginoSansGB-W3;
              color: rgba(255,255,255,1);
              opacity: 0.4;
            }
          }
          .row7{
            width: 10%;
            span{
              font-size: 12px;
              font-family: HiraginoSansGB-W3;
              color: rgba(255,255,255,1);
              opacity: 0.4;
            }
          }
          .row8{
            width: 10%;
            span{
              background: rgba(77,132,254,1);
              opacity: 0.4;
              border-radius: 2px;
              padding: 4px 8px;
              color: rgba(255,255,255,1);
            }
          }
          .row9{
            width: 8%;
            span{
              background: rgba(77,132,254,1);
              opacity: 0.4;
              border-radius: 2px;
              padding: 4px 8px;
              color: rgba(255,255,255,1);
            }
          }
          .row10{
            width: 8%;
            span{
              background: rgba(77,132,254,1);
              opacity: 0.4;
              border-radius: 2px;
              padding: 4px 8px;
              color: rgba(255,255,255,1);
            }
          }
          .row11{
            width: 10%;
            span{
              font-size: 12px;
              font-family: HiraginoSansGB-W3;
              color: rgba(255,255,255,1);
              opacity: 0.4;
            }
            .icon_rate{
              position: absolute;
              top:50%;
              right: 55%;
              transform: translateY(-50%);
              width: 4px;
              height: 4px;
              border-radius: 50%;
            }
            .red{
              background: #FF3942;
            }
            .yellow{
              background: #FFF600;
            }
            .green{
              background: #17FF84
            }
          }
        }
      }
    }
    .page_container{
      text-align: center;
      margin:12px 0;
    }
  }
}
</style>
