## css 相关知识

### meta

具有 http-equiv 属性的 meta 标签，表示执行一个命令，这样的 meta 标签可以不需要 name 属性了。

```html
<!-- 默认使用最新浏览器 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<!-- 搜索引擎抓取 -->
<meta name="renderer" content="webkit">

<!-- 禁止缩放-->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">

<!-- 删除苹果默认的工具栏和菜单栏 -->
<meta name="apple-mobile-web-app-capable" content="yes">
```
