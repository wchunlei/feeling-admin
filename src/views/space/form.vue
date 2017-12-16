<template>
    <div class="createPost-container">

        <el-form class="form-container" :model="diaryContent" ref="diaryContent" :rules="rules">
            <div class="createPost-main-container">

                <el-form-item label-width="90px" label="主角:" class="postInfo-container-item" prop="actor" style="margin-bottom: 40px;" required>
                    <multiselect v-model="diaryContent.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                                 deselectLabel="" track-by="key" :internalSearch="false" label="key" style="width:150px;" :disabled="disableActor">
                        <span slot='noResult'>无结果</span>
                    </multiselect>
                </el-form-item>

                <el-form-item style="margin-bottom: 40px;" label-width="90px" label="上传类型:" prop="type" required>
                    <template>
                        <span @click="showPictureContent"><el-radio v-model="diaryContent.type" label="0">图片</el-radio></span>
                        <span @click="showVideoContent"><el-radio v-model="diaryContent.type" label="1">短视频</el-radio></span>
                        <span @click="showAudioContent"><el-radio v-model="diaryContent.type" label="2">音频</el-radio></span>
                        <span @click="showCrowdContent"><el-radio v-model="diaryContent.type" label="3">众筹</el-radio></span>
                    </template>
                    <!--<template>
                        <el-radio-group v-model="radioContent">
                            <el-radio label="0" change="showPictureContent">图片</el-radio>
                            <el-radio label="1" change="showVideoContent">视频</el-radio>
                            <el-radio label="2" change="showAudioContent">音频</el-radio>
                        </el-radio-group>
                    </template>-->
                </el-form-item>

                <el-form-item class="uplo" label-width="90px" prop="pic1">
                    <div v-show="showPicContent" class="pictureStyle" style="margin-bottom: 10px;">
                        <!--<el-form-item class="uplo"  label-width="200px" label="图片:最多9张图片"></el-form-item>-->
                        <Upload v-model="diaryContent.pic1"></Upload>
                    </div>
                    <el-form-item label-width="90px" prop="pic2">
                        <div v-show="showPicContent" class="pictureStyle">
                            <Upload v-model="diaryContent.pic2"></Upload>
                        </div>
                    </el-form-item>
                    <el-form-item prop="pic3">
                        <div v-show="showPicContent" class="pictureStyle">
                            <Upload v-model="diaryContent.pic3"></Upload>
                        </div>
                    </el-form-item>
                </el-form-item>

                <el-form-item class="uplo" label-width="90px" prop="pic4">
                    <div v-show="showPicContent" class="pictureStyle" style="margin-bottom: 10px;">
                        <Upload v-model="diaryContent.pic4"></Upload>
                    </div>
                    <el-form-item prop="pic5">
                        <div v-show="showPicContent" class="pictureStyle">
                            <Upload v-model="diaryContent.pic5"></Upload>
                        </div>
                    </el-form-item>
                    <el-form-item prop="pic6">
                        <div v-show="showPicContent" class="pictureStyle">
                            <Upload v-model="diaryContent.pic6"></Upload>
                        </div>
                    </el-form-item>
                </el-form-item>
                <el-form-item class="uplo" label-width="90px" prop="pic7">
                    <div v-show="showPicContent" class="pictureStyle" style="margin-bottom: 10px;">
                        <Upload v-model="diaryContent.pic7"></Upload>
                    </div>
                    <el-form-item prop="pic8">
                        <div v-show="showPicContent" class="pictureStyle">
                            <Upload v-model="diaryContent.pic8"></Upload>
                        </div>
                    </el-form-item>
                    <el-form-item prop="pic9">
                        <div v-show="showPicContent" class="pictureStyle">
                            <Upload v-model="diaryContent.pic9"></Upload>
                        </div>
                    </el-form-item>
                </el-form-item>
                <el-form-item v-show="showPicContent" label="收费设置:" label-width="90px" prop="priceSet" style="margin-bottom: 20px" required>
                    <span @click="showPrice"><el-radio v-model="diaryContent.priceSet" label="0">收费</el-radio></span>
                    <span @click="hidePrice"><el-radio v-model="diaryContent.priceSet" label="1">免费</el-radio></span>
                </el-form-item>
                <div v-show="showPri" style="display: inline-block;margin-bottom: 20px">
                    <!--<el-form-item v-show="showPicContent" label="收费图片:" label-width="90px" prop="selectPic" style="margin-bottom: 20px" required>
                        &lt;!&ndash;<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="diaryContent.selectPic" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="actor in actors" :label="actor" :key="actor">{{actor}}</el-checkbox>
                        </el-checkbox-group>&ndash;&gt;
                        <el-checkbox-group v-model="diaryContent.selectPic">
                            <el-checkbox v-for="pic in selectPics" :label="pic" :key="pic">{{pic}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>-->
                    <el-form-item v-show="showPicContent" label="收费价格:" label-width="90px" prop="price" style="margin-bottom: 40px" required>
                        <el-input v-model.number="diaryContent.price" style="width:150px" placeholder="请输入整数金额"></el-input>
                        <span>钻石 （注：目前收费功能支持最后一张收费，若选择收费，则上传的最后一张图片自动变为模糊收费状态）</span>
                    </el-form-item>
                </div>
                <!--<el-form :model="upPhotos" :rules="picListRules" ref="upPhotos">

                    <el-form-item label="" label-width="60px" prop="photourl">
                        <div style="margin-bottom: 20px;">
                            <Uploadhead v-model="upPhotos.photourl" v-on:input="picInput"></Uploadhead>
                        </div>
                    </el-form-item>

                    <el-form-item style="display:none">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="picList(photo.id)">确 定</el-button>
                    </el-form-item>

                    <template v-for="upphoto in upPhotos">
                        <div style="display:inline-block">
                            <el-form-item label="" label-width="60px" prop="thumbnail">
                                <img :src=upphoto.thumbnail style="width:200px;height:200px" alt="图片不存在"></img>
                                <button type="button" aria-label="Close" class="el-dialog__headerbtn delButton" @click="delPicture(photo.id,upphoto.thumbnail)">
                                    <i class="el-dialog__close el-icon el-icon-close"></i>
                                </button>
                            </el-form-item>
                        </div>
                    </template>
                </el-form>-->

                <el-form-item v-show="showVidContent" label-width="90px" prop="video">
                    <div style="margin-top: -180px">
                        <!--<el-form-item label-width="90px" label="视频:" prop="video">只能上传一个视频</el-form-item>-->
                        <Uploadvideo v-model="diaryContent.video" :progresses="progressesData"></Uploadvideo>
                    </div>
                </el-form-item>
                <el-form-item label-width="50px" label="" class="postInfo-container-item" prop="" style="width:400px;margin-top:-30px">
                    <div v-show="progressesData.progress" style="">
                        <el-progress :percentage="progressesData.percentage" :status="progressesData.progressStatus"></el-progress>
                    </div>
                </el-form-item>

                <el-form-item v-show="showAudContent" label-width="90px" prop="sound">
                    <div style="margin-top: -180px">
                        <Uploadaudio v-model="diaryContent.sound"></Uploadaudio>
                    </div>
                </el-form-item>
                <el-form-item v-show="showAudContent" label="音频图片:" label-width="90px" prop="soundImg" required>
                    <!--<div class="pictureStyle">
                        <Uploadbak v-model="diaryContent.soundImg"></Uploadbak>
                    </div>-->
                    <div style="margin-top: 0px;width: 320px;height: 180px;border: 1px dashed #d9d9d9;">
                        <Uploadimg v-model="diaryContent.soundImg" v-on:input="picInput"></Uploadimg>
                    </div>
                    <span style="font-size:12px;margin-top: -30px;display:inline-block">（注：请上传16:9，不小于10kb，jpg、png等格式的文件）</span>
                </el-form-item>

                <el-form-item v-show="showCroContent" label-width="90px" prop="crowd">
                    <!--<div style="display: inline-block;margin-top: -160px">
                        <Uploadimg v-model="diaryContent.crowd"></Uploadimg>
                    </div>-->
                    <div style="margin-top: -180px;width: 320px;height: 180px;border: 1px dashed #d9d9d9;">
                        <Uploadimg v-model="diaryContent.crowd" v-on:input="picInput"></Uploadimg>
                    </div>
                    <span style="font-size:12px;margin-top: -30px;display:inline-block">（注：请上传16:9，不小于10kb，jpg、png等格式的文件）</span>
                </el-form-item>
                <el-form-item v-show="showCroContent" label="众筹价格:" label-width="90px" prop="crowdfunding" required>
                    <el-input v-model="diaryContent.crowdfunding" style="width:150px" placeholder="请输入整数金额"></el-input>
                    <span>钻石</span>
                </el-form-item>

                <el-form-item style="margin-bottom: 40px;" label-width="90px" label="动态内容:" prop="words" required>
                    <el-input type="textarea" :rows="3" v-model="diaryContent.words" style="width:400px" placeholder="最多输入200个字" :maxlength="200"></el-input>
                </el-form-item>

                <!--<el-form-item style="margin-bottom: 40px;" label-width="90px" label="发布时间:" prop="day">
                    <span style="display: inline-block;margin-:0px;margin-right:8px">第</span><el-input v-model.number="diaryContent.day" style="width:50px"></el-input><span style="display: inline-block;margin-left:8px;">天</span>
                    <el-form-item prop="time" style="display:inline-block">
                        <el-time-select v-model="diaryContent.time"
                                        :picker-options="{
                                        start: '00:00',
                                        step: '00:05',
                                        end: '23:59'
                                      }"
                                        placeholder="选择时间">
                        </el-time-select>
                    </el-form-item>
                </el-form-item>-->
                <el-form-item label-width="90px" label="发布时间:" prop="time"style="margin-bottom: 40px" required>
                    <div class="block">
                        <!--<span class="demonstration">默认</span>-->
                        <el-date-picker v-model="diaryContent.time" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期时间" :picker-options="pickerOptions1"></el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="动态排序:" label-width="90px" prop="spaceSort" style="margin-bottom: 40px" required>
                    <el-select v-model="diaryContent.spaceSort" placeholder="请选择">
                        <el-option v-for="item in spaceSortOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span style="font-size:12px">（注：默认排序：按照上架时间逆序排列）</span>
                </el-form-item>
                <el-form-item label-width="100px">
                    <el-button v-show="addBut" type="primary" @click.prevent="add" size="large">新增动态</el-button>
                    <el-button v-show="saveBut" type="primary" @click.prevent="save" size="large">保存动态</el-button>
                </el-form-item>
            </div>
        </el-form>

    </div>
</template>

<script type="text/ECMAScript-6">
    import Tinymce from 'components/Tinymce'
    //import Uploadvideo from 'components/Upload/video'
    //import Uploadimg from 'components/Upload/singleImage3'
    import Uploadimg from 'components/Upload/pictureFm';
    import Upload from 'components/Upload/pictureSpace';
    import Uploadbak from 'components/Upload/pictureSpaceOne';
    import Uploadvideo from 'components/Upload/video';
    import Uploadaudio from 'components/Upload/audio'
    import MDinput from 'components/MDinput';
    import { validateURL } from 'utils/validate';
    import { getDiary } from 'api/diary';
    import { addmoments } from 'api/diary';
    import { diaryUpdate } from 'api/diary';
    import { userSearch } from 'api/story';
    import { diarydelete } from 'api/diary';

    export default {
        name: 'articleDetail',
        components: { Tinymce, MDinput, Uploadimg, Upload, Uploadvideo, Uploadaudio, Uploadbak },
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
                            callback(new Error('请输入正整数'));
                        } else {
                            callback();
                        }
                    }
                }, 500);
            };
            /*const validateRequire = (rule, value, callback) => {
             if (value === '') {
             this.$message({
             message: rule.field + '为必传项',
             type: 'error'
             });
             callback(null)
             } else {
             callback()
             }
             };*/
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
                diaryContent: {
                    actor: '',
                    words: '',
                    type: '0',
                    video: '', // 视频
                    pic1: '', // 图片
                    pic2: '', // 图片
                    pic3: '', // 图片
                    pic4: '', // 图片
                    pic5: '', // 图片
                    pic6: '', // 图片
                    pic7: '', // 图片
                    pic8: '', // 图片
                    pic9: '', // 图片
                    priceSet: '0',
                    selectPic: [],
                    price: 5,
                    time: new Date(),
                    sound: '',
                    soundImg: '',
                    crowd: '',
                    crowdfunding: 20,
                    spaceSort: '默认'
                    //status: 'draft'
                },
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() + 86400000 < Date.now();
                    },
                },
                selectPics: [ "第一张","第二张","第三张","第四张","第五张","第六张","第七张","第八张","第九张" ],
                progressesData: {
                    percentage: 25,
                    progress: false
                },
                diaryContentEdit: {},
                postForm: {
                    //id: this.$route.params.num,
                    id: this.$route.params.num,
                    actorid:'',
                    actor: '',
                    title:'',
                    type: '',
                    video: '', // 视频
                    pic1: '', // 图片
                    pic2: '', // 图片
                    pic3: '', // 图片
                    pic4: '', // 图片
                    pic5: '', // 图片
                    pic6: '', // 图片
                    pic7: '', // 图片
                    pic8: '', // 图片
                    pic9: '', // 图片
                    dt: new Date(),
                    status: 'draft'
                },
                diaryInfo: {
                    type: '',
                    video: '', // 视频
                    pic1: '', // 图片
                    pic2: '', // 图片
                    pic3: '', // 图片
                    pic4: '', // 图片
                    pic5: '', // 图片
                    pic6: '', // 图片
                    pic7: '', // 图片
                    pic8: '', // 图片
                    pic9: '', // 图片
                },
                diaryEdit: {
                    id: '',
                    diaryid: '',
                    actorid: '',
                    title: '',
                    words: '',
                    type: '',
                    pic1: '',
                    pic2: '',
                    pic3: '',
                    pic4: '',
                    pic5: '',
                    pic6: '',
                    pic7: '',
                    pic8: '',
                    pic9: '',
                    video: '',
                    //dt: dateString
                    //day: '',
                    time: '',
                },
                spaceSortOptions: [{
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
                disableActor: false,
                disableTitle: false,
                showButton: false,
                showContentButton: false,
                showDiary: false,
                dialogDiaryContent: false,
                dialogDiaryContentEdit: false,
                fetchSuccess: true,
                loading: false,
                natureLength: false,
                userLIstOptions: [],
                diarys: [],
                /*rules: {
                 actor: [
                 { required: true, message: '请输入姓名', trigger: 'change' }
                 ],
                 title: [
                 { required: true, message: '请输入日记标题', trigger: 'blur' }
                 ],
                 pic: [
                 { required: true, message: '请上传一只图片', trigger: 'blur' }
                 ]
                 },*/
                rules: {
                    actor: [{ validator: validateRequire, trigger: 'change' }],
                    price: [{ validator: checkNum, trigger: 'blur' }],
                    words: [{ validator: validateRequire, trigger: 'blur' }],
                    crowdfunding: [{ validator: checkNum, trigger: 'blur' }],
                    //video: [{ validator: validateRequire, trigger: 'blur' }],
                    //dt: [{ validator: validateRequire, trigger: 'blur' }]
                },
                /*diary: {
                    actor: [{ validator: checkNum, }]
                },*/
                //radio: '0',
                types: '',
                radioPrice: '0',
                radioContent: '0',
                radioContentEdit: '0',
                selectTime: new Date(2017, 8, 14, 12, 10),
                showPic: true,
                showVid: false,
                showPicContent: true,
                showVidContent: false,
                showAudContent: false,
                showCroContent: false,
                showPri: true,
                addBut: true,
                saveBut: false
            }
        },
        computed: {
            isEdit() {
                return this.$route.meta.isEdit // 根据meta判断
                // return this.$route.path.indexOf('edit') !== -1 // 根据路由判断
            }
        },
        created() {
            let Query = {};
            //this.getRemoteUserList(Query);
            if(this.$route.params.id && this.$route.params.id != ':id'){
                /*let listQuery={};
                listQuery.id = this.$route.params.id;
                listQuery.actorid = this.$route.params.actorid;
                //this.fetchData(listQuery);
                //this.showDiary = true;*/
                this.saveBut = true;
                this.addBut = false;
                this.showButton = false;
                this.showContentButton = true;
                this.disableActor = true;
                this.disableTitle = true;
            }
            if(this.$route.params.num && this.$route.params.num == ':num'){
                this.showButton = true;
                this.showDiary = false;
            }
            /*id = $route.params.num;
             if(id == "num:"){
             id = "";
             }*/

            //this.postForm.actor={key:"1", value:this.$route.params.num};
            //this.postForm.actor.key=this.$route.params.num;
        },
        watch : {
            /*types () {
             for (let i=0; i<this.diarys.length; i++) {
             if (this.diarys[i].type == 0) {
             this.showPicture();
             }else if (this.diarys[i].type == 1) {
             this.showVideo();
             }
             }
             }*/
            /*"postForm.actor" (newval,oldval) {
             if (this.postForm.actor == '' || !newval) {
             this.$message({
             message: "请选择主角",
             type: 'error'
             })
             }
             }*/
        },
        methods: {
            fetchData(listQuery) {
                getDiary(listQuery).then(response => {
                    //this.postForm.actor.value = response.data.content.actorid;
                    this.postForm.actor = { key:response.data.content[0].name, value:response.data.content[0].actorid };
                    this.postForm.title = response.data.content[0].title;
                    this.diarys = response.data.content;
                    let num = 1;
                    for (let i=0; i<response.data.content.length; i++) {
                        if (response.data.content[i].type != -1) {
                            this.showDiary = true;
                        }
                        this.diarys[i].index = num++;
                    }
                    /*this.postForm.type = response.data.content.type;
                     this.postForm.pic1 = response.data.content.pic1;
                     this.postForm.pic2 = response.data.content.pic2;
                     this.postForm.pic3 = response.data.content.pic3;
                     this.postForm.pic4 = response.data.content.pic4;
                     this.postForm.pic5 = response.data.content.pic5;
                     this.postForm.pic6 = response.data.content.pic6;
                     this.postForm.pic7 = response.data.content.pic7;
                     this.postForm.pic8 = response.data.content.pic8;
                     this.postForm.pic9 = response.data.content.pic9;
                     this.postForm.id = response.data.content.id;
                     this.postForm.video = response.data.content.video;*/
                }).catch(err => {
                    this.fetchSuccess = false;
                    console.log(err);
                });
            },
            addDiary (formName) {
                this.$refs.postForm.validate(valid => {
                    if (valid) {
                        //var diaryinfo;
                        let date=this.postForm.dt;
                        let year=date.getFullYear(),
                                month=date.getMonth()+ 1,
                                day=date.getDate(),
                                hour=date.getHours(),
                                minutes=date.getMinutes(),
                                seconds=date.getSeconds();
                        let dateString=year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
                        let diaryinfo={
                            //actorid: parseInt(this.postForm.actorid),
                            actorid: parseInt(this.postForm.actor.value),
                            title: this.postForm.title,
                            dt: dateString
                        }
                        //diaryinfo = this.postForm;
                        this.loading = true;
                        addmoments (diaryinfo).then(response => {
                            if(response.data.code==200){
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                this.$refs[formName].resetFields();
                            }
                            /*if (!response.data.items) return;
                             console.log(response)
                             this.userLIstOptions = response.data.items.map(v => ({
                             key: v.name
                             }));*/
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
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            delDiary (id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let deleteitem={
                        id: parseInt(id)
                    };
                    diarydelete(deleteitem).then(response => {
                        //this.list = response.data.content;
                        if(response.data.code==200){
                            let listQuery={};
                            listQuery.id = this.$route.params.num;
                            listQuery.actorid = this.$route.params.actorid;
                            this.fetchData(listQuery);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addDiaryDialog () {
                this.dialogDiaryContent = true;
            },
            editDiaryDialog (diary) {
                this.diaryEdit = diary;
                this.diaryContentEdit = diary;
                this.diaryContentEdit.index = undefined;
                this.diaryContentEdit.status = undefined;
                this.diaryContentEdit.name = undefined;
                this.diaryContentEdit.modify_time = undefined;
                this.radioContentEdit = diary.type.toString();
                this.dialogDiaryContentEdit = true;
            },
            addDiaryContent (formName) {
                //this.$refs.postForm.validate(valid => {
                //if (valid) {
                //var diaryinfo;
                let date=this.postForm.dt;
                let year=date.getFullYear(),
                        month=date.getMonth()+ 1,
                        day=date.getDate(),
                        hour=date.getHours(),
                        minutes=date.getMinutes(),
                        seconds=date.getSeconds();
                let dateString=year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
                let diaryinfo={
                    //actorid: parseInt(this.postForm.actorid),
                    diaryid: parseInt(this.$route.params.num),
                    actorid: parseInt(this.postForm.actor.value),
                    title: this.postForm.title,
                    words: this.diaryContent.words,
                    type: parseInt(this.radioContent),
                    pic1: this.diaryContent.pic1,
                    pic2: this.diaryContent.pic2,
                    pic3: this.diaryContent.pic3,
                    pic4: this.diaryContent.pic4,
                    pic5: this.diaryContent.pic5,
                    pic6: this.diaryContent.pic6,
                    pic7: this.diaryContent.pic7,
                    pic8: this.diaryContent.pic8,
                    pic9: this.diaryContent.pic9,
                    video: this.diaryContent.video,
                    //dt: dateString
                    //day: this.diaryContent.day,
                    time: this.diaryContent.time,
                };
                /*if(this.$route.params.num && this.$route.params.num != ':num'){
                 diaryinfo.id=this.postForm.id;
                 }*/
                //diaryinfo = this.postForm;
                this.loading = true;
                diaryUpdate(diaryinfo).then(response => {
                    if(response.data.code==200){
                        this.$message({
                            message: '新增成功',
                            type: 'success'
                        });
                        let listQuery={};
                        listQuery.id = this.$route.params.num;
                        listQuery.actorid = this.$route.params.actorid;
                        this.fetchData(listQuery);
                    }
                    /*if (!response.data.items) return;
                     console.log(response)
                     this.userLIstOptions = response.data.items.map(v => ({
                     key: v.name
                     }));*/
                });
                this.$refs[formName].resetFields();
                /*this.$notify({
                 title: '成功',
                 message: '发布成功',
                 type: 'success',
                 duration: 2000
                 });*/
                //this.postForm.status = 'published';
                this.loading = false;
                this.dialogDiaryContent = false;
                /*} else {
                 console.log('error submit!!');
                 return false;
                 }
                 });*/
                /*let _this=this;
                 let date=this.postForm.dt;
                 let year=date.getFullYear(),
                 month=date.getMonth()+ 1,
                 day=date.getDate(),
                 hour=date.getHours(),
                 minutes=date.getMinutes(),
                 seconds=date.getSeconds();
                 let dateString=year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
                 alert(this.postForm.id)
                 if(!this.postForm.id){
                 $.ajax({
                 "url":"http://192.168.1.43:40000/?act=momentsupdate",
                 "cache": false,
                 "async": true,
                 "type": "post",
                 "dataType": "json",
                 "contentType": "application/json; charset=utf-8",
                 'data': '{"actorid":'+ parseInt(this.postForm.actorid) +', "title":"' +this.postForm.title+ '", "type":'+ parseInt(this.radio)+', "pic1":"'+ this.postForm.pic1+ '", "pic2":"'+ this.postForm.pic2+ '","pic3":"'+ this.postForm.pic3+ '","pic4":"'+ this.postForm.pic4+ '","pic5":"'+ this.postForm.pic5+ '","pic6":"'+ this.postForm.pic6+ '","pic7":"'+ this.postForm.pic7+ '","pic8":"'+ this.postForm.pic8+ '","pic9":"'+ this.postForm.pic9+ '","video":"'+ this.postForm.video+ '","dt":"'+ dateString+ '"}',
                 success:function(data){
                 if(data.code==200){
                 _this.succ();
                 }
                 },
                 error:function () {
                 console.log('_请求失败_')
                 }
                 })
                 } else {
                 $.ajax({
                 "url":"http://192.168.1.43:40000/?act=momentsupdate",
                 "cache": false,
                 "async": true,
                 "type": "post",
                 "dataType": "json",
                 "contentType": "application/json; charset=utf-8",
                 'data': '{"id":'+this.postForm.id+', "actorid":'+ parseInt(this.postForm.actorid) +', "title":"' +this.postForm.title+ '", "type":'+ parseInt(this.radio)+', "pic1":"'+ this.postForm.pic1+ '", "pic2":"'+ this.postForm.pic2+ '","pic3":"'+ this.postForm.pic3+ '","pic4":"'+ this.postForm.pic4+ '","pic5":"'+ this.postForm.pic5+ '","pic6":"'+ this.postForm.pic6+ '","pic7":"'+ this.postForm.pic7+ '","pic8":"'+ this.postForm.pic8+ '","pic9":"'+ this.postForm.pic9+ '","video":"'+ this.postForm.video+ '","dt":"'+ dateString+ '"}',
                 success:function(data){
                 if(data.code==200){
                 _this.succ();
                 }
                 },
                 error:function () {
                 console.log('_请求失败_')
                 }
                 })
                 }*/
            },
            editDiaryContent () {
                this.loading = true;
                diaryUpdate(this.diaryEdit).then(response => {
                    if(response.data.code==200){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        let listQuery={};
                        listQuery.id = this.$route.params.num;
                        listQuery.actorid = this.$route.params.actorid;
                        this.fetchData(listQuery);
                    }
                });
                //this.$refs[formName].resetFields();
                /*this.$notify({
                 title: '成功',
                 message: '发布成功',
                 type: 'success',
                 duration: 2000
                 });*/
                //this.postForm.status = 'published';
                this.loading = false;
                this.dialogDiaryContentEdit = false;
            },
            draftForm() {
                if (this.postForm.actorid.length === 0 || this.postForm.title.length === 0) {
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
            showVideo () {
                if(!this.showVid){
                    this.showVid=true;
                    this.showPic=false;
                } else {
                    this.showPic=false;
                }
            },
            showPicture () {
                if(!this.showPic){
                    this.showPic=true;
                    this.showVid=false;
                } else {
                    this.showVid=false;
                }
            },
            showPictureContent () {
                if(!this.showPicContent){
                    this.showPicContent=true;
                    this.showVidContent=false;
                    this.showAudContent = false;
                    this.showCroContent = false;
                } else {
                    this.showVidContent=false;
                    this.showAudContent = false;
                    this.showCroContent = false;
                }
            },
            showVideoContent () {
                if(!this.showVidContent){
                    this.showVidContent=true;
                    this.showPicContent=false;
                    this.showAudContent = false;
                    this.showCroContent = false;
                } else {
                    this.showPicContent=false;
                    this.showAudContent = false;
                    this.showCroContent = false;
                }
            },
            showAudioContent () {
                if(!this.showAudContent){
                    this.showAudContent = true;
                    this.showVidContent=false;
                    this.showPicContent=false;
                    this.showCroContent = false;
                } else {
                    this.showPicContent=false;
                    this.showVidContent=false;
                    this.showCroContent = false;
                }
            },
            showCrowdContent () {
                if(!this.showCroContent){
                    this.showCroContent = true;
                    this.showAudContent = false;
                    this.showVidContent=false;
                    this.showPicContent=false;
                } else {
                    this.showPicContent=false;
                    this.showVidContent=false;
                    this.showAudContent = false;
                }
            },
            showPrice () {
                this.showPri = true;
            },
            hidePrice () {
                this.showPri = false;
            },
            succ () {
                this.$notify({
                    title: '成功',
                    message: '新增日记成功',
                    type: 'success'
                });
            },
            picInput (data) {
                if (data) {
                    this.watcher = data;
                }
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
    .uplo div{
        display: inline-block;
    }
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
        max-height:730px;
        overflow:auto;
    }
    .el-dialog__headerbtn {
        margin-right:10px
    }
    .pictureStyle {
        display: inline-block;
        width: 180px;
        height: 180px;
        border: 1px dashed #d9d9d9;
    }
</style>

