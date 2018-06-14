<template>
  <div id="app">
      <div class="menuList" v-if="getRoute.en !== 'index' && this.$route.name !== 'Login'">
        <div class="indexImgBox">
          <img class="indexImg" src="./assets/logo.png">
        </div>
        <Menu :active-name="getPath"
              class="menu"
              theme="dark"
              ref="menu"
              :open-names="openSub">
          <template v-for="menus of getMenu">
            <template>
              <MenuItem
                v-bind:key="menus.path"
                :name="menus.path">
                <router-link :to="menus.path"
                             v-bind:key="menus.path">
                  <i class="icon iconfont" :class="menus.iconfont"></i>
                  {{menus.name}}
                </router-link>
              </MenuItem>
            </template> <!--menu list-->
          </template>
        </Menu>
      </div>
      <div class="content" v-bind:style="{ paddingLeft: getRoute.en === 'index' ? '0px' : '240px' }" v-if="this.$route.name !== 'Login'">
        <iview-login-info class="headerLogin"></iview-login-info>
        <iview-list-header></iview-list-header>
        <router-view class="saleList"/>
      </div>
      <loading v-if="this.$route.name !== 'Login'"></loading>
    <div v-if="this.$route.name === 'Login'" class="login-container">
      <login></login>
    </div>
  </div>

</template>

<script>
import loading from "@/components/common/loading";
import iviewHeader from "@/components/common/header";
import iviewLoginInfo from "@/components/common/loginInfo";
import iviewListHeader from "@/components/common/listHeader";
import login from "@/components/common/login";

import './iconfont/iconfont.css';
export default {
  data() {
    return {
      currentPath: "",
      menuData: this.$store.state.menuData.data,
      openSub: [],
      path: '',
    };
  },
  components: {
    loading,
    iviewHeader,
    iviewLoginInfo,
    iviewListHeader,
    login
  },
  created () {
  },
  mounted() {
    this.currentPath = `/${this.$route.path.split("/")[1]}`;
    this.getOpenSub();
    this.$nextTick(() => {
      if (this.$refs.menu) this.$refs.menu.updateOpened();
    });
  },
  methods: {
    getOpenSub() {
      if (this.menuData && this.menuData.length) {
        this.menuData.forEach(menu => {
          if (
            menu.children &&
            menu.children.find(one => this.currentPath.includes(one.path))
          )
            this.openSub.push(menu.path);
        });
      }
    }
  },
  computed: {
    getRoute() {
      // console.log(this.$store.state.headerInfo)
      return this.$store.state.headerInfo;
    },
    getMenu() {
      this.menuData = this.$store.state.menuData.data;
      let menu = [
        {
          description: "loop",
          icon: "icon-jiankong",
          iconfont: "icon-jiankong",
          id: 191,
          name: "设备管理",
          path: "/loop"
        },
        {
          description: "business",
          icon: "icon-dashboardcustom",
          iconfont: "icon-dashboardcustom",
          id: 191,
          name: "商户管理",
          path: "/business"
        },
        {
          description: "source",
          icon: "icon-yichangtongji",
          iconfont: "icon-yichangtongji",
          id: 191,
          name: "资源文件",
          path: "/source"
        }
      ]
      return menu;
    },
    getPath() {
      return `/${this.$route.path.split("/")[1]}`;
    }
  },
  name: "app"
};
</script>

<style lang="stylus">
  body
    overflow hidden
    .ivu-input-number, .ivu-date-picker
      width 100%
    .ivu-modal
      .ivu-form-item-error-tip
        position relative
      .range
        .ivu-input-number
          width calc(50% - 10px)

  .operatePage {
    padding: 40px;
    .tableStyle{
            border: 0
        .ivu-table:before,.ivu-table:after{
            height 0
        }
        th{
            border 0
            background #FAFAFA;
        }
        td{
            border 0
        }
    }
    .photo{
      width: 50%;
      img{
        width: 100%;
      }
    }
    .ivu-spin-main{
      display: block;
      .ivu-spin-text{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    .content{
      width: 100%;
      background: #FFFFFF;
      box-shadow: 0 0 5px 0 rgba(0,0,0,0.12),
      0 2px 5px 0 rgba(0,0,0,0.14);
      border-radius: 2px;
      form, .title{
        padding: 20px;
        img {
            width 100%
        }
      }
      .required{
        display: inline-block;
        margin-right: 4px;
        line-height: 1;
        font-family: SimSun;
        font-size: 12px;
        color: #f30;
      }
      .ivu-upload-select{
        width: 100%;
        height: 100px;
        text-align: center;
        line-height: 100px;
        background: #FAFAFA;
        border: 1px solid #DFDFDF;
        border-radius: 2px;
      }
      .uploadBtn{
        width: auto!important;
      }
      .ivu-page{
        margin-top: 20px
      }
      .uploadTips{
          font-size: 12px;
          color: #7B7B7B;
          letter-spacing: 0;
          height 20px;
          line-height 20px;
      }
      .title{
        padding-bottom: 0;
        font-size: 14px;
        span{
          color: #d5654b;
        }
      }
      .wrap{
        margin-top: 20px;
        .ivu-table-body{
          overflow: hidden;
        }
        .header{
            color: #2C2E39;
            border-bottom: 1px solid #dfdfdf;
            margin-bottom: 20px;
            button{
              float: right;
              margin-top: -18px;
            }
        }
        .operate{
            margin-top: 20px;
            text-align: right;
        }
        .ivu-upload{
          width: 100%;
          button{
            width: 100%;
          }
        }
        .ivu-form-item-error-tip{
          position: relative;
        }
      }
    }
    .bottom{
      margin-top: 20px;
      text-align: left;
      background: #F0F0F0;
      padding: 20px;
    }
    .ivu-card{
        background: #fff;
        border-radius: 4px;
        font-size: 14px;
        position: relative;
        transition: all .2s ease-in-out;
        margin-bottom: 20px;
        .ivu-card-head{
          background: #FAFAFA;
          box-shadow: 0 1px 10px 0 rgba(0,0,0,0.1);
          border-radius: 4px 4px 0 0;
          border-bottom: 1px solid #e3e8ee;
          padding: 9px 16px;
          line-height: 1;
          border-left: 4px solid #d5654b;
          .ch{
            font-size: 16px;
            display: inline-block;
            padding: 4px 0;
          }
        }
        .ivu-form-item-error-tip{
          position: relative;
        }
        .ivu-table-cell .ivu-btn{
            margin-right: 10px;
          }
    }
  }



</style>
<style lang="stylus" scoped>
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background:#eee;
  color: #2c3e50;
  height: 100%;
  display flex
  ::-webkit-scrollbar
    width: 4px
    height: 4px
  ::-webkit-scrollbar-track
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3)
    border-radius: 4px
    background-color: rgb(238, 238, 238)
  ::-webkit-scrollbar-thumb
    border-radius: 4px
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3)
    background-color: #d5654b
  .indexImgBox
      height 120px
      width 240px
      background #2db7f5
      text-align center
      .indexImg
        height 60px
        margin-top 30px
  .menu
    height: calc(100% - 120px) ;
    padding 20px 0;
    background-color: transparent;
    background: #2D2F3A;
    overflow auto
    .ivu-menu-submenu-title>i
          margin-right: 0;
          margin-left 3px
    .noIcon
      padding-left 42px !important
    .ivu-menu-item
      padding 0
      a, .ivu-menu-submenu-title
        display: block;
        padding 14px 24px
        width: 100%;
        height: 100%;
        color: #ADB4C2;
  .content
    width 100%
    position absolute
    //padding-left 240px
    height 100%
    .headerLogin
      height: 70px;
      width: 100%
      background: #2C2E39;
    .saleList
      text-align: left;
      width: 100%
      height: calc(100vh - 120px);
      overflow: auto

      .listHeader
          width 100%

.login-container
  width: 100%;
  height 100%;
</style>
