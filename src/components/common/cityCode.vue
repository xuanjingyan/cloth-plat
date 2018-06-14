<template>
<div>
    <Cascader :data="data" v-model="value2" change-on-selectref="value2" placeholder="请选择地址" :disabled="disabled" change-on-select @on-change="handleChange"></Cascader>
</div>
</template>
<script>
import axios, { AS } from "@/axios/common";
export default {
  props: {
    adcode: Array,
    disabled: Boolean,
    value: Boolean
  },
  data() {
    return {
      value2: [],
      data: [],
      startNumber:true
    };
  },
  methods: {
    getData(iData) {
      return iData.map((city, index) => ({
        label: city.name,
        value: this.value ? city.name : city.adcode,
        children: city.districts ? this.getData(city.districts) : []
      }));
    },
    handleChange(value, selectedData) {
      this.value2 = value;
      this.$emit("cityMsg", this.value2);
    }
  },
  watch:{
    'adcode':function(value){
      if(!this.startNumber)
        this.value2 =  value;
    }
  },
  mounted() {

    axios
      .get(
        `https://gwapi.tincere.group/comaddress/address/config/district?extensions=base&keywords=100000&subdistrict=3`
      )
      .then(data => {
        if (data.errorcode === 0) {
          let iData = data.data.districts;
          let country = {
          	adcode:"100000",
			name:"全国"
          };
          iData.unshift(country);
          this.data = this.getData(iData);
        }
        this.$nextTick(() => {
          this.startNumber = false;
          this.value2 = this.adcode || [];
        });
      });
  }
};
</script>
