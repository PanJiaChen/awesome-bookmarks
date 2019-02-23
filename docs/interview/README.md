# 面试

>

::: tip
你的简历是自己工作的答卷，项目经历是你给面试官出的考纲。所以，我的面试一定是与我的简历、工作经历相关的，一些面试题并不一定适用于任何人，但是你可以从中了解他们考察的点，以及侧重点。基础知识可以查漏补缺。
:::

这里不太适合前端初学者，因为我面试的时候默认你至少有一定的前端基础了，我不会问你最基本的 html 有什么标签 `==`和`===`有什么区别

[前端工程师手册](https://leohxj.gitbooks.io/front-end-database/content/html-and-css-basic/index.html)

[30-seconds-of-interviews](https://github.com/fejes713/30-seconds-of-interviews)

[front-end-interview-handbook](https://github.com/yangshun/front-end-interview-handbook)

[33-js-concepts](https://github.com/leonardomso/33-js-concepts)

[33-js-concepts](https://github.com/stephentian/33-js-concepts) 中国国情版

[Git 飞行规则](https://github.com/k88hudson/git-flight-rules/blob/master/README_zh-CN.md) 看了这个常规的 git 应该没什么问题了

[node-interview](https://github.com/ElemeFE/node-interview/tree/master/sections/zh-cn)

[2018 大厂高级前端面试题汇总](https://github.com/yygmind/blog/issues/5)

[Daily-Interview-Question](https://github.com/Advanced-Frontend/Daily-Interview-Question) 每天一道前端大厂面试题

https://github.com/forthealllight/blog/issues

想成为一个好的前端工程师，光有强大的编程能力是远远不够的，还有很多软知识需要知道。

学会与人沟通。

前端是一个承上启下的工作，在实际业务之中你除了要面对代码之外还需要对接 UI、产品、后端和其它前端有时候经常也会和运营啊广告销售打交道。因此怎么与其他角色很好的沟通也是一个非常重要的能力，代码写的再好，但不满足需求也是白搭。

需求明确再动手；发现问题尽快解决；意见分歧不要拒绝沟通；学会换位思考，不要总站在自己的角度想当然；

## 华尔街见闻面试题

请先 fork 本项目，之后按照题目规则，完成功能之后，**请不要依赖任何外部框架**。

1. 页面中有一个 `ul`列表，里面有 20 个 `li`，和若干个其它元素：`div`，需要实现一个功能，点击任何一个 `li`都会 alert `hello world`，点击其它元素没反应

在线[demo](https://jsbin.com/mumerahojo/1/edit?html,js,output) **注意：请在在线 demo 的基础上进行修改，**

2. 在第一题的基础上进行修改，现在点击任何 `li`需要 alert 它的位置，即 它的 index，第一个 li alert(1)，第二个 alert(2)，以此类推

3. 需要实现一个功能，**每过 1s**，往列表的末端添加新的**5 个**`li`元素，并且`li`的内容是它的位置，并且当页面的 li 个数超过 50 个时，停止添加。

4. 请根据设计稿，写成相应的静态页面，并且有如下要求

- 根据 api 拉取列表数据
- 可以使用 Vue、React 或者任何框架还原页面
- 需要自适应 适配 PC 和 Mobile
- 最后一个 item 不需要下划线
- 点击任何一个 item alert 它的 title
- title 超过两个需要省略超出部分
