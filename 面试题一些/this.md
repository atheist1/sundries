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
