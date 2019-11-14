### css

## css 相关知识

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

https://www.zhangxinxu.com/wordpress/2018/10/display-flex-css3-css/

### meta

具有 http-equiv 属性的 meta 标签，表示执行一个命令，这样的 meta 标签可以不需要 name 属性了。

```html
<!-- 默认使用最新浏览器 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

<!-- 搜索引擎抓取 -->
<meta name="renderer" content="webkit" />

<!-- 禁止缩放-->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui"
/>

<!-- 删除苹果默认的工具栏和菜单栏 -->
<meta name="apple-mobile-web-app-capable" content="yes" />
```

### 元素

行内元素有：a b span img input select strong
块级元素有：div ul ol li dl dt dd h1 h2 h3 h4…p

### 盒模型

当设置为 box-sizing:content-box 时，将采用标准模式解析计算，也是默认模式；

当设置为 box-sizing:border-box 时，将采用怪异模式解析计算；

### first-child vs first-of-type

### 1px

dpr 0.5 px
border-image
box-shadow 模拟
伪类 + transform
viewport&&rem

### link 和@import 有什么区别

1.link 是 HTML 标签，@import 是 css 提供的。
2.link 引入的样式页面加载时同时加载，@import 引入的样式需等页面加载完成后再加载。
3.link 没有兼容性问题，@import 不兼容 ie5 以下。
4.link 可以通过 js 操作 DOM 动态引入样式表改变样式，而@import 不可以。

### BFC

BFC 全称为 块格式化上下文 (Block Formatting Context) 。

- position 为 absolute 或 fixed
- float 不是 none
- overflow 值不为 visible 的块元素

### 清浮动

- clear:both 伪元素
- 将父元素的 overflow 属性修改为 overflow:auto|hidden
- display:table
- position 为 absolute 或 relative
- display 为 inline-block, table-cell, table-caption

### 伪元素 伪类

伪类用于当已有元素处于的某个状态时，为其添加对应的样式
伪元素用于创建一些不在文档树中的元素，并为其添加样式。比如说，我们可以通过:before 来在一个元素前增加一些文本

### 分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景。

- display: none;
  DOM 结构：浏览器不会渲染 display 属性为 none 的元素，不占据空间；
  事件监听：无法进行 DOM 事件监听；
  性能：动态改变此属性时会引起重排，性能较差；
  继承：不会被子元素继承，毕竟子类也不会被渲染；
  transition：transition 不支持 display。

- visibility: hidden;
  DOM 结构：元素被隐藏，但是会被渲染不会消失，占据空间；
  事件监听：无法进行 DOM 事件监听；
  性 能：动态改变此属性时会引起重绘，性能较高；
  继 承：会被子元素继承，子元素可以通过设置 visibility: visible; 来取消隐藏；
  transition：transition 不支持 display。

- opacity: 0;
  DOM 结构：透明度为 100%，元素隐藏，占据空间；
  事件监听：可以进行 DOM 事件监听；
  性 能：提升为合成层，不会触发重绘，性能较高；
  继 承：会被子元素继承,且，子元素并不能通过 opacity: 1 来取消隐藏；
  transition：transition 不支持 opacity。

### 水平垂直居中

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/92

### web 语义化

内容与样式分离。这样我们在提供内容的时候，首先要做的就是将内容本身进行合理的描述，暂时不用考虑它的最终呈现会是什么样子。

HTML 规范其实一直在往语义化的方向上努力，许多元素、属性在设计的时候，就已经考虑了如何让各种用户代理甚至网络爬虫更好地理解 HTML 文档。HTML5 更是在之前规范的基础上，将所有表现层（presentational）的语义描述都进行了修改或者删除，增加了不少可以表达更丰富语义的元素。为什么这样的语义元素是有意义的？因为它们被广泛认可。所谓语义本身就是对符号的一种共识，被认可的程度越高、范围越广，人们就越可以依赖它实现各种各样的功能

翻页：`rel="prev", rel="next"` link

a 标签 添加 nofollow 告诉 google 不抓取

article aside main

HTML `<s>` 元素 使用删除线来渲染文本。使用 `<s>` 元素来表示不再相关

相关资料：http://justineo.github.io/slideshows/semantic-html

### strong b

b 和 i 是样式上强调。
strong 和 em 是语义上强调。

### transform translate transition

animation（动画）:用于设置动画属性，他是一个简写的属性，包含 6 个属性
transition（过渡）:用于设置元素的样式过度，和 animation 有着类似的效果，但细节上有很大的不同
transform（变形）:用于元素进行旋转、缩放、移动或倾斜，和设置样式的动画并没有什么关系，就相当于 color 一样用来设置元素的“外表”
translate（移动）:translate 只是 transform 的一个属性值，即移动。
