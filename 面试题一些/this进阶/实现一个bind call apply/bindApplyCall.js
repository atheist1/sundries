/**
 * 实现一个bind call apply
 */
var module = {
  getX: function() {
    return this.x;
  }
}
let obj = {
  x: 'objX'
}
let x = module.getX._bind(obj)
  // bind
  // 原理，把this传入,返回
  // 虽然bind作为强绑定不能被call和apply改变，但是new绑定的优先级是高于bind的，就像v8引擎内部对new有特殊的实现方式一样
  // 我们这样也要做特殊的实现方式。除非被执行函数return中返回的是一个对象，否则new出来的对象是一个空对象(this指向)，他的原型是`fn`被调用函数，如下所示
  // 传入一个对象，将对象的this绑定给调用函数，如果有参数则执行参数
Function.prototype._bind = function(context) {
    let fn = this
    return function F() {
      if (this instanceof F) { // 如果当前this指向的是当前F函数的实例，证明是一个new的操作
        let obj = Object.create(fn.prototype)
        const ret = fn.apply(obj, arguments)
        return ret instanceof Object ? ret : obj // 将原型指向fn函数
      }
      return fn.apply(context, arguments)
    }
  }
  // apply
  // 原理，传入this，arg，执行一次，删除函数

Function.prototype.myApply = function(context, args) {
    var fn = this
    if (!isTypeOf(fn, 'function')) {
      return new TypeError('Error')
    }
    context.fn = fn
    var result = context.fn(...args)
      // 不删除的话会给context污染
    delete context.fn
    return result
  }
  // vall
  // 原理，传入this，arg，执行一次，删除函数

Function.prototype.myCall = function(context) {
    var fn = this
    var args = Array.prototype.slice.call(arguments, 1)
    if (!isTypeOf(fn, 'function')) {
      return new TypeError('Error')
    }
    context.fn = fn
    var result = context.fn(...args)
      // 不删除的话会给context污染
    delete context.fn
    return result
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

    return fBound
  };
}