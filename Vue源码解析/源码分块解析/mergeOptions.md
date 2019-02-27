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

