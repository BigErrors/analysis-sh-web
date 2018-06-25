<template>
   <div id='pointDetail' class='shade'>
    <div class="pointDetail_header">
      <div class="pointDetail_back" @click="changeRouter('index4renmintj')"></div>
    </div>
    <div class="pointDetail_nav">
      <span class="pointDetail_nav_span">首页 > 重点事件 > 详情</span>
    </div>
    <!-- 处理异步加载数据undefined问题用v-if解决 -->
     <div class="pointDetail_content">
       <div class="pointDetail_content_top">
         <div class="pointDetail_content_topLeft">
            <div class="pointDetail_content_title">
              <div class="pointDetail_content_title_left">重点事件信息</div>
            </div>
            <div v-if="eventDetail.zhongDianSJXX" class="pointDetail_content_img">
              <img class="pointDetail_content_i" src="/static/renmintj/icon_documents.png" />
              <span class="pointDetail_content_span1">{{eventDetail.zhongDianSJXX.zhongDiansjlx}}</span>
            </div>
            <div class="pointDetail_content_line1">
              <label class="pointDetail_content_label">时间：</label>
              <span v-if="eventDetail.zhongDianSJXX" class="pointDetail_content_detail1">{{eventDetail.zhongDianSJXX.shiJian}}</span>
              <label class="pointDetail_content_label">地点：</label>
              <span v-if="eventDetail.zhongDianSJXX" class="pointDetail_content_detail1">{{eventDetail.zhongDianSJXX.diDian}}</span>
            </div>
            <div class="pointDetail_content_line1">
              <label class="pointDetail_content_label">状态：</label>
              <span v-if="eventDetail.zhongDianSJXX" class="pointDetail_content_detail1"><span class='pointDetail_content_button'>{{eventDetail.zhongDianSJXX.zhuangTai}}</span></span>
              <label class="pointDetail_content_label">类型：</label>
              <span v-if="eventDetail.zhongDianSJXX" class="pointDetail_content_detail1">{{eventDetail.zhongDianSJXX.leiXing}}</span>
            </div>
            <div class="pointDetail_content_line1 clearfix">
              <label class="pointDetail_content_label" style="height:66px;float:left">描述：</label>
              <div v-if="eventDetail.zhongDianSJXX" class="pointDetail_content_detail2">{{eventDetail.zhongDianSJXX.miaoShu}}</div>
            </div>
            <img class="pointDetail_content_back" src="/static/renmintj/pic_success.png"/>
        </div>
        <div class="pointDetail_content_topRight">
          <div class="pointDetail_content_title">
            <div class="pointDetail_content_title_left">案件处理人员</div>
            <div class="pointDetail_content_title_right">
              <img @click="changeNum('decrease')" style="margin-right:10px;cursor:pointer" src="/static/renmintj/btn_left.png" />
              <img @click="changeNum('add')" style="cursor:pointer" src="/static/renmintj/btn_right.png" />
            </div>
          </div>
          <div class="pointDetail_content_pics" :class="{noNum:eventDetail.anJanCLRY&&eventDetail.anJanCLRY.length==0}">
            <div v-for='(item,index) in anJanCLRYShow' :key='index' class="pointDetail_content_pic">
              <div class="pointDetail_content_head">
                <img class="pointDetail_content_pic_1" onerror="src='/static/renmintj/mrtx.png'" src=""/>
                <img class="pointDetail_content_pic_2" src="/static/renmintj/pic_head portrait.png"/>
                <span class="pointDetail_content_pic_span">{{item.anJianCLRYLB}}</span>
              </div>
              <div class="pointDetail_content_body">
                <span class="pointDetail_content_pic_span2">{{item.mingZi}}</span>
                <span class="pointDetail_content_pic_span3">{{item.dianHua}}</span>
                <span class="pointDetail_content_pic_span3">{{item.tiaoWeiHMC}}</span>
              </div>
            </div>
            <span v-if='eventDetail.anJanCLRY&&eventDetail.anJanCLRY.length==0' class="noNum_span">暂无处理人员</span>
          </div>
        </div>
       </div>
       <div class="pointDetail_content_bottom">
         <div class="pointDetail_content_bottomLeft">
           <div class="pointDetail_content_title">
              <div class="pointDetail_content_title_left">当事人信息</div>
              <div v-if='eventDetail.dangShiRXX' style="font-size:14px;color:rgba(125,165,254,1);float:right;line-height:29px">（共{{eventDetail.dangShiRXX.length}}人）</div>
            </div>
            <div class="pointDetail_content_ul">
              <div v-for="(item,index) in eventDetail.dangShiRXX" :key='index' class="pointDetail_content_li" :class="{height_active:showWhich.indexOf(index)!==-1}">
                <div :class="{pointDetail_content_yj:item.dangShiRLB==='被申请人',pointDetail_content_yj2:item.dangShiRLB!=='被申请人'}">{{item.dangShiRLB}}</div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">姓名：</label>
                  <span class="pointDetail_content_s1">{{item.mingZi}}</span>
                  <label class="pointDetail_content_la1">性别：</label>
                  <span class="pointDetail_content_s1">{{item.xingBie}}</span>
                  <label class="pointDetail_content_la1">户籍：</label>
                  <span class="pointDetail_content_s1">{{item.huJi}}</span>
                </div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">住址：</label>
                  <span class="pointDetail_content_s2">{{item.zhuZhi}}</span>
                </div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">电话：</label>
                  <span class="pointDetail_content_s2">{{item.dianHua}}</span>
                  <span v-if='showWhich.indexOf(index)===-1' class="pointDetail_content_ifshow" @click="show(index)">展开</span>
                </div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">代理人：</label>
                  <span class="pointDetail_content_s4">{{item.daiLiR}}</span>
                   <label class="pointDetail_content_la2">与代理人关系：</label>
                  <span class="pointDetail_content_s2">{{item.yuDangSRGX}}</span>
                </div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">电话：</label>
                  <span class="pointDetail_content_s2">{{item.daiLiRDH}}</span>
                </div>
              </div>
            </div>
         </div>
         <div class="pointDetail_content_bottomRight">
            <div class="pointDetail_content_title">
              <div class="pointDetail_content_title_left">案件处理过程</div>
            </div>
            <!-- 人民调解七个步骤 -->
            <div v-if="eventDetail.anJianCLGC&&eventDetail.anJianCLGC.shuJuY==='人民调解'&&eventDetail.anJianCLGC.buZhouS===7" class="pointDetail_content_stepContainer" >
              <div class="pointDetail_content_imgMain">
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:110px"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:40px"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:42px"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:43px"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:31px"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:35px"/>
              </div>
              <div class="pointDetail_content_stepLeft">
                <div class="pointDetail_content_stepLeft1">
                  <span class="pointDetail_content_stepSpan1">{{eventDetail.anJianCLGC.buZhou1.mingCheng}}</span>
                  <span class="pointDetail_content_stepSpan2">{{eventDetail.anJianCLGC.buZhou1.shiJian.slice(0,10)}}</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:75px">
                  <span class="pointDetail_content_stepSpan1">{{eventDetail.anJianCLGC.buZhou2.mingCheng}}</span>
                  <span class="pointDetail_content_stepSpan2">{{eventDetail.anJianCLGC.buZhou2.shiJian.slice(0,10)}}</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:20px">
                  <span class="pointDetail_content_stepSpan1">{{eventDetail.anJianCLGC.buZhou3.mingCheng}}</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:0px">
                  <span class="pointDetail_content_stepSpan1">{{eventDetail.anJianCLGC.buZhou4.mingCheng}}</span>
                  <span class="pointDetail_content_stepSpan2">{{eventDetail.anJianCLGC.buZhou4.shiJian.slice(0,10)}}</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:25px">
                  <span class="pointDetail_content_stepSpan1">{{eventDetail.anJianCLGC.buZhou5.mingCheng}}</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:0px">
                  <span class="pointDetail_content_stepSpan1">{{eventDetail.anJianCLGC.buZhou6.mingCheng}}</span>
                  <span class="pointDetail_content_stepSpan2">{{eventDetail.anJianCLGC.buZhou6.shiJian.slice(0,10)}}</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:10px">
                  <span class="pointDetail_content_stepSpan1">{{eventDetail.anJianCLGC.buZhou7.mingCheng}}</span>
                </div>
              </div>
              <div class="pointDetail_content_stepRight">
                <div class="pointDetail_content_stepRight1" style="margin-top:0px">
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">申请事项1：</span>
                    <span class="pointDetail_content_stepSpan4" >{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSX0}}</span>
                  </div>
                    <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">申请事项2：</span>
                    <span class="pointDetail_content_stepSpan4" >{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSX1}}</span>
                  </div>
                    <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">申请事项3：</span>
                    <span class="pointDetail_content_stepSpan4" >{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSX2}}</span>
                  </div>
                    <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">申请事项4：</span>
                    <span class="pointDetail_content_stepSpan4" >{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSX3}}</span>
                  </div>
                    <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">其他事项：</span>
                    <span class="pointDetail_content_stepSpan4" >{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSXQT}}</span>
                  </div>
                </div>
                <div class="pointDetail_content_stepRight2">
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">受理结果：</span>
                    <span class="pointDetail_content_stepSpan4">{{eventDetail.anJianCLGC.buZhou2.shouLiJG}}</span>
                  </div>
                   <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">司法所：</span>
                    <span class="pointDetail_content_stepSpan4">{{eventDetail.anJianCLGC.buZhou2.siFaS}}</span>
                  </div>
                   <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">调解委员会：</span>
                    <span class="pointDetail_content_stepSpan4">{{eventDetail.anJianCLGC.buZhou2.tiaoJieWYH}}</span>
                  </div>
                </div>
                <div class="pointDetail_content_stepRight3">
                   <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">调解结果：</span>
                    <span class="pointDetail_content_stepSpan4">{{eventDetail.anJianCLGC.buZhou4.tiaoJieJG}}</span>
                  </div>
                   <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">旅行方式：</span>
                    <span class="pointDetail_content_stepSpan4">{{eventDetail.anJianCLGC.buZhou4.lvXingFS}}</span>
                  </div>
                   <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">是否进行司法确认：</span>
                    <span class="pointDetail_content_stepSpan4">{{eventDetail.anJianCLGC.buZhou4.shiFouJXSFQR}}</span>
                  </div>
                </div>
                <div class="pointDetail_content_stepRight4">
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">回访记录：</span>
                    <span class="pointDetail_content_stepSpan4">{{eventDetail.anJianCLGC.buZhou6.huiFangJL}}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 人民调解三个步骤 -->
            <div v-if="eventDetail.anJianCLGC&&eventDetail.anJianCLGC.shuJuY==='人民调解'&&eventDetail.anJianCLGC.buZhouS===3" class="pointDetail_content_stepContainer" >
               <div class="pointDetail_content_imgMain">
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:190px"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:209px"/>
              </div>
              <div class="pointDetail_content_stepLeft">
                <div class="pointDetail_content_stepLeft1">
                  <span class="pointDetail_content_stepSpan1">待办申请</span>
                  <span class="pointDetail_content_stepSpan2">2017/10/23 08:30</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:165px">
                  <span class="pointDetail_content_stepSpan1">不予受理</span>
                  <span class="pointDetail_content_stepSpan2">2017/10/23 08:30</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:165px">
                  <span class="pointDetail_content_stepSpan1">不予受理归档</span>
                  <span class="pointDetail_content_stepSpan2">2017/10/23 08:30</span>
                </div>
              </div>
              <div class="pointDetail_content_stepRight">
                <div class="pointDetail_content_stepRight1" style="margin-top:0">
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">申请事项1：</span>
                    <span class="pointDetail_content_stepSpan4">由市场建设引发的矛盾</span>
                  </div>
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">申请事项2：</span>
                    <span class="pointDetail_content_stepSpan4">由市场建设引发的矛盾</span>
                  </div>
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">申请事项3：</span>
                    <span class="pointDetail_content_stepSpan4">由市场建设引发的矛盾</span>
                  </div>
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">申请事项4：</span>
                    <span class="pointDetail_content_stepSpan4">由市场建设引发的矛盾</span>
                  </div>
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">其他事项：</span>
                    <span class="pointDetail_content_stepSpan4">由市场建设引发的矛盾</span>
                  </div>
                </div>
                <div class="pointDetail_content_stepRight1" style="margin-top:94px">
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">受理结果：</span>
                    <span class="pointDetail_content_stepSpan4">由市场建设引发的矛盾</span>
                  </div>
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">司法所：</span>
                    <span class="pointDetail_content_stepSpan4">由市场建设引发的矛盾</span>
                  </div>
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">调解委员会：</span>
                    <span class="pointDetail_content_stepSpan4">由市场建设引发的矛盾</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 110联动三个步骤 -->
            <div v-if="false" class="pointDetail_content_stepContainer" >
               <div class="pointDetail_content_imgMain">
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:190px"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:209px"/>
              </div>
              <div class="pointDetail_content_stepLeft">
                <div class="pointDetail_content_stepLeft1">
                  <span class="pointDetail_content_stepSpan1">步骤1</span>
                  <span class="pointDetail_content_stepSpan2">2017/10/23 08:30</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:165px">
                  <span class="pointDetail_content_stepSpan1">步骤2</span>
                  <span class="pointDetail_content_stepSpan2">2017/10/23 08:30</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:180px">
                  <span class="pointDetail_content_stepSpan1">步骤3</span>
                </div>
              </div>
              <div class="pointDetail_content_stepRight">
                <div class="pointDetail_content_stepRight1">
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">办案地点：</span>
                    <span class="pointDetail_content_stepSpan4">由市场建设引发的矛盾</span>
                  </div>
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">类型：</span>
                    <span class="pointDetail_content_stepSpan4">由市场建设引发的矛盾</span>
                  </div>
                </div>
                <div class="pointDetail_content_stepRight1" style="margin-top:171px">
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">报案地点：</span>
                    <span class="pointDetail_content_stepSpan4">由市场建设引发的矛盾</span>
                  </div>
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">报案派出所：</span>
                    <span class="pointDetail_content_stepSpan4">由市场建设引发的矛盾</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 110联动四个步骤 -->
            <div v-if="false" class="pointDetail_content_stepContainer" >
               <div class="pointDetail_content_imgMain">
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:190px"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:209px"/>
              </div>
              <div class="pointDetail_content_stepLeft">
                <div class="pointDetail_content_stepLeft1">
                  <span class="pointDetail_content_stepSpan1">步骤1</span>
                  <span class="pointDetail_content_stepSpan2">2017/10/23 08:30</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:165px">
                  <span class="pointDetail_content_stepSpan1">步骤2</span>
                  <span class="pointDetail_content_stepSpan2">2017/10/23 08:30</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:180px">
                  <span class="pointDetail_content_stepSpan1">步骤3</span>
                </div>
              </div>
              <div class="pointDetail_content_stepRight">
                <div class="pointDetail_content_stepRight1">
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">办案地点：</span>
                    <span class="pointDetail_content_stepSpan4">由市场建设引发的矛盾</span>
                  </div>
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">类型：</span>
                    <span class="pointDetail_content_stepSpan4">由市场建设引发的矛盾</span>
                  </div>
                </div>
                <div class="pointDetail_content_stepRight1" style="margin-top:171px">
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">报案地点：</span>
                    <span class="pointDetail_content_stepSpan4">由市场建设引发的矛盾</span>
                  </div>
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">报案派出所：</span>
                    <span class="pointDetail_content_stepSpan4">由市场建设引发的矛盾</span>
                  </div>
                </div>
              </div>
            </div>
         </div>
       </div>
     </div>
  </div>

</template>

<script>
import http from '@/util/httpUtil'
export default {
  data: function () {
    return {
      showWhich: [''],
      eventDetail: {},
      anJanCLRY: [],
      anJanCLRYShow: [],
      page: 0
    }
  },
  methods: {
    show: function (which) {
      this.showWhich.push(which)
    },
    // 路由跳转
    changeRouter (name) {
      this.$router.push({name: name})
    },
    // 案件处理人员分页
    changeNum (method) {
      let _this = this
      if (method === 'add') {
        if (_this.anJanCLRY[(_this.page + 1) * 3] !== undefined) {
          _this.page++
        }
      } else {
        if (_this.anJanCLRY[(_this.page - 1) * 3] !== undefined) {
          _this.page--
        }
      }
      _this.anJanCLRYShow = []
      for (let i = 0; i < 3; i++) {
        if (_this.anJanCLRY[i + _this.page * 3] !== undefined) {
          _this.anJanCLRYShow[i] = _this.anJanCLRY[i + _this.page * 3]
        }
      }
    }
  },
  created: function () {
    let _this = this
    http.get('/peopleMediate/ZdsjUnderDetails', {id: _this.$route.params.id}, (res) => {
      console.log(res)
      _this.eventDetail = res
      _this.anJanCLRY = res.anJanCLRY
      for (let i = 0; i < 3; i++) {
        if (res.anJanCLRY[i] !== undefined) { _this.anJanCLRYShow.push(res.anJanCLRY[i]) }
      }
    })
  }
}
</script>

<style>
  .shade {
    background: url(/static/renmintj/pic_bg.png);
    background-repeat: no-repeat;
    background-position: center;
  }

  .pointDetail_header {
    width: 100%;
    min-width: 1920px;
    height: 87px;
    background: url('/static/renmintj/pic_title.png');
    background-repeat: no-repeat;
    background-position: center;
    z-index: 99;
    position: relative;
  }

  .pointDetail_back {
    background: url('/static/renmintj/btn_back.png');
    position: absolute;
    left: 22px;
    width: 137px;
    height: 35px;
    background-position: center;
    top: 28px;
    cursor: pointer;
  }

  .pointDetail_nav {
    height: 24px;
    margin: 6px 0 20px 0;
    padding-left: 34px;
    width: 100%;
    box-sizing: border-box;
  }

  .pointDetail_nav_span {
    font-size: 18px;
    font-family: HiraginoSansGB-W3;
    color: rgba(94, 126, 203, 1);
  }
  .pointDetail_content {
    width: 100%;
    height: 943px;
    box-sizing: border-box;
    padding: 13px 24px 24px 24px;
  }
  .pointDetail_content_top{
    width: 100%;
    height: 274px;
  }
  .pointDetail_content_bottom{
    width: 100%;
    height: 619px;
    margin-top:20px;
  }
  .pointDetail_content_topLeft{
    float: left;
    height: 274px;
    width: 1092px;
    position: relative;
    background: linear-gradient( rgba(0,33,129,0),rgba(0,33,129,0.5));
  }
  .pointDetail_content_topRight{
    width: 765px;
    height: 274px;
    float: right;
    background: linear-gradient( rgba(0,33,129,0),rgba(0,33,129,0.5));
  }
  .pointDetail_content_bottomLeft{
    float: left;
    height: 619px;
    width: 482px;
    background: linear-gradient( rgba(0,33,129,0),rgba(0,33,129,0.5));
  }
  .pointDetail_content_bottomRight{
    width: 1369px;
    height: 619px;
    float: right;
    background: linear-gradient( rgba(0,33,129,0),rgba(0,33,129,0.5));
  }
  .pointDetail_content_title{
    display: block;
    width: 100%;
    height: 39px;
    padding:0 14px;
    padding-top: 10px;
    position: relative;
    box-sizing: border-box;
  }
  .pointDetail_content_title_left{
    font-size: 22px;
    font-family: MicrosoftYaHei;
    color: rgba(125,165,254,1);
    padding-left: 8px;
    border-left: 3px solid rgba(125,165,254,1);
    float: left;
  }
  .pointDetail_content_title_right{
    float: right;
  }
  .pointDetail_content_img{
    height: 25px;
    display: block;
    margin:20px 14px;
  }
  .pointDetail_content_span1{
    display: inline-block;
    margin-left:17px;
    font-size:20px;
    font-family:HiraginoSansGB-W3;
    color:rgba(17,148,248,1);
    vertical-align: bottom;
  }
  .pointDetail_content_line1{
    display: block;
    margin:20px 14px 0 14px;
  }
  .pointDetail_content_label{
    display: inline-block;
    width: 3em;
    font-size:16px;
    font-family:HiraginoSansGB-W3;
    color:rgba(77,132,254,1);
    line-height: 24px;
    height: 24px;
  }
  .pointDetail_content_detail1{
    display: inline-block;
    font-size:16px;
    font-family:HiraginoSansGB-W3;
    color:rgba(197,215,255,1);
    margin-left:24px;
    line-height: 24px;
    height: 24px;
    width: 274px;
  }
  .pointDetail_content_button{
    font-size:16px;
    font-family:HiraginoSansGB-W3;
    color:rgba(7,211,59,1);
    height:24px;
    background:rgba(6,235,65,0.3);
    border-radius:4px;
    line-height: 22px;
    padding:0 8px;
    box-sizing: border-box;
    border:1px solid #06EB41;
  }
  .pointDetail_content_detail2{
    font-size:16px;
    font-family:HiraginoSansGB-W3;
    color:rgba(197,215,255,1);
    margin-left:24px;
    line-height: 24px;
    float: left;
    width: 960px;
  }
  .pointDetail_content_back{
    position: absolute;
    right: 55px;
    top:29px;
  }
  .pointDetail_content_pics{
    width: 100%;
    position: relative;
    height: 235px;
    box-sizing: border-box;
    padding-left:28px;
  }
  .pointDetail_content_pic{
    float: left;
    height: 235px;
    margin-right: 22px;
  }
  .pointDetail_content_pic:last-child{
    margin-right: 0;
  }
  .pointDetail_content_head{
    width: 111px;
    height: 106px;
    position: relative;
    margin:65px 16px 64px 0;
    float: left;
  }
  .pointDetail_content_pic_1{
    position: absolute;
    width: 75px;
    height: 93px;
    left: 50%;
    top:0;
    transform: translate(-50%,0);
    z-index: 1;
  }
  .pointDetail_content_pic_2{
    position: absolute;
    width: 111px;
    height: 23px;
    bottom:0;
    left: 0;
    z-index: 3;
  }
  .pointDetail_content_pic_span{
    position: absolute;
    width: 111px;
    height: 23px;
    bottom:0;
    left: 0;
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,255,255,1);
    line-height: 16px;
    text-align: center;
    z-index: 4;
  }
  .pointDetail_content_body{
    float: left;
    margin-top:76px;
  }
  .pointDetail_content_pic_span2{
    font-size:16px;
    font-family:HiraginoSansGB-W3;
    color:rgba(197,215,255,1);
    height: 21px;
    display: block;
    margin-bottom:13px;
  }
  .pointDetail_content_pic_span3{
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(77,132,254,1);
    display: block;
    margin-bottom:13px;
    width:7em;
    overflow: hidden;
  }
  .pointDetail_content_ul{
    height: 580px;
    width: 100%;
    box-sizing: border-box;
    margin-top: 15px;
    overflow: hidden;
  }
  .pointDetail_content_ul:hover{
    overflow-y: auto
  }
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  .pointDetail_content_ul::-webkit-scrollbar
  {
    width: 4px;
    background-color: rgba(1,24,84,1);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  .pointDetail_content_ul::-webkit-scrollbar-track
  {
    border-radius: 2px;
    background-color: transparent;
  }

  /*定义滑块 内阴影+圆角*/
  .pointDetail_content_ul::-webkit-scrollbar-thumb
  {
    height: 4px;
    border-radius: 2px;
    background-color: rgba(1,24,84,0.2);
  }
  .pointDetail_content_li{
    width: 100%;
    height: 136px;
    background: #002182;
    transition: 0.3s linear;
    position: relative;
    padding-top:32px;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 6px;
  }
  .pointDetail_content_yj{
    position: absolute;
    left: 0;
    top:0;
    padding:4px;
    padding-right: 12px;
    font-size:16px;
    font-family:HiraginoSansGB-W3;
    color:rgba(219,230,255,1);
    display: inline-block;
    background:rgba(252,63,79,1);
    height: 24px;
    line-height: 24px;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  .pointDetail_content_yj2{
    position: absolute;
    left: 0;
    top:0;
    padding:4px;
    padding-right: 12px;
    font-size:16px;
    font-family:HiraginoSansGB-W3;
    color:rgba(219,230,255,1);
    display: inline-block;
    background:rgba(45,91,245,1);
    height: 24px;
    line-height: 24px;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  .pointDetail_content_l1{
    display: block;
    height: 19px;
    margin-bottom: 15px;
    margin-top: 4px;
  }
  .pointDetail_content_la1{
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(77,132,254,1);
    width: 5em;
    text-align: right;
    display: inline-block;
  }
  .pointDetail_content_la2{
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(77,132,254,1);
    width: 10.5em;
    text-align: right;
    display: inline-block;
  }
  .pointDetail_content_s1{
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(197,215,255,1);
    display: inline-block;
    width: 5em;
  }
  .pointDetail_content_s2{
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(197,215,255,1);
    display: inline-block;
  }
  .pointDetail_content_s4{
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(197,215,255,1);
    display: inline-block;
    width: 10em;
  }
  .pointDetail_content_ifshow{
    padding:4px 17px 4px 6px;
    font-size:12px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,255,255,1);
    border-radius: 2px;
    background:rgba(45,91,245,1);
    background-image: url('/static/renmintj/icon_open.png');
    background-position: right 4px center;
    background-repeat: no-repeat;
    float: right;
    margin-right: 16px;
    cursor: pointer;
  }
  .height_active{
    height: 200px;
  }
  .pointDetail_content_stepContainer{
    width: 100%;
    height: 580px;
    position: relative;
  }
  .pointDetail_content_imgMain{
    position: absolute;
    left: 458px;
    background: url('/static/renmintj/line.png') no-repeat;
    width: 25px;
    height: 100%;
    background-position: center top -20px;
  }
  .pointDetail_content_imgMain img{
    width: 25px;
    height: 25px;
  }
  .pointDetail_content_imga{
    margin-top:26px;
  }
  .pointDetail_content_stepLeft{
    position: absolute;
    width: 120px;
    height: 100%;
    left: 320px;
  }
  .pointDetail_content_stepLeft1{
    width: 100%;
    height: 60px;
    text-align: center;
    margin-top:20px;
  }
  .pointDetail_content_stepSpan1{
    font-size:16px;
    font-family:HiraginoSansGB-W3;
    color:rgba(197,215,255,1);
    display: block;
  }
  .pointDetail_content_stepSpan2{
    margin-top:14px;
    font-size:12px;
    font-family:HiraginoSansGB-W3;
    color:rgba(77,132,254,1);
    display: block;
  }
  .pointDetail_content_stepRight{
    position: absolute;
    width: 800px;
    height: 100%;
    left: 510px;
  }
  .pointDetail_content_stepRight1{
    width: 100%;
    text-align: left;
    margin-top:25px;
  }
  .pointDetail_content_stepRight2{
    text-align: left;
    margin-top:32px;
  }
  .pointDetail_content_stepRight3{
    text-align: left;
    margin-top:45px;
  }
  .pointDetail_content_stepRight4{
    text-align: left;
    margin-top:80px;
  }
  .pointDetail_content_stepSpanC{
    display: block;
    margin-bottom: 10px;
  }
  .pointDetail_content_stepSpan3{
    width: 10em;
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(77,132,254,1);
    float: left;
    text-align: right;
  }
  .pointDetail_content_stepSpan4{
    float: left;
    font-size:14px;
    font-family:HiraginoSansGB-W3;
    color:rgba(197,215,255,1);
    width: 600px;
  }
  .noNum{
    background: url('/static/renmintj/noNum.png') no-repeat center center;
  }
  .noNum_span{
    position: absolute;
    left: 50%;
    bottom:26px;
    transform: translate(-50%,0);
    font-size: 14px;
    font-family: HiraginoSansGB-W3;
    color: rgba(77,132,254,1);
  }
</style>
