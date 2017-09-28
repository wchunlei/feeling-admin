<template>
    <div class="createPost-container">
        <div class="cloth_center">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

                <!--<Sticky :className="'sub-navbar '+ruleForm.status">
                    <template v-if="fetchSuccess">
                        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm('ruleForm')">发布</el-button>
                        &lt;!&ndash;<el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>&ndash;&gt;
                    </template>
                    <template v-else>
                        <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
                    </template>
                </Sticky>-->

                <el-row>
                    <el-col :span="21">
                        <div style="margin-bottom: 40px;margin-top:30px">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="事件ID:" prop="id">
                                        <el-input v-model.number="ruleForm.id" style="width: 180px;"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="事件名称:" prop="name">
                                        <el-input v-model="ruleForm.name" style="width: 180px;"></el-input>
                                        <!--<el-button type="primary" size="large" style="margin-left:100px">删除</el-button>-->
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="事件类型" prop="eventType">
                                        <el-select v-model="ruleForm.eventType" placeholder="事件类型" style="width: 180px;">
                                            <el-option label="文字" value="1"></el-option>
                                            <el-option label="视频" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>

                        <div style="margin-bottom: 40px">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="时间触发条件:" prop="dt">
                                        <el-date-picker
                                                v-model="ruleForm.dt"
                                                type="datetime"
                                                placeholder="选择日期时间"
                                                style="width: 180px;">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="最低温度条件:" prop="mintemplate">
                                        <el-input v-model="ruleForm.mintemplate" placeholder="最低温度" style="width: 180px;"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="最高温度条件:" prop="maxtemplate">
                                        <el-input v-model="ruleForm.maxtemplate" placeholder="最高温度" style="width: 180px;"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>

                        <div style="margin-bottom: 40px">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="天气触发条件:" prop="weather">
                                        <el-select v-model="ruleForm.weather" placeholder="天气触发条件" style="width: 180px;">
                                            <el-option label="晴天" value="sun"></el-option>
                                            <el-option label="下雨" value="rain"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="条件组合:" prop="combination">
                                        <el-select v-model="ruleForm.combination" placeholder="条件组合" style="width: 180px;">
                                            <el-option label="无" value="0"></el-option>
                                            <el-option label="任一满足" value="1"></el-option>
                                            <el-option label="全部满足" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">新增事件</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
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
    import { actorUpdate } from 'api/actor';
    import { bubbleUpdate } from 'api/pushEvent';

    export default {
        name: 'channel',
        components: { Tinymce, MDinput, Upload },
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
            return {
                loading: false,
                fetchSuccess: true,
                ruleForm: {
                    id: '',
                    name: '',
                    eventType: '1',
                    dt: new Date(),
                    mintemplate: '',
                    maxtemplate: '',
                    weather: 'sun',
                    combination: '0'
                },
                rules: {
                    name: [{ required: true, message: '请输入事件名称', trigger: 'blur' }],
                    id: [{ required: true, validator: checkNum }],
                    mintemplate: [{ required: true, message: '请输入最低温度' }],
                    maxtemplate: [{ required: true, message: '请输入最高温度' }]
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
                        let bubbleinfo = {
                            eventid: parseInt(this.ruleForm.id),
                            eventtitle: this.ruleForm.name,
                            eventtype: parseInt(this.ruleForm.eventType),
                            eventtime: dateString,
                            mintemp: parseInt(this.ruleForm.mintemplate),
                            maxtemp: parseInt(this.ruleForm.maxtemplate),
                            weather: this.ruleForm.weather,
                            condition: parseInt(this.ruleForm.combination)
                        };
                        this.loading = true;
                        bubbleUpdate (bubbleinfo).then(response => {
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

