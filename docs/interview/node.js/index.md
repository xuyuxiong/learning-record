# nodejs
[node最佳实践](https://github.com/goldbergyoni/nodebestpractices)
## nodejs用过哪些东西

## node的事件循环机制和浏览器的循环机制有什么区别

## AMD、CMD和CommonJS的区别
CMD (Common Module Definition), 是seajs推崇的规范，CMD则是依赖就近，用的时候再require。
AMD和CMD最大的区别是对依赖模块的执行时机处理不同，而不是加载的时机或者方式不同，二者皆为异步加载模块。
AMD依赖前置，js可以方便知道依赖模块是谁，立即加载；而CMD就近依赖，需要使用把模块变为字符串解析一遍才知道依赖了那些模块。
CommonJS 是以在浏览器环境之外构建 JavaScript 生态系统为目标而产生的项目，比如在服务器和桌面环境中，Node.JS遵循CommonJS的规范。
## 服务端推送主要用到什么技术
1. 客户端轮询
2. 服务端主动推送：websocket
3. 服务端主动推送：SSE
## cookie和session的区别
1)cookie数据存放在客户的浏览器上，session数据放在服务器上
(2)cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗,如果主要考虑到安全应当使用session
(3)session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能，如果主要考虑到减轻服务器性能方面，应当使用COOKIE
(4)单个cookie在客户端的限制是3K，就是说一个站点在客户端存放的COOKIE不能3K。
(5)所以：将登陆信息等重要信息存放为SESSION;其他信息如果需要保留，可以放在COOKIE中
## 服务端渲染原理
[服务端渲染原理](https://juejin.cn/post/6844903881390964744)
## nodejs中的异步、非阻塞I/O是如何实现的
[](https://blog.csdn.net/weixin_42098339/article/details/103917928)
## 简单实现node中的回调机制
[](https://blog.csdn.net/weixin_42098339/article/details/103942611)
## egg编写定时任务

## libuv
[Libuv介绍](https://zhuanlan.zhihu.com/p/141649128)
## koa洋葱模型
[](https://blog.csdn.net/php_worker/article/details/107838258)
## 中间件的异常怎么处理

## body-parser中间件了解过吗

## node服务治理
服务治理是微服务中最基础也是最核心的功能。在刚开始构建微服务的时候，服务并不是特别的多，可以通过静态配置方式来完成服务调用。比如A服务调用B服务某个业务，为了保证B服务的可用性，不管采用服务端负载还是客户端的负载，都需要手动维护B服务的实例的清单。随着业务越来越复杂，功能越来越多，我们的静态配置就会变得越来越难，越来越难维护、扩展。所以需要寻求一种机制，让每个服务能动态的创建地址，同时调用方要能获取到这些信息、且感知地址的动态变化。
为了解决微服务维护实例问题，产生了大量的服务治理框架和产品。这些产品与框架的实现都是围绕服务注册与服务发现机制来实现服务治理的。
## nodejs为什么处理异步IO快
Node底层采用线程池的原理管理异步IO，所以我们通常所说的单线程指Node中JavaScript的执行是单线程的，但Node本身是多线程的。Node.js中异步IO是通过事件循环的方式实现的，异步IO事件主要来源于网络请求和文件IO。但是正因为如此，Node.js处理很多计算密集型的任务就比较吃力，当然有多线程方式可以解决这个问题
## Node.js有cluster、fork两种模式多进程，那么这两种情况下，主进程负责TCP通信，怎样才可以让子进程共享用户的socket对象
cluster模式，多实例、自动共享端口链接、自动实现负载均衡。fork模式实现的多进程，单实例、多实例可以通过手动分发socket对象给不同子进程进程定制化处理、实现负载均衡
## Node.js多进程维护，以及通信方式
原生的cluster和fork模式都有API封装好的进行通信。如果是execfile这样的形式调起第三方插件形式，想要与第三方插件进行通信，可以自己封装一个类似promisyfy形式进行通信，维护这块，子进程可以监听异常，一旦发现异常，立刻通知主进程杀死这个异常的子进程，然后重新开启一个子进程
## grpc的优缺点
grpc基于http2 传输效率好
## nodejs如何支持TypeScript语法

## Session、Cookie的区别和联系

## 如何部署Nodejs应用

## GraphQl和Restful的区别，它有什么优点


[常见面试题](https://mp.weixin.qq.com/s/GbcJo3jQRi03EevqJGJHPg)
## 请介绍一下node里的模块是什么
```js
function Module(id, parent) {
  this.id = id;
  this.exports = {}
  this.parent = parent;
  this.filename = null
  this.loaded = false
  this.chilren = []
}
module.exports = Module;
var module = new Module(filename, parent)
```
所有的模块都是Module的实例。当前模块也是Module的实例
## 请介绍一下require的模块加载机制
1. 先计算模块路径
2. 如果模块在缓存里面、取出缓存
3. 加载模块
4. 输入模块的exports属性即可
```js
Module._load = function(request, parent, isMain) {
  var filename = Module._resolveFilename(request, parent)
  var cachedModule = Module._cache[filename]
  if (cacheModule) {
    return cacheModule.exports;
  }
  // 是否为内置模块
  if (NativeModule.exists(filename)) {
    return NativeModule.require(filename)
  }
  // 生成模块实例 存入缓存
  var module = new Module(filename, parent)
  Module._cache[filename] = module;
  // 加载模块
  try {
    module.load(filename)
    hadException = false
  } finally {
    if (hadException) {
      delete Module._cache[filename]
    }
  }
  return module.exports
}
```
## 加载模块时，为什么每个模块都有__dirname, __filename属性呢，new Module的时候我们看到1.1部分没有这两个属性的，那么这两个属性是从哪里来的
```js
// module模块相当于被包装了，包装形式如下
// 加载js模块相当于下面的代码(加载node模块和json模块逻辑不一样)
(functon(exports, require, module, __filename, __dirname) {
  // 假如模块代码如下
  var math = require('math')
  exports.area = function(radius) {
    return Math.PI * radius * radius
  }
})
```
## 我们知道node导出模块有两种方式，一种是exports.xxx = xxx和 Module.exports = {}有什么区别吗
exports 其实就是module.exports
```js
// module.exports vs exports
// 方法一 对module.exports赋值

function hello() {

}
function greet(name) {

}
module.exports = {
  hello: hello,
  greet: greet
}
exports.hello = hello
exports.greet = greet
/**
 * node 加载机制
 * 首先Node会把整个待加载的hello.js文件放入一个包装函数load中执行。在执行这个load函数前，Node准备好了module变量
 */
var module = {
  id: 'hello',
  exports: {}
}
var load = function (exports, module) {
  // hello.js的文件内容
  return module.exports
}
var exports = load(module.exports, module)
// exports变量和module.exports变量实际上同一个变量，并且初始化为空对象{}

// 如果要输出键值对象{}，可以利用exports这个已经存在的空对象{},并继续在上面添加新的键值
// 如果要输出一个函数或数组，必须直接对module.exports对象赋值
// 结论；直接对module.exports赋值可以应对任何情况
```
## 请介绍一下Node事件循环的流程
- 在流程启动时, Node便会创建一个类似于while(true)的循环，每执行一次循环体的过程，我们称为tick
- 每个tick的过程就是查看是否有事件待处理。如果有取出事件及其相关的回调函数。然后进入下一个循环，如果不再有事件处理，就退出进程
## 在每个tick的过程中，如何判断是否有事件需要处理呢
- 每个事件循环中有一个或者多个观察者，而判断是否有事件需要处理的过程就是向这些观察者询问是否有要处理的事件
- 在Node中，事件主要来源于网络请求、文件I/O，这些事件对应的观察者有文件I/O观察者，网络I/O的观察者
- 事件循环是一个典型的生产者/消费者模型。异步I/O网络请求等则是事件的生存者，源源不断为Node提供不同类型的事件，这些事件被传递到对应的观察者那里，事件循环则从观察者那里取出事件并处理
## 请描述一下整个异步I/O的流程
- 异步调用：开始->发起异步调用->封装请求对象->设置参数和回调函数->将请求对象放入线程池等待执行
- 线程池：线程可用->执行请求对象中的I/O对象->将执行完成的结果放入请求对象中->通知IOCP调用完成
- 事件循环：创建主循环->从I/O观察者取到可用的请求对象->取出回调函数和结果调用执行->获取完成的I/O交给I/O观察者
## 如果查看V8的内存使用情况
process.memoryUsage()
## V8的内存限制是什么，为什么V8这样设计
64位系统下是1.4GB，32位系统下是0.7GB。因为1.5GB的垃圾回收堆内存，V8需要花费50毫秒以上，做一次非增量式的垃圾回收要1秒以上，这样的花销下，应用的性能和影响力都会直线下降
## V8的内存分代和回收算法请简单讲一讲

## 标记清除算法的问题
每一次进行标记清除回收后，内存空间会出现不连续的状态
- 当需要分配一个大对象的时候，所有的碎片空间无法完成此次分配就会提前触发垃圾回收
- 为了解决碎片问题，标记整理被提出来，在整理的过程中将活着的对象往一端移动，移动完成后，直接清理掉边界外的内存
## 哪些情况会造成V8无法立即回收内存
闭包和全局变量
## 内存泄漏是什么，以及常见内存泄漏的原因和排查的方法 
内存泄漏指由于疏忽或错误造成程序未能释放已经不再使用的内存
严重的情况下导致内存达到某个极限会使得应用程序崩溃。
排查方法分为两种情况：
1. 对于正常使用就可以重现的内存泄漏只要在测试环境模拟就可以排查了
2. 对于偶然的内存泄漏，推荐去生产环境打印内存快照，由于打印内存快照很耗CPU，可能会对线上业务造成影响，推荐使用heapdump用来保存内存快照，使用devtool来查看内存快照。
## 新建Buffer会占用V8分配的内存吗
Buffer属于堆外内存，不是V8分配的
## Buffer.alloc和Buffer.allocUnsafe的区别
Buffer.allocUnsafe创建的Buffer实例的底层内存是未初始化的。新创建的Bufer的内容是未知的，可能包含敏感数据
## Buffer的内存分配机制
为了高效的使用申请来的内存，Node采用了slab分配机制。slab是一种动态的内存管理机制。Node以8kb为界限区分Buffer为大对象还是小对象，如果是小于8kb就是小Buffer，大于8kb就是大Buffer。例如第一次分配一个 1024 字节的 Buffer，Buffer.alloc(1024),那么这次分配就会用到一个 slab，接着如果继续 Buffer.alloc(1024),那么上一次用的 slab 的空间还没有用完，因为总共是 8kb，1024+1024 = 2048 个字节，没有 8kb，所以就继续用这个 slab 给 Buffer 分配空间
## Buffer乱码问题
```js
const rs = require('fs').createReadStream('test.md', {highWaterMark: 11})
// 一般情况下只需要设置rs.setEncodeing('utf8')即可解决乱码问题
```
## webSocket与传统的http有什么优势
- 客户端与服务器只需要一个TCP连接，比HTTP长轮询使用更少的连接
- webSocket服务端可以推送数据到客户端
- 更轻量的协议头，减少数据传输量
## webSocket协议升级是什么，能简述一下吗
webSocket协议和普通的HTTP请求有几点不同：
- 协议是ws://开头的地址
- 请求头Upgrade:websocket和Connection：Upgrade表示这个连接将要被转换为WebSocket连接
- Sec-WebSocket-Key 是用于标识这个连接，并非用于加密数据
- Sec-WebScoket-Version指定了WebScoket的协议版本
- 如果服务器接受该请求就会返回101，表示本次连接的HTTP协议即将被更改
## https用哪些端口进行通信，这些端口分别有什么用
- 443端口用来验证服务器端和客户端的身份，比如验证证书的合法性
- 80端口用来传输数据
## 身份验证的过程中会涉及到密钥，对称加密，非对称加密，摘要的概念请解释一下

## 为什么需要CA机构对证书签名

## https验证身份也就是TSL/SSL身份验证的过程

## 请简述一下node的多进程架构
面对node单线程多核CPU使用不足的情况，Node提供了child_process模块，来实现进程的复制，node的多进程架构是主从模式
```js
var fork = require('child_process').fork
var cpus = require('os').cpus()
for(var i = 0; i < cpus.length; i++) {
  fork("./worker.js")
}
```
## 请问创建子进程的方法有哪些，简单说一下它们的区别
- spawn()：启动一个子进程来执行命令
- exec()：启动一个子进程来执行命令，与spawn()不同的是其接口不同，它有一个回调函数获知子进程的状况
- execFile()：启动一个子进程来执行可执行文件
- fork()：与spawn()类似，不同在于它创建的Node子进程需要执行js文件
- spawn()与exec()、execFile()不同的是，后两者创建时可以指定timeout属性设置超时时间，一旦创建的进程超过设定的时间就会被杀死
- exec()与execFile()不同的是，exec()适合执行已有命令，execFile()适合执行文件
## 请问你知道spawn在创建子进程的时候，第三个参数有一个stdio选项，这个选项的作用是什么，默认的值是什么
- 选项用于配置在父进程和子进程之间建立的管道
- 默认情况下，子进程的stdin、stdout和stderr会被重定向到ChildProcess对象上相应的subprocess.stdin、subprocess.stdout和subprocess.stderr流
- 这相当于将options.stdio设置为['pipe', 'pipe', 'pipe']
## 请问实现一个node子进程被杀死，然后自动重启代码的思路
```js
// 在创建子进程的时候就让子进程监听exit事件，如果被杀死就重新fork一下
var createWorker = function() {
  var worker = fork(__dirname + 'worker.js')
  worker.on('exit', function() {
    console.log('Worker' + worker.id + 'exited')
    createWorker()
  })
}
```
## 实现限量重启，比如我最多让其在一分钟内重启5次，超过了就报警给运维
- 思路大概是在创建worker的时候，就判断创建的这个worker是否在1分钟内重启次数超过5次
- 所以每一次创建worker的时候都要记录这个worker创建时间，放入一个数组队列里面，每次创建worker都去取队列里前5条记录
- 如果这5条记录的时间间隔小于1分钟，就说明到了报警的时间
## 如何实现进程间的状态共享，或者数据共享
kafka这类消息队列工具
## 如果使用过koa、egg这两个Node框架，请简述其中的中间件原理，最好用代码表示一下
- 最早的use中间件就放在最外层，处理顺序从左到右，左边接收一个request，右边输出返回response
- 一般的中间件都会执行两次，调用next之前为第一次，调用next时把控制传递给下游的下一个中间件。当下游不再有中间件或者没有执行next函数时，就将依次恢复上游中间件的行为，让上游中间件执行next之后的代码
```js
const Koa = require('koa')
const app = new Koa()
app.use((ctx, next) => {
  console.log(1)
  next()
  console.log(3)
})
app.use(ctx => {
  console.log(2)
})
app.listen(3000)
// 中间件的实现源码大致思路如下
// 其中的compose函数是实现中间件洋葱模型的关键
// 异步promise模拟
const delay = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
// 中间件模拟
const fn1 = async(ctx, next) => {
  console.log(1)
  await next()
  console.log(2)
}
const fn2 = async(ctx, next) => {
  console.log(3)
  await delay()
  await next()
  console.log(4)
}
const fn3 = async(ctx, next) => {
  console.log(5)
}
const middlewares = [fn1, fn2, fn3]
// compose实现洋葱模型
const compose = (middlewares, ctx) => {
  const dispatch = (i) => {
    let fn = middlewares[i]
    if (!fn) return Promise.resolve()
    return Promise.resolve(fn(ctx, () => {
      return dispatch(i + 1)
    }))
  }
  return dispatch(0)
}
compose(middlewares, 1)
```
## 杂想
- crypto模块，可以考察基础的加密学知识，比如摘要算法有哪些(md5,sha1, sha256, 加盐的md5,sha256)，接着可以问如何用md5自己模拟一个加盐的md5算法，接着可以问加密算法中aes、eds算法的区别，分组加密模式有哪些，node里的分组加密模式是哪种，这些加密算法里的填充和向量是什么意思，接着可以问数字签名的https的流程
- tcp/ip，可以问很多基础问题，比如链路层通过什么协议根据 IP 地址获取物理地址（arp），网关是什么，ip 里的 ICMP 协议有什么用，tcp 的三次握手，四次分手的过程是什么，tcp 如何控制重发，网络堵塞 TCP 会怎么办等等，udp 和 tcp 的区别，udp 里的广播和组播是什么，组播在 node 里通过什么模块实现。
- os，操作系统相关基础，io 的流程是什么（从硬盘里读取数据到内核的内存中，然后内核的内存将数据传入到调用 io 的应用程序的进程内存中），冯诺依曼体系是什么，进程和线程的区别等等（我最近在看马哥 linux 教程，因为自己不是科班出身，听了很多基础的计算机知识，受益匪浅，建议去 bilibili 看）
- linux 相关操作知识（node 涉及到后台，虽然是做中台，不涉及数据库，但是基本的 linux 操作还是要会的）
node 性能监控（自己也正在学习中）
- 测试，因为用的 egg 框架，有很完善的学习单元测试的文档，省略这部分
数据库可以问一些比如事务的等级有哪些，mysql 默认的事务等级是什么，会产生什么问题，然后考一些 mysql 查询的笔试题。。。和常用优化技巧，node 的 mysql 的 orm 工具使用过没有