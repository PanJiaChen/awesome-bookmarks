## Object.create(null) vs {}

> 2019.1.29

查看 vue 的源码 或者一些开源项目的源码，发现不少地方都是使用 `Object.create(null)`来创建一个空对象的。

当使用语句 const obj = {}; 创建对象时，它其实并不是一个真的`空对象`，它从 Object.prototype 上继承了一些方法：

- hasOwnProperty
- isPrototypeOf
- propertyIsEnumerable
- toString/toLocaleString
- valueOf

![img](https://wpimg.wallstcn.com/6b85bd8e-6b25-43e5-bb4f-67268ae364fb.jpg)

如果使用 `Object.create(null)` 创建的对象，在没有继承任何东西。
![img](https://wpimg.wallstcn.com/01845f8a-ee6b-4b15-88fb-b4a991b86523.jpg）

**所以说是不是 `Object.create(null)` 是更好的创建一个空对象的方案呢？**

这就要看从 Object 上继承的那些方法我们是不是有用到了。

### hasOwnProperty

判断一个对象属性中是否具有指定的属性，返回 `true` or `false`。

### valueOf

valueOf 很少直接使用。在隐式转换类型时，JavaScript 引擎会调用 valueOf 方法，强制把对象转换成原始值：

### toString、isPrototypeOf 和 propertyIsEnumerable

这几个方法直接使用的情况较少，但自己的代码中不用并不表示别人写的代码不会调用。比如，有些框架可能会调用 toString 方法来判断结果是否为 [object Object]。

### 结论

因此，我们可以得出结论：当创建的对象只在当前执行环境中使用并且不会用到任何从 Object.prototype 上继承来的方法，也不会将该对象作为其他对象的原型的时候，那么可以使用 Object.create(null)。比如，构造一个字典对象的时候。

不过相对而言 `const obj={}`在浏览器中的执行速度是会比`Object.create(null)`快的，具体可点击链接[test](https://jsperf.com/object-create-null-vs-literal/2)。不过你一般代码中这些性能差距完全是可以忽略不计的。
