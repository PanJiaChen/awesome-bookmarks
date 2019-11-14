## e.target 与 e.currentTarget 的区别

> 2018-10-24

有一次在面试的时候问了事件委托的题目，面试人说了一个 currentTarget，突然发现`target`和`currentTarget`的区别我好像有些忘记了，垃圾 js，太多相似的 api 和属性了。

首先我们来看一下 MDN 上对它们的解释

- target：一个触发事件的对象的引用， 当事件处理程序在事件的冒泡或捕获阶段被调用时。
- currentTarget： 当事件遍历 DOM 时，标识事件的当前目标。它总是引用事件处理程序附加到的元素，而不是 event.target，event.target 标识事件发生的元素。

可能还是很抽象 ，这里提供一个在线[demo](https://jsbin.com/xekebepaqi/edit?html,js,console,output)。

也就是说，currentTarget 始终是监听事件者，而 target 是事件的真正发出者。
