# Vue

##Router Link

`router-link`基本每一个人都会用，但有的时候我们需要在点击的时候做一些额外的操作，比如点击的时候先弹出一个确认框，问用户是否需跳转。但发现怎么也禁止不了它的默认时间。

查阅文档之后发现它有一个 `event`参数，默认是`click`。我们只要将它设空，之后自己来处理跳转的逻辑就可以了。

```html
<router-link
  :to="{ name: 'my-favorites' }"
  :event="''"
  @click.native.prevent="routeOrLogin({ name: 'my-favorites' })"
>
  Favorites</router-link
>
```

## Dynamic Components

vue 一个就是 它可以写愉快的写 template 一个类 html 的模板，大多数情况下都非常好用。但在一些复杂场景下，它就显得不太灵活了。
这里举一个例子来说：

```html
<a v-if="isExternalLink" :href="xxx">
  <componentA />
  <componentA />
  <componentC />
</a>
<router-link v-else :to="xxx">
  <componentA />
  <componentA />
  <componentC />
</router-link>
```

这里只是一个最简单一个例子，实际场景中，中间重复的内容可能更多，两者唯一的区别只是外链的时候使用`a`标签，内部链接使用`router-link`。但却要写一大串的 `if..else`很不爽。

这里提供一个简单的方法解决这个问题。就是使用动态组件，我们将`a`标签和`router-link`分装成一个动态组件，根据传入的 url 是否是外部链接，动态的选择使用什么标签来渲染。

```html
<!-- Link.vue -->
<template>
  <component v-bind="linkProps(to)">
    <slot></slot>
  </component>
</template>

<script>
  export default {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    methods: {
      linkProps(url) {
        if (url.match(/^(http(s)?|ftp):\/\//)) {
          return {
            is: 'a',
            href: url,
            target: '_blank',
            rel: 'noopener'
          }
        }
        return {
          is: 'router-link',
          to: url
        }
      }
    }
  }
</script>
```

这样我们将代码的复杂度都封装在了`Link.vue`之中，我们在原来文件中只需这样使用：

```html
<link :to="xxx">
  <componentA />
  <componentA />
  <componentC />
</link>
```

是不是一下子简单了许多，代码的可阅读性也直线上升了。

## Fragment

react 很早就有了 Fragment 但 vue 迟迟还没有支持。
