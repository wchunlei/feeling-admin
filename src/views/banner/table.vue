<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <!--<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="banner标题" v-model="listQuery.name">
            </el-input>-->

            <!--<el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.gender" placeholder="性别">
              <el-option v-for="item in  sexOptions" :key="item.label" :label="item.label" :value="item.value">
              </el-option>
            </el-select>-->

            <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" placeholder="banner类型">
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

        <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fithighlight-current-row style="width: 100%">

            <el-table-column align="center" label="序号" width="80" column-key="id" prop="ids">
                <template scope="scope">
                    <span>{{scope.row.ids}}</span>
                    <!-- <span style="color:#337ab7;"><router-link :to="{ path: '/actor/form/' + scope.row.id }">{{scope.row.id}}</router-link></span>-->
                </template>
            </el-table-column>

            <el-table-column width="300px" align="center" label="banner标题" prop="title">
                <!--<template scope="scope">
                  <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
                </template>-->
                <template scope="scope">
                    <!--<span>{{scope.row.name}}</span>-->
                    <span style="color:#337ab7;"><router-link :to="{ path: '/banner/form/' + scope.row.id }">{{scope.row.title}}</router-link></span>
                </template>
            </el-table-column>

            <!--<el-table-column width="110px" v-if='showAuditor' align="center" label="审核人">
              <template scope="scope">
                <span style='color:red;'>{{scope.row.auditor}}</span>
              </template>
            </el-table-column>-->

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

            <el-table-column min-width="300px" align="center" label="链接内容" prop="content">
                <template scope="scope">
                    <span>{{scope.row.content}}</span>
                    <!--<span class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="状态" width="100" prop="status">
                <template scope="scope">
                    <!--<el-tag :type="scope.row.status | statusFilter" :class="{activeColor: isColor}">{{scope.row.status}}</el-tag>-->
                    <span>{{scope.row.status}}</span>
                </template>
            </el-table-column>

            <el-table-column min-width="150px" align="center" label="上架时间" prop="configtime">
                <template scope="scope">
                    <span>{{scope.row.configtime}}</span>
                    <!--<span class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
                </template>
            </el-table-column>

            <el-table-column min-width="150px" align="center" label="下架时间" prop="configdowntime">
                <template scope="scope">
                    <span>{{scope.row.configdowntime}}</span>
                    <!--<span class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
                </template>
            </el-table-column>

            <el-table-column min-width="150px" align="center" label="排序" prop="sort">
                <template scope="scope">
                    <!--<span>{{scope.row.sort}}</span>-->
                    <!--<span class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
                    <el-select v-model="scope.row.sort" placeholder="请选择" :disabled="disable" @change="changeSort(scope.row)">
                        <el-option v-for="item in privateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="left" label="快捷操作" min-width="150px">
                <template scope="scope">
                    <el-button @click="handleSort(scope.$index, scope.row)" type="text" size="small">排序</el-button>
                    <el-button v-if="scope.row.status!='上架'" @click.native.prevent="editRow(scope.row, list)" type="text" size="small">上架</el-button>
                    <el-button v-if="scope.row.status!='下架'" @click.native.prevent="editRow(scope.row, list)" type="text" size="small">下架</el-button>
                    <el-button v-if="scope.row.status!='上架'" @click.native.prevent="deleteRow(scope.$index, scope.row)" type="text" size="small">删除</el-button>
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
    import { parseTime } from 'utils';
    import Upload from 'components/Upload/singleImage3';
    import { actorUpdate } from 'api/actor';
    import { actorstatus } from 'api/actor';
    import { bannerlist } from 'api/banner';
    import { upbanner } from 'api/banner';
    import { sortbanner } from 'api/banner';
    import { delbanner } from 'api/banner';
    import { actorList } from 'api/actor';
    import { scriptlist } from 'api/story';
    import { roomlist } from 'api/room';
    import { reslist } from 'api/resource';

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
                list: [],
                actorOptions: [],
                scriptOptions: [],
                videoOptions: [],
                homeOptions: [],
                disable: true,
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
                    value: '5',
                    label: '女仆空间'
                },{
                    value: '2',
                    label: '女仆房间'
                }, {
                    value: '4',
                    label: '视频'
                }, {
                    value: '3',
                    label: '充值页'
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
            this.getVideoResource();
            this.getActor();
            //this.getList();
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
            getVideoResource () {
                let typeinfo = {};
                typeinfo.type = '2';
                reslist (typeinfo).then(response => {
                    if(response.data.code==200){
                        for (let i=0; i<response.data.content.length; i++) {
                            let temp = {};
                            temp.value = response.data.content[i].id;
                            temp.label = response.data.content[i].name;
                            this.videoOptions.push(temp);
                        }
                        console.log(this.videoOptions)
                        /*this.$message({
                         message: '新增成功',
                         type: 'success'
                         });*/
                    }
                });
            },
            getActor () {
                actorList(this.listQuery).then(response => {
                    //console.log(response)
                    /*this.actorOptions = response.data.content.map(v => ({
                     key: v.name
                     }));*/
                    for (let i=0; i<response.data.content.length; i++) {
                        //alert(response.data.content[i].id)
                        let temp = {};
                        temp.value = response.data.content[i].id;
                        temp.label = response.data.content[i].name;
                        this.actorOptions.push(temp);
                    }
                    roomlist(this.listQuery).then(response => {
                        console.log(response)
                        for (let i=0; i<response.data.content.length; i++) {
                            let temp = {};
                            temp.value = response.data.content[i].id;
                            temp.label = response.data.content[i].name;
                            this.homeOptions.push(temp);
                        }
                        this.getList();
                    })
                });
                scriptlist(this.listQuery).then(response => {
                    console.log(response)
                    for (let i=0; i<response.data.content.length; i++) {
                        //alert(response.data.content[i].id)
                        let temp = {};
                        temp.value = response.data.content[i].id;
                        temp.label = response.data.content[i].title;
                        this.scriptOptions.push(temp);
                    }
                    this.listLoading = false;
                });
            },
            deleteRow(index, rows) {
                this.$confirm('确定要删除该内容吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let deleteitem={
                        id: rows.id
                    };
                    delbanner(deleteitem).then(response => {
                        //this.list = response.data.content;
                        if(response.data.code==200){
                            this.list.splice(index, 1);
                            //this.getList();
                        }
                    });
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                }).catch(() => {

                });
            },
            editRow (row, list) {
                let date = new Date();
                let year=date.getFullYear(),
                        month=date.getMonth()+ 1,
                        day=date.getDate(),
                        hour=date.getHours(),
                        minutes=date.getMinutes();
                //seconds=date.getSeconds();
                //let dateString=year+'-'+month+'-'+day+' '+hour+':'+minutes;
                let dateString=year+'-'+(month>=10?+month:"0"+month)+"-"+(day>=10? day :'0'+day)+' '+(hour>=10?+hour:"0"+hour)+':'+(minutes>=10?+minutes:"0"+minutes);
                let statusTemp = '';
                if (row.status == '上架') {
                    statusTemp = '1'
                }
                if (row.status == '下架') {
                    statusTemp = '0'
                }
                if (row.status == '上架') {
                    this.$confirm('确定下架会将和该内容相关的内容均下架？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let upitem={
                            id: row.id,
                            status: statusTemp,
                            configtime: dateString
                        };
                        //row.splice(index, 1);
                        upbanner(upitem).then(response => {
                            //this.list = response.data.content;
                            if(response.data.code==200){
                                row.status = '下架';
                                row.configtime = "未设置";
                                row.configdowntime = dateString;
                                    //this.getList();
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                            }
                        });
                    }).catch(() => {

                    });
                } else {
                    let upitem={
                        id: row.id,
                        status: statusTemp,
                        configtime: dateString
                    };
                    //row.splice(index, 1);
                    upbanner(upitem).then(response => {
                        //this.list = response.data.content;
                        if(response.data.code==200){
                            row.status = '上架';
                            row.configtime = dateString;
                            row.configdowntime = "未设置";
                                    this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                        }
                    });
                }
                this.disable = true;
            },
            handleSort (index, rows) {
                this.disable = false;
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
                let sortitem={
                    id: rows.id,
                    sort: rows.sort
                };
                //row.splice(index, 1);
                sortbanner(sortitem).then(response => {
                    //this.list = response.data.content;
                    if(response.data.code==200){
                        this.disable = true;
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    }
                });
            },
            getList() {
                this.listLoading = true;
                bannerlist(this.listQuery).then(response => {
                    this.list = response.data.content.reverse();
                    for (let i=0; i<response.data.content.length; i++) {
                        this.list[i].ids = i+1;
                    }
                    this.total = response.data.total;
                    for (let i=0; i< response.data.content.length; i++) {
                        this.list[i].disable = false;
                        if (response.data.content[i].status == "1" || response.data.content[i].configtime == '0000-00-00 00:00:00') {
                            this.list[i].configtime = "未设置";
                        }
                        if (response.data.content[i].status == "0" || response.data.content[i].configdowntime == '0000-00-00 00:00:00') {
                            this.list[i].configdowntime = "未设置";
                        }
                    }
                    for (let i=0; i<response.data.content.length; i++) {
                        if(response.data.content[i].status == 0) {
                            this.list[i].status = '上架';
                        }
                        if(response.data.content[i].status == 1) {
                            this.list[i].status = '下架';
                        }
                        if (response.data.content[i].type == 1) {
                            this.list[i].type = 'H5页面';
                            this.list[i].content = response.data.content[i].url;
                        }
                        if (response.data.content[i].type == 5) {
                            this.list[i].type = '女仆空间';
                            for ( let j=0; j<this.actorOptions.length; j++) {
                                if (response.data.content[i].actorid == this.actorOptions[j].value) {
                                    this.list[i].content = this.actorOptions[j].label + '的空间';
                                }/* else {
                                    this.list[i].content = "空间不存在!!";
                                }*/
                            }
                        }
                        if (response.data.content[i].type == 2) {
                            this.list[i].type = '女仆房间';
                            for ( let j=0; j<this.homeOptions.length; j++) {
                                if (response.data.content[i].roomid == this.homeOptions[j].value) {
                                    this.list[i].content = this.homeOptions[j].label;
                                }/* else {
                                    this.list[i].content = "房间不存在!!";
                                }*/
                            }
                        }
                        if (response.data.content[i].type == 4) {
                            this.list[i].type = '视频';
                            for (let j=0; j<this.videoOptions.length; j++) {
                                if (response.data.content[i].mvurl == this.videoOptions[j].value) {
                                    this.list[i].content = this.videoOptions[j].label;
                                }
                            }
                        }
                        if (response.data.content[i].type == 3) {
                            this.list[i].type = '充值页';
                            this.list[i].content = '充值页';
                        }
                    }
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


