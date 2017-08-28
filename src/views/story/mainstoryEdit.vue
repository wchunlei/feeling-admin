<template>
    <div class="createPost-container">
        <div class="cloth_center" style="margin-left:20px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="场景类型:" prop="select">
                    <el-select v-model="form.select" placeholder="请选择活动区域" @change="selectScenes">
                        <el-option label="请选择" value="9"></el-option>
                        <el-option label="普通视频" value="1"></el-option>
                        <el-option label="交互视频" value="2"></el-option>
                        <el-option label="电话" value="3"></el-option>
                        <el-option label="文字聊天" value="4"></el-option>
                        <el-option label="语音聊天" value="5"></el-option>
                        <el-option label="图片聊天" value="6"></el-option>
                        <el-option label="小游戏" value="7"></el-option>
                        <el-option label="小视频" value="8"></el-option>
                    </el-select>
                </el-form-item>
                <template v-if="nVideo">
                    <el-form ref="normalVideo" :model="normalVideo" label-width="80px">
                        <el-form-item label="普通视频:" prop="video">
                            <div style="margin-bottom: 20px;">
                                <Upload v-model="normalVideo.video"></Upload>
                            </div>
                        </el-form-item>
                    </el-form>
                </template>
                <template v-if="eVideo">
                    <el-form ref="eachVideo" :model="eachVideo" label-width="80px">
                        <el-form-item label="开始视频:" prop="startVideo">
                            <div style="margin-bottom: 20px;">
                                <Upload v-model="eachVideo.startVideo"></Upload>
                            </div>
                        </el-form-item>
                        <el-form-item label="选择一视频:" prop="selectVideo1">
                            <div style="margin-bottom: 20px;">
                                <Upload v-model="eachVideo.selectVideo1"></Upload>
                            </div>
                        </el-form-item>
                        <el-form-item label="选择二视频:" prop="selectVideo2">
                            <div style="margin-bottom: 20px;">
                                <Upload v-model="eachVideo.selectVideo2"></Upload>
                            </div>
                        </el-form-item>
                        <el-form-item label="交互文字:" prop="eachWord" style="width:280px">
                            <el-input v-model="eachVideo.eachWord"></el-input>
                        </el-form-item>
                        <el-form-item label="回答一:" prop="answer1" style="width:280px">
                            <el-input v-model="eachVideo.answer1"></el-input>
                        </el-form-item>
                        <el-form-item label="回答二:" prop="answer2" style="width:280px">
                            <el-input v-model="eachVideo.answer2"></el-input>
                        </el-form-item>
                    </el-form>
                </template>
                <template v-if="wTalk">
                    <el-form ref="wordTalk" :model="wordTalk" label-width="80px">
                        <el-form-item label="文字内容:" prop="wordContent" style="width:280px">
                            <el-input v-model="wordTalk.wordContent"></el-input>
                        </el-form-item>
                        <el-form-item label="回复一:" prop="answer1" style="width:280px">
                            <el-input v-model="wordTalk.answer1"></el-input>
                        </el-form-item>
                        <el-form-item label="回复二:" prop="answer2" style="width:280px">
                            <el-input v-model="wordTalk.answer2"></el-input>
                        </el-form-item>
                        <el-form-item label="回复三:" prop="answer3" style="width:280px">
                            <el-input v-model="wordTalk.answer3"></el-input>
                        </el-form-item>
                        <el-form-item label="回复四:" prop="answer4" style="width:280px">
                            <el-input v-model="wordTalk.answer4"></el-input>
                        </el-form-item>
                        <el-form-item label="回复五:" prop="answer5" style="width:280px">
                            <el-input v-model="wordTalk.answer5"></el-input>
                        </el-form-item>
                    </el-form>
                </template>
                <template v-if="pTalk">
                    <el-form ref="picTalk" :model="picTalk" label-width="80px">
                        <el-form-item label="图片聊天:" prop="pic">
                            <div style="margin-bottom: 20px;">
                                <Upload v-model="picTalk.pic"></Upload>
                            </div>
                        </el-form-item>
                        <el-form-item label="回复一:" prop="answer1" style="width:280px">
                            <el-input v-model="picTalk.answer1"></el-input>
                        </el-form-item>
                        <el-form-item label="回复二:" prop="answer2" style="width:280px">
                            <el-input v-model="picTalk.answer2"></el-input>
                        </el-form-item>
                        <el-form-item label="回复三:" prop="answer3" style="width:280px">
                            <el-input v-model="picTalk.answer3"></el-input>
                        </el-form-item>
                        <el-form-item label="回复四:" prop="answer4" style="width:280px">
                            <el-input v-model="picTalk.answer4"></el-input>
                        </el-form-item>
                        <el-form-item label="回复五:" prop="answer5" style="width:280px">
                            <el-input v-model="picTalk.answer5"></el-input>
                        </el-form-item>
                    </el-form>
                </template>
                <template v-if="sTalk">
                    <el-form ref="soundTalk" :model="soundTalk" label-width="80px">
                        <el-form-item label="语言聊天:" prop="sound">
                            <div style="margin-bottom: 20px;">
                                <Upload v-model="soundTalk.sound"></Upload>
                            </div>
                        </el-form-item>
                        <el-form-item label="回复一:" prop="answer1" style="width:280px">
                            <el-input v-model="soundTalk.answer1"></el-input>
                        </el-form-item>
                        <el-form-item label="回复二:" prop="answer2" style="width:280px">
                            <el-input v-model="soundTalk.answer2"></el-input>
                        </el-form-item>
                        <el-form-item label="回复三:" prop="answer3" style="width:280px">
                            <el-input v-model="soundTalk.answer3"></el-input>
                        </el-form-item>
                        <el-form-item label="回复四:" prop="answer4" style="width:280px">
                            <el-input v-model="soundTalk.answer4"></el-input>
                        </el-form-item>
                        <el-form-item label="回复五:" prop="answer5" style="width:280px">
                            <el-input v-model="soundTalk.answer5"></el-input>
                        </el-form-item>
                    </el-form>
                </template>
                <template v-if="tel">
                    <el-form ref="eachVideo" :model="phone" label-width="80px">
                        <el-form-item label="电话:" prop="speak">
                            <div style="margin-bottom: 20px;">
                                <Upload v-model="phone.speak"></Upload>
                            </div>
                        </el-form-item>
                        <el-form-item label="交互文字:" prop="eachWord" style="width:280px">
                            <el-input v-model="phone.eachWord"></el-input>
                        </el-form-item>
                        <el-form-item label="接听:" prop="answer" style="width:280px">
                            <el-input v-model="phone.answer"></el-input>
                        </el-form-item>
                        <el-form-item label="取消:" prop="cancel" style="width:280px">
                            <el-input v-model="phone.cancel"></el-input>
                        </el-form-item>
                    </el-form>
                </template>
                <template v-if="game">
                    <el-form ref="games" :model="games" label-width="80px">
                        <el-form-item label="游戏类型:">
                            <el-select v-model="games.region" placeholder="请选择">
                                <el-option label="猜拳" value="1"></el-option>
                                <el-option label="玩骰子" value="2"></el-option>
                                <el-option label="猜硬币" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </template>
                <template v-if="sVideo">
                    <el-form ref="smallVideo" :model="smallVideo" label-width="80px">
                        <el-form-item label="小视频:" prop="video">
                            <div style="margin-bottom: 20px;">
                                <Upload v-model="smallVideo.video"></Upload>
                            </div>
                        </el-form-item>
                        <el-form-item label="回复一:" prop="answer1" style="width:280px">
                            <el-input v-model="smallVideo.answer1"></el-input>
                        </el-form-item>
                        <el-form-item label="回复二:" prop="answer2" style="width:280px">
                            <el-input v-model="smallVideo.answer2"></el-input>
                        </el-form-item>
                        <el-form-item label="回复三:" prop="answer3" style="width:280px">
                            <el-input v-model="smallVideo.answer3"></el-input>
                        </el-form-item>
                        <el-form-item label="回复四:" prop="answer4" style="width:280px">
                            <el-input v-model="smallVideo.answer4"></el-input>
                        </el-form-item>
                        <el-form-item label="回复五:" prop="answer5" style="width:280px">
                            <el-input v-model="smallVideo.answer5"></el-input>
                        </el-form-item>
                    </el-form>
                </template>
                <!--<el-form-item label="对象:">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item label="对象:" prop="actor" style="width:280px">
                    <multiselect v-model="form.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                                 deselectLabel="删除" track-by="key" :internalSearch="false" label="key">
                        <span slot='noResult'>无结果</span>
                    </multiselect>
                </el-form-item>
                <el-form-item label="剧情类型:">
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option label="新手" value="1"></el-option>
                        <el-option label="主线" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="剧情标题:" prop="title" style="width:280px">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="天:" prop="day" style="width:280px">
                    <el-input v-model="form.day"></el-input>
                </el-form-item>
                <el-form-item label="步:" prop="step" style="width:280px">
                    <el-input v-model="form.step"></el-input>
                </el-form-item>
                <!--<el-form-item label="出现条件:" prop="condition">
                    <el-select v-model="form.condition" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="编辑事件:" prop="event" style="width:280px">
                    <el-input v-model="form.event"></el-input>
                </el-form-item>
                <el-form-item label="事件条件:" prop="resource">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="1">和出现条件相同</el-radio>
                        <el-radio label="2">自定义</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式" style="width:350px">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Tinymce from 'components/Tinymce'
    import Upload from 'components/Upload/singleImage3'
    import MDinput from 'components/MDinput';
    import { validateURL } from 'utils/validate';
    import { userSearch } from 'api/story';
    import { videoUpdate } from 'api/story';
    import { videoInterUpdate } from 'api/story';
    import { talkUpdate } from 'api/story';
    import { pictureUpdate } from 'api/story';
    import { radioUpdate } from 'api/story';
    import { telUpdate } from 'api/story';
    import { gameUpdate } from 'api/story';
    import { tvUpdate } from 'api/story';

    export default {
        name: 'clothes',
        addEvent: '',
        components: { Tinymce, MDinput, Upload },
        data() {
            return {
                nVideo: false,
                eVideo: false,
                wTalk: false,
                pTalk: false,
                sTalk: false,
                tel: false,
                game: false,
                sVideo: false,
                userLIstOptions: [],
                form: {
                    select: '9',
                    actor: '',
                    type: '',
                    title: '',
                    day: '',
                    step: '',
                    //event: '',
                    //condition: '',
                    //resource: '1',
                    //desc: ''
                },
                normalVideo: {
                    video: ''
                },
                eachVideo: {
                    startVideo: '',
                    selectVideo1: '',
                    selectVideo2: '',
                    eachWord: '',
                    answer1: '',
                    answer2: ''
                },
                wordTalk: {
                    wordContent: '',
                    answer1: '',
                    answer2: '',
                    answer3: '',
                    answer4: '',
                    answer5: ''
                },
                picTalk: {
                    pic: '',
                    answer1: '',
                    answer2: '',
                    answer3: '',
                    answer4: '',
                    answer5: ''
                },
                soundTalk: {
                    sound: '',
                    answer1: '',
                    answer2: '',
                    answer3: '',
                    answer4: '',
                    answer5: ''
                },
                phone: {
                    speak: '',
                    eachWord: '',
                    answer: '',
                    cancel: ''
                },
                games: {
                    region: ''
                },
                smallVideo: {
                    video: '',
                    answer1: '',
                    answer2: '',
                    answer3: '',
                    answer4: '',
                    answer5: ''
                },
            }
        },
        created () {
            //alert(this.editableTabs2);
        },
        methods : {
            onSubmit () {
                let comment = {
                    actor : this.form.actor,
                    type : this.form.type,
                    title : this.form.title,
                    day : this.form.day,
                    step : this.form.step,
                    status : 'published'
                }
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        if(this.nVideo){
                            let nVideoinfo = comment;
                            nVideoinfo.video_uri = this.normalVideo.video;
                            videoUpdate (nVideoinfo).then(response => {
                                if(response.data.code == 200){
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                this.postForm.status = 'published';
                            }
                                if (!response.data.content) return;
                            this.userLIstOptions = response.data.content.map(v => ({
                                        key: v.name,
                                        value: v.id
                                    }));
                            });
                        }
                        if(this.eVideo){
                            let nVideoinfo = comment;
                            nVideoinfo.video_uri = this.eachVideo.startVideo;
                            nVideoinfo.video_uri1 = this.eachVideo.selectVideo1;
                            nVideoinfo.video_uri2 = this.eachVideo.selectVideo2;
                            nVideoinfo.question = this.eachVideo.eachWord;
                            nVideoinfo.answer1 = this.eachVideo.answer1;
                            nVideoinfo.answer2 = this.eachVideo.answer2;
                            videoInterUpdate (nVideoinfo).then(response => {
                                if(response.data.code == 200){
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                this.postForm.status = 'published';
                            }
                            if (!response.data.content) return;
                            this.userLIstOptions = response.data.content.map(v => ({
                                        key: v.name,
                                        value: v.id
                                    }));
                        });
                        }
                        if(this.wTalk){
                            let nVideoinfo = comment;
                            nVideoinfo.msg = this.wordTalk.wordContent;
                            nVideoinfo.replay1 = this.wordTalk.answer1;
                            nVideoinfo.replay2 = this.wordTalk.answer2;
                            nVideoinfo.replay3 = this.wordTalk.answer3;
                            nVideoinfo.replay4 = this.wordTalk.answer4;
                            nVideoinfo.replay5 = this.wordTalk.answer5;
                            talkUpdate (nVideoinfo).then(response => {
                                if(response.data.code == 200){
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                this.postForm.status = 'published';
                            }
                            if (!response.data.content) return;
                            this.userLIstOptions = response.data.content.map(v => ({
                                        key: v.name,
                                        value: v.id
                                    }));
                        });
                        }
                        if(this.pTalk){
                            let nVideoinfo = comment;
                            nVideoinfo.picture_uri = this.picTalk.pic;
                            nVideoinfo.replay1 = this.picTalk.answer1;
                            nVideoinfo.replay2 = this.picTalk.answer2;
                            nVideoinfo.replay3 = this.picTalk.answer3;
                            nVideoinfo.replay4 = this.picTalk.answer4;
                            nVideoinfo.replay5 = this.picTalk.answer5;
                            pictureUpdate (nVideoinfo).then(response => {
                                if(response.data.code == 200){
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                this.postForm.status = 'published';
                            }
                            if (!response.data.content) return;
                            this.userLIstOptions = response.data.content.map(v => ({
                                        key: v.name,
                                        value: v.id
                                    }));
                        });
                        }
                        if(this.sTalk){
                            let nVideoinfo = comment;
                            nVideoinfo.radio_uri = this.soundTalk.sound;
                            nVideoinfo.replay1 = this.soundTalk.answer1;
                            nVideoinfo.replay2 = this.soundTalk.answer2;
                            nVideoinfo.replay3 = this.soundTalk.answer3;
                            nVideoinfo.replay4 = this.soundTalk.answer4;
                            nVideoinfo.replay5 = this.soundTalk.answer5;
                            radioUpdate (nVideoinfo).then(response => {
                                if(response.data.code == 200){
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                this.postForm.status = 'published';
                            }
                            if (!response.data.content) return;
                            this.userLIstOptions = response.data.content.map(v => ({
                                        key: v.name,
                                        value: v.id
                                    }));
                        });
                        }
                        if(this.tel){
                            let nVideoinfo = comment;
                            nVideoinfo.audio_uri = this.phone.speak;
                            nVideoinfo.question = this.phone.eachWord;
                            nVideoinfo.allow = this.phone.answer;
                            nVideoinfo.deny = this.phone.cancel;
                            telUpdate (nVideoinfo).then(response => {
                                if(response.data.code == 200){
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                this.postForm.status = 'published';
                            }
                            if (!response.data.content) return;
                            this.userLIstOptions = response.data.content.map(v => ({
                                        key: v.name,
                                        value: v.id
                                    }));
                        });
                        }
                        if(this.game){
                            let nVideoinfo = comment;
                            nVideoinfo.game = this.games.region;
                            gameUpdate (nVideoinfo).then(response => {
                                if(response.data.code == 200){
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                this.postForm.status = 'published';
                            }
                            if (!response.data.content) return;
                            this.userLIstOptions = response.data.content.map(v => ({
                                        key: v.name,
                                        value: v.id
                                    }));
                        });
                        }
                        if(this.sVideo){
                            let nVideoinfo = comment;
                            nVideoinfo.tv_uri = this.smallVideo.video;
                            nVideoinfo.replay1 = this.smallVideo.answer1;
                            nVideoinfo.replay2 = this.smallVideo.answer2;
                            nVideoinfo.replay3 = this.smallVideo.answer3;
                            nVideoinfo.replay4 = this.smallVideo.answer4;
                            nVideoinfo.replay5 = this.smallVideo.answer5;
                            tvUpdate (nVideoinfo).then(response => {
                                if(response.data.code == 200){
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                this.postForm.status = 'published';
                            }
                            if (!response.data.content) return;
                            this.userLIstOptions = response.data.content.map(v => ({
                                        key: v.name,
                                        value: v.id
                                    }));
                        });
                        }
                        this.loading = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            selectScenes () {
                if(this.form.select==1){
                    this.nVideo = true;
                } else {
                    this.nVideo = false;
                }
                if(this.form.select==2){
                    this.eVideo = true;
                } else {
                    this.eVideo = false;
                }
                if(this.form.select==4){
                    this.wTalk = true;
                } else {
                    this.wTalk = false;
                }
                if(this.form.select==6){
                    this.pTalk = true;
                } else {
                    this.pTalk = false;
                }
                if(this.form.select==5){
                    this.sTalk = true;
                } else {
                    this.sTalk = false;
                }
                if(this.form.select==3){
                    this.tel = true;
                } else {
                    this.tel = false;
                }
                if(this.form.select==7){
                    this.game = true;
                } else {
                    this.game = false;
                }
                if(this.form.select==8){
                    this.sVideo = true;
                } else {
                    this.sVideo = false;
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

