var fn1 = function(arr) {
  // 6s...
  let _arr = []
  for (let i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) === i) {
      _arr.push(arr[i])
    }
  }
  return _arr
}
var fn2 = (arr) => {
  // 13ms...
  let map = {}
  let _arr = []
  for (let i = 0; i < arr.length; i++) {
    if (!map[arr[i]]) {
      map[arr[i]] = true
      _arr.push(arr[i])
    } else {
      continue
    }
  }
  return _arr
}
var fn3 = arr => {
  // 13ms...
  let map = new Map
  let _arr = []
  for (let i = 0; i < arr.length; i++) {
    if (map.get(arr[i]) === undefined) {
      map.set(arr[i], i)
      _arr.push(arr[i])
    }
  }
  return _arr
}

function fn4(array) {
  // 4s...
  var res = array.filter(function(item, index, array) {
    return array.indexOf(item) === index;
  })
  return res;
}
var fn5 = (a) => [...new Set(a)]
let test = (func) => {
  var arr = []
    // 生成[0, 100000]之间的随机数
  for (let i = 0; i < 100000; i++) {
    arr.push(0 + Math.floor((100000 - 0 + 1) * Math.random()))
  }
  // ...实现算法
  console.time('test');
  func(arr)
  console.timeEnd('test');
}
test(fn1)