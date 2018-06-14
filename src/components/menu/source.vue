<template>
  <article class="dms-container">
    <header class="dms-nav-shell">
      <span>当前位置：</span><a>资源文件</a>
    </header>
    <section class="dms-list-container">
      <Form :model="searchForm" class="wrap lastWrap">
        <Row>
          <Col span="24" offset="0" class-name="done-list-btn">
            <Button type="info" @click="equipmentConfig">设备配置</Button>
            <Button type="info" @click="softwarePackage">软件包</Button>
          </Col>
        </Row>
        <Table :data="lists" :columns="tHead" stripe/>
        <div class="page-list">
          <Page :total="total" @on-change="pageChange" @on-page-size-change="onPageSizeChange" show-sizer show-elevator  :page-size-opts="pageOpts"></Page>
        </div>


      </Form>
      <Modal
        v-model="urlModla"
        @on-cancel="urlModla=false"
        :width="fileType === 1 ? '700px' : '400px'"
        :styles="{top: '200px'}">
        <p v-if="fileType === 1">URL: <a :href="downloadUrl">{{downloadUrl}}</a></p>
        <div v-if="fileType === 0" class="configContent">
          <p>百度播放素材更新时间间隔：{{configContent.bdAdvRefreshInterval}}秒</p>
          <p>媒体音量：{{configContent.volume}}</p>
          <p>每日开关机（屏）的时间：{{configContent.startupTime}}-{{configContent.closeTime}}</p>
          <p>监控广告切换开关：{{configContent.maSwitch == 0 ? '关闭广告显示，只显示监控' : '开启广告显示，同时显示监控'}}</p>
          <P>播放时间：{{configContent.playShowTime}}秒</P>
        </div>
      </Modal>
    </section>
  </article>
</template>

<script>
  import moment from 'moment';
  import axios ,{renderTitle}from "@/axios/common";
  export default {
    components: {
    },
    data() {
      return {
        pageOpts:[10,30,50,100],//分页条数选项
        downloadUrl: '',
        fileType: 2,
        configContent: null,
        urlModla: false,
        searchForm: {
          rows: 10,
          page: 1,
          type: ''
        },
        tHead: [
          {
            title: "文件名",
            key: "name",
            render:renderTitle
          },
          {
            title: "文件类型",
            key: "type",
            render:(h, params) => {
              return params.row[params.column.key] === 1 ? '软件包' : '配置'
            }
          },
          {
            title: "版本号",
            key: "version",
            render:renderTitle
          },
          {
            title: "上传时间",
            key: "createTime",
            render:(h, params) => {
              return  moment.unix(params.row[params.column.key]).format("YYYY-MM-DD HH:MM:SS");
            }
          },
          {
            title: "备注",
            key: "remark",
            render:renderTitle
          },
          {
            title: "操作",
            key: "url",
            render:(h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.fileType = parseInt(params.row.type)
                      this.urlModla = true
                      if (this.fileType === 1) {
                        this.downloadUrl = params.row[params.column.key]
                      } else {
                        this.configContent = JSON.parse(params.row.content)
                      }
                    }
                  }
                }, '查看'),
              ]);
            }
          }
        ],
        lists: [],
        total: 0
      };
    },
    mounted() {
      this.getList();
    },
    methods: {
      equipmentConfig () {
        this.$router.push({name:'equipmentconfig'})
      },
      softwarePackage () {
        this.$router.push({name:'softwarePackage'})
      },
      getList() {
        axios
          .get("/devman/resource", {
            params: this.searchForm
          })
          .then(res => {
            if (!res.errorcode) {
              const { total, rows } = res.data;
              this.lists = rows.map((one, index) => {
                one.index = index + 1;
                return one;
              });
              this.total = total;
            }
          });
      },
      pageChange(page) {
        this.searchForm.page = page;
        this.getList();
      },
      onPageSizeChange (size) {
        this.searchForm.rows = size;
        this.getList();
      }
    }
  };
</script>
<style lang="stylus">

  .dms-container
    background: #FFF;
    height:auto;
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
      .done-list-btn
        text-align right;
        margin-bottom: 10px;
      .page-list
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
  .configContent
    font-size:14px;
    p
      margin: 0 0 3px 0

  .ivu-modal-footer
    display: none!important;
  .ivu-modal-body
    padding-top :40px!important;


</style>
