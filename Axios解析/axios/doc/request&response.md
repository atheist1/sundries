# 前言
这里主要是是对Axios最终调用并发送请求响应请求的分析。
## request
当在外调用axios(config)或者axios(url, [config])时,将会运行到这个方法中来。
```javascript
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  // 如果第一个参数是url，将会走到这里来
  if (typeof config === 'string') {
    // 默认第一个参数为url,默认config为第二个参数
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }
  // 将Axios.default.xxx中的参数与传入的参数进行合并。
  config = mergeConfig(this.defaults, config);
  // 获取传入的方法
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  // 挂载中间件
  // chain初始化为一个对象[一个Fullfiled状态的promise, undefined]
  var chain = [dispatchRequest, undefined];
  // 首先生成一个Promise为then状态的Promise对象最后返回出去的对象就是这个Promise
  var promise = Promise.resolve(config);


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
进入代码我们可以看到这个函数做了以下几个事.
1. 合并config与defalut参数
2. 挂载中间件到实例上，并推入chain中[Fullfilled, Reject];
3. 根据chain的长度。推入promise中，并挂载中间件的fullfilled和reject方法，也就是说，中间件实际上有两个参数，每个参数的类型都为函数类型。
4. 返回这个Promise对象，也就是axios(config)返回的对象。
我们可以看到，chain里推入了一个默认的fullfilled也就是dispatchRequest,这个方法也就是默认发送请求的方法。
```javascript
function dispatchRequest(config) {
  // axios提供一个配置,叫做cancelToken，这个配置返回了一个函数，这个函数可以用来取消当前请求。而这个函数我们在后面分析Cancel类时进行分析。
  throwIfCancellationRequested(config);
  // 如果传入的路径不是一个绝对路径的话，将会将baseUrl与url拼接
  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }
  // 确保请求头的存在
  // Ensure headers exist
  config.headers = config.headers || {};

  // 使用transform
  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // 合并header
  // merge方法将所有对象下的对象的属性全部平整到最后header对象上
  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  // 删除header上的method
  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );
  // 适配器。根据Node或者浏览器不同环境区分发送请求的方式
  // 我们可以通过适配器发送不同的请求 比如 Mock.js
  // 适配器最后其实返回的就是不同的请求实例 http(node)或者xhr(browser)，返回的是一个promise实例，当请求成功或者失败则会被
  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};
```