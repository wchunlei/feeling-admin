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


            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="45px" label="主角:" class="postInfo-container-item" prop="actor">
                    <multiselect v-model="postForm.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                      deselectLabel="删除" track-by="key" :internalSearch="false" label="key">
                      <span slot='noResult'>无结果</span>
                    </multiselect>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="45px" label="类型:" class="postInfo-container-item">
                    <el-select class="filter-item" placeholder="请选择" v-model="postForm.type">
                      <el-option v-for="item in  typeOptions" :key="item.label" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="80px" label="剧情名称:" class="postInfo-container-item">
                      <el-input placeholder="" style='min-width:150px;' v-model="postForm.title">
                      </el-input>
                    </el-form-item>
                </el-col>
              </el-row>
            </div>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  
                    <el-form-item label-width="80px" label="天:" class="postInfo-container-item">
                      <el-input placeholder="" style='min-width:150px;' v-model="postForm.day">
                      </el-input>
                    </el-form-item>
                  
                </el-col>
                <el-col :span="8">
                  
                    <el-form-item label-width="50px" label="步:" class="postInfo-container-item">
                      <el-input placeholder="" style='min-width:150px;' v-model="postForm.step">
                      </el-input>
                    </el-form-item>
                  
                </el-col>

              </el-row>
            </div>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  
                    <el-form-item label-width="80px" label="回复1:" class="postInfo-container-item">
                      <el-input placeholder="" style='min-width:150px;' v-model="postForm.replay1">
                      </el-input>
                    </el-form-item>
                  
                </el-col>

              </el-row>
            </div>
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  
                    <el-form-item label-width="80px" label="回复2:" class="postInfo-container-item">
                      <el-input placeholder="" style='min-width:150px;' v-model="postForm.replay2">
                      </el-input>
                    </el-form-item>
                  
                </el-col>

              </el-row>
            </div>
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  
                    <el-form-item label-width="80px" label="回复3:" class="postInfo-container-item">
                      <el-input placeholder="" style='min-width:150px;' v-model="postForm.replay3">
                      </el-input>
                    </el-form-item>
                  
                </el-col>

              </el-row>
            </div>
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  
                    <el-form-item label-width="80px" label="回复4:" class="postInfo-container-item">
                      <el-input placeholder="" style='min-width:150px;' v-model="postForm.replay4">
                      </el-input>
                    </el-form-item>
                  
                </el-col>

              </el-row>
            </div>
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  
                    <el-form-item label-width="80px" label="回复5:" class="postInfo-container-item">
                      <el-input placeholder="" style='min-width:150px;' v-model="postForm.replay5">
                      </el-input>
                    </el-form-item>
                  
                </el-col>

              </el-row>
            </div>

          </el-col>
        </el-row>

        <div style="margin-bottom: 20px;">
          <Upload v-model="postForm.radio_uri"></Upload>
        </div>

      </div>
    </el-form>

  </div>
</template>

<script>
  import Tinymce from 'components/Tinymce'
  import Upload from 'components/Upload/audio'
  import MDinput from 'components/MDinput';
  import { validateURL } from 'utils/validate';
  import { getArticle } from 'api/article';
  import { userSearch } from 'api/story';
  import { radioUpdate } from 'api/story';

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
          radio_uri: '', // 文章图片
          replay1: '', // 文章图片
          replay2: '', // 文章图片
          replay3: '', // 文章图片
          replay4: '', // 文章图片
          replay5: '', // 文章图片
          actor: '', // 文章外部作者
          id: undefined,
          type: '',
          step: '',
          day: ''
        },
        fetchSuccess: true,
        loading: false,
        userLIstOptions: [],
        typeOptions: [{
          value: '2',
          label: '主线'
        }, {
          value: '1',
          label: '新手'
        }],
        rules: {
          actor: [{ validator: validateRequire }],
          title: [{ validator: validateRequire }]
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

        this.$refs.postForm.validate(valid => {
          if (valid) {
            console.log(this.postForm)
            var actorinfo;
            actorinfo = this.postForm;
            radioUpdate(actorinfo).then(response => {
              if (!response.data.items) return;
              console.log(response)
              this.userLIstOptions = response.data.items.map(v => ({
                key: v.name
              }));
            });

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

