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
      execute()
    }
  }
  let reject = function (newVal) {
    if (state === 'pending') {
      state = 'reject'
      value = newVal
      execute()
    }
  }
  function execute() { // 执行队列
    // macrotask推入任务栈
    setTimeout(function () {
      callbacks.forEach(function (callback) {
        handler(callback)
      })
    }, 0)
  }
  try {
    fn(resolve, reject)
  }catch(err){
    reject(err)
  }
}
```
接下来我们就要想办法解决以下链式调用的问题了，当调用promise.then方法时,我们需要返回一个新的promise实例，then方法里实际上是执行了一次handler函数，我们看下handler函数到底做了什么操作
```javascript
/*
  cb是一个对象，它存在四个属性
  onFulfilled -> 对应的是外部使用then传入的第一个参数，代表处理上次成功的回调
  onReject -> 对应的是外部使用then传入的第二个参数，代表处理失败的回调
  resolve -> 内部对于成功的处理，将状态更新
  reject -> 内部对于失败的处理，将状态更新
*/
let handler = function (cb) {
  // 这里分成了几种情况
  // 1. 状态尚未被resolve即等待上一个resolve，先把当前回调推入
  if (state === 'pending') {callbacks.push(cb) return}
  // 2. 上一个链已经完成
  var cba = cb.onFullfiled ? cb.onFullfiled : cb.onReject, ret // 如果没有传入方法，则使用onReject方法，如果onReject方法也没有，通过try catch抛出异常并用reject接受
  // 3. then里面没有传递任何东西,以及下一个then为空
  if (cb === null ) {
    cba = state === 'fullfilled' ? resolve : reject
    cb(value)
    return
  }
  try {
    var ret = cba(value)
    cb.resolve(ret) // then方法里返回的数据也要被resolve掉
  } catch(e) {
    cb.reject(e)
  }
}
```
接下来我们分析resolve和reject方法做了什么
```javascript
let resolve = function (newVal) {
  if (state === 'pending') {
    state = 'fullfiled'
    value = newVal
    execute()
  }
}
function execute() { // 执行队列
  // macrotask推入任务栈
  setTimeout(function () {
    callbacks.forEach(function (callback) {
      handler(callback)
    })
  }, 0)
}
```
如上所示，resolve与reject内部主要是做了三个操作
1. 将状态改变
2. 将值改变成新值
3. execute函数调用
execute函数实际上就是事件队列的黑科技，利用timeout将所有在cb里的事件最后进行处理，cb里的函数只有在执行handler且state为pending时才会被推入,如果部位pending就执行了
