# mergeOptions(合并对象)

#### 作用
`mergeOptions`是Vue最开始调用的函数之一，主要作用是检查父子组件option数据(包括`props,inject,directive`)等的合法性，并将其合并最终返回。  
主要作用点在于开始的Vue实例合并以及Vue组件之间的合并。
