function myPromise(fn) {
  let state = 'pending',
    value = '',
    callbacks = [] // callback内部函数是在then方法里推入事件
  let resolve = function(newVal) {
    if (state === 'pending') {
      state = 'fullfiled'
      value = newVal
      execute()
    } else if (state === 'fullfiled') {}
  }
  let reject = function(newVal) {
      if (state === 'pending') {
        state = 'reject'
        value = newVal
        execute()
      }
    }
    /**
     * cb 包括onFulfilled onReject resolve reject
     */
  let handler = function(cb) {
    // 这个state是上一个promise对象的state
    // 如果这个对象还在pending中的话，直接把下一个then中的promise对象的方法推入回调栈中
    // 当这个对象完成，将会执行这个方法，生成一个新的promise对象
    if (state === 'pending') {
      callbacks.push(cb)
      return
    }
    var cba = state === 'fullfilled' ? cb.onFulfilled : cb.onRejected,
      ret
      // 如果直接是执行完成了的话，就直接执行下一次的promise
      // 这是最终完成的步骤 onFulfilled可能是个promise对象，也可能就是个普通的函数，这样就实现了把数据传递的过程
      // 将上一个value传入了
      // then里面没有传递任何东西,以及下一个then为空
    if (cb === null) {
      cba = state === 'fullfilled' ? resolve : reject
      cba(value)
      return
    }
    try {
      ret = cba(value)
        // 并且执行下一个promise的resolve方法 并且传入了上一次的参数
        // 这个ret实际上是then方法里传入的promise对象
        // 执行resolve
      cb.resolve(ret)
    } catch (e) {
      cb.reject(e)
    }
  }

  function execute() {
    // macrotask推入任务栈
    setTimeout(function() {
      callbacks.forEach(function(callback) {
        handler(callback)
      })
    }, 0)
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