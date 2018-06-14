<template>
    <div class="uploadComponent">
      <Upload 
      action="http://sale-resource.oss-cn-hangzhou.aliyuncs.com/"
      :before-upload="beforeUpload"
      :default-file-list="list.length ? list : defaultList"
      :on-preview="preview"
      :on-remove="remove">
          <Button 
          type="primary"
          icon="image"
          class="uploadBtn">{{text}}</Button>
      </Upload>
      <!-- <Spin fix v-if="isUploading">
          <Icon type="load-c" size=18 class="demo-spin-icon-load bold"></Icon>
          <div class="bold">文件上传中...</div>
      </Spin> -->
    </div>
    </div>
</template>

<script>
import axios from "@/axios/common";
export default {
  props: {
    defaultList: Array,
    text: String,
    url: String,
    tips: String,
    accept: String,
    maxSize: Number
  },
  data() {
    return {
      list: [],
      fileUrl: this.url,
      isUploading: false
    };
  },
  watch: {
    getUrl(val) {
      this.fileUrl = val;
    }
  },
  mounted() {
  },
  methods: {
    beforeUpload(file) {
      this.uploadKey = file.name;
      const extraData = this.uploadData(file);
      const formData = new FormData();
      Object.keys(extraData).forEach(key => {
        formData.append(key, extraData[key]);
      });
      if (this.handleMaxSize(file)) this.handleUpload(formData);
      return false;
    },
    uploadData(file) {
      const policyBase64 = window.btoa(
        JSON.stringify({
          expiration: "2020-12-01T12:00:00.000Z",
          conditions: [
            { bucket: "sale-resource" },
            ["content-length-range", 0, 524288000]
          ]
        })
      );
      const signature = new Hashes.SHA1().b64_hmac(
        "EXxOjx60rjCTD1AomCJrrrQsNyP9gW",
        policyBase64
      );
      return {
        key: this.uploadKey,
        OSSAccessKeyId: "LTAISgmGDGFTmEE4",
        signature,
        policy: policyBase64,
        file
      };
    },
    handleUpload(data) {
      this.isUploading = true;
      axios
        .post("http://sale-resource.oss-cn-hangzhou.aliyuncs.com/", data)
        .then(res => {
          this.isUploading = false;
          if (!res) {
            this.$Notice.success({
              title: `上传${this.tips || "营业执照"}成功`,
              duration: 2
            });
            this.list = [
              {
                name: this.uploadKey,
                url: `http://saleres.tincere.link/${this.uploadKey}`
              }
            ];
            this.fileUrl = `http://saleres.tincere.link/${this.uploadKey}`;
            this.$emit("emit-url", this.fileUrl);
          }
        });
    },
    preview(file) {
      window.open(file.url);
    },
    handleMaxSize(file) {
      //const imgType = "image/png,image/jpg,image/jpeg";
      // if (!(this.accept.includes("image") && imgType.includes(file.type)))
      const fileLength = file.name.split('.').length
      if (!this.accept.includes(file.name.split('.')[fileLength-1]))
        return this.$Notice.warning({
          title: `请上传${this.accept}格式的文件`,
          duration: 3
        });
      return file.size / 1000 > this.maxSize && this.maxSize
        ? this.$Notice.warning({
            title: "上传的文件超过大小限制",
            desc: `${file.name}的大小超过了限制.`,
            duration: 3
          })
        : true;
    },
    remove() {
      this.$emit("emit-url", "");
    }
  }
};
</script>

<style lang="stylus">
  .uploadComponent
    position relative
    .ivu-spin-fix
      display block
      background-color rgba(255,255,255,.9)
      .bold
        font-weight bold
      .ivu-spin-text
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }  
</style>

