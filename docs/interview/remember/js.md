## JS 基础

### mouseenter 与 mouseover 区别

mouseenter 和 mouseleave 只有是 target element 的时候才会触发。 mouseover 和 mouseleave 会冒泡， 子元素也会触发。

### e.target 与 e.currentTarget

e.target 指向触发事件监听的对象。

e.currentTarget 指向添加监听事件的对象。

### isNaN vs Number.isNaN

Number.isNaN() 方法确定传递的值是否为 NaN 和其类型是 Number。它是原始的全局 isNaN()的更强大的版本。

```js
isNaN('a') //true
Number.isNaN('a') //true
```

### Number.isSafeInteger()

用来判断传入的参数值是否是一个“安全整数”（safe integer）。一个安全整数是一个符合下面条件的整数

安全整数范围为 -(253 - 1)到 253 - 1 之间的整数

### js 数值的最大最小值范围

http://javascript.ruanyifeng.com/grammar/number.html

BigInt

### 数组长度上限

Math.pow(2,32)-1

### toString valueOf

### addEventListener

- 内存泄漏问题，只有保持静态函数引用才能被 `removeEventListener` 移除。
- passive: 提升页面滑动的流畅度
- useCapture: 事件捕获阶段触发 handler
- once: 只触发一次

### 哪些事件不会事件冒泡

- UI 事件
  - load
  - unload
  - scroll
  - resize
- 焦点事件
  - blur
  - focus
- 鼠标事件
  - mouseleave
  - mouseenter

### dispatchEvent

通过 dispatchEvent `new CustomEvent('myEvent', {detail:123});` 来触发自定义事件

注意 new Event('build') vs new CustomEvent('build')

### JSONP 原理

- 在使用 JSONP 的时候必须要保证使用的 JSONP 服务必须是安全可信的。会有安全问题
- JSONP 在调用失败的时候不会返回各种 HTTP 状态码
- JSONP 只支持 GET 请求而不支持 POST 等其它类型的 HTTP 请求。

### 7 中类型

Number 、Null、Undefined、String、 Boolean 、Object 、Symbol

### 原生对象

![](https://wpimg.wallstcn.com/5c2fdb22-51ca-4206-918d-042ad5dbee1f.png)

### null vs undefined

- null 表示"没有对象"，即该处不应该有值
  （1） 作为函数的参数，表示该函数的参数不是对象。
  （2） 作为对象原型链的终点。

- undefined 表示"缺少值"，就是此处应该有一个值，但是还没有定义。
  （1）变量被声明了，但没有赋值时，就等于 undefined。
  （2) 调用函数时，应该提供的参数没有提供，该参数等于 undefined。
  （3）对象没有赋值的属性，该属性的值为 undefined。
  （4）函数没有返回值时，默认返回 undefined。

### 为什么用 void 0 代替 undefined

答案很简单，undefined 并不是保留词（reserved word），它只是全局对象的一个属性，在低版本 IE 中能被重写。
undefined 在 ES5 中已经是全局对象的一个只读（read-only）属性了，它不能被重写。但是在局部作用域中，还是可以被重写的。
那么，ES5 大环境下，void 0 就没有用武之地了吗？答案是否定的，用 void 0 代替 undefined 能节省不少字节的大小，事实上，不少 JavaScript 压缩工具在压缩过程中，正是将 undefined 用 void 0 代替掉了。不少基础库如 underscore、vue 都是用 void 0 的

### charCodeAt vs codePointAt

JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为 2 个字节。对于那些需要 4 个字节储存的字符（Unicode 码点大于 0xFFFF 的字符），JavaScript 会认为它们是两个字符。ES6 提供了 codePointAt()方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。

```js
let s = '𠮷a'
s.codePointAt(0) // 134071
s.codePointAt(1) // 57271

s.codePointAt(2) // 97
```

### 精度问题

es6 解决方案：

```js
console.log(Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON)
```

IEEE 754
使用 64 位固定长度来表示，也就是标准的 double 双精度浮点数（相关的还有 float 32 位单精度）。计算机组成原理中有过详细介绍，如果你不记得也没关系。

这样的存储结构优点是可以归一化处理整数和小数，节省存储空间。

64 位比特又可分为三个部分：

符号位 S：第 1 位是正负数符号位（sign），0 代表正数，1 代表负数
指数位 E：中间的 11 位存储指数（exponent），用来表示次方数
尾数位 M：最后的 52 位是尾数（mantissa），超出的部分自动进一舍零

### Object.create vs new Function

```js
Object.create = function(o) {
  var F = function() {} // 隐式构造函数
  F.prototype = o
  return new F() // 返回一个new
}
```

延伸： Object.create(null) vs {}

https://panjiachen.github.io/awesome-bookmarks/blog/js.html#object-create-null-vs

<!-- TODO -->

### 继承的多种方式

- 原型链继承
- 借用构造函数(经典继承)
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生组合式继承

https://github.com/mqyqingfeng/Blog/issues/16

### 普通函数 构造函数 箭头函数

构造函数：

1. 构造函数使用 new 关键字调用；普通函数不用 new 关键字调用；
2. 构造函数内部可以使用 this 关键字；普通函数内部不建议使用 this，因为这时候 this 指向的是 window 全局对象，这样无意间就会为 window 添加了一些全局变量或函数
3. 构造函数默认不用 return 返回值；普通函数一般都有 return 返回值
4. 构造函数首字母一般大写

箭头函数：

1. 函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。
2. 不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。
3. 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
4. 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。
   https://segmentfault.com/a/1190000015162781

箭头函数不适用场景：

- 定义字面量方法

```js
const calculator = {
  array: [1, 2, 3],
  sum: () => {
    console.log(this === window) // => true
    return this.array.reduce((result, item) => result + item)
  }
}
console.log(this === window) // => true
// Throws "TypeError: Cannot read property 'reduce' of undefined"
calculator.sum()
```

- 定义原型方法
  如上同理

- 是需要动态 this 的时候，也不应使用箭头函数。

```js
const button = document.getElementById('myButton')
button.addEventListener('click', function() {
  console.log(this === button) // => true
  this.innerHTML = 'Clicked button'
})
```

上面代码运行时，点击按钮会报错，因为 button 的监听函数是一个箭头函数，导致里面的 this 就是全局对象。如果改成普通函数，this 就会动态指向被点击的按钮对象。

### 类型判断

### 字符串有最大长度吗

JS 字符串的长度受到下标限制。理论最大长度是 2^53-1（即 js 中可表达的最大安全整数）。

### promise

#### promise.resolve 一定是走 success 的么？

```js
const p1 = new Promise(function(resolve, reject) {
  setTimeout(() => reject('apple'), 1000)
})
const p2 = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})
p2.then(result => console.log('result')).catch(error =>
  console.log(error + '---error')
)
```

#### catch 的两种写法

Promise.prototype.catch 方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。

#### reject

reject 方法的作用，等同于抛出错误。
如果 Promise 状态已经变成 resolved，再抛出错误是无效的。
因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。

```js
const promise = new Promise(function(resolve, reject) {
  resolve('ok')
  console.log('apple') // 但还是会执行
  throw new Error('test')
})
promise
  .then(function(value) {
    console.log(value)
  })
  .catch(function(error) {
    console.log(error)
  })
// ok
```

#### allSettled,any

#### generator

实现一个状态机

```js
var clock = function*() {
  while (true) {
    console.log('Tick!')
    yield
    console.log('Tock!')
    yield
  }
}
const g = clock()
g.next()
g.next()
```

#### 协程与子例程的差异

协程（coroutine）是一种程序运行的方式，可以理解成“协作的线程”或“协作的函数”。
协程既可以用单线程实现，也可以用多线程实现。前者是一种特殊的子例程，后者是一种特殊的线程。

传统的“子例程”（subroutine）采用堆栈式“后进先出”的执行方式，只有当调用的子函数完全执行完毕，才会结束执行父函数。协程与其不同，多个线程（单线程情况下，即多个函数）可以并行执行，但是只有一个线程（或函数）处于正在运行的状态，其他线程（或函数）都处于暂停态（suspended），线程（或函数）之间可以交换执行权。也就是说，一个线程（或函数）执行到一半，可以暂停执行，将执行权交给另一个线程（或函数），等到稍后收回执行权的时候，再恢复执行。这种可以并行执行、交换执行权的线程（或函数），就称为协程。

http://es6.ruanyifeng.com/#docs/generator#Generator-%E4%B8%8E%E5%8D%8F%E7%A8%8B

### 宏观任务 微观任务

由于我们这里主要讲 JavaScript 语言，那么采纳 JSC 引擎的术语，我们把宿主发起的任务称为宏观任务，把 JavaScript 引擎发起的任务称为微观任务。

macro-task 包括：script(整体代码,主进程), setTimeout, setInterval, setImmediate, I/O, UI rendering, requestAnimationFrame。
micro-task 包括：process.nextTick, Promise 回调, Object.observe(已废弃), MutationObserver(DOM 变化监听器)

```js
console.log('script start')
setTimeout(function() {
  console.log('setTimeout')
}, 0)
Promise.resolve()
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
    var begin = Date.now()
    while (Date.now() - begin < 1000);
    console.log('apple')
  })
console.log('script end')
```

process.nextTick > Promise.then > MutationObserver

JS stack => Microtasks => Tasks
Tasks

延伸： vue 的 nextTick 是什么

https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
https://juejin.im/post/59e85eebf265da430d571f89
https://juejin.im/post/5b35cdfa51882574c020d685

### setTimeout setInterval setImmediate process.nextTick

```js
// test.js
setTimeout(() => console.log(1))
setImmediate(() => console.log(2))
process.nextTick(() => console.log(3))
Promise.resolve().then(() => console.log(4))
;(() => console.log(5))()
```

http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html

注意

```js
setTimeout(() => console.log(1))
setImmediate(() => console.log(2))
```

他们两者的执行顺序是不确定的
https://imweb.io/topic/5b148768d4c96b9b1b4c4ea1

### setTimeout setInterval

对于 setInterval(fn,ms)来说，我们已经知道不是每过 ms 秒会执行一次 fn，而是每过 ms 秒，会有 fn 进入 Event Queue。
一旦 setInterval 的回调函数 fn 执行时间超过了延迟时间 ms，那么就完全看不出来有时间间隔了

### event loop

timers
I/O callbacks
idle, prepare
poll
check
close callbacks

### 浏览器和 Node 事件循环的区别

ibev 只能在 Unix 环境下运行。Windows 平台上与 kqueue(FreeBSD)或者(e)poll(Linux)等内核事件通知相应的机制是 IOCP。
libuv 提供了一个跨平台的抽象，由平台决定使用 libev 或 IOCP。

们所看到的 node.js 单线程只是一个 js 主线程，本质上的异步操作还是由线程池完成的，node 将所有的阻塞操作都交给了内部的线程池去实现，本身只负责不断的往返调度，并没有进行真正的 I/O 操作，从而实现异步非阻塞 I/O，这便是 node 单线程和事件驱动的精髓之处了。

### promise 原理

### async await

## webpack

### tree-shaking

### typeOf

[玉伯的分析](https://github.com/lifesinger/blog/issues/175)

`Object.prototype.toString.call(obj)`

instanceof 在 iframe 中会有问题。因为多个窗口意味着多个全局环境，不同的全局环境拥有不同的全局对象，从而拥有不同的内置类型构造函数。

```js
'' instanceof String //false
new String() instanceof String //true
new String() instanceof Object //true
```

Object.prototype.toString 的原理是：
在 toString 方法被调用时,会执行下面的操作步骤:
获取 this 对象的[[Class]]属性的值，es6 中已调整为 `NativeBrand`
由于是获取 this 的属性，所以必须要使用 call 或者 apply。

### Object.defineProperty

value, writable,enumerable,configurable

### proxy

双向绑定一般有如下几种方法：

- 发布-订阅 KnockoutJS
- 脏检查 Angular
- Object.defineProperty Vue2.x
- proxy Vue3.x

Proxy 是 Object.defineProperty 的全方位加强版，可以直接监听对象而非属性，Proxy 可以直接监听数组的变化。
[实现双向绑定 Proxy 比 defineProperty 优劣如何](https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf)

### 尾调用

### new 做了些什么

四大步骤：

1、创建一个空对象，并且 this 变量引用该对象，// lat target = {};

2、继承了函数的原型。// target.proto = func.prototype;

3、属性和方法被加入到 this 引用的对象中。并执行了该函数 func// func.call(target);

4、新创建的对象由 this 所引用，并且最后隐式的返回 this 。// 如果 func.call(target)返回的 res 是个对象或者 function 就返回它

```js
function new(func) {
	lat target = {};
	target.__proto__ = func.prototype;
	let res = func.call(target);
	if (typeof(res) == "object" || typeof(res) == "function") {
		return res;
	}
	return target;
}
```

### MVC MVP MVVM

- MVC: Controller 作为 View 层和 Model 层之间的连接点，连接 View -> Model 之间的通信，Model 层的数据更新后会通知 View 层的视图更新并反馈给用户。View 和 Model 之间的强耦合度会加大调试时的难度。
- MVP: Presenter 承接起了 View 和 Model 之间的双向通信，View 与 Model 不发生联系，降低了耦合度且方便单元测试。
- MVVM: ViewModel 中构建了一组状态数据，作为 View 状态的抽象，通过双向数据绑定使 ViewModel 中的状态数据与 View 的显示状态保持一致，这样 View 的显示状态变化会自动更新 ViewModel 的状态数据，ViewModel 状态数据的变化也会自动同步 View 的显示状态。

https://www.zhihu.com/question/20148405

### 前端模块

### fetch 优缺点

- 符合关注分离，没有将输入、输出和用事件来跟踪的状态混杂在一个对象里
  更好更方便的写法
- 更加底层，提供的 API 丰富（request, response）
- 脱离了 XHR，是 ES 规范里新的实现方式
- fetchtch 只对网络请求报错，对 400，500 都当做成功的请求，需要封装去处理
- fetch 默认不会带 cookie，需要添加配置项
- fetch 不支持 abort，不支持超时控制，使用 setTimeout 及 Promise.reject 的实现的超时控制并不能阻止请求过程继续在后台运行，造成了量的浪费
- fetch 没有办法原生监测请求的进度，而 XHR 可以。

### XMLHttpRequest

`xhrReq.open(method, url, async, user, password)`

`readyState`:

- 0 UNSENT 代理被创建，但尚未调用 open() 方法。
- 1 OPENED open() 方法已经被调用。
- 2 HEADERS_RECEIVED send() 方法已经被调用，并且头部和状态已经可获得。
- 3 LOADING 下载中； responseText 属性已经包含部分数据。
- 4 DONE 下载操作已完成。

```js
const xhr = new XMLHttpRequest()
xhr.open('GET', url)
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText)
  }
}

xhr.send()
```

### fragment

`let fragment = document.createDocumentFragment();`

### 深拷贝

### 尾调用

### WeakMap 作用

### for...in，Object.keys Object.getOwnPropertyNames 的区别

Object.getOwnPropertyNames(a) returns all own properties of the object a.
Object.keys(a) returns all enumerable own properties.
It means that if you define your object properties without making some of them enumerable: false these two methods will give you the same result.

getOwnPropertyNames 可以用来判断是否是空对象。

### css in js

### css module

### cookie session

cookie 不设置时间就是当浏览器全部关闭时失效
而 sessionStorage 是当 tab 关闭时就失效，tab 之间不共享。
有特殊例子：如通过 a 页面链接(或者用了 window.open)点开了 b 页面，它们之间是共享的。

### ES6 模块与 CommonJS 模块的差异

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的顶层 this 指向当前模块。ES6 模块之中，顶层的 this 指向 undefined，这是两者的一个重大差异。

第二个差异是因为 CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

### 循环依赖加载问题

CommonJS 的一个模块，就是一个脚本文件。require 命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。

```js
{
  id: '...',
  exports: { ... },
  loaded: true,
}
```

上面代码就是 Node 内部加载模块后生成的一个对象。该对象的 id 属性是模块名，exports 属性是模块输出的各个接口，loaded 属性是一个布尔值，表示该模块的脚本是否执行完毕。其他还有很多属性，这里都省略了。

以后需要用到这个模块的时候，就会到 exports 属性上面取值。即使再次执行 require 命令，也不会再次执行该模块，而是到缓存之中取值。也就是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。

es6

```js
//foo.js
console.log('foo is running')
import { bar } from './bar'
console.log('bar = %j', bar)
setTimeout(() => console.log('bar = %j after 500 ms', bar), 500)
console.log('foo is finished')
```

```js
//bar.js
console.log('bar is running')
export let bar = false
setTimeout(() => (bar = true), 500)
console.log('bar is finished')
```

结果：
bar is running
bar is finished
foo is running
bar = false
foo is finished
bar = true after 500 ms

https://zhuanlan.zhihu.com/p/33049803

### AMD CMD UMD

- AMD 推崇依赖前置、提前执行
- CMD 推崇依赖就近、延迟执行
- UMD 先判断是否支持 Node.js 的模块（exports）是否存在，存在则使用 Node.js 模块模式。
  在判断是否支持 AMD（define 是否存在），存在则使用 AMD 方式加载模块。

### module.exports 和 exports 区别

exports 就是 module.exports 的别名，是用来简化书写的

### async 与 Generator 区别

1. 内置执行器。 Generator 函数的执行必须靠执行器，所以才有了 co 函数库，而 async 函数自带执行器。
   也就是说，async 函数的执行，与普通函数一模一样，只要一行。

2. 更好的语义。 async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。

3. 更广的适用性。 co 函数库约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，
   而 async 函数的 await 命令后面，可以跟 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。

### stopImmediatePropagation vs stopPropagation

stopPropagation()方法阻止事件对象移到到另一个节点上，但是允许当前节点的其他事件监听函数执行，而 stopImmediatePropagation()方法不仅阻止事件从当前节点移动到另一个节点上，它还不允许当前节点的其他事件监听函数执行。

### serviceWorker

### 重绘（Repaint）和回流（Reflow）

## webpack

## babel

https://juejin.im/post/5d0373a95188251e1b5ebb6c

### performance

js：压缩，拆分，tree-shaking，按需，gzip
css：压缩，按需，gzip
img：cdn，http cache
http：gzip dns-prefetch perload prefetch
svg: 压缩合并

### document 的 load 事件和 DOMContentLoaded 事件之间的区别

当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。
load 事件仅在 DOM 和所有相关资源全部完成加载后才会触发。

### sort 原理

chrome 当数组长度小于等于 10 的时候，采用插入排序，大于 10 的时候，采用快排。

火狐：用归并排序的
ie：快速排序

es10 之后 改用 Timsort 算法 - TimSort 是 Python 中 list.sort 的默认实现

Timsort 是结合了合并排序（merge sort）和插入排序（insertion sort）而得出的排序算法，它在现实中有很好的效率

### 前端路由

hash: 基于 hashchange
history: 基于 History API 的方法和属性。`history.pushState`、`history.replaceState`、`popstate`

### const 运算题

```js
const x = 'ok'
console.log(typeof x)
console.log(typeof window.x)
```

### 强引用 运算题

```js
let key = new Array(5 * 1024 * 1024)
const arr = [[key, 1]]

key = null

console.log(arr)
```

### set weakSet

数组去重：`[...new Set(array)]`
字符串去重：`[...new Set('ababbc')].join('')`

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

- 首先，WeakSet 的成员只能是对象，而不能是其他类型的值。
- 其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

### map weakMap

map 它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

WeakMap 与 Map 的区别有两点。

- 首先，WeakMap 只接受对象作为键名（null 除外），不接受其他类型的值作为键名。
- 其次，WeakMap 的键名所指向的对象，不计入垃圾回收机制。

应用

1. 在 DOM 对象上保存相关数据
2. 数据缓存
3. 私有属性

### -0 +0

数字需要被编码才能进行数字化存储.举个例子,假如我们要将一个整数编码为 4 位的二进制数,使用原码(sign-and-magnitude)方法,则最高位是符号位(0 代表正,1 代表负),剩下的三位表示大小(具体的值).因此,−2 和+2 会编码成为下面这样:

二进制的 1010 表示十进制的 −2
二进制的 0010 表示十进制的+2

这就意味着将会有两个零:1000(-0)和 0000(0).

但大部分时候使用的时候 js 默认都会先执行`toString`，所以两者在使用时没有什么区别。

区分：
判断一个零是正还是负的标准解法是用它除 1,然后看计算的结果是-Infinity 还是+Infinity:

```js
function isNegativeZero(x) {
  return x === 0 && 1 / x < 0
}
```

### 柯里化函数

应用场景：

1. 延迟计算
2. 动态创建函数 - 浏览器兼容性

https://github.com/yygmind/blog/issues/37

### input 如何处理中文输入法

`compositionend`
`compositionupdate`
`compositionend`

### 模拟实现一个 Promise.finally

```js
window.Promise.prototype = {
  finally: function(callback) {
    let P = this.constructor
    return this.then(
      value => P.resolve(callback()).then(() => value),
      reason =>
        P.resolve(callback()).then(() => {
          throw reason
        })
    )
  }
}
```

### url 长度限制

不同浏览器对 url 长度有不同的限制，IE，则最大长度为 2083byte，若只支持 Chrome，则最大长度 8182byte。
所以 get 请求参数或者 jsonp 都会有所限制。

### 图片懒加载

最新可使用 `IntersectionObserver` api

https://zhuanlan.zhihu.com/p/25455672

### valueOf 与 toString 区别

valueOf()：返回最适合该对象类型的原始值；
toString(): 将该对象的原始值以字符串形式返回。
这两个方法一般是交由 JS 去隐式调用，以满足不同的运算情况。
在数值运算里，会优先调用 valueOf()，
如 a + b；在字符串运算里，会优先调用 toString()，如 alert(c)。
中

### Javascript 装饰器的实现原理

```js
// 装饰类
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A
```

方法基于 `defineProperty`

### requestAnimationFrame

作用就是让浏览器流畅的执行动画效果

### 前端开发中如何在 JS 文件中检测用户浏览器是否打开了调试面板

https://www.zhihu.com/question/24188524

### Object.freeze vs Object.seal vs Object.preventExtensions

https://github.com/piecioshka/test-freeze-vs-seal-vs-preventExtensions
https://stackoverflow.com/questions/21402108/difference-between-freeze-and-seal

### 内存泄漏

- 意外的全局变量
- 被遗忘的计时器或回调函数
- 闭包
- 脱离 DOM 的引用

### ES5 和 ES6 及继承机制

ES5 的继承机制简单来说就是：实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面（Parent.apply(this)）

ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到 this 上面（所以必须先调用 super 方法），然后再用子类的构造函数修改 this。
