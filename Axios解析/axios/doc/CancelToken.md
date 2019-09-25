# 前言
这一节主要介绍的是cancelToken的这个类，这个主要是用作取消发送请求时使用的，因为用的场景不多，导致网上能找到的资料不是特别多。
## 使用方法
### 1.创建一个cancelToken
我们使用API提供的CancelToken.source工厂方法创建一个cancelToken类，像这样。
```javascript
var CancelToken = axios.CancelToken;
var source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // 处理错误
  }
});
// 在source上拿到取消请求的方法。
// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');
```
或者这样，通过传递一个excutor函数到CancelToken的构造函数来创建cancel token。
```javascript
var CancelToken = axios.CancelToken;
var cancel;
axios.get('/a/1234', {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  }),
});
```
以上两种方法最终的原理都一样，拿到cancel方法，并通过cancel方法取消发送。我们接下来研究下CancelToken这个类实现的原理。
## 原理
### 传入函数的方式
```javascript
function CancelToken(executor) {
  // 传入一个函数，确保传入的一定是一个函数类型
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }
  // 新建一个Promise
  var resolvePromise;
  // 这个promise在使用工厂模式创建时也会使用到
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  // 将 token指向当前实例
  var token = this;
  // 执行传入的executor方法
  executor(function cancel(message) {
    // 如果已经被执行过cancel方法，将会给cancel方法赋值reason
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }
    // 没有执行过则会new一个Cancel实例并将message传入
    // 实际上就是返回了一个改写过带reason 的类
    token.reason = new Cancel(message);
    // 当在外界调用这个cancel函数时内部将Promise置为resolve状态
    resolvePromise(token.reason);
  });
}
```
### 直接使用工厂方法
直接使用``CancelToken.source()``的工厂方法也能实现传出一个取消请求的函数，我们探讨一下这个方法的实现原理。
```javascript
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};
```
代码很简单，实际上就是返回了一个CancelToken的实例而已。  
1.  把这个实例上的token传入config上，token是一个CancelToken实例，这个实例上拥有一个Promise对象。  
2.  在http.js里可以看到，在这个Promise里传入了当前的req请求，并在Promise实例被resolve掉的时候会将当前的req abort掉。  
3.  在调用cancel方法时，所有的Promise会被resolve掉，并执行then方法。
4.  req.aborted实现一次取消所有请求。