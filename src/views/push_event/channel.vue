<template>
    <div class="createPost-container">
        <div class="cloth_center">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="选择渠道" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="选择渠道:">
                        <el-option label="渠道一" value="shanghai"></el-option>
                        <el-option label="渠道二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="事件ID:" prop="id">
                    <el-input v-model="ruleForm.id" style="width: 100px;"></el-input>
                </el-form-item>
                <el-form-item label="事件名称:" prop="name">
                    <el-input v-model="ruleForm.name" style="width: 300px;"></el-input>
                    <!--<el-button type="primary" size="large" style="margin-left:100px">删除</el-button>-->
                </el-form-item>
                <el-form-item label="事件类型" prop="eventType">
                    <el-select v-model="ruleForm.eventType" placeholder="事件类型:">
                        <el-option label="文字" value="1"></el-option>
                        <el-option label="视频" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间触发条件:" prop="dt">
                    <el-date-picker
                        v-model="ruleForm.dt"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">新增事件</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Tinymce from 'components/Tinymce'
    import Upload from 'components/Upload/singleImage3'
    import MDinput from 'components/MDinput';
    import { validateURL } from 'utils/validate';
    import { getArticle } from 'api/article';
    import { channelUpdate } from 'api/pushEvent';

    export default {
        name: 'channel',
        components: { Tinymce, MDinput, Upload },
        data() {
            return {
                ruleForm: {
                    name: '',
                    id: '',
                    region: '',
                    eventType: '',
                    dt: new Date()
                },
                rules: {
                    name: [
                        { required: true, message: '请输入事件名称', trigger: 'blur' },
                        { message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择渠道', trigger: 'change' }
                    ]
                }
            }
        },
        methods : {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let date=this.ruleForm.dt;
                        let year=date.getFullYear(),
                                month=date.getMonth()+ 1,
                                day=date.getDate(),
                                hour=date.getHours(),
                                minutes=date.getMinutes(),
                                seconds=date.getSeconds();
                        let dateString=year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
                        let storyinfo = {
                            app: this.ruleForm.region,
                            title: this.ruleForm.name,
                            dt: dateString,
                            type:parseInt(this.ruleForm.eventType)
                        };
                        this.loading = true;
                        channelUpdate (storyinfo).then(response => {
                            if(response.data.code==200){
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                this.$refs[formName].resetFields();
                            }
                            if (!response.data.items) return;
                        console.log(response);
                    });
                        this.loading = false;
                    } else {
                        console.log('error submit!!');
                return false;
            }
            });
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

