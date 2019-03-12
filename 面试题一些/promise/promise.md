# 如何实现一个满足Promise A+的Promise
最简单的版本，我们需要实现一个Promise类，对于传入的函数可以立即执行
传入的函数内部存在调用resolve或者reject方法，所以fn函数存在两个参数resolve和reject
当然这两个参数是内部实现的
```javascript
function myPromise(fn) {
  let state = 'pending',
    value = '',
    callbacks = [] // callback内部函数是在then方法里推入事件
  let resolve = function (newVal) {
    if (state === 'pending') {
      state = 'fullfiled'
      value = newVal
    } else if (state === 'fullfiled')
  }
  let reject = function (newVal) {
    if (state === 'pending') {
      state = 'reject'
      value = newVal
    }
  }
  try {
    fn(resolve, reject)
  }catch(err){
    reject(err)
  }
}
```
接下来我们就要想办法解决以下链式调用的问题了，当调用promise.then方法时,我们需要返回一个新的promise实例
