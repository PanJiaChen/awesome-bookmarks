完整项目地址：[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
系类文章一：[手摸手，带你用 vue 撸后台 系列一（基础篇）](https://segmentfault.com/a/1190000009275424)
系类文章二：[手摸手，带你用 vue 撸后台 系列二（登录权限篇）](https://segmentfault.com/a/1190000009506097)
系类文章三：[手摸手，带你用 vue 撸后台 系列三(实战篇）](https://segmentfault.com/a/1190000009762198)
系类文章四：[手摸手，带你用 vue 撸后台 系列四(vueAdmin 一个极简的后台基础模板)](https://segmentfault.com/a/1190000010043013)

## 前言

> 这半年来一直在用 vue 写管理后台，目前后台已经有七十多个页面，十几种权限，但维护成本依然很低，效率依然很高，所以准备开源分享一下后台开发的经验和成果。目前的技术栈主要的采用 vue+element+axios.由于是个人项目，所以数据请求都是用了 mockjs 代替。

后续会出一系列的教程配套文章，如如何从零构建后台项目框架，如何做完整的用户系统（如权限验证，二次登录等），如何二次开发组件（如富文本），如何整合七牛等等文章，各种后台开发经验等等。莫急~~

## 功能

- 登录/注销
- 权限验证
- 侧边栏
- 面包屑
- 富文本编辑器
- Markdown 编辑器
- JSON 编辑器
- 列表拖拽
- plitPane
- Dropzone
- Sticky
- CountTo
- echarts 图表
- 401，401 错误页面
- 错误日志
- 导出 excel
- table example
- form example
- 多环境发布
- dashboard
- 二次登录
- 动态侧边栏
- mock 数据
- svg iconfont

## 开发

```bash
    # 克隆项目
    git clone https://github.com/PanJiaChen/vue-element-admin.git

    # 安装依赖
    npm install

    # 本地开发 开启服务
    npm run dev
```

浏览器访问 http://localhost:9527

## 发布

```bash
    # 发布测试环境 带webpack ananalyzer
    npm run build:sit-preview

    # 构建生成环境
    npm run build:prod
```

## 目录结构

```shell
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所以请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局filter
│   ├── mock                   // mock数据
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── view                   // view
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

## 状态管理

后台只有 user 和 app 配置相关状态使用 vuex 存在全局，其它数据都由每个业务页面自己管理。

## 效果图

#### 两步验证登录 支持微信和 qq

![2login.gif][1])

#### 真正的动态换肤

![图片描述][2]

#### 拖拽排序

![clipboard.png](/img/bVMIxU)

#### 上传裁剪头像

![clipboard.png](/img/bVMIx9)

#### 错误统计

![clipboard.png](/img/bVMIye)

#### 富文本(整合七牛 打水印等个性化功能)

![clipboard.png](/img/bVMIym)

## [更多 demo][3]

### 占坑

[系类文章一][4]

[1]: /img/bVMIw0
[2]: /img/bVMIxe
[3]: http://panjiachen.github.io/vue-element-admin/
[4]: https://segmentfault.com/a/1190000009275424
