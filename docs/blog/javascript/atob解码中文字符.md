## atob 方法解码中文字符

> 2018-10-11

由于一些网络通讯协议的限制,你必须使用 window.btoa() 方法对原数据进行编码后，才能进行发送。接收方使用相当于 window.atob() 的方法对接受到的 base64 数据进行解码,得到原数据。

```js
window.btoa('foo')
// "Zm9v"

window.atob('Zm9v')
// "foo"
```

atob 这个方法名称乍一看，很奇怪，不知道这个单词什么意思。我们可以理解为 A to B，也就是从 A 到 B。

atob 表示 Base64 字符 to 普通字符，也就是 Base64 解码。

当你在 Chrome console 中执行 `window.btoa('中文')`会发下会报错。

`Uncaught DOMException: Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.`

这时候我们可以借助 `encodeURIComponent` 和 `decodeURIComponent` 转义非中文字符。

```js
window.btoa(encodeURIComponent('中文'))
// ('JUU0JUI4JUFEJUU2JTk2JTg3')

decodeURIComponent(window.atob('JUU0JUI4JUFEJUU2JTk2JTg3'))
// "中文"
```
