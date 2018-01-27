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
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="closeIcon">
            <i v-show="showClose" class="el-dialog__close el-icon el-icon-close" style="color: #ccc" @click="rmImage"></i>
        </div>

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
    import  md5  from 'js-md5';
    export default {
        name: 'singleImageUpload',
        props: {
            value: String,
            close: false
        },
        created () {
            this.picUrl = pictureUrl() + "&width=990";
            if (this.close) {
                this.showClose = true;
            } else {
                this.showClose = false;
            }
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
                dataObj: {
                },
                showClose: false,
                //imageUrl: ''
            };
        },
        methods: {
            rmImage() {
                this.emitInput('');
                this.showClose = false;
            },
            emitInput(val,data) {
                this.$emit('input', val,data);
            },
            handleImageScucess(res, file) {
                console.log(res.urlinfo[0])
                this.emitInput(res.urlinfo[0].url,res);
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
                            console.log(data);
                            _this.emitInput(data.url);
                            if (data.url) {
                                _this.showClose = true;
                            }
                        });
                    }).catch(function(err){
                        console.log("Fetch错误123aa:"+err);
                    })

                }
                return isLt2M;
            },
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
            },*/
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
        width: 320px;
        height: 180px;
        line-height: 180px;
        text-align: center;
    }
    .avatar {
        width: 320px;
        height: 180px;
        display: inline-block;
    }
    .closeIcon {
        display: inline-block;
        cursor: pointer;
        position: relative;
        left: 300px;
        top: -190px;
    }
    }
</style>
