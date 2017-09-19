<template>
    <div>
        <!--<el-upload class="image-uploader" :data="dataObj" drag :multiple="false" :show-file-list="false" action="http://192.168.1.43:3000/system/upload"
                   :on-success="handleImageScucess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <div class="image-preview image-app-preview">
            <div class="image-preview-wrapper" v-show="imageUrl.length>1">
                <div class='app-fake-conver'>&nbsp&nbsp</div>
                <img :src="imageUrl">
                <div class="image-preview-action">
                    <i @click="rmImage" class="el-icon-delete"></i>
                </div>
            </div>
        </div>
        <div class="image-preview">
            <div class="image-preview-wrapper" v-show="imageUrl.length>1">
                <img :src="imageUrl">
                <div class="image-preview-action">
                    <i @click="rmImage" class="el-icon-delete"></i>
                </div>
            </div>
        </div>-->

        <el-upload action="http://192.168.1.43:3000/system/upload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" class="el-upload">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false
            };
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        }
    }
</script>

<!--<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .upload-container {
        width: 100%;
        .el-upload {
            width: 200px;
        }
    }
</style>-->


