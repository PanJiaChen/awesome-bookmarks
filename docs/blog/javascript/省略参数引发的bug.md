## 省略参数引发的 bug

> 2018-07-12

省略参数是 es6 之后提供的一个很好用也非常常用的功能。但还是有一些细节值得注意，不然一不小心就会出现 bug。

```js
function test(num = 1) {
  console.log(num)
}

test() // (num is set to 1)
test(undefined) // (num is set to 1 too)

test("") // (num is set to '')
test(null) // (num is set to null)
test(false) // (num is set to false)
```

如上面 demo 所示，只有参数没传或者是 `undefined` 是才会生效，其它情况默认参数并不会起作用。

所以有的时候你传入了`''`空字符串是不行的，还需要自己手动判断一下。

`str = str || defalutString`

另外，一个容易忽略的地方是，参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。

```js
let x = 99
function foo(p = x + 1) {
  console.log(p)
}

foo() // 100

x = 100
foo() // 101
```

上面代码中，参数 p 的默认值是 x + 1。这时，每次调用函数 foo，都会重新计算 x + 1，而不是默认 p 等于 100。
