#initState
这一篇主要是介绍initState的操作，这里主要是按顺序依次执行初始化props,methods,data,computed,watch的操作
## 主入口
```javascript
function initState(vm) {
  // 初始化watcher
  vm._watchers = [];
  var opts = vm.$options;
  // 如果有prop，初始化prop
  if (opts.props) { initProps(vm, opts.props); }
  // 如果有方法，初始化方法
  if (opts.methods) { initMethods(vm, opts.methods); }
  // 初始化数据
  if (opts.data) {
    initData(vm);
  } else {
    // 没有数据，观察一个空对象
    observe(vm._data = {}, true /* asRootData */ );
  }
  // 初始化计算属性
  if (opts.computed) { initComputed(vm, opts.computed); }
  // 初始化watch
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
```
## initProps
