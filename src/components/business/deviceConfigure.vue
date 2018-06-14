<template>
	<article class="dms-container">
    <header class="dms-nav-shell">
      <span>当前位置：</span><a>设备配置</a>
    </header>
    <section class="dms-list-container">
      <div class="btn_wrap">
        <Button type="info" @click="sure" >确定</Button>
        <Button type="info" @click="cancle" >取消</Button>
      </div>
      <Table :loading="loading" @on-selection-change="selectItem" @on-select-all="selectAll" border :columns="columns" :data="data" stripe></Table>
      <div class="page-list">
          <Page :total="total" @on-change="pageChange" @on-page-size-change="pageSizeChange" show-sizer show-elevator :page-size-opts="pageOpts"></Page>
      </div>
      <Modal v-model="notice" width="200">
          <p style="text-align: center;">{{ tip }}</p>
      </Modal>
    </section>
	</article>
</template>

<script>
	import axios from "@/axios/common";
  import moment from 'moment';
	export default{
		name:"deviceConfigure",
		data(){
			return{
				pageOpts:[10,30,50,100],//分页条数选项
	    		pageSize:10,//每页显示多少条
	    		pageNum:1,//第几页
	    		total:0,//表格数据总条数
	    		loading:false,
	    		notice:false,
	    		selectList:[],
	    		tip:"",
				columns:[
					{
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '文件名',
                        key: 'name'
                    },
                    {
                        title: '文件类型',
                        key: 'type',
                        render:(h, params) => {
                          return params.row[params.column.key] === 1 ? '软件包' : '配置'
                        }
                    },
                    {
                        title: '版本号',
                        key: 'version'
                    },
                    {
                        title: '上传时间',
                        key: 'createTime',
                        render:(h, params) => {
                          return  moment.unix(params.row[params.column.key]).format("YYYY-MM-DD HH:MM:SS");
                        }
                    },
                    {
                        title: '版本说明',
                        key: 'remark'
                    }
                ],
				data:[]
			}
		},
		methods:{
		//获取数据
    	getData(){
    		let that = this;
    		this.loading = true;
    		axios
          .get("/devman/resource", {
            params: {
            	type:+this.$route.params.type,
            	page:this.pageNum,
            	rows:this.pageSize
            }
          })
          .then(res => {
            if(res.code === 0){
            	that.data = res.data.rows;
            	that.total = res.data.total;
            }
    		this.loading = false;
          });
    	},
    	//第几页
    	pageChange(val){
    		this.pageNum = val;
    		this.getData();
    	},
    	//每页显示几条
    	pageSizeChange(val){
    		this.pageSize = val;
    		this.getData();
    	},
    	//选中表格某一项
    	selectItem(val){
    		this.selectList = val;
    	},
    	//全选
    	selectAll(val){
    		this.selectList = val;
    	},
    	//确定
    	sure(){
    		let len = this.selectList.length;
	    	let resourceID = "";
	    	let mac = sessionStorage.getItem("mac");
	    	if(len){
	    		this.selectList.map(res=>{
	    			resourceID += res.resourceId + ",";
	    		});
	    		resourceID = resourceID.replace(/,$/,"");
	    		axios
	    		.post("/devman/publish?macs="+mac+"&resourceIds="+resourceID)
		          .then(res => {
		            if(res.code === 0){
                  this.$Modal.success({
                    content: res.messge || '提交成功',
                    onOk: () => {
                      this.$router.push("/business");
                    }
                  });
		            }else{
                  this.$Modal.error({
                    content: res.message || '提交失败！'
                  });
		            	this.notice = true;
		            }
		          });
	    	}else{
	    		this.tip = "请勾选表格中的某项...";
	    		this.notice = true;
	    	}
    	},
    	//取消
    	cancle(){
    		this.$router.push("/business");
    	}
	},
	beforeMount(){
		this.getData()
	}

	}
</script>

<style lang="stylus">
  .dms-container
    background: #FFF;
    height:auto;
    .dms-nav-shell
      width:96%;
      margin: 0 auto
      padding-top:20px;
      a
        color:#333;
    .dms-list-container
      color:#000;
      width: 96%;
      margin:0 auto;
      padding-top:5px;
	.btn_wrap
    margin: 20px 0 10px 0;
  .page-list
    margin-top: 20px;
    margin-bottom: 30px
    display: flex;
    justify-content: flex-end;
</style>
