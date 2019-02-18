var _toString = Object.prototype.toString
function MyPromise (fn) {
  var state = 'pending'
  let value
  let resolve = (newVal) => {
    // promise对象
    if (newVal && (typeof newVal === 'object' || typeof newVal === 'function')) {
      // is newValue a thenable data?
      var then = newVal.then
      if (typeof then === 'function') {
        // 直接跳入下一个then,结束上层promise，
        // 到这一步时，上层的fulfilled方法已经被调用了，
        then.call(newVal, resolve, reject)
        // state重置
        state = 'pending'
        return
      }
    }
    state = 'fulfilled'
    value = newVal
    excute()
  }
  let reject = (reason) => {
    value = reason
    state = 'rejected'
    excute()
  }
  var callbacks  = []
  /**
   * cb:{
   *  resolve,
   *  reject,
   *  onFulfilled,
   *  onRejected
   * }
   */
  let handler = (cb) => {
    var cba
    // 这里是注册事件，如果是pending就加入callback
    // 等到真正resolve的时候会调用
    if (state === 'pending') {
      callbacks.push(cb)
      return
    }
    if (state === 'fulfilled' && _toString.call(cb.onFulfilled) === '[object Function]') {
      cba = cb.onFulfilled
    } else if (state === 'rejected' &&  _toString.call(cb.onRejected) === '[object Function]') {
      
      cba =cb.onRejected
    } 
     
    try {
      // 如果resolve或者reject返回了一个promise对象，将会在这里把val执行成一个promise
      // 这里是执行resolve或者reject的地方
      let val = cba(value)
      // 把下一个promise丢给resolve
      if (val) {
        cb.resolve(val)
      }
    } catch(e) {
      cb.reject(e)
    }
  }
  let excute = () => {
    // macrotask推入任务栈
    setTimeout(function () {
      callbacks.forEach(function (callback) {
        handler(callback)
      })
    }, 0)
  }
  /**
   * 第一个参数是成功时的回调，接受promise.resolve的结果，
   * 第二个参数是非必需的，接受reject的结果
   * 为了实现链式调用，then方法肯定返回的是一个新的promise对象
   */
  this.then = (onFulfilled, onRejected) => {
    return new MyPromise((resolve, reject) => {
      handler({
        onFulfilled: onFulfilled || null,
        onRejected: onRejected || null,
        resolve: resolve,
        reject: reject
      })
    })
  }
  fn(resolve, reject)
}
let asyncTask = () => {
  let random = parseInt(Math.random() * 10 + 1)
  const p = new MyPromise((resolve, reject) => {
    if (random > 5) {
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
console.log('hi')
// then是注册事件而不是调用，调用是利用发布订阅
asyncTask().then((val) => {
  console.log(val + 1)
  return asyncTask()
}, (val) => {
  console.log('rejectedaaaa  ' + val)
  return asyncTask()
})
.then((val) => {
  console.log('i am newVal ' + val)
},(val) => {
  console.log('i am newRejectVal ' + val)
})
console.log('bye')

