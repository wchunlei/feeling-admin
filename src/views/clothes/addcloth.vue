<template>
    <div class="app-container calendar-list-container">
        <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">

            <Sticky :className="'sub-navbar '+postForm.status">
                <template v-if="fetchSuccess">


                    <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm('postForm')">发布
                    </el-button>
                    <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>

                </template>
                <template v-else>
                    <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
                </template>

            </Sticky>
            <div style="margin:20px 0px;">
                <el-form-item label="主角:" label-width="90px" prop="actor">
                    <multiselect v-model="postForm.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                                 deselectLabel="删除" track-by="key" :internalSearch="false" label="key" style="width:150px;">
                        <span slot='noResult'>无结果</span>
                    </multiselect>
                </el-form-item>
            </div>
            <div style="margin:20px 0px;">
                <el-form-item label="分类id:" label-width="90px" prop="clothTypeid">
                    <el-input v-model="postForm.clothTypeid" size="small" placeholder="请输入服装名称" autofocus style="width:200px;"></el-input>
                </el-form-item>
            </div>
            <div style="margin:20px 0px;">
                <el-form-item label="服装名称:" label-width="90px" prop="clothName">
                    <el-input v-model="postForm.clothName" size="small" placeholder="请输入服装名称" autofocus style="width:200px;"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="服装图片:" style="margin-bottom: 40px;" label-width="90px" prop="pic">
                    <div style="margin-bottom: 20px;">
                        <Upload v-model="postForm.pic"></Upload>
                    </div>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="服装视频:" style="margin-bottom: 40px;" label-width="90px" prop="vid">
                    <div style="margin-bottom: 20px;">
                        <Upload v-model="postForm.vid"></Upload>
                    </div>
                </el-form-item>
            </div>
            <div style="margin:20px 0px;">
                <el-form-item label="最低温度:" style="margin-bottom: 40px;" label-width="90px" prop="minTemperature">
                    <el-input v-model="postForm.minTemperature" size="small" placeholder="最低温度" style="width:75px;"></el-input>
                </el-form-item>
                <el-form-item label="最高温度:" style="margin-bottom: 40px;" label-width="90px" prop="maxTemperature">
                    <el-input v-model="postForm.maxTemperature" size="small" placeholder="最高温度" style="width:75px;"></el-input>
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
    </div>
</template>

<script type="text/ECMAScript-6">
    import { actorList, fetchPv } from 'api/actor';
    import { parseTime } from 'utils';
    import Upload from 'components/Upload/singleImage3';
    import { actorUpdate } from 'api/actor';
    import { userSearch } from 'api/story';
    import { clothUpdate } from 'api/cloth';
    import { getcloth } from 'api/cloth';

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
            const onlyNum = (rule, value, callback) => {
                let reg=/^[1-9]\d*$/ig;
                if (value&&!reg.test(value)) {
                    this.postForm.price=this.postForm.price.replace(this.postForm.price,'');
                    this.$message({
                        message: rule.field + '价格只能为数字',
                        type: 'error'
                    });
                } else {
                    callback();
                }
            };
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
                weatherOptions: [{
                    value: 'sun',
                    label: '晴天'
                }, {
                    value: 'rain',
                    label: '下雨'
                }, {
                    value: 'cloudy',
                    label: '阴天'
                }, ],
                chothWeather: '',
                conditionOptions: [{
                    value: 0,
                    label: '无'
                }, {
                    value: 1,
                    label: '任一'
                }, {
                    value: 2,
                    label: '全部'
                }],
                chothCondition: '',
                fetchSuccess: true,
                loading: false,
                userLIstOptions: [],
                postForm: {
                    actor: '',
                    clothName: '',
                    clothTypeid: '',
                    pic: '',
                    vid: '',
                    minTemperature:'',
                    maxTemperature: '',
                    chothWeather: '',
                    chothCondition: '',
                    price: '',
                    id: '',
                    status: 'draft'
                },
                rules: {
                    clothName: [{ validator: validateRequire }],
                    price: [{ validator: onlyNum }],
                    actor: [{ validator: validateRequire }]
                }
            }
        },
        created() {
            if(this.$route.params.num && this.$route.params.num != ':num'){
                let listQuery={};
                listQuery.dressid = parseInt(this.$route.params.num);
                this.fetchData(listQuery);
            }
        },
        methods : {
            fetchData(listQuery) {
                getcloth(listQuery).then(response => {
                    //this.postForm.actor.value = response.data.content.actorid;
                    this.postForm.actor = { key:response.data.content.actorname, value:response.data.content.actorid };
                    this.postForm.clothTypeid = response.data.content.dressid;
                    this.postForm.clothName = response.data.content.dressname;
                    this.postForm.pic = response.data.content.dresspic;
                    this.postForm.vid = response.data.content.dressvideo;
                    this.postForm.minTemperature = response.data.content.mintemp;
                    this.postForm.maxTemperature = response.data.content.maxtemp;
                    this.postForm.chothWeather = response.data.content.weather;
                    this.postForm.chothCondition = response.data.content.condition;
                    this.postForm.price = response.data.content.price;
                }).catch(err => {
                        this.fetchSuccess = false;
                    console.log(err);
                });
            },
            submitForm(formName) {
                //this.postForm.display_time = parseInt(this.display_time / 1000);
                console.log(this.postForm)
                let clothinfo = {
                    actorid: parseInt(this.postForm.actor.value),
                    typeid: parseInt(this.postForm.clothTypeid),
                    dressname: this.postForm.clothName,
                    dresspic: this.postForm.pic,
                    dressvideo: this.postForm.vid,
                    mintemp: parseInt(this.postForm.minTemperature),
                    maxtemp: parseInt(this.postForm.maxTemperature),
                    weather: this.postForm.chothWeather,
                    price: parseInt(this.postForm.price),
                    condition: parseInt(this.postForm.chothCondition)
                };
                //actorinfo = this.postForm;
                this.$refs.postForm.validate(valid => {
                    if (valid) {
                        if (this.postForm.actor.value){
                            this.loading = true;
                            clothUpdate (clothinfo).then(response => {
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
                        } else {
                            this.$message({
                                message: '请选择主角',
                                type: 'error'
                            });
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            draftForm () {
                console.log('draftForm');
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
        },
    }
</script>
<style>


</style>