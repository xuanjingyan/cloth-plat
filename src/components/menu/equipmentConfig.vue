<template>
  <div class="dms-container">
    <div class="dms-nav-shell">
      <span>当前位置：</span><a>资源文件 / </a><a>设备配置</a>
    </div>
    <div class="package-info">
      <div class="wrap">
        <Row class-name="wrap-name">
          <Col span="24">设备配置文件生成</Col>
        </Row>
        <Row class-name="wrap-col">
          <Col span="8"><span class="star">*</span>配置名：<input class="input-common" v-model="formData.name"/></Col>
          <Col span="8">版本号：<input class="input-common" v-model="formData.version"/></Col>
        </Row>
      </div>

      <div class="wrap">
        <Row class-name="wrap-name">
          <Col span="24">运行定时</Col>
        </Row>
        <Row class-name="wrap-col">
          <Col>开关机时间：<TimePicker @on-change="changeTimer" @on-clear="clearTimer" format="HH:mm" type="timerange" placement="bottom-end" placeholder="请选择时间" style="width: 200px"></TimePicker></Col>
        </Row>
      </div>

      <div class="wrap">
        <Row class-name="wrap-name">
          <Col span="24">百度播放素材</Col>
        </Row>
        <Row class-name="wrap-col">
          <Col>更新时间间隔：<input type="number" name="bdAdvRefreshInterval"  class="input-common" v-model="formData.bdAdvRefreshInterval" style="width: 200px" />&nbsp;秒</Col>
        </Row>
      </div>

      <div class="wrap">
        <Row class-name="wrap-name">
          <Col span="24">媒体音量: </Col>
        </Row>
        <Row class-name="wrap-col">
          <Col span="24">
          <div  class="rang-input">
            0 <input type="range" name="volume" min="0" step="1" max="100" required="" v-model="formData.volume" /> {{formData.volume}}
          </div>
          </Col>
        </Row>
      </div>

      <div class="wrap">
        <Row class-name="wrap-name">
          <Col span="24">广告监控</Col>
        </Row>
        <Row class-name="wrap-col">
          <Col span="10">播放时间：<input  type="number" class="input-common" v-model="formData.playShowTime"/>&nbsp;秒&nbsp;</Col>
          <Col span="14">
            <i-switch size="large" v-model="formData.maSwitch">
              <span slot="open">开启</span>
              <span slot="close">关闭</span>
            </i-switch>（注：开启表示广告、监控轮播；关闭只影响广告）
          </Col>
        </Row>
      </div>

      <div class="wrap">
        <Row class-name="wrap-name">
          <Col span="24">配置文件备注</Col>
        </Row>
        <Row class-name="wrap-col">
          <Col span="20"><span class="star">*</span>备注：<input class="input-common" placeholder="最多输入25个字" v-model="formData.remark" /></Col>
        </Row>
      </div>

      <div class="commit-btns">
        <Row>
          <Button type="info" @click="commitConfig">保存配置文件</Button>
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
        canSubmit: true,
        formData: {
          type: 0,
          name: '',
          version: '',
          startupTime: '',
          closeTime: '',
          bdAdvRefreshInterval: 0,
          volume: 15,
          playShowTime: 0,
          maSwitch: 0,
          remark: ''
        }
      };
    },
    mounted() {

    },
    methods: {
      changeTimer (time) {
        if (time && time.length >=2) {
          this.formData.startupTime = time[0]
          this.formData.closeTime = time[1]
        }
      },
      clearTimer () {
        this.formData.startupTime = ''
        this.formData.closeTime = ''
      },
      commitConfig () {
        this.formData.maSwitch = this.formData.maSwitch ? 1 : 0
        this.verifyData()
        this.canSubmit && axios
          .post("/devman/config", this.formData)
          .then(res => {
            if (res.code === 0) {
              this.$Modal.success({
                content: '提交成功',
                onOk: () => {
                  this.$router.push({name:'source'})
                }
              });
            } else {
              this.$Modal.error({
                content: '提交失败！'
              });
            }
          });
      },
      verifyData () {
        if (this.formData.name.trim() === '') {
          this.canSubmit = false;
          this.showErrorModel('请填写配置名！')
          return
        }
        if (this.formData.remark.trim() === '') {
          this.canSubmit = false;
          this.showErrorModel('请填写配置文件备注！')
          return
        }
        if ( ( !this.formData.startupTime &&  !this.formData.closeTime) && parseInt(this.formData.volume) <= 0 && parseInt(this.formData.playShowTime) <= 0 && parseInt(this.formData.bdAdvRefreshInterval) <= 0) {
          this.canSubmit = false;
          this.showErrorModel('运行定时，百度播放素材更新时间间隔，媒体音量，广告监控至少完整填写一项！')
          return
        }
        this.canSubmit = true
      },
      showErrorModel (content) {
        this.$Modal.error({
          content: content
        })
      },
      cancelConfig () {
        this.$router.push({name:'source'})
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .rang-input
    color: #666
  .rang-input input[type="range"] {
    -webkit-appearance: none;
    background-color: rgba(115, 133, 159, 0.2);
    height: 4px;
  }
  .star
    color: red;
    font-size: 14px;
    padding:0 2px 0 0;
  .rang-input input[type=range]:focus {
    outline: none;
  }

  .rang-input input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border-radius: 15px;
    background: #FFF;
    width: 15px;
    border:1px solid #e1e1e1;
    height: 15px;
  }
  .input-common
    height: 26px;
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
