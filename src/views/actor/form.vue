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

      <!--<div class="createPost-main-container">
        <el-form-item label="头像:" label-width="50px" prop="headurl">
          <div style="margin-bottom: 20px;width:800px">
            <Uploadhead v-model="postForm.headurl" v-on:input="picInput"></Uploadhead>
          </div>
        </el-form-item>
        <el-row>
          <el-col :span="21">

            <div class="postInfo-container">

              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="50px" label="名称:" class="postInfo-container-item" prop="name">
                    <el-input placeholder="" style='min-width:150px;' v-model="postForm.name" :disabled="disable">
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="50px" label="类型:" class="postInfo-container-item" prop="style">
                    <el-input placeholder="" style='min-width:150px;' v-model="postForm.style" :disabled="disable">
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="50px" label="性别:" class="postInfo-container-item" prop="gender">
                    <el-select class="filter-item" placeholder="请选择" v-model="postForm.gender" style="width: 166px" :disabled="disable">
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
                  <el-form-item label-width="50px" label="身高:" class="postInfo-container-item" prop="height">
                      <el-input placeholder="" style='min-width:150px;' v-model.number="postForm.height" :disabled="disable">
                      </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  
                    <el-form-item label-width="50px" label="年龄:" class="postInfo-container-item" prop="age">
                      <el-input placeholder="" style='min-width:150px;' v-model.number="postForm.age" :disabled="disable">
                      </el-input>
                  </el-form-item>
                  
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="50px" label="体重:" class="postInfo-container-item" prop="weight">
                      <el-input placeholder="" style='min-width:150px;' v-model.number="postForm.weight" :disabled="disable">
                      </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="50px" label="胸围:" class="postInfo-container-item" prop="bust">
                      <el-input placeholder="" style='min-width:150px;' v-model.number="postForm.bust" :disabled="disable">
                      </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label-width="50px" label="职业:" class="postInfo-container-item">
                      <el-input placeholder="" style='min-width:150px;' v-model="postForm.job" :disabled="disable">
                      </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item style="margin-bottom: 40px;" label-width="50px" label="性格:" class="postInfo-container-item">
                    <el-input type="textarea" :row="1" placeholder="" v-model="postForm.nature" style="width:170px;" :disabled="disable">
                    </el-input>
                    &lt;!&ndash;<span class="word-counter" v-show="natureLength">{{natureLength}}字</span>&ndash;&gt;
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

          </el-col>
        </el-row>

        <el-button v-if="fetchSuccess" v-loading="loading" style="margin-left: 10px;" type="primary" @click="submitForm('postForm')">新增主角</el-button>
        <hr v-if="showPhoto" style=" height:1px;border:none;border-top:1px dotted #185598;margin-bottom:25px" />

        <el-form v-if="showPhoto" :model="photosList" :rules="addPhotosRules" ref="photosList">
          <el-form-item label-width="50px" label="首图:" class="postInfo-container-item" prop="url">
            <div style="margin-bottom: 20px;">
              <Upload v-model="photosList.url"></Upload>
            </div>
          </el-form-item>
          <el-form-item label-width="50px" label="名称:" class="postInfo-container-item" prop="name" style="width:300px">
            <el-input placeholder="" style='width:150px;' v-model="photosList.name"></el-input>
          </el-form-item>

          <el-form-item label-width="50px" label="金币:" class="postInfo-container-item" prop="amount" style="width:300px">
            <el-input placeholder="" style='width:150px;display:inline-block;' v-model.number="photosList.amount"></el-input>
            <span>（0金币不锁）</span>
          </el-form-item>
          &lt;!&ndash;<el-form-item label-width="50px" label="数量:" class="postInfo-container-item" prop="photoNum" style="width:300px">
            <el-input placeholder="" style='min-width:150px;' v-model="photos.photoNum"></el-input>
          </el-form-item>&ndash;&gt;

        </el-form>
        <el-form-item v-if="showPhoto" label-width="50px" label="">
          <el-button type="primary" @click="addPhotos('photosList')">新增写真集</el-button>
        </el-form-item>

        <hr v-if="showPhoto" style=" height:1px;border:none;border-top:1px dotted #185598;margin-bottom:25px" />

        <template v-if="showPhoto" v-for="photo in photos">
          <div style="width: 500px;display:inline-block;margin:0px 10px 20px 10px;border: 1px solid #ccc;padding:10px">
            <el-form :model="photo" ref="photo">
              <el-form-item label-width="60px" label="写真集:" class="postInfo-container-item" prop="url">
                <div style="margin-bottom: 0px;cursor:pointer;" @click="thumbnaillist(photo.id)">
                  <img :src=photo.url style="width:300px;height:300px" alt="图片不存在"></img>
                  &lt;!&ndash;<Upload  v-model="photos.url" @click="dialogVisible = true"></Upload>&ndash;&gt;
                  <i class="el-icon-plus uploader-icon icon-position"></i>
                </div>
              </el-form-item>

              <el-form-item>
                <template scope="scope">
                  &lt;!&ndash;<span>{{scope.row.id}}</span>&ndash;&gt;
                </template>
              </el-form-item>

              <el-form-item label-width="50px" label="名称:" class="postInfo-container-item" prop="name" style="width:300px">
                <el-input placeholder="" style='width:150px;' v-model="photo.name"></el-input>
              </el-form-item>

              <el-form-item label-width="50px" label="金币:" class="postInfo-container-item" prop="amount" style="width:300px">
                <el-input placeholder="" style='width:150px;display:inline-block;' v-model.number="photo.amount"></el-input>
                <span>（0金币不锁）</span>
              </el-form-item>

              <el-form-item label-width="50px" label="数量:" class="postInfo-container-item" prop="photoNum" style="width:300px">
                <el-input placeholder="" style='width:150px;' v-model="photo.photoNum"></el-input>
              </el-form-item>

              &lt;!&ndash;<el-dialog title="提示" :visible.sync="dialogPhoto" size="tiny" >
                <span>确定删除?</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogPhoto = false">取 消</el-button>
                  <el-button type="primary" @click="surePhoto(photo.id)">确 定</el-button>
                </span>
              </el-dialog>&ndash;&gt;

              <el-form-item label-width="50px" label="">
                <el-button type="primary" @click="delPhoto(photo.id)">删除写真集</el-button>
              </el-form-item>

              <el-dialog title="编辑照片" :visible.sync="dialogVisible">

                  <el-form :model="upPhotos" :rules="picListRules" ref="upPhotos">

                    <el-form-item label="" label-width="60px" prop="photourl">
                      <div style="margin-bottom: 20px;">
                        <Uploadhead v-model="upPhotos.photourl" v-on:input="picInput"></Uploadhead>
                      </div>
                    </el-form-item>

                    <el-form-item style="display:none">
                      <el-button @click="dialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="picList(photo.id)">确 定</el-button>
                    </el-form-item>

                    <template v-for="upphoto in upPhotos">
                      <div style="display:inline-block">

                        <el-form-item label="" label-width="60px" prop="thumbnail">
                          <img :src=upphoto.thumbnail style="width:200px;height:200px" alt="图片不存在"></img>
                          <button type="button" aria-label="Close" class="el-dialog__headerbtn delButton" @click="delPicture(photo.id,upphoto.thumbnail)">
                            <i class="el-dialog__close el-icon el-icon-close"></i>
                          </button>
                        </el-form-item>
                      </div>

                    </template>
                  </el-form>

              </el-dialog>

            </el-form>
          </div>
        </template>
        <hr v-if="showHr" style=" height:1px;border:none;border-top:1px dotted #185598;margin-bottom:25px" />

        &lt;!&ndash;<hr v-if="showPhoto" width="100%" color="#999" style="margin-bottom:40px" />&ndash;&gt;

        <el-form v-if="showPhoto" :model="addmvs" :rules="addMvRules" ref="addmvs">
          <el-form-item label-width="68px" label="MV视频:" class="postInfo-container-item" prop="thumbnail">
            <div style="margin: 20px 0;">
              <Uploadvideo v-model="addmvs.thumbnail" :progresses="progressesData"></Uploadvideo>
            </div>
          </el-form-item>
          <el-form-item label-width="50px" label="" class="postInfo-container-item" prop="" style="width:400px;margin-top:-30px">
            <div v-show="progressesData.progress" style="">
              <el-progress :percentage="progressesData.percentage" :status="progressesData.progressStatus"></el-progress>
            </div>
          </el-form-item>

          &lt;!&ndash;<el-form-item label-width="50px" label="url:" class="postInfo-container-item" prop="mvurl" style="width:300px">
            <el-input placeholder="" style='width:150px;' v-model="addmvs.mvurl"></el-input>
          </el-form-item>&ndash;&gt;

          <el-form-item label-width="50px" label="名称:" class="postInfo-container-item" prop="mvname" style="width:300px">
            <el-input placeholder="" style='width:150px;' v-model="addmvs.mvname"></el-input>
          </el-form-item>

          <el-form-item label-width="50px" label="金币:" class="postInfo-container-item" prop="amount" style="width:300px">
            <el-input placeholder="" style='width:150px;display:inline-block;' v-model.number="addmvs.amount"></el-input>
            <span>（0金币不锁）</span>
          </el-form-item>
          <el-form-item label-width="70px" label="">
            <el-button type="primary" @click="addMv('addmvs')">新增视频</el-button>
          </el-form-item>
          <hr style=" height:1px;border:none;border-top:1px dotted #185598;margin-bottom:25px" />
        </el-form>

        <template v-if="showPhoto" v-for="mv in mvs">
          <div style="display:inline-block;margin-right:80px;border: 1px solid #ccc;padding:10px">
            <el-form :model="mv" ref="mv">
              <el-form-item label-width="70px" label="MV视频:" class="postInfo-container-item" prop="thumbnail">
                <div style="margin-bottom: 0px;">
                  <a :href="'http://'+mv.url"><video :src=mv.thumbnail style="width:200px;height:280px" controls ></video></a>
                  &lt;!&ndash;<Upload  v-model="photos.url" @click="dialogVisible = true"></Upload>&ndash;&gt;
                </div>
              </el-form-item>

              <el-form-item>
                <template scope="scope">
                  &lt;!&ndash;<span>{{scope.row.id}}</span>&ndash;&gt;
                </template>
              </el-form-item>

              <el-form-item label-width="50px" label="名称:" class="postInfo-container-item" prop="name" style="width:300px">
                <el-input placeholder="" style='width:150px;' v-model="mv.name"></el-input>
              </el-form-item>

              <el-form-item label-width="50px" label="金币:" class="postInfo-container-item" prop="amount" style="width:300px">
                <el-input placeholder="" style='width:150px;display:inline-block;' v-model.number="mv.amount"></el-input>
                <span>（0金币不锁）</span>
              </el-form-item>

              &lt;!&ndash;<el-dialog title="提示" :visible.sync="dialogMv" size="tiny" >
                <span>确定删除?</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogMv = false">取 消</el-button>
                  <el-button type="primary" @click="sureMv(mv.id)">确 定</el-button>
                </span>
              </el-dialog>&ndash;&gt;

              <el-form-item label-width="50px" label="">
                <el-button type="primary" @click="delMv(mv.id)">删除视频</el-button>
              </el-form-item>

            </el-form>
          </div>
        </template>
      </div>-->
      <div class="createPost-main-container">
        <!--<el-form-item label="昵称:" label-width="100px" prop="name" style="margin-bottom: 40px">
          <el-input placeholder="最多输入10个字" style='width:220px;' v-model="postForm.name" :disabled="disable" maxlength="10"></el-input>
        </el-form-item>-->

        <el-row>
          <el-col :span="8">
            <el-form-item label="昵称:" label-width="100px" prop="name" style="margin-bottom: 40px" required>
              <el-input placeholder="最多输入10个字" style='width:220px;' v-model="postForm.name" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="100px" label="身高:" class="postInfo-container-item" prop="height" required>
              <el-input placeholder="请输入身高" style='width:220px;' v-model.number="postForm.height" maxlength="3">
              </el-input>
              <span>cm</span>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label-width="100px" label="体重:" class="postInfo-container-item" prop="weight" required>
              <el-input placeholder="请输入体重" style='width:220px;' v-model.number="postForm.weight" maxlength="2">
              </el-input>
              <span>kg</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="年龄:" label-width="100px" prop="age" style="margin-bottom: 40px" required>
              <el-input placeholder="请输入年龄" style='width:220px;' v-model.number="postForm.age" maxlength="2"></el-input>
              <span>岁</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="100px" label="胸围:" class="postInfo-container-item" prop="bust" required>
              <!--<el-input placeholder="" style='width:220px;' v-model.number="postForm.bust"></el-input>-->
              <el-select v-model="postForm.bust" placeholder="请选择">
                <el-option v-for="item in bustOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-form-item prop="size" style="display: inline-block;width:60px">
                <el-select v-model="postForm.size" placeholder="请选择">
                  <el-option v-for="item in sizeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
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
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="内心独白:" label-width="100px" prop="nature" style="margin-bottom: 40px" required>
              <el-input type="textarea" placeholder="最多输入20个字" style='width:280px;' v-model="postForm.nature  " maxlength="20" rows="3"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="女仆特征:" label-width="100px" prop="host" style="margin-bottom: 40px" required>
              <el-input type="textarea" placeholder="最多输入20个字" style='width:280px;' v-model="postForm.host" maxlength="20" rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="头像:" label-width="100px" prop="headurl" style="margin-bottom: 40px" required>
          <div style="margin-bottom: 0px;width: 180px;height: 180px; border: 1px dashed #d9d9d9;">
            <Uploadhead v-model="postForm.headurl" v-on:input="picInput"></Uploadhead>
          </div>
          <span style="font-size:12px;display:inline-block; margin-top: -40px">（注：请上传1:1，不小于10kb，jpg、png等格式的文件）</span>
        </el-form-item>

        <!--<el-form-item label="头像框:" label-width="100px" prop="headSelect" style="margin-bottom: 40px">
          <el-select v-model="postForm.headSelect" placeholder="请选择">
            <el-option v-for="item in headOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>-->

        <el-form-item label="个人页背景图:" label-width="120px" prop="backImg1" style="margin-bottom: 40px" required>
          <div style="margin-right: 20px;height: 180px;display: inline-block;border: 1px dashed #d9d9d9;">
            <Upload v-model="postForm.backImg1" v-on:input="picInput"></Upload>
          </div>
          <el-form-item prop="backImg2" style="margin-right: 20px;display: inline-block">
            <div style="height: 180px;border: 1px dashed #d9d9d9;">
              <Upload v-model="postForm.backImg2" v-on:input="picInput"></Upload>
            </div>
          </el-form-item>
          <el-form-item prop="backImg3" style="margin-right: 20px;display: inline-block">
            <div style="height: 180px;border: 1px dashed #d9d9d9;">
              <Upload v-model="postForm.backImg3" v-on:input="picInput"></Upload>
            </div>
          </el-form-item>
          <el-form-item prop="backImg4" style="margin-right: 20px;display: inline-block">
            <div style="height: 180px;border: 1px dashed #d9d9d9;">
              <Upload v-model="postForm.backImg4" v-on:input="picInput"></Upload>
            </div>
          </el-form-item>
          <el-form-item prop="backImg5" style="margin-right: 20px;display: inline-block">
            <div style="height: 180px;border: 1px dashed #d9d9d9;">
              <Upload v-model="postForm.backImg5" v-on:input="picInput"></Upload>
            </div>
          </el-form-item>
          <span style="font-size:12px;display: block">（注：请上传4:3，不小于10kb，jpg、png等格式的文件）</span>
        </el-form-item>

        <el-form-item label="上架时间:" label-width="100px" prop="configTime" style="margin-bottom: 40px" required>
          <!--<el-select v-model="postForm.config" placeholder="请选择">
            <el-option v-for="item in configOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>-->
          <el-date-picker v-model="postForm.configTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请输入上架时间" :picker-options="pickerOptions1"></el-date-picker>
          </el-date-picker>
          <span style="font-size:12px">（注：不设置上架时间默认为下架状态）</span>
        </el-form-item>

        <el-form-item label="女仆空间排序:" label-width="120px" prop="private" style="margin-bottom: 40px" required>
          <el-select v-model="postForm.private" placeholder="请选择">
            <el-option v-for="item in privateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <span style="font-size:12px">（注：默认排序：按照上架时间逆序排列）</span>
        </el-form-item>

        <el-form-item label="加速价格:" label-width="100px" prop="price" style="margin-bottom: 40px" required>
          <!--<el-input placeholder="" style='width:60px;' v-model="postForm.timeNum" :disabled="disable" maxlength="10"></el-input>-->
          <el-input placeholder="" style='width:50px;' v-model.number="postForm.price" maxlength="10"></el-input>
          <span>钻石/</span>
          <el-select v-model="postForm.time" placeholder="请选择" style="width:80px">
            <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="配置工作时间:" label-width="120px" prop="workTimes" required>

          <div style="margin-bottom: 40px">
            <el-form-item label="" style="display: inline-block" prop="workTimeWeek" required>
              <span>周</span>
              <el-select v-model="postForm.workTimeWeek" placeholder="请选择" style="width:90px">
                <el-option v-for="item in weekOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="" style="display: inline-block" prop="time3">
              <el-time-select v-model="postForm.time3" :picker-options="{start: '00:00',step: '02:00',end: '22:00'}" placeholder="选择时间" style="width: 110px"></el-time-select>
              <span style="display: inline-block;margin: 0 20px 0 20px">至</span>
            </el-form-item>

            <el-form-item label="" style="display: inline-block" prop="workTimeWeek1">
              <span>周</span>
              <el-select v-model="postForm.workTimeWeek1" placeholder="请选择" style="width:90px">
                <el-option v-for="item in weekOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="" style="display: inline-block" prop="time2">
              <el-time-select v-model="postForm.time2" :picker-options="{start: '00:00',step: '02:00',end: '22:00'}" placeholder="选择时间" style="width: 110px"></el-time-select>
            </el-form-item>
            <el-button @click.prevent="addWork">新增工作时间</el-button>
          </div>

          <div v-for="workTime in postForm.workTimes" style="margin-bottom: 40px">
            <!--<el-date-picker v-model="workTime.value" type="week" format="周 ww"></el-date-picker>-->
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
            <el-time-select v-model="workTime.value1" :picker-options="{start: '00:00',step: '02:00',end: '22:00'}" placeholder="选择时间" style="width: 110px"></el-time-select>
            <!--<el-button @click.prevent="addWork">新增工作时间</el-button>-->
            <el-button @click.prevent="removeWork(workTime)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label-width="100px">
          <el-button type="primary" @click.prevent="add" size="large">新增主角</el-button>
        </el-form-item>

      </div>
    </el-form>

  </div>
</template>

<script type="text/ECMAScript-6">
  import Tinymce from 'components/Tinymce';
  import Upload from 'components/Upload/picture';
  import Uploadhead from 'components/Upload/headPhoto'
  import Uploadvideo from 'components/Upload/video';
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
    components: { Tinymce, MDinput, Upload, Uploadvideo, Uploadhead },
    data() {
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
          if (!Number.isInteger(value)) {
            callback(new Error('请输入正整数'));
          } else {
            if (value < 0) {
              callback(new Error('请输入正整数'));
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
        watcher: false,
        listQuery: {},
        photoData: {},
        mvData: {},
        photoid: '',
        progressesData: {
          percentage: 25,
          progress: false
        },
        progressStatus: '',
        postForm: {
          style: '无',
          name: '',
          gender: '2',
          weight: 45,
          height: 160,
          bust: '32',
          size: 'C',
          age: 20,
          job: '',
          nature: '',
          host: '',
          headurl: '', // 文章图片
          headSelect: '',
          backImg1: '',
          backImg2: '',
          backImg3: '',
          backImg4: '',
          backImg5: '',
          configTime: new Date(),
          private: '默认',
          timeNum: '',
          time: '小时',
          price: 30,
          workTimeWeek: '',
          workTimeWeek1: '',
          time2: '',
          time3: '',
          workTimes: [{
            time: '',
            value: '',
            time1: '',
            value1: ''
          }],
        },
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
        /*photos: [],
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
          name: '',
          amount: ''
        },
        mvs: [],*/
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
        sexOptions: [{
          value: '1',
          label: '男'
        }, {
          value: '2',
          label: '女'
        }],
        /*addPhotosRules: {
          url: [{ validator: validateRequire }],
          amount: [{ validator: checkNum }],
          name: [{ validator: validateRequire }]
        },
        addMvRules: {
          thumbnail: [{ validator: validateRequire }],
          mvurl: [{ validator: validateRequire }],
          amount: [{ validator: checkNum }],
          mvname: [{ validator: validateRequire }]
        },
        picListRules: {
          photourl: [{ validator: validateRequire }]
        },*/
        actorDetail: {
          name: [{ validator: validateRequire, trigger: 'blur' }],
          nature: [{ validator: validateRequireAll, trigger: 'blur' }],
          style: [{ validator: validateRequire, trigger: 'blur' }],
          height: [{ validator: checkNumHeight, trigger: 'blur' }],
          weight: [{ validator: checkNumWeight, trigger: 'blur' }],
          age: [{ validator: checkNumAge, trigger: 'blur' }],
          price: [{ validator: checkNumPrice, trigger: 'blur' }],
          workTimeWeek: [{ validator: validateRequireAll, trigger: 'blur' }],
          workTimeWeek1: [{ validator: validateRequireAll, trigger: 'blur' }],
          time2: [{ validator: validateRequireAll, trigger: 'blur' }],
          time3: [{ validator: validateRequireAll, trigger: 'blur' }],
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
      if(this.$route.params && this.$route.params.actor != ':actor') {
        this.listQuery.actorid = parseInt(this.$route.params.actor);
        this.getDetail(this.listQuery);
        this.photoData.id = parseInt(this.$route.params.actor);
        this.mvData.id = parseInt(this.$route.params.actor);
        this.fetchSuccess = false;
      } else {
        this.showPhoto = false;
        this.disable = false;
        this.showHr =false;
      }
      /*if (this.isEdit) {
        this.fetchData();
      }*/
    },
    watch : {
      "watcher" : {
        handler:function(val,oldval){
          this.picList(this.photoid);
        },
        deep: true
      }
    },
    methods: {
      uploadListener (data) {
        alert(data)
      },
      addWork () {
        this.postForm.workTimes.push({
          time: '',
          value: '',
          time1: '',
          value1: ''
        });
      },
      removeWork(item) {
        var index = this.postForm.workTimes.indexOf(item)
        if (index !== -1) {
          this.postForm.workTimes.splice(index, 1)
        }
      },
      /*getDetail () {
        actorListAll (this.listQuery).then(response => {
          this.postForm = response.data.content;
          if (response.data.content.gender == 1) {
            this.postForm.gender = '男'
          }
          if (response.data.content.gender == 2) {
            this.postForm.gender = '女'
          }
          this.photos = response.data.content.photo;
          this.mvs = response.data.content.mv;
          if (this.photos == '') {
            this.showHr =false;
          }
          /!*for(let i=0;i<this.postForm.nature.length;i++){
            this.postForm.nature[i].name = response.data.content.nature[i].name;
            this.postForm.nature = this.postForm.nature + this.postForm.nature[i].name + ',';
            alert(this.postForm.nature)
          }
          this.postForm.nature = this.postForm.nature.replace("undefined",'');*!/
            /!*for(let i=0;i<response.data.content.photo.length;i++){
              this.photos.amount =this.photos[i].amount;
              this.photos.url = this.photos[i].url;
            }*!/
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
      submitForm(formName) {
        //this.postForm.display_time = parseInt(this.display_time / 1000);
        console.log(this.postForm)
        var actorinfo;
        actorinfo = this.postForm;
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.loading = true;
            actorUpdate(actorinfo).then(response => {
              /!*if (!response.data.items) return;
              console.log(response)
              this.userLIstOptions = response.data.items.map(v => ({
                key: v.name
              }));*!/
              if(response.data.code == 200) {
                this.$message({
                  message: '发布成功',
                  type: 'success'
                });
                this.$refs[formName].resetFields();
                this.postForm.status = 'published';
              }
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
      addPhotos (photosList) {
        //this.photoData.name = this.postForm.photo;
        this.photoData.amount = parseInt(this.photosList.amount);
        this.photoData.url = this.photosList.url;
        this.photoData.name = this.photosList.name;
        this.$refs.photosList.validate(valid => {
          if (valid) {
            addPhotos(this.photoData).then(response => {
              //this.postForm = response.data;
              this.photoid = response.data.photoid;
              if (response.data.code == 200) {
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /!*surePhoto (id) {
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
      },*!/
      delPhoto (id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let photoid={
            id: id
          };
          delPhotos (photoid).then(response => {
            //this.postForm = response.data;
            this.flagPhoto = false;
            this.getDetail(this.listQuery);
            console.log()
          }).catch(err => {
            this.fetchSuccess = false;
            console.log(err);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        //this.dialogPhoto = true;
        /!*let photoid={
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
        }*!/
      },
      delPicture (id,url) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let photoinfo={
            id: id,
            url: url
          };
          delPhotos (photoinfo).then(response => {
            //this.postForm = response.data;
            this.thumbnaillist(id);
            console.log()
          }).catch(err => {
            this.fetchSuccess = false;
            console.log(err);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      addMv (addmvs) {
        let mvlist = {
          id: parseInt(this.$route.params.actor),
          mvname: this.addmvs.mvname,
          mvurl: this.addmvs.mvurl,
          mvpicture: this.addmvs.thumbnail,
          amount: parseInt(this.addmvs.amount)
        };
        this.$refs.addmvs.validate(valid => {
          if (valid) {
            addMvs (mvlist).then(response => {
                //this.postForm = response.data;
              if(response.data.code==200){
                this.$message({
                  message: '新增成功',
                  type: 'success'
                });
                this.$refs[addmvs].resetFields();
              }
              this.getDetail(this.listQuery);
              }).catch(err => {
                this.fetchSuccess = false;
              console.log(err);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /!*sureMv (id) {
        this.dialogMv = false;
        this.flagMv = true;
        let mvid={
          id: id
        };
        delMv (mvid).then(response => {
          //this.postForm = response.data;
          this.getDetail(this.listQuery);
          console.log()
        }).catch(err => {
            this.fetchSuccess = false;
          console.log(err);
        });
      },*!/
      delMv (id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let mvid={
            id: id
          };
          delMv (mvid).then(response => {
            //this.postForm = response.data;
            this.getDetail(this.listQuery);
            console.log()
          }).catch(err => {
            this.fetchSuccess = false;
            console.log(err);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        //this.dialogMv = true;
        /!*let mvid={
          id: id
        };
        delMv (mvid).then(response => {
          //this.postForm = response.data;
          console.log()
          }).catch(err => {
            this.fetchSuccess = false;
          console.log(err);
        });*!/
      },
      thumbnaillist (id) {
        this.photoid = id;
        this.dialogVisible = true;
        let list = {
          id: parseInt(this.$route.params.actor),
          photoid: id
        };
        thumbnaillist (list).then(response => {
          this.upPhotos = response.data.content;
          //this.photos.photoNum = response.data.content.length;
          for(let i=0;i<this.photos.length;i++){
            if(this.photos[i].id == id){
              this.photos[i].photoNum = response.data.content.length;
            }
          }
          console.log();
        }).catch(err => {
            this.fetchSuccess = false;
          console.log(err);
        });
      },
      picInput (data) {
        if (data) {
          this.watcher = data;
        }
      },
      picList (id) {
        let photoList={
          id: parseInt(this.$route.params.actor),
          photoid: id,
          photourl: this.upPhotos.photourl
        };
        //photoList.photourl = this.upPhotos.photourl;
        //this.$refs.upPhotos.validate(valid => {
          //if (valid) {

          /!*} else {
            console.log('error submit!!');
            return false;
          }
        });*!/
        if (photoList.photourl) {
          addPhoto (photoList).then(response => {
            console.log();
            this.upPhotos.photourl = '';
            this.thumbnaillist(id);
          }).catch(err => {
            this.fetchSuccess = false;
            console.log(err);
          });
        }/!* else {
          this.$message({
            message: '上传失败',
            type: 'error'
          });
        }*!/
        //this.dialogVisible = false;
      },*/
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

