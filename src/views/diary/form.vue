<template>
    <div class="createPost-container">
        <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">

            <Sticky :className="'sub-navbar '+postForm.status">
                <template v-if="fetchSuccess">


                    <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm()">发布
                    </el-button>
                    <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>

                </template>
                <template v-else>
                    <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
                </template>

            </Sticky>

            <div class="createPost-main-container">
                <el-form-item style="margin-bottom: 40px;" label-width="90px" label="第1条" prop="id">

                </el-form-item>
                <el-form-item style="margin-bottom: 40px;" label-width="90px" label="姓名:" prop="actorid">
                    <el-input v-model="postForm.actorid" style="width:100px">
                    </el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 40px;" label-width="90px" label="日记标题:" prop="title">
                    <el-input type="textarea" :rows="3" v-model="postForm.title" maxlength="140">
                    </el-input>
                    <span><span style="color:red">*</span>日记标题，最多140字</span>
                </el-form-item>

                <el-form-item style="margin-bottom: 40px;" label-width="90px" label="上传类型:" prop="title">
                    <template>
                        <span @click="showPicture"><el-radio class="radio" v-model="radio" label="0">图片</el-radio></span>
                        <span @click="showVideo"><el-radio class="radio" v-model="radio" label="1">视频</el-radio></span>
                    </template>
                </el-form-item>

                <el-form-item style="margin-bottom: 20px;" label-width="45px" label="">
                    <span class="word-counter" v-show="natureLength">{{natureLength}}字</span>
                </el-form-item>

                <div v-show="showPic" style="margin-bottom: 20px;">
                    <el-form-item label-width="90px" label="图片:" prop="pic">最多9张图片</el-form-item>
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
                </div>

                <el-form-item style="margin-bottom: 40px;" label-width="90px" label="发布时间:" prop="textarea">
                    <el-date-picker
                        v-model="postForm.dt"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>

            </div>
        </el-form>

    </div>
</template>

<script>
    import Tinymce from 'components/Tinymce'
    import Uploadvideo from 'components/Upload/video'
    import Uploadimg from 'components/Upload/singleImage3'
    import MDinput from 'components/MDinput';
    import { validateURL } from 'utils/validate';
    import { getArticle } from 'api/article';
    import { actorUpdate } from 'api/actor';

    export default {
        name: 'articleDetail',
        components: { Tinymce, MDinput, Uploadvideo, Uploadimg },
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
                postForm: {
                    id: '',
                    actorid:'',
                    time:'',
                    type: '',
                    nature: '',
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
                    dt: '',
                    status: 'draft'
                },
                fetchSuccess: true,
                loading: false,
                userLIstOptions: [],
                rules: {
                    title: [{ validator: validateRequire }],
                    name: [{ validator: validateRequire }],
                    headurl: [{ validator: validateSourceUri, trigger: 'blur' }]
                },
                radio: '0',
                selectTime: new Date(2017, 8, 14, 12, 10),
                showPic: true,
                showVid: false
            }
        },
        computed: {
            natureLength() {
                return this.postForm.nature.length
            },
            isEdit() {
                return this.$route.meta.isEdit // 根据meta判断
                // return this.$route.path.indexOf('edit') !== -1 // 根据路由判断
            }
        },
        created() {
            if (this.isEdit) {
                this.fetchData();
            }
        },
        methods: {
            fetchData() {
                getArticle().then(response => {
                    this.postForm = response.data;
            }).catch(err => {
                    this.fetchSuccess = false;
                console.log(err);
            });
            },
            submitForm() {
                //this.postForm.display_time = parseInt(this.display_time / 1000);
                console.log(this.postForm)
                var actorinfo;
                actorinfo = this.postForm;
                this.$refs.postForm.validate(valid => {
                    if (valid) {
                        this.loading = true;

                        actorUpdate(actorinfo).then(response => {
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
            getRemoteUserList(query) {
                userSearch(query).then(response => {
                    if (!response.data.items) return;
                console.log(response)
                this.userLIstOptions = response.data.items.map(v => ({
                            key: v.name
                        }));
            })
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
</style>

