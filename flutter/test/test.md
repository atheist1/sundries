# 前言
flutter像其他语言一样，自己拥有着测试工具，flutter是集成在项目下的flutter_test包。  
flutter主要分为三个自动化测试。
1. 单元测试
   主要是测试一些单一功能，方法与类，单元测试一般不会用到外部数据储存或者磁盘读写，渲染屏幕，不会需要响应用户的输入或者输出，如果需要外部依赖性一般采用mock的方式实现。单元测试主要是验证逻辑单元的正确性。
2. widget测试
   widget测试在其他ui框架又叫做组件测试，他的功能比单元测试更强大，他能接收响应用户的操作与时间，小部件测试的目的是保证组件的ui与预期存在一样的外观与交互。
3. 集成测试
   集成测试是测试整个应用程序的一种方式，通常可以在真实设备或者模拟机上运行，测试的目标是为了保证整体系统完整。
## 基本api
### tester
tester用于实现模拟用于的操作与输入。
### find
find用于查找组件，通常有
1. `find.byWidget` 
2. `find.byType` 
3. `find.text`
4. `find.widgetWithText` 
5. `find.widgetWithIcon`
6. `find.descendant`(通过子类查找)
   这个查找拥有多个参数,of,match 找到of参数的后代的match节点，of是更高的类
### excpet
断言语句 用于判断是否正确，不正确将会被提示错误。
### tester group
这些都是执行的入口，如果类型一致的测试可以在group里运行。  
tester.runasync用作等待未来执行
1. pump pumpAndSettle
这两个函数是为了保证在测试里，用户改变界面状态后，widget能重绘.  
pumpAndSettle让界面一直渲染直到最后一帧刷新,这个其实就是在duration的时间里无限的调用pump函数，也就是说pumpAndSettle会至少调用一次pump。如果没有传入duration，默认时间是100ms

