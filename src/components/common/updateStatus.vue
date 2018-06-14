<template>
<div>
    <Cascader :data="data" v-model="value2" placeholder="升级状态" :disabled="disabled" @on-change="handleChange"></Cascader>
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
      startNumber:true,
      data: [{
        value: '下屏master',
        label: '下屏master',
        children: [
          {
            value: 0,
            label: '失败'
          },
          {
            value: 1,
            label: '成功'
          },
          {
            value: 2,
            label: '升级中'
          }
        ],
      },{
        value: '下屏slave ',
        label: '下屏slave ',
        children: [
          {
            value: 3,
            label: '失败'
          },
          {
            value: 4,
            label: '成功'
          },
          {
            value: 5,
            label: '升级中'
          }
        ]
      },{
        value: '中屏slave ',
        label: '中屏slave ',
        children: [
          {
            value: 6,
            label: '失败'
          },
          {
            value: 7,
            label: '成功'
          },
          {
            value: 8,
            label: '升级中'
          }
        ]
      },{
        value: '中屏master',
        label: '中屏master',
        children: [
          {
            value: 9,
            label: '失败'
          },
          {
            value: 10,
            label: '成功'
          },
          {
            value: 11,
            label: '升级中'
          }
        ]
      },{
        value: 'terminal',
        label: 'terminal',
        children: [
          {
            value: 12,
            label: '失败'
          },
          {
            value: 13,
            label: '成功'
          },
          {
            value: 14,
            label: '升级中'
          }
        ]
      },{
        value: 'terminal_service',
        label: 'terminal_service',
        children: [
          {
            value: 15,
            label: '失败'
          },
          {
            value: 16,
            label: '成功'
          },
          {
            value: 17,
            label: '升级中'
          }
        ]
      }]
    };
  },
  methods: {
    handleChange(value, selectedData) {
      this.value2 = value;
      this.$emit("updateStatus", this.value2);
    }
  },
  mounted() {

  }
};
</script>
