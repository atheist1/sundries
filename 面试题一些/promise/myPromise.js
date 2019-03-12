function myPromise(fn) {
  let state = 'pending',
    value = '',
    callbacks = [] // callback内部函数是在then方法里推入事件
  let resolve = function(newVal) {
    if (state === 'pending') {
      state = 'fullfiled'
      value = newVal
    } else if (state === 'fullfiled') {}
  }
  let reject = function(newVal) {
      if (state === 'pending') {
        state = 'reject'
        value = newVal
      }
    }
    /**
     * cb 包括 resolve reject
     */
  let handler = function(cb) { // 执行函数
    if (state === 'pending') { // 如果还在执行则延后执行
      callbacks.push(cb)
      return
    }
    if (state === 'fullfiled') { // 由上一个promise then处理到此
      cb.onFulfilled(value) // 处理完成函数需要把上一个value传入
    }
  }
  try {
    fn(resolve, reject)
  } catch (err) {
    reject(err)
  }
  this.then = function(onFulfilled = null, onReject = null) {
    return new myPromise(handler({
      onFulfilled,
      onReject,
      resolve,
      reject
    }))
  }
}
// var dosome = () => {
//   return new Promise((resolve) => {
//       resolve({a:5678})
//   })
// }
// var doother = (id) => {
//   return new Promise((resolve, reject) => {
//     // 这里就可以取到id
//     resolve(id)
//     // reject('networkError')
//   })
// }
// dosome().then(doother).then((jobs) => {
//   console.log(jobs.a)
// }, (err) => {
//   console.log(err)
// })