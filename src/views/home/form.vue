<template>
    <div class="createPost-container">
        <el-form class="form-container" :model="postForm" ref="postForm" :rules="actorDetail">

            <!--<Sticky :className="'sub-navbar '+postForm.status">
              <template v-if="fetchSuccess">


                <el-button v-if="fetchSuccess" v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm('postForm')">新增主角</el-button>
                &lt;!&ndash;<el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>&ndash;&gt;

              </template>
              <template v-else>
                &lt;!&ndash;<el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>&ndash;&gt;
                <el-tag>用户详情</el-tag>
              </template>

            </Sticky>-->

            <div class="createPost-main-container">
                <el-form-item label="房间名:" label-width="100px" prop="name" style="margin-bottom: 40px" required>
                    <el-input placeholder="最多输入10个字" style='width:220px;' v-model="postForm.name" maxlength="10"></el-input>
                </el-form-item>

                <el-form-item label="主角:" label-width="100px" prop="checkedActor" style="margin-bottom: 40px" required>
                    <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="postForm.checkedActor" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="actor in actors" :label="actor" :key="actor">{{actor}}</el-checkbox>
                    </el-checkbox-group>-->
                    <el-checkbox-group v-model="postForm.checkedActor">
                        <el-checkbox v-for="actor in actors" :label="actor" :key="actor">{{actor}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="剧情:" label-width="100px" prop="checkedStory" style="margin-bottom: 40px" required>
                    <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="postForm.checkedActor" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="actor in actors" :label="actor" :key="actor">{{actor}}</el-checkbox>
                    </el-checkbox-group>-->
                    <!--<el-checkbox-group v-model="postForm.checkedStory">
                        <el-checkbox v-for="story in storys" :label="story" :key="story">{{story}}</el-checkbox>
                    </el-checkbox-group>-->
                    <el-transfer v-model="postForm.checkedStory" :data="data"></el-transfer>
                </el-form-item>

                <el-form-item label="上架时间:" label-width="100px" prop="configTime" style="margin-bottom: 40px" required>
                    <!--<el-select v-model="postForm.config" placeholder="请选择">
                        <el-option v-for="item in configOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span style="font-size:12px">（注：下架状态：该主角不会在App中显示）</span>-->
                    <el-date-picker v-model="postForm.configTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请输入上架时间" :picker-options="pickerOptions1"></el-date-picker>
                    <span style="font-size:12px">（注：不设置上架时间默认为下架状态）</span>
                </el-form-item>

                <el-form-item label="房间排序:" label-width="100px" prop="homeSort" style="margin-bottom: 40px" required>
                    <el-select v-model="postForm.homeSort" placeholder="请选择">
                        <el-option v-for="item in homeSortOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span style="font-size:12px">（注：默认排序：按照上架时间逆序排列）</span>
                </el-form-item>
                <el-form-item label-width="100px">
                    <el-button v-show="addBut" type="primary" @click.prevent="add" size="large">新增房间</el-button>
                    <el-button v-show="saveBut" type="primary" @click.prevent="save" size="large">保存房间</el-button>
                </el-form-item>

            </div>
        </el-form>

    </div>
</template>

<script type="text/ECMAScript-6">
    import Tinymce from 'components/Tinymce';
    import Upload from 'components/Upload/singleImage3';
    import Uploadhead from 'components/Upload/headPhoto'
    import Uploadvideo from 'components/Upload/video';
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
        components: { Tinymce, MDinput, Upload, Uploadvideo, Uploadhead },
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
                    let str = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
                    let flg = false;
                    flg = (value.match(str));
                    if (flg) {
                        return callback(new Error('昵称格式有误'));
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
            const generateData = _ => {
                const data = [];
                for (let i = 1; i <= 15; i++) {
                    data.push({
                        key: i,
                        label: `备选项 ${ i }`,
                        //disabled: i % 4 === 0
                    });
                }
                return data;
            };
            return {
                data: generateData(),
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
                checkAll: false,
                isIndeterminate: true,
                actors: ["佳佳","娜美"],
                storys: ["佳佳ss","娜美ss"],
                /*checkedActor: [],*/
                postForm: {
                    name: '', // 文章内容
                    checkedActor: [],
                    checkedStory: [],
                    configTime: new Date(),
                    homeSort: '默认',
                },
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() + 86400000 < Date.now();
                    },
                },
                configOptions: [{
                    value: '0',
                    label: '下架'
                },{
                    value: '1',
                    label: '上架'
                }],
                homeSortOptions: [{
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
                actorDetail: {
                    name: [{ validator: validateRequire, trigger: 'blur' }],
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
            if(this.$route.params.id && this.$route.params.id != ':id') {
                this.saveBut = true;
                this.addBut = false;
                /*this.listQuery.actorid = parseInt(this.$route.params.actor);
                this.getDetail(this.listQuery);
                this.photoData.id = parseInt(this.$route.params.actor);
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
        methods: {
            handleCheckAllChange(val) {
                console.log(val)
                this.postForm.checkedActor = val ? this.actors : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.actors.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.actors.length;
            },
            uploadListener (data) {
                alert(data)
            },
            addWork () {
                this.postForm.workTimes.push({
                    value: ''
                });
            },
            removeWork(item) {
                var index = this.postForm.workTimes.indexOf(item)
                if (index !== -1) {
                    this.postForm.workTimes.splice(index, 1)
                }
            },
            /*getRemoteUserList(query) {
                userSearch(query).then(response => {
                    if (!response.data.items) return;
                    console.log(response)
                    this.userLIstOptions = response.data.items.map(v => ({
                        key: v.name
                    }));
                })
            }*/
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

