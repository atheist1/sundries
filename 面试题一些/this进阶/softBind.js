if (!Function.prototype.softBind) {
  Function.prototype.softBind = function(obj) {
    // this是当前的fn
    let args = Array.prototype.slice.call(arguments, 1)
    let fn = this
    var bound = function() {
      return fn.apply(
        (!this ||
          (typeof window !== 'undefined' && this === window) ||
          (typeof global !== 'undefined' && this === global)
        ) ? obj : this, args)
    }
    bound.prototype = Object.create(fn.prototype)
    return bound
  }
}

function foo() {
  console.log("name: " + this.name);
}

var obj = { name: "obj" },
  obj2 = { name: "obj2" },
  obj3 = { name: "obj3" };

var fooOBJ = foo.softBind(obj);

fooOBJ(); // name: obj

obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2   <---- 看!!!

fooOBJ.call(obj3); // name: obj3   <---- 看!

setTimeout(obj2.foo, 10); // name: obj   <---- 退回到软绑定