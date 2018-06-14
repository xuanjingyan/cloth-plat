<template>
    <Cascader :data="data" v-model="value2" change-on-selectref="value2" placeholder="请选择地址" change-on-select @on-change="handleChange"></Cascader>
</template>
<script>
    import axios from '../../axios/common.js';
    export default {
        props: {
            adcode: Array,
            disabled: Boolean,
            value: Boolean
        },
        data () {
            return {
                value2: [],
                data: []
            }
        },
        methods: {
            getData (iData) {
                return iData.map((city,index) => ({
                        label: city.name,
                        value: city.name,
                        children: city.list?this.getData(city.list):[]
                    }))
            },
            handleChange (value, selectedData) {
                // this.text = selectedData.map(o => o.label).join(', ');
                this.value2 =  value;
                this.$emit('cityMsg', this.value2)
            }
        },
         watch:{
            'adcode':function(value){
                this.value2 =  value;
            }
        },
        mounted(){    
                
            axios.get(`/pointCart/searchArea`,{
                params:{
                    areaType:'province',
                    cartNumber:this.$store.state.pointType ? this.$store.state.cartNumber :'',
                    subLength: 3
                }
            }).then(data => {
                let iData = data.data;
                this.data = this.getData(iData);
                this.$nextTick(()=>{
                     this.value2=this.adcode;
                })
            })
        }
    }
</script>
