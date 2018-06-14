<style lang="stylus">
    .demo-spin-icon-load
        animation: ani-demo-spin 1s linear infinite;

    .demo-spin-col
        font-family: adobe;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        width: 100%;
        height: 100%
        .ivu-spin-fix 
            transition  all 1s
            background-color rgba(55,55,55,.5);
    
    .ivu-spin-fix .ivu-spin-main 
        height: auto;
    
     @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }

</style>
<template>
    <div class="demo-spin-col" v-if="$store.state.loading">
        <Spin fix>
            <Icon type="load-c" size=28 style="font-weight:600" class="demo-spin-icon-load"></Icon>
        </Spin>
    </div>
   
</template>
<script>
    export default {
        
    }
</script>