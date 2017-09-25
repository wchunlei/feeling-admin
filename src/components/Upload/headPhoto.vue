<template>
    <div class="upload-container">
        <!--<el-upload class="image-uploader" :data="dataObj" drag :multiple="false" :show-file-list="false" action="http://192.168.1.43:3000/system/upload"
                   :on-success="handleImageScucess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>-->
        <el-upload
                class="avatar-uploader"
                action="http://192.168.1.43:3000/system/upload"
                :show-file-list="false"
                :on-success="handleImageScucess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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

<script>
    // 预览效果见文章
    import { getToken } from 'api/qiniu';
    export default {
        name: 'singleImageUpload',
        props: {
            value: String
        },
        computed: {
            imageUrl() {
                return this.value
            }
        },
        data() {
            return {
                tempUrl: '',
                dataObj: { token: '', key: '' },
                //imageUrl: ''
            };
        },
        methods: {
            rmImage() {
                this.emitInput('');
            },
            emitInput(val) {
                this.$emit('input', val);
            },
            handleImageScucess(res, file) {
                this.emitInput(res.content.url);
                this.imageUrl = URL.createObjectURL(file.raw);
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

<style rel="stylesheet/scss" lang="scss" >
    @import "src/styles/mixin.scss";
    .upload-container {
        width: 22%;
        position: relative;
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
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
</style>


