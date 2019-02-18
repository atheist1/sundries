
/**
 * 实现一个bind call apply
 */
var module = {
  x: 42,
  getX: function() {
    return this.x;
  }
}
var unboundGetX = module.getX;
// console.log(unboundGetX()); // The function gets invoked at the global scope
// // expected output: undefined

// var boundGetX = unboundGetX.bind(module);
// console.log(boundGetX());
// expected output: 42

// bind
// 原理，把this传入,返回
Function.prototype.myBind = function (obj) {
  var fn = this
  if (!isTypeOf(fn, 'function')) {
    return new TypeError('Error')
  }
  return function F() {
    // 单例模式
    if (fn instanceof F) {
      return new fn()
    }
   return fn.apply(obj)
  }
}
// apply
// 原理，传入this，arg，执行一次，删除函数

Function.prototype.myApply = function (context, args) {
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

Function.prototype.myCall = function (context) {
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
// var boundGetX = unboundGetX.myBind(module)
// console.log(boundGetX(),boundGetY());
let a = {
  value: 1
}
function getValue(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value)
}
// getValue.apply(a, ['yck', '24'])
getValue.myCall(a, 'yck', '24')