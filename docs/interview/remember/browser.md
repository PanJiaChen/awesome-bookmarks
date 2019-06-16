## 浏览器相关知识

### 输入 url 发生了什么

### http1.1 http2.0

https://www.nihaoshijie.com.cn/index.php/archives/698/
https://imququ.com/post/header-compression-in-http2.html

### https

### tcp udp

tcp/ip 的并发限制

### xmlHttpRequest

### http catch

### reflow reprint

渲染树的 reflow 或 repaint 的代价十分高昂，那么不得不采取一些优化的方式，浏览器对此有一些针对性的举措。一种策略便是延迟。浏览器会将一些变动放在一个队列中，当达到一定规模或者延迟的时间已到，那么会一次将这些变动反应到渲染树中。

```js
const div = document.getElementById('apple')
div.style.background = 'blue'

function sleep(sleepDuration) {
  var now = new Date().getTime()
  while (new Date().getTime() < now + sleepDuration) {
    /* do nothing */
  }
}
sleep(3000)
div.style.background = 'black'
```

### 浏览器内核

浏览器内核是多线程，在内核控制下各线程相互配合以保持同步，一个浏览器通常由以下常驻线程组成：

- GUI 渲染线程
- JavaScript 引擎线程
- 定时触发器线程
- 事件触发线程
- 异步 http 请求线程

https://juejin.im/post/5c337ae06fb9a049bc4cd218

### 游览器缓存

### Http

HTTP 方法:
GET,POST,PUT,PATCH,DELETE,OPTIONS
不太常用：CONNECT,TRACE,HEAD

PUT vs POST:
PUT 和 POST 方法的区别是,PUT 方法是幂等的：连续调用一次或者多次的效果相同（无副作用），而 POST 方法是非幂等的。

PUT vs PATCH:
PUT 和 PATCH 都是更新资源，而 PATCH 用来对已知资源进行局部更新。

### http status code

- 1xx：临时回应，表示客户端请继续。
- 2xx：请求成功。
  - 200：请求成功。
  - 201：该请求已成功，并因此创建了一个新的资源。这通常是在 PUT 发送的响应。
  - 202：请求已经接收到，但还未响应，没有结果。
  - 204：表示请求成功，但响应报文不含实体的主体部分
  - 206：大文件断点续传
- 3xx: 表示请求的目标有变化，希望客户端进一步处理。
  - 301：永久性跳转
  - 302：临时性跳转
  - 303：对应当前请求的响应可以在另一个 URI 上被找到。
  - 304：跟客户端缓存没有更新。
- 4xx：客户端请求错误。
  - 400：请求报文存在语法错误
  - 401：表示发送的请求需要有通过 HTTP 认证的认证信息
  - 403：服务器已经理解请求，但是拒绝执行它。
  - 404：表示请求的页面不存在。
  - 404：请求行中指定的请求方法不能被用于请求相应的资源
  - 408：请求超时。
- 5xx：服务端请求错误。
  - 500：服务端错误。
  - 501：此请求方法不被服务器支持且无法被处理
  - 503：网关错误，服务端暂时性错误，可以一会再试。
  - 504：网关超时。

### keep-alive

在早期的 HTTP/1.0 中，每次 http 请求都要创建一个连接，而创建连接的过程需要消耗资源和时间，为了减少资源消耗，缩短响应时间，就需要重用连接。在后来的 HTTP/1.0 中以及 HTTP/1.1 中，引入了重用连接的机制，就是在 http 请求头中加入 Connection: keep-alive 来告诉对方这个请求响应完成后不要关闭，下一次咱们还用这个请求继续交流。协议规定 HTTP/1.0 如果想要保持长连接，需要在请求头中加上 Connection: keep-alive。
keep-alive 的优点：

- 较少的 CPU 和内存的使用（由于同时打开的连接的减少了）
- 允许请求和应答的 HTTP 管线化
- 降低拥塞控制 （TCP 连接减少了）
- 减少了后续请求的延迟（无需再进行握手）
- 报告错误无需关闭 TCP 连

可以设置 timeout=5, max=100

### https

### http2

https://github.com/amandakelake/blog/issues/35
https://github.com/creeperyang/blog/issues/23
https://developers.google.com/web/fundamentals/performance/http2/?hl=zh-cn

### tpc upd
