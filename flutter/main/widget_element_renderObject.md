# 关系
flutter的界面核心由widget、element、renderobjcet组成。  
## widget
widget是配置单，一个widget可以对应多个element
## element
element是实例，持有widget和renderobject，他表示着组件的大小、位置等信息。  
最终的ui树是由element组成的。element是ui树在具体位置的一个实例化对象。  
Element类实际上是BuildContext接口的实现类。即BuildContext context指向的就是element
## renderobject
renderobject是最终渲染成ui的样子

## 更新过程
1. element的父widget的配置发生变化
2. 尝试使用相同位置的element
3. 调用canupdate方法(比较new widget和old widget 的runtimetype是否相同 ps:statelesswidget如果存在静态变量不同也是不同。且新旧widget的key是否相同)
4. 如果canupdate为true，则直接利用新的widget作为配置，更新element、否则直接替换整个element
5. 这里就是注意点了，因为state是在element上的，如果仅仅只是更新element可能导致state没有没更新，所以当我们需要强制更新一个widget时、我们可以指定新旧组件为不同的key来禁止复用。

`A StatelessWidget will never rebuild by itself (but can from external events). A StatefulWidget can. That is the golden rule.`