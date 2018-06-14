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
        <span class="institutionRanking_nav2_span active">机构排名</span>
        <span class="institutionRanking_nav2_span"></span>
        <span class="institutionRanking_nav2_span"></span>
      </div>
    </div>
    <div class="institutionRanking_nav3">
      <div class="institutionRanking_nav3_left active">区局</div>
      <div class="institutionRanking_nav3_left">司法所</div>
      <div class="institutionRanking_nav3_left">调委会</div>
      <div class="institutionRanking_nav3_right" @click="getData(1)">导出Excel</div>
      <div class="institutionRanking_nav3_date">
        <el-date-picker
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
    </div>
    <div class="institutionRanking_content">
      <table cellspacing="0" class="institutionRanking_content_table">
        <thead class="institutionRanking_content_thead">
          <tr>
            <th><span class="institutionRanking_content_span">排名</span></th>
            <th><span class="institutionRanking_content_span" >名称</span></th>
            <th><span @click="sort('people_number')"  class="institutionRanking_content_span" :class="{'yellow':obj==='people_number'}">人员数量</span><i @click="sort('people_number')" class="bg1" :class="{bg2:obj==='people_number'&&reorder==='DESC',bg3:obj==='people_number'&&reorder==='ASC'}"></i></th>
            <th><span @click="sort('yw_number')" class="institutionRanking_content_span" :class="{'yellow':obj==='yw_number'}">业务总量</span><i @click="sort('yw_number')" class="bg1" :class="{bg2:obj==='yw_number'&&reorder==='DESC',bg3:obj==='yw_number'&&reorder==='ASC'}"></i></th>
            <th><span @click="sort('aj_number')" class="institutionRanking_content_span" :class="{'yellow':obj==='aj_number'}">调解案件数</span><i @click="sort('aj_number')" class="bg1" :class="{bg2:obj==='aj_number'&&reorder==='DESC',bg3:obj==='aj_number'&&reorder==='ASC'}"></i></th>
            <th><span @click="sort('pc_number')" class="institutionRanking_content_span" :class="{'yellow':obj==='pc_number'}">排查反馈数</span><i @click="sort('pc_number')" class="bg1" :class="{bg2:obj==='pc_number'&&reorder==='DESC',bg3:obj==='pc_number'&&reorder==='ASC'}"></i></th>
            <th><span @click="sort('sb_number')" class="institutionRanking_content_span" :class="{'yellow':obj==='sb_number'}">调节案例上报数</span><i @click="sort('sb_number')" class="bg1" :class="{bg2:obj==='sb_number'&&reorder==='DESC',bg3:obj==='sb_number'&&reorder==='ASC'}"></i></th>
            <th><span @click="sort('rz_number')" class="institutionRanking_content_span" :class="{'yellow':obj==='rz_number'}">咨询管理日志数</span><i @click="sort('rz_number')" class="bg1" :class="{bg2:obj==='rz_number'&&reorder==='DESC',bg3:obj==='rz_number'&&reorder==='ASC'}"></i></th>
            <th><span @click="sort('cj_number')" class="institutionRanking_content_span" :class="{'yellow':obj==='cj_number'}">村居服务数</span><i @click="sort('cj_number')" class="bg1" :class="{bg2:obj==='cj_number'&&reorder==='DESC',bg3:obj==='cj_number'&&reorder==='ASC'}"></i></th>
            <th><span @click="sort('fx_number')" class="institutionRanking_content_span" :class="{'yellow':obj==='fx_number'}">法宣活动数</span><i @click="sort('fx_number')" class="bg1" :class="{bg2:obj==='fx_number'&&reorder==='DESC',bg3:obj==='fx_number'&&reorder==='ASC'}"></i></th>
            <th><span @click="sort('rate')" class="institutionRanking_content_span" :class="{'yellow':obj==='rate'}">业务系统使用率</span><i @click="sort('rate')" class="bg1" :class="{bg2:obj==='rate'&&reorder==='DESC',bg3:obj==='rate'&&reorder==='ASC'}"></i></th>
          </tr>
        </thead>
        <tbody class="institutionRanking_content_tbody">
          <tr v-for="(item,index) in list" :key = index>
            <td>
              <span v-if="(index>2||currentpage>1)&&reorder==='DESC'" class="institutionRanking_content_span2">{{index+1+(currentpage-1)*10}}</span>
              <span v-if="reorder==='ASC'" class="institutionRanking_content_span2">{{pageTotal-(index)-(currentpage-1)*10}}</span>
              <img v-if="index===0&&currentpage===1&&reorder==='DESC'" class="institutionRanking_content_jp" src='/static/renmintj/jingpai.png' />
              <img v-if="index===1&&currentpage===1&&reorder==='DESC'" class="institutionRanking_content_jp" src='/static/renmintj/yinpai.png' />
              <img v-if="index===2&&currentpage===1&&reorder==='DESC'" class="institutionRanking_content_jp" src='/static/renmintj/tongpai.png' />
            </td>
            <td ><div class="institutionRanking_content_jg">{{item.sifaju}}</div></td>
            <td><span class="institutionRanking_content_rysl">{{item.people_number}}</span></td>
            <td><span class="institutionRanking_content_span2">{{item.yw_number}}</span></td>
            <td><span class="institutionRanking_content_span2">{{item.aj_number}}</span></td>
            <td><span class="institutionRanking_content_span2">{{item.pc_number}}</span></td>
            <td><span class="institutionRanking_content_span2">{{item.sb_number}}</span></td>
            <td><span class="institutionRanking_content_span3">{{item.rz_number}}</span></td>
            <td><span class="institutionRanking_content_span3">{{item.cj_number}}</span></td>
            <td><span class="institutionRanking_content_span3">{{item.fx_number}}</span></td>
            <td><span class="institutionRanking_content_span4">{{item.rate*100+"%"}}</span></td>
          </tr>
        </tbody>
      </table>
      <el-pagination
      layout="total, prev, pager, next"
      :total="pageTotal"
      :page-size="10"
      @current-change="handleCurrentChange"
      class="ej-pagination"></el-pagination>
    </div>
  </div>
</template>

<script>
import http from '@/util/httpUtil'

export default {
  data: function () {
    return {
      date: '',
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
      pageTotal: 1,
      currentpage: 1,
      reorder: 'DESC',
      obj: ''
    }
  },
  created: function () {
    this.getData()
  },
  methods: {
    getData (excl) {
      let _this = this
      let excel = excl || 0
      let url = '/peopleMediate/institutionalRankings'
      let param = {
        'obj': _this.obj,
        'reorder': _this.reorder,
        'excl': excel,
        'pagesize': 10,
        'currentpage': _this.currentpage
      }
      if (excel === 0) {
        http.post(url, param, (data) => {
          _this.list = data.pageData
          _this.pageTotal = data.pageinfo.total
        }, 'application/json')
      } else {
        http.post(url, param, (data) => {
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
    // 分页
    handleCurrentChange (val) {
      this.currentpage = val
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

<style>
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
  margin:12px 34px;
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
  cursor: pointer;
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
  height: 837px;
  padding:0 34px 0 34px;
  text-align: center
}
.institutionRanking_content_table{
  width: 100%;
  margin-bottom: 10px
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
  cursor: pointer;
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
  cursor: pointer;
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
  cursor: pointer;
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
  cursor: pointer;
}
.institutionRanking_content_tbody tr{
  height: 74px;
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
  background: rgba(1,41,126,0.5);
}
.yellow{
  color:rgba(255,198,0,1);
}
</style>
