// 实现一个new es5

"use strict";
var Dog = function(name) {
  this.name = name
  this.arr = [1, 3, 4]
}
Dog.prototype.bark = function() {
  console.log('wangwang')
}
Dog.prototype.sayName = function() {
  console.log('my name is ' + this.name)
}
Dog.prototype.printArr = function() {
  console.log(this.arr)
}
Dog.prototype.constructor = Dog
let sanmao = new Dog('三毛')
sanmao.sayName()
sanmao.bark()
  // new 的作用
  // 创建一个新对象obj
  // 把obj的__proto__指向Dog.prototype 实现继承
  // 执行构造函数，传递参数，改变this指向 Dog.call(obj, ...args)
  // 最后把obj赋值给sanmao
var _new = function() {
    let constructor = Array.prototype.shift.call(arguments)
    let args = arguments
    const obj = new Object()
    obj.__proto__ = constructor.prototype
    constructor.call(obj, ...args)
    return obj
  }
  // function _new(fn, ...arg) {
  //   var obj = Object.create(fn.prototype);
  //   fn.call(obj, ...arg);
  //   return obj;
  // }
var simao = _new(Dog, 'simao')
var wumao = _new(Dog, 'wumao')
wumao.arr.push(30)
simao.bark()
simao.sayName()
simao.printArr()
wumao.printArr()
const flatten = (arr) => [].concat(...arr.map(item => Array.isArray(item) ? flatten(item) : item))
console.log(flatten([1, [2],
  [
    [3], 4
  ], 5
]));

// 来一个new的精简写法
// 第一步创建一个对象
// 把对象原型绑定到构造函数的原型
// 改变对象的this指向
// 如果构造函数返回的是对象则返回这个对象，不然就返回新创建对象
// 实际上这种方法在小黄书里叫做oloo object linked to other object
// 不是利用原型继承，而是利用对象的方式继承
var __new = function(fn, ...args) {
  var obj = Object.create(fn.prototype)
  const ret = fn.apply(obj, args)
  return ret instanceof Object ? ret : obj
}

// es6 继承
// es6的继承就很简单，实现了class 实际上是prototype的语法糖
class Animal {
  constructor(name) {
    this.name = name
  }
  sayName() {
    console.log(this.name)
  }
  ping() {
    console.log(this.name + 'a')
  }
}
class Cat extends Animal {
  // 这里如果不写constructor会默认生成一个constructor并默认调用super
  constructor(name) {
    // super的实际作用是生成了一个父级的this 然后把父级方法添加在子类this上
    super(name)
      // super还能这样用
      // 直接调用父类方法，但是里面的this指向的是子类
    super.ping()
  }
  sayName() {
    console.log(this.name + 'miao')
  }
}
let cat = new Cat('miaomiao')
  // es5 es6继承的区别
  // es5的继承如同上述代码所示，先实现了子类的创建，然后把父类方法
  // 通过prototype绑定到字类上
  // es6的继承是es5继承的语法糖，但是实际上也是有区别的
  // es6的super是先创建了父类的this，然后把为this添加属性
  // 但是es6的class中子类是没有this的，他实际上是继承了父类的this
  // 如果你想使用子类的this，在子类构造函数返回一个对象。