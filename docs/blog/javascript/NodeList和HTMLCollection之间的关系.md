## NodeList 和 HTMLCollection 之间的关系？

> 2018-07-04

历史上的 DOM 集合接口。主要不同在于 `HTMLCollection`是元素集合而 NodeList 是节点集合（即可以包含元素，也可以包含文本节点）。所以 `node.childNodes` 返回 `NodeList`，而 `node.children` 和 `node.getElementsByXXX` 返回 `HTMLCollection` 。

唯一要注意的是 `querySelectorAll` 返回的虽然是 `NodeList` ，但是实际上是元素集合，并且是静态的（其他接口返回的 `HTMLCollection` 和 `NodeList` 都是 live 的）。

Both interfaces are collections of DOM nodes. They differ in the methods they provide and in the type of nodes they can contain. While a NodeList can contain any node type, an HTMLCollection is supposed to only contain Element nodes.
An HTMLCollection provides the same methods as a NodeList and additionally a method called namedItem.

Collections are always used when access has to be provided to multiple nodes, e.g. most selector methods (such as getElementsByTagName) return multiple nodes or getting a reference to all children (element.childNodes).
