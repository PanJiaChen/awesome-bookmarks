## flutter vs react native

谷歌大会上

react native 使用 js 编写，生成虚拟 dom，最后它将你转化为 iOS 或者 Android 原生组件。而 Flutter 是基于 `Skia` 实现的。没有什么 Android runtime 或者 Chromium 什么中间层。

dart 语言上的优势。类 java 强类型 oop 语言，AOT(Ahead-Of-Time )

### 前端代码安全

可以使用 [JavaScript Obfuscator Tool](https://obfuscator.io/) js 代码混淆工具，但只是增加了一些破解成本，WebAssembly 安全性相对而言更好。相关文章[前端核心代码保护技术面面观](https://zhuanlan.zhihu.com/p/61651310)

### mouseenter 与 mouseover 区别

mouseenter 和 mouseleave 只有是 target element 的时候才会触发。 mouseover 和 mouseleave 会冒泡， 子元素也会触发。

### e.target 与 e.currentTarget

e.target 指向触发事件监听的对象。

e.currentTarget 指向添加监听事件的对象。

### 实现 forEach polyfill

### 多线程和单线程

js 为什么要设计成单线程？
浏览器的内核是多线程
web worker -comlink

Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象

### setTimeout vs setInterval 区别

衍生问题 setTimeout(func, 0)

### eval vs new Function

### ['1', '2', '3'].map(parseInt)

### 待看

[木易杨-高级前端进阶](https://github.com/Advanced-Frontend/Daily-Interview-Question)

[leetcode](https://github.com/azl397985856/leetcode)

### PNG8 PNG24 PNG32

PNG8：PNG 8 中的 8，其实指的是 8bits，相当于用 2^8（2 的 8 次方）大小来存储一张图片的颜色种类，2^8 等于 256，也就是说 PNG 8 能存储 256 种颜色，一张图片如果颜色种类很少，将它设置成 PNG 8 得图片类型是非常适合的。

PNG24：PNG 24 中的 24，相当于 3 乘以 8 等于 24，就是用三个 8bits 分别去表示 R（红）、G（绿）、B（蓝）。R(0~255),G(0~255),B(0~255)，可以表达 256 乘以 256 乘以 256=16777216 种颜色的图片，这样 PNG 24 就能比 PNG 8 表示色彩更丰富的图片。但是所占用的空间相对就更大了。

PNG32：PNG 32 中的 32，相当于 PNG 24 加上 8bits 的透明颜色通道，就相当于 R（红）、G（绿）、B（蓝）、A（透明）。

### PNG 压缩

PNG 图片的压缩，分两个阶段：

- 预解析：
  png 图片用差分编码（Delta encoding）对图片进行预处理，处理每一个的像素点中每条通道的值，差分编码主要有几种：
- 压缩：
  压缩阶段会将预处理阶段得到的结果进行 Deflate 压缩，它由 Huffman 编码 和 LZ77 压缩构成。
  如前面所说，Deflate 压缩会标记图片所有的重复数据，并记录数据特征和结构，会得到一个压缩比最大的 png 图片 编码数据。

## 网络安全

### SQL 注入攻击(SQL Injection)

### 命令行注入 Command Execution

原理和 SQL 注入攻击类似

### File Upload Vulnerabilities

### 开放重定向 Open Redirects

### XSS 跨站脚本攻击 (Cross-site Scripting)

XSS 的攻击方式就是想办法“教唆”用户的浏览器去执行一些这个网页中原本不存在的前端代码。
XSS 有哪些注入的方法：

- 在 HTML 中内嵌的文本中，恶意内容以 script 标签形成注入。
- 在内联的 JavaScript 中，拼接的数据突破了原本的限制（字符串，变量，方法名等）。
- 在标签属性中，恶意内容包含引号，从而突破属性值的限制，注入其他属性或者标签。
- 在标签的 href、src 等属性中，包含 javascript: 等可执行代码。
- 在 onload、onerror、onclick 等事件中，注入不受控制代码。
- 在 style 属性和标签中，包含类似 background-image:url("javascript:..."); 的代码（新版本浏览器已经可以防范）。
- 在 style 属性和标签中，包含类似 expression(...) 的 CSS 表达式代码（新版本浏览器已经可以防范）。

总之，如果开发者没有将用户输入的文本进行合适的过滤，就贸然插入到 HTML 中，这很容易造成注入漏洞。攻击者可以利用漏洞，构造出恶意的代码指令，进而利用恶意代码危害数据安全。

### 跨站请求伪造 CSRF（Cross-site request forgery)

攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Forms/Sending_and_retrieving_form_data#%E5%B8%B8%E8%A7%81%E7%9A%84%E5%AE%89%E5%85%A8%E9%97%AE%E9%A2%98

### 点击劫持 Click Jacking

也叫 UI 覆盖攻击，攻击者会利用一个或多个透明或不透明的层来诱骗用户支持点击按钮的操作，而实际的点击确实用户看不到的一个按钮，从而达到在用户不知情的情况下实施攻击。

可以设置`X-Frame-Options`进行防御或者设置`content-security-policy`

### 一些建议

使用 https，任何东西不要使用明文传输。

在登录或者忘记密码的地方，不要提示是邮箱不正确还是密码不正确。这样会大大减少黑客的破解难度。
如 twitter，登录时只提示邮箱和密码不匹配，并不会告诉你到底是哪一个不对。

尽量不要自建登录系统，可以多依托于一些第三方的登录，如微博、QQ 等。

使用 a 标签跳槽的时候加上 `rel="noopener noreferrer"`

## json 边界问题

U+2028 U+2029

## https

服务器端渲染 vs 预渲染 (SSR vs Prerendering)
