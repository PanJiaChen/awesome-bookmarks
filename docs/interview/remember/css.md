### css## css 相关知识

#### flex

作用在 flex 容器上

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

作用在 flex 子项上

- order
- flex-grow
- flex-shrink
- flex-basis
- flex
- align-self

### meta

具有 http-equiv 属性的 meta 标签，表示执行一个命令，这样的 meta 标签可以不需要 name 属性了。

```html
<!-- 默认使用最新浏览器 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<!-- 搜索引擎抓取 -->
<meta name="renderer" content="webkit">

<!-- 禁止缩放-->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">

<!-- 删除苹果默认的工具栏和菜单栏 -->
<meta name="apple-mobile-web-app-capable" content="yes">
```

### 元素

行内元素有：a b span img input select strong
块级元素有：div ul ol li dl dt dd h1 h2 h3 h4…p

### 盒模型

当设置为 box-sizing:content-box 时，将采用标准模式解析计算，也是默认模式；

当设置为 box-sizing:border-box 时，将采用怪异模式解析计算；

### first-child vs first-of-type

### 1px

### link 和@import 有什么区别

1.link 是 HTML 标签，@import 是 css 提供的。
2.link 引入的样式页面加载时同时加载，@import 引入的样式需等页面加载完成后再加载。
3.link 没有兼容性问题，@import 不兼容 ie5 以下。
4.link 可以通过 js 操作 DOM 动态引入样式表改变样式，而@import 不可以。
