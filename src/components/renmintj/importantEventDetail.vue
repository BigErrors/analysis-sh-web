<template>
  <div class="impEventDet_container">
    <div class="head clearfix">
      <div class="title">基层司法大数据子平台</div>
      <div class="left">
        <div class="back" @click="changeRouter('importantEvent')"></div>
      </div>
      <div class="right">
        <span>{{timeCom}}</span>
      </div>
    </div>
    <div class="body">
      <sidenav></sidenav>
      <div class="nav">
        <span>首页 > 重点事件 > 详情</span>
      </div>
      <div class="top">
        <div class="left1">
          <div class="title">
            <div class="border"></div>
            <span>重点事件信息</span>
          </div>
          <div class="eventType">{{eventDetail.zhongDianSJXX.zhongDiansjlx}}</div>
          <div class="line clearfix">
            <label>时间：</label>
            <span>{{eventDetail.zhongDianSJXX.shiJian}}</span>
            <label>地点：</label>
            <span style="width: 25em;">{{eventDetail.zhongDianSJXX.diDian}}</span>
          </div>
          <div class="line clearfix">
            <label class="">状态：</label>
            <span><i class="span2">{{eventDetail.zhongDianSJXX.zhuangTai}}</i></span>
            <label>类型：</label>
            <span>{{eventDetail.zhongDianSJXX.leiXing}}</span>
            <label>来源：</label>
            <span>{{eventDetail.anJianCLGC.shuJuY}}</span>
          </div>
          <div class="line clearfix">
            <label style="float:left">描述：</label>
            <div class="content">{{eventDetail.zhongDianSJXX.miaoShu}}</div>
          </div>
          <img v-if="eventDetail.zhongDianSJXX.jieGuo==='成功'" class="ifsuccess" src="/static/renmintj/pic_success.png"/>
          <img v-if="eventDetail.zhongDianSJXX.jieGuo==='失败'" class="ifsuccess" src="/static/renmintj/pic_fail.png"/>
        </div>
        <div class="right1">
          <div class="title">
            <div class="border"></div>
            <span>案件处理人员</span>
            <img class="iconl" @click="changeNum('decrease')" src="/static/renmintj/btn_left.png" />
            <img class="iconr" @click="changeNum('add')" src="/static/renmintj/btn_right.png" />
          </div>
          <div class="container" :class="{noNum:eventDetail.anJanCLRY&&eventDetail.anJanCLRY.length===0}">
            <div v-for='(item,index) in anJanCLRYShow' :key='index' class="once clearfix">
              <div class="once_head">
                  <img class="pic1" onerror="src='/static/renmintj/mrtx.png'" src=""/>
                  <img class="pic2" src="/static/renmintj/pic_head portrait.png"/>
                  <span class="pic_span">{{item.anJianCLRYLB}}</span>
                </div>
                <div class="once_body">
                  <span class="body_span1">{{item.mingZi}}</span>
                  <span class="body_span2">{{item.dianHua}}</span>
                  <span class="body_span2">{{item.tiaoWeiHMC}}</span>
                </div>
            </div>
            <span v-if="eventDetail.anJanCLRY&&eventDetail.anJanCLRY.length===0" class="noNum_span">暂无处理人员</span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="left2">
          <div class="title">
            <div class="border"></div>
            <span>当事人信息</span>
            <div class="people_num">(共{{eventDetail.dangShiRXX.length}}人)</div>
          </div>
          <div class="ul">
            <div class="li" v-for="(item,index) in eventDetail.dangShiRXX" :key='index' :class="{showAll:showWhich.indexOf(index)!==-1}">
              <div class="people_type red">被申请人</div>
              <div class="ifPoint" v-if="item.zhongDianRYBS==='1'">重点人员</div>
              <div class="line">
                <label class="label">姓名：</label>
                <!-- 姓名超过六个字特殊处理 -->
                <el-tooltip v-if="item.mingZi.length>6" :content='item.mingZi' placement="top">
                  <span class="span1">{{item.mingZi}}</span>
                </el-tooltip>
                <span class="span1" v-if = "item.mingZi.length<=6">{{item.mingZi}}</span>
                <label class="label">性别：</label>
                <span class="span2">{{item.xingBie}}</span>
                <label class="label">户籍：</label>
                <span class="span3">{{item.huJi}}</span>
              </div>
              <div class="line">
                <label class="label">住址：</label>
                <span>{{item.zhuZhi}}</span>
              </div>
              <div class="line">
                <label class="label">电话：</label>
                <span>{{item.dianHua}}</span>
                <span class="ifshow" v-if='showWhich.indexOf(index)===-1' @click="changed(index,'add')">展开</span>
                <span class="show" v-if='showWhich.indexOf(index)!==-1' @click="changed(index,'delete')">收回</span>
              </div>
              <div class="line2">
                <label class="label">代理：</label>
                <span class="span1">{{item.daiLiR}}</span>
                <label class="label label2">与当事人关系：</label>
                <span>{{item.yuDangSRGX}}</span>
              </div>
              <div class="line">
                <label class="label">电话：</label>
                <span class="span1">{{item.daiLiRDH}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="right2">
          <div class="title">
            <div class="border"></div>
            <span>案件处理过程</span>
          </div>
          <!-- 人民调解7个步骤 -->
          <div v-if="eventDetail.anJianCLGC&&eventDetail.anJianCLGC.shuJuY==='人民调解'&&eventDetail.anJianCLGC.buZhouS===7" class="container">
            <div class="imgContainer">
              <div class="lineModel"><img class="imgBack" src="/static/renmintj/line.png"/></div>
              <img class="imgPoint a1" :src="eventDetail.anJianCLGC.buZhou1.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint a2" :src="eventDetail.anJianCLGC.buZhou2.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint a3" :src="eventDetail.anJianCLGC.buZhou3.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint a4" :src="eventDetail.anJianCLGC.buZhou4.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint a5" :src="eventDetail.anJianCLGC.buZhou5.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint a6" :src="eventDetail.anJianCLGC.buZhou6.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint a7" :src="eventDetail.anJianCLGC.buZhou7.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
            </div>
            <div class="leftContainer">
              <div class="cleft a1">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou1.mingCheng}}</span>
                <span class="ctime" v-if="eventDetail.anJianCLGC.buZhou1.zhuangTai===1">{{eventDetail.anJianCLGC.buZhou1.shiJian.slice(0,16)}}</span>
              </div>
              <div class="cleft a2">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou2.mingCheng}}</span>
                <span class="ctime" v-if="eventDetail.anJianCLGC.buZhou2.zhuangTai===1">{{eventDetail.anJianCLGC.buZhou2.shiJian.slice(0,16)}}</span>
              </div>
              <div class="cleft a3">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou3.mingCheng}}</span>
              </div>
              <div class="cleft a4">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou4.mingCheng}}</span>
                <span class="ctime" v-if="eventDetail.anJianCLGC.buZhou4.zhuangTai===1">{{eventDetail.anJianCLGC.buZhou4.shiJian.slice(0,16)}}</span>
              </div>
              <div class="cleft a5">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou5.mingCheng}}</span>
              </div>
              <div class="cleft a6">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou6.mingCheng}}</span>
                <span class="ctime" v-if="eventDetail.anJianCLGC.buZhou5.zhuangTai===1">{{eventDetail.anJianCLGC.buZhou6.shiJian.slice(0,16)}}</span>
              </div>
              <div class="cleft a7">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou7.mingCheng}}</span>
              </div>
            </div>
            <div class="rightContainer">
              <div class="cright a1" v-if="eventDetail.anJianCLGC.buZhou1.zhuangTai===1">
                <div class="cline">
                  <span class="clable">申请事项1：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSX0}}</span>
                </div>
                <div class="cline">
                  <span class="clable">申请事项2：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSX1}}</span>
                </div>
                <div class="cline">
                  <span class="clable">申请事项3：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSX2}}</span>
                </div>
                <div class="cline">
                  <span class="clable">申请事项4：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSX3}}</span>
                </div>
                <div class="cline">
                  <span class="clable">其他事项：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSXQT}}</span>
                </div>
              </div>
              <div class="cright a2" v-if="eventDetail.anJianCLGC.buZhou2.zhuangTai===1">
                <div class="cline">
                  <span class="clable">受理结果：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.shouLiJG}}</span>
                </div>
                <div class="cline">
                  <span class="clable">司法所：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.siFaS}}</span>
                </div>
                <div class="cline">
                  <span class="clable">调解委员会：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.tiaoJieWYH}}</span>
                </div>
              </div>
              <div class="cright a4" v-if="eventDetail.anJianCLGC.buZhou4.zhuangTai===1">
                <div class="cline">
                  <span class="clable">调解结果：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou4.tiaoJieJG}}</span>
                </div>
                <div class="cline">
                  <span class="clable">履行方式：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou4.lvXingFS}}</span>
                </div>
                <div class="cline">
                  <span class="clable">是否机构司法确认：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou4.shiFouJXSFQR}}</span>
                </div>
              </div>
              <div class="cright a6" v-if="eventDetail.anJianCLGC.buZhou6.zhuangTai===1">
                <div class="cline">
                  <span class="clable">回访记录：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou6.huiFangJL}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 人民调解3个步骤 -->
          <div v-if="eventDetail.anJianCLGC&&eventDetail.anJianCLGC.shuJuY==='人民调解'&&eventDetail.anJianCLGC.buZhouS===3" class="container">
            <div class="imgContainer">
              <div class="lineModel"><img class="imgBack" src="/static/renmintj/line.png"/></div>
              <img class="imgPoint b1" :src="eventDetail.anJianCLGC.buZhou1.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint b2" :src="eventDetail.anJianCLGC.buZhou2.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint b3" :src="eventDetail.anJianCLGC.buZhou3.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
            </div>
            <div class="leftContainer">
              <div class="cleft b1">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou1.mingCheng}}</span>
                <span class="ctime" v-if="eventDetail.anJianCLGC.buZhou1.zhuangTai===1">{{eventDetail.anJianCLGC.buZhou1.shiJian.slice(0,16)}}</span>
              </div>
              <div class="cleft b2">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou2.mingCheng}}</span>
                <span class="ctime" v-if="eventDetail.anJianCLGC.buZhou2.zhuangTai===1">{{eventDetail.anJianCLGC.buZhou2.shiJian.slice(0,16)}}</span>
              </div>
              <div class="cleft b3">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou3.mingCheng}}</span>
                <span class="ctime" v-if="eventDetail.anJianCLGC.buZhou3.zhuangTai===1">{{eventDetail.anJianCLGC.buZhou3.shiJian.slice(0,16)}}</span>
              </div>
            </div>
            <div class="rightContainer">
              <div class="cright b1" v-if="eventDetail.anJianCLGC.buZhou1.zhuangTai===1">
                <div class="cline">
                  <span class="clable">申请事项1：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSX0}}</span>
                </div>
                <div class="cline">
                  <span class="clable">申请事项2：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSX1}}</span>
                </div>
                <div class="cline">
                  <span class="clable">申请事项3：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSX2}}</span>
                </div>
                <div class="cline">
                  <span class="clable">申请事项4：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSX3}}</span>
                </div>
                <div class="cline">
                  <span class="clable">其他事项：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSXQT}}</span>
                </div>
              </div>
              <div class="cright b2" v-if="eventDetail.anJianCLGC.buZhou2.zhuangTai===1">
                <div class="cline">
                  <span class="clable">受理结果：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.shouLiJG}}</span>
                </div>
                <div class="cline">
                  <span class="clable">司法所：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.siFaS}}</span>
                </div>
                <div class="cline">
                  <span class="clable">调解委员会：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.tiaoJieWYH}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 人民调解4个步骤 -->
          <div v-if="eventDetail.anJianCLGC&&eventDetail.anJianCLGC.shuJuY==='人民调解'&&eventDetail.anJianCLGC.buZhouS===4" class="container">
            <div class="imgContainer">
              <div class="lineModel"><img class="imgBack" src="/static/renmintj/line.png"/></div>
              <img class="imgPoint c1" :src="eventDetail.anJianCLGC.buZhou1.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint c2" :src="eventDetail.anJianCLGC.buZhou2.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint c3" :src="eventDetail.anJianCLGC.buZhou3.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint c4" :src="eventDetail.anJianCLGC.buZhou4.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
            </div>
            <div class="leftContainer">
              <div class="cleft c1">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou1.mingCheng}}</span>
                <span class="ctime" v-if="eventDetail.anJianCLGC.buZhou1.zhuangTai===1">{{eventDetail.anJianCLGC.buZhou1.shiJian.slice(0,16)}}</span>
              </div>
              <div class="cleft c2">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou2.mingCheng}}</span>
                <span class="ctime" v-if="eventDetail.anJianCLGC.buZhou2.zhuangTai===1">{{eventDetail.anJianCLGC.buZhou2.shiJian.slice(0,16)}}</span>
              </div>
              <div class="cleft c3">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou3.mingCheng}}</span>
                <span class="ctime" v-if="eventDetail.anJianCLGC.buZhou3.zhuangTai===1">{{eventDetail.anJianCLGC.buZhou3.shiJian.slice(0,16)}}</span>
              </div>
              <div class="cleft c4">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou4.mingCheng}}</span>
                <span class="ctime" v-if="eventDetail.anJianCLGC.buZhou4.zhuangTai===1">{{eventDetail.anJianCLGC.buZhou4.shiJian.slice(0,16)}}</span>
              </div>
            </div>
            <div class="rightContainer">
              <div class="cright c1" v-if="eventDetail.anJianCLGC.buZhou1.zhuangTai===1">
                <div class="cline">
                  <span class="clable">申请事项1：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSX0}}</span>
                </div>
                <div class="cline">
                  <span class="clable">申请事项2：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSX1}}</span>
                </div>
                <div class="cline">
                  <span class="clable">申请事项3：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSX2}}</span>
                </div>
                <div class="cline">
                  <span class="clable">申请事项4：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSX3}}</span>
                </div>
                <div class="cline">
                  <span class="clable">其他事项：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.shenQingSX.shenQingSXQT}}</span>
                </div>
              </div>
              <div class="cright c2" v-if="eventDetail.anJianCLGC.buZhou2.zhuangTai===1">
                <div class="cline">
                  <span class="clable">受理结果：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.shouLiJG}}</span>
                </div>
                <div class="cline">
                  <span class="clable">司法所：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.siFaS}}</span>
                </div>
                <div class="cline">
                  <span class="clable">调解委员会：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.tiaoJieWYH}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 110联动3个步骤 重复报警-->
          <div v-if="eventDetail.anJianCLGC&&eventDetail.anJianCLGC.shuJuY==='110联动'&&eventDetail.anJianCLGC.buZhouS===3&&eventDetail.anJianCLGC.zhongDiansjlx ==='重复报警'" class="container">
            <div class="imgContainer">
              <div class="lineModel"><img class="imgBack" src="/static/renmintj/line.png"/></div>
              <img class="imgPoint b1" :src="eventDetail.anJianCLGC.buZhou1.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint b2" :src="eventDetail.anJianCLGC.buZhou2.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint b3" :src="eventDetail.anJianCLGC.buZhou3.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
            </div>
            <div class="leftContainer">
              <div class="cleft b1">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou1.mingCheng}}</span>
                <span class="ctime">{{eventDetail.anJianCLGC.buZhou1.shiJian.slice(0,16)}}</span>
              </div>
              <div class="cleft b2">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou2.mingCheng}}</span>
                <span class="ctime">{{eventDetail.anJianCLGC.buZhou2.shiJian.slice(0,16)}}</span>
              </div>
              <div class="cleft b3">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou3.mingCheng}}</span>
              </div>
            </div>
            <div class="rightContainer">
              <div class="cright b1" v-if="eventDetail.anJianCLGC.buZhou1.zhuangTai===1">
                <div class="cline">
                  <span class="clable">地点：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.diDian}}</span>
                </div>
                <div class="cline">
                  <span class="clable">类型：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.leiXing}}</span>
                </div>
              </div>
              <div class="cright b2" v-if="eventDetail.anJianCLGC.buZhou2.zhuangTai===1">
                <div class="cline">
                  <span class="clable">地点：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.diDian}}</span>
                </div>
                <div class="cline">
                  <span class="clable">报案派出所：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.baoAnPCS}}</span>
                </div>
                <div class="cline">
                  <span class="clable">报案次数：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.baoJingCS}}</span>
                </div>
                <div class="cline">
                  <span class="clable">报案时间：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.shiJian}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 110联动3个步骤 -->
          <div v-if="eventDetail.anJianCLGC&&eventDetail.anJianCLGC.shuJuY==='110联动'&&eventDetail.anJianCLGC.buZhouS===3&&eventDetail.anJianCLGC.zhongDiansjlx!=='重复报警'" class="container">
            <div class="imgContainer">
              <div class="lineModel"><img class="imgBack" src="/static/renmintj/line.png"/></div>
              <img class="imgPoint b1" :src="eventDetail.anJianCLGC.buZhou1.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint b2" :src="eventDetail.anJianCLGC.buZhou2.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint b3" :src="eventDetail.anJianCLGC.buZhou3.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
            </div>
            <div class="leftContainer">
              <div class="cleft b1">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou1.mingCheng}}</span>
                <span class="ctime">{{eventDetail.anJianCLGC.buZhou1.shiJian.slice(0,16)}}</span>
              </div>
              <div class="cleft b2">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou2.mingCheng}}</span>
                <span class="ctime">{{eventDetail.anJianCLGC.buZhou2.shiJian.slice(0,16)}}</span>
              </div>
              <div class="cleft b3">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou3.mingCheng}}</span>
              </div>
            </div>
            <div class="rightContainer">
              <div class="cright b1" v-if="eventDetail.anJianCLGC.buZhou1.zhuangTai===1">
                <div class="cline">
                  <span class="clable">地点：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.diDian}}</span>
                </div>
                <div class="cline">
                  <span class="clable">类型：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.leiXing}}</span>
                </div>
              </div>
              <div class="cright b2" v-if="eventDetail.anJianCLGC.buZhou2.zhuangTai===1">
                <div class="cline">
                  <span class="clable">地点：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.diDian}}</span>
                </div>
                <div class="cline">
                  <span class="clable">报案派出所：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.baoAnPCS}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 110联动4个步骤 重复报警 -->
          <div v-if="eventDetail.anJianCLGC&&eventDetail.anJianCLGC.shuJuY==='110联动'&&eventDetail.anJianCLGC.buZhouS===4&&eventDetail.anJianCLGC.zhongDiansjlx ==='重复报警'" class="container">
            <div class="imgContainer">
              <div class="lineModel"><img class="imgBack" src="/static/renmintj/line.png"/></div>
              <img class="imgPoint c1" :src="eventDetail.anJianCLGC.buZhou1.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint c2" :src="eventDetail.anJianCLGC.buZhou2.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint c3" :src="eventDetail.anJianCLGC.buZhou3.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint c4" :src="eventDetail.anJianCLGC.buZhou4.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
            </div>
            <div class="leftContainer">
              <div class="cleft c1">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou1.mingCheng}}</span>
                <span class="ctime">{{eventDetail.anJianCLGC.buZhou1.shiJian.slice(0,16)}}</span>
              </div>
              <div class="cleft c2">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou2.mingCheng}}</span>
                <span class="ctime">{{eventDetail.anJianCLGC.buZhou2.shiJian.slice(0,16)}}</span>
              </div>
              <div class="cleft c3">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou3.mingCheng}}</span>
              </div>
              <div class="cleft c4">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou4.mingCheng}}</span>
                <span class="ctime">{{eventDetail.anJianCLGC.buZhou4.shiJian.slice(0,16)}}</span>
              </div>
            </div>
            <div class="rightContainer">
              <div class="cright c1" v-if="eventDetail.anJianCLGC.buZhou1.zhuangTai===1">
                <div class="cline">
                  <span class="clable">地点：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.diDian}}</span>
                </div>
                <div class="cline">
                  <span class="clable">类型：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.leiXing}}</span>
                </div>
              </div>
              <div class="cright c2" v-if="eventDetail.anJianCLGC.buZhou2.zhuangTai===1">
                <div class="cline">
                  <span class="clable">地点：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.diDian}}</span>
                </div>
                <div class="cline">
                  <span class="clable">报案派出所：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.baoAnPCS}}</span>
                </div>
                <div class="cline">
                  <span class="clable">报案次数：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.baoJingCS}}</span>
                </div>
                <div class="cline">
                  <span class="clable">报案时间：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.shiJian}}</span>
                </div>
              </div>
              <div class="cright c3" v-if="eventDetail.anJianCLGC.buZhou3.zhuangTai===1">
                <div class="cline">
                  <span class="clable">分派状态：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou3.fenPeiZT}}</span>
                </div>
                <div class="cline">
                  <span class="clable">分配时间：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou3.fenPeiSJ}}</span>
                </div>
                <div class="cline">
                  <span class="clable">分配司法所：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou3.fenPeiSFS}}</span>
                </div>
                <div class="cline">
                  <span class="clable">分派时间：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou3.fenPaiSJ}}</span>
                </div>
                <div class="cline">
                  <span class="clable">分派调委会：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou3.fenPaiTWH}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 110联动4个步骤 -->
          <div v-if="eventDetail.anJianCLGC&&eventDetail.anJianCLGC.shuJuY==='110联动'&&eventDetail.anJianCLGC.buZhouS===4&&eventDetail.anJianCLGC.zhongDiansjlx !=='重复报警'" class="container">
            <div class="imgContainer">
              <div class="lineModel"><img class="imgBack" src="/static/renmintj/line.png"/></div>
              <img class="imgPoint c1" :src="eventDetail.anJianCLGC.buZhou1.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint c2" :src="eventDetail.anJianCLGC.buZhou2.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint c3" :src="eventDetail.anJianCLGC.buZhou3.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint c4" :src="eventDetail.anJianCLGC.buZhou4.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
            </div>
            <div class="leftContainer">
              <div class="cleft c1">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou1.mingCheng}}</span>
                <span class="ctime">{{eventDetail.anJianCLGC.buZhou1.shiJian.slice(0,16)}}</span>
              </div>
              <div class="cleft c2">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou2.mingCheng}}</span>
                <span class="ctime">{{eventDetail.anJianCLGC.buZhou2.shiJian.slice(0,16)}}</span>
              </div>
              <div class="cleft c3">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou3.mingCheng}}</span>
              </div>
              <div class="cleft c4">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou4.mingCheng}}</span>
                <span class="ctime">{{eventDetail.anJianCLGC.buZhou4.shiJian.slice(0,16)}}</span>
              </div>
            </div>
            <div class="rightContainer">
              <div class="cright c1" v-if="eventDetail.anJianCLGC.buZhou1.zhuangTai===1">
                <div class="cline">
                  <span class="clable">地点：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.diDian}}</span>
                </div>
                <div class="cline">
                  <span class="clable">类型：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.leiXing}}</span>
                </div>
              </div>
              <div class="cright c2" v-if="eventDetail.anJianCLGC.buZhou2.zhuangTai===1">
                <div class="cline">
                  <span class="clable">地点：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.diDian}}</span>
                </div>
                <div class="cline">
                  <span class="clable">报案派出所：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.baoAnPCS}}</span>
                </div>
              </div>
              <div class="cright c3" v-if="eventDetail.anJianCLGC.buZhou3.zhuangTai===1">
                <div class="cline">
                  <span class="clable">分派状态：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou3.fenPeiZT}}</span>
                </div>
                <div class="cline">
                  <span class="clable">分配时间：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou3.fenPeiSJ}}</span>
                </div>
                <div class="cline">
                  <span class="clable">分配司法所：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou3.fenPeiSFS}}</span>
                </div>
                <div class="cline">
                  <span class="clable">分派时间：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou3.fenPaiSJ}}</span>
                </div>
                <div class="cline">
                  <span class="clable">分派调委会：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou3.fenPaiTWH}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 公共法律服务2个步骤 -->
          <div v-if="eventDetail.anJianCLGC&&eventDetail.anJianCLGC.shuJuY==='公共法律服务'&&eventDetail.anJianCLGC.buZhouS===2" class="container">
            <div class="imgContainer">
              <div class="lineModel"><img class="imgBack" src="/static/renmintj/line.png"/></div>
              <img class="imgPoint d1" :src="eventDetail.anJianCLGC.buZhou1.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint d2" :src="eventDetail.anJianCLGC.buZhou2.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
            </div>
            <div class="leftContainer">
              <div class="cleft d1">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou1.mingCheng}}</span>
                <span class="ctime">{{eventDetail.anJianCLGC.buZhou1.shiJian.slice(0,16)}}</span>
              </div>
              <div class="cleft d2">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou2.mingCheng}}</span>
              </div>
            </div>
            <div class="rightContainer">
              <div class="cright d1" v-if="eventDetail.anJianCLGC.buZhou1.zhuangTai===1">
                <div class="cline">
                  <span class="clable">来源：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.laiYuan}}</span>
                </div>
                <div class="cline">
                  <span class="clable">类型：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.leiXing}}</span>
                </div>
                <div class="cline">
                  <span class="clable">调委会：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.tiaoWeiH}}</span>
                </div>
              </div>
              <div class="cright d2" v-if="eventDetail.anJianCLGC.buZhou2.zhuangTai===1">
                <div class="cline">
                  <span class="clable">是否转调解：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.shiFouZTJ}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 纠纷排查2个步骤 -->
          <div v-if="eventDetail.anJianCLGC&&eventDetail.anJianCLGC.shuJuY==='纠纷排查'&&eventDetail.anJianCLGC.buZhouS===2" class="container">
            <div class="imgContainer">
              <div class="lineModel"><img class="imgBack" src="/static/renmintj/line.png"/></div>
              <img class="imgPoint d1" :src="eventDetail.anJianCLGC.buZhou1.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
              <img class="imgPoint d2" :src="eventDetail.anJianCLGC.buZhou2.zhuangTai===1?'/static/renmintjNew/redPoint.png':'/static/renmintjNew/grayPoint.png'"/>
            </div>
            <div class="leftContainer">
              <div class="cleft d1">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou1.mingCheng}}</span>
              </div>
              <div class="cleft d2">
                <span class="ctitle">{{eventDetail.anJianCLGC.buZhou2.mingCheng}}</span>
              </div>
            </div>
            <div class="rightContainer">
              <div class="cright d1" v-if="eventDetail.anJianCLGC.buZhou1.zhuangTai===1">
                <div class="cline">
                  <span class="clable">所属任务：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.suoShuRW}}</span>
                </div>
                <div class="cline">
                  <span class="clable">调委会：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou1.tiaoWeiH}}</span>
                </div>
              </div>
              <div class="cright d2" v-if="eventDetail.anJianCLGC.buZhou2.zhuangTai===1">
                <div class="cline">
                  <span class="clable">处理方式：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.chuLiFS}}</span>
                </div>
                <div class="cline">
                  <span class="clable">是否转调解：</span>
                  <span class="cspan">{{eventDetail.anJianCLGC.buZhou2.shiFouZTJ}}</span>
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
import urlConfig from '@/util/urlConfig'
export default {
  data: () => ({
    time: new Date(),
    showWhich: [''],
    eventDetail: {
      'zhongDianSJXX': {
        'zhongDiansjlx': '',
        'shiJian': '',
        'diDian': '',
        'zhuangTai': '',
        'leiXing': '',
        'miaoShu': '',
        'jieGuo': ''
      },
      'anJanCLRY': [],
      'dangShiRXX': [],
      'anJianCLGC': {}
    },
    anJanCLRY: [],
    anJanCLRYShow: [],
    page: 0
  }),
  computed: {
    timeCom () {
      let now = this.time
      let day = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'][now.getDay()]
      let minute = (now.getMinutes() >= 10) ? (now.getMinutes().toString()) : ('0' + now.getMinutes().toString())
      return now.getFullYear().toString() + '/' + (now.getMonth() + 1).toString() + '/' + now.getDate().toString() + ' ' + now.getHours().toString() + ':' + minute + ' ' + day
    }
  },
  created () {
    let _this = this
    let id = _this.$route.params.id || '' // 人民调解步骤7
    // let id = 'b10a2ae4dd194a4aa88bb2fc1ca295b0' // 人民调解步骤3
    // let id = 'b10a2ae4514d45f6b3f33c42eb0f5592' // 人民调解步骤4
    // let id = 'f09f6e41ba7443648d19d2d8d5230d3a'// 110联步骤3 正常
    // let id = 'f09f6e411b3d4b32ac882fe4c26d2dab' // 110联动步骤3 重复报警
    // let id = 'f09f6e41c91f41588381dbf1188efd1c'// 110联动步骤4 正常
    // let id = 'f09f6e4161054b72bf9a84335c369864'// 110联动步骤4 重复报警
    // let id = 'fa16024ec4e943caa886c708bad0ee88' // 公共法律服务步骤2
    // let id = '2590b28f83f34d7ab1ae6b2c12a7ea67'// 纠纷排查步骤2
    let baseUrl = urlConfig.baseUrl
    let url = '/keyEventsDetails'
    http.get(baseUrl + url, {id: id}, (res) => {
      _this.eventDetail = res
      _this.anJanCLRY = res.anJanCLRY
      for (let i = 0; i < 2; i++) {
        if (_this.anJanCLRY[i] !== undefined) { _this.anJanCLRYShow.push(_this.anJanCLRY[i]) }
      }
    })
  },
  methods: {
    changeNum (method) {
      let _this = this
      if (method === 'add') {
        if (_this.anJanCLRY[(_this.page + 1) * 2] !== undefined) {
          _this.page++
        }
      } else {
        if (_this.anJanCLRY[(_this.page - 1) * 2] !== undefined) {
          _this.page--
        }
      }
      _this.anJanCLRYShow = []
      for (let i = 0; i < 2; i++) {
        if (_this.anJanCLRY[i + _this.page * 2] !== undefined) {
          _this.anJanCLRYShow[i] = _this.anJanCLRY[i + _this.page * 2]
        }
      }
    },
    changed (index, val) {
      if (val === 'add') {
        this.showWhich.push(index)
      } else {
        let i = this.showWhich.indexOf(index)
        this.showWhich.splice(i, 1)
      }
    },
    // 路由跳转
    changeRouter (name) {
      this.$router.push({name: name})
    }
  }
}
</script>

<style lang="less" scoped>
@blockBack:#171c26;
@table:#131821;
@table2:rgba(40,45,58,0.3);
@fontWhite:#f1f1f1;
@fontGray:rgba(241,241,241,0.4);
.impEventDet_container{
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
        font-size: 12px;
        font-family: HiraginoSansGB-W3;
        color:@fontGray;
      }
    }
    .title{
      display: block;
      box-sizing: border-box;
      padding-top:5px;
      position: relative;
      .border{
        width: 2px;
        height: 12px;
        background: @fontWhite;
        display: inline-block;
        margin-left:10px;
        margin-right: 5px;
      }
      span{
        font-size:16px;
        font-family:HiraginoSansGB-W3;
        color:@fontWhite;
      }
    }
    .top{
      width: 100%;
      padding: 0 34px;
      box-sizing: border-box;
      display: flex;
      height: 207px;
    }
    .bottom{
      width: 100%;
      padding: 0 34px;
      box-sizing: border-box;
      display: flex;
      height: calc(100% - 241px);
    }
    .left1{
      flex: 0.56;
      background:@blockBack;
      margin:5px;
      position: relative;
      .eventType{
        font-size:14px;
        font-family:'HiraginoSansGB-W3';
        color:@fontWhite;
        display: block;
        padding-left: 50px;
        background: url('/static/renmintj/icon_documents.png');
        background-repeat: no-repeat;
        background-position: left 12px center;
        height:26px;
        margin-top:10px;
        line-height: 30px;
      }
      .line{
        display: block;
        margin: 7px 13px;
        height: 24px;
        line-height: 24px;
        label{
          display:inline-block;
          width: 3em;
          font-size:12px;
          color:@fontGray;
        }
        span{
          display: inline-block;
          width: 15em;
          font-size:12px;
          color:@fontWhite;
        }
        .span2{
          font-size:12px;
          color:rgba(7,211,59,1);
          height:24px;
          background:rgba(6,235,65,0.3);
          border-radius:4px;
          line-height: 22px;
          padding:0 8px;
          box-sizing: border-box;
          border:1px solid #06EB41;
          display: inline-block;
          font-style: normal;
        }
        .content{
          width: calc(100% - 62px);
          float: left;
          font-size:12px;
          color:@fontWhite;
        }
      }
      .ifsuccess{
        position: absolute;
        right: 55px;
        top:20px;
      }
    }
    .left2{
      flex: 0.34;
      margin:5px;
      .people_num{
        font-size:14px;
        color:@fontGray;
        float:right;
        margin-right: 14px;
      }
      .ul{
        height: calc(100% - 41px);
        width: 100%;
        box-sizing: border-box;
        margin-top: 15px;
        overflow: hidden;
        &:hover{
          overflow-y:auto;
        }
        .li{
          width: 100%;
          height: 136px;
          background: @blockBack;
          transition: 0.3s linear;
          position: relative;
          padding-top:32px;
          box-sizing: border-box;
          overflow: hidden;
          margin-bottom: 6px;
          .people_type{
            position: absolute;
            left: 0;
            top:0;
            padding:4px;
            padding-right: 12px;
            font-size:16px;
            font-family:HiraginoSansGB-W3;
            color:@fontWhite;
            display: inline-block;
            height: 24px;
            line-height: 24px;
            border-top-right-radius: 12px;
            border-bottom-right-radius: 12px;
          }
          .ifPoint{
            position: absolute;
            right: 14px;
            top:7px;
            font-size:12px;
            border:1px solid rgba(255,193,6,0.2);
            color:#ffc106;
            background: rgba(253,193,11,0.2);
            padding:2px 4px;
            border-radius: 4px;
          }
          .red{
            background:rgba(252,63,79,1);
          }
          .blue{
            background:rgba(45,91,245,1);
          }
          .line{
            display: block;
            height: 19px;
            margin:4px 20px 15px 20px;
            line-height: 19px;
            .span1{
              width: 6em;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              height: 19px;
            }
            .span2{
              width: 3em
            }
            .span3{
              width: 5em
            }
            .ifshow{
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
              cursor: pointer;
              margin-right: 0;
            }
            .show{
              padding:4px 17px 4px 6px;
              font-size:12px;
              font-family:HiraginoSansGB-W3;
              color:rgba(255,255,255,1);
              border-radius: 2px;
              background:rgba(45,91,245,1);
              background-image: url('/static/renmintj/icon_retract.png');
              background-position: right 4px center;
              background-repeat: no-repeat;
              float: right;
              cursor: pointer;
              margin-right: 0;
            }
          }
          .line2{
            height: 19px;
            border-top:1px solid #2a2f3d;
            margin:4px 20px 15px 20px;
            padding-top: 9px;
            .label2{
              width: 7em
            }
            .span1{
              width: 11em
            }
          }
          .label{
            font-size:14px;
            font-family:HiraginoSansGB-W3;
            color:@fontGray;
            width: 3em;
            text-align: right;
            float: left;
          }
          span{
            font-size:12px;
            font-family:HiraginoSansGB-W3;
            color:@fontWhite;
            float: left;
            margin-right: 2em;
            height: 19px;
            line-height: 19px;
          }
        }
        .showAll{
          height: 212px;
        }
      }
    }
    .right1{
      flex: 0.44;
      background:@blockBack;
      margin:5px;
      position: relative;
      .iconl{
        position: absolute;
        right:50px;
        top: 50%;
        transform: translateY(-30%);
        cursor: pointer;
      }
      .iconr{
        position: absolute;
        right:15px ;
        top: 50%;
        transform: translateY(-30%);
        cursor: pointer;
      }
      .container{
        display: block;
        height: 161px;
        .once{
          float: left;
          .once_head{
            width: 111px;
            height: 106px;
            position: relative;
            margin:25px 16px 0px 40px;
            float: left;
            .pic1{
              position: absolute;
              left: 50%;
              top:0;
              transform: translate(-50%,0);
              z-index: 1;
            }
            .pic2{
              position: absolute;
              bottom:0;
              left: 0;
              z-index: 3;
            }
            .pic_span{
              position: absolute;
              width: 111px;
              height: 23px;
              bottom:0;
              left: 0;
              font-size:14px;
              font-family:HiraginoSansGB-W3;
              color:@fontWhite;
              line-height: 16px;
              text-align: center;
              z-index: 4;
            }
          }
          .once_body{
            float: left;
            margin-top:43px;
            .body_span1{
              font-size:16px;
              font-family:HiraginoSansGB-W3;
              color:@fontWhite;
              height: 21px;
              display: block;
              margin-bottom:6px;
            }
            .body_span2{
              font-size:14px;
              font-family:HiraginoSansGB-W3;
              color:@fontGray;
              display: block;
              margin-bottom:6px;
              width:12em;
              overflow: hidden;
            }
          }
        }
        .noNum_span{
          position: absolute;
          left: 50%;
          bottom:6px;
          transform: translate(-50%,0);
          font-size: 14px;
          font-family: HiraginoSansGB-W3;
          color: rgba(77,132,254,1);
        }
      }
      .noNum{
        background: url('/static/renmintj/noNum.png') no-repeat center center;
      }
    }
    .right2{
      flex: 0.66;
      background:@blockBack;
      margin:5px;
      .container{
        display: block;
        height: calc(100% - 26px);
        position: relative;
        .imgContainer{
          position: absolute;
          left: 40%;
          width:3px;
          height: calc(100%);
          box-sizing: border-box;
          .lineModel{
            height: calc(100% - 20px);
            width: 3px;
            background: @fontGray;
            position: relative;
          }
          .imgBack{
            position: absolute;
            bottom:-10px;
            left: 0;
            transform: translateX(-5px)
          }
          .imgPoint{
            width: 18px;
            height: 18px;
            position: absolute;
            left:-8px;
            transform: translateY(-50%)
          }
        }
        .leftContainer{
          position: absolute;
          right: 61%;
          height: 100%;
          font-size: 12px;
          width: 10em;
          text-align: center;
          .ctitle{
            font-size:12px;
            font-family:HiraginoSansGB-W3;
            color:@fontWhite;
            display: block;
            text-align: center;
            margin-bottom:4px;
          }
          .ctime{
            font-size:10px;
            font-family:HiraginoSansGB-W3;
            color:@fontGray;
            display: block;
            text-align: center;
            transform: scale(0.9);
          }
          .cleft{
            position: absolute;
            transform: translateY(-50%);
            width:120px;
          }
        }
        .rightContainer{
          position: absolute;
          left: 42%;
          height: 100%;
          font-size: 12px;
          width: 58%;
          .cright{
            position: absolute;
            transform: translateY(-50%)
          }
          .cline{
            display: block;
            margin-bottom: 4px;
            &:nth-last-child(1){
              margin-bottom: 0;
            }
          }
          .clable{
            font-size:12px;
            font-family:HiraginoSansGB-W3;
            color:@fontGray;
            width: 9em;
            display: inline-block;
            text-align: right;
            margin-left: 10px;
          }
          .cspan{
            font-size:12px;
            font-family:HiraginoSansGB-W3;
            color:@fontWhite;
            display: inline-block;
          }
        }
        .a1{
          top:11%;
        }
        .a2{
          top:32%;
        }
        .a3{
          top:44%
        }
        .a4{
          top:56%
        }
        .a5{
          top:68%
        }
        .a6{
          top:79%
        }
        .a7{
          top:89%
        }
        .b1{
          top:16%;
        }
        .b2{
          top:51%;
        }
        .b3{
          top:80%
        }
        .c1{
          top:13%;
        }
        .c2{
          top:33%;
        }
        .c3{
          top:60%;
        }
        .c4{
          top:85%;
        }
        .d1{
          top:20%;
        }
        .d2{
          top:65%;
        }
      }
    }
  }
}
</style>
