<template>
    <Page 
        :total="$parent.dataCount" 
        show-total 
        style="margin:20px 0" 
        :pageSize="$parent.pageSize" 
        show-elevator 
        @on-change="changepage">
    </Page>
</template>

<script>
export default {
    data(){
        return {
           
        }
    },
    methods:{
        changepage(index){
            var _start = ( index - 1 ) * (this.$parent.pageSize);
            var _end = index * (this.$parent.pageSize);
            this.$parent.data = this.$parent.ajaxHistoryData.slice(_start,_end);
        },
    },
    mounted(){
        this.changepage(1)
    }
}
</script>

<style>

</style>
