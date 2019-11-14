完整项目地址：[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

系列文章：

- [手摸手，带你用 vue 撸后台 系列一（基础篇）](https://juejin.im/post/59097cd7a22b9d0065fb61d2)
- [手摸手，带你用 vue 撸后台 系列二(登录权限篇)](https://juejin.im/post/591aa14f570c35006961acac)
- [手摸手，带你用 vue 撸后台 系列三 (实战篇)](https://juejin.im/post/593121aa0ce4630057f70d35)
- [手摸手，带你用 vue 撸后台 系列四(vueAdmin 一个极简的后台基础模板)](https://juejin.im/post/595b4d776fb9a06bbe7dba56)
- [手摸手，带你用 vue 撸后台 系列五(v4.0 新版本)](https://juejin.im/post/5c92ff94f265da6128275a85)
- [手摸手，带你封装一个 vue component](https://segmentfault.com/a/1190000009090836)
- [手摸手，带你优雅的使用 icon](https://juejin.im/post/59bb864b5188257e7a427c09)
- [手摸手，带你用合理的姿势使用 webpack4（上）](https://juejin.im/post/5b56909a518825195f499806)
- [手摸手，带你用合理的姿势使用 webpack4（下）](https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc)

## 前言

在前面两篇文章中已经把基础工作环境构建完成，也已经把后台核心的登录和权限问题完成了，现在手摸手，一起进入实操。

## Element

去年十月份开始用 vue 做管理后台的时候毫不犹豫的就选择了 [element-ui](https://github.com/ElemeFE/element)，那时候 vue2.0 刚发布也没多久，市面上也没有很多其它的 vue2.0 的 ui 框架可供选择。虽然 `element-ui` 也有很多的不足，前期的 bug 也不少，但我还是选择了它，简单说一下我选择`element-ui`的原因吧：

- 有大厂背书 : 虽然核心开发只有两三个人，但至少不用担心哪天就不维护，带着小姨子跑路了
- 持续迭代 : `element-ui`发版至今 release 了四十多个版本，之前平均都是一周一个小版本更新(是不是不小心暴露了它 bug 多的问题/(ㄒ o ㄒ)/~~)(ps: 至 2017.12.4 已经迭代了 74 个版本，还保持着较高更新频率)。
- 生态圈优异，社区活跃 ：其 contributors 已经有 250 多人(前期我有饶有兴致的贡献过几个 pr，参与过七八十个 issue)，社区里也有很多基于`element-ui` 的拓展组件，也有很多相关的 qq 讨论群或者 [gitter](https://gitter.im/ElemeFE/element)。
- 社区的认可:目前 Element 已经是 vue 相关最多 star 的开源项目了，体现出了社区对其的认可。

说了这么多优点，作为一个资深`element-ui`用户还是有些要抱怨的~和 react 老大哥 **[Ant Design](https://ant.design/)** 相比还是有一定的差距的，不管是组件的丰富性，参数的可配性还是文档的完整性，亦或是 UI 的交互和美观度。不过 ant 也是经过了近 9k 次 commit 的不断打磨，才有了今天。我也相信 `element-ui`也会越来越好的。

这里还有一些其它的框架(只讨论 pc 端的框架)大家可以自行选择：

- **[ivew](https://github.com/iview/iview)** 一国人个人写的框架，美观度和交互性都不错，有种介于 Element 和 Ant 之间的感觉，之前和 element 团队小小的撕了一下，有兴趣的自己去[围观](https://www.zhihu.com/question/57118065)吧，框架还是很不做的，一个人能做出这样，也是很不容易的。[作者公开信件](https://zhuanlan.zhihu.com/p/25893972)
- **[vue-admin](https://github.com/vue-bulma/vue-admin)** 也是一个不错的选择，代码写的和不错，官方也出了一个 admin 的架子，也很值得借鉴
- **[vue-material](https://github.com/vuematerial/vue-material)** 一个 material design vue 框架库
- **[vuetify](https://github.com/vuetifyjs/vuetify)** 又是一个 material design vue 框架库
- **[Keen-UI](https://github.com/JosephusPaye/Keen-UI)** 又又是一个 material design vue 框架库
- **[CoreUI-Free-Bootstrap-Admin-Template](https://github.com/mrholek/CoreUI-Free-Bootstrap-Admin-Template)** 和以前的 Bootstrap 一样，搭好了一个完整的架子，大家可以进行二次拓展，它有 vue,react,angular 多个版本
- **[Framework7-Vue](https://github.com/framework7io/Framework7-Vue)** 个人感觉这是本人体验到现在移动端体验最好的框架。不过`Framework7-Vue`感觉还不是很完善，还需要观望一段时间。而且它有自己的路由规则，所以不能使用 `vue-router`，这点还是很不方便的。

简单列举了一些主流的框架，不得不感慨现在 vue 的生态圈真是太繁荣了，上述框架楼主并没有深入使用过，不好发表太多建议，大家自行甄别适合自己业务的框架吧。

---

**这里开始我们会开始介绍一些结合 Element 的开发经验。**

## 基于 Element 的动态换肤

有些产品就是这么残忍，能完成需求就不错了，还要让我们做动态换肤。Element 官网上也提供了自定义主题的[方案](http://element.eleme.io/#/zh-CN/component/custom-theme)
同时也提供了一个在线自定义主题的[demo](https://elementui.github.io/theme-preview/#/zh-CN)

![](https://lc-gold-cdn.xitu.io/b800391d5fd8b359618e.gif)

是不是很酷，作者也说明了实现的方案 [地址](https://github.com/ElemeFE/element/issues/3054),大概思路:

1. 先把默认主题文件中涉及到颜色的 CSS 值替换成关键词
2. 根据用户选择的主题色生成一系列对应的颜色值
3. 把关键词再换回刚刚生成的相应的颜色值
4. 直接在页面上加 style 标签，把生成的样式填进去

我看完觉得真的还是有点复杂的。有没有简单的方案呢？
让我们思考一下，让我们自己写动态换肤该怎么写呢？最常见的方法就是写两套主题，一套叫`day theme` ，一套叫`night theme`，`night theme`主题 都在一个`.night-theme`的命名空间下，我们动态的在`body`上`add .night-theme` ， `remove .night-theme`。这就是最简单的动态换肤。所以我们也能不能顺着这个思路，基于 element-ui 实现动态换肤呢？

首先我们下载官方通过的 [Theme generator](https://github.com/ElementUI/element-theme) ,一个专门用来生成 Element 主题的工具。按照文档，我们生成了需要的主题。

![](https://lc-gold-cdn.xitu.io/fe4fe211e42446d60da0)
之后就是我们要做的事情了，将这个主题的每个元素外面包裹一个 class 来做命名空间。
我们这里用到了`gulp-css-wrap`这个神器，轻轻松松就完成了我们想要的结果

```js
var path = require('path')
var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css')
var cssWrap = require('gulp-css-wrap')

var customThemeName = '.custom-theme'

gulp.task('css-wrap', function() {
  return gulp
    .src(path.resolve('./theme/index.css'))
    .pipe(cssWrap({ selector: customThemeName }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'))
})

gulp.task('move-font', function() {
  return gulp.src(['./theme/fonts/**']).pipe(gulp.dest('dist/fonts'))
})

gulp.task('default', ['css-wrap', 'move-font'])
```

这样就得到了一个以.custom-theme 为命名空间的自定义主题了，之后我们在项目中引入主题

```
//main.js
import 'assets/custom-theme/index.css'
```

我们在换肤的地方`toggleClass(document.body, 'custom-theme')`一直 toggle body 的 class 就可以了。我们就简单实现了动态换肤效果。

![](https://lc-gold-cdn.xitu.io/90538497cfec5aa965d3.gif)
不过这种模式实现换肤也是有一个弊端的，它等于把这两个主题都打包在了项目里，如果你的项目主题需要七八种，这种模式就不适合了。我们就需要动态的加载 css，下面就是最简单的动态添加 css 的例子，当然你可以封装一下，增加成功或者失败回调，判断是否加载过改资源等等就不展开了。

```
var head = document.getElementsByTagName('HEAD').item(0);
var style = document.createElement('link');
style.href = 'style.css';
style.rel = 'stylesheet';
style.type = 'text/css';
head.appendChild(style);
```

**更新(2017.12)**

`element-ui` 官方更新了 2.0 版本，同时也提供了一个新的换肤思路。
[文档](https://panjiachen.github.io/vue-element-admin-site/#/theme)

---

## 侧边栏

这里又有谈一下导航栏的问题，本项目里的侧边栏是根据 router.js 配置的路由并且根据权限动态生成的，这样就省去了写一遍路由还要手动再写一次侧边栏这种麻烦事，但也遇到了一个问题，路由可能会有多层嵌套，很多人反馈自己的侧边栏会有三级，甚至还有五级的。所以重构了一下侧边栏，使用了递归组件，这样不管你多少级，都能愉快的显示了。[代码](https://github.com/PanJiaChen/vue-element-admin/tree/master/src/views/layout/components/Sidebar)

![](https://lc-gold-cdn.xitu.io/f9230d730d863040dc91)**侧边栏高亮问题:** 很多人在群里问为什么自己的侧边栏不能跟着自己的路由高亮，其实很简单，element-ui 官方已经给了 default-active 所以我们只要

```
:default-active="$route.path"
```

将`default-active`一直指向当前路由就可以了，就是这么简单。

**点击侧边栏 刷新当前路由**

在用 spa(单页面开发) 这种开发模式之前，大部分都是多页面后台，用户每次点击侧边栏都会重新请求这个页面，用户渐渐养成了点击侧边栏当前路由来刷新页面的习惯。但现在 spa 就不一样了，用户点击当前高亮的路由并不会刷新 view，因为`vue-router`会拦截你的路由，它判断你`的url`并没有任何变化，所以它不会触发任何钩子或者是`view`的变化。[issue 地址](https://github.com/vuejs/vue-router/issues/296)，社区也对该问题展开了激烈讨论。
![](https://lc-gold-cdn.xitu.io/99ccc1a31cc22a40c906)
尤大本来也说要增加一个方法来强刷 view，但后来他又改变了心意/(ㄒ o ㄒ)/~~。但需要就摆在这里，我们该怎么办呢？他说了不改变`current URL` 就不会触发任何东西，那我可不可以强行触发东西你？上有政策， 下有对策我们变着花来 hack。方法也很简单，通过不断改变`url`的`query`来触发 view 的变化。我们监听侧边栏每个 link 的 click 事件，每次点击都给 router push 一个不一样的 query 来确保会重新刷新 view。

```
clickLink(path) {
  this.$router.push({
    path,
    query: {
      t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
    }
  })
}

```

但这也有一个弊端就是 url 后面有一个很难看的 query 后缀如 `xxx.com/article/list?t=1496832345025`，但我司用户们表示能接受。。。只能暂时这样 hack 了，不知道大家有没有更好的方法，学习学习。

---

## Table

经过好几个版本的迭代，element-ui 的 table 组件已经能满足大部分业务需求了。不过 rowSpan colSpan 表格行/列合并现在并不是支持(element-ui2.0 版本之后开始支持)。官方对此功能的更新情况可以关注这个[issue](https://github.com/ElemeFE/element/issues/670)。

这里我着重讲一下 table 表格几个常用的业务形态。

### Table 拖拽排序

![](https://lc-gold-cdn.xitu.io/5b0f91103d8e5121f34a.gif)
这里主要是基于[Sortable](https://github.com/RubaXa/Sortable)

```
import Sortable from 'sortablejs'
let el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
let sortable = Sortable.create(el)
```

在 table mounted 之后申明`Sortable.create(el)` table 的每行 tr 就可以随意拖拽了，麻烦的目前我们的排序都是基于 dom 的，我们的数据层 list 并没有随之改变。所以我们就要手动的来管理我们的列表。

```
this.sortable = Sortable.create(el, {
  onEnd: evt => { //监听end事件 手动维护列表
    const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
    this.newList.splice(evt.newIndex, 0, tempIndex);
  }
});
```

这样我们就简单的完成了 table 拖拽排序。这里如果不是基于 dom 的排序推荐使用[Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)。[完整代码](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/views/example/table/dragTable.vue)

---

### Table 内联编辑

table 内联编辑也是一个常见的需求。

![](https://lc-gold-cdn.xitu.io/80da236c5cbc3b06e9f5.gif)
其实也很简单，当我们拿到 list 数据之后先洗一下数据，每一条数据里面插入一个 edit[ true or false ]判断符，来表示当前行是否处于编辑状态。之后就是通过 v-show 动态切换不同的相应 view 就可以了。[完整代码](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/views/example/table/inlineEditTable.vue)

```
<el-table-column min-width="300px" label="标题">
  <template scope="scope">
    <el-input v-show="scope.row.edit" size="small" v-model="scope.row.title"></el-input>
    <span v-show="!scope.row.edit">{{ scope.row.title }}</span>
  </template>
</el-table-column>
<el-table-column align="center" label="编辑" width="120">
  <template scope="scope">
    <el-button v-show='!scope.row.edit' type="primary" @click='scope.row.edit=true' size="small" icon="edit">编辑</el-button>
    <el-button v-show='scope.row.edit' type="success" @click='scope.row.edit=false' size="small" icon="check">完成</el-button>
  </template>
</el-table-column>

```

---

### Table 常见坑

通过 dialog 来编辑，新建，删除 table 的元素这种业务场景相对于前面说的两种更加的常见。而且也有不少的小坑。
首先我们要明确一个点 vue 是一个 MVVM 框架，我们传统写代码是命令式编程，拿到 table 这个 dom 之后就是命令式对 dom 增删改。而我们现在用声明式编程，只用关注 data 的变化就好了，所以我们这里的增删改都是基于 list 这个数组来的。这里我们还要明确一点[vue 列表渲染注意事项](https://cn.vuejs.org/v2/guide/list.html#注意事项)

> 由于 JavaScript 的限制， Vue 不能检测以下变动的数组：

    * 当你利用索引直接设置一个项时，例如： vm.items[indexOfItem] = newValue

所以我们想改变 table 中第一条数据的值，通过`this.list[0]=newValue`这样是不会生效的。

```
解决方案：
// Array.prototype.splice`
example1.items.splice(indexOfItem, 1, newValue)
```

所以我们可以通过

```
//添加数据
this.list.unshift(this.temp);

//删除数据
const index = this.list.indexOf(row); //找到要删除数据在list中的位置
this.list.splice(index, 1); //通过splice 删除数据

//修改数据
const index = this.list.indexOf(row); //找到修改的数据在list中的位置
this.list.splice(index, 1,this.updatedData); //通过splice 替换数据 触发视图更新
```

这样我们就完成了对 table 的增删改操作，列表 view 也自动响应发生了变化。这里在修改数据的时候还有一个小坑**需要主要**。
当我们拿到需要修改行的数据时候不能直接将它直接赋值给 dialog，不然会发生下面的问题。

![](https://lc-gold-cdn.xitu.io/a7d80d91001f15b7f5be.gif)
如上图所示，我们在 dialog 里面改变状态的时候，遮罩下面的 table 里面该行的状态也在那里跟着一只变化着。原因想必大家都猜到了。赋值的数据是一个 objec 引用类型共享一个内存区域的。所以我们就不能直接连等复制，需要重新指向一个新的引用，方案如下：

```
//赋值对象是一个obj
this.objData=Object.assign({}, row) //这样就不会共用同一个对象

//数组我们也有一个巧妙的防范
newArray = oldArray.slice(); //slice会clone返回一个新数组
```

---

### Tabs

tab 在后台项目中也比较常用的。假设我们有四个 tab 选项，每个 tab 都会向后端请求数据，但我们希望一开始只会请求当前的 tab 数据，而且 tab 来回切换的时候不会重复请求，只会实例化一次。首先我们想到的就是用`v-if` 这样的确能做到一开始不会挂载后面的 tab，但有一个问题，每次点击这个 tab 组件都会重新挂载一次，这是我们不想看到的，这时候我们就可以用到`<keep-alive>`了。

> keep-alive 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。 它是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。

所以我们就可以这样写 tabs 了

```
<el-tabs v-model="activeTab">
  <el-tab-pane label="简介及公告" name="announcement">
    <announcement />
  </el-tab-pane>
  <el-tab-pane label="资讯" name="information">
    <keep-alive>
      <information v-if="activeTab=='information'" />
    </keep-alive>
  </el-tab-pane>
  <el-tab-pane label="直播流配置" name="stream">
    <keep-alive>
      <stream v-if="activeTab=='stream'" />
    </keep-alive>
  </el-tab-pane>
</el-tabs>
```

---

## Select 选择器

Select 选择器直接使用没有什么太多问题，但很多时候我们需要通过 Select 来回显一些数据，当我们`<el-select v-model="objValue">` select 绑定一个 obj value 回显就会很蛋疼了，它要求必须保持同一个引用[issue](https://github.com/ElemeFE/element/issues/1780)。这就意味着，我们回显数据的时候想先要找到该数据在 arr 中的位置，再回塞：[demo](https://github.com/ElemeFE/element/issues/2479/)。这还不是在远程搜索的情况下，如果是远程搜索的情况还要当疼。
这里推荐一下[vue-multiselect](https://github.com/monterail/vue-multiselect) 它能完美的解决前面 Element select 的问题。目前也是 vue component 中比较好用的一个，ui 也非常的好看，建议大家可以尝试性用一下，真的非常的不错。

---

## Upload 上传

Upload 本身没什么好说的，文档写的蛮清楚了。这里主要说一下怎么将 Upload 组件和七牛直传结合在一起。

这里我们选择 api 直传的方式，就是我们首先要通过后端(go,node,php 都可以)[文档](https://developer.qiniu.com/sdk#official-sdk)生成七牛上传必要的 token(上传凭证)和 key(资源的最终名称)。
所以现在只要想办法讲 token 和 key 塞进 post 请求里面就可以了，好在官方也提供了这个方法。

![](https://lc-gold-cdn.xitu.io/203eca2ac0845e7376db)
。但怎么才能先异步的拿到 token 再将它塞入请求里呢？

![](https://lc-gold-cdn.xitu.io/2b136a93af9689131d6c)
这时候我们又发现了 before-upload 这个钩子还支持 promise 简直合我们的心意。
但我们写着写着怎样才能动态的改变之前的 dataObj 呢？通过看源码发现我们可以\_self.\_data 这样子拿到我们想要的数据。[线上代码](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/views/qiniu/upload.vue)

```
<template>
  <el-upload
      action="https://upload.qbox.me"
      :data="dataObj"
      drag
      :multiple="true"
      :before-upload="beforeUpload">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>
</template>
<script>
    import { getToken } from 'api/qiniu'; // 获取七牛token 后端通过Access Key,Secret Key,bucket等生成token
    // 七牛官方sdk https://developer.qiniu.com/sdk#official-sdk
    export default{
      data() {
        return {
          dataObj: { token: '', key: '' },
          image_uri: [],
          fileList: []
        }
      },
      methods: {
        beforeUpload() {
          const _self = this;
          return new Promise((resolve, reject) => {
            getToken().then(response => {
              const key = response.data.qiniu_key;
              const token = response.data.qiniu_token;
              _self._data.dataObj.token = token;
              _self._data.dataObj.key = key;
              resolve(true);
            }).catch(err => {
              console.log(err)
              reject(false)
            });
          });
        }
      }
    }
</script>

```

---

### jsx

在使用 Element 的时候，官方提供了很多可以自己写 render function 的地方，但由于 Element 内部都是用 jsx 写 render function 的，所以 demo 也都是 jsx，但很多人自己项目中其实是没有安装的，导致报错。但说真的用 createElement 裸写 render 函数还是有些蛋疼。我们要用 jsx，首先要安装 [babel-plugin-transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx) 安装方法如下：

```
npm install\
  babel-plugin-syntax-jsx\
  babel-plugin-transform-vue-jsx\
  babel-helper-vue-jsx-merge-props\
  babel-preset-es2015\
  --save-dev

```

.babelrc:文件

```
{
  "presets": ["es2015"],
  "plugins": ["transform-vue-jsx"]
}
```

这样我们就可以愉快的使用 jsx 写 render function 了。

---

## element 常见问题

**click 事件不触发问题：**一直有人在群里问`<el-input @click="handlenClick">Click Me</el-input>`怎么不触发 click 事件，虽然 element 文档还有完善的空间但这种问题大家还真要自己好好认真看一下官方的[FAQ](https://github.com/ElemeFE/element/blob/dev/FAQ.md)了。

> 官方说明了所有的原生事件必须添加 .native 修饰符。

**修改 element 样式问题：** 用 ui 组件总免不了需要对它做一些个性化定制的需求，所以我们就要覆盖 element 的一些样式。
首先我们要了解一下 vue scoped 是什么，很多人非常喜欢用 scoped，妈妈再也不用担心样式冲突问题了，其实 scoped 也没有很神秘的，它就是基于 PostCss 的，加了一个作用局的概念。

```
//编译前
.example {
  color: red;
}
//编译后
.example[_v-f3f3eg9] {
  color: red;
}
```

它和我们传统的命名空间的方法避免 css 冲突没有什么本质性的区别。
现在我们来说说怎么覆盖 element-ui 样式。由于 element-ui 的样式我们是在全局引入的，所以你想在某个 view 里面覆盖它的样式就不能加 scoped，但你又想只覆盖这个页面的 element 样式，你就可在它的父级加一个 class，以用命名空间来解决问题。

```
.aritle-page{ //你的命名空间
    .el-tag { //element-ui 元素
      margin-right: 0px;
    }
}
```

建议向楼主一样专门建一个 scss 文件里专门自定义 element-ui 的各种样式。[线上代码](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/styles/element-ui.scss)

其它关于 element 相关的东西真的没有什么好说的了，人家文档和源码就放在那里，有问题就去看文档，再去 issue 里找找，再去看看源码，大部分问题都能解决了。给一个诀窍其实大部分诡异的问题都可以通过加一个 key 或者
Vue.nextTick 来解决。。

---

## 富文本

管理后台富文本也是一个非常重要的功能，楼主在这里也踩了不少的坑。楼主在项目里最终选择了 [tinymce](https://github.com/tinymce/tinymce)

这里在简述一下推荐使用 tinymce 的原因：tinymce 是一家老牌做富文本的公司(这里也推荐 ckeditor，也是一家一直做富文本的公司，新版本很不错)，它的产品经受了市场的认可，不管是文档还是配置的自由度都很好。在使用富文本的时候有一点也很关键就是复制格式化，之前在用一款韩国人做的富文本 summernote 被它的格式化坑的死去活来，但 tinymce 的去格式化相当的好，它还有一个增值项目就是 powerpaste,那是无比的强大，支持从 word 里面复制各种东西，都不会有问题。富文本还有一点也很关键，就是拓展性。楼主用 tinymce 写了好几个插件，学习成本和容易度都不错，很方便拓展。最后一点就是文档很完善，基本你想得到的配置项，它都有。tinymce 也支持按需加载，你可以通过它官方的 build 页定制自己需要的 plugins。
我再来分析一下市面上其它的一些富文本：

- **[summernote](https://github.com/summernote/summernote)** 先来说一个我绝对不推荐的富文本。这是一个韩国人开源的富文本(当然不推荐的理由不是因为这个)，它对很多富文本业界公认的默认行为理解是反起到而行的，而且只为用了一个 dialog 的功能，引入了 boostrap，一堆人抗议就是不改。格式化也是差劲。。反正不要用！不要用！不要用！
- **[ckeditor](https://github.com/galetahub/ckeditor)** ckeditor 也是一家老牌做富文本的公司，楼主旧版后台用的就是这个，今年也出了 5.0 版本，ui 也变美观了不少，相当的不错，而且它号称是插件最丰富的富文本了。推荐大家也可以试用一下。
- **[quill](https://github.com/quilljs/quill)** 也是一个非常火的富文本，长相很不错。基于它写插件也很简单，api 设计也很简单。楼主不选择它的原因是它对图片的各种操作不友善，而且很难改。如果对图片没什么操作的用户，推荐使用。
- **[medium-_editor_](https://github.com/yabwe/medium-editor)** 大名鼎鼎的 medium 的富文本(非官方出品)，但完成度还是不很不错，拓展性也不错。不过我觉得大部分用户还是会不习惯 medium 这种写作方式的。
- **[Squire](https://github.com/neilj/Squire)** 一个比较轻量的富文本，压缩完才 11.5kb，相对于其它的富文本来说是非常的小了，推荐功能不复杂的建议使用。
- **[wangEditor](https://github.com/wangfupeng1988/wangEditor)** 一个国人写的富文本，用过感觉还是不错的。不过毕竟是个人的，不像专门公司做富文本的，配置型和丰富性不足。前端几大禁忌就有富文本 [为什么都说富文本编辑器是天坑?](https://www.zhihu.com/question/38699645)，不过个人能做成这样子很不容易了。
- **[百度 UEditor](http://ueditor.baidu.com/website/index.html)** 没有深入使用过，只在一个 angular1X 的项目简单用过，不过说着的 ui 真的不好看，不符合当今审美了，官方也已经很久没跟新过了。

楼主列举了很多富文本但并没有列举任何 vue 相关的富文本，主要是因为富文本真的比想象中复杂，在前面的文章里也说过了，其实用 vue 封装组件很方便的，没必要去用人家封装的东西什么 vue-quill vue-editor 这种都只是简单包了一层，没什么难度的。还不如自己来封装，灵活性可控性更强一点。还有一点基于 vue 真没什么好的富文本，不像 react 有 facebook 出的 [draft-js](https://github.com/facebook/draft-js)，ory 出的 [editor](https://github.com/ory/editor)，这种大厂出的产品。

当然你也可以选择一些付费的富文本编辑器，作者自己公司里面有一个项目就使用了 [froala-editor](https://www.froala.com/wysiwyg-editor) 这款编辑器。不管是美观和易用性都是不错的，公司买的是专业版，一年也就 `$349` ，价格也是很合理的，但其实省去的程序员开发陈本可能远不止这个价钱。

## Tinymce

这里来简单讲一下在自己项目中使用 `Tinymce` 的方法。

> 由于目前使用 npm 安装 `Tinymce` 方法比较负责复杂而且还有一些问题(日后可能会采用该模式)。:space_invader:

目前采用全局引用的方式。代码地址：`static/tinymce` static 目录下的文件不会被打包, 在 index.html 中引入。

**使用**
由于富文本不适合双向数据流，所以只会 watch 传入富文本的内容一次变化，只会就不会再监听了，如果之后还有改变富文本内容的需求。
可以通过 `this.refs.xxx.setContent()` 来设置

源码也很简单，有任何别的需求都可以在 `@/components/Tinymce/index.vue` 中自行修改。

---

## Markdown

markdown 我们这里选用了 [simplemde-markdown-editor](https://github.com/sparksuite/simplemde-markdown-editor) ，简单的用 vue 封装了一下[地址](https://github.com/F-loat/vue-simplemde/blob/master/markdown-editor.vue),如果需求方能接受 markdown 就一定要用 markdown，坑真心会比富文本少很多。这里我们用 markdown 做了编辑器，还需要一个能解析的的东西。可以你传给后端让后端帮你转化，也可以前端自己来，这里推荐一个转化库[showdown](https://github.com/showdownjs/showdown)。使用方法：

```
import('showdown').then(showdown => { //用了 Dynamic import
  const converter = new showdown.Converter();//初始化
  this.html = converter.makeHtml(this.content)//转化
})
```

用法也很简单两行代码就完成了 markdown to html，当然它还有很多个性画的配置，大家有需求自行研究吧。

![](https://lc-gold-cdn.xitu.io/6d14e79260c1f71d4be5.gif)

---

## 导出 excel

这里先明确一点，如果你的业务需求对导出文件的格式没有什么要求，不建议导出成 xlsx 格式的，直接导出成 csv 的就好了，真的会简单很多。创建一个 a 标签，写上`data:text/csv;charset=utf-8`头，再把数据塞进去，`encodeURI(csvContent)`一下就好了，详情就不展开了，大家可以借鉴这个[stackoverflow 回答](https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side)。
我们重点说一下转 xlsx，我们这里用到了[js-xlsx](https://github.com/SheetJS/js-xlsx)，一个功能很强大 excel 处理库，只是下载各种格式 excel，还支持读取 excel，但上手难度也非常大，相当的复杂，其中涉及不少二进制相关的东西。不过好在官方给了我们一个[demo 例子](http://sheetjs.com/demos/writexlsx.html),我们写不来还抄不来么，于是我们就借鉴官方的例子来改造了一下，具体原理就不详细说了，真的很复杂。。。
重点是我们怎么使用！首先我们封装一个[Export2Excel.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/vendor/Export2Excel.js)，
它又依赖三个库

```
require('script-loader!file-saver'); //保存文件用
require('script-loader!vendor/Blob'); //转二进制用
require('script-loader!xlsx/dist/xlsx.core.min'); //xlsx核心

由于这几个文件不支持import引入，所以我们需要`script-loader`来将他们挂载到全局环境下。
```

它暴露了两个接口`export_table_to_excel`和`export_json_to_excel`,我们常用`export_json_to_excel`因为更加的可控一点，我们可以自由的洗数据。

```
handleDownload() {
  require.ensure([], () => { // 用 webpack Code Splitting xlsl还是很大的
    const { export_json_to_excel } = require('vendor/Export2Excel');
    const tHeader = ['序号', '文章标题', '作者', '阅读数', '发布时间']; // excel 表格头
    const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time'];
    const list = this.list;
    const data = this.formatJson(filterVal, list); // 自行洗数据 按序排序的一个array数组
    export_json_to_excel(tHeader, data, '列表excel');
  })
}，
formatJson(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
}

```

[完整显示线上代码](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/views/excel/index.vue)

---

## ECharts

管理后台图表也是常见得需求。这里图表就只推荐 ECharts，功能齐全，社区 demo 也丰富[gallery](http://gallery.echartsjs.com/explore.html)。我还是那个观点，大部分插件建议大家还是自己用 vue 来包装就好了，真的很简单。ECharts 支持 webpack 引入，图省事可以将 ECharts 整个引入`var echarts = require('echarts');`不过 ECharts 还是不小的，我们大部分情况只是用到很少一部分功能，我平时习惯于按需引入的。

```
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
```

[webpack 中使用 ECharts 文档](http://echarts.baidu.com/tutorial.html#%E5%9C%A8%20webpack%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts)
[ECharts 按需引入模块文档](https://github.com/ecomfe/echarts/blob/master/index.js)
接下来我们就要在 vue 中声明初始化 ECharts 了。因为 ECharts 初始化必须绑定 dom，所以我们只能在 vue 的 mounted 生命周期里初始化。

```
mounted() {
  this.initCharts();
},
methods: {
  this.initCharts() {
    this.chart = echarts.init(this.$el);
    this.setOptions();
  },
  setOptions() {
    this.chart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    })
  }
}

```

就这样简单，ECharts 就配置完成了，这时候你想说我的 data 是远程获取的，或者说我动态改变 ECharts 的配置该怎么办呢？我们可以通过 watch 来触发 setOptions 方法

```
//第一种 watch options变化 利用vue的深度 watcher，options一有变化就重新setOption
watch: {
  options: {
    handler(options) {
      this.chart.setOption(this.options)
    },
    deep: true
  },
}
//第二种 只watch 数据的变化 只有数据变化时触发ECharts
watch: {
  seriesData(val) {
    this.setOptions({series:val})
  }
}

```

其实都差不多，还是要结合自己业务来封装。后面就和平时使用 ECharts 没有什么区别了。题外话 ECharts 的可配置项真心多，大家使用的时候可能要花一点时间了解它的 api 的。知乎有个问题：百度还有什么比较良心的产品？答案：ECharts，可见 ECharts 的强大与好用。

---

## 相同 component 不同参数

**创建与编辑**
其实后台创建与编辑功能是最常见的了，它区别去前台项目多了改的需求，但大部分创建页面与编辑页面字段和 ui 几乎是一样的，所以我们准备公用一个 component 来对应不同的页面。有两种常见的方法，来区别创建与编辑。

1. 通过路由 path 的方式
   这种方式最简单暴力，我自己的项目中使用这种方式，通过约定路径中出现'edit'就判断为编辑模式。比较省力和方便，不过这是要在大家写路径的时候都按照规范来写的前提下。
2. 通过 meta 来区分
   比较推荐这种方式来区分。
   ![](https://lc-gold-cdn.xitu.io/25969342df96a2000ec6)

```
computed: {
  isEdit() {
    return this.$route.meta.isEdit // 根据meta判断
    // return this.$route.path.indexOf('edit') !== -1 // 根据路由判断
  }
}，
created() {
  if (this.isEdit) {
    this.fetchData();
  }
},
```

就这样简单的实现了多路由复用了一个 component，其实不只是创建和编辑可以这样用，如两个列表的一模一样，只是一个是内部文章另一个是调取外部文章都能复用组件，通过 meta 的方式来判断调取不同的接口。

---

## 占坑

常规占坑，这里是手摸手，带你用 vue 撸后台系列。
完整项目地址：[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

- [手摸手，带你用 vue 撸后台 系列一（基础篇）](https://juejin.im/post/59097cd7a22b9d0065fb61d2)
- [手摸手，带你用 vue 撸后台 系列二(登录权限篇)](https://juejin.im/post/591aa14f570c35006961acac)
- [手摸手，带你用 vue 撸后台 系列三 (实战篇)](https://juejin.im/post/593121aa0ce4630057f70d35)
- [手摸手，带你用 vue 撸后台 系列四(vueAdmin 一个极简的后台基础模板)](https://juejin.im/post/595b4d776fb9a06bbe7dba56)
- [手摸手，带你用 vue 撸后台 系列五(v4.0 新版本)](https://juejin.im/post/5c92ff94f265da6128275a85)
- [手摸手，带你封装一个 vue component](https://segmentfault.com/a/1190000009090836)
- [手摸手，带你优雅的使用 icon](https://juejin.im/post/59bb864b5188257e7a427c09)
- [手摸手，带你用合理的姿势使用 webpack4（上）](https://juejin.im/post/5b56909a518825195f499806)
- [手摸手，带你用合理的姿势使用 webpack4（下）](https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc)

36)
楼主个人免费[圈子](https://jianshiapp.com/circles/1209)
