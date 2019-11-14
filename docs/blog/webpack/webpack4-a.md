> 本文作者来自 [华尔街见闻技术团队](https://www.zhihu.com/org/hua-er-jie-jian-wen-ji-zhu-tuan-dui-92/activities) - [花裤衩](https://github.com/PanJiaChen)

前几天 webpack 作者 [Tobias Koppers](https://github.com/sokra) 发布了一篇新的文章 [webpack 4.0 to 4.16: Did you know?](https://medium.com/webpack/webpack-4-0-to-4-16-did-you-know-71e25a57fa6b)(需翻墙)，总结了一下`webpack 4`发布以来，做了哪些调整和优化。
并且说自己正在着手开发 `webpack 5`。

> Oh you are still on webpack 3. I’m sorry, what is blocking you? We already working on webpack 5, so your stack might be outdated soon…

翻译成中文就是：

![](https://user-gold-cdn.xitu.io/2018/7/27/164db1a2e089c151?w=690&h=200&f=jpeg&s=22433)

正好我也在使用一个文档生成工具 [docz](https://github.com/pedronauck/docz)(安利一波) 也最低需要`webpack 4+`，新版`webpack`性能提高了不少，而且`webpack 4` 都已经发布五个多月了，想必应该已经没什么坑了，应该可以安心的按照别人写的升级攻略升级了。之前一直迟迟不升级完全是被去年被 `webpack 3` 坑怕了。它在 `code splitting` 的情况下 `CommonsChunkPlugin`会完全失效。过了好一段时间才修复，欲哭无泪。

所以这次我等了快大半年才准备升级到`webpack 4` **但万万没想到还是遇到了不少的问题！** 有很多之前遗留的问题还是没有很好地解决。但最主要的问题还是它的文档有所欠缺，已经废除了的东西如`commonsChunkPlugin`还在官方文档中到处出现，很多重要的东西却一笔带过，甚至没写，需要用户自己去看源码才能解决。

还比如在`v4.16.0`版本中废除了`optimization.occurrenceOrder`、`optimization.namedChunks`、`optimization.hashedModuleIds`、`optimization.namedModules` 这几个配置项，替换成了`optimization.moduleIds` 和 `optimization.chunkIds`，但文档完中全没有任何体现，所以你在新版本中还按照文档那样配置其实是没有任何效果的。

最新最完整的文档还是看他项目的配置[WebpackOptions.json](https://github.com/webpack/webpack/blob/master/schemas/WebpackOptions.json)，强烈建议遇到不清楚的配置项可以看这个，因为它一定保证是和最新代码同步的。

吐槽了这么多，我们言归正传。由于本次手摸手篇幅有些长，所以拆解成了上下两篇文章：

- 上篇 -- 就是普通的在`webpack 3`的基础上升级，要做哪些操作和遇到了哪些坑
- 下篇 -- 是在`webpack 4`下怎么合理的打包和拆包，并且如何最大化利用 `long term caching`

**本文章不是手摸手从零教你 webpack 配置，所以并不会讲太多很基础的配置问题**。比如如何处理 css 文件，如何配置 webpack-dev-server，讲述 file-loader 和 url-loader 之间的区别等等，有需求的推荐看 [官方文档](https://webpack.js.org/concepts/) 或者 [survivejs](https://survivejs.com/webpack/developing/webpack-dev-server/) 出的一个系列教程。或者推荐看我司的另一篇 wbepack 入门文章，已同步到 webpack4 [传送门](https://github.com/wallstreetcn/webpack-and-spa-guide)。

## 升级篇

### 前言

我一直认为模仿和借鉴是学习一个新东西最高效的方法。所以我建议还是通过借鉴一些成熟的 webpack 配置比较好。比如你项目是基于 react 生态圈的话可以借鉴 [create-react-app](https://github.com/facebook/create-react-app) ，下载之后`npm run eject` 就可以看到它详细的 webpack 配置了。vue 的话由于新版`vue cli`不支持 `eject`了，而且改用 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain)来配置，所以借鉴起来可能会不太方便，主要配置 [地址](https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-service/lib/config)。觉得麻烦的话你可以直接借鉴 `vue-element-admin` 的 [配置](https://github.com/PanJiaChen/vue-element-admin/pull/889)。或者你想自己发挥，你可以借鉴 webpack 官方的各种 [examples](https://github.com/webpack/webpack/tree/master/examples)，来组合你的配置。

### 升级 webpack

首先将 webpack 升级到 4 之后，直接运行`webpack --xxx`是不行的，因为新版本将命令行相关的东西单独拆了出去封装成了`webpack-cli`。会报如下错误：

> The CLI moved into a separate package: webpack-cli.
> Please install `webpack-cli` in addition to webpack itself to use the CLI.

所有你需要安装`npm install webpack-cli -D -S`。你也可将它安装在全局。

同时新版 webpack 需要`Node.js 的最低支持版本为 6.11.5`不要忘了升级。如果还需要维护老项目可以使用 [nvm](https://github.com/creationix/nvm) 来做一下 node 版本管理。

**升级所有依赖**

因为`webpack4`改了 它的`hook` api ，所以所有的`loaders`、`plugins`都需要升级才能够适配。

可以使用命令行 `npm outdated`，列出所以可以更新的包。免得再一个个去`npm`找相对于的可用版本了。

![](https://user-gold-cdn.xitu.io/2018/7/27/164da832e18a97ef?w=890&h=346&f=jpeg&s=105563)

反正把`devDependencies`的依赖都升级一下，总归不会有错。

### 带来的变化

其实这次升级带来了不少改变，但大部分其实对于普通用户来说是不需要关注的，比如这次升级带来的功能`SideEffects`、`Module Type’s Introduced`、`WebAssembly Support`，基本平时是用不到的。我们主要关注那些对我们影响比较大的改动如：`optimization.splitChunks`代替原有的`CommonsChunkPlugin`(下篇文章会着重介绍)，和`Better Defaults-mode`更好的默认配置，这是大家稍微需要关注一下的。

| 废弃项                    | 替代项(optimization)       |          主要功能          |
| :------------------------ | :------------------------- | :------------------------: |
| UglifyjsWebpackPlugin     | .minmize                   |          压缩优化          |
| ModuleConcatenationPlugin | .opconcatenateModules      |       Scope hoisting       |
| CommonsChunkPlugin        | .splitChunks/.runtimeChunk |       Code splitting       |
| NoEmitOnErrorsPlugin      | noEmitOnErrors             | 编译出现错误，跳过输出阶段 |

> 如果想进一步了解 `Tree Shaking`和`SideEffects`的可见文末拓展阅读。
> _上图参考 [Webpack 4 进阶](https://zhuanlan.zhihu.com/p/35407642)_

### 默认配置

webpack 4 引入了`零配置`的概念，被 [parcel](https://github.com/parcel-bundler/parcel) 刺激到了。 不管效果怎样，这改变还是值得称赞的。

> 最近又新出了 [Fastpack](http://fastpack.io/) 可以关注一下。

言归正题，我们来看看 webpack 默认帮我们做了些什么?

`development` 模式下，默认开启了`NamedChunksPlugin` 和`NamedModulesPlugin`方便调试，提供了更完整的错误信息，更快的重新编译的速度。

```diff
module.exports = {
+ mode: 'development'
- devtool: 'eval',
- plugins: [
-   new webpack.NamedModulesPlugin(),
-   new webpack.NamedChunksPlugin(),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
- ]
}
```

`production` 模式下，由于提供了`splitChunks`和`minimize`，所以基本零配置，代码就会自动分割、压缩、优化，同时 webpack 也会自动帮你 `Scope hoisting` 和 `Tree-shaking`。

```diff
module.exports = {
+  mode: 'production',
-  plugins: [
-    new UglifyJsPlugin(/* ... */),
-    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
-    new webpack.optimize.ModuleConcatenationPlugin(),
-    new webpack.NoEmitOnErrorsPlugin()
-  ]
}
```

webpack 一直以来最饱受诟病的就是其配置门槛极高，配置内容极其复杂和繁琐，容易让人从入门到放弃，而它的后起之秀如 rollup、parcel 等均在配置流程上做了极大的优化，做到开箱即用，所以`webpack 4` 也从中借鉴了不少经验来提升自身的配置效率。**愿世间再也不需要 webpack 配置工程师**。

## html-webpack-plugin

用最新版本的的 `html-webpack-plugin`你可能还会遇到如下的错误：

`throw new Error('Cyclic dependency' + nodeRep)`

产生这个 bug 的原因是循环引用依赖，如果你没有这个问题可以忽略。

目前解决方案可以使用 Alpha 版本，`npm i --save-dev html-webpack-plugin@next`

或者加入`chunksSortMode: 'none'`就可以了。

但仔细查看文档发现设置成`chunksSortMode: 'none'`这样是会有问题的。

> Allows to control how chunks should be sorted before they are included to the HTML.

这属性会决定你 chunks 的加载顺序，如果设置为`none`，你的 chunk 加载在页面中加载的顺序就不能够保证了，可能会出现样式被覆盖的情况。比如我在`app.css`里面修改了一个第三方库`element-ui`的样式，通过加载顺序的先后来覆盖它，但由于设置为了`none`，打包出来的结果变成了这样：

```html
<link href="/app.8945fbfc.css" rel="stylesheet" />
<link href="/chunk-elementUI.2db88087.css" rel="stylesheet" />
```

`app.css`被先加载了，之前写的样式覆盖就失效了，除非你使用`important`或者其它 css 权重的方式覆盖它，但这明显是不太合理的。
`vue-cli`正好也有这个相关 [issue](https://github.com/vuejs/vue-cli/issues/1978#issuecomment-409267484)，尤雨溪也在不使用`@next`版本的基础上 hack 了它，有兴趣的可以自己研究一下，本人在项目中直接使用了`@next`版本，也没遇到其它什么问题（除了不兼容 webpack 的 `prefetch/preload` 相关 [issue](https://github.com/jantimon/html-webpack-plugin/issues/934)）。两种方案都可以，自行选择。

其它 `html-webpack-plugin` 的配置和之前使用没有什么区别。

## mini-css-extract-plugin

### 与 extract-text-webpack-plugin 区别

由于`webpack4`对 css 模块支持的完善以及在处理 css 文件提取的方式上也做了些调整，所以之前我们一直使用的`extract-text-webpack-plugin`也完成了它的历史使命，将让位于`mini-css-extract-plugin`。

使用方式也很简单，大家看着 [文档](https://github.com/webpack-contrib/mini-css-extract-plugin#minimal-example) 抄就可以了。

它与`extract-text-webpack-plugin`最大的区别是：它在`code spliting`的时候会将原先内联写在每一个 js `chunk bundle`的 css，单独拆成了一个个 css 文件。

原先 css 是这样内联在 js 文件里的：
![](https://user-gold-cdn.xitu.io/2018/7/24/164cb85b234d224a?w=2534&h=98&f=jpeg&s=50714)

将 css 独立拆包最大的好处就是 js 和 css 的改动，不会影响对方。比如我改了 js 文件并不会导致 css 文件的缓存失效。而且现在它自动会配合`optimization.splitChunks`的配置，可以自定义拆分 css 文件，比如我单独配置了`element-ui`作为单独一个`bundle`,它会自动也将它的样式单独打包成一个 css 文件，不会像以前默认将第三方的 css 全部打包成一个几十甚至上百 KB 的`app.xxx.css`文件了。

![](https://user-gold-cdn.xitu.io/2018/7/24/164cbd49dc148656?w=516&h=254&f=png&s=73856)

### 压缩与优化

打包 css 之后查看源码，我们发现它并没有帮我们做代码压缩，这时候需要使用 [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin) 这个插件，它不仅能帮你压缩 css 还能优化你的代码。

```js
//配置
optimization: {
  minimizer: [new OptimizeCSSAssetsPlugin()]
}
```

![](https://user-gold-cdn.xitu.io/2018/7/30/164e93dc299d7062?w=1778&h=764&f=jpeg&s=198182)

如上图测试用例所示，由于`optimize-css-assets-webpack-plugin`这个插件默认使用了 [cssnano](https://github.com/cssnano/cssnano) 来作 css 优化，
所以它不仅压缩了代码、删掉了代码中无用的注释、还去除了冗余的 css、优化了 css 的书写顺序，优化了你的代码 `margin: 10px 20px 10px 20px;` =>`margin:10px 20px;`。同时大大减小了你 css 的文件大小。更多优化的细节见[文档](https://cssnano.co/guides/optimisations)。

### contenthash

但使用 `MiniCssExtractPlugin` 有一个需求特别注意的地方，在默认文档中它是这样配置的：

```js
new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: devMode ? '[name].css' : '[name].[hash].css',
  chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
})
```

> 简单说明一下： `filename` 是指在你入口文件`entry`中引入生成出来的文件名，而`chunkname`是指那些未被在入口文件`entry`引入，但又通过按需加载（异步）模块的时候引入的文件。

在 **copy** 如上代码使用之后发现情况不对！每次改动一个`xx.js`文件，它对应的 css 虽然没做任何改动，但它的 文件 hash 还是会发生变化。仔细对比发现原来是 `hash` 惹的祸。 `6.f3bfa3af.css` => `6.40bc56f6.css`

![](https://user-gold-cdn.xitu.io/2018/7/24/164cbe27801ebf69?w=1214&h=308&f=png&s=162463)

但我这是根据官方文档来写的！为什么还有问题！后来在文档的**最最最**下面发下了这么一段话！

> For long term caching use filename: `[contenthash].css`. Optionally add [name].

非常的不理解，这么关键的一句话会放在 `Maintainers` 还后面的地方，默认写在配置里面提示大家不是更好？有热心群众已经开了一个`pr`，将文档默认配置为 `contenthash`。`chunkhash` => `contenthash`相关 [issue](https://github.com/webpack/webpack.js.org/issues/2096)。

这个真的蛮过分的，稍不注意就会让自己的 css 文件缓存无效。而且很多用户平时修改代码的时候都不会在意自己最终打包出来的 `dist`文件夹中到底有哪些变化。所以这个问题可能就一直存在了。浪费了多少资源！人艰不拆！大家觉得 webpack 难用不是没道理的。

### 这里再简单说明一下几种 hash 的区别：

- **hash**

`hash` 和每次 `build`有关，没有任何改变的情况下，每次编译出来的 `hash`都是一样的，但当你改变了任何一点东西，它的`hash`就会发生改变。

简单理解，你改了任何东西，`hash` 就会和上次不一样了。

- **chunkhash**

`chunkhash`是根据具体每一个模块文件自己的的内容包括它的依赖计算所得的`hash`，所以某个文件的改动只会影响它本身的`hash`，不会影响其它文件。

- **contenthash**

它的出现主要是为了解决，让`css`文件不受`js`文件的影响。比如`foo.css`被`foo.js`引用了，所以它们共用相同的`chunkhash`值。但这样子是有问题的，如果`foo.js`修改了代码，`css`文件就算内容没有任何改变，由于是该模块的 `hash` 发生了改变，其`css`文件的`hash`也会随之改变。

这个时候我们就可以使用`contenthash`了，保证即使`css`文件所处的模块里有任何内容的改变，只要 css 文件内容不变，那么它的`hash`就不会发生变化。

`contenthash` 你可以简单理解为是 `moduleId` + `content` 所生成的 `hash`。

## 热更新速度

其实相对 webpack 线上打包速度，我更关心的本地开发热更新速度，毕竟这才是和我们每一个程序员每天真正打交道的东西，打包一般都会扔给`CI`自动执行，而且一般项目每天也不会打包很多次。

`webpack 4`一直说自己更好的利用了`cache`提高了编译速度，但实测发现是有一定的提升，但当你一个项目，路由懒加载的页面多了之后，50+之后，热更新慢的问题会很明显，之前的[文章](https://juejin.im/post/595b4d776fb9a06bbe7dba56#heading-1)中也提到过这个问题，原以为新版本会解决这个问题，但并没有。

不过你首先要排斥你的热更新慢不是，如：

- 没有使用合理的 [Devtool](https://webpack.js.org/configuration/devtool/#devtool) souce map 导致
- 没有正确使用 [exclude/include](https://webpack.js.org/configuration/module/#rule-include) 处理了不需要处理的如`node_modules`
- 在开发环境不要压缩代码`UglifyJs`、提取 css、babel polyfill、计算文件 hash 等不需要的操作

**旧方案**

最早的方案是开发环境中不是用路由懒加载了，只在线上环境中使用。封装一个`_import`函数，通过环境变区分是否需要懒加载。

开发环境：

```js
module.exports = file => require('@/views/' + file + '.vue').default
```

生成环境：

```js
module.exports = file => () => import('@/views/' + file + '.vue')
```

但由于 webpack `import`实现机制问题，会产生一定的副作用。如上面的写法就会导致`@/views/`下的 所有`.vue` 文件都会被打包。不管你是否被依赖引用了，会多打包一些可能永远都用不到 js 代码。 [相关 issue](https://github.com/PanJiaChen/vue-element-admin/issues/292)

目前新的解决方案思路还是一样的，只在生成模式中使用路由懒加载，本地开发不使用懒加载。但换了一种没副作用的实现方式。

**新方案**

使用`babel` 的 `plugins` [babel-plugin-dynamic-import-node](https://github.com/airbnb/babel-plugin-dynamic-import-node)。它只做一件事就是：将所有的`import()`转化为`require()`，这样就可以用这个插件将所有异步组件都用同步的方式引入了，并结合 [BABEL_ENV](https://babeljs.io/docs/usage/babelrc/#env-option) 这个`bebel`环境变量，让它只作用于开发环境下。将开发环境中所有`import()`转化为`require()`，这种方案解决了之前重复打包的问题，同时对代码的侵入性也很小，你平时写路由的时候只需要按照官方[文档](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)路由懒加载的方式就可以了，其它的都交给`babel`来处理，当你不想用这个方案的时候，也只需要将它从`babel` 的 `plugins`中移除就可以了。

**具体代码：**

首先在`package.json`中增加`BABEL_ENV`

```json
"dev": "BABEL_ENV=development webpack-dev-server XXXX"
```

接着在`.babelrc`只能加入`babel-plugin-dynamic-import-node`这个`plugins`，并让它只有在`development`模式中才生效。

```json
{
  "env": {
    "development": {
      "plugins": ["dynamic-import-node"]
    }
  }
}
```

之后就大功告成了，路由只要像平时一样写就可以了。[文档](https://panjiachen.github.io/vue-element-admin-site/zh/guide/advanced/lazy-loading.html#%E6%96%B0%E6%96%B9%E6%A1%88)

```js
 { path: '/login', component: () => import('@/views/login/index')}
```

这样能大大提升你热更新的速度。基本两百加页面也能在`2000ms`的热跟新完成，基本做到无感刷新。当然你的项目本身就不大页面也不多，完全没必要搞这些。**当你的页面变化跟不是你写代码速度的时候再考虑也不迟。**

## 打包速度

`webpack 4` 在项目中实际测了下，普遍能提高 20%~30%的打包速度。

本文不准备太深入的讲解这部分内容，详细的打包优化速度可以参考[ slack 团队的这篇文章](https://slack.engineering/keep-webpack-fast-a-field-guide-for-better-build-performance-f56a5995e8f1)，掘金还有[译文](https://github.com/xitu/gold-miner/blob/master/TODO/keep-webpack-fast-a-field-guide-for-better-build-performance.md).

这里有几个建议来帮你加速 webpack 的打包速度。

首先你需要知道你目前打包慢，是慢在哪里。

我们可以用 [speed-measure-webpack-plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin#readme) 这个插件，它能监控 webpack 每一步操作的耗时。如下图：

![](https://user-gold-cdn.xitu.io/2018/7/31/164eee200ebc1911?w=554&h=492&f=jpeg&s=92342)

可以看出其实大部分打包花费的时间是在`Uglifyjs`压缩代码。和前面的提升热更新的切入点差不多，查看`source map`的正确与否，`exclude/include`的正确使用等等。

使用新版的`UglifyJsPlugin`的时候记住可以加上`cache: true`、`parall: true`，可以提搞代码打包压缩速度。更多配置可以参考 [文档](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) 或者 vue-cli 的 [配置](https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/uglifyOptions.js)。

编译的时候还有还有一个很慢的原因是那些第三方库。比如`echarts`、`element-ui`其实都非常的大，比如`echarts`打包完也还有 775kb。所以你想大大提高编译速度，可以将这些第三方库 `externals` 出去，使用`script`的方式引入，或者使用 `dll`的方式打包。经测试一般如`echarts`这样大的包可以节省十几秒到几十秒不等。

还有可以使用一些并行执行 webpack 的库：如[parallel-webpack](https://github.com/trivago/parallel-webpack)、[happypack](https://github.com/amireh/happypack)。

**顺便说一下，升级一下`node`可能有惊喜。前不久将`CI`里面的 node 版本依赖从 `6.9.2` => `8.11.3`，打包速度直接提升了一分多钟。**

总之我觉得打包时间控制在差不多的范围内就可以了，没必要过分的优化。可能你研究了半天，改了一堆参数发现其实也就提升了几秒，但维护成本上去了，得不偿失。还不如升级 node、升级 webpack、升级你的编译环境的硬件水平来的实在和简单。

比如我司`CI`使用的是腾讯云普通的的 8 核 16g 的机器，这个项目也是一个很大的后台管理项目 200+页面，引用了很多第三方的库，但没有使用什么`happypack`、`dll`，只是用了最新版的`webpack4`，`node@8.11.3`。
编译速度稳定在两分多钟，完全不觉得有什么要优化的必要。

![](https://user-gold-cdn.xitu.io/2018/7/29/164e5366dd1d9dec?w=896&h=236&f=jpeg&s=22563)

## Tree-Shaking

这其实并不是 webpack 4 才提出来的概念，最早是 [rollup](https://github.com/rollup/rollup) 提出来并实现的，后来在 webpack 2 中就实现了，本次在 webpack 4 只是增加了 `JSON Tree Shaking`和`sideEffects`能让你能更好的**摇**。

不过这里还是要提一下，默认 webpack 是支持`Tree-Shaking`的，但在你的项目中可能会因为`babel`的原因导致它失效。

因为`Tree Shaking`这个功能是基于`ES6 modules` 的静态特性检测，来找出未使用的代码，所以如果你使用了 babel 插件的时候，如：[babel-preset-env](https://babeljs.io/docs/en/babel-preset-env/)，它默认会将模块打包成`commonjs`，这样就会让`Tree Shaking`失效了。

其实在 webpack 2 之后它自己就支持模块化处理。所以只要让 babel 不`transform modules`就可以了。配置如下：

```js
// .babelrc
{
  "presets": [
    ["env", {
      modules: false,
      ...
    }]
  ]
}
```

顺便说一下都 8102 年了，请不要在使用`babel-preset-esxxxx`系列了，请用`babel-preset-env`，相关文章 [再见，babel-preset-2015](https://zhuanlan.zhihu.com/p/29506685)。

拓展阅读：

- [手摸手，带你用合理的姿势使用 webpack4 （下）](https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc)
- [Webpack 4 和单页应用入门](https://github.com/wallstreetcn/webpack-and-spa-guide)
- [Webpack 中的 sideEffects 到底该怎么用？](https://zhuanlan.zhihu.com/p/40052192)
- [你的 Tree-Shaking 并没什么卵用](https://zhuanlan.zhihu.com/p/32831172)
- [对 webpack 文档的吐槽](https://zhuanlan.zhihu.com/p/32148338)
- [Tree-Shaking 性能优化实践 - 原理篇](https://zhuanlan.zhihu.com/p/32554436)
- [再见，babel-preset-2015](https://zhuanlan.zhihu.com/p/29506685)
