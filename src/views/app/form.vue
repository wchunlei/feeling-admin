<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm" label-width="100px">

      <Sticky :className="'sub-navbar '+postForm.status">
        <template v-if="fetchSuccess">
          

          <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm()">发布
          </el-button>
          <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>

        </template>
        <template v-else>
          <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
        </template>

      </Sticky>

      <el-form-item label="渠道名称:" style="margin-top:20px;width:300px">
        <el-input v-model="postForm.name"></el-input>
      </el-form-item>

      <el-form-item label="主角:" label-width="90px" prop="actor">
        <multiselect v-model="postForm.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                     deselectLabel="删除" track-by="key" :internalSearch="false" label="key" style="width:150px;">
          <span slot='noResult'>无结果</span>
        </multiselect>
      </el-form-item>

      <el-form-item label="新手剧情:">
        <el-radio-group v-model="postForm.storynew">
          <el-radio label="1">我的测试新手剧情</el-radio>
          <el-radio label="2">情色版新手剧情</el-radio>
          <el-radio label="3">保守版新手剧情</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="主线剧情:">
        <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>-->
        <el-checkbox-group v-model="postForm.checkStory" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="story in storys" :label="story" :key="story">{{story}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="会员价格:" style="margin-top:20px;width:300px">
        <el-input v-model="postForm.amount"></el-input>
      </el-form-item>


    </el-form>

  </div>
</template>

<script>
  import Tinymce from 'components/Tinymce'
  import Upload from 'components/Upload/singleImage3'
  import MDinput from 'components/MDinput';
  import { validateURL } from 'utils/validate';
  import { getArticle } from 'api/article';
  import { userSearch } from 'api/story';

  export default {
    name: 'articleDetail',
    components: { Tinymce, MDinput, Upload },
    data() {
      const validateRequire = (rule, value, callback) => {
        if (value === '') {
          this.$message({
            message: rule.field + '为必传项',
            type: 'error'
          });
          callback(null)
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
        postForm: {
          name: '',
          storynew: '1',
          checkStory: [],
          amount: ''
        },
        storys: ['保守版佳佳剧情','情色版佳佳剧情','保守版斯诺剧情'],
        fetchSuccess: true,
        loading: false,
        userLIstOptions: [],
        rules: {
          //image_uri: [{ validator: validateRequire }],
          //title: [{ validator: validateRequire }],
          //source_name: [{ validator: validateRequire }],
          //source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
        }
      }
    },
    /*computed: {
      contentShortLength() {
        return this.postForm.content_short.length
      },
      isEdit() {
        return this.$route.meta.isEdit // 根据meta判断
          // return this.$route.path.indexOf('edit') !== -1 // 根据路由判断
      }
    },*/
    created() {
      if (this.isEdit) {
        this.fetchData();
      }
    },
    methods: {
      fetchData() {
        getArticle().then(response => {
          this.postForm = response.data;
        }).catch(err => {
          this.fetchSuccess = false;
          console.log(err);
        });
      },
      submitForm() {
        this.postForm.display_time = parseInt(this.display_time / 1000);
        console.log(this.postForm)
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$notify({
              title: '成功',
              message: '发布文章成功',
              type: 'success',
              duration: 2000
            });
            this.postForm.status = 'published';
            this.loading = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      draftForm() {
        if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
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
</style>

