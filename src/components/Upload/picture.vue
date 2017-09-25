<template>
    <div>

        <el-upload
                class="avatar-uploader"
                action="http://192.168.1.43:3000/system/upload"
                :show-file-list="false"
                :on-success="handleImageScucess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!--<el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>-->

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

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        display: inline-block;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
        display: inline-block;
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
        display: inline-block;
    }
</style>
