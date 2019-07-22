## 执行题

### 参数引用

```js
function changeObjProperty(o) {
  o.siteUrl = 'http://www.baidu.com'
  o = new Object()
  o.siteUrl = 'http://www.google.com'
}
let webSite = new Object()
changeObjProperty(webSite)
console.log(webSite.siteUrl)
```

### 对象的 key

```js
// example 1
var a = {},
  b = '123',
  c = 123
a[b] = 'b'
a[c] = 'c'
console.log(a[b])

// example 2
var a = {},
  b = Symbol('123'),
  c = Symbol('123')
a[b] = 'b'
a[c] = 'c'
console.log(a[b])

// example 3
var a = {},
  b = { key: '123' },
  c = { key: '456' }
a[b] = 'b'
a[c] = 'c'
console.log(a[b])
```

### 要求设计 LazyMan 类，实现以下功能 （必会）

```js
LazyMan('Tony')
// Hi I am Tony

LazyMan('Tony')
  .sleep(10)
  .eat('lunch')
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony')
  .eat('lunch')
  .sleep(10)
  .eat('dinner')
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony')
  .eat('lunch')
  .eat('dinner')
  .sleepFirst(5)
  .sleep(10)
  .eat('junk food')
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
```

```js
class LazyManClass {
  constructor(name) {
    console.log(`Hi I am ${name}`)
    this.stacks = []
    setTimeout(() => {
      this.start()
    }, 0)
  }
  eat(type) {
    this.stacks.push(() => {
      console.log(`I am eating ${type}`)
    })
    return this
  }
  delay(t) {
    return () => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(`等待了${t}秒...`)
          resolve()
        }, t * 1000)
      })
    }
  }
  sleep(t) {
    this.stacks.push(this.delay(t))
    return this
  }
  sleepFirst(t) {
    this.stacks.unshift(this.delay(t))
    return this
  }
  async start() {
    for (let i = 0; i < this.stacks.length; i++) {
      await this.stacks[i]()
    }
  }
}

function LazyMan(name) {
  return new LazyManClass(name)
}
LazyMan('Tony')
  .eat('lunch')
  .eat('dinner')
  .sleepFirst(5)
  .sleep(4)
  .eat('junk food')
```

### 连续赋值

```js
var a = { n: 1 }
var b = a
a.x = a = { n: 2 }

console.log(a.x)
console.log(b.x)
```

### 运算题

```js
var a = 10
;(function() {
  console.log(a)
  a = 5
  console.log(window.a)
  console.log(a)
  var a = 20
  console.log(a)
})()
```

### 获取元素的最终 background-color 略难 需要考虑很多情况

https://www.jianshu.com/p/e94b5779f998

### 实现 apply call

```js
Function.prototype.call2 =
  Function.prototype.call2 ||
  function(...args) {
    const context = args.shift() || window
    const fnName = Symbol('fn')
    context[fnName] = this
    const res = context[fnName](...args)
    delete context[fnName]
    return res
  }
```

```js
Function.prototype.apply2 =
  Function.prototype.apply2 ||
  function(...args) {
    const context = args.shift() || window
    const fnName = Symbol('fn')
    context[fnName] = this
    const res = context[fnName](...args[0])
    delete context[fnName]
    return res
  }

Function.prototype.apply2 = function(context, arr) {
  var context = context || window
  context.fn = this

  var result
  if (!arr) {
    result = context.fn()
  } else {
    var args = []
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']')
    }
    result = eval('context.fn(' + args + ')')
  }

  delete context.fn
  return result
}
```

### 实现一个 bind

### 函数提升

```js
function foo() {
  console.log('foo1')
}

foo() // foo2

function foo() {
  console.log('foo2')
}

foo() // foo2
```

### 函数和变量提升 优先级

```js
console.log(foo)

function foo() {
  console.log('foo')
}

var foo = 1
```

会打印函数，而不是 undefined 。

这是因为在进入执行上下文时，首先会处理函数声明，其次会处理变量声明，如果如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。

### this 指向

```js
var value = 1

var foo = {
  value: 2,
  bar: function() {
    return this.value
  }
}

//示例1
console.log(foo.bar()) // 2
//示例2
console.log(foo.bar()) // 2
//示例3
console.log((foo.bar = foo.bar)()) // 1
//示例4
console.log((false || foo.bar)()) // 1
//示例5
console.log((foo.bar, foo.bar)()) // 1

//严格模式下会报错
```

### 暂时性死区

```js
var a = 10 // 全局使用域
function foo() {
  console.log(a) // ReferenceError
  let a = 20
}
```

### 刁钻题

```js
parseInt(0.0000008)
// parseInt(string, radix)是这样工作的：如果第一个参数不是string，则先使用toString()。 0.000008.toString()不会使用科学计数法，但0.0000008.toString()会变成科学计数法的"8e-7"，所以parseInt(0.000008)就变成了parseInt("8e-7")，而这会被转成8
```
