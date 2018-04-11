<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">

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

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="21">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput name="name" v-model="postForm.title" required :maxlength="100">
                标题
              </MDinput>
              <span v-show="postForm.title.length>=26" class='title-prompt'>app可能会显示不全</span>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="45px" label="类型:" class="postInfo-container-item">
                    <multiselect v-model="postForm.author" :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                      deselectLabel="删除" track-by="key" :internalSearch="true" label="key">
                      <span slot='noResult'>无结果</span>
                    </multiselect>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  
                    <el-form-item label-width="50px" label="名称:" class="postInfo-container-item">
                      <el-input placeholder="" style='min-width:150px;' v-model="postForm.source_name">
                      </el-input>
                    </el-form-item>
                  
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="45px" label="性别:" class="postInfo-container-item">
                    <el-select class="filter-item" placeholder="请选择" v-model="postForm.sex">
                      <el-option v-for="item in  sexOptions" :key="item" :label="item" :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="45px" label="身高:" class="postInfo-container-item">
                    <multiselect v-model="postForm.author" :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                      deselectLabel="删除" track-by="key" :internalSearch="true" label="key">
                      <span slot='noResult'>无结果</span>
                    </multiselect>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  
                    <el-form-item label-width="50px" label="年龄:" class="postInfo-container-item">
                      <el-input placeholder="" style='min-width:150px;' v-model="postForm.source_name">
                      </el-input>
                    </el-form-item>
                  
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="45px" label="体重:" class="postInfo-container-item">
                    <el-select class="filter-item" placeholder="请选择" v-model="postForm.sex">
                      <el-option v-for="item in  sexOptions" :key="item" :label="item" :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="45px" label="胸围:" class="postInfo-container-item">
                    <multiselect v-model="postForm.author" :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                      deselectLabel="删除" track-by="key" :internalSearch="true" label="key">
                      <span slot='noResult'>无结果</span>
                    </multiselect>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  
                    <el-form-item label-width="50px" label="职业:" class="postInfo-container-item">
                      <el-input placeholder="" style='min-width:150px;' v-model="postForm.source_name">
                      </el-input>
                    </el-form-item>
                  
                </el-col>


              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="45px" label="性格:">
          <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入内容" v-model="postForm.content_short">
          </el-input>
          <span class="word-counter" v-show="contentShortLength">{{contentShortLength}}字</span>
        </el-form-item>



        <div style="margin-bottom: 20px;">
          <Upload v-model="postForm.image_uri"></Upload>
        </div>
      </div>
    </el-form>

  </div>
</template>

<script>
  import Tinymce from 'components/Tinymce'
  import Upload from 'components/Upload/singleImage3'
  import MDinput from 'components/MDinput';
  import { validateURL } from 'utils/validate';
  import { getArticle } from 'api/article';
  import { userSearch } from 'api/remoteSearch';

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
          title: '', // 文章题目
          content: '', // 文章内容
          content_short: '', // 文章摘要
          source_uri: '', // 文章外链
          image_uri: '', // 文章图片
          source_name: '', // 文章外部作者
          display_time: undefined, // 前台展示时间
          id: undefined,
          sex: '',
          platforms: ['a-platform']
        },
        fetchSuccess: true,
        loading: false,
        userLIstOptions: [],
        platformsOptions: [
            { key: 'a-platform', name: 'a-platform' },
            { key: 'b-platform', name: 'b-platform' },
            { key: 'c-platform', name: 'c-platform' }
        ],
        sexOptions: ['男', '女'],
        rules: {
          image_uri: [{ validator: validateRequire }],
          title: [{ validator: validateRequire }],
          content: [{ validator: validateRequire }],
          source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
        }
      }
    },
    computed: {
      contentShortLength() {
        return this.postForm.content_short.length
      },
      isEdit() {
        return this.$route.meta.isEdit // 根据meta判断
          // return this.$route.path.indexOf('edit') !== -1 // 根据路由判断
      }
    },
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
        userSearch(query).then(response => {
          if (!response.data.items) return;
          console.log(response)
          this.userLIstOptions = response.data.items.map(v => ({
            key: v.name
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

