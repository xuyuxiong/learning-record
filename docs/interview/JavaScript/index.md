## 事件循环机制
[从一道面试题谈谈对EventLoop的理解](https://juejin.cn/post/6868849475008331783)
- EventLoop会不断循环的去取tasks队列中最老的task推入栈中执行，并在当次循环里依次执行并清空微任务队列里的任务
- 执行完微任务队列里的任务可能会渲染更新。
## 性能优化

## 虚拟列表功能实现

## 长列表渲染原理/优化
[](https://juejin.cn/post/6995334008603148295)

## 骨架屏优化

## 白屏时间的计算
Date.now() - performance.timing.navigationStart
## Commonjs和ESModule的区别
1. 语法上的差异
2. CommonJS模块输出的是一个值的拷贝，ES6模块输出的是值的引用
3. CommonJS是运行时加载，ES6模块是编译时输出接口
运行时加载：CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”
编译时加载: ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”
## null和undefined区别
1.  null 和 undefined 虽然值的结果是相等的，但是其所代表的语义是完全不一样的（==是相等的）。
  undefined 代表了某个变量完全不存在，在内存中完全能不存在这个标识符所指向的地址；
  null 代表了内存中是存在这个变量的，只是我在某些情况下需要把这个变量原本的值给覆盖了，将它设置为一个空。
2.  null 转为数值是 0 ;  undefined 转为数值是 NAN（not a number）
3.  null 通过 typeof 判断类型的时候结果的输出是 object ; 而 undefined 的类型是 undefined

## instanceof操作符实现原理以及实现
用于检测构造函数的protoype属性是否出现在某个实例的原型链上
```js
function instance(left, right) {
  if (typeof left !== 'object' || left == null) return false
  let proto = Object.getPrototype(left)
  while(true) {
    if (proto == null) return false
    if (proto == right.prototype) return true;
    proto = Object.getPrototype(proto)
  }
}
```
## 为什么0.1 + 0.2 ！== 0.3
 在JS中数字采用的IEEE 754的双精度标准进行存储, 转换成二进制后会有精度丢失问题
## 如何获取安全的undefined值
可以用 void 0 来获得 undefined
## let const var的区别

## new一个箭头函数会怎么样

## 箭头函数的this指向

## 箭头函数和普通函数的区别
[区别](https://segmentfault.com/a/1190000021380336)
- 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
- 不可以当作构造函数，也就是不可以使用new命令，否则会抛出一个错误
- 不可以使用arguments对象

## Proxy可以实现什么功能

## map和Object、weakMap的区别

## 对原型、原型链的理解

## 对作用域、作用域链的理解
## 对象的创建方式

## V8执行一段JS代码的过程

## 讲一下宏任务和微任务

# 宏任务和微任务有哪些
macrotask: script(同步的代码执行)、setTimeout、setInterval、setImmediate(Node环境中)、requestAnimationFrame、I/O、UI rendering
micortask: process.nextTick(Node环境)、Promise.then()、MutationObserver
## 浏览器和Node的事件循环机制及区别
[浏览器和Node的事件循环机制及区别](https://blog.csdn.net/fish_skyyyy/article/details/117370229)
浏览器事件循环机制中，微任务的任务队列是在每个宏任务执行完之后执行。

Node事件循环机制中，微任务会在事件循环的各个阶段之间执行，也就是说，一个阶段执行完毕，就会去执行微任务队列的任务。
## Promise如何实现链式调用

## async/await的运行机制

## 异常处理
[](https://juejin.cn/post/6844903462002491399#heading-8)

## Set和WeakSet的区别
- Set：允许存储任何类型的唯一值，无论是原始值或者是对象引用
- WeakSet：成员都是弱引用的对象，会被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
- WeakSet不可迭代，不能用在for-of循环中
- WeakSet没有size属性
## Map和WeakMap的区别
- Map的key可以是任意的数据类型；WeakMap的key只能是非null的对象引用
- Map的key是强引用，WeakMap的key是弱引用的对象，所以不会挤入垃圾回收引用次数
- Map可以轻易转换为数组；WeakMap做不到
## 有20个异步请求，如何保持同时三个的并发
```js
class Scheduler {
  constructor(limit) {
    this.limit = limit;
    this.queue = []
    this.count = 0
  }
  addTask(time, callback) {
    const promiseCreate = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          callback()
          resolve()
        }, time)
      })
    }
    this.queue.push(promiseCreate)
  }
  taskStart() {
    for(let i = 0; i < this.limit; i++) {
      this.request()
    }
  }
  request() {
    if (!this.queue.length || this.count > this.limit)return
    this.queue.shift()().then(() => {
      this.count --;
      this.request()
    })
  }
}

```
## async/await, generator, promise这三者的关联和区别是什么

## generator是如何做到中断和恢复

## canvas重合区域怎么处理

## 函数式编程的特点
1. 函数可以被当作参数
2. 私有变量的保存
3. 函数内部的执行不会影响到外部
## 如何获取html元素实际的样式值
```js
function getStyleByAttr(obj, name) {
  return window.getComputedStyle ? window.getComputedStyle(obj, null)[name] : obj.currentStyle[name]
}
```
## 解决循环引用
```js
function isObject(obj) {
  return (typeof obj === 'object' || typeof obj === 'function') && obj !== null
}

function cloneDeep(source, hash = new WeakMap()) {
  if (!isObject[source]) return source;
  if (hash.has(source))return hash.get(source)
  var target = Array.isArray(source) ? [] : {}
  hash.set(source, target)
  for(var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = cloneDeep(source[key], hash)
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}
```
## 动手实现一个repeat方法
```js
async function sleep(fn, wait, args) {
  return new Promise(resolve => {
    setTimeout(() => {
      fn.apply(this, args)
      resolve()
    }, wait)
  })
}

function repeat(func, times, wait) {
  return async function() {
    for(let i = 0; i < times; i++) {
      await sleep(func, wait, arguments)
    }
  }
}
```
## JavaScript是如何运行的？解释型语言和编译型语言的差异是什么 
早期计算机只有机器语言时，程序设计必须用二进制来编写程序，并且要起程序员对计算机硬件和指令集非常了解，编程的难度比较大，操作极易出错。为了解决机器语言的编程问题，慢慢开始出现了符号式的汇编语言，需要将汇编语言翻译成机器能够识别的机器语言
由于每一种机器的指令系统不同，需要不同的汇编程序语言程序与之匹配，因此程序员往往需要针对不同的机器了解其硬件结构和指令系统。为了可以抹平不同机器的指令系统，使得程序员可以更加关注程序设计本身，先后出现了面向问题的高级程序设计语言，如BASIC和C
高级程序语言会先翻译成汇编语言或者其他中间语言，然后再根据不同的机器翻译成机器语言进行执行。除此之外，汇编语言虚拟机和机器语言之间还存在一层操作系统虚拟机，主要用于控制和管理系统的全部硬件和软件资源。机器语言机器还可以继续分解成微程序机器，将每一条机器指令翻译成一组微指令进行执行。
如果某种高级语言或者应用语言转化的目标不是特定计算机的汇编语言，而是另外一种高级程序语言，那么还需要将高级程序语言再进行一次额外的编译才能得到最终的目标程序，这种编译器可称为源到源的转换器。
除此之外，有些程序设计语言将编译的过程和最终转换成目标程序进行执行的过程混合在一起，这种语言转化程序通常被称为解释器，主要作用是将某种语言编写的源程序作为输入，将该源程序执行的结果作为输出
解释器和编译器有很多相似之处，都需要对源程序进行分析，并转换成目标机器可识别的机器语言进行执行。只是解释器是在转换源程序的同时立马执行对应的机器语言，而编译器得先把源程序全部转换成机器语言并产生目标文件，然后将目标文件写入相应的程序存储器进行执行。
## JavaScript的数组和函数在内存中是如何存储的
JavaScript中的数组存储大致需要分为两种情况：
- 同种类型数据的数组分配连续的内存空间
- 存在非同种类型数据的数组使用哈希映射分配内存空间
## ES6 Modules相对于CommonJS的优势是什么
ES6 Module相比与CommonJS的优点
① 死代码检测和排除。我们可以用静态分析工具检测出哪些模块没有被调用过。
② 模块变量类型检查。
③ 编译器优化。ES6 Module支持直接导入变量，减少了引用层级，程序效率更高
## Hash和History路由的区别和优缺点

## JavaScript中对象的属性描述符有哪些？分别有什么作用

## 简单比对一下callback、Promise、Generator、Async几个异步API的优劣

- callback
异步任务容易导致回调地狱，回调函数不能通过return返回数据，只能通过再次回调的方式进行参数传递；如果是三方的异步API，可能进行了错误捕获却并没有抛出错误处理信息、回调的执行权力控制在三方库手中、回调参数可能无法满足使用者的诉求等问题。
```ts
interface ILib<T> {
  param: T;
  emit(params: T): void;
  on(callback: (params: T) => void): void;
}
// 假设一下是一个三方库，并发布成npm包
export const lib: ILib<string> = {
  params: '',
  emit(params) {
    this.prams = params;
  },
  on(callback) {
    try {
      callback(this.params)
      callback(this.params)
    } catch (err) {
      // 假设lib库没有抛出任何异常信息
    }
  }
}
lib.emit('hello')
lib.on(value => {
  console.log(value)
})
lib.on(value => {
  // 开发者无法感知自己的代码设计错误
  console.log(value.a.b.c)
})
```
- Promise
利用有限状态机的原理来解决异步的处理问题，它的特点如下：
Promise对象的执行不受外界影响。Promise对象的异步操作有三种状态:pending、fulfilled、rejected，只有Promise对象本身的异步操作结果可以决定当前的执行状态，任何其他的操作无法改变状态的结果
Promise对象的执行状态不可变。Promise的状态只有两种，从pending变为fulfilled或从pending变为rejected
- Generator
Promise解决了callback的回调地狱问题，但是也造成代码冗余，如果一些异步任务不支持Promise语法就需要进行一层Promise封装。Generator使得异步代码的设计和执行看起来和同步代码一致
```ts
const firstPromise = (result: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000)
  })
}
const nextPromise = (result: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 3), 1000)
  })
}
// 在Generator函数里执行的异步代码看起来和同步代码一致
function *gen(result: number): Generator<Promise<number>, Proise<number>, number> {
  const firstResult = yield firstPromise(result)
  const nextResult = yield nextPromise(firstResult)
  return nextPromise(firstResult)
}
const g = gen(1)
g.next().value.then((res: number) => {
  return g.next(res).value
}).then((res: number) => {
  return g.next(res).value
})
```
Promise具有以下优势
- 丰富了状态类型，Generator通过next可以产生不同的状态信息，也可以通过return结束函数执行状态，相对于Promise的resolve不可变状态更加丰富
- Generator函数内部的异步代码执行看起来和同步代码执行一直，非常利于代码的维护
- Generator函数内部的执行逻辑和相应的状态变化逻辑解耦，降低了代码的复杂度
```ts
// 封装一个自动执行的执行器
const firstPromise = (result: number): Proimse<number> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000)
  })
}

const nextPromise = (result: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 3), 1000)
  })
}

type Gen = Gerator<Promise<number>, Promise<number>, number>
function* gen(): Gen {
  const firstResult = yield firstPromise(1)
  const nextResult = yield nextPromise(firstResult)
  return nextPromise(firstResult)
}
// 自动执行器
function co(gen: () => Gen) {
  const g = gen()
  function next(data: number) {
    const result = g.next(data)
    if (result.done) {
      return result.value
    } 
    result.value.then(data => {
      next(data)
    })
  }
  next(0)
}
co(gen)
```
- Async
Async是Generator函数的语法糖，相对于Generator而言Async的特性如下：
- 内置执行器：Generator函数需要设计手动执行器或者通用执行器进行执行，Async语法则内置了自动执行器，设计代码时无需关心执行步骤
- yield命令无约束：在Generator中使用Co执行器yield后必须是Promise对象或者Thunk函数，而Async语法中的await后可以是Promise对象、数字、字符串、布尔值
- 返回Promise
## Object.defineProperty有哪几个参数？各自都有什么作用

## 简易MVVM 
[](https://juejin.cn/post/6844904099704471559#heading-23)
## ES6中Symbol、Map、Decorator的使用场景有哪些？在哪些库的源码里见过这些API的使用

## 上下文执行栈

## 分别介绍一下原型、原型链、作用域、作用域链的含义和使用场景
原型：JavaScript有一个叫做原型的公有属性，属性名proto,这个原型属性是对另一个对象的引用，通过这个原型属性我们就可以访问另外一个对象的属性和方法
原型链：当访问对象上的属性时，会首先查找该对象上是否有该属性，当这个对象上没有这个属性时就会访问proto索引看看它的原型对象上有没有，如果没有就沿着proto原型向上查找，直到找到为止。  
作用域：就是变量和函数可以访问的范围。全局作用域、局部作用域、块级作用域
作用域链：当声明一个函数时，局部作用域一级一级向上包起来，就是作用域链
1.当执行函数时，总是先从函数内部寻找局部变量 2.如果内部查找不到则向作用域链查找。
## 介绍一下EventLoop
[EventLoop](https://juejin.cn/post/6868849475008331783)
## EventLoop中为什么要同时存在宏任务和微任务两个队列？设计一个行不行？一段代码在执行时，程序是如何去区分宏任务和微任务的？

## 介绍一下宏任务和微任务
[宏任务和微任务](https://juejin.cn/post/6880787856353132552)
追问：哪些是宏任务？哪些是微任务？
追问：宏任务和微任务的区别是什么？为什么要设计宏任务和微任务两个队列？使用一个任务队列行不行？为什么？
追问：你刚刚所说的都是根据api来识别微任务和宏任务的，那么一段完整的程序浏览器是如何区分宏任务和微任务的呢？

## DOM事件模型。事件捕获和事件冒泡的使用场景 
[基础](https://juejin.cn/post/6995531009173225485)

## JS实现并发控制
```js
const task = timeout = new Promise((resolve) => setTimeout(() => {
  resolve(timeout)
}, timeout))

const taskList = [1000, 3000, 200, 1300, 800, 2000]
// 队列保证任务并发执行的顺序
class Queue {
  constructor() {
    this._queue = []
  }
  push(value) {
    return this._queue.push(value)
  }
  shift() {
    return this._queue.shift()
  }
  isEmpty() {
    return this._queue.length = 0
  }
}
// 每个任务 管理其执行函数和参数
class DelayedTask {
  constructor(resolve, fn, args) {
    this.resolve = resolve
    this.fn = fn;
    this.args = args;
  }
}
// 控制任务的执行
class TaskPool {
  constructor(size) {
    this.size = size;
    this.queue= new queue()
  }

  addTask(fn, args) {
    return new Promise((resolve) => {
      this.queue.push(new DelayedTask(resolve, fn, args))
      if (this.size) {
        this.size --;
        const { resolve: taskResolve, fn, args} = this.queue.shift()
        taskResolve(this.runTask(fn, args))
      }
    })
  }

  pullTask() {
    if (this.queue.isEmpty()) return;
    if (this.size === 0) return;
    this.size++;
    const { resolve, fn, args } = this.queue.shift()
    resolve(this.runTask(fn, args))
  }

  runTask(fn, args) {
    const result = Promise.resolve(fn(...args))
    result.then(() => {
      this.size --;
      this.pullTask()
    }).catch(() => {
      this.size --;
      this.pullTask()
    })
    return result;
  }

}
// TaskPool包含的三个关键方法
// addTask
// pullTask

// 控制并发数量
```

## ES新特性

## 垃圾回收机制
[](https://juejin.cn/post/6981588276356317214)
## Promise、Generator、Async三者的区别
[](https://juejin.cn/post/6844904159582355470)
## 千分位分隔符
```js
var str = "100000000000",
    reg = /(?=(\B\d{3})+$)/g;
str.replace(reg, ",")
```
## 字符串转驼峰
1. foo Bar => fooBar

2. foo-bar---- => fooBar

3. foo_bar__ => fooBar
```js
const camelCase = (string) => {
  const camelCaseRegex = /[-_\s]+(.)?/g

  return string.replace(camelCaseRegex, (match, char) => {
    return char ? char.toUpperCase() : ''
  })
}
```
## RAF 和 RIC 是什么
requestAnimationFrame： 告诉浏览器在下次重绘之前执行传入的回调函数(通常是操纵 dom，更新动画的函数)；由于是每帧执行一次，那结果就是每秒的执行次数与浏览器屏幕刷新次数一样，通常是每秒 60 次。
requestIdleCallback：: 会在浏览器空闲时间执行回调，也就是允许开发人员在主事件循环中执行低优先级任务，而不影响一些延迟关键事件。如果有多个回调，会按照先进先出原则执行，但是当传入了 timeout，为了避免超时，有可能会打乱这个顺序。
## Object.defineProperty和Proxy有什么区别
Proxy的优势如下：
- Proxy可以直接监听整个对象而非属性
- Proxy可以直接监听数组的变化
- Proxy有13种拦截方法
- Proxy返回的是一个新对象
- Proxy作为新标准将受到浏览器的厂商的性能优化
Object.defineProperty的优势：
兼容性好，支持IE9，而Proxy的存在浏览器兼容性问题
不足：
- Object.defineProperty只能劫持对象的属性，因此我们需要对每个对象的每个属性进行遍历
- 不能监听数组
- 不能对es6产生的Map、Set这些数据结构做出监听
- 不能监听新增删除操作