## this指向问题
this指向问题是每一个前端工程师必须知道的知识点
### es5
在es5下的this指向是比较简单的问题
1. es5下的this总是指向他的直接调用者
2. 如果没有直接调用者则指向宿主对象
3. 严格模式下宿主对象是undefined
##### 例1
```
var fn = function() {
  console.log(this) // 宿主对象 window or node or 其他
  var obj = {
    name: 'obj',
    sayName: function() {
      console.log(this) // 指向obj对象
      console.log(this.name)
    }
  }
  obj.sayName()
}
fn()
```
##### 例2
```
var fn = function() {
  var obj = {
    name: 'obj',
    sayName: function() {
      setTimeout(function(){console.log(this)}) // window
    }
  }
  obj.sayName()
}
fn()
/*
  例题2的原因是，setTimeout会把函数推入宏任务队列
  等待当前任务队列结束，下一次任务队列执行的时候上下文环境已经改成了宿主对象
*/
```
##### 例3
```
window.val = 2
var obj = {
    val: 2,
    dbl: function() {
      this.val *= 2
      val *= 2
      console.log(val)
      console.log(this.val)
    }
  }
  // 4 4
  // obj.dbl() 
// 当前的val和this.val都是window下的
var dbl = obj.dbl
// dbl虽然调用的是obj.dbl，但是调用的时候没有前缀，所以实际上还是宿主对象
dbl() // 8 8
```
### es6
es6出现了箭头函数，他看起来像这样
```
var foo = a => {
	console.log( a );
};

foo( 2 ); // 2
```
箭头是繁琐的function的一个缩写,
但是箭头函数有几个比较有意思的特性
1. 没有arguments参数
2. this指向改成词法this特性

词法this这个特性看起来比较拗口，但实际上是很简单的。他就像变量的词法作用域一样，仅仅在定义的时候绑定this指向，在之后再也不能改变他的指向(包括call和bind)
##### 例1变式
```
// 以下的输出this会是window对象
// 原因是在定义箭头函数里的this时会去找上层作用域的指向
// 上层作用域是fn的函数作用域，当前的fn函数作用域在往上找就找到了宿主对象
window.name = 'window'
var fn = function() {
  var obj = {
    name: 'obj',
    sayName: () => {
      console.log(this) // 指向window
      console.log(this.name)
    }
  }
  obj.sayName()
}
fn()

```
##### 例2变式
```
// 与例题2不同的是，箭头函数的this指向并不会改变了
// 当定义函数的时候，当前的this指向的就是sayName的函数，sayName的函数当前this指向是obj
// 所以最终timeout出来就是obj
window.name = 'window'
var fn = function() {
  var obj = {
    name: 'obj',
    sayName: function() {
      setTimeout(() => { console.log(this) }) // obj
    }
  }
  obj.sayName()
}
fn()
```
##### 例3变式
```
// 例3的变式就简单明了了，dbl里面this永远指向window，没有办法改变
window.val = 2
var obj = {
    val: 2,
    dbl: () => {
      this.val *= 2
      val *= 2
      console.log(val)
      console.log(this.val)
    }
  }
  // 8 8
obj.dbl()
var dbl = obj.dbl
dbl() // 8 8
```
