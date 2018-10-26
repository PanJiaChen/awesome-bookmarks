## Safari 下 Date 的坑

> 2018-10-16

在 使用 Date 相关 api 的时候要牢记一个坑，就是 Safari 对一些时间格式是不支持的。比如：

```js
Date.parse('2018-10-16 12:00:00')
// 1539662400000 -- 在Chrome 下
// NaN -- 在Safari下
```

问题就出在 Safari 对于这个格式 YYYY-MM-DD HH:MM:SS 无法解析，Safari 要求 Date.parse()或 Date()转换日期的字符串需要满足 RFC2822 或 ISO 8601 定义的格式。不过我们可以将其转化为 YYYY/MM/DD HH:MM:SS

```js
Date.parse(new Date('2018-10-16 12:00:00'.replace(/-/g, '/')))
```

相关[stackoverflow](https://stackoverflow.com/questions/4310953/invalid-date-in-safari)
