<template>
    <div class="createPost-container">

        <!--<el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="userInfo">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="comment">配置管理</el-tab-pane>
        </el-tabs>-->
        <div style="position: relative; left :100px;top: 20px;margin-bottom: 40px">
            <el-radio-group v-model="userInfo" @change="userTab">
                <el-radio-button label="info">用户信息</el-radio-button>
                <el-radio-button label="comment">用户评论</el-radio-button>
            </el-radio-group>
        </div>

        <el-form v-show="infoForm" class="form-container" :model="postForm" ref="postForm" :rules="actorDetail">

            <div class="createPost-main-container">

                <el-form-item label-width="100px" label="主角:" prop="actor" style="margin-bottom: 40px;" required>
                    <multiselect v-model="postForm.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                                 deselectLabel="" track-by="key" :internalSearch="false" label="key" style="width:150px;">
                        <span slot='noResult'>无结果</span>
                    </multiselect>
                </el-form-item>

                <el-form-item label="问题:" label-width="100px" prop="question" style="margin-bottom: 40px" required>
                    <el-input type="textarea" placeholder="最多输入15个字" style='width:280px;' v-model="postForm.question"  :maxlength="15" :rows="3"></el-input>
                </el-form-item>

                <el-form-item label="回答:" label-width="100px" prop="answer" style="margin-bottom: 40px" required>
                    <div style="margin-bottom: 20px;">
                        <Uploadaudio v-model="postForm.answer"></Uploadaudio>
                        <span style="font-size:12px">（注：请mp3等音频格式的文件）</span>
                    </div>
                </el-form-item>

                <el-form-item label="置顶设置:" label-width="100px" prop="top" style="margin-bottom: 40px" required>
                    <!--<el-select v-model="postForm.top" placeholder="请选择">
                        <el-option v-for="item in topOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>-->
                    <template>
                        <span @click="showNotTop"><el-radio v-model="radioContent" label="0">不置顶</el-radio></span>
                        <span @click="showTop"><el-radio v-model="radioContent" label="1">置顶</el-radio></span>
                    </template>
                </el-form-item>

                <div v-show="showNoTop" style="display: inline-block;margin-bottom: 20px">
                    <el-form-item label="偷听价格:" label-width="100px" prop="price" style="margin-bottom: 40px" required>
                        <el-input placeholder="请输入价格" style='width:190px;' v-model.number="postForm.price" :maxlength="10"></el-input>
                        <span>钻石</span>
                    </el-form-item>
                    <el-form-item label="偷听排序:" label-width="100px" prop="listen" style="margin-bottom: 40px" required>
                        <el-select v-model="postForm.listen" placeholder="请选择">
                            <el-option v-for="item in listenOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <span style="font-size:12px">（注：默认排序：按照上架时间逆序排列）</span>
                    </el-form-item>
                </div>

                <el-form-item v-show="showYesTop" label="偷听图片:" label-width="100px" prop="backImg" style="margin-bottom: 40px" required>
                    <!--<div style="margin-bottom: 20px;">
                        <Upload v-model="postForm.backImg" v-on:input="picInput"></Upload>
                        <span style="font-size:12px">（注：请上传比例4：3，不小于100Kb的图片）</span>
                    </div>-->
                    <div style="margin-right: 20px;width: 320px;height: 180px;border: 1px dashed #d9d9d9;">
                        <Upload v-model="postForm.backImg" v-on:input="picInput"></Upload>
                    </div>
                    <span style="font-size:12px;margin-top: -30px;display:inline-block">（注：请上传16:9，不小于10kb，jpg、png等格式的文件）</span>
                </el-form-item>

                <el-form-item label="上架时间:" label-width="100px" prop="configTime" style="margin-bottom: 40px" required>
                    <el-date-picker v-model="postForm.configTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间" :picker-options="pickerOptions1"></el-date-picker>
                    <span style="font-size:12px">（注：不设置上架时间默认为下架状态）</span>
                </el-form-item>

                <!--<el-form-item label="评论内容:" label-width="100px" prop="comments" required>

                    <div style="margin-bottom: 40px">
                        <el-form-item label-width="100px" prop="commentOne">
                            <el-input placeholder="最多输入20个字" style='width:220px;' v-model="postForm.commentOne" :maxlength="20"></el-input>
                            <el-button @click.prevent="addWork">新增评论</el-button>
                        </el-form-item>
                    </div>
                    <div v-for="comment in postForm.comments" style="margin-bottom: 40px">
                        &lt;!&ndash;<el-date-picker v-model="workTime.value" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>&ndash;&gt;
                        <el-input placeholder="最多输入20个字" style='width:220px;' v-model="comment.value" :maxlength="20"></el-input>
                        &lt;!&ndash;<el-button @click.prevent="addWork">新增评论</el-button>&ndash;&gt;
                        <el-button @click.prevent="removeWork(comment)">删除</el-button>
                    </div>
                </el-form-item>-->

                <el-form-item label-width="100px">
                    <el-button v-show="addBut" type="primary" @click.prevent="add" size="large">新增女仆FM</el-button>
                    <el-button v-show="saveBut" type="primary" @click.prevent="save" size="large">保存女仆FM</el-button>
                </el-form-item>

            </div>
        </el-form>

        <el-form v-show="commentForm" class="form-container" :model="postFormComment" ref="postFormComment" :rules="postFormComment">
            <div class="createPost-main-container">
                <el-form-item label="新增评论:" label-width="100px" prop="comment" style="margin-bottom: 40px" required>
                    <el-input type="textarea" placeholder="最多输入15个字" style='width:280px;' v-model="postFormComment.comment"  :maxlength="15" :rows="3"></el-input>
                </el-form-item>
                <el-form-item label-width="100px">
                    <el-button type="primary" @click.prevent="add" size="large">新增评论</el-button>
                </el-form-item>
            </div>
        </el-form>

        <div style="margin: 0 100px">
            <el-table :key='tableKey' :data="list1" v-loading.body="listLoading" border fithighlight-current-row style="width: 100%">

                <el-table-column align="center" label="序号" width="80" column-key="id" prop="id">
                    <template scope="scope">
                        <span>{{scope.row.id}}</span>
                        <!-- <span style="color:#337ab7;"><router-link :to="{ path: '/actor/form/' + scope.row.id }">{{scope.row.id}}</router-link></span>-->
                    </template>
                </el-table-column>

                <el-table-column width="350px" align="center" label="评论内容" prop="content">
                    <!--<template scope="scope">
                      <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
                    </template>-->
                    <template scope="scope">
                        <!--<span>{{scope.row.name}}</span>-->
                        <span>{{scope.row.content}}</span>
                    </template>
                </el-table-column>
                <el-table-column min-width="100px" align="center" label="发布人" prop="publish">
                    <template scope="scope">
                        <span>{{scope.row.publish}}</span>
                        <!--<span class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
                    </template>
                </el-table-column>
                <el-table-column min-width="300px" align="center" label="发布时间" prop="publishTime">
                    <template scope="scope">
                        <span>{{scope.row.publishTime}}</span>
                        <!--<span class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
                    </template>
                </el-table-column>
                <el-table-column fixed="right" align="center" label="快捷操作" min-width="150px">
                    <template scope="scope">
                        <el-button @click="handleSort(scope.$index, scope.row)" type="text" size="small">置顶</el-button>
                        <!--<el-button v-if="scope.row.status!='上架'" @click.native.prevent="editRow(scope.row, list1)" type="text" size="small">上架</el-button>
                        <el-button v-if="scope.row.status!='下架'" @click.native.prevent="editRow(scope.row, list1)" type="text" size="small">下架</el-button>-->
                        <el-button @click.native.prevent="deleteRow(scope.$index, list1)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script type="text/ECMAScript-6">
    import Tinymce from 'components/Tinymce';
    import Upload from 'components/Upload/pictureFm';
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
            const validateRequireAll = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('输入不能为空'));
                } else {
                    callback()
                }
            };
            const validateRequire = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('输入不能为空'));
                } else {
                    //let str = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
                    let str = new RegExp("\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]");
                    let flg = false;
                    flg = (value.match(str));
                    if (flg) {
                        return callback(new Error('格式有误,不能输入表情'));
                        //alert('昵称格式有误,请勿输入特殊字符');
                    }
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
                list1: [{
                    id: 1,
                    content: '邻家大姐姐，善解人意，喜欢拍照',
                    publish: '运营',
                    publishTime: '2017-12-2 00:00'
                }],
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
                radioContent: '0',
                showNoTop: true,
                showYesTop: false,
                userInfo: 'info',
                infoForm: true,
                commentForm: false,
                postForm: {
                    actor: '',
                    question: '',
                    answer: '',
                    top: '',
                    backImg: '',
                    configTime: new Date(),
                    listen: '默认',
                    price: 5,
                    comments: [{
                        value: ''
                    }],
                    //id: '',
                    status: 'published',
                },
                postFormComment : {
                    comment: '',
                },
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() + 86400000 < Date.now();
                    },
                },
                /*topOptions: [{
                    value: '0',
                    label: '置顶'
                },{
                    value: '1',
                    label: '不置顶'
                }],*/
                configOptions: [{
                    value: '0',
                    label: '下架'
                },{
                    value: '1',
                    label: '上架'
                }],
                listenOptions: [{
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
                addBut: true,
                saveBut: false,
                sexOptions: [{
                    value: '1',
                    label: '男'
                }, {
                    value: '2',
                    label: '女'
                }],
                actorDetail: {
                    actor: [{ validator: validateRequireAll, trigger: 'blur' }],
                    question: [{ validator: validateRequire, trigger: 'blur' }],
                    //comments: [{ validator: validateRequire, trigger: 'blur' }],
                    commentOne: [{ validator: validateRequire, trigger: 'blur' }],
                    price: [{ validator: checkNum, trigger: 'blur' }],
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
            if(this.$route.params.id && this.$route.params.id != ':id') {
                /*this.listQuery.actorid = parseInt(this.$route.params.actor);
                this.getDetail(this.listQuery);*/
                this.saveBut = true;
                this.addBut = false;
                /*this.photoData.id = parseInt(this.$route.params.actor);
                this.mvData.id = parseInt(this.$route.params.actor);
                this.fetchSuccess = false;*/
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
            userTab () {
                if (this.userInfo == "info") {
                    this.infoForm = true;
                    this.commentForm = false;
                } else {
                    this.infoForm = false;
                    this.commentForm = true;
                }
            },
            uploadListener (data) {
                alert(data)
            },
            addWork () {
                this.postForm.comments.push({
                    value: ''
                });
            },
            removeWork(item) {
                var index = this.postForm.comments.indexOf(item)
                if (index !== -1) {
                    this.postForm.comments.splice(index, 1)
                }
            },
            showNotTop () {
                if(!this.showNoTop){
                    this.showNoTop=true;
                    this.showYesTop=false;
                } else {
                    this.showYesTop=false;
                }
            },
            showTop () {
                if(!this.showYesTop){
                    this.showYesTop=true;
                    this.showNoTop=false;
                } else {
                    this.showNoTop=false;
                }
            },
            /*getDetail () {
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
                    /!*for(let i=0;i<this.postForm.nature.length;i++){
                     this.postForm.nature[i].name = response.data.content.nature[i].name;
                     this.postForm.nature = this.postForm.nature + this.postForm.nature[i].name + ',';
                     alert(this.postForm.nature)
                     }
                     this.postForm.nature = this.postForm.nature.replace("undefined",'');*!/
                    /!*for(let i=0;i<response.data.content.photo.length;i++){
                     this.photos.amount =this.photos[i].amount;
                     this.photos.url = this.photos[i].url;
                     }*!/
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
                            /!*if (!response.data.items) return;
                             console.log(response)
                             this.userLIstOptions = response.data.items.map(v => ({
                             key: v.name
                             }));*!/
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
            /!*surePhoto (id) {
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
             },*!/
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
                /!*let photoid={
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
                 }*!/
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
            /!*sureMv (id) {
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
             },*!/
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
                /!*let mvid={
                 id: id
                 };
                 delMv (mvid).then(response => {
                 //this.postForm = response.data;
                 console.log()
                 }).catch(err => {
                 this.fetchSuccess = false;
                 console.log(err);
                 });*!/
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

                /!*} else {
                 console.log('error submit!!');
                 return false;
                 }
                 });*!/
                if (photoList.photourl) {
                    addPhoto (photoList).then(response => {
                        console.log();
                        this.upPhotos.photourl = '';
                        this.thumbnaillist(id);
                    }).catch(err => {
                        this.fetchSuccess = false;
                        console.log(err);
                    });
                }/!* else {
                 this.$message({
                 message: '上传失败',
                 type: 'error'
                 });
                 }*!/
                //this.dialogVisible = false;
            },*/
            picInput (data) {
                if (data) {
                    this.watcher = data;
                }
            },
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

