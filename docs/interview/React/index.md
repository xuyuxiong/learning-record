# React
## React事件机制
[React事件机制](https://blog.csdn.net/qq_43539854/article/details/125209305)
react基于浏览器的事件机制实现了一套自己的事件机制，包括事件注册、事件合成、事件冒泡、事件触发等
- 事件代理
react的事件并没有绑定到具体的dom节点上，而是绑定到了document上，然后由统一的事件监听器去监听事件的触发
在内部维护了映射表来记录事件与组件的事件函数的对应关系。当某个事件触发时，react根据映射表将事件分派给指定的事件处理函数。当一个组件挂载与卸载时，相应的事件处理函数会自动被添加到事件监听器的内部映射表中或从表中删除。这样简化了事件处理和回收机制，效率也提升很大
- 合成事件
合成事件是react模拟DOM事件的一个事件对象，这些合成事件并没有绑定到对应的真实DOM上，而是通过事件代理的方式，将所有的事件绑定到docuemnt上。优点如下：
1. 兼容所有浏览器，兼容性好
2. 方便React进行统一管理和进行事件处理。对于原生事件来说，浏览器会监听事件是否被触发，当事件触发时会创建一个事件对象，当多个事件被触发时就会创建多个事件对象，这样存在内部分配的问题。对于合成事件来说，有一个专门事件池来管理事件的创建和销毁，当需要使用事件时，就会在事件池中复用对象，事件回调结束后，再销毁事件对象上的属性，以便下次再复用对象。这样就不会为每个事件都创建一个事件对象，减少内存的消耗，提升 性能。
SyntheticEvent是React合成事件的基类，定义了合成事件的公共属性和方法
- 合成事件原理
1. 当用户在为onClick添加函数时，React并没有将click绑定到dom上
2. 在document处监听所有支持的事件，当事件发生并冒泡至document处时，react将事件内容交给中间层syntheticEvent
3. 然后使用统一分发函数dispatch将封装的事件内容交由真正的处理函数执行
- 存储事件
react为了在触发事件时可以查到对应的回调去执行，会把组件内的所有事件存放到一个对象。根据事件类型分类存储，例如click事件相关的统一存储到一个对象中，回调函数的存储采用键值对的形式，可以
代表组件的唯一标识，value对应的事件的回调函数。
react把所有事件和事件类型以及react组件进行了关联，在事件触发的时候根据当前的组件id与事件类型找到对应的回调函数
- 事件注册的关键步骤
1. 首先react生成要挂载的组件的虚拟DOM
2. 然后处理组件的props，判断props内是否有声明为事件的属性比如onclick, onChange,这个时候得到事件类型click,change和对应的事件处理程序fn
3. 将这些事件在document上注册
4. 在组件挂载完成后，将事件处理函数存储到listenerBank中
- 事件触发
React的事件触发只会发生在DOM事件流的冒泡阶段，因为在document上注册时就默认是在冒泡阶段被触发执行；大致流程如下：
1. 触发事件，开始DOM事件流；事件捕获阶段、处于目标阶段、事件冒泡阶段
2. 当事件冒泡document时，触发统一的事件回调函数reactEventListener.dispatchEvent
3. 根据原生事件对象找到事件触发节点对应的组件
4. 开始事件的合成
  - 根据当前事件类型生成指定的合成对象
  - 封装原生事件和冒泡机制
  - 查找当前元素以及它所有父级
  - 在listenerBank查找事件回调并合成到event
- dispatchEvent进行事件触发
当我们点击child div时，会同时触发father的click事件
在点击了child div时，浏览器会捕获到这个事件，然后经过冒泡，事件被冒泡到document上，交给统一事件处理函数dispatchEvent对事件进行分发，根据之前在listenerBank存储的键值对找到触发事件的组件，获取到触发这个事件的元素，遍历这个元素的所有父元素，依次对每一级元素进行处理。构成合成事件，将每一级的合成事件存储在eventQueue事件队列中，然后匹狼执行存储的回调函数
- react事件的执行顺序
事件的执行顺序为原生事件先执行，合成事件再执行。合成事件会冒泡到document上，所以尽量避免原生事件和合成事件混用。如果原生事件阻止冒泡，那么就会导致合成事件不执行。
- react事件阻止冒泡的方式
react合成事件不能直接采用return false的方式来阻止浏览器的默认行为，必须明确调用event.preventDefault()来阻止默认行为。
不能使用event.preventDefault()来阻止默认行为。
不能使用event.stopPropagation()来阻止react事件冒泡，必须调用event.preventDefault()来阻止react事件冒泡。
- 合成事件与原生事件的区别
1. 写法不同。原生事件采用全部小写，react事件采用小驼峰
2. 事件函数处理语法不同。原生事件使用字符串定义事件，react使用函数的形式
3. 阻止冒泡的方式不同。原生事件可以通过return false或event.stopPropagation()来阻止冒泡；react事件只能通过event.preventDefault()
- 事件处理函数中的event能否异步访问
不能。在包含回调函数的当前事件循环执行完后。所有的event属性都会失效
- 所有的原生事件都有对应的合成事件吗
不是。几乎所有事件都代理到document上，比如audio、video标签的媒体事件时document所不具有。这些事件只能够在这些标签上进行事件代理，但依旧用统一的入口分发函数进行绑定
## React的事件和普通的HTML事件有什么不同

## 组件中怎么做事件代理?它的原理是什么

## 可以在render访问refs吗？为什么
不可以，render阶段ODM还没有生成，无法获取DOM
## 对React的插槽(Portals)的理解,如何使用，有哪些场景
Portal使得组件可以脱离父组件层级挂载在DOM树的任何位置
第一个参数child可以是可渲染的react子项，比如元素、字符串或者片段
第二个参数container是一个DOM元素
典型的应用场景：当父组件具有over:hidden或者z-index的样式设置是，组件可能被其他元素遮挡，这是可以考虑使用Portal组件挂载脱离父组件，例如：对话框、模态窗
## React中如何避免不必要的render
在React类组件中可以利用shouldComponentUpdate或者PureComponent来减少因父组件更新而触发子组件的render
## 什么是context 为什么不推荐优先使用Context
Context提供了一个无需为每层组件手动添加props就能在组件树间进行数据传递的方法。
Context主要应用场景在于很多不同层级的组件需要访问同样的数据，专门使用会让组件的复用性变差。
## 什么是受控组件和非受控组件
受控组件：没有维持自己的状态；数据由父组件控制；通过props获取当前值，然后通过回调通知更改
非受控组件：保持自己的状态；数据由DOM控制；Refs用于获取当前值
## refs的作用，应用场景
Refs是React提供的用来保存object引用的一个解决方案，在函数式组件使用useRef创建一个ref对象，ref对象存在一个可直接修改的current属性，内容都是存在current上。
使用场景主要分为两个方向，其一是实现DOM访问与操作，其二是在两次render之间传递数据内容
## React.forwardRef是什么？它有什么用
React.forwardRef 会创建一个React组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中
refs转发
## 类组件和函数组件的异同
1. 类组件有生命周期，函数组件没有
2. 类组件需要继承Class，函数组件不需要
3. 类组件可以获取实例化的this，并且基于this做各种操作
4. 类组件内部可以定义维护state，函数组件需要通过hooks实现
函数组件相比类组件更轻量灵活，便于逻辑的拆分复用
## setState的调用原理，调用之后发生了什么 是同步还是异步
调用setState函数之后，React会将传入的参数对象与组件当前的状态合并，然后触发调和过程，重新渲染整个UI界面
默认是异步的，为了性能优化、减少渲染次数
异步：在React可以控制的地方，比如React生命周期和合成事件中
同步：在React无法控制的地方，比如原生事件、setTimeout、setInterval
## setState批量更新的过程是什么

## React中有使用过getDefaultProps吗？它有什么作用
createReactClass 参数对象内的一个方法，用于初始化组件属性
## React中setState的第二个参数作用是什么
setState 的第二个参数：当 callback 为一个函数，函数执行上下文中可以获取当前 setState 更新后的最新 state 的值，可以作为以来 state 变化的副作用函数，可以 用来做一些基本的 DOM 操作等。
## 组件的通信方式
- 父组件向子组件传递: props
- 子组件向父组件传递: 父组件向子组件传一个函数，然后通过这个函数的回调，拿到子组件传过来的值
- 兄弟组件之间的通信: 状态提升，在公共的父组件中进行状态定义
- 父组件向后代组件传递: React.createContext创建一个context进行组件传递
- 非关系组件传递: redux
## React-router的实现原理
[react-router路由原理](https://juejin.cn/post/6886290490640039943)
## React-router怎么设置重定向
在V6版本中，可以使用Navigate组件
## React-router的路由模式
history模式、hash模式
## Redux的原理
[一文读懂 Redux 原理](https://zhuanlan.zhihu.com/p/596500430)
## bindActionCreator
```js
export default function bindActionCreator(actions, dispatch) {
  let newActions = {}
  for(let key in actions) {
    newActions[key] = () => dispatch(actions[key].apply(null, arguments))
  }
  return newActions
}
```

## combineReducers
```js
export default combineReducers = reducers => (state = {}, action) => Object.keys(reducers).reduce((currentState, key) => {currentState[key] = reducers[key](state[key], action); 
return currentState;
}, {})
```

## createStore
```js
export default function createStore(reducer, enhander) {
  if (typeof enhancer !== 'undefined') {
    return enhander(createStore)(reducer)
  }
  let state = null
  const listeners = []
  const subscribe = listenner => {
    listeners.push(listener)
  }
  const getState = () => state
  const dispatch = action => {
    state = reducer(state, action)
    listeners.forEach(listener => listenr())
  }
  dispatch({})
  return { getState, dispatch, subscribe }
}
```
## applyMiddleware
```js
export default function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer)
    let dispatch = store.dispatch
    let chain = []

    const middlewareAPI = {
      getState: store.getState,
      dispatch: action => dispatch(action)
    }
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}
```

## Redux中异步请求怎么处理

## Redux中间件是什么？接受几个参数？

## mobox和redux的区别

## redux和Vuex的区别，它们的共同思想
[](https://blog.csdn.net/hyqhyqhyqq/article/details/128878458)
## 中间件怎么拿到store和action？然后怎么处理

## redux的connect有什么作用

## 对React hooks的理解
解决长时间使用和维护react过程中遇到的问题
- 难以重用和共享组件中的与状态相关的逻辑
- 逻辑复杂的组件难以开发与维护
- 类组件中的this增加学习成本
## React 的实现原理

## React Hook的实现原理
Hooks的基本类型
```ts
type Hooks = {
  memoizedState: any, // 指向当前渲染节点 Fiber
  baseState: any, // 初始化 initialState， 已经每次 dispatch 之后 newState
  baseUpdate: Update<any> | null, // 当前需要更新的 Update ，每次更新完之后，会赋值上一个 update，方便 react 在渲染错误的边缘，数据回溯
  queue: UpdateQueue<any> | null, // UpdateQueue 通过
  next: Hook | null, // link 到下一个 hooks，通过 next 串联每一 hooks
};

type Effect = {
  tag: HookEffectTag, // effectTag 标记当前 hook 作用在 life-cycles 的哪一个阶段
  create: () => mixed, // 初始化 callback
  destroy: (() => mixed) | null, // 卸载 callback
  deps: Array<mixed> | null,
  next: Effect, // 同上
};
```
React Hooks 全局维护了一个 workInProgressHook 变量，每一次调取 Hooks API 都会首先调取 createWorkInProgressHooks 函数。
```js
function createWorkInProgressHook() {
  if (workInProgressHook === null) {
    // This is the first hook in the list
    if (firstWorkInProgressHook === null) {
      currentHook = firstCurrentHook;
      if (currentHook === null) {
        // This is a newly mounted hook
        workInProgressHook = createHook();
      } else {
        // Clone the current hook.
        workInProgressHook = cloneHook(currentHook);
      }
      firstWorkInProgressHook = workInProgressHook;
    } else {
      // There's already a work-in-progress. Reuse it.
      currentHook = firstCurrentHook;
      workInProgressHook = firstWorkInProgressHook;
    }
  } else {
    if (workInProgressHook.next === null) {
      let hook;
      if (currentHook === null) {
        // This is a newly mounted hook
        hook = createHook();
      } else {
        currentHook = currentHook.next;
        if (currentHook === null) {
          // This is a newly mounted hook
          hook = createHook();
        } else {
          // Clone the current hook.
          hook = cloneHook(currentHook);
        }
      }
      // Append to the end of the list
      workInProgressHook = workInProgressHook.next = hook;
    } else {
      // There's already a work-in-progress. Reuse it.
      workInProgressHook = workInProgressHook.next;
      currentHook = currentHook !== null ? currentHook.next : null;
    }
  }
  return workInProgressHook;
}
```
假设我们需要执行以下 hooks 代码：
```js
function FunctionComponet() {

  const [ state0, setState0 ] = useState(0);
  const [ state1, setState1 ] = useState(1);
  useEffect(() => {
  	document.addEventListener('mousemove', handlerMouseMove, false);
    ...
    ...
    ...
    return () => {
      ...
      ...
      ...
    	document.removeEventListener('mousemove', handlerMouseMove, false);
    }
  })

  const [ satte3, setState3 ] = useState(3);
  return [state0, state1, state3];
}
```
当我们了解 React Hooks 的简单原理，得到 Hooks 的串联不是一个数组，但是是一个链式的数据结构，从根节点 workInProgressHook 向下通过 next 进行串联。这也就是为什么 Hooks 不能嵌套使用，不能在条件判断中使用，不能在循环中使用。否则会破坏链式结构。
## React hooks的优缺点
优点：代码复用；代码量更少；
缺点：响应式useEffect
## React hooks解决了哪些问题

## React hooks的使用限制

## useEffect与useLayoutEffect的区别
相同点：
- 处理副作用：函数组件内不允许操作副作用。比如改变DOM、设置订阅、操作定时器
- 底层都是调用mountEffectImpl方法，基本上可以替换使用
不同点：
- useEffect在像素变化之后异步调用，改变屏幕内容可能会造成页面的闪烁
- useLayoutEffect在像素变化之前同步调用，可能会造成页面延迟显示，但是不会闪烁。主要用于处理DOM操作，调整样式，避免大量计算，从而避免造成阻塞
- useLayoutEffect先于useEffect执行
## jsx为什么能在js里写html代码，最后是怎么处理和编译的
SX会先经过babel的预编译和解析,然后将结果通过React.createElement完成替换，而React.createElement则创建成一个个的reactElement，而这些reactElement本质上是JavaScript对象，包含了节点的所有信息，后续会经过一系列的加工和调度渲染到网页上。
## React hooks如何实现组件销毁

## React相比Vue的优势，什么场景下使用Vue
如果您想要一个轻量级，更快速，更现代的UI库来制作一流的SPA（单页面应用程序），您应该选择Vue.js. 对于习惯使用HTML的开发人员来说，这是有利的
React适用于大规模应用程序和移动应用程序，包含许多用例，解决方案，资源和项目
## 了解useReducer吗

## useRef/ref/forwardsRef的区别是什么

## 实现自定义hooks,usePrevious
```js
import React, {useEffect, useRef} from 'react'

export default function usePrevious(value) {
  const previous = useRef(value)
  useEffect(() => {
    previous.current = value
  }, [value])
  return previous.current
}
```

## umi约定式路由实现原理

## fib实现，如何优化

## React的特性有哪些
- 组件化
- 数据驱动视图
- JSX语法
- 单向数据绑定
- 虚拟DOM
- 声明式编程
## 为什么提出JSX
JSX是JS的语法拓展，主要用于声明元素，可以理解为React.createElement()的语法糖
React认为视图和逻辑内在耦合，并没有采用将视图与逻辑分离到不同文件的这种人为的分离方式。
## Babel插件是如何实现JSX到JS的编译
需要的依赖：
- @babel/cli
- @babel/core
- babel/preset-react
babel读取代码并解析，生成AST，再将AST出入插件层进行转化，在转换时就可以将JSX的结构转换为React.createElement的函数
```js
export function createElement(type, config, children) {
    // propName 变量用于储存后面需要用到的元素属性
    let propName;
    // props 变量用于储存元素属性的键值对集合
    const props = {};
    // key、ref、self、source 均为 React 元素的属性，此处不必深究
    let key = null;
    let ref = null;
    let self = null;
    let source = null;

    // config 对象中存储的是元素的属性
    if (config != null) {
        // 进来之后做的第一件事，是依次对 ref、key、self 和 source 属性赋值
        if (hasValidRef(config)) {
            ref = config.ref;
        }
        // 此处将 key 值字符串化
        if (hasValidKey(config)) {
            key = '' + config.key;
        }

        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source;

        // 接着就是要把 config 里面的属性都一个一个挪到 props 这个之前声明好的对象里面
        for (propName in config) {
            if (
                // 筛选出可以提进 props 对象里的属性
                hasOwnProperty.call(config, propName) &&
                !RESERVED_PROPS.hasOwnProperty(propName)
            ) {
                props[propName] = config[propName];
            }
        }
    }
    // childrenLength 指的是当前元素的子元素的个数，减去的 2 是 type 和 config 两个参数占用的长度
    const childrenLength = arguments.length - 2;
    // 如果抛去type和config，就只剩下一个参数，一般意味着文本节点出现了
    if (childrenLength === 1) {
        // 直接把这个参数的值赋给props.children
        props.children = children;
        // 处理嵌套多个子元素的情况
    } else if (childrenLength > 1) {
        // 声明一个子元素数组
        const childArray = Array(childrenLength);
        // 把子元素推进数组里
        for (let i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
        }
        // 最后把这个数组赋值给props.children
        props.children = childArray;
    }

    // 处理 defaultProps
    if (type && type.defaultProps) {
        const defaultProps = type.defaultProps;
        for (propName in defaultProps) {
            if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
            }
        }
    }

    // 最后返回一个调用ReactElement执行方法，并传入刚才处理过的参数
    return ReactElement(
        type,
        key,
        ref,
        self,
        source,
        ReactCurrentOwner.current,
        props,
    );
}
// createElement并没有十分复杂的操作，整个过程看起来更像是一个格式化的过程：将我们输入的相对简单清晰的结构转化为ReactElement函数需要的格式
const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    // REACT_ELEMENT_TYPE是一个常量，用来标识该对象是一个ReactElement
    $$typeof: REACT_ELEMENT_TYPE,

    // 内置属性赋值
    type: type,
    key: key,
    ref: ref,
    props: props,

    // 记录创造该元素的组件
    _owner: owner,
  };
  // 
  if (__DEV__) {
    // 这里是一些针对 __DEV__ 环境下的处理，对于大家理解主要逻辑意义不大，此处我直接省略掉，以免混淆视听
  }
  return element;
};
```
## React生命周期
- 挂载阶段
调用顺序：constructor()、static getDerivedStateFromProps()、render()、componentDidMount()
- 更新阶段
static getDerivedStateFromProps()、shouldComponentUpdate()、render()、getSnapshotBeforeUpdate()、componentDidUpdate()
- 卸载
componentWillUnmount()
- 错误处理
static getDerivedStateFromError()
componentDidCatch()
## react的事件机制
react实现了一套自己的事件机制，包括事件注册、事件合成、事件冒泡、事件派发等。
合成事件是React模拟原生DOM事件所有能力的一个事件对象，想要获取原生DOM事件可以通过e.nativeEvent属性获取
- 和原生事件的区别
事件名称命名方式不同，React采用小驼峰格式
事件处理函数书写方式不同，React采用{}
```js
const handleClick = (e) => console.log(e.nativeEvent);;
const button = <button onClick={handleClick}>按钮</button>
```
虽然onclick看似绑定到DOM元素上，但实际并不会把事件代理函数直接绑定到真实的节点上，而是把所有的事件绑定到结构的最外层，使用一个统一的事件去监听。这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象。
所以想要阻止不同时间段的冒泡行为，对应使用不同的方法
- 阻止合成事件间的冒泡，用e.stopPropagation()
- 阻止合成事件与最外层 document 上的事件间的冒泡，用e.nativeEvent.stopImmediatePropagation()
- 阻止合成事件与除最外层document上的原生事件上的冒泡，通过判断e.target来避免
## diff
根Vue一致，React通过引入虚拟DOM的概念，极大地避免无效DOM操作，使我们的页面的构建效率的得到了极大的提升
React中diff算法主要遵循三个层级的策略
- tree层级
DOM节点跨层级的操作不做优化，只会对相同层级的节点进行比较
只有删除、创建操作 没有移动操作
- component层级
如果是同一个类的组件，则会继续往下diff运算，如果不是同一个类的组件，那么直接删除这个组件的所有子节点，创建新的
- element层级
对于比较同一个层级的节点，每个节点在对应的层级用唯一的key作为标识
提供了三种操作，分别为插入、移动和删除
通过key可以准确的发现新旧集合中的节点都是相同的节点，因此无需进行节点删除和创建，只需要将旧集合中节点的位置进行移动，更新为新集合中节点的位置
由于dom节点的移动操作开销是比较昂贵的，在只修改文本的情况下，没有key的情况下要比有key的性能更好
## 对Fiber架构的理解，解决了什么问题
在 React15 以前 React 的组件更新创建虚拟 DOM 和 Diff 的过程是不可中断，如果需要更新组件树层级非常深的话，在 Diff 的过程会非常占用浏览器的线程，而我们都知道浏览器执行JavaScript 的线程和渲染真实 DOM 的线程是互斥的，也就是同一时间内，浏览器要么在执行 JavaScript 的代码运算，要么在渲染页面，如果 JavaScript 的代码运行时间过长则会造成页面卡顿。
基于以上原因 React 团队在 React16 之后就改写了整个架构，将原来数组结构的虚拟DOM，改成叫 Fiber 的一种数据结构，基于这种 Fiber 的数据结构可以实现由原来不可中断的更新过程变成异步的可中断的更新。
- 如何解决
Fiber把渲染更新过程拆分成多个子任务，每次只做一小部分，做完看是否还有剩余时间，如果有继续下一个任务；如果没有，挂起当前任务，将时间控制权交给浏览器（浏览器可以进行渲染），等浏览器不忙的时候再继续执行
即可以中断与恢复，恢复后也可以复用之前的中间状态，并给不同的任务赋予不同的优先级，其中每个任务更新单元为 React Element 对应的 Fiber节点
## 性能优化手段
- 避免不必要的render
- 使用Immutable
- 避免使用内联函数
- 懒加载组件
## Redux三大基本原则
- 单一数据源
- state是只读的
- 使用纯函数来执行修改
## Redux和Vuex的异同点
相同点：
- state共享数据
- 流程一致：定义全局state，触发修改方法，修改state
- 全局注入store
不同点：
- redux使用的是不可变数据，Vuex是可变的
- redux每次都是用新的state替换旧的state，Vuex是直接修改
- redux在检测数据变化时是通过diff算法比较差异的；Vuex是通过getter/setter来比较的
vuex的mapGetters可以快捷得到state，redux中是mapStateToProps
vuex同步使用mutation，异步使用action；redux同步异步都使用reducer
## useState 怎么做缓存的

## useReducer 比 redux 好在哪里

## Class组件和React Hook的区别

## 高阶函数和自定hook的优缺点

## useState和useEffect的运行原理

## 如何发现重渲染？什么原因容易造成重渲染？如何避免

## useEffect如何监听数组依赖项的变化

## React中如何识别一个表单项里的表单做到了最小力度/代码的渲染

##  为什么不能在循环/条件语句中执行
和类组件存储state不同，React并不知道我们调用了几次useState，对hooks的存储是按顺序的(参见Hook结构)，一个hook对象的next指向下一个hooks。
所以如果把hook1放到一个if语句中，当这个没有执行时，hook2拿到的state其实是上一次hook1执行后的state（而不是上一次hook2执行后的）。这样显然会发生错误。
## 为什么只能在函数组件中使用hooks
只有函数组件的更新才会触发renderWithHooks函数，处理Hooks相关逻辑。
还是以setState为例，类组件和函数组件重新渲染的逻辑不同 ：
类组件： 用setState触发updater，重新执行组件中的render方法
函数组件： 用useState返回的setter函数来dispatch一个update action，触发更新(dispatchAction最后的scheduleWork)，用updateReducer处理更新逻辑，返回最新的state值(与Redux比较像)
##  useState整体运作流程
初始化： 构建dispatcher函数和初始值
更新时：

调用dispatcher函数，按序插入update(其实就是一个action)
收集update，调度一次React的更新
在更新的过程中将ReactCurrentDispatcher.current指向负责更新的Dispatcher
执行到函数组件App()时，useState会被重新执行，在resolve dispatcher的阶段拿到了负责更新的dispatcher。
useState会拿到Hook对象，Hook.query中存储了更新队列，依次进行更新后，即可拿到最新的state
函数组件App()执行后返回的nextChild中的count值已经是最新的了。FiberNode中的memorizedState也被设置为最新的state
Fiber渲染出真实DOM。更新结束。