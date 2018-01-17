<template>
    <div class="upload-container">
        <!--<el-upload class="image-uploader" :data="dataObj" drag :multiple="false" :show-file-list="false" action="http://192.168.1.43:3000/system/upload"
                   :on-success="handleImageScucess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>-->
        <el-upload
                class="avatar-uploader"
                :action="picUrl"
                :data="dataObj"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-success="handleImageScucess"
                :on-remove="handleRemove">
            <img v-if="imageUrl"  :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="closeIcon">
            <i v-show="showClose" class="el-dialog__close el-icon el-icon-close" style="color: #8c939d" @click="rmImage"></i>
        </div>
        <div v-if="imageUrl">
            <i class="el-icon-search search" @click="viewImage"></i>
        </div>
        <!--<div>
            <i class="el-icon-zoom-in"></i>
        </div>-->

        <!--<i class="el-icon-circle-close" @click="rmImage"></i>-->
        <!--<div class="image-preview image-app-preview">
            <div class="image-preview-wrapper" v-show="imageUrl.length>1">
                <div class='app-fake-conver'>&nbsp&nbsp</div>
                <img :src="imageUrl">
                <div class="image-preview-action">
                    <i @click="rmImage" class="el-icon-delete"></i>
                </div>
            </div>
        </div>-->
        <!--<div class="image-preview">
            <div class="image-preview-wrapper" v-show="imageUrl.length>1">
                <img :src="imageUrl">
                &lt;!&ndash;<div class="image-preview-action">
                    <i @click="rmImage" class="el-icon-delete"></i>
                </div>&ndash;&gt;
            </div>
        </div>-->
    </div>
</template>

<script type="text/ECMAScript-6">
    // 预览效果见文章
    import { getToken } from 'api/qiniu';
    import { pictureUrl } from 'utils/urlConfig';
    export default {
        name: 'singleImageUpload',
        props: {
            value: String
        },
        created () {
            this.picUrl = pictureUrl();
        },
        computed: {
            imageUrl() {
                return this.value
            }
        },
        data() {
            return {
                tempUrl: '',
                picUrl: '',
                dataObj: { token: '', key: '' },
                showClose: false,
                //imageUrl: ''
            };
        },
        methods: {
            rmImage() {
                this.emitInput('');
                this.showClose = false;
            },
            viewImage () {
                console.log(this.imageUrl)
                window.open(this.imageUrl);
            },
            emitInput(val) {
                this.$emit('input', val);
            },
            handleImageScucess(res, file) {
                this.emitInput(res.content.url);
                this.imageUrl = URL.createObjectURL(file.raw);
                if (res.content.url) {
                    this.showClose = true;
                }
            },
            beforeAvatarUpload(file) {
                //const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif' || 'image/bmp' || 'image/raw';
                const isLt2M = file.size / 1024 / 1024 > 0.01;
                if (!(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp' || file.type === 'image/raw')) {
                    this.$message.error('图片格式有误!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不小于 10kb!');
                }
                return isLt2M;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            beforeUpload() {
                const _self = this;
                return new Promise((resolve, reject) => {
                    getToken().then(response => {
                        const key = response.data.qiniu_key;
                        const token = response.data.qiniu_token;
                        _self._data.dataObj.token = token;
                        _self._data.dataObj.key = key;
                        this.tempUrl = response.data.qiniu_url;
                        resolve(true);
                    }).catch(err => {
                        console.log(err);
                        reject(false)
                    });
                });
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .upload-container {
        width: 100%;
        /*position: relative;*/
    @include clearfix;
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 180px;
        height: 180px;
        line-height: 180px;
        text-align: center;
    }
    .search {
        font-size: 28px;
        color: #8c939d;
        width: 10px;
        height: 10px;
        /*line-height: 180px;*/
        text-align: center;
        position: relative;
        left: 60px;
        top: -102px;
        cursor: pointer;
    }
    .avatar {
        width: 180px;
        height: 180px;
        display: inline-block;
    }
    .closeIcon {
        display: inline-block;
        cursor: pointer;
        position: relative;
        left: 160px;
        top: -180px;
    }
    }
</style>
