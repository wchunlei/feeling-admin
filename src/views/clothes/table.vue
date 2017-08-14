<template>
    <div class="app-container calendar-list-container">
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
            <div style="margin:20px 0px;">
                <el-form-item label="服装名称:" label-width="90px" prop="clothName">
                    <el-input v-model="postForm.clothName" size="small" placeholder="请输入服装名称" autofocus style="width:200px;"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="服装图片:" style="margin-bottom: 40px;" label-width="90px" prop="upload">
                    <div style="margin-bottom: 20px;">
                        <Upload v-model="picture.upload"></Upload>
                    </div>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="服装视频:" style="margin-bottom: 40px;" label-width="90px" prop="upload">
                    <div style="margin-bottom: 20px;">
                        <Upload v-model="video.upload"></Upload>
                    </div>
                </el-form-item>
            </div>
            <div style="margin:20px 0px;">
                <el-form-item label="温度:" style="margin-bottom: 40px;" label-width="90px" prop="minTemperature">
                    <el-input v-model="postForm.minTemperature" size="small" placeholder="最低温度" autofocus style="width:75px;"></el-input> ---
                    <el-input v-model="postForm.maxTemperature" size="small" placeholder="最高温度" autofocus style="width:75px;"></el-input>
                </el-form-item>
                <el-form-item label="服装天气:" style="margin-bottom: 40px;" label-width="90px" prop="chothWeather">
                    <el-select v-model="postForm.chothWeather" placeholder="请选择">
                        <el-option
                                v-for="item in weatherOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服装条件:" style="margin-bottom: 40px;" label-width="90px" prop="chothCondition">
                    <el-select v-model="postForm.chothCondition" placeholder="请选择">
                        <el-option
                                v-for="item in conditionOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服装价格:" style="margin-bottom: 40px;" label-width="90px" prop="price">
                    <el-input v-model="postForm.price" size="small" placeholder="请输入服装价格" style="width:200px;"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <el-button type="primary" class="reset" @click='aa'>_重置_</el-button>
    </div>
</template>

<script>
    import { actorList, fetchPv } from 'api/actor';
    import { parseTime } from 'utils';
    import Upload from 'components/Upload/singleImage3';
    import { actorUpdate } from 'api/actor';

    const calendarTypeOptions = [
        { key: 'CN', display_name: '中国' },
        { key: 'US', display_name: '美国' },
        { key: 'JP', display_name: '日本' },
        { key: 'EU', display_name: '欧元区' }
    ];

    // arr to obj
    const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
                acc[cur.key] = cur.display_name;
    return acc
    }, {});

    export default {
        components: { Upload },
        name: 'table_demo',
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
                picture : {
                    upload : '',
                },
                video : {
                    upload : '',
                },
                weatherOptions: [{
                    value: '选项1',
                    label: '晴天'
                }, {
                    value: '选项2',
                    label: '下雨'
                }, {
                    value: '选项3',
                    label: '阴天'
                }, ],
                chothWeather: '',
                conditionOptions: [{
                    value: 1,
                    label: '全部满足'
                }, {
                    value: 2,
                    label: '任一'
                }, {
                    value: 3,
                    label: '无'
                }],
                chothCondition: '',
                fetchSuccess: true,
                loading: false,
                userLIstOptions: [],
                postForm: {
                    clothName:'',
                    minTemperature:'',
                    maxTemperature: '',
                    chothWeather: '',
                    chothCondition: '',
                    price: '',
                    id: '',
                    status: 'draft'
                },
                rules: {
                    clothName: [{ validator: validateRequire }]
                }
            }
        },
        methods : {
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
            rangeTime(start,end){
                var arr=[];
                var temp1 = start.split("-");
                var temp2 = end.split("-");
                var date1 = new Date(start);
                var date2 = new Date(end);
                while((date2.getTime()-date1.getTime())>=0){
                    var year = date1.getFullYear();
                    var monthTemp=date1.getMonth()+1;
                    alert(monthTemp)
                    var month = monthTemp.toString().length==1?"0"+monthTemp.toString():monthTemp.toString();
                    var day = date1.getDate().toString().length==1?"0"+date1.getDate():date1.getDate();
                    var temp=year+month+day;
                    arr.push(temp)
                    date1.setDate(date1.getDate()+1);
                }
                return arr.join(',');
            },
            aa(){
                alert(this.rangeTime("2017-10-30","2017-11-02"));
            },
        },
    }
</script>
<style>


</style>