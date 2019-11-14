# 网络

## WebSocket

### WebSocket 与 HTTP 什么关系呢？

简单来说，WebSocket 是一种协议，是一种与 HTTP 同等的网络协议，两者都是应用层协议，都基于 TCP 协议。但是 WebSocket 是一种双向通信协议，在建立连接之后，WebSocket 的 server 与 client 都能主动向对方发送或接收数据。同时，WebSocket 在建立连接时需要借助 HTTP 协议，连接建立好了之后 client 与 server 之间的双向通信就与 HTTP 无关了。

### WebSocket 与 Socket

网络应用中，两个应用程序同时需要向对方发送消息的能力（即全双工通信），所利用到的技术就是 socket，其能够提供端对端的通信。对于程序员而言，其需要在 A 端创建一个 socket 实例，并为这个实例提供其所要连接的 B 端的 IP 地址和端口号，而在 B 端创建另一个 socket 实例，并且绑定本地端口号来进行监听。当 A 和 B 建立连接后，双方就建立了一个端对端的 TCP 连接，从而可以进行双向通信。

WebSocekt 是 HTML5 规范中的一部分，其借鉴了 socket 的思想，为 client 和 server 之间提供了类似的双向通信机制。同时，WebSocket 又是一种新的应用层协议，包含一套标准的 API；而 socket 并不是一个协议，而是一组接口，其主要方便大家直接使用更底层的协议（比如 TCP 或 UDP）

### 什么是 Socket.IO

Socket.IO 是一个封装了 Websocket、基于 Node 的 JavaScript 框架，包含 client 的 JavaScript 和 server 的 Node。其屏蔽了所有底层细节，让顶层调用非常简单。

另外，Socket.IO 还有一个非常重要的好处。其不仅支持 WebSocket，还支持许多种轮询机制以及其他实时通信方式，并封装了通用的接口。这些方式包含 Adobe Flash Socket、Ajax 长轮询、Ajax multipart streaming 、持久 Iframe、JSONP 轮询等。换句话说，当 Socket.IO 检测到当前环境不支持 WebSocket 时，能够自动地选择最佳的方式来实现网络的实时通信。

### WebSocket VS SSE(Server-Sent Events)

Server-sent Events 其实很多人都不知道这东西，但其实肯定用过的，`webpack-hot-middleware`就是运用该原理进行热更新的，当然`webpack-dev-server`使用的是 WebSocket。SSE 与 WebSocket 作用相似，都是建立浏览器与服务器之间的通信渠道，然后服务器向浏览器推送信息。

总体来说，WebSocket 更强大和灵活。因为它是全双工通道，可以双向通信；SSE 是单向通道，只能服务器向浏览器发送，因为流信息本质上就是下载。如果浏览器向服务器发送信息，就变成了另一次 HTTP 请求。

但是，SSE 也有自己的优点。

- SSE 使用 HTTP 协议，现有的服务器软件都支持。WebSocket 是一个独立协议。
- SSE 属于轻量级，使用简单；WebSocket 协议相对复杂。
- SSE 默认支持断线重连，WebSocket 需要自己实现。
- SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket 默认支持传送二进制数据。
- SSE 支持自定义发送的消息类型。

相关补充文章

- [Server-Sent Events-阮一峰](http://www.ruanyifeng.com/blog/2017/05/server-sent_events.html)

- [WebSockets vs. Server-Sent events/EventSource](https://stackoverflow.com/questions/5195452/websockets-vs-server-sent-events-eventsource?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)

### WebSocket 推荐阅读文章

[WebSocket 是什么原理？](https://www.zhihu.com/question/20215561)

### TCP VS UDP

TCP UDP 这两个东西已经是老生常谈了，基本每个面试都会问一下，还不了解的赶快去补习一下。但发现一个问题，大家都只是知道这两者的区别是什么，完全不知道他们各自的应用场景是什么？

UDP 场景：

1.  实时音视频是可以而且应该用 UDP 的，一方面因为它常常涉及到网络穿透，另外一方面它不需要重传。——我需要实时的看到你的图像跟声音，至于中间丢一帧什么的完全不重要。而为了重传往往会造成延迟与不同步，考虑一下，某一帧因为重传，导致 0.5 秒以后才到，那么整个音视频就延迟了 0.5 秒。考虑一下接收方看视频，如果使用 TCP 导致视频的中间延迟了 0.5 秒，只要我不按「快进」键，那么后续的视频全都会比发送方延迟 0.5 秒。这种延迟是累加的，随着持续丢帧，延迟会越来越大，达到数秒，甚至分钟级，这会严重影响实时音视频的用户体验。因此「实时音视频聊天」功能通常都会使用 UDP 实现。
2.  网络真的非常非常可靠，以至于你完全不需要考虑 UDP 丢包问题的情况。典型的例子应该是专门为有线局域网设计的协议。
3.  另外一个问题是 TCP 是纯粹的流式数据，所以制定传输协议的时候，接受方需要自行判定一个包的开始和结束，因为你完全可能接受到半个包或者两个包。——如果数据报的起止判定对你具体的程序会成为大问题，也可以考虑 UDP。

**采用 UDP 有 3 个关键点：**

- 网络带宽需求较小，而实时性要求高
- 大部分应用无需维持连接
- 需要低功耗
