<template>
    <div class="operatePage">
        <div class="content">
            <Form :label-width="50" :model="emailForm"
            :rules="rules" ref="form">
                <Row>
                    <Col>
                        <FormItem label="主题:" prop="mTitle">
                            <Input v-model="emailForm.mTitle" :maxlength="150"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormItem label="内容:" prop="content">
                            <vue-html5-editor 
                            :content="emailForm.content" 
                            :height="500"
                            @change="update"></vue-html5-editor>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="bottom">
                <Button type="primary" @click="send">
                    发送
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      emailForm: {
        content: "",
        mTitle: ""
      },
      userName: this.$store.state.menuData.userName,
      rules: {
        mTitle: [
          {
            required: true,
            message: "请输入邮件主题"
          }
        ],
        content: [
          {
            required: true,
            message: "请输入邮件内容且不少于15个字符",
            min: 15
          }
        ]
      }
    };
  },
  methods: {
    update(content) {
      this.emailForm.content = content;
    },
    send() {
      this.$refs.form.validate(valid => {
        if (valid) {
          axios
            .post(`/${this.userName}/v2/mailbox`, this.emailForm)
            .then(res => {
              if (!res.errorcode) {
                this.$Notice.success({
                  title: "发送成功",
                  duration: 2
                });
                this.$refs.form.resetFields();
              }
            });
        }
      });
    }
  }
};
</script>
