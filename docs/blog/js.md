# js

## querySelectorAll getElementsBy 区别？

- 浏览器兼容

querySelectorAll 已被 IE 8+、FF 3.5+、Safari 3.1+、Chrome 和 Opera 10+ 良好支持 。getElementsBy 系列，以最迟添加到规范中的 getElementsByClassName 为例，IE 9+、FF 3 +、Safari 3.1+、Chrome 和 Opera 9+ 都已经支持该方法了。

- 接收参数

querySelectorAll 方法接收的参数是一个 CSS 选择符。而 getElementsBy 系列接收的参数只能是单一的 className、tagName 和 name。

```js
var c1 = document.querySelectorAll(".b1 .c");
var c2 = document.getElementsByClassName("c");
var c3 = document.getElementsByClassName("b2")[0].getElementsByClassName("c");
```

- 返回值

大部分人都知道，querySelectorAll 返回的是一个 Static Node List，而 getElementsBy 系列的返回的是一个 Live Node List。

```html
<ul>
  <li></ul>
  <li></ul>
  <li></ul>
  <li></ul>
  <li></ul>
</ul>

<script>
// Demo 1
var ul = document.querySelectorAll('ul')[0],
    lis = ul.querySelectorAll("li");
for(var i = 0; i < 5 ; i++){
    ul.appendChild(document.createElement("li"));
}

console.log(lis) //5

// Demo 2
var ul = document.getElementsByTagName('ul')[0],
    lis = ul.getElementsByTagName("li");
for(var i = 0; i < 5 ; i++){
    ul.appendChild(document.createElement("li"));
}

console.log(lis) //5+2

</script>
```

Demo 1 中的 lis 是一个静态的 Node List，是一个 li 集合的快照，对文档的任何操作都不会对其产生影响。

Demo 2 中的 lis 是一个动态的 Node List， 每一次调用 lis 都会重新对文档进行查询，导致无限循环的问题。

但为什么要这样设计呢？
其实，在 W3C 规范中对 querySelectorAll 方法有明确规定

> The NodeList object returned by the querySelectorAll() method must be static ([DOM], section 8).

那什么是 NodeList 呢？

> The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.

所以，NodeList 本质上是一个动态的 Node 集合，只是规范中对 querySelectorAll 有明确要求，规定其必须返回一个静态的 NodeList 对象。

```js
document.querySelectorAll("a").toString(); // return "[object NodeList]"
document.getElementsByTagName("a").toString(); // return "[object HTMLCollection]"
```

这里又多了一个 HTMLCollection 对象出来，那 HTMLCollection 又是什么？

实际上，HTMLCollection 和 NodeList 十分相似，都是一个动态的元素集合，每次访问都需要重新对文档进行查询。两者的本质上差别在于，HTMLCollection 是属于 Document Object Model HTML 规范，而 NodeList 属于 Document Object Model Core 规范。这样说有点难理解，看看下面的例子会比较好理解

```js
var ul = document.getElementsByTagName("ul")[0],
  lis1 = ul.childNodes,
  lis2 = ul.children;
console.log(lis1.toString(), lis1.length); // "[object NodeList]" 11
console.log(lis2.toString(), lis2.length); // "[object HTMLCollection]" 4
```

NodeList 对象会包含文档中的所有节点，如 Element、Text 和 Comment 等。HTMLCollection 对象只会包含文档中的 Element 节点。另外，HTMLCollection 对象比 NodeList 对象 多提供了一个 namedItem 方法。所以在现代浏览器中，querySelectorAll 的返回值是一个静态的 NodeList 对象，而 getElementsBy 系列的返回值实际上是一个 HTMLCollection 对象 。

[参照文章](https://www.zhihu.com/question/24702250)

## NodeList 和 HTMLCollection 之间的关系？

历史上的 DOM 集合接口。主要不同在于 `HTMLCollection`是元素集合而 NodeList 是节点集合（即可以包含元素，也可以包含文本节点）。所以 `node.childNodes` 返回 `NodeList`，而 `node.children` 和 `node.getElementsByXXX` 返回 `HTMLCollection` 。

唯一要注意的是 `querySelectorAll` 返回的虽然是 `NodeList` ，但是实际上是元素集合，并且是静态的（其他接口返回的 `HTMLCollection` 和 `NodeList` 都是 live 的）。

Both interfaces are collections of DOM nodes. They differ in the methods they provide and in the type of nodes they can contain. While a NodeList can contain any node type, an HTMLCollection is supposed to only contain Element nodes.
An HTMLCollection provides the same methods as a NodeList and additionally a method called namedItem.

Collections are always used when access has to be provided to multiple nodes, e.g. most selector methods (such as getElementsByTagName) return multiple nodes or getting a reference to all children (element.childNodes).

## ["1", "2", "3"].map(parseInt) 坑

```js
["1", "2", "3"].map(parseInt);
```

第一反应都觉得结果会是 `[1,2,3]`

但实际结果却是 `[1, NaN, NaN]`

这是为什么呢？主要是 `map` 这个方法在调用 `callback`函数时，会给它传递三个参数:

- 当前正在遍历的元素
- 元素索引
- 原数组本身

也是就是说如上代码其实等同于

```js
["1", "2", "3"].map((i, index, array) => parseInt(i, index, array));
```

这样就直观的解释了上面的答案是怎么产生得了。因为 `parseInt` 会接受两个参数：参数和进制数。

```js
// 实际代码运算等于如下
parseInt("1", 0); // 1
parseInt("2", 1); // NaN
parseInt("3", 2); // NaN
```

所以为了避免这个坑，平时写 `map` 还是不要偷懒了，完整的写法才更直观并且更容易维护。

```js
["1", "2", "3"].map(str => parseInt(str));
```
