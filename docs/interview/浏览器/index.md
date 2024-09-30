# 浏览器
## 进程和线程的区别
进程是操作系统资源分配的基本单位，而线程是处理器任务调度和执行的基本单位
进程 : 进程是操作系统资源分配的基本单位，进程中包含线程。简而言之，就是正在进行中的应用程序。
线程：线程是由进程所管理的。是进程内的一个独立执行的单位，是CPU调度的最小单位。
## 浏览器渲染进程的线程有哪些
- GUI线程：主要负责解析HTML、CSS和构建 DOM 树和 RenderObject树,布局和绘制等，重绘和回流被触发时就会执行该线程。 
- JS引擎线程：负责解析和执行JS代码
- 事件线程：控制事件循环，比如当JS引擎执行到setTimeOut时（也可来自浏览器内核的其他线程,如鼠标点击、AJAX异步请求等），会将对应的任务添加到事件线程中
- 定时器线程：浏览器通过定时器线程来创建一个定时器，完成计时操作（如果放到JS引擎线程，可能会由于阻塞导致计时不准确），计时完毕后，会将任务添加到事件队列，等JS引擎空闲后执行，setInterval与setTimeout所在的线程
- 异步请求线程：在XMLHttpRequest连接后浏览器会创建一个异步请求线程来检测请求的状态变更，如果设置有回调函数，异步线程就产生状态变更事件放到JS引擎的处理队列中等待处理
## 创建进程
Node有4种创建进程的方式: spawn() exec() execFile() fork()
- spawn()
```js
const { spawn } = require('child_process')
const child = spawn('pwd')
// 带参数的形式
const child = spawn('find', ['.', '-type', 'f'])

child.stdout.on('data', data => {
  console.log(`child stdout: \n ${data}`)
})
child.stderr.on('data', data => {
  console.log(`child stderr: \n${data}`)
})
```
spawn()返回childProcess实例，childProcess同样基于事件机制提供了一些事件
exit: 子进程退出时触发，可以得知进程退出状态
disconnect; 父进程调用child.disconnect()时触发
error: 子进程创建失败，或被kill时触发
close: 子进程的stdio流关闭时触发
message: 子进程通过process.send() 发送消息时触发，父子进程之间可以通过这种内置的消息机制通信
```js
// 利用进程stdio流的管道特性，就可以完成更复杂的事情
const { spawn } = require('child_process')
const find = spawn('find', ['.', '-type', 'f'])
const wc = spawn('wc', ['-1'])
find.stdout.pipe(wc.stdin)
wc.stdout.on('data', data => {
  console.log(`Number of files ${data}`)
})
// 作用等价于find -type f | wc -1 递归统计当前目录文件数量
```
- exec()
spawn()方法默认不会创建shell去执行传入的命令(性能稍微好些)而exec()会创建一个shell
exec() 不是基于stream的，而是把传入命令的执行结果暂存到buffer种，再整个传递给回调函数
exec()方法的特点是完全支持shell语法
```js
const {exec} = require('child_process')
exec('find .type f | wc -1', (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`)
    return
  }
  console.log(`Number of files ${stdout}`)
})
```
但exec()方法因此存在命令注入的安全风险，在含有用户输入等动态内容的场景要特别注意。所以exec()方法适用场景是希望直接使用shell语法，并且预期输出数据量不大
```js
// 两全其美的方式
const {spawn} = require('child_process')
const child = spawn('find . -type f | wc -1', {
  shell: true
})
child.stdout.pipe(process.stdout)
```
- execFile
```js
const {execFile} = require('child_process')
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) throw error;
  console.log(stdout)
})
// 与 exec() 方法类似，但不通过shell来执行（所以性能稍好一点），所以要求传入 可执行文件 
```
- fork
fork()是spawn()的变体，用来创建Node进程，最大的特点是父子进程自带通信机制
```js
var n = child_process.fork('./child.js')
n.on('message', function(m) {
  console.log('parent got message', m)
})
n.send({hello: 'world'})
process.on('message', function(m) {
  console.log('child got message', m)
})
process.send({foo: 'bar'})
```
因为fork()自带通信机制的优势，使用用来拆分耗时逻辑
```js
const http = require('http')
const longComputation = () => {
  let sum = 0;
  for(let i = 0; i < 1e9; i++) {
    sum += i;
  }
  return sum
}
const server = http.createServer()
server.on('request', (req, res) => {
  if (req.url === '/compute') {
    const sum = longCompututation()
    return res.end(`Sum is ${sum}`)
  } else {
    res.end('ok')
  }
})
server.listen(3000)
// 为了避免耗时操作阻塞主进程的事件循环，可以把longComputation()拆分到子进程中
// compute.js
const longComputation = () => {}
process.on('message', msg => {
  const num = longComputation()
  process.send(sum)
})
// 主进程开启子进程执行longComputation
const http = require('http')
const {fork} = require('child_process')
const server = http.createServer()
server.on('request', (req, res) => {
  if (req.url === '/compute') {
    const compute = fork('compute.js')
    compute.send('message', sum => {
      res.end(`sum is ${sum}`)
    })
  } else {
    res.end('ok')
  }
})
server.listen(3000)
```
## 进程之间的通信方式
- 使用内置IPC通道
如果是跟自己创建的子进程通信，是非常方便的,child_process模块中的fork方法自带通信机制，无需关注底层细节
```js
// 父进程parent.js代码
const fork = require('child_process').fork
const path = require('path')
const child = fork(path.resolve('child.js'), [], {stdio: 'inherit'})
child.on('message', message => {
  console.log('message from child', message)
  child.send('hi')
})
// 子进程child.js代码
process.on('message', message => {
  console.log('message from parent: ', message)
})
if (process.send) {
  setInterval(() => process.send('hello'), 3000)
}
```
- 使用自定义管道
如果是两个独立的Node.js进程，如何建立通信通道呢？在windows上可以使用命名管道，在unix上可以使用unix domain socket，也是一个作为server，另一个作为client，其中server.js代码如下
```js
// server.js
const net = require('net')
const fs = require('fs')

const pipeFile = process.platform === 'win32' ? '\\\\.\\pipe\\mypip' : '/tmp/unix.sock'
const server = net.createServer(connection => {
  console.log('socket connected')
  connection.on('close', () => console.log('disconnected'))
  connection.on('data', data=> {
    console.log(`receive: ${data}`)
    connection.write(data)
    console.log(`send: ${data}`)
  })
  connection.on('error', err => console.error(err.message))
})
try {
  fs.unlinkSync(pipeFile)
} catch(error) {}
server.listen(pipeFile)
//client.js
const net = require('net')
const pipeFile = process.platform === 'win32' ? '\\\\.\\pipe\\mypip' : '/tmp/unix.sock'
const client = net.connect(pipeFile)
client.on('connect', () => console.log('connected'))
client.on('data', data => console.log(`receive: ${data}`))
client.on('end', () => console.log('disconnected'))
client.on('error', err => console.error(err.message))
setInterval(() => {
  const msg = 'hello'
  console.log(`send: ${msg}`)
  client.write(msg)
}, 3000)
// 运行效果
// $ node server.js 
// socket connected.
// receive: hello
// send: hello

// $ node client.js
// connected.
// send: hello
// receive: hello
```
- 通过stdin/stdout传递json
```js
const {spawn} = require('child_process')
child = spawn('node', ['./stdio-child.js'])
child.stdout.setEncoding('utf8')
// 父进程-发
child.stdin.write(JSON.stringify({
  type: 'handshake',
  payload: '你好呀'
}))
// 父进程-收
child.stdout.on('data', function(chunk) {
  let data = chunk.toString()
  let message = JSON.parse(data)
  console.log(`${message.type} ${message.payload}`)
})
// 子进程与之类似 ./stdio-child.js
process.stdin.on('data', chunk => {
  let data = chunk.toString()
  let message = JSON.parse(data)
  switch(message.type) {
    case 'handshake':
      process.stdout.write(JSON.stringify({
        type: 'message',
        payload: message.payload + ': hoho'
      }))
      break
    default: 
      break;
  }
})
```
- sockets
借助网络来完成进程间的通信，不仅能跨进程还能跨机器
node-ipc就采用这种方案
```js
// server
const ipc=require('../../../node-ipc');
ipc.config.id = 'world';
ipc.config.retry= 1500;
ipc.config.maxConnections=1;
ipc.serveNet(
  function(){
    ipc.server.on(
      'message',
      function(data,socket){
        ipc.log('got a message : ', data);
        ipc.server.emit(
          socket,
          'message',
          data+' world!'
        );
      }
    );
    ipc.server.on(
      'socket.disconnected',
      function(data,socket){
        console.log('DISCONNECTED\n\n',arguments);
      }
    );
  }
);
ipc.server.on(
  'error',
  function(err){
    ipc.log('Got an ERROR!',err);
  }
);
ipc.server.start();
// client
const ipc=require('node-ipc');
ipc.config.id = 'hello';
ipc.config.retry= 1500;
ipc.connectToNet(
    'world',
    function(){
        ipc.of.world.on(
          'connect',
          function(){
            ipc.log('## connected to world ##', ipc.config.delay);
            ipc.of.world.emit(
              'message',
              'hello'
            );
          }
        );
        ipc.of.world.on(
            'disconnect',
            function(){
                ipc.log('disconnected from world');
            }
        );
        ipc.of.world.on(
            'message',
            function(data){
                ipc.log('got a message from world : ', data);
            }
        );
    }
);
```
- message queue
父子进程都通过外部消息机制来通信，跨进程的能力取决于MQ支持
即进程间不直接通信，而是通过中间层MQ，加一个控制层就能获得更多灵活性和优势: 稳定性、优先级控制、离线能力、事务性消息处理
```js
RedisSMQ = require('rsmq')
rsmq = new RedisSMQ({host: '127.0.0.1', port: 6373, ns: 'rsmq'})
// create queue
rsmq.createQueue({qname: 'myqueue', function(err, resp) {
  if (resp === 1) {
    console.log('queue created')
  }
}})
// send message
rsmq.sendMessage({qname: 'myqueue', message: 'hello world'}, function(err, resp) {
  if (resp) {
    console.log('message sent. ID', resp)
  }
})
// receive message
rsmq.receiveMessage({qname: 'myqueue'}, function(err, resp) {
  if (resp.id) {
    console.log('message received', resp)
  } else {
    console.log('no message for me...')
  }
})
```
## 死锁产生的原因？如何解决死锁的问题
产生的四个必要条件
1. 互斥使用，即当资源被一个线程使用时，别的线程不能使用
2. 不可抢占，资源请求者不能强制从资源占有者手中抢夺资源，资源只能由资源占有者主动释放
3. 请求和保持，即当资源请求者在请求其他资源的同时保持对原有资源的占有
4. 循环等待，即存在一个等待队列，p1占有p2的资源，p2占有p3的资源，p3占有p1的资源。这样就形成了一个等待循环
原因：
1. 系统资源的竞争：通常系统中拥有的不可剥夺资源，其数量不足以满足多个进程运行的需要，使得进程在运行过程中，会因争夺资源而陷入僵局。只有对不可剥夺资源的竞争才可能产生死锁，对可剥夺资源的竞争是不会引起死锁的
2. 进程推进顺序非法：进程在运行过程中，请求和释放资源的顺序不当，也同样会导致死锁。
3. 信号量使用不当也会造成死锁：进程间彼此相互等待对方发来的消息，结果也会使得这些进程间无法继续向前推进
解决死锁
1. 加锁顺序
当多个线程需要相同的一些锁，但是按不同的顺序加锁，死锁就很容易发生
2. 加锁时限
线程尝试获取锁的时候加上一定的时限，超过时限则放弃对该锁的请求，并释放自己占有的锁。
3. 死锁检测
死锁检测是一个更好的死锁预防机制，主要针对那些不可能实现按顺序加锁并且锁超时也不可行的场景。
## 如何实现浏览器内多个标签页之间的通信
1. localStorage
2. websocket
3. sharedWorker: 跨域不共享；使用port发送和接收消息；如果url相同且是同一个js，那么只会创建一个sharedWorker
4. cookie + setInterval
## 对Service Worker的理解
Service Worker是运行在浏览器背后的独立线程，可以用来实现缓存功能。
实现缓存分为三个步骤：
1. 首先需要注册Service Worker
2. 监听到install事件缓存需要的文件
3. 下次访问的时候拦截请求的方式查询是否存在缓存，存在缓存就可以直接读取缓存文件，否则就去请求数据。
```js
// index.js
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('sw.js')
  .then(function (registration) {
    console.log('server worder 注册成功')
  })
  .catch(function(err) {
    console.log('service worker 注册失败')
  })
}
// sw.js 监听install事件，回调中缓存所需文件
self.addEventListener('install', e => {
  e.waitUntil(caches.open('my-cache').then(function(cache) {
    return cache.addAll(['./index.html', './index.js'])
  }))
})

self.addEventListener('fetch', e=> {
  e.respondWith(caches.match(e.request).then(function(response) {
    if (response) {
      return response
    }
    console.log('fetch source')
  }))
})
```
## 对浏览器缓存机制的理解
[](https://juejin.cn/post/6844904021308735502)
## 浏览器资源缓存的位置有哪些

## 浏览器内核的理解
浏览器内核是浏览器的核心，也称渲染引擎，用来解释网页语法并渲染到网页上，内核决定了浏览器该如何显示网页内容以及页面的格式信息
浏览器内核又可以分为两部分：渲染引擎和JS引擎
## 浏览器的主要组成部分
1. 用户界面
2. 浏览器引擎
3. 渲染引擎
4. 网络：用来完成网络调用或资源下载的模块
5. UI后端：绘制基础元件，如组合框与窗口
6. 解释器：用于解析执行JavaScript代码
7. 数据存储：浏览器需要把所有数据存到硬盘上
## 浏览器渲染原理
1. 进程与线程
2. 浏览器中的5个进程
浏览器主进程、渲染进程(Chrome为每一个Tab标签页创建一个渲染进程)、插件进程、网络进程、GPU进程(负责3D CSS效果，网页，Chrome ui的绘制)
3. HTTP请求流程
4. 渲染流程
## 浏览器渲染过程
渲染过程大致可以分为五个部分：
1. HTML解析构建DOM树
2. CSS解析：浏览器将识别所有的CSS样式信息，并构建形成CSSOM树
3. 样式与结构合并：CSSOM树和DOM树合并，形成Render树
4. 布局阶段：布局阶段主要是将渲染树遍历，将元素嵌套关系以盒子模型的形式写入文档流。这个阶段会计算出每个树节点应该占据的空间以及在视图中的位置
5. 绘制阶段：这个阶段会将我们的渲染树转化为像素，并对所有的媒体文件进行解码
## 什么是文档的预解析
预解析也叫做变量提升，在浏览器执行代码之前，会先将代码扫描一遍，然后把声明式的函数和变量都提到所在作用域的最前端，这就是预解析
## CSS如何阻塞文档解析
由于Render Tree是依赖于DOM Tree和CSSOM Tree的，所以他必须等待到CSSOM Tree构建完成，也就是CSS资源加载完成(或者CSS资源加载失败)后，才能开始渲染
由于js可能会操作之前的Dom节点和css样式，样式表会在后面的js执行前先加载执行完毕
## 如何优化关键渲染路径
（1）对关键路径进行分析和特性描述：资源数、字节数、长度。
（2）最大限度减少关键资源的数量：删除它们，延迟它们的下载，将它们标记为异步等。
（3）优化关键字节数以缩短下载时间（往返次数）。
（4）优化其余关键资源的加载顺序：您需要尽早下载所有关键资产，以缩短关键路径长度
## 对事件委托的理解
事件委托本质上是利用了浏览器事件冒泡的机制。因为事件在冒泡过程中会上传到父节点，父节点可以通过事件对象获取到目标节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件，这种方式称为事件委托(事件代理)。
使用事件委托可以不必要为每一个子元素都绑定一个监听事件，这样减少了内存上的消耗。并且使用事件代理还可以实现事件的动态绑定，比如说新增了一个子节点，并不需要单独地为它添加一个监听事件，它绑定的事件会交给父元素中的监听函数来处理。
## 同步和异步的区别
同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务
异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有等主线程任务执行完毕，"任务队列"开始通知主线程，请求执行任务，该任务才会进入主线程执行。
## 什么是执行栈
所有同步任务都在主线程上执行，形成一个执行栈
## 事件触发的过程是怎样的
javaScript事件的三个阶段：捕获阶段 目标阶段 冒泡阶段
## V8的垃圾回收机制是怎样的
[](https://juejin.cn/post/6844903993051709447)
## 哪些操作会造成内存泄漏
[内存泄漏](https://www.cnblogs.com/dasusu/p/12200176.html)
1. 意外的全局变量
2. 遗忘的定时器
3. 使用不当的闭包
4. 遗漏的DOM元素
5. 网络回调
## CDN如何做配置以及缓存策略
缓存配置包括目录和后缀名两种形式，并且可以针对不同的缓存配置设置不同的权重以决定其优先级。其中后缀名即是针对于特定后缀名设置的缓存规则，而目录则是对该目录及其子目录下的所有文件均生效的。当对同一文件同时设置了后缀名和目录的缓存的话会先依据优先级权值先进行选择，在优先级权值相同的情况下会后缀名策略优先。
1. CDN 处理一个资源是否缓存首先是需要看源站针对于该资源配置的缓存设置。因为源站的不缓存策略是用户自身控制的，因此是有最高的优先级的，当源站配置了缓存规则则转 2 。而如果没有进行任何配置的话则转 3 ，而对于浏览器缓存情况转 7 。

2. 当源站配置了以下的规则时， CDN 会认为该资源源站不允许 CDN 缓存，并且这种情况下浏览器也是不会做缓存的，因此会每次请求该资源时都回源站，无法进行缓存加速，如果没有则转 4 ：

1）有s-maxage=0，no-cache，no-store，private其中一种2）如果没有s-maxage或者s-maxage=0，并且有max-age=0.3）带Pragma: no-cache

3. 在源站没有配置缓存规则需判断 CDN 控制台是否配置缓存规则，如果配置了缓存规则转 4 ，如果没有配置缓存规则转 5 。

4. 需判断 CDN 控制台是否有配置缓存规则，如果配置了缓存规则的话那么CDN 上的缓存策略将覆盖源站的缓存策略，而控制台缓存配置的优先级为：

1）权重越高的优先级越好；2）同等优先级后缀名优先级高于目录优先级；3）相同权重且相同优先级则随机匹配（建议避免第三种场景），如果没有配置缓存规则则转 6 。

5. 需根据源站的缓存规则进行缓存，常见的源站缓存规则有 Cache-Control和 Expires 头，根据 HTTP 协议 Cache-Control 的优先级高于 Expires 头，并且 s-maxage 设置高于 max-age 设置。

6. 需遵循 CDN 默认缓存规则，默认缓存规则包括：

1）对于 response 头没有包括 Etag 或者 Last-Modified 头的文件默认是不缓存的（一般认为此类文件为动态文件）；2）没有 Last-Modified 头的文件默认但是有 Etag 头的缓存 10 秒；3）对于有 Last-Modified 头的会按照(当前时间 - Last-Modified 时间) * 0.1，并且将其限制在 [10,3600] 区间内。

7. 对于源站设置了不缓存的规则时浏览器是不缓存的；如果 CDN 修改了 Cache-Control 或者 Expires 头时，浏览器会按照该修改头缓存；如果没有修改即会按照源站的策略缓存。

## 什么是沙箱？浏览器的沙箱有什么作用
沙盒用于限制子进程（渲染器、插件、GPU等）直接访问系统资源。这有助于保护用户免受不受信任和潜在恶意Web内容的攻击。
## 打开Chrome浏览器一个Tab页面至少会出现几个进程
最新的 Chrome 浏览器包括至少四个: 1 个浏览器（Browser）主进程、1 个 GPU 进程、1 个网络（NetWork）进程、多个渲染进程和多个插件进程, 当然还有复杂的情况；
​
页面中有 iframe 的话, iframe 会单独在进程中
​
有插件的话，插件也会开启进程
​
多个页面属于同一站点，并且从 a 打开 b 页面，会共用一个渲染进程
​
装了扩展的话，扩展也会占用进程
​
这些进程都可以通过 Chrome 任务管理器来查看
## setTimeout为什么会造成内存泄露？
计时器会自行重置并永远运行，直到超时完成，因为不允许垃圾收集器删除内存
## onload 和 DOMContentLoaded的区别
onload事件触发时，页面所有的DOM、样式表、脚本、图片已经加载完成
DOMContentLoaded事件触发时，仅DOM加载完成
区别：
onload是DOM事件，onDOMContentLoaded是HTML5事件
onload事件会被阻塞，而onDOMContentLoaded不会
onDOMContentLoaded执行时间比onload早
## defer和async的区别，以及它们的加载和执行时机
1.async和defer的执行时机不同,async是在加载完后立即执行,执行的过程仍会阻塞后续html的解析。defer是在html解析完,DomContentLoaded之前执行。
2.asyny不能保证script标签的执行顺序(谁先加载完谁先执行),async在html解析完之后按顺序执行

## xss和csrf的概念和防御方式
[XSS](https://tech.meituan.com/2018/09/27/fe-security.html)
[csrf](https://tech.meituan.com/2018/10/11/fe-security-csrf.html)
