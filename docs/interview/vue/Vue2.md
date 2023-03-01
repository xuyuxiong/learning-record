## Vue2.0响应式
原理
Vue采用数据劫持结合观察者模式的方式，通过Object.defineProperty()来劫持各个属性的setter、getter，在数据变动时发布消息给订阅者，触发相应的监听回调来更新DOM
Vue响应式的创建、更新流程
- 当一个Vue实例创建时，vue会遍历data选项的属性，用Object.defineProperty为它们设置getter/setter并且在内部追踪相关依赖，在属性被访问和修改时分别调用getter和setter
- 每个组件实例都有相应的watcher程序实例，在组件渲染的过程中把属性记录为依赖，之后当依赖项setter被调用时，会通知watter重新计算，观察者Watcher自动触发重新render当前组件，生成新的虚拟DOM树
- Vue框架会遍历并对比新旧虚拟DOM树中每个节点的差别，并记录下来，最后将所有记录的不同点，局部修改到真实DOM树上。
Vue2响应式的缺点
- Object.defineProperty是可以监听通过数组下标修改数组的操作，通过遍历每个元素的方式；但是Vue2无法监听，原因是性能代码和用户体验不成正比，其次即使监听了，也监听不了数组的原生方法进行操作；出于性能考虑，Vue2放弃了对数组元素的监听，改为对数组原型的7种方法进行劫持
- Object.defineProperty无法检测直接通过.length改变数组长度的操作
- Object.defineProperty只能监听属性，所以需要对对象的每个属性进行遍历，因为如果对象的属性还是对象，还需要深度遍历
- Object.defineProperty只能监听属性而不是对象本身，所以新增的属性没有响应式
- 不支持Map、Set等数据结构
v-model双向绑定的原理
v-model本质上语法糖，v-model默认会解析成名为value的prop和名为input的事件
Vue渲染过程
模版编译原理 & 过程
- 解析template模版生成ast语法树，再使用ast语法树生成render函数字符串，编译流程如下：
1. 解析阶段：使用大量的正则表达式对template字符串进行解析
2. 优化阶段：遍历AST，找到其中一些静态节点并进行标记，方便再进行diff比较时，直接跳过这一些静态节点
3. 生成阶段：将最终的AST转化为render函数
视图渲染更新流程
- 监听数据的变化，当数据发生变化时，render函数执行生成vnode对象
- 对比新旧VNode对象，通过Diff算法生成真实DOM
## VirtualDOM & Diff算法
虚拟DOM的产生和本质
- 由于在浏览器操作DOM很昂贵。频繁的操作DOM会产生一定的性能问题。使用虚拟DOM可以减少直接操作DOM的次数，减少浏览器的重绘及回流
- Virtual DOM本质就是用一个原生的JS对象去描述一个DOM节点。是对真实DOM的一层抽象
- Virtual DOM映射到真实DOM要经历VNode的create、diff、patch等阶段
diff算法实现原理
- 首先，对比新旧节点本身，判断是否为同一节点，如果不为相同节点，则删除该节点重新创建节点进行替换
- 如果为相同节点，就要判断如何对该节点的子节点进行处理，这里有四种情况：
1. 旧节点有子节点，新节点没有子节点，就直接删除旧节点的子节点
2. 旧节点没有子节，新节点有子节点，旧将新节点的子节点添加到旧节点上
3. 新旧节点都没有子节点，就判断是否有文本节点进行对比
4. 新旧节点都有子节点，就进行双端比较
diff算法的执行时机
- Vue中Diff算法执行的时机是组件更新的时候，更新函数会再次执行render函数获得最新的虚拟DOM，然后执行patch函数，并传入新旧两次虚拟DOM，通过比对两者找到变化的地方，最后将其转换为对应的DOM操作 
diff算法为什么是O(n)复杂度而不是O(n^3)
- 正常diff两棵树的时间复杂度是O(n^3)，但实际情况下我们很少进行跨层级的移动DOM，所以Vue的diff进行了优化，只对同层的子节点进行比较，放弃跨级的节点比较，使得时间复杂度从O(n^3)降低至O(n)
Vue2 diff算法 双端比较的原理
使用了四个指针，分别指向新旧VNode的头尾，它们不断的往中间移动，当处理完所有VNode时停止，每次移动都要比较头头、头尾排列组合共四次对比，来去寻找key相同的可复用的节点来进行移动复用
Vue3 diff算法最长递增子序列
- Vue3为了尽可能的减少移动，采用贪心 + 二分查找去找最长递增子序列
## Vue中的key
key 的作用
- key主要是为了更高效的更新虚拟DOM，它会告诉diff算法，在更改前后它们是同一个DOM节点，这样在diff新旧vnodes时更高效；如果不使用key，它默认使用就地复用的策略，而使用key时，它会基于key的变化重新排列元素顺序，并且会移除key不存在的元素
- 它也可以用于强制替换元素/组件而不是重复使用它。当你遇到如下场景时它可能会很有用：完整地触发组件的生命周期钩子；触发过渡(给transition内的元素加上可以，通过改变key来触发过渡)
- 在Vue源码的判断中，diff时去判断两个节点是否相同时主要判断两者的key和元素类型，因此如果不设置key，它的值就是undefined
什么是就地复用
- 当Vue正在更新使用v-for渲染的元素列表时，它默认使用就地复用的策略。如果数据项的顺序被改变，Vue将不会移动DOM元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们每个索引的位置正确渲染。
> 这个默认的模式是搞笑的，但是只适用于不依赖于子组件状态或临时DOM状态的列表渲染输出
使用key的注意点
- 有相同父元素的子元素必须有独特的key，重复的key会造成渲染错误
- v-for循环中尽量不要使用index作为key值
为什么不建议使用index作为值
- 因为在数组中的key值会跟随数组发生变化，而key 值改变，diff算法就无法得知更改前后它们是同一个DOM节点，会出现渲染问题
生命周期钩子是如何实现的
- Vue的生命周期钩子核心实现是利用发布订阅模式先把用户传入的生命周期钩子订阅好，然后在创建组件实例的过程中会一次执行对应的钩子方法
## Computed 和 Watch
computed的实现原理
- computed本质是一个惰性求值的观察者computed watcher。内部通过this.dirty属性标记计算属性是否需要重新求值
- 当computed的依赖状态发生变化时，就会通知这个惰性的watcher，computed watcher 通过this.dep.subs.length判断有没有订阅者
- 有订阅者就是重新计算结果判断是否发生变化，发生则重新渲染
- 没有的话仅仅把this.dirty = true(当计算属性依赖于其它数据时，属性并不会立即重新计算，只有之后其它地方需要读取属性的时候，它才会真正计算，即具备lazy特性)
watcher实现原理
- watch的初始化在data初始化之后，此时的data已经通过Object.defineProperty设置成响应式
- watch的key会在Watcher里进行值的读取，也就是立即执行get获取value，此时如果有immediate属性就立马执行watch对应的回调函数
- 当data对应的key发生变化时，触发回调函数的执行
函数式组件
我们可以将组件标记为functional来表示这个组件不需要实例化，无状态，没有生命周期
优点：
- 由于函数式组件不需要实例化，无状态，没有生命周期，所以渲染性能要好于普通组件
- 函数式组件结构比较简单，代码结构更清晰
## Vue Set方法
什么情况下要用set()
在两种情况下修改数据Vue是不会触发视图更新的
- 在实例创建之后添加新的属性到实例上
- 直接更改数组下标来修改数组的值
set的原理
- 目标是对象，就用defineReactive给新增的属性添加getter和setter
- 目标是数组，就直接调用数组本身的splice方法去触发响应式
## Vue.use插件机制
概述
- Vue是支持插件的，可以使用Vue.use来安装Vue.js插件。如果插件是一个对象，必须提供install方法，如果插件是一个函数，它会被作为install方法。install方法被调用时，会将Vue作为参数传入
- 该方法需要在调用new Vue()之前被调用
- 当install方法被同一个插件多次调用，插件将只会被安装一次
原理
- 先声明一个数组，用来存放安装过的插件，如果已安装就不重复安装
- 然后判断plugin是不是对象，如果时对象就判断对象的install是不是一个方法，如果是就将参数传入并执行install方法，完成插件的安装
- 如果plugin是一个方法，就直接执行
- 最后将plugin推入上述声明的数组中，表示插件已经安装
- 最后返回Vue实例
## Vuex
核心概念
- state是Vuex的数据存放地;state里面存放的数据是响应式的，Vue组件从store读取数据，若是store中的数据发生改变，依赖该数据的也会发生更新，通过mapState把全局的state和getters映射到当前组件的computed计算属性
- getter：可以对state进行计算操作
- mutation：可以用来改变Vuex中store的状态
- action：类似于mutation，但不同于action提交的是mutation，而不是直接变更state，且action可以包含异步操作
- module：面对复杂的应用程序，当管理的状态比较多时；我们需要将Vuex的store对象分割成模块
mutation和action的区别
- 修改state顺序，先触发action，action再出发mutation
- mutation专注于修改state，理论上是修改state的唯一途径，而action可以处理业务逻辑代码和异步请求等。
- mutation必须同步执行，而action可以异步
mutation同步的意义
- 同步的意义在于每一个mutation执行完成后可以对应到一个新的状态，这样devtools可以打一个快照下来
模块化
- 如果使用单一状态树，应用的所有的状态都会集中到一个较大的对象，所以Vuex允许我们将store分割成模块
- 每个模块都可以有自己的state、mutation、action、getter、甚至是嵌套子模块
命名空间：
-  默认情况下，模块内部的action、mutation和getter是注册在全局命名空间的，这样使得模块能够对同一mutation或action作出相应
- 如果希望你的模块具有更高的封装度和复用性，可以通过添加namespaced：true的方式使其成为带命名空间的模块
- 当模块被注册后，它的所有getter、action及mutation都会自动根据模块注册的路径调整命名
## keep-alive
- 用keep-alive包裹动态组件时，可以实现组件缓存，当组件切换时不会对当前组件进行卸载
- keep-alive中还运用了LRU算法，选择最近最久未使用的组件予以淘汰
实现原理
- 在vue的生命周期中，用keep-alive包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行deactivated钩子函数，命中缓存渲染后会执行actived钩子函数
两个属性include/exclude
- include 字符串或正则表达式。只有名称匹配的组件会被缓存
- exclude 字符串或正则表达式。任何名称匹配的组件都不会被缓存
## NextTick
- $nextTick可以让我们在下次DOM更新结束之后执行回调，用于获得更新后的DOM
- 使用场景在于响应式数据变化后想获取DOM更新后的情况
原理
- 本质上是对事件循环原理的一种应用，主要使用了宏任务和微任务，采用微任务优先的方式执行nextTick包装的函数
- 根据不同环境为了兼容做了很多降级处理
- 2.6版本降级处理：Promise -> MutationObserver > setImmediate > setTimeout
Vue的异步更新策略原理
- Vue的DOM更新是异步的，当数据变化时，Vue会开启一个队列，然后把同一个事件循环中观察到的数据变化watcher推进到这个队列
- 同时如果这个watcher被触发多次，只会被推送到队列一次
- 而在下一个事件循环时，Vue会清空这个队列，并进行必要的DOM更新
- 这也是响应式数据for循环改变了100次视图也只更新一次的原因
## Vue-router路由
前端路有的本质就是监听URL的变化，然后匹配路由规则，显示相应的页面，并且无需刷新页面
- hash模式：在浏览器中符号以#以及#后面的字符称之为hash，用window.location.hash读取；特点：hash虽然在URL中，但不被包括在HTTP请求中；用来指导浏览器动作，对服务器安全无用，hash不会重载页面
- history模式：history采用HTML5的新特性；且提供了两个新方法：pushState()、replaceState()可以对浏览器历史记录栈进行修改，以及popState事件监听到状态变更
路由钩子函数
- 全局守卫：beforeEach进入路由之前、beforeResolve、afterEach
- 路由独享守卫：beforeEnter
- 路由组件内的守卫：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave
路由跳转
- vue-router导航有两种方式：声明式导航和编程式导航
- 声明式跳转就是使用router-link组件 添加:to=属性的方式
- 编程式跳转就是router.push
路由传参
- 使用query方法传入的参数使用this.$route.query接收
- 使用params方式传入的参数使用this.$route.params接收
动态路由
- 动态路径参数 以冒号开头
extend原理
- Vue.extend作用是拓展组件生成一个构造器，它接受一个组件对象，使用原型继承的方法返回了Vue的子类，并且传入的组件options和父类的options进行了合并；通常会与$mount一起使用
- 我们使用extend可以将组件转换为构造函数，在实例化这个构造函数后，就会得到组件的真实DOM，这个时候就可以使用$mount挂载到DOM上
```js
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')
```
## Vue style scoped
scoped 可以让CSS的样式只在当前组件生效
vue-loader构建时会动态给scoped CSS块与相应的template标签加上随机哈希串
## Vue自定义指令
可以用来做权限控制、按钮防抖节流、图片按需加载
自定义指令的钩子函数
- bind：只调用一次，可以进行一次性的初始化设置
- inserted：被绑定元素插入父节点时调用
- update：被绑定与元素所在的模版更新时调用
- componentUpdated：被绑定元素所在模版完成一次更新周期时调用
- unbind：只调用一次，指令与元素解绑时调用
Vue3指令的钩子函数
- created：已经创建出元素，但在绑定元素attributes之前触发
- beforeMount：元素插入到页面之前
- mounted：父元素以及父元素下的所有子元素都插入到页面之后
- beforeUpdate： 绑定元素的父组件更新前调用
- updated：在绑定元素的父组件以及他自己的所有子节点都更新后调用
- beforeUnmount：绑定元素的父组件卸载前调用
- unmounted: 绑定元素的父组件卸载后
- 指令回调中的传递的四个参数：绑定指令节点元素；绑定值 里面包含表达式、修饰符、参数等；当前vnode；变更前的vnode值
为什么vue中data必须是一个函数
- 对象是引用类型，如果data是一个对象，当重用组件时，都指向同一个data，会相互影响
- 而使用返回对象的函数，由于咩次返回都是一个新对象，引用地址不同，则不会出现这个问题
data什么时候可以使用对象
当我们使用new Vue()的方式的时候，无论我们将data设置为对象还是函数都是可以的，因为new Vue()的方式时生成一个根组件，该组件不会复用，也就不存在共享data的情况了
vue-loader是什么 使用它的用途有哪些
- 使用处理单文件的webpack，有了它之后我们可以把代码分割为 tempate、script、style三个语言块
- webpack打包时，会以loader的方式调用vue-loader
- vue-loader被执行时，它会对SFC中的每个语言块用单独的loader处理。最后将这些单独的块状配成最终的组件模块
Vue delete原理
- 先判断是否为数组，如果是数组就调用splice
- 然后判断target对象有这个属性的化，就delete删除这个属性
- 还要判断是否是响应式，如果是就需要通知视图更新
Vue中的ref是什么
ref被用来给元素或子组件注册引用信息。引用信息将会注册载父组件的$refs上。如果是在普通的DOM元素上使用，引用指向的就是DOM元素；如果用在子组件上，引用指向组件实例
new Vue()做了什么
- 合并配置
- 初始化生命周期
- 初始化事件
- 初始化render函数
- 调用beforecreate钩子函数
- 初始化state 包括data、props、computed
- 调用created钩子函数
- 然后按照生命周期 调用vm.$mount挂载渲染
## 虚拟dom原理，作用
作用：减少了真实DOM中多次回流重绘引起的性能损耗

## diff算法是基于什么算法实现的，原理

## Vue组件传值方式 兄弟组件传值

## nexttick实现原理

## keep-alive动态组件

## vue-router实现原理 

## slot是什么？有什么用？原理是什么

## 过滤器的作用，如何实现一个过滤器

## 如何保存页面的当前状态

## v-if、v-html、v-show的原理

## 单页应用和多页应用的区别

## Vue模版编译原理

## Vue的性能优化

## 单页应用的优缺点

## Vue的优点

## assets和static的区别

## 如何定义动态路由？如何获取传过来的动态参数

## Vue-router跳转和location.href有什么区别

## Vue钩子有哪些

## Vuex的严格模式是什么,有什么作用，如何开启

## 为什么 Vuex 的 mutation 中不能做异步操作

## 虚拟DOM真的比真实DOM性能好吗
