
/** 通过递归查找数组中对应id对应项 */
// var arr = [{
//   id: 1,
//   name: 'a',
//   children: [{
//     id:2,
//     name:'b',
//     children: [
//       {
//         id:4,
//         name:'c',
//         children:[]
//       }
//     ]
//   },
//   {
//     id: 3,
//     name: 'd',
//     children: [
//       {
//         id:5,
//         name:'e',
//         children:[]
//       }
//     ]
//   }
//   ]
// }]
var digui = (id, arrs) => {
  for (let i = 0; i < arrs.length; i++) {
    if (arrs[i].id === id) {
      return (arrs[i].name)
    }
    if (digui(id, arrs[i].children)) {
      return digui(id, arrs[i].children)
    }
  }
}

/** 
 * 二分查找算法 
 * 前提： 一定是有序数组
 * 原理： 先把数组分成0到mid - 1与mid 到 length - 1，如果key > mid - 1索引位置则递归 mid到length的数组
 * */
// 递归
var sortByHalf = (key, arr, beginIndex, endIndex) => {
  var mid = parseInt((endIndex + beginIndex) / 2)
  var midVal = arr[mid]
  if (mid > 0) {
    if (midVal > key) {
      return sortByHalf(key, arr, beginIndex, mid)
    } else if (midVal < key) {
      return sortByHalf(key, arr, mid, endIndex)
    } else if (midVal === key) {
      return mid
    }
  } else {
    console.error('no Data')
  }
}
// 循环
var sortByHalf2 = (key, arr) => {
  var [start, end, mid] = [0, arr.length, (arr.length - 1) / 2]
  var midVal
  while (mid > 0) {
    mid = parseInt((start + end) / 2)
    midVal = arr[mid]
    if (midVal > key) {
      end = mid
    } else if (midVal < key){
      start = mid
    } else {
      return mid
    }
  }
}
// var test = [8, 10, 29, 50, 67, 99, 256, 981, 1055]
// console.log(sortByHalf2(1055, test))


//数组扁平化处理：实现一个flatten方法，使得输入一个数组，该数组里面的元素也可以是数组，该方法会输出一个扁平化的数组。
let givenArr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
let outputArr = [1,2,2,3,4,5,5,6,7,8,9,11,12,12,13,14,10]

// 递归办法
let flatten = (arr) => {
  var arrs = []
  for (let i = 0; i < arr.length; i++) {
    if (isTypeOf(arr[i],'array')) {
      arrs = arrs.concat(flatten(arr[i]))
    } else {
      arrs.push(arr[i])
    }
  }
  return arrs
}
// flatten(givenArr)
function flatten1 (arr) {
  return arr.reduce((prev, item) => {
    Array.isArray(prev) ? prev : prev = [prev]
    return prev.concat(Array.isArray(item) ? flatten1(item) : item)
  })
}
// flatten(givenArr)
// console.log(flatten1(givenArr))

// 函数的科里化
//柯里化和偏函数应用的主要意义就是固定一些我们已知的参数，然后返回一个函数继续等待接收那些未知的参数。
var currify = (fn, arr) => {
  var arr = arr || []
  // 不能直接改变arr，否则下次使用闭包的时候会出现问题
  return function () {
    var args = [].slice.call(arguments) 
    let arg = arr.concat(args)
    // return function (arg) {
      // 最后当arg的长度跟fn长度一致时
      if (arg.length === fn.length) {
        return fn.apply(null, arg)
      } else {
        return currify(fn, arg)
      }
    // }(arr.concat(args))
  }
}
var abc = function(a, b, c) {
  return a + b+ c
}

const curry = (fn, arr = []) => (...args) => (
  arg => arg.length === fn.length
    ? fn(...arg)
    : curry(fn, arg)
)([...arr, ...args])

console.log(curried(1)(2)(3))
// => [1, 2, 3]

console.log(curried(1, 2, 3))
// => [1, 2, 3]

console.log(curried(1, 2)(4))
// => [1, 2, 3]

console.log(curried(1)(2, 3))
// => [1, 2, 3]