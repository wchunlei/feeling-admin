<template>
    <div class="createPost-container">
        <el-form class="form-container" :model="postForm" ref="postForm" :rules="bannerDetail">

            <div class="createPost-main-container">

                <el-form-item label="标题:" label-width="100px" prop="title" style="margin-bottom: 40px" required>
                    <el-input placeholder="最多输入10个字" style='width:200px;' v-model="postForm.title"  :maxlength="10"></el-input>
                </el-form-item>

                <el-form-item label="banner图:" label-width="100px" prop="pic" style="margin-bottom: 40px" required>
                    <!--<div style="margin-bottom: 20px;">
                        <Upload v-model="postForm.pic"></Upload>
                        <span style="font-size:12px">（注：请上传比例16：9，不小于100Kb的图片）</span>
                    </div>-->
                    <div style="margin-right: 20px;width: 320px;height: 180px;border: 1px dashed #d9d9d9;">
                        <Upload v-model="postForm.pic" v-on:input="picInput"></Upload>
                    </div>
                    <span style="font-size:12px;margin-top: -30px;display:inline-block">（注：请上传16:9，不小于10kb，jpg、png等格式的文件）</span>
                </el-form-item>

                <el-form-item label="跳转设置:" label-width="100px" prop="type" style="margin-bottom: 40px" required>
                    <!--<el-select v-model="postForm.top" placeholder="请选择">
                        <el-option v-for="item in topOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>-->
                    <template>
                        <span @click="showH5"><el-radio v-model="postForm.type" label="1">H5页面</el-radio></span>
                        <span @click="showPerHome"><el-radio v-model="postForm.type" label="5">女仆空间</el-radio></span>
                        <span @click="showStory"><el-radio v-model="postForm.type" label="2">剧情选择页<span style="color:red">（请配置后注意查看该女仆的工作时间，以免用户无法跳转该链接）</span></el-radio></span>
                        <span @click="showVideo"><el-radio v-model="postForm.type" label="4">视频</el-radio></span>
                        <span @click="showRecharge"><el-radio v-model="postForm.type" label="3">充值页</el-radio></span>
                    </template>
                </el-form-item>

                <div v-show="showH" style="display: inline-block;margin-bottom: 20px">
                    <el-form-item label="跳转地址:" label-width="100px" prop="url" style="margin-bottom: 40px" required>
                        <el-input placeholder="请输入链接" style='width:190px;' v-model="postForm.url" :maxlength="1000"></el-input>
                        <!--<span>钻石</span>-->
                    </el-form-item>
                    <el-form-item label="用户信息:" label-width="100px" prop="message" style="margin-bottom: 20px">
                        <el-select v-model="postForm.message" placeholder="请选择">
                            <el-option v-for="item in userMessOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <!--<span style="font-size:12px">（注：默认排序：按照上架时间逆序排列）</span>-->
                    </el-form-item>
                </div>

                <el-form-item v-show="showPer" label="选择主角:" label-width="100px" prop="actor" style="margin-bottom: 40px" required>
                    <!--<div style="margin-bottom: 20px;width:800px">
                        <Upload v-model="postForm.backImg" v-on:input="picInput"></Upload>
                        <span style="font-size:12px">（注：请上传比例4：3，不小于100Kb的图片）</span>
                    </div>-->
                    <!--<el-select clearable class="filter-item" style="width: 190px" v-model="postForm.actor" placeholder="选择主角">
                        <el-option v-for="item in  nameOptions" :key="item.label" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>-->
                    <multiselect v-model="postForm.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                                 deselectLabel="" track-by="key" :internalSearch="false" label="key" style="width:150px;">
                        <span slot='noResult'>无结果</span>
                    </multiselect>
                </el-form-item>

                <div v-show="showSto" style="display: inline-block;margin-bottom: 0px">
                    <el-form-item label="选择房间:" label-width="100px" prop="room" style="margin-bottom: 40px">
                        <el-select clearable class="filter-item" style="width: 190px" v-model="postForm.room" placeholder="选择房间" required>
                            <el-option v-for="item in  homeOptions" :key="item.label" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择主角:" label-width="100px" prop="actor1" style="margin-bottom: 40px" required>
                        <el-select clearable class="filter-item" style="width: 190px" v-model="postForm.actor1" placeholder="选择主角">
                            <el-option v-for="item in  roomuserLIstOptions" :key="item.label" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                        <!--<multiselect v-model="postForm.actor1" required :options="roomuserLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                                     deselectLabel="" track-by="key" :internalSearch="false" label="key" style="width:150px;">
                            <span slot='noResult'>无结果</span>
                        </multiselect>-->
                    </el-form-item>
                    <el-form-item label="选择剧情:" label-width="100px" prop="script" style="margin-bottom: 40px" required>
                        <el-select clearable class="filter-item" style="width: 190px" v-model="postForm.script" placeholder="选择剧情">
                            <el-option v-for="item in  scriptData" :key="item.label" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>

                <el-form-item v-show="showVid" label="选择视频:" label-width="100px" prop="mvurl" required>
                    <div style="margin-top: 0px">
                        <!--<el-form-item label-width="90px" label="视频:" prop="video">只能上传一个视频</el-form-item>-->
                        <!--<Uploadvideo v-model="postForm.mvurl" :progresses="progressesData"></Uploadvideo>-->
                        <el-select v-model="postForm.mvurl" filterable placeholder="请选择">
                            <el-option v-for="item in videoOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>

                <el-form-item label="排序:" label-width="100px" prop="sort" style="margin-bottom: 40px" required>
                    <el-select v-model="postForm.sort" placeholder="未设置">
                        <el-option v-for="item in bannerOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span style="font-size:12px">（注：默认排序：按照上架时间逆序排列）</span>
                </el-form-item>

                <el-form-item label="上架时间:" label-width="100px" prop="configtime" style="margin-bottom: 40px">
                    <el-date-picker v-model="postForm.configtime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="未设置"></el-date-picker>
                    <span style="font-size:12px">（注：不设置上架时间默认为下架状态）</span>
                </el-form-item>
                <el-form-item label="下架时间:" label-width="100px" prop="configdowntime" style="margin-bottom: 40px">
                    <el-date-picker v-model="postForm.configdowntime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="未设置"></el-date-picker>
                    <span style="font-size:12px">（注：不设置下架时间默认为下架状态）</span>
                </el-form-item>

                <!--<el-form-item label="评论内容:" label-width="100px" prop="" >
                    <div v-for="comment in postForm.comments" style="margin-bottom: 40px">
                        &lt;!&ndash;<el-date-picker v-model="workTime.value" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>&ndash;&gt;
                        <el-input placeholder="最多输入15个字" style='width:220px;' v-model="comment.value" maxlength="15"></el-input>
                        <el-button @click.prevent="addWork">新增评论</el-button>
                        <el-button @click.prevent="removeWork(comment)">删除</el-button>
                    </div>
                </el-form-item>-->

                <el-form-item label-width="100px">
                    <el-button v-show="addBut" type="primary" @click.prevent="addBanner('postForm')" size="large">新增banner</el-button>
                    <el-button v-show="saveBut" type="primary" @click.prevent="addBanner('postForm')" size="large">保存</el-button>
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
    import { addbanner } from 'api/banner';
    import { updatebanner } from 'api/banner';
    import { bannerinfo } from 'api/banner';
    import { actorList } from 'api/actor';
    import { scriptlist } from 'api/story';
    import { roomlist } from 'api/room';
    import { reslist } from 'api/resource';

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
                postForm: {
                    title: '',
                    pic: '',
                    type: '1',
                    url: '',
                    message: '0',
                    room: '',
                    actor: '',
                    actor1: '',
                    script: '',
                    sort: '0',
                    mvurl: '',
                    configtime: '',
                    configdowntime: ''
                },
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
                    value: '1',
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
                homeOptions: [],
                scriptData: [],
                videoOptions: [],
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
                roomuserLIstOptions: [],
                scriptLIstOptions: [],
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
                bannerDetail: {
                    name: [{ validator: validateRequire, trigger: 'blur' }],
                    style: [{ validator: validateRequire, trigger: 'blur' }],
                    height: [{ type: 'number', trigger: 'blur', message: '请输入数值' }],
                    weight: [{ type: 'number', trigger: 'blur', message: '请输入数值' }],
                    age: [{ validator: checkNum, trigger: 'blur' }],
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
            this.getVideoResource();
            let Query = {};
            this.getRemoteUserList(Query);
            //this.getRemoteScriptList();
            this.getList();
            if(this.$route.params.id && this.$route.params.id != ':id') {
                this.saveBut = true;
                this.addBut = false;
                let banner = {};
                banner.id = this.$route.params.id;
                this.getDetail(banner);
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
            "postForm.actor1" (val,oldval) {
                scriptlist(this.listQuery).then(response => {
                    console.log(response)
                    if (this.scriptData) {
                        this.scriptData = [];
                    }
                    for (let i=0; i<response.data.content.length; i++) {
                        let temp = {};
                        if (val == response.data.content[i].actorid) {
                            temp.value = response.data.content[i].id;
                            temp.label = response.data.content[i].title;
                            this.scriptData.push(temp);
                        }
                    }
                })
            },
            "postForm.room" (val,oldval) {
                /*actorList(this.listQuery).then(response => {
                    console.log(response)
                    for (let i=0; i<response.data.content.length; i++) {
                        if (val == response.data.content[i].id) {
                            alert(val)
                            this.userLIstOptions = response.data.content.map(v => ({
                                key: v.name,
                                value: v.id
                            }));
                        }
                    }

                })*/
                roomlist(this.listQuery).then(response => {
                    console.log(response)
                    if (this.roomuserLIstOptions) {
                        this.roomuserLIstOptions = [];
                    }
                    for (let i=0; i<response.data.content.length; i++) {
                        let temp = {};
                        if (val == response.data.content[i].id) {
                            temp.value = response.data.content[i].actorid;
                            for (let j=0; j<this.userLIstOptions.length; j++) {
                                if (temp.value == this.userLIstOptions[j].value) {
                                    temp.label = this.userLIstOptions[j].key;
                                }
                            }
                            this.roomuserLIstOptions.push(temp);
                        }
                    }
                })
            }
        },
        methods: {
            getVideoResource () {
                let typeinfo = {};
                typeinfo.type = '2';
                reslist (typeinfo).then(response => {
                    if(response.data.code==200){
                        for (let i=0; i<response.data.content.length; i++) {
                            let temp = {};
                            temp.value = response.data.content[i].id;
                            temp.label = response.data.content[i].name;
                            this.videoOptions.push(temp);
                        }
                        console.log(this.videoOptions)
                        /*this.$message({
                         message: '新增成功',
                         type: 'success'
                         });*/
                    }
                });
            },
            getList () {
                scriptlist(this.listQuery).then(response => {
                    console.log(response)
                    this.listLoading = false;
                });
                roomlist(this.listQuery).then(response => {
                    console.log(response)
                    for (let i=0; i<response.data.content.length; i++) {
                        let temp = {};
                        temp.value = response.data.content[i].id;
                        temp.label = response.data.content[i].name;
                        this.homeOptions.push(temp);
                    }
                })
            },
            addBanner (formName) {
                this.$refs.postForm.validate(valid => {
                    if (valid) {
                        let dateString;
                        if (this.postForm.configtime) {
                            let date=new Date(this.postForm.configtime);
                            let year=date.getFullYear(),
                                    month=date.getMonth()+ 1,
                                    day=date.getDate(),
                                    hour=date.getHours(),
                                    minutes=date.getMinutes(),
                                    seconds=date.getSeconds();
                            //let dateString=year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
                            dateString=year+'-'+(month>=10?+month:"0"+month)+"-"+(day>=10? day :'0'+day)+' '+(hour>=10?+hour:"0"+hour)+':'+(minutes>=10?+minutes:"0"+minutes)+':'+(seconds>=10?+seconds:"0"+seconds);
                        } else {
                            dateString = '0000-00-00 00:00:00';
                        }
                        let dateString1;
                        if (this.postForm.configdowntime) {
                            let date1=new Date(this.postForm.configdowntime);
                            let year1=date1.getFullYear(),
                                    month1=date1.getMonth()+ 1,
                                    day1=date1.getDate(),
                                    hour1=date1.getHours(),
                                    minutes1=date1.getMinutes(),
                                    seconds1=date1.getSeconds();
                            //let dateString=year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
                            dateString1=year1+'-'+(month1>=10?+month1:"0"+month1)+"-"+(day1>=10? day1 :'0'+day1)+' '+(hour1>=10?+hour1:"0"+hour1)+':'+(minutes1>=10?+minutes1:"0"+minutes1)+':'+(seconds1>=10?+seconds1:"0"+seconds1);
                        } else {
                            dateString1 = '0000-00-00 00:00:00';
                        }
                        let diaryinfo={
                            //actorid: parseInt(this.postForm.actorid),
                            //actorid: this.postForm.actor.value,
                            title: this.postForm.title,
                            pic: this.postForm.pic,
                            configtime: dateString,
                            configdowntime: dateString1,
                            sort: this.postForm.sort,
                            url: '0',
                            message: '0',
                            actorid: '0',
                            roomid: '0',
                            scriptid: '0',
                            mvurl: '0'
                        }
                        //diaryinfo = this.postForm;
                        if (this.postForm.type == 1) {
                            diaryinfo.type = this.postForm.type;
                            diaryinfo.url = this.postForm.url;
                            diaryinfo.message = this.postForm.message;
                        } else if (this.postForm.type == 5) {
                            diaryinfo.type = this.postForm.type;
                            diaryinfo.actorid = this.postForm.actor.value;
                        } else if (this.postForm.type == 2) {
                            diaryinfo.type = this.postForm.type;
                            diaryinfo.roomid = this.postForm.room;
                            diaryinfo.actorid = this.postForm.actor1;
                            diaryinfo.scriptid = this.postForm.script;
                        } else if (this.postForm.type == 4) {
                            diaryinfo.type = this.postForm.type;
                            diaryinfo.mvurl = this.postForm.mvurl;
                        } else if (this.postForm.type == 3) {
                            diaryinfo.type = this.postForm.type;
                        } else {
                            this.$message({
                                message: '请选择类型',
                                type: 'error'
                            });
                        }
                        this.loading = true;
                        if (this.$route.params.id && this.$route.params.id == ':id') {
                            addbanner (diaryinfo).then(response => {
                                if(response.data.code==200){
                                    this.$message({
                                        message: '新增成功',
                                        type: 'success'
                                    });
                                    this.$refs[formName].resetFields();
                                }
                            });
                        } else {
                            diaryinfo.id = this.$route.params.id;
                            updatebanner (diaryinfo).then(response => {
                                if(response.data.code==200){
                                    this.$message({
                                        message: '新增成功',
                                        type: 'success'
                                    });
                                    this.$refs[formName].resetFields();
                                }
                            });
                        }
                        this.postForm.status = 'published';
                        this.loading = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getDetail (home) {
                bannerinfo (home).then(response => {
                    this.postForm = response.data.content;
                    for ( let j=0; j<this.userLIstOptions.length; j++) {
                        if (response.data.content.actorid == this.userLIstOptions[j].value) {
                            this.postForm.actor = this.userLIstOptions[j];
                        }
                    }
                    if (response.data.content.configdowntime == '0000-00-00 00:00:00') {
                        this.postForm.configdowntime = '';
                    }
                    if (response.data.content.configtime == '0000-00-00 00:00:00') {
                        this.postForm.configtime = '';
                    }
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
            addWork () {
                this.postForm.comments.push({
                    value: ''
                });
            },
            removeWork(item) {
                var index = this.postForm.comments.indexOf(item)
                if (index !== -1) {
                    this.postForm.comments.splice(index, 1)
                }
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
            getRemoteUserList(query) {
                actorList(query).then(response => {
                    console.log("getRemoteUserList")
                    if (!response.data.content) return;
                    console.log(response)
                    this.userLIstOptions = response.data.content.map(v => ({
                        key: v.name,
                        value: v.id
                    }));
                })
            },
            getRemoteScriptList(query) {
                scriptlist(query).then(response => {
                    console.log("getRemoteUserList")
                    if (!response.data.content) return;
                    console.log(response)
                    this.scriptLIstOptions = response.data.content.map(v => ({
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

