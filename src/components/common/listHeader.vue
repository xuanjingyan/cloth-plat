<template>
    <Row class="listHeader">
    <!--<Col span="6" class="left" :class="{commonStyle:$route.path.includes('/index')?false : true}" ><span>{{getInfo.name}}</span>-->
          <!--&lt;!&ndash; <span class="englishFont">{{getInfo.en}}</span> &ndash;&gt;-->
        <!--</Col>-->
        <!--<Col span="12" class="center"  v-if="getInfo.showSteps">-->
            <!--<Steps :current="getInfo.step">-->
                <!--<Step title="选择点位"></Step>-->
                <!--<Step title="查看点位" class="step-center"></Step>-->
                <!--<Step title="确认点位" class="step-center"></Step>-->
                <!--<Step title="确认订单"></Step>-->
            <!--</Steps>-->
        <!--</Col>-->
        <!--<Col :span="getInfo.showSteps?6:18" class="right">-->
            <!--<span v-if="getInfo.showBackBtn" >点击<router-link :to="$store.state.publicPath">这里</router-link>返回列表 </span>-->
            <!--<span v-if="!getInfo.showBackBtn" >-->
              <!--<router-link to="/index">-->
                <!--<i class="icon iconfont icon-qiehuanyingyong qieHuanCommon" :class="{changeIndexColor:$route.path.includes('/index')}"></i>-->
              <!--</router-link>-->
              <!--<router-link :to="$route.path.includes('/index')?(getInfos?( getInfos[0].children[0] ? getInfos[0].children[0].path : getInfos[0].path):''):$route.path">-->
                <!--<i class="icon iconfont icon-liebiao1 qieHuanCommon"  :class="{changeIndexColor:!$route.path.includes('/index')}"></i>-->
              <!--</router-link>-->
            <!--</span>-->
        <!--</Col>-->
    </Row>
</template>

<script>
export default {
  data() {
    return {
      header: this.$store.state.headerInfo
    };
  },
  computed: {
    getInfos(){
      return this.$store.state.menuData.data
    },
    getInfo() {
      return this.$store.state.headerInfo;
    }
  }
};
</script>

<style>
.listHeader .changeIndexColor{
  color: #d5654b !important
}
.listHeader.ivu-row {
  min-width: 855px;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.11);
  font-family: adobe;
  display: flex;
  width: 100%;
  z-index: 1
}
.listHeader .qieHuanCommon{
  color: #bcbcbc;
  font-size: 20px
}
.listHeader .englishFont{
  color:#bcbcbc;
  font-size:15px
}
.listHeader .ivu-steps-item.ivu-steps-status-process .ivu-steps-title {
  color: #d5654b;
  font-size: 12px
}
.listHeader .ivu-steps-status-process .ivu-steps-tail {
  color: #d5654b;
  font-size: 12px
}
.listHeader > .left,
.listHeader > .right {
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
}
.listHeader > .left > span:nth-of-type(1) {
  font-size: 16px;
  color: #2d2f3a;
  letter-spacing: 0;
  padding-right: 4px;
}
.listHeader .ivu-steps {
  margin-top: 10px;
  margin-left: 10%;
}
.listHeader > .right {
  float: right;
  text-align: right;
  font-size: 16px;
  color: #2d2f3a;
  letter-spacing: 0;
}
.listHeader .commonStyle{
  padding-left : 40px
}
.listHeader .ivu-steps .ivu-steps-title {
  font-size: 12px
}
.listHeader .ivu-steps .ivu-steps-head-inner{
  width: 18px;
  height: 18px;
  line-height: 16px;
  margin-right: 4px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 50%;
  font-size: 12px;
}
.listHeader .ivu-steps .ivu-steps-tail {
    top: 9px;
}
.listHeader .ivu-steps-item {
    margin-top: 5px;
}
.listHeader .ivu-steps .ivu-steps-head-inner>.ivu-steps-icon.ivu-icon{
  font-size: 16px;
}
/* .listHeader .ivu-steps .step-center .ivu-steps-title {
   margin-left: -22px;
} */
</style>
