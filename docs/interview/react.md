# React

在使用react的过程中，我们绕不开渲染性能优化问题，因为默认情况下react组件的shouldComponentUpdate函数会一直返回true，这回导致所有的组件都会进行耗时的虚拟DOM比较。在使用redux作为react的逻辑层框架时，我们可以使用经典的PureComponent+ShallowCompare的方式进行渲染性能优化


https://foio.github.io/mobx-react/

## MobX
作为一个数据层框架，mobx基于一个最简单的原则：

> 当应用状态更新时，所有依赖于这些应用状态的监听者（包括UI、服务端数据同步函数等），都应该自动得到细粒度地更新。

在使用mobx作为react的store时，我们该如何进行渲染性能优化呢？
通过分析源代码发现，在使用@observer将react组件转换成一个监听者(Reactions)后，mobx会为react组件提供一个精确的、细粒度的shouldComponentUpdate函数:

```js
shouldComponentUpdate: function(nextProps, nextState) {
  ......
  // update on any state changes (as is the default)
  if (this.state !== nextState) {
    return true;
  }
  // update if props are shallowly not equal
  return isObjectShallowModified(this.props, nextProps);
}
```
借助于mobx框架对Observable变量引用的跟踪和依赖收集，mobx能够精确地得到react组件对Observable变量的依赖图谱，然后再用经典的ShallowCompare实现细粒度的shouldComponentUpdate函数，以达到100%无浪费render。这一切都是自动完成地，fantastic！使用mobx后，我们再也无需手动写shouldComponentUpdate函数了。
