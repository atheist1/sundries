# this老弟我来了！
在读完ydkjs小黄书的this部分后得出了一些想法，把他记录下来，痛扁this老弟一顿。
## 调用点与调用栈
从上篇文章我们了解了在es5和es6下this的指向问题，接下来我们从调用点和调用栈分析下this指向问题。
在js引擎中，this的指向与作用域不同，是根据函数的调用点（函数被谁调用）而为函数建立的this绑定。
```
function baz() {
    // 调用栈是: `baz`
    // 我们的调用点是 global scope（全局作用域）

    console.log( "baz" );
    bar(); // <-- `bar` 的调用点
}

function bar() {
    // 调用栈是: `baz` -> `bar`
    // 我们的调用点位于 `baz`

    console.log( "bar" );
    foo(); // <-- `foo` 的 call-site
}

function foo() {
    // 调用栈是: `baz` -> `bar` -> `foo`
    // 我们的调用点位于 `bar`

    console.log( "foo" );
}

baz(); // <-- `baz` 的调用点
```
从上述代码看，调用栈是baz->bar->foo.最终的调用点是baz，而baz所绑定的作用域是global对象。
但是es6箭头函数稍微有一些不同，他的this指向是跟定义相关的，如果当前没有找到绑定this的地方将会继承上层this指向，最终指向与this挂钩
## 四种绑定规则
我们将注意力转移到调用点，在调用点js引擎将会把this绑定，而绑定会遵从几个关系或者说是规则，接下来我们将分析以下四种关系。
#### 默认绑定(defalut binding)
默认绑定的情形很常见，当不存在其他可适配规则时最后的默认规则就是默认绑定，总是全局对象或者undefined。
```
function a() {
    console.log(this)
}
a()
```
观察以上代码我们考虑采用什么规则呢？左看看右看看发现调用a时是一个直白的简单的毫无修饰的调用，所以这里适用默认绑定。
#### 隐式绑定(implict binding)
隐式绑定的规则很容易理解，到达调用点的时候，我们观察有没有环境对象（context object）或者说容器，或拥有者存在，如果存在，则把this绑定到其上
```
var fn = function () {
    console.log(this)
}
var obj = {
    say: fn
}

obj.say()
// 调用栈 fn -> say
// 调用点 obj.say 
```
如上所示，当到达调用点时发现函数存在环境对象obj,这时候将obj绑定为this
#### 隐式丢失(implictly lost)
隐式调用存在着隐式丢失的问题，当隐式丢失的时候将回退至默认绑定
```
function foo() {
	console.log( this.a );
}
var obj = {
	a: 2,
	foo: foo
};
var bar = obj.foo; // 函数引用！
bar() // 调用点
// 看似我们使用的是obj去调用的foo方法
// 但实际上我们观察调用点是一个光秃秃的调用，调用的是obj.foo的引用
// 最终本应该是隐式绑定的回退到了默认绑定
```
#### 明确绑定(Explicit binding)
看了隐式调用，你会发现当你想给函数内部显式绑定某个对象this时只能傻乎乎的把让目标对象包含这个函数的引用。这时候明确绑定就站出来了。  
js引擎提供了两种明确绑定的方式，一个是apply另一个是call，这两个实际上差别不大，关于call与apply的差异与实现方式我将会在另一篇文章解析，这里不做多介绍。  
```
function foo() {
	console.log( this.a );
}
var obj = {
	a: 2
};
foo.call( obj ); // 2
// 将foo的this绑定为obj的
```
#### 硬绑定(hard binding)
明确绑定有时候也不能解决绑定丢失的问题，这时候我们发现了另一种方式，让我们锁住我们的的this，那就是硬绑定。  
观察以下代码
```
var name = 'window'
var fn = function () {
    console.log(this.name)
}
var obj = {
    name: 'obj'
}
var calls = function() {
    fn.call(obj)
}
calls() // calls使用硬绑定把fn的this永远指向了obj
// 什么，你不信？那我们看看
calls.call({name:'i dont know'})
calls.call(window)
```
---
```
// 来一个带参数的方法
var fn = function (b) {
    console.log(this.a + b)
}
var obj = {
  a:4
}
var calls = function () {
  fn.apply(obj, arguments)
}
calls(5)
```
上述就是一个简单的硬性绑定的方式，但是这样的方式过于呆板，不灵活，让我们想想更好的方法吧!
```
function myBind(fn,obj) {
  return function () {
    return fn.apply(obj, arguments)
  }
}
var obj2 = {
  a: 18
}
var myFn = myBind(fn,obj2)
myFn(5)
// 这里我们构建了一个灵活的硬性绑定，同样的js内置对象Function也提供了这样一个bind方法，但是实现方法更加复杂
```
#### new绑定
new绑定是我们介绍的最后一种规则  
当函数前带上new运算符时将会进行以下几步
1. 建立一个空对象
2. 将构造函数的原型与空对象绑定
3. 将构造函数的this指向空对象并执行
4. 如果构造函数执行结果是一个对象则返回执行结果，不然返回这个空对象  
最终返回对象的this即被绑定了，这里存在一个如何实现一个new的面试题我将另取文章详细介绍。

## 混沌需要秩序
我们已经介绍完了所有的四种绑定方式，接下来我们将介绍四种方式的选择顺序。  
很明显，默认规则是最后的选择，我们将其放置一边。  
按照我们的编码经验也可以得知，明确绑定会比隐式绑定提前执行。new绑定也会被隐式绑定快。  
最后的问题就在明确绑定和new绑定更高了。  
```
function foo(something) {
	this.a = something;
}
var obj1 = {};
var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a ); // 2
var baz = new bar( 3 );
console.log( obj1.a ); // 2
console.log( baz.a ); // 3
```
观察以上代码，你会发出惊叹。咦，不是说好硬绑定不会被任何覆盖吗，而且我们写的myBind函数并没有对new进行处理，怎么baz.a就不是2了呢？  
这是因为ES5 的内建 Function.prototype.bind(..) 更加精妙，实际上十分精妙。这里是 MDN 网页上为 bind(..) 提供的（稍稍格式化后的）polyfill（低版本兼容填补工具）：
```
f (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== "function") {
			// 可能的与 ECMAScript 5 内部的 IsCallable 函数最接近的东西，
			throw new TypeError( "Function.prototype.bind - what " +
				"is trying to be bound is not callable"
			);
		}

		var aArgs = Array.prototype.slice.call( arguments, 1 ),
			fToBind = this,
			fNOP = function(){},
			fBound = function(){
				return fToBind.apply(
					(
						this instanceof fNOP &&
						oThis ? this : oThis
					),
					aArgs.concat( Array.prototype.slice.call( arguments ) )
				);
			}
		;

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}
```
## 来吧，最终的判断!
按照上诉来说，顺序就一目了然了  
1. 对象是不是new出来的 ? 如果是的话this就是新构建的对象
2. 函数是不是通过调用apply,call,甚至bind ? 如果是的话this就是被明确指定的对象
3. 函数是不是被某个context或者对象显式调用的 ? 如果是的话this就是显示调用的对象
4. 既然你们都不是，那就到默认绑定来吧，没办法了给你们一个默认值。

## 特例
上述规则基本上是全部通用的规则了(吧?)。所以说凡事都有特例。当我们使用某种规则时可能并不会出现想要的结果。比如以下配置。
```
var a = 2
var foo = function () {
	console.log(this.a)
}
foo.call(null) // 2
```
为什么要向call里面传入一个null呢?有很多奇怪的应用
```
var fn = function (a,b) {
	console.log(a + b)
}
fn.apply(null,[1,2]) // 散开一个数组
// 或者利用bind实现函数的科里化
var c = fn.bind(null, 2)
c(3)
```
除此之外，还有一个使用较广的特例，那就是es6的箭头函数，可以说箭头函数并不适用以上四种规则。
### 软化绑定
上面有硬绑定强制绑定了我们的this值，虽然这样让this指向不至于回退到默认绑定，但是会导致使用起来非常不灵敏，甚至不能用call apply改变指向。我们就想出了另一种方式实现，那就是软化绑定，软化绑定概念很明确，检查当前的this，如果是默认绑定，即全局对象或者undefined的时候将会使用最初默认绑定的对象作为this。
```
if (!Function.prototype.softBind) {
	Function.prototype.softBind = function(obj) {
		var fn = this,
			curried = [].slice.call( arguments, 1 ),
			bound = function bound() {
				return fn.apply(
					(!this ||
						(typeof window !== "undefined" &&
							this === window) ||
						(typeof global !== "undefined" &&
							this === global)
					) ? obj : this,
					curried.concat.apply( curried, arguments )
				);
			};
		bound.prototype = Object.create( fn.prototype );
		return bound;
	};
}
```
```
function foo() {
   console.log("name: " + this.name);
}

var obj = { name: "obj" },
    obj2 = { name: "obj2" },
    obj3 = { name: "obj3" };

var fooOBJ = foo.softBind( obj );

fooOBJ(); // name: obj

obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2   <---- 看!!!

fooOBJ.call( obj3 ); // name: obj3   <---- 看!

setTimeout( obj2.foo, 10 ); // name: obj   <---- 退回到软绑定
```
