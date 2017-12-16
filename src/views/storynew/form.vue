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
                <el-form-item v-show="showChart" label="剧情图:" label-width="100px" style="margin-bottom: 40px">
                    <div id="myChart" :style="{width: '1200px', height: '800px'}"></div>
                </el-form-item>

                <el-form-item label="剧情标题:" label-width="100px" prop="name" style="margin-bottom: 40px" required>
                    <el-input placeholder="最多输入10个字" style='width:220px;' v-model="postForm.name" :maxlength="10"></el-input>
                </el-form-item>

                <el-form-item label-width="90px" label="主角:" class="postInfo-container-item" prop="actor" style="margin-bottom: 40px;" required>
                    <multiselect v-model="postForm.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                                 deselectLabel="" track-by="key" :internalSearch="false" label="key" style="width:150px;">
                        <span slot='noResult'>无结果</span>
                    </multiselect>
                </el-form-item>
                <!--<el-form-item label="上传剧情配置:" label-width="120px" prop="uploadTxt" style="margin-bottom: 40px" required>
                    <el-upload
                            v-model="postForm.uploadTxt"
                            class="upload-demo"
                            action="http://192.168.1.43:3000/system/upload"
                            :limit="1"
                            :on-exceed="handleExceed"
                            :before-upload="beforeAvatarUpload"
                            :on-success="handleImageScucess"
                            :on-remove="handleRemove" style="width:200px">
                        <el-button size="small" type="primary">选择txt文件</el-button>
                        &lt;!&ndash;<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>&ndash;&gt;
                    </el-upload>
                </el-form-item>-->
                <el-form-item label="剧情包:" label-width="100px" prop="uploadFile" style="margin-bottom: 40px" required>
                    <el-upload
                            :model="postForm.uploadFile"
                            class="upload-demo"
                            action="http://192.168.1.43:3000/system/upload"
                            :before-upload="beforeAvatarUploadVideo"
                            :on-success="handleImageScucess" style="width:200px">
                        <el-button size="small" type="primary">选择压缩文件</el-button>
                        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                    </el-upload>
                </el-form-item>
                <el-form-item label="剧情阶段:" label-width="100px" prop="stage" style="margin-bottom: 40px" required>
                    <el-select v-model="postForm.stage" placeholder="请选择">
                        <el-option v-for="item in stageOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收费设置:" label-width="100px" prop="priceSet" style="margin-bottom: 40px" required>
                    <span @click="showPrice"><el-radio v-model="radioPrice" label="0">收费</el-radio></span>
                    <span @click="hidePrice"><el-radio v-model="radioPrice" label="1">免费</el-radio></span>
                </el-form-item>
                <div v-show="showPri" style="display: inline-block;margin-bottom: 0px">
                    <el-form-item label="剧情价格:" label-width="100px" prop="storyPrice" style="margin-bottom: 40px" required>
                        <el-input v-model.number="postForm.storyPrice" style="width:150px" placeholder="请输入整数金额"></el-input>
                        <span>钻石</span>
                    </el-form-item>
                </div>
                <el-form-item label="选项价格:" label-width="100px" prop="optionPrice" style="margin-bottom: 40px" required>
                    <el-input v-model.number="postForm.optionPrice" style="width:150px" placeholder="请输入整数金额"></el-input>
                    <span>钻石</span>
                </el-form-item>

                <el-form-item label="上架时间:" label-width="100px" prop="configTime" style="margin-bottom: 40px" required>
                    <!--<el-select v-model="postForm.config" placeholder="请选择">
                        <el-option v-for="item in configOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span style="font-size:12px">（注：下架状态：该主角不会在App中显示）</span>-->
                    <el-date-picker v-model="postForm.configTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请输入上架时间" :picker-options="pickerOptions1"></el-date-picker>
                    <span style="font-size:12px">（注：不设置上架时间默认为下架状态）</span>
                </el-form-item>

                <el-form-item label="剧本排序:" label-width="100px" prop="storySort" style="margin-bottom: 40px" required>
                    <el-select v-model="postForm.storySort" placeholder="请选择">
                        <el-option v-for="item in storySortOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span style="font-size:12px">（注：默认排序：按照上架时间逆序排列）</span>
                </el-form-item>

                <el-form-item label-width="100px">
                    <el-button v-show="addBut" type="primary" @click.prevent="add" size="large">新增剧情</el-button>
                    <el-button v-show="saveBut" type="primary" @click.prevent="save" size="large">保存剧情</el-button>
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
                    let str = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]");
                    let flg = false;
                    flg = (value.match(str));
                    if (flg) {
                        return callback(new Error('标题格式有误'));
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
            return {
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
                    actor: '',
                    uploadTxt: '',
                    uploadFile: '',
                    stage: '1',
                    priceSet: '',
                    storyPrice: '',
                    optionPrice: 10,
                    configTime: new Date(),
                    storySort: '默认'
                },
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() + 86400000 < Date.now();
                    },
                },
                radioPrice: '0',
                stageOptions: [{
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
                configOptions: [{
                    value: '0',
                    label: '下架'
                },{
                    value: '1',
                    label: '上架'
                }],
                storySortOptions: [{
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
                /*photos: [],
                photosList: {
                    url: '',
                    amount: '',
                    name: '',
                    photoNum: ''
                },
                upPhotos: {
                    photourl: '',
                    thumbnail: ''
                },
                addmvs: {
                    thumbnail: '',
                    url: '',
                    mvurl: '',
                    name: '',
                    amount: ''
                },*/
                showPri: true,
                showChart: true,
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
                sexOptions: [{
                    value: '1',
                    label: '男'
                }, {
                    value: '2',
                    label: '女'
                }],
                /*addPhotosRules: {
                    url: [{ validator: validateRequire }],
                    amount: [{ validator: checkNum }],
                    name: [{ validator: validateRequire }]
                },
                addMvRules: {
                    thumbnail: [{ validator: validateRequire }],
                    mvurl: [{ validator: validateRequire }],
                    amount: [{ validator: checkNum }],
                    mvname: [{ validator: validateRequire }]
                },
                picListRules: {
                    photourl: [{ validator: validateRequire }]
                },*/
                actorDetail: {
                    name: [{ validator: validateRequire, trigger: 'blur' }],
                    /*height: [{ type: 'number', trigger: 'blur', message: '请输入数值' }],
                    weight: [{ type: 'number', trigger: 'blur', message: '请输入数值' }],*/
                    storyPrice: [{ validator: checkNum, trigger: 'blur' }],
                    optionPrice: [{ validator: checkNum, trigger: 'blur' }],
                    //bust: [{ validator: checkNum, trigger: 'blur' }],
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
            /*let Query = {};
            this.getRemoteUserList(Query);*/
            if(this.$route.params.id && this.$route.params.id != ':id') {
                this.saveBut = true;
                this.addBut = false;
                this.showChart = false;
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
        mounted(){
            this.drawLine();
        },
        methods: {
            showPrice () {
                this.showPri = true;
            },
            hidePrice () {
                this.showPri = false;
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'));
                // 绘制图表
                var data2 = {
                    "name": "0 打招呼",
                    "value": 'http://192.168.1.43:8000/upload/27/297d3fdedd2c8981ec7aa15981b06df2.jpg',
                    "children": [
                        {
                            "name": "1 洗内裤",
                            "children": [
                                {
                                    "name": "11白天洗",
                                    "children": [
                                        {
                                            "name": "111厕所洗",
                                            "children": [
                                                {"name": "IScaleMap", "value": 'http://192.168.1.43:8000/upload/27/297d3fdedd2c8981ec7aa15981b06df2.jpg'}
                                            ]
                                        },
                                        {
                                            "name": "112在厨房洗",
                                            "children": [
                                                {"name": "IScaleMap", "value": 2105}
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "name": "12晚上洗",
                                    "children": [
                                        {
                                            "name": "121在客厅洗",
                                            "children": [
                                                {"name": "IScaleMap", "value": 2105}
                                            ]
                                        },
                                        {
                                            "name": "112在厨房洗",
                                            "children": [
                                                {"name": "IScaleMap", "value": 2105}
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                };
                myChart.setOption({
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove'
                    },
                    series:[
                        {
                            type: 'tree',
                            data: [data2],
                            left: '2%',
                            right: '2%',
                            top: '8%',
                            bottom: '20%',
                            symbol: 'emptyCircle',
                            orient: 'vertical',//树图中 正交布局 的方向 ，对应有 水平 和 垂直 两个方向，取值分别为 horizontal , vertical
                            expandAndCollapse: true,//子树折叠和展开的交互，默认打开
                            initialTreeDepth: -1,  //树图初始展开的层级（深度）
                            label: {
                                normal: {
                                    position: 'top',
                                    //rotate: 90, //字体展示方向
                                    verticalAlign: 'middle',
                                    align: 'right',
                                    fontSize: 14
                                }
                            },
                            leaves: {
                                label: {
                                    normal: {
                                        position: 'bottom',
                                        //rotate: -90,
                                        verticalAlign: 'middle',
                                        align: 'left'
                                    }
                                }
                            },
                            animationDurationUpdate: 750
                        },
                        /* {
                         type: 'tree',
                         name: 'tree2',
                         data: [data2],

                         top: '20%',
                         left: '60%',
                         bottom: '22%',
                         right: '18%',

                         symbolSize: 7,

                         label: {
                         normal: {
                         position: 'left',
                         verticalAlign: 'middle',
                         align: 'right'
                         }
                         },

                         leaves: {
                         label: {
                         normal: {
                         position: 'right',
                         verticalAlign: 'middle',
                         align: 'left'
                         }
                         }
                         },

                         expandAndCollapse: true,

                         animationDuration: 550,
                         animationDurationUpdate: 750
                         }*/
                    ]
                });
                myChart.on('click', function (params) {
                    // 控制台打印数据的名称
                    console.log(params.value);
                    //window.location.href = params.value;
                    window.open(params.value);
                });
            },
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
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'text/plain';
                const isLt2M = file.size / 1024 / 1024 > 0.01;
                console.log(file);
                if (!isJPG) {
                    this.$message.error('上传失败，请检查网络，并上传txt格式的文件!');
                }
                /*if (!isLt2M) {
                    this.$message.error('上传头像图片大小不小于 10kb!');
                }*/
                return isJPG;
            },
            beforeAvatarUploadVideo(file) {
                console.log(file)
                const isJPG = file.type === '';
                //const isLt2M = file.size / 1024 / 1024 > 0.01;
                if (!isJPG) {
                    this.$message.error('上传失败，请检查网络，并上传rar,zip格式的文件!');
                }
                /*if (!isLt2M) {
                 this.$message.error('上传头像图片大小不小于 10kb!');
                 }*/
                return isJPG;
            },
            /*handleExceed (files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件`);
            },*/
            handleImageScucess (res,file) {
                console.log(res,file);
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

