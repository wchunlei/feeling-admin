<template>
    <div class="app-container calendar-list-container">

        <el-table v-if="showTable" :key='tableKey' :data="list" v-loading.body="listLoading" border fithighlight-current-row style="width: 100%" max-height="500">

            <el-table-column align="center" label="序号" width="500" prop="id">
                <template scope="scope">
                    <!--<span style="color:#337ab7;"><router-link :to="{ path: '/actor/form/' + scope.row.id }">{{scope.row.id}}</router-link></span>-->
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column v-if="false" align="center" label="主角id" width="500" prop="actorid">
                <template scope="scope">
                    <!--<span style="color:#337ab7;"><router-link :to="{ path: '/actor/form/' + scope.row.id }">{{scope.row.id}}</router-link></span>-->
                    <span>{{scope.row.actorid}}</span>
                </template>
            </el-table-column>

            <el-table-column width="550px" align="center" label="主角" prop="actor">
                <!--<template scope="scope">
                  <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
                </template>-->
                <template scope="scope">
                    <span>{{scope.row.actor}}</span>
                    <!--<span style="color:#337ab7;"><router-link :to="{ path: '/help/rewardFormInfo/' + scope.row.actorid }">{{scope.row.actor}}</router-link></span>-->
                </template>
            </el-table-column>

            <el-table-column min-width="550px" align="center" label="快捷操作" prop="operate">
                <!--<template scope="scope">
                  <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
                </template>-->
                <template scope="scope">
                    <!--<span>{{scope.row.operate}}</span>-->
                    <!--<span style="color:#337ab7;"><router-link :to="{ path: '/help/rewardForm' }">{{scope.row.operate}}</router-link></span>-->
                    <el-button @click.native.prevent="gotoInfo(scope.row, list)" type="text" size="normal">奖励设置</el-button>
                </template>
            </el-table-column>

        </el-table>

        <div v-if="showTable" v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                           :page-sizes="[10,20,30, 40]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <Reward v-if="showReward" :actorId="actorid"></Reward>

    </div>
</template>

<script type="text/ECMAScript-6">
    import Reward from 'components/reward/reward_info';
    import { actorList } from 'api/actor';

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
        name: 'table_demo',
        components: { Reward },
        data() {
            return {
                showReward: false,
                showTable: true,
                actorid: '',
                total: null,
                listLoading: true,
                actorOptions: [],
                list: [],
                tableKey: 0,
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
            }
        },
        created() {
            this.$store.commit('scripts','');
            this.getActor();
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'gray',
                    deleted: 'danger'
                };
                return statusMap[status]
            },
            typeFilter(type) {
                return calendarTypeKeyValue[type]
            }
        },
        methods: {
            getActor () {
                actorList(this.Query).then(response => {
                    //console.log(response)
                    /*this.actorOptions = response.data.content.map(v => ({
                     key: v.name
                     }));*/
                    for (let i=0; i<response.data.content.length; i++) {
                        //alert(response.data.content[i].id)
                        let temp = {};
                        let obj = {
                            id: 0,
                            actorid: undefined,
                            actor: undefined,
                            operate: '奖励设置'
                        };
                        temp.value = response.data.content[i].id;
                        temp.label = response.data.content[i].name;
                        this.actorOptions.push(temp);
                        //console.log(obj.id)
                        obj.id = i + 1;
                        obj.actor = response.data.content[i].name;
                        obj.actorid = response.data.content[i].id;
                        this.list.push(obj);
                    }
                    //this.getList();
                    this.listLoading =false;
                })
            },
            gotoInfo (row, list) {
                this.showTable = false;
                this.showReward = true;
                this.actorid = row.actorid;
            },
            getRemoteUserList(query) {
                console.log("getRemoteUserList")
                userSearch(query).then(response => {
                    console.log("getRemoteUserList")
                    if (!response.data.content) return;
                    console.log(response)
                    this.userLIstOptions = response.data.content.map(v => ({
                        key: v.name,
                        value: v.id
                    }));
                })
            },
            handleFilter() {
                this.getList();
            },
            handleSizeChange(val) {
                this.listQuery.limit = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.page = val;
                this.getList();
            },
            timeFilter(time) {
                if (!time[0]) {
                    this.listQuery.start = undefined;
                    this.listQuery.end = undefined;
                    return;
                }
                this.listQuery.start = parseInt(+time[0] / 1000);
                this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000);
            },
            handleModifyStatusPublish (row, status) {
                let statusData = {
                    id : row.id,
                    status : status
                }
                actorstatus(statusData).then(response => {
                    console.log(response)
                    if (status == 'published') {
                        row.status = '发布';
                        //this.isColor = true;
                    }
                })
                //row.status = status;
            },
            handleModifyStatusDraft (row, status) {
                let statusData = {
                    id : row.id,
                    status : status
                }
                actorstatus(statusData).then(response => {
                    console.log(response)
                    if (status == 'draft') {
                        row.status = '草稿';
                    }
                })
                //row.status = status;
            },
            delSure () {
                this.dialogDel = false;
                this.flag = true;
            },
            handleModifyStatus(row, status) {
                /*let delId = {
                 id: parseInt(row.id)
                 }
                 this.dialogDel = true;
                 if (this.flag) {
                 actordel(delId).then(response => {
                 //console.log(response);
                 this.getList();
                 });
                 let statusData = {
                 id : row.id,
                 status : status
                 }
                 actorstatus(statusData).then(response => {
                 console.log(response)
                 })
                 this.$message({
                 message: '操作成功',
                 type: 'success'
                 });
                 row.status = status;
                 this.listLoading = false;
                 }*/
                let statusData = {
                    id : row.id,
                    status : status
                }
                actorstatus(statusData).then(response => {
                    console.log(response)
                })
                row.status = status;
            },
            handleCreate() {
                this.resetTemp();
                this.dialogStatus = 'create';
                this.dialogFormVisible = true;
            },
            handleUpdate(row) {
                this.temp = Object.assign({}, row);
                this.dialogStatus = 'update';
                this.dialogFormVisible = true;
            },
            handleDelete(row) {
                this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                });
                const index = this.list.indexOf(row);
                this.list.splice(index, 1);
            },
            create() {
                this.temp.id = parseInt(Math.random() * 100) + 1024;
                this.temp.timestamp = +new Date();
                this.temp.author = '原创作者';
                this.list.unshift(this.temp);
                this.dialogFormVisible = false;
                this.$notify({
                    title: '成功',
                    message: '创建成功',
                    type: 'success',
                    duration: 2000
                });
            },
            resetTemp() {
                this.temp = {
                    id: undefined,
                    importance: 0,
                    remark: '',
                    timestamp: 0,
                    title: '',
                    status: 'published',
                    type: ''
                };
            },
            handleFetchPv(pv) {
                fetchPv(pv).then(response => {
                    this.pvData = response.data.pvData;
                    this.dialogPvVisible = true;
                })
            },
            handleDownload() {
                require.ensure([], () => {
                    const { export_json_to_excel } = require('vendor/Export2Excel');
                    const tHeader = ['时间', '地区', '类型', '标题', '重要性'];
                    const filterVal = ['timestamp', 'province', 'type', 'title', 'importance'];
                    const data = this.formatJson(filterVal, this.list);
                    export_json_to_excel(tHeader, data, 'table数据');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            }
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


