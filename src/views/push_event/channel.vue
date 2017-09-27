<template>
    <div class="createPost-container">
        <div class="cloth_center">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

                <Sticky :className="'sub-navbar '+ruleForm.status">
                    <template v-if="fetchSuccess">
                        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm('ruleForm')">发布</el-button>
                        <!--<el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>-->
                    </template>
                    <template v-else>
                        <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
                    </template>

                </Sticky>

                <el-form-item label="选择渠道" prop="region" style="margin-bottom:40px;margin-top: 30px;">
                    <el-select v-model="ruleForm.region" placeholder="选择渠道:" style="width: 200px;">
                        <el-option v-for="item in regions" :key="item.value" :label="item.label" :value="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="事件ID:" prop="id">
                    <el-input v-model="ruleForm.id" style="width: 100px;"></el-input>
                </el-form-item>-->
                <el-form-item label="事件名称:" prop="name" style="margin-bottom:40px;">
                    <el-input v-model="ruleForm.name" style="width: 200px;"></el-input>
                    <!--<el-button type="primary" size="large" style="margin-left:100px">删除</el-button>-->
                </el-form-item>
                <el-form-item label="事件类型" prop="eventType" style="margin-bottom:40px;">
                    <el-select v-model="ruleForm.eventType" placeholder="事件类型:" style="width: 200px;">
                        <el-option label="文字" value="1"></el-option>
                        <el-option label="视频" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间触发条件:" prop="dt" style="margin-bottom:40px;">
                    <el-date-picker
                        v-model="ruleForm.dt"
                        type="datetime"
                        placeholder="选择日期时间"
                        style="width: 200px;">
                    </el-date-picker>
                </el-form-item>
                <!--<el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">新增事件</el-button>
                </el-form-item>-->
            </el-form>
        </div>
    </div>
</template>

<script type="text/ECMAScript-6">
    import Tinymce from 'components/Tinymce'
    import Upload from 'components/Upload/singleImage3'
    import MDinput from 'components/MDinput';
    import { validateURL } from 'utils/validate';
    import { getArticle } from 'api/article';
    import { channelUpdate } from 'api/pushEvent';
    import { applist } from 'api/app';

    export default {
        name: 'channel',
        components: { Tinymce, MDinput, Upload },
        data() {
            return {
                loading: false,
                fetchSuccess: true,
                ruleForm: {
                    name: '',
                    id: '',
                    region: '',
                    eventType: '1',
                    dt: new Date()
                },
                regions: [],
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
        created () {
            this.getList();
        },
        methods : {
            getList () {
                applist ().then(response => {
                    for(let i=0; i<response.data.content.length; i++) {
                        let temp = {};
                        temp.value = response.data.content[i].id;
                        temp.label = response.data.content[i].name;
                        this.regions.push(temp);
                    }
                });
            },
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

