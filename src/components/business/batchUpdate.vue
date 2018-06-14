<template>
  <article class="dms-container">
    <header class="dms-nav-shell">
      <span>当前位置：</span><a>软件列表</a>
    </header>
    <section class="dms-list-container">
      <div class="header">
        <p class="title">
          升级范围
        </p>
        <div class="sec_content">
          <city-code @cityMsg="getCityCode" :value="false" style="width: 300px;">
          </city-code>
          <Select v-model="deviceType" style="width:200px" placeholder="文件类型" @on-change="deviceChange">
                <Option v-for="item in deviceTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
      </div>
      <div class="btn_wrap">
        <Button @click="sure" type="info">确定</Button>
        <Button @click="doCancel" type="info">取消</Button>
      </div>
      <Table :loading="loading" @on-selection-change="selectItem" @on-select-all="selectAll" border :columns="columns" :data="data"></Table>
      <div class="page-list">
        <Page :total="total" @on-change="pageChange" @on-page-size-change="pageSizeChange" show-sizer show-elevator :page-size-opts="pageOpts"></Page>
      </div>

      <Modal
        v-model="updateModel"
        @on-ok="update"
        @on-cancel="cancel">
        <p>确认对全国区域进行升级吗？</p>
      </Modal>
    </section>
	</article>
</template>

<script>
	import cityCode from "@/components/common/cityCode";
	import axios from "@/axios/common";
	export default {
		name: "batchUpdate",
		components: {
			cityCode
		},
		data() {
			return {
        updateModel: false,
				address: "",
				pageOpts: [10, 30, 50, 100], //分页条数选项
				pageSize: 10, //每页显示多少条
				pageNum: 1, //第几页
				total: 0, //表格数据总条数
				loading: false,
				notice: false,
				selectList: [],
				tip: "",
				deviceType:"",
	    		deviceTypeList:[
	    			{
	    				value:" ",
	    				label:"全部"
	    			},
	    			{
	    				value:"0",
	    				label:"配置"
	    			},
	    			{
	    				value:"1",
	    				label:"软件包"
	    			}
	    		],
				columns: [{
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
            key: "type",
            render:(h, params) => {
              return params.row[params.column.key] === 1 ? '软件包' : '配置'
            }
					},
					{
						title: '版本号',
						key: 'version'
					}
				],
				data: []
			}
		},
		methods: {
			//选择地区
			getCityCode(val) {
				this.address = val;
			},
			//选择设备类型和状态
	    	deviceChange(){
		    	this.getData();
		    },
			//获取数据
			getData() {
				let that = this;
				this.loading = true;
				axios
					.get("/devman/resource", {
						params: {
							type:this.deviceType,
							page: this.pageNum,
							rows: this.pageSize
						}
					})
					.then(res => {
						if(res.code === 0) {
							that.data = res.data.rows;
							that.total = res.data.total;
						}
						this.loading = false;
					});
			},
			//第几页
			pageChange(val) {
				this.pageNum = val;
				this.getData();
			},
			//每页显示几条
			pageSizeChange(val) {
				this.pageSize = val;
				this.getData();
			},
			//选中表格某一项
			selectItem(val) {
				this.selectList = val;
			},
			//全选
			selectAll(val) {
				this.selectList = val;
			},
			//确定
      doCancel () {
        this.$router.push("/business");
      },
      update () {
        axios
          .post("/devman/areaUpdate?adcodes=" + this.adcodes + "&resourceids=" + this.resourceID)
          .then(res => {
            if(res.code === 0) {
              this.$Modal.success({
                content: res.messge || '提交成功',
                onOk: () => {
                  this.$router.push("/business");
                }
              });
            } else {
              this.$Modal.error({
                content: res.message || '提交失败！'
              });
            }
          })
      },
			sure() {
				let len = this.selectList.length;
				let resourceID = "";
				this.adcodes = this.address?this.address[this.address.length - 1]:"100000"
				if(len) {
					this.selectList.map(res => {
						resourceID += res.resourceId + ",";
					});
					this.resourceID = resourceID.replace(/,$/, "");
					if (this.adcodes === 100000) {
            this.updateModel = true
          } else {
            this.update()
          }
				} else {
          this.$Modal.warning({
            content: "请勾选表格中的某项..."
          });
				}
			},
			//取消
      cancel() {
        this.updateModel = false
			}
		},
		beforeMount() {
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

  .dms-container
    background: #FFF;
    height:auto;
    .dms-nav-shell
      width:96%;
      margin: 0 auto
      padding-top:20px;
      a
        color:#333;
	.header {
		width: 100%;
		height: 60px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.title {
		font-size: 16px;
		width: 80px;
		text-align: center;
	}

	.sec_content {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.sec_content div {
		margin-right: 10px;
	}

	.page-list {
		margin-top: 20px;
		display: flex;
		justify-content: flex-end;
	}
</style>
