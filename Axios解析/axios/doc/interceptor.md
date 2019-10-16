# 拦截器的使用与原理
## 拦截器的使用
按照axios文档所说，Axios可以在响应请求和发送请求的时候设置拦截器，在到达用户手上是做一层拦截，例如发送请求(带token,转换数据),响应请求(全局拦截错误处理等))。  
下面是拦截器的使用示例
### 发送请求拦截
```javascript
// request拦截器
axios.interceptors.request.use((config) => {
  const transformData = (data) => {
    let ret = '';
    // eslint-disable-next-line guard-for-in
    for (const it in data) {
      ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;
    }
    return ret.slice(0, -1);
  };
  // 除了get请求和包含文件的请求
  if (config.method !== 'get' && !(config.params instanceof FormData)) {
    config.data = transformData(config.params);
    delete config.params;
  } else {
    config.data = config.params;
  }
  return config;
});
```
在上述的代码中我们可以看到，我对除了get请求和formdata请求的所有请求拦截并使用了transformData方法，将data转换成了我们需要的formdata格式并传给后台
### 响应请求拦截
```javascript
// response拦截器
axios.interceptors.response.use(
  (res) => {
    if (res.data) {
      return res.data;
    }
    return 0;
  },
  (error) => {
    // 404错误不报错
    if (error.response && error.response.status !== 404) {
      // 网络报错
      Message.error({
        message: `网络错误: ${error.message}`,
        showClose: true,
      });
    }
    Promise.reject(error);
  },
);
```
上述代码的处理也很简单，我们对返回的数据进行了处理，如果是成功的请求将会返回res的data，如果是失败的请求，将会判断网络状态并提供报错。
## 实现原理
所有的拦截器，不管是发送请求还是响应请求，都是继承的InterceptorManager这个类。
实现一个拦截器实际上用的是这个类上的use方法，我们来看下use方法主要做了什么。
```javascript
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};
```
向当前实例上的handlers里传入了对象,包含两个value，跟promise对象一致。在后续我们将会用到这个对象。
主要的方法是通过改写InterceptorManager实例上的foreach方法
```javascript
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};
```
调用这个方法时将会递归当前handlers里的所有对象，并执行传入的fn方法,在request请求里是这样做的。
```javascript
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  ...

  ...

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};
```
首先对request里的handlers进行循环，将resolve与reject方法推入chain方法里  
接下来与request一致，将response的方法也逐个推入chain数组里。  
最后循环chain数组，将chain里面的resolve和reject一层层的挂载在Promise上，最后将这个Promise返回出去。
request方法是在所有的put delete post方法时都会调用的函数。主入口。