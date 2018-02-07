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
                    <el-input placeholder="最多输入10个字" style='width:220px;' v-model="postForm.name" :maxlength="10"></el-input>
                </el-form-item>

                <el-form-item label="背景图:" label-width="100px" prop="backimg" style="margin-bottom: 40px">
                    <div style="margin-bottom: 0px;width: 180px;height: 240px; border: 1px dashed #d9d9d9;">
                        <Upload v-model="postForm.backimg" v-on:input="picInput"></Upload>
                    </div>
                    <span style="font-size:12px;display:inline-block; margin-top: -40px">（注：请上传3:4，不小于10kb，jpg、png等格式的文件）</span>
                    <!--<input type="file" @change="uploadfile(this)" />-->
                </el-form-item>

                <el-form-item label="主角:" label-width="100px" prop="checkedActor" style="margin-bottom: 40px">
                    <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="postForm.checkedActor" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="actor in actors" :label="actor" :key="actor">{{actor}}</el-checkbox>
                    </el-checkbox-group>-->
                    <!--<el-checkbox-group v-model="postForm.checkedActor">
                        <el-checkbox v-for="actor in actors" :label="actor" :key="actor">{{actor}}</el-checkbox>
                    </el-checkbox-group>-->
                    <el-select clearable class="filter-item" style="width: 190px" v-model="postForm.checkedActor" placeholder="选择主角" @visible-change="changeScr">
                        <el-option v-for="item in  actorOptions" :key="item.label" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <!--<multiselect v-model="postForm.checkedActor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                                 deselectLabel="" track-by="key" :internalSearch="false" label="key" style="width:150px;">
                        <span slot='noResult'>无结果</span>
                    </multiselect>-->
                </el-form-item>
                <el-form-item label="剧情:" label-width="100px" prop="checkedStory" style="margin-bottom: 40px">
                    <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="postForm.checkedActor" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="actor in actors" :label="actor" :key="actor">{{actor}}</el-checkbox>
                    </el-checkbox-group>-->
                    <!--<el-checkbox-group v-model="postForm.checkedStory">
                        <el-checkbox v-for="story in storys" :label="story" :key="story">{{story}}</el-checkbox>
                    </el-checkbox-group>-->
                    <el-transfer v-model="postForm.checkedStory" :data="scriptData" :titles="['未选择', '已选择']" @change="changeTransfer"></el-transfer>
                    <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>-->
                    <!--<el-checkbox-group v-model="postForm.checkedStory" @change="handleScriptChange">
                        <el-checkbox v-for="script in scriptDataLabel" :label="script" :key="script">{{script}}</el-checkbox>
                    </el-checkbox-group>-->
                </el-form-item>

                <el-form-item label="上架时间:" label-width="100px" prop="configtime" style="margin-bottom: 40px;">
                    <!--<el-select v-model="postForm.config" placeholder="请选择">
                        <el-option v-for="item in configOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span style="font-size:12px">（注：下架状态：该主角不会在App中显示）</span>-->
                    <el-date-picker v-model="postForm.configtime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="未设置" :picker-options="pickerOptions1"></el-date-picker>
                    <span style="font-size:12px">（注：不设置上架时间默认为下架状态）</span>
                </el-form-item>

                <el-form-item label="房间排序:" label-width="100px" prop="roomsort" style="margin-bottom: 40px" required>
                    <el-select v-model="postForm.roomsort" placeholder="请选择">
                        <el-option v-for="item in homeSortOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span style="font-size:12px">（注：默认排序：按照上架时间逆序排列）</span>
                </el-form-item>
                <el-form-item label-width="100px">
                    <el-button v-show="addBut" type="primary" @click.prevent="addHome" size="large">新增房间</el-button>
                    <el-button v-show="saveBut" type="primary" @click.prevent="addHome" size="large">保存房间</el-button>
                </el-form-item>

            </div>
        </el-form>

    </div>
</template>

<script type="text/ECMAScript-6">
    import Tinymce from 'components/Tinymce';
    import Upload from 'components/Upload/pictureHome';
    import Uploadhead from 'components/Upload/headPhoto'
    import Uploadvideo from 'components/Upload/video';
    import MDinput from 'components/MDinput';
    import { validateURL } from 'utils/validate';
    import { addroom } from 'api/room';
    import { updateroom } from 'api/room';
    import { roominfo } from 'api/room';
    import { actorList } from 'api/actor';
    import { scriptlist } from 'api/story';

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
                const csriptdatas = [];
                /*for (let i = 1; i <= 15; i++) {
                    csriptdatas.push({
                        key: i,
                        label: `备选项 ${ i }`,
                        //disabled: i % 4 === 0
                    });
                }*/
                scriptlist(this.listQuery).then(response => {
                    console.log(response)
                    for (let i=0; i<response.data.content.length; i++) {
                        let temp = {};
                        if (this.postForm.checkedActor == response.data.content[i].actorid) {
                            temp.key = response.data.content[i].id;
                            temp.label = response.data.content[i].title;
                            this.csriptdatas.push(temp);
                        }
                    }
                })
                return csriptdatas;
            };
            return {
                scriptData: [],
                scriptDataLabel: [],
                scriptDataAll: [],
                script: [],
                actorOptions: [],
                phopoid: '',
                watcher: false,
                listQuery: {},
                listQuery1: {
                    actorid: ''
                },
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
                    checkedActor: '',
                    checkedStory: [],
                    backimg: '',
                    configtime: '',
                    roomsort: '0',
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
                },{
                    value: '6',
                    label: '6'
                },{
                    value: '7',
                    label: '7'
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
                    //checkedActor: [{ validator: validateRequireAll, trigger: 'blur' }],
                    //checkedStory: [{ validator: validateRequireAll, trigger: 'blur' }]
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
            this.getActor();
            //this.getRemoteUserList(this.listQuery);
            if(this.$route.params.id && this.$route.params.id != ':id') {
                this.saveBut = true;
                this.addBut = false;
                //this.getScriptList();
                /*let home = {};
                home.id = this.$route.params.id;
                this.$nextTick(function() {
                    this.getDetail(home);
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
        /*mounted () {
            let home = {};
            home.id = this.$route.params.id;
            this.getDetail(home);
        },*/
        /*mounted(){
            if(this.$route.params.id && this.$route.params.id != ':id') {
                this.$nextTick(function() {
                    this.getActor();
                    let home = {};
                    home.id = this.$route.params.id;
                    this.getDetail(home);
                })
            }
        },*/
        watch : {
            "postForm.checkedActor": {
                handler:function(val,oldval) {
                    this.listQuery1.actorid = val;
                },
                deep:true,
            }
            /*"postForm.checkedActor": {
                handler:function(val,oldval) {
                    if (this.scriptDataLabel) {
                        this.scriptDataLabel = [];
                    }
                    scriptlist(this.listQuery).then(response => {
                        console.log(response)
                        if (this.scriptData) {
                            this.scriptData = [];
                        }
                        for (let i=0; i<response.data.content.length; i++) {
                            let temp = {};
                            if (val == response.data.content[i].actorid) {
                                temp.key = response.data.content[i].id;
                                temp.label = response.data.content[i].title;
                                this.scriptData.push(temp);
                                this.scriptDataLabel.push(temp.label);
                            }
                        }
                    })
                },
                deep:true,
            }*/
        },
        methods: {
            getActor () {
                actorList(this.listQuery).then(response => {
                    console.log(response.data.content)
                    this.actorOptions = response.data.content.map(v => ({
                        value: v.id,
                        label: v.name
                     }));
                    /*for (let i=0; i<response.data.content.length; i++) {
                        //alert(response.data.content[i].id)
                        let temp = {};
                        temp.value = response.data.content[i].id;
                        temp.label = response.data.content[i].name;
                        this.actorOptions.push(temp);
                    }*/
                    if(this.$route.params.id && this.$route.params.id != ':id') {
                        let home = {};
                        home.id = this.$route.params.id;
                        this.getDetail(home);
                    }
                })
            },
            changeScr () {
                scriptlist(this.listQuery1).then(response => {
                    console.log(response)
                    if (this.scriptData) {
                        this.scriptData = [];
                    }
                    if (this.scriptDataLabel) {
                        this.scriptDataLabel = [];
                    }
                    for (let i=0; i<response.data.content.length; i++) {
                        let temp = {};
                        if (this.postForm.checkedActor == response.data.content[i].actorid) {
                            temp.key = response.data.content[i].id;
                            temp.label = response.data.content[i].title;
                            this.scriptData.push(temp);
                            this.scriptDataLabel.push(temp.label);
                        }
                    }
                })
            },
            getScriptList () {
                scriptlist(this.listQuery1).then(response => {
                    for (let i=0; i<response.data.content.length; i++) {
                        let temp = {};
                        let tempall = {};
                        temp.key = response.data.content[i].id;
                        temp.label = response.data.content[i].title;
                        this.scriptData.push(temp);
                        tempall.key = response.data.content[i].id;
                        tempall.label = response.data.content[i].title;
                        tempall.actorid = response.data.content[i].actorid;
                        this.scriptDataAll.push(tempall);
                    }
                    console.log(response)
                    this.listLoading = false;
                })
            },
            changeTransfer () {
                if(this.$route.params.id && this.$route.params.id != ':id') {
                    this.postForm.name = this.postForm.name + ' ';
                }
            },
            handleScriptChange(value) {
                //this.postForm.name = this.postForm.name + ' ';
                alert(value)
                //let checkedCount = value.length;
                //this.checkAll = checkedCount === this.scriptData.length;
                //this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            addHome () {
                let dateString;
                if (this.postForm.configtime && this.postForm.configtime != '0000-00-00 00:00:00') {
                    let date= new Date(this.postForm.configtime)
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
                let scriptid = '';
                if (this.postForm.checkedStory == []) {
                    this.$message({
                        message: '请选择剧情',
                        type: 'error'
                    });
                } else {
                    scriptid = this.postForm.checkedStory.join(",");
                }
                /*let scriptids =  '';
                for (let i=0; i<this.scriptData.length; i++) {
                    for (let j=0; j<this.postForm.checkedStory.length; j++) {
                        if (this.postForm.checkedStory[j] == this.scriptData[i].label) {
                            scriptids += this.scriptData[i].key + ',';
                        }
                    }
                }*/
                let homeinfo = {
                    //channel: "女仆团",
                    name: this.postForm.name,
                    actorid: this.postForm.checkedActor,
                    scriptid: this.postForm.checkedStory.join(","),
                    //scriptid: scriptids,
                    backimg: this.postForm.backimg,
                    configtime: dateString,
                    roomsort: this.postForm.roomsort
                };
                /*this.$refs.postForm.validate(valid => {
                 if (valid) {*/
                     this.loading = true;
                    if (this.$route.params.id && this.$route.params.id == ':id') {
                        addroom(homeinfo).then(response => {
                            /*if (!response.data.items) return;
                             console.log(response)
                             this.userLIstOptions = response.data.items.map(v => ({
                             key: v.name
                             }));*/
                            if (response.data.msg == 'name is repeat!') {
                                this.$message({
                                    message: '房间名不能重复',
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
                        homeinfo.id = this.$route.params.id;
                        homeinfo.name = this.postForm.name.replace(/(\s*$)/g, "");
                        for (let i=0; i<this.actorOptions.length; i++) {
                            if (this.postForm.checkedActor == this.actorOptions[i].label) {
                                homeinfo.actorid = this.actorOptions[i].value;
                            }
                        }
                        updateroom(homeinfo).then(response => {
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
                /*} else {
                 console.log('error submit!!');
                 return false;
                 }
                 });*/
            },
            getDetail (home) {
                /*for (let i=0; i<this.scriptData.length; i++) {
                    this.scriptDataLabel.push(this.scriptData[i].label);
                }*/
                roominfo (home).then(response => {
                    this.postForm.name = response.data.content.name;
                    this.postForm.backimg = response.data.content.backimg;
                    this.postForm.roomsort = response.data.content.roomsort;
                    //this.listQuery1.actorid = response.data.content.actorid;
                    for ( let j=0; j<this.actorOptions.length; j++) {
                        if (response.data.content.actorid == this.actorOptions[j].value) {
                            /*this.$nextTick(function () {
                                //console.log(this.$el.textContent) // => '更新完成'
                                this.postForm.checkedActor = this.actorOptions[j].label;
                            })*/
                            this.postForm.checkedActor = this.actorOptions[j].label;
                        }
                    }
                    if (this.postForm.configtime == "0000-00-00 00:00:00") {
                        this.postForm.configtime = '';
                    }
                    if (this.scriptData) {
                        this.scriptData = [];
                    }
                    let tempid = {};
                     tempid.actorid = response.data.content.actorid;
                     scriptlist(tempid).then(response => {
                     for (let i=0; i<response.data.content.length; i++) {
                     let temp = {};
                     let tempall = {};
                     temp.key = response.data.content[i].id;
                     temp.label = response.data.content[i].title;
                     this.scriptData.push(temp);
                     tempall.key = response.data.content[i].id;
                     tempall.label = response.data.content[i].title;
                     tempall.actorid = response.data.content[i].actorid;
                     this.scriptDataAll.push(tempall);
                     }
                     console.log(response)
                     this.listLoading = false;
                     })
                    for (let i=0; i<this.scriptDataAll.length; i ++) {
                        if (response.data.content.actorid == this.scriptDataAll[i].actorid) {
                            let temp = {};
                            temp.key = this.scriptDataAll[i].key;
                            temp.label = this.scriptDataAll[i].label;
                            this.scriptData.push(temp);
                        }
                    }
                    let tempScriptid = response.data.content.scriptid.split(',');
                    for (let i=0; i<tempScriptid.length; i++) {
                        /*let temp;
                         temp = parseInt(tempScriptid[i]);*/
                        this.postForm.checkedStory.push(tempScriptid[i]);
                    }
                    //this.postForm.checkedStory.reverse()
                    console.log(this.postForm.checkedStory)
                }).catch(err => {
                    this.fetchSuccess = false;
                    console.log(err);
                });
            },
            picInput (data,data1) {
                if (data) {
                    this.watcher = data;
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
            getRemoteUserList(query) {
                actorList(query).then(response => {
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
    .el-transfer-panel__body {
        height: 280px;
    }
</style>

