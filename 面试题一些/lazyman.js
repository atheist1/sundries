/**
 * 
 * lazyMan solution1 
 */
//Jquery的无New构造
var LazyMan = function (name) {
  // new LazyMan => 死循环
  // new LazyMan.prototype.init() => init返回一个lazyMan
  // 直接 lazyman.prototype.init返回this的话,this指向的是init函数
  // 用lazyMan.fn代替lazyMan.prototype
  // 最后用lazyMan.fn.init的prototype指向lazyMan.fn实现this替换
  // 当然不用fn也是可以的，但是看起来就会很乱
  // 这样就实现了无new构造，那怎么做到$.xxx的呢，内部使用$.extend把原型方法添加到$上即可
  return new LazyMan.fn.init(name)
}
LazyMan.fn = LazyMan.prototype = {
  init : function (name) {
    this.name = name
    this.stack = []
    this.time = 0
    this.isSleep = false
    return this
  },
  constructor: LazyMan,
  sayName () {
    console.log('Hi,this is ' + this.name)
  },
  eat (food) {
    this.promiseFn((food) => {
      console.log(this.name + ' eated ' + food)
    }, food)
    return this
  },
  sleep (time) {
    this.time += time
    this.stack.push(this.time)
    return this
  },
  play (something) {
    this.promiseFn((something) => {
      console.log(this.name + ' is playing ' + something)
    }, something)
    return this
  },
  sleepFirst (time) {
    if (time) {
      this.time = time
      this.isSleep = true
      setTimeout(() => {
        console.log('wake up after ' + time + 's')
        this.sayName()
      }, time * 1000)
    }
    return this
  },
  promiseFn (fn,args) {
    if (!this.isSleep) {
      this.sayName()
      this.isSleep = true
    } else {

    }
    if (this.stack.length) {
      this.stack.forEach((item) => {
        setTimeout(() => {
          fn.call(this,args)
        },item * 1000)
        this.stack.pop()
      })
    } else {
      fn.call(this,args)
    }
  }
}
// LazyMan.prototype.init.prototype = LazyMan.prototype
LazyMan.fn.init.prototype = LazyMan.fn
// 返回的实例，既是lazyman的实例 也是lazyman.fn.init的实例
// true true
// console.log(hank, hank instanceof LazyMan, hank instanceof LazyMan.fn.init)

/**
 * lazyMan solution2
 * 类似于node express中间件的方式，next()控制
 */
// var LazyMan = function (name) {
//   return new _LazyMan(name)
// }
// var _LazyMan = function (name) {
//   this.task = []
//   this.name = name
//   this.isSleep = false
//   setTimeout(() => {
//     this.next()
//   }, 0)
//   this.sleepFirst(0)
// }
// _LazyMan.prototype = {
//   sleep: function(time) {
//     var fn = (() => {
//       return () => {
//         setTimeout(() => {
//           this.log('wake up after ' + time + 's')
//           this.next()
//         }, time * 1000)
//       }
//     })(time)
//     this.task.push(fn)
//     return this
//   },
//   next: function() {
//     var fn = this.task.shift()
//     fn && fn()
//   },
//   sayName: function () {
//     this.log('this is ' + this.name)
//     return this
//   },
//   log: function (str) {
//     console.log(str)
//   },
//   eat: function (food) {
//     var fn = (() => {
//       return () => {
//         this.log(this.name + ' is eating ' + food)
//         this.next()
//       }
//     })(food)
//     this.task.push(fn)
//     return this
//   },
//   sleepFirst: function (time) {
//     if (time) {
//       var fn = (() => {
//         return () => {
//           setTimeout(() => {
//             this.isSleep = true
//             this.log('wake up after ' + time + 's')
//             this.sayName()
//             this.next()
//           }, time * 1000)
//         }
//       })(time)
//       this.task.unshift(fn)
//     } else {
//         var fn = (() => {
//           return () => {
//               setTimeout(() => {
//                 if (!this.isSleep) {
//                   this.sayName()
//                 }
//                 this.next()
//               }, time * 1000)
//           }
//         })(0)
//         this.task.push(fn)
//     }
//     return this
//   }
// }
var hank = LazyMan('hank')
hank
.sleep(1)
  .eat('apple')
  .sleep(1)
  .eat('banana')
console.log(hank)