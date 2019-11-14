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

做这个 **vueAdmin-template** 的主要原因是: [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 这个项目的初衷是一个 vue 的管理后台集成方案，把平时用到的一些组件或者经验分享给大家，同时它也在不断的维护和拓展中，比如最近重构了 dashboard，加入了全屏功能，新增了 tabs-view 等等。所以项目会越来越复杂，不太适合很多初用 vue 的同学来构建后台。所以就写了这个基础模板，它没有复杂的功能，只包含了一个后台需要最基础的东西。
**vueAdmin-template** 主要是基于 vue-cli webpack 模板为基础开发的，引入了如下 dependencies:

- element-ui 饿了么出品的 vue2.0 pc UI 框架
- axios 一个现在主流并且很好用的请求库 支持 Promise
- js-cookie 一个轻量的 JavaScript 库来处理 cookie
- normalize.css 格式化 css
- nprogress 轻量的全局进度条控制
- vuex 官方状态管理
- vue-router 官方路由

该项目只做了一个管理后台需要极简的功能，封装了 axios 请求，支持无限层级路由，动态权限和动态侧边栏。
如果需要更多复杂的功能可以参考 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)，若还有不足，欢迎提 issue 或者 pr。下文会简单说一下用该模板需要注意的地方。

---

## 路由懒加载

路由懒加载应该是写大一点的项目都会用的一个功能，只有在使用这个 component 的时候才会加载这个相应的组件，这样写大大减少了初始页面 js 的大小并且能更好的利用游览器的缓存。

```javascript
const Foo = resolve => require(['./Foo.vue'], resolve)
//或者
const Foo = () => import('./Foo')
```

在懒加载页面不多的情况下一切是那么的美好，但我司后台业务在不断地迭代，现在项目近百个路由，这时候使用路由懒加载在开发模式下就是一件痛苦的事情了，随手改一行代码热更新都是要 6000ms+的，这怎么能忍。楼主整整花了一天多的时间找原因，能 webpack 优化的方法都用了,什么 `dll`, `HappyPack` 等方法都是过了，但提升的效果都不是很明显，正好那段时间出了 `webpack3` 楼主也升级了，编译速度也得到了很大幅度的提升，不过也要 2000ms+。后来经过大神 [@jzlxiaohei](https://github.com/jzlxiaohei) 的指点发现原来是路由懒加载搞得鬼，楼主猜测可能是异步加载导致 webpack 每次的 cache 失效了，所以每次的 rebuild 才会这么的慢。找到了原因我们就可以对症下药了，我们就自己封装了一个`_import()`的方法，只有在正式环境下才使用懒加载。这样解决了困扰多事的 rebuild 慢问题。[代码](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/router/index.js#L3)

```javascript
const _import = require('./_import_' + process.env.NODE_ENV)
const Foo = _import('Foo')
```

![](https://user-gold-cdn.xitu.io/2017/7/4/3a0912000ef5fc2389d22aab72e76fd9)
整整比原来 6000ms 快了十多倍，我终于又能愉快的开发了。

---

## 权限 控制

在[手摸手，带你用 vue 撸后台 系列二(登录权限篇)](https://segmentfault.com/a/1190000009506097)这章中其实已经详细介绍过了。该项目中权限的实现方式是：通过获取当前用户的权限去比对路由表，生成当前用户具的权限可访问的路由表，通过`router.addRoutes`动态挂载到 router 上。
但其实很多公司的业务逻辑可能不是这样的，举一个例子来说，很多公司的需求是每个页面的权限是动态配置的，不像本项目中是写死预设的。但其实原理是相同的。如这个例子，你可以在后台通过一个 tree 控件或者其它展现形式给每一个页面动态配置权限，之后将这份路由表存储到后端。当用户登录后根据 role，后端返回一个相应的路由表或者前端去请求之前存储的路由表动态生成可访问页面，之后就是`router.addRoutes`动态挂载到 router 上，你会发现原来是相同的，万变不离其宗。

---

## 导航

**侧边栏**:本项目里的侧边栏是根据 router.js 配置的路由并且根据权限动态生成的，这样就省去了写一遍路由还要再手动写侧边栏这种麻烦事，同是使用了递归组件，这样不管你路由多少级嵌套，都能愉快的显示了。权限验证那里也做了递归的处理。
![](https://user-gold-cdn.xitu.io/2017/7/4/26ddf859b6d3b175f08d10cc4502c3f8)

**面包屑**:本项目中也封装了一个面包屑导航，它也是通过`watch $route`动态生成的。[代码](https://github.com/PanJiaChen/vue-admin-template/blob/master/src/components/Breadcrumb/index.vue)

![](https://user-gold-cdn.xitu.io/2017/7/4/cdfd13e3861242c05acb01d3ad39afb0)
由于侧边栏导航和面包屑亦或是权限，你会发现其实都是和 router 密切相关的，所以基于 vue-router 路由信息对象上做了一下小小的拓展，自定义了一些属性

> - icon : the icon show in the sidebar

- hidden : if `hidden:true` will not show in the sidebar
- redirect : if `redirect:noredirect` will not redirct in the levelbar
- noDropdown : if `noDropdown:true` will not has submenu in the sidebar
- meta : `{ role: ['admin'] }` will control the page role

大家也可以结合自己的业务需求增改这些自定义属性。

---

## iconfont

element-ui 自带的图标不是很丰富，但管理后台图标的定制性又很强。这里只给大家推荐使用阿里的 [iconfont](http://iconfont.cn/) ，简单好用又方便管理。本项目中已经嵌入了一些 iconfont 作为例子，大家可以自行替换。
这里来简单介绍一下 iconfont 的使用方式。首先注册好 iconfont 账号之后，可以在我的项目中管理自己的 iconfont 。我司所有的项目都是用这个管理的，真心推荐使用。
![](https://user-gold-cdn.xitu.io/2017/7/4/4e7d8799ebd8ba316e52ea9951db6b69)
创建好图标库后如果有更新替换也很方便，这里我使用了 Symbol 的方式引入，这里还有`unicode`，`font-class`的引入方式，有兴趣的可以[自行研究](http://iconfont.cn/help/detail?spm=a313x.7781069.1998910419.13.HpQ1yI&helptype=code)。
之后我们点击下载 Symbol，会发现有如下这些文件，我们只要关心`iconfont.js`就可以了

![](https://user-gold-cdn.xitu.io/2017/7/4/d18f61f6be205b80ed146d564b10433e)
我们将它替换项目中的 [iconfont.js](https://github.com/PanJiaChen/vue-admin-template/blob/master/src/assets/iconfont/iconfont.js) 就可以了。本项目中也封装了一个[svg component](https://github.com/PanJiaChen/vue-admin-template/blob/master/src/components/SvgIcon/index.vue) 方便大家使用。

```html
<icon-svg icon-class="填入你需要的iconfont名字就能使用了"></icon-svg>
```

## favicon

每个项目都需要有一个属于自己的 favicon。

![](https://user-gold-cdn.xitu.io/2017/7/4/6f86de7471f65d8c7f19a8be4e07d478)
其实实现起来非常的方便，我们主需要借助[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

```javascript
//webpack config
function resolveApp(relativePath) {
    return path.resolve(relativePath);
}
new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      favicon: resolveApp('favicon.ico')
    }),
```

你只要将本项目跟目录下的 favicon.ico 文件替换为你想要的图标即可。

---

## eslint

`vue cli` 默认提供了`standard`和`airbnb` 两种 lint 规范，说真的一个 j 检查校验的太松一个又太紧，而且每个团队的 lint 规范又是不同的，所以楼主干脆在项目里把大部分常用的 lint 规范都列举了出来并写上了注释方便大家修改[代码地址](https://github.com/PanJiaChen/vue-admin-template/blob/master/.eslintrc.js)，大家也可以把自己的规范上传到 npm，像 vue 一样 [vue-eslint-config](https://github.com/vuejs/eslint-config-vue)。配置 eslint 对多人协作的项目有很大的好处,同时配置好 lint 在加 ide 的 lint 插件写代码简直要起飞。相关配置可见[第一篇教程](https://segmentfault.com/a/1190000009275424#articleHeader8)。

## postcss

相信大部分 vue 的项目都是基于 [vue-cli](https://github.com/vuejs/vue-cli) 来开发的，不过毕竟每个人需求都是不太一样的，需要自定义一些的东西。就比如拿 postcss 来说 vue-cli 有一个小坑，它默认 autoprefixer 只会对通过 vue-loader 引入的样式有作用，换而言之也就是 .vue 文件里面的 css autoprefixer 才会效果。相关问题[issues/544](https://github.com/vuejs-templates/webpack/issues/544),[issues/600](https://github.com/vuejs-templates/webpack/issues/600)。解决方案也很简单粗暴

```html
//app.vue
<style lang="scss">
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
```

你在 .vue 文件中引入你要的样式就可以了，或者你可以改变 vue-cli 的文件在 css-loader 前面在加一个 postcss-loader，在前面的 issue 地址中已经给出了解决方案。
这里再来说一下 postcss 的配置问题，新版的[vue-cli webpack 模板](https://github.com/vuejs-templates/webpack) inti 之后跟目录下默认有一个`.postcssrc.js` 。vue-loader 的 postcss 会默认读取这个文件的里的配置项，所以在这里直接改配置文件就可以了。配置和[postcss](https://github.com/postcss/postcss)是一样的。

```javascript
//.postcssrc.js
module.exports = {
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": {}
  }
}
//package.json
"browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
```

如上代码所述，autoprefixe r 回去读取 package.json 下 browserslist 的配置文件

- `> 1%` 兼容全球使用率大于 1%的游览器
- `last 2 versions` 兼容每个游览器的最近两个版本
- `not ie <= 8` 不兼容 ie8 及以下
  具体可见 [browserslist](https://github.com/ai/browserslist), postcss 也还有很多很多其它的功能大家可以[自行去把玩](https://www.postcss.parts/)

---

## babel-polyfill

本项目暂时没有兼容性需求，如有兼容性需求可自行使用 babel-polyfill。
在 Node/Browserify/webpack 中使用

```shell
npm install --save babel-polyfill //下载依赖
```

在入口文件中引入

```javascript
import 'babel-polyfill'
// 或者
require('babel-polyfill') //es6
```

在 webpack.config.js 中加入 babel-polyfill 到你的入口数组：

```javascript
module.exports = {
  entry: ['babel-polyfill', './app/js']
}
```

具体可参考 [link](https://babeljs.io/docs/usage/polyfill/)

或者更简单暴力 [polyfill.io](https://cdn.polyfill.io/v2/docs/) 使用它给的一个 cdn 地址，引入这段 js 之后它会自动判断游览器，加载缺少的那部分 polyfill，但国内速度肯能不行，大家可以自己搭 cdn。

---

## 跨域问题

楼主 vue 群里的小伙伴们问的最多的问题还是关于跨域的，其实跨域问题真的不是一个很难解决的问题。这里我来简单总结一下我推荐的几种跨域解决方案。

- 我最推荐的也是我司常用的方式就是**`cors`**全称为 Cross Origin Resource Sharing（跨域资源共享）。这玩意对应前端来说和平时发请求写法上没有任何区别，工作量基本都在后端这里。每一次请求浏览器必须先以 OPTIONS 请求方式发送一个预请求，从而获知服务器端对跨源请求所支持 HTTP 方法。在确认服务器允许该跨源请求的情况下，以实际的 HTTP 请求方法发送那个真正的请求。推荐的原因是只要第一次配好了，之后不管有多少接口和项目复用就可以了，一劳永逸的解决了跨域问题，而且不管是开发环境还是测试环境都能方便的使用。
- 但总有后端觉得麻烦不想这么搞。那前端也是有解决方案的，在
  dev 开发模式下可以下使用**`webpack 的 proxy`**使用也是很方便的看一下文档就会使用了，楼主一些个人项目使用的该方法。但这种方法在生成环境是不适用的。在生产环境中需要使 用**Nginx 反向代理** 不管是 proxy 和 nginx 的原理都是一样的通过搭建一个中转服务器来转发请求规避跨域的问题。

| 开发环境 | 生成环境 |
| :------: | -------- |
|   cors   | cors     |
|  proxy   | nginx    |

这里我只推荐这两种方式跨域，其它的跨域方式都很多，但真心主流的也就这两种方式。

---

## easy-mock

[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 由于是一个纯前端个人项目,所以所以的数据都是用[mockjs](https://github.com/nuysoft/Mock)生成的,它的原理是:拦截了所有的请求并代理到本地模拟数据，所以 network 中没有任何的请求发出。不过这并不符合实际业务开发中的场景，所以这个项目中使用了前不久刚出的 [easy-mock](https://easy-mock.com/)，支持跨域，mockjs 的语法，支持 Swagger 这几点还是挺不错的。[相关文章](https://juejin.im/post/58ff1fae61ff4b0066792f6e)

## baseurl

线上或者测试环境接口的 base_url 不一样是很长见得需求，或者你在本地用了如 easy-mock 这种模拟数据到线上环境你想用自己公司生产环境的数据，这些需求都可以简单的通过用 baseurl 来解决。首先我们在`config/`下有`dev.env.js`和`prod.env.js`这两个配置文件。用它来区分不同环境的配置参数。

```javascript
//dev.env.js
module.exports = {
  NODE_ENV: '"development"',
  BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"'
}
//prod.env.js
module.exports = {
  NODE_ENV: '"production"',
  BASE_API: '"https://prod-xxx"'
}
```

同时本项目封装了 axios 拦截器，方便大家使用，大家也可根据自己的业务自行修改。

```javascript
import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url 读取config配置文件
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 20000) {
      Message({
        message: res.data,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject(error)
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
```

由于 axios 每一个都是一个实例，你的请求都是基于这个实例来的，所以所以配置的参数属性都继承了下来.

```javascript
//api.xxx.js
import fetch from '@/utils/fetch';
export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}
//你可以直接这样使用，之前拦截器写的东西都是生效的，
//它自动会有一个你之前配置的baseURL,
//但你说我这个请求baseURL和其它的不同,
//这也是很方便的，你可以字请求内部修改，
//它会自动覆盖你在创建实例时候写的参数如
export function getInfo(token) {
  return fetch({
    baseURL: https://api2-xxxx.com
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}
```

---

## 总结

这篇文章主要是介绍了 **vueAdmin** 做了哪些事情，希望大家如果有后台新项目要开发，建议基于 [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template) 来开发，而 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 更多的是用来当做一个集成方案，你要什么功能就去里面找拿来用，因为两者的基础架构是一样的，所以复用成本也很低。

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

楼主个人免费[圈子](https://jianshiapp.com/circles/1209)
