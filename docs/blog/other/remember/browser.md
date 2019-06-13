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

### http status code

- 1xx：临时回应，表示客户端请继续。
- 2xx：请求成功。
  - 200：请求成功。
- 3xx: 表示请求的目标有变化，希望客户端进一步处理。
  - 301&amp;302：永久性与临时性跳转
  - 304：跟客户端缓存没有更新。
- 4xx：客户端请求错误。
  - 403：无权限。
  - 404：表示请求的页面不存在。
- 5xx：服务端请求错误。
  - 500：服务端错误。
  - 503：服务端暂时性错误，可以一会再试。
    <!-- TODO -->

### 浏览器内核

浏览器内核是多线程，在内核控制下各线程相互配合以保持同步，一个浏览器通常由以下常驻线程组成：

- GUI 渲染线程
- JavaScript 引擎线程
- 定时触发器线程
- 事件触发线程
- 异步 http 请求线程

https://juejin.im/post/5c337ae06fb9a049bc4cd218
