# 常规面试题

事件委托应该是前端最经常问的一个问题。
但其实里面有非常非常多的知识点可以考察。

- css last-of-type last-child
- 事件委托的好处
- addEventListener 第三个参数
- target currentTarget
- 实现 index
- 类数组 => 数组
- querySelectorAll 方法相比 getElementsBy 系列方法有什么区别
- HTMLCollection NodeList 区别

https://www.zhihu.com/question/24702250

```js
const ul = window.document.getElementsByTagName('ul')[0]
ul.addEventListener('click', e => {
  const children = [...ul.getElementsByTagName('li')] //htmlCollection => array
  if (e.target && e.target.nodeName.toLowerCase() === 'li') {
    const index = children.indexOf(e.target)
    console.log(index)
  }
})
```

一道有意思的面试题
[100\*100 的 canvas 占多少内存？](https://juejin.im/post/5bdeb357e51d4536140fc7df)

## 你有必要知道的几个 JavaScript 面试题

### 1. 使用 typeof bar === "object" 判断 bar 是不是一个对象有神马潜在的弊端？如何避免这种弊端？

大部分情况下 typeof 是可信的，但 js 就是这样不靠谱，总是有一些边缘 case。

```js
typeof {} //'object'
typeof [] //'object'
typeof null //'object'
typeof new String() //'object'
typeof NaN //'number'

const var reg = /pop/g
typeof reg //'object'
```

这时候你可以说使用 `instanceof`。但 instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型。
简而言之就是

```js
'' instanceof String //false
new String() instanceof String //true
new String() instanceof Object //true
```

只有使用构造函数创建的基本类型可以正确显示。

所以到底有没有靠谱的校验类型方法？答案是有的 [详情见玉伯的分享](https://github.com/lifesinger/blog/issues/175)

```js
var toString = Object.prototype.toString

function isObject(obj) {
  return toString.call(obj) === '[object Object]'
}

function isString(obj) {
  return toString.call(obj) === '[object String]'
}

function isArray(obj) {
  return toString.call(obj) === '[object Array]'
}

function isFunction(obj) {
  return toString.call(obj) === '[object Function]'
}
```

附加问题：

- 我们知道 typeof new String("xxx") 返回 "object"，请问 typeof String("xxx") 返回什么？为什么？
  返回"string"，因为直接调用 String 返回的是一个字符串，而 new String 返回的是一个 String 对象。

### 2. 下面的代码会在 console 输出神马？为什么？

```js
;(function() {
  var a = (b = 3)
})()

console.log(typeof a)
console.log(b)
```

```js
console.log(typeof a) //undefined
console.log(b) //3
```

这题是以前比较常见的变量提升的问题
它实际执行步骤是这样子的

```js
b = 3
var a = b
```

并且 b 变成一个全局变量，而 a 还是一个局部变量，所以你在外部 console 是会报错的。

### 3. 下面的代码会在 console 输出神马？为什么？

```js
var myObject = {
  foo: 'bar',
  func: function() {
    var self = this
    console.log('outer func:  this.foo = ' + this.foo)
    console.log('outer func:  self.foo = ' + self.foo)
    ;(function() {
      console.log('inner func:  this.foo = ' + this.foo)
      console.log('inner func:  self.foo = ' + self.foo)
    })()
  }
}
myObject.func()
```

这题是最简单的作用域问题，没啥好讨论的了。

### 4. 将 JavaScript 代码包含在一个函数块中有神马意思呢？为什么要这么做？

换句话说，为什么要用立即执行函数表达式（Immediately-Invoked Function Expression）。

IIFE 有两个比较经典的使用场景，一是类似于在循环中定时输出数据项，二是类似于 JQuery/Node 的插件和模块开发。

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i)
  }, 1000)
}
```

上面的输出并不是你以为的 0，1，2，3，4，但输出的全部是 5，这时 IIFE 就能有用了：

```js
for (var i = 0; i < 5; i++) {
  ;(function(i) {
    setTimeout(function() {
      console.log(i)
    }, 1000)
  })(i)
}
```

ES6 的话，可以用 let

```js
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i)
  }, 1000)
}
```

而在 JQuery/Node 的插件和模块开发中，为避免变量污染，也是一个大大的 IIFE：

```js
;(function($) {
  //代码
})(jQuery)
```

### 5. 在严格模式('use strict')下进行 JavaScript 开发有神马好处？

- 消除 Javascript 语法的一些不合理、不严谨之处，减少一些怪异行为;
- 消除代码运行的一些不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的 Javascript 做好铺垫。

如 设置 undefined、给不可写属性赋值、严格模式禁用 with，函数不能重名等等
更多见 ： http://es6.ruanyifeng.com/#docs/module#%E4%B8%A5%E6%A0%BC%E6%A8%A1%E5%BC%8F

### 6. 下面两个函数的返回值是一样的吗？为什么？

```js
function foo1() {
  return {
    bar: 'hello'
  }
}

function foo2() {
  return
  {
    bar: 'hello'
  }
}
```

对于 return 、break、continue 等语句，如果后面紧跟换行，解析器一定会自动在后面填充分号(;)，所以上面的第二个函数就直接被 `return`了。

所以第二个函数是返回 `undefined`。

### 7. 神马是 NaN，它的类型是神马？怎么测试一个值是否等于 NaN?

NaN 是 Not a Number 的缩写，JavaScript 的一种特殊数值，其类型是 Number，可以通过 isNaN(param) 来判断一个值是否是 NaN：

```js
console.log(isNaN(NaN)) //true
console.log(isNaN(23)) //false
console.log(isNaN('23')) //false 因为执行的时候先回转化为数字 所以 '23'=> 23
console.log(isNaN('ds')) //true
console.log(isNaN('32131sdasd')) //true 先回 Number("123ABC") 结果是 NaN
console.log(NaN === NaN) //false
console.log(NaN === undefined) //false
console.log(undefined === undefined) //false
console.log(typeof NaN) //number
console.log(Object.prototype.toString.call(NaN)) //[object Number]
```

ES6 中，isNaN() 成为了 Number 的静态方法：Number.isNaN().

它的 polyfill 实现起来也很简单--利用了 NaN 自身永不相等于自身这一特征

```js
var isNaN = function(value) {
  var n = Number(value)
  return n !== n
}
```

```js
Number.isNaN = Number.isNaN || function(value) {
    return typeof value === "number" && isNaN(value);
}urn n !== n
}
```

### 8. 解释一下下面代码的输出

```js
console.log(0.1 + 0.2) //0.30000000000000004
console.log(0.1 + 0.2 == 0.3) //false
```

另一道非常经典的面试题，js 精度问题 [JavaScript 浮点数陷阱及解法](https://github.com/camsong/blog/issues/9)

JavaScript 存储任何数字都是遵循 `IEEE-754` 标准，使用 64 位固定长度来表示，也就是标准的 double 双精度浮点数。

所以为什 0.1+0.2=0.30000000000000004？
计算步骤为：

```js
// 0.1 和 0.2 都转化成二进制后再进行运算
0.00011001100110011001100110011001100110011001100110011010 +
0.0011001100110011001100110011001100110011001100110011010 =
0.0100110011001100110011001100110011001100110011001100111

// 转成十进制正好是 0.30000000000000004
```

解决方案 你可以使用一些成熟的库如：[big.js](https://github.com/MikeMcl/big.js)，[bignumber.js](https://github.com/MikeMcl/bignumber.js)。
或者对精度要求不高的情况下 直接 `toFixed`就可以了。

不过注意它得到的值可能是不准确的。

如：1.005.toFixed(2) 返回的是 1.00 而不是 1.01。

原因： 1.005 实际对应的数字是 1.00499999999999989，在四舍五入时全部被舍去！

### 9. 实现函数 isInteger(x) 来判断 x 是否是整数

可以将 x 转换成 10 进制，判断和本身是不是相等即可：

```js
function isInteger(x) {
  return parseInt(x, 10) === x
}
```

### 10. 在下面的代码中，数字 1-4 会以什么顺序输出？为什么会这样输出？

```js
;(function() {
  console.log(1)
  setTimeout(function() {
    console.log(2)
  }, 1000)
  setTimeout(function() {
    console.log(3)
  }, 0)
  console.log(4)
})()
```

最简单的运行提了，如果这都不会的话，真应该好好补习补习基础了。

### 11. 判断一个字符串是不是回文字符串

```js
function isPalindrome(str) {
  str = str.replace(/\W/g, '').toLowerCase()
  return (
    str ==
    str
      .split('')
      .reverse()
      .join('')
  )
}
```

### 12. 写一个按照下面方式调用都能正常工作的 sum 方法

```js
console.log(sum(2, 3)) // Outputs 5
console.log(sum(2)(3)) // Outputs 5
```

考察 `toString`、`valueOf` 略偏门。不知道的情况下，基本是写不出来的。
个人觉得拓展题更值得了解。

```js
function sum(...args) {
  var fn = function(...fnArgs) {
    return sum.apply(null, args.concat(fnArgs))
  }
  fn.toString = function() {
    return args.reduce(function(a, b) {
      return a + b
    })
  }
  return fn
}
```

变形题目：`console.log(sum(3)(4)(1)())`

```js
const sum = function(a) {
  return b => {
    if (b) {
      return sum(a + b)
    }
    return a
  }
}

console.log(sum(3)(4)(1)()) //8
```

再增加一点难度

`console.log(sum(3, 5)(4)(2, 1)(5)(3)()) //23`

```js
function add(arr) {
  return arr.reduce((acc, cur) => {
    acc = acc + cur
    return acc
  }, 0)
}

function sum(...args) {
  return (...newArgs) => {
    if (newArgs.length === 0) {
      return add(args)
    } else {
      return sum(...args, ...newArgs)
    }
  }
}
```

### 13. 据下面的代码片段回答后面的问题

```js
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button')
  btn.appendChild(document.createTextNode('Button ' + i))
  btn.addEventListener('click', function() {
    console.log(i)
  })
  document.body.appendChild(btn)
}
```

没啥难度，不说了

### 15. 下面的代码会输出什么？为什么？

```js
console.log(1 + '2' + '2')
console.log(1 + +'2' + '2')
console.log(1 + -'1' + '2')
console.log(+'1' + '1' + '2')
console.log('A' - 'B' + '2')
console.log('A' - 'B' + 2)
```

这个主要考察的隐式转换，规则太多太复杂了，我也记不住，如果真有面试官问你这个的话，随缘吧。

### 16. 解释下列代码的输出

```js
console.log('0 || 1 = ' + (0 || 1))
console.log('1 || 2 = ' + (1 || 2))
console.log('0 && 1 = ' + (0 && 1))
console.log('1 && 2 = ' + (1 && 2))
```

运算符优先级的问题，这题同上，遇到就随缘吧，我反正搞不清也记不住。

### 17. 解释下面代码的输出

```js
console.log(false == '0')
console.log(false === '0')
```

`==`和`===`的区别，太基础略。

#### 18. 解释下面代码的输出

```js
var a = {},
  b = { key: 'b' },
  c = { key: 'c' }

a[b] = 123
a[c] = 456

console.log(a[b])
```

偏门题

#### 19. 运算题

```js
function Foo() {
  getName = function() {
    alert(1)
  }
  return this
}
Foo.getName = function() {
  alert(2)
}
Foo.prototype.getName = function() {
  alert(3)
}
var getName = function() {
  alert(4)
}

function getName() {
  alert(5)
}
//请写出以下输出结果：
Foo.getName()
getName()
Foo().getName()
getName()
new Foo.getName()
new Foo().getName()
new new Foo().getName()
```

个人觉得看看就好，反正我没做对。出这道题来面试个人觉得蛮过分的。
详细解析：https://www.cnblogs.com/xxcanghai/p/5189353.html

#### 让下面的代码可以运行

```js
const a = [1, 2, 3, 4, 5]
// Implement this
a.multiply()
console.log(a) // [1, 2, 3, 4, 5, 1, 4, 9, 16, 25]
```

```js
Array.prototype.multiply =
  Array.prototype.multiply ||
  function() {
    const double = this.map(i => i * i)
    for (const item of double) {
      this.push(item)
    }
  }
```

## 移动端问题

### 1. 你怎么提高一个长列表在手机端滑动的流畅度

这里主要考察的是否知道 `passive`这个属性

首先解释一下为什么会卡顿：

> 当你触摸滑动页面时，页面应该跟随手指一起滚动。而此时你绑定了一个 touchstart 事件，你的事件大概执行 200 毫秒。这时浏览器就犯迷糊了：如果你在事件绑定函数中调用了 preventDefault，那么页面就不应该滚动，如果你没有调用 preventDefault，页面就需要滚动。但是你到底调用了还是没有调用，浏览器不知道。只能先执行你的函数，等 200 毫秒后，绑定事件执行完了，浏览器才知道，“哦，原来你没有阻止默认行为，好的，我马上滚”。此时，页面开始滚。

题外话，这里也可以考察你对`addEventListener`api 的熟练度，很多人其实不知道`addEventListener`其实第三个参数除了可以传`true` or `false`，还可以传一个对象。

```js
{
	capture: Boolean, // 表示`listener`会在该类型的事件捕获阶段传播到该`EventTarget`时触发
	once: Boolean, // 表示`listener`在添加之后最多只调用一次。如果是`true`，`listener`会在其被调用之后自动移除
	passive: Boolean, // 表示`listener`永远不会调用`preventDefault()`。如果`listener`仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告
}
```

拓展：will-change 、pointer-events

### 遍历 node 树

nodeType=1 代表是 element tag

```js
function traversal(node) {
  //对node的处理
  if (node && node.nodeType === 1) {
    console.log(node.tagName)
  }
  var i = 0,
    childNodes = node.childNodes,
    item
  for (; i < childNodes.length; i++) {
    item = childNodes[i]
    if (item.nodeType === 1) {
      //递归先序遍历子节点
      traversal(item)
    }
  }
}
```

### 创建长度为 100 的数组

```js
Array.from({ length: 100 }, (item, index) => index)
```

### aop

### 阶乘

尾递归写法：

```js
function factorial(num, total = 1) {
  if (num === 1) return total
  return factorial(num - 1, num * total)
}
```

```js
function factorial(num) {
  const dp = [1]

  for (let i = 1; i < num; i++) {
    dp[i] = dp[i - 1] * (i+1)
  }

  return dp[num-1]
```

### 斐波那契数列

动态规划解法：

```js
function factorial(num) {
  const dp = [1, 1]
  for (let i = 2; i < num; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[num - 1]
}
```

尾递归

```js
const fibonacci = (n, prev = 1, next = 1) => {
  if (n <= 1) return prev
  return fibonacci(n - 1, next, prev + next)
}
```

### 字符串 repeat 实现

`console.log('ni'.repeat(3)) // 'ninini'`

```js
// 循坏
String.prototype.repeat =
  String.prototype.repeat ||
  function(num) {
    let str = ''
    const baseStr = this
    for (let i = 0; i < num; i++) {
      str += baseStr
    }
    return str
  }

// 非循坏
String.prototype.repeat =
  String.prototype.repeat ||
  function(num) {
    return Array.from({ length: num }).join(this)
  }

// 或者使用`.fill()`，就不展开
```

### 深拷贝

### 节流

### 防抖

### 数组展平

```js
function flatten(arr) {
  let temp = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      const t = flatten(arr[i])
      temp = [...temp, ...t]
    } else {
      temp.push(arr[i])
    }
  }
  return temp
}
console.log(flatten([[1, 2], [3], [[[4], 5, [6, 7]]]]))
```

奇淫巧技写法

```js
arr.prototype.flat = function() {
  this.toString()
    .split(',')
    .map(item => +item)
}
```

原理： [1, 2, [3, 4, [5, 6]]].toString()
"1,2,3,4,5,6"

### 满足 if (a == 1 & a == 2 & a == 3)这个条件

```js
const a = {
  i: 1,
  toString() {
    return a.i++
  }
}
```

### 标签模板

很多人可能不知道模板字符串，它可以紧跟在一个函数名后面

```js
function getPersonInfo(one, two, three) {
  console.log(one)
  console.log(two)
  console.log(three)
}

const person = 'Lydia'
const age = 21

getPersonInfo`${person} is ${age} years old`
```

结果：`Lydia ["", "is", "years old"] 21`

### 运算题

```js
const obj = { a: 'one', b: 'two', a: 'three' }
console.log(obj)

// { a: "three", b: "two" }
```

### 运算题

```js
;(() => {
  let x, y
  try {
    throw new Error()
  } catch (x) {
    ;(x = 1), (y = 2)
    console.log(x)
  }
  console.log(x)
  console.log(y)
})()
// 1 undefined 2
```

### 运行题

```js
var a = { n: 1 }
var b = a
a.x = a = { n: 2 }
console.log(a.x)
console.log(b.x)
```
