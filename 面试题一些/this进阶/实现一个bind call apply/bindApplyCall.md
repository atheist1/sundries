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
