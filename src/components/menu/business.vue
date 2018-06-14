<template>
  <article class="dms-container">
    <header class="dms-nav-shell">
      <span>当前位置：</span><a>商户管理</a>
    </header>
    <section class="dms-list-container">
      <header class="header">
        <p class="title">
          行政区
        </p>
        <div class="sec_content">
          <city-code @cityMsg="getCityCode" :value="false" style="width: 200px;"></city-code>
          <update-status @updateStatus="getUpdateStatus" :value="false" style="width: 200px;"></update-status>
          <Select v-model="deviceState" style="width:150px" placeholder="设备状态" @on-change="deviceChange" clearable>
            <Option v-for="item in deviceStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="deviceType" style="width:150px" placeholder="设备类型" @on-change="deviceChange" clearable>
            <Option v-for="item in deviceTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Input v-model="keyword" placeholder="关键字" style="width: 200px;top: 0;">
          <Button @click="search" slot="append" icon="ios-search"></Button>
          </Input>
        </div>
        <div class="publish_nav">
          <Button @click="subNav(item.path)" class="nav_list" v-for="item in navList" slot="append" type="info" size="large" :key="item.key">{{ item.value }}</Button>
        </div>
      </header>
      <Table :loading="loading" @on-selection-change="selectItem" @on-select-all="selectAll" border :columns="columns" :data="data" stripe></Table>
      <div class="page-list">
        <Page :total="total" @on-change="pageChange" @on-page-size-change="pageSizeChange" show-sizer show-elevator :page-size-opts="pageOpts"></Page>
      </div>
      <Modal v-model="notice" width="200">
        <p style="text-align: center;">请勾选表格中的某项...</p>
      </Modal>
    </section>
  </article>
</template>

<script>
  import cityCode from "@/components/common/cityCode";
  import updateStatus from "@/components/common/updateStatus";
  import axios from "@/axios/common";
  import UpdateStatus from "../common/updateStatus";
  export default {
    name: "business",
    components: {
      UpdateStatus,
      updateStatus,
      cityCode
    },
    data() {
      return {
        address: [], //用户选择的地址
        levelStatus: null, // 升级状态
        deviceType: "", //用户选择的设备类型
        deviceState: "", //用户选择的设备状态
        total: 0, //表格数据总条数
        pageOpts: [10, 30, 50, 100], //分页条数选项
        pageSize: 10, //每页显示多少条
        pageNum: 1, //第几页
        keyword: "", //关键字搜索
        selectList: [], //选中表格中的项
        loading: false,
        notice: false,
        deviceStateList: [
          {
            value: "",
            label: "全部"
          },{
            value: 0,
            label: "离线"
          },
          {
            value: 1,
            label: "在线"
          }
        ],
        deviceTypeList: [{
          value: "",
          label: "全部"
        },
          {
            value: "101",
            label: "壁挂横屏"
          },
          {
            value: "102",
            label: "壁挂竖屏"
          },
          {
            value: "201",
            label: "立式竖屏\t\n"
          }
        ],
        navList: [{
          value: "设备配置",
          key: "deviceConfigure",
          path: "/deviceConfigure/0"
        }, {
          value: "软件列表",
          key: "softwareList",
          path: "/softwareList/1"
        }, {
          value: "批量升级",
          key: "batchUpdate",
          path: "/batchUpdate"
        }],
        columns: [{
          type: 'selection',
          width: 60,
          align: 'left'
        },
          {
            title: '商户名',
            align: 'left',
            key: 'sellername'
          },
          {
            title: '经营地址',
            align: 'left',
            key: 'address'
          },
          {
            title: '升级状态',
            align: 'left',
            key: '',
            width: 300,
            render: (h, params) => {
              let arr = [{text: '下屏master/terminal'}, {text: '下屏slave/terminal_service'}, {text: '中屏slave'}, {text: '中屏master'}]
              for (let i = 0 ; i < arr.length; i++) {
                let key = 'levelStatus' + (i + 1);
                let val = params.row[key]
                let status = ''
                if (val === 0) {
                  status = '失败'
                }
                else if (val === 1) {
                  status = '成功'
                }
                else if (val === 2) {
                  status = '升级中'
                }
                arr[i].status = status
              }
              return  <div style={{padding: '10px 0'}}>{arr.map(v => <p>{v.text}: {v.status}</p>)}</div>
            }
          },
          {
            title: '设备 MAC',
            align: 'left',
            key: 'mac'
          },
          {
            title: '设备类型',
            align: 'left',
            key: 'devType'
          },
          {
            title: '设备状态',
            align: 'left',
            key: 'onlineStatus',
            render: (h, params) => {
              if(+params.row.onlineStatus === 1) {
                return h("span", "在线")
              } else {
                return h("span", "离线")
              }
            }
          },
          {
            title: '软件版本',
            align: 'left',
            key: 'fwVersion',
            render:(h, params) => {
              let version = params.row[params.column.key]
              let arr = version && version !== null ? version.split(',').filter(v => v !== '') : []
              return  arr.map(v => <p>{v}</p>)
            }
          },
          {
            title: '最新上报时间',
            align: 'left',
            key: 'updateDate',
            render:(h, params) => {
              let time = this.changeTime(params.row.updateDate)
              return h("span",time)
            }
          }
        ],
        data: []
      }
    },
    methods: {
      //时间转换
      changeTime(seconds,separator){
        separator = separator || '.';

        if(seconds == '' || typeof seconds == 'undefined' || seconds == -1) return '';

        let d = new Date();
        d.setTime(seconds * 1000);
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let date = d.getDate();
        let hh = d.getHours();
        let mm = d.getMinutes();
        let ss = d.getSeconds();

        return year + separator + (month < 10 ? '0' + month : month) + separator + (date < 10 ? '0' + date : date) +
          " " + (hh < 10 ? '0' + hh : hh) + ":" + (mm < 10 ? '0' + mm : mm) + ":" + (ss < 10 ? '0' + ss : ss);
      },
      //选择地区
      getCityCode(val) {
        this.address = val;
        this.getData();
      },
      // 选择升级状态
      getUpdateStatus(val) {
        this.levelStatus = val[1]
        this.getData()
      },
      //选择设备类型和状态
      deviceChange() {
        this.getData();
      },
      //关键字搜索
      search() {
        this.getData();
      },
      //第几页
      pageChange(val) {
        this.pageNum = val;
        this.getData();
      },
      //每页显示几条
      pageSizeChange(val) {
        this.pageSize = val;
        this.getData();
      },
      //获取数据
      getData() {
        let that = this;
        this.loading = true;
        axios
          .get("/devman/tenant", {
            params: {
              adcode: this.address.length ? this.address[this.address.length - 1] : "",
              page: this.pageNum,
              levelStatus: this.levelStatus,
              rows: this.pageSize,
              deviceState: this.deviceState,
              deviceType: this.deviceType,
              keyword: this.keyword
            }
          })
          .then(res => {
            if(res.code === 0) {
              that.data = res.data.rows;
              that.total = res.data.total;
            }
            this.loading = false;
          });
      },
      //选中表格某一项
      selectItem(val) {
        this.selectList = val;
      },
      //全选
      selectAll(val) {
        this.selectList = val;
      },
      //设备配置、软件列表、批量升级
      subNav(val) {
        let len = this.selectList.length;
        let mac = "";
        if(len || val === "/batchUpdate") {
          this.selectList.map(res => {
            mac += res.mac + ",";
          });
          mac = mac.replace(/,$/, "");
          sessionStorage.setItem("mac", mac);
          this.$router.push(val);
        } else {
          this.notice = true
        }

      }
    },
    beforeMount() {
      this.getData()
    }
  }
</script>

<style lang="stylus">
  .dms-container
    color:#000;
    width: 96%;
    margin:0 auto;
    padding-top:5px;
    .dms-nav-shell
      width:96%;
      margin: 0 auto
      padding-top:20px;
      a
        color:#333;
    .dms-list-container
      color:#000;
      width: 96%;
      margin:0 auto;
      padding-top:5px;
  .header {
    width: 96%;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .title {
    font-size: 16px;
    width: 80px;
    text-align: center;
  }

  .sec_content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .sec_content div {
    margin-right: 10px;
  }

  .page-list {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .nav_list {
    margin-left: 10px;
  }
</style>
