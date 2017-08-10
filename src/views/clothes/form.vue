<template>
    <div class="createPost-container">
        <div class="cloth_center">
            <span style="margin:10px 30px;display:inline-block">主角:</span>
            <el-select v-model="actorValue" placeholder="请选择">
                <el-option
                        v-for="item in actorOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <div style="margin:30px">
                <span>服装分类</span>
                <div style="margin: 20px 0;">
                    <el-button type="primary" size="" @click="addTab(editableTabsValue2)">
                        新增分类
                    </el-button>
                </div>
                <el-tabs v-model="activeName" type="card" @tab-remove="removeTab">
                    <el-tab-pane label="春装" name="all">
                        <span style="margin:20px 20px 0 0;float:left;">分类ICON:</span>
                        <img src="../../../gifs/spring.jpg" class="image" style="margin:20px 0;">
                    </el-tab-pane>
                    <el-tab-pane label="夏装" name="second">
                        <span style="margin:20px 20px 0 0;float:left;">分类ICON:</span>
                        <img src="../../../gifs/summer.jpg" class="image" style="margin:20px 0;">
                    </el-tab-pane>
                    <el-tab-pane label="秋装" name="third">
                        <span style="margin:20px 20px 0 0;float:left;">分类ICON:</span>
                        <img src="../../../gifs/fall.jpg" class="image" style="margin:20px 0;">
                    </el-tab-pane>
                    <el-tab-pane label="冬装" name="fourth">
                        <span style="margin:20px 20px 0 0;float:left;">分类ICON:</span>
                        <img src="../../../gifs/winter.jpg" class="image" style="margin:20px 0;">
                    </el-tab-pane>
                    <el-tab-pane v-for="(item, index) in editableTabs2" closable :key="item.name" :label="item.title" :name="item.name">
                        {{item.content}}
                    </el-tab-pane>
                </el-tabs>
            </div>
            <el-dialog title="新增分类" :visible.sync="dialogFormVisible">
                <el-form :model="classify">
                    <el-form-item label="分类名称" :label-width="formLabelWidth">
                        <el-input v-model="classify.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="分类ICON" :label-width="formLabelWidth">
                        <div style="margin-bottom: 20px;">
                            <Upload v-model="classify.upload"></Upload>
                        </div>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="classifyDialog">确 定</el-button>
                </div>
            </el-dialog>
            <div>
                <span style="margin:10px 30px;display:inline-block">服装名称:</span>
                <el-select v-model="clothesValue" placeholder="请选择">
                    <el-option
                            v-for="item in clothesOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <span style="margin:20px 30px;display:inline-block;float:left;">服装图片:</span>
                <div style="margin-bottom: 20px;">
                    <Upload v-model="picture.upload"></Upload>
                </div>
            </div>
            <div>
                <span style="margin:20px 30px;display:inline-block;float:left;">服装视频:</span>
                <div style="margin-bottom: 20px;">
                    <Upload v-model="video.upload"></Upload>
                </div>
            </div>
            <div style="margin:20px 30px;">
                <p>服装温度:<span class="clothStyle">10-20</span></p>
                <p>服装天气:<span class="clothStyle">晴天</span></p>
                <p>服装条件:<span class="clothStyle">全部满足</span></p>
                <p>服装价格:<span class="clothStyle">10000</span></p>
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
                    label: '女警'
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
                    title: '户外装',
                    name: '5',
                    content: '分类ICON：'
                }, {
                    title: '泳装',
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
                }
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

