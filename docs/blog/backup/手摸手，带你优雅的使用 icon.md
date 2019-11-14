## 前言

> 本篇文章其实陆陆续续写了快半年，主体部分写好了很久了，但由于种种原因一直没有发布。
> 首先来说说写这篇文章的主要初衷是：在做前端后台项目的时候经常会用到很多 icon 图标，刚开始还好，但随着项目的不断迭代，每次修改添加图标会变得很麻烦，而且总觉得不够优雅，就开始琢磨着有啥简单方便的工作流呢？

## 演进史

首先我们来说一下前端 icon 的发展史。

**远古时代**
在我刚开始实习时，大部分图标都是用 img 来实现的。渐渐发现一个页面的请求资源中图片 img 占了大部分，所以为了优化有了`image sprite` 就是所谓的雪碧图，就是将多个图片合成一个图片，然后利用 css 的 background-position 定位显示不同的 icon 图标。但这个也有一个很大的痛点，维护困难。每新增一个图标，都需要改动原始图片，还可能不小心出错影响到前面定位好的图片，而且一修改雪碧图，图片缓存就失效了，久而久之你不知道该怎么维护了。

![](https://user-gold-cdn.xitu.io/2017/11/28/16000934d9f88e9c?w=528&h=68&f=png&s=9826)

**font 库**
后来渐渐地一个项目里几乎不会使用任何本地的图片了，而使用一些 font 库来实现页面图标。常见的如 [Font Awesome](http://fontawesome.io/) ，使用起来也非常的方便，但它有一个致命的缺点就是找起来真的很不方便，每次找一个图标特别的费眼睛，还有就是它的定制性也非常的不友善，它的图标库一共有 675 个图标，说少也不少，但还是会常常出现找不到你所需要图标的情况。当然对于没有啥特别 ui 追求的初创公司来说还是能忍一忍的。但随着公司的壮大，来了越来越多对前端指手画脚的人，丧心病狂的设计师，他们会说不！这 icon 这么丑，这简直是在侮辱他们高级设计师的称号啊！不过好在这时候有了[iconfont](http://iconfont.cn/) 。

**iconfont**
一个阿里爸爸做的开源图库，人家还有专门的 [github issue](https://github.com/thx/iconfont-plus/issues)(虽然我的一个 issue 半年多了也没回应/(ㄒ o ㄒ)/~~)，但人家的图标数量还是很惊人的，不仅有几百个公司的开源图标库，还有各式各样的小图标，还支持自定义创建图标库，所以不管你是一家创业公司还是对设计很有要求的公司，它都能很好的帮助你解决管理图标的痛点。你想要的基本都有~

![](https://user-gold-cdn.xitu.io/2017/10/19/92e198653125f31275907d20f9322dbc)

## iconfont 三种使用姿势

### unicode

最开始我们使用了`unicode`的格式，它主要的特点是
**优势**

- 兼容性最好，支持 ie6+
- 支持按字体的方式去动态调整图标大小，颜色等等

**劣势**

- 不支持多色图标
- 在不同的设备浏览器字体的渲染会略有差别，在不同的浏览器或系统中对文字的渲染不同，其显示的位置和大小可能会受到 font-size、line-height、word-spacing 等 CSS 属性的影响，而且这种影响调整起来较为困难

**使用方法：**
第一步：引入自定义字体 `font-face

```
 @font-face {
   font-family: "iconfont";
   src: url('iconfont.eot'); /* IE9*/
   src: url('iconfont.eot#iefix') format('embedded-opentype'), /* IE6-IE8 */
   url('iconfont.woff') format('woff'), /* chrome, firefox */
   url('iconfont.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
   url('iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
 }
```

第二步：定义使用 iconfont 的样式

```
.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
```

第三步：挑选相应图标并获取字体编码，应用于页面

```
<i class="iconfont">&#xe604;</i>
```

效果图：

![](https://user-gold-cdn.xitu.io/2017/10/19/212123363f183d2984e314cc89b9e113)

其实它的原理也很简单，就是通过 `@font-face` 引入自定义字体(其实就是一个字体库)，它里面规定了`&#xe604` 这个对应的形状就长这企鹅样。其实类似于 '花裤衩'，在不同字体设定下长得是不同的一样。

![](https://user-gold-cdn.xitu.io/2017/10/19/d142cf85062436fadef23bae4e3eafb3)

不过它的缺点也显而易见，`unicode`的书写不直观，语意不明确。光看`&#xe604;`这个`unicode`你完全不知道它代表的是什么意思。这时候就有了 `font-class`。

### font-class

与 unicode 使用方式相比，具有如下特点：

- 兼容性良好，支持 ie8+
- 相比于 unicode 语意明确，书写更直观。可以很容易分辨这个 icon 是什么。

**使用方法：**
第一步：拷贝项目下面生成的 fontclass 代码：

```
../font_8d5l8fzk5b87iudi.css
```

第二步：挑选相应图标并获取类名，应用于页面：

```
<i class="iconfont icon-xxx"></i>
```

效果图：

![image.png](https://user-gold-cdn.xitu.io/2017/10/19/b4e0fbe350b5be037b5622ce06bf0392)

它的主要原理其实是和 `unicode` 一样的，它只是多做了一步，将原先`&#xe604`这种写法换成了`.icon-QQ`，它在每个 class 的 before 属性中写了`unicode`,省去了人为写的麻烦。如 `.icon-QQ:before { content: "\e604"; }`

相对于`unicode` 它的修改更加的方便与直观。但也有一个大坑，之前楼主一个项目中用到了两组`font-class` 由于没有做好命名空间，所有的 class 都是放在`.iconfont` 命名空间下的，一上线引发了各种雪崩问题，修改了半天，所以使用`font-class`一定要注意命名空间的问题。

### symbol

随着万恶的某某浏览器逐渐淡出历史舞台，svg-icon 使用形式慢慢成为主流和推荐的方法。相关文章可以参考张鑫旭大大的文章[未来必热：SVG Sprite 技术介绍](http://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/?spm=a313x.7781069.1998910419.50)

- 支持多色图标了，不再受单色限制。
- 支持像字体那样通过 font-size,color 来调整样式。
- 支持 ie9+
- 可利用 CSS 实现动画。
- 减少 HTTP 请求。
- 矢量，缩放不失真
- 可以很精细的控制 SVG 图标的每一部分

**使用方法：**
第一步：拷贝项目下面生成的 symbol 代码：

```
引入  ./iconfont.js
```

第二步：加入通用 css 代码（引入一次就行）：

```css
<style type="text/css">
    .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
</style>
```

第三步：挑选相应图标并获取类名，应用于页面：

```html
<svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-xxx"></use>
</svg>
```

使用 svg-icon 的好处是我再也不用发送`woff|eot|ttf|` 这些很多个字体库请求了，我所有的 svg 都可以内联在 html 内。

![](https://user-gold-cdn.xitu.io/2017/10/19/9dae2c582c3d2d3d62e9b5079b82348a)
还有一个就是 svg 是一个真正的矢量，不管你再怎么的放缩它都不会失真模糊，而且 svg 可以控制的属性也更加的丰富，也能做出更加生动和复杂的图标。现在 ui 设计师平时都喜欢使用 sketch 来工作，只要轻松一键就能导出 svg 了，所以 svg 也更受设计师的青睐。[Inline SVG vs Icon Fonts ](https://css-tricks.com/icon-fonts-vs-svg/) 这篇文章详细的比较了 `svg` 和 `icon-font`的优劣，大家可以去看看。PS：这里其实还用到了 `SVG Sprite` 技术。简单的理解就是类 svg 的似雪碧图，它在一个 svg 之中运用 symbol 标示了一个一个的 svg 图标，这样一个页面中我们遇到同样的 svg 就不用重复再画一个了，直接使用`<use xlink:href="#icon-QQ" x="50" y="50" />` 就能使用了，具体的细节可以看这篇文章开头的文章 [未来必热：SVG Sprite 技术介绍](http://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/)，在之后的文章中也会手摸手叫你自己如何制作 `SVG Sprite`。

## 创建 icon-component 组件

我们有了图标，接下来就是如何在自己的项目中优雅的使用它了。
之后的代码都是基于 vue 的实例(ps: react 也很简单，原理都是类似的)

```html
//components/Icon-svg
<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
  export default {
    name: 'icon-svg',
    props: {
      iconClass: {
        type: String,
        required: true
      }
    },
    computed: {
      iconName() {
        return `#icon-${this.iconClass}`
      }
    }
  }
</script>

<style>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
```

```javascript
//引入svg组件
import IconSvg from '@/components/IconSvg'

//全局注册icon-svg
Vue.component('icon-svg', IconSvg)

//在代码中使用
<icon-svg icon-class="password" />
```

就这样简单封装了一个 `Icon-svg` 组件 ，我们就可以简单优雅的在自己的 vue 项目之中使用图标了。

## 进一步改造

但作为一个有逼格的前端开发，怎能就此满足呢!目前还是有一个致命的缺点的，就是现在所有的 `svg-sprite` 都是通过 iconfont 的 `iconfont.js` 生成的。

- 首先它是一段用 js 来生成 svg 的代码，所有图标 icon 都很**不直观**。

![如图所示](https://user-gold-cdn.xitu.io/2017/10/19/2338a1978a732b5cbc3995c3b5e57300)
你完全不知道哪个图标名对应什么图标，一脸尼克扬问号??? 每次增删改图标只能整体 js 文件一起替换。

- 其次它也做不到**按需加载**，不能根据我们使用了那些 svg 动态的生成 `svg-sprite`。
- **自定义性差**，通常导出的 svg 包含大量的无用信息，例如编辑器源信息、注释等。通常包含其它一些不会影响渲染结果或可以移除的内容。
- **添加不友善**，如果我有一些自定义的 svg 图标，该如何和原有的 `iconfont` 整合到一起呢？目前只能将其也上传到 `iconfont` 和原有的图标放在一个项目库中，之后再重新下载，很繁琐。

### 使用 svg-sprite

接下来我们就要自己来制作 `svg-sprite` 了。这里要使用到 [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader) 这个神器了， 它是一个 webpack loader ，可以将多个 svg 打包成 `svg-sprite` 。

我们来介绍如何在 `vue-cli` 的基础上进行改造，加入 `svg-sprite-loader`。

我们发现`vue-cli`默认情况下会使用 `url-loader` 对 svg 进行处理，会将它放在`/img` 目录下，所以这时候我们引入`svg-sprite-loader` 会引发一些冲突。

```js
//默认`vue-cli` 对svg做的处理，正则匹配后缀名为.svg的文件，匹配成功之后使用 url-loader 进行处理。
 {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('img/[name].[hash:7].[ext]')
    }
}
```

解决方案有两种，最简单的就是你可以将 test 的 svg 去掉，这样就不会对 svg 做处理了，当然这样做是很不友善的。

- 你不能保证你所有的 svg 都是用来当做 icon 的，有些真的可能只是用来当做图片资源的。
- 不能确保你使用的一些第三方类库会使用到 svg。

所以最安全合理的做法是使用 webpack 的 [exclude](https://webpack.js.org/configuration/module/#rule-exclude) 和 [include](https://webpack.js.org/configuration/module/#rule-include) ，让`svg-sprite-loader`只处理你指定文件夹下面的 svg，`url-loaer`只处理除此文件夹之外的所以 svg，这样就完美解决了之前冲突的问题。
代码如下

![](https://user-gold-cdn.xitu.io/2017/10/19/28b4391b217a47ab403c659480a192ef)

这样配置好了，只要引入 svg 之后填写类名就可以了

```js
import '@/src/icons/qq.svg; //引入图标

<svg><use xlink:href="#qq" /></svg>  //使用图标

```

单这样还是非常的不优雅，如果我项目中有一百个 icon，难不成我要手动一个个引入么！ **偷懒是程序员的第一生产力！！！**

## 自动导入

首先我们创建一个专门放置图标 icon 的文件夹如：`@/src/icons`，将所有 icon 放在这个文件夹下。
之后我们就要使用到 webpack 的 [require.context](https://webpack.js.org/guides/dependency-management/#require-context)。很多人对于 `require.context`可能比较陌生，直白的解释就是

> require.context("./test", false, /\.test\.js\$/);
> 这行代码就会去 test 文件夹（不包含子目录）下面的找所有文件名以 `.test.js` 结尾的文件能被 require 的文件。
> 更直白的说就是 我们可以通过正则匹配引入相应的文件模块。

require.context 有三个参数：

- directory：说明需要检索的目录
- useSubdirectories：是否检索子目录
- regExp: 匹配文件的正则表达式

了解这些之后，我们就可以这样写来自动引入 `@/src/icons` 下面所有的图标了

```js
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
```

之后我们增删改图标直接直接文件夹下对应的图标就好了，什么都不用管，就会自动生成 `svg symbol`了。

![](https://user-gold-cdn.xitu.io/2017/11/27/15ffc860a0fe3fed?w=1156&h=138&f=png&s=81800)

## 更进一步优化自己的 svg

首先我们来看一下 从 `阿里iconfont` 网站上导出的 svg 长什么样？

![](https://user-gold-cdn.xitu.io/2017/11/27/15ffcbc9289b7613?w=1482&h=362&f=png&s=202494)

没错虽然 iconfont 网站导出的 svg 内容已经算蛮精简的了，但你会发现其实还是与很多无用的信息，造成了不必要的冗余。就连 iconfont 网站导出的 svg 都这样，更不用说那些更在意 ui 漂不漂亮不懂技术的设计师了(可能)导出的 svg 了。好在 `svg-sprite-loader`也考虑到了这点，它目前只会获取 svg 中 path 的内容，而其它的信息一概不会获取。生成 svg 如下图：

![](https://user-gold-cdn.xitu.io/2017/11/27/15ffcc7231fc7aed?w=1146&h=105&f=png&s=50474)

但任何你在 path 中产生的冗余信息它就不会做处理了。如注释什么的

![](https://user-gold-cdn.xitu.io/2017/11/27/15ffcc9535745d8d?w=1512&h=296&f=png&s=124956)

这时候我们就要使用另一个很好用的东西了-- [svgo](https://github.com/svg/svgo)

> SVG files, especially exported from various editors, usually contain a lot of redundant and useless information such as editor metadata, comments, hidden elements, default or non-optimal values and other stuff that can be safely removed or converted without affecting SVG rendering result.

它支持几十种优化项，非常的强大，8k+的 star 也足以说明了问题。

详细的操作可以参照 [官方文档](https://github.com/svg/svgo) [张鑫旭大大的文章](http://www.zhangxinxu.com/wordpress/2016/02/svg-compress-tool-svgo-experience/)（没错又是这位大大的文章，或许这就是大佬吧！）本文就不展开了。

## 写在最后

上面大概阐述了一下前端项目中 icon 使用的演进史。
总的来说还是那句话，**适合的才是最好的**。就拿之前争论的选择 vue react 还是 angular，个人觉得每个框架都有自己的特点和适用的业务场景，所以所有不结合业务场景的推荐和讨论都是瞎 bb。。。如上文其实大概讲了五种前端 icon 的使用场景，第一种`Font Awesome`不用它并不是因为它不好，而是业务场景不适合，如果你团队没有专门的设计师或者对 icon 的自定义度不高完全可以使用它，[Font Awesome](https://github.com/FortAwesome/Font-Awesome) github 有五万多 star，足见社区对它的认可。还比如说，你们项目对低端浏览器有较高的适配要求，你还强行要用 svg 作为图标 icon，那你真的是存心和自己过不去了。所以所有方案都没有绝对的优与劣之分，适合自己业务场景，解决自己实际痛点，提高自己开发效率的方案就是好的方案。

## 占坑

本文所涉及的技术在 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 中可以找到完整的实例。
`vue-element-admin`也发布了新版本和配套的[中文文档](https://panjiachen.github.io/vue-element-admin-site/#/)(文档真的写的我要吐血了)不管使不使用本项目都推荐一看，应该能对你写 vue 的项目有所帮助。欢迎使用和提出不足。
楼主个人免费[圈子](https://jianshiapp.com/circles/1209)。

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
