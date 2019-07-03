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

浏览器缓存主要有两类：缓存协商和彻底缓存，也有称之为协商缓存和强缓存。

|          | 获取资源形式 | 状态码            | 发送请求到服务器                 |
| -------- | ------------ | ----------------- | -------------------------------- |
| 强缓存   | 从缓存获取   | 200(from cache)   | 否，直接从缓存获取               |
| 协商缓存 | 从缓存获取   | 304(Not Modified) | 否，通过服务器来通知缓存是否可用 |

Cache-control > Expires > eTag > last-modified

当一个用户发起一个静态资源请求的时候，浏览器会通过以下几步来获取资源：

- 本地缓存阶段：先在本地查找该资源，如果有发现该资源，而且该资源还没有过期，就使用这一个资源，完全不会发送 http 请求到服务器；
- 协商缓存阶段：如果在本地缓存找到对应的资源，但是不知道该资源是否过期或者已经过期，则发一个 http 请求到服务器,然后服务器判断这个请求，如果请求的资源在服务器上没有改动过，则返回 304，让浏览器使用本地找到的那个资源；
- 缓存失败阶段：当服务器发现请求的资源已经修改过，或者这是一个新的请求(在本来没有找到资源)，服务器则返回该资源的数据，并且返回 200， 当然这个是指找到资源的情况下，如果服务器上没有这个资源，则返回 404。

Cache-control 主要是为了解决用户的系统时间改到这个标识的时间之后，就永远不会命中这个强制缓存的问题。

eTag 主要为了解决 Last-Modified 无法解决的一些问题：

1、一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新 GET；

2、某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说 1s 内修改了 N 次)，If-Modified-Since 能检查到的粒度是 s 级的，这种修改无法判断(或者说 UNIX 记录 MTIME 只能精确到秒)；

3、某些服务器不能精确的得到文件的最后修改时间。

If-Modified-Since 和 If-None-Match

**延伸**
from disk cache(磁盘缓存)和 from memory cache(内存缓存) 的区别？
浏览器自己的一个缓存策略。
一般性 css 都是 disk cache
script 是 memory cache
当文件比较大时也会存在 disk cache

**Service Worker 缓存**

[一文读懂前端缓存](https://zhuanlan.zhihu.com/p/44789005)

### CDN

Content Delivery Network，即内容分发网络

- 用户访问 CDN 加速域名
- 本地 DNS 进行域名解析
- 本地 DNS 服务器将请求发送到网站 DNS 服务器，通过 CNAME 机制，请求指向 CDN 全球负载均衡集群
- 负载均衡集群通过智能解析，为用户分配相应速度最快的节点，本地 DNS 将节点 IP 返回给用户
- 用户对 CDN 节点进行请求

### DNS

Domain Name System 将域名和 IP 地址相互映射的一个分布式数据库
当浏览器访问一个域名的时候，需要解析一次 DNS，获得对应域名的 ip 地址。
浏览器缓存 => 系统缓存 => 路由器缓存 =>ISP(运营商)DNS 缓存 => 根域名服务器 => 顶级域名服务器 => 主域名服务器的顺序
逐步读取缓存，直到拿到 IP 地址

DNS 请求是走 UDP 的

DNS 的预解析

可以通过用 meta 信息来告知浏览器, 我这页面要做 DNS 预解析
`<meta http-equiv="x-dns-prefetch-control" content="on" />`

可以使用 link 标签来强制对 DNS 做预解析:
`<link rel="dns-prefetch" href="http://ke.qq.com/" />`

淘宝使用了上述方案。

### Http

HTTP 方法:
GET,POST,PUT,PATCH,DELETE,OPTIONS
不太常用：CONNECT,TRACE,HEAD

HEAD：请求资源的头部信息, 并且这些头部与 HTTP GET 方法请求时返回的一致. 该请求方法的一个使用场景是在下载一个大文件前先获取其大小再决定是否要下载, 以此可以节约带宽资源.
CONNECT： 方法可以开启一个客户端与所请求资源之间的双向沟通的通道。它可以用来创建隧道
TRACE：被用于激发一个远程的，应用层的请求消息回路（译注：TRACE 方法让客户端测试到服务器的网络通路，回路的意思如发送一个请返回一个响应，这就是一个请求响应回路，）

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
  - 408：请求超时。
  - 443：https
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

[http/2 vs http/1.1 在线性能测试](https://http2.akamai.com/demo)
有个成语叫“事出有因”，每个事物都有其存在的意义（原因），而 HTTP/2 的诞生自然来自于 HTTP/1 的一些痛点。

https://github.com/amandakelake/blog/issues/35
https://github.com/creeperyang/blog/issues/23
https://developers.google.com/web/fundamentals/performance/http2/?hl=zh-cn

### tpc

三次通信是理论上的最小值. 所以三次握手不是 TCP 本身的要求, 而是为了满足"在不可靠信道上可靠地传输信息"这一需求所导致的。

一句话概括，TCP 连接握手，握的是啥？
通信双方数据原点的序列号！

SYN：同步序列编号（Synchronize Sequence Numbers）
ACK: 认字符 (Acknowledgement)

### upd

### 端口号

1024< 端口 < 65535

### 输入一个 url

https://segmentfault.com/a/1190000019504744
