# mergeOptions(合并对象)

#### 作用
`mergeOptions`是Vue最开始调用的函数之一，主要作用是递归检查父子组件option数据(包括`props,inject,directive`)等的合法性，并将其合并最终返回。  
主要作用点在于开始的Vue实例合并以及Vue组件之间的合并。

#### 检查数据类型与规整
``` javascript
{// 检查是否是合法的组件名
  checkComponents(child);
}

if (typeof child === 'function') {
  child = child.options;
}
// 检查prop输入格式是否合法，并且把名字驼峰化
normalizeProps(child, vm);
// 检查inject输入格式是否合法，并且把名字驼峰化
normalizeInject(child, vm);
// 把function类型的directive绑定到vm.directive上
normalizeDirectives(child);
```
一. normalizeProps  
平整化props主要是分两步
1. 数组类型props  
示例 -> ['a','b','c'] 规定每一项必须是字符串对象，并且利用camelize方法将连接式改成驼峰式(aa-bb-cc -> aaBbCc)  
``str.replace(/-(\w)/g, function (_, c) { return c ? c.toUpperCase() : ''; })``  
最终将数组中的字符串绑定到res对象上，并将type默认置为null
2. 对象类型props  
示例 -> 
props: {
 a: {
   type:String
 },
 b: [Number,String]
}  
最终全部绑定到res上
```javascript
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    // [a,b,c,d,e]
    // 使用这种形式的props里面必须是string
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        // aaaa-bbb-ccc -> aaaaBbbCcc
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    /**
     * props: {
     *    a: {
     *      type:String
     *    },
     *    b: [Number,String]
     * }
     */
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}
```
二. normalizeInject  
``normalizeInject``与上述类似，也是分为对象和数组两个部分进行平整  
也就是将['a','b'] 或者别名a``{ a: 'foo'}``转换成  ``{from: 'a'}``的形式  
三. normalizeDirectives  
``normalizeDirectives``主要是为了处理文档所说的这种情况[(bind 和 update 时触发相同行为)](https://cn.vuejs.org/v2/guide/custom-directive.html)，对options上的directive进行了函数的绑定

#### 递归合并父子对象
1. 递归合并extend(单继承)
2. 递归合并mixins(多继承)
当extend和mixin合并完成以后，递归到达最底层实例，对底层实例进行option上每一个数据的合并，对不同的数据使用不同合并策略
ps: mixin会覆盖extend上的属性
#### mergeField(合并策略与合并数据)
```javascript
// 将父子的option组合到options
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    // 在子组件上的只有父组件不存在时才会被合并
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
 // 所以子实例会覆盖父实例上的属性
 function mergeField (key) {
    // strats不同类型合并策略不同
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
```
1. props && el  
合并el和props采用的是default策略,即子级会覆盖父级
```javascript
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};
```
2. data  
合并data采用的是`mergeDataOrFn`函数
``` javascript
function mergeDataOrFn (parentVal,childVal,vm) { // 只有在new一个vue实例的时候才会存在vm属性
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    // 省略步骤1 不存在父级直接返回子级，不存在子级直接返回父级对象
    // 这里不需要判断两个值是不是function类型，因为不是function类型上一步调用就已经把他排除了
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}
```
mergeData函数,这里的data实际上是extend中和mixin中的data以及其他需要合并的data  
跟父子组件之间的data并没有关系
```javascript
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    // 如果父级存在一样的data则保留父级的
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}
```
3.  component,directive,filter  
合并component，directive，filter采用的是`mergeAssets`的方式（组件指令过滤器）
``` javascript
function mergeAssets(
    parentVal,
    childVal,
    vm,
    key
  ) {
  // 创建一个parent的副本
    var res = Object.create(parentVal || null);
    if (childVal) {
      "development" !== 'production' && assertObjectType(key, childVal, vm);
      // 将子级的属性浅复制到父级上，同名会被覆盖，子级覆盖父级的
      return extend(res, childVal)
    } else {
      return res
    }
  }
  4. mergeHooks  
  生命周期函数的处理是连接合并， 而不是覆盖，最终返回的是一个数组，也证明了生命周期里是可以传入数组的
  ```javascript
  function mergeHook(
    parentVal,
    childVal
  ) {
    return childVal ?
      parentVal ?
      parentVal.concat(childVal) :
      Array.isArray(childVal) ?
      childVal : [childVal] :
      parentVal
  }

  LIFECYCLE_HOOKS.forEach(function(hook) {
    strats[hook] = mergeHook;
  });
  ```
```
5. watch  
对于watch的处理与hooks是类似的，因为需要监听每一个watch的变化，所有存在的watch都会被推入数组中去，最后返回的就是这个数组
```javascript
  strats.watch = function(
    parentVal,
    childVal,
    vm,
    key
  ) {
    // work around Firefox's Object.prototype.watch...
    // 火狐浏览器对象的原型链上存在一个watch属性，请注意
    // 父节点不存在返回子，子节点不存在返回父，父子都存在用浅复制，因为watch不存在深复制的可能
    if (parentVal === nativeWatch) { parentVal = undefined; }
    if (childVal === nativeWatch) { childVal = undefined; }
    /* istanbul ignore if */
    if (!childVal) { return Object.create(parentVal || null) } {
      assertObjectType(key, childVal, vm);
    }
    if (!parentVal) { return childVal }
    var ret = {};
    extend(ret, parentVal);
    for (var key$1 in childVal) {
      var parent = ret[key$1];
      var child = childVal[key$1];
      // parent数组化
      if (parent && !Array.isArray(parent)) {
        parent = [parent];
      }
      // 把watch推入ret对象中
      ret[key$1] = parent ?
        parent.concat(child) :
        Array.isArray(child) ? child : [child];
    }
    return ret
  };
```
6. props methos inject computed  
这四个与match类似，没有父级返回子级没有子级返回父级，但是不同的是watch返回的是一个数组，而这里返回的是一个对象
```javascript
trats.props =
strats.methods =
strats.inject =
strats.computed = function(
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
```
7. provide  
`strats.provide = mergeDataOrFn;` ??
