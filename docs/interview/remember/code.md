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

### 去首尾空格

```js
function trim(s) {
  return s.replace(/^\s+/, '').replace(/\s+$/, '')
}
console.log(trim('  hellw wor    ld '))
```

### 异步调度器

```js
//JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善代码中Scheduler类，使得以下程序能正确输出
class Scheduler {
  constructor(max = 2) {
    this.max = max
    this.list = []
    this.running = 0
  }

  add(promiseCreator) {
    let r
    const p = new Promise(resolve => {
      r = resolve
    })
    this.list.push({
      promiseCreator,
      r
    })
    this.next()
    return p
  }

  next() {
    while (this.list.length && this.running < this.max) {
      this.running++
      const p = this.list.shift()
      const { promiseCreator, r } = p
      promiseCreator().then(() => {
        r()
        this.running--
        this.next()
      })
    }
  }
}

const timeout = time =>
  new Promise(resolve => {
    setTimeout(resolve, time)
  })

const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
```

### 略变态

[一道被前端忽略的基础题，不信看你会几题](https://juejin.im/post/5c6a0fa451882562851b3cdd)

### sleep

```js
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function test() {
  console.log(1)
  await sleep(2000)
  console.log(2)
}

test()
```

### koa compose

```js
const app = { middlewares: [] }

app.use = fn => {
  app.middlewares.push(fn)
}

app.compose = function() {
  const middleware = app.middlewares
  return function(next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch(i) {
      if (i <= index)
        return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

app.use(next => {
  console.log(1)
  next()
  console.log(2)
})

app.use(next => {
  console.log(3)
  next()
  console.log(4)
})

app.compose(app.middlewares)
```
