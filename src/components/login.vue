<template>
  <div id='login'>
    <div class="norepeat">
      <div class="title">
        <i class="icon icon-logo-login"></i>
        <h2>上海市司法局</h2>
      </div>
      <div class="title1">
      </div>
      <div class="m-login">
        <div class="wrap-login">
          <div class="top">用户登录</div>
          <div class="login-frame">
            <div class="bar-input">
              <i class="icon icon-user"></i>
              <input type="text" id="name" class="form-control" :class='{blue: !userNameStatus}' v-model='userName' placeholder="请输入用户名" data-necessary="true" reservation="用户名" @focus='changeStatus("userName")'/>
              <a class="btn btn-gray-delete" :class='{hide: userNameStatus}' @click='clearContent("userName")'>&times;</a>
              <div class="errorBar"></div>
            </div>
            <div class="bar-input">
              <i class="icon icon-lock"></i>
              <input type="password" id="password" class="form-control" :class='{blue: !userPwdStatus}' v-model='userPwd' placeholder="请输入密码" data-necessary="true" reservation="密码" @focus='changeStatus("userPwd")'/>
              <a class="btn btn-gray-delete" :class='{hide: userPwdStatus}' @click='clearContent("userPwd")'>&times;</a>
              <div class="errorBar"></div>
            </div>
            <div class="bar-option" style="position:relative">
              <!-- <input type="checkbox" name="rememberPwd" id="rememberPwd" class="form-control"/>
              <span class="reminder">记住密码</span>
              <a class="btn">忘记密码？</a>
              <div class="error_Bar" style="bottom:-20px"></div> -->
            </div>
          </div>
          <div class="footer">
            <a class="btn" id="logining" @click='login'>登录</a>
          </div>
        </div>
      </div>
    </div>
    <div class="copy-rights">
      ENJOYOR Copyright © 2017
    </div>
  </div>
</template>

<script>
import http from '@/util/httpUtil'
import urlConfig from '@/util/urlConfig'

export default {
  name: 'login',
  data () {
    return {
      userName: '',
      userPwd: '',
      userNameStatus: true,
      userPwdStatus: true
    }
  },
  watch: {},
  computed: {},
  filters: {},
  methods: {
    login () {
      let vue = this
      let baseUrl = urlConfig.baseUrl
      let url = '/login'
      let param = { username: vue.userName, password: vue.userPwd }
      http.get(baseUrl + url, param, (data) => {
        console.log(`${data.username}登陆成功`)
        vue.changeRouter()
      })
    },
    getStatus () {
      let vue = this
      let baseUrl = urlConfig.baseUrl
      let url = '/loginStatus'
      let param = {}
      http.get(baseUrl + url, param, (data) => {
        console.log(`已登陆`)
        vue.changeRouter()
      })
    },
    changeRouter () {
      this.$router.push({name: 'moduleChoose'})
    },
    changeStatus (type) {
      if (type === 'userName') {
        this.userNameStatus = false
        this.userPwdStatus = true
      } else {
        this.userNameStatus = true
        this.userPwdStatus = false
      }
    },
    clearContent (type) {
      if (type === 'userName') {
        this.userName = ''
        this.userNameStatus = !this.userNameStatus
      } else {
        this.userPwd = ''
        this.userPwdStatus = !this.userPwdStatus
      }
    }
  },
  created () {
    this.getStatus()
  },
  mounted () {}
}
</script>

<style scoped>
#login{
  position: absolute;
  width: 100%;
  height: 100%;
  min-width:1366px;
  min-height: 766px;
}
.icon-logo-login {
  width: 39px;
  height: 40px;
  background: url('/static/loginImages/icon_logo.png') left top / 100% 100%;
}
.icon-lock {
  width: 14px;
  height: 15px;
  background: url('/static/loginImages/icon_user.png') left bottom;
}
.icon-user {
  width: 14px;
  height: 15px;
  background: url('/static/loginImages/icon_user.png') left top;
}
.btn-gray-delete {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  line-height: 14px;
  font-size: 14px !important;
  color: #fff;
  opacity: .8;
  background-color: #4d84fe;
}
.btn-gray-delete:hover {
  opacity: 1;
}
body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
dl,
dt,
dd,
ul,
ol,
li,
pre,
form,
fieldset,
lengend,
button,
input,
select,
textarea,
th,
td {
  margin: 0;
  padding: 0;
}
body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
div,
li,
ul,
ol,
span,
i,
textarea,
input,
a,
button,
em,
table,
form {
  box-sizing: border-box;
}
body,
button,
input,
select,
textarea {
  font: 12px/1 'Microsoft YaHei';
}
*:focus,
a:focus {
  outline: none;
}
a,
a:focus,
a:hover,
a:active {
  text-decoration: none;
  box-shadow: none;
  cursor: pointer;
}

.btn,
.icon {
  display: inline-block;
  text-align: center;
  user-select: none;
  font-size: 12px;
}
.icon {
  vertical-align: middle;
  background-repeat: no-repeat;
}
.hide {
  display: none;
}

#login {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url('/static/loginImages/bg.png') center center / 100% 100% no-repeat;
}
#login > img {
  display: block;
  margin-right: 230px;
}
#login .title {
  position: absolute;
  top: -127px;
  left: 0;
  width: 100%;
  height: 34px;
  line-height: 34px;
  text-align: center;
}
#login .title i {
  margin: 0 6px 5px 0;
}
#login .title h2 {
  display: inline-block;
  vertical-align: middle;
  font-size: 24px;
  color: #AFD0FF;
}
#login .title1 {
  position: absolute;
  top: -71px;
  left: 0;
  width: 100%;
  height: 40px;
  padding-top: 27px;
  line-height: 40px;
  text-align: center;
  background: url('/static/renmintjNew/font.png') no-repeat center;
  background-size: 290px 28px;
}
#login .m-gallery {
  position: relative;
  width: 502px;
  height: 418px;
  margin-right: 50px;
}
#login .m-gallery .libs {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  transform: translate(-50px, 185px);
}
#login .m-gallery .libs li {
  height: 10px;
  margin-bottom: 12px;
  text-align: center;
}
#login .m-gallery .libs li a {
  width: 8px;
  height: 8px;
  border: 1px solid #4d84fe;
  border-radius: 50%;
  transition: background-color 1.5s;
  background-color: transparent;
}
#login .m-gallery .libs li a.active {
  background-color: #4d84fe;
}
#login .m-gallery .showcase img {
  position: absolute;
  width: 100%;
  display: block;
  transition: opacity 1.5s;
  opacity: 0;
}
#login .m-gallery .showcase img.emerge {
  opacity: 1;
}
#login .m-gallery > h1 {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  line-height: 50px;
  vertical-align: bottom;
  text-align: center;
  font-size: 24px;
  transition: all 1.5s;
  color: #4565b9;
}
.norepeat{
  width: 347px;
  height: 322px;
  position: relative;
}
#login .m-login {
  height: 322px;
}
#login .m-login .wrap-login {
  display: flex;
  display: -webkit-flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 347px;
  height: 322px;
  padding: 20px 0 0;
  border-radius: 10px;
  background-color: rgba(77, 132, 254, 0.07);
}
#login .m-login .wrap-login:before {
  content: '';
  position: absolute;
  top: -25px;
  right: 0;
  left: 0;
  width: 91px;
  height: 51px;
  margin: 0 auto;
  z-index: 1;
  background: url('/static/loginImages/point.png') left top no-repeat;
}
#login .m-login .wrap-login .top {
  width: 252px;
  text-align: center;
  font-size: 16px;
  color: #4d84fe;
}
#login .m-login .wrap-login .login-frame {
  width: 252px;
}
#login .m-login .wrap-login .login-frame .bar-input {
  position: relative;
}
#login .m-login .wrap-login .login-frame .bar-input .form-control {
  width: 100%;
  height: 42px;
  padding: 0 24px 0 29px;
  border-radius: 4px;
  border: 1px solid rgba(81, 112, 150, 0.5);
  line-height: 40px;
  box-shadow: none;
  color: rgba(213, 213, 213, 0.3);
  background-color: transparent;
}
#login .m-login .wrap-login .login-frame .bar-input .form-control::-webkit-input-placeholder {
  color: rgba(213, 213, 213, 0.3);
}
#login .m-login .wrap-login .login-frame .bar-input .form-control:-moz-placeholder {
  color: rgba(213, 213, 213, 0.3);
}
#login .m-login .wrap-login .login-frame .bar-input .form-control::-moz-placeholder {
  color: rgba(213, 213, 213, 0.3);
}
#login .m-login .wrap-login .login-frame .bar-input .form-control:-ms-input-placeholder {
  color: rgba(213, 213, 213, 0.3);
}
#login .m-login .wrap-login .login-frame .bar-input.active .form-control {
  border-color: #4d84fe;
  color: #4d84fe;
}
#login .m-login .wrap-login .login-frame .bar-input.active .icon-user {
  background-position: -13px top;
}
#login .m-login .wrap-login .login-frame .bar-input.active .icon-lock {
  background-position: -13px bottom;
}
#login .m-login .wrap-login .login-frame .bar-input:first-child {
  margin: 22px 0 29px;
}
#login .m-login .wrap-login .login-frame .bar-input .icon {
  position: absolute;
  top: 15px;
  left: 8px;
}
#login .m-login .wrap-login .login-frame .bar-input .btn {
  position: absolute;
  top: 14px;
  right: 5px;
}
#login .m-login .wrap-login .login-frame .bar-option {
  margin: 20px 0 10px;
  color: rgba(213, 213, 213, 0.3);
}
#login .m-login .wrap-login .login-frame .bar-option .btn {
  float: right;
}
#login .m-login .wrap-login .login-frame .bar-option > * {
  vertical-align: top;
}
#login .m-login .wrap-login .login-frame .bar-option input {
  margin-right: 2px;
}
#login .m-login .wrap-login .login-frame .bar-option .reminder {
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#login .m-login .wrap-login .login-frame .bar-notify {
  color: #fd2740;
}
#login .m-login .wrap-login .footer {
  width: 252px;
  margin-top: 20px;
}
#login .m-login .wrap-login .footer .btn {
  width: 100%;
  height: 42px;
  border-radius: 5px;
  line-height: 42px;
  font-size: 16px;
  color: #fff;
  background-color: #4d84fe;
}
#login .copy-rights {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  text-align: center;
  color: #1c2050;
}
.errorBar {
  position: absolute;
  bottom: -20px;
  left: 0;
  display: inline-block;
  height: 20px;
  line-height: 20px;
  color: #fd2740;
}
.error_Bar {
  position: absolute;
  bottom: -20px;
  left: 0;
  display: inline-block;
  height: 20px;
  line-height: 20px;
  color: #fd2740;
}
.content-null {
  border-color: #fd2740 !important;
}

.blue{
  color: #4d84fe !important;
  border: 1px solid rgba(77,132,254, 0.5) !important;
}
</style>
