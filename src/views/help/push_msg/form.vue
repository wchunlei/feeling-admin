<template>
    <div class="createPost-container">
        <el-form class="form-container" :model="postForm" ref="postForm" :rules="actorDetail">

            <div class="createPost-main-container">

                <el-form-item label="push标题:" label-width="100px" prop="title" style="margin-bottom: 40px" required>
                    <el-input placeholder="最多输入10个字" style='width:200px;' v-model="postForm.title"  :maxlength="10"></el-input>
                </el-form-item>

                <el-form-item label="push内容:" label-width="100px" prop="content" style="margin-bottom: 40px" required>
                    <el-input type="textarea" placeholder="最多输入30个字" style='width:280px;' v-model="postForm.content  " :maxlength="30" :rows="3"></el-input>
                </el-form-item>

                <!--<el-form-item label="banner图:" label-width="100px" prop="pic" style="margin-bottom: 40px">
                    &lt;!&ndash;<div style="margin-bottom: 20px;">
                        <Upload v-model="postForm.pic"></Upload>
                        <span style="font-size:12px">（注：请上传比例16：9，不小于100Kb的图片）</span>
                    </div>&ndash;&gt;
                    <div style="margin-right: 20px;width: 320px;height: 180px;border: 1px dashed #d9d9d9;">
                        <Upload v-model="postForm.pic" v-on:input="picInput"></Upload>
                    </div>
                    <span style="font-size:12px;margin-top: -30px;display:inline-block">（注：请上传16:9，不小于10kb，jpg、png等格式的文件）</span>
                </el-form-item>-->

                <el-form-item label="跳转设置:" label-width="100px" prop="type" style="margin-bottom: 40px" required>
                    <!--<el-select v-model="postForm.top" placeholder="请选择">
                        <el-option v-for="item in topOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>-->
                    <template>
                        <span @click="showH5"><el-radio v-model="postForm.type" label="0">H5页面</el-radio></span>
                        <span @click="showPerHome"><el-radio v-model="postForm.type" label="1">女仆空间</el-radio></span>
                        <span @click="showStory"><el-radio v-model="postForm.type" label="2">女仆房间<span style="color:red">（请配置后注意查看该女仆的工作时间，以免用户无法跳转该链接）</span></el-radio></span>
                        <span @click="showVideo"><el-radio v-model="postForm.type" label="3">首页</el-radio></span>
                        <span @click="showRecharge"><el-radio v-model="postForm.type" label="4">充值页</el-radio></span>
                    </template>
                </el-form-item>

                <div v-show="showH" style="display: inline-block;margin-bottom: 20px">
                    <el-form-item label="跳转地址:" label-width="100px" prop="address" style="margin-bottom: 40px" required>
                        <el-input placeholder="请输入链接" style='width:190px;' v-model="postForm.address" :maxlength="10"></el-input>
                        <!--<span>钻石</span>-->
                    </el-form-item>
                    <el-form-item label="用户信息:" label-width="100px" prop="message" style="margin-bottom: 20px" required>
                        <el-select v-model="postForm.message" placeholder="请选择">
                            <el-option v-for="item in userMessOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <!--<span style="font-size:12px">（注：默认排序：按照上架时间逆序排列）</span>-->
                    </el-form-item>
                </div>

                <el-form-item v-show="showPer" label="选择主角:" label-width="100px" prop="selectActor" style="margin-bottom: 40px" required>
                    <!--<div style="margin-bottom: 20px;width:800px">
                        <Upload v-model="postForm.backImg" v-on:input="picInput"></Upload>
                        <span style="font-size:12px">（注：请上传比例4：3，不小于100Kb的图片）</span>
                    </div>-->
                    <el-select clearable class="filter-item" style="width: 190px" v-model="postForm.selectActor" placeholder="选择主角">
                        <el-option v-for="item in  nameOptions" :key="item.label" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <div v-show="showSto" style="display: inline-block;margin-bottom: 0px">
                    <el-form-item label="选择房间:" label-width="100px" prop="selectHome" style="margin-bottom: 40px" required>
                        <el-select clearable class="filter-item" style="width: 190px" v-model="postForm.selectHome" placeholder="选择房间">
                            <el-option v-for="item in  homeOptions" :key="item.label" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择主角:" label-width="100px" prop="selectActor" style="margin-bottom: 40px" required>
                        <el-select clearable class="filter-item" style="width: 190px" v-model="postForm.selectActor" placeholder="选择主角">
                            <el-option v-for="item in  nameOptions" :key="item.label" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择剧情:" label-width="100px" prop="selectStory" style="margin-bottom: 40px" required>
                        <el-select clearable class="filter-item" style="width: 190px" v-model="postForm.selectStory" placeholder="选择剧情">
                            <el-option v-for="item in  storyOptions" :key="item.label" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>

                <el-form-item label="push时间:" label-width="100px" prop="timeType" style="margin-bottom: 40px" required>
                    <!--<el-select v-model="postForm.top" placeholder="请选择">
                        <el-option v-for="item in topOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>-->
                    <template>
                        <span @click="showAssignTime"><el-radio v-model="postForm.timeType" label="0">指定时间push</el-radio></span>
                        <span @click="showCycleTime"><el-radio v-model="postForm.timeType" label="1">周期性push</el-radio></span>
                        <span @click="showEveryTime"><el-radio v-model="postForm.timeType" label="2">每天push</el-radio></span>
                        <!--<span @click="showVideo"><el-radio v-model="postForm.type" label="3">首页</el-radio></span>
                        <span @click="showRecharge"><el-radio v-model="postForm.type" label="4">充值页</el-radio></span>-->
                    </template>
                </el-form-item>

                <el-form-item v-show="showAssign" label="" label-width="100px" prop="assignTime1" style="margin-bottom: 40px">
                    <el-date-picker v-model="postForm.assignTime1" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间"></el-date-picker>
                    <el-button @click.prevent="addWork">新增push时间</el-button>
                </el-form-item>

                <div v-show="showAssign" v-for="time in postForm.times">
                    <el-form-item label="" label-width="100px" prop="value" style="margin-bottom: 40px">
                        <el-date-picker v-model="time.value" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间"></el-date-picker>
                        <el-button @click.prevent="removeWork(time)">删除</el-button>
                    </el-form-item>
                </div>

                <el-form-item v-show="showCycle" label="" label-width="100px" prop="checkboxGroup" style="margin-bottom: 40px">
                    <el-checkbox-group v-model="postForm.checkboxGroup">
                        <el-checkbox-button v-for="week in weeks" :label="week" :key="week">{{week}}</el-checkbox-button>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item v-show="showCycle" label="" label-width="100px" prop="cycleTime" style="margin-bottom: 40px">
                    <el-time-select v-model="postForm.cycleTime" :picker-options="{start: '00:00',step: '02:00',end: '22:00'}" placeholder="选择时间" style="width: 110px"></el-time-select>
                </el-form-item>

                <el-form-item v-show="showEvery" label="" label-width="100px" prop="everyTime" style="margin-bottom: 40px">
                    <el-time-select v-model="postForm.everyTime" :picker-options="{start: '00:00',step: '02:00',end: '22:00'}" placeholder="选择时间" style="width: 110px"></el-time-select>
                </el-form-item>

                <!--<el-form-item v-show="showVid" label-width="90px" prop="video">
                    <div style="margin-top: 0px">
                        &lt;!&ndash;<el-form-item label-width="90px" label="视频:" prop="video">只能上传一个视频</el-form-item>&ndash;&gt;
                        <Uploadvideo v-model="postForm.video" :progresses="progressesData"></Uploadvideo>
                    </div>
                </el-form-item>-->

                <!--<el-form-item label="banner排序:" label-width="100px" prop="bannerSort" style="margin-bottom: 40px">
                    <el-select v-model="postForm.bannerSort" placeholder="请选择">
                        <el-option v-for="item in bannerOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span style="font-size:12px">（注：默认排序：按照上架时间逆序排列）</span>
                </el-form-item>

                <el-form-item label="上架时间:" label-width="100px" prop="configTime" style="margin-bottom: 40px">
                    <el-date-picker v-model="postForm.configTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间"></el-date-picker>
                    <span style="font-size:12px">（注：不设置上架时间默认为下架状态）</span>
                </el-form-item>
                <el-form-item label="下架时间:" label-width="100px" prop="configDownTime" style="margin-bottom: 40px">
                    <el-date-picker v-model="postForm.configDownTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间"></el-date-picker>
                    <span style="font-size:12px">（注：不设置上架时间默认为下架状态）</span>
                </el-form-item>-->

                <!--<el-form-item label="评论内容:" label-width="100px" prop="" >
                    <div v-for="comment in postForm.comments" style="margin-bottom: 40px">
                        &lt;!&ndash;<el-date-picker v-model="workTime.value" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>&ndash;&gt;
                        <el-input placeholder="最多输入15个字" style='width:220px;' v-model="comment.value" maxlength="15"></el-input>
                        <el-button @click.prevent="addWork">新增评论</el-button>
                        <el-button @click.prevent="removeWork(comment)">删除</el-button>
                    </div>
                </el-form-item>-->

                <el-form-item label-width="100px">
                    <el-button v-show="addBut" type="primary" @click.prevent="add" size="large">新增push消息</el-button>
                    <el-button v-show="saveBut" type="primary" @click.prevent="save" size="large">保存push消息</el-button>
                </el-form-item>

            </div>
        </el-form>

    </div>
</template>

<script type="text/ECMAScript-6">
    import Tinymce from 'components/Tinymce';
    import Upload from 'components/Upload/pictureFm';
    import Uploadhead from 'components/Upload/headPhoto'
    import Uploadvideo from 'components/Upload/video';
    import Uploadaudio from 'components/Upload/audio'
    import { userSearch } from 'api/story';
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
        components: { Tinymce, MDinput, Upload, Uploadvideo, Uploadhead, Uploadaudio },
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
                radioContent: '0',
                showH: true,
                showPer: false,
                showSto: false,
                showVid: false,
                showRe: false,
                showAssign: true,
                showCycle: false,
                showEvery: false,
                postForm: {
                    title: '',
                    content: '',
                    type: '0',
                    timeType: '0',
                    address: '',
                    message: '不带登录态和用户信息',
                    selectHome: '',
                    selectActor: '',
                    selectStory: '',
                    assignTime1: '',
                    assignTime: '',
                    //time: '',
                    times: [{
                        value: ''
                    }],
                    checkboxGroup: [],
                    cycleTime: '',
                    everyTime: '',
                    //id: '',
                    status: 'published',
                },
                weeks: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
                /*topOptions: [{
                 value: '0',
                 label: '置顶'
                 },{
                 value: '1',
                 label: '不置顶'
                 }],*/
                configOptions: [{
                    value: '0',
                    label: '下架'
                },{
                    value: '1',
                    label: '上架'
                }],
                userMessOptions: [{
                    value: '0',
                    label: '不带登录态和用户信息'
                },/*{
                    value: '1',
                    label: '不带登录态和带用户信息'
                },*/{
                    value: '2',
                    label: '带登录态和用户信息'
                }],
                bannerOptions: [{
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
                homeOptions: [{
                    value: '1',
                    label: '房间1'
                }, {
                    value: '2',
                    label: '房间2'
                }],
                nameOptions: [{
                    value: '1',
                    label: '佳佳'
                }, {
                    value: '2',
                    label: '娜美'
                }],
                storyOptions: [{
                    value: '1',
                    label: '佳佳1'
                }, {
                    value: '2',
                    label: '娜美1'
                }],
                photos: [],
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
                },
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
                addPhotosRules: {
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
                },
                actorDetail: {
                    title: [{ validator: validateRequire, trigger: 'blur' }],
                    content: [{ validator: validateRequire, trigger: 'blur' }],
                    address: [{ validator: validateRequire, trigger: 'blur' }],
                    message: [{ validator: validateRequire, trigger: 'blur' }],
                    assignTime1: [{ validator: validateRequire, trigger: 'blur' }],
                    cycleTime: [{ validator: validateRequire, trigger: 'blur' }],
                    everyTime: [{ validator: validateRequire, trigger: 'blur' }]
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
            //this.getRemoteUserList(Query);
            if(this.$route.params.id && this.$route.params.id != ':id'){
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
        watch : {
            "watcher" : {
                handler:function(val,oldval){
                    this.picList(this.photoid);
                },
                deep: true
            }
        },
        methods: {
            addWork () {
                this.postForm.times.push({
                    value: ''
                });
            },
            removeWork(item) {
                var index = this.postForm.times.indexOf(item)
                if (index !== -1) {
                    this.postForm.times.splice(index, 1);
                }
            },
            uploadListener (data) {
                alert(data)
            },
            showH5 () {
                if(!this.showH){
                    this.showH=true;
                    this.showPer=false;
                    this.showSto = false;
                    this.showVid = false;
                } else {
                    this.showPer=false;
                    this.showSto = false;
                    this.showVid = false;
                }
            },
            showPerHome () {
                if(!this.showPer){
                    this.showPer=true;
                    this.showH=false;
                    this.showSto = false;
                    this.showVid = false;
                } else {
                    this.showH=false;
                    this.showSto = false;
                    this.showVid = false;
                }
            },
            showStory () {
                if(!this.showSto){
                    this.showSto = true;
                    this.showPer = false;
                    this.showH = false;
                    this.showVid = false;
                } else {
                    this.showPer = false;
                    this.showH=false;
                    this.showVid = false;
                }
            },
            showVideo () {
                if(!this.showSto){
                    this.showVid = true;
                    this.showSto = false;
                    this.showPer = false;
                    this.showH = false;
                    this.showRe = false;
                } else {
                    this.showSto = false;
                    this.showPer = false;
                    this.showH=false;
                    this.showRe = false;
                }
            },showRecharge () {
                if(!this.showSto){
                    this.showRe = true;
                    this.showSto = false;
                    this.showPer = false;
                    this.showH = false;
                    this.showVid = false;
                } else {
                    this.showSto = false;
                    this.showPer = false;
                    this.showH = false;
                    this.showVid = false;
                }
            },
            showAssignTime () {
                if(!this.showAssign){
                    this.showAssign=true;
                    this.showCycle=false;
                    this.showEvery = false;
                } else {
                    this.showCycle=false;
                    this.showEvery = false;
                }
            },
            showCycleTime () {
                if(!this.showCycle){
                    this.showCycle=true;
                    this.showEvery = false;
                    this.showAssign = false;
                } else {
                    this.showEvery = false;
                    this.showAssign = false;
                }
            },
            showEveryTime () {
                if(!this.showCycle){
                    this.showEvery = true;
                    this.showAssign = false;
                    this.showCycle = false;
                } else {
                    this.showAssign = false;
                    this.showCycle = false;
                }
            },
            /*getDetail () {
             actorListAll (this.listQuery).then(response => {
             this.postForm = response.data.content;
             if (response.data.content.gender == 1) {
             this.postForm.gender = '男'
             }
             if (response.data.content.gender == 2) {
             this.postForm.gender = '女'
             }
             this.photos = response.data.content.photo;
             this.mvs = response.data.content.mv;
             if (this.photos == '') {
             this.showHr =false;
             }
             /!*for(let i=0;i<this.postForm.nature.length;i++){
             this.postForm.nature[i].name = response.data.content.nature[i].name;
             this.postForm.nature = this.postForm.nature + this.postForm.nature[i].name + ',';
             alert(this.postForm.nature)
             }
             this.postForm.nature = this.postForm.nature.replace("undefined",'');*!/
             /!*for(let i=0;i<response.data.content.photo.length;i++){
             this.photos.amount =this.photos[i].amount;
             this.photos.url = this.photos[i].url;
             }*!/
             //this.photos.amount =this.photos[0].amount;
             //this.photos.url = this.photos[0].url;
             }).catch(err => {
             this.fetchSuccess = false;
             console.log(err);
             });
             },
             fetchData() {
             getArticle().then(response => {
             this.postForm = response.data;
             }).catch(err => {
             this.fetchSuccess = false;
             console.log(err);
             });
             },
             submitForm(formName) {
             //this.postForm.display_time = parseInt(this.display_time / 1000);
             console.log(this.postForm)
             var actorinfo;
             actorinfo = this.postForm;
             this.$refs.postForm.validate(valid => {
             if (valid) {
             this.loading = true;
             actorUpdate(actorinfo).then(response => {
             /!*if (!response.data.items) return;
             console.log(response)
             this.userLIstOptions = response.data.items.map(v => ({
             key: v.name
             }));*!/
             if(response.data.code == 200) {
             this.$message({
             message: '发布成功',
             type: 'success'
             });
             this.$refs[formName].resetFields();
             this.postForm.status = 'published';
             }
             });
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
             addPhotos (photosList) {
             //this.photoData.name = this.postForm.photo;
             this.photoData.amount = parseInt(this.photosList.amount);
             this.photoData.url = this.photosList.url;
             this.photoData.name = this.photosList.name;
             this.$refs.photosList.validate(valid => {
             if (valid) {
             addPhotos(this.photoData).then(response => {
             //this.postForm = response.data;
             this.photoid = response.data.photoid;
             if (response.data.code == 200) {
             this.$message({
             message: '新增成功',
             type: 'success'
             });
             this.$refs[photosList].resetFields();
             }
             this.getDetail(this.listQuery);
             }).catch(err => {
             this.fetchSuccess = false;
             console.log(err);
             });
             } else {
             console.log('error submit!!');
             return false;
             }
             });
             },
             /!*surePhoto (id) {
             this.dialogPhoto = false;
             this.flagPhoto = true;
             let photoid={
             id: id
             };
             if(this.flagPhoto){
             delPhotos (photoid).then(response => {
             //this.postForm = response.data;
             this.flagPhoto = false;
             this.getDetail(this.listQuery);
             console.log()
             }).catch(err => {
             this.fetchSuccess = false;
             console.log(err);
             });
             }
             },*!/
             delPhoto (id) {
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
             }).then(() => {
             let photoid={
             id: id
             };
             delPhotos (photoid).then(response => {
             //this.postForm = response.data;
             this.flagPhoto = false;
             this.getDetail(this.listQuery);
             console.log()
             }).catch(err => {
             this.fetchSuccess = false;
             console.log(err);
             });
             }).catch(() => {
             this.$message({
             type: 'info',
             message: '已取消删除'
             });
             });
             //this.dialogPhoto = true;
             /!*let photoid={
             id: id
             };
             if(this.flagPhoto){
             delPhotos (photoid).then(response => {
             //this.postForm = response.data;
             console.log()
             }).catch(err => {
             this.fetchSuccess = false;
             console.log(err);
             });
             }*!/
             },
             delPicture (id,url) {
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
             }).then(() => {
             let photoinfo={
             id: id,
             url: url
             };
             delPhotos (photoinfo).then(response => {
             //this.postForm = response.data;
             this.thumbnaillist(id);
             console.log()
             }).catch(err => {
             this.fetchSuccess = false;
             console.log(err);
             });
             }).catch(() => {
             this.$message({
             type: 'info',
             message: '已取消删除'
             });
             });
             },
             addMv (addmvs) {
             let mvlist = {
             id: parseInt(this.$route.params.actor),
             mvname: this.addmvs.mvname,
             mvurl: this.addmvs.mvurl,
             mvpicture: this.addmvs.thumbnail,
             amount: parseInt(this.addmvs.amount)
             };
             this.$refs.addmvs.validate(valid => {
             if (valid) {
             addMvs (mvlist).then(response => {
             //this.postForm = response.data;
             if(response.data.code==200){
             this.$message({
             message: '新增成功',
             type: 'success'
             });
             this.$refs[addmvs].resetFields();
             }
             this.getDetail(this.listQuery);
             }).catch(err => {
             this.fetchSuccess = false;
             console.log(err);
             });
             } else {
             console.log('error submit!!');
             return false;
             }
             });
             },
             /!*sureMv (id) {
             this.dialogMv = false;
             this.flagMv = true;
             let mvid={
             id: id
             };
             delMv (mvid).then(response => {
             //this.postForm = response.data;
             this.getDetail(this.listQuery);
             console.log()
             }).catch(err => {
             this.fetchSuccess = false;
             console.log(err);
             });
             },*!/
             delMv (id) {
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
             }).then(() => {
             let mvid={
             id: id
             };
             delMv (mvid).then(response => {
             //this.postForm = response.data;
             this.getDetail(this.listQuery);
             console.log()
             }).catch(err => {
             this.fetchSuccess = false;
             console.log(err);
             });
             }).catch(() => {
             this.$message({
             type: 'info',
             message: '已取消删除'
             });
             });
             //this.dialogMv = true;
             /!*let mvid={
             id: id
             };
             delMv (mvid).then(response => {
             //this.postForm = response.data;
             console.log()
             }).catch(err => {
             this.fetchSuccess = false;
             console.log(err);
             });*!/
             },
             thumbnaillist (id) {
             this.photoid = id;
             this.dialogVisible = true;
             let list = {
             id: parseInt(this.$route.params.actor),
             photoid: id
             };
             thumbnaillist (list).then(response => {
             this.upPhotos = response.data.content;
             //this.photos.photoNum = response.data.content.length;
             for(let i=0;i<this.photos.length;i++){
             if(this.photos[i].id == id){
             this.photos[i].photoNum = response.data.content.length;
             }
             }
             console.log();
             }).catch(err => {
             this.fetchSuccess = false;
             console.log(err);
             });
             },
             picInput (data) {
             if (data) {
             this.watcher = data;
             }
             },
             picList (id) {
             let photoList={
             id: parseInt(this.$route.params.actor),
             photoid: id,
             photourl: this.upPhotos.photourl
             };
             //photoList.photourl = this.upPhotos.photourl;
             //this.$refs.upPhotos.validate(valid => {
             //if (valid) {

             /!*} else {
             console.log('error submit!!');
             return false;
             }
             });*!/
             if (photoList.photourl) {
             addPhoto (photoList).then(response => {
             console.log();
             this.upPhotos.photourl = '';
             this.thumbnaillist(id);
             }).catch(err => {
             this.fetchSuccess = false;
             console.log(err);
             });
             }/!* else {
             this.$message({
             message: '上传失败',
             type: 'error'
             });
             }*!/
             //this.dialogVisible = false;
             },*/
            getRemoteUserList(query) {
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
    .pictureStyle {
        display: inline-block;
        width: 180px;
        height: 180px;
        border: 1px dashed #d9d9d9;
    }
    }
</style>

