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
                            :current-page="currentPage4"
                            :page-sizes="[100, 200, 300, 400]"
                            :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="400"
                            style="margin-bottom:20px;">
                    </el-pagination>
                </div>
                <el-tabs v-model="activeName" type="card" @tab-remove="removeTab">
                    <el-tab-pane label="第一天" name="all">
                        <el-form ref="form" :model="form" label-width="100px" style="margin-top:30px">
                            <el-form-item label="事件ID:" prop="eventid">
                                <el-input v-model="form.eventid" size="small" style="width: 100px;"></el-input>
                            </el-form-item>
                            <el-form-item label="事件名称:">
                                <el-input v-model="form.name" size="small" style="width: 300px;"></el-input>
                                <el-button type="primary" size="large" style="margin-left:100px">删除</el-button>
                            </el-form-item>
                            <el-form-item label="事件触发条件:">
                                <template>
                                    <el-checkbox-group v-model="checkList">
                                        <div>
                                            <el-checkbox label="和剧情出现条件相同" style="margin-right:20px"></el-checkbox>
                                            <a style="color:blue">查看剧情</a>
                                        </div>
                                        <el-checkbox label="自定义时间" style="margin-right:20px"></el-checkbox>
                                        <el-date-picker
                                            v-model="setTime"
                                            type="datetime"
                                            placeholder="选择日期时间">
                                        </el-date-picker>
                                    </el-checkbox-group>
                                </template>
                            </el-form-item>
                        </el-form>
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
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import Tinymce from 'components/Tinymce'
    import Upload from 'components/Upload/singleImage3'
    import MDinput from 'components/MDinput';
    import { validateURL } from 'utils/validate';
    import { getArticle } from 'api/article';
    import { actorUpdate } from 'api/actor';

    export default {
        name: 'clothes',
        components: { Tinymce, MDinput, Upload },
        data() {
            return {
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
                editableTabs2: [{
                    title: '第五天',
                    name: '5',
                    content: '分类ICON：'
                }, {
                    title: '第六天',
                    name: '6',
                    content: '分类ICON：'
                }],
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
                    eventid: '',
                    name: '',
                    region: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                checkList: [],
                setTime: ''
            }
        },
        methods : {
            addTab(targetName) {
                this.dialogFormVisible = true;
//                let newTabName = ++this.tabIndex + '';
//                this.editableTabs2.push({
//                    title: 'New Tab',
//                    name: newTabName,
//                    content: 'New Tab content'
//                });
//                this.editableTabsValue2 = newTabName;
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
            classifyDialog () {
                this.dialogFormVisible = false;
                let newTabName = ++this.tabIndex + '';
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
                }
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

