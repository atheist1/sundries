/**
 * 继承方式
 */

function SurperType(name) {
  this.arr = [1, 2, 3]
  this.name = name
  this.property = true
}
SurperType.prototype.getSuperValue = function() {
    return this.property
  }
  // 1.原型链继承
  // 父亲是supertype，父亲原型上拥有getSuperValue方法
  // 子级将自身prototype绑定到父级的实例上
  // 继承的实质就是复制，用父级实例重写子级原型对象
  // subtype的原型是superType的实例
  // var ins = new SubType()

// ins.__proto__ = new SurperType()
// 上述也可以实现继承，但是是实例的继承不是subtype的继承

// 出现的问题，在父级原型上的引用类型会被共同继承，修改一个其他都改变了
// function SubType() {
//   this.subProperty = false
// }
// SubType.prototype = new SurperType()
// SubType.prototype.getSubValue = function() {
//   return this.subProperty
// }


// 2.借用构造函数模式
// 不使用原型链继承
// 实际上是原型内部借用了父级的this
// 缺点：借用的this并不能访问到父级的原型
// 每一个子级实例都有着父级函数的备份
// function SubType() {
//   SurperType.call(this)
//   this.subProperty = false
// }

// 3.组合构造函数模式 结核以上两点就是组合构造函数模式
// 缺陷是每一个子级都会复制一份父级实例属性
// function SubType() {
//   // 这句话会让父亲实例上的属性拷贝到子集上
//   SurperType.call(this)
//   this.subProperty = false
// }
// SubType.prototype = new SurperType()
// SubType.prototype.getSubValue = function() {
//     return this.subProperty
//   }
//   // 将构造器指向改变
// SubType.prototype.constructor = SubType

// 4.原型式继承
// 利用空对象复制一次父级的原型，其他操作都在复制体上进行
// var object = function(obj) {
//   function F() {}
//   F.prototype = obj
//   return new F()
// }
// var copy = object(SurperType)
// copy.subProperty = false
// copy.getSubValue = function() {
//     return this.subProperty
//   }
//   // var ins = new SubType()
//   // var ins1 = new SubType()
//   // ins.__proto__ === SubType.prototype true

// 5.寄生组合式继承 最成熟的方案

function inheritPrototype(subType, superType) {
  var prototype = Object.create(superType.prototype)
  prototype.constructor = subType
  subType.prototype = prototype
}

function SubType(name, age) {
  SurperType.call(this, name)
  this.age = age
}
// 继承
// 与上一个不同的是没有new的过程，减少了一次构造函数的调用
inheritPrototype(SubType, SurperType)
SubType.prototype.sayAge = function() {
  console.log(this.age)
}
let ins = new SubType('a', 18)
  // console.log(ins.sayAge())

// es6
class Rectangle {
  constructor(height, width) {
    this.height = height
    this.width = width
  }
  getArea() {
    return this.height * this.width
  }
  getWidth() {
    console.log('width is ' + this.width)
  }
  getHeight() {
    console.log('height is ' + this.height)
  }
}
class Square extends Rectangle {
  constructor(length) {
    super(length, length)
  }
}
let tr1 = new Rectangle(10, 32)
let s1 = new Square(10)
console.log(tr1.getWidth(), tr1.getHeight())