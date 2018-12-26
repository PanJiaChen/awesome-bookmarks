## 为什么前端监控要用 GIF 打点

> 2018-12-25

目前主流的前端监控数据上报都是采用 GIF 的上报方式，(百度统计/友盟/谷歌统计）都是这样实现的。但为什么一定要使用 GIF 呢？不能发 post 请求或者通过 script 标签的形式么？

当然你也可以使用一些黑科技的方式上报，用纯 css 来实现。但这种方案并没有什么特别的好处。

```css
.track-xx:active:after {
  content: url(track.php?xxxx=foo);
}
```

### 主要原因

- 没有跨域问题

- 不会阻塞页面加载，影响用户体验

- 在所有图片中体积最小，相较 BMP/PNG，可以节约 41%/35%的网络资源

详情见 [为什么前端监控要用 GIF 打点](https://mp.weixin.qq.com/s/v6R2w26qZkEilXY0mPUBCw)

### 使用方式

但主要不要按如下方法使用

```js
new Image().src = 'https://foo.com/bar.gif?t=xxxx&b=1'
```

这段代码的问题是这个 new Image()是一个没有引用的临时变量，随时可能被浏览器的垃圾回收机制回收。如果这个图片的 HTTP 请求尚未建立，那么在被回收时这个请求就会被取消，导致打点并没有真正发出。如果打点所在的页面比较复杂，浏览器垃圾回收机制可能会被频繁触发，那么这种方式打点的丢失率可能会高达 10%以上。

解决方法很简单，将这个图片赋值给一个全局变量即可，例如：

```js
const img = new Image()
const key = +new Date() //加一个时间戳，方式图片被浏览器缓存了，不再发送请求

window[t] = img

img.onload = img.onerror = img.onabort = function() {
  // img标签加载完成、错误或终止时，解除事件绑定，销毁相关对象
  img.onload = img.onerror = img.onabort = null
  window[key] = null
  img = null
}
img.src = `${url}?t=key`
```

aaa
