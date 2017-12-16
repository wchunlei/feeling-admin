<template>
    <div class="createPost-container">
        <el-form class="form-container" :model="postForm" ref="postForm" :rules="actorDetail">

            <div class="createPost-main-container">
                <el-form-item label="充值设置:" label-width="120px" prop="workTimes" required>

                    <div style="margin-bottom: 40px">
                        <el-form-item label="" style="display: inline-block" prop="price" required>
                            <el-input placeholder="整数金额" style='width:100px;' v-model.number="postForm.price"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">元</span>
                            <span style="display: inline-block;margin-right: 20px">兑换</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block" prop="amount">
                            <el-input placeholder="钻石个数" style='width:100px;' v-model="postForm.amount"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">钻石</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block" prop="give">
                            <!--<span>赠送</span>
                            <el-select v-model="postForm.give" placeholder="请选择" style="width:90px">
                                <el-option v-for="item in giveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>-->
                            <span @click="showGive"><el-radio v-model="postForm.give" label="0">赠送</el-radio></span>
                            <span @click="hideGive"><el-radio v-model="postForm.give" label="1">不赠送</el-radio></span>
                        </el-form-item>
                        <el-form-item v-show="showGi" label="" style="display: inline-block" prop="giveAmount">
                            <el-input placeholder="整数金额" style='width:100px;margin-left: 20px' v-model="postForm.giveAmount"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">钻石</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block;margin-left: 10px" prop="defaultChecked">
                            <el-checkbox v-model="postForm.defaultChecked">设置为默认选择</el-checkbox>
                        </el-form-item>
                        <el-button @click.prevent="addWork">新增</el-button>
                    </div>
                    <div v-show="del" style="margin-bottom: 40px">
                        <el-form-item label="" style="display: inline-block" prop="price1" required>
                            <el-input placeholder="整数金额" style='width:100px;' v-model="postForm.price1"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">元</span>
                            <span style="display: inline-block;margin-right: 20px">兑换</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block" prop="amount1">
                            <el-input placeholder="钻石个数" style='width:100px;' v-model="postForm.amount1"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">钻石</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block" prop="give1">
                            <!--<span>赠送</span>
                            <el-select v-model="postForm.give" placeholder="请选择" style="width:90px">
                                <el-option v-for="item in giveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>-->
                            <span @click="showGive1"><el-radio v-model="postForm.give1" label="0">赠送</el-radio></span>
                            <span @click="hideGive1"><el-radio v-model="postForm.give1" label="1">不赠送</el-radio></span>
                        </el-form-item>
                        <el-form-item v-show="showGi1" label="" style="display: inline-block" prop="giveAmount1">
                            <el-input placeholder="整数金额" style='width:100px;margin-left: 20px' v-model="postForm.giveAmount1"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">钻石</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block;margin-left: 10px" prop="defaultChecked1">
                            <el-checkbox v-model="postForm.defaultChecked1">设置为默认选择</el-checkbox>
                        </el-form-item>
                        <!--<el-button @click.prevent="remove">删除</el-button>-->
                    </div>
                    <div style="margin-bottom: 40px">
                        <el-form-item label="" style="display: inline-block" prop="price2" required>
                            <el-input placeholder="整数金额" style='width:100px;' v-model="postForm.price2"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">元</span>
                            <span style="display: inline-block;margin-right: 20px">兑换</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block" prop="amount2">
                            <el-input placeholder="钻石个数" style='width:100px;' v-model="postForm.amount2"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">钻石</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block" prop="give2">
                            <!--<span>赠送</span>
                            <el-select v-model="postForm.give" placeholder="请选择" style="width:90px">
                                <el-option v-for="item in giveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>-->
                            <span @click="showGive2"><el-radio v-model="postForm.give2" label="0">赠送</el-radio></span>
                            <span @click="hideGive2"><el-radio v-model="postForm.give2" label="1">不赠送</el-radio></span>
                        </el-form-item>
                        <el-form-item v-show="showGi2" label="" style="display: inline-block" prop="giveAmount2">
                            <el-input placeholder="整数金额" style='width:100px;margin-left: 20px' v-model="postForm.giveAmount2"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">钻石</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block;margin-left: 10px" prop="defaultChecked2">
                            <el-checkbox v-model="postForm.defaultChecked2">设置为默认选择</el-checkbox>
                        </el-form-item>
                        <!--<el-button @click.prevent="remove">删除</el-button>-->
                    </div>
                    <div style="margin-bottom: 40px">
                        <el-form-item label="" style="display: inline-block" prop="price3" required>
                            <el-input placeholder="整数金额" style='width:100px;' v-model="postForm.price3"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">元</span>
                            <span style="display: inline-block;margin-right: 20px">兑换</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block" prop="amount3">
                            <el-input placeholder="钻石个数" style='width:100px;' v-model="postForm.amount3"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">钻石</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block" prop="give3">
                            <!--<span>赠送</span>
                            <el-select v-model="postForm.give" placeholder="请选择" style="width:90px">
                                <el-option v-for="item in giveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>-->
                            <span @click="showGive3"><el-radio v-model="postForm.give3" label="0">赠送</el-radio></span>
                            <span @click="hideGive3"><el-radio v-model="postForm.give3" label="1">不赠送</el-radio></span>
                        </el-form-item>
                        <el-form-item v-show="showGi3" label="" style="display: inline-block" prop="giveAmount3">
                            <el-input placeholder="整数金额" style='width:100px;margin-left: 20px' v-model="postForm.giveAmount3"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">钻石</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block;margin-left: 10px" prop="defaultChecked3">
                            <el-checkbox v-model="postForm.defaultChecked3">设置为默认选择</el-checkbox>
                        </el-form-item>
                        <!--<el-button @click.prevent="remove">删除</el-button>-->
                    </div>
                    <div style="margin-bottom: 40px">
                        <el-form-item label="" style="display: inline-block" prop="price4" required>
                            <el-input placeholder="整数金额" style='width:100px;' v-model="postForm.price4"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">元</span>
                            <span style="display: inline-block;margin-right: 20px">兑换</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block" prop="amount4">
                            <el-input placeholder="钻石个数" style='width:100px;' v-model="postForm.amount4"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">钻石</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block" prop="give4">
                            <!--<span>赠送</span>
                            <el-select v-model="postForm.give" placeholder="请选择" style="width:90px">
                                <el-option v-for="item in giveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>-->
                            <span @click="showGive4"><el-radio v-model="postForm.give4" label="0">赠送</el-radio></span>
                            <span @click="hideGive4"><el-radio v-model="postForm.give4" label="1">不赠送</el-radio></span>
                        </el-form-item>
                        <el-form-item v-show="showGi4" label="" style="display: inline-block" prop="giveAmount4">
                            <el-input placeholder="整数金额" style='width:100px;margin-left: 20px' v-model="postForm.giveAmount4"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">钻石</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block;margin-left: 10px" prop="defaultChecked4">
                            <el-checkbox v-model="postForm.defaultChecked4">设置为默认选择</el-checkbox>
                        </el-form-item>
                        <!--<el-button @click.prevent="remove">删除</el-button>-->
                    </div>
                    <div style="margin-bottom: 40px">
                        <el-form-item label="" style="display: inline-block" prop="price5" required>
                            <el-input placeholder="整数金额" style='width:100px;' v-model="postForm.price5"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">元</span>
                            <span style="display: inline-block;margin-right: 20px">兑换</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block" prop="amount5">
                            <el-input placeholder="钻石个数" style='width:100px;' v-model="postForm.amount5"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">钻石</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block" prop="give5">
                            <!--<span>赠送</span>
                            <el-select v-model="postForm.give" placeholder="请选择" style="width:90px">
                                <el-option v-for="item in giveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>-->
                            <span @click="showGive5"><el-radio v-model="postForm.give5" label="0">赠送</el-radio></span>
                            <span @click="hideGive5"><el-radio v-model="postForm.give5" label="1">不赠送</el-radio></span>
                        </el-form-item>
                        <el-form-item v-show="showGi5" label="" style="display: inline-block" prop="giveAmount5">
                            <el-input placeholder="整数金额" style='width:100px;margin-left: 20px' v-model="postForm.giveAmount5"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">钻石</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block;margin-left: 10px" prop="defaultChecked5">
                            <el-checkbox v-model="postForm.defaultChecked5">设置为默认选择</el-checkbox>
                        </el-form-item>
                        <!--<el-button @click.prevent="remove">删除</el-button>-->
                    </div>

                    <div v-for="workTime in postForm.workTimes" style="margin-bottom: 40px">
                        <el-form-item label="" style="display: inline-block" prop="price5" required>
                            <el-input placeholder="整数金额" style='width:100px;' v-model="postForm.price5"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">元</span>
                            <span style="display: inline-block;margin-right: 20px">兑换</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block" prop="amount5">
                            <el-input placeholder="钻石个数" style='width:100px;' v-model="postForm.amount5"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">钻石</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block" prop="give5">
                            <!--<span>赠送</span>
                            <el-select v-model="postForm.give" placeholder="请选择" style="width:90px">
                                <el-option v-for="item in giveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>-->
                            <span @click="showGive5"><el-radio v-model="postForm.give5" label="0">赠送</el-radio></span>
                            <span @click="hideGive5"><el-radio v-model="postForm.give5" label="1">不赠送</el-radio></span>
                        </el-form-item>
                        <el-form-item v-show="showGi5" label="" style="display: inline-block" prop="giveAmount5">
                            <el-input placeholder="整数金额" style='width:100px;margin-left: 20px' v-model="postForm.giveAmount5"></el-input>
                            <span style="display: inline-block;margin: 0 20px 0 5px">钻石</span>
                        </el-form-item>
                        <el-form-item label="" style="display: inline-block;margin-left: 10px" prop="defaultChecked5">
                            <el-checkbox v-model="postForm.defaultChecked5">设置为默认选择</el-checkbox>
                        </el-form-item>
                        <!--<el-button @click.prevent="addWork">新增</el-button>-->
                        <el-button @click.prevent="removeWork(workTime)">删除</el-button>
                    </div>
                </el-form-item>

                <el-form-item label-width="100px">
                    <el-button type="primary" @click.prevent="add" size="large">保存</el-button>
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
                    price: '',
                    amount: '',
                    give: '1',
                    giveAmount: '',
                    defaultChecked: false,
                    price1: '',
                    amount1: '',
                    give1: '1',
                    giveAmount1: '',
                    defaultChecked1: false,
                    price2: '',
                    amount2: '',
                    give2: '1',
                    giveAmount2: '',
                    defaultChecked2: false,
                    price3: '',
                    amount3: '',
                    give3: '1',
                    giveAmount3: '',
                    defaultChecked3: false,
                    price4: '',
                    amount4: '',
                    give4: '1',
                    giveAmount4: '',
                    defaultChecked4: false,
                    price5: '',
                    amount5: '',
                    give5: '1',
                    giveAmount5: '',
                    defaultChecked5: false,
                    configTime: new Date(),
                    private: '默认',
                    timeNum: '',
                    time: '小时',
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
                giveOptions: [{
                    value: '0',
                    label: '有'
                },{
                    value: '1',
                    label: '无'
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
                showGi: false,
                showGi1: false,
                showGi2: false,
                showGi3: false,
                showGi4: false,
                showGi5: false,
                del: true,
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
                    price: [{ validator: checkNumPrice, trigger: 'blur' }],
                    amount: [{ validator: checkNumPrice, trigger: 'blur' }],
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
                /*this.listQuery.actorid = parseInt(this.$route.params.actor);
                this.getDetail(this.listQuery);
                this.photoData.id = parseInt(this.$route.params.actor);
                this.mvData.id = parseInt(this.$route.params.actor);*/
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
            showGive () {
                this.showGi = true;
            },
            hideGive () {
                this.showGi = false;
            },
            showGive1 () {
                this.showGi1 = true;
            },
            hideGive1 () {
                this.showGi1 = false;
            },
            showGive2 () {
                this.showGi2 = true;
            },
            hideGive2 () {
                this.showGi2 = false;
            },
            showGive3 () {
                this.showGi3 = true;
            },
            hideGive3 () {
                this.showGi3 = false;
            },
            showGive4 () {
                this.showGi4 = true;
            },
            hideGive4 () {
                this.showGi4 = false;
            },
            showGive5 () {
                this.showGi5 = true;
            },
            hideGive5 () {
                this.showGi5 = false;
            },
            uploadListener (data) {
                alert(data)
            },
            /*remove () {
                this.del = false;
            },*/
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

