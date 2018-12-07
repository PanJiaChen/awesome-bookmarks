## insertBefore 坑

> 2018-12-07

Node.insertBefore()很多人都用过， 它在参考节点之前插入一个节点作为一个指定父节点的子节点。

`var insertedNode = parentNode.insertBefore(newNode, referenceNode);`

但看文档还有一句补充说明：

> 如果 referenceElement 为 null 则 newElement 将被插入到子节点的末尾。如果 newElement 已经在 DOM 树中，newElement 首先会从 DOM 树中移除。

这就很坑了，如下面的例子：

```html
<div id="parentElement">
  <span id="bar">bar</span>
  <span id='foo'>foo</span>
</div>

<script>
var foo = document.getElementById("foo")
var bar = document.getElementById("bar")
var parentDiv = document.getElementById("parentElement")
parentDiv.insertBefore(foo, bar)
</script>
```

原本以为结果是 `foo` `bar` `foo`，但实际结果是`foo` `bar`。

因为根据文档，当你 insertBefore 的是一个已存在的值时，会移动它而不是拷贝它重新插入。贼坑！！！

如果使用 ES6 的话可以使用 `before`

```js
var foo = document.getElementById('foo')
var bar = document.getElementById('bar')
bar.before(foo)
```
