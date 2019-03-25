## async/await with forEach()

> 2019-03-25

之前在工作中遇到了一个需求，实现一个简单的请求队列，大概意思就是这个页面有一个 list，我需要按 list 顺序依次发请求，多数据做一些操作，每次等前一个请求成功之后，再执行下一个，全部执行完毕之后，显示已完成。

这不就是用 `async/await`就可以实现了。于是写了如下代码：

```js
const waitFor = ms => new Promise(r => setTimeout(r, ms))
;[1, 2, 3].forEach(async num => {
  await waitFor(1000)
  console.log(num)
})
console.log('Done')
```

What？为什么`await`没有生效，直接就输出了`1,2,3`？谷歌搜索了一下，发现原来是`forEach`的锅。
我们简单来看一下 `forEach`的实现原理：

```js
Array.prototype.forEach = function(callback) {
  // this represents our array
  for (let index = 0; index < this.length; index++) {
    // We call the callback for each entry
    callback(this[index], index, this)
  }
}
```

我们可以看到它只是 for 循环的一个简单封装，而且在内部它只是简单做了一个回调，根本就不会`wait`。其实一些其它的数组方式比如`map`、`reduce`等等也是不支持的，因为 Array 的迭代方法就支持不支持参数函数返回 promise 的异步用法，有兴趣的可以自行了解。

那我们直接用 `for`循环不就好了

```js
async function test() {
  for (let index = 0; index < [1, 2, 3].length; index++) {
    await waitFor(1000)
    console.log(index)
  }
  console.log('done')
}
```

或者 `for-of`更为简单

```js
async function test() {
  for (let i of [1, 2, 3]) {
    await waitFor(1000)
    console.log(i)
  }
  console.log('done')
}
```
