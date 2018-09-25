## try catch 的 finally 坑

> 2018-09-24

try...catch 的 finally 可能很多人都没有使用过，它其实和 promise 中的 finally 很类似。 见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch)。

它无论是否有异常它都会执行。
常见的操作就是 将关闭弹窗或者 loading

```js
try {
  xxx
} catch (ex) {
  xxx
} finally {
  this.loading = false
}
```

但其实它也是有一个小坑的。我们先看如下代码：

```js
var fn = function() {
  try {
    console.log('ok')
    return 'ok'
  } catch {
    console.log('error')
    return 'error'
  } finally {
    console.log('finally')
    return 'finally'
  }
}
console.log(fn())
```

我们发现最终输出了`finally`。因为这个语句只会有一个 return，finally 中的 return 覆盖了之前的定义。而且 return 会被放在最后执行。[详情见](https://stackoverflow.com/questions/3837994/why-does-a-return-in-finally-override-try)。

可以改写成如下写法：

```js
ar fn = function() {
  var res=''
  try {
    res='ok'
  } catch {
    res='error'
  } finally {
    return res
  }
}
console.log(fn())
```

不过最好还是和 promise 中的 finally 一样，在里面做一些没有副作用的事情。免得发生一些 bug。
