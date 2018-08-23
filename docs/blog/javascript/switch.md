## switch 作用域

其实我们经常会忽略一个点，switch case 是共用一个作用域的。

比如如下代码就会抛出重复定义的错误：

```js
switch (x) {
  case 0:
    let foo
    break

  case 1:
    let foo // 重复定义引起TypeError
    break
}
```

解决方案也很简单，我们给每一个 case 加上一个 bracket 就可以了：

```js
switch (x) {
  case 0: {
    let foo
    break
  }

  case 1: {
    let foo // 重复定义引起TypeError
    break
  }
}
```
