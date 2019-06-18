<!-- prettier-ignore-start -->
!!!include(docs/blog/other/remember/js.md)!!!

!!!include(docs/blog/other/remember/browser.md)!!!

!!!include(docs/blog/other/remember/mobile.md)!!!

!!!include(docs/blog/other/remember/cs.md)!!!

!!!include(docs/blog/other/remember/security.md)!!!
<!-- prettier-ignore-end -->

## flutter vs react native

谷歌大会上

react native 使用 js 编写，生成虚拟 dom，最后它将你转化为 iOS 或者 Android 原生组件。而 Flutter 是基于 `Skia` 实现的。没有什么 Android runtime 或者 Chromium 什么中间层。

dart 语言上的优势。类 java 强类型 oop 语言，AOT(Ahead-Of-Time )

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

### 函数节流 防抖

### requestAnimationFrame

### eval vs new Function

### ['1', '2', '3'].map(parseInt)

### 待看

[木易杨-高级前端进阶](https://github.com/Advanced-Frontend/Daily-Interview-Question)

[leetcode](https://github.com/azl397985856/leetcode)

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

## Beacon

## 前端监控

https://juejin.im/post/5b35921af265da598f1563cf

## API

### MutationObserver

### IntersectionObserver

## web worker

### LRU 缓存算法

## webpack

### tree shaking

### typeOf

### Object.prototype.toString.call(obj)

### 节流与防抖

## 垃圾回收

## js 双精度问题

### js 数值的最大最小值范围

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

## 正则

[^a-za-z]

### vue scoped css module

## 私有 npm

## ES6

BigInt

## flutter vs react native

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

验证身份证

## 面试集锦

- [如何面试前端工程师：Github 很重要](http://www.imooc.com/article/4379)

- [几道 JS 代码手写题以及一些代码实现](https://juejin.im/post/5aa7d82c6fb9a028c522de43)

- [javascript-questions](https://github.com/lydiahallie/javascript-questions) 一些简单的前端问题

## 其它问题

### 前端进阶

### 职业发展

### 你有什么想问的
