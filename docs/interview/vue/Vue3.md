## Vue3带来的新变化 & 新特性概览
在API特性方面：
- Compositin API： 可以更好的逻辑复用和代码组织，同一功能的代码不至于像以前一样太分散，虽然Vue2中可以用mixin来实现代码复用，但也存在问题，方法或属性名会冲突，代码来源不清粗
- SFC Composition API语法糖
- Teleport传送门：可以让子组件在视觉上跳出父组件
- Fragments：支持多个根节点
- SFS CSS变量：支持在style里使用v-bind,给CSS绑定JS变量
- Suspense：可以在组件渲染之前的等待时间显示指定内容，比如loading
- v-memo：可以缓存html模版，比如v-for列表不会变化就可以缓存，内存换时间
在框架设计层面：
- 代码打包体积更小，许多Vue的API可以被tree-shaking，因为使用了es6module，tree-shaking依赖es6模块的静态结构特性
- 响应式的优化：用Proxy替代Object.defineProperty,可以监听数组下标变化，及对象新增属性，因为监听的不是对象属性，而是对象本书，还可以拦截apply、has等方法
- 虚拟DOM的变化
1. 静态提升：静态提升就是不参与更新的静态节点只会创建一次，在之后每次渲染的时候会不停的被复用
2. 更新静态标记：在对比VNode的时候，只对比带有更新类型标记的节点，大大减少了对比Vnode时需要遍历的节点数量；还可以通过flag的信息得知当前节点需要对比的内容类型
3. 优化的效果：Vue3的渲染效率不再和模版大小成正比，而是与模版中的动态节点数量成正比
4. Diff算法的优化：Diff算法使用最长递归子序列优化了对比流程，使得虚拟DOM生成速度提升200%
兼容性方面
Vue3不兼容IE11，因为IE11不兼容Proxy
其余特点
- v-if的优先级高于v-for
- Vue3中v-model可以以v-model:xxx的形式使用多次，而Vue2中只可以使用一次；多次绑定需要使用sync
- Vue3用TS编写，使得对外暴露的API更容易结合TypeScript
## Vue3响应式
Vue3响应式的特点
1. 支持监听数组和对象的变化
2. 对象嵌套属性只代理第一层，运行时递归，用到才代理，不需要维护特别多的依赖关系，性能取得很大进步
3. 能拦截对象的13种方法，动态属性增删都可以拦截
4. 提供了ref和reactive两个API来实现响应式
defineProperty和Proxy的区别
defineProperty是ES5的方法 Proxy是ES6的方法
defineProperty是劫持对象属性 Proxy是代理整个对象
defineProperty监听对象和数组时，需要迭代对象的每个属性
defineProperty 不能监听到对象新增属性，Proxy 可以
defineProperty 不兼容 IE8，Proxy 不兼容 IE11
defineProperty 不支持 Map、Set 等数据结构
defineProperty 只能监听 get、set，而 Proxy 可以拦截多达13种方法；
Proxy 兼容性相对较差，且无法通过 pollyfill 解决；所以Vue3不支持IE；
为什么需要Reflect
- 使用Reflect可以修正Proxy的this指向问题
- Proxy的一些方法要求返回true/false来表示操作是否成功，比如set方法，这也和Reflect相对应
- 之前的许多接口都定义在Object上，历史问题导致这些接口越来越杂，然后都移到Reflect新接口上，目前是13种标准行为
5. 惰性响应式
Vue3中使用Proxy并不能监听到对象内部深层次的属性变化，因此它的处理方式是在getter中去递归响应式，这样的好处就是正真访问到的内部属性才会变成响应式，减少性能消耗。
## Ref和Reactive定义响应式数据
- Vue3中对响应式数据的声明，可以使用ref和reactive，reactive的参数必须是对象，而ref可以处理基本数据和对象
- ref在JS中读值要加.value,可以使用isRef判断是否是ref对象，reactive不能改变本身，但可以改变内部的值
- 在模版访问从setup返回ref时，会自动解包；
- Vue3区分ref和reactive的原因就是Proxy无法对原始值进行代理，所以需要一层对象作为包裹
Ref原理
- ref内部封装了一个RefImpl类，并设置get/set，当通过.value调用时就会触发劫持，从而实现响应式
- 当接收的是对象或者数组时，内部仍然是reactive去实现一个响应式
Reactive原理
- reactive内部使用Proxy代理传入的对象，从而实现响应式
- 使用Proxy拦截数据的更新和获取操作，再使用Reflect完成原本的操作(get/set)
使用注意点
- reactive内部如果接收Ref对象会自动解包
- Ref赋值给reactive属性时，也会自动解包
- 值得注意的是，当访问某个响应式数组或者Map这样的原生集合类型中的ref元素时，不会执行ref的解包
- 响应式转换是深层的，会影响到所有的嵌套属性，如果只是想要浅层的话，只要在前面加上shallow即可
## Composition API
Options API的问题
- 难以维护
- 不清晰的数据来源、命名冲突
和Options API区别和作用
- 更灵活的代码组织：Composition API是基于逻辑相关性组织代码的，将零散分布的逻辑组合在一起进行，也可以将单独的功能逻辑拆分成单独的文件，提高可读性和可维护性
- 更好的逻辑复用
- 同时兼容Options API
- 更好的类型推导
## SFC Composition API语法糖
- 在添加了setup的script标签中，定义的变量、函数会自动暴露给模版使用，不需要通过reurn返回
- 引入的组件可以自动注册，不需要通过components进行注册
- 由于执行setup时尚未创建组件实例，所以在setup选型中没有this，要获取组件实例要用getCurrentInstance()
- setup中接收的props是响应式的，当传入新的props时，会及时被更新
## watch和watchEffect
- watch 作用是对传入的某个或者多个值的变化进行见监听；触发时会返回新值和老值；也就是说第一次不会执行，只有变化时才会重新执行
- watchEffect是传入一个立即执行函数，所以默认第一次也会执行一次；不需要传入监听内容，会自动收集函数内的数据源作为依赖，在依赖变化的时候又会重新执行该函数，如果没有依赖就不会执行；而且不会返回变化前后的新值和老值
## Vue3和Vue2、React的区别，有什么优势

## Vue3.0 为什么要用 proxy

## Composition API与React Hook很像，区别是什么

## Vue3.0有什么更新