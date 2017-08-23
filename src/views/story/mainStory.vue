<template>
    <div class="createPost-container">
        <div class="cloth_center">
            <span style="margin:10px 30px;display:inline-block">选择剧情:</span>
            <el-select v-model="actorValue" placeholder="请选择">
                <el-option
                        v-for="item in actorOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
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
                <el-tabs v-model="activeName" type="card" @tab-remove="removeTab">
                    <el-tab-pane label="第一天" name="all">
                        <el-button type="primary" size="large" @click="dialogFormVisible=true" style="margin:10px 0">新增事件</el-button>
                    </el-tab-pane>
                    <el-tab-pane label="第二天" name="second">
                        <span style="margin:20px 20px 0 0;float:left;">分类ICON:</span>
                        <img src="../../../gifs/summer.jpg" class="image" style="margin:20px 0;">
                    </el-tab-pane>
                    <el-tab-pane label="第三天" name="third">
                        <span style="margin:20px 20px 0 0;float:left;">分类ICON:</span>
                        <img src="../../../gifs/fall.jpg" class="image" style="margin:20px 0;">
                    </el-tab-pane>
                    <el-tab-pane label="第四天" name="fourth">
                        <span style="margin:20px 20px 0 0;float:left;">分类ICON:</span>
                        <img src="../../../gifs/winter.jpg" class="image" style="margin:20px 0;">
                    </el-tab-pane>
                    <el-tab-pane v-for="(item, index) in editableTabs2" closable :key="item.name" :label="item.title" :name="item.name">
                        {{item.content}}
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <el-form ref="storyForm" :model="storyForm" label-width="100px" style="margin-top:20px;padding-top:20px;">
                <el-form-item label="对象:" prop="actor" style="width:280px">
                    <multiselect v-model="storyForm.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                                 deselectLabel="删除" track-by="key" :internalSearch="false" label="key">
                        <span slot='noResult'>无结果</span>
                    </multiselect>
                </el-form-item>
                <el-form-item label="剧情类型:">
                    <el-select v-model="storyForm.type" placeholder="请选择">
                        <el-option label="新手" value="1"></el-option>
                        <el-option label="主线" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="剧情标题:" prop="title" style="width:280px">
                    <el-input v-model="storyForm.title"></el-input>
                </el-form-item>
                <el-form-item label="天:" prop="day" style="width:280px">
                    <el-input v-model="storyForm.day"></el-input>
                </el-form-item>
                <el-form-item label="步:" prop="step" style="width:280px">
                    <el-input v-model="storyForm.step"></el-input>
                </el-form-item>
                <el-form-item label="第一步:"></el-form-item>
                <el-form-item label="普通视频:" prop="video">
                    <div style="margin-bottom: 20px;">
                        <Upload v-model="storyForm.video"></Upload>
                    </div>
                </el-form-item>
                <el-form-item label="第二步:"></el-form-item>
                <el-form-item label="交互视频:" prop="eachvideo">
                    <div style="margin-bottom: 20px;">
                        <Upload v-model="storyForm.video"></Upload>
                    </div>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label-width="80px" label="交互文字:" style="float:left" prop="question">
                            <el-input placeholder="" style='min-width:150px;' v-model="storyForm.question">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="80px" label="回答1:" style="float:left" prop="answer1">
                            <el-input placeholder="" style='min-width:150px;' v-model="storyForm.answer1">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="80px" label="回答2:" style="float:left" prop="answer2">
                            <el-input placeholder="" style='min-width:150px;' v-model="storyForm.answer2">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="第三步:"></el-form-item>
                <el-form-item label="电话:"></el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label-width="80px" label="交互文字:" style="float:left" prop="phone">
                            <el-input placeholder="" style='min-width:150px;' v-model="storyForm.phone">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="80px" label="接听:" style="float:left" prop="allow">
                            <el-input placeholder="" style='min-width:150px;' v-model="storyForm.allow">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="80px" label="取消:" style="float:left" prop="deny">
                            <el-input placeholder="" style='min-width:150px;' v-model="storyForm.deny">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="第四步:"></el-form-item>
                <el-form-item label="文字聊天:"></el-form-item>
            </el-form>
            <el-dialog title="新增剧情事件" :visible.sync="dialogFormVisible">
                <el-form ref="form" :model="form" label-width="100px" style="margin-top:20px;padding-top:20px;">
                    <el-form-item label="第几天:" prop="day">
                        <el-input v-model="form.day" size="small" style="width: 100px;"></el-input>
                    </el-form-item>
                    <el-form-item label="剧情ID:" prop="storyid">
                        <el-input v-model="form.storyid" size="small" style="width: 100px;"></el-input>
                    </el-form-item>
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
                <el-input v-model="addEvent" size="small" placeholder="请输入事件名称" autofocus style="width:200px;"></el-input>
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
    import { userSearch } from 'api/story';
    import { storyUpdate } from 'api/pushEvent';

    export default {
        name: 'clothes',
        addEvent: '',
        components: { Tinymce, MDinput, Upload },
        data() {
            return {
                userLIstOptions: [],
                storyForm: {
                    video:'',
                    eachvideo: '',
                    question: '',
                    answer1: '',
                    answer2: '',
                    phone: '',
                    allow: '',
                    deny: '',
                },
                dialogClass:false,
                currentPage: 1,
                actorOptions: [{
                    value: '选项1',
                    label: '佳佳'
                }, {
                    value: '选项2',
                    label: '花花'
                }, ],
                actorValue: '',
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
                tabIndex: 6,
                dialogFormVisible: false,
                classify: {
                    name: '',
                    upload:'',
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                activeName:'all',
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
        },
        methods : {
            addClick () {
                if(this.addEvent){
                    this.dialogClass=false;
                    this.$message({
                        message: '事件名称新增成功',
                        type: 'success'
                    });
                    let newTabName = ++this.tabIndex + '';
                    this.editableTabs2.push({
                        title: this.addEvent,
                        name: newTabName,
                        content: ''
                    });
                    this.editableTabsValue2 = newTabName;
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
                this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
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
                    id: 2,
                    storyid: this.form.storyid,
                    title: this.form.title,
                    modify_time: dateString
                })
                let storyinfo = {
                    id: parseInt(this.form.storyid),
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
            }
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

