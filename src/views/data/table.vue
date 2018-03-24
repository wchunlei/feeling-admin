<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <div style="margin: 20px"><span>总注册用户数： </span>{{ data.alluser }}</div>
            <div style="margin: 20px"><span>昨日注册用户数： </span>{{ data.yesterdayuser }}</div>
            <div style="margin: 20px"><span>今天注册用户数： </span>{{ data.todayuser }}</div>
            <div style="margin: 20px"><span>总充值（元）： </span>{{ data.allpay }}</div>
            <div style="margin: 20px"><span>昨日充值（元）： </span>{{ data.yesterdaypay }}</div>
            <div style="margin: 20px"><span>今天充值（元）： </span>{{ data.todaypay }}</div>
        </div>
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
          console.log()
        },
        methods: {
            getList() {
                /*$.ajax({
                    "url":"http://111.230.181.40:9000",
                    "type": "GET",
                    //'data': '{}',
                    "dataType": "json",
                    success:function(data){
                        if(data.code==200){
                            alert()
                        }
                    },
                    error:function (data) {
                        console.log('_请求失败_');
                    }
                })*/
                let _this = this;
                fetch("http://111.230.181.40:9000", {
                    method: 'GET',
                    mode: "cors",
                    type: 'json',
                    //credentials: 'include',
                    headers:{
                        //'Accept': 'application/json',
                        "Content-Type":"multipart/form-data",
                        //"Content-Type":"application/x-www-form-urlencoded",
                        //"Content-type": "text/plain",
                        //"Access-Control-Allow-Origin": '*'
                        //'Access-Control-Allow-Credentials':'false',
                    }
                }).then(function(response){
                    console.log(response)
                    if(response.status!=200){
                        console.log("存在一个问题，状态码为："+response);
                        return;
                    }
                    //let str = JSON.stringify(response);
                    response.json().then(function(data){
                        console.log(data);
                        _this.data.alluser = data.alluser;
                        _this.data.yesterdayuser = data.yesterdayuser;
                        _this.data.todayuser = data.todayuser;
                        _this.data.allpay = data.allpay;
                        _this.data.yesterdaypay = data.yesterdaypay;
                        _this.data.todaypay = data.todaypay;
                    });
                }).catch(function(err){
                    console.log("Fetch错误123aa:"+err);
                })
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


