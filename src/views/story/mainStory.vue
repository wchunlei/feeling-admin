<template>
    <div class="createPost-container">
        <div class="cloth_center">
            <div style="margin:30px">
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="listpageQuery.page"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="listpageQuery.limit"
                            layout="total, sizes "
                            :total="total"
                            style="margin-bottom:20px;">
                    </el-pagination>
                </div>
                <!--<el-button type="primary" size="large" @click="addTab(editableTabsValue2)" style="margin:10px 0">新增天数</el-button>-->
                <el-tabs v-model="activeName" type="card" @tab-remove="removeTab" @tab-click="selectDay">
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
                    <el-tab-pane v-for="(item, index) in editableTabs2" closable :key="item.name" :label="item.title" :name="item.name">
                        {{item.content}}
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <el-form ref="storyForm" :model="storyForm" label-width="100px" style="margin-top:20px;padding-top:20px;">
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
                <el-form-item label="对象:" prop="actor" style="width:280px">
                    <multiselect v-model="storyForm.actor" required :options="userLIstOptions" @search-change="getRemoteUserList" placeholder="搜索用户" selectLabel="选择"
                                 deselectLabel="删除" track-by="key" :internalSearch="false" label="key">
                        <span slot='noResult'>无结果</span>
                    </multiselect>
                </el-form-item>
                <el-form-item label="剧情类型:">
                    <el-select v-model="storyForm.type" placeholder="请选择" @change="selectType">
                        <el-option label="新手" value="1"></el-option>
                        <el-option label="主线" value="2"></el-option>
                    </el-select>
                </el-form-item>
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
                    <el-form ref="normalVideo" :model="normalVideo" label-width="100px">
                        <el-form-item label="步:" prop="step" style="width:280px">
                            <el-input v-model="normalVideo.step"></el-input>
                        </el-form-item>
                        <el-form-item label="场景类型:" prop="select">
                            <el-select v-model="normalVideo.select" placeholder="请选择活动区域" @change="selectScenes">
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
                        <el-form-item label="剧情标题:" prop="title" style="width:280px">
                            <el-input v-model="normalVideo.title"></el-input>
                        </el-form-item>
                        <el-form-item label="普通视频:" prop="video">
                            <div style="margin-bottom: 20px;">
                                <Upload v-model="normalVideo.video"></Upload>
                            </div>
                        </el-form-item>
                    </el-form>
                    <hr width="96%" color="#999" style="margin-bottom:40px" />
                </template>

                <template v-if="eVideo">
                    <el-form ref="eachVideo" :model="eachVideo" label-width="100px">
                        <el-form-item label="步:" prop="step" style="width:280px">
                            <el-input v-model="eachVideo.step"></el-input>
                        </el-form-item>
                        <el-form-item label="场景类型:" prop="select">
                            <el-select v-model="eachVideo.select" placeholder="请选择活动区域" @change="selectScenes">
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
                        <el-form-item label="剧情标题:" prop="title" style="width:280px">
                            <el-input v-model="eachVideo.title"></el-input>
                        </el-form-item>
                        <el-form-item label="开始视频:" prop="startVideo">
                            <div style="margin-bottom: 20px;">
                                <Upload v-model="eachVideo.startVideo"></Upload>
                            </div>
                        </el-form-item>
                        <el-form-item label="选择一视频:" prop="selectVideo1">
                            <div style="margin-bottom: 20px;">
                                <Upload v-model="eachVideo.selectVideo1"></Upload>
                            </div>
                        </el-form-item>
                        <el-form-item label="选择二视频:" prop="selectVideo2">
                            <div style="margin-bottom: 20px;">
                                <Upload v-model="eachVideo.selectVideo2"></Upload>
                            </div>
                        </el-form-item>
                        <el-form-item label="交互文字:" prop="eachWord" style="width:280px">
                            <el-input v-model="eachVideo.eachWord"></el-input>
                        </el-form-item>
                        <el-form-item label="回答一:" prop="answer1" style="width:280px">
                            <el-input v-model="eachVideo.answer1"></el-input>
                        </el-form-item>
                        <el-form-item label="回答二:" prop="answer2" style="width:280px">
                            <el-input v-model="eachVideo.answer2"></el-input>
                        </el-form-item>
                    </el-form>
                    <hr width="96%" color="#999" style="margin-bottom:40px" />
                </template>

                <template v-if="tel">
                    <el-form ref="phone" :model="phone" label-width="100px">
                        <el-form-item label="步:" prop="step" style="width:280px">
                            <el-input v-model="phone.step"></el-input>
                        </el-form-item>
                        <el-form-item label="场景类型:" prop="select">
                            <el-select v-model="phone.select" placeholder="请选择活动区域" @change="selectScenes">
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
                        <el-form-item label="剧情标题:" prop="title" style="width:280px">
                            <el-input v-model="phone.title"></el-input>
                        </el-form-item>
                        <el-form-item label="电话:" prop="speak">
                            <div style="margin-bottom: 20px;">
                                <Upload v-model="phone.speak"></Upload>
                            </div>
                        </el-form-item>
                        <el-form-item label="交互文字:" prop="eachWord" style="width:280px">
                            <el-input v-model="phone.eachWord"></el-input>
                        </el-form-item>
                        <el-form-item label="接听:" prop="answer" style="width:280px">
                            <el-input v-model="phone.answer"></el-input>
                        </el-form-item>
                        <el-form-item label="取消:" prop="cancel" style="width:280px">
                            <el-input v-model="phone.cancel"></el-input>
                        </el-form-item>
                    </el-form>
                    <hr width="96%" color="#999" style="margin-bottom:40px" />
                </template>

                <template v-if="wTalk">
                    <el-form ref="wordTalk" :model="wordTalk" label-width="100px">
                        <el-form-item label="步:" prop="step" style="width:280px">
                            <el-input v-model="wordTalk.step"></el-input>
                        </el-form-item>
                        <el-form-item label="场景类型:" prop="select">
                            <el-select v-model="wordTalk.select" placeholder="请选择活动区域" @change="selectScenes">
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
                        <el-form-item label="剧情标题:" prop="title" style="width:280px">
                            <el-input v-model="wordTalk.title"></el-input>
                        </el-form-item>
                        <el-form-item label="文字内容:" prop="wordContent" style="width:280px">
                            <el-input v-model="wordTalk.wordContent"></el-input>
                        </el-form-item>
                        <el-form-item label="回复一:" prop="answer1" style="width:280px">
                            <el-input v-model="wordTalk.answer1"></el-input>
                        </el-form-item>
                        <el-form-item label="回复二:" prop="answer2" style="width:280px">
                            <el-input v-model="wordTalk.answer2"></el-input>
                        </el-form-item>
                        <el-form-item label="回复三:" prop="answer3" style="width:280px">
                            <el-input v-model="wordTalk.answer3"></el-input>
                        </el-form-item>
                        <el-form-item label="回复四:" prop="answer4" style="width:280px">
                            <el-input v-model="wordTalk.answer4"></el-input>
                        </el-form-item>
                        <el-form-item label="回复五:" prop="answer5" style="width:280px">
                            <el-input v-model="wordTalk.answer5"></el-input>
                        </el-form-item>
                    </el-form>
                    <hr width="96%" color="#999" style="margin-bottom:40px" />
                </template>

                <template v-if="sTalk">
                    <el-form ref="soundTalk" :model="soundTalk" label-width="100px">
                        <el-form-item label="步:" prop="step" style="width:280px">
                            <el-input v-model="soundTalk.step"></el-input>
                        </el-form-item>
                        <el-form-item label="场景类型:" prop="select">
                            <el-select v-model="soundTalk.select" placeholder="请选择活动区域" @change="selectScenes">
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
                        <el-form-item label="剧情标题:" prop="title" style="width:280px">
                            <el-input v-model="soundTalk.title"></el-input>
                        </el-form-item>
                        <el-form-item label="语言聊天:" prop="sound">
                            <div style="margin-bottom: 20px;">
                                <Upload v-model="soundTalk.sound"></Upload>
                            </div>
                        </el-form-item>
                        <el-form-item label="回复一:" prop="answer1" style="width:280px">
                            <el-input v-model="soundTalk.answer1"></el-input>
                        </el-form-item>
                        <el-form-item label="回复二:" prop="answer2" style="width:280px">
                            <el-input v-model="soundTalk.answer2"></el-input>
                        </el-form-item>
                        <el-form-item label="回复三:" prop="answer3" style="width:280px">
                            <el-input v-model="soundTalk.answer3"></el-input>
                        </el-form-item>
                        <el-form-item label="回复四:" prop="answer4" style="width:280px">
                            <el-input v-model="soundTalk.answer4"></el-input>
                        </el-form-item>
                        <el-form-item label="回复五:" prop="answer5" style="width:280px">
                            <el-input v-model="soundTalk.answer5"></el-input>
                        </el-form-item>
                    </el-form>
                    <hr width="96%" color="#999" style="margin-bottom:40px" />
                </template>

                <template v-if="pTalk">
                    <el-form ref="picTalk" :model="picTalk" label-width="100px">
                        <el-form-item label="步:" prop="step" style="width:280px">
                            <el-input v-model="picTalk.step"></el-input>
                        </el-form-item>
                        <el-form-item label="场景类型:" prop="select">
                            <el-select v-model="picTalk.select" placeholder="请选择活动区域" @change="selectScenes">
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
                        <el-form-item label="剧情标题:" prop="title" style="width:280px">
                            <el-input v-model="picTalk.title"></el-input>
                        </el-form-item>
                        <el-form-item label="图片聊天:" prop="pic">
                            <div style="margin-bottom: 20px;">
                                <Upload v-model="picTalk.pic"></Upload>
                            </div>
                        </el-form-item>
                        <el-form-item label="回复一:" prop="answer1" style="width:280px">
                            <el-input v-model="picTalk.answer1"></el-input>
                        </el-form-item>
                        <el-form-item label="回复二:" prop="answer2" style="width:280px">
                            <el-input v-model="picTalk.answer2"></el-input>
                        </el-form-item>
                        <el-form-item label="回复三:" prop="answer3" style="width:280px">
                            <el-input v-model="picTalk.answer3"></el-input>
                        </el-form-item>
                        <el-form-item label="回复四:" prop="answer4" style="width:280px">
                            <el-input v-model="picTalk.answer4"></el-input>
                        </el-form-item>
                        <el-form-item label="回复五:" prop="answer5" style="width:280px">
                            <el-input v-model="picTalk.answer5"></el-input>
                        </el-form-item>
                    </el-form>
                    <hr width="96%" color="#999" style="margin-bottom:40px" />
                </template>

                <template v-if="game">
                    <el-form ref="games" :model="games" label-width="100px">
                        <el-form-item label="步:" prop="step" style="width:280px">
                            <el-input v-model="games.step"></el-input>
                        </el-form-item>
                        <el-form-item label="场景类型:" prop="select">
                            <el-select v-model="games.select" placeholder="请选择活动区域" @change="selectScenes">
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
                        <el-form-item label="剧情标题:" prop="title" style="width:280px">
                            <el-input v-model="games.title"></el-input>
                        </el-form-item>
                        <el-form-item label="游戏类型:">
                            <el-select v-model="games.region" placeholder="请选择">
                                <el-option label="猜拳" value="1"></el-option>
                                <el-option label="玩骰子" value="2"></el-option>
                                <el-option label="猜硬币" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <hr width="96%" color="#999" style="margin-bottom:40px" />
                </template>

                <template v-if="sVideo">
                    <el-form ref="smallVideo" :model="smallVideo" label-width="100px">
                        <el-form-item label="步:" prop="step" style="width:280px">
                            <el-input v-model="smallVideo.step"></el-input>
                        </el-form-item>
                        <el-form-item label="场景类型:" prop="select">
                            <el-select v-model="smallVideo.select" placeholder="请选择活动区域" @change="selectScenes">
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
                        <el-form-item label="剧情标题:" prop="title" style="width:280px">
                            <el-input v-model="smallVideo.title"></el-input>
                        </el-form-item>
                        <el-form-item label="小视频:" prop="video">
                            <div style="margin-bottom: 20px;">
                                <Upload v-model="smallVideo.video"></Upload>
                            </div>
                        </el-form-item>
                        <el-form-item label="回复一:" prop="answer1" style="width:280px">
                            <el-input v-model="smallVideo.answer1"></el-input>
                        </el-form-item>
                        <el-form-item label="回复二:" prop="answer2" style="width:280px">
                            <el-input v-model="smallVideo.answer2"></el-input>
                        </el-form-item>
                        <el-form-item label="回复三:" prop="answer3" style="width:280px">
                            <el-input v-model="smallVideo.answer3"></el-input>
                        </el-form-item>
                        <el-form-item label="回复四:" prop="answer4" style="width:280px">
                            <el-input v-model="smallVideo.answer4"></el-input>
                        </el-form-item>
                        <el-form-item label="回复五:" prop="answer5" style="width:280px">
                            <el-input v-model="smallVideo.answer5"></el-input>
                        </el-form-item>
                    </el-form>
                    <hr width="96%" color="#999" style="margin-bottom:40px" />
                </template>

                <el-form-item v-if="addBut">
                    <el-button type="primary" @click="dialogStory = true">新增剧情</el-button>
                </el-form-item>
            </el-form>
            <el-dialog title="新增" :visible.sync="dialogClass" size="tiny">
                <el-input v-model="addEvent" size="small" placeholder="请输入事件名称" autofocus style="width:200px;"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogClass = false">取 消</el-button>
                    <el-button type="primary" @click="addClick">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="新增" :visible.sync="dialogStory" size="small">
                <!--<Story :id="storyId" v-on:listener="listenAdd"></Story>-->
                <Story :id="storyId" v-on:close="dialogClose"></Story>
                <!--<span slot="footer" class="dialog-footer">
                    <el-button @click="dialogStory = false">取 消</el-button>
                    <el-button type="primary" @click="addStoryClick">确 定</el-button>
                </span>-->
            </el-dialog>
        </div>
    </div>
</template>

<script type="text/ECMAScript-6">
    import Tinymce from 'components/Tinymce'
    import Upload from 'components/Upload/singleImage3'
    import Story from 'components/story/mainstoryEdit'
    import MDinput from 'components/MDinput';
    import { validateURL } from 'utils/validate';
    import { userSearch } from 'api/story';
    import { storyUpdate } from 'api/pushEvent';
    import { storyListall } from 'api/story';
    import { storyPage } from 'api/story';

    export default {
        name: 'clothes',
        addEvent: '',
        components: { Tinymce, MDinput, Upload, Story },
        data() {
            return {
                storyId:'',
                listQuery: {},
                listpageQuery: {
                    page: 1,
                    limit: 20
                },
                userLIstOptions: [],
                nVideo: false,
                eVideo: false,
                wTalk: false,
                pTalk: false,
                sTalk: false,
                tel: false,
                game: false,
                sVideo: false,
                addBut: false,
                storyForm: {
                    select: '9',
                    actor: '',
                    actorid: '',
                    type: '1',
                    title: '',
                    day: '',
                    step: '',
                },
                normalVideo: {
                    step: '',
                    select: '',
                    title: '',
                    video: ''
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
                    answer2: ''
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
                    answer5: ''
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
                    answer5: ''
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
                    answer5: ''
                },
                phone: {
                    step: '',
                    select: '',
                    title: '',
                    speak: '',
                    eachWord: '',
                    answer: '',
                    cancel: ''
                },
                games: {
                    step: '',
                    select: '',
                    title: '',
                    region: ''
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
                    answer5: ''
                },
                dialogClass:false,
                dialogStory: false,
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
                activeName: 1,
                total: null,
                list: []
            }
        },
        created () {
            //alert(this.editableTabs2);
            //alert(this.$route.params.num)
            if(this.$route.params && this.$route.params.num != ':num/:type/:actorid'){
                //let listQuery={};
                //this.listQuery.id = this.$route.params.num;
                //this.listQuery.day = this.storyForm.day;
                //this.listQuery.plottype = this.storyForm.type;
                //this.listQuery.name = this.storyForm.actor;
                this.addBut = true;
                this.listQuery.actorid = this.$route.params.actorid;
                this.listQuery.plottype = this.$route.params.type;
                this.listQuery.day = 1;
                this.fetchData(this.listQuery);
            }
            if(this.$route.params.num == ':num'){
                this.addBut = false;

            }
            this.listpageQuery.plottype = this.$route.params.type;
            this.listpageQuery.actorid = this.$route.params.actorid;
            this.getList();
            this.fetchData(this.listQuery);
        },
        methods : {
            dialogClose (data) {
                this.dialogStory = false;
                //this.dialogStory = data;
                //alert(data);
            },
            getList() {
                //this.listLoading = true;
                storyPage (this.listpageQuery).then(response => {
                    if (this.editableTabs2) {
                        this.editableTabs2 = [];
                        for(let i=0;i<response.data.content.data.length;i++){
                            this.editableTabs2.push({
                                title: "第"+response.data.content.data[i].day+"天",
                                name: i+1,
                                content: ''
                            });
                        }
                    }
                    this.editableTabsValue2='1';
                    this.listLoading = false;
                })
            },
            fetchData(listQuery){
                storyListall (listQuery).then(response => {
                    this.storyId = response.data.content[0].id;
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
                                this.phone.eachWord = msgs[0];
                                this.phone.answer = msgs[1];
                                this.phone.cancel = msgs[2];
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
                            //}
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
                this.listQuery.day = obj.name;
                this.nVideo = false;
                this.eVideo = false;
                this.wTalk = false;
                this.pTalk = false;
                this.sTalk = false;
                this.tel = false;
                this.game = false;
                this.sVideo = false;
                this.fetchData(this.listQuery);
                //this.fetchData(this.listQuery);
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
            removeTab(targetName) {
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
    .clothStyle{
        margin-left:15px;
        display:inline-block;
    }
</style>

