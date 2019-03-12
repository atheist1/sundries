# 函数节流与防抖
函数节流与防抖是在js执行过程中的一些奇淫技巧，主要是对一段时间内大量重复函数调用的处理。  
比如对屏幕滚动事件的监听，对输入框change事件的监听等等，我们接下来将会以两个方面介绍这些处理方式。
## 函数防抖
函数防抖最简单的应用就是在屏幕滚动事件的监听
```javascript
window.onscroll  = function () {
  //滚动条位置
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
　console.log('滚动条位置：' + scrollTop);
}
```
上述事件在浏览器的表现形式很简单，每当你滚动一次滚动条他将会不断地打印滚动条的位置信息，但是如果我们想让他不断滚动却只执行一次，只有停止滚动一段时间后第二次滚动才会触发第二次，这样就引申出来了函数去抖。函数去抖精髓在于以下几点。  
1. 一段时间只执行函数一次
2. 上一个时间间隔还没结束如果触发了函数则抛弃上一次的执行，重新计时

第一版
```javascript
let debounce = (fn, delay) => {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    } else {
      timer = setTimeout(fn,delay)
    }
  }
}
```
简单的防抖函数就如上述可以实现，但是上述方式会存在两个问题。第一个问题是函数内部this指向出现问题，使用timeout之后，执行fn函数的this是window，所以需要使用明确绑定this指向，同样的问题在于这样的函数没办法传入参数，没办法返回结果，所以我们对其进行了二次改造

第二版
```javascript
let debounce = (fn, delay) => {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    let result
    if (timer) {
      clearTimeout(timer)
      timer = null
    } else {
      timer = setTimeout(function() {
        result = fn.apply(context, args)
      },delay)
    }
    return result
  }
}
```
第二种防抖我们实现了this绑定、函数传递、结果返回三个需求。这时候我们发现另外的一个问题，所有函数触发后第一次执行都是等待了延迟时间后才执行，我们能不能让他执行的时间提前到触发的时候呢，于是我们开发了第三版。

第三版
```javascript
let debounce = (fn, delay, immediate) => {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    let result
    let callNow
    if (timer) {
      clearTimeout(timer) // 第二次进入取消上次任务队列中的函数，但是不清空timer，是为了立即执行一次
    }
    if (immediate) { // 立即执行分支
      callNow = !timer // 如果没有
      timer = setTimeout(() => {timer = null},delay)
      if (callNow) {
        result = fn.apply(context, args)
      }
    } else {
      timer = setTimeout(function() {
        result = fn.apply(context, args)
      },delay)
    }
    return result
  }
}
```

第四版
```javascript
let debounce = (fn, delay, immediate) => {
  let timer = null
  let _debounce = function () {
    let context = this
    let args = arguments
    let result
    let callNow
    if (timer) {d
      clearTimeout(timer) // 第二次进入取消上次任务队列中的函数，但是不清空timer，是为了立即执行一次
    }
    if (immediate) { // 立即执行分支
      callNow = !timer // 如果没有
      timer = setTimeout(() => {timer = null},delay)
      if (callNow) {
        result = fn.apply(context, args)
      }
    } else {
      timer = setTimeout(function() {
        result = fn.apply(context, args)
      },delay)
    }
    return result
  }
  _debounce.cancel = function(){
    clearTimeout(timer)
    timer = null
  }
  return _debounce
}
```
ps:函数防抖的用途举例，输入框不断输入会不断触发事件，使用函数防抖，等待最后一次停止触发change事件之后才发送请求
## 函数节流
函数节流是与函数防抖类似处理的东西，他主要是对执行速率的稀释，让重复执行的函数到一次又一次的时间间隔内执行，与防抖类似的是，在同一段时间内函数只会执行一次。与防抖不同的事，如果第二次触发函数的时候，如果上一个函数还未执行的话则抛弃这次触发，但是不抛弃上一次函数。而防抖在同样的情形下会抛弃上一次任务栈的函数，重新开始计时。

实现方式1 timeout
```javascript
let throttle = (fn, delay) => {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    let result
    if (!timer) {
      timer = setTimeout(function() {
        result = fn.apply(context, args)
        timer = null // 清空执行
      },delay)
    }
    return result
  }
}
```
实现方式2 date
```javascript
let throttle = (fn, delay) => {
  let timer = null
  let old = +new Date()
  return function () {
    let context = this
    let args = arguments
    let result
    let now = +new Date()
    if (now - delay > old) {
      old = now
      setTimeout(function() {
        result = fn.apply(context, args)
        timer = null // 清空执行
      },delay)
    }
    return result
  }
}
```
```javascript
let fn = () => console.log(1)
window.addEventListener('scroll', throttle1(fn, 1000))
```