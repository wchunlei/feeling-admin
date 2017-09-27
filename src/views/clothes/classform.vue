<template>
    <div class="createPost-container">
        <div class="cloth_center">
            <el-form class="form-container" :model="postFormCommon" ref="postFormCommon">
                <el-form-item label-width="90px" label="选择主角:" class="postInfo-container-item" prop="actor">
                    <multiselect v-model="postFormCommon.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                                 deselectLabel="" track-by="key" :internalSearch="false" label="key" style="width:150px;">
                        <span slot='noResult'>无结果</span>
                    </multiselect>
                </el-form-item>
                <el-form-item label-width="90px" label="服装分类:" class="postInfo-container-item" prop="clothclass">
                    <!--<el-button type="primary" size="" @click="addTab(editableTabsValue2)" style="margin-bottom: 40px">新增分类</el-button>-->
                    <el-tabs v-model="activeName"  editable @edit="addTab" @tab-remove="removeTab" @tab-click="getTypeid">
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
                            <span style="margin:20px 20px 0 0;float:left;">分类ICON:</span>
                            <img :src=item.typeicon style="width:100px;height:100px" alt=""></img>
                        </el-tab-pane>
                    </el-tabs>
                </el-form-item>
            </el-form>

            <hr v-if="showClothDetail" width="96%" style=" height:1px;border:none;border-top:1px dotted #185598;margin-bottom:25px" />
            <el-dialog title="新增分类" :visible.sync="dialogFormVisible">
                <el-form :model="classify" :rules="classifyRules" ref="classify">
                    <el-form-item label="分类名称" :label-width="formLabelWidth" prop="name" style="margin-bottom: 30px;width: 570px">
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
                    <el-button type="primary" @click="classifyDialog('classify')">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="新增服装" :visible.sync="dialogAddCloth">
                <Cloth :actorId="actorId" :actorName="actorName" :typeId="typeId" :typeName="typeName" v-on:close="dialogClose"></Cloth>
                <!--<div slot="footer" class="dialog-footer">
                    <el-button @click="dialogAddCloth = false">取 消</el-button>
                    <el-button type="primary" @click="addCloth">确 定</el-button>
                </div>-->
            </el-dialog>

            <el-dialog title="编辑服装" :visible.sync="dialogEditCloth">
                <el-form class="form-container" :model="postFormEdit" ref="postFormEdit">
                    <el-form-item v-if="showClothDetail" label="服装名称:" :label-width="formLabelWidth" prop="dressname">
                        <el-input v-model="postFormEdit.dressname" auto-complete="off" style="width:200px;"></el-input>
                    </el-form-item>
                    <el-form-item v-if="showClothDetail" label="服装图片:" :label-width="formLabelWidth">
                        <div style="margin-bottom: 20px;">
                            <Upload v-model="postFormEdit.dresspic"></Upload>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="showClothDetail" label="服装视频:" :label-width="formLabelWidth">
                        <div style="margin-bottom: 20px;">
                            <!--<Upload v-model="postForm.dressvideo"></Upload>-->
                            <Uploadvideo v-model="postFormEdit.dressvideo"></Uploadvideo>
                        </div>
                    </el-form-item>
                    <div v-if="showClothDetail" style="margin:20px 30px;">
                        <el-form-item label="服装温度:" style="margin-bottom: 40px;" label-width="90px" prop="mintemp">
                            <el-input v-model="postFormEdit.mintemp" size="small" placeholder="最低温度" style="width:88px;"></el-input> ---
                            <el-input v-model="postFormEdit.maxtemp" size="small" placeholder="最高温度" style="width:88px;"></el-input>
                        </el-form-item>
                        <el-form-item label="服装天气:" style="margin-bottom: 40px;" label-width="90px" prop="weather">
                            <el-select v-model="postFormEdit.weather" placeholder="请选择" style="width:200px;">
                                <el-option
                                        v-for="item in weatherOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="服装条件:" style="margin-bottom: 40px;" label-width="90px" prop="condition">
                            <el-select v-model="postFormEdit.condition" placeholder="请选择" style="width:200px;">
                                <el-option
                                        v-for="item in conditionOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="服装价格:" style="margin-bottom: 40px;" label-width="90px" prop="price">
                            <el-input v-model="postFormEdit.price" placeholder="请输入服装价格" style="width:200px;"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogEditCloth = false">取 消</el-button>
                    <el-button type="primary" @click="editCloth('postFormEdit')">确 定</el-button>
                </div>
            </el-dialog>

            <template v-if="showDiary" v-for="postForm in postFormList">
                <div>
                    <el-form class="form-container" :model="postForm" ref="postForm">
                        <el-form-item v-if="showClothDetail" label="服装名称:" :label-width="formLabelWidth" prop="dressname">
                            <el-input v-model="postForm.dressname" auto-complete="off" style="width:200px;"></el-input>
                        </el-form-item>
                        <el-form-item v-if="showClothDetail" label="服装图片:" :label-width="formLabelWidth">
                            <div style="margin-bottom: 20px;">
                                <Upload v-model="postForm.dresspic"></Upload>
                            </div>
                        </el-form-item>
                        <el-form-item v-if="showClothDetail" label="服装视频:" :label-width="formLabelWidth">
                            <div style="margin-bottom: 20px;">
                                <!--<Upload v-model="postForm.dressvideo"></Upload>-->
                                <Uploadvideo v-model="postForm.dressvideo"></Uploadvideo>
                            </div>
                        </el-form-item>
                        <div v-if="showClothDetail" style="margin:20px 30px;">
                            <el-form-item label="服装温度:" style="margin-bottom: 40px;" label-width="90px" prop="mintemp">
                                <el-input v-model="postForm.mintemp" size="small" placeholder="最低温度" style="width:88px;"></el-input> ---
                                <el-input v-model="postForm.maxtemp" size="small" placeholder="最高温度" style="width:88px;"></el-input>
                            </el-form-item>
                            <el-form-item label="服装天气:" style="margin-bottom: 40px;" label-width="90px" prop="weather">
                                <el-select v-model="postForm.weather" placeholder="请选择" style="width:200px;">
                                    <el-option
                                            v-for="item in weatherOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="服装条件:" style="margin-bottom: 40px;" label-width="90px" prop="condition">
                                <el-select v-model="postForm.condition" placeholder="请选择" style="width:200px;">
                                    <el-option
                                            v-for="item in conditionOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="服装价格:" style="margin-bottom: 40px;" label-width="90px" prop="price">
                                <el-input v-model="postForm.price" placeholder="请输入服装价格" style="width:200px;"></el-input>
                            </el-form-item>
                        </div>
                        <el-form-item label-width="30px" label="" style="display: inline-block">
                            <el-button type="primary" @click="editClothData(postForm)">编辑服装</el-button>
                        </el-form-item>
                        <el-form-item label-width="20px" label="" style="display: inline-block">
                            <el-button type="primary" @click="delCloth(postForm.dressid)">删除服装</el-button>
                        </el-form-item>
                        <hr v-if="showClothDetail" width="96%" style=" height:1px;border:none;border-top:1px dotted #185598;margin-bottom:25px" />
                    </el-form>
                </div>
            </template>

            <el-button v-if="showClothDetail" type="primary" @click="addClothes" style="margin:0 0 20px 30px">新增服装</el-button>
        </div>
    </div>
</template>

<script type="text/ECMAScript-6">
    import Tinymce from 'components/Tinymce';
    import Upload from 'components/Upload/singleImage3';
    import Uploadvideo from 'components/Upload/video';
    import Cloth from 'components/Clothes/addcloth';
    import MDinput from 'components/MDinput';
    import { validateURL } from 'utils/validate';
    import { userSearch } from 'api/story';
    import { clothclassUpdate } from 'api/cloth';
    import { clothclassList } from 'api/cloth';
    import { clothActorList } from 'api/cloth';
    import { clothclassdelete } from 'api/cloth';
    import { clothUpdate } from 'api/cloth';
    import { clothdelete } from 'api/cloth';

    export default {
        name: 'clothes',
        components: { Tinymce, MDinput, Upload, Uploadvideo, Cloth },
        data() {
            return {
                actorId: '',
                actorName: '',
                typeId: '',
                typeName: '',
                postFormCommon: {
                    actor: ''
                },
                postForm: {
                    dressname: '',
                    mintemp:'',
                    maxtemp: '',
                    weather: '',
                    condition: '',
                    dresspic: '',
                    dressvideo: '',
                    price: '',
                },
                postFormEdit: {
                    dressname: '',
                    mintemp:null,
                    maxtemp: null,
                    weather: '',
                    condition: '',
                    dresspic: '',
                    dressvideo: '',
                    price: null,
                },
                weatherOptions: [{
                    value: 'sun',
                    label: '晴天'
                }, {
                    value: 'rain',
                    label: '下雨'
                }, {
                    value: 'cloudy',
                    label: '阴天'
                }, ],
                conditionOptions: [{
                    value: 0,
                    label: '无'
                }, {
                    value: 1,
                    label: '任一'
                }, {
                    value: 2,
                    label: '全部'
                }],
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
                dialogEditCloth: false,
                dialogAddCloth: false,
                showClothDetail: false,
                showDiary: false,
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
                postFormList: [],
                listQuery: {},
                listallQuery: {},
                classifyRules: {
                    name: [{ required: true, message: '请输入分类名称' }]
                }
            }
        },
        created () {
            let Query = {};
            this.getRemoteUserList(Query);
            if(this.postFormCommon.actor.value){
                //this.getList();
             }
            if(this.$route.params.num && this.$route.params.num != ':num'){
                this.postFormCommon.actor = {key: this.$route.params.name, value: this.$route.params.num };
                this.listQuery.actorid = this.$route.params.num;
                this.getList();
                this.actorId = this.$route.params.num;
                this.actorName = this.$route.params.name;
            }
        },
        watch: {
            "postFormCommon.actor" (newval,oldval) {
                if (newval && newval.key) {
                    this.getList();
                    this.actorName = newval.key;
                    this.actorId = newval.value;
                } else {
                    this.list = [];
                    this.showClothDetail = false;
                }
            },
            "typeId" (newval,oldval) {
                this.listallQuery.typeid = newval;
            }
        },
        methods : {
            dialogClose (data) {
                this.dialogAddCloth = false;
                //alert(this.listallQuery.typeid)
                //this.getTypeid(this.listallQuery);
            },
            addClothes () {
                if (typeof this.typeId == "undefined") {
                    this.$message({
                        message: '请先选择服装分类',
                        type: 'warning'
                    });
                } else {
                    this.dialogAddCloth = true;
                }
            },
            editClothData (data) {
                this.dialogEditCloth = true;
                this.postFormEdit = data;
                this.postFormEdit.actorid = parseInt(this.$route.params.num);
                this.postFormEdit.typeid = parseInt(this.typeId);
            },
            editCloth (formName) {
                this.$refs.postFormEdit.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        clothUpdate (this.postFormEdit).then(response => {
                            if(response.data.code==200){
                                this.$message({
                                    message: '编辑成功',
                                    type: 'success'
                                });
                                this.dialogEditCloth = false;
                                //this.$emit("close","false");
                                //this.$refs[formName].resetFields();
                            }
                            /*if (!response.data.items) return;
                             console.log(response)
                             this.userLIstOptions = response.data.items.map(v => ({
                             key: v.name
                             }));*/
                        });
                        /*this.$notify({
                         title: '成功',
                         message: '发布成功',
                         type: 'success',
                         duration: 2000
                         });*/
                        this.loading = false;
                    }else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            delCloth (id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let deleteitem={
                        id: parseInt(id)
                    };
                    clothdelete(deleteitem).then(response => {
                        //this.list = response.data.content;
                        if(response.data.code==200){
                            //this.getList();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getTypeid (targetName) {
                this.listLoading = true;
                this.listLoading = false;
                this.typeId = targetName.name;
                this.typeName = targetName.label;
                //alert(this.typeName)
                //let listallQuery={};
                this.listallQuery.actorid = parseInt(this.postFormCommon.actor.value);
                this.listallQuery.typeid = targetName.name;
                clothActorList(this.listallQuery).then(response => {
                    if(response.data.content[0]){
                        this.showDiary = true;
                        this.postFormList = response.data.content;
                        /*this.postForm.clothesValue = response.data.content[0].dressname;
                        this.postForm.picture = response.data.content[0].dresspic;
                        this.postForm.video = response.data.content[0].dressvideo;
                        this.postForm.chothWeather = response.data.content[0].weather;
                        this.postForm.minTemperature = response.data.content[0].mintemp;
                        this.postForm.maxTemperature = response.data.content[0].maxtemp;
                        this.postForm.chothCondition = response.data.content[0].condition;
                        this.postForm.price = response.data.content[0].price;*/
                    } else {
                        this.showDiary = false;
                        /*this.postForm.clothesValue = '';
                        this.postForm.picture = '';
                        this.postForm.video = '';
                        this.postForm.chothWeather = '';
                        this.postForm.minTemperature = '';
                        this.postForm.maxTemperature = '';
                        this.postForm.chothCondition = '';
                        this.postForm.price = '';*/
                    }
                })
            },
            getList() {
                this.listLoading = true;
                //let listQuery={};
                this.listQuery.actorid = parseInt(this.postFormCommon.actor.value);
                clothclassList(this.listQuery).then(response => {
                    this.list = response.data.content;
                    if (response.data.content[0]) {
                        this.showClothDetail = true;
                        this.activeName = response.data.content[0].typeid.toString();
                        this.typeName = response.data.content[0].typename;
                        this.typeId = response.data.content[0].typeid;
                        this.listallQuery.typeid = response.data.content[0].typeid;
                        this.getTypeid(this.listallQuery);
                    } else {
                        this.showClothDetail = false;
                    }
                 })
             },
            addTab(targetName,action) {
                if (action === 'add') {
                    if (this.postFormCommon.actor) {
                        this.dialogFormVisible = true;
                    } else {
                        this.$message({
                            message: '请先选择主角',
                            type: 'error'
                        });
                    }
                }
                if (action === 'remove') {
                    this.removeTab(targetName);
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
                    let deleteitem={
                        id: parseInt(targetName)
                    };
                    clothclassdelete(deleteitem).then(response => {
                        //this.list = response.data.content;
                        if (response.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getList();
                        }
                    });
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

            classifyDialog (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogFormVisible = false;
                        let newTabName = ++this.tabIndex + '';
                        this.$refs.postForm.validate(valid => {
                            if (valid) {
                                let clothinfo = {
                                    actorid: parseInt(this.postFormCommon.actor.value),
                                    typename: this.classify.name,
                                    typeicon: this.classify.upload
                                };
                                this.loading = true;
                                clothclassUpdate (clothinfo).then(response => {
                                    if (response.data.code == 200) {
                                        this.$message({
                                            message: '新增成功',
                                            type: 'success'
                                        });
                                        this.getList();
                                    }
                                /*this.userLIstOptions = response.data.items.map(v => ({
                                            key: v.name
                                        }));*/
                                });
                                //this.postForm.status = 'published';
                                this.loading = false;
                            } else {
                                console.log('error submit!!');
                                return false;
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                /*if(JSON.stringify(this.list).indexOf(this.classify.name)==-1){
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
<style>
    .el-tab-pane{
        margin-left:0
    }
    .el-dialog__header {
        height:40px;
        padding:0;
        text-align:center;
        line-height:40px;
        background-color:#1970cf;
    }

    .el-dialog__header .el-dialog__title {
        color:#fff;
        font-weight:500;
        font-size:14px;
    }
    .el-dialog .el-dialog__body {
        max-height:730px;
        overflow:auto;
    }
    .el-dialog__headerbtn {
        margin-right:10px
    }
    .el-tabs__new-tab .el-icon-plus {
        color:#20a0ff;
    }
    .el-tabs__header {
        width: 50%;
    }
</style>
