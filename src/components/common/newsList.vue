<template>
    <div class="operatePage">
        <div class="content">
            <Form class="lastWrap">
              <div class="readMore">
                <Button type="primary" @click="readMore">批量标记</Button>
              </div>
              <Table :data="lists" :columns="head"
              @on-select="data => selectData = data"
              @on-select-cancel="data => selectData = data"
              @on-select-all="data => selectData = data" class="tableStyle" stripe/>
              <Page class="tablePage" :total="total" @on-change="pageChange" show-total/>
            </Form>
        </div>
    </div>
</template>

<script>
import axios, { AS ,renderTitle } from "@/axios/common";
import moment from "moment";
export default {
  data() {
    return {
      lists: [],
      selectData: [],
      pageData: {
        pageIndex: 1,
        pageSize: 10,
        username: sessionStorage.userInfo
          ? JSON.parse(sessionStorage.userInfo).username
          : "saleman"
      },
      total: 0,
      head: [
        {
          type: "selection",
          width: 60
        },
        {
          key: "receiveMan",
          title: "接收人",
          width:120,
          render:renderTitle
        },
        {
          title: "发送日期",
          key: "time",
          width:120,
          render:renderTitle
        },
        {
          title: "内容",
          align:"center",
          key: "content",
          render:renderTitle
        },
        {
          title: "状态",
          key: "status",
          width:100,
          render:renderTitle
        },
        {
          title: "操作",
          width: 120,
          render: (h, param) =>
            param.row.status === "未读" ? (
              <a type="primary" onClick={() => this.toIsRead([param.row.id])}>
                标记为已读
              </a>
            ) : null
        }
      ]
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    toIsRead(ids) {
      axios
        .put(`${AS}/manage/message`, {
          ids
        })
        .then(res => {
          if (!res.errorcode) {
            this.$Notice.success({
              title: "消息已标记为已读",
              duration: 2
            });
          }
        });
    },
    pageChange(page) {
      this.pageData.pageIndex = page;
    },
    readMore() {
      if (!this.selectData.find(one => one.status === "未读"))
        return this.$Notice.warning({
          title: this.selectData.length ? "消息已经是已读状态！" : "请勾选消息！",
          duration: 2
        });
      this.toIsRead(this.selectData.map(one => one.id));
    }
  }
};
</script>

<style lang="stylus" scoped>
  .readMore
    margin-bottom 20px
    text-align right
</style>

