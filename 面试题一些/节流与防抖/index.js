// debounce and throttle
// debounce 一段时间重复调用只执行一次
// 如果这段时间内没有触发函数才会执行，如果触发了函数则取消执行
// 利用timeout
// 这样的this指向的就是window，需要改变指向
let debounce = (fn, delay) => {
  let timeOut = null
  return function() {
    if (timeOut) {
      clearTimeout(timeOut)
      timeOut = null
    } else {
      timeOut = setTimeout(fn, delay)
    }
  }
}
let debounce1 = (fn, delay) => {
  let timeOut = null
  return function() {
    var context = this
    let args = arguments
    if (timeOut) {
      clearTimeout(timeOut)
      timeOut = null
    } else {
      timeOut = setTimeout(function() {
        fn.apply(context, args)
      }, delay)
    }
  }
}
let debounce2 = (fn, delay, immediate = false) => {
    let timeOut = null
    var debounce = function() {
      var context = this
      let args = arguments
      var result
      if (timeOut) {
        clearTimeout(timeOut)
      }
      if (immediate) {
        var callNow = !timeOut
        timeOut = setTimeout(function() { // 时间延迟放在了这里
            timeOut = null
          }, delay)
          // 当timeout被清空以后代表下一次可以直接调用
        callNow && (result = fn.apply(context, args))
      } else {
        timeOut = setTimeout(function() {
          fn.apply(context, args)
        }, delay)
      }
      return result
    }
    debounce.cancel = function() { // 取消去抖函数
      clearTimeout(timeOut)
      timeOut = null
    }
    return debounce
  }
  // 节流函数主要是对函数执行频率的稀释
  // 触发函数，如果当前函数正在执行则等待上一个执行栈中的任务
  // 如果当前函数执行完毕，则推入下一个执行栈
  // 与防抖不一样的是防抖在重复触发的时候会抛弃上一次的
  // 也就是说延迟设置2s 2s内就算触发了500次事件节流也只会执行两次
  // 如果是防抖的话，只要两秒内一直触发事件函数只会执行一次
let throttle = (fn, delay) => {
  let timeOut = null
  return function() {
    var context = this
    var args = arguments
    if (!timeOut) {
      timeOut = setTimeout(function() {
        fn.apply(context, args)
        timeOut = null
      }, delay)
    }
  }
}
let throttle1 = (fn, delay) => {
  let lastTime = +new Date()
  return function() {
    var context = this
    var args = arguments
    const now = +new Date()
    if (now - lastTime > delay) {
      lastTime = now
      setTimeout(function() {
        fn.apply(context, args)
      }, delay)
    }
  }
}
let fn = () => console.log(1)
window.addEventListener('scroll', throttle1(fn, 1000))