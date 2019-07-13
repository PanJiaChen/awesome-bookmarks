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
