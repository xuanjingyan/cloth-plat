<template>
  <Row class="loginHeader">
    <Col span="24" class="userInfo">
        <img class="avartar" src="../../assets/loginImage.png"/>
        <Dropdown @on-click="userClick" trigger="hover" class="userAvatar">
          <span class="dropDown">
            <span class="userName">{{userName || 'xx用户'}}</span>
            <Icon type="arrow-down-b"></Icon>
          </span>
          <DropdownMenu slot="list">
              <DropdownItem name="userCenter" v-if="!isAgent && !isVip">
                <a><Icon type="android-person"></Icon> 个人中心</a>
              </DropdownItem>
              <DropdownItem name="updatePWD" v-if="isAgent || isVip">
                <a><Icon type="key"></Icon> 修改密码</a>
              </DropdownItem>
              <!-- <DropdownItem :divided="true">
                <span><Icon type="email"></Icon> 消息列表</span>
              </DropdownItem>
              <DropdownItem v-for="list of lists" :key="list.id"
                :name="list.id">
                  <Icon type="email-unread" v-if="!list.status"></Icon>
                  <a :class="list.status ? 'isRead' : 'notRead'">{{list.content}}</a>
                </DropdownItem> -->
          </DropdownMenu>
      </Dropdown>
      <Modal v-model="showMessageModal" title="消息详情" :width="300" class="message">
          <div style="font-size: 14px;margin-bottom: 10px">
            发送时间：{{currentInfo.sendTime}}
          </div>
          <div style="font-size: 14px;margin-bottom: 10px">
            确认时间：{{currentInfo.checkTime}}
          </div>
          <div style="font-size: 14px;margin-bottom: 10px">
            接收人：{{currentInfo.receiveMan}}
          </div>
          <div style="font-size: 14px">
            内容：{{currentInfo.content}}
          </div>
      </Modal>
      <Modal v-model="showModal" title="修改密码" :width="350" >
          <Form :model="formModel" ref="form" :rules="rules" :label-width="80">
              <FormItem label="原密码:" prop="oldPassword">
                  <Input type="password" v-model="formModel.oldPassword" placeholder="原密码6-16位数字、字母组成"/>
              </FormItem>
              <FormItem label="新密码:" prop="newPassword">
                  <Input type="password" v-model="formModel.newPassword" placeholder="新密码6-16位数字和字母组成"/>
              </FormItem>
              <FormItem label="确认密码:" prop="confirmPassword">
                  <Input type="password" v-model="formModel.confirmPassword" placeholder="确认密码6-16位数字和字母组成"/>
              </FormItem>
          </Form>
          <p slot="footer">
              <Button @click="showModal=false">取消</Button>
              <Button type="primary" @click="changePwd">确定</Button>
          </p>
      </Modal>

        <a href="/dms/login" class="logOut" @click="sessionStorage.vuex = {}">
          <i class="icon iconfont icon-icon41" style="font-size: 20px;padding-left:5px"></i>
          <br><span class="english">logout</span>
        </a>
    </Col>
  </Row>


</template>/message/list

<script>
import axios, { AS, userId } from "@/axios/common";
import moment from "moment";
import * as all from "@/public/public";
export default {
  data() {
    return {
      userName: sessionStorage.userInfo
        ? JSON.parse(sessionStorage.userInfo).name
        : "saleman",
      username:
        sessionStorage.userInfo
        ? JSON.parse(sessionStorage.userInfo).username
        : "saleman",
      haveMessage: false,
      lists: [],
      showMessageModal: false,
      currentInfo: {},
      // isAgent: false,
      // isVip: false,
      showModal: false,
      formModel: {
        id: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: "原密码6-16位数字、字母组成",
            pattern: /^[0-9a-zA-Z]{6,16}/
          }
        ],
        newPassword: [
          {
            required: true,
            message: "新密码6-16位数字和字母组成",
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: "确认密码6-16位数字和字母组成",
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
          }
        ]
      },
      systemList: this.$store.state.systemData
    };
  },
  watch:{
    showModal:function(value){
      value ? '' :this.$refs["form"].resetFields();
    }
  },
  created() {
  },
  computed: {
    isAgent() {
      return this.$store.state.menuData.userName === "agent";
    },
    isVip() {
      return this.$store.state.menuData.saleType === "2";
    },
  },
  methods: {
    userClick(name) {
      switch (name) {
        case "userCenter":
          this.$router.push("/userCenter");
          break;
        case "updatePWD":
          this.showModal = true;
          break;
      }
    },
    changePwd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { newPassword, confirmPassword } = this.formModel;
          if (newPassword !== confirmPassword)
            return this.$Notice.error({
              title: "两次输入的密码不一致",
              duration: 3
            });
          const data = JSON.parse(JSON.stringify(this.formModel));
          Object.keys(data).forEach(key => {
            if (typeof data[key] === "string") {
              data[key] = all.setHash(data[key]);
            }
          });
          delete data.id;
          axios
            .put(
              `${AS}/manage/user/modifyPassword/${sessionStorage.userId}`,
              data
            )
            .then(res => {
              if (!res.errorcode) {
                this.$Notice.success({
                  title: "修改密码成功",
                  duration: 2
                });
                this.$refs["form"].resetFields();
                this.showModal = false;
                setTimeout(() => (window.location.href = "/AS"), 2000);
              }
            });
        }
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.english{
  font-size:12px
}
.demo-badge{
    width: 42px;
    height: 42px;
    background: #eee;
    border-radius: 6px;
    display: inline-block;
}
.isRead
  color #000
.notRead
  color #d5654b

.loginHeader {
  font-size: 14px;
  height: 70px;
  color: white;
  line-height 70px
}
.loginHeader .ivu-icon {
  font-size: 16px;
}
.loginLeft .commonStyle{
  padding-left : 20px
}
.loginHeader .ivu-icon-arrow-down-b {
  font-size: 8px;
}
.loginImg {
  height: 28px;
  width: 28px;
  border-radius: 50%;
}
.indexLogoPic{
  height 20px
}
.loginLeft {
  padding-left: 20px;
}
.loginLeft > * {
  margin-right: 6px;
}
.userInfo
  display flex
  align-items center
  justify-content flex-end
  cursor pointer

.userInfo > .ivu-icon-gear-b,
.userInfo > .ivu-icon-log-out {
  margin-left: 30px;
}
.logOut,.news
    padding 0 20px
    color white
    line-height 1
    text-align center
    border-left: 1px solid #1E1F27;
.userName
    margin 0 10px
.loginHeaderImg
    height 20px
i
  vertical-align middle
.avartar
  width 30px
  border-radius 100%
.userAvatar
  margin-right 20px
.systemChoose
  cursor pointer
  font-size 15px
</style>
