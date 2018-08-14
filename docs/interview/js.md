# 常规面试题

事件委托应该是前端最经常问的一个问题。
但其实里面有非常非常多的知识点可以考察。

- css last-of-type last-child
- 事件委托的好处
- addEventListener 第三个参数
- 实现 index
- 类数组 => 数组
- querySelectorAll 方法相比 getElementsBy 系列方法有什么区别
- HTMLCollection NodeList 区别

https://www.zhihu.com/question/24702250

```js
const ul = window.document.getElementsByTagName("ul")[0]
ul.addEventListener("click", e => {
  const children = [...ul.getElementsByTagName("li")] //htmlCollection => array
  if (e.target && e.target.nodeName.toLowerCase() === "li") {
    const index = children.indexOf(e.target)
    console.log(index)
  }
})
```
