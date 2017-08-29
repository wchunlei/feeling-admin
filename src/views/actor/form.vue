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
                  <el-form-item label-width="50px" label="类型:" class="postInfo-container-item" prop="style">
                      <el-input placeholder="" style='min-width:150px;' v-model="postForm.style">
                      </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  
                    <el-form-item label-width="50px" label="名称:" class="postInfo-container-item" prop="name">
                      <el-input placeholder="" style='min-width:150px;' v-model="postForm.name">
                      </el-input>
                    </el-form-item>
                  
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="45px" label="性别:" class="postInfo-container-item" prop="gender">
                    <el-select class="filter-item" placeholder="请选择" v-model="postForm.gender">
                      <el-option v-for="item in  sexOptions" :key="item.label" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="50px" label="身高:" class="postInfo-container-item">
                      <el-input placeholder="" style='min-width:150px;' v-model="postForm.height">
                      </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  
                    <el-form-item label-width="50px" label="年龄:" class="postInfo-container-item">
                      <el-input placeholder="" style='min-width:150px;' v-model="postForm.age">
                      </el-input>
                  </el-form-item>
                  
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="50px" label="体重:" class="postInfo-container-item">
                      <el-input placeholder="" style='min-width:150px;' v-model="postForm.weight">
                      </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="50px" label="胸围:" class="postInfo-container-item">
                      <el-input placeholder="" style='min-width:150px;' v-model="postForm.bust">
                      </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  
                    <el-form-item label-width="50px" label="职业:" class="postInfo-container-item">
                      <el-input placeholder="" style='min-width:150px;' v-model="postForm.job">
                      </el-input>
                    </el-form-item>
                  
                </el-col>


              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="45px" label="性格:">
          <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入内容" v-model="postForm.nature">
          </el-input>
          <span class="word-counter" v-show="natureLength">{{natureLength}}字</span>
        </el-form-item>

        <el-form :model="photosList" :rules="rules" ref="photosList">
          <el-form-item label-width="50px" label="首图:" class="postInfo-container-item" prop="url">
            <div style="margin-bottom: 20px;">
              <Upload v-model="photosList.url"></Upload>
            </div>
          </el-form-item>
          <el-form-item label-width="50px" label="名称:" class="postInfo-container-item" prop="name" style="width:300px">
            <el-input placeholder="" style='min-width:150px;' v-model="photosList.name"></el-input>
          </el-form-item>

          <el-form-item label-width="50px" label="金币:" class="postInfo-container-item" prop="amount" style="width:300px">
            <el-input placeholder="" style='width:150px;display:inline-block;' v-model="photosList.amount"></el-input>
            <span>（0金币不锁）</span>
          </el-form-item>
          <el-form-item label-width="50px" label="数量:" class="postInfo-container-item" prop="photoNum" style="width:300px">
            <el-input placeholder="" style='min-width:150px;' v-model="photos.photoNum"></el-input>
          </el-form-item>

        </el-form>
        <el-form-item label-width="50px" label="">
          <el-button type="primary" @click="addPhotos('photosList')">新增写真集</el-button>
        </el-form-item>

        <template v-for="photo in photos">
          <div style="display:inline-block">
            <el-form :model="photos" :rules="rules" ref="photos">
              <el-form-item label-width="60px" label="写真集:" class="postInfo-container-item" prop="url">
                <div style="margin-bottom: 0px;" @click="thumbnaillist(photo.id)">
                  <img :src=photo.url style="width:300px;height:300px" alt="图片不存在"></img>
                  <!--<Upload  v-model="photos.url" @click="dialogVisible = true"></Upload>-->
                </div>
              </el-form-item>

              <el-form-item>
                <template scope="scope">
                  <!--<span>{{scope.row.id}}</span>-->
                </template>
              </el-form-item>

              <el-form-item label-width="50px" label="名称:" class="postInfo-container-item" prop="name" style="width:300px">
                <el-input placeholder="" style='min-width:150px;' v-model="photo.name"></el-input>
              </el-form-item>

              <el-form-item label-width="50px" label="金币:" class="postInfo-container-item" prop="amount" style="width:300px">
                <el-input placeholder="" style='width:150px;display:inline-block;' v-model="photo.amount"></el-input>
                <span>（0金币不锁）</span>
              </el-form-item>

              <el-form-item label-width="50px" label="数量:" class="postInfo-container-item" prop="photoNum" style="width:300px">
                <el-input placeholder="" style='min-width:150px;' v-model="photos.photoNum"></el-input>
              </el-form-item>

              <el-dialog title="提示" :visible.sync="dialogPhoto" size="tiny" >
                <span>确定删除?</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogPhoto = false">取 消</el-button>
                  <el-button type="primary" @click="sure(photo.id)">确 定</el-button>
                </span>
              </el-dialog>

              <el-form-item label-width="50px" label="">
                <el-button type="primary" @click="delPhoto(photo.id)">删除写真集</el-button>
              </el-form-item>

              <el-dialog title="photos" :visible.sync="dialogVisible">

                    <el-form :model="upPhotos" :rules="rules" ref="upPhotos">

                      <el-form-item label="新增照片:" label-width="90px" prop="photourl">
                        <div style="margin-bottom: 20px;">
                          <Upload v-model="upPhotos.photourl"></Upload>
                        </div>
                      </el-form-item>

                      <el-form-item>
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="picList(photo.id)">确 定</el-button>
                      </el-form-item>

                      <template v-for="upphoto in upPhotos">
                        <div style="display:inline-block">

                          <el-form-item label="照片:" label-width="90px" prop="thumbnail">
                            <img :src=upphoto.thumbnail style="width:300px;height:300px" alt="图片不存在"></img>
                          </el-form-item>
                        </div>
                      </template>
                    </el-form>

              </el-dialog>

            </el-form>
          </div>
        </template>

        <el-form :model="addmvs" :rules="rules" ref="addmvs">
          <el-form-item label-width="68px" label="MV视频:" class="postInfo-container-item" prop="thumbnail">
            <div style="margin: 20px 0;">
              <Upload v-model="addmvs.thumbnail"></Upload>
            </div>
          </el-form-item>

          <el-form-item label-width="70px" label="视频url:" class="postInfo-container-item" prop="mvurl" style="width:300px">
            <el-input placeholder="" style='min-width:150px;' v-model="addmvs.mvurl"></el-input>
          </el-form-item>

          <el-form-item label-width="50px" label="名称:" class="postInfo-container-item" prop="mvname" style="width:300px">
            <el-input placeholder="" style='min-width:150px;' v-model="addmvs.mvname"></el-input>
          </el-form-item>

          <el-form-item label-width="50px" label="金币:" class="postInfo-container-item" prop="mvCoin" style="width:300px">
            <el-input placeholder="" style='width:150px;display:inline-block;' v-model="addmvs.amount"></el-input>
            <span>（0金币不锁）</span>
          </el-form-item>
          <el-form-item label-width="50px" label="">
            <el-button type="primary" @click="addMv">新增视频</el-button>
          </el-form-item>
        </el-form>

        <template v-for="mv in mvs">
          <div style="display:inline-block">
            <el-form :model="mvs" :rules="rules" ref="mvs">
              <el-form-item label-width="70px" label="MV视频:" class="postInfo-container-item" prop="thumbnail">
                <div style="margin-bottom: 0px;">
                  <a :href="'http://'+mv.url"><img :src=mv.thumbnail style="width:200px;height:280px" alt="视频不存在"></img></a>
                  <!--<Upload  v-model="photos.url" @click="dialogVisible = true"></Upload>-->
                </div>
              </el-form-item>

              <el-form-item>
                <template scope="scope">
                  <!--<span>{{scope.row.id}}</span>-->
                </template>
              </el-form-item>

              <el-form-item label-width="50px" label="名称:" class="postInfo-container-item" prop="mvname" style="width:300px">
                <el-input placeholder="" style='min-width:150px;' v-model="mv.mvname"></el-input>
              </el-form-item>

              <el-form-item label-width="50px" label="金币:" class="postInfo-container-item" prop="amount" style="width:300px">
                <el-input placeholder="" style='width:150px;display:inline-block;' v-model="mv.amount"></el-input>
                <span>（0金币不锁）</span>
              </el-form-item>

              <el-form-item label-width="50px" label="">
                <el-button type="primary" @click="delMv(mv.id)">删除视频</el-button>
              </el-form-item>

            </el-form>
          </div>
        </template>

      </div>
    </el-form>

  </div>
</template>

<script>
  import Tinymce from 'components/Tinymce';
  import Upload from 'components/Upload/singleImage3';
  import MDinput from 'components/MDinput';
  import { validateURL } from 'utils/validate';
  import { getArticle } from 'api/article';
  import { actorUpdate } from 'api/actor';
  import { actorListAll } from 'api/actor';
  import { addPhotos } from 'api/actor';
  import { delPhotos } from 'api/actor';
  import { addPhoto } from 'api/actor';
  import { thumbnaillist } from 'api/actor';
  import { addMvs } from 'api/actor';
  import { delMv } from 'api/actor';

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
        listQuery: {},
        photoData: {},
        mvData: {},
        photoid: '',
        postForm: {
          style: '', // 文章题目
          name: '', // 文章内容
          gender: '',
          weight: '',
          height: '',
          bust: '',
          age: '',
          job: '',
          nature: '',
          headurl: '', // 文章图片
          id: '',
          status: 'draft',
        },
        photos: {
          url: '',
          amount: '',
          name: '',
          photoNum: ''
        },
        photosList: {
          url: '',
          amount: '',
          name: '',
          photoNum: ''
        },
        upPhotos: {
          photourl: '',
          thumbnail: ''
        },
        addmvs: {
          thumbnail: '',
          url: '',
          mvurl: '',
          mvname: '',
          amount: ''
        },
        dialogPhoto: false,
        flagPhoto: false,
        dialogVisible: false,
        fetchSuccess: true,
        loading: false,
        userLIstOptions: [],
        sexOptions: [{
          value: '1',
          label: '男'
        }, {
          value: '2',
          label: '女'
        }],
        rules: {
          //headurl: [{ validator: validateRequire }],
          //style: [{ validator: validateRequire }],
          //name: [{ validator: validateRequire }],
          //headurl: [{ validator: validateSourceUri, trigger: 'blur' }]
        }
      }
    },
    /*computed: {
      natureLength() {
        return this.postForm.nature.length
      },
      isEdit() {
        return this.$route.meta.isEdit // 根据meta判断
          // return this.$route.path.indexOf('edit') !== -1 // 根据路由判断
      }
    },*/
    created() {
      if(this.$route.params && this.$route.params.actor != ':actor') {
        this.listQuery.actorid = parseInt(this.$route.params.actor);
        this.getDetail(this.listQuery);
        this.photoData.id = parseInt(this.$route.params.actor);
        this.mvData.id = parseInt(this.$route.params.actor);
      }
      if (this.isEdit) {
        this.fetchData();
      }
    },
    methods: {
      getDetail () {
        actorListAll (this.listQuery).then(response => {
            this.postForm = response.data.content;
            this.photos = response.data.content.photo;
            this.mvs = response.data.content.mv;
            /*for(let i=0;i<response.data.content.photo.length;i++){
              this.photos.amount =this.photos[i].amount;
              this.photos.url = this.photos[i].url;
            }*/
            //this.photos.amount =this.photos[0].amount;
            //this.photos.url = this.photos[0].url;
        }).catch(err => {
            this.fetchSuccess = false;
          console.log(err);
        });
      },
      fetchData() {
        getArticle().then(response => {
          this.postForm = response.data;
        }).catch(err => {
          this.fetchSuccess = false;
          console.log(err);
        });
      },
      submitForm() {
        //this.postForm.display_time = parseInt(this.display_time / 1000);
        console.log(this.postForm)
        var actorinfo;
        actorinfo = this.postForm;
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.loading = true;

            actorUpdate(actorinfo).then(response => {
              if (!response.data.items) return;
              console.log(response)
              this.userLIstOptions = response.data.items.map(v => ({
                key: v.name
              }));

            });

            this.$notify({
              title: '成功',
              message: '发布成功',
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
      addPhotos (photosList) {
        //this.photoData.name = this.postForm.photo;
        this.photoData.amount = parseInt(this.photosList.amount);
        this.photoData.url = this.photosList.url;
        this.photoData.name = this.photosList.name;
        addPhotos (this.photoData).then(response => {
            //this.postForm = response.data;
            this.photoid = response.data.photoid;
            if(response.data.code==200){
              this.$message({
                message: '新增成功',
                type: 'success'
              });
              this.$refs[photosList].resetFields();
            }
            this.getDetail(this.listQuery);
        }).catch(err => {
            this.fetchSuccess = false;
          console.log(err);
        });
      },
      sure (id) {
        this.dialogPhoto = false;
        this.flagPhoto = true;
        let photoid={
          id: id
        };
        if(this.flagPhoto){
          delPhotos (photoid).then(response => {
            //this.postForm = response.data;
            this.flagPhoto = false;
            this.getDetail(this.listQuery);
            console.log()
          }).catch(err => {
              this.fetchSuccess = false;
            console.log(err);
          });
        }
      },
      delPhoto (id) {
        this.dialogPhoto = true;
        /*let photoid={
          id: id
        };
        if(this.flagPhoto){
          delPhotos (photoid).then(response => {
            //this.postForm = response.data;
            console.log()
          }).catch(err => {
              this.fetchSuccess = false;
            console.log(err);
          });
        }*/
      },
      addMv () {
        let mvlist = {
          id: parseInt(this.$route.params.actor),
          mvname: this.addmvs.mvname,
          mvurl: this.addmvs.mvurl,
          mvpicture: this.addmvs.thumbnail,
          amount: parseInt(this.addmvs.amount)
        };
        addMvs (mvlist).then(response => {
            //this.postForm = response.data;
          }).catch(err => {
            this.fetchSuccess = false;
          console.log(err);
        });
      },
      delMv (id) {
        let mvid={
          id: id
        };
        delMv (mvid).then(response => {
          //this.postForm = response.data;
          console.log()
        }).catch(err => {
          this.fetchSuccess = false;
        console.log(err);
      });
      },
      thumbnaillist (id) {
        this.dialogVisible = true;
        let list = {
          id: parseInt(this.$route.params.actor),
          photoid: id
        };
        thumbnaillist (list).then(response => {
          this.upPhotos = response.data.content;
          console.log();
        }).catch(err => {
            this.fetchSuccess = false;
          console.log(err);
        });
      },
      picList (id) {
        let photoList={
          id: parseInt(this.$route.params.actor),
          photoid: id,
          photourl: this.upPhotos.photourl
        };
        //photoList.photourl = this.upPhotos.photourl;
        addPhoto (photoList).then(response => {
            console.log()
        }).catch(err => {
            this.fetchSuccess = false;
          console.log(err);
        });
        this.dialogVisible = false;
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

