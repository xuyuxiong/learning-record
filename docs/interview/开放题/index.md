# Open questions
[面试](https://www.yuque.com/zaotalk/interview/lvihpw)
[埋点监控SDK如何设计](https://juejin.cn/post/7085679511290773534)
[正则](https://mp.weixin.qq.com/s/s5CfAQTLNnXYJwCAerZcYA)
## 你最擅长什么 

## 某个组织下挂了10w个节点，如何做优化处理

## 业务中遇到最难解决的问题

## qps达到峰值了怎么优化

## 知道单页和多页应用怎么通讯吗

## 文件断点续传

## 组件库设计原则
- 标准性
任何一个组件应该遵守一套标准
- 独立性
描述了组件的细粒度，遵循单一指责原则，保持组件的纯粹性
属性配置等API对外开放，组件内部状态对外封闭，尽可能的少与业务耦合
- 复用与易用
UI差异，消化在组件内部
输入输出友好、易用
- 适用SPOT法则
Single Point Of Truth 就是尽量不要重复代码
- 避免暴露组件内部实现
- 避免直接操作DOM、避免使用ref
使用父组件的state控制子组件的状态而不是直接通过ref操作子组件
- 入口处检查参数的有效性，出口处检查返回的正确性
- 无环依赖原则(ADP)
- 稳定抽象原则(SAP)
组件的抽象程度与其稳定程度成正比，
一个稳定的组件应该是抽象的（逻辑无关的）
一个不稳定的组件应该是具体的（逻辑相关的）
为降低组件之间的耦合度，我们要针对抽象组件编程，而不是针对业务实现编程
- 避免冗余状态
如果一个数据可以由另一个 state 变换得到，那么这个数据就不是一个 state，只需要写一个变换的处理函数，在 Vue 中可以使用计算属性
如果一个数据是固定的，不会变化的常量，那么这个数据就如同 HTML 固定的站点标题一样，写死或作为全局配置属性等，不属于 state
如果兄弟组件拥有相同的 state，那么这个state 应该放到更高的层级，使用 props 传递到两个组件中
- 合理的依赖关系
父组件不依赖子组件，删除某个子组件不会造成功能异常
- 扁平化参数
除了数据，避免复杂的对象，尽量只接收原始类型的值
- 良好的接口设计
- API尽量和已知概念保持一致

## 图片懒加载
```js
function lazyload() {
  const imgs = document.getElementsByTagName('img')
  const len = imgs.length;
  // 视口的高度
  const viewHeight = document.documentElement.clientHeight
  // 滚动条高度
  const scrollHeight = document.documentelement.scrollTop || document.body.scrollTop
  for(let i = 0; i < len; i++) {
    const offsetHeight = imgs[i].offsetTop
    if (offsetHeight < viewHeight + scrollHeight) {
      const src = imgs[i].dataset.src;
      imgs[i].src = src
    }
  }
  window.addEventListener('scroll', lazyload)
}
```
## 不同域名下的单点登录
[前端鉴权必须了解的 5 个兄弟：cookie、session、token、jwt、单点登录](https://mp.weixin.qq.com/s/-LcihJFRMbNFmREg0fZSRw)
- app1登录
1. 用户访问app1系统，app1系统是需要登录的，但用户现在没有登录。重定向到sso认证中心，并将自己的地址作为参数
2. 跳转到 CAS server 即SSO登录系统，以后图中的CAS Server我们统一叫做SSO系统。SSO系统也没有登录，弹出用户登录页
3. 用户填写用户名、密码，SSO系统进行认证后，将登录状态写入SSO的session，浏览器中写入SSO域下的Cookie
4. 认证中心重定向回app系统，并把Token携带过去app1
SSO系统登录完成后会生成一个ST，然后跳转到app1系统，同时将ST作为参数传递给app1系统
5. app1系统拿到ST后，从后台向SSO发送请求，验证ST是否有效
6. 验证通过后，app1系统将登录状态写入session并设置app域下Cookie
- app2登录
1. 用户访问app2系统，app2系统没有登录，跳转到SSO。
2. 由于SSO已经登录了，不需要重新登录认证。
3. SSO生成ST，浏览器跳转到app2系统，并将ST作为参数传递给app2。
4. app2拿到ST，后台访问SSO，验证ST是否有效。
5. 验证成功后，app2将登录状态写入session，并在app2域下写入Cookie。
## VDOM转真实DOM
```js
function render(vnode, container) {
  container.appendChild(_render(vnode))
}
function _render(vnode) {
  if (typeof vnode === 'number') {
    vnode = String(vnode)
  }
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }
  const dom = document.createElement(vnode.tag)
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key]
      dom.setAttribute(key, value)
    })
  }
  vnode.children.forEach(child => render(child, dom))
  return dom
}
```
## 什么是面向切面编程
面向切面编程是面向对象中的一种方式，在代码执行过程中，动态嵌入其它代码，叫做面向切面编程
## 什么是函数式编程
函数式编程是使用函数来进行高效处理数据或数据流的一种编程方式。在数学中，函数的三要素是定义域、值域和对应关系。
在实际的编程中，可以将各种明确对应关系的函数进行传递、组合从而达到处理数据的最终目的。在此过程中，我们的关注点不在于如何实现对应关系，而在于如何将各种已有的对应关系进行高效联动，从而可快速进行数据转换，达到最终的数据处理目的，提高开发效率
- 简单示例
通过OOP来解决数学的加减乘除问题
```ts
class MathObject {
  constructor(private value: number) {}
  public add(num: number): MathObject {
    this.value += num;
    return this;
  }
  public multiply(num: number): MathObject {
    this.value *= num;
    return this;
  }
  public getValue(): number {
    return this.value
  }
}

const a = new MathObject(1)
a.add(2).multiply(2).add(a.multiply(2).getValue())
```
我们希望通过上述程序来解决 (1+2)*2 + 1 * 2的问题，但实际上计算出来的结果是24，因为在代码内部有一个this.value的状态值需要跟踪，这会使得结果不符合预期，接下来使用函数式编程
```ts
function add(a: number, b: number): number {
  return a + b;
}
function multiply(a: number, b: number): number {
  return a * b;
}
const a: number = 1;
const b: number = 2;
add(multiply(add(a, b), b), multiply(a, b))
```
函数对应关系要遵循某些特定的原则：
- 高内聚低耦合
- 最小意外原则
- 单一职责原则
虽然我们在使用函数的过程中更多的不再关注函数如何实现，但是真正在使用和设计函数的时候需要注意以下特点：
- 声明式
- 一等公民
- 纯函数
- 无状态和数据不可变
```js
// 命令式
const array = [0.8, 1.7, 2.5, 3.4]
const filterArray = []
for(let i = 0; i < array.length; i++) {
  const integer = Math.floor(array[i])
  if (integer < 2) continue
  filterArray.push(integer)
}
// 声明式
// map和filter不会修改原有数组，而是产生新的数组返回
[0.8, 1.7, 2.5, 3.4].map(item => Math.floor(item)).filter(item => item > 1)
```
一等公民
在JavaScript中函数的使用非常灵活
```ts
interface IHello {
  (name: string): string;
  key?: string;
  arr?: number[];
  fn?(name:string): string;
}
// 函数声明提升
console.log(hello instanceof Object)
hello.key = 'key'
hello.arr = [1, 2]
hello.fn = function(name: string) {
  return `hello.fn, ${name}`
}
hello('world')
function hello(name: string): string {
  return `hello ,${name}`
}
console.log(hello.key)
console.log(hello.arr)

// 函数表达式
const helloCopy: IHello = hello
helloCopy('world')

function transferHello(name: string, hello: Hello) {
  return hello('world')
}
transferHello('world', helloCopy)
transferHello('world', function(name: string) {
  return `hello ${name}`
})
```
在JavaScript中可以对函数进行参数传递、变量赋值或数组操作，因此把函数称为一等公民。
纯函数
纯函数是指在相同的参数调用下，函数的返回值唯一不变。需要注意函数不能包含以下一些副作用：
- 操作http请求
- 可变数据(包括在函数内改变输入参数)
- DOM操作
- 打印日志
- 访问系统状态
- 操作文件系统
- 操作数据库

```ts
let min: number = 1;
// 非纯函数，一旦min发生改变则输入和返回不唯一
function isEqual(num: number): boolean {
  return num === min;
}
// 纯函数
function isEqual(num: number): boolean {
  return num === 1
}
// 非纯函数
function request<T, S>(url: string, params: T): Promise<S> {
  // 会产生请求成功和失败两种结果，返回结果不唯一
  return $.getJson(url, params)
}
// 纯函数
function request<T, S>(url: string, params: T): () => Promise<S> {
  return function() {
    return $.getJson(url, parmas)
  }
}
```
纯函数的特性使得函数式编程具有以下特性：
- 可缓存性
- 可移植性
- 可测试性
可缓存性和可测试性基于纯函数输入输出唯一不变的特性，可移植性则主要基于不依赖外部环境的特性
```ts
// 可缓存例子
interface ICache<T> {
  [arg: string]: T;
}
interface ISquare<T> {
  (x: T): T
}
// 简单的缓存函数
function memoize<T>(fn: ISuare<T>): ISquare<T> {
  const cache: ICache<T> = {}
  return function(x: T) {
    const arg: string = JSON.stringify(x)
    cache[arg] = cache[arg] || fn.call(fn, x)
    return cache[arg]
  }
}
// 纯函数
function square(x: number): number {
  return x * x;
}
const memoSquare = memoize<number>(square)
memoSquare(4)

```
数据不可变
数组的slice方法多次调用都不会改变原数组，splice每次调用都在修改原数组。这种会改变原有数据的函数应该尽量避免使用
## 响应式编程的使用场景
响应式编程是一种基于观察者(发布/订阅)模式并且面向异步数据流和变化传播的声明式编程范式。主要适用场景：
- 用户和系统发起的连续事件处理，例如鼠标的点击、键盘的按键或者通信设备发起的信号等
- 非可靠的网络或者通信处理
- 连续的异步IO处理
- 复杂的继发事务处理
- 高并发的消息处理(如IM聊天)
## Element UI的框架设计

## MVVM、MVC和MVP的区别是什么？各有什么应用场景

## Vue Cli3.x有哪些功能？插件系统的了解

## npm包如何指定引入地址

## npm包中peerDependencies的作用

## 设计一些库包时如何生成版本日志

## 如何确保别人上传的代码没有Lint错误？如何确保代码构架没有Lint错误

## 通用脚手架如何设计？需要具备哪些能力

## 通用工具库如何设计？需要具备哪些能力

## 组件库演示文档如何设计

## 如何做一个项目的国际化方案

## 如何做一个项目的监控埋点方案

## 如何建设项目的稳定性

## 实现一个简易的模版引擎

## 匹配处字符串中const a = requrie('xxx')中的xxx

## vdom + diff
```js
const createElement = vnode => {
  let tag = vnode.tag
  let attrs = vnode.attrs || {}
  let children = vnode.children || []
  if (!tag) return null;
  let elem = document.createElement(tag)
  for(let attrName in attrs) {
    if (attrs.hasOwnProperty(attrName)) {
      elem.setAttribute(attrName, attrs[attrName])
    }
  }
  children.forEach(childVnode => {
    elem.appendChild(createElement(childVnode))
  })

  return elem
}

function updateChildren(vnode, newVnode) {
  let children = vnode.children || []
  let newChildren = newVnode.children || []
  children.forEach((childVnode, index) => {
    let newChildVnode = newChildren[index]
    if (childVnode.tag === newChildVnode.tag) {
      updateChildren(childVnode, newChildVnode)
    } else {
      replaceNode(childVnode, newChildVnode)
    }
  })
}
```
## 埋点是如何拦截和上报的

## 如何实现一个无埋点数据上报

## 埋点监控SDK如何设计
[埋点监控SDK如何设计](https://juejin.cn/post/7085679511290773534)
## 使用hash路由时，怎么能再刷新后时候自动滚动到页面上次的锚点位置？
[性能监控](https://mp.weixin.qq.com/s?__biz=Mzg2NTYyMjYxNg==&mid=2247484919&idx=1&sn=4448d108c35e5bc8dec063d32d80966a)
[性能优化](https://segmentfault.com/a/1190000022205291)
## 如何监控和排查内存泄漏问题
1. 使用Chrome的开发者工具profiles来进行快照对比。

2. 如果是在Node环境下，可以用Node提供的process.memoryUsage()方法来检查内存泄露
## Sentry是如何实现错误监控的
[错误数据处理](https://juejin.cn/post/6918408073774104584)
[前端错误监控](https://juejin.cn/post/6987681953424080926)
## 将一个GIF绘制到canvas上是否可行？如果可行，说说你的实现方法。
https://blog.csdn.net/weixin_39394140/article/details/124143375
## 如何做技术选型？
[技术选型](https://github.com/ascoders/weekly/blob/master/%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF/74.%E7%B2%BE%E8%AF%BB%E3%80%8A12%20%E4%B8%AA%E8%AF%84%E4%BC%B0%20JS%20%E5%BA%93%E4%BD%A0%E9%9C%80%E8%A6%81%E5%85%B3%E5%BF%83%E7%9A%84%E4%BA%8B%E3%80%8B.md)
## 编写一个函数，传入一个promise和数字n，n(s)内promise没有返回结果，直接reject
```js
function promise(p, time) {
  const target = {}
  Promise.race([p, target]).then(v => {
    setTimeout(() => {
      if (v === target) {
        Promise.reject()
      }
    }, time)
  }, () => {
    Promise.reject()
  })
}
```
## 了解Vue3和React18吗
[React18新特性](https://juejin.cn/post/7094037148088664078)
[Vue3](https://blog.csdn.net/weixin_36774307/article/details/127603127)
## webpack和vite和rollup有什么区别
https://blog.csdn.net/weixin_46759393/article/details/122912819
## 大文件断点续传

## 虚拟列表的实现
[](https://juejin.cn/post/7085941958228574215)

## 卡面卡顿怎么定位

## 如果让你设计一个通用的项目脚手架，你会如何设计？一个通用的脚手架一般需要具备哪些能力？

## 如果让你设计一个通用的工具库，你会如何设计？一个通用的工具库一般需要具备哪些能力？
## react diff算法和vue diff算法的区别
[区别](https://zhuanlan.zhihu.com/p/281031340)
[react diff](https://zhuanlan.zhihu.com/p/20346379)

## SPA单页面应用和多页面应用有什么区别

## 做过离线包吗？H5离线包的原理？客户端根据什么拦截静态资源请求？

## JS Bridge的原理？你们这套方案的原理？有没有安全漏洞

## 怎么判断webview是否加载完成

## 如果你们用一个第三方的上报库，但页面加载失败了，还想上报怎么办

## 如何实现模块懒加载？import语法是如何做的
https://blog.csdn.net/weiguang102/article/details/122002934