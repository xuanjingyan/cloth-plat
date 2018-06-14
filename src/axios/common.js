import axios from "axios";
import store from "../store/store";
import { Notice } from "iview";
import serverPath from "../serverPath.js"
const token = sessionStorage.getItem("token");
export const userId = sessionStorage.getItem("userId");
export const AS = "http://t.advnewapi.dftcmedia.com:8888";
const environment = process.env.NODE_ENV
console.log('当前环境：' + environment)
if (!token || token === null) {
  // window.location.href = "/AS/";
}
axios.defaults.baseURL = serverPath.baseUrl
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    // config.baseURL = serverPath.test;
    if (config.url.includes("salemain")) {
      config.url = config.url.replace("/salemain", "");
    }
    if (!config.url.match(/\=/))
      config.url = `${config.url}`;
    else config.url = `${config.url}`;
    store.commit("enableLoading", true);
    return config;
  },
  error => {
    // if (error.response && error.response.status === 401) {
    //   Notice.error({
    //     title: "该账号已在其他地方登录",
    //     duration: 3
    //   });
    //   window.location.href = "/AS/";
    // }
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    store.commit("enableLoading", false);
    const { errorcode, errormsg } = response.data;
    if (errorcode) {
      Notice.error({
        title: errormsg,
        duration: 3
      });
    }
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);
export const renderTitle = (h, params) => {
  return params.row[params.column.key]
    ? ("div",
      [
        h(
          "Tooltip",
          {
            props: {
              placement: "bottom-start",
              content: params.row[params.column.key]
            }
          },
          params.row[params.column.key]
        )
      ])
    : "";
};
export default axios;
