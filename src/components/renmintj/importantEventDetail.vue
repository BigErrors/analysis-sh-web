<template>
   <div id='pointDetail' class='shade'>
    <div class="pointDetail_header">
      <div class="pointDetail_back" @click="changeRouter('index4renmintj')"></div>
    </div>
    <div class="pointDetail_nav">
      <span class="pointDetail_nav_span">首页 > 重点事件 > 详情</span>
    </div>
     <div class="pointDetail_content">
       <div class="pointDetail_content_top">
         <div class="pointDetail_content_topLeft">
            <div class="pointDetail_content_title">
              <div class="pointDetail_content_title_left">重点事件信息</div>
            </div>
            <div class="pointDetail_content_img">
              <img class="pointDetail_content_i" src="/static/renmintj/icon_documents.png" />
              <span class="pointDetail_content_span1">群体性事件</span>
            </div>
            <div class="pointDetail_content_line1">
              <label class="pointDetail_content_label">时间：</label>
              <span class="pointDetail_content_detail1">2018/03/05</span>
              <label class="pointDetail_content_label">地点：</label>
              <span class="pointDetail_content_detail1">崇明区城桥镇人民路68号</span>
            </div>
            <div class="pointDetail_content_line1">
              <label class="pointDetail_content_label">状态：</label>
              <span class="pointDetail_content_detail1"><span class='pointDetail_content_button'>处理中</span></span>
              <label class="pointDetail_content_label">类型：</label>
              <span class="pointDetail_content_detail1">非法占地</span>
            </div>
            <div class="pointDetail_content_line1 clearfix">
              <label class="pointDetail_content_label" style="height:66px;float:left">描述：</label>
              <div class="pointDetail_content_detail2">乡政府为修建厂房，以建农贸市场的名义，向甲村下发通知，强行占用甲村一块闲置地进行开发建设。甲村村民多次向村委会反映，要求村委会代表村集体，到法院起诉乡政府这一非法占地行为，但村委会拒绝出面起诉乡政府。双方矛盾越来越大，有矛盾加重进行上访的可能性。</div>
            </div>
            <img class="pointDetail_content_back" src="/static/renmintj/pic_success.png"/>
        </div>
        <div class="pointDetail_content_topRight">
          <div class="pointDetail_content_title">
            <div class="pointDetail_content_title_left">案件处理人员</div>
            <div class="pointDetail_content_title_right">
              <img style="margin-right:10px;cursor:pointer" src="/static/renmintj/btn_left.png" />
              <img style="cursor:pointer" src="/static/renmintj/btn_right.png" />
            </div>
          </div>
          <div class="pointDetail_content_pics" :class="{noNum:true}">
            <div v-if='false' class="pointDetail_content_pic">
              <div class="pointDetail_content_head">
                <img class="pointDetail_content_pic_1" onerror="src='/static/renmintj/mrtx.png'" src=""/>
                <img class="pointDetail_content_pic_2" src="/static/renmintj/pic_head portrait.png"/>
                <span class="pointDetail_content_pic_span">调解员</span>
              </div>
              <div class="pointDetail_content_body">
                <span class="pointDetail_content_pic_span2">王芳</span>
                <span class="pointDetail_content_pic_span3">12578884444</span>
                <span class="pointDetail_content_pic_span3">光明律师事务所</span>
              </div>
            </div>
            <div v-if='false' class="pointDetail_content_pic">
              <div class="pointDetail_content_head">
                <img class="pointDetail_content_pic_1" onerror="src='/static/renmintj/mrtx.png'" src=""/>
                <img class="pointDetail_content_pic_2" src="/static/renmintj/pic_head portrait.png"/>
                <span class="pointDetail_content_pic_span">调解员</span>
              </div>
              <div class="pointDetail_content_body">
                <span class="pointDetail_content_pic_span2">王芳</span>
                <span class="pointDetail_content_pic_span3">12578884444</span>
                <span class="pointDetail_content_pic_span3">光明律师事务所</span>
              </div>
            </div>
            <div v-if='false' class="pointDetail_content_pic">
              <div class="pointDetail_content_head">
                <img class="pointDetail_content_pic_1" onerror="src='/static/renmintj/mrtx.png'" src=""/>
                <img class="pointDetail_content_pic_2" src="/static/renmintj/pic_head portrait.png"/>
                <span class="pointDetail_content_pic_span">调解员</span>
              </div>
              <div class="pointDetail_content_body">
                <span class="pointDetail_content_pic_span2">王芳</span>
                <span class="pointDetail_content_pic_span3">12578884444</span>
                <span class="pointDetail_content_pic_span3">光明律师事务所</span>
              </div>
            </div>
            <span v-if='true' class="noNum_span">暂无处理人员</span>
          </div>
        </div>
       </div>
       <div class="pointDetail_content_bottom">
         <div class="pointDetail_content_bottomLeft">
           <div class="pointDetail_content_title">
              <div class="pointDetail_content_title_left">当事人信息</div>
              <div style="font-size:14px;color:rgba(125,165,254,1);float:right;line-height:29px">（共7人）</div>
            </div>
            <div class="pointDetail_content_ul">
              <div class="pointDetail_content_li" :class="{height_active:showWhich.indexOf(1)!==-1}">
                <div class="pointDetail_content_yj">被申请人</div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">姓名：</label>
                  <span class="pointDetail_content_s1">王大强</span>
                  <label class="pointDetail_content_la1">性别：</label>
                  <span class="pointDetail_content_s1">男</span>
                  <label class="pointDetail_content_la1">户籍：</label>
                  <span class="pointDetail_content_s1">上海</span>
                </div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">住址：</label>
                  <span class="pointDetail_content_s2">上海市闵行区古龙路3号楼2D18-19号</span>
                </div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">电话：</label>
                  <span class="pointDetail_content_s2">15555555555</span>
                  <span v-if='showWhich.indexOf(1)===-1' class="pointDetail_content_ifshow" @click="show(1)">展开</span>
                </div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">代理人：</label>
                  <span class="pointDetail_content_s4">王二强</span>
                   <label class="pointDetail_content_la2">与代理人关系：</label>
                  <span class="pointDetail_content_s2">兄弟</span>
                </div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">电话：</label>
                  <span class="pointDetail_content_s2">15555555555</span>
                </div>
              </div>
              <div class="pointDetail_content_li" :class="{height_active:showWhich.indexOf(2)!==-1}">
                <div class="pointDetail_content_yj2">申请人</div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">姓名：</label>
                  <span class="pointDetail_content_s1">王大强</span>
                  <label class="pointDetail_content_la1">性别：</label>
                  <span class="pointDetail_content_s1">男</span>
                  <label class="pointDetail_content_la1">户籍：</label>
                  <span class="pointDetail_content_s1">上海</span>
                </div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">住址：</label>
                  <span class="pointDetail_content_s2">上海市闵行区古龙路3号楼2D18-19号</span>
                </div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">电话：</label>
                  <span class="pointDetail_content_s2">15555555555</span>
                  <span v-if='showWhich.indexOf(2)===-1' class="pointDetail_content_ifshow" @click="show(2)">展开</span>
                </div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">代理人：</label>
                  <span class="pointDetail_content_s4">王二强</span>
                   <label class="pointDetail_content_la2">与代理人关系：</label>
                  <span class="pointDetail_content_s2">兄弟</span>
                </div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">电话：</label>
                  <span class="pointDetail_content_s2">15555555555</span>
                </div>
              </div>
              <div class="pointDetail_content_li" :class="{height_active:showWhich.indexOf(3)!==-1}">
                <div class="pointDetail_content_yj2">申请人</div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">姓名：</label>
                  <span class="pointDetail_content_s1">王大强</span>
                  <label class="pointDetail_content_la1">性别：</label>
                  <span class="pointDetail_content_s1">男</span>
                  <label class="pointDetail_content_la1">户籍：</label>
                  <span class="pointDetail_content_s1">上海</span>
                </div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">住址：</label>
                  <span class="pointDetail_content_s2">上海市闵行区古龙路3号楼2D18-19号</span>
                </div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">电话：</label>
                  <span class="pointDetail_content_s2">15555555555</span>
                  <span v-if='showWhich.indexOf(3)===-1' class="pointDetail_content_ifshow" @click="show(3)">展开</span>
                </div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">代理人：</label>
                  <span class="pointDetail_content_s4">王二强</span>
                   <label class="pointDetail_content_la2">与代理人关系：</label>
                  <span class="pointDetail_content_s2">兄弟</span>
                </div>
                <div class="pointDetail_content_l1">
                  <label class="pointDetail_content_la1">电话：</label>
                  <span class="pointDetail_content_s2">15555555555</span>
                </div>
              </div>
            </div>
         </div>
         <div class="pointDetail_content_bottomRight">
            <div class="pointDetail_content_title">
              <div class="pointDetail_content_title_left">案件处理过程</div>
            </div>
            <div v-if="showNum===7" class="pointDetail_content_stepContainer" >
              <div class="pointDetail_content_imgMain">
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:62px"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:45px"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:42px"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:43px"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:31px"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:44px"/>
              </div>
              <div class="pointDetail_content_stepLeft">
                <div class="pointDetail_content_stepLeft1">
                  <span class="pointDetail_content_stepSpan1">待办申请</span>
                  <span class="pointDetail_content_stepSpan2">2017/10/23 08:30</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:25px">
                  <span class="pointDetail_content_stepSpan1">案件受理</span>
                  <span class="pointDetail_content_stepSpan2">2017/10/23 08:30</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:25px">
                  <span class="pointDetail_content_stepSpan1">正在调解</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:0px">
                  <span class="pointDetail_content_stepSpan1">调解成功</span>
                  <span class="pointDetail_content_stepSpan2">2017/10/23 08:30</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:25px">
                  <span class="pointDetail_content_stepSpan1">调解协议</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:0px">
                  <span class="pointDetail_content_stepSpan1">协议归档</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:0px">
                  <span class="pointDetail_content_stepSpan1">协议回访</span>
                  <span class="pointDetail_content_stepSpan2">2017/10/23 08:30</span>
                </div>
              </div>
              <div class="pointDetail_content_stepRight">
                <div class="pointDetail_content_stepRight1">
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">申请事项：</span>
                    <span class="pointDetail_content_stepSpan4">由市场建设引发的矛盾</span>
                  </div>
                </div>
                <div class="pointDetail_content_stepRight2">
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">受理结果：</span>
                    <span class="pointDetail_content_stepSpan4">予以受理</span>
                  </div>
                   <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">司法所：</span>
                    <span class="pointDetail_content_stepSpan4">杨浦区司法局江浦路司法局</span>
                  </div>
                   <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">调解委员会：</span>
                    <span class="pointDetail_content_stepSpan4">上海市杨浦区江浦路街道宝钢村居民委员会</span>
                  </div>
                </div>
                <div class="pointDetail_content_stepRight3">
                   <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">调解结果：</span>
                    <span class="pointDetail_content_stepSpan4">成功</span>
                  </div>
                   <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">旅行方式：</span>
                    <span class="pointDetail_content_stepSpan4">回复原装，赔礼道歉</span>
                  </div>
                   <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">是否进行司法确认：</span>
                    <span class="pointDetail_content_stepSpan4">否</span>
                  </div>
                </div>
                <div class="pointDetail_content_stepRight4">
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">回访记录：</span>
                    <span class="pointDetail_content_stepSpan4">由市场建设引发的矛盾由市场建设引发的矛盾由市场建设引发的矛盾由市场建设引发的矛盾</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="showNum===5" class="pointDetail_content_stepContainer" >
              <div class="pointDetail_content_imgMain">
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:100px"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:87px"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:70px"/>
                <img src="/static/renmintj/redPoint.png" class="pointDetail_content_imga" style="margin-top:82px"/>
              </div>
              <div class="pointDetail_content_stepLeft">
                <div class="pointDetail_content_stepLeft1">
                  <span class="pointDetail_content_stepSpan1">待办申请</span>
                  <span class="pointDetail_content_stepSpan2">2017/10/23 08:30</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:65px">
                  <span class="pointDetail_content_stepSpan1">案件受理</span>
                  <span class="pointDetail_content_stepSpan2">2017/10/23 08:30</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:65px">
                  <span class="pointDetail_content_stepSpan1">正在调解</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:40px">
                  <span class="pointDetail_content_stepSpan1">调节终止</span>
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:40px">
                  <span class="pointDetail_content_stepSpan1">终止归档</span>
                  <span class="pointDetail_content_stepSpan2">2017/10/23 08:30</span>
                </div>
              </div>
              <div class="pointDetail_content_stepRight">
                <div class="pointDetail_content_stepRight1">
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">申请事项：</span>
                    <span class="pointDetail_content_stepSpan4">由市场建设引发的矛盾</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="showNum===3" class="pointDetail_content_stepContainer" >
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
                </div>
                <div class="pointDetail_content_stepLeft1" style="margin-top:165px">
                  <span class="pointDetail_content_stepSpan1">不予受理归档</span>
                  <span class="pointDetail_content_stepSpan2">2017/10/23 08:30</span>
                </div>
              </div>
              <div class="pointDetail_content_stepRight">
                <div class="pointDetail_content_stepRight1">
                  <div class="pointDetail_content_stepSpanC clearfix">
                    <span class="pointDetail_content_stepSpan3">申请事项：</span>
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
export default {
  data: function () {
    return {
      showWhich: [''],
      showNum: 7

    }
  },
  methods: {
    show: function (which) {
      this.showWhich.push(which)
      console.log(this.showWhich.indexOf(1))
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
    width: 600px;
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
    margin-top:53px;
  }
  .pointDetail_content_stepRight3{
    text-align: left;
    margin-top:64px;
  }
  .pointDetail_content_stepRight4{
    text-align: left;
    margin-top:153px;
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
    max-width: 300px;
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
