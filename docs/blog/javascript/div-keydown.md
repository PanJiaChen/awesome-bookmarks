## div 如何监听 keydown 事件

> 2018-09-10

之前有一个人问我，为什么他监听了一个 div 的 keydown 事件，为什么没有用？
我看了一下代码发现的确没有写错？但为什么就不触发呢？

后来查阅了一下文档

> Focused element processing the key event, root element if no suitable input element focused

发现只有能被 focus 的元素才能出发键盘事件，所以 div 也就不能触发 keydown 事件了。

那怎么才能让 div 支持呢？

答案是 `tabindex` [mdn](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/tabindex)。它表示元素是可聚焦的，并且可以通过键盘导航来访问到该元素。

这样一来我们就能愉快的使用`keydown`事件了。
