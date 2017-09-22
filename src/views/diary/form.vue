<template>
    <div class="createPost-container">
        <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">

            <!--<Sticky :className="'sub-navbar '+postForm.status">
                <template v-if="fetchSuccess">


                    <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm('postForm')">发布
                    </el-button>
                    <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>

                </template>
                <template v-else>
                    <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
                </template>

            </Sticky>-->

            <div class="createPost-main-container">
                <!--<el-form-item style="margin-bottom: 40px;" label-width="90px" label="id:" prop="id">
                    <el-input v-model="postForm.id" style="width:50px" ></el-input>
                </el-form-item>-->
                <!--<el-form-item style="margin-bottom: 40px;" label-width="90px" label="姓名:" prop="actorid">
                    <el-input v-model="postForm.actorid" style="width:100px">
                    </el-input>
                </el-form-item>-->
                <el-form-item label-width="90px" label="主角:" class="postInfo-container-item" prop="actor">
                    <multiselect v-model="postForm.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                                 deselectLabel="删除" track-by="key" :internalSearch="false" label="key" style="width:150px;margin-bottom: 40px;">
                        <span slot='noResult'>无结果</span>
                    </multiselect>
                </el-form-item>
                <el-form-item style="margin-bottom: 40px;" label-width="90px" label="日记标题:" prop="title">
                    <el-input type="textarea" :rows="3" v-model="postForm.title" :maxlength=140 style="width:300px">
                    </el-input>
                    <span><span style="color:red">*</span>日记标题，最多140字</span>
                </el-form-item>

                <!--<el-form-item style="margin-bottom: 40px;" label-width="90px" label="发布时间:" prop="textarea">
                    <el-date-picker
                            v-model="postForm.dt"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>-->

                <el-button v-if="showButton" type="primary" @click="addDiary">新增日记</el-button>

                <template v-if="showDiary" v-for="diary in diarys">
                    <div>
                        <el-form :model="diary" ref="diary">
                            <!--<el-form-item style="margin-bottom: 40px;" label-width="90px" label="上传类型:" prop="type">
                                <template>
                                    &lt;!&ndash;<span @click="showPicture"><el-radio v-model="types" label="0">图片</el-radio></span>
                                    <span @click="showVideo"><el-radio v-model="types" label="1">视频</el-radio></span>&ndash;&gt;
                                    <el-radio-group v-model="diary.type">
                                        <span @click="showPicture"><el-radio :label=0>图片</el-radio></span>
                                        <span @click="showVideo"><el-radio :label=1>视频</el-radio></span>
                                    </el-radio-group>
                                </template>
                            </el-form-item>-->
                            <!--<el-form-item>
                                <el-input v-model="diary.id"></el-input>
                            </el-form-item>-->
                            <el-form-item label-width="90px" prop="id">
                                <span style="display: inline-block;margin-left:-70px;margin-right:8px">第</span>{{ diary.index }}</el-input><span style="display: inline-block;margin-left:8px;">条：</span>
                            </el-form-item>
                            <el-form-item v-if="diary.pic1" class="uplo">
                                <div style="margin-bottom: 20px;">
                                    <!--<el-form-item label-width="90px" label="图片:" prop="pic1">最多9张图片</el-form-item>-->
                                    <!--<Uploadimg v-model="diary.pic1"></Uploadimg>-->
                                    <img :src=diary.pic1 style="width:300px;height:300px" alt=""> </img>
                                </div>
                                <div style="margin-bottom: 20px;">
                                    <!--<Uploadimg v-model="diary.pic2"></Uploadimg>-->
                                    <img :src=diary.pic2 style="width:300px;height:300px" alt=""> </img>
                                </div>
                                <div style="margin-bottom: 20px;">
                                    <!--<Uploadimg v-model="diary.pic3"></Uploadimg>-->
                                    <img :src=diary.pic3 style="width:300px;height:300px" alt=""> </img>
                                </div>
                            </el-form-item>

                            <el-form-item v-if="diary.pic4" class="uplo">
                                <div style="margin-bottom: 20px;">
                                    <!--<Uploadimg v-model="diary.pic4"></Uploadimg>-->
                                    <img :src=diary.pic4 style="width:300px;height:300px" alt=""> </img>
                                </div>
                                <div style="margin-bottom: 20px;">
                                    <!--<Uploadimg v-model="diary.pic5"></Uploadimg>-->
                                    <img :src=diary.pic5 style="width:300px;height:300px" alt=""> </img>
                                </div>
                                <div style="margin-bottom: 20px;">
                                    <!--<Uploadimg v-model="diary.pic6"></Uploadimg>-->
                                    <img :src=diary.pic6 style="width:300px;height:300px" alt=""> </img>
                                </div>
                            </el-form-item>

                            <el-form-item v-if="diary.pic7"  class="uplo">
                                <div style="margin-bottom: 20px;">
                                    <!--<Uploadimg v-model="diary.pic7"></Uploadimg>-->
                                    <img :src=diary.pic7 style="width:300px;height:300px" alt=""> </img>
                                </div>
                                <div style="margin-bottom: 20px;">
                                    <!--<Uploadimg v-model="diary.pic8"></Uploadimg>-->
                                    <img :src=diary.pic8 style="width:300px;height:300px" alt=""> </img>
                                </div>
                                <div style="margin-bottom: 20px;">
                                    <!--<Uploadimg v-model="diary.pic9"></Uploadimg>-->
                                    <img :src=diary.pic9 style="width:300px;height:300px" alt=""> </img>
                                </div>
                            </el-form-item>

                            <el-form-item>
                                <div style="margin-bottom: 20px;">
                                    <!--<el-form-item label-width="90px" label="视频:" prop="video">只能上传一个视频</el-form-item>-->
                                    <!--<Uploadvideo v-model="diary.video"></Uploadvideo>-->
                                    <video v-if="diary.video" :src=diary.video style="width:200px;height:280px" controls ></video>
                                </div>
                            </el-form-item>

                            <el-form-item style="margin-bottom: 40px;" label-width="90px" label="发布时间:" prop="modify_time">
                                <el-date-picker
                                        v-model="diary.modify_time"
                                        type="datetime"
                                        placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>

                            <!--<el-dialog title="提示" :visible.sync="dialogMv" size="tiny" >
                                <span>确定删除?</span>
                                <span slot="footer" class="dialog-footer">
                                  <el-button @click="dialogMv = false">取 消</el-button>
                                  <el-button type="primary" @click="sureMv(mv.id)">确 定</el-button>
                                </span>
                            </el-dialog>-->

                            <el-form-item label-width="50px" label="">
                                <el-button type="primary" @click="delDiary(diary.id)">删除日记</el-button>
                            </el-form-item>

                        </el-form>
                        <hr width="100%" color="#999" style="margin-bottom:40px" />
                    </div>
                </template>
                <el-form-item>
                    <el-button v-if="showContentButton" type="primary" @click="addDiaryDialog">新增内容</el-button>
                </el-form-item>

                <el-dialog title="新增日记内容" :visible.sync="dialogDiaryContent" size="small">
                    <el-form :model="diaryContent" ref="diaryContent">
                        <el-form-item style="margin-bottom: 40px;" label-width="90px" label="上传类型:" prop="type">
                            <template>
                                <span @click="showPictureContent"><el-radio v-model="radioContent" label="0">图片</el-radio></span>
                                <span @click="showVideoContent"><el-radio v-model="radioContent" label="1">视频</el-radio></span>
                            </template>
                        </el-form-item>

                        <el-form-item class="uplo" label-width="200px">
                            <div v-show="showPicContent" style="margin-bottom: 20px;display: inline-block">
                                <!--<el-form-item class="uplo"  label-width="200px" label="图片:最多9张图片"></el-form-item>-->
                                <Upload v-model="diaryContent.pic1"></Upload>
                            </div>
                            <div v-show="showPicContent" style="margin-bottom: 20px;display: inline-block">
                                <Upload v-model="diaryContent.pic2"></Upload>
                            </div>
                            <div v-show="showPicContent" style="margin-bottom: 20px;display: inline-block">
                                <Upload v-model="diaryContent.pic3"></Upload>
                            </div>
                        </el-form-item>

                        <el-form-item class="uplo" label-width="200px">
                            <div v-show="showPicContent" style="margin-bottom: 20px;display: inline-block">
                                <Upload v-model="diaryContent.pic4"></Upload>
                            </div>
                            <div v-show="showPicContent" style="margin-bottom: 20px;display: inline-block">
                                <Upload v-model="diaryContent.pic5"></Upload>
                            </div>
                            <div v-show="showPicContent" style="margin-bottom: 20px;display: inline-block">
                                <Upload v-model="diaryContent.pic6"></Upload>
                            </div>
                        </el-form-item>
                        <el-form-item class="uplo" label-width="200px">
                            <div v-show="showPicContent" style="margin-bottom: 20px;display: inline-block">
                                <Upload v-model="diaryContent.pic7"></Upload>
                            </div>
                            <div v-show="showPicContent" style="margin-bottom: 20px;display: inline-block">
                                <Upload v-model="diaryContent.pic8"></Upload>
                            </div>
                            <div v-show="showPicContent" style="margin-bottom: 20px;display: inline-block">
                                <Upload v-model="diaryContent.pic9"></Upload>
                            </div>
                        </el-form-item>

                        <el-form-item label-width="40px">
                            <div v-show="showVidContent" style="margin-bottom: 20px;">
                                <!--<el-form-item label-width="90px" label="视频:" prop="video">只能上传一个视频</el-form-item>-->
                                <Uploadvideo v-model="diaryContent.video"></Uploadvideo>
                            </div>
                        </el-form-item>

                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogDiaryContent = false">取 消</el-button>
                        <el-button type="primary" @click="addDiaryContent('diaryContent')">确 定</el-button>
                    </span>
                </el-dialog>

                <!--<el-form-item style="margin-bottom: 40px;" label-width="90px" label="上传类型:" prop="type">
                    <template>
                        <span @click="showPicture"><el-radio class="radio" v-model="radio" label="0">图片</el-radio></span>
                        <span @click="showVideo"><el-radio class="radio" v-model="radio" label="1">视频</el-radio></span>
                    </template>
                </el-form-item>-->

                <!--<el-form-item style="margin-bottom: 20px;" label-width="45px" label="">
                    <span class="word-counter" v-show="natureLength">{{natureLength}}字</span>
                </el-form-item>-->

                <!--<div v-show="showPic" style="margin-bottom: 20px;">
                    <el-form-item label-width="90px" label="图片:" prop="pic1">最多9张图片</el-form-item>
                    <Uploadimg v-model="postForm.pic1"></Uploadimg>
                </div>
                <div v-show="showPic" style="margin-bottom: 20px;">
                    <Uploadimg v-model="postForm.pic2"></Uploadimg>
                </div>
                <div v-show="showPic" style="margin-bottom: 20px;">
                    <Uploadimg v-model="postForm.pic3"></Uploadimg>
                </div>
                <div v-show="showPic" style="margin-bottom: 20px;">
                    <Uploadimg v-model="postForm.pic4"></Uploadimg>
                </div>
                <div v-show="showPic" style="margin-bottom: 20px;">
                    <Uploadimg v-model="postForm.pic5"></Uploadimg>
                </div>
                <div v-show="showPic" style="margin-bottom: 20px;">
                    <Uploadimg v-model="postForm.pic6"></Uploadimg>
                </div>
                <div v-show="showPic" style="margin-bottom: 20px;">
                    <Uploadimg v-model="postForm.pic7"></Uploadimg>
                </div>
                <div v-show="showPic" style="margin-bottom: 20px;">
                    <Uploadimg v-model="postForm.pic8"></Uploadimg>
                </div>
                <div v-show="showPic" style="margin-bottom: 20px;">
                    <Uploadimg v-model="postForm.pic9"></Uploadimg>
                </div>

                <div v-show="showVid" style="margin-bottom: 20px;">
                    <el-form-item label-width="90px" label="视频:" prop="video">只能上传一个视频</el-form-item>
                    <Uploadvideo v-model="postForm.video"></Uploadvideo>
                </div>-->

            </div>
        </el-form>
    </div>
</template>

<script type="text/ECMAScript-6">
    import Tinymce from 'components/Tinymce'
    //import Uploadvideo from 'components/Upload/video'
    //import Uploadimg from 'components/Upload/singleImage3'
    import Uploadimg from 'components/Upload/picture1';
    import Upload from 'components/Upload/picture';
    import Uploadvideo from 'components/Upload/video';
    import MDinput from 'components/MDinput';
    import { validateURL } from 'utils/validate';
    import { getDiary } from 'api/diary';
    import { addmoments } from 'api/diary';
    import { diaryUpdate } from 'api/diary';
    import { userSearch } from 'api/story';
    import { diarydelete } from 'api/diary';

    export default {
        name: 'articleDetail',
        components: { Tinymce, MDinput, Uploadimg, Upload, Uploadvideo },
        data() {
            const validateRequire = (rule, value, callback) => {
                if (value === '') {
                    this.$message({
                        message: rule.field + '为必传项',
                        type: 'error'
                    });
                    callback(null)
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
                diaryContent: {
                    type: '0',
                    video: '', // 视频
                    pic1: '', // 图片
                    pic2: '', // 图片
                    pic3: '', // 图片
                    pic4: '', // 图片
                    pic5: '', // 图片
                    pic6: '', // 图片
                    pic7: '', // 图片
                    pic8: '', // 图片
                    pic9: '', // 图片
                    //status: 'draft'
                },
                postForm: {
                    //id: this.$route.params.num,
                    id: this.$route.params.num,
                    actorid:'',
                    actor: '',
                    title:'',
                    type: '',
                    video: '', // 视频
                    pic1: '', // 图片
                    pic2: '', // 图片
                    pic3: '', // 图片
                    pic4: '', // 图片
                    pic5: '', // 图片
                    pic6: '', // 图片
                    pic7: '', // 图片
                    pic8: '', // 图片
                    pic9: '', // 图片
                    dt: new Date(),
                    status: 'draft'
                },
                diaryInfo: {
                    type: '',
                    video: '', // 视频
                    pic1: '', // 图片
                    pic2: '', // 图片
                    pic3: '', // 图片
                    pic4: '', // 图片
                    pic5: '', // 图片
                    pic6: '', // 图片
                    pic7: '', // 图片
                    pic8: '', // 图片
                    pic9: '', // 图片
                },
                showButton: false,
                showContentButton: false,
                showDiary: false,
                dialogDiaryContent: false,
                fetchSuccess: true,
                loading: false,
                natureLength: false,
                userLIstOptions: [],
                diarys: [],
                /*rules: {
                    actor: [
                        { required: true, message: '请输入姓名', trigger: 'change' }
                    ],
                    title: [
                        { required: true, message: '请输入日记标题', trigger: 'blur' }
                    ],
                    pic: [
                        { required: true, message: '请上传一只图片', trigger: 'blur' }
                    ]
                },*/
                rules: {
                    actor: [{ validator: validateRequire, trigger: 'change' }],
                    title: [{ validator: validateRequire }],
                    //pic1: [{ validator: validateRequire, trigger: 'blur' }],
                    //video: [{ validator: validateRequire, trigger: 'blur' }],
                    //dt: [{ validator: validateRequire, trigger: 'blur' }]
                },
                //radio: '0',
                types: '',
                radioContent: '0',
                selectTime: new Date(2017, 8, 14, 12, 10),
                showPic: true,
                showVid: false,
                showPicContent: true,
                showVidContent: false
            }
        },
        computed: {
            isEdit() {
                return this.$route.meta.isEdit // 根据meta判断
                // return this.$route.path.indexOf('edit') !== -1 // 根据路由判断
            }
        },
        created() {
            let Query = {};
            this.getRemoteUserList(Query);
            if(this.$route.params.num && this.$route.params.num != ':num'){
                let listQuery={};
                listQuery.id = this.$route.params.num;
                listQuery.actorid = this.$route.params.actorid;
                this.fetchData(listQuery);
                //this.showDiary = true;
                this.showButton = false;
                this.showContentButton = true;
            }
            if(this.$route.params.num && this.$route.params.num == ':num'){
                this.showButton = true;
                this.showDiary = false;
            }
            /*id = $route.params.num;
            if(id == "num:"){
                id = "";
            }*/

             //this.postForm.actor={key:"1", value:this.$route.params.num};
            //this.postForm.actor.key=this.$route.params.num;
        },
        watch : {
            /*types () {
                for (let i=0; i<this.diarys.length; i++) {
                    if (this.diarys[i].type == 0) {
                        this.showPicture();
                    }else if (this.diarys[i].type == 1) {
                        this.showVideo();
                    }
                }
            }*/
        },
        methods: {
            fetchData(listQuery) {
                getDiary(listQuery).then(response => {
                    //this.postForm.actor.value = response.data.content.actorid;
                    this.postForm.actor = { key:response.data.content[0].name, value:response.data.content[0].actorid };
                    this.postForm.title = response.data.content[0].title;
                    this.diarys = response.data.content;
                    let num = 1;
                    for (let i=0; i<response.data.content.length; i++) {
                        if (response.data.content[i].type != -1) {
                            this.showDiary = true;
                        }
                        this.diarys[i].index = num++;
                    }
                    /*this.postForm.type = response.data.content.type;
                    this.postForm.pic1 = response.data.content.pic1;
                    this.postForm.pic2 = response.data.content.pic2;
                    this.postForm.pic3 = response.data.content.pic3;
                    this.postForm.pic4 = response.data.content.pic4;
                    this.postForm.pic5 = response.data.content.pic5;
                    this.postForm.pic6 = response.data.content.pic6;
                    this.postForm.pic7 = response.data.content.pic7;
                    this.postForm.pic8 = response.data.content.pic8;
                    this.postForm.pic9 = response.data.content.pic9;
                    this.postForm.id = response.data.content.id;
                    this.postForm.video = response.data.content.video;*/
            }).catch(err => {
                    this.fetchSuccess = false;
                    console.log(err);
                });
            },
            addDiary () {
                //this.$refs.postForm.validate(valid => {
                    //if (valid) {
                        //var diaryinfo;
                        let date=this.postForm.dt;
                        let year=date.getFullYear(),
                                month=date.getMonth()+ 1,
                                day=date.getDate(),
                                hour=date.getHours(),
                                minutes=date.getMinutes(),
                                seconds=date.getSeconds();
                        let dateString=year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
                        let diaryinfo={
                            //actorid: parseInt(this.postForm.actorid),
                            actorid: parseInt(this.postForm.actor.value),
                            title: this.postForm.title,
                            dt: dateString
                        }
                        //diaryinfo = this.postForm;
                        this.loading = true;
                        addmoments (diaryinfo).then(response => {
                            if(response.data.code==200){
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                this.$refs[formName].resetFields();
                            }
                            if (!response.data.items) return;
                            console.log(response)
                            this.userLIstOptions = response.data.items.map(v => ({
                                key: v.name
                            }));
                        });
                        /*this.$notify({
                         title: '成功',
                         message: '发布成功',
                         type: 'success',
                         duration: 2000
                         });*/
                        this.postForm.status = 'published';
                        this.loading = false;
                    /*} else {
                        console.log('error submit!!');
                        return false;
                    }
                });*/
            },
            delDiary (id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let deleteitem={
                        id: parseInt(id)
                    };
                    diarydelete(deleteitem).then(response => {
                        //this.list = response.data.content;
                        if(response.data.code==200){
                            let listQuery={};
                            listQuery.id = this.$route.params.num;
                            listQuery.actorid = this.$route.params.actorid;
                            this.fetchData(listQuery);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addDiaryDialog () {
                this.dialogDiaryContent = true;
            },
            addDiaryContent (formName) {
                //this.$refs.postForm.validate(valid => {
                    //if (valid) {
                    //var diaryinfo;
                    let date=this.postForm.dt;
                    let year=date.getFullYear(),
                            month=date.getMonth()+ 1,
                            day=date.getDate(),
                            hour=date.getHours(),
                            minutes=date.getMinutes(),
                            seconds=date.getSeconds();
                    let dateString=year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
                    let diaryinfo={
                        //actorid: parseInt(this.postForm.actorid),
                        diaryid: parseInt(this.$route.params.num),
                        actorid: parseInt(this.postForm.actor.value),
                        title: this.postForm.title,
                        type: parseInt(this.radioContent),
                        pic1: this.diaryContent.pic1,
                        pic2: this.diaryContent.pic2,
                        pic3: this.diaryContent.pic3,
                        pic4: this.diaryContent.pic4,
                        pic5: this.diaryContent.pic5,
                        pic6: this.diaryContent.pic6,
                        pic7: this.diaryContent.pic7,
                        pic8: this.diaryContent.pic8,
                        pic9: this.diaryContent.pic9,
                        video: this.diaryContent.video,
                        dt: dateString
                    };
                    /*if(this.$route.params.num && this.$route.params.num != ':num'){
                        diaryinfo.id=this.postForm.id;
                    }*/
                    //diaryinfo = this.postForm;
                    this.loading = true;
                    diaryUpdate(diaryinfo).then(response => {
                        if(response.data.code==200){
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            let listQuery={};
                            listQuery.id = this.$route.params.num;
                            listQuery.actorid = this.$route.params.actorid;
                            this.fetchData(listQuery);
                        }
                        if (!response.data.items) return;
                    console.log(response)
                    this.userLIstOptions = response.data.items.map(v => ({
                                key: v.name
                            }));
                    });
                    this.$refs[formName].resetFields();
                    /*this.$notify({
                        title: '成功',
                        message: '发布成功',
                        type: 'success',
                        duration: 2000
                    });*/
                    //this.postForm.status = 'published';
                    this.loading = false;
                    this.dialogDiaryContent = false;
                    /*} else {
                        console.log('error submit!!');
                        return false;
                    }
                });*/
                /*let _this=this;
                let date=this.postForm.dt;
                let year=date.getFullYear(),
                    month=date.getMonth()+ 1,
                    day=date.getDate(),
                    hour=date.getHours(),
                    minutes=date.getMinutes(),
                    seconds=date.getSeconds();
                let dateString=year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
                alert(this.postForm.id)
                if(!this.postForm.id){
                    $.ajax({
                        "url":"http://192.168.1.43:40000/?act=momentsupdate",
                        "cache": false,
                        "async": true,
                        "type": "post",
                        "dataType": "json",
                        "contentType": "application/json; charset=utf-8",
                        'data': '{"actorid":'+ parseInt(this.postForm.actorid) +', "title":"' +this.postForm.title+ '", "type":'+ parseInt(this.radio)+', "pic1":"'+ this.postForm.pic1+ '", "pic2":"'+ this.postForm.pic2+ '","pic3":"'+ this.postForm.pic3+ '","pic4":"'+ this.postForm.pic4+ '","pic5":"'+ this.postForm.pic5+ '","pic6":"'+ this.postForm.pic6+ '","pic7":"'+ this.postForm.pic7+ '","pic8":"'+ this.postForm.pic8+ '","pic9":"'+ this.postForm.pic9+ '","video":"'+ this.postForm.video+ '","dt":"'+ dateString+ '"}',
                        success:function(data){
                            if(data.code==200){
                                _this.succ();
                            }
                        },
                        error:function () {
                            console.log('_请求失败_')
                        }
                    })
                } else {
                    $.ajax({
                        "url":"http://192.168.1.43:40000/?act=momentsupdate",
                        "cache": false,
                        "async": true,
                        "type": "post",
                        "dataType": "json",
                        "contentType": "application/json; charset=utf-8",
                        'data': '{"id":'+this.postForm.id+', "actorid":'+ parseInt(this.postForm.actorid) +', "title":"' +this.postForm.title+ '", "type":'+ parseInt(this.radio)+', "pic1":"'+ this.postForm.pic1+ '", "pic2":"'+ this.postForm.pic2+ '","pic3":"'+ this.postForm.pic3+ '","pic4":"'+ this.postForm.pic4+ '","pic5":"'+ this.postForm.pic5+ '","pic6":"'+ this.postForm.pic6+ '","pic7":"'+ this.postForm.pic7+ '","pic8":"'+ this.postForm.pic8+ '","pic9":"'+ this.postForm.pic9+ '","video":"'+ this.postForm.video+ '","dt":"'+ dateString+ '"}',
                        success:function(data){
                            if(data.code==200){
                                _this.succ();
                            }
                        },
                        error:function () {
                            console.log('_请求失败_')
                        }
                    })
                }*/
            },
            draftForm() {
                if (this.postForm.actorid.length === 0 || this.postForm.title.length === 0) {
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
            showVideo () {
                if(!this.showVid){
                    this.showVid=true;
                    this.showPic=false;
                } else {
                    this.showPic=false;
                }
            },
            showPicture () {
                if(!this.showPic){
                    this.showPic=true;
                    this.showVid=false;
                } else {
                    this.showVid=false;
                }
            },
            showPictureContent () {
                if(!this.showPicContent){
                    this.showPicContent=true;
                    this.showVidContent=false;
                } else {
                    this.showVidContent=false;
                }
            },
            showVideoContent () {
                if(!this.showVidContent){
                    this.showVidContent=true;
                    this.showPicContent=false;
                } else {
                    this.showPicContent=false;
                }
            },
            succ () {
                this.$notify({
                    title: '成功',
                    message: '新增日记成功',
                    type: 'success'
                });
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
    .uplo div{
        display: inline-block;
    }
    }
</style>

