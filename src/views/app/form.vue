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

      <el-form-item label="渠道名称:" style="margin-top:20px;width:300px" prop="name">
        <el-input v-model="postForm.name"></el-input>
      </el-form-item>

      <el-form-item label="主角:" label-width="90px" prop="actor">
        <!--<multiselect v-model="postForm.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                     deselectLabel="删除" track-by="key" :internalSearch="false" label="key" style="width:150px;">
          <span slot='noResult'>无结果</span>
        </multiselect>-->
        <el-checkbox-group v-model="postForm.actor">
          <el-checkbox v-for="act in userLIstOptions" :label="act.key" :key="act.key">{{act.key}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="新手剧情:" prop="storynew">
        <el-radio-group v-model="postForm.storynew">
          <el-radio  v-for="(story, index) in storynews" :label="story.id" :key="story.id">{{ story.name }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="主线剧情:" prop="checkStory">
        <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>-->
        <el-checkbox-group v-model="postForm.checkStory">
          <el-checkbox v-for="(story,index) in storys" :label="story.id" :key="story.id">{{story.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="会员价格:" style="margin-top:20px;width:300px" prop="amount">
        <el-input v-model="postForm.amount"></el-input>
      </el-form-item>

    </el-form>

    <div class="uplo">
      <Upload></Upload>
      <Upload></Upload>
      <Upload></Upload>
    </div>
    <div class="uplo">
      <Upload></Upload>
      <Upload></Upload>
      <Upload></Upload>
    </div>
    <div class="uplo">
      <Upload></Upload>
      <Upload></Upload>
      <Upload></Upload>
    </div>

  </div>
</template>

<script type="text/ECMAScript-6">
  import Upload from 'components/Upload/picture1'
  import Tinymce from 'components/Tinymce'
  //import Upload from 'components/Upload/singleImage3'
  import MDinput from 'components/MDinput';
  import { validateURL } from 'utils/validate';
  import { getArticle } from 'api/article';
  import { userSearch } from 'api/story';
  import { appupdate } from 'api/app';
  import { applist } from 'api/app';
  import { storyData } from 'api/story';

  export default {
    name: 'articleDetail',
    components: { Tinymce, MDinput, Upload },
    data() {
      const validateRequire = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        } else {
          callback()
        }
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
        search: {
          page: 1,
          limit: 20,
          importance: undefined,
          name: undefined,
          gender: undefined,
          status: undefined,
          //sort: '+id'
        },
        postForm: {
          name: '',
          actor: [],
          storynew: 0,
          checkStory: [],
          amount: ''
        },
        storynews: [],
        storys: [],
        fetchSuccess: true,
        loading: false,
        userLIstOptions: [],
        rules: {
          name: [{ validator: validateRequire }],
          //actor: [{ validator: validateRequire }],
          amount: [{ validator: validateRequire }],
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
      this.getRemoteUserList();
      if(this.$route.params.num && this.$route.params.num != ':num'){
        let listQuery={};
        listQuery.id = this.$route.params.num;
        this.fetchData(listQuery);
      }
      this.getStory();
    },
    methods: {
      fetchData(listQuery) {
        applist(listQuery).then(response => {
          this.postForm.name = response.data.content[0].name;
          this.postForm.amount = response.data.content[0].amount;
          this.postForm.storynew = response.data.content[0].storynew;
          for (let i=0;i<response.data.content[0].actor.length;i++){
            this.postForm.actor.push(response.data.content[0].actor[i].name);
          }
          for (let i=0;i<response.data.content[0].story.length;i++){
            this.postForm.checkStory.push(response.data.content[0].story[i].id)
          }
        }).catch(err => {
          this.fetchSuccess = false;
          console.log(err);
        });
      },
      getStory () {
        this.listLoading = true;
        storyData().then(response => {
          let tempIds = 0;
          let tempId = 0;
          if (tempIds || tempId) {
            tempIds = 0;
            tempId =0;
          }
          for (let i=0; i<response.data.content.length; i++) {
            if (response.data.content[i].plottype == 1){
              let tempnew = {};
              tempnew.id = tempIds++;
              tempnew.name = response.data.content[i].title;
              this.storynews.push(tempnew);
            }
            if (response.data.content[i].plottype == 2){
              let temp = {};
              temp.id = tempId++;
              temp.name = response.data.content[i].title;
              this.storys.push(temp);
            }
          }
          this.list = response.data.content;
          this.total = response.data.total;
        });
        this.listLoading = false;
      },
      submitForm() {
        //alert(Object.prototype.toString.call(this.postForm.checkStory) == '[object Array]');
        //let storyid = this.postForm.checkStory;
        let storyid = [];
        for(let i=0;i<this.postForm.checkStory.length;i++){
          //storyid[i] = this.postForm.checkStory[i];
          let item = {};
          item.id = this.postForm.checkStory[i];
          storyid.push(item);
        }
        let actorid = [];
        for(let i=0;i<this.postForm.actor.length;i++){
          let itemAct = {};
          for(let j=0;j<this.userLIstOptions.length;j++){
            if(this.userLIstOptions[j].key == this.postForm.actor[i]){
              this.postForm.actor[i] = parseInt(this.userLIstOptions[j].value);
            }
          }
          itemAct.value = this.postForm.actor[i];
          actorid.push(itemAct);
        }
        let appinfo = {
          name:  this.postForm.name,
          amount: parseInt(this.postForm.amount),
          actor: actorid,
          storynew: parseInt(this.postForm.storynew),
          story: storyid
        };
        if (this.$route.params.num != ':num'){
          appinfo.id = this.$route.params.num;
        }
        this.$refs.postForm.validate(valid => {
          if (valid) {
            appupdate (appinfo).then(response => {
              if(response.data.code==200 && this.$route.params.num == ':num'){
              this.$message({
                message: '新增成功',
                type: 'success'
              });
              //this.$refs[formName].resetFields();
            } else {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              }
            if (!response.data.items) return;
            console.log(response)
            this.userLIstOptions = response.data.items.map(v => ({
                      key: v.name
                    }));
          });
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
    .uplo div{
      display: inline-block;
    }
  }
</style>

