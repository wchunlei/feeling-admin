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
                <el-row>
                    <el-col :span="12">

                        <el-form-item style="margin-bottom: 40px;" label-width="90px" label="主角姓名:" prop="name">
                            <el-input :rows="1" v-model="postForm.name">
                            </el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item style="margin-bottom: 40px;" label-width="90px" label="日记标题:" prop="title">
                            <el-input type="textarea" :rows="1" placeholder="请输入日记标题" v-model="postForm.title">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                        <el-form-item style="margin-bottom: 40px;" label-width="90px" label="日记内容:" prop="textarea">
                            <el-input type="textarea" :rows="5" placeholder="请输入日记内容" v-model="postForm.textarea">
                            </el-input>
                        </el-form-item>

                        <el-form-item style="margin-bottom: 40px;" label-width="45px" label="">
                            <span class="word-counter" v-show="natureLength">{{natureLength}}字</span>
                        </el-form-item>

                <div style="margin-bottom: 20px;">
                    <Upload v-model="postForm.headurl"></Upload>
                </div>
            </div>
        </el-form>

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
        name: 'articleDetail',
        components: { Tinymce, MDinput, Upload },
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
                    name:'',
                    title:'',
                    textarea:'',
                    nature: '',
                    headurl: '', // 文章图片
                    id: '',
                    status: 'draft'
                },
                fetchSuccess: true,
                loading: false,
                userLIstOptions: [],
                rules: {
                    title: [{ validator: validateRequire }],
                    textarea: [{ validator: validateRequire }],
                    name: [{ validator: validateRequire }],
                    headurl: [{ validator: validateSourceUri, trigger: 'blur' }]
                }
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

