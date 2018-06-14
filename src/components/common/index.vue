<template>
  <div id="index">
        <div class="liushi">
          <router-link v-for="menu of menus" :key="menu.path"
          :to="menu.path" >
              <div><i class="icon iconfont" :class="menu.iconfont"></i></div>
              <div class="fontsize">{{menu.name}}</div>
              <div class="englishSize">{{menu.description}}</div>
          </router-link>
        </div>

  </div>
</template>

<script>
// <link rel="stylesheet" href="demo.css">
// <link rel="stylesheet" href="iconfont.css">
import '../../iconfont/iconfont.css';
import axios, { userId, AS } from "@/axios/common";
export default {
  data() {
    return {
      menus: [
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
        },
        {
          description: "Unavailable Media Resource",
          icon: "icon-yichangtongji",
          iconfont: "icon-yichangtongji",
          id: 191,
          name: "异常点位",
          path:  "/errorPoint"
        }
      ]
    };
  },
  mounted() {
    this.getSystem();
  },
  methods: {
    getSystem() {
      axios.get(`${AS}/manage/menu/sys/${userId}`).then(res => {
        if (!res.errorcode)
          this.$store.dispatch(
            "systemData",
            res.data.filter(one => one.parentId === -1)
          );
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
#app #index {
  background :#efefef;
  overflow auto;
  .liushi{
    width 1210px;
    height: 100%;
    margin  0 auto;
    padding: 40px 0
  }
  .liushi:before, .liushi:after {
    content: ""
    display table
  }
  .iconfont{
    font-size: 54px;
    color :#D5654B;
  }
  .iconfont.icon-dashboardcustom,.iconfont.icon-icon4,.iconfont.icon-zizhizhengshu{
    font-size: 58px;
  }
  .fontsize{
    color :#D5654B;
    font-size :20px;
    font-weight:500
  }
  .englishSize{
    color : #bcbcbc
  }
  .menuContent {
    height: 300px;
    float: left;
    width: 300px;
  }
  .img{
    height 63px
    overflow hidden
  }
  a:nth-of-type(4n){
    border-right: 0 !important
  }
  a {
    background: #e8e8e8;
    border-right: 1px solid #E1E1E1;
    border-bottom: 1px solid #E1E1E1;
    display:flex;
    height: 300px;
    float: left;
    width: 300px;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    font-family: adobe;
    transition: all 0.3s;
    div {
      color: rgba(0, 0, 0, 0.65);
      font-size: 16px;
      &:first-child {
        font-size: 20px;
      }
      &:nth-child(2) {
        margin: 5px 0;
      }
    }
    &:hover {
      background-color: #D5654B;
      border-right: 1px solid #D5654B;
      border-bottom: 1px solid #D5654B;
      .innerimg{
        height 126px
        transform : translateY(-63)
      }
      .iconfont{
        color white
      }
      div {
        color: #fff;
      }
      i {
        transform: scale(1.5);
      }
    }
    i {
      transition: all 0.5s ease-in;
    }
  }
}
</style>
