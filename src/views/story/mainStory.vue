<template>
    <div class="createPost-container">
        <div class="cloth_center">
            <div class="cloth_commom">
                <el-form ref="form" :model="form" label-width="120px" :rules="storyRules">

                    <!--<Sticky :className="'sub-navbar '+form.status">
                        <template v-if="fetchSuccess">
                            <el-button v-if="showButton" v-loading="loading" style="margin-left: 10px;" type="success" @click="dialogStory = true">新增剧情</el-button>
                            <el-button v-if="storyEdit" v-loading="loading" type="success" @click="onSubmit('form')">立即创建</el-button>
                        </template>
                        <template v-else>
                            <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
                        </template>

                    </Sticky>-->

                    <el-form-item label="主角:" prop="actor" style="margin-top: 40px">
                        <multiselect v-model="form.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                                     deselectLabel="" track-by="key" :internalSearch="false" label="key" :disabled="disable" style="width:200px">
                            <span slot='noResult'>无结果</span>
                        </multiselect>
                    </el-form-item>
                    <el-form-item label="剧情类型:" prop="type" style="margin-top: 40px">
                        <el-select v-model="form.type" placeholder="请选择" :disabled="disable" style="width:200px">
                            <el-option label="新手" value="1"></el-option>
                            <el-option label="主线" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="剧情标题:" prop="title" style="margin-top: 40px">
                        <el-input v-model="form.title" :disabled="disable" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item v-if="storyEdit">
                        <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                        <!--<el-button>取消</el-button>-->
                    </el-form-item>
                </el-form>
                <!--<Story v-if="storyEdit"></Story>-->
                <!--<div v-if="addBut" class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="listpageQuery.page"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="listpageQuery.limit"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total"
                            style="margin-bottom:20px;">
                    </el-pagination>
                </div>-->
                <!--<el-button type="primary" size="large" @click="addTab(editableTabsValue2)" style="margin:10px 0">新增天数</el-button>-->
                <!--<el-tabs v-model="activeName" type="card" editable @edit="addDay" @tab-remove="removeTab" @tab-click="selectDay">-->
                <el-tabs v-if="addBut" v-model="activeName"  editable @edit="addDay" @tab-click="selectDay">
                    <!--<el-tab-pane label="第一天" name="all">
                        <el-button type="primary" size="large" @click="dialogFormVisible=true" style="margin:10px 0">新增事件</el-button>
                    </el-tab-pane>
                    <el-tab-pane label="第二天" name="second">
                        <span style="margin:20px 20px 0 0;float:left;">分类ICON:</span>
                        <img src="../../../gifs/summer.jpg" class="image" style="margin:20px 0;">
                    </el-tab-pane>
                    <el-tab-pane label="第三天" name="third">
                        <span style="margin:20px 20px 0 0;float:left;">分类ICON:</span>
                        <img src="../../../gifs/fall.jpg" class="image" style="margin:20px 0;">
                    </el-tab-pane>
                    <el-tab-pane label="第四天" name="fourth">
                        <span style="margin:20px 20px 0 0;float:left;">分类ICON:</span>
                        <img src="../../../gifs/winter.jpg" class="image" style="margin:20px 0;">
                    </el-tab-pane>-->
                    <el-tab-pane v-for="(item, index) in editableTabs2" :key="item.name" :label="item.title" :name="item.name">
                        {{item.content}}
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <el-form ref="storyForm" :model="storyForm" label-width="150px" style="margin-top:20px;padding-top:20px;">
                <!--<el-form-item label="场景类型:" prop="select">
                    <el-select v-model="storyForm.select" placeholder="请选择活动区域" @change="selectScenes">
                        <el-option label="请选择" value="9"></el-option>
                        <el-option label="普通视频" value="1"></el-option>
                        <el-option label="交互视频" value="2"></el-option>
                        <el-option label="电话" value="3"></el-option>
                        <el-option label="文字聊天" value="4"></el-option>
                        <el-option label="语音聊天" value="5"></el-option>
                        <el-option label="图片聊天" value="6"></el-option>
                        <el-option label="小游戏" value="7"></el-option>
                        <el-option label="小视频" value="8"></el-option>
                    </el-select>
                </el-form-item>-->
                <!--<el-form-item v-if="addBut" label="对象:" prop="actor" style="width:280px">
                    <multiselect v-model="storyForm.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                                 deselectLabel="删除" track-by="key" :internalSearch="false" label="key">
                        <span slot='noResult'>无结果</span>
                    </multiselect>
                </el-form-item>
                <el-form-item v-if="addBut" label="剧情类型:">
                    <el-select v-model="storyForm.type" placeholder="请选择" @change="selectType">
                        <el-option label="新手" value="1"></el-option>
                        <el-option label="主线" value="2"></el-option>
                    </el-select>
                </el-form-item>-->
                <!--<el-form-item label="剧情标题:" prop="title" style="width:280px">
                    <el-input v-model="storyForm.title"></el-input>
                </el-form-item>-->
                <!--<el-form-item label="天:" prop="day" style="width:280px">
                    <el-input v-model="storyForm.day"></el-input>
                </el-form-item>
                <el-form-item label="步:" prop="step" style="width:280px">
                    <el-input v-model="storyForm.step"></el-input>
                </el-form-item>-->
                <template v-if="nVideo">
                    <el-form ref="normalVideo" :model="normalVideo" label-width="150px">
                        <el-form-item label="" prop="step">
                            <!--<span>第</span><el-input v-model="normalVideo.step" style="display: inline-block;width:30px" disabled></el-input><span>步</span>-->
                            <span style="display: inline-block;margin-left:-70px;margin-right:8px">第</span>{{ normalVideo.step }}</el-input><span style="display: inline-block;margin-left:8px;">步</span>
                        </el-form-item>
                        <!--<el-row>
                            <el-col :span="12">
                            </el-col>
                            <el-col :span="12">
                            </el-col>
                        </el-row>-->
                        <el-form-item label="场景类型:" prop="select" style="width:280px">
                            <el-select v-model="normalVideo.select" placeholder="请选择活动区域" @change="selectScenes" disabled>
                                <el-option label="请选择" value="9"></el-option>
                                <el-option label="普通视频" value="1"></el-option>
                                <el-option label="交互视频" value="2"></el-option>
                                <el-option label="电话" value="3"></el-option>
                                <el-option label="文字聊天" value="4"></el-option>
                                <el-option label="语音聊天" value="5"></el-option>
                                <el-option label="图片聊天" value="6"></el-option>
                                <el-option label="小游戏" value="7"></el-option>
                                <el-option label="小视频" value="8"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="普通视频:" prop="video">
                            <div style="margin-bottom: 20px;">
                                <Uploadvideo v-model="normalVideo.video" :progresses="progressesData"></Uploadvideo>
                                <!-- <video :src=normalVideo.video style="width:200px;height:280px" controls ></video>-->
                            </div>
                        </el-form-item>
                        <el-form-item label-width="50px" label="" class="postInfo-container-item" prop="" style="width:400px;margin-top:-30px">
                            <div v-show="progressesData.progress" style="">
                                <el-progress :percentage="progressesData.percentage" :status="progressesData.progressStatus"></el-progress>
                            </div>
                        </el-form-item>
                        <!--<el-form-item label="剧情标题:" prop="title" style="width:280px">
                            <el-input v-model="normalVideo.title"></el-input>
                        </el-form-item>-->
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="出现条件:" prop="condition" style="width:280px">
                                    <el-select v-model="normalVideo.condition" placeholder="请选择活动区域">
                                        <el-option v-for="item in conditions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="编辑事件:" prop="event" style="width:280px">
                                    <el-input v-model="normalVideo.event"></el-input>
                                </el-form-item>
                            </el-col>
                            <!--<el-col :span="8">
                            </el-col>-->
                        </el-row>
                        <el-form-item label="事件条件:" prop="resource">
                            <el-radio-group v-model="normalVideo.resource">
                                <el-radio label="1">和出现条件相同</el-radio>
                                <el-radio label="2">自定义</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="normalVideoModify">修改剧情</el-button>
                            <el-button type="primary" @click="normalVideoDelete">删除剧情</el-button>
                        </el-form-item>
                    </el-form>
                    <!--<hr width="96%" color="#999" style="margin-bottom:40px" />-->
                    <hr width="96%" style=" height:1px;border:none;border-top:1px dotted #185598;margin-bottom:25px" />
                </template>

                <template v-if="eVideo">
                    <el-form ref="eachVideo" :model="eachVideo" label-width="150px">
                        <!--<el-form-item label="步:" prop="step" style="width:280px">
                            <el-input v-model="eachVideo.step"></el-input>
                        </el-form-item>-->
                        <el-form-item label="" prop="step">
                            <!--<span>第</span><el-input v-model="normalVideo.step" style="display: inline-block;width:30px" disabled></el-input><span>步</span>-->
                            <span style="display: inline-block;margin-left:-70px;margin-right:8px">第</span>{{ eachVideo.step }}</el-input><span style="display: inline-block;margin-left:8px;">步</span>
                        </el-form-item>
                        <!--<el-row>
                            <el-col :span="12">
                            </el-col>
                            <el-col :span="12">
                            </el-col>
                        </el-row>-->
                        <el-form-item label="场景类型:" prop="select" style="width:280px">
                            <el-select v-model="eachVideo.select" placeholder="请选择活动区域" @change="selectScenes" disabled>
                                <el-option label="请选择" value="9"></el-option>
                                <el-option label="普通视频" value="1"></el-option>
                                <el-option label="交互视频" value="2"></el-option>
                                <el-option label="电话" value="3"></el-option>
                                <el-option label="文字聊天" value="4"></el-option>
                                <el-option label="语音聊天" value="5"></el-option>
                                <el-option label="图片聊天" value="6"></el-option>
                                <el-option label="小游戏" value="7"></el-option>
                                <el-option label="小视频" value="8"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="开始视频:" prop="startVideo">
                            <div style="margin-bottom: 20px;">
                                <Uploadvideo v-model="eachVideo.startVideo" :progresses="progressesData"></Uploadvideo>
                                <!--<video :src=eachVideo.startVideo style="width:200px;height:280px" controls ></video>-->
                            </div>
                        </el-form-item>
                        <el-form-item label-width="50px" label="" class="postInfo-container-item" prop="" style="width:400px;margin-top:-30px">
                            <div v-show="progressesData.progress" style="">
                                <el-progress :percentage="progressesData.percentage" :status="progressesData.progressStatus"></el-progress>
                            </div>
                        </el-form-item>
                        <!--<el-row>
                            <el-col :span="12">
                            </el-col>
                            <el-col :span="12">
                            </el-col>
                        </el-row>-->
                        <el-form-item label="选择一视频:" prop="selectVideo1">
                            <div style="margin-bottom: 20px;">
                                <Uploadvideo v-model="eachVideo.selectVideo1" :progresses="progressesData"></Uploadvideo>
                                <!--<video :src=eachVideo.selectVideo1 style="width:200px;height:280px" controls ></video>-->
                            </div>
                        </el-form-item>
                        <el-form-item label-width="50px" label="" class="postInfo-container-item" prop="" style="width:400px;margin-top:-30px">
                            <div v-show="progressesData.progress" style="">
                                <el-progress :percentage="progressesData.percentage" :status="progressesData.progressStatus"></el-progress>
                            </div>
                        </el-form-item>
                        <el-form-item label="选择二视频:" prop="selectVideo2">
                            <div style="margin-bottom: 20px;">
                                <Uploadvideo v-model="eachVideo.selectVideo2" :progresses="progressesData"></Uploadvideo>
                                <!--<video :src=eachVideo.selectVideo2 style="width:200px;height:280px" controls ></video>-->
                            </div>
                        </el-form-item>
                        <el-form-item label-width="50px" label="" class="postInfo-container-item" prop="" style="width:400px;margin-top:-30px">
                            <div v-show="progressesData.progress" style="">
                                <el-progress :percentage="progressesData.percentage" :status="progressesData.progressStatus"></el-progress>
                            </div>
                        </el-form-item>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="交互文字:" prop="eachWord" style="width:280px">
                                    <el-input v-model="eachVideo.eachWord"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="回答一:" prop="answer1" style="width:280px">
                                    <el-input v-model="eachVideo.answer1"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="回答二:" prop="answer2" style="width:280px">
                                    <el-input v-model="eachVideo.answer2"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="出现条件:" prop="condition" style="width:280px">
                                    <el-select v-model="eachVideo.condition" placeholder="请选择活动区域">
                                        <el-option v-for="item in conditions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="编辑事件:" prop="event" style="width:280px">
                                    <el-input v-model="eachVideo.event"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">

                            </el-col>
                        </el-row>
                        <el-form-item label="事件条件:" prop="resource">
                            <el-radio-group v-model="eachVideo.resource">
                                <el-radio label="1">和出现条件相同</el-radio>
                                <el-radio label="2">自定义</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <!--<el-form-item label="剧情标题:" prop="title" style="width:280px">
                            <el-input v-model="eachVideo.title"></el-input>
                        </el-form-item>-->
                        <el-form-item>
                            <el-button type="primary" @click="eachVideoModify">修改剧情</el-button>
                            <el-button type="primary" @click="eachVideoDelete">删除剧情</el-button>
                        </el-form-item>
                    </el-form>
                    <!--<hr width="96%" color="#999" style="margin-bottom:40px" />-->
                    <hr width="96%" style=" height:1px;border:none;border-top:1px dotted #185598;margin-bottom:25px" />
                </template>

                <template v-if="tel">
                    <el-form ref="phone" :model="phone" label-width="150px">
                        <!--<el-form-item label="步:" prop="step" style="width:280px">
                            <el-input v-model="phone.step"></el-input>
                        </el-form-item>-->
                        <el-form-item label="" prop="step">
                            <!--<span>第</span><el-input v-model="normalVideo.step" style="display: inline-block;width:30px" disabled></el-input><span>步</span>-->
                            <span style="display: inline-block;margin-left:-70px;margin-right:8px">第</span>{{ phone.step }}</el-input><span style="display: inline-block;margin-left:8px;">步</span>
                        </el-form-item>
                        <el-form-item label="场景类型:" prop="select" style="width:280px">
                            <el-select v-model="phone.select" placeholder="请选择活动区域" @change="selectScenes" disabled>
                                <el-option label="请选择" value="9"></el-option>
                                <el-option label="普通视频" value="1"></el-option>
                                <el-option label="交互视频" value="2"></el-option>
                                <el-option label="电话" value="3"></el-option>
                                <el-option label="文字聊天" value="4"></el-option>
                                <el-option label="语音聊天" value="5"></el-option>
                                <el-option label="图片聊天" value="6"></el-option>
                                <el-option label="小游戏" value="7"></el-option>
                                <el-option label="小视频" value="8"></el-option>
                            </el-select>
                        </el-form-item>
                        <!--<el-form-item label="剧情标题:" prop="title" style="width:280px">
                            <el-input v-model="phone.title"></el-input>
                        </el-form-item>-->
                        <el-form-item label="电话:" prop="speak">
                            <div style="margin-bottom: 20px;">
                                <Uploadaudio v-model="phone.speak"></Uploadaudio>
                            </div>
                        </el-form-item>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="交互文字:" prop="eachWord" style="width:280px">
                                    <el-input v-model="phone.eachWord"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="接听:" prop="answer" style="width:280px">
                                    <el-input v-model="phone.answer"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="取消:" prop="cancel" style="width:280px">
                                    <el-input v-model="phone.cancel"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="出现条件:" prop="condition" style="width:280px">
                                    <el-select v-model="phone.condition" placeholder="请选择活动区域">
                                        <el-option v-for="item in conditions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="编辑事件:" prop="event" style="width:280px">
                                    <el-input v-model="phone.event"></el-input>
                                </el-form-item>
                            </el-col>
                            <!--<el-col :span="8">
                            </el-col>-->
                        </el-row>
                        <el-form-item label="事件条件:" prop="resource">
                            <el-radio-group v-model="phone.resource">
                                <el-radio label="1">和出现条件相同</el-radio>
                                <el-radio label="2">自定义</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="phoneModify">修改剧情</el-button>
                            <el-button type="primary" @click="phoneDelete">删除剧情</el-button>
                        </el-form-item>
                    </el-form>
                    <!--<hr width="96%" color="#999" style="margin-bottom:40px" />-->
                    <hr width="96%" style=" height:1px;border:none;border-top:1px dotted #185598;margin-bottom:25px" />
                </template>

                <template v-if="wTalk">
                    <el-form ref="wordTalk" :model="wordTalk" label-width="150px">
                        <!--<el-form-item label="步:" prop="step" style="width:280px">
                            <el-input v-model="wordTalk.step"></el-input>
                        </el-form-item>-->
                        <el-form-item label="" prop="step">
                            <!--<span>第</span><el-input v-model="normalVideo.step" style="display: inline-block;width:30px" disabled></el-input><span>步</span>-->
                            <span style="display: inline-block;margin-left:-70px;margin-right:8px">第</span>{{ wordTalk.step }}</el-input><span style="display: inline-block;margin-left:8px;">步</span>
                        </el-form-item>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="场景类型:" prop="select" style="width:280px">
                                    <el-select v-model="wordTalk.select" placeholder="请选择活动区域" @change="selectScenes" disabled>
                                        <el-option label="请选择" value="9"></el-option>
                                        <el-option label="普通视频" value="1"></el-option>
                                        <el-option label="交互视频" value="2"></el-option>
                                        <el-option label="电话" value="3"></el-option>
                                        <el-option label="文字聊天" value="4"></el-option>
                                        <el-option label="语音聊天" value="5"></el-option>
                                        <el-option label="图片聊天" value="6"></el-option>
                                        <el-option label="小游戏" value="7"></el-option>
                                        <el-option label="小视频" value="8"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="文字内容:" prop="wordContent" style="width:280px">
                                    <el-input v-model="wordTalk.wordContent"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="回复一:" prop="answer1" style="width:280px">
                                    <el-input v-model="wordTalk.answer1"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="回复二:" prop="answer2" style="width:280px">
                                    <el-input v-model="wordTalk.answer2"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="回复三:" prop="answer3" style="width:280px">
                                    <el-input v-model="wordTalk.answer3"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="回复四:" prop="answer4" style="width:280px">
                                    <el-input v-model="wordTalk.answer4"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="回复五:" prop="answer5" style="width:280px">
                                    <el-input v-model="wordTalk.answer5"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="出现条件:" prop="condition" style="width:280px">
                                    <el-select v-model="wordTalk.condition" placeholder="请选择活动区域">
                                        <el-option v-for="item in conditions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="编辑事件:" prop="event" style="width:280px">
                                    <el-input v-model="wordTalk.event"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!--<el-form-item label="剧情标题:" prop="title" style="width:280px">
                            <el-input v-model="wordTalk.title"></el-input>
                        </el-form-item>-->
                        <el-form-item label="事件条件:" prop="resource">
                            <el-radio-group v-model="wordTalk.resource">
                                <el-radio label="1">和出现条件相同</el-radio>
                                <el-radio label="2">自定义</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="wordTalkModify">修改剧情</el-button>
                            <el-button type="primary" @click="wordTalkDelete">删除剧情</el-button>
                        </el-form-item>
                    </el-form>
                    <!--<hr width="96%" color="#999" style="margin-bottom:40px" />-->
                    <hr width="96%" style=" height:1px;border:none;border-top:1px dotted #185598;margin-bottom:25px" />
                </template>

                <template v-if="sTalk">
                    <el-form ref="soundTalk" :model="soundTalk" label-width="150px">
                        <!--<el-form-item label="步:" prop="step" style="width:280px">
                            <el-input v-model="soundTalk.step"></el-input>
                        </el-form-item>-->
                        <el-form-item label="" prop="step">
                            <!--<span>第</span><el-input v-model="normalVideo.step" style="display: inline-block;width:30px" disabled></el-input><span>步</span>-->
                            <span style="display: inline-block;margin-left:-70px;margin-right:8px">第</span>{{ soundTalk.step }}</el-input><span style="display: inline-block;margin-left:8px;">步</span>
                        </el-form-item>
                        <el-form-item label="场景类型:" prop="select" style="width:280px">
                            <el-select v-model="soundTalk.select" placeholder="请选择活动区域" @change="selectScenes" disabled>
                                <el-option label="请选择" value="9"></el-option>
                                <el-option label="普通视频" value="1"></el-option>
                                <el-option label="交互视频" value="2"></el-option>
                                <el-option label="电话" value="3"></el-option>
                                <el-option label="文字聊天" value="4"></el-option>
                                <el-option label="语音聊天" value="5"></el-option>
                                <el-option label="图片聊天" value="6"></el-option>
                                <el-option label="小游戏" value="7"></el-option>
                                <el-option label="小视频" value="8"></el-option>
                            </el-select>
                        </el-form-item>
                        <!--<el-form-item label="剧情标题:" prop="title" style="width:280px">
                            <el-input v-model="soundTalk.title"></el-input>
                        </el-form-item>-->
                        <el-form-item label="语言聊天:" prop="sound">
                            <div style="margin-bottom: 20px;">
                                <Uploadaudio v-model="soundTalk.sound"></Uploadaudio>
                            </div>
                        </el-form-item>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="回复一:" prop="answer1" style="width:280px">
                                    <el-input v-model="soundTalk.answer1"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="回复二:" prop="answer2" style="width:280px">
                                    <el-input v-model="soundTalk.answer2"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="回复三:" prop="answer3" style="width:280px">
                                    <el-input v-model="soundTalk.answer3"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="回复四:" prop="answer4" style="width:280px">
                                    <el-input v-model="soundTalk.answer4"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="回复五:" prop="answer5" style="width:280px">
                                    <el-input v-model="soundTalk.answer5"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="出现条件:" prop="condition" style="width:280px">
                                    <el-select v-model="soundTalk.condition" placeholder="请选择活动区域">
                                        <el-option v-for="item in conditions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="编辑事件:" prop="event" style="width:280px">
                            <el-input v-model="soundTalk.event"></el-input>
                        </el-form-item>
                        <el-form-item label="事件条件:" prop="resource">
                            <el-radio-group v-model="soundTalk.resource">
                                <el-radio label="1">和出现条件相同</el-radio>
                                <el-radio label="2">自定义</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="soundTalkModify">修改剧情</el-button>
                            <el-button type="primary" @click="soundTalkDelete">删除剧情</el-button>
                        </el-form-item>
                    </el-form>
                    <!--<hr width="96%" color="#999" style="margin-bottom:40px" />-->
                    <hr width="96%" style=" height:1px;border:none;border-top:1px dotted #185598;margin-bottom:25px" />
                </template>

                <template v-if="pTalk">
                    <el-form ref="picTalk" :model="picTalk" label-width="150px">
                        <!--<el-form-item label="步:" prop="step" style="width:280px">
                            <el-input v-model="picTalk.step"></el-input>
                        </el-form-item>-->
                        <el-form-item label="" prop="step">
                            <!--<span>第</span><el-input v-model="normalVideo.step" style="display: inline-block;width:30px" disabled></el-input><span>步</span>-->
                            <span style="display: inline-block;margin-left:-70px;margin-right:8px">第</span>{{ picTalk.step }}</el-input><span style="display: inline-block;margin-left:8px;">步</span>
                        </el-form-item>
                        <el-form-item label="场景类型:" prop="select" style="width:280px">
                            <el-select v-model="picTalk.select" placeholder="请选择活动区域" @change="selectScenes" disabled>
                                <el-option label="请选择" value="9"></el-option>
                                <el-option label="普通视频" value="1"></el-option>
                                <el-option label="交互视频" value="2"></el-option>
                                <el-option label="电话" value="3"></el-option>
                                <el-option label="文字聊天" value="4"></el-option>
                                <el-option label="语音聊天" value="5"></el-option>
                                <el-option label="图片聊天" value="6"></el-option>
                                <el-option label="小游戏" value="7"></el-option>
                                <el-option label="小视频" value="8"></el-option>
                            </el-select>
                        </el-form-item>
                        <!--<el-form-item label="剧情标题:" prop="title" style="width:280px">
                            <el-input v-model="picTalk.title"></el-input>
                        </el-form-item>-->
                        <el-form-item label="图片聊天:" prop="pic">
                            <div style="margin-bottom: 20px;">
                                <Upload v-model="picTalk.pic"></Upload>
                            </div>
                        </el-form-item>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="回复一:" prop="answer1" style="width:280px">
                                    <el-input v-model="picTalk.answer1"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="回复二:" prop="answer2" style="width:280px">
                                    <el-input v-model="picTalk.answer2"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="回复三:" prop="answer3" style="width:280px">
                                    <el-input v-model="picTalk.answer3"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="回复四:" prop="answer4" style="width:280px">
                                    <el-input v-model="picTalk.answer4"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="回复五:" prop="answer5" style="width:280px">
                                    <el-input v-model="picTalk.answer5"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="出现条件:" prop="condition" style="width:280px">
                                    <el-select v-model="picTalk.condition" placeholder="请选择活动区域">
                                        <el-option v-for="item in conditions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="编辑事件:" prop="event" style="width:280px">
                            <el-input v-model="picTalk.event"></el-input>
                        </el-form-item>
                        <el-form-item label="事件条件:" prop="resource">
                            <el-radio-group v-model="picTalk.resource">
                                <el-radio label="1">和出现条件相同</el-radio>
                                <el-radio label="2">自定义</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="picTalkModify">修改剧情</el-button>
                            <el-button type="primary" @click="picTalkDelete">删除剧情</el-button>
                        </el-form-item>
                    </el-form>
                    <!--<hr width="96%" color="#999" style="margin-bottom:40px" />-->
                    <hr width="96%" style=" height:1px;border:none;border-top:1px dotted #185598;margin-bottom:25px" />
                </template>

                <template v-if="game">
                    <el-form ref="games" :model="games" label-width="150px">
                        <!--<el-form-item label="步:" prop="step" style="width:280px">
                            <el-input v-model="games.step"></el-input>
                        </el-form-item>-->
                        <el-form-item label="" prop="step">
                            <!--<span>第</span><el-input v-model="normalVideo.step" style="display: inline-block;width:30px" disabled></el-input><span>步</span>-->
                            <span style="display: inline-block;margin-left:-70px;margin-right:8px">第</span>{{ games.step }}</el-input><span style="display: inline-block;margin-left:8px;">步</span>
                        </el-form-item>
                        <el-form-item label="场景类型:" prop="select" style="width:280px">
                            <el-select v-model="games.select" placeholder="请选择活动区域" @change="selectScenes" disabled>
                                <el-option label="请选择" value="9"></el-option>
                                <el-option label="普通视频" value="1"></el-option>
                                <el-option label="交互视频" value="2"></el-option>
                                <el-option label="电话" value="3"></el-option>
                                <el-option label="文字聊天" value="4"></el-option>
                                <el-option label="语音聊天" value="5"></el-option>
                                <el-option label="图片聊天" value="6"></el-option>
                                <el-option label="小游戏" value="7"></el-option>
                                <el-option label="小视频" value="8"></el-option>
                            </el-select>
                        </el-form-item>
                        <!--<el-form-item label="剧情标题:" prop="title" style="width:280px">
                            <el-input v-model="games.title"></el-input>
                        </el-form-item>-->
                        <el-form-item label="游戏类型:">
                            <el-select v-model="games.region" placeholder="请选择">
                                <el-option label="猜拳" value="1"></el-option>
                                <el-option label="玩骰子" value="2"></el-option>
                                <el-option label="猜硬币" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="出现条件:" prop="condition" style="width:280px">
                            <el-select v-model="games.condition" placeholder="请选择活动区域">
                                <el-option v-for="item in conditions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="编辑事件:" prop="event" style="width:280px">
                            <el-input v-model="games.event"></el-input>
                        </el-form-item>
                        <el-form-item label="事件条件:" prop="resource">
                            <el-radio-group v-model="games.resource">
                                <el-radio label="1">和出现条件相同</el-radio>
                                <el-radio label="2">自定义</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="gamesModify">修改剧情</el-button>
                            <el-button type="primary" @click="gamesDelete">删除剧情</el-button>
                        </el-form-item>
                    </el-form>
                    <!--<hr width="96%" color="#999" style="margin-bottom:40px" />-->
                    <hr width="96%" style=" height:1px;border:none;border-top:1px dotted #185598;margin-bottom:25px" />
                </template>

                <template v-if="sVideo">
                    <el-form ref="smallVideo" :model="smallVideo" label-width="150px">
                        <!--<el-form-item label="步:" prop="step" style="width:280px">
                            <el-input v-model="smallVideo.step"></el-input>
                        </el-form-item>-->
                        <el-form-item label="" prop="step">
                            <!--<span>第</span><el-input v-model="normalVideo.step" style="display: inline-block;width:30px" disabled></el-input><span>步</span>-->
                            <span style="display: inline-block;margin-left:-70px;margin-right:8px">第</span>{{ smallVideo.step }}</el-input><span style="display: inline-block;margin-left:8px;">步</span>
                        </el-form-item>
                        <el-form-item label="场景类型:" prop="select" style="width:280px">
                            <el-select v-model="smallVideo.select" placeholder="请选择活动区域" @change="selectScenes" disabled>
                                <el-option label="请选择" value="9"></el-option>
                                <el-option label="普通视频" value="1"></el-option>
                                <el-option label="交互视频" value="2"></el-option>
                                <el-option label="电话" value="3"></el-option>
                                <el-option label="文字聊天" value="4"></el-option>
                                <el-option label="语音聊天" value="5"></el-option>
                                <el-option label="图片聊天" value="6"></el-option>
                                <el-option label="小游戏" value="7"></el-option>
                                <el-option label="小视频" value="8"></el-option>
                            </el-select>
                        </el-form-item>
                        <!--<el-form-item label="剧情标题:" prop="title" style="width:280px">
                            <el-input v-model="smallVideo.title"></el-input>
                        </el-form-item>-->
                        <el-form-item label="小视频:" prop="video">
                            <div style="margin-bottom: 20px;">
                                <Uploadvideo v-model="smallVideo.video" :progresses="progressesData"></Uploadvideo>
                                <!--<video :src=smallVideo.video style="width:200px;height:280px" controls ></video>-->
                            </div>
                        </el-form-item>
                        <el-form-item label-width="50px" label="" class="postInfo-container-item" prop="" style="width:400px;margin-top:-30px">
                            <div v-show="progressesData.progress" style="">
                                <el-progress :percentage="progressesData.percentage" :status="progressesData.progressStatus"></el-progress>
                            </div>
                        </el-form-item>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="回复一:" prop="answer1" style="width:280px">
                                    <el-input v-model="smallVideo.answer1"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="回复二:" prop="answer2" style="width:280px">
                                    <el-input v-model="smallVideo.answer2"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="回复三:" prop="answer3" style="width:280px">
                                    <el-input v-model="smallVideo.answer3"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="回复四:" prop="answer4" style="width:280px">
                                    <el-input v-model="smallVideo.answer4"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="回复五:" prop="answer5" style="width:280px">
                                    <el-input v-model="smallVideo.answer5"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="出现条件:" prop="condition" style="width:280px">
                                    <el-select v-model="smallVideo.condition" placeholder="请选择活动区域">
                                        <el-option v-for="item in conditions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="编辑事件:" prop="event" style="width:280px">
                            <el-input v-model="smallVideo.event"></el-input>
                        </el-form-item>
                        <el-form-item label="事件条件:" prop="resource">
                            <el-radio-group v-model="smallVideo.resource">
                                <el-radio label="1">和出现条件相同</el-radio>
                                <el-radio label="2">自定义</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="smallVideoModify">修改剧情</el-button>
                            <el-button type="primary" @click="smallVideoDelete">删除剧情</el-button>
                        </el-form-item>
                    </el-form>
                    <!--<hr width="96%" color="#999" style="margin-bottom:40px" />-->
                    <hr width="96%" style=" height:1px;border:none;border-top:1px dotted #185598;margin-bottom:25px" />
                </template>

                <el-form-item v-if="showButton">
                    <el-button type="primary" @click="dialogStory = true">新增剧情</el-button>
                </el-form-item>
            </el-form>
            <!--<el-dialog title="新增剧情" :visible.sync="dialogClass" size="tiny">
                <el-input v-model="addEvent" size="small" placeholder="请输入事件名称" autofocus style="width:200px;"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogClass = false">取 消</el-button>
                    <el-button type="primary" @click="addClick">确 定</el-button>
                </span>
            </el-dialog>-->
            <el-dialog title="新增剧情" :visible.sync="dialogStory" size="small">
                <!--<Story :id="storyId" v-on:listener="listenAdd"></Story>-->
                <Story :id="storyId" :type="storyType" :day="storyDay" :title="storyTitle" :actorSelect="storyActor" v-on:close="dialogClose"></Story>
                <!--<span slot="footer" class="dialog-footer">
                    <el-button @click="dialogStory = false">取 消</el-button>
                    <el-button type="primary" @click="addStoryClick">确 定</el-button>
                </span>-->
            </el-dialog>
            <!--<el-dialog title="确定删除" :visible.sync="dialogStoryDel" size="tiny">
                <el-button @click="dialogStoryDel = false">取 消</el-button>
                <el-button type="primary" @click="storyClickDel">确 定</el-button>
            </el-dialog>-->
        </div>
    </div>
</template>

<script type="text/ECMAScript-6">
    import Tinymce from 'components/Tinymce'
    import Upload from 'components/Upload/singleImage3'
    import Uploadvideo from 'components/Upload/video'
    import Uploadaudio from 'components/Upload/audio'
    import Story from 'components/story/mainstoryEdits'
    import MDinput from 'components/MDinput';
    import { validateURL } from 'utils/validate';
    import { userSearch } from 'api/story';
    import { addstory } from 'api/story';
    import { storydel } from 'api/story';
    import { storyListall } from 'api/story';
    import { storyPage } from 'api/story';
    import { addstoryday } from 'api/story';
    import { videoUpdate } from 'api/story';
    import { videoInterUpdate } from 'api/story';
    import { talkUpdate } from 'api/story';
    import { pictureUpdate } from 'api/story';
    import { radioUpdate } from 'api/story';
    import { telUpdate } from 'api/story';
    import { gameUpdate } from 'api/story';
    import { tvUpdate } from 'api/story';

    export default {
        name: 'clothes',
        components: { Tinymce, MDinput, Upload, Story, Uploadvideo, Uploadaudio },
        data() {
            const validateRequire = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('输入不能为空'));
                } else {
                    callback()
                }
            };
            return {
                loading: false,
                fetchSuccess: true,
                addEvent: '',
                storyEdit: false,
                storyId:'',
                storyType: '',
                storyDay: '',
                storyTitle: '',
                storyActor: '',
                listQuery: {},
                listpageQuery: {
                    page: 1,
                    limit: 20
                },
                userLIstOptions: [],
                progressesData: {
                    percentage: 25,
                    progress: false
                },
                progressStatus: '',
                nVideo: false,
                eVideo: false,
                wTalk: false,
                pTalk: false,
                sTalk: false,
                tel: false,
                game: false,
                sVideo: false,
                addBut: false,
                showButton: false,
                disable: false,
                form : {
                    actor: '',
                    type: '1',
                    title: '',
                },
                storyForm: {
                    select: '9',
                    actor: '',
                    actorid: '',
                    type: '1',
                    title: '',
                    day: '',
                    step: '',
                },
                conditions: [{
                    value: 1,
                    label: '上一步结束'
                },{
                    value: 2,
                    label: '无'
                }],
                normalVideo: {
                    step: '',
                    select: '',
                    title: '',
                    video: '',
                    condition: '',
                    event: '',
                    resource: ''
                },
                eachVideo: {
                    step: '',
                    select: '',
                    title: '',
                    startVideo: '',
                    selectVideo1: '',
                    selectVideo2: '',
                    eachWord: '',
                    answer1: '',
                    answer2: '',
                    condition: '',
                    event: '',
                    resource: ''
                },
                wordTalk: {
                    step: '',
                    select: '',
                    title: '',
                    wordContent: '',
                    answer1: '',
                    answer2: '',
                    answer3: '',
                    answer4: '',
                    answer5: '',
                    condition: '',
                    event: '',
                    resource: ''
                },
                picTalk: {
                    step: '',
                    select: '',
                    title: '',
                    pic: '',
                    answer1: '',
                    answer2: '',
                    answer3: '',
                    answer4: '',
                    answer5: '',
                    condition: '',
                    event: '',
                    resource: ''
                },
                soundTalk: {
                    step: '',
                    select: '',
                    title: '',
                    sound: '',
                    answer1: '',
                    answer2: '',
                    answer3: '',
                    answer4: '',
                    answer5: '',
                    condition: '',
                    event: '',
                    resource: ''
                },
                phone: {
                    step: '',
                    select: '',
                    title: '',
                    speak: '',
                    eachWord: '',
                    answer: '',
                    cancel: '',
                    condition: '',
                    event: '',
                    resource: ''
                },
                games: {
                    step: '',
                    select: '',
                    title: '',
                    region: '',
                    condition: '',
                    event: '',
                    resource: ''
                },
                smallVideo: {
                    step: '',
                    select: '',
                    title: '',
                    video: '',
                    answer1: '',
                    answer2: '',
                    answer3: '',
                    answer4: '',
                    answer5: '',
                    condition: '',
                    event: '',
                    resource: ''
                },
                dialogClass:false,
                dialogStory: false,
                dialogStoryDel: false,
                //currentPage: 1,
                clothesValue: '',
                editableTabsValue2: 1,
                editableTabs2: [],
                tabIndex: 0,
                dialogFormVisible: false,
                classify: {
                    name: '',
                    upload:'',
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                activeName: '1',
                total: null,
                list: [],
                storyRules:{
                    actor: [{ required: true, message: '请选择主角' }],
                    type: [{ required: true, message: '请选择剧情类型' }],
                    title: [{ required: true, message: '请输入剧情标题' }]
                }
            }
        },
        created () {
            //alert(this.editableTabs2);
            //alert(this.$route.params.num)
            let Query = {};
            this.getRemoteUserList(Query);
            if(this.$route.params && this.$route.params.num != ':num'){
                //let listQuery={};
                //this.listQuery.id = this.$route.params.num;
                //this.listQuery.day = this.storyForm.day;
                //this.listQuery.plottype = this.storyForm.type;
                //this.listQuery.name = this.storyForm.actor;
                this.form.actor = { key:this.$route.params.actorname, value:this.$route.params.actorid };
                this.form.type = this.$route.params.type;
                this.form.title = this.$route.params.title;
                this.addBut = true;
                this.disable = true;
                this.listQuery.actorid = this.$route.params.actorid;
                this.listQuery.plottype = this.$route.params.type;
                this.listQuery.day = 1;
                this.fetchData(this.listQuery);
                this.storyType = this.$route.params.type;
                this.storyTitle = this.$route.params.title;
                this.storyDay = '1';
                this.storyId = this.$route.params.num;
                this.storyActor ={key: this.$route.params.actorname, value: this.$route.params.actorid};
                this.getList();
            }
            if(this.$route.params.num == ':num'){
                this.addBut = false;
                this.disable = false;
                this.storyEdit = true;
                this.form.actor = '';
                this.form.type = '';
                this.form.title = '';
            }
            this.listpageQuery.plottype = this.$route.params.type;
            this.listpageQuery.actorid = this.$route.params.actorid;
            //this.getList();
            //this.fetchData(this.listQuery);
        },
        /*watch: {
            storyDay () {
                this.fetchData(this.listQuery);
            }
        },*/
        methods : {
            dialogClose (data) {
                this.dialogStory = false;
                this.fetchData(this.listQuery);
                //this.dialogStory = data;
                //alert(data);
            },
            onSubmit () {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.listLoading = true;
                        let data = {
                            type: parseInt(this.form.type),
                            title: this.form.title,
                            actorid: parseInt(this.form.actor.value),
                            status: 'published'
                        };
                        addstory(data).then(response => {
                            if (response.data.code == 200) {
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                //this.postForm.status = 'published';
                                //this.$refs[formName].resetFields();
                            }
                            if (response.data.msg == 'add duplicate story!') {
                                this.$message({
                                    message: '该剧情已存在',
                                    type: 'error'
                                });
                            }
                            this.listLoading = false;
                        });
                    } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
            },
            addDay (targetName, action) {
                if (action === 'add') {
                    this.listLoading = true;
                    this.showButton = true;
                    let data = {
                        id: parseInt(this.$route.params.num),
                        actorid: parseInt(this.$route.params.actorid)
                    }
                    addstoryday(data).then(response => {
                        if (response.data.code == 200) {
                            if (action === 'add') {
                                let newTabName = response.data + '';
                                this.editableTabs2.push({
                                    title: "第" + response.data.day + "天",
                                    name: newTabName,
                                    content: ''
                                });
                                this.activeName = newTabName;
                                this.storyDay = response.data.day;
                                this.listQuery.day = response.data.day;
                                //this.fetchData(this.listQuery);
                                this.nVideo = false;
                                this.eVideo = false;
                                this.wTalk = false;
                                this.pTalk = false;
                                this.sTalk = false;
                                this.tel = false;
                                this.game = false;
                                this.sVideo = false;
                            }
                        }
                        this.editableTabsValue2 = '1';
                        this.listLoading = false;
                    });
                    this.dialogStory = true;
                }
                if (action === 'remove') {
                    this.$message.error('不可删除!');
                }
            },
            getList() {
                this.listLoading = true;
                storyPage (this.listpageQuery).then(response => {
                    this.total = response.data.content.total;
                    if (this.editableTabs2) {
                        this.editableTabs2 = [];
                        for(let i=0;i<response.data.content.data.length;i++){
                            this.editableTabs2.push({
                                title: "第"+response.data.content.data[i].day+"天",
                                name: (i+1).toString(),
                                content: ''
                            });
                        }
                    }
                    if (response.data.content.data != '') {
                        this.showButton = true;
                    }
                    this.editableTabsValue2='1';
                    this.listLoading = false;
                })
            },
            fetchData(listQuery){
                storyListall (listQuery).then(response => {
                    if (response.data.content) {
                        if (response.data.content != '') {
                            this.storyId = response.data.content[0].id;
                            if (response.data.content[0].day) {
                                this.showButton = true;
                            } else {
                                this.showButton = false;
                            }
                        }
                        //this.postForm.actor.value = response.data.content.actorid;
                        /*this.storyForm.actor = { key:response.data.content[0].name, value:response.data.content[0].actorid };
                         this.storyForm.select = response.data.content[0].msgtype;
                         this.storyForm.type = response.data.content[0].plottype;
                         this.storyForm.title = response.data.content[0].title;
                         this.storyForm.day = response.data.content[0].day;
                         this.storyForm.step = response.data.content[0].step;
                         this.list = response.data.content;*/
                        if (response.data.content.length == 0) {
                            //普通视频初始化
                            this.normalVideo.step = '';
                            this.normalVideo.title = '';
                            this.normalVideo.video = '';
                            //交互视频初始化
                            this.eachVideo.step = '';
                            this.eachVideo.title = '';
                            this.eachVideo.startVideo = '';
                            this.eachVideo.selectVideo1 = '';
                            this.eachVideo.selectVideo2 = '';
                            this.eachVideo.eachWord = '';
                            this.eachVideo.answer1 = '';
                            this.eachVideo.answer2 = '';
                            //电话初始化
                            this.phone.title = '';
                            this.phone.speak = '';
                            this.phone.eachWord = '';
                            this.phone.answer = '';
                            this.phone.cancel = '';
                            //文字聊天初始化
                            this.wordTalk.title = '';
                            this.wordTalk.wordContent = '';
                            this.wordTalk.answer1 = '';
                            this.wordTalk.answer2 = '';
                            this.wordTalk.answer3 = '';
                            this.wordTalk.answer4 = '';
                            this.wordTalk.answer5 = '';
                            //语音聊天初始化
                            this.soundTalk.title = '';
                            this.soundTalk.sound = '';
                            this.soundTalk.answer1 = '';
                            this.soundTalk.answer2 = '';
                            this.soundTalk.answer3 = '';
                            this.soundTalk.answer4 = '';
                            this.soundTalk.answer5 = '';
                            //图片聊天初始化
                            this.picTalk.title = '';
                            this.picTalk.pic = '';
                            this.picTalk.answer1 = '';
                            this.picTalk.answer2 = '';
                            this.picTalk.answer3 = '';
                            this.picTalk.answer4 = '';
                            this.picTalk.answer5 = '';
                            //小游戏初始化
                            this.games.title = '';
                            this.games.region = '';
                            //小视频初始化
                            this.smallVideo.title = '';
                            this.smallVideo.video = '';
                            this.smallVideo.answer1 = '';
                            this.smallVideo.answer2 = '';
                            this.smallVideo.answer3 = '';
                            this.smallVideo.answer4 = '';
                            this.smallVideo.answer5 = '';
                        }
                        for(let i=0;i<response.data.content.length;i++){
                            if(response.data.content[i].msgtype == 1){
                                this.nVideo = true;
                                this.normalVideo.select = '普通视频';
                                this.storyForm.actor = { key:response.data.content[i].name, value:response.data.content[i].actorid };
                                //if(response.data.content[i].plottype == this.storyForm.type && this.storyForm.actor.key){
                                this.normalVideo.step = response.data.content[i].step;
                                this.normalVideo.title = response.data.content[i].title;
                                this.normalVideo.video = response.data.content[i].msg;
                                this.normalVideo.condition = response.data.content[i].condition;
                                this.normalVideo.event = response.data.content[i].event;
                                this.normalVideo.resource = response.data.content[i].event_condition.toString();
                                /*this.editableTabs2 = [{
                                 title : "第"+response.data.content[i].day+"天",
                                 name : response.data.content[i].day
                                 }];*/
                                //}
                            }
                            if(response.data.content[i].msgtype == 2){
                                this.eVideo = true;
                                this.eachVideo.select = '交互视频';
                                this.storyForm.actor = { key:response.data.content[i].name, value:response.data.content[i].actorid };
                                //if(response.data.content[i].plottype == this.storyForm.type && this.storyForm.actor.key){
                                this.eachVideo.step = response.data.content[i].step;
                                this.eachVideo.title = response.data.content[i].title;
                                this.eachVideo.startVideo = response.data.content[i].msg;
                                this.eachVideo.selectVideo1 = response.data.content[i].ivurl1;
                                this.eachVideo.selectVideo2 = response.data.content[i].ivurl2;
                                this.eachVideo.eachWord = response.data.content[i].ivmsg;
                                this.eachVideo.answer1 = response.data.content[i].ivselect1;
                                this.eachVideo.answer2 = response.data.content[i].ivselect2;
                                this.eachVideo.condition = response.data.content[i].condition;
                                this.eachVideo.event = response.data.content[i].event;
                                this.eachVideo.resource = response.data.content[i].event_condition.toString();
                                //}
                            }
                            if(response.data.content[i].msgtype == 3){
                                this.tel = true;
                                this.phone.select = '电话';
                                this.storyForm.actor = { key:response.data.content[i].name, value:response.data.content[i].actorid };
                                //if(response.data.content[i].plottype == this.storyForm.type && this.storyForm.actor.key){
                                this.phone.step = response.data.content[i].step;
                                let msgs = response.data.content[i].nxtmsg.split("||");
                                this.phone.title = response.data.content[i].title;
                                this.phone.speak = response.data.content[i].msg;
                                this.phone.eachWord = response.data.content[i].question;
                                this.phone.answer = response.data.content[i].allow;
                                this.phone.cancel = response.data.content[i].deny;
                                this.phone.condition = response.data.content[i].condition;
                                this.phone.event = response.data.content[i].event;
                                this.phone.resource = response.data.content[i].event_condition.toString();
                                //}
                            }
                            if(response.data.content[i].msgtype == 4){
                                this.wTalk = true;
                                this.wordTalk.select = '文字聊天';
                                this.storyForm.actor = { key:response.data.content[i].name, value:response.data.content[i].actorid };
                                //if(response.data.content[i].plottype == this.storyForm.type && this.storyForm.actor.key){
                                this.wordTalk.step = response.data.content[i].step;
                                let msgs = response.data.content[i].nxtmsg.split("||");
                                this.wordTalk.title = response.data.content[i].title;
                                this.wordTalk.wordContent = response.data.content[i].msg;
                                this.wordTalk.answer1 = msgs[0];
                                this.wordTalk.answer2 = msgs[1];
                                this.wordTalk.answer3 = msgs[2];
                                this.wordTalk.answer4 = msgs[3];
                                this.wordTalk.answer5 = msgs[4];
                                this.wordTalk.condition = response.data.content[i].condition;
                                this.wordTalk.event = response.data.content[i].event;
                                this.wordTalk.resource = response.data.content[i].event_condition.toString();
                                //}
                            }
                            if(response.data.content[i].msgtype == 5){
                                this.sTalk = true;
                                this.soundTalk.select = '语音聊天';
                                this.storyForm.actor = { key:response.data.content[i].name, value:response.data.content[i].actorid };
                                //if(response.data.content[i].plottype == this.storyForm.type && this.storyForm.actor.key){
                                this.soundTalk.step = response.data.content[i].step;
                                let msgs = response.data.content[i].nxtmsg.split("||");
                                this.soundTalk.title = response.data.content[i].title;
                                this.soundTalk.sound = response.data.content[i].msg;
                                this.soundTalk.answer1 = msgs[0];
                                this.soundTalk.answer2 = msgs[1];
                                this.soundTalk.answer3 = msgs[2];
                                this.soundTalk.answer4 = msgs[3];
                                this.soundTalk.answer5 = msgs[4];
                                this.soundTalk.condition = response.data.content[i].condition;
                                this.soundTalk.event = response.data.content[i].event;
                                this.soundTalk.resource = response.data.content[i].event_condition.toString();
                                //}
                            }
                            if(response.data.content[i].msgtype == 6){
                                this.pTalk = true;
                                this.picTalk.select = '图片聊天';
                                this.storyForm.actor = { key:response.data.content[i].name, value:response.data.content[i].actorid };
                                //if(response.data.content[i].plottype == this.storyForm.type && this.storyForm.actor.key){
                                this.picTalk.step = response.data.content[i].step;
                                let msgs = response.data.content[i].nxtmsg.split("||");
                                this.picTalk.title = response.data.content[i].title;
                                this.picTalk.pic = response.data.content[i].msg;
                                this.picTalk.answer1 = msgs[0];
                                this.picTalk.answer2 = msgs[1];
                                this.picTalk.answer3 = msgs[2];
                                this.picTalk.answer4 = msgs[3];
                                this.picTalk.answer5 = msgs[4];
                                this.picTalk.condition = response.data.content[i].condition;
                                this.picTalk.event = response.data.content[i].event;
                                this.picTalk.resource = response.data.content[i].event_condition.toString();
                                //}
                            }
                            if(response.data.content[i].msgtype == 7){
                                this.game = true;
                                this.games.select = '小游戏';
                                this.storyForm.actor = { key:response.data.content[i].name, value:response.data.content[i].actorid };
                                //if(response.data.content[i].plottype == this.storyForm.type && this.storyForm.actor.key){
                                this.games.step = response.data.content[i].step;
                                this.games.title = response.data.content[i].title;
                                this.games.region = response.data.content[i].msg;
                                this.games.condition = response.data.content[i].condition;
                                this.games.event = response.data.content[i].event;
                                this.games.resource = response.data.content[i].event_condition.toString();
                                //}
                            }
                            if(response.data.content[i].msgtype == 8){
                                this.sVideo = true;
                                this.smallVideo.select = '小视频';
                                this.storyForm.actor = { key:response.data.content[i].name, value:response.data.content[i].actorid };
                                //if(response.data.content[i].plottype == this.storyForm.type && this.storyForm.actor.key){
                                this.smallVideo.step = response.data.content[i].step;
                                let msgs = response.data.content[i].nxtmsg.split("||");
                                this.smallVideo.title = response.data.content[i].title;
                                this.smallVideo.video = response.data.content[i].msg;
                                this.smallVideo.answer1 = msgs[0];
                                this.smallVideo.answer2 = msgs[1];
                                this.smallVideo.answer3 = msgs[2];
                                this.smallVideo.answer4 = msgs[3];
                                this.smallVideo.answer5 = msgs[4];
                                this.smallVideo.condition = response.data.content[i].condition;
                                this.smallVideo.event = response.data.content[i].event;
                                this.smallVideo.resource = response.data.content[i].event_condition.toString();
                                //}
                            }
                        }
                    }
                }).catch(err => {
                        this.fetchSuccess = false;
                    console.log(err);
                });
            },
            selectType () {
                //this.listQuery.day = this.storyForm.day;
                this.listQuery.plottype = this.storyForm.type;
                //this.listQuery.name = this.storyForm.actor.key;
                this.fetchData(this.listQuery);
            },
            selectDay (obj) {
                this.storyDay = obj.name;
                this.listQuery.day = obj.name;
                this.nVideo = false;
                this.eVideo = false;
                this.wTalk = false;
                this.pTalk = false;
                this.sTalk = false;
                this.tel = false;
                this.game = false;
                this.sVideo = false;
                //alert(this.storyDay+'--sele')
                this.fetchData(this.listQuery);
                //this.fetchData(this.listQuery);
                this.showButton = true;
            },
            selectScenes () {
                if(this.storyForm.select==1){
                    this.nVideo = true;
                    //this.listQuery.day = this.storyForm.day;
                    //this.listQuery.plottype = this.storyForm.type;
                    //this.fetchData(this.listQuery);
                } else {
                    this.nVideo = false;
                }
                if(this.storyForm.select==2){
                    this.eVideo = true;
                    //this.listQuery.day = this.storyForm.day;
                    //this.listQuery.plottype = this.storyForm.type;
                    //this.fetchData(this.listQuery);
                } else {
                    this.eVideo = false;
                }
                if(this.storyForm.select==3){
                    this.tel = true;
                    //this.listQuery.day = this.storyForm.day;
                    //this.listQuery.plottype = this.storyForm.type;
                    //this.fetchData(this.listQuery);
                } else {
                    this.tel = false;
                }
                if(this.storyForm.select==4){
                    this.wTalk = true;
                    //this.listQuery.day = this.storyForm.day;
                    //this.listQuery.plottype = this.storyForm.type;
                    //this.fetchData(this.listQuery);
                } else {
                    this.wTalk = false;
                }
                if(this.storyForm.select==5){
                    this.sTalk = true;
                    //this.listQuery.day = this.storyForm.day;
                    //this.listQuery.plottype = this.storyForm.type;
                    //this.fetchData(this.listQuery);
                } else {
                    this.sTalk = false;
                }
                if(this.storyForm.select==6){
                    this.pTalk = true;
                    //this.listQuery.day = this.storyForm.day;
                    //this.listQuery.plottype = this.storyForm.type;
                    //this.fetchData(this.listQuery);
                } else {
                    this.pTalk = false;
                }
                if(this.storyForm.select==7){
                    this.game = true;
                    //this.listQuery.day = this.storyForm.day;
                    //this.listQuery.plottype = this.storyForm.type;
                    //this.fetchData(this.listQuery);
                } else {
                    this.game = false;
                }
                if(this.storyForm.select==8){
                    this.sVideo = true;
                    //this.listQuery.day = this.storyForm.day;
                    //this.listQuery.plottype = this.storyForm.type;
                    //this.fetchData(this.listQuery);
                } else {
                    this.sVideo = false;
                }
            },
            handleSizeChange(val) {
                this.listpageQuery.limit = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listpageQuery.page = val;
                this.getList();
            },
            addClick () {
                if(this.addEvent){
                    this.dialogClass=false;
                    this.$message({
                        message: '事件名称新增成功',
                        type: 'success'
                    });
                    let newTabName = ++this.tabIndex + '';
                    this.editableTabs2.push({
                        title: this.addEvent,
                        name: newTabName,
                        content: ''
                    });
                    this.editableTabsValue2 = newTabName;
                    this.addEvent=null;
                } else {
                    this.dialogClass=false;
                }
                //alert(this.editableTabs2[0].name)
            },
            addTab(targetName) {
                this.dialogClass=true;
                //this.dialogFormVisible = true;
                /*let newTabName = ++this.tabIndex + '';
                 this.editableTabs2.push({
                 title: this.addEvent,
                 name: newTabName,
                 content: 'New Tab content'
                 });
                 this.editableTabsValue2 = newTabName;*/
            },
            /*removeTab(targetName) {
                let tabs = this.editableTabs2;
                let activeName = this.activeName;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }else{
                            activeName='all';
                        }
                        if(this.editableTabs2.indexOf(tab)>-1){
                            this.editableTabs1=[];
                        }
                        if(this.editableTabs2.indexOf(tab)>-1){
                            this.editableTabs2=[];
                        }
                    }
                });
                }
                this.activeName = activeName;
                this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
            },*/
            normalVideoDelete () {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let delData = {
                        id: parseInt(this.$route.params.num),
                        actorid: parseInt(this.$route.params.actorid),
                        day: parseInt(this.storyDay),
                        step: parseInt(this.normalVideo.step)
                    }
                    storydel (delData).then(response => {
                        if (response.data.code == 200) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.fetchData(this.listQuery);
                            this.nVideo = false;
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            eachVideoDelete () {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let delData = {
                        id: parseInt(this.$route.params.num),
                        actorid: parseInt(this.$route.params.actorid),
                        day: parseInt(this.storyDay),
                        step: parseInt(this.eachVideo.step)
                    }
                    storydel (delData).then(response => {
                        if (response.data.code == 200) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.fetchData(this.listQuery);
                            this.eVideo = false;
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            phoneDelete () {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let delData = {
                        id: parseInt(this.$route.params.num),
                        actorid: parseInt(this.$route.params.actorid),
                        day: parseInt(this.storyDay),
                        step: parseInt(this.phone.step)
                    }
                    storydel (delData).then(response => {
                        if (response.data.code == 200) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.fetchData(this.listQuery);
                            this.tel = false;
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            wordTalkDelete () {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let delData = {
                        id: parseInt(this.$route.params.num),
                        actorid: parseInt(this.$route.params.actorid),
                        day: parseInt(this.storyDay),
                        step: parseInt(this.wordTalk.step)
                    }
                    storydel (delData).then(response => {
                        if (response.data.code == 200) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.fetchData(this.listQuery);
                            this.wTalk = false;
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            soundTalkDelete () {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let delData = {
                        id: parseInt(this.$route.params.num),
                        actorid: parseInt(this.$route.params.actorid),
                        day: parseInt(this.storyDay),
                        step: parseInt(this.soundTalk.step)
                    }
                    storydel (delData).then(response => {
                        if (response.data.code == 200) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.fetchData(this.listQuery);
                            this.sTalk = false;
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            picTalkDelete () {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let delData = {
                        id: parseInt(this.$route.params.num),
                        actorid: parseInt(this.$route.params.actorid),
                        day: parseInt(this.storyDay),
                        step: parseInt(this.picTalk.step)
                    }
                    storydel (delData).then(response => {
                        if (response.data.code == 200) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.fetchData(this.listQuery);
                            this.pTalk = false;
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            gamesDelete () {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let delData = {
                        id: parseInt(this.$route.params.num),
                        actorid: parseInt(this.$route.params.actorid),
                        day: parseInt(this.storyDay),
                        step: parseInt(this.games.step)
                    }
                    storydel (delData).then(response => {
                        if (response.data.code == 200) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.fetchData(this.listQuery);
                            this.game = false;
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            smallVideoDelete () {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let delData = {
                        id: parseInt(this.$route.params.num),
                        actorid: parseInt(this.$route.params.actorid),
                        day: parseInt(this.storyDay),
                        step: parseInt(this.smallVideo.step)
                    }
                    storydel (delData).then(response => {
                        if (response.data.code == 200) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.fetchData(this.listQuery);
                            this.sVideo = false;
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            normalVideoModify () {
                let comment = {
                    id : this.$route.params.num,
                    actor : this.form.actor,
                    type : this.$route.params.type,
                    title : this.$route.params.title,
                    day : this.storyDay.toString(),
                    status : 'published'
                }
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        if(this.nVideo){
                            let nVideoinfo = comment;
                            nVideoinfo.video_uri = this.normalVideo.video;
                            nVideoinfo.condition = this.normalVideo.condition;
                            nVideoinfo.event = this.normalVideo.event;
                            nVideoinfo.event_condition = parseInt(this.normalVideo.resource);
                            nVideoinfo.step = this.normalVideo.step;
                            videoUpdate (nVideoinfo).then(response => {
                                if(response.data.code == 200){
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    //this.postForm.status = 'published';
                                    this.$emit("close","false");
                                    //this.$refs[formName].resetFields();
                                }
                                if (!response.data.content) return;
                                this.userLIstOptions = response.data.content.map(v => ({
                                    key: v.name,
                                    value: v.id
                                }));
                            });
                        }
                        this.loading = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            eachVideoModify () {
                let comment = {
                    id : this.$route.params.num,
                    actor : this.form.actor,
                    type : this.$route.params.type,
                    title : this.$route.params.title,
                    day : this.storyDay.toString(),
                    status : 'published'
                }
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        if(this.eVideo){
                            let nVideoinfo = comment;
                            nVideoinfo.video_uri = this.eachVideo.startVideo;
                            nVideoinfo.video_uri1 = this.eachVideo.selectVideo1;
                            nVideoinfo.video_uri2 = this.eachVideo.selectVideo2;
                            nVideoinfo.question = this.eachVideo.eachWord;
                            nVideoinfo.answer1 = this.eachVideo.answer1;
                            nVideoinfo.answer2 = this.eachVideo.answer2;
                            nVideoinfo.condition = this.eachVideo.condition;
                            nVideoinfo.event = this.eachVideo.event;
                            nVideoinfo.event_condition = parseInt(this.eachVideo.resource);
                            nVideoinfo.step = this.eachVideo.step;
                            videoInterUpdate (nVideoinfo).then(response => {
                                if(response.data.code == 200){
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    //this.postForm.status = 'published';
                                    this.$emit("close","false");
                                }
                                if (!response.data.content) return;
                                this.userLIstOptions = response.data.content.map(v => ({
                                    key: v.name,
                                    value: v.id
                                }));
                            });
                        }
                        this.loading = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            phoneModify () {
                let comment = {
                    id : this.$route.params.num,
                    actor : this.form.actor,
                    type : this.$route.params.type,
                    title : this.$route.params.title,
                    day : this.storyDay.toString(),
                    status : 'published'
                }
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        if(this.tel){
                            let nVideoinfo = comment;
                            nVideoinfo.audio_uri = this.phone.speak;
                            nVideoinfo.question = this.phone.eachWord;
                            nVideoinfo.allow = this.phone.answer;
                            nVideoinfo.deny = this.phone.cancel;
                            nVideoinfo.condition = this.phone.condition;
                            nVideoinfo.event = this.phone.event;
                            nVideoinfo.event_condition = parseInt(this.phone.resource);
                            nVideoinfo.step = this.phone.step;
                            telUpdate (nVideoinfo).then(response => {
                                if(response.data.code == 200){
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    //this.postForm.status = 'published';
                                    this.$emit("close","false");
                                }
                                if (!response.data.content) return;
                                this.userLIstOptions = response.data.content.map(v => ({
                                    key: v.name,
                                    value: v.id
                                }));
                            });
                        }
                        this.loading = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            wordTalkModify () {
                let comment = {
                    id : this.$route.params.num,
                    actor : this.form.actor,
                    type : this.$route.params.type,
                    title : this.$route.params.title,
                    day : this.storyDay.toString(),
                    status : 'published'
                }
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        if(this.wTalk){
                            let nVideoinfo = comment;
                            nVideoinfo.msg = this.wordTalk.wordContent;
                            nVideoinfo.replay1 = this.wordTalk.answer1;
                            nVideoinfo.replay2 = this.wordTalk.answer2;
                            nVideoinfo.replay3 = this.wordTalk.answer3;
                            nVideoinfo.replay4 = this.wordTalk.answer4;
                            nVideoinfo.replay5 = this.wordTalk.answer5;
                            nVideoinfo.condition = this.wordTalk.condition;
                            nVideoinfo.event = this.wordTalk.event;
                            nVideoinfo.event_condition = parseInt(this.wordTalk.resource);
                            nVideoinfo.step = this.wordTalk.step;
                            talkUpdate (nVideoinfo).then(response => {
                                if(response.data.code == 200){
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    //this.postForm.status = 'published';
                                    this.$emit("close","false");
                                }
                                if (!response.data.content) return;
                                this.userLIstOptions = response.data.content.map(v => ({
                                    key: v.name,
                                    value: v.id
                                }));
                            });
                        }
                        this.loading = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            soundTalkModify () {
                let comment = {
                    id : this.$route.params.num,
                    actor : this.form.actor,
                    type : this.$route.params.type,
                    title : this.$route.params.title,
                    day : this.storyDay.toString(),
                    status : 'published'
                }
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        if(this.sTalk){
                            let nVideoinfo = comment;
                            nVideoinfo.radio_uri = this.soundTalk.sound;
                            nVideoinfo.replay1 = this.soundTalk.answer1;
                            nVideoinfo.replay2 = this.soundTalk.answer2;
                            nVideoinfo.replay3 = this.soundTalk.answer3;
                            nVideoinfo.replay4 = this.soundTalk.answer4;
                            nVideoinfo.replay5 = this.soundTalk.answer5;
                            nVideoinfo.condition = this.soundTalk.condition;
                            nVideoinfo.event = this.soundTalk.event;
                            nVideoinfo.event_condition = parseInt(this.soundTalk.resource);
                            nVideoinfo.step = this.soundTalk.step;
                            radioUpdate (nVideoinfo).then(response => {
                                if(response.data.code == 200){
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    //this.postForm.status = 'published';
                                    this.$emit("close","false");
                                }
                                if (!response.data.content) return;
                                this.userLIstOptions = response.data.content.map(v => ({
                                    key: v.name,
                                    value: v.id
                                }));
                            });
                        }
                        this.loading = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            picTalkModify () {
                let comment = {
                    id : this.$route.params.num,
                    actor : this.form.actor,
                    type : this.$route.params.type,
                    title : this.$route.params.title,
                    day : this.storyDay.toString(),
                    status : 'published'
                }
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        if(this.pTalk){
                            let nVideoinfo = comment;
                            nVideoinfo.picture_uri = this.picTalk.pic;
                            nVideoinfo.replay1 = this.picTalk.answer1;
                            nVideoinfo.replay2 = this.picTalk.answer2;
                            nVideoinfo.replay3 = this.picTalk.answer3;
                            nVideoinfo.replay4 = this.picTalk.answer4;
                            nVideoinfo.replay5 = this.picTalk.answer5;
                            nVideoinfo.condition = this.picTalk.condition;
                            nVideoinfo.event = this.picTalk.event;
                            nVideoinfo.event_condition = parseInt(this.picTalk.resource);
                            nVideoinfo.step = this.picTalk.step;
                            pictureUpdate (nVideoinfo).then(response => {
                                if(response.data.code == 200){
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    //this.postForm.status = 'published';
                                    this.$emit("close","false");
                                }
                                if (!response.data.content) return;
                                this.userLIstOptions = response.data.content.map(v => ({
                                    key: v.name,
                                    value: v.id
                                }));
                            });
                        }
                        this.loading = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            gamesModify () {
                let comment = {
                    id : this.$route.params.num,
                    actor : this.form.actor,
                    type : this.$route.params.type,
                    title : this.$route.params.title,
                    day : this.storyDay.toString(),
                    status : 'published'
                }
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        if(this.game){
                            let nVideoinfo = comment;
                            nVideoinfo.game = this.games.region;
                            nVideoinfo.condition = this.games.condition;
                            nVideoinfo.event = this.games.event;
                            nVideoinfo.event_condition = parseInt(this.games.resource);
                            nVideoinfo.step = this.games.step;
                            gameUpdate (nVideoinfo).then(response => {
                                if(response.data.code == 200){
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    //this.postForm.status = 'published';
                                    this.$emit("close","false");
                                }
                                if (!response.data.content) return;
                                this.userLIstOptions = response.data.content.map(v => ({
                                    key: v.name,
                                    value: v.id
                                }));
                            });
                        }
                        this.loading = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            smallVideoModify () {
                let comment = {
                    id : this.$route.params.num,
                    actor : this.form.actor,
                    type : this.$route.params.type,
                    title : this.$route.params.title,
                    day : this.storyDay.toString(),
                    status : 'published'
                }
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        if(this.sVideo){
                            let nVideoinfo = comment;
                            nVideoinfo.tv_uri = this.smallVideo.video;
                            nVideoinfo.replay1 = this.smallVideo.answer1;
                            nVideoinfo.replay2 = this.smallVideo.answer2;
                            nVideoinfo.replay3 = this.smallVideo.answer3;
                            nVideoinfo.replay4 = this.smallVideo.answer4;
                            nVideoinfo.replay5 = this.smallVideo.answer5;
                            nVideoinfo.condition = this.smallVideo.condition;
                            nVideoinfo.event = this.smallVideo.event;
                            nVideoinfo.event_condition = parseInt(this.smallVideo.resource);
                            nVideoinfo.step = this.smallVideo.step;
                            tvUpdate (nVideoinfo).then(response => {
                                if(response.data.code == 200){
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    //this.postForm.status = 'published';
                                    this.$emit("close","false");
                                }
                                if (!response.data.content) return;
                                this.userLIstOptions = response.data.content.map(v => ({
                                    key: v.name,
                                    value: v.id
                                }));
                            });
                        }
                        this.loading = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getRemoteUserList (query) {
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
    }
    .clothStyle{
        margin-left:15px;
        display:inline-block;
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
    .el-tabs__new-tab .el-icon-plus {
        color:#20a0ff;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item .el-icon-close {
        display: none;
    }
    .cloth_commom {
        margin-left:40px
    }
    .cloth_commom .el-tabs__header {
        width: 85%;
    }
</style>

