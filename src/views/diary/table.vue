<template>
    <div id="main-content" class="app-container calendar-list-container" style="height:840px">
        <div id="operate_wrapper" class="filter-container">
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="姓名" v-model="listQuery.name">
            </el-input>

            <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
            <!--<el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>-->
            <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
            <el-checkbox class="filter-item" @change='tableKey=tableKey+1' v-model="showAuditor">显示审核人</el-checkbox>
        </div>

        <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

            <el-table-column align="center" label="序号" width="65" prop="id">
                <template scope="scope">
                    <!--<a href="/diary/form#/diary/form" class="link-type">{{scope.row.id}}</a>-->
                    <!--<router-link to="/diary/form">{{scope.row.id}}</router-link>-->
                    <span><router-link :to="{ path: '/diary/form/' + scope.row.id }">{{scope.row.id}}</router-link></span>
                </template>
            </el-table-column>

            <el-table-column width="180px" align="center" label="姓名" prop="name">
                <template scope="scope">
                    <!--<span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>-->
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column width="110px" v-if='showAuditor' align="center" label="审核人" prop="auditor">
            </el-table-column>

            <el-table-column width="400px" label="标题" prop="title">
            </el-table-column>

            <!--<el-table-column width="400px" label="内容" prop="textarea">
            </el-table-column>-->

            <el-table-column min-width="180px" label="修改时间" prop="modify_time">
            </el-table-column>

            <el-table-column align="center" label="操作" width="250px">
                <template scope="scope">
                    <!--<el-button v-if="scope.row.status!='published'" size="small" type="success" @click="handleModifyStatus(scope.row,'published')">发布
                    </el-button>
                    <el-button v-if="scope.row.status!='draft'" size="small" @click="handleModifyStatus(scope.row,'draft')">草稿
                    </el-button>-->
                    <el-button v-if="scope.row.status!='deleted'" size="small" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

        <div v-show="!listLoading" id="pagination" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                           :page-sizes="[10,20,30,40]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <!--<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

                <el-form-item label="姓名">
                    <el-input v-model="temp.name"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="temp.title"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="temp.textarea"></el-input>
                </el-form-item>

                <el-form-item label="头像">
                    <Upload v-model="temp.headurl"></Upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
                <el-button v-else type="primary" @click="update">确 定</el-button>
            </div>
        </el-dialog>-->

        <el-dialog title="阅读数统计" :visible.sync="dialogPvVisible" size="small">
            <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
                <el-table-column prop="key" label="渠道"> </el-table-column>
                <el-table-column prop="pv" label="pv"> </el-table-column>
            </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确 定</el-button>
      </span>
        </el-dialog>

    </div>
</template>

<script>
    import { diaryList } from 'api/diary';
    import { diarydelete } from 'api/diary';
    import { parseTime } from 'utils';
    import Upload from 'components/Upload/singleImage3';
    import { actorUpdate } from 'api/actor';
    import  common  from 'static/Common'

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
        props: {
            screenHeight: Number
        },
        mounted(){
            var _this=this;
            setTimeout(() => {
                this.adjustPage();
            },100);
        },
        components: { Upload },
        name: 'table_demo',
        data() {
            return {
                list: null,
                total: null,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 20,
                    importance: undefined,
                    name: undefined,
                    type: undefined,
                    //sort: '+id'
                },
                temp: {
                    id: undefined,
                    importance: 0,
                    remark: '',
                    timestamp: 0,
                    title: '',
                    type: '',
                    status: 'published',
                    headurl:''
                },
                importanceOptions: [1, 2, 3],
                calendarTypeOptions,
                sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
                statusOptions: ['published', 'draft', 'deleted'],
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: '编辑',
                    create: '创建'
                },
                dialogPvVisible: false,
                pvData: [],
                showAuditor: false,
                tableKey: 0
            }
        },
        created() {
            this.getList();
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
            getList() {
                this.listLoading = true;
                diaryList(this.listQuery).then(response => {
                    this.list = response.data.content;
                this.listLoading = false;
            })
            },
            handleFilter() {
                this.getList();
            },
            handleSizeChange(val) {
                this.listQuery.limit = parseInt(val);
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.page = parseInt(val);
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
            handleModifyStatus(row, status) {
                this.listLoading = true;
                let deleteitem={
                    id: parseInt(row.id)
                };
                this.listLoading = true;
                diarydelete(deleteitem).then(response => {
                    //this.list = response.data.content;
                    if(response.data.code==200){
                        this.getList();
                    }
                    this.listLoading = false;
            });
                this.$message({
                    message: '操作成功',
                    type: 'success'
                });
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
            update() {
                this.temp.timestamp = +this.temp.timestamp;
                for (const v of this.list) {
                    if (v.id === this.temp.id) {
                        const index = this.list.indexOf(v);
                        this.list.splice(index, 1, this.temp);
                        break;
                    }
                }
                this.dialogFormVisible = false;

                var actorinfo;
                actorinfo = this.temp;
                actorUpdate(actorinfo).then(response => {
                    if (!response.data.items) return;
                console.log(response)
                this.userLIstOptions = response.data.items.map(v => ({
                            key: v.name
                        }));
            });

                this.$notify({
                    title: '成功',
                    message: '更新成功',
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
            },
            adjustPage(){
                this.table_height = this.elementsFlex("el_table_wrap", "main-content", "operate_wrapper", "pagination", true) - 35;
            },
        },
        watch: {
            screenHeight () {
                this.adjustPage();
                //console.log(this.elementsFlex("el_table_wrap", "main-content", "table_wrapper", "pagination",true));
                //this.table_height=this.elementsFlex("el_table_wrap", "main-content", "table_wrapper", "pagination",true);
            }
        },
    }
</script>
