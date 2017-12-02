<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">欢迎使用情感日历运营平台</h3>
      <el-form-item prop="email">
        <span class="svg-container"><icon-svg icon-class="jiedianyoujian"></icon-svg></span>
        <el-input name="email" type="text" v-model="loginForm.email" autoComplete="on" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container"><icon-svg icon-class="mima"></icon-svg></span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <div class='tips'>admin账号为:admin@inveno.com 密码123456</div>
      <div class='tips'>editor账号:editor@inveno.com 密码随便填</div>
    </el-form>

    <el-dialog title="第三方验证" :visible.sync="showDialog">
      邮箱登录成功,请选择第三方验证
      <social-sign></social-sign>
    </el-dialog>

  </div>
</template>

<script type="text/ECMAScript-6">
  import { isWscnEmail } from 'utils/validate';
  import socialSign from './socialsignin';
  import { loginByEmailMessage } from 'api/login';

  export default {
    components: { socialSign },
    name: 'login',
    data() {
      const validateEmail = (rule, value, callback) => {
        if (!isWscnEmail(value)) {
          callback(new Error('请输入正确的合法邮箱'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          email: 'admin@inveno.com',
          password: ''
        },
        loginRules: {
          email: [
                { required: true, trigger: 'blur', validator: validateEmail }
          ],
          password: [
                { required: true, trigger: 'blur', validator: validatePass }
          ]
        },
        loading: false,
        showDialog: false,
        tokenFlag: false
      }
    },
    /*mounted () {
      if (localStorage.getItem('token')) {
        this.$router.push({ path: '/' });
        this.tokenFlag = true;
      } else {
        this.tokenFlag = false;
      }
    },*/
    /*watch : {
      'tokenFlag' (newval,oldval) {
        if (newval) {
          alert()
          this.$router.push({ path: '/' });
        }
      }
    },*/
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            //this.loading = true;
            this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {
              this.loading = false;
              this.$router.push({ path: '/' });
              /*if (response.data.code == 200) {
                this.loading = false;
                this.$router.push({ path: '/' });
              } else {
                alert()
                this.$message({
                  message: '用户名密码错误',
                  type: 'error'
                });
              }*/
                // this.showDialog = true;
            }).catch(err => {
              this.$message.error(err);
              this.loading = false;
            });
            let loginInfo = {
              email : this.loginForm.email,
              password : this.loginForm.password
            }
            loginByEmailMessage (loginInfo).then(response => {
              if(response.data.code == 200){
                //this.token = response.data.token;
                localStorage.setItem('token',response.data.token);
                //sessionStorage.setItem('token',response.data.token);
                //this.$refs[formName].resetFields();
                //alert(localStorage.getItem('token'))
              } else {
                this.$message({
                  message: '账号或密码错误',
                  type: 'error'
                });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      afterQRScan() {
          // const hash = window.location.hash.slice(1);
          // const hashObj = getQueryObject(hash);
          // const originUrl = window.location.origin;
          // history.replaceState({}, '', originUrl);
          // const codeMap = {
          //   wechat: 'code',
          //   tencent: 'code'
          // };
          // const codeName = hashObj[codeMap[this.auth_type]];
          // if (!codeName) {
          //   alert('第三方登录失败');
          // } else {
          //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
          //     this.$router.push({ path: '/' });
          //   });
          // }
      }
    },
    destroyed() {
        // window.removeEventListener('hashchange', this.afterQRScan);
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
  }

  .login-container {
    @include relative;
    height: 100vh;
    background-color: #2d3a4b;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #eeeeee;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #889aa4;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: #eeeeee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .forget-pwd {
      color: #fff;
    }
  }
</style>
