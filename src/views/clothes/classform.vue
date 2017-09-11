<template>
    <div class="createPost-container">
        <div class="cloth_center">
            <el-form class="form-container" :model="postForm" ref="postForm">
                <el-form-item label-width="90px" label="选择主角:" class="postInfo-container-item" prop="actor">
                    <multiselect v-model="postForm.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                                 deselectLabel="删除" track-by="key" :internalSearch="false" label="key" style="width:150px;">
                        <span slot='noResult'>无结果</span>
                    </multiselect>
                </el-form-item>
                <el-form-item label-width="90px" label="服装分类:" class="postInfo-container-item" prop="clothclass">
                    <!--<el-button type="primary" size="" @click="addTab(editableTabsValue2)" style="margin-bottom: 40px">新增分类</el-button>-->
                    <el-tabs v-model="activeName" type="card" editable @edit="addTab" @tab-remove="removeTab" @tab-click="getTypeid">
                        <!--<el-tab-pane label="春装" name="all">
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
                        </el-tab-pane>-->
                        <el-tab-pane v-for="(item, index) in list" closable :key="item.typeid" :label="item.typename" :name="item.typeid.toString()">
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
                <el-form-item v-if="showClothDetail" label="服装名称:" :label-width="formLabelWidth" prop="clothesValue">
                    <el-input v-model="postForm.clothesValue" auto-complete="off" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item v-if="showClothDetail" label="服装图片:" :label-width="formLabelWidth">
                    <div style="margin-bottom: 20px;">
                        <Upload v-model="postForm.picture"></Upload>
                    </div>
                </el-form-item>
                <el-form-item v-if="showClothDetail" label="服装视频:" :label-width="formLabelWidth">
                    <div style="margin-bottom: 20px;">
                        <Upload v-model="postForm.video"></Upload>
                    </div>
                </el-form-item>
                <div v-if="showClothDetail" style="margin:20px 30px;">
                    <el-form-item label="服装温度:" style="margin-bottom: 40px;" label-width="90px" prop="minTemperature">
                        <el-input v-model="postForm.minTemperature" size="small" placeholder="最低温度" style="width:75px;"></el-input> ---
                        <el-input v-model="postForm.maxTemperature" size="small" placeholder="最高温度" style="width:75px;"></el-input>
                    </el-form-item>
                    <el-form-item label="服装天气:" style="margin-bottom: 40px;" label-width="90px" prop="chothWeather">
                        <el-select v-model="postForm.chothWeather" placeholder="请选择">
                            <el-option
                                    v-for="item in weatherOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服装条件:" style="margin-bottom: 40px;" label-width="90px" prop="chothCondition">
                        <el-select v-model="postForm.chothCondition" placeholder="请选择">
                            <el-option
                                    v-for="item in conditionOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服装价格:" style="margin-bottom: 40px;" label-width="90px" prop="price">
                        <el-input v-model="postForm.price" size="small" placeholder="请输入服装价格" style="width:200px;"></el-input>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script type="text/ECMAScript-6">
    import Tinymce from 'components/Tinymce'
    import Upload from 'components/Upload/singleImage3'
    import MDinput from 'components/MDinput';
    import { validateURL } from 'utils/validate';
    import { userSearch } from 'api/story';
    import { clothclassUpdate } from 'api/cloth';
    import { clothclassList } from 'api/cloth';
    import { clothActorList } from 'api/cloth';
    import { clothclassdelete } from 'api/cloth';

    export default {
        name: 'clothes',
        components: { Tinymce, MDinput, Upload },
        data() {
            return {
                postForm: {
                    actor: '',
                    clothesValue: '',
                    minTemperature:'',
                    maxTemperature: '',
                    chothWeather: '',
                    chothCondition: '',
                    picture: '',
                    video: '',
                    price: '',
                },
                weatherOptions: [],
                conditionOptions: [],
                actorOptions: [{
                    value: '选项1',
                    label: '女警'
                }, {
                    value: '选项2',
                    label: '花花'
                }, ],
                actorValue: '',
                clothesValue: '',
                editableTabsValue2: '2',
                list: [],
                tabIndex: 6,
                dialogFormVisible: false,
                showClothDetail: false,
                classify: {
                    name: '',
                    upload:'',
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                activeName:'',
                typeIcon : {
                    upload : '',
                },
                userLIstOptions: [],
            }
        },
        created () {
            if(this.postForm.actor.value){
                //this.getList();
             }
        },
        watch: {
            "postForm.actor" (newval,oldval) {
                if (newval && newval.key) {
                    this.getList();
                } else {
                    this.list = [];
                    this.showClothDetail = false;
                }
            }
        },
        methods : {
            getTypeid (targetName) {
                this.listLoading = true;
                this.listLoading = false;
                let listallQuery={};
                listallQuery.actorid = parseInt(this.postForm.actor.value);
                listallQuery.typeid = targetName.name;
                clothActorList(listallQuery).then(response => {
                    if(response.data.content[0]){
                        this.postForm.clothesValue = response.data.content[0].dressname;
                        this.postForm.picture = response.data.content[0].dresspic;
                        this.postForm.video = response.data.content[0].dressvideo;
                        this.postForm.chothWeather = response.data.content[0].weather;
                        this.postForm.minTemperature = response.data.content[0].mintemp;
                        this.postForm.maxTemperature = response.data.content[0].maxtemp;
                        this.postForm.chothCondition = response.data.content[0].condition;
                        this.postForm.price = response.data.content[0].price;
                    } else {
                        this.postForm.clothesValue = '';
                        this.postForm.picture = '';
                        this.postForm.video = '';
                        this.postForm.chothWeather = '';
                        this.postForm.minTemperature = '';
                        this.postForm.maxTemperature = '';
                        this.postForm.chothCondition = '';
                        this.postForm.price = '';
                    }
                })
            },
            getList() {
                this.listLoading = true;
                let listQuery={};
                listQuery.actorid = parseInt(this.postForm.actor.value);
                clothclassList(listQuery).then(response => {
                    this.list = response.data.content;
                    if (response.data.content[0]) {
                        this.showClothDetail = true;
                        this.activeName = response.data.content[0].typeid;
                    } else {
                        this.showClothDetail = false;
                    }
                 })
             },
            addTab(targetName,action) {
                if (this.postForm.actor) {
                    this.dialogFormVisible = true;
                } else {
                    this.$message({
                        message: '请先选择主角',
                        type: 'error'
                    });
                }
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
                    this.listLoading = true;
                    let deleteitem={
                        id: parseInt(targetName)
                    };
                    this.listLoading = true;
                    clothclassdelete(deleteitem).then(response => {
                        //this.list = response.data.content;
                        this.listLoading = false;
                    });
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    row.status = status;
                    let tabs = this.list;
                    let activeName = this.activeName;
                    if (activeName === targetName) {
                        alert()
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
                        console.log(response);
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
                        this.getList();
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

