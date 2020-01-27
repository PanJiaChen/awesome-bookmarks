## flutter vs react native

谷歌大会上

react native 使用 js 编写，生成虚拟 dom，最后它将你转化为 iOS 或者 Android 原生组件。而 Flutter 是基于 `Skia` 实现的。没有什么 Android runtime 或者 Chromium 什么中间层。

dart 语言上的优势。类 java 强类型 oop 语言，AOT(Ahead-Of-Time )

Flutter 和 RN/Weex 的差异，核心在于渲染的基础由自己实现，简单来说，

- Flutter 的代码经过 Flutter 引擎直接就渲染到了屏幕上
- 而 RN/Weex 的代码需要先跑到 Native 层处理一下，然后经过 Native 层渲染到屏幕

很显然前者效率会更高。由于 Native 组件可能会随着系统的升级跟着一起升级（API 增、删或变化），RN/Weex 需要写很多胶水层代码来适配不同版本、不同平台的 Native 组件，而 Flutter 就不存在这个问题

缺点：UI 控件 API，主要的坑就在于需要非常了解原生的环境，语言成本，没有热更新，组件混乱，有不少学习成本

### 前端代码安全

可以使用 [JavaScript Obfuscator Tool](https://obfuscator.io/) js 代码混淆工具，但只是增加了一些破解成本，WebAssembly 安全性相对而言更好。相关文章[前端核心代码保护技术面面观](https://zhuanlan.zhihu.com/p/61651310)

### 实现 forEach polyfill

### 多线程和单线程

js 为什么要设计成单线程？
浏览器的内核是多线程
web worker -comlink

Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象

### setTimeout vs setInterval 区别

衍生问题 setTimeout(func, 0)

### 函数 节流 防抖

实现不说了
主要说下各自运用场景：

debounce-防抖：
在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。

- 每次 resize/scroll 触发统计事件
- 文本输入的验证（连续输入文字后发送 AJAX 请求进行验证，验证一次就好）

throttle-节流：
规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

- DOM 元素的拖拽功能实现（mousemove）
- 搜索联想（keyup）
- 监听滚动事件判断是否到页面底部自动加载更多：给 scroll 加了 debounce 后，只有用户停止滚动后，才会判断是否到了页面底部；如果是 throttle 的话，只要页面滚动就会间隔一段时间判断一次 #21 (comment)

### eval vs new Function

### ['1', '2', '3'].map(parseInt)

### 待看

[木易杨-高级前端进阶](https://github.com/Advanced-Frontend/Daily-Interview-Question)

[leetcode](https://github.com/azl397985856/leetcode)

https://juejin.im/post/5d16cec0f265da1bba591903

### defer vs async

![](https://wpimg.wallstcn.com/2dd76605-8008-479d-9415-e1fed67f9660.png)

### 跨项目使用代码

- npm
- [bit](https://github.com/teambit/bit
- git module
- Monorepo

## json 边界问题

U+2028 U+2029

JSON 支持，但在 js 中的 JSON 就不支持。

[JSON: 不要误会,我真的不是 JavaScript 的子集](https://zhuanlan.zhihu.com/p/29958439)

## https

## http2

http2 头部压缩

服务器端渲染 vs 预渲染 (SSR vs Prerendering)

## 前端埋点

代码埋点
可视化埋点
全埋点
后端埋点

## Beacon

Beacon API 允许开发者发送少量错误分析和上报的信息，它的特点很明显：

在空闲的时候异步发送统计，不影响页面诸如 JS、CSS Animation 等执行
即使页面在 unload 状态下，也会异步发送统计，不影响页面过渡/跳转到下跳页
能够被客户端优化发送，尤其在 Mobile 环境下，可以将 Beacon 请求合并到其他请求上，一同处理。

https://www.barretlee.com/blog/2016/02/20/navigator-beacon-api/

## 为什么前端监控要用 GIF 打点

## 前端监控

https://juejin.im/post/5b35921af265da598f1563cf

## API

### MutationObserver

### IntersectionObserver

## web worker

## webpack

https://juejin.im/post/5d199ab15188255d6924028b

基于 tapable 插件

### tree shaking

https://segmentfault.com/a/1190000012794598
https://github.com/webpack/webpack/issues/7500
https://diverse.space/2018/05/better-tree-shaking-with-scope-analysis

### hot reload 热更新原理

webapck HMR 则不会刷新浏览器，而是运行时对模块进行热替换，保证了应用状态不会丢失，提升了开发效率。

https://github.com/kaola-fed/blog/issues/238
https://zhuanlan.zhihu.com/p/30669007

依赖 HotModuleReplacementPlugin

```js
if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!')
    printMe()
  })
}
```

vue hmr 基于 vue-hot-reload-api

### webpack 是如何实现动态导入的

https://blog.elsonzhang.cn/2018/08/01/talk-about-webpack-bundle/
https://juejin.im/post/5d26e7d1518825290726f67a

## 垃圾回收

## js 双精度问题

## 算法

bds dfs
尾调用
五大算法
动态规划 #62 #70 #198 #91
分治算法
回溯法 #78 #22 #55(4 中解法) #39

矩阵旋转

游标记录位置 #283

位运算 #371

二叉树
dfs：104
bfs：102
前中后序：144 94 145
二叉树对称性验证 101
验证二叉搜索树 98 （中序遍历)
验证 110 (序列变量)
反正二叉树 226

链表
删除链表倒数第 k 个数 19
链表合并 21
链表翻转 206
环形链表 141 快慢指针
链表排序 未做出 148

二分查找 未做

https://juejin.im/post/5d0d9d4d6fb9a07ece67d8dd#comment

### vue scoped css module

## 私有 npm

## ES6

BigInt

## flutter vs react native

## JSBridge

- API 注入，原理其实就是 Native 获取 JavaScript 环境上下文，并直接在上面挂载对象或者方法，使 js 可以直接调用，Android 与 IOS 分别拥有对应的挂载方式。安卓：JavaScriptInterface，iOS:postmessage
- WebView 中的 prompt/console/alert 拦截，通常使用 prompt，因为这个方法在前端中使用频率低，比较不会出现冲突；
- WebView URL Scheme 跳转拦截；

## MVC MVVM MVP

## js 基础

### 如何提升 JSON.stringify()的性能

## 计算机基础

### uuid

UUID 是由一组 32 位数的 16 进制数字所构成。通用唯一标识符还可以用来指向大多数的可能的物体。微软和其他一些软件公司都倾向使用全球唯一标识符（GUID），这也是通用唯一标识符的一种类型，可用来指向组建对象模块对象和其他的软件组件

### 面向对象

### js ioc

## React 相关

hooks 原理

async function 判断
node 的循环依赖
position fixed 定位问题

## 正则

[^a-za-z]

https://juejin.im/post/5965943ff265da6c30653879

验证身份证

## 面试集锦

- [如何面试前端工程师：Github 很重要](http://www.imooc.com/article/4379)

- [几道 JS 代码手写题以及一些代码实现](https://juejin.im/post/5aa7d82c6fb9a028c522de43)

- [javascript-questions](https://github.com/lydiahallie/javascript-questions) 一些简单的前端问题

- [面试大纲](https://github.com/lidaguang1989/frontent-interview/blob/master/javascript.md)

- [vue 220+个知识点（面试题）为你保驾护航](https://juejin.im/post/5d153267e51d4510624f9809) 总结的还行

## 其它问题

### 前端进阶

### 职业发展

### 你有什么想问的

## 技术问题

- npm 私有仓库
  目前使用的是 Nexus 和安卓管理 maven 的东西放在一起
  或者可以使用社区方案： verdaccio

- 你对微服务的看法
  https://github.com/CanopyTax/single-spa

- gRPC

## Vue

### vue 模板为什么只能包含一个根元素

原因：https://github.com/haizlin/fe-interview/issues/457

解决：vue-fragments 或者 Functional components with render functions

### style 加 scoped 属性的用途和原理

https://juejin.im/post/5cb8c385e51d456e2e656d3b

### delete 和 Vue.delete 删除数组的区别

delete 只是被删除的元素变成了 empty/undefined 其他的元素的键值还是不变。
Vue.delete 直接删除了数组 改变了数组的键值。

### 面向对象

面向对象三大特性：封装,继承,多态。

### preload vs prefetch

preload 加载资源一般是当前页面需要的，prefetch 一般是其它页面有可能用到的资源

## 性能优化

图片 webP 两倍图 三倍图

## docker

todo

https://mp.weixin.qq.com/s?__biz=Mzg5MTA4Mzg5NA==&mid=2247483924&idx=1&sn=111f9018fec802f9ae50649a6c9c9da2&chksm=cfd38f0df8a4061bdeea970a2acb4e22110943aa143dcb6c767633bdec98e93961cbb37031c0&xtrack=1&scene=90&subscene=93&sessionid=1561083883&clicktime=1561

见闻 docker

https://juejin.im/post/5d197e4fe51d45775b419c27

https://github.com/amandakelake/blog/issues/55
https://github.com/amandakelake/blog/issues/47
https://github.com/amandakelake/blog/issues/35
https://github.com/amandakelake/blog/issues/64

https://zhuanlan.zhihu.com/p/67858932
http2 工程化
https://hit-alibaba.github.io/interview/basic/

https://ppt.geekbang.org/list/gmtcbj2019

https://juejin.im/post/5d0878aaf265da1b83338f74

https://www.infoq.cn/article/Xxyy8WZrWLwUlIF0*IxR

https://juejin.im/post/5958bac35188250d892f5c91

https://juejin.im/post/5958bac35188250d892f5c91

https://juejin.im/post/5b65a7fdf265da0fa00a3999

https://github.com/LeuisKen/leuisken.github.io/issues/2

https://hit-alibaba.github.io/interview/basic/network/HTTPS.html

https://zhuanlan.zhihu.com/p/33843378

https://juejin.im/post/5b5dcfb46fb9a04f8f37afbb
https://juejin.im/post/5d136700f265da1b7c6128db
https://relign.github.io/Animation/animation-optimize/
https://juejin.im/post/5d138889e51d4510a37bac2d
https://juejin.im/post/5d141c166fb9a07f0870a6b8

https://juejin.im/post/5d18b089f265da1b8b2b7470
https://juejin.im/post/5d187b81e51d4550a629b2c5

https://mp.weixin.qq.com/s/CvrbpDE55upLgjjujI7KMA

https://www.infoq.cn/article/NAau0-Z7U1B2rKEZcWc8

https://www.infoq.cn/article/bLJfJg5_Eq2yOlW5VBaP

https://coolshell.cn/articles/19464.html

## TODO

尾递归
promise
proxy
JS 继承
性能优化总结
浏览器渲染原理及流程
微前端
回流和重绘
sso oauth
React 的 Dom 的 diff 算

web worker
jwt

webpack 热更新
https://github.com/sorrycc/blog/issues/80

工程化
https://www.yuque.com/robinson/fe-pro

vue 依赖收集

redis https://zhuanlan.zhihu.com/p/48080173

### 监控

Prometheus+grafana+zabbix+influxdb+Zipkin

- 错误监控

1. 框架层面的 errorHandler
2. addEventListener error 捕获资源加载错误
3. api 请求错误

[前端代码异常监控实战](https://zhuanlan.zhihu.com/p/31979395)

监控可复现

- 信息上报
  当前的网络状态
  运营商
  地理位置
  访问时间
  客户端的版本(如果是通过客户端访问)
  系统版本
  浏览器信息
  设备分辨率
  页面的来源
  用户的账号信息
  通过 performance API 收集用户各个页面访问流程所消耗的时间，看错误出现在什么环节
  收集用户 js 代码报错的信息

### polyfill

babel/preset-env 是更好的选择，可以指定版本
useBuiltIns: 'usage'/'entry'

polyfill-service

关于补丁方案的未来，我觉得按需特性探测 + 在线补丁才是终极方案。

按需特性探测保证特性的最小集；在线补丁做按需下载

[Polyfill 方案的过去、现在和未来](https://github.com/sorrycc/blog/issues/80)
[Babel polyfill 知多少](https://zhuanlan.zhihu.com/p/29058936)

### babel

Babel 的三个主要处理步骤分别是： 解析（parse），转换（transform），生成（generate）。.

### 反爬虫

[反击爬虫，前端工程师的脑洞可以有多大？](https://imweb.io/topic/595b7161d6ca6b4f0ac71f05)

### Service Workers vs Web Workers

https://blog.csdn.net/wopelo/article/details/78607879
https://juejin.im/entry/5c50f22ef265da616b1115a3

### 工程化

[大型项目前端架构浅谈（8000 字原创）](https://juejin.im/post/5cea1f705188250640005472)

### CI Docker

[基于 GitLab CI/CD 的前端自动化构建、发布实践](https://juejin.im/post/5d197e4fe51d45775b419c27)

docker 最大的好处的是快速回滚。

### 拓展阅读

- [Daily-Interview-Question](https://github.com/Advanced-Frontend/Daily-Interview-Question/blob/master/datum/summary.md) 10 分推荐
- [JavaScript 深入系列](https://github.com/mqyqingfeng/Blog) 10 分推荐
- [优雅的 JavaScript 排序算法（ES6）](https://github.com/RayJune/Elegant-JavaScript-Sorting-Algorithms) 10 分推荐 学习基本的几种排序手段
- [「中高级前端面试」JavaScript 手写代码无敌秘籍](https://juejin.im/post/5c9c3989e51d454e3a3902b6)
- [ECMAScript 6 简介](http://es6.ruanyifeng.com/#docs/intro) 学习 ES6 只推荐阮老师的教程
- [从浏览器多进程到 JS 单线程，JS 运行机制最全面的一次梳理](https://segmentfault.com/a/1190000012925872#articleHeader13)
- [20 道 JS 原理题助你面试一臂之力！](https://juejin.im/post/5d2ee123e51d4577614761f8)
- [一个合格(优秀)的前端都应该阅读这些文章](https://juejin.im/post/5d387f696fb9a07eeb13ea60)
- [一年半经验，百度、有赞、阿里前端面试总结](https://juejin.im/post/5befeb5051882511a8527dbe)
- [前端面试题整理](http://blog.poetries.top/FE-Interview-Questions/) 整理的还算全
- [中高级前端大厂面试秘籍，为你保驾护航金三银四，直通大厂(上)](https://juejin.im/post/5c64d15d6fb9a049d37f9c20)
