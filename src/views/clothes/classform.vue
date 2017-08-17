<template>
    <div class="createPost-container">
        <div class="cloth_center">
            <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">
                <el-form-item label-width="90px" label="选择主角:" class="postInfo-container-item" prop="actor">
                    <multiselect v-model="postForm.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                                 deselectLabel="删除" track-by="key" :internalSearch="false" label="key" style="width:150px;">
                        <span slot='noResult'>无结果</span>
                    </multiselect>
                    <el-button type="primary" @click="selectUser" style="position:relative;left:180px;top:-40px;">确定</el-button>
                </el-form-item>
                <el-form-item label-width="90px" label="服装分类:" class="postInfo-container-item" prop="clothclass">
                    <el-button type="primary" size="" @click="addTab(editableTabsValue2)" style="margin-bottom: 40px">新增分类</el-button>
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
                        <el-tab-pane v-for="(item, index) in list" closable :key="item.typename" :label="item.typename" :name="item.typename">
                            {{item.typeicon}}
                        </el-tab-pane>
                    </el-tabs>
                </el-form-item>
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
                <!--<div>
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
                </div>-->
            </el-form>
        </div>
    </div>
</template>

<script>
    import Tinymce from 'components/Tinymce'
    import Upload from 'components/Upload/singleImage3'
    import MDinput from 'components/MDinput';
    import { validateURL } from 'utils/validate';
    import { userSearch } from 'api/story';
    import { clothclassUpdate } from 'api/cloth';
    import { clothclassList } from 'api/cloth';

    export default {
        name: 'clothes',
        components: { Tinymce, MDinput, Upload },
        data() {
            return {
                postForm: {
                    actor: ''
                },
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
                list: [],
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
                userLIstOptions: [],
            }
        },
        created() {
            if(this.postForm.actor.value){
                //this.getList();
             }
        },
        methods : {
            getList() {
                this.listLoading = true;
                let listQuery={};
                listQuery.actorid = parseInt(this.postForm.actor.value);
                clothclassList(listQuery).then(response => {
                 this.list = response.data.content;
                 this.listLoading = false;
                 })
             },
            addTab(targetName) {
                this.dialogFormVisible = true;
//                let newTabName = ++this.tabIndex + '';
//                this.list.push({
//                    title: 'New Tab',
//                    name: newTabName,
//                    content: 'New Tab content'
//                });
//                this.editableTabsValue2 = newTabName;
            },
            removeTab(targetName) {
                this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let tabs = this.list;
                let activeName = this.activeName;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.typename === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.typename;
                        }else{
                            activeName='all';
                        }
                        if(this.list.indexOf(tab)>-1){
                            this.editableTabs1=[];
                        }
                        if(this.list.indexOf(tab)>-1){
                            this.list=[];
                        }
                    }
                });
                }
                this.activeName = activeName;
                this.list = tabs.filter(tab => tab.typename !== targetName);
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                }).catch(() => {
                        this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                /*let tabs = this.list;
                let activeName = this.activeName;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.typename === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.typename;
                        }else{
                            activeName='all';
                        }
                        if(this.list.indexOf(tab)>-1){
                            this.editableTabs1=[];
                        }
                        if(this.list.indexOf(tab)>-1){
                            this.list=[];
                        }
                        }
                    });
                }
                this.activeName = activeName;
                this.list = tabs.filter(tab => tab.typename !== targetName);*/
            },
            classifyDialog () {
                this.dialogFormVisible = false;
                let newTabName = ++this.tabIndex + '';
                this.$refs.postForm.validate(valid => {
                    if (valid) {
                        let clothinfo = {
                            actorid: parseInt(this.postForm.actor.value),
                            typename: this.classify.name,
                            typeicon: this.classify.upload
                        };
                        this.loading = true;
                        clothclassUpdate (clothinfo).then(response => {
                            if (!response.data.items) return;
                        console.log(response)
                        this.userLIstOptions = response.data.items.map(v => ({
                                    key: v.name
                                }));
                    });
                        this.$notify({
                            title: '成功',
                            message: '发布成功',
                            type: 'success',
                            duration: 2000
                        });
                        this.postForm.status = 'published';
                        this.loading = false;
                    } else {
                        console.log('error submit!!');
                return false;
            }
            });
                if(JSON.stringify(this.list).indexOf(this.classify.name)==-1){
                    if(this.classify.name){
                        this.list.push({
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
            selectUser () {
                //alert(this.postForm.actor.value);
                this.getList();
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

