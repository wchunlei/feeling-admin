<template>
    <div class="app-container calendar-list-container">
        <!--<div class="filter-container">
            <div style="margin: 20px"><span>总注册用户数： </span>{{ data.alluser }}</div>
            <div style="margin: 20px"><span>昨日注册用户数： </span>{{ data.yesterdayuser }}</div>
            <div style="margin: 20px"><span>今天注册用户数： </span>{{ data.todayuser }}</div>
            <div style="margin: 20px"><span>总充值（元）： </span>{{ data.allpay }}</div>
            <div style="margin: 20px"><span>昨日充值（元）： </span>{{ data.yesterdaypay }}</div>
            <div style="margin: 20px"><span>今天充值（元）： </span>{{ data.todaypay }}</div>
        </div>-->
        <div class="block">
            <span class="demonstration">带快捷选项</span>
            <el-date-picker
                    v-model="value4"
                    type="datetimerange"
                    :picker-options="pickerOptions2"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
            </el-date-picker>
        </div>
        <div id="myChart" :style="{width: '1600px', height: '1200px'}"></div>
    </div>
</template>

<script type="text/ECMAScript-6">
    import { parseTime } from 'utils';
    import Upload from 'components/Upload/singleImage3';
    import { actorUpdate } from 'api/actor';
    import { actorstatus } from 'api/actor';
    import { actordel } from 'api/actor';
    import { userSearch } from 'api/story';
    import { roomlist } from 'api/room';
    import { uproom } from 'api/room';
    import { sortroom } from 'api/room';
    import { delroom } from 'api/room';
    import { actorList } from 'api/actor';
    import { scriptlist } from 'api/story';
    import { rechargeanaly } from 'api/reward';

    const calendarTypeOptions = [
        { key: 'CN', display_name: '中国' },
        { key: 'US', display_name: '美国' },
        { key: 'JP', display_name: '日本' },
        { key: 'EU', display_name: '欧元区' }
    ];

    // arr to obj
    const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
        acc[cur.key] = cur.display_name;
        return acc
    }, {});

    export default {
        components: { Upload },
        name: 'table_demo',
        data() {
            return {
                pickerOptions2: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value4: '',
                timeRange: {
                    start: '',
                    end: '',
                    day: []
                },
                dateString: '',
                data: {
                    alluser: '',
                    yesterdayuser: '',
                    todayuser: '',
                    allpay: '',
                    yesterdaypay: '',
                    todaypay: ''
                },
                isColor: true,
                userLIstOptions: [],
                actorOptions: [],
                scriptData: [],
                disable: true,
                roomsort: '0',
                list: [],
                privateOptions: [{
                    value: '0',
                    label: '默认'
                },{
                    value: '1',
                    label: '1'
                },{
                    value: '2',
                    label: '2'
                },{
                    value: '3',
                    label: '3'
                },{
                    value: '4',
                    label: '4'
                },{
                    value: '5',
                    label: '5'
                },{
                    value: '6',
                    label: '6'
                },{
                    value: '7',
                    label: '7'
                }],
                total: null,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 10,
                    importance: undefined,
                    title: undefined,
                    name: undefined,
                    gender: undefined,
                    status: undefined,
                    priceType: undefined,
                    //sort: '+id'
                },
                Query: {
                    limit: 100000,
                },
                temp: {
                    id: undefined,
                    importance: 0,
                    remark: '',
                    timestamp: 0,
                    title: '',
                    type: '',
                    status: 'published'
                },
                importanceOptions: [1, 2, 3],
                calendarTypeOptions,
                sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
                //statusOptions: ['0', '1', ''],
                nameOptions: [{
                    value: '1',
                    label: '佳佳'
                }, {
                    value: '2',
                    label: '娜美'
                }],
                sexOptions: [{
                    value: '1',
                    label: '男'
                }, {
                    value: '2',
                    label: '女'
                }],
                statusOptions: [{
                    value: '0',
                    label: '上架'
                }, {
                    value: '1',
                    label: '下架'
                }, {
                    value: '',
                    label: '全部'
                }],
                priceTypeOptions: [{
                    value: '0',
                    label: '付费'
                }, {
                    value: '1',
                    label: '免费'
                }, {
                    value: '',
                    label: '全部'
                }],
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: '编辑',
                    create: '创建'
                },
                dialogPvVisible: false,
                dialogDel: false,
                flag: false,
                pvData: [],
                showAuditor: false,
                tableKey: 0
            }
        },
        created() {
            this.getList();
        },
        mounted () {
            console.log();
            this.drawLine();
        },
        watch: {
            "value4" (newval,oldval) {
                if (newval[0]) {
                    this.timeTool(newval[0]);
                    this.timeRange.start = this.dateString;
                }
                if (newval[1]) {
                    this.timeTool(newval[1]);
                    this.timeRange.end = this.dateString;
                }
                console.log(this.timeRange.start,this.timeRange.end)
                if (this.timeRange.start < this.timeRange.end) {
                    let len = parseInt((newval[1].getTime() - newval[0].getTime())/(3600*1000*24));
                    for(let i=0; i<len+1; i++) {
                        this.timeRange.day[i] = this.timeTool(new Date(newval[0].getTime() + (3600*1000*24)*i));
                        console.log(this.timeRange.day[i])
                    }
                    //console.log(this.timeRange.day[0])
                }
                this.drawLine();
            }
        },
        methods: {
            timeTool (date){
                let year=date.getFullYear(),
                        month=date.getMonth()+ 1,
                        day=date.getDate()
                //hour=date.getHours(),
                //minutes=date.getMinutes(),
                //seconds=date.getSeconds();
                //this.dateString = year+'-'+(month>=10?+month:"0"+month)+"-"+(day>=10? day :'0'+day)+' '+(hour>=10?+hour:"0"+hour)+':'+(minutes>=10?+minutes:"0"+minutes)+':'+(seconds>=10?+seconds:"0"+seconds);
                return this.dateString = year+'-'+(month>=10?+month:"0"+month)+"-"+(day>=10? day :'0'+day);
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'));
                // 绘制图表
                /*var data2 = {
                 "name": "0 打招呼",
                 "value": 'http://192.168.1.43:8000/upload/27/297d3fdedd2c8981ec7aa15981b06df2.jpg',
                 "children": [
                 {
                 "name": "1 洗内裤",
                 "children": [
                 {
                 "name": "11白天洗",
                 "children": [
                 {
                 "name": "111厕所洗",
                 "children": [
                 {"name": "IScaleMap", "value": 'http://192.168.1.43:8000/upload/27/297d3fdedd2c8981ec7aa15981b06df2.jpg'}
                 ]
                 },
                 {
                 "name": "112在厨房洗",
                 "children": [
                 {"name": "IScaleMap", "value": 2105}
                 ]
                 }
                 ]
                 },
                 {
                 "name": "12晚上洗",
                 "children": [
                 {
                 "name": "121在客厅洗",
                 "children": [
                 {"name": "IScaleMap", "value": 2105}
                 ]
                 },
                 {
                 "name": "112在厨房洗",
                 "children": [
                 {"name": "IScaleMap", "value": 2105}
                 ]
                 }
                 ]
                 }
                 ]
                 }
                 ]
                 };*/
                //console.log(myChart)
                let dataX = this.timeRange.day;
                let str = '元';
                myChart.setOption({
                    title: {
                        text: '充值趋势',
                        subtext: '纯属虚构',
                        padding: [5, 150]
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['总充值（元）','充值用户数','ARPU值']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: dataX
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} ' + str
                        }
                    },
                    series: [
                        {
                            name:'充值用户数',
                            type:'line',
                            data:[11, 11, 15, 13, 12, 13, 10],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'总充值（元）',
                            type:'line',
                            data:[10, 20, 30, 40, 50, 60, 70],
                            markPoint: {
                                data: [
                                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'},
                                    [{
                                        symbol: 'none',
                                        x: '90%',
                                        yAxis: 'max'
                                    }, {
                                        symbol: 'circle',
                                        label: {
                                            normal: {
                                                position: 'start',
                                                formatter: '最大值'
                                            }
                                        },
                                        type: 'max',
                                        name: '最高点'
                                    }]
                                ]
                            }
                        }
                    ]
                });

                /*myChart.on('click', function (params) {
                 // 控制台打印数据的名称
                 console.log(params);
                 //window.location.href = params.value;
                 window.open(params.value);
                 });*/
            },
            getList() {
                this.listLoading = true;
                let rechargedata = {
                    begintime: '2017-01-02 00:00:00',
                    endtime: '2018-02-19 23:59:59',
                    type: '2'
                };
                rechargeanaly(rechargedata).then(response => {
                    console.log(response)
                    //逆序显示
                    //this.list = response.data.content.reverse();
                    this.list = response.data.content;
                    for (let i=0; i<response.data.content.length; i++) {
                        this.list[i].ids = i+1;
                    }
                    this.total = response.data.total;
                    for (let i=0; i< response.data.content.length; i++) {
                        if(response.data.content[i].cost == 1) {
                            this.list[i].price = "免费";
                        }
                    }
                    for (let i=0; i< response.data.content.length; i++) {
                        this.list[i].disable = false;
                        if (response.data.content[i].status == "1" && response.data.content[i].configtime == '0000-00-00 00:00:00') {
                            this.list[i].configtime = "未设置";
                        } else {
                            this.list[i].configtime = response.data.content[i].configtime;
                        }
                    }
                    for (let i=0; i<response.data.content.length; i++) {
                        for ( let j=0; j<this.actorOptions.length; j++) {
                            if (response.data.content[i].actorid == this.actorOptions[j].value) {
                                this.list[i].name = this.actorOptions[j].label;
                            }
                        }
                    }
                    for (let i=0; i<response.data.content.length; i++) {
                        if(response.data.content[i].status == 0) {
                            this.list[i].status = '上架'
                        }
                        if(response.data.content[i].status == 1) {
                            this.list[i].status = '下架'
                        }
                    }
                    for (let i=0; i<response.data.content.length; i++) {
                        if(response.data.content[i].vstatus == 0) {
                            this.list[i].vstatus = '配置中'
                        }
                        if(response.data.content[i].vstatus == 1) {
                            this.list[i].vstatus = '配置失败'
                        }
                        if(response.data.content[i].vstatus == 2) {
                            this.list[i].vstatus = '配置成功'
                        }
                    }
                    this.listLoading = false;
                })
                this.listLoading = false;
            },
        }
    }
</script>

<style>
    .activeColor {
        background: #13ce66;
    }
    .pagination-container {
        position: fixed;
        top: 90%;
    }
</style>


