<template>
    <div class="createPost-container">

        <el-form class="form-container" :model="postForm" ref="postForm" :rules="rules">
            <div class="createPost-main-container">

                <el-form-item label-width="110px" label="主角:" class="postInfo-container-item" prop="actor" style="margin-bottom: 40px;" required>
                    <multiselect v-model="postForm.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                                 deselectLabel="" track-by="key" :internalSearch="true" label="key" style="width:150px;">
                        <span slot='noResult'>无结果</span>
                    </multiselect>
                </el-form-item>

                <el-form-item style="margin-bottom: 40px;" label-width="110px" label="上传类型:" prop="type" required>
                    <template>
                        <span @click="showPictureContent"><el-radio v-model="postForm.type" label="1">图片</el-radio></span>
                        <span @click="showVideoContent"><el-radio v-model="postForm.type" label="2">短视频</el-radio></span>
                        <span @click="showAudioContent"><el-radio v-model="postForm.type" label="3">音频</el-radio></span>
                        <span @click="showCrowdContent"><el-radio v-model="postForm.type" label="4">众筹</el-radio></span>
                    </template>
                    <!--<template>
                        <el-radio-group v-model="radioContent">
                            <el-radio label="0" change="showPictureContent">图片</el-radio>
                            <el-radio label="1" change="showVideoContent">视频</el-radio>
                            <el-radio label="2" change="showAudioContent">音频</el-radio>
                        </el-radio-group>
                    </template>-->
                </el-form-item>

                <div>
                    <el-form-item class="uplo" label-width="110px" prop="pic1">
                        <div v-show="showPicContent" class="pictureStyle" style="margin-bottom: 10px;">
                            <!--<el-form-item class="uplo"  label-width="200px" label="图片:最多9张图片"></el-form-item>-->
                            <Upload v-model="postForm.pic1" :close="closeStatus" v-on:input="picInput1"></Upload>
                            <img v-show="showMon1" src="../../../gifs/money.png" class="icon_style" @click="payIcon1" />
                            <img v-show="showMonPay1" src="../../../gifs/moneypay.png" class="icon_style_pay" @click="payIcon1" />
                            <div class="clear"></div>
                        </div>
                    </el-form-item>
                    <el-form-item class="uplo" label-width="110px" prop="pic2">
                        <div v-show="showPicContent" class="pictureStyle">
                            <Upload v-model="postForm.pic2" :close="closeStatus" v-on:input="picInput2"></Upload>
                            <img v-show="showMon2" src="../../../gifs/money.png" class="icon_style" @click="payIcon2" />
                            <img v-show="showMonPay2" src="../../../gifs/moneypay.png" class="icon_style_pay" @click="payIcon2" />
                            <div class="clear"></div>
                        </div>
                    </el-form-item>
                    <el-form-item class="uplo" label-width="110px" prop="pic3">
                        <div v-show="showPicContent" class="pictureStyle">
                            <Upload v-model="postForm.pic3" :close="closeStatus" v-on:input="picInput3"></Upload>
                            <img v-show="showMon3" src="../../../gifs/money.png" class="icon_style" @click="payIcon3" />
                            <img v-show="showMonPay3" src="../../../gifs/moneypay.png" class="icon_style_pay" @click="payIcon3" />
                            <div class="clear"></div>
                        </div>
                    </el-form-item>
                </div>

                <div>
                    <el-form-item class="uplo" label-width="110px" prop="pic4">
                        <div v-show="showPicContent" class="pictureStyle" style="margin-bottom: 10px;">
                            <Upload v-model="postForm.pic4" :close="closeStatus" v-on:input="picInput4"></Upload>
                            <img v-show="showMon4" src="../../../gifs/money.png" class="icon_style" @click="payIcon4" />
                            <img v-show="showMonPay4" src="../../../gifs/moneypay.png" class="icon_style_pay" @click="payIcon4" />
                            <div class="clear"></div>
                        </div>
                    </el-form-item>
                    <el-form-item class="uplo" label-width="110px" prop="pic5">
                        <div v-show="showPicContent" class="pictureStyle">
                            <Upload v-model="postForm.pic5" :close="closeStatus" v-on:input="picInput5"></Upload>
                            <img v-show="showMon5" src="../../../gifs/money.png" class="icon_style" @click="payIcon5" />
                            <img v-show="showMonPay5" src="../../../gifs/moneypay.png" class="icon_style_pay" @click="payIcon5" />
                            <div class="clear"></div>
                        </div>
                    </el-form-item>
                    <el-form-item class="uplo" label-width="110px" prop="pic6">
                        <div v-show="showPicContent" class="pictureStyle">
                            <Upload v-model="postForm.pic6" :close="closeStatus" v-on:input="picInput6"></Upload>
                            <img v-show="showMon6" src="../../../gifs/money.png" class="icon_style" @click="payIcon6" />
                            <img v-show="showMonPay6" src="../../../gifs/moneypay.png" class="icon_style_pay" @click="payIcon6" />
                            <div class="clear"></div>
                        </div>
                    </el-form-item>
                </div>

                <div>
                    <el-form-item class="uplo" label-width="110px" prop="pic7">
                        <div v-show="showPicContent" class="pictureStyle" style="margin-bottom: 10px;">
                            <Upload v-model="postForm.pic7" :close="closeStatus" v-on:input="picInput7"></Upload>
                            <img v-show="showMon7" src="../../../gifs/money.png" class="icon_style" @click="payIcon7" />
                            <img v-show="showMonPay7" src="../../../gifs/moneypay.png" class="icon_style_pay" @click="payIcon7" />
                            <div class="clear"></div>
                        </div>
                    </el-form-item>
                    <el-form-item class="uplo" label-width="110px" prop="pic8">
                        <div v-show="showPicContent" class="pictureStyle">
                            <Upload v-model="postForm.pic8" :close="closeStatus" v-on:input="picInput8"></Upload>
                            <img v-show="showMon8" src="../../../gifs/money.png" class="icon_style" @click="payIcon8" />
                            <img v-show="showMonPay8" src="../../../gifs/moneypay.png" class="icon_style_pay" @click="payIcon8" />
                            <div class="clear"></div>
                        </div>
                    </el-form-item>
                    <el-form-item class="uplo" label-width="110px" prop="pic9">
                        <div v-show="showPicContent" class="pictureStyle">
                            <Upload v-model="postForm.pic9" :close="closeStatus" v-on:input="picInput9"></Upload>
                            <img v-show="showMon9" src="../../../gifs/money.png" class="icon_style" @click="payIcon9" />
                            <img v-show="showMonPay9" src="../../../gifs/moneypay.png" class="icon_style_pay" @click="payIcon9" />
                            <div class="clear"></div>
                        </div>
                    </el-form-item>
                </div>

                <el-form-item v-show="showPicContent" label="收费设置:" label-width="110px" prop="ispay" style="margin-bottom: 20px" required>
                    <span @click="hidePrice"><el-radio v-model="postForm.ispay" label="1">免费</el-radio></span>
                    <span @click="showPrice"><el-radio v-model="postForm.ispay" label="0">收费</el-radio></span>
                </el-form-item>
                <div v-show="showPicContent" style="display: inline-block;margin-bottom: 20px">
                    <!--<el-form-item v-show="showPicContent" label="收费图片:" label-width="90px" prop="selectPic" style="margin-bottom: 20px" required>
                        &lt;!&ndash;<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="postForm.selectPic" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="actor in actors" :label="actor" :key="actor">{{actor}}</el-checkbox>
                        </el-checkbox-group>&ndash;&gt;
                        <el-checkbox-group v-model="postForm.selectPic">
                            <el-checkbox v-for="pic in selectPics" :label="pic" :key="pic">{{pic}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>-->
                    <el-form-item label="收费价格:" label-width="110px" prop="price" style="margin-bottom: 0px" required>
                        <el-input v-model.number="postForm.price" :disabled="disprice" style="width:150px" placeholder="请输入整数金额"></el-input>
                        <span>金</span>
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

                <el-form-item v-show="showVidContent" label-width="110px" prop="video">
                    <div style="margin-top: -100px">
                        <!--<el-form-item label-width="90px" label="视频:" prop="video">只能上传一个视频</el-form-item>-->
                        <!--<Uploadvideo v-model="postForm.video" :progresses="progressesData"></Uploadvideo>-->
                        <!--<el-select v-model="postForm.video" filterable placeholder="请选择">
                            <el-option v-for="item in videoOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>-->
                        <multiselect v-model="postForm.video" required :options="videoOptions" @search-change="getSource" placeholder="搜索视频" selectLabel="选择"
                                     deselectLabel="" track-by="label" :internalSearch="true" label="label" style="width:180px;display: inline-block;">
                            <span slot='noResult'>无结果</span>
                        </multiselect>
                    </div>
                </el-form-item>
                <!--<el-form-item label-width="110px" label="" class="postInfo-container-item" prop="" style="width:400px;margin-top:-30px">
                    <div v-show="progressesData.progress" style="">
                        <el-progress :percentage="progressesData.percentage" :status="progressesData.progressStatus"></el-progress>
                    </div>
                </el-form-item>-->

                <el-form-item v-show="false" label="视频缩略图:" label-width="110px" prop="vtype" style="margin-bottom: 20px;" required>
                    <span @click="hideThumbnail"><el-radio v-model="postForm.vtype" label="2">自动截取</el-radio></span>
                    <span @click="showThumbnail"><el-radio v-model="postForm.vtype" label="1">主动上传</el-radio></span>
                </el-form-item>

                <div v-show="showThumb" style="display: inline-block;margin-bottom: 20px">
                    <el-form-item v-show="showVidContent" label-width="110px" prop="thumbnail">
                        <div style="margin-top: 10px;width: 320px;height: 180px;border: 1px dashed #d9d9d9;">
                            <UploadVid v-model="postForm.thumbnail" v-on:input="picInputVid"></UploadVid>
                        </div>
                        <span style="font-size:12px;margin-top: -30px;display:inline-block">（注：请上传16:9或9:16，不小于10kb，jpg、png等格式的文件）</span>
                    </el-form-item>
                </div>

                <el-form-item v-show="showVidContent" label="收费设置:" label-width="110px" prop="ispay" style="margin-bottom: 20px" required>
                    <span @click="hidePrice"><el-radio v-model="postForm.ispay" label="1">免费</el-radio></span>
                    <span @click="showPrice"><el-radio v-model="postForm.ispay" label="0">收费</el-radio></span>
                </el-form-item>
                <div v-show="showVidContent" style="display: inline-block;margin-bottom: 20px">
                    <!--<el-form-item v-show="showPicContent" label="收费图片:" label-width="90px" prop="selectPic" style="margin-bottom: 20px" required>
                        &lt;!&ndash;<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="postForm.selectPic" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="actor in actors" :label="actor" :key="actor">{{actor}}</el-checkbox>
                        </el-checkbox-group>&ndash;&gt;
                        <el-checkbox-group v-model="postForm.selectPic">
                            <el-checkbox v-for="pic in selectPics" :label="pic" :key="pic">{{pic}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>-->
                    <el-form-item v-show="showVidContent" label="收费价格:" label-width="110px" prop="price" style="margin-bottom: 0px" required>
                        <el-input v-model.number="postForm.price" :disabled="disprice" style="width:150px" placeholder="请输入整数金额"></el-input>
                        <span>金</span>
                    </el-form-item>
                </div>

                <el-form-item v-show="showAudContent" label-width="110px" prop="audio">
                    <div style="margin-top: -120px">
                        <!--<Uploadaudio v-model="postForm.audio"></Uploadaudio>-->
                        <el-select v-model="postForm.audio" filterable placeholder="请选择">
                            <el-option v-for="item in audioOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>

                <el-form-item v-show="showAudContent" label="音频标题:" label-width="110px" prop="avname" required>
                    <el-input v-model="postForm.avname" style="width:150px" placeholder="最多输入10个字"></el-input>
                </el-form-item>

                <el-form-item v-show="showAudContent" label="音频描述:" label-width="110px" prop="avdesc" required>
                    <el-input v-model="postForm.avdesc" style="width:300px" placeholder="最多输入20个字"></el-input>
                </el-form-item>

                <el-form-item v-show="showAudContent" label="音频图片:" label-width="110px" prop="soundImg">
                    <!--<div class="pictureStyle">
                        <Uploadbak v-model="diaryContent.soundImg"></Uploadbak>
                    </div>-->
                    <div style="margin-top: 0px;width: 180px;height: 180px;border: 1px dashed #d9d9d9;">
                        <Uploadimg v-model="postForm.soundImg" v-on:input="picInputVid"></Uploadimg>
                    </div>
                    <span style="font-size:12px;margin-top: -30px;display:inline-block">（注：请上传16:9，不小于10kb，jpg、png等格式的文件）</span>
                </el-form-item>

                <el-form-item v-show="false" label="收费设置:" label-width="110px" prop="ispay" style="margin-bottom: 20px" required>
                    <span @click="hidePrice"><el-radio v-model="postForm.ispay" label="1">免费</el-radio></span>
                    <span @click="showPrice"><el-radio v-model="postForm.ispay" label="0">收费</el-radio></span>
                </el-form-item>
                <div v-show="showAudContent" style="display: inline-block;margin-bottom: 20px">
                    <!--<el-form-item v-show="showPicContent" label="收费图片:" label-width="90px" prop="selectPic" style="margin-bottom: 20px" required>
                        &lt;!&ndash;<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="postForm.selectPic" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="actor in actors" :label="actor" :key="actor">{{actor}}</el-checkbox>
                        </el-checkbox-group>&ndash;&gt;
                        <el-checkbox-group v-model="postForm.selectPic">
                            <el-checkbox v-for="pic in selectPics" :label="pic" :key="pic">{{pic}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>-->
                    <el-form-item v-show="false" label="收费价格:" label-width="110px" prop="price" style="margin-bottom: 0px" required>
                        <el-input v-model.number="postForm.price" :disabled="disprice" style="width:150px" placeholder="请输入整数金额"></el-input>
                        <span>金</span>
                    </el-form-item>
                </div>

                <el-form-item v-show="showCroContent" label-width="110px" prop="crowd">
                    <!--<div style="display: inline-block;margin-top: -160px">
                        <Uploadimg v-model="diaryContent.crowd"></Uploadimg>
                    </div>-->
                    <div style="margin-top: -180px;width: 320px;height: 180px;border: 1px dashed #d9d9d9;">
                        <UploadimgCro v-model="postForm.crowd" v-on:input="picInputVid"></UploadimgCro>
                    </div>
                    <span style="font-size:12px;margin-top: -30px;display:inline-block">（注：请上传16:9，不小于10kb，jpg、png等格式的文件）</span>
                </el-form-item>

                <el-form-item v-show="showCroContent" label="打赏默认值:" label-width="110px" prop="reward" required>
                    <el-input v-model="postForm.reward" style="width:150px" placeholder="请输入整数金额"></el-input>
                    <span>金</span>
                </el-form-item>

                <el-form-item v-show="showCroContent" label="众筹价格:" label-width="110px" prop="help" required>
                    <el-input v-model="postForm.help" style="width:150px" placeholder="请输入整数金额"></el-input>
                    <span>金</span>
                </el-form-item>

                <el-form-item v-show="showPayDefault" label="打赏默认值:" label-width="110px" prop="reward" required>
                    <el-input v-model="postForm.reward" style="width:150px" placeholder="请输入整数金额"></el-input>
                    <span>金</span>
                </el-form-item>


                <el-form-item v-show="showCroContent" label="众筹默认值:" label-width="110px" prop="crowdfund" required>
                    <el-input v-model="postForm.crowdfund" style="width:150px" placeholder="请输入整数金额"></el-input>
                    <span>金</span>
                </el-form-item>

                <el-form-item style="margin-bottom: 40px;" label-width="110px" label="动态内容:" prop="words" required>
                    <el-input type="textarea" :rows="3" v-model="postForm.words" style="width:400px" placeholder="最多输入200个字" :maxlength="200"></el-input>
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
                <el-form-item label-width="110px" label="上架时间:" prop="configtime"style="margin-bottom: 40px">
                    <div class="block">
                        <!--<span class="demonstration">默认</span>-->
                        <el-date-picker v-model="postForm.configtime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="未设置" :picker-options="pickerOptions1"></el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="动态排序:" label-width="110px" prop="sort" style="margin-bottom: 40px" required>
                    <el-select v-model="postForm.sort" placeholder="请选择">
                        <el-option v-for="item in spaceSortOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span style="font-size:12px">（注：默认排序：按照上架时间逆序排列）</span>
                </el-form-item>
                <el-form-item label-width="110px">
                    <el-button v-show="addBut" type="primary" @click.prevent="addDiary('postForm')" size="large">新增动态</el-button>
                    <el-button v-show="saveBut" type="primary" @click.prevent="addDiary('postForm')" size="large">保存动态</el-button>
                </el-form-item>
            </div>
        </el-form>

    </div>
</template>

<script type="text/ECMAScript-6">
    import Tinymce from 'components/Tinymce'
    //import Uploadvideo from 'components/Upload/video'
    //import Uploadimg from 'components/Upload/singleImage3'
    import UploadVid from 'components/Upload/pictureFm';
    import Uploadimg from 'components/Upload/pictureSpaceAud';
    import UploadimgCro from 'components/Upload/pictureSpaceCro';
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
    import { adddiary } from 'api/diary';
    import { updatediary } from 'api/diary';
    import { diaryinfo } from 'api/diary';
    import { actorList } from 'api/actor';
    import { reslist } from 'api/resource';

    export default {
        name: 'articleDetail',
        components: { Tinymce, MDinput, UploadVid, Uploadimg, UploadimgCro, Upload, Uploadvideo, Uploadaudio, Uploadbak },
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
                watcher: false,
                tempVideo: true,
                disprice: false,
                closeStatus: false,
                ispay1: '1',
                ispay2: '1',
                ispay3: '1',
                ispay4: '1',
                ispay5: '1',
                ispay6: '1',
                ispay7: '1',
                ispay8: '1',
                ispay9: '1',
                width: '',
                height: '',
                tempObj1: {},
                tempObj2: {},
                tempObj3: {},
                tempObj4: {},
                tempObj5: {},
                tempObj6: {},
                tempObj7: {},
                tempObj8: {},
                tempObj9: {},
                tempPic: [],
                videoOptions: [],
                audioOptions: [],
                pictureId1: '',
                pictureId2: '',
                pictureId3: '',
                pictureId4: '',
                pictureId5: '',
                pictureId6: '',
                pictureId7: '',
                pictureId8: '',
                pictureId9: '',
                postForm: {
                    actor: '',
                    words: '',
                    type: '1',
                    video: '', // 视频
                    vtype: '1',
                    thumbnail: '',
                    pic1: '', // 图片
                    pic2: '', // 图片
                    pic3: '', // 图片
                    pic4: '', // 图片
                    pic5: '', // 图片
                    pic6: '', // 图片
                    pic7: '', // 图片
                    pic8: '', // 图片
                    pic9: '', // 图片
                    ispay: '1',
                    selectPic: [],
                    price: 20,
                    configtime: '',
                    audio: '',
                    avname: '',
                    avdesc: '',
                    soundImg: '',
                    crowd: '',
                    crowdfund: '20',
                    help: '20',
                    reward: '20',
                    sort: '0'
                    //status: 'draft'
                },
                pickerOptions1: {
                    /*disabledDate(time) {
                        return time.getTime() + 86400000 < Date.now();
                    },*/
                },
                selectPics: [ "第一张","第二张","第三张","第四张","第五张","第六张","第七张","第八张","第九张" ],
                progressesData: {
                    percentage: 25,
                    progress: false
                },
                diaryContentEdit: {},
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
                    //crowdfunding: [{ validator: checkNum, trigger: 'blur' }],
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
                showThumb: true,
                addBut: true,
                saveBut: false,
                showPayDefault: true,
                showMon1: false,
                showMonPay1: false,
                showMon2: false,
                showMonPay2: false,
                showMon3: false,
                showMonPay3: false,
                showMon4: false,
                showMonPay4: false,
                showMon5: false,
                showMonPay5: false,
                showMon6: false,
                showMonPay6: false,
                showMon7: false,
                showMonPay7: false,
                showMon8: false,
                showMonPay8: false,
                showMon9: false,
                showMonPay9: false,
            }
        },
        computed: {
            isEdit() {
                return this.$route.meta.isEdit // 根据meta判断
                // return this.$route.path.indexOf('edit') !== -1 // 根据路由判断
            }
        },
        created() {
            this.getVideoResource();
            this.getAudioResource();
            let Query = {};
            this.getRemoteUserList(Query);
            if(this.$route.params.id && this.$route.params.id != ':id'){
                /*let listQuery={};
                listQuery.id = this.$route.params.id;
                listQuery.pos = '1';
                //listQuery.actorid = this.$route.params.actorid;
                this.$nextTick(function () {
                    this.fetchData(listQuery);
                })*/
                this.saveBut = true;
                this.addBut = false;
                this.showButton = false;
                this.showContentButton = true;
                this.disableTitle = true;
                this.closeStatus = true;
            }
            if(this.$route.params.id && this.$route.params.id == ':id'){
                this.showButton = true;
                this.showDiary = false;
                if (this.postForm.ispay == 1) {
                    this.disprice = true;
                }
            }
            /*id = $route.params.num;
             if(id == "num:"){
             id = "";
             }*/

            //this.postForm.actor={key:"1", value:this.$route.params.num};
            //this.postForm.actor.key=this.$route.params.num;
        },
        /*mounted(){
            if(this.$route.params.id && this.$route.params.id != ':id') {
                let listQuery={};
                listQuery.id = this.$route.params.id;
                listQuery.pos = '1';
                this.$nextTick(function () {
                    this.fetchData(listQuery);
                })
            }
        },*/
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
            getAudioResource () {
                let typeinfo = {};
                typeinfo.type = '3';
                reslist (typeinfo).then(response => {
                    if(response.data.code==200){
                        for (let i=0; i<response.data.content.length; i++) {
                            let temp = {};
                            temp.value = response.data.content[i].id;
                            temp.label = response.data.content[i].name;
                            this.audioOptions.push(temp);
                        }
                        console.log(this.audioOptions)
                        /*this.$message({
                         message: '新增成功',
                         type: 'success'
                         });*/
                    }
                });
            },
            getSource() {
                //this.$store.commit('getVideoResource','');
                console.log(this.videoOptions)
            },
            fetchData(listQuery) {
                diaryinfo(listQuery).then(response => {
                    //this.postForm.actor.value = response.data.content.actorid;
                    //this.postForm.actor = { key:response.data.content[0].name, value:response.data.content[0].actorid };
                    this.postForm = response.data.content;
                    this.postForm.crowdfund = response.data.content.crowdfund;
                    this.postForm.reward = response.data.content.reward;
                    this.postForm.words = response.data.content.words;
                    this.postForm.sort = response.data.content.sort;
                    for ( let j=0; j<this.userLIstOptions.length; j++) {
                        if (response.data.content.actorid == this.userLIstOptions[j].value) {
                            this.postForm.actor = this.userLIstOptions[j];
                        }
                    }
                    this.postForm.price = parseInt(response.data.content.price);
                    if (response.data.content.price == 0) {
                        this.postForm.price = 5;
                    }
                    if (response.data.content.ispay == '1') {
                        this.disprice = true;
                    }
                    if (response.data.content.type == 1) {
                        this.postForm.type = response.data.content.type;
                        if(!this.showPicContent){
                            this.showPicContent=true;
                            this.showVidContent=false;
                            this.showAudContent = false;
                            this.showCroContent = false;
                            this.showPayDefault = true;
                        } else {
                            this.showVidContent=false;
                            this.showAudContent = false;
                            this.showCroContent = false;
                        }
                        this.tempPic = response.data.content.picture;
                        if (response.data.content.picture[0]) {
                            this.pictureId1 = response.data.content.picture[0].id;
                            this.postForm.pic1 = response.data.content.picture[0].url;
                            if (response.data.content.picture[0].ispay == '1') {
                                this.showMon1 = true;
                                this.showMonPay1 = false;
                            } else {
                                this.showMon1 = false;
                                this.showMonPay1 = true;
                            }
                        }
                        if (response.data.content.picture[1]) {
                            this.postForm.pic2 = response.data.content.picture[1].url;
                            if (response.data.content.picture[1].ispay == '1') {
                                this.showMon2 = true;
                                this.showMonPay2 = false;
                            } else {
                                this.showMon2 = false;
                                this.showMonPay2 = true;
                            }
                        }
                        if (response.data.content.picture[2]) {
                            this.postForm.pic3 = response.data.content.picture[2].url;
                            if (response.data.content.picture[2].ispay == '1') {
                                this.showMon3 = true;
                                this.showMonPay3 = false;
                            } else {
                                this.showMon3 = false;
                                this.showMonPay3 = true;
                            }
                        }
                        if (response.data.content.picture[3]) {
                            this.postForm.pic4 = response.data.content.picture[3].url;
                            if (response.data.content.picture[3].ispay == '1') {
                                this.showMon4 = true;
                                this.showMonPay4 = false;
                            } else {
                                this.showMon4 = false;
                                this.showMonPay4 = true;
                            }
                        }
                        if (response.data.content.picture[4]) {
                            this.postForm.pic5 = response.data.content.picture[4].url;
                            if (response.data.content.picture[4].ispay == '1') {
                                this.showMon5 = true;
                                this.showMonPay5 = false;
                            } else {
                                this.showMon5 = false;
                                this.showMonPay5 = true;
                            }
                        }
                        if (response.data.content.picture[5]) {
                            this.postForm.pic6 = response.data.content.picture[5].url;
                            if (response.data.content.picture[5].ispay == '1') {
                                this.showMon6 = true;
                                this.showMonPay6 = false;
                            } else {
                                this.showMon6 = false;
                                this.showMonPay6 = true;
                            }
                        }
                        if (response.data.content.picture[6]) {
                            this.postForm.pic7 = response.data.content.picture[6].url;
                            if (response.data.content.picture[6].ispay == '1') {
                                this.showMon7 = true;
                                this.showMonPay7 = false;
                            } else {
                                this.showMon7 = false;
                                this.showMonPay7 = true;
                            }
                        }
                        if (response.data.content.picture[7]) {
                            this.postForm.pic8 = response.data.content.picture[7].url;
                            if (response.data.content.picture[7].ispay == '1') {
                                this.showMon8 = true;
                                this.showMonPay8 = false;
                            } else {
                                this.showMon8 = false;
                                this.showMonPay8 = true;
                            }
                        }
                        if (response.data.content.picture[8]) {
                            this.postForm.pic9 = response.data.content.picture[8].url;
                            if (response.data.content.picture[8].ispay == '1') {
                                this.showMon9 = true;
                                this.showMonPay9 = false;
                            } else {
                                this.showMon9 = false;
                                this.showMonPay9 = true;
                            }
                        }
                    }
                    if (response.data.content.type == 2) {
                        this.postForm.type = response.data.content.type;
                        //this.postForm.video = response.data.content.video;
                        for (let i=0; i<this.videoOptions.length; i++) {
                            if(response.data.content.introvideo == this.videoOptions[i].value) {
                                this.postForm.introvideo = this.videoOptions[i];
                            }
                        }
                        this.postForm.vtype = response.data.content.vtype;
                        if (response.data.content.vtype == 1) {
                            this.postForm.thumbnail = response.data.content.thumbnail;
                            this.width = response.data.content.width;
                            this.height = response.data.content.height;
                        }
                        if(!this.showVidContent){
                            this.showVidContent=true;
                            this.showPicContent=false;
                            this.showAudContent = false;
                            this.showCroContent = false;
                            this.showPayDefault = true;
                        } else {
                            this.showPicContent=false;
                            this.showAudContent = false;
                            this.showCroContent = false;
                        }
                    }
                    if (response.data.content.type == 3) {
                        this.postForm.type = response.data.content.type;
                        this.postForm.audio = response.data.content.audio;
                        this.postForm.avname = response.data.content.avname;
                        this.postForm.avdesc = response.data.content.avdesc;
                        this.postForm.soundImg = response.data.content.thumbnail;
                        this.width = response.data.content.width;
                        this.height = response.data.content.height;
                        if(!this.showAudContent){
                            this.showAudContent = true;
                            this.showVidContent=false;
                            this.showPicContent=false;
                            this.showCroContent = false;
                            this.showPayDefault = true;
                        } else {
                            this.showPicContent=false;
                            this.showVidContent=false;
                            this.showCroContent = false;
                        }
                    }
                    if (response.data.content.type == 4) {
                        this.postForm.type = response.data.content.type;
                        this.postForm.help = response.data.content.help;
                        this.postForm.crowd = response.data.content.thumbnail;
                        this.width = response.data.content.width;
                        this.height = response.data.content.height;
                        if(!this.showCroContent){
                            this.showCroContent = true;
                            this.showAudContent = false;
                            this.showVidContent=false;
                            this.showPicContent=false;
                            this.showPayDefault = false;
                        } else {
                            this.showPicContent=false;
                            this.showVidContent=false;
                            this.showAudContent = false;
                        }
                    }
                    if (this.postForm.configtime == "0000-00-00 00:00:00") {
                        this.postForm.configtime = '';
                    }
                }).catch(err => {
                    this.fetchSuccess = false;
                    console.log(err);
                });
            },
            addDiary (formName) {
                /*this.$refs.postForm.validate(valid => {
                    if (valid) {*/
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
                        let diaryinfo={
                            //actorid: parseInt(this.postForm.actorid),
                            pos: '1',
                            actorid: this.postForm.actor.value,
                            reward: this.postForm.reward,
                            words: this.postForm.words,
                            configtime: dateString,
                            sort: this.postForm.sort
                        }
                        //diaryinfo = this.postForm;
                        if (this.postForm.type == 1) {
                            let temp = [];
                            if (this.postForm.pic1) {
                                temp.push(this.tempObj1);
                            }
                            if (this.postForm.pic2) {
                                temp.push(this.tempObj2);
                            }
                            if (this.postForm.pic3) {
                                //temp.push(this.postForm.pic3);
                                temp.push(this.tempObj3);
                            }
                            if (this.postForm.pic4) {
                                //temp.push(this.postForm.pic4);
                                temp.push(this.tempObj4);
                            }
                            if (this.postForm.pic5) {
                                //temp.push(this.postForm.pic5);
                                temp.push(this.tempObj5);
                            }
                            if (this.postForm.pic6) {
                                //temp.push(this.postForm.pic6);
                                temp.push(this.tempObj6);
                            }
                            if (this.postForm.pic7) {
                                //temp.push(this.postForm.pic7);
                                temp.push(this.tempObj7);
                            }
                            if (this.postForm.pic8) {
                                //temp.push(this.postForm.pic8);
                                temp.push(this.tempObj8);
                            }
                            if (this.postForm.pic9) {
                                //temp.push(this.postForm.pic9);
                                temp.push(this.tempObj9);
                            }
                            diaryinfo.type = this.postForm.type;
                            diaryinfo.picture = temp;
                            //diaryinfo.picture = this.tempPic;
                            diaryinfo.ispay = this.postForm.ispay;
                            if (this.postForm.ispay == 0) {
                                diaryinfo.price = this.postForm.price.toString();
                            }
                        } else if (this.postForm.type == 2) {
                            diaryinfo.type = this.postForm.type;
                            diaryinfo.video = this.postForm.video.value;
                            diaryinfo.vtype = this.postForm.vtype;
                            diaryinfo.ispay = this.postForm.ispay;
                            if (this.postForm.ispay == 0) {
                                diaryinfo.price = this.postForm.price.toString();
                            }
                            if (this.postForm.vtype == 1) {
                                diaryinfo.thumbnail = this.postForm.thumbnail;
                                diaryinfo.width = this.width;
                                diaryinfo.height = this.height;
                            }
                        } else if (this.postForm.type == 3) {
                            diaryinfo.type = this.postForm.type;
                            diaryinfo.audio = this.postForm.audio;
                            diaryinfo.avname = this.postForm.avname;
                            diaryinfo.avdesc = this.postForm.avdesc;
                            diaryinfo.thumbnail = this.postForm.soundImg;
                            diaryinfo.ispay = this.postForm.ispay;
                            if (this.postForm.ispay == 0) {
                                diaryinfo.price = this.postForm.price.toString();
                            }
                            diaryinfo.width = this.width;
                            diaryinfo.height = this.height;
                        } else if (this.postForm.type == 4) {
                            diaryinfo.type = this.postForm.type;
                            diaryinfo.help = this.postForm.help;
                            diaryinfo.thumbnail = this.postForm.crowd;
                            diaryinfo.crowdfund =  this.postForm.crowdfund;
                            diaryinfo.width = this.width;
                            diaryinfo.height = this.height;
                        } else {
                            this.$message({
                                message: '请选择类型',
                                type: 'error'
                            });
                        }
                        this.loading = true;
                        if (this.$route.params.id && this.$route.params.id == ':id') {
                            adddiary (diaryinfo).then(response => {
                                if(response.data.code==200){
                                    this.$message({
                                        message: '新增成功',
                                        type: 'success'
                                    });
                                    this.$refs[formName].resetFields();
                                    this.postForm.type = diaryinfo.type;
                                    this.showMon1 = true;
                                    this.showMonPay1 = false;
                                    this.showMon2 = true;
                                    this.showMonPay2 = false;
                                    this.showMon3 = true;
                                    this.showMonPay3 = false;
                                    this.showMon4 = true;
                                    this.showMonPay4 = false;
                                    this.showMon5 = true;
                                    this.showMonPay5 = false;
                                    this.showMon6 = true;
                                    this.showMonPay6 = false;
                                    this.showMon7 = true;
                                    this.showMonPay7 = false;
                                    this.showMon8 = true;
                                    this.showMonPay8 = false;
                                    this.showMon9 = true;
                                    this.showMonPay9 = false;
                                }
                            });
                        } else {
                            diaryinfo.id = this.$route.params.id;
                            diaryinfo.words = this.postForm.words.replace(/(\s*$)/g, "");
                            if (this.postForm.type == 1) {
                                let temp = [];
                                if (this.tempPic[0]) {
                                    this.tempPic[0].ispay = this.ispay1;
                                }
                                if (this.tempPic[1]) {
                                    this.tempPic[1].ispay = this.ispay2;
                                }
                                if (this.tempPic[2]) {
                                    this.tempPic[2].ispay = this.ispay3;
                                }
                                if (this.tempPic[3]) {
                                    this.tempPic[3].ispay = this.ispay4;
                                }
                                if (this.tempPic[4]) {
                                    this.tempPic[4].ispay = this.ispay5;
                                }
                                if (this.tempPic[5]) {
                                    this.tempPic[5].ispay = this.ispay6;
                                }
                                if (this.tempPic[6]) {
                                    this.tempPic[6].ispay = this.ispay7;
                                }
                                if (this.tempPic[7]) {
                                    this.tempPic[7].ispay = this.ispay8;
                                }
                                if (this.tempPic[8]) {
                                    this.tempPic[8].ispay = this.ispay9;
                                }
                                if (this.postForm.pic1 && this.tempObj1.url) {
                                    temp.push(this.tempObj1);
                                }
                                if (this.postForm.pic2 && this.tempObj2.url) {
                                    temp.push(this.tempObj2);
                                }
                                if (this.postForm.pic3 && this.tempObj3.url) {
                                    //temp.push(this.postForm.pic3);
                                    temp.push(this.tempObj3);
                                }
                                if (this.postForm.pic4 && this.tempObj4.url) {
                                    //temp.push(this.postForm.pic4);
                                    temp.push(this.tempObj4);
                                }
                                if (this.postForm.pic5 && this.tempObj5.url) {
                                    //temp.push(this.postForm.pic5);
                                    temp.push(this.tempObj5);
                                }
                                if (this.postForm.pic6 && this.tempObj6.url) {
                                    //temp.push(this.postForm.pic6);
                                    temp.push(this.tempObj6);
                                }
                                if (this.postForm.pic7 && this.tempObj7.url) {
                                    //temp.push(this.postForm.pic7);
                                    temp.push(this.tempObj7);
                                }
                                if (this.postForm.pic8 && this.tempObj8.url) {
                                    //temp.push(this.postForm.pic8);
                                    temp.push(this.tempObj8);
                                }
                                if (this.postForm.pic9 && this.tempObj9.url) {
                                    //temp.push(this.postForm.pic9);
                                    temp.push(this.tempObj9);
                                }
                                diaryinfo.picture = this.tempPic.concat(temp);
                            } else if (this.postForm.type == 2) {
                                if (this.postForm.vtype == 1) {
                                    diaryinfo.width = this.width;
                                    diaryinfo.height = this.height;
                                }
                            } else if (this.postForm.type == 3) {
                                diaryinfo.width = this.width;
                                diaryinfo.height = this.height;
                            } else if (this.postForm.type == 4) {
                                diaryinfo.width = this.width;
                                diaryinfo.height = this.height;
                            } else {
                                this.$message({
                                    message: '请选择类型',
                                    type: 'error'
                                });
                            }
                            updatediary (diaryinfo).then(response => {
                                if(response.data.code==200){
                                    this.$message({
                                        message: '保存成功',
                                        type: 'success'
                                    });
                                    this.$refs[formName].resetFields();
                                    this.postForm.type = diaryinfo.type;
                                    this.showMon1 = true;
                                    this.showMonPay1 = false;
                                    this.showMon2 = true;
                                    this.showMonPay2 = false;
                                    this.showMon3 = true;
                                    this.showMonPay3 = false;
                                    this.showMon4 = true;
                                    this.showMonPay4 = false;
                                    this.showMon5 = true;
                                    this.showMonPay5 = false;
                                    this.showMon6 = true;
                                    this.showMonPay6 = false;
                                    this.showMon7 = true;
                                    this.showMonPay7 = false;
                                    this.showMon8 = true;
                                    this.showMonPay8 = false;
                                    this.showMon9 = true;
                                    this.showMonPay9 = false;
                                }
                            });
                        }
                        this.postForm.status = 'published';
                        this.loading = false;
                    /*} else {
                        console.log('error submit!!');
                        return false;
                    }
                });*/
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
                    this.showPayDefault = true;
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
                    this.showPayDefault = true;
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
                    this.showPayDefault = true;
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
                    this.showPayDefault = false;
                } else {
                    this.showPicContent=false;
                    this.showVidContent=false;
                    this.showAudContent = false;
                }
            },
            showPrice () {
                this.showPri = true;
                this.disprice = false;
            },
            hidePrice () {
                this.showPri = false;
                this.disprice = true;
                this.showMonPay4 = false;
            },
            showThumbnail () {
                this.showThumb = true;
            },
            hideThumbnail () {
                this.showThumb = false;
            },
            succ () {
                this.$notify({
                    title: '成功',
                    message: '新增日记成功',
                    type: 'success'
                });
            },
            picInput (url,data) {
                if (data) {
                    this.watcher = data.url;
                    if (this.$route.params.id && this.$route.params.id != ':id') {
                        this.postForm.words = this.postForm.words + ' ';
                    }
                }
            },
            picInputVid (url,data) {
                if (data) {
                    //this.tempObjVid.url = data.urlinfo[0].url;
                    this.width = data.urlinfo[0].width.toString();
                    this.height = data.urlinfo[0].height.toString();
                    if (this.$route.params.id && this.$route.params.id != ':id') {
                        this.postForm.words = this.postForm.words + ' ';
                    }
                    //this.tempPic.push(this.tempObj);
                    //this.watcher = data.url;
                }
            },
            picInput1 (url,data) {
                //this.closeStatus = true;
                //alert(url)
                /*if (!this.pictureId1) {
                    if (url) {
                        this.tempObj1.url = data.urlinfo[0].url;
                        this.tempObj1.width = data.urlinfo[0].width.toString();
                        this.tempObj1.height = data.urlinfo[0].height.toString();
                        this.tempObj1.ispay = '1';
                        if (this.$route.params.id && this.$route.params.id != ':id') {
                            this.postForm.words = this.postForm.words + ' ';
                        }
                        //this.tempPic.push(this.tempObj);
                        //this.watcher = data.url;
                    } else {
                        this.postForm.words = this.postForm.words + ' ';
                        this.tempPic.splice(0,1);
                    }
                } else {
                    this.tempObj1 = {};
                    this.tempPic.splice(0,1);
                    if (url) {
                        this.tempObj1.url = data.urlinfo[0].url;
                        this.tempObj1.width = data.urlinfo[0].width.toString();
                        this.tempObj1.height = data.urlinfo[0].height.toString();
                        this.tempObj1.ispay = '1';
                        if (this.$route.params.id && this.$route.params.id != ':id') {
                            this.postForm.words = this.postForm.words + ' ';
                        }
                        //this.tempPic.push(this.tempObj);
                        //this.watcher = data.url;
                    } else {
                        this.postForm.words = this.postForm.words + ' ';
                        this.tempPic.splice(0,1);
                    }
                }*/
                this.tempPic.splice(0,1);
                if (url) {
                    this.tempObj1.url = data.urlinfo[0].url;
                    this.tempObj1.width = data.urlinfo[0].width.toString();
                    this.tempObj1.height = data.urlinfo[0].height.toString();
                    this.tempObj1.ispay = '1';
                    if (this.$route.params.id && this.$route.params.id != ':id') {
                        this.postForm.words = this.postForm.words + ' ';
                    }
                    this.showMon1 = true;
                    //this.tempPic.push(this.tempObj);
                    //this.watcher = data.url;
                } else {
                    this.postForm.words = this.postForm.words + ' ';
                    this.tempPic.splice(0,1);
                    this.showMon1 = false;
                }
            },
            picInput2 (url,data) {
                this.tempPic.splice(0,1);
                if (data) {
                    this.tempObj2.url = data.urlinfo[0].url;
                    this.tempObj2.width = data.urlinfo[0].width.toString();
                    this.tempObj2.height = data.urlinfo[0].height.toString();
                    this.tempObj2.ispay = '1';
                    if (this.$route.params.id && this.$route.params.id != ':id') {
                        this.postForm.words = this.postForm.words + ' ';
                    }
                    //this.tempPic.push(this.tempObj);
                    //this.watcher = data.url;
                    this.showMon2 = true;
                } else {
                    this.postForm.words = this.postForm.words + ' ';
                    if (this.tempPic[1]) {
                        this.tempPic.splice(1,1);
                    }
                    this.showMon2 = false;
                }
            },
            picInput3 (url,data) {
                this.tempPic.splice(0,1);
                if (data) {
                    this.tempObj3.url = data.urlinfo[0].url;
                    this.tempObj3.width = data.urlinfo[0].width.toString();
                    this.tempObj3.height = data.urlinfo[0].height.toString();
                    this.tempObj3.ispay = '1';
                    if (this.$route.params.id && this.$route.params.id != ':id') {
                        this.postForm.words = this.postForm.words + ' ';
                    }
                    //this.tempPic.push(this.tempObj);
                    //this.watcher = data.url;
                    this.showMon3 = true;
                } else {
                    this.postForm.words = this.postForm.words + ' ';
                    if (this.tempPic[2]) {
                        this.tempPic.splice(2,1);
                    }
                    this.showMon3 = false;
                }
            },
            picInput4 (url,data) {
                this.tempPic.splice(0,1);
                if (data) {
                    this.tempObj4.url = data.urlinfo[0].url;
                    this.tempObj4.width = data.urlinfo[0].width.toString();
                    this.tempObj4.height = data.urlinfo[0].height.toString();
                    this.tempObj4.ispay = '1';
                    if (this.$route.params.id && this.$route.params.id != ':id') {
                        this.postForm.words = this.postForm.words + ' ';
                    }
                    //this.tempPic.push(this.tempObj);
                    //this.watcher = data.url;
                    this.showMon4 = true;
                } else {
                    this.postForm.words = this.postForm.words + ' ';
                    if (this.tempPic[3]) {
                        this.tempPic.splice(3,1);
                    }
                    this.showMon4 = false;
                }
            },
            picInput5 (url,data) {
                this.tempPic.splice(0,1);
                if (data) {
                    this.tempObj5.url = data.urlinfo[0].url;
                    this.tempObj5.width = data.urlinfo[0].width.toString();
                    this.tempObj5.height = data.urlinfo[0].height.toString();
                    this.tempObj5.ispay = '1';
                    if (this.$route.params.id && this.$route.params.id != ':id') {
                        this.postForm.words = this.postForm.words + ' ';
                    }
                    //this.tempPic.push(this.tempObj);
                    //this.watcher = data.url;
                    this.showMon5 = true;
                } else {
                    this.postForm.words = this.postForm.words + ' ';
                    if (this.tempPic[4]) {
                        this.tempPic.splice(4,1);
                    }
                    this.showMon5 = false;
                }
            },
            picInput6 (url,data) {
                this.tempPic.splice(0,1);
                if (data) {
                    this.tempObj6.url = data.urlinfo[0].url;
                    this.tempObj6.width = data.urlinfo[0].width.toString();
                    this.tempObj6.height = data.urlinfo[0].height.toString();
                    this.tempObj6.ispay = '1';
                    if (this.$route.params.id && this.$route.params.id != ':id') {
                        this.postForm.words = this.postForm.words + ' ';
                    }
                    //this.tempPic.push(this.tempObj);
                    //this.watcher = data.url;
                    this.showMon6 = true;
                } else {
                    this.postForm.words = this.postForm.words + ' ';
                    if (this.tempPic[5]) {
                        this.tempPic.splice(5,1);
                    }
                    this.showMon6 = false;
                }
            },
            picInput7 (url,data) {
                this.tempPic.splice(0,1);
                if (data) {
                    this.tempObj7.url = data.urlinfo[0].url;
                    this.tempObj7.width = data.urlinfo[0].width.toString();
                    this.tempObj7.height = data.urlinfo[0].height.toString();
                    this.tempObj7.ispay = '1';
                    if (this.$route.params.id && this.$route.params.id != ':id') {
                        this.postForm.words = this.postForm.words + ' ';
                    }
                    //this.tempPic.push(this.tempObj);
                    //this.watcher = data.url;
                    this.showMon7 = true;
                } else {
                    this.postForm.words = this.postForm.words + ' ';
                    if (this.tempPic[6]) {
                        this.tempPic.splice(6,1);
                    }
                    this.showMon7 = false;
                }
            },
            picInput8 (url,data) {
                this.tempPic.splice(0,1);
                if (data) {
                    this.tempObj8.url = data.urlinfo[0].url;
                    this.tempObj8.width = data.urlinfo[0].width.toString();
                    this.tempObj8.height = data.urlinfo[0].height.toString();
                    this.tempObj8.ispay = '1';
                    if (this.$route.params.id && this.$route.params.id != ':id') {
                        this.postForm.words = this.postForm.words + ' ';
                    }
                    //this.tempPic.push(this.tempObj);
                    //this.watcher = data.url;
                    this.showMon8 = true;
                } else {
                    this.postForm.words = this.postForm.words + ' ';
                    if (this.tempPic[7]) {
                        this.tempPic.splice(7,1);
                    }
                    this.showMon8 = false;
                }
            },
            picInput9 (url,data) {
                this.tempPic.splice(0,1);
                if (data) {
                    this.tempObj9.url = data.urlinfo[0].url;
                    this.tempObj9.width = data.urlinfo[0].width.toString();
                    this.tempObj9.height = data.urlinfo[0].height.toString();
                    this.tempObj9.ispay = '1';
                    if (this.$route.params.id && this.$route.params.id != ':id') {
                        this.postForm.words = this.postForm.words + ' ';
                    }
                    //this.tempPic.push(this.tempObj);
                    //this.watcher = data.url;
                    this.showMon9 = true;
                } else {
                    this.postForm.words = this.postForm.words + ' ';
                    if (this.tempPic[8]) {
                        this.tempPic.splice(8,1);
                    }
                    this.showMon9 = false;
                }
            },
            payIcon1 () {
                if (this.showMon1) {
                    this.showMon1 = false;
                    this.showMonPay1 = true;
                } else {
                    this.showMon1 = true;
                    this.showMonPay1 = false;
                }
                if (this.showMonPay1) {
                    this.ispay1 = '0';
                    this.tempObj1.ispay = this.ispay1;
                } else {
                    this.ispay1 = '1';
                    this.tempObj1.ispay = this.ispay1;
                }
            },
            payIcon2 () {
                if (this.showMon2) {
                    this.showMon2 = false;
                    this.showMonPay2 = true;
                } else {
                    this.showMon2 = true;
                    this.showMonPay2 = false;
                }
                if (this.showMonPay2) {
                    this.ispay2 = '0';
                    this.tempObj2.ispay = this.ispay2;
                } else {
                    this.ispay2 = '1';
                    this.tempObj2.ispay = this.ispay2;
                }
            },
            payIcon3 () {
                if (this.showMon3) {
                    this.showMon3 = false;
                    this.showMonPay3 = true;
                } else {
                    this.showMon3 = true;
                    this.showMonPay3 = false;
                }
                if (this.showMonPay3) {
                    this.ispay3 = '0';
                    this.tempObj3.ispay = this.ispay3;
                } else {
                    this.ispay3 = '1';
                    this.tempObj3.ispay = this.ispay3;
                }
            },
            payIcon4 () {
                if (this.showMon4) {
                    this.showMon4 = false;
                    this.showMonPay4 = true;
                } else {
                    this.showMon4 = true;
                    this.showMonPay4 = false;
                }
                if (this.showMonPay4) {
                    this.ispay4 = '0';
                    this.tempObj4.ispay = this.ispay4;
                } else {
                    this.ispay4 = '1';
                    this.tempObj4.ispay = this.ispay4;
                }
            },
            payIcon5 () {
                if (this.showMon5) {
                    this.showMon5 = false;
                    this.showMonPay5 = true;
                } else {
                    this.showMon5 = true;
                    this.showMonPay5 = false;
                }
                if (this.showMonPay5) {
                    this.ispay5 = '0';
                    this.tempObj5.ispay = this.ispay5;
                } else {
                    this.ispay5 = '1';
                    this.tempObj5.ispay = this.ispay5;
                }
            },
            payIcon6 () {
                if (this.showMon6) {
                    this.showMon6 = false;
                    this.showMonPay6 = true;
                } else {
                    this.showMon6 = true;
                    this.showMonPay6 = false;
                }
                if (this.showMonPay6) {
                    this.ispay6 = '0';
                    this.tempObj6.ispay = this.ispay6;
                } else {
                    this.ispay6 = '1';
                    this.tempObj6.ispay = this.ispay6;
                }
            },
            payIcon7 () {
                if (this.showMon7) {
                    this.showMon7 = false;
                    this.showMonPay7 = true;
                } else {
                    this.showMon7 = true;
                    this.showMonPay7 = false;
                }
                if (this.showMonPay7) {
                    this.ispay7 = '0';
                    this.tempObj7.ispay = this.ispay7;
                } else {
                    this.ispay7 = '1';
                    this.tempObj7.ispay = this.ispay7;
                }
            },
            payIcon8 () {
                if (this.showMon8) {
                    this.showMon8 = false;
                    this.showMonPay8 = true;
                } else {
                    this.showMon8 = true;
                    this.showMonPay8 = false;
                }
                if (this.showMonPay8) {
                    this.ispay8 = '0';
                    this.tempObj8.ispay = this.ispay8;
                } else {
                    this.ispay8 = '1';
                    this.tempObj8.ispay = this.ispay8;
                }
            },
            payIcon9 () {
                if (this.showMon9) {
                    this.showMon9 = false;
                    this.showMonPay9 = true;
                } else {
                    this.showMon9 = true;
                    this.showMonPay9 = false;
                }
                if (this.showMonPay9) {
                    this.ispay9 = '0';
                    this.tempObj9.ispay = this.ispay9;
                } else {
                    this.ispay9 = '1';
                    this.tempObj9.ispay = this.ispay9;
                }
            },
            getRemoteUserList(query) {
                console.log("getRemoteUserList")
                actorList(query).then(response => {
                    console.log("getRemoteUserList")
                    if (!response.data.content) return;
                    console.log(response)
                    this.userLIstOptions = response.data.content.map(v => ({
                        key: v.name,
                        value: v.id
                    }));
                    //解决主角在详情页显示不出来
                    if(this.$route.params.id && this.$route.params.id != ':id'){
                        let listQuery={};
                        listQuery.id = this.$route.params.id;
                        listQuery.pos = '1';
                        this.fetchData(listQuery);
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
    .uplo {
        display: inline-block;
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
    .el-time-spinner .el-time-spinner__item {
        line-height: 20px;
    }
    .pictureStyle {
        display: inline-block;
        width: 180px;
        height: 180px;
        border: 1px dashed #d9d9d9;
    }
    .icon_style {
        width: 25px;
        height: 25px;
        cursor: pointer;
        position: relative;
        left: 150px;
        top: -68px;
    }
    .icon_style_pay {
        width: 25px;
        height: 25px;
        cursor: pointer;
        position: relative;
        left: 150px;
        top: -68px;
        clear: both;
    }
    .clear {
        clear: both;
    }
</style>

