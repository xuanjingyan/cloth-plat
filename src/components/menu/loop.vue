<template>
  <article class="dms-container">
    <header class="dms-nav-shell">
      <span>当前位置：</span><a>设备管理</a>
    </header>
    <section class="dms-list-container">
      <Form :model="searchForm" class="wrap lastWrap">
        <Row style="margin: 10px 0 0 0">
          <Col span="3" offset="1" style="float: right;">
          <Button type="info" @click="search">搜索</Button>
          </Col>
          <Col span="5" offset="" style="float:right;">
          <FormItem >
            <Input v-model="searchForm.mac" placeholder="请输入mac地址"/>
          </FormItem>
          </Col>

        </Row>
        <Table :data="lists" :columns="tHead" stripe/>
        <div class="page-list">
          <Page :total="total" @on-change="pageChange" @on-page-size-change="onPageSizeChange" show-sizer show-elevator  :page-size-opts="pageOpts"></Page>
        </div>

      </Form>
      <Modal
        v-model="imgModal"
        @on-cancel="cancelShootScreen"
        :styles="{top: '200px'}">
        <div class="loading-text" v-if="!imgUrl">截屏的时间可能比较长，请耐心等待<img src="../../assets/loading.gif"></div>
        <img :src="imgUrl" v-if="imgUrl" style="width: 100%"/>
      </Modal>
    </section>
  </article>
</template>

<script>
  import axios ,{renderTitle}from "@/axios/common";
  export default {
    components: {
    },
    data() {
      return {
        pageOpts:[10,30,50,100],//分页条数选项
        imgUrl: false,
        imgModal: false,
        searchForm: {
          mac: "",
          page: 1,
          count: 10
        },
        tHead: [
          {
            title: "mac地址",
            key: "mac",
            render:renderTitle
          },
          {
            title: "设备状态",
            key: "mediaResourceStatus",
            render:renderTitle
          },
          {
            title: "在线状态",
            key: "onlineStatus",
            render:(h, params) => {
              return params.row[params.column.key] === 1 ? '在线' : '离线'
            }
          },
          {
            title: "网速 KB/s",
            key: "speed",
            render:renderTitle
          },
          {
            title: "操作",
            key: "mac",
            render:(h,params) => {
              if (params.row.onlineStatus === 1) {
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
                        this.shootScreen(params.row[params.column.key])
                      }
                    }
                  }, '截屏'),
                ]);
              } else {
                return ''
              }

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
      getList() {
        axios
          .get("/devman/devList", {
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
        this.searchForm.count = size;
        this.getList();
      },
      search() {
        this.searchForm.offset = 1;
        this.getList();
      },
      shootScreen (mac) {
        console.log('截屏')
        this.imgModal = true
        axios
          .post("/pub/screenPub?mac=" + mac)
          .then(res => {
            if (!res.errorcode) {
              setTimeout(() => {
                console.log(res)
                console.log(this.imgUrl)
                this.imgUrl = res.data
              }, 20000)
            }
          })
      },
      cancelShootScreen () {
        this.imgUrl = false;
        this.imgModal = false
      }
    }
  };
</script>
<style lang="stylus">
  .loading-text
    font-size: 18px;
    padding-bottom:20px
    img
      vertical-align: text-bottom
  .ivu-modal-footer
    display: none!important;

  .ivu-modal-body
    padding-top :40px!important;

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
      .done-list-btn
        text-align right;
        margin-bottom: 10px;
    .page-list
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
  .ivu-page.mini .ivu-page-item
    margin: 0 2px
</style>
