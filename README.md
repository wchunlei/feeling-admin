# 情感中心运营平台 #
[测试环境地址http://192.168.1.43:8000/feadmin/](http://192.168.1.43:8000/feadmin/)

**本项目基于 [vueAdmin-template](https://github.com/PanJiaChen/vueAdmin-template)**


## 开发
```bash
    # 克隆项目
    git clone http://192.168.1.43/feeling/feeling_admin.git

    # 安装依赖
    npm install
    #or 用taobao镜像
    npm install --registry=https://registry.npm.taobao.org

    # 本地开发 开启服务
    npm run dev
```
浏览器访问 http://localhost:9527

## 发布
```bash
    # 发布测试环境 带webpack ananalyzer
    npm run build:sit-preview

    # 构建生成环境
    # build/build.js 指定了安装到nginx的目录
    # directory: './feadmin',
    npm run build:prod
    cp -rf dist/* /usr/local/inveno/nginx/html/feadmin/
```

## 目录结构，只罗列了运营平台修改的部分
```shell
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── router                 // 路由
│   ├── view                   // view
|   |
|   ├───────actor              // 主角
|   ├───────story              // 剧情
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 第三方不打包资源
│   ├── jquery
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```
