# mergeOptions(合并对象)

#### 作用
`mergeOptions`是Vue最开始调用的函数之一，主要作用是递归检查父子组件option数据(包括`props,inject,directive`)等的合法性，并将其合并最终返回。  
主要作用点在于开始的Vue实例合并以及Vue组件之间的合并。

#### 解析
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
##### normalizeProps
平整化props主要是分两步
1. 数组类型props  
示例 -> ['a','b','c'] 规定每一项必须是字符串对象，并且利用camelize方法将连接式改成驼峰式  
aa-bb-cc -> aaBbCc 利用的是str的replace方法  
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
