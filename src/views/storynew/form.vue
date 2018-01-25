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

                <el-form-item label="剧情标题:" label-width="100px" prop="title" style="margin-bottom: 40px" required>
                    <el-input placeholder="最多输入10个字" style='width:220px;' v-model="postForm.title" :maxlength="10"></el-input>
                </el-form-item>

                <el-form-item label-width="100px" label="主角:" class="postInfo-container-item" prop="actor" style="margin-bottom: 40px;" required>
                    <multiselect v-model="postForm.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="选择主角" selectLabel="✔"
                                 deselectLabel="✖" track-by="key" :internalSearch="false" label="key" style="width:150px;">
                        <span slot='noResult'>无结果</span>
                    </multiselect>
                    <!--<el-select v-model="postForm.actor" placeholder="请选择" @change="changeActor">
                        <el-option v-for="item in actorOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>-->
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
                <!--<el-form-item label="剧情包:" label-width="100px" prop="uploadFile" style="margin-bottom: 40px">
                    <el-upload
                            :model="postForm.uploadFile"
                            class="upload-demo"
                            action="http://192.168.1.43:3000/system/upload"
                            :before-upload="beforeAvatarUploadVideo"
                            :on-success="handleImageScucess" style="width:200px">
                        <el-button size="small" type="primary">选择txt文件</el-button>
                        &lt;!&ndash;<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>&ndash;&gt;
                    </el-upload>
                </el-form-item>-->
                <el-form-item label="剧情:" label-width="100px" prop="video" style="margin-bottom: 40px" required>
                    <el-input type="textarea" placeholder="" style='width:350px;' v-model="postForm.video" :rows=5></el-input>
                    </el-upload>
                </el-form-item>
                <el-form-item class="removeElList" label="背景图:" label-width="100px" prop="picture" style="margin-bottom: 40px">
                    <el-upload
                            :model="postForm.picture"
                            class="upload-demo"
                            action="http://192.168.1.43:1442/?act=uploadimg"
                            :before-upload="beforeAvatarUpload"
                            :on-success="handleBackImageScucess" style="width:200px">
                        <el-button size="small" type="primary">选择图片文件</el-button>
                        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                    </el-upload>
                    <div id="showBackColor" class="backPic" style="border: 1px solid #ccc;margin-top: 15px;">
                        <div class="showUploadPic">
                            <img id="image" :src="postForm.pictureBack" />
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="背景色:" label-width="100px" prop="csolor" style="margin-bottom: 40px" required>
                    <el-select v-model="postForm.csolor" placeholder="请选择" @change="selectColor">
                        <el-option v-for="item in colorOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="剧情阶段:" label-width="100px" prop="stage" style="margin-bottom: 40px" required>
                    <el-select v-model="postForm.stage" placeholder="请选择">
                        <el-option v-for="item in stageOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收费设置:" label-width="100px" prop="cost" style="margin-bottom: 40px" required>
                    <span @click="showPrice"><el-radio v-model="postForm.cost" label="0">收费</el-radio></span>
                    <span @click="hidePrice"><el-radio v-model="postForm.cost" label="1">免费</el-radio></span>
                </el-form-item>
                <div v-show="showPri" style="display: inline-block;margin-bottom: 0px">
                    <el-form-item label="剧情价格:" label-width="100px" prop="price" style="margin-bottom: 40px" required>
                        <el-input v-model.number="postForm.price" style="width:150px" placeholder="请输入整数金额"></el-input>
                        <span>金币</span>
                    </el-form-item>
                </div>
                <el-form-item label="选项价格:" label-width="100px" prop="option" style="margin-bottom: 40px" required>
                    <el-input v-model.number="postForm.option" style="width:150px" placeholder="请输入整数金额"></el-input>
                    <span>金币</span>
                </el-form-item>

                <el-form-item label="上架时间:" label-width="100px" prop="configtime" style="margin-bottom: 40px">
                    <!--<el-select v-model="postForm.config" placeholder="请选择">
                        <el-option v-for="item in configOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span style="font-size:12px">（注：下架状态：该主角不会在App中显示）</span>-->
                    <el-date-picker v-model="postForm.configtime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="未设置" :picker-options="pickerOptions1"></el-date-picker>
                    <span style="font-size:12px">（注：不设置上架时间默认为下架状态）</span>
                </el-form-item>

                <el-form-item label="剧本排序:" label-width="100px" prop="sort" style="margin-bottom: 40px" required>
                    <el-select v-model="postForm.sort" placeholder="请选择">
                        <el-option v-for="item in storySortOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span style="font-size:12px">（注：默认排序：按照上架时间逆序排列）</span>
                </el-form-item>

                <el-form-item label-width="100px">
                    <el-button v-show="addBut" type="primary" @click.prevent="addStory" size="large">新增剧情</el-button>
                    <el-button v-show="saveBut" type="primary" @click.prevent="addStory" size="large">保存剧情</el-button>
                </el-form-item>

                <!--<el-form-item label="test1:" label-width="100px" prop="pic" style="margin-bottom: 40px" required>
                    <div id="test" style="width:500px;height: 500px;border: 1px solid red;text-align: center;line-height: 500px">
                        <img id="image" src="../../../gifs/timg1.gif" style="display: inline-block;vertical-align: middle;width: 300px;height: 300px">
                    </div>
                </el-form-item>-->

            </div>
        </el-form>

    </div>
</template>

<script type="text/ECMAScript-6">
    import Tinymce from 'components/Tinymce';
    import  md5  from 'js-md5';
    import Upload from 'components/Upload/singleImage3';
    import Uploadhead from 'components/Upload/headPhoto'
    import Uploadvideo from 'components/Upload/video';
    import MDinput from 'components/MDinput';
    import { validateURL } from 'utils/validate';
    import { rgbaster } from 'utils/rgbaster';
    import { getArticle } from 'api/article';
    import { actorUpdate } from 'api/actor';
    import { actorListAll } from 'api/actor';
    import { addPhotos } from 'api/actor';
    import { delPhotos } from 'api/actor';
    import { addPhoto } from 'api/actor';
    import { thumbnaillist } from 'api/actor';
    import { addMvs } from 'api/actor';
    import { delMv } from 'api/actor';
    import { addscript } from 'api/story';
    import { updatescript } from 'api/story';
    import { scriptdetail } from 'api/story';
    import { actorList } from 'api/actor';

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
                rgb: '',
                postForm: {
                    title: '', // 文章内容
                    actor: '',
                    uploadTxt: '',
                    uploadFile: '',
                    video: '',
                    picture: '',
                    pictureBack: '',
                    csolor: '0',
                    stage: '1',
                    cost: '0',
                    price: 20,
                    option: 20,
                    configtime: '',
                    sort: '0'
                },
                video: '',
                videosize: '',
                videourl: '',
                pictureurl: '',
                logicpic: {},
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() + 86400000 < Date.now();
                    },
                },
                radioPrice: '0',
                defaultColor: '',
                actorOptions: [],
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
                colorOptions: [{
                    value: '0',
                    label: '默认'
                },{
                    value: '1',
                    label: '中性色'
                },{
                    value: '2',
                    label: '玫瑰红'
                },{
                    value: '3',
                    label: '咖啡色'
                },{
                    value: '4',
                    label: '大红'
                },{
                    value: '5',
                    label: '深蓝'
                },{
                    value: '6',
                    label: '紫色'
                },{
                    value: '7',
                    label: '黄色'
                },{
                    value: '8',
                    label: '墨绿色'
                },{
                    value: '9',
                    label: '深绿'
                },{
                    value: '10',
                    label: '墨蓝'
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
                showChart: false,
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
                    price: [{ validator: checkNum, trigger: 'blur' }],
                    option: [{ validator: checkNum, trigger: 'blur' }],
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
            let Query = {};
            this.getRemoteUserList(Query);
            //this.getActor();
            if(this.$route.params.id && this.$route.params.id != ':id') {
                this.saveBut = true;
                this.addBut = false;
                this.showChart = true;
                this.listQuery.scriptid = this.$route.params.id;
                /*this.$nextTick(function () {
                    this.getDetail();
                })*/
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
            //this.selectColor();
            /*var img = document.getElementById('image');
            var showBackColor = document.getElementById('showBackColor');
            RGBaster.colors(img, {
                success: function(payload) {
                    // payload.dominant是主色，RGB形式表示
                    // payload.secondary是次色，RGB形式表示
                    // payload.palette是调色板，含多个主要颜色，数组
                    console.log(payload.dominant);
                    console.log(payload.secondary);
                    console.log(payload.palette);
                    let color = payload.dominant;
                    //test.setAttribute('style', 'background: "color"');
                    showBackColor.style.backgroundColor = payload.dominant;
                }
            });*/
        },
        watch : {
            "postForm.actor" (val,oldval) {
                    this.postForm.actor = val;
            }
        },
        methods: {
            getActor () {
                actorList(this.listQuery).then(response => {
                    console.log(response.data.content)
                    /*this.actorOptions = response.data.content.map(v => ({
                        key: v.name
                    }));*/
                    for (let i=0; i<response.data.content.length; i++) {
                        //alert(response.data.content[i].id)
                        let temp = {};
                        temp.value = response.data.content[i].id;
                        temp.label = response.data.content[i].name;
                        this.actorOptions.push(temp);
                    }
                })
            },
            changeActor () {
               // alert()
            },
            getDetail () {
                scriptdetail (this.listQuery).then(response => {
                    let logicpicTemp = JSON.stringify(response.data.content.logicpic);
                    this.postForm = response.data.content;
                    let selectBackColor = document.getElementById('showBackColor');
                    if (response.data.content.csolor) {
                        selectBackColor.style.backgroundColor = response.data.content.csolor;
                    }
                    this.postForm.price = parseInt(response.data.content.price);
                    this.postForm.option = parseInt(response.data.content.option);
                    this.postForm.pictureBack = response.data.content.picture;
                    //this.postForm.pictureBack = URL.createObjectURL(response.data.content.picture);
                    this.postForm.video = response.data.content.video.join("#");
                    /*this.videosize = response.data.content.videosize;
                    this.videourl = response.data.content.videourl;*/
                    //this.postForm.uploadPicture = response.data.content.picture;
                    //this.logicpic = JSON.stringify(response.data.content.logicpic)
                    this.logicpic = JSON.parse(logicpicTemp)
                    //console.log(this.logicpic)
                    //console.log(JSON.parse(this.logicpic))
                    this.drawLine();
                    if (response.data.content.cost == 1) {
                        this.showPri = false;
                    }
                    for ( let j=0; j<this.userLIstOptions.length; j++) {
                        if (response.data.content.actorid == this.userLIstOptions[j].value) {
                            this.postForm.actor = this.userLIstOptions[j];
                        }
                    }
                    if (this.postForm.configtime == "0000-00-00 00:00:00") {
                        this.postForm.configtime = '';
                    }
                    if (response.data.content.csolor == '#37474F') {
                        this.postForm.csolor = '1';
                    } else if (response.data.content.csolor == '#880E4F') {
                        this.postForm.csolor = '2';
                    } else if (response.data.content.csolor == '#3E2723') {
                        this.postForm.csolor = '3';
                    } else if (response.data.content.csolor == '#B71C1C') {
                        this.postForm.csolor = '4';
                    } else if (response.data.content.csolor == '#0D47A1') {
                        this.postForm.csolor = '5';
                    } else if (response.data.content.csolor == '#4A148C') {
                        this.postForm.csolor = '6';
                    } else if (response.data.content.csolor == '#FE7F17') {
                        this.postForm.csolor = '7';
                    } else if (response.data.content.csolor == '#1B5E20') {
                        this.postForm.csolor = '8';
                    } else if (response.data.content.csolor == '#004D40') {
                        this.postForm.csolor = '9';
                    } else if (response.data.content.csolor == '#006064') {
                        this.postForm.csolor = '10';
                    } else {
                        this.postForm.csolor = '0';
                        this.rgb = response.data.content.csolor;
                    }
                }).catch(err => {
                    this.fetchSuccess = false;
                    console.log(err);
                });
            },
            addStory () {
                //let date= this.postForm.configtime;
                //(month>=10?+month:"0"+month+"-"+day>=10? day :'0'+day)
                let dateString;
                if (this.postForm.configtime && this.postForm.configtime != '0000-00-00 00:00:00') {
                    let date= new Date(this.postForm.configtime);
                    let year=date.getFullYear(),
                            month=date.getMonth()+ 1,
                            day=date.getDate(),
                            hour=date.getHours(),
                            minutes=date.getMinutes(),
                            seconds=date.getSeconds();
                    dateString=year+'-'+(month>=10?+month:"0"+month)+"-"+(day>=10? day :'0'+day)+' '+(hour>=10?+hour:"0"+hour)+':'+(minutes>=10?+minutes:"0"+minutes)+':'+(seconds>=10?+seconds:"0"+seconds);
                } else {
                    dateString = '0000-00-00 00:00:00';
                }
                //console.log(this.video,this.videosize,this.videourl)
                let tempVideo = this.postForm.video.replace(/(\s)/g, "")
                let storyinfo = {
                    //channel: "女仆团",
                    actorid: this.postForm.actor.value,
                    title: this.postForm.title,
                    //video: this.postForm.uploadFile,
                    picture: this.postForm.picture,
                    csolor: this.rgb,
                    stage: this.postForm.stage,
                    cost: this.postForm.cost,
                    price: this.postForm.price.toString(),
                    option: this.postForm.option.toString(),
                    configtime: dateString,
                    sort: this.postForm.sort,
                    //video: this.postForm.video.split('#'),
                    video: tempVideo.split('#'),
                    /*videosize: this.videosize.toString(),
                    videourl: this.videourl*/
                };
                this.$refs.postForm.validate(valid => {
                 if (valid) {
                     this.loading = true;
                    if (this.$route.params.id && this.$route.params.id == ':id') {
                        addscript(storyinfo).then(response => {
                            /*if (!response.data.items) return;
                             console.log(response)
                             this.userLIstOptions = response.data.items.map(v => ({
                             key: v.name
                             }));*/
                            if (response.data.msg == 'title is repeat!') {
                                this.$message({
                                    message: '标题不能重复',
                                    type: 'error'
                                });
                            }
                            if(response.data.code == 200) {
                                this.$message({
                                    message: '发布成功',
                                    type: 'success'
                                });
                                //this.$refs[formName].resetFields();
                                //this.postForm.status = 'published';
                            }
                        });
                    } else {
                        storyinfo.scriptid = this.$route.params.id;
                        updatescript(storyinfo).then(response => {
                            /*if (!response.data.items) return;
                             console.log(response)
                             this.userLIstOptions = response.data.items.map(v => ({
                             key: v.name
                             }));*/
                            if(response.data.code == 200) {
                                this.$message({
                                    message: '发布成功',
                                    type: 'success'
                                });
                                //this.$refs[formName].resetFields();
                                //this.postForm.status = 'published';
                            }
                        });
                    }
                    this.loading = false;
                } else {
                 console.log('error submit!!');
                 return false;
                 }
                 });
            },
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
                /*var data2 = {
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
                };*/
                myChart.setOption({
                    brush: {
                        brushLink: [1000]
                    },
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove'
                    },
                    series:[
                        {
                            type: 'tree',
                            data: [this.logicpic],
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
                    console.log(params);
                    //window.location.href = params.value;
                    window.open(params.value);
                });
            },
            colorRGB2Hex(color) {
                var rgb = color.split(',');
                var r = parseInt(rgb[0].split('(')[1]);
                var g = parseInt(rgb[1]);
                var b = parseInt(rgb[2].split(')')[0]);
                this.rgb = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            },
            selectColor () {
                //this.postForm.picture = URL.createObjectURL(file.raw);
                let selectBackColor = document.getElementById('showBackColor');
                /*if (this.postForm.csolor == 0) {
                    let _this = this;
                    setTimeout(function () {
                        //alert(_this.postForm.picture)
                        //let img = _this.postForm.picture;
                        //let showBackColor = document.getElementById('showBackColor');
                        let img = document.getElementById('image');
                        RGBaster.colors(img, {
                            exclude: [ 'rgb(255,255,255)' ],  // 不包括白色
                            success: function(payload) {
                                // payload.dominant是主色，RGB形式表示
                                // payload.secondary是次色，RGB形式表示
                                // payload.palette是调色板，含多个主要颜色，数组
                                console.log(payload.dominant);
                                console.log(payload.secondary);
                                console.log(payload.palette);
                                this.defaultColor = payload.dominant;
                                //showBackColor.setAttribute('style', 'background: rgb(7,14,45)');
                                selectBackColor.style.backgroundColor = payload.dominant;
                                this.rgb = payload.dominant;
                            }
                        });
                        //window.clearTimeout(setTime);
                    },0);
                }*/
                if (this.postForm.csolor == 0 && this.rgb) {
                    /*selectBackColor.style.backgroundColor = this.rgb;
                } else {*/
                    setTimeout(function () {
                        //alert(_this.postForm.picture)
                        //let img = _this.postForm.picture;
                        //let showBackColor = document.getElementById('showBackColor');
                        let img = document.getElementById('image');
                        RGBaster.colors(img, {
                            exclude: [ 'rgb(255,255,255)' ],  // 不包括白色
                            success: function(payload) {
                                // payload.dominant是主色，RGB形式表示
                                // payload.secondary是次色，RGB形式表示
                                // payload.palette是调色板，含多个主要颜色，数组
                                console.log(payload.dominant);
                                console.log(payload.secondary);
                                console.log(payload.palette);
                                this.defaultColor = payload.dominant;
                                //showBackColor.setAttribute('style', 'background: rgb(7,14,45)');
                                selectBackColor.style.backgroundColor = payload.dominant;
                                this.rgb = payload.dominant;
                            }
                        });
                        //window.clearTimeout(setTime);
                    },0);
                }
                if(this.$route.params.id && this.$route.params.id != ':id') {
                    selectBackColor.style.backgroundColor = this.rgb;
                }
                if (this.postForm.csolor == 1) {
                    selectBackColor.setAttribute('style', 'background: #37474F;margin-top: 15px');
                    this.rgb = '#37474F';
                }
                if (this.postForm.csolor == 2) {
                    selectBackColor.setAttribute('style', 'background: #880E4F;margin-top: 15px');
                    this.rgb = '#880E4F';
                }
                if (this.postForm.csolor == 3) {
                    selectBackColor.setAttribute('style', 'background: #3E2723;margin-top: 15px');
                    this.rgb = '#3E2723';
                }
                if (this.postForm.csolor == 4) {
                    selectBackColor.setAttribute('style', 'background: #B71C1C;margin-top: 15px');
                    this.rgb = '#B71C1C';
                }
                if (this.postForm.csolor == 5) {
                    selectBackColor.setAttribute('style', 'background: #0D47A1;margin-top: 15px');
                    this.rgb = '#0D47A1';
                }
                if (this.postForm.csolor == 6) {
                    selectBackColor.setAttribute('style', 'background: #4A148C;margin-top: 15px');
                    this.rgb = '#4A148C';
                }
                if (this.postForm.csolor == 7) {
                    selectBackColor.setAttribute('style', 'background: #FE7F17;margin-top: 15px');
                    this.rgb = '#FE7F17';
                }
                if (this.postForm.csolor == 8) {
                    selectBackColor.setAttribute('style', 'background: #1B5E20;margin-top: 15px');
                    this.rgb = '#1B5E20';
                }
                if (this.postForm.csolor == 9) {
                    selectBackColor.setAttribute('style', 'background: #004D40;margin-top: 15px');
                    this.rgb = '#004D40';
                }
                if (this.postForm.csolor == 10) {
                    selectBackColor.setAttribute('style', 'background: #006064;margin-top: 15px');
                    this.rgb = '#006064';
                }
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
            /*beforeAvatarUpload(file) {
                const isJPG = file.type === 'text/plain';
                const isLt2M = file.size / 1024 / 1024 > 0.01;
                console.log(file);
                if (!isJPG) {
                    this.$message.error('上传失败，请检查网络，并上传txt格式的文件!');
                }
                /!*if (!isLt2M) {
                    this.$message.error('上传头像图片大小不小于 10kb!');
                }*!/
                return isJPG;
            },*/
            beforeAvatarUploadVideo(file) {
                console.log(file)
                this.video = file.name;
                this.videosize = file.size;
                //const isJPG = file.type === 'application/gzip';
                const isJPG = file.type === 'text/plain';
                //const isJPG = file.type === '';
                //const isLt2M = file.size / 1024 / 1024 > 0.01;
                if (!isJPG) {
                    this.$message.error('上传失败，请检查网络，并上传rar,zip格式的文件!');
                }
                /*if (!isLt2M) {
                 this.$message.error('上传头像图片大小不小于 10kb!');
                 }*/
                return isJPG;
            },
            handleImageScucess(res, file) {
                this.emitInput(res.url);
                this.imageUrl = URL.createObjectURL(file.raw);
                if (res.url) {
                    this.showClose = true;
                }
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 > 0.01;
                if (!(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp' || file.type === 'image/raw')) {
                    this.$message.error('图片格式有误!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不小于 10kb!');
                }
                return isLt2M;
            },
            /*beforeAvatarUpload(file) {
                //const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif' || 'image/bmp' || 'image/raw';
                const isLt2M = file.size / 1024 / 1024 > 0.01;
                if (!(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp' || file.type === 'image/raw')) {
                    this.$message.error('图片格式有误!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不小于 10kb!');
                }
                let _this = this;
                let filename = file.name.split(".")[0];
                var reader = new FileReader();
                let app = 'test';
                let src_domain = 'img';
                let src_image_url = 'winner';
                let key = '34F<S932JF;<,/SF*F56#DSfd+9fw?zF';
                let uid ='123';
                let tm = '1280977330000';
                let appBinary = this.char2buf(app+":"+ uid +":" + tm +":"+ key + ":");
                let appBinaryTemp = new Buffer(appBinary);
                console.log(appBinaryTemp)
                reader.readAsArrayBuffer(file);
                reader.onload = function() {
                    let body = new Buffer(this.result);
                    //alert(md5(body))
                    var list = [];
                    list.push(appBinaryTemp);
                    list.push(body);
                    var s1 = Buffer.concat(list,body.length+appBinaryTemp.length);
                    console.log(body)
                    var formData = new FormData();
                    formData.append('img', body);
                    this.url = 'http://192.168.1.234:80/upload?' + 'app=test&src_domain=img&src_image_url=winner&uid=123&tm=1280977330000' + '&tk=' + md5(s1);
                    //console.log(formData)
                    fetch(this.url, {
                        method: 'POST',
                        mode: "cors",
                        type: 'json',
                        //credentials: 'include',
                        /!*headers:{
                         //'Accept': 'application/json',
                         "Content-Type":"multipart/form-data",
                         //"Content-Type":"application/x-www-form-urlencoded",
                         //"Content-type": "text/plain",
                         "Access-Control-Allow-Origin": '*'
                         //'Access-Control-Allow-Credentials':'false',
                         },*!/
                        body: this.result
                    }).then(function(response){

                        if(response.status!=200){
                            console.log("存在一个问题，状态码为："+response.status);
                            return;
                        }
                        //console.log(response)
                        let str = JSON.stringify(response);
                        response.json().then(function(data){
                            //alert(_this.pictureurl)
                            console.log(data.url);
                            _this.postForm.picture = data.url;
                            _this.pictureurl = data.url;
                        });
                    }).catch(function(err){
                        console.log("Fetch错误123aa:"+err);
                    })

                }
                return isLt2M;
            },*/
            readAsBinaryString(){
                var file = document.getElementById("file").files[0];
                var reader = new FileReader();
                //将文件以二进制形式读入页面
                reader.readAsBinaryString(file);
                reader.onload=function(f){
                    var result=document.getElementById("result");
                    //显示文件
                    result.innerHTML=this.result;
                }
            },
            char2buf(str){
                var out = new ArrayBuffer(str.length);
                var u16a= new Uint8Array(out);
                var strs = str.split("");
                for(var i =0 ; i<strs.length;i++){
                    u16a[i]=strs[i].charCodeAt();
                }
                return out;
            },
            /*handleExceed (files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件`);
            },*/
            handleImageScucess (res,file) {
                console.log(res,file);
                this.videourl = res.content.url;
                console.log(this.video,this.videosize,this.videourl)
            },
            handleBackImageScucess (res,file) {
                console.log(res)
                console.log(file.raw)
                let _this = this;
                this.postForm.pictureBack = URL.createObjectURL(file.raw);
                this.postForm.picture = res.urlinfo[0].url;
                setTimeout(function () {
                    let img = document.getElementById('image');
                    let showBackColor = document.getElementById('showBackColor');
                    RGBaster.colors(img, {
                        exclude: [ 'rgb(255,255,255)' ],  // 不包括白色
                        success: function(payload) {
                            // payload.dominant是主色，RGB形式表示
                            // payload.secondary是次色，RGB形式表示
                            // payload.palette是调色板，含多个主要颜色，数组
                            console.log(payload.dominant);
                            console.log(payload.secondary);
                            console.log(payload.palette);
                            this.defaultColor = payload.dominant;
                            //showBackColor.setAttribute('style', 'background: rgb(7,14,45)');
                            showBackColor.style.backgroundColor = payload.dominant;
                            _this.colorRGB2Hex(payload.dominant);
                            //_this.rgb = payload.dominant;
                        }
                    });

                    //window.clearTimeout(setTime);
                },0);
                /*setTimeout(function () {
                    alert(_this.rgb)
                },2000)*/
            },
            getRemoteUserList(query) {
                actorList(query).then(response => {
                    if (!response.data.content) return;
                    console.log(response)
                    this.userLIstOptions = response.data.content.map(v => ({
                        key: v.name,
                        value: v.id
                    }));
                    let temp = this.userLIstOptions.length-1;
                    //this.postForm.actor = this.userLIstOptions[temp];
                    if(this.$route.params.id && this.$route.params.id != ':id') {
                        this.getDetail();
                    }
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
    .backPic {
        width: 320px;
        height: 568px;
        text-align: center;
        line-height: 568px;
        display: inline-block;
        .showUploadPic {
            width: 270px;
            height: 480px;
            display: inline-block;
            vertical-align: middle;
            img {
                width: 270px;
                height: 480px;
            }
        }
    }
    .removeElList .el-upload-list {
        display: none;
    }
    }
</style>

