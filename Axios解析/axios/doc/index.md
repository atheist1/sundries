# Axios源码分析
## 前言
最近发现许久不用Axios，连配置文件都不会了，一个简单的二次封装后的axios上传formData文件耗费了一上午的时间，最后还是在源码里找到了思路。所以从Axios源码入手好好研究Axios。
## 入口
在core/Axios.js下可以找到Axios的类，我们向外导出的就是这个类的实例，所有操作都是在axios实例下运行的。
```javascript
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
```
Axios实例主要做了几件事
1.传入instanceConfig
向内传入实例的配置文件，并将当前实例的默认配置设置为传入的配置。
2.初始化拦截器
将当前实例的拦截器初始化，一个用于发送请求的拦截器``new InterceptorManager``,以及一个用于响应请求的拦截器``new InterceptorManager()``,其实这两个都属于一个类，我们将会在后面详细介绍这个类。

## 出口
在axios.js页面可以看到,我们一般导入的axios实际上是axios调用createInstance方法之后生成的对象。我们来看下这个函数做了什么。
```javascript
/*
* defaultConfig 默认参数
*/
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}
```
createInstance实际上是通过传入的defaultConfig参数new了一个axios实例。  
1. bind方法跟js中的bind功能类似，将context作为上下文传递给Axios.prototype.request,最后返回一个闭包，实现了科里化，外界传入不同的参数去调用request方法，而方法的this指向context实例
2. 通过extend方法，把context作为参数绑定到Axios原型上的方法并赋值给instance实例
3. 通过extend方法，将context上的方法绑定到instance上
## 使用
常见的使用方式有几种
1. axios(config)
  在导出的instance可以看到，axios(config)实际上调用的是绑定在实例上的request方法。所以这个方法最终走的是Axios.prototype.request方法，而这两个方法我们将会在request&response.md中分析。
