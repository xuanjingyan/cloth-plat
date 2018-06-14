<template>
<div class="operatePageK">
      <div class="contentK">
        <div class="home">
            
            <div class="wrap">
                <div v-if="$route.path.includes('agenthome')">
                    <Button type="primary" @click="getPopup">充值</Button>
                </div>
                <Row>
                    <Col class="gutter-row" span="4" v-if="$route.path.includes('agenthome')">
                        <div id="columnar3">

                        </div>
                    </Col>
                    <Col class="gutter-row" :span="$route.path.includes('agenthome')?10:12">
                        <div id="columnar1" >

                        </div>
                    </Col>
                    <Col class="gutter-row" :span="$route.path.includes('agenthome')?10:12">
                        <div id="columnar2">

                        </div>
                    </Col>
                </Row>
            </div>
            <div class="lastWrap">
                <p class="header">逾期订单</p>
                <Table class="tableStyle" :columns="columns" :data="data"></Table>
            </div>
        </div>
    </div>
    
      <Modal
        v-model="inputModel"
        title="存入保证金" >
        <Form :label-width="80"> 
            <FormItem label="存入金额:">
                <InputNumber placeholder="请输入存入金额" v-model="cash" :min="0"></InputNumber>
            </FormItem>
            <FormItem label="温馨提示:">
                <p >还需要充入<span style="color:#d5654b">{{mostMoney}}</span>元（将冻结保证金转入报备保证金）</p>
            </FormItem>
            
        </Form>
        <p slot="footer">
            <Button type="primary" @click="submit">
                    确认
            </Button>
            </p>
      </Modal>
</div>
</template>

<script>
import echarts from 'echarts';
import moment from 'moment';
import axios,{renderTitle} from "@/axios/common";
export default {
  data(){
    return{
      columns:[{
          title: '序号',
          type: 'index'
        }, {
          title: '广告名称',
          key: 'adName',
          render:renderTitle
        }, {
          title: '业务员',
          key: 'userName',
          render:renderTitle
        }, 
        {
          title: '客户名称',
          key: 'clientName',
          render:renderTitle
        },{
          title: '应收金额',
          key: 'cash'
        },{
          title: '截至日期',
          key:'expritionTime',
          render:(h,params) => {
            return params.row.expritionTime ? moment(params.row.expritionTime*1000).format('YYYY/MM/DD'):''
            }
        }
      ],
      data:[],
      mostMoney: 0,
      cash:0,
      inputModel:false,
      option2:{
                backgroundColor: '#fff',
                color: [{
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#d5654b' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#D5659E' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                }],
                title: {
                    text: '订单信息',
                    textStyle:{
                        fontFamily:'PingFangSC-Medium',
                        fontSize: 16,
                        fontStyle:'normal',
                        fontWeight:'normal'
                    },
                    left:'center',
                    top:17
                },
    
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function (params) {
                        var tar = params[0];
                        return tar.name + ' : ' + tar.value;
                    }
                },
                grid: {
                    left: '43',
                    right: '42',
                    bottom: '15',
                    containLabel: true
                },
                xAxis: {
                    axisLine:{
                        show:false,
                        lineStyle:{
                            color:'#fofofo'
                        }
                    },
                    type : 'category',
                    splitLine: {show:false},
                    data : ['累计成单','已完结','进行中','逾期'],
                    axisTick:{
                        show:false
                    }
    
                },
                yAxis: {
                    axisLabel:{
                      formatter:'{value}单'
                    },
                    axisLine:{
                      show:false
                    },
                    type : 'value',
                    axisTick:{
                        show:false
                    }
    
                },
                series: [
                    {
                        name: '辅助',
                        type: 'bar',
                        stack:  '总量',
                        itemStyle: {
                            normal: {
                                barBorderColor: 'rgba(0,0,0,0)',
                                color: 'rgba(0,0,0,0)'
                            },
                            emphasis: {
                                barBorderColor: 'rgba(0,0,0,0)',
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                       
                    },
                    {
                        type: 'bar',
                        barWidth : 30,
                        stack: '总量',
                        itemStyle: {
                            normal:{
                                barBorderRadius:100
                            }
    
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data:[1,1,1,1]
                    },
                ]
            },
    option1: {
        backgroundColor: '#fff',
        color: [{
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#d5654b' // 0% 处的颜色
            }, {
                offset: 1, color: '#D5659E' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
        }],
        title: {
            text: '客户信息',
            textStyle:{
                fontFamily:'PingFangSC-Medium',
                fontSize: 16,
                fontStyle:'normal',
                fontWeight:'normal'
            },
            left:'center',
            top:17
        },
  
        tooltip : {
            trigger: 'axis',
            axisPointer : {            
                type : 'shadow'      
            },
            formatter: function (params) {
                var tar = params[0];
                return (tar.name + ':' + tar.value);
            }
        },
        grid: {
            left: '43',
            right: '42',
            bottom: '15',
            containLabel: true
        },
        xAxis: {
            axisLine:{
                show:false,
                lineStyle:{
                    color:'#fofofo'
                }
            },
            type : 'category',
            splitLine: {show:false},
            data : ['报备客户数','成单数','到期数','快到期数'],
            axisTick:{
                show:false
            }
  
        },
        yAxis: {
            axisLabel:{
              formatter:'{value}个'
            },
            axisLine:{
              show:false
            },
            type : 'value',
            axisTick:{
                show:false
            }
  
        },
        series: [
            {
                name: '辅助',
                type: 'bar',
                stack:  '总量',
                itemStyle: {
                    normal: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
  
                    },
                    emphasis: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    }
                }
            },
            {
                type: 'bar',
                barWidth : 30,
                stack: '总量',
                itemStyle: {
                    normal:{
                        barBorderRadius:100
                    }
  
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                }
            }
        ]
    },
    option3 :{
        title: {
            text: '账户信息',
            textStyle:{
                fontFamily:'PingFangSC-Medium',
                fontSize: 16,
                fontStyle:'normal',
                fontWeight:'normal'
            },
            itemGap:20,
            left:'center',
            top:17,
            subtext:0,
            subtextStyle:{
                fontSize:24,
                color:'#d6d6d6',
                fontWeight:'bold'
            }
        },
        color:['#d5654b','#D5659E'],
        tooltip: {
            position:'right',
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            bottom:'50',
            itemWidth:12,
            itemHeight:12,
            data:[{
                name:'冻结保证金'
            },{
                name:'可用资金'
            }]
        },
        series: [
            {
                name:'',
                type:'pie',
                radius: ['30%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'bold',
                            color: '#ccc'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data:[
                    {value:335, name:'冻结保证金'},
                    {value:310, name:'可用资金'},

                ],
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    }
    }
  },
  mounted(){
    
    let _this_ = this;
    const myChart1 = echarts.init( document.getElementById("columnar1") );
    
  //        获取客户信息数据

    
    //订单信息
    const myChart2 = echarts.init( document.getElementById("columnar2") );
    //        获取订单数据
    
    axios.get(`/salemain/${this.$route.path.includes('/agent')?"agent":"saleman"}/order/v2/statistics`).then(function(data){
        
        if( data.errorcode ===0 ){
            const iData =data.data;
            _this_.option2.series[1].data= iData?[iData.completeNumber,iData.finishNumber,iData.proceedNumber,iData.overdueNumber]:[0,0,0,0]
            myChart2.setOption(_this_.option2)
            return iData?iData.completeNumber:0
        }
    }).then(function(completeNumber){
        axios.get(`/salemain/${_this_.$route.path.includes('/agent')?"agent":"saleman"}/homePage`).then(function(data){
            if( data.errorcode ===0 ){
                let iData=data.data;
                _this_.option1.series[1].data=[iData.report||0,completeNumber||0,iData.expire||0,iData.advent||0];
                myChart1.setOption(_this_.option1);
            }
        })
    })
    if(this.$route.path.includes('agenthome')){
        this.getBZ();
    }
    window.onresize = function(){
        myChart1.resize({
            width: document.getElementById("columnar1").offsetWidth
        });
        if(_this_.$route.path.includes('agenthome'))
            echarts.init( document.getElementById("columnar3") ).resize({
                width: document.getElementById("columnar3").offsetWidth
            });
        myChart2.resize({
            width: document.getElementById("columnar2").offsetWidth
        });

    };
    this.getData();
  },
  watch:{ 
      'option3.title.subtext':function(){
          if(this.$route.path.includes('agenthome')){
            const myChart3 = echarts.init( document.getElementById("columnar3") );
            myChart3.setOption(this.option3);
          }
      },
  },
  methods:{
     
      getBZ(){
           //        饼状图
        const _this_= this;
        axios.get(`/salemain/agent/v2/totalcash`).then(function(data){
            let Data=data.data;
            if( data.errorcode ===0 ){
                _this_.option3.title.subtext=
                    (Data.cash+Data.cashEnable).toLocaleString('ja-JP')||1000;
                _this_.option3.series[0].data[0].value=Data.cash;
                _this_.option3.series[0].data[1].value=Data.cashEnable;
                
            }
        }).then(()=>{
                const myChart3 = echarts.init( document.getElementById("columnar3") );
                myChart3.setOption(_this_.option3);
          });
      },
      getData(){
          axios.get(`/salemain/${this.$route.path.includes('/agent')?'agent':'saleman'}/v2/verdueorder`).then((data) => {
              if(data.errorcode === 0){
                  this.data = data.data.list
              }
          })
      },
      getPopup(){
          axios.get('/salemain/agent/v2/popup').then((data) => {
              if(data.errorcode === 0){
                    if(data.data === 0)
                        this.$Notice.warning({
                            title:"资金充足不需要充值！",
                            duration:2
                        })
                    else{
                        this.mostMoney = data.data;
                        this.inputModel = true;
                    }

              }
          })
      },
      submit(){
        axios({
            url:'/salemain/agent/v2/depositcash',
            method:"post",
            params:{  cash:this.cash}
        }).then((data) =>{
              if(data.errorcode === 0){
                    this.inputModel = false;
                    this.cash = 0;
                    this.getBZ();
                    this.$Notice.success({
                        title:data.errormsg,
                        duration:2
                    })
              }
          })
      }
  }
}
</script>

<style scoped lang="stylus">
    .gutter-row
        height 400px
        #columnar1,#columnar2
            height: 364px
        
        #columnar3
            height: 364px;
            min-width: 100px;

</style>