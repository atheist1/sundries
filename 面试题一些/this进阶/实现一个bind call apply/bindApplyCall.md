# 实现一个bind call apply
今天来讲一下面试经常会被考到的一个问题，如何手写一个bind，apply，call

## call
call就是实现如下结果，传入一个对象，使用传入的对象调用绑定的函数
```javascript
var module = {
  x: 42,
  getX: function() {
    return this.x;
  }
}
let obj = {
  x: 'objX'
}
console.log(module.getX.call(obj))
```
原理主要是以下几步
1. 获取当前绑定函数fn
2. 获取传入参数
3. 将fn绑定到传入对象上
4. 用绑定对象执行函数
5. 删除绑定对象上的函数，避免污染
6. 返回结果  
代码如下
``` javascript
Function.prototype._call = function (context) {
  let fn = this // 获取绑定函数
  let args = Array.prototype.slice.call(arguments,1)
  let result
  if (Object.prototype.toString.call(fn) !== '[object Function]') {
    return new TypeError('no Function was found')
  }
  context.fn = fn
  try {
    result = context.fn(args)
  } catch (e) {
    return e
  }
  delete context.fn
  return result
}
```
## apply
apply其实与call是一致的，只是传入参数不同，apply传入的参数是一个数组
``` javascript
Function.prototype._apply = function (context,args) {
  let fn = this // 获取绑定函数
  let result
  if (Object.prototype.toString.call(fn) !== '[object Function]') {
    return new TypeError('no Function was found')
  }
  context.fn = fn
  try {
    result = context.fn(...args)
  } catch (e) {
    return e
  }
  delete context.fn
  return result
}
```
## bind
bind 是一个强绑定过程，什么都不能改变这个里面this的指向,一个简单的实现就是传入对象，返回闭包，最终所有this指向都会指向传入的对象，利用call和apply都不能改变。
``` javascript
Function.prototype._bind = function (context) {
  let fn = this
  if (Object.prototype.toString.call(fn) !== '[object Function]') {
    return new TypeError('no Function was found')
  }
  return function () {
    fn.apply(context,arguments)
  }
}
```
### bind进阶1
正如我们在同目录下[this进阶1](https://github.com/atheist1/sundries/blob/master/%E9%9D%A2%E8%AF%95%E9%A2%98%E4%B8%80%E4%BA%9B/this%E8%BF%9B%E9%98%B6/this%E8%BF%9B%E9%98%B61.md)所述，虽然bind作为强绑定不能被call和apply改变，但是new绑定的优先级是高于bind的，就像v8引擎内部对new有特殊的实现方式一样，我们这样也要做特殊的实现方式。除非被执行函数return中返回的是一个对象，否则new出来的对象是一个空对象(this指向)，他的原型是`fn`被调用函数，如下所示
```javascript

function foo() {
    this.b = 100;
    console.log(this.a);
    return this.a;
}

var func =  foo.bind({a:1});
func();//1
new func();//undefined   {b:100}，这里执行了func，可以看到此时上面的bind并不起作用
```
所以这里我们需要对new做特殊处理
```javascript
Function.prototype._bind = function (context) {
  let fn = this
  return function F() {
    if (this instanceof F) { // 如果当前this指向的是当前F函数的实例，证明是一个new的操作
     // 这里直接用new fn()的话没办法把this指向回去 
      let obj = Object.create(fn.prototype)
      const ret = fn.apply(obj, arguments)
      return ret instanceof Object ? ret : obj // 将原型指向fn函数
    }
    return fn.apply(context,arguments)
  }
}
// mdn bind解析
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function() {}, // 伪造了一个空函数
      fBound = function() {
        return fToBind.apply(this instanceof fNOP && oThis ? // 如果是new实例的话 new的实例的this指向fBound当然也指向fNOP
          this :
          oThis || window,
          aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
```
