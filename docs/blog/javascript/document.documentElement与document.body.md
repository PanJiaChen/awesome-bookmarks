## document.documentElement 与 document.body 区别

> 2018-08-13

在前端开发中，我们经常需要获取网页中滚动条滚过的长度，获取该值的方式一般通过`scrollTop`属性，如：`document.body.scrollTop`，或者`document.documentElement.scrollTop`，这两者都是经常用来获取文档滚动条滚过长度值的方式，他们又有什么区别呢？

之前一直没注意，只到有一天发现了一个 bug:`document.body.scrollTop` 拿到的值一直是 0。

在这个之前我们先来了解一下 `<!DOCTYPE HTML>`是干嘛的？为什么每个页面都需要加上这段声明。

> doctype 声明不属于 HTML 标签，它是一条指令，告诉浏览器编写页面所用的标记的版本。
> 这个声明的目的是防止浏览器在渲染文档时，切换到我们称为“[怪异模式(兼容模式)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Quirks_Mode_and_Standards_Mode)”的渲染模式。`<!DOCTYPE html>` 能确保浏览器按照最佳的相关规范进行渲染，而不是使用一个不符合规范的渲染模式。

`document.documentElement` 与 `document.body`

- document 代表的是整个文档(对于一个网页来说包括整个网页结构)
- document.documentElement 是整个文档节点树的根节点，在网页中即 html 标签
- document.body 是整个文档 DOM 节点树里的 body 节点，网页中即为 body 标签元素

但在标准模式下`document.body.scrollTop`是无效的。

> 从 Chrome 61 开始，标准模式中 document.scrollingElement 已被修正为 document.documentElement。换句话说，这个版本开始标准模式中 document.body.scrollTop 始终都等于 0。

所以这里建议使用兼容写法：

```js
const scrollTop = Math.max(
  window.pageYOffset,
  document.documentElement.scrollTop,
  document.body.scrollTop
)
```

或者

```js
function getBodyScrollTop() {
  const el =
    document.documentElement || document.scrollingElement || document.body
  return el.scrollTop
}
```

**每当这时候我就有一些怀念`jQuery`了**。
