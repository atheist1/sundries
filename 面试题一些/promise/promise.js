function Promise(fn) {
  var value = null,
    state = 'pending',
    callbacks = []
    // 每一次的链式调用将会把下一次的then方法推入上一个回调栈中
  this.then = function(onFulfilled, onRejected) {
    // then方法调用的时候，new了一个promise对象，为了实现链式调用
    // 这个时候实际上形成了一个闭包，这也是promise的诟病，每一次链式调用将会形成一个闭包而且不会被清理
    // 所以实际上调用handle时，里面的value是上一次的value，这样实现了当前new出来的promise实例与上一次resolve之后的实例联系

    //如果是从resolve里调用的then方法，其实上是将内部then(promise)中的promise对象注册then方法
    return new Promise((resolve, reject) => {
      // then方法执行handle
      handle({
        onFulfilled: onFulfilled || null,
        onRejected: onRejected || null,
        resolve: resolve,
        reject: reject
      })
    })
  }

  function resolve(newValue) {
    // 如果是外部调用的话，将会把resolve的数据传入，当然也不会走if语句，证明，异步处理已经完成了

    // 这里为内部调用
    // 如果传递了一个promise对象，异步对象
    // 将会跳出resolve直到这个promise对象执行完成
    // 这里的调用栈在下面的cb.resolve那里
    if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
      // is newValue a thenable data?
      var then = newValue.then
      if (typeof then === 'function') {
        // 这里传入的resolve是上一个promise对象的
        // 这里是把value改变的过程
        // 如果是一个thenable数据的话将调用then方法，然后不往下执行
        then.call(newValue, resolve, reject)
        return
      }
    }
    // 不是一个thenable数据，将会将数据为fullfilled
    value = newValue
    state = 'fullfilled'
      // 这里将会最后执行
    execute()
  }
  // 注册下一个then的时候，将会触发handle方法
  function handle(cb) {
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
      // then里面没有传递任何东西
    if (cb === null) {
      cba = state === 'fullfilled' ? cb.resolve : cb.reject
      cb(value)
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

  function reject(reason) {
    state = 'reject'
    value = reason
    execute()
  }

  function execute() {
    // macrotask推入任务栈
    setTimeout(function() {
      callbacks.forEach(function(callback) {
        handle(callback)
      })
    }, 0)
  }
  // 用用户定义的resolve函数执行内部的resolve函数
  // 每一次new都会执行这里，下一步执行then
  fn(resolve, reject)
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
var asyncTask1 = () => {
    let random = parseInt(Math.random() * 10 + 1)
    const p = new Promise((resolve, reject) => {
      if (false) {
        setTimeout(() => {
          resolve('resolve' + parseInt(random))
        }, random - 5)
      } else {
        setTimeout(() => {
          reject('reject' + parseInt(random))
        }, random)
      }
    })
    return p
  }
  // console.log('hi')
  // // then是注册事件而不是调用，调用是利用发布订阅
  // asyncTask1().then((val) => {
  //   // console.log(val + 1)
  //   return asyncTask1()
  // }, (val) => {
  //   console.log('rejectedaaaa  ' + val)
  // })
  // .then((val) => {
  //   console.log('i am newVal ' + val)
  // },(val) => {
  //   console.log('i am newRejectVal ' + val)
  // })
  // console.log('bye')