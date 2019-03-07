# initLifeCycle
initLifeCycle主要是做了一些挂载父子节点以及初始化变量的操作。有一点需要注意的是`!options.abstract`这个判断语句，是为了判断父组件是不是抽象组件使用的
```javascript
  /**
   * 生命周期 挂载$parent,$root,以及初始化变量
   */
  function initLifecycle(vm) {
    var options = vm.$options;

    // locate first non-abstract parent
    var parent = options.parent;
    // 递归找到parent上第一个不是抽象组件
    // 比如说keep-alive transistion这些就是一个抽象组件
    if (parent && !options.abstract) {
      while (parent.$options.abstract && parent.$parent) {
        parent = parent.$parent;
      }
      parent.$children.push(vm);
    }

    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;

    vm.$children = [];
    vm.$refs = {};

    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
  }
```
#initEvents
initEvents主要是挂载options上的事件
```javascript
function initEvents(vm) {
    vm._events = Object.create(null);
    vm._hasHookEvent = false;
    // init parent attached events
    // 将父级事件绑定到vm上
    // 首次进入并不会加载到这里去
    var listeners = vm.$options._parentListeners;
    if (listeners) {
      updateComponentListeners(vm, listeners);
    }
  }
```
上述代码会将parent上的事件绑定到vm上，调用的办法是`updateComponentListeners`，这里会引申出一个问题，为什么创建一个空对象会用`Object.create(null)`而不是`Object.create({})`或者直接就是`{}`。  
这里的原因在于`Object.create`代码类似实现于下面的写法，实现了一个空对象的创建，并将原型传入
```javascript
function create(o) {
  function F() {}
  F.prototype = o
  return new F()
}
```
create(null)相当于返回了一个没有原型的对象，而create({})或者{}都是存在原型的对象，至于为什么x需要创建一个没有原型链的对象，是为了再vue中创建一个纯净的对象，防止定义方法重名,参照[详解Object.create(null)](https://juejin.im/post/5acd8ced6fb9a028d444ee4e)  
initEvents最终会调用`updateComponentListeners`函数，这个函数主要接收三个参数，vm,listener,oldlistener。这里主要是用到了前两个，在函数内部会区分是inti时调用还是更新时调用，最终调用`updateListeners`方法，主要是为了合并新旧事件。
```javascript
 function updateListeners(
    on,
    oldOn,
    add,
    remove$$1,
    vm
  ) {
    var name, def, cur, old, event;
    for (name in on) {
      def = cur = on[name];
      old = oldOn[name];
      // passive once capture
      event = normalizeEvent(name);
      /* istanbul ignore if */
      if (isUndef(cur)) {
        "development" !== 'production' && warn(
          "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
          vm
        );
      } else if (isUndef(old)) {
        if (isUndef(cur.fns)) {
          // 这里是的函数返回的是一个闭包，是因为回调函数可能存在多个，利用闭包执行多个函数
          cur = on[name] = createFnInvoker(cur);
        }
        // 没有old则增加
        add(event.name, cur, event.once, event.capture, event.passive, event.params);
      } else if (cur !== old) {
        // 将老的事件改成cur的事件
        old.fns = cur;
        on[name] = old;
      }
    }
    for (name in oldOn) {
      if (isUndef(on[name])) {
        event = normalizeEvent(name);
        //移除老事件
        remove$$1(event.name, oldOn[name], event.capture);
      }
    }
  }
```
```javascript
function createFnInvoker(fns) {
    function invoker() {
      var arguments$1 = arguments;

      var fns = invoker.fns;
      if (Array.isArray(fns)) {
        var cloned = fns.slice();
        for (var i = 0; i < cloned.length; i++) {
          cloned[i].apply(null, arguments$1);
        }
      } else {
        // return handler return value for single handlers
        return fns.apply(null, arguments)
      }
    }
    invoker.fns = fns;
    return invoker
  }
```
