<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <!--<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="banner标题" v-model="listQuery.name">
            </el-input>-->

            <!--<el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.gender" placeholder="性别">
              <el-option v-for="item in  sexOptions" :key="item.label" :label="item.label" :value="item.value">
              </el-option>
            </el-select>-->

            <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" placeholder="push类型">
                <el-option v-for="item in  typeOptions" :key="item.label" :label="item.label" :value="item.value">
                </el-option>
            </el-select>

            <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.status" placeholder="状态">
                <el-option v-for="item in  statusOptions" :key="item.label" :label="item.label" :value="item.value">
                </el-option>
            </el-select>

            <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
            <!--<el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>-->
            <!--<el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>-->
            <!--<el-checkbox class="filter-item" @change='tableKey=tableKey+1' v-model="showAuditor">显示审核人</el-checkbox>-->
        </div>

        <el-table :key='tableKey' :data="list1" v-loading.body="listLoading" border fithighlight-current-row style="width: 100%">

            <el-table-column align="center" label="序号" width="80" column-key="id" prop="id">
                <template scope="scope">
                    <span>{{scope.row.id}}</span>
                    <!-- <span style="color:#337ab7;"><router-link :to="{ path: '/actor/form/' + scope.row.id }">{{scope.row.id}}</router-link></span>-->
                </template>
            </el-table-column>

            <el-table-column width="250px" align="center" label="push标题" prop="title">
                <!--<template scope="scope">
                  <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
                </template>-->
                <template scope="scope">
                    <!--<span>{{scope.row.name}}</span>-->
                    <span style="color:#337ab7;"><router-link :to="{ path: '/help/push_msg/form/' + scope.row.id }">{{scope.row.title}}</router-link></span>
                </template>
            </el-table-column>

            <!--<el-table-column width="110px" v-if='showAuditor' align="center" label="审核人">
              <template scope="scope">
                <span style='color:red;'>{{scope.row.auditor}}</span>
              </template>
            </el-table-column>-->

            <el-table-column width="300px" align="center" label="跳转内容" prop="content">
                <template scope="scope">
                    <span>{{scope.row.content}}</span>
                </template>
            </el-table-column>

            <el-table-column width="150px" align="center" label="跳转类型" prop="type">
                <template scope="scope">
                    <span>{{scope.row.type}}</span>
                </template>
            </el-table-column>

            <!--<el-table-column class-name="status-col" label="头像框" width="150px" prop="headSelect">
              <template scope="scope">
                <span>{{scope.row.headSelect}}</span>
              </template>
            </el-table-column>-->

            <el-table-column min-width="250px" align="center" label="链接内容" prop="addressContent">
                <template scope="scope">
                    <span>{{scope.row.addressContent}}</span>
                    <!--<span class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="状态" width="100" prop="status">
                <template scope="scope">
                    <!--<el-tag :type="scope.row.status | statusFilter" :class="{activeColor: isColor}">{{scope.row.status}}</el-tag>-->
                    <span>{{scope.row.status}}</span>
                </template>
            </el-table-column>

            <el-table-column min-width="150px" align="center" label="push时间类型" prop="timeType">
                <template scope="scope">
                    <span>{{scope.row.timeType}}</span>
                    <!--<span class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
                </template>
            </el-table-column>

            <el-table-column min-width="150px" align="center" label="push时间" prop="time">
                <template scope="scope">
                    <span>{{scope.row.time}}</span>
                    <!--<span class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
                </template>
            </el-table-column>

            <!--<el-table-column min-width="150px" align="center" label="排序" prop="sort">
                <template scope="scope">
                    &lt;!&ndash;<span>{{scope.row.sort}}</span>&ndash;&gt;
                    &lt;!&ndash;<span class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>&ndash;&gt;
                    <el-select v-model="scope.row.sort" placeholder="请选择" :disabled="scope.row.disable" @change="changeSort(scope.row)">
                        <el-option v-for="item in privateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </template>
            </el-table-column>-->

            <el-table-column fixed="right" align="center" label="快捷操作" min-width="100px">
                <template scope="scope">
                    <!--<el-button @click="handleSort(scope.$index, scope.row)" type="text" size="small">排序</el-button>
                    <el-button v-if="scope.row.status!='上架'" @click.native.prevent="editRow(scope.row, list1)" type="text" size="small">上架</el-button>
                    <el-button v-if="scope.row.status!='下架'" @click.native.prevent="editRow(scope.row, list1)" type="text" size="small">下架</el-button>-->
                    <el-button v-if="scope.row.status!='下架'" @click.native.prevent="deleteRow(scope.$index, list1)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>

            <!--<el-table-column align="center" label="操作" width="200px">
              <template scope="scope">
                <el-button v-if="scope.row.status!='发布'" size="small" @click="handleModifyStatusPublish(scope.row,'published')">发布
                </el-button>
                <el-button v-if="scope.row.status!='草稿'" size="small" @click="handleModifyStatusDraft(scope.row,'draft')">草稿
                </el-button>
                &lt;!&ndash;<el-button v-if="scope.row.status!='deleted'" size="small" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
                </el-button>&ndash;&gt;
              </template>
            </el-table-column>-->

        </el-table>

        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                           :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <!--<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
          <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

            <el-form-item label="姓名">
              <el-input v-model="temp.name"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-input v-model="temp.style"></el-input>
            </el-form-item>

            <el-form-item label="性别">
              <el-select class="filter-item" v-model="temp.gender" placeholder="请选择">
                <el-option v-for="item in  sexOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="身高">
              <el-input v-model="temp.height"></el-input>
            </el-form-item>
            <el-form-item label="体重">
              <el-input v-model="temp.weight"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="temp.age"></el-input>
            </el-form-item>

            <el-form-item label="胸围">
              <el-input v-model="temp.bust"></el-input>
            </el-form-item>
            <el-form-item label="职业">
              <el-input v-model="temp.job"></el-input>
            </el-form-item>
            <el-form-item label="性格">
              <el-input v-model="temp.nature"></el-input>
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

        <!--<el-dialog title="提示" :visible.sync="dialogDel" size="tiny">
          <span>确定删除?</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogDel = false">取 消</el-button>
            <el-button type="primary" @click="delSure">确 定</el-button>
          </span>
        </el-dialog>-->

    </div>
</template>

<script type="text/ECMAScript-6">
    import { actorList } from 'api/actor';
    import { parseTime } from 'utils';
    import Upload from 'components/Upload/singleImage3';
    import { actorUpdate } from 'api/actor';
    import { actorstatus } from 'api/actor';
    import { actordel } from 'api/actor';

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
                isColor: true,
                sort: '0',
                list1: [{
                    id: '1',
                    name: 'test',
                    title: '邻家大姐姐，善解人意，喜欢拍照、旅游',
                    headSelect: '枫叶',
                    type: '剧情选择页',
                    addressContent: 'http://www.baidu.com',
                    workTime: '周一 00:00-周二00:00；周三 15:30 至 周四15:30；周六 15:30 至 周日 15:30',
                    status: '上架',
                    configTime: '2017-12-2 00:00',
                    configDownTime: '2017-12-2 00:00',
                    sort: '默认',
                    disable: true,
                },{
                    id: '1',
                    name: 'test',
                    title: '邻家大姐姐，善解人意，喜欢拍照、旅游',
                    headSelect: '枫叶',
                    style: '贴心护士',
                    price: '1小时30金',
                    workTime: '周一 15:30 至 周二15:30',
                    status: '上架',
                    configTime: '2017-12-2 00:00',
                    sort: '默认',
                    disable: true,
                },{
                    id: '1',
                    name: 'test',
                    title: '邻家大姐姐，善解人意，喜欢拍照、旅游',
                    headSelect: '枫叶',
                    style: '贴心护士',
                    price: '1小时30金',
                    workTime: '周一 15:30 至 周二15:30',
                    status: '上架',
                    configTime: '2017-12-2 00:00',
                    sort: '默认',
                    disable: true,
                }],
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
                }],
                total: null,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 20,
                    importance: undefined,
                    name: undefined,
                    type: undefined,
                    status: undefined,
                    //sort: '+id'
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
                typeOptions: [{
                    value: '0',
                    label: '全部'
                },{
                    value: '1',
                    label: 'H5页面'
                }, {
                    value: '2',
                    label: '女仆空间'
                },{
                    value: '3',
                    label: '女仆房间'
                }, {
                    value: '4',
                    label: '首页'
                }, {
                    value: '5',
                    label: '充值页'
                }],
                statusOptions: [{
                    value: '0',
                    label: '已push'
                }, {
                    value: '1',
                    label: '未push'
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
        /*watch: {
         "sort" () {
         this.disable = true;
         }
         },*/
        methods: {
            /*handleModifyStatus(row, status) {
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
             }).then(() => {
             let deleteitem={
             id: parseInt(row.id)
             };
             channelDelete(deleteitem).then(response => {
             //this.list = response.data.content;
             if(response.data.code==200){
             this.getList();
             }
             });
             this.$message({
             message: '操作成功',
             type: 'success'
             });
             }).catch(() => {
             this.$message({
             type: 'info',
             message: '已取消删除'
             });
             });
             },*/
            deleteRow(index, rows) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let deleteitem={
                        id: parseInt(rows.id)
                    };
                    rows.splice(index, 1);
                    channelDelete(deleteitem).then(response => {
                        //this.list = response.data.content;
                        if(response.data.code==200){
                            this.getList();
                        }
                    });
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            editRow (row, list1) {
                let date = new Date();
                let year=date.getFullYear(),
                        month=date.getMonth()+ 1,
                        day=date.getDate(),
                        hour=date.getHours(),
                        minutes=date.getMinutes();
                //seconds=date.getSeconds();
                let dateString=year+'-'+month+'-'+day+' '+hour+':'+minutes;
                if (row.status == '上架') {
                    this.$confirm('确定下架会将和该内容相关的内容均下架？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        row.status = '下架';
                        row.configTime = "未设置";
                        row.configDownTime = dateString;
                        let deleteitem={
                            id: parseInt(rows.id)
                        };
                        rows.splice(index, 1);
                        channelDelete(deleteitem).then(response => {
                            //this.list = response.data.content;
                            if(response.data.code==200){
                                this.getList();
                            }
                        });
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else {
                    row.status = '上架';
                    row.configTime = dateString;
                    row.configDownTime = "未设置";
                }
                row.disable = true;
            },
            handleSort (index, rows) {
                rows.disable = false;
                /*if (this.disable) {
                 this.disable = false;
                 } else {
                 this.disable = true;
                 }*/
                /*if (rows.disable) {
                 rows.disable = false;
                 } else {
                 rows.disable = true;
                 }*/
            },
            changeSort (rows) {
                rows.disable = true;
            },
            getList() {
                this.listLoading = true;
                actorList(this.listQuery).then(response => {
                    this.list = response.data.content;
                    this.total = response.data.total;
                    for (let i=0; i<response.data.content.length; i++) {
                        if (response.data.content[i].status == 'published') {
                            this.list[i].status = '发布';
                        }
                        if (response.data.content[i].status == 'draft') {
                            this.list[i].status = '草稿';
                        }
                    }
                    this.listLoading = false;
                })
                this.listLoading = false;
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


