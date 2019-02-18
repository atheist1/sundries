// tools
var _toString = Object.prototype.toString

function isTypeOf(obj, type) {
  const map = {
    array: '[object Array]',
    object: '[object Object]',
    undefined: '[object Undefined]',
    null: '[object Null]',
    number: '[object Number]',
    string: '[object String]',
    function: '[object Function]'
  }
  let _type = _toString.call(obj)
  return map[type] === _type
}
/**
 * 深复制与浅复制
 */
// 深复制1
// 使用json.stringfy json.parse
/**
 * 
 * JSON.parse JSON.stringify 会无视值为undefined得属性,会无视所有函数定义
 * 会将NaN转换为null, 将infinity转为null
 */
function fakeClone1(obj) {
  let _obj = JSON.stringify(obj)
  let cloneObj = JSON.parse(_obj)
  cloneObj.type = 'clone'
  return cloneObj
}
// 深复制2
/**
 * 
 * Object.assign方法不会跳过那些为undefined null的元素
 * 但是对数组类型，引用类型的不会进行深复制
 */
function fakeClone2(obj) {
  let _obj = {}
  return Object.assign(_obj, obj)
}
// 深复制3
/**
 * 
 * 深度优先遍历
 * 这种方法会出现一个问题，当对象内出现环时，会造成死循环，所以我们需要判别环的问题 
 * const obj1 = {
    foo: {
      name: 'foo',
      bar: {
        name: 'bar',
        baz: {
          name: 'baz',
          aChild: null  //待会让它指向obj.foo
        }
      }
    }
  }
  obj1.foo.bar.baz.aChild = obj1.foo
 */
function deepClone(obj) {
  let _obj = {}
  if (isTypeOf(obj, 'array')) {
    _obj = []
  } else {
    _obj = {}
  }
  for (item in obj) {
    if (isTypeOf(obj[item], 'array')) {
      _obj[item] = deepClone(obj[item])
    } else if (isTypeOf(obj[item], 'object')) {
      _obj[item] = deepClone(obj[item])
    } else {
      _obj[item] = obj[item]
    }
  }
  return _obj
}
// 深复制4
/**
 * 广度优先遍历
 * 在遍历过程中，把已经访问过的对象加入队列中
 */
function widthCopy(data) {
  let orgin = [data]
  let obj = {}
  let copy = [obj]
  var visitedQueue = []
  var visitedCopyQueue = []
  while (orgin.length > 0) {
    let items = orgin.shift()
      // 第一次相当于把obj的引用给了_obj,当然后面会改变引用
    var _obj = copy.shift()

    visitedQueue.push(items)
    visitedCopyQueue.push(_obj)
    for (let item in items) {
      if (isTypeOf(items[item], 'object')) {
        let index = visitedQueue.indexOf(items[item])
        if (!~index) {
          _obj[item] = {}
          orgin.push(items[item])
          copy.push(_obj[item])
        } else {
          // 下面两种写法有什么区别？
          _obj[item] = visitedCopyQueue[index]
            // _obj[item] = visitedQueue[index]
        }
      } else if (isTypeOf(items[item], 'array')) {
        _obj[item] = []
        orgin.push(items[item])
          // 给copy一个同类型的空数组
        copy.push(_obj[item])
      } else {
        _obj[item] = items[item]
      }
    }
  }
  return obj
}
var obj = {
  name: 'fakeObj',
  arr: [1, [2, 3]],
  arr2: [1, 3],
  unde: undefined,
  nul: null,
  NaN: NaN,
  obj: {
    a: 1
  },
  func: function() {},
  funArrow: () => {},
  inifinite: Infinity
}
const obj1 = {
  foo: {
    name: 'foo',
    bar: {
      name: 'bar',
      baz: {
        name: 'baz',
        aChild: null //待会让它指向obj.foo
      }
    }
  }
}
obj1.foo.bar.baz.aChild = obj1.foo
var cloneObj = widthCopy(obj1)

obj.name = 'obj'
obj.arr[1][1] = 2
obj.arr2[0] = 'a'
obj.obj.a = 'b'
obj1.foo = 'a'
console.log(obj1, cloneObj)