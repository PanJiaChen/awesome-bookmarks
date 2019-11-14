## 移动端

### fastClick

大致是说，移动浏览器 会在 touchend 和 click 事件之间，等待 300 - 350 ms，判断用户是否会进行双击手势用以缩放文字。
fastClick 源码大部分都是用来解决 iOS 各个版本各种奇奇怪怪的 BUG。

解决方案:

```html
<meta name="viewport" content="user-scalable=no" />
```

或者

```css
html {
  touch-action: manipulation;
}
```

WKWebView 在 iOS 9.3 不需要

或则要兼容老系统使用`fastClick`

相关文章：[2019 再聊移动端 300ms 延迟及 fastClick 原理解析](https://juejin.im/post/5ce764a2f265da1b8c19645a)
