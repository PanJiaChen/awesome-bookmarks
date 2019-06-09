## JS 基础

### mouseenter 与 mouseover 区别

mouseenter 和 mouseleave 只有是 target element 的时候才会触发。 mouseover 和 mouseleave 会冒泡， 子元素也会触发。

### e.target 与 e.currentTarget

e.target 指向触发事件监听的对象。

e.currentTarget 指向添加监听事件的对象。

### addEventListener

- 内存泄漏问题，只有保持静态函数引用才能被 `removeEventListener` 移除。
- passive: 提升页面滑动的流畅度
- useCapture: 事件捕获阶段触发 handler
- once: 只触发一次

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

<!-- TODO -->

### Object.create vs new Function

<!-- TODO -->

```js
console.log(Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON)
```

### 类型判断

### 字符串有最大长度吗

JS 字符串的长度受到下标限制。理论最大长度是 2^53-1（即 js 中可表达的最大安全整数）。
