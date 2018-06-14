<template>
  <div class="dms-container">
    <div class="dms-nav-shell">
      <span>当前位置：</span><a>资源文件 / </a><a>软件包</a>
    </div>
    <div class="package-info">
      <div class="wrap">
        <Row class-name="wrap-col">
          <Col span="4"><span class="star">*</span>设备类型：</Col>
          <Col span="14">
            <Select style="width:200px" v-model="formData.devType">
              <Option value="101">壁挂屏</Option>
              <Option value="201">三屏下屏</Option>
              <Option value="202">三屏中屏</Option>
            </Select>
          </Col>
        </Row>
        <Row class-name="wrap-col">
          <Col span="4"><span class="star">*</span>软件包类型：</Col>
          <Col span="14">
            <Select style="width:200px" v-model="formData.pkgtype">
              <Option value="1">主端</Option>
              <Option value="0">从端</Option>
            </Select>
          </Col>
        </Row>
        <Row class-name="wrap-col">
          <Col span="4"><span class="star">*</span>安装方式：</Col>
          <Col span="14">
          <Select style="width:200px" v-model="formData.installtype">
            <Option value="1">更新</Option>
            <Option value="0">新装</Option>
          </Select>
          </Col>
        </Row>
        <Row class-name="wrap-col" v-if="formData.devType === '101'">
          <Col span="4"><span class="star">*</span>使用范围：</Col>
          <Col span="14">
          <Select style="width:200px" v-model="formData.factory" >
            <Option value="01">中物</Option>
            <Option value="21">华为</Option>
          </Select>
          </Col>
        </Row>
        <Row class-name="wrap-col">
          <Col span="4"><span class="star">*</span>备注：</Col>
          <Col span="14">
            <input class="input-common" placeholder="最多25个字" v-model="formData.remark"/>
          </Col>
        </Row>
        <Row class-name="wrap-col">
          <Col span="4"><span class="star">*</span>上传文件：</Col>
          <Col span="14">
          <Upload ref="uploading" action="http://t.advnewapi.dftcmedia.com:8888/eqApi/equipment/devman/file"
                  :format="fileType"
                  :on-format-error="formatError"
                  :on-success="onSuccess"
                  :on-progress="onProgress"
                  :on-remove="onRemove"
                  :before-upload="beforeUpload">
            <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
          </Upload>
          </Col>
        </Row>
      </div>

      <Modal
        v-model="uploadModal"
        @on-cancel="uploadFile"
        :closable="false"
        :styles="{top: '200px'}">
        <div class="loading-text">文件上传时间可能比较长，请耐心等待<img src="../../assets/loading.gif"></div>
      </Modal>

      <div class="commit-btns">
        <Row>
          <Button type="info" @click="commitConfig">保存软件包</Button>
          <Button type="info" @click="cancelConfig">返回</Button>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "@/axios/common";
  export default {
    components: {
    },
    data() {
      return {
        uploadModal: false,
        canSubmit: true,
        fileType: ['apk'],
        defaultFileList: [],
        defaultFormData: {},
        formData: {
          type: 1,
          devType: '101',
          pkgtype: '1',
          installtype: '1',
          factory: '01',
          remark: '',
          url: '',
          name: '',
          version: ''
        }
      };
    },
    mounted() {
        this.defaultFormData = JSON.parse(JSON.stringify(this.formData))
    },
    methods: {
      beforeUpload (params) {
        if (this.defaultFileList.length >= 1){
          this.$Modal.warning({
            content: '只能上传一个软件包'
          });
          return false
        }
      },
      formatError () {
        this.$Modal.warning({
          content: '只支持上传".apk"格式文件'
        });
      },
      onProgress () {
        this.uploadModal = true
      },
      uploadFile () {
        this.uploadModal = false
      },
      onSuccess (response, file) {
        if (response.code === 0) {
          this.uploadModal = false
          this.defaultFileList.push(response.data)
        }
        this.formData.name = file.name
        this.formData.url = response.data.fileUrl
        this.formData.version = response.data.fileVersion
      },
      onRemove (file, fileList) {
        this.defaultFileList = fileList
      },
      commitConfig () {
        this.verifyData()
        this.canSubmit && axios
        .post("/devman/softpkg", this.formData)
        .then(res => {
          if (res.code === 0) {
            this.$Modal.success({
              content: '提交成功',
              onOk: () => {
                this.formData = JSON.parse(JSON.stringify(this.defaultFormData))
                this.defaultFileList = []
                this.$refs["uploading"].clearFiles()
              }
            });
          } else {
            this.$Modal.error({
              content: res.message || '提交失败！'
            });
          }
        });
      },
      verifyData () {
        if (this.formData.remark.trim() === '') {
          this.$Modal.error({
            content: '请填写备注！'
          });
          this.canSubmit = false
          return false
        }
        if (this.defaultFileList.length === 0) {
          this.$Modal.error({
            content: '请上传软件包！'
          });
          this.canSubmit = false
          return false
        }
        this.canSubmit = true
      },
      cancelConfig () {
        // this.formData = JSON.parse(JSON.stringify(this.defaultFormData))
        this.$router.push({name:'source'})
      }
    }
  };
</script>

<style lang="stylus">
  .ivu-progress
    display:none!important
  .loading-text
    font-size: 18px;
    padding-bottom:10px;
  .ivu-modal-footer
    display: none!important;
  .star
    color: red;
    padding:0 3px 0 0;
  .input-common
    height: 30px;
    line-height: 1.5;
    padding: 2px 2px;
    font-size: 12px;
    border: 1px solid #dddee1;
    border-radius: 4px;
    color: #495060;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
  .dms-container
    background: #FFF;
    height:auto;
    .dms-nav-shell
      width:96%;
      margin: 0 auto
      padding-top:20px;
      a
        color:#333;
    .package-info
      color:#000;
      width: 96%;
      margin:0 auto;
      padding-top:20px;
      .wrap
        font-size: 12px;
        padding-bottom: 30px;
        border-bottom 1px solid #e2e2e2;
        .wrap-name
          width: 200px;
          font-size: 20px;
          color: #333
          padding: 10px 0;
        .wrap-col
          color: #333;
          margin-bottom 10px
          input
            width 76%;
          textarea
            width: 80%;
            border: 1px solid #dddee1;
            outline: none;
      .commit-btns
        text-align: right
        padding: 20px 0  30px 0

</style>
