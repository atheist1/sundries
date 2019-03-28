# Object & Proxy
最近看代码发现Object.defineProperty和Proxy这两个东西出现的比较频繁，包括Vue源码，包括即将到来的vue3，包括一些库，所以我们这里将这两个东西抽取出来做一个规整
## Object.defineProperty
### 语法:
```Object.defineProperty(obj,prop,descriptor)```

### 参数:
``obj -> 需要劫持的对象 ``  
``prop -> 劫持的属性``  
``descriptor -> 属性描述符``

### 介绍:
obj和prop我们不必多说，就像定义一个对象一样，键值对使用。我们主要重点介绍一下descriptor:
#### 数据描述符
``value``  
表示该属性对应的值，可以是任意js值，默认为undefined
``writable``  
表示该属性是否可写，只有为true的时候该属性才能被赋值运算符改变，默认为false

#### 存取描述符
``get``  
一个给属性提供getter的方法，如果没有getter则为undefined，当使用obj.xxx时将会调用该方法，并将返回值作为取得的值，该方法不会传参，但是this指向的是被定义的对象(obj)
``set``  
一个给属性提供setter的方法，如果没有则为undefined，当对属性赋值时会触发该函数，该函数传入唯一一个参数，就是newVal

#### 公共描述符
上述两个描述符是互斥的，如果你定义了get又定义了value，将会报错，而公共描述符是指可以为该属性定义公共的描述符
``enumerable``  
只有该属性enumerable为true时该属性才会出现在对象的可枚举属性中，默认为false。(可枚举属性决定了该属性是否会被for in循环找到，forin会找到继承的可枚举属性，想要找到自身的用Object.keys)
``configurable``  
只有该属性的configurable为true时，该属性才能修改描述符，才能使用delete删除该属性值，否则删除会返回false并删除失败，默认为false。

``ps:以上这些描述符不一定指自身属性，继承来的属性也需要考虑在内，所以需要通过Object.create(null)创建一个原型指向null的对象作为继承对象。``

### 作用
按照原理来说他是作为一个拦截层一样，拦截对象属性的get或者set或者value，比如Vue中的对响应式数据的创建。
```javascript
Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      // 在编译模板时会触发属性的get方法，将依赖添加到dep里
      get: function reactiveGetter() {
        var value = getter ? getter.call(obj) : val;
        if (Dep.target) {
          dep.depend();
          if (childOb) {
            childOb.dep.depend();
            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
        }
        return value
      },
      // 在设置值时 dep.notify将当前所有依赖触发更新
      set: function reactiveSetter(newVal) {
        var value = getter ? getter.call(obj) : val;
        if (newVal === value || (newVal !== newVal && value !== value)) {
          return
        }
        if ("development" !== 'production' && customSetter) {
          customSetter();
        }
        if (setter) {
          setter.call(obj, newVal);
        } else {
          val = newVal;
        }
        childOb = !shallow && observe(newVal);
        dep.notify();
      }
    });
```

## proxy
### 语法
``let p = new Proxy(target,handler)``
### 参数
``target``  
使用proxy包装的目标对象(可以是任意类型的对象，包括原生数组，函数甚至是另一个代理)
``handler``  
一个对象,操作代理时的函数
### 兼容性
proxy的兼容性不算很好，对于所有除了edge的Ie浏览器全部不兼容。
### 示例
1. get
```javascript
let handler = {
  // 两个参数 target，name 对应obj 和 key
  // 此处代理了obj的get方法，当调用get不存在时返回默认值default
  get: function (target, name) {
    return target[name] ? target[name] : 'default'
  }
}
let obj = {}
let objProxy = new Proxy(obj, handler)
obj.a = 1
obj.b = 2
console.log(objProxy.a,objProxy.b,objProxy.c)
```
2. set
```javascript
let handler = {
  // 与get不一样的是，set多了一个value值，是指你新设置的值
  set: function (target, name, value){
    if (name === 'age') {
      if (!Number.isInteger(value)){
        throw new Error('age must be a Number')
      } else if (value > 100) {
        throw new Error('age cant over then 1000')
      }
    }
    target[name] = value
  }
}
let setProxy = new Proxy({}, handler)
setProxy.age = '1'
```
3. 扩展构造函数
```javascript
function extend(sup,base) {
  // 获取base下原有的descriptor
  var descriptor = Object.getOwnPropertyDescriptor(
    base.prototype,"constructor"
  );
  base.prototype = Object.create(sup.prototype);
  var handler = {
    // 拦截new指令
    construct: function(target, args) {
      // 此时base已经连接到sup原型上了
      var obj = Object.create(base.prototype);
      // apply方法也被拦截了
      this.apply(target,obj,args);
      return obj;
    },
    apply: function(target, that, args) {
      // 这个that指向的是base
      sup.apply(that,args);
      base.apply(that,args);
    }
  };
  var proxy = new Proxy(base,handler);
  descriptor.value = proxy;
  Object.defineProperty(base.prototype, "constructor", descriptor);
  return proxy;
}

var Person = function(name){
  this.name = name
};

var Boy = extend(Person, function(name, age) {
  this.age = age;
});

Boy.prototype.sex = "M";

var Peter = new Boy("Peter", 13);
console.log(Peter.sex);  // "M"
console.log(Peter.name); // "Peter"
console.log(Peter.age);  // 13
```
4. 查找数组特定对象
```javascript
var arr = [
  { name: 'Firefox', type: 'browser' },
  { name: 'SeaMonkey', type: 'browser' },
  { name: 'Thunderbird', type: 'mailer' }
]
// 给定数组，想通过name，下标，type不同方式查找
let products = new Proxy(arr,{
  get: function(target, key) {
    let types = {}
    let result
    if (Number.isInteger(+key)){
      return target[key]
    } else {
      for (item of target) {
       
        if (item.name === key) {
          result = item
        }
        if (types[item.type]){
          types[item.type].push(item)
        } else {
          types[item.type] = [item]
        }
      }
    }
    if (result) {
      return result
    }
    if (key === 'types') {
      return types
    }
    if (key === 'number') {
      return target.length
    }
    if (key in types) { 
      return types[key]
    }
    
  }
})
```
## 对比
proxy是即将到来的vue3代替Object.definePrototype的实现，至于为什么要用proxy代替我们大概可以阐述出以下几个观点:
1. proxy劫持的是整个对象，而不需要对对象的每一个属性进行拦截，这样将减少vue之前的版本对于为了实现整体对象响应式而递归去对相应对象每一个属性进行拦截的操作，大大优化了性能
2. 对于defineProperty有一个致命的弱点，就是他没有办法监听数组的变化，为了解决这个问题，vue在底层对数组的方法进行了hack，监听了每一次数组特定的操作，并为操作后的数组实现响应式。
```javascript
  methodsToPatch.forEach(function(method) {
    // cache original method
    // 获取原方法
    var original = arrayProto[method];
    // def方法重新定义arrayMethods的method方法，然后将新的取值方法赋值
    def(arrayMethods, method, function mutator() {
      var args = [],
        len = arguments.length;
      while (len--) args[len] = arguments[len];
      var result = original.apply(this, args);
      var ob = this.__ob__;
      var inserted;
      switch (method) {
        case 'push':
        case 'unshift':
          // [].push(1),[].unshift(1)
          // arg = [1]
          inserted = args;
          break
        case 'splice':
          // [1,2,3].splice(0,1,1)
          // 第三个参数为插入的值
          inserted = args.slice(2);
          break
      }
      if (inserted) { ob.observeArray(inserted); }
      // 如果是插入操作则对插入的数组进行响应式观察
      // 其他操作将手动触发一次响应收集
      // notify change
      ob.dep.notify();
      return result
    });
  });
```
虽然在vue底层对数组进行了hack，由于defineProperty是没有办法进行监听数组角标而导致的变化的，无可奈何下只能提供了一个$set方法进行响应收集，而在proxy里是不存在这个问题的。

### ps
虽然proxy很好用，但是他存在最大的问题就是兼容性，根据MDN所给出的兼容来看，对于edge以下的所有ie浏览器都不支持。但是当初Vue刚出来的时候DefineProperty实际上也是存在兼容问题的，实践证明优秀的东西是不会被淘汰的。
拒绝IE从你我坐骑