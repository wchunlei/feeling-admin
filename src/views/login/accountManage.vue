<template>
    <div class="createPost-container">
        <el-form :model="postForm" status-icon :rules="rules" ref="postForm">
            <el-form-item label="用户名:" prop="email" label-width="100px">
                <el-input v-model="postForm.email" style="width: 200px;margin-bottom: 30px"></el-input>
            </el-form-item>

            <el-form-item label="密码:" prop="pass" label-width="100px">
                <el-input type="password" v-model="postForm.pass" auto-complete="off" style="width: 200px;margin-bottom: 30px"></el-input>
            </el-form-item>

            <el-form-item label="确认密码:" prop="checkPass" label-width="100px">
                <el-input type="password" v-model="postForm.checkPass" auto-complete="off" style="width: 200px;margin-bottom: 30px"></el-input>
            </el-form-item>
            <el-form-item label-width="100px">
                <el-button type="primary" @click="submitForm('postForm')">提交</el-button>
                <el-button @click="resetForm('postForm')">重置</el-button>
            </el-form-item>

        </el-form>

        <!--<div class="block">
          <span class="demonstration">带快捷选项</span>
          <el-date-picker v-model="value7" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2" :class="{disabled: isDisabled}">
          </el-date-picker>
        </div>-->

    </div>
</template>

<script type="text/ECMAScript-6">
    import Tinymce from 'components/Tinymce'
    //import Upload from 'components/Upload/singleImage3'
    import MDinput from 'components/MDinput';
    import { validateURL } from 'utils/validate';
    import { getArticle } from 'api/article';
    import { userSearch } from 'api/story';
    import { appupdate } from 'api/app';
    import { applist } from 'api/app';
    import { storyData } from 'api/story';

    export default {
        name: 'articleDetail',
        components: { Tinymce, MDinput, },
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
            /*const validateRequire = (rule, value, callback) => {
             if (value === '') {
             this.$message({
             message: rule.field + '为必传项',
             type: 'error'
             });
             callback(null)
             } else {
             callback()
             }
             };*/
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
                    email: '',
                    pass: '',
                    checkPass: ''
                },
                rules: {
                    name: [{ required: true, validator: validateRequire }],
                    actor: [{ required: true, message: '请选择主角' }],
                    checkStory: [{ required: true, message: '请选择主线剧情' }],
                    //actor: [{ validator: validateRequire }],
                    amount: [{ required: true, validator: checkNum }],
                    //source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
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

