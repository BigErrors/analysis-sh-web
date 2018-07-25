<template>
  <div class="pepleRanking_container">
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
      <sidenav></sidenav>
      <div class="nav">
        <span>首页 > 人员列表</span>
      </div>
      <div class="nav2 clearfix">
        <div class="navLeft">
          <span class="navspan" @click="changeRouter('peopleNum')">数量分析</span>
          <span class="navspan" @click="changeRouter('peopleType')">属性分析</span>
          <span class="navspan active" @click="changeRouter('peopleRanking')">排名分析</span>
        </div>
        <div class="navRight">
          <div class="excel_btn" @click="getData(1)">导出Excel</div>
          <div class="date_container">
            <el-input
              size="mini"
              placeholder="请输入人名"
              suffix-icon="el-icon-search"
              v-model="nameSearch">
            </el-input>
          </div>
          <div class="date_container">
            <el-cascader
              class="cascader"
              style="z-index:1;height:30px;line-height:30px;font-size:12px;width:120px"
              :options="area"
              placeholder="区域"
              v-model="areaDefault"
            ></el-cascader>
          </div>
          <div class="date_container">
            <el-cascader
              class="cascader"
              style="z-index:1;height:30px;line-height:30px;font-size:12px;width:120px"
              :options="coordinationType"
              placeholder="调委会类型"
              v-model="coordinationTypeDefault"
            ></el-cascader>
          </div>
          <div class="date_container">
            <el-date-picker
              v-model="date"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="table_container">
        <div class="t_head">
          <div class="row row1">排名</div>
          <div class="row row2">姓名</div>
          <div class="row row3"><span>所属机构</span></div>
          <div class="row row4"><span :class="{yellow:obj==='yewusl'}" @click="sort('yewusl')">业务量</span><i @click="sort('yewusl')" class="init" :class="{bottom:obj==='yewusl'&&reorder==='DESC',top:obj==='yewusl'&&reorder==='ASC'}"></i></div>
          <div class="row row5"><span :class="{yellow:obj==='tiaojiecgl'}" @click="sort('tiaojiecgl')">成功率</span><i @click="sort('tiaojiecgl')" class="init" :class="{bottom:obj==='tiaojiecgl'&&reorder==='DESC',top:obj==='tiaojiecgl'&&reorder==='ASC'}"></i></div>
          <div class="row row6"><span>缓解率</span></div>
          <div class="row row7"><span :class="{yellow:obj==='pingjuntjzq'}" @click="sort('pingjuntjzq')">平均调解周期</span><i @click="sort('pingjuntjzq')" class="init" :class="{bottom:obj==='pingjuntjzq'&&reorder==='DESC',top:obj==='pingjuntjzq'&&reorder==='ASC'}"></i></div>
          <div class="row row8"><span :class="{yellow:obj==='chengjiaoje'}" @click="sort('chengjiaoje')">成交金额</span><i @click="sort('chengjiaoje')" class="init" :class="{bottom:obj==='chengjiaoje'&&reorder==='DESC',top:obj==='chengjiaoje'&&reorder==='ASC'}"></i></div>
          <div class="row row9"><span>经典案例数</span></div>
          <div class="row row10"><span>表彰数</span></div>
          <div class="row row11"><span>投诉数</span></div>
        </div>
        <div class="t_body">
          <div v-for="(item,index) in mediators" :key='index' class="line" @click="changeRouter('peoplePortrait', item.id_)">
            <div class="row row1">
              <span v-if="(index>2||pageInfo.currentPage>1)&&reorder==='DESC'" class="institutionRanking_content_span2">{{index+1+(pageInfo.currentPage-1)*10}}</span>
              <span v-if="reorder==='ASC'" class="institutionRanking_content_span2">{{pageInfo.total-(index)-(pageInfo.currentPage-1)*10}}</span>
              <img class="img"  v-if ="index===0&&pageInfo.currentPage===1&&reorder==='DESC'" src='/static/renmintj/jingpai.png' />
              <img class="img"  v-if ="index===1&&pageInfo.currentPage===1&&reorder==='DESC'" src='/static/renmintj/yinpai.png' />
              <img class="img"  v-if ="index===2&&pageInfo.currentPage===1&&reorder==='DESC'" src='/static/renmintj/tongpai.png' />
            </div>
            <div class="row row2">
               <img v-if="item.gender==='Male'" class="img_photo" src="/static/renmintjNew/photo_boy.png"/>
               <img v-else-if="item.gender==='Female'" class="img_photo" src="/static/renmintjNew/photo_girl.png"/>
               <img v-else class="img_photo" src="/static/renmintjNew/photo_null.png"/>
               <span>{{item.name}}</span>
             </div>
             <div class="row row3"><span>{{item.shortname}}</span></div>
             <div class="row row4"><span>{{item.yewusl}}</span></div>
             <div class="row row5">
               <i class="icon_rate" :class="{red:item.tiaojiecgl<0.6,yellow:item.tiaojiecgl<0.8&&item.tiaojiecgl>=0.6,green:item.tiaojiecgl>=0.8}"></i>
               <span>{{item.tiaojiecgl|changeToRate}}</span>
              </div>
             <div class="row row6"><i class="icon_rate red"></i><span>0%</span></div>
             <div class="row row7"><span>{{item.pingjuntjzq}}</span></div>
             <div class="row row8"><span>{{$echarts.format.addCommas(item.chengjiaoje)}}</span></div>
             <div class="row row9"><span>0</span></div>
             <div class="row row10"><span>0</span></div>
             <div class="row row11"><span>0</span></div>
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
import json from '@/util/dictionaryMapping'
import http from '@/util/httpUtil'
import jsonUtil from '@/util/jsonUtil'
export default {
  data: () => ({
    date: jsonUtil.defaultDataRage(),
    pickerOptions: jsonUtil.pickerOptions,
    obj: 'yewusl',
    reorder: 'DESC',
    area: json.area,
    areaDefault: ['SHJCK01000'],
    coordinationType: json.coordinationType,
    coordinationTypeDefault: ['allinformation'],
    nameSearch: '',
    pageInfo: {
      currentPage: 1,
      pageSize: 10,
      total: 0
    },
    mediators: []
  }),
  computed: {
    timeCom () {
      return jsonUtil.dateFormat(new Date(), 'yyyy/MM/dd hh:mm D')
    }
  },
  filters: {
    changeToRate: (value) => {
      return value * 100 + '%'
    }
  },
  watch: {
    areaDefault: function (newValue, oldValue) {
      this.pageInfo.currentPage = 1
      this.getData()
    },
    date: function (newValue, oldValue) {
      this.pageInfo.currentPage = 1
      this.getData()
    },
    nameSearch: function (newValue, oldValue) {
      this.pageInfo.currentPage = 1
      this.getData()
    },
    coordinationTypeDefault: function (newValue, oldValue) {
      this.pageInfo.currentPage = 1
      this.getData()
    }
  },
  methods: {
    getData (excl) {
      let exclV = excl || 0
      let vue = this
      let reqParam = {
        location: this.areaDefault[0],
        mediationtype: this.coordinationTypeDefault[0],
        obj: this.obj, // 排序字段
        reorder: this.reorder, // 排序方式
        excl: exclV,
        keyword: this.nameSearch,
        pagesize: this.pageInfo.pageSize,
        currentpage: this.pageInfo.currentPage,
        startdate: this.date[0],
        enddate: this.date[1]
      }
      let url = '/peopleMediate/V1.0.0.3/portraysList'
      if (exclV === 0) {
        http.post(url, reqParam, (data) => {
          vue.mediators = data.pageData
          vue.pageInfo.total = data.pageinfo.total
        }, 'application/json')
      } else {
        http.post(url, reqParam, (data) => {
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
        }, 'application/json', 'arraybuffer')
      }
    },
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
    changeRouter (name, id) {
      let target = {name: name}
      if (name === 'peoplePortrait') {
        target = {name: name, params: { id: id }}
      }
      this.$router.push(target)
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="less">
@blockBack:#171c26;
@table:#131821;
@table2:rgba(40,45,58,0.3);
@tableHover:rgba(113, 116, 120, 0.2);
@fontWhite:#f1f1f1;
@fontGray:rgba(241,241,241,0.8);
@fontSamll:14px;
@fontMiddle:16px;
.pepleRanking_container{
  background: #0B131C;
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
        width: 100px;
        height: 48px;
        background-position: center;
        background-repeat: no-repeat;
        &:hover{
          cursor: pointer;
          background: url('/static/renmintj/btn_backHover.png');
          background-position: center;
          background-repeat: no-repeat;
        }
      }
    }
    .right{
      float: right;
      padding:30px 0 0 0;
      span{
        font-size:@fontSamll;
        font-family:HiraginoSansGB-W3;
        color:@fontGray;
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
        font-size: @fontSamll;
        font-family: HiraginoSansGB-W3;
        color:@fontGray;
      }
    }
    .nav2{
      display: block;
      padding: 0 34px;
      box-sizing: border-box;
      .navLeft{
        float: left;
        border-bottom:1px solid @fontGray;
        .navspan{
          font-size:14px;
          font-family:HiraginoSansGB-W3;
          color:@fontGray;
          display: inline-block;
          padding:0 2px 4px 2px;
          width: 5em;
          text-align: center;
          cursor: pointer;
          position: relative;
        }
        .active{
          color:@fontWhite;
          // border-bottom: 3px solid #2E89FD;
          &::after{
            content: '';
            position: absolute;
            width: 100%;
            height: 3px;
            background: #2E89FD;
            left: 0;
            bottom:-1px;
          }
        }
      }
      .navRight{
        float: right;
        .excel_btn{
          float: right;
          height:26px;
          background:rgba(245,182,30,1);
          padding:2px 12px;
          color:white;
          border-radius: 4px;
          line-height: 26px;
          font-size:@fontSamll;
          font-family:'HiraginoSansGB-W3';
          cursor: pointer;
        }
        .date_container{
          float: right;
          margin-right: 15px;
        }
      }
    }
    .table_container{
      height: calc(100% - 152px);
      margin:16px 24px 0 24px;
      box-sizing: border-box;
      background-color: @blockBack;
      .t_head{
        line-height: 34px;
        height: 34px;
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
        .yellow{
          color:#2E89FD;
        }
        .row{
          line-height: 34px;
          font-size:@fontSamll;
          font-family:HiraginoSansGB-W3;
          color:@fontGray;
          float: left;
          text-align: center;
          box-sizing: border-box;
        }
        .row1{
          width: 5%;
        }
        .row2{
          width: 13%;
          text-align: left;
          padding-left: 12px;
        }
        .row3{
          width: 16%;
          text-align: left;
          padding-left: 25px;
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
          width: 8%;
        }
        .row8{
          width: 8%;
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
        height: calc(100% - 34px);
        .line{
          height: 10%;
          position: relative;
          display: block;
          &:nth-of-type(2n-1){
            background: @table;
          }
          &:hover{
            cursor: pointer;
            background: @tableHover;
          }
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
              font-size: @fontSamll;
            }
          }
          .row1{
            width: 5%;
            span{
              font-size: @fontSamll;
              font-family: HiraginoSansGB-W3;
              color: #CCE9FF;
            }
            .img{
              position: absolute;
              left: 50%;
              top:50%;
              transform: translate(-50%,-50%);
              font-size: @fontSamll;
            }
          }
          .row2{
            width: 13%;
            text-align: left;
            background: url('/static/renmintjNew/photo_back.png');
            display: inline-block;
            background-repeat: no-repeat;
            background-position: left 4px center;
            background-size: 42px 42px;
            padding-left: 52px;
            font-size: @fontSamll;
            font-family: HiraginoSansGB-W3;
            color: @fontWhite;
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
            .img_photo{
              position: absolute;
              left: 7px;
              top: 50%;
              transform: translateY(-50%);
            }
          }
          .row3{
            width:16%;
            text-align: left;
            span{
              font-size: @fontSamll;
              font-family: HiraginoSansGB-W3;
              color: @fontWhite;
              width: 18em;
            }
          }
          .row4{
            width: 8%;
            span{
              background: linear-gradient(left, #4481EB,#04BEFE);
              padding:4px 8px;
              border-radius: 6px;
              font-size:@fontSamll;
              font-family:HiraginoSansGB-W3;
              color:rgba(255,255,255,1);
            }
          }
          .row5{
            width: 8%;
            span{
              font-size: @fontSamll;
              font-family: HiraginoSansGB-W3;
              color: @fontWhite;
              transform: translate(0,-50%);
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
          }
          .row6{
            width: 8%;
            span{
              font-size: @fontSamll;
              font-family: HiraginoSansGB-W3;
              color: @fontWhite;
              transform: translate(0,-50%);
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
          }
          .row7{
            width: 8%;
            span{
              background: rgba(77,132,254,1);
              border-radius: 2px;
              padding: 4px 8px;
              color: @fontWhite;
            }
          }
          .row8{
            width: 8%;
            span{
              font-size: @fontSamll;
              font-family: HiraginoSansGB-W3;
              color: @fontWhite;
            }
          }
          .row9{
            width: 8%;
            span{
              font-size: @fontSamll;
              font-family: HiraginoSansGB-W3;
              color: @fontWhite;
            }
          }
          .row10{
            width: 8%;
            span{
              font-size: @fontSamll;
              font-family: HiraginoSansGB-W3;
              color: @fontWhite;
            }
          }
          .row11{
            width: 10%;
            span{
              font-size: @fontSamll;
              font-family: HiraginoSansGB-W3;
              color: @fontWhite;
            }
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
    .page_container{
      text-align: center;
      margin:0 24px;
      padding:12px 0;
    }
  }
}
</style>
