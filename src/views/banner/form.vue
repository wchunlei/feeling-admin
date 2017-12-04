<template>
    <div class="createPost-container">
        <el-form class="form-container" :model="postForm" ref="postForm" :rules="actorDetail">

            <div class="createPost-main-container">

                <el-form-item label-width="100px" label="主角:" prop="actor" style="margin-bottom: 40px;">
                    <multiselect v-model="postForm.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                                 deselectLabel="" track-by="key" :internalSearch="false" label="key" style="width:150px;">
                        <span slot='noResult'>无结果</span>
                    </multiselect>
                </el-form-item>

                <el-form-item label="问题:" label-width="100px" prop="nature" style="margin-bottom: 40px">
                    <el-input type="textarea" placeholder="最多输入15个字" style='width:280px;' v-model="postForm.nature"  maxlength="15" rows="3"></el-input>
                </el-form-item>

                <el-form-item label="回答:" label-width="100px" prop="headurl" style="margin-bottom: 40px">
                    <div style="margin-bottom: 20px;width:800px">
                        <Uploadaudio v-model="postForm.headurl"></Uploadaudio>
                        <span style="font-size:12px">（注：请mp3等音频格式的文件）</span>
                    </div>
                </el-form-item>

                <el-form-item label="头像框:" label-width="100px" prop="headSelect" style="margin-bottom: 40px">
                    <el-select v-model="postForm.headSelect" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="背景图:" label-width="100px" prop="backImg" style="margin-bottom: 40px">
                    <div style="margin-bottom: 20px;width:800px">
                        <Uploadhead v-model="postForm.backImg" v-on:input="picInput"></Uploadhead>
                        <span style="font-size:12px">（注：请上传比例4：3，不小于100Kb的图片）</span>
                    </div>
                </el-form-item>

                <el-form-item label="配置状态:" label-width="100px" prop="config" style="margin-bottom: 40px">
                    <el-select v-model="postForm.config" placeholder="请选择">
                        <el-option v-for="item in configOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span style="font-size:12px">（注：下架状态：该主角不会在App中显示）</span>
                </el-form-item>

                <el-form-item label="私密圈排序:" label-width="100px" prop="private" style="margin-bottom: 40px">
                    <el-select v-model="postForm.private" placeholder="请选择">
                        <el-option v-for="item in privateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span style="font-size:12px">（注：默认排序：按照上架时间逆序排列）</span>
                </el-form-item>

                <el-form-item label="加速价格:" label-width="100px" prop="timeNum" style="margin-bottom: 40px">
                    <el-input placeholder="" style='width:60px;' v-model="postForm.timeNum" :disabled="disable" maxlength="10"></el-input>
                    <el-select v-model="postForm.time" placeholder="请选择" style="width:80px">
                        <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input placeholder="" style='width:50px;' v-model="postForm.price" :disabled="disable" maxlength="10"></el-input>
                    <span>钻石</span>
                </el-form-item>

                <el-form-item label="配置工作时间:" label-width="100px" prop="" >
                    <div v-for="workTime in postForm.workTimes" style="margin-bottom: 40px">
                        <el-date-picker v-model="workTime.value" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                        <el-button @click.prevent="addWork">新增工作时间</el-button>
                        <el-button @click.prevent="removeWork(workTime)">删除</el-button>
                    </div>
                </el-form-item>

                <el-form-item label-width="100px">
                    <el-button type="primary" @click.prevent="add">新增</el-button>
                </el-form-item>

            </div>
        </el-form>

    </div>
</template>

<script type="text/ECMAScript-6">
    import Tinymce from 'components/Tinymce';
    import Upload from 'components/Upload/singleImage3';
    import Uploadhead from 'components/Upload/headPhoto'
    import Uploadvideo from 'components/Upload/video';
    import Uploadaudio from 'components/Upload/audio'
    import { userSearch } from 'api/story';
    import MDinput from 'components/MDinput';
    import { validateURL } from 'utils/validate';
    import { getArticle } from 'api/article';
    import { actorUpdate } from 'api/actor';
    import { actorListAll } from 'api/actor';
    import { addPhotos } from 'api/actor';
    import { delPhotos } from 'api/actor';
    import { addPhoto } from 'api/actor';
    import { thumbnaillist } from 'api/actor';
    import { addMvs } from 'api/actor';
    import { delMv } from 'api/actor';

    export default {
        name: 'articleDetail',
        components: { Tinymce, MDinput, Upload, Uploadvideo, Uploadhead, Uploadaudio },
        data() {
            const checkNum = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('输入不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入正整数'));
                    } else {
                        if (value < 0) {
                            callback(new Error('不能小于0'));
                        } else {
                            callback();
                        }
                    }
                }, 500);
            };
            const validateRequire = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('输入不能为空'));
                } else {
                    callback()
                }
            };
            const validateSourceUri = (rule, value, callback) => {
                if (value) {
                    if (validateURL(value)) {
                        callback()
                    } else {
                        this.$message({
                            message: '外链url填写不正确',
                            type: 'error'
                        });
                        callback(null)
                    }
                } else {
                    callback()
                }
            };
            return {
                phopoid: '',
                watcher: false,
                listQuery: {},
                photoData: {},
                mvData: {},
                photoid: '',
                progressesData: {
                    percentage: 25,
                    progress: false
                },
                progressStatus: '',
                postForm: {
                    actor: '', // 文章题目
                    name: '', // 文章内容
                    gender: '2',
                    weight: '',
                    height: '',
                    bust: '',
                    age: '',
                    job: '',
                    nature: '',
                    headurl: '', // 文章图片
                    headSelect: '',
                    backImg: '',
                    config: '',
                    private: '',
                    timeNum: '',
                    time: '',
                    price: '',
                    workTimes: [{
                        value: ''
                    }],
                    //id: '',
                    status: 'published',
                },
                configOptions: [{
                    value: '0',
                    label: '下架'
                },{
                    value: '1',
                    label: '上架'
                }],
                privateOptions: [{
                    value: '0',
                    label: '默认'
                },{
                    value: '1',
                    label: '1'
                }],
                timeOptions: [{
                    value: '0',
                    label: '小时'
                },{
                    value: '1',
                    label: '秒'
                },{
                    value: '2',
                    label: '分钟'
                },{
                    value: '3',
                    label: '天'
                },{
                    value: '4',
                    label: '周'
                }],
                photos: [],
                photosList: {
                    url: '',
                    amount: '',
                    name: '',
                    photoNum: ''
                },
                upPhotos: {
                    photourl: '',
                    thumbnail: ''
                },
                addmvs: {
                    thumbnail: '',
                    url: '',
                    mvurl: '',
                    name: '',
                    amount: ''
                },
                mvs: [],
                showPhoto: true,
                showHr: true,
                dialogPhoto: false,
                dialogMv: false,
                flagPhoto: false,
                dialogVisible: false,
                fetchSuccess: true,
                loading: false,
                userLIstOptions: [],
                natureLength: false,
                disable: true,
                sexOptions: [{
                    value: '1',
                    label: '男'
                }, {
                    value: '2',
                    label: '女'
                }],
                addPhotosRules: {
                    url: [{ validator: validateRequire }],
                    amount: [{ validator: checkNum }],
                    name: [{ validator: validateRequire }]
                },
                addMvRules: {
                    thumbnail: [{ validator: validateRequire }],
                    mvurl: [{ validator: validateRequire }],
                    amount: [{ validator: checkNum }],
                    mvname: [{ validator: validateRequire }]
                },
                picListRules: {
                    photourl: [{ validator: validateRequire }]
                },
                actorDetail: {
                    name: [{ validator: validateRequire, trigger: 'blur' }],
                    style: [{ validator: validateRequire, trigger: 'blur' }],
                    height: [{ type: 'number', trigger: 'blur', message: '请输入数值' }],
                    weight: [{ type: 'number', trigger: 'blur', message: '请输入数值' }],
                    age: [{ validator: checkNum, trigger: 'blur' }],
                    //bust: [{ validator: checkNum, trigger: 'blur' }],
                }
            }
        },
        /*computed: {
         natureLength() {
         return this.postForm.nature.length
         },
         isEdit() {
         return this.$route.meta.isEdit // 根据meta判断
         // return this.$route.path.indexOf('edit') !== -1 // 根据路由判断
         }
         },*/
        created() {
            let Query = {};
            this.getRemoteUserList(Query);
            if(this.$route.params && this.$route.params.actor != ':actor') {
                this.listQuery.actorid = parseInt(this.$route.params.actor);
                this.getDetail(this.listQuery);
                this.photoData.id = parseInt(this.$route.params.actor);
                this.mvData.id = parseInt(this.$route.params.actor);
                this.fetchSuccess = false;
            } else {
                this.showPhoto = false;
                this.disable = false;
                this.showHr =false;
            }
            /*if (this.isEdit) {
             this.fetchData();
             }*/
        },
        watch : {
            "watcher" : {
                handler:function(val,oldval){
                    this.picList(this.photoid);
                },
                deep: true
            }
        },
        methods: {
            uploadListener (data) {
                alert(data)
            },
            addWork () {
                this.postForm.workTimes.push({
                    value: ''
                });
            },
            removeWork(item) {
                var index = this.postForm.workTimes.indexOf(item)
                if (index !== -1) {
                    this.postForm.workTimes.splice(index, 1)
                }
            },
            getDetail () {
                actorListAll (this.listQuery).then(response => {
                    this.postForm = response.data.content;
                    if (response.data.content.gender == 1) {
                        this.postForm.gender = '男'
                    }
                    if (response.data.content.gender == 2) {
                        this.postForm.gender = '女'
                    }
                    this.photos = response.data.content.photo;
                    this.mvs = response.data.content.mv;
                    if (this.photos == '') {
                        this.showHr =false;
                    }
                    /*for(let i=0;i<this.postForm.nature.length;i++){
                     this.postForm.nature[i].name = response.data.content.nature[i].name;
                     this.postForm.nature = this.postForm.nature + this.postForm.nature[i].name + ',';
                     alert(this.postForm.nature)
                     }
                     this.postForm.nature = this.postForm.nature.replace("undefined",'');*/
                    /*for(let i=0;i<response.data.content.photo.length;i++){
                     this.photos.amount =this.photos[i].amount;
                     this.photos.url = this.photos[i].url;
                     }*/
                    //this.photos.amount =this.photos[0].amount;
                    //this.photos.url = this.photos[0].url;
                }).catch(err => {
                    this.fetchSuccess = false;
                    console.log(err);
                });
            },
            fetchData() {
                getArticle().then(response => {
                    this.postForm = response.data;
                }).catch(err => {
                    this.fetchSuccess = false;
                    console.log(err);
                });
            },
            submitForm(formName) {
                //this.postForm.display_time = parseInt(this.display_time / 1000);
                console.log(this.postForm)
                var actorinfo;
                actorinfo = this.postForm;
                this.$refs.postForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        actorUpdate(actorinfo).then(response => {
                            /*if (!response.data.items) return;
                             console.log(response)
                             this.userLIstOptions = response.data.items.map(v => ({
                             key: v.name
                             }));*/
                            if(response.data.code == 200) {
                                this.$message({
                                    message: '发布成功',
                                    type: 'success'
                                });
                                this.$refs[formName].resetFields();
                                this.postForm.status = 'published';
                            }
                        });
                        this.loading = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            draftForm() {
                if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
                    this.$message({
                        message: '请填写必要的标题和内容',
                        type: 'warning'
                    });
                    return;
                }
                this.$message({
                    message: '保存成功',
                    type: 'success',
                    showClose: true,
                    duration: 1000
                });
                this.postForm.status = 'draft';
            },
            addPhotos (photosList) {
                //this.photoData.name = this.postForm.photo;
                this.photoData.amount = parseInt(this.photosList.amount);
                this.photoData.url = this.photosList.url;
                this.photoData.name = this.photosList.name;
                this.$refs.photosList.validate(valid => {
                    if (valid) {
                        addPhotos(this.photoData).then(response => {
                            //this.postForm = response.data;
                            this.photoid = response.data.photoid;
                            if (response.data.code == 200) {
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                this.$refs[photosList].resetFields();
                            }
                            this.getDetail(this.listQuery);
                        }).catch(err => {
                            this.fetchSuccess = false;
                            console.log(err);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            /*surePhoto (id) {
             this.dialogPhoto = false;
             this.flagPhoto = true;
             let photoid={
             id: id
             };
             if(this.flagPhoto){
             delPhotos (photoid).then(response => {
             //this.postForm = response.data;
             this.flagPhoto = false;
             this.getDetail(this.listQuery);
             console.log()
             }).catch(err => {
             this.fetchSuccess = false;
             console.log(err);
             });
             }
             },*/
            delPhoto (id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let photoid={
                        id: id
                    };
                    delPhotos (photoid).then(response => {
                        //this.postForm = response.data;
                        this.flagPhoto = false;
                        this.getDetail(this.listQuery);
                        console.log()
                    }).catch(err => {
                        this.fetchSuccess = false;
                        console.log(err);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                //this.dialogPhoto = true;
                /*let photoid={
                 id: id
                 };
                 if(this.flagPhoto){
                 delPhotos (photoid).then(response => {
                 //this.postForm = response.data;
                 console.log()
                 }).catch(err => {
                 this.fetchSuccess = false;
                 console.log(err);
                 });
                 }*/
            },
            delPicture (id,url) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let photoinfo={
                        id: id,
                        url: url
                    };
                    delPhotos (photoinfo).then(response => {
                        //this.postForm = response.data;
                        this.thumbnaillist(id);
                        console.log()
                    }).catch(err => {
                        this.fetchSuccess = false;
                        console.log(err);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addMv (addmvs) {
                let mvlist = {
                    id: parseInt(this.$route.params.actor),
                    mvname: this.addmvs.mvname,
                    mvurl: this.addmvs.mvurl,
                    mvpicture: this.addmvs.thumbnail,
                    amount: parseInt(this.addmvs.amount)
                };
                this.$refs.addmvs.validate(valid => {
                    if (valid) {
                        addMvs (mvlist).then(response => {
                            //this.postForm = response.data;
                            if(response.data.code==200){
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                this.$refs[addmvs].resetFields();
                            }
                            this.getDetail(this.listQuery);
                        }).catch(err => {
                            this.fetchSuccess = false;
                            console.log(err);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            /*sureMv (id) {
             this.dialogMv = false;
             this.flagMv = true;
             let mvid={
             id: id
             };
             delMv (mvid).then(response => {
             //this.postForm = response.data;
             this.getDetail(this.listQuery);
             console.log()
             }).catch(err => {
             this.fetchSuccess = false;
             console.log(err);
             });
             },*/
            delMv (id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let mvid={
                        id: id
                    };
                    delMv (mvid).then(response => {
                        //this.postForm = response.data;
                        this.getDetail(this.listQuery);
                        console.log()
                    }).catch(err => {
                        this.fetchSuccess = false;
                        console.log(err);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                //this.dialogMv = true;
                /*let mvid={
                 id: id
                 };
                 delMv (mvid).then(response => {
                 //this.postForm = response.data;
                 console.log()
                 }).catch(err => {
                 this.fetchSuccess = false;
                 console.log(err);
                 });*/
            },
            thumbnaillist (id) {
                this.photoid = id;
                this.dialogVisible = true;
                let list = {
                    id: parseInt(this.$route.params.actor),
                    photoid: id
                };
                thumbnaillist (list).then(response => {
                    this.upPhotos = response.data.content;
                    //this.photos.photoNum = response.data.content.length;
                    for(let i=0;i<this.photos.length;i++){
                        if(this.photos[i].id == id){
                            this.photos[i].photoNum = response.data.content.length;
                        }
                    }
                    console.log();
                }).catch(err => {
                    this.fetchSuccess = false;
                    console.log(err);
                });
            },
            picInput (data) {
                if (data) {
                    this.watcher = data;
                }
            },
            picList (id) {
                let photoList={
                    id: parseInt(this.$route.params.actor),
                    photoid: id,
                    photourl: this.upPhotos.photourl
                };
                //photoList.photourl = this.upPhotos.photourl;
                //this.$refs.upPhotos.validate(valid => {
                //if (valid) {

                /*} else {
                 console.log('error submit!!');
                 return false;
                 }
                 });*/
                if (photoList.photourl) {
                    addPhoto (photoList).then(response => {
                        console.log();
                        this.upPhotos.photourl = '';
                        this.thumbnaillist(id);
                    }).catch(err => {
                        this.fetchSuccess = false;
                        console.log(err);
                    });
                }/* else {
                 this.$message({
                 message: '上传失败',
                 type: 'error'
                 });
                 }*/
                //this.dialogVisible = false;
            },
            getRemoteUserList(query) {
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
<style rel="stylesheet/scss" lang="scss">
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
        max-height:740px;
        overflow:auto;
    }
    .el-dialog__headerbtn {
        margin-right:10px
    }
    .delButton {
        position: relative;
        left: -20px;
        top:-5px
    }
    .uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .icon-position {
        position: absolute;
        left: 60px;
        top: 60px;
    }
    }
</style>

