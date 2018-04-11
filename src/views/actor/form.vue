<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" ref="postForm" :rules="actorDetail">

      <!--<Sticky :className="'sub-navbar '+postForm.status">
        <template v-if="fetchSuccess">
          

          <el-button v-if="fetchSuccess" v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm('postForm')">新增主角</el-button>
          &lt;!&ndash;<el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>&ndash;&gt;

        </template>
        <template v-else>
          &lt;!&ndash;<el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>&ndash;&gt;
          <el-tag>用户详情</el-tag>
        </template>

      </Sticky>-->

      <div class="createPost-main-container">
        <!--<el-form-item label="昵称:" label-width="100px" prop="name" style="margin-bottom: 40px">
          <el-input placeholder="最多输入10个字" style='width:220px;' v-model="postForm.name" :disabled="disable" maxlength="10"></el-input>
        </el-form-item>-->

        <el-row>
          <el-col :span="8">
            <el-form-item label="昵称:" label-width="100px" prop="name" style="margin-bottom: 40px" required>
              <el-input placeholder="最多输入10个字" style='width:220px;' v-model="postForm.name" :maxlength=10></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年龄:" label-width="100px" prop="age" style="margin-bottom: 40px" required>
              <el-input placeholder="请输入年龄" style='width:220px;' v-model.number="postForm.age" :maxlength=2></el-input>
              <span>岁</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="100px" label="标签:" class="postInfo-container-item" prop="style" required>
              <!--<el-input placeholder="" style='width:220px;' v-model.number="postForm.style"></el-input>-->
              <el-select v-model="postForm.style" placeholder="请选择">
                <el-option v-for="item in styleOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--<el-col :span="8">
            <el-form-item label-width="100px" label="身高:" class="postInfo-container-item" prop="height" required>
              <el-input placeholder="请输入身高" style='width:220px;' v-model.number="postForm.height" :maxlength=3>
              </el-input>
              <span>cm</span>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label-width="100px" label="体重:" class="postInfo-container-item" prop="weight" required>
              <el-input placeholder="请输入体重" style='width:220px;' v-model.number="postForm.weight" :maxlength=2>
              </el-input>
              <span>kg</span>
            </el-form-item>
          </el-col>-->
        </el-row>

        <el-row>
          <!--<el-col :span="8">
            <el-form-item label-width="100px" label="胸围:" class="postInfo-container-item" prop="bust" required>
              &lt;!&ndash;<el-input placeholder="" style='width:220px;' v-model.number="postForm.bust"></el-input>&ndash;&gt;
              <el-select v-model="postForm.bust" placeholder="请选择">
                <el-option v-for="item in bustOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-form-item prop="cup" style="display: inline-block;width:60px">
                <el-select v-model="postForm.cup" placeholder="请选择">
                  <el-option v-for="item in sizeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              </el-form-item>
          </el-col>-->


        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="内心独白:" label-width="100px" prop="soliloquy" style="margin-bottom: 40px" required>
              <el-input type="textarea" placeholder="最多输入20个字" style='width:280px;' v-model="postForm.soliloquy" :maxlength=1000 :rows=3></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="女仆特征:" label-width="100px" prop="feature" style="margin-bottom: 40px" required>
              <el-input type="textarea" placeholder="最多输入20个字" style='width:280px;' v-model="postForm.feature" :maxlength=1000 :rows=3></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="头像:" label-width="100px" prop="headurl" style="margin-bottom: 40px">
          <div style="margin-bottom: 0px;width: 180px;height: 180px; border: 1px dashed #d9d9d9;">
            <Uploadhead v-model="postForm.headurl" v-on:input="picInput"></Uploadhead>
          </div>
          <span style="font-size:12px;display:inline-block; margin-top: -40px">(请上传132*132，jpg格式的文件)</span>
          <!--<input type="file" @change="uploadfile(this)" />-->
        </el-form-item>

        <!--<el-form-item label="头像框:" label-width="100px" prop="headSelect" style="margin-bottom: 40px">
          <el-select v-model="postForm.headSelect" placeholder="请选择">
            <el-option v-for="item in headOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>-->

        <el-form-item label="空间背景:" label-width="100px" prop="backImg1" style="margin-bottom: 40px">
          <div style="margin-right: 20px;height: 180px;display: inline-block;border: 1px dashed #d9d9d9;">
            <Upload v-model="postForm.backImg1" :close="closeStatus" v-on:input="picInput"></Upload>
          </div>
          <el-form-item prop="backImg2" style="margin-right: 20px;display: inline-block">
            <div style="height: 180px;border: 1px dashed #d9d9d9;">
              <Upload v-model="postForm.backImg2" :close="closeStatus" v-on:input="picInput"></Upload>
            </div>
          </el-form-item>
          <el-form-item prop="backImg3" style="margin-right: 20px;display: inline-block">
            <div style="height: 180px;border: 1px dashed #d9d9d9;">
              <Upload v-model="postForm.backImg3" :close="closeStatus" v-on:input="picInput"></Upload>
            </div>
          </el-form-item>
          <el-form-item prop="backImg4" style="margin-right: 20px;display: inline-block">
            <div style="height: 180px;border: 1px dashed #d9d9d9;">
              <Upload v-model="postForm.backImg4" :close="closeStatus" v-on:input="picInput"></Upload>
            </div>
          </el-form-item>
          <el-form-item prop="backImg5" style="margin-right: 20px;display: inline-block">
            <div style="height: 180px;border: 1px dashed #d9d9d9;">
              <Upload v-model="postForm.backImg5" :close="closeStatus" v-on:input="picInput"></Upload>
            </div>
          </el-form-item>
          <span style="font-size:12px;display: block;margin-top: -40px">（请上传800*600,jpg格式的文件）</span>
        </el-form-item>

        <el-form-item label="介绍视频:" label-width="100px" prop="introvideo" style="margin-bottom: 40px">
          <!--<el-select v-model="postForm.introvideo" filterable placeholder="请选择">
            <el-option v-for="item in videoOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>-->
          <multiselect v-model="postForm.introvideo" required :options="videoOptions" @search-change="getSource" placeholder="搜索视频" selectLabel="选择"
                       deselectLabel="" track-by="label" :internalSearch="true" label="label" style="width:180px;display: inline-block;">
            <span slot='noResult'>无结果</span>
          </multiselect>
        </el-form-item>

       <!-- <el-form-item label="介绍卡片:" label-width="100px" prop="introcard" style="margin-bottom: 40px">
          <div style="width: 270px; height: 480px;border: 1px dashed #d9d9d9;">
            <Upload-card v-model="postForm.introcard" :close="closeStatus" v-on:input="picInput"></Upload-card>
          </div>
          <div style="font-size: 12px;margin: 5px 0 0 15px">(请上传1080*1920jpg格式的文件)</div>
        </el-form-item>

        <el-form-item label="FM播放图:" label-width="100px" prop="playimg" style="margin-bottom: 40px">
          <el-upload
                  :model="postForm.playimg"
                  class="upload-demo"
                  :action="picUrl"
                  :before-upload="beforeAvatarUploadVideo"
                  :on-success="handleImageScucess"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  style="width:200px">
            <el-button size="small" type="primary">选择图片</el-button>
            <div slot="tip" class="el-upload__tip">(请上传1080*1920jpg格式的文件)</div>
          </el-upload>
        </el-form-item>-->

        <el-form-item label="上架时间:" label-width="100px" prop="configtime" style="margin-bottom: 40px">
          <!--<el-select v-model="postForm.config" placeholder="请选择">
            <el-option v-for="item in configOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>-->
          <el-date-picker v-model="postForm.configtime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="未设置" :picker-options="pickerOptions1"></el-date-picker>
          </el-date-picker>
          <span style="font-size:12px">（注：不设置上架时间默认为下架状态）</span>
        </el-form-item>

        <el-form-item label="摇一摇排序:" label-width="100px" prop="sort" style="margin-bottom: 40px" required>
          <el-select v-model="postForm.sort" placeholder="请选择">
            <el-option v-for="item in privateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <span style="font-size:12px">（注：默认排序：按照上架时间逆序排列）</span>
        </el-form-item>

        <el-form-item label="雇佣价格:" label-width="100px" prop="price" style="margin-bottom: 40px" required>
          <!--<el-input placeholder="" style='width:60px;' v-model="postForm.timeNum" :disabled="disable" maxlength="10"></el-input>-->
          <el-input placeholder="" style='width:190px;' v-model.number="postForm.price" :maxlength=10></el-input>
          <span>金</span>
          <!--<el-select v-model="postForm.time" placeholder="请选择" style="width:80px">
            <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>-->
        </el-form-item>

        <!--<el-form-item label="工作时间:" label-width="100px" prop="worktimes" required>

          <div style="margin-bottom: 40px">
            &lt;!&ndash;<el-form-item label="" style="display: inline-block" prop="workTimeWeek" required>
              <span>周</span>
              <el-select v-model="postForm.workTimeWeek" placeholder="请选择" style="width:90px">
                <el-option v-for="item in weekOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="" style="display: inline-block" prop="time2">
              <el-time-select v-model="postForm.time2" :picker-options="{start: '00:00',step: '02:00',end: '22:00'}" placeholder="选择时间" style="width: 110px"></el-time-select>
              <span style="display: inline-block;margin: 0 20px 0 20px">至</span>
            </el-form-item>

            <el-form-item label="" style="display: inline-block" prop="workTimeWeek1">
              <span>周</span>
              <el-select v-model="postForm.workTimeWeek1" placeholder="请选择" style="width:90px">
                <el-option v-for="item in weekOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="" style="display: inline-block" prop="time2">
              <el-time-select v-model="postForm.time3" :picker-options="{start: '00:00',step: '02:00',end: '22:00'}" placeholder="选择时间" style="width: 110px"></el-time-select>
            </el-form-item>&ndash;&gt;
            <el-button @click.prevent="addWork" style="background: #5bcfff;color:#ffffff;">新增工作时间</el-button>
          </div>

          <div v-for="workTime in postForm.worktimes" style="margin-bottom: 40px">
            &lt;!&ndash;<el-date-picker v-model="workTime.value" type="week" format="周 ww"></el-date-picker>&ndash;&gt;
            <span>周</span>
            <el-select v-model="workTime.time" placeholder="请选择" style="width:90px">
              <el-option v-for="item in weekOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-time-select v-model="workTime.value" :picker-options="{start: '00:00',step: '02:00',end: '22:00'}" placeholder="选择时间" style="width: 110px"></el-time-select>
            <span style="display: inline-block;margin: 0 20px 0 20px">至</span>
            <span>周</span>
            <el-select v-model="workTime.time1" placeholder="请选择" style="width:90px">
              <el-option v-for="item in weekOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-time-select v-model="workTime.value1" :picker-options="{start: '00:00',step: '02:00',end: '24:00'}" placeholder="选择时间" style="width: 110px"></el-time-select>
            &lt;!&ndash;<el-button @click.prevent="addWork">新增工作时间</el-button>&ndash;&gt;
            <el-button @click.prevent="removeWork(workTime)">删除</el-button>
          </div>
        </el-form-item>-->

        <el-form-item label-width="100px">
          <el-button v-show="addBut" type="primary" @click.prevent="add" size="large">新增主角</el-button>
          <el-button v-show="saveBut" type="primary" @click.prevent="add" size="large">保存</el-button>
        </el-form-item>

      </div>
    </el-form>

  </div>
</template>

<script type="text/ECMAScript-6">
  import Tinymce from 'components/Tinymce';
  import Upload from 'components/Upload/picture';
  import UploadCard from 'components/Upload/pictureCard';
  import { pictureUrl } from 'utils/urlConfig';
  import Uploadhead from 'components/Upload/headPhoto'
  import Uploadvideo from 'components/Upload/video';
  import MDinput from 'components/MDinput';
  import md5 from 'js-md5';
  import { validateURL } from 'utils/validate';
  import { getArticle } from 'api/article';
  import { addactor } from 'api/actor';
  import { updateactor } from 'api/actor';
  import { actorInfo } from 'api/actor';
  import { actorUpdate } from 'api/actor';
  import { reslist } from 'api/resource';

  export default {
    name: 'articleDetail',
    components: { Tinymce, MDinput, Upload, Uploadvideo, Uploadhead, UploadCard },
    data() {
      let Base64 = require('js-base64').Base64;
      const checkNumHeight = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('输入不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入正整数'));
          } else {
            if (value < 140 || value > 200) {
              callback(new Error('请输入140~200之间的整数'));
            } else {
              callback();
            }
          }
        }, 500);
      };
      const checkNumWeight = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('输入不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入正整数'));
          } else {
            if (value < 30 || value > 90) {
              callback(new Error('请输入30~90之间的整数'));
            } else {
              callback();
            }
          }
        }, 500);
      };
      const checkNumAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('输入不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入正整数'));
          } else {
            if (value < 10 || value > 50) {
              callback(new Error('请输入10~50之间的整数'));
            } else {
              callback();
            }
          }
        }, 500);
      };
      const checkNumPrice = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('输入不能为空'));
        }
        setTimeout(() => {
          if (!value) {
            callback(new Error('请输入正数'));
          } else {
            if (value < 0) {
              callback(new Error('请输入正数'));
            } else {
              callback();
            }
          }
        }, 500);
      };
      const validateRequireAll = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('输入不能为空'));
        } else {
          callback()
        }
      };
      const validateRequire = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('输入不能为空'));
        } else {
          let str = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]");
          let flg = false;
          flg = (value.match(str));
          if (flg) {
            return callback(new Error('昵称格式有误'));
            //alert('昵称格式有误,请勿输入特殊字符');
          }
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
        phopoid: '',
        picUrl: '',
        closeStatus: false,
        watcher: false,
        listQuery: {},
        photoData: {},
        mvData: {},
        photoid: '',
        playImgName: '',
        progressesData: {
          percentage: 25,
          progress: false
        },
        progressStatus: '',
        fileList: [],
        postForm: {
          style: '0',
          name: '',
          gender: '2',
          weight: 45,
          height: 160,
          bust: '32',
          cup: 'C',
          age: 20,
          job: '',
          soliloquy: '',
          feature: '',
          headurl: '',
          headSelect: '',
          backImg1: '',
          backImg2: '',
          backImg3: '',
          backImg4: '',
          backImg5: '',
          introvideo: '',
          introcard: '',
          playimg: [],
          configtime: '',
          sort: '0',
          timeNum: '',
          time: '0',
          price: 30,
          workTimeWeek: '',
          workTimeWeek1: '',
          time2: '',
          time3: '',
          worktimes: [{
            time: '',
            value: '00:00',
            time1: '',
            value1: '00:00'
          }],
        },
        //videoOptions: [],
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() + 86400000 < Date.now();
          },
        },
        headOptions: [{
            value: '1',
            label: '贴心护士'
          }],
        weekOptions: [{
          value: '1',
          label: '一'
        },{
          value: '2',
          label: '二'
        },{
          value: '3',
          label: '三'
        },{
          value: '4',
          label: '四'
        },{
          value: '5',
          label: '五'
        },{
          value: '6',
          label: '六'
        },{
          value: '7',
          label: '日'
        }],
        configOptions: [{
          value: '0',
          label: '下架'
        },{
          value: '1',
          label: '上架'
        }],
        privateOptions: [{
          value: '0',
          label: '默认'
        },{
          value: '1',
          label: '1'
        },{
          value: '2',
          label: '2'
        },{
          value: '3',
          label: '3'
        },{
          value: '4',
          label: '4'
        },{
          value: '5',
          label: '5'
        },{
          value: '6',
          label: '6'
        },{
          value: '7',
          label: '7'
        }],
        bustOptions: [{
          value: '30',
          label: '30'
        },{
          value: '32',
          label: '32'
        },{
          value: '34',
          label: '34'
        },{
          value: '36',
          label: '36'
        },{
          value: '38',
          label: '38'
        },{
          value: '40',
          label: '40'
        }],
        sizeOptions: [{
          value: 'A',
          label: 'A'
        },{
          value: 'B',
          label: 'B'
        },{
          value: 'C',
          label: 'C'
        },{
          value: 'D',
          label: 'D'
        },{
          value: 'E',
          label: 'E'
        },{
          value: 'F',
          label: 'F'
        },{
          value: 'G',
          label: 'G'
        }],
        timeOptions: [{
          value: '0',
          label: '小时'
        },{
          value: '1',
          label: '秒'
        },{
          value: '2',
          label: '分钟'
        },{
          value: '3',
          label: '天'
        },{
          value: '4',
          label: '周'
        }],
        styleOptions: [{
          value: '0',
          label: '无'
        },{
          value: '1',
          label: '护理女仆'
        },{
          value: '2',
          label: '家教女仆'
        },{
          value: '3',
          label: '秘书女仆'
        },{
          value: '4',
          label: '陪练女仆'
        },{
          value: '5',
          label: '成熟女仆'
        },{
          value: '6',
          label: '校花女仆'
        },{
          value: '7',
          label: 'coser女仆'
        }],
        showPhoto: true,
        showHr: true,
        dialogPhoto: false,
        dialogMv: false,
        flagPhoto: false,
        dialogVisible: false,
        fetchSuccess: true,
        loading: false,
        userLIstOptions: [],
        natureLength: false,
        disable: true,
        addBut: true,
        saveBut: false,
        sexOptions: [{
          value: '1',
          label: '男'
        }, {
          value: '2',
          label: '女'
        }],
        actorDetail: {
          name: [{ validator: validateRequire, trigger: 'blur' }],
          soliloquy: [{ validator: validateRequireAll, trigger: 'blur' }],
          feature: [{ validator: validateRequireAll, trigger: 'blur' }],
          style: [{ validator: validateRequire, trigger: 'blur' }],
          height: [{ validator: checkNumHeight, trigger: 'blur' }],
          weight: [{ validator: checkNumWeight, trigger: 'blur' }],
          age: [{ validator: checkNumAge, trigger: 'blur' }],
          price: [{ validator: checkNumPrice, trigger: 'blur' }]
          //bust: [{ validator: checkNum, trigger: 'blur' }],
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
      //this.getVideoResource();  //数据较多造成网页加载卡顿
      this.$store.commit('getVideoResource','');
      this.picUrl = pictureUrl() + "&width=1080";
      if(this.$route.params.id && this.$route.params.id != ':id'){
        this.saveBut = true;
        this.addBut = false;
        this.listQuery.id = this.$route.params.id;
        this.getDetail(this.listQuery);
        this.closeStatus = true;
      } else {
        /*this.showPhoto = false;
        this.disable = false;
        this.showHr =false;*/
      }
    },
    computed: {
      videoOptions: function () {
        console.log(this.$store.state.app.resource)
        return this.$store.state.app.resource;
      }
    },
    watch : {
      "postForm.worktimes" : {
        handler:function(val,oldval){
          this.postForm.worktimes = val;
        },
        deep: true
      }
    },
    methods: {
      getVideoResource () {
        let typeinfo = {};
        typeinfo.type = '2';
        reslist (typeinfo).then(response => {
          if(response.data.code==200){
            for (let i=0; i<response.data.content.length; i++) {
              let temp = {};
              temp.value = response.data.content[i].id;
              temp.label = response.data.content[i].name;
              this.videoOptions.push(temp);
            }
            console.log(this.videoOptions)
            /*this.$message({
             message: '新增成功',
             type: 'success'
             });*/
          }
        });
      },
      getSource() {
        //this.$store.commit('getVideoResource','');
        console.log(this.videoOptions)
      },
      beforeAvatarUploadVideo(file) {
        console.log(file);
        this.playImgName = file.name;
        const isLt2M = file.size / 1024 / 1024 > 0.01 && file.size / 1024 / 1024 < 1;
        if (!(file.type === 'image/jpeg')) {
          this.$message.error('图片格式有误!');
          return false;
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不小于 10kb且不能大于1M!');
        }
        return isLt2M;
        /*const isLt2M = file.size / 1024 / 1024 > 0.001;
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
              _this.postForm.playimg.push(data.url);
              /!*console.log(data);
              _this.emitInput(data.url);
              if (data.url) {
                _this.showClose = true;
              }*!/
            });
          }).catch(function(err){
            console.log("Fetch错误123aa:"+err);
          })

        }
        //console.log(reader.readAsText(file));
        //console.log(file)
        return isLt2M;*/
      },
      handleImageScucess(res, file) {
        console.log(res,file);
        if (res.code == 200) {
          let temp = {};
          temp.name = this.playImgName;
          temp.url = res.urlinfo[0].url;
          this.postForm.playimg.push(temp);
        }
      },
      handleRemove(file, fileList) {
        console.log( fileList);
        let index = null;
        let temp = [];
        for (let i=0; i<this.postForm.playimg.length; i++) {
          temp.push(this.postForm.playimg[i].name);
        }
        for (let j=0; j<temp.length; j++) {
          if (file.name == temp[j]) {
            index = temp.indexOf(file.name);
            this.postForm.playimg.splice(index, 1);
          }
        }
        //this.postForm.playimg.splice(index, 1);
        this.fileList = this.postForm.playimg;
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
      },
      /*handleImageScucess (res,file) {
        console.log(res,file);
        this.videourl = res.content.url;
        console.log(this.video,this.videosize,this.videourl)
      },*/
      add () {
        let dateString;
        if (this.postForm.configtime && this.postForm.configtime != '0000-00-00 00:00:00') {
          let date= new Date(this.postForm.configtime);
          let year=date.getFullYear(),
                  month=date.getMonth()+ 1,
                  day=date.getDate(),
                  hour=date.getHours(),
                  minutes=date.getMinutes(),
                  seconds=date.getSeconds();
          //let dateString=year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
          dateString=year+'-'+(month>=10?+month:"0"+month)+"-"+(day>=10? day :'0'+day)+' '+(hour>=10?+hour:"0"+hour)+':'+(minutes>=10?+minutes:"0"+minutes)+':'+(seconds>=10?+seconds:"0"+seconds);
        } else {
          dateString = '0000-00-00 00:00:00';
        }
        let backimg = [];
        if (this.postForm.backImg1) {
          backimg.push(this.postForm.backImg1)
        }
        if (this.postForm.backImg2) {
          backimg.push(this.postForm.backImg2)
        }
        if (this.postForm.backImg3) {
          backimg.push(this.postForm.backImg3)
        }
        if (this.postForm.backImg4) {
          backimg.push(this.postForm.backImg4)
        }
        if (this.postForm.backImg5) {
          backimg.push(this.postForm.backImg5)
        }
        let actorinfo = {
          //channel: "女仆团",
          name: this.postForm.name,
          soliloquy: this.postForm.soliloquy,
          //height: this.postForm.height.toString(),
          //weight: this.postForm.weight.toString(),
          age: this.postForm.age.toString(),
          //bust: this.postForm.bust,
          //cup: this.postForm.cup,
          style: this.postForm.style,
          headurl: this.postForm.headurl,
          backimg: backimg,
          //introcard: this.postForm.introcard,
          introvideo: this.postForm.introvideo.value,
          //playimg: this.postForm.playimg,
          feature: this.postForm.feature,
          configtime: dateString,
          sort: this.postForm.sort,
          price: this.postForm.price.toString(),
          //time: this.postForm.time,
          //worktime: this.postForm.worktimes
        };
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.loading = true;
            if (this.postForm.headurl == '') {
              this.$message({
                message: '请上传头像',
                type: 'error'
              });
              return false;
            }
            if (actorinfo.backimg == '') {
              this.$message({
                message: '请上传空间背景图',
                type: 'error'
              });
              return false;
            }
            if (actorinfo.playimg == '') {
              this.$message({
                message: '请上传FM播放图',
                type: 'error'
              });
              return false;
            }
            /*if (this.postForm.worktimes[0].time == 0 || this.postForm.worktimes[0].time == '' || this.postForm.worktimes[0].time1 == 0|| this.postForm.worktimes[0].time1 == '') {
              this.$message({
                message: '请选择工作时间',
                type: 'error'
              });
              return false;
            }*/
            /*if (parseInt(this.postForm.worktimes[0].time) > parseInt(this.postForm.worktimes[0].time1)) {
              this.$message({
                message: '起始时间不能大于结束时间',
                type: 'error'
              });
              return false;
            }*/
            if (this.$route.params.id && this.$route.params.id == ':id') {
              addactor(actorinfo).then(response => {
                /*if (!response.data.items) return;
                 console.log(response)
                 this.userLIstOptions = response.data.items.map(v => ({
                 key: v.name
                 }));*/
                if (response.data.msg == 'name is repeat!') {
                  this.$message({
                    message: '昵称不能重复',
                    type: 'error'
                  });
                }
                if(response.data.code == 200) {
                  this.$message({
                    message: '新增成功',
                    type: 'success'
                  });
                  //this.$refs[formName].resetFields();
                  //this.postForm.status = 'published';
                }
              });
            } else {
              actorinfo.id = this.$route.params.id;
              actorinfo.feature = this.postForm.feature.replace(/(\s*$)/g, "");
              actorinfo.soliloquy = this.postForm.soliloquy.replace(/(\s*$)/g, "");
              updateactor(actorinfo).then(response => {
                /*if (!response.data.items) return;
                 console.log(response)
                 this.userLIstOptions = response.data.items.map(v => ({
                 key: v.name
                 }));*/
                if(response.data.code == 200) {
                  this.$message({
                    message: '发布成功',
                    type: 'success'
                  });
                  //this.$refs[formName].resetFields();
                  //this.postForm.status = 'published';
                }
              });
            }

            this.loading = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      uploadListener (data) {
        alert(data)
      },
      addWork () {
        let temp = {
          time: '',
          value: '',
          time1: '',
          value1: ''
        }
        this.postForm.worktimes.push(temp);
        this.postForm.soliloquy = this.postForm.soliloquy + ' ';
        /*let sum = this.postForm.worktimes.length;
        this.postForm.worktimes[sum-1].time = '1';*/
        /*this.$set(this.postForm.worktimes,this.postForm.worktimes.length,{
          time: '',
          value: '',
          time1: '',
          value1: ''
        })*/
        /*this.$nextTick(() => {
          this.postForm.worktimes = this.postForm.worktimes;
        });*/
        console.log(this.postForm.worktimes[0].time);
      },
      removeWork(item) {
        var index = this.postForm.worktimes.indexOf(item);
        if (index !== -1 && this.postForm.worktimes.length > 1) {
          this.postForm.worktimes.splice(index, 1);
          this.postForm.feature = this.postForm.feature + ' ';
        } else {
          this.$message({
            message: '最少配置一个工作时间',
            type: 'error'
          });
        }
      },
      getDetail () {
        actorInfo (this.listQuery).then(response => {
          this.postForm = response.data.content;
          this.postForm.height = parseInt(response.data.content.height);
          this.postForm.weight = parseInt(response.data.content.weight);
          this.postForm.age = parseInt(response.data.content.age);
          this.postForm.price = parseInt(response.data.content.price);
          this.fileList = response.data.content.playimg;
          this.postForm.feature = response.data.content.feature.replace(/(\s*$)/g, "");
          /*for (let i=0;i<response.data.content.playimg.length; i++) {
            let temp = {};
            temp.name = '图片'+(i+1);
            temp.url = response.data.content.playimg[i];
            this.fileList.push(temp);
          }*/
          //console.log(response.data.content.worktime)
          /*this.postForm.worktimes = response.data.content.worktime;
          for (let i=0;i<response.data.content.worktime.length; i++) {
            this.postForm.worktimes[i].time = response.data.content.worktime[i].time;
            this.postForm.worktimes[i].value = response.data.content.worktime[i].value;
            this.postForm.worktimes[i].time1 = response.data.content.worktime[i].time1;
            this.postForm.worktimes[i].value1 = response.data.content.worktime[i].value1;
          }*/
          for (let i=0; i<this.videoOptions.length; i++) {
            if(response.data.content.introvideo == this.videoOptions[i].value) {
              this.postForm.introvideo = this.videoOptions[i];
            }
          }
          if (response.data.content.backimg[0]) {
            this.postForm.backImg1 = response.data.content.backimg[0];
          }
          if (response.data.content.backimg[1]) {
            this.postForm.backImg2 = response.data.content.backimg[1];
          }
          if (response.data.content.backimg[2]) {
            this.postForm.backImg3 = response.data.content.backimg[2];
          }
          if (response.data.content.backimg[3]) {
            this.postForm.backImg4 = response.data.content.backimg[3];
          }
          if (response.data.content.backimg[4]) {
            this.postForm.backImg5 = response.data.content.backimg[4];
          }
          if (this.postForm.configtime == "0000-00-00 00:00:00") {
            this.postForm.configtime = '';
          }
          /*for(let i=0;i<this.postForm.nature.length;i++){
            this.postForm.nature[i].name = response.data.content.nature[i].name;
            this.postForm.nature = this.postForm.nature + this.postForm.nature[i].name + ',';
            alert(this.postForm.nature)
          }
          this.postForm.nature = this.postForm.nature.replace("undefined",'');*/
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
      picInput (data,data1) {
        if (data) {
          this.watcher = data;
          this.postForm.feature = this.postForm.feature + ' ';
        } else {
          this.postForm.feature = this.postForm.feature + ' ';
        }
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
<style rel="stylesheet/scss" lang="scss">
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
    .el-dialog__header {
      height:40px;
      padding:0;
      text-align:center;
      line-height:40px;
      background-color:#1970cf;
    }

    .el-dialog__header .el-dialog__title {
      color:#fff;
      font-weight:500;
      font-size:14px;
    }
    .el-dialog .el-dialog__body {
      max-height:740px;
      overflow:auto;
    }
    .el-dialog__headerbtn {
      margin-right:10px
    }
    .delButton {
      position: relative;
      left: -20px;
      top:-5px
    }
    .uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .icon-position {
      position: absolute;
      left: 60px;
      top: 60px;
    }
  }
</style>

