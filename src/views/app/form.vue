<template>
  <div class="createPost-container">
    <!--<el-form class="form-container" :model="postForm" :rules="rules" ref="postForm" label-width="150px">

      &lt;!&ndash;<Sticky :className="'sub-navbar '+postForm.status">
        <template v-if="fetchSuccess">
          

          <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm()">发布</el-button>
          &lt;!&ndash;<el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>&ndash;&gt;

        </template>
        <template v-else>
          <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
        </template>

      </Sticky>&ndash;&gt;

      <el-form-item label="渠道名称:" style="margin-top:30px;width:300px" prop="name">
        <el-input v-model="postForm.name"></el-input>
      </el-form-item>

      <el-form-item label="主角:" prop="actor" style="margin-top:40px;">
        &lt;!&ndash;<multiselect v-model="postForm.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                     deselectLabel="删除" track-by="key" :internalSearch="true" label="key" style="width:150px;">
          <span slot='noResult'>无结果</span>
        </multiselect>&ndash;&gt;
        <el-checkbox-group v-model="postForm.actor">
          <el-checkbox v-for="act in userLIstOptions" :label="act.key" :key="act.key">{{act.key}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="新手剧情:" prop="storynew" style="margin-top:40px;">
        <el-radio-group v-model="postForm.storynew">
          <el-radio  v-for="(story, index) in storynews" :label="story.id" :key="story.id">{{ story.name }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="主线剧情:" prop="checkStory" style="margin-top:40px;">
        &lt;!&ndash;<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>&ndash;&gt;
        <el-checkbox-group v-model="postForm.checkStory">
          <el-checkbox v-for="(story,index) in storys" :label="story.id" :key="story.id">{{story.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="会员价格:" style="margin-top:40px;width:300px" prop="amount">
        <el-input v-model.number="postForm.amount"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="loading"  type="primary" @click="submitForm()">新增渠道</el-button>
      </el-form-item>
    </el-form>-->

    <!--<div id="canvas" style="width:200px;height:200px;background: #ccc"></div>-->
    <div id="myChart" :style="{width: '1200px', height: '800px'}"></div>
    <!--<el-dialog title="提示" :visible.sync="dialogVisible">
      <div style="margin-bottom: 10px;display: inline-block">
        &lt;!&ndash;<el-form-item class="uplo"  label-width="200px" label="图片:最多9张图片"></el-form-item>&ndash;&gt;
        <Upload v-model="pic"></Upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>-->

    <!--<div class="block">
      <span class="demonstration">带快捷选项</span>
      <el-date-picker v-model="value7" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2" :class="{disabled: isDisabled}">
      </el-date-picker>
    </div>-->

  </div>
</template>

<script type="text/ECMAScript-6">
  import Tinymce from 'components/Tinymce'
  //import Upload from 'components/Upload/singleImage3'
  import Upload from 'components/Upload/picture';
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
      const checkNum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('输入不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入正整数'));
          } else {
            if (value < 0) {
              callback(new Error('不能小于0'));
            } else {
              callback();
            }
          }
        }, 500);
      };
      const validateRequire = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('输入不能为空'));
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
        pic: '',
        dialogVisible: false,
        value7: new Date(),
        start: null,
        end: null,
        isDisabled: true,
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
          name: [{ required: true, validator: validateRequire }],
          actor: [{ required: true, message: '请选择主角' }],
          checkStory: [{ required: true, message: '请选择主线剧情' }],
          //actor: [{ validator: validateRequire }],
          amount: [{ required: true, validator: checkNum }],
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
    /*computed: {
      pickerOptions2: function () {
        if(this.start) {
          alert(this.start)
        }
        return {
          onPick (time) {
            this.start = time.minDate;
            this.end = time.maxDate;
            //this.disabledDate(times.minDate);
          },
          disabledDate(time) {
            console.log('1');
            let begin = new Date();
            //let end = new Date() + 30;
            return time.getTime() < begin.getTime() || time.getTime() >begin.getTime() + 30*8.64e7;
          }
        }

      }
    },*/
    created() {
      /*if (this.isEdit) {
        this.fetchData();
      }
      this.getRemoteUserList();
      if(this.$route.params.num && this.$route.params.num != ':num'){
        let listQuery={};
        listQuery.id = this.$route.params.num;
        this.fetchData(listQuery);
      }
      this.getStory();*/
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        // 绘制图表
        /*myChart.setOption({
          title: { text: '在Vue中使用echarts' },
          tooltip: {},
          xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });*/
        var data2 = {
          "name": "0 打招呼",
          "value": 'http://192.168.1.43:8000/upload/27/297d3fdedd2c8981ec7aa15981b06df2.jpg',
          "children": [
            {
              "name": "1 洗内裤",
              "children": [
                {
                  "name": "11白天洗",
                  "children": [
                    {
                      "name": "111厕所洗",
                      "children": [
                        {"name": "IScaleMap", "value": 'http://192.168.1.43:8000/upload/27/297d3fdedd2c8981ec7aa15981b06df2.jpg'}
                      ]
                    },
                    {
                      "name": "112在厨房洗",
                      "children": [
                        {"name": "IScaleMap", "value": 2105}
                      ]
                    }
                  ]
                },
                {
                  "name": "12晚上洗",
                  "children": [
                    {
                      "name": "121在客厅洗",
                      "children": [
                        {"name": "IScaleMap", "value": 2105}
                      ]
                    },
                    {
                      "name": "112在厨房洗",
                      "children": [
                        {"name": "IScaleMap", "value": 2105}
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        };
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          series:[
            {
              type: 'tree',
              data: [data2],
              left: '2%',
              right: '2%',
              top: '8%',
              bottom: '20%',
              symbol: 'emptyCircle',
              orient: 'vertical',//树图中 正交布局 的方向 ，对应有 水平 和 垂直 两个方向，取值分别为 horizontal , vertical
              expandAndCollapse: true,//子树折叠和展开的交互，默认打开
              initialTreeDepth: -1,  //树图初始展开的层级（深度）
              label: {
                normal: {
                  position: 'top',
                  //rotate: 90, //字体展示方向
                  verticalAlign: 'middle',
                  align: 'right',
                  fontSize: 14
                }
              },
              leaves: {
                label: {
                  normal: {
                    position: 'bottom',
                    //rotate: -90,
                    verticalAlign: 'middle',
                    align: 'left'
                  }
                }
              },
              animationDurationUpdate: 750
            },
           /* {
              type: 'tree',
              name: 'tree2',
              data: [data2],

              top: '20%',
              left: '60%',
              bottom: '22%',
              right: '18%',

              symbolSize: 7,

              label: {
                normal: {
                  position: 'left',
                  verticalAlign: 'middle',
                  align: 'right'
                }
              },

              leaves: {
                label: {
                  normal: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                  }
                }
              },

              expandAndCollapse: true,

              animationDuration: 550,
              animationDurationUpdate: 750
            }*/
          ]
        });
        myChart.on('click', function (params) {
          // 控制台打印数据的名称
          console.log(params.value);
          //window.location.href = params.value;
          window.open(params.value);
        });
      }
      /*fetchData(listQuery) {
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
      }*/
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

