import Vue from "vue";
import Router from "vue-router";
import store from "../store/store";
import * as all from "../public/public";

import App from "../App";
//首页
import home from "@/components/home/home";
//index
import Index from "@/components/common/index";
import "iview/dist/styles/iview.css";

import SendEmailToLeader from "@/components/agent/sendEmailToLeader";
//个人中心
import UserCenter from "@/components/common/userCenter";
//消息列表
import NewsList from "@/components/common/newsList";

// 登陆
import Login from "@/components/common/login";

//设备管理
import Loop from "@/components/menu/loop";
// 商户管理
import Business from "@/components/menu/business";
import DeviceConfigure from "@/components/business/deviceConfigure";
import SoftwareList from "@/components/business/softwareList";
import BatchUpdate from "@/components/business/batchUpdate";
// 资源文件
import Source from "@/components/menu/source";
// 设备配置
import EquipmentConfig from "@/components/menu/equipmentConfig";
import SoftwarePackage from "@/components/menu/softwarePackage";


Vue.use(Router);

const router = new Router({
  base: "/dms/",
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/agenthome",
      name: "home",
      alias: ["/salemanhome", "/agentvhome"],
      component: home
    },
    {
      path: "/index",
      name: "index",
      component: Index
    },
    {
      path: "/loop",
      name: "loop",
      component: Loop
    },
    {
      path: "/business",
      name: "business",
      component: Business
    },
    {
      path: "/deviceConfigure/:type",
      name: "deviceConfigure",
      component: DeviceConfigure
    },
    {
      path: "/softwareList/:type",
      name: "softwareList",
      component: SoftwareList
    },
    {
      path: "/batchUpdate",
      name: "batchUpdate",
      component: BatchUpdate
    },
    {
      path: "/source",
      name: "source",
      component: Source
    },
    {
      path: "/equipmentconfig",
      name: "equipmentconfig",
      component: EquipmentConfig
    },
    {
      path: "/softwarePackage",
      name: "softwarePackage",
      component: SoftwarePackage
    },
    {
      path: "/sendEmail",
      name: "sendEmail",
      component: SendEmailToLeader
    },
    {
      path: "/userCenter",
      name: "UserCenter",
      component: UserCenter
    },
    {
      path: "/newsList",
      name: "newsList",
      component: NewsList
    }
  ]
});

router.beforeEach((to, from, next) => {
  // const name = to.name.split("-"),
  //   info = all.menuInfo[name[0]];
  // if (to.path.indexOf("saleList") > -1)
  //   store.state.edit
  //     ? (info.name = info.name.replace("新增", "编辑"))
  //     : (info.name = info.name.replace("编辑", "新增"));
  // else info.name = name.length > 1 ? info[name[1]] : info.base;
  // store.commit("updateHeader", info);
  next();
});

export default router;
