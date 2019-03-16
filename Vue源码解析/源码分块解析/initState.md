#initState
这一篇主要是介绍initState的操作，这里主要是按顺序依次执行初始化props,methods,data,computed,watch的操作
## 主入口
```javascript
function initState(vm) {
  // 初始化watcher
  vm._watchers = [];
  var opts = vm.$options;
  // 如果有prop，初始化prop
  if (opts.props) { initProps(vm, opts.props); }
  // 如果有方法，初始化方法
  if (opts.methods) { initMethods(vm, opts.methods); }
  // 初始化数据111
  if (opts.data) {


    initData(vm);
  } else {
    // 没有数据，观察一个空对象
    observe(vm._data = {}, true /* asRootData */ );
  }
  // 初始化计算属性
  if (opts.computed) { initComputed(vm, opts.computed); }
  // 初始化watch
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
```
## initProps
初始化props函数,第一步处理$options上的propsdata实际上只在某些特殊情况才会出现，比如Vue.$extend得时候
```javascript
function initProps(vm, propsOptions) {
    var propsData = vm.$options.propsData || {};
    // propsData用的不多，主要是内部使用
    // 外部使用在于，当用extend创建了一个全局扩展时
    /**
     * var header = Vue.extend({
     *  // 一些配置
     *  props: ['a']
     * })
     * new header({propsData: {a: 1}}).$mount('#app')
     * propsData在这里使用
     */
    var props = vm._props = {};
    // cache prop keys so that future props updates can iterate using Array
    // instead of dynamic object key enumeration.
    var keys = vm.$options._propKeys = [];
    var isRoot = !vm.$parent;
    // root instance props should be converted
    // 根组件上的prop需要被转换
    if (!isRoot) {
      toggleObserving(false);
    }
    var loop = function(key) {
      keys.push(key);
      // 将prop的数据进行转换，如果不存在则用默认值代替，如果为bool则用true或者false代替，如果拥有值则将对props的副本进行observe
      // propOptions prop验证！ https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81
      var value = validateProp(key, propsOptions, propsData, vm);
      /* istanbul ignore else */
      {
        // 转换驼峰命名
        var hyphenatedKey = hyphenate(key);
        // 检测是否为原生数据类型
        if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
          warn(
            ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
            vm
          );
        }
        // 默认值被填充到value
        defineReactive(props, key, value, function() {
          // 观察当前的props所对应的key，当当前prop[key]不是由父级传递而是由子级直接修改时提示错误
          // 当调用updateChild的时候将会把这个置为true
          // 如果不是在updatechild的时候更新的props证明
          if (vm.$parent && !isUpdatingChildComponent) {
            warn(
              "Avoid mutating a prop directly since the value will be " +
              "overwritten whenever the parent component re-renders. " +
              "Instead, use a data or computed property based on the prop's " +
              "value. Prop being mutated: \"" + key + "\"",
              vm
            );
          }
        });
      }
      // static props are already proxied on the component's prototype
      // during Vue.extend(). We only need to proxy props defined at
      // instantiation here.
      if (!(key in vm)) {
        // 代理_props里面的get，set
        proxy(vm, "_props", key);
      }
    };

    for (var key in propsOptions) loop(key);
    toggleObserving(true);
  }
```
实际上`initprops`函数内主要的方法还是对挂载在data上的props属性进行了`loop`函数的调用。而loop函数实际上是对props的验证与响应式绑定。loop函数内主要做了以下几个步骤。  
1. validateProp  
validateProp函数将会设置prop上的默认值，如果存在默认值则将其设置为响应式数据并绑定，如果不存在默认值则根据数据类型设置一个默认值。
2. hyphenate(key)  
将props上的key转换成驼峰命名
3. defineReactive  
为每一个props对应的key进行监听，如果存在直接修改props的动作则报错提示，禁止直接修改props
4. proxy(vm, "_props", key)  
如果当前实例上_props属性不存在这个key时代理key到实例上
## initMethods
initMethods方法很简单，判断三次  
1. 是否为空值
2. 是否在props上存在同名
3. 是否已定义  
如果三次判断都为假，把他绑定到实例上
```javascript
 function initMethods(vm, methods) {
    var props = vm.$options.props;
    for (var key in methods) {
      {
        if (methods[key] == null) {
          warn(
            "Method \"" + key + "\" has an undefined value in the component definition. " +
            "Did you reference the function correctly?",
            vm
          );
        }
        if (props && hasOwn(props, key)) {
          warn(
            ("Method \"" + key + "\" has already been defined as a prop."),
            vm
          );
        }
        if ((key in vm) && isReserved(key)) {
          warn(
            "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
            "Avoid defining component methods that start with _ or $."
          );
        }
      }
      vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    }
  }
```
## initData
initData主要是做了以下几个操作
```javascript
function initData(vm) {
  var data = vm.$options.data;
  // 函数执行函数，数组直接返回数组，否则默认值为{}
  data = vm._data = typeof data === 'function' ?
    getData(data, vm) :
    data || {};
  // 执行function后返回的不是一个对象，提示错误
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  // 权重顺序 prop method data
  while (i--) {
    var key = keys[i]; {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      // 代理，拦截
      proxy(vm, "_data", key);
    }
  }
  // observe data
  // 观察
  observe(data, true /* asRootData */ );
}
```
1. 转换数据  
对实例上的data进行处理，如果是函数形式则调用`getData`方法，将函数形式的data转换成对象并返回(这里有一个处理，当调用getData时将会调用`pushTarget`方法，这是为了防止当调用vm的data方法时触发了依赖收集)，如果函数返回的不是一个对象将会报错提醒，但是还是会往下执行。
2. 判断重复  
如果出现method或者props中出现重复命名将会提示错误(这里对key的处理是倒序的，也即是后定义的data会先处理)
3. 代理data  
当data中属性不是以<b>_</b>或者<b>$</b>形式出现的时候将会把当前属性代理到实例的_data上
4. 观察监听  
循环结束以后将会观察data属性，提供响应式处理
ps:如果不存在一个data的时候将会在主入口上观察一个空对象。
