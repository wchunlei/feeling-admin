<template>
    <div class="createPost-container">
        <div class="cloth_center">
            <el-form ref="actorValue" :model="actorValue" label-width="100px" style="margin-top:20px;padding-top:20px;">
                <el-form-item label="选择剧情:" prop="day">
                    <!--<el-input v-model="form.day" size="small" style="width: 100px;"></el-input>-->
                    <el-select v-model="actorValue.select" placeholder="请选择">
                        <el-option
                                v-for="item in actorOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <!--<span style="margin:10px 30px;display:inline-block">选择剧情:</span>
            <el-select v-model="actorValue" placeholder="请选择">
                <el-option
                        v-for="item in actorOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>-->
            <div style="margin:30px">
                <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[1, 2, 3, 4]"
                        :page-size="2"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                        style="margin-bottom:20px;">
                    </el-pagination>
                </div>
                <el-button type="primary" size="large" @click="addTab(editableTabsValue2)" style="margin:10px 0">新增天数</el-button>
                <!--<el-tabs v-model="activeName" type="card" closable @tab-remove="removeTab" @tab-click="storyShow">
                    <el-tab-pane v-for="(item, index) in editableTabs2"  :key="item.name" :label="item.title" :name="item.title">
                        {{item.content}}
                    </el-tab-pane>
                </el-tabs>-->
                <el-tabs v-model="tableDay" type="card" closable @tab-remove="removeTab" @tab-click="storyShow">
                    <el-tab-pane
                            v-for="(item, index) in editableDay"
                            :key="item.name"
                            :label="item.title"
                            :name="item.title">
                        {{item.content}}
                    </el-tab-pane>
                </el-tabs>
                <el-button type="primary" size="large" @click="dialogFormVisible=true" style="margin:10px 0 10px 40px">新增</el-button>
                <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

                    <el-table-column align="center" label="剧情id" width="80" prop="id">
                        <template scope="scope">
                            <!--<a href="/diary/form#/diary/form" class="link-type">{{scope.row.id}}</a>-->
                            <!--<router-link to="/diary/form">{{scope.row.id}}</router-link>-->
                            <span><router-link :to="{ path: '/diary/form/' + scope.row.id }">{{scope.row.id}}</router-link></span>
                        </template>
                    </el-table-column>

                    <el-table-column width="180px" align="center" label="事件id" prop="eventid">
                        <template scope="scope">
                            <!--<span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>-->
                            <span>{{scope.row.eventid}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column width="400px" label="标题" prop="title">
                    </el-table-column>

                    <!--<el-table-column width="400px" label="内容" prop="textarea">
                    </el-table-column>-->

                    <el-table-column min-width="180px" label="触发时间" prop="dt">
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
            </div>
            <el-dialog title="新增剧情事件" :visible.sync="dialogFormVisible">
                <el-form ref="form" :model="form" label-width="100px" style="margin-top:20px;padding-top:20px;">
                    <el-form-item label="第几天:" prop="day">
                        <el-input v-model="form.day" size="small" style="width: 100px;"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="剧情ID:" prop="storyid">
                        <el-input v-model="form.storyid" size="small" style="width: 100px;"></el-input>
                    </el-form-item>-->
                    <el-form-item label="事件标题:" prop="title">
                        <el-input v-model="form.title" size="small" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="触发时间:">
                        <el-date-picker v-model="form.dt" type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addStory">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="新增" :visible.sync="dialogClass" size="tiny">
                <el-input v-model="addEvent" size="small" placeholder="请输入天数" autofocus style="width:200px;"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogClass = false">取 消</el-button>
                    <el-button type="primary" @click="addClick">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Tinymce from 'components/Tinymce'
    import Upload from 'components/Upload/singleImage3'
    import MDinput from 'components/MDinput';
    import { validateURL } from 'utils/validate';
    import { storyUpdate } from 'api/pushEvent';
    import { storyList } from 'api/pushEvent';
    import { storypageList } from 'api/pushEvent';
    import { storyDelete } from 'api/pushEvent';

    export default {
        name: 'clothes',
        addEvent: '',
        components: { Tinymce, MDinput, Upload },
        data() {
            return {
                tableDay: '',
                editableDay: [],
                tabIndex: 1,
                listQuery: {
                    page: 1,
                    limit: 20
                },
                listinfo: {},
                dialogClass:false,
                currentPage: 1,
                actorOptions: [{
                    value: 1,
                    label: '佳佳'
                }, {
                    value: 2,
                    label: '花花'
                }, ],
                actorValue: {
                    select: 2
                },
                clothesOptions: [{
                    value: '选项1',
                    label: '连衣裙'
                }, {
                    value: '选项2',
                    label: '长裤'
                } ],
                clothesValue: '',
                editableTabsValue2: '2',
                editableTabs2: [],
                dialogFormVisible: false,
                classify: {
                    name: '',
                    upload:'',
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                activeName:'',
                picture : {
                    upload : '',
                },
                video : {
                    upload : '',
                },
                typeIcon : {
                    upload : '',
                },
                form: {
                    day: '',
                    storyid: '',
                    title: '',
                    dt: new Date()
                },
                checkList: [],
                list: [/*{
                    id: 1,
                    storyid: '11',
                    title: 'ss',
                    modify_time: '2017-01-03 10:10:10'
                }*/],
                total: null,
                list1: []
            }
        },
        created () {
            //alert(this.editableTabs2);
            this.listQuery.id=this.actorValue.select;
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
        methods : {
            getList() {
                //this.listLoading = true;
                storypageList (this.listQuery).then(response => {
                    for(let i=0;i<response.data.content.data.length;i++){
                        this.editableDay.push({
                            title: response.data.content.data[i].day,
                            name: i+1,
                            content: ''
                        });
                    }
                this.listLoading = false;
            })
            },
            handleFilter() {
                if(this.editableDay){
                    this.editableDay=null;
                }
                this.getList();
            },
            handleSizeChange(val) {
                if(this.editableDay){
                    this.editableDay=null;
                }
                this.listQuery.limit = parseInt(val);
                this.getList();
            },
            handleCurrentChange(val) {
                if(this.editableDay){
                    this.editableDay=null;
                }
                this.listQuery.page = parseInt(val);
                this.getList();
            },
            /*getList() {
                this.listLoading = true;
                storyList().then(response => {
                    this.list = response.data.content;
                    this.listLoading = false;
                })
            },*/
            addClick () {
                if(this.addEvent){
                    this.dialogClass=false;
                    this.$message({
                        message: '事件名称新增成功',
                        type: 'success'
                    });
                    let newTabName = ++this.tabIndex + '';
                    this.editableDay.push({
                        title: this.addEvent,
                        name: newTabName,
                        content: ''
                    });
                    this.tableDay = newTabName;
                    this.addEvent=null;
                } else {
                    this.dialogClass=false;
                }
                //alert(this.editableTabs2[0].name)
            },
            addTab(targetName) {
                this.dialogClass=true;
                //this.dialogFormVisible = true;
                /*let newTabName = ++this.tabIndex + '';
                this.editableTabs2.push({
                    title: this.addEvent,
                    name: newTabName,
                    content: 'New Tab content'
                });
                this.editableTabsValue2 = newTabName;*/
            },
            removeTab(targetName) {
                let tabs = this.editableDay;
                let activeName = this.tableDay;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });
                }
                this.tableDay = activeName;
                this.editableDay = tabs.filter(tab => tab.name !== targetName);
            },
            /*removeTab(targetName) {
                let tabs = this.editableTabs2;
                let activeName = this.activeName;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }else{
                            activeName='all';
                        }
                        if(this.editableTabs2.indexOf(tab)>-1){
                            this.editableTabs1=[];
                        }
                        if(this.editableTabs2.indexOf(tab)>-1){
                            this.editableTabs2=[];
                        }
                    }
                });
                }
                this.activeName = activeName;
                //this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
            },*/
            storyShow (tabs) {
                this.listLoading = true;
                this.listinfo.day = tabs.name;
                this.listinfo.id = this.actorValue.select;
                //if(this.listinfo.eventid){
                    storyList(this.listinfo).then(response => {
                        this.list = response.data.content;
                        this.listLoading = false;
                    })
                //}
            },
            addStory () {
                this.dialogFormVisible = false;
                let date=this.form.dt;
                let year=date.getFullYear(),
                        month=date.getMonth()+ 1,
                        day=date.getDate(),
                        hour=date.getHours(),
                        minutes=date.getMinutes(),
                        seconds=date.getSeconds();
                let dateString=year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
                this.list.push({
                    id: this.actorValue.select,
                    //eventid: this.actorValue.select,
                    title: this.form.title,
                    dt: dateString
                })
                let storyinfo = {
                    id: parseInt(this.actorValue.select),
                    title: this.form.title,
                    dt: dateString,
                    day:parseInt(this.form.day)
                };
                this.loading = true;
                storyUpdate (storyinfo).then(response => {
                    if (!response.data.items) return;
                    console.log(response);
                });
                this.loading = false;
                /*let newTabName = ++this.tabIndex + '';
                if(JSON.stringify(this.editableTabs2).indexOf(this.classify.name)==-1){
                    if(this.classify.name){
                        this.editableTabs2.push({
                            title: this.classify.name,
                            name: newTabName,
                            content: this.classify.upload
                        });
                        this.editableTabsValue2 = newTabName;
                        this.classify.name=null;
                    }
                } else {
                    console.log("类型不能为空或类型已存在");
                    this.$message({
                        message: '新增类型不能为空或类型已存在',
                        type: 'warning',
                        showClose:true
                    });
                    this.classify.name=null;
                }*/
            },
            handleModifyStatus(row, status) {
                this.listLoading = true;
                let deleteitem={
                    eventid: parseInt(row.eventid)
                };
                this.listLoading = true;
                storyDelete (deleteitem).then(response => {
                    //this.list = response.data.content;
                    if(response.data.code==200){
                        if(this.editableDay){
                            this.editableDay=null;
                            this.getList();
                        }
                    }
                    this.listLoading = false;
                });
                this.$message({
                    message: '操作成功',
                    type: 'success'
                });
                row.status = status;
            },
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .title-prompt{
        position: absolute;
        right: 0px;
        font-size: 12px;
        top:10px;
        color:#ff4949;
    }
    .createPost-container {
        position: relative;
    .createPost-main-container {
        padding: 40px 45px 20px 50px;
    .postInfo-container {
        position: relative;
    @include clearfix;
        margin-bottom: 10px;
    .postInfo-container-item {
        float: left;
    }
    }
    .editor-container {
        min-height: 500px;
        margin: 0 0 30px;
    .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
    .editor-upload-btn {
        display: inline-block;
    }
    }
    }
    }
    .word-counter {
        width: 40px;
        position: absolute;
        right: -10px;
        top: 0px;
    }
    }
    .clothStyle{
        margin-left:15px;
        display:inline-block;
    }
</style>

