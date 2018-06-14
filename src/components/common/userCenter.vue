<template>
  <div class="operatePage">
      <div class="content">
          <Form :model="infoForm" ref="infoForm" :rules="infoRules" :label-width="75">
            <div class="wrap">
                <p class="header">账户信息</p>
                <Row>
                    <Col span="5">
                        <FormItem label="角色名称:">
                            <Input v-model="userInfo.role" :disabled="true"/>
                        </FormItem>
                    </Col>
                    <Col span="5" offset="1">
                        <FormItem label="用户名称：">
                            <Input v-model="userInfo.name" :disabled="true"/>
                        </FormItem>
                    </Col>
                    <Col span="5" offset="1">
                        <FormItem label="账号:">
                            <Input v-model="userInfo.username" :disabled="true"/>
                        </FormItem>
                    </Col>
                </Row>
            </div>
            <div class="wrap">
                <p class="header">个人信息</p>
                <div class="info">
                        <Row>
                            <Col span="5">
                                <FormItem label="手机号码:" prop="mobilePhone">
                                    <Input v-model="infoForm.mobilePhone" :disabled="!isEdit"
                                    :placeholder="isEdit ? '11位数字' : ''"/>
                                </FormItem>
                            </Col>
                            <Col span="5" offset="1">
                                <FormItem label="邮箱地址:" prop="email">
                                    <Input v-model="infoForm.email"
                                    :placeholder="isEdit ? 'xxx@qq.com' : ''"
                                    :disabled="!isEdit"/>
                                </FormItem>
                            </Col>
                            <Col span="5" offset="1">
                                <FormItem label="职务:">
                                    <Input v-model="infoForm.job" :disabled="true"/>
                                </FormItem>
                            </Col>
                            <Col span="5" offset="1">
                                <FormItem label="所属部门:">
                                    <Input v-model="infoForm.org" :disabled="true" :maxlength="50"/>
                                </FormItem>
                            </Col>
                        </Row>
                </div>
            </div>
        </Form>
            <div class="bottom">
                <Button type="primary" v-if="!isEdit" @click="isEdit = true">编辑</Button>
                <span v-if="isEdit">
                    <Button type="primary" @click="confirmEdit">确认编辑</Button>
                    <Button type="primary" @click="$refs.infoForm.resetFields();isEdit = false;getInfo()">取消</Button>
                </span>
                <Button type="primary" @click="showModal = true">修改密码</Button>
            </div>
      </div>
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
  </div>
</template>

<script>
import axios, { AS } from "@/axios/common";
import * as all from "@/public/public";
export default {
  data() {
    return {
      userName: sessionStorage.userInfo
        ? JSON.parse(sessionStorage.userInfo).username
        : "lisi",
      userInfo: {},
      showModal: false,
      formModel: {
        id: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      infoForm: {},
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
      infoRules: {
        mobilePhone: [
          {
            required: true,
            pattern: /^[0-9]{11}$/,
            message: "手机号码位11位数字"
          }
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "邮箱格式不正确"
          }
        ]
      },
      isEdit: false
    };
  },
  mounted() {
    this.getInfo();
  },
  watch:{
    showModal:function(value){
      value ?'':this.$refs.form.resetFields()
    }
  },
  methods: {
    getInfo() {
      axios
        .get(`${AS}/manage/user/userInfo`, {
          params: {
            username: this.userName
          }
        })
        .then(res => {
          if (!res.errorcode) {
            const { userJob, userOrg, userRole, id } = res.data;
            this.userInfo = res.data;
            this.userInfo.job = userJob.map(one => one.orgName).toString();
            this.userInfo.org = userOrg.map(one => one.orgName).toString();
            this.userInfo.role = userRole.map(one => one.gName).toString();
            this.infoForm = this.userInfo;
            this.formModel.id = id;
          }
        });
    },
    changePwd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { newPassword, confirmPassword, id } = this.formModel;
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
          axios
            .put(`${AS}/manage/user/modifyPassword/${id}`, data)
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
    },
    confirmEdit() {
      const { id, email, mobilePhone } = this.infoForm;
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          axios
            .put(`${AS}/manage/user/${id}`, {
              email,
              mobilePhone
            })
            .then(res => {
              if (!res.errorcode) {
                this.$Notice.success({
                  title: "编辑成功",
                  duration: 2
                });
                this.isEdit = false;
                this.getInfo();
              }
            });
        }
      });
    }
  }
};
</script>
