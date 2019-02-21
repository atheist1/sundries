# this老弟我来了！
在读完ydkjs小黄书的this部分后得出了一些想法，把他记录下来，痛扁this老弟一顿。
#### 调用点与调用栈
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
#### 四种绑定规则

