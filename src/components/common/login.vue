<template>
  <div class="loginWrap">
    <div class="login">
      <div class="logo">
        <h1 class="ch">欢迎来到 智媒</h1>
        <h1 class="en tips">WELCOME LIGHTING MEDIA</h1>
        <h3 class="subTips">让餐饮场景营销更便捷、更精准</h3>
        <img src="../../assets/logo1.png" alt="">
      </div>
      <div class="loginContainer">
        <p class="tips">登录/Login</p>
        <div >
          <div style="margin: 0 0 20px 0;">
            <input class="ant-input user-input" type="text" placeholder="user name">
          </div>
          <div>
            <input class="ant-input user-input" type="text" placeholder="passwords">
          </div>
          <button @click="doLogin">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "@/axios/common";
  export default {
    components: {
    },
    data() {
      return {
      };
    },
    mounted() {

    },
    methods: {
      doLogin() {
        this.$router.push("/loop");
      }
    }
  };
</script>
<style lang="stylus">
  .user-input{
    width 100%;
    height: 32px;
  }
  .login {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    margin-top: -150px;
    text-align: center;
    display: flex;
    //flex-direction: row;
    justify-content: center;
    p {
      font-size: 16px;
      color: #fff;
    }
    .logo {
      border-right: 2px solid #333540;
      height: 300px;
      padding: 0 70px;
      width: 486px;
      img {
        width: 100%;
        padding-right: 80px;
        text-align: left;
        //height: 100%;
      }
      .ch,
      .en {
        font-size: 25px;
        color: #ffffff;
        text-align: left;
      }
      .en {
        font-family: PingFangSC-Medium;
      }
      .subTips {
        color: #ffffff;
        text-align: left;
        margin-bottom: 30px;
      }
    }
    nz-input {
      width: 100%;
      &:first-child {
        margin-top: 10px;
      }
      &:last-child {
        margin-top: 20px;
      }
    }
    .ant-input {
      background: none;
      border: none;
      border-bottom: 1px solid rgba(173, 180, 194, 0.2);
      border-radius: 0;
      color: #fff;
      outline: none;
      font-size: 14px;
      &:focus {
        border-color: #adb4c2;
        box-shadow: none;
      }
      &:hover {
        border-color: #adb4c2;
      }
    }
    .has-error .ant-input:focus {
      box-shadow: none;
    }
    i {
      color: #adb4c2 !important;
    }
    ::-moz-placeholder {
      color: rgba(173, 180, 194, 0.4) !important;
    }
    ::-webkit-input-placeholder {
      color: rgba(173, 180, 194, 0.4) !important;
    }
    :-ms-input-placeholder {
      color: #adb4c2 !important;
    }
    .loginContainer {
      font-size: 20px;
      width: 300px;
      margin-left: 70px;
      margin-right: 93px;
      p {
        font-size: 22px;
        margin: 10px 0 20px 3px;
        text-align: left;
      }
    }
    button {
      background: #63d56d;
      border-radius: 100px;
      color: #fff;
      border: none;
      width: 100%;
      margin-top: 30px;
      height: 40px;
      &:disabled {
        border-color: none;
        background: rgba(99, 213, 109, 0.5);
        color: #fff;
        &:hover {
          color: #fff;
          background: rgba(99, 213, 109, 0.5);
        }
      }
    }
  }
  .loginWrap {
    height: 100%;
    background: #2e2f3a;
    font-family: "PingFangSC-Ultralight", "lucida grande", "lucida sans unicode",
      lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei",
      "WenQuanYi Micro Hei", sans-serif;
  }


</style>
