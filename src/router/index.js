import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';
import AppMain from '../views/layout/AppMain';

/* login */
const Login = _import('login/index');
const authRedirect = _import('login/authredirect');

/* dashboard */
const dashboard = _import('dashboard/index');

/* Introduction */
const Introduction = _import('introduction/index');

/* components */
const componentsIndex = _import('components/index');
const Tinymce = _import('components/tinymce');
const Markdown = _import('components/markdown');
const JsonEditor = _import('components/jsoneditor');
const DndList = _import('components/dndlist');
const AvatarUpload = _import('components/avatarUpload');
const Dropzone = _import('components/dropzone');
const Sticky = _import('components/sticky');
const SplitPane = _import('components/splitpane');
const CountTo = _import('components/countTo');
const Mixin = _import('components/mixin');

/* charts */
const chartIndex = _import('charts/index');
const KeyboardChart = _import('charts/keyboard');
const KeyboardChart2 = _import('charts/keyboard2');
const LineMarker = _import('charts/line');
const MixChart = _import('charts/mixchart');

/* error page */
const Err404 = _import('error/404');
const Err401 = _import('error/401');

/* error log */
const ErrorLog = _import('errlog/index');

/* excel */
const ExcelDownload = _import('excel/index');

/* theme  */
const Theme = _import('theme/index');

/* example*/
const TableLayout = _import('example/table/index');
const DynamicTable = _import('example/table/dynamictable');
const Table = _import('example/table/table');
const DragTable = _import('example/table/dragTable');
const InlineEditTable = _import('example/table/inlineEditTable');

const Form = _import('example/form');
const Tab = _import('example/tab/index');

/* permission */
const Permission = _import('permission/index');
/*账号管理*/
const AccountManage = _import('login/accountManage');

/* actor 角色管理 */
const actorForm = _import('actor/form');
const actorTable = _import('actor/table');

/* story 剧情管理 */
/*const storyForm = _import('story/form');
const storyTable = _import('story/table');
const storyTableall = _import('story/tableall');
const storyMain = _import('story/mainStory');
const mainstoryEdit = _import('story/mainstoryEdit');

const storyVideo = _import('story/video');
const storyVideo_interactive = _import('story/video_interactive');
const storyTel = _import('story/tel');
const storyTalk = _import('story/talk');
const storyRadio = _import('story/radio');
const storyPicture = _import('story/picture');
const storyGame = _import('story/game');
const storyTv = _import('story/tv');*/

/* storynew 剧情管理 */
const storynewForm = _import('storynew/form');
const storynewTable = _import('storynew/table');

/* home 房间管理 */
const homeForm = _import('home/form');
const homeTable = _import('home/table');

/* space 动态管理 */
const spaceForm = _import('space/form');
const spaceTable = _import('space/table');

/* whisper 问答管理 */
const whisperForm = _import('whisper/form');
const whisperTable = _import('whisper/table');

/*/!* fm 管理 *!/
const fmForm = _import('fm/form');
const fmTable = _import('fm/table');*/

/* homefm 管理 */
const homefmForm = _import('homefm/form');
const homefmTable = _import('homefm/table');

/* banner banner管理 */
const bannerForm = _import('banner/form');
const bannerTable = _import('banner/table');

/* app 渠道管理 */
const appForm = _import('app/form');
const appTable = _import('app/table');

/* 辅助模块管理 */
const eventStory= _import('event/tablestory');
const rechargeForm = _import('help/recharge');
const helpPushForm = _import('help/push_msg/form');
const helpPushTable = _import('help/push_msg/table');
const helpReward = _import('help/reward');
const helpRewardInfo = _import('help/reward_info');
const feedbackTable = _import('help/feedback');

/* 数据模块管理 */
const dataTable= _import('data/table');
const dataPay = _import('data/pay/charge');
const dataConsume = _import('data/pay/consume');

/* diary 日记管理 */
const diaryForm = _import('diary/form');
const diaryTable = _import('diary/table');

/* clothes 服装管理 */
const classForm = _import('clothes/classform');
const addClothes = _import('clothes/addcloth');
const clothesTable = _import('clothes/clothTable');

/* PUSH事件管理 */
const bubble = _import('push_event/bubble');
const bubbleTable = _import('push_event/bubbleTable');
const channel = _import('push_event/channel');
const channelTable = _import('push_event/channelTable');
const story = _import('push_event/story');

/* test */
const test = _import('test/test');

Vue.use(Router);

 /**
  * icon : the icon show in the sidebar
  * hidden : if hidden:true will not show in the sidebar
  * redirect : if redirect:noredirect will not redirct in the levelbar
  * noDropdown : if noDropdown:true will not has submenu
  * meta : { role: ['admin'] }  will control the page role
  **/

export const constantRouterMap = [
   { path: '/login', component: Login, hidden: true },
     { path: '/authredirect', component: authRedirect, hidden: true },
     { path: '/404', component: Err404, hidden: true },
     { path: '/401', component: Err401, hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{ path: 'dashboard', component: dashboard }]
  },
   /*{
    path: '/introduction',
    component: Layout,
    redirect: '/introduction/index',
    icon: 'xinrenzhinan',
    noDropdown: true,
    children: [{ path: 'index', component: Introduction, name: '简述' }]
  }*/
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  /*{
    path : '/login',
    component: Layout,
    redirect: '/login/index',
    name: '账号管理',
    icon: 'zujian',
    children: [
      { path: 'index', component: AccountManage, name: '新增账号' }
    ]
  },*/
  {
    path: '/actor',
    component: Layout,
    redirect: '/actor/index',
    name: '主角管理',
    icon: 'zujian',
    children: [
      { path: 'table', component: actorTable, name: '主角列表' },
      { path: 'form/:id', component: actorForm, name: '新增主角' },
    ]
  },
 /* {
    path: '/story',
    component: Layout,
    redirect: '/story/index',
    name: '剧情管理',
    icon: 'zujian',
    children: [
      /!*{ path: 'story/form/video', component: storyVideo, name: '普通视频' },
      { path: 'story/form/video_interactive', component: storyVideo_interactive, name: '交互视频' },
      { path: 'story/form/tel', component: storyTel, name: '电话' },
      { path: 'story/form/talk', component: storyTalk, name: '文字聊天' },
      { path: 'story/form/radio', component: storyRadio, name: '语音聊天' },
      { path: 'story/form/picture', component: storyPicture, name: '图片聊天' },
      { path: 'story/form/game', component: storyGame, name: '小游戏' },
      { path: 'story/form/tv', component: storyTv, name: '小视频' },*!/
      { path: 'table', component: storyTable, name: '剧情列表' },
      //{ path: 'mainstoryEdit', component: mainstoryEdit, name: '主线剧情编辑' },
      { path: 'mainStory/:num/:type/:actorid/:actorname/:title', component: storyMain, name: '新增剧情' },
      /!*{ path: 'tableall', component: storyTableall, name: '剧情列表详细' },*!/
    ]
  },*/
  {
    path: '/storynew',
    component: Layout,
    redirect: '/storynew/index',
    name: '剧情管理',
    icon: 'zujian',
    children: [
      /*{ path: 'story/form/video', component: storyVideo, name: '普通视频' },
       { path: 'story/form/video_interactive', component: storyVideo_interactive, name: '交互视频' },
       { path: 'story/form/tel', component: storyTel, name: '电话' },
       { path: 'story/form/talk', component: storyTalk, name: '文字聊天' },
       { path: 'story/form/radio', component: storyRadio, name: '语音聊天' },
       { path: 'story/form/picture', component: storyPicture, name: '图片聊天' },
       { path: 'story/form/game', component: storyGame, name: '小游戏' },
       { path: 'story/form/tv', component: storyTv, name: '小视频' },*/
      { path: 'table', component: storynewTable, name: '剧情列表' },
      //{ path: 'mainstoryEdit', component: mainstoryEdit, name: '主线剧情编辑' },
      { path: 'form/:id', component: storynewForm, name: '新增剧情' },
      //{ path: 'tableall', component: storyTableall, name: '剧情列表详细' },
    ]
  },
  /*{
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    name: '房间管理',
    icon: 'zujian',
    children: [
      { path: 'table', component: homeTable, name: '房间列表' },
      { path: 'form/:id', component: homeForm, name: '新增房间' },
    ]
  },*/
  {
    path: '/space',
    component: Layout,
    redirect: '/space/index',
    name: '动态管理',
    icon: 'zujian',
    children: [
      { path: 'table', component: spaceTable, name: '动态列表' },
      { path: 'form/:id', component: spaceForm, name: '新增动态' },
    ]
  },
  {
    path: '/whisper',
    component: Layout,
    redirect: '/whisper/index',
    name: '问答管理',
    icon: 'zujian',
    children: [
      { path: 'table', component: whisperTable, name: '问答列表' },
      { path: 'form/:id', component: whisperForm, name: '新增问答' },
    ]
  },
/*  {
    path: '/fm',
    component: Layout,
    redirect: '/fm/index',
    name: '女仆FM',
    icon: 'zujian',
    children: [
      { path: 'table', component: fmTable, name: 'FM列表'},
      { path: 'form/:id', component: fmForm, name: '问答' },
    ]
  },*/
  {
    path: '/homefm',
    component: Layout,
    redirect: '/homefm/index',
    name: '女仆FM',
    icon: 'zujian',
    children: [
      { path: 'table', component: homefmTable, name: 'FM列表'},
      { path: 'form/:id', component: homefmForm, name: '新增FM' },
    ]
  },
  /*{
    path: '/banner',
    component: Layout,
    redirect: '/banner/index',
    name: 'banner管理',
    icon: 'zujian',
    children: [
      { path: 'table', component: bannerTable, name: 'banner列表' },
      { path: 'form/:id', component: bannerForm, name: '新增banner' },
    ]
  },*/
  {
    path: '/help',
    component: Layout,
    redirect: '/help/index',
    name: '辅助内容管理',
    icon: 'zujian',
    children: [
      /*{ path: 'form', component: rechargeForm, name: '充值管理' },*/
      { path: 'rewardForm', component: helpReward, name: '排行榜管理' },
      /*{ path: 'rewardFormInfo/:id', component: helpRewardInfo, name: '奖励详情' },*/
      { path: 'table', component: feedbackTable, name: '帮助与反馈' },
      /*{
      path: '/help/push_msg',
      component: AppMain,
      redirect: '/help/push_msg/index',
      name: 'push消息',
      icon: 'zujian',
      children: [
        { path: 'table', component: helpPushTable, name: 'push消息列表' },
        { path: 'form/:id', component: helpPushForm, name: '新增push消息' }
      ]
    }*/
    ]
  },
  {
    path: '/data',
    component: Layout,
    redirect: '/data/index',
    name: '数据管理',
    icon: 'zujian',
    children: [
      { path: 'charge', component: dataPay, name: '充值分析' },
      { path: 'consume', component: dataConsume, name: '消费分析' }
    ]
  },
  /*{
    path: '/test',
    component: Layout,
    redirect: '/test/index',
    name: 'test',
    icon: 'zujian',
    children: [
      { path: 'test', component: test, name: 'test'},
    ]
  },*/
/*  {
    path: '/event',
    component: Layout,
    redirect: '/event/index',
    name: '事件管理',
    icon: 'zujian',
    children: [
      { path: 'index', component: eventStory, name: '剧情事件' },
      { path: 'tinymce', component: eventApp, name: '渠道事件' }
    ]
  },*/
  /*{
    path: '/diary',
    component: Layout,
    redirect: '/diary/index',
    name: '日记管理',
    icon: 'zujian',
    children: [
      { path: 'table', component: diaryTable, name: '日记列表' },
      { path: 'form/:num/:actorid', component: diaryForm, name: '新增日记' },
    ]
  },
  {
    path: '/clothes',
    component: Layout,
    redirect: '/clothes/index',
    name: '服装管理',
    icon: 'zujian',
    children: [
      { path: 'classform/:num/:name', component: classForm, name: '分类管理' },
      { path: 'clothTable', component: clothesTable, name: '服装列表' },
      //{ path: 'addcloth', component: addClothes, name: '新增服装' },
    ]
  },
  {
    path: '/push_event',
    component: Layout,
    redirect: '/push_event/index',
    name: 'PUSH事件管理',
    icon: 'zujian',
    children: [
      { path: 'push_event/story/create', component: story, name: '剧情事件' },
      { path: 'channel', component: channel, name: '渠道事件' },
      { path: 'channelTable', component: channelTable, name: '渠道事件列表' },
      { path: 'bubble', component: bubble, name: '冒泡事件' },
      { path: 'bubbleTable', component: bubbleTable, name: '冒泡事件列表' },
    ]
  },
  {
    path: '/app',
    component: Layout,
    redirect: '/app/index',
    name: '渠道管理',
    icon: 'zujian',
    children: [
      { path: 'form/:num', component: appForm, name: '新增渠道' },
      { path: 'table', component: appTable, name: '渠道列表' }
    ]
  },*/
/*  {
    path: '/components',
    component: Layout,
    redirect: '/components/index',
    name: '数据报表',
    icon: 'zujian',
    children: [
      { path: 'index', component: componentsIndex, name: '新增主角' },
      { path: 'tinymce', component: Tinymce, name: '主角列表' }
    ]
  },*/
  /*
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    name: '权限测试',
    icon: 'quanxian',
    meta: { role: ['admin'] },
    noDropdown: true,
    children: [{ path: 'index', component: Permission, name: '权限测试页', meta: { role: ['admin'] } }]
  },
  {
    path: '/components',
    component: Layout,
    redirect: '/components/index',
    name: '组件',
    icon: 'zujian',
    children: [
      { path: 'index', component: componentsIndex, name: '介绍 ' },
      { path: 'tinymce', component: Tinymce, name: '富文本编辑器' },
      { path: 'markdown', component: Markdown, name: 'Markdown' },
      { path: 'jsoneditor', component: JsonEditor, name: 'JSON编辑器' },
      { path: 'dndlist', component: DndList, name: '列表拖拽' },
      { path: 'splitpane', component: SplitPane, name: 'SplitPane' },
      { path: 'avatarupload', component: AvatarUpload, name: '头像上传' },
      { path: 'dropzone', component: Dropzone, name: 'Dropzone' },
      { path: 'sticky', component: Sticky, name: 'Sticky' },
      { path: 'countto', component: CountTo, name: 'CountTo' },
      { path: 'mixin', component: Mixin, name: '小组件' }
    ]
  },
  {
    path: '/charts',
    component: Layout,
    redirect: '/charts/index',
    name: '图表',
    icon: 'tubiaoleixingzhengchang',
    children: [
      { path: 'index', component: chartIndex, name: '介绍' },
      { path: 'keyboard', component: KeyboardChart, name: '键盘图表' },
      { path: 'keyboard2', component: KeyboardChart2, name: '键盘图表2' },
      { path: 'line', component: LineMarker, name: '折线图' },
      { path: 'mixchart', component: MixChart, name: '混合图表' }
    ]
  },
  {
    path: '/errorpage',
    component: Layout,
    redirect: 'noredirect',
    name: '错误页面',
    icon: '404',
    children: [
      { path: '401', component: Err401, name: '401' },
      { path: '404', component: Err404, name: '404' }
    ]
  },
  {
    path: '/errlog',
    component: Layout,
    redirect: 'noredirect',
    name: 'errlog',
    icon: 'bug',
    noDropdown: true,
    children: [{ path: 'log', component: ErrorLog, name: '错误日志' }]
  },
  {
    path: '/excel',
    component: Layout,
    redirect: 'noredirect',
    name: 'excel',
    icon: 'EXCEL',
    noDropdown: true,
    children: [{ path: 'download', component: ExcelDownload, name: '导出excel' }]
  },
  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    name: 'theme',
    icon: 'theme',
    noDropdown: true,
    children: [{ path: 'index', component: Theme, name: '换肤' }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: '综合实例',
    icon: 'zonghe',
    children: [
      {
        path: '/example/table',
        component: TableLayout,
        redirect: '/example/table/table',
        name: 'Table',
        children: [
          { path: 'dynamictable', component: DynamicTable, name: '动态table' },
          { path: 'dragtable', component: DragTable, name: '拖拽table' },
          { path: 'inline_edit_table', component: InlineEditTable, name: 'table内编辑' },
          { path: 'table', component: Table, name: '综合table' }
        ]
      },
      { path: 'form/edit', component: Form, name: '编辑Form', meta: { isEdit: true } },
      { path: 'form/create', component: Form, name: '创建Form' },

      { path: 'tab/index', component: Tab, name: 'Tab' }
    ]
  },*/
  { path: '*', redirect: '/404', hidden: true }
];
