// 科里化函数 把多个参数一个函数改成一个参数多个函数
/**
 * 
 * @param {需要科里化的函数} fn 
 * @param {已存在参数} args 
 */
var curry = function(fn, args = []) {
    let len = fn.length // 获取传入函数实际需要参数个数
      // 返回函数给下一次调用使用
    return function() {
      // 获取下次调用时传入的参数
      let _arg = Array.prototype.slice.call(arguments)
        // 把参数传入已存在参数数组
      Array.prototype.push.apply(args, _arg)
      if (args.length < len) {
        return curry(fn, args)
      }
      return fn.apply(this, args)
    }
  }
  // 科里化函数二 不定参数直接输出 利用函数的valueof
var curryMore = function(fn, args = []) {
  // 内部返回一个函数
  let inner = function() {
    // 返回的函数最后会调用toString方法
    // 在toString方法里做hack
    // 每次返回出去的都是一个inner函数，直到最后一次调用
    let _inner = function() {
        args.push(...arguments)
        return _inner
      }
      // 只针对于一个函数了
    _inner.toString = function() {
      return args.reduce((a, b) => a + b)
    }
    _inner.valueOf = function() {
      return args.reduce((a, b) => a + b)
    }
    return _inner()
  }
  return inner(...args)
}
var add = (a, b, c, d) => a + b + c + d
var _add = curryMore(add)
console.log(_add(1, 5, 7)(3, 0))
  // console.log(_add(1)(5)(3)(7))