<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">

        <el-form-item class="input-prepend restyle" prop="qqmail" :rules="[{ required: true, message: '请输入邮箱账号', trigger: 'blur' },{validator: checkQQmail, trigger: 'blur'}]">
          <div >
            <el-input type="text" placeholder="邮箱账号" v-model="user.qqmail"/>
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="submitLogin()">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="#" @click.prevent="wxIframe()"><i class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import '~/assets/css/sign.css'
  import '~/assets/css/iconfont.css'

  import cookie from 'js-cookie'
  import loginApi from '@/api/login'


  export default {
    layout: 'sign',

    data () {
      return {
        //封装登录的手机号和密码
        user:{
          qqmail:'',
          password:''
        },
        loginInfo:{}
      }
    },

    methods: {

      //微信登录
      wxIframe(){
        this.$alert('<p style="padding-left:40px"></iframe></iframe><iframe src="http://localhost:8150/api/ucenter/wx/login" frameborder="0" scrolling="auto" height="400px"></iframe></p>', {
          dangerouslyUseHTMLString: true
        });
      },

      //登录
      submitLogin(){
        //第一步 调用接口实现登录，返回token字符串
        loginApi.submitLoginUser(this.user).then(response=>{

            //第二步 获取token字符串，放到cookie里面
            //         cookie名称     参数值                    作用范围
            cookie.set('YiShiJiangTang_token',response.data.data.token,{domain:'localhost'})
            //console.log(response.data.data.token)
            //第三步 在utils/request.js中
            //第四步 调用接口，根据token获取用户信息，为了首页显示
            loginApi.getLoginUserInfo().then(response=>{
              //获取返回的用户信息，放到cookie中
              this.loginInfo = response.data.data.userInfo
              // console.log(loginInfo.id);
              cookie.set('YiShi_user',this.loginInfo,{domain:'localhost'})
              //跳转页面
              window.location.href="/"
            })

        })
      },

      checkQQmail (rule, value, callback) {
        //debugger
        if (!(/^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/.test(value))) {
          return callback(new Error('邮箱号码格式不正确！'))
        }
        return callback()
      }
    }
  }
</script>
<style>
   .el-form-item__error{
    z-index: 9999999;
  }
</style>
