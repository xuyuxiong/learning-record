# LeetCode
接雨水
字符串中的第一个唯一字符(387)
有效的字母异同词(242)
多数元素(169)
罗马数字转整数(13)
最长公共前缀(14)
杨辉三角(118)
买卖股票的最佳时机(121,122)
移动零(283)
反转字符串(344)
两个数组的交集(350)
有序矩阵中第K小的元素(378)
有效的数独(36)
外观数列(38)
全排列(46)
字母异位分组(49)
电话号码的字符组合(17)
两数相除(29)
至少有K个重复字符的最长子串(395)

## 全排列 46
```js
const _permute = string => {
  const result = []
  const map = new Map()
  const dfs = path => {
    if (path.length === string.length) {
      result.push(path)
      return;
    }
    for(let i = 0; i < string.length; i++) {
      if (map.get(string[i])) continue;
      map.set(string[i], true)
      path += string[i]
      dfs(path)
      path = path.substring(0, path.length - 1)
      map.set(string[i], false)
    }
  }
  dfs('')
  return result
}

```


## 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。 有效字符串需满足：左括号必须用相同类型的右括号闭合。左括号必须以正确的顺序闭合。

```js
const isValid = (s) => {
  const leftToRight = {
    "{": "}",
    "[": "]",
    "(": ")",
  };
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const str = s[i];
    if (leftToRight[str]) {
      stack.push(str);
    } else if (!stack.length || stack[stack.pop()] !== str) {
      return false;
    }
  }
  return stack.length === 0;
};
```

## 深度优先遍历

深度优先遍历 DFS 和树的先序遍历比较类似
假设初始状态时图中所有顶点均未被访问，则从某个顶点 v 出发，首先访问该顶点然后依次从它的各个未被访问的邻接点出发深度优先搜索遍历图，直至图中所有和 v 有路径相通的顶点都被访问到。若此时有其他顶点未被访问到，则另选一个未被访问到的顶点作为起始点，重复上过程直至所有顶点均被访问为止。

```js
// 深度优先遍历的三种方式
let deepTraversal1 = (node, nodeList = []) => {
  if (node !== null) {
    nodeList.push(node);
    let children = node.children;
    for (let i = 0; i < children.length; i++) {
      deepTraversal1(chidren[i], nodeList);
    }
  }
  return nodeList;
};
let deepTraversal2 = (node) => {
  let nodes = [];
  if (node !== null) {
    nodes.push(node);
    let children = node.chidren;
    for (let i = 0; i < children.length; i++) {
      nodes = nodes.concat(deepTraversal2(children[i]));
    }
  }
  return nodes;
};
// 非递归
let deepTraversal3 = (node) => {
  let stack = [];
  let nodes = [];
  if (node) {
    stack.push(node);
    while (stack.length) {
      const item = stack.pop();
      const children = item.children;
      nodes.push(item);
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i])
      }
    }
  }
  return nodes;
};
```

广度优先遍历 BFS
从图中某顶点 v 出发，在访问了 v 之后依次访问 v 的各个未曾访问过的邻接点，然后分别从这些邻接点出发依次访问它们的邻接点，并使得先被访问的顶点的邻接点先于后被访问的顶点的邻接点被访问，直至图中所有已被访问的顶点的邻接点都被访问到。如果此时图中尚有顶点未被访问，则需要另选一个未被访问到的顶点作为新的起始点，重复上述过程，直至图中所有顶点都被访问到为止。

```js
let widthTraversal2 = (node) => {
  let nodes = [];
  let stack = [];
  if (node) {
    stack.push(node);
    while (stack.length) {
      let item = stack.shift();
      let children = item.children;
      nodes.push(item);
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i]);
      }
    }
  }
  return nodes;
};
```

图是一种复杂的非线性结构，它有边(Edge)和顶点(Vertex)组成。一条边连接的两个点为相邻顶点。
图分为有向图和无向图
图的表示一般有以下两种：
邻接矩阵：使用二维数组来表示点与点之间是否有边，如 arr[i][j] = 1 表示节点 i 和节点 j 之间有边，arr[i][j] = 0 表示节点 i 和节点 j 之间没有边
邻接表：邻接表是图的一种链式存储结构，这种结构类似于树的子链表，对于图中的每一个顶点 vi，把所有邻接与 vi 的顶点 vj 链成一个单链表，单链表一般由数组或字典结构表示
创建图
Vertex 用数组结构表示 Edge 用 map 结构表示

```js
function Graph() {
  this.vertices = []; // 顶点集合
  this.edges = new Map(); // 边集合
}
Graph.prototype.addVertex = function (v) {
  this.vertices.push(v);
  this.edges.set(v, []);
};
Graph.prototype.addEdge = function (v, w) {
  let vEdge = this.edges.get(v);
  vEdge.push(w);
  let wEdge = this.edges.get(w);
  wEdge.push(v);
  this.edges.set(v, vEdge);
  this.edges.set(w, vEdge);
};
Graph.prototype.toString = function () {
  var s = "";
  for (var i = 0; i < this.vertices.length; i++) {
    s += this.vertices[i] + " -> ";
    var neighors = this.edges.get(this.vertices[i]);
    for (var j = 0; j < neighors.length; j++) {
      s += neighors[j] + " ";
    }
    s += "\n";
  }
  return s;
};
// 测试
var graph = new Graph();
var vertices = [1, 2, 3, 4, 5];
for (var i = 0; i < vertices.length; i++) {
  graph.addVertex(vertices[i]);
}
graph.addEdge(1, 4); //增加边
graph.addEdge(1, 3);
graph.addEdge(2, 3);
graph.addEdge(2, 5);

console.log(graph.toString());
// 1 -> 4 3
// 2 -> 3 5
// 3 -> 1 2
// 4 -> 1
// 5 -> 2
```

图的遍历
两种遍历算法

- 深度优先遍历
  深度优先遍历（Depth-First-Search），是搜索算法的一种，它沿着树的深度遍历树的节点，尽可能深地搜索树的分支。当节点 v 的所有边都已被探寻过，将回溯到发现节点 v 的那条边的起始节点。这一过程一直进行到已探寻源节点到其他所有节点为止，如果还有未被发现的节点，则选择其中一个未被发现的节点为源节点并重复以上操作，直到所有节点都被探寻完成。

简单的说，DFS 就是从图中的一个节点开始追溯，直到最后一个节点，然后回溯，继续追溯下一条路径，直到到达所有的节点，如此往复，直到没有路径为止。

DFS 可以产生相应图的拓扑排序表，利用拓扑排序表可以解决很多问题，例如最大路径问题。一般用堆数据结构来辅助实现 DFS 算法。

注意：深度 DFS 属于盲目搜索，无法保证搜索到的路径为最短路径，也不是在搜索特定的路径，而是通过搜索来查看图中有哪些路径可以选择。
步骤：

1. 访问顶点 v
2. 依次从 v 的未被访问的邻接点出发，对图进行深度优先遍历；直至图中和 v 有路径相通的顶点都被访问
3. 若此时途中尚有顶点未被访问，则从一个未被访问的顶点出发，重新进行深度优先遍历，直到所有顶点均被访问过为止
   实现：

```js
Graph.prototype.dfs = function () {
  var marked = [];
  for (var i = 0; i < this.vertices.length; i++) {
    if (!marked[this.vertices[i]]) {
      dfsVisit(this.vertices[i]);
    }
  }

  function dfsVisit(u) {
    let edges = this.edges;
    marked[u] = true;
    console.log(u);
    var neighbors = edges.get(u);
    for (var i = 0; i < neighbors.length; i++) {
      var w = neighbors[i];
      if (!marked[w]) {
        dfsVisit(w);
      }
    }
  }
};
// 测试
graph.dfs();
```

- 广度优先遍历
  广度优先遍历（Breadth-First-Search）是从根节点开始，沿着图的宽度遍历节点，如果所有节点均被访问过，则算法终止，BFS 同样属于盲目搜索，一般用队列数据结构来辅助实现 BFS

BFS 从一个节点开始，尝试访问尽可能靠近它的目标节点。本质上这种遍历在图上是逐层移动的，首先检查最靠近第一个节点的层，再逐渐向下移动到离起始节点最远的层

步骤：

创建一个队列，并将开始节点放入队列中
若队列非空，则从队列中取出第一个节点，并检测它是否为目标节点
若是目标节点，则结束搜寻，并返回结果
若不是，则将它所有没有被检测过的字节点都加入队列中
若队列为空，表示图中并没有目标节点，则结束遍历
实现：

```js
Graph.prototype.bfs = function (v) {
  var queue = [],
    marked = [];
  marked[v] = true;
  queue.push(v); // 添加到队尾
  while (queue.length > 0) {
    var s = queue.shift(); // 从队首移除
    if (this.edges.has(s)) {
      console.log("visited vertex: ", s);
    }
    let neighbors = this.edges.get(s);
    for (let i = 0; i < neighbors.length; i++) {
      var w = neighbors[i];
      if (!marked[w]) {
        marked[w] = true;
        queue.push(w);
      }
    }
  }
};
```

## 冒泡排序如何实现，时间复杂度是多少， 还可以如何改进

时间复杂度 n^2

```js
// 生成从l到r数量为n的随机数组
function randomArr(n, l, r) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    let _random = Math.round(l + Math.random() * (r - l));
    arr.push(_random);
  }
  return arr;
}
function buddleSort(arr) {
  let len = arr.length;
  for (let i = len; i >= 2; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
```

## 旋转数组

给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数

```js
输入：[1, 2, 3, 4, 5, 6, 7] 和 k = 3
输出: [5, 6, 7, 1, 2, 3, 4]
解析：
向右旋转1步: [7, 1, 2, 3, 4, 5, 6]
向右旋转 2 步: [6, 7, 1, 2, 3, 4, 5]
向右旋转 3 步: [5, 6, 7, 1, 2, 3, 4]
```

```js
function rotate(arr, k) {
  const len = arr.length;
  const step = k % len;
  return arr.slice(-step).concat(arr.slice(0, len - step));
}
```

## Vue 的父组件和子组件生命周期钩子执行顺序是什么

## 如何处理中文输入

elementui 是通过 compositionstart & compositionend 做的中文输入处理

```html
<input
  ref="input"
  @compositionstart="handleComposition"
  @compositionupdate="handleComposition"
  @compositionend="handleComposition"
/>
这三个方法是原生的方法，这里简单介绍下，官方定义如下compositionstart事件触发于一段文字的输入之前(类似于keydown事件，但是该事件仅在若干可见字符之前，而这些可见字符的输入可能需要一连串的键盘操作、语音识别或者点击输入法的备选词)
简单来说就是切换中文输入法时在打拼音时(此时的input内还没有填入真正的内容)会首先触发compositionstart,然后每打一个拼音字母，触发compositionupdate,最后将输入好的中文填入input中时触发compositionend。触发compositionstart时，文本框会填入虚拟文本(待确认文本),同时触发input事件；在触发compositionend时，就是填入实际内容后，如果不能触发input事件的话就得设置一个bool变量来控制
```

## 打印出 1 - 10000 之间的所有对称数

```js
[
  ...Array(1000)
    .keys()
    .filter((x) => {
      return (
        x.toString().length > 1 &&
        x === Number(x.toString().split("").reverse().join(""))
      );
    }),
];
```

## 移动零

给定一个数组 nums, 编写一个函数将所有 0 移动数组的末尾，同时保持非零元素的相对顺序
说明：

1. 必须在原数组上操作，不能拷贝而外的数组
2. 尽量减少操作次数

```js
function zeroMove(array) {
  let len = array.length;
  let j = 0;
  for (let i = 0; i < len - j; i++) {
    if (array[i] === 0) {
      array.push(0);
      array.splice(i, 1);
      i--;
      j++;
    }
  }
  return array;
}
```

## 两数之和

给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。
你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。
给定 nums = [2, 7, 11, 15], target = 9
返回 [0, 1]

```js
var twoSum = function(nums, target) {
  const map = new Map()
  for(let i = 0; i < nums.length; i ++) {
      const result = target - nums[i]
      if (map.has(result)) {
          return [map.get(result), i]
      } else {
          map.set(nums[i], i)
      }
  }
  return []
};
```

## 用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。

```js
function reverse(num) {
  let num1 = Math.floor(num / 10);
  let num2 = num % 10;
  if (num1 < 1) {
    return num;
  } else {
    return `${num2}${reverse(num1)}`;
  }
}
```

## 考虑到性能问题，如何快速从一个巨大的数组中随机获取部分元素

比如有数组有 100k 个元素，从中不重复随机选取 10k 个元素

```js
// 洗牌算法：
// 1. 生成一个0 - arr.length的随机数
// 2. 交换该随机数位置元素和数组的最后一个元素，并把该随机位置的元素放入结果数组
// 3. 生成一个0 - arr.length - 1的随机数
// 4. 交换该随机数位置元素和数组的倒数第二个元素，并把该随机位置的元素放入结果数组；依此类推，直至取完所需的10k个元素
function shuffle(arr, size) {
  const result = [];
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length - i);
    const item = arr[randomIndex];
    result.push(item);
    arr[randomIndex] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = item;
  }
  return result;
}
```

## 编程题，请写一个函数，完成以下功能

> 输入
> `'1, 2, 3, 5, 7, 8, 10'`
> 输出
> `'1~3, 5, 7~8, 10'`

```js
function simplifyStr(num) {
  var result = [];
  var temp = num[0];
  num.forEach((item, i) => {
    if (item + 1 !== num[i + 1]) {
      if (temp !== item) {
        result.push(`${temp}~${item}`);
      } else {
        result.push(item);
      }
      temp = num[i + 1];
    }
  });
  return result.join(",");
}
```

## 写个程序把 entry 转换成如下对象

> ```js
> var entry = {
>   a: {
>     b: {
>       c: {
>         dd: "abcdd",
>       },
>     },
>     d: {
>       xx: "adxx",
>     },
>     e: "ae",
>   },
> };
>
> // 要求转换成如下对象
> var output = {
>   "a.b.c.dd": "abcdd",
>   "a.d.xx": "adxx",
>   "a.e": "ae",
> };
> ```

```js
function flatObj(obj, parentKey = "", result = {}) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let keyName = `${parentKey}${key}`;
      if (typeof obj[key] === "object") {
        flatObj(obj[key], keyName, result);
      } else {
        result[keyName] = obj[key];
      }
    }
  }
  return result;
}
```

## 写个程序把 entry 转换成如下对象（跟昨日题目相反）

```js
var entry = {
   "a.b.c.dd": "abcdd",
   "a.d.xx": "adxx",
   "a.e": "ae",
 };

 // 要求转换成如下对象
 var output = {
   a: {
     b: {
       c: {
         dd: "abcdd",
       },
     },
     d: {
       xx: "adxx",
     },
     e: "ae",
   },
 };
 ```

```js
function map(entry) {
  const obj = Object.create(null);
  for (let key in entry) {
    const keymap = key.split(".");
    set(obj, keymap, entry[key]);
  }
  return obj;
}

function set(obj, map, val) {
  if (!obj[map[0]]) obj[map[0]] = Object.create(null);
  let tmp = obj[map[0]];
  for (let i = 1; i < map.length; i++) {
    if (!tmp[map[i]])
      tmp[map[i]] = map.length - 1 === i ? val : Object.create(null);
    tmp = tmp[map[i]];
  }
}
```

## 根据以下要求，写一个数组去重函数

> 1. 如传入的数组元素为`[123, "meili", "123", "mogu", 123]`，则输出：`[123, "meili", "123", "mogu"]`
> 2. 如传入的数组元素为`[123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]`，则输出：`[123, [1, 2, 3], [1, "2", 3], "meili"]`
> 3. 如传入的数组元素为`[123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]`，则输出：`[123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]`

```js
function isObj(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

function parseObj(obj) {
  let keys = Object.keys(obj).sort();
  let newObj = {};
  for (let key of keys) {
    obj[key] = isObj(obj[key]) ? parseObj(obj[key]) : obj[key];
    newObj[key] = obj[key];
  }
  return newObj;
}

function parseArr(arr) {
  return [
    ...new Set(
      arr.map((item) => {
        isObj(item)
          ? JSON.stringify(parseObj(item))
          : item
          ? JSON.stringify(item)
          : item;
      })
    ),
  ].map((item) => (item ? JSON.parse(item) : item));
}
```

## 找出字符串中连续出现最多的字符和个数

> ```js
> 'abcaakjbb' => {'a':2,'b':2}
> 'abbkejsbcccwqaa' => {'c':3}
> ```

```js
// 方法一
const arr = str.match(/(\w)\1*/g);
const maxLen = Math.max(...arr.map((s) => s.length));
const result = arr.reduce((pre, curr) => {
  if (curr.length === maxLen) {
    pre[curr[0]] = curr.length;
  }
  return pre;
}, {});
// 方法二
// 一次遍历， 时间复杂度O(n) 空间复杂度O(1)
function findLongest(str) {
  if (!str) return {};
  let count = 0;
  let maxCount = 0;
  let cur = str[0];
  let res = {};
  for (let i = 0; i < str.length; i++) {
    const s = str[i];
    if (s === cur) {
      count++;
      if (count > maxCount) {
        maxCount = count;
        res = { [s]: count };
      } else if (count === maxCount) {
        res[s] = count;
      }
    } else {
      count = 1;
      cur = s;
    }
  }
  return res;
}
```

## 写一个单向链数据结构的 js 实现并标注复杂度

```js
class Node {
  constructor(value, next) {
    this.value = value;
    this.next = null;
  }
}
class LinkList {
  constructor() {
    this.head = null;
  }
  find(value) {
    let curNode = this.head;
    while (curNode.value !== value) {
      curNode = curNode.next;
    }
    return curNode;
  }
  findPrev(value) {
    let curNode = this.head;
    while (curNode.next !== null && curNode.next.value != value) {
      curNode = curNode.next;
    }
    return curNode;
  }
  insert(newValue, value) {
    const newNode = new Node(newValue);
    const curNode = this.find(value);
    newNode.next = curNode.next;
    curNode.next = newNode;
  }
  delete(value) {
    const preNode = this.finePrev(value);
    const curNode = preNode.next;
    preNode.next = preNode.next.next;
    return curNode;
  }
}
```

## 统计 1 ~ n 整数中出现 1 的次数

分析归纳一下，按照每一位上的数字来分析
比如 55，各位可能产生的 1 是 6 个(1, 11, 21, 31, 41, 51), 十位 5 可能产生的是 1 是 10 个，(10-19,这里的 11 只计算的十位的 1)

比如 222，个位产生的 1 是 23 个(1,11,21,...221,只关注个位),十位 2 可能产生的 1 是 30 个，百位 2 产生的是 100 个

以此类推，每一位数字可能产生的 1 的个数跟他的高位部分和地位部分相关
其中 0 和 1 需要特殊处理，代码如下：

```js
var countDigitOne = function(n) {
    let flag = 0;

    const TotalBase = Math.pow(10,(String(n).split('').length) - 1);
    for (let i = 0; Math.pow(10,i) <= TotalBase; i++) {
        let base = Math.pow(10,i);
        let cur = Math.floor(n/base) % 10;
        let a = Math.floor(Math.floor(n/base) / 10);
        let b = n % base;
        if (cur < 1) {
            flag = flag + a * base;
        } else if (cur > 1) {
            flag = flag + (a + 1) * base;
        } else {
            flag = flag + a * base + b + 1;
        }
    }
    return flag;

};
```

## 如何将`[{id: 1}, {id: 2, pId: 1}, ...]` 的重复数组（有重复数据）转成树形结构的数组 `[{id: 1, child: [{id: 2, pId: 1}]}, ...]` （需要去重）

```js
// 哈希表 时间复杂度O(n)
const fn = (arr) => {
  const res = [];
  const map = arr.reduce((res, item) => ((res[item.id] = item), res), {});
  for (const item of Object.values(map)) {
    if (!item.pId) {
      res.push(item);
    } else {
      const parent = map[item.pId];
      parent.child = parent.child || [];
      parent.child.push(item);
    }
  }
  return res;
};
```

## 扑克牌问题

有一堆扑克牌，将牌堆第一张放到桌子上，再将接下来的牌堆的第一张放到牌底，如此往复；

最后桌子上的牌顺序为： (牌底) 1,2,3,4,5,6,7,8,9,10,11,12,13 (牌顶)；

问：原来那堆牌的顺序，用函数实现。

```js
function sort(arr) {
  let pre = [];
  while (arr.length > 1) {
    pre.push(arr.pop());
    pre.push(arr.shift());
  }
  pre.push(arr.pop());
}
```

## 求两个日期中间的有效日期

如 2015-2-8 到 2015-3-3，返回【2015-2-8 2015-2-9...】

```js
function rangeDay(day1, day2) {
  const result = [];
  const dayTimes = 24 * 60 * 60 * 1000;
  const startTime = day1.getTime();
  const range = day2.getTime() - startTime;
  let total = 0;

  while (total <= range && range > 0) {
    result.push(
      new Date(startTime + total).toLocaleDateString().replace(/\//g, "-")
    );
    total += dayTimes;
  }
  return result;
}
rangeDay(new Date("2015-02-08"), new Date("2015-03-03"));
```

## 在一个字符串数组中有红、黄、蓝三种颜色的球，且个数不相等、顺序不一致，请为该数组排序。使得排序后数组中球的顺序为:黄、红、蓝。

例如：红蓝蓝黄红黄蓝红红黄红，排序后为：黄黄黄红红红红红蓝蓝蓝。

```js
var arr = str.split('')
var obj = {'黄‘: 0, '红': 1, '蓝': 2}
arr.sort((prev, next) => obj[prev] - obj[next])
```

## 给定一个二进制数组, 找到含有相同数量的 0 和 1 的最长连续子数组的长度，例如[0,0,0,1,1,0,1,0,0]=>6

```js
function getContinuousArrLen(arr) {
  let len = arr.length;
  let map = new Map();
  let count = 0;
  let res = 0;
  for (let i = 0; i < len; i++) {
    count += arr[i] == 1 ? 1 : -1;
    if (map.has(count)) {
      res = Math.max(res, i - map.get(count));
    } else {
      map.set(count, i);
    }
  }
  return res;
}
```

## 有一个数组arr = [a1, a2, a3, b1, b2, b3, c1, c2, c3...], 通过算法将数组进行拆分, 转化为如下格式的数组【a1, b1, c1], [a2, b2, c2], [a3, b3, c3]并实现通用公式.
```js
let arr = [a1, a2, a3, b1, b2, b3, c1, c2, c3]
let reg = /\d+/
let res = arr.reduce((pre, next) => {
  let num = reg.exec(next)[0]
  let val = pre[num-1]
  if (val) {
    val.push(next)
  } else {
    prev[num-1] = [next]
  }
  return prev
}, [])
```

## 假设集合A={a, b}，集合B={0, 1, 2}，则两个集合的笛卡尔积为{(a, 0), (a, 1), (a, 2), (b, 0), (b, 1), (b, 2)}。求当A={a, b, ..., n}, B={0, 1, 2, ..., n}时的笛卡尔积.
```js
function cartesian(arr) {
  if (arr.length < 2) return arr[0] || [];
  return [].reduce.call(arr, function (col, set) {
    let res = [];
    col.forEach(c => {
        set.forEach(s => {
          let t = [].concat(Array.isArray(c) ? c : [c]);
          t.push(s);
          res.push(t);
        })
    });
    return res;
  });
}
```
## 原生js实现一个Set数据类型, 并实现集合的差集, 并集, 补集, 交集
```js
// 交集
function intersection(a, b) {
  return a.filter(v => b.indexOf(v) > -1)
}
// 差集
function poorset(a, b) {
  return a.filter(v => b.indexOf(b) === -1)
}
// 补集
function reset(a, b) {
  return a.filter(v => !(b.indexOf(v) > -1)).concat(b.filter(v => !(a.indexOf(v) > -1)))
}

// 并集
function collection(a, b) {
  return a.concat(b.filter(v => !(a.indexOf(v) > -1)))
}
```
## 给定一个任意嵌套结构的对象如下，使用你熟悉的算法，将对象的属性按照层级输出到一个数组中.如下：
```js
let obj = {
  a: {
    b: {
      c: {
        d: 1
      }
    }
  },
  e: 2,
  f: {
    g: 3
  }
}
function obj2FlatArr(obj, depth = 0, result = []) {

}
```
##  输入一个正数N, 输出所有和为N的连续正数序列. 例如输入15, 结果: [[1, 2, 3, 4, 5], [4, 5, 6], [7, 8]]
```js
let getArrFromSum = sum => {
  let max = Math.ceil(sum / 2)
  const map = []
  const ret = []
  Array.from({length: max}, i => {
    map.push(i+1)
  })
  for(let i = 0; i <= max; i++) {
    for(let j = i; j <= max; j++) {
      let q = map.slice(i, j).length > 0 && map.slice(i, j).reduce((a, b) => {return a + b})
      if (q === sum) {
        ret.push(map.slice(i, j))
      }
    }
  }
  return ret;
} 
```
## 已知圆的半径为1, 用javascript算法, 实现每次都返回不同的坐标值, 且坐标值都在圆内
```js
function generateRandomPos() {
  const cache = {}
  const boundRect= [-1, 1]
  const random = boundRect[+(Math.random() > 0.5)] * Math.random()
  return generate()
  function generate() {
    let x = random(),
        y = random()
    if (Math.pow(x, 2) + Math.pow(y, 2) <= 1 && !cache[`${x}${y}`]) {
      return cache[`${x}${y}`] = [x, y]
    } else {
      return generate()
    }
  }
}
```

##  用原生javasctript实现一个虚拟dom及其基本渲染api
```js
function Element(tagName, props, children) {
  this.tagName = tagName;
  this.props = props
  this.children = children;
}

Element.prototype.render = function() {
  let el = document.createElement(this.tagName)
  let props = this.props
  for(let propName in props) {
    let propValue = props[propName]
    el.setAttribute(propName, propValue)
  }
  let children = this.children || []
  children.forEach(function(child) {
    let childEl = (child instanceof Element) ? child.render(): document.createTextNode(child)
    el.appendChild(childEl)
  })
  return el;
}

Element.prototype.updateElement = function(root, newRl, oldEl, index = 0) {
  if (!oldEl) {
    root.appendChild(newEl.render())
  } else if (!newEl) {
    root.removeChild(root.childNodes[index])
  } else if ((typeof newEl !== typeof oldEl) ||
  (typeof newEl === 'string' && newEl !== oldEl) ||
  (newEl.type !== oldEl.type)) {
    if (typeof newEl === 'string') {
      root.childNodes[index].textContent = newEl;
    } else {
      root.replaceChild(newEl.render(), root.childNodes[index])
    }
  } else if (newEl.tagName) {
    let newLen = newEl.children.length;
    let oldLen = oldEl.children.length;
    for(let i = 0; i < newLen || i < oldLen; i++) {
      this.updateElement(root.childNodes[index], newEl.children[i], oldEl.children[i], i)
    }
  }
}
```
## var arr =[[‘A’,’B’],[‘a’,’b’],[1,2]] 求二维数组的全排列组合 结果：Aa1,Aa2,Ab1,Ab2,Ba1,Ba2,Bb1,Bb2
```js
const getResult = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return;
  }
  if (!arr1.length) {
    return arr2;
  }
  if (!arr2.length) {
    return arr1;
  }
  let result = [];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      result.push(String(arr1[i]) + String(arr2[j]));
    }
  }
  return result;
};

const findAll = (arr) =>
  arr.reduce((total, current) => {
    return getResult(total, current);
  }, []);
var arr = [
  ["A", "B"],
  ["a", "b"],
  [1, 2],
];
console.log(findAll(arr));
// 方法二
var arr = [
  ["A", "B"],
  ["a", "b"],
  [1, 2],
];
let res = [],
  lengthArr = arr.map((d) => d.length);
let indexArr = new Array(arr.length).fill(0);
function addIndexArr() {
  indexArr[0] = indexArr[0] + 1;
  let i = 0;
  let overflow = false;
  while (i <= indexArr.length - 1) {
    if (indexArr[i] >= lengthArr[i]) {
      if (i < indexArr.length - 1) {
        indexArr[i] = 0;
        indexArr[i + 1] = indexArr[i + 1] + 1;
      } else {
        overflow = true;
      }
    }
    i++;
  }
  return overflow;
}
function getAll(arr, indexArr) {
  let str = "";
  arr.forEach((item, index) => {
    str += item[indexArr[index]];
  });
  res.push(str);
  let overflow = addIndexArr();
  if (overflow) {
    return;
  } else {
    return getAll(arr, indexArr);
  }
}
getAll(arr, indexArr);
console.log(res);
```
## 有100瓶水，其中有一瓶有毒，小白鼠只要尝一点带毒的水 3 天后就会死亡，至少要多少只小白鼠才能在 3 天内鉴别出哪瓶水有毒？
```js
let n = 1;
while (Math.pow(2, n) < 100) {
  n++;
}
console.log(n);
```
## 二分查找
```js

// 704. 二分查找
/**
 * 
给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。


示例 1:

输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4
示例 2:

输入: nums = [-1,0,3,5,9,12], target = 2
输出: -1
解释: 2 不存在 nums 中因此返回 -1
 

提示：

你可以假设 nums 中的所有元素是不重复的。
n 将在 [1, 10000]之间。
nums 的每个元素都将在 [-9999, 9999]之间。
 */


const search = (nums, target) => {
  let i = 0
  let j = nums.length - 1
  let midIndex = 0

  while (i <= j) {
    midIndex = Math.floor((i + j) / 2)
    const midValue = nums[ midIndex ]

    if (midValue === target) {
      return midIndex
    } else if (midValue < target) {
      i = midIndex + 1
    } else {
      j = midIndex - 1
    }
  }

  return -1
}

console.log(search([-1,0,3,5,9,12], 9)) // 4
```
## 版本比较的两种方式
给你两个版本号 version1 和 version2 ，请你比较它们。

版本号由一个或多个修订号组成，各修订号由一个 '.' 连接。每个修订号由 多位数字 组成，可能包含 前导零 。每个版本号至少包含一个字符。修订号从左到右编号，下标从 0 开始，最左边的修订号下标为 0 ，下一个修订号下标为 1 ，以此类推。例如，2.5.33 和 0.1 都是有效的版本号。

比较版本号时，请按从左到右的顺序依次比较它们的修订号。比较修订号时，只需比较 忽略任何前导零后的整数值 。也就是说，修订号 1 和修订号 001 相等 。如果版本号没有指定某个下标处的修订号，则该修订号视为 0 。例如，版本 1.0 小于版本 1.1 ，因为它们下标为 0 的修订号相同，而下标为 1 的修订号分别为 0 和 1 ，0 < 1 。

返回规则如下：

如果 version1 > version2 返回 1，
如果 version1 < version2 返回 -1，
除此之外返回 0。
```js

// 比较版本号

const compareVersion = function(version1, version2) {
  version1 = version1.split('.')
  version2 = version2.split('.')

  const len1 = version1.length
  const len2 = version2.length
  let maxLen = len1
  const fillZero = (array, len) => {
    while (len--) {
      array.push(0)
    }
  }

  if (len1 < len2) {
    fillZero(version1, len2 - len1)
    maxLen = len2
  } else if (len1 > len2) {
    fillZero(version2, len1 - len2)
    maxLen = len1
  }

  for (let i = 0; i < maxLen; i++) {
    const a = parseInt(version1[i])
    const b = parseInt(version2[i])
    if ( a === b) {
      // i++
    } else if (a > b) {
      return 1
    } else {
      return -1
    }
  }

  return 0
}

// 也可以不补零
const compareVersion = function(version1, version2) {
  version1 = version1.split('.')
  version2 = version2.split('.')

  const maxLen = Math.max(version1.length, version2.length)

  for (let i = 0; i < maxLen; i++) {
    const a = parseInt(version1[i]??0)
    const b = parseInt(version2[i]??0)
    if ( a === b) {
      // i++
    } else if (a > b) {
      return 1
    } else {
      return -1
    }
  }

  return 0
}

console.log(compareVersion('1.0', '1.0.0'))

// 扩展1比较多个版本号并排序

const compareMoreVersion = (versions) => {
  return versions.sort((a, b) => compareVersion(a, b))
}

console.log(compareMoreVersion(['1.0', '3.1', '1.01']))
```
## 合并二维有序数组成一维有序数组，并递归排序
```js
function merge(arr1, arr2) {
  var result = []
  while(arr1.length > 0 && arr2.length > 0) {
    if (arr1[0] < arr2[0]) {
      result.push(arr1.shift())
    } else {
      result.push(arr2.shift())
    }
  }
  return result.concat(arr1).concat(arr2)
}

function mergeSort(arr) {
  let lengthArr = arr.length;
  if (lengthArr === 0) {
    return []
  }
  while(arr.length > 1) {
    let arrayItem1 = arr.shift()
    let arrayItem2 = arr.shift()
    let mergeArr = merge(arrayItem1, arrayItem2)
    arr.push(mergeArr)
  }
  return arr[0]
}
let arr1 = [[1,2,3],[4,5,6],[7,8,9],[1,2,3],[4,5,6]];
let arr2 = [[1,4,6],[7,8,10],[2,6,9],[3,7,13],[1,5,12]];
mergeSort(arr1);
mergeSort(arr2);
```
## 非波那契数列
```js
function fib(n) {
  if (n < 0) throw new Error('输入的数字不能小于0')
  if (n < 2) {
    return n;
  }
  let list = [0, 1]
  for(let i = 1; i < n; i++) {
    list[i+1] = list[i] + list[i-1]
  }
  return list[n]
}
```
## 字符串出现的不重复最长长度
```js
var lengthOfLongestSubstring = function(s) {
  let map = new Map()
  let i = -1;
  let res = 0;
  let n = s.length;
  for(let j = 0; j < n; j++) {
    if (map.has(s[j])) {
      i = Math.max(i, map.get(s[j]))
    }
    res = Math.max(res, j - i)
    map.set(s[j], j)
  }
  return res;
}
```
## 有一堆整数，请把他们分成三份，确保每一份和尽量相等（11，42，23，4，5，6 4 5 6 11 23 42 56 78 90）
```js
function f1 (arr,count){
    //数组从大到小排序
    arr.sort((a,b) => b - a);
    //计算平均值
    let avg = arr.reduce((a,b) => a + b) / count;
    //从大到小求和，取最接近平均值的一组，放入二维数组
    let resArr = [];
    let current = 0;
    for (let i = 0; i < count-1; i++) {
      if (current + arr[arr.length-1]/2 < avg && i){
        arr.pop();
        resArr[i-1].push(arr[arr.length-1]);
      }
      current = 0;
      resArr[i] = [];
      arr.forEach((item,index) => {
        current += item;
        arr.splice(index,1);
        resArr[i].push(item);
        if(current > avg){
          current -= item;
          arr.splice(index,0,item);
          resArr[i].pop();
        }
      })
    }
    resArr[count-1] = arr;
    return resArr
}
//测试，第一个参数为数组，第二个为份数
f1([11,42,23,4,5,6,4,5,6,11,23,42,56,78,90],3)
```

## 链表
## 回文链表
[234](https://leetcode.cn/problems/palindrome-linked-list/)
```js
var isPalindrome = function(head) {
  let left = head;
  function traverse(right) {
    if (right === null) return true;
    let res = traverse(right.next)
    res = res && right.val === left.val;
    left = left.next;
    return res;
  }
  return traverse(head)
}
// 通过 快、慢指针找链表中点，然后反转链表，比较两个链表两侧是否相等，来判断是否是回文链表
var isPalindrome = function(head) {
  let right = reverse(findCenter(head))
  let left = head
  while(right !== null) {
    if (left.val !== right.val) {
      return false
    }
    left = left.next;
    right = right.next
  }
  return true;
}
function findCenter(head) {
  let slower = head, faster = head;
  while(faster && faster.next !== null) {
    slower = slower.next;
    faster = faster.next.next;
  }
  // 说明是奇数个，slower再移动一格
  if (faster !== null) {
    slower = slower.next;
  }
  return slower
}
function reverse(head) {
  let prev = null, cur = head, nxt = head;
  while (cur !== null) {
    nxt = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nxt;
  }
  return prev;
}
```
## 反转链表(206)
[206](https://leetcode.cn/problems/reverse-linked-list/)
```js
var reverseList = function(head) {
  if (head == null || head.next == null) return head;
  let last = reverseList(head.next)
  head.next.next = head;
  head.next = null;
  return last;
}

// 方法二
var reverseList = function(head) {
    let p = dummyHead = new ListNode();
    let pre, cur, start, tail;
    p.next = head;
    for(let i = 0;i < 1; i++) {
        p = p.next;
    }
    front = p; // 12345
    pre = tail = p.next; // 2345
    cur = pre.next; // 345
    for(let i = 0; i < 2; i++) {
        let next = cur.next; // 45, 5
        cur.next = pre; // 2345
        pre = cur;
        cur = next;
    }
    console.log(front)
    front.next = pre;
    console.log(p.next == tail)
    tail.next = cur;
    return dummyHead.next;
};
```
## 合并K个升序链表(23)
[23](https://leetcode.cn/problems/merge-k-sorted-lists/)
```js

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    if (lists.length === 0) return null;
    return mergeArr(lists);
};
function mergeArr(lists) {
    if (lists.length <= 1) return lists[0];
    let index = Math.floor(lists.length / 2);
    const left = mergeArr(lists.slice(0, index))
    const right = mergeArr(lists.slice(index));
    return merge(left, right);
}
function merge(l1, l2) {
    if (l1 == null && l2 == null) return null;
    if (l1 != null && l2 == null) return l1;
    if (l1 == null && l2 != null) return l2;
    let newHead = null, head = null;
    while (l1 != null && l2 != null) {
        if (l1.val < l2.val) {
            if (!head) {
                newHead = l1;
                head = l1;
            } else {
                newHead.next = l1;
                newHead = newHead.next;
            }
            l1 = l1.next;
        } else {
            if (!head) {
                newHead = l2;
                head = l2;
            } else {
                newHead.next = l2;
                newHead = newHead.next;
            }
            l2 = l2.next;
        }
    }
    newHead.next = l1 ? l1 : l2;
    return head;
}
```
## k个一组翻转链表
[25](https://leetcode.cn/problems/reverse-nodes-in-k-group/)
```js

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    let a = head, b = head;
    for (let i = 0; i < k; i++) {
        if (b == null) return head;
        b = b.next;
    }
    const newHead = reverse(a, b);
    a.next = reverseKGroup(b, k);
    return newHead;
};
function reverse(a, b) {
    let prev = null, cur = a, nxt = a;
    while (cur != b) {
        nxt = cur.next;
        cur.next = prev;
        prev = cur;
        cur = nxt;
    }
    return prev;
}
```
## 环形链表
[141](https://leetcode.cn/problems/linked-list-cycle/)
```js

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if (head == null || head.next == null) return false;
    let slower = head, faster = head;
    while (faster != null && faster.next != null) {
        slower = slower.next;
        faster = faster.next.next;
        if (slower === faster) return true;
    }
    return false;
};
```
## 排序链表
[148](https://leetcode.cn/problems/sort-list/)
```js

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
    if (head == null) return null;
    let newHead = head;
    return mergeSort(head);
};
function mergeSort(head) {
    if (head.next != null) {
        let slower = getCenter(head);
        let nxt = slower.next;
        slower.next = null;
        const left = mergeSort(head);
        const right = mergeSort(nxt);
        head = merge(left, right);
    }
    return head;
}
function merge(left, right) {
    let newHead = null, head = null;
    while (left != null && right != null) {
        if (left.val < right.val) {
            if (!head) {
                newHead = left;
                head = left;
            } else {
                newHead.next = left;
                newHead = newHead.next;
            }
            left = left.next;
        } else {
            if (!head) {
                newHead = right;
                head = right;
            } else {
                newHead.next = right;
                newHead = newHead.next;
            }
            right = right.next;
        }
    }
    newHead.next = left ? left : right;
    return head;
}
function getCenter(head) {
    let slower = head, faster = head.next;
    while (faster != null && faster.next != null) {
        slower = slower.next;
        faster = faster.next.next;
    }
    return slower;
}
```
## 相交链表
[160](https://leetcode.cn/problems/intersection-of-two-linked-lists/)
```js

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let lastHeadA = null;
    let lastHeadB = null;
    let originHeadA = headA;
    let originHeadB = headB;
    if (!headA || !headB) {
        return null;
    }
    while (true) {
        if (headB == headA) {
            return headB;
        }
        if (headA && headA.next == null) {
            lastHeadA = headA;
            headA = originHeadB;
        } else {
            headA = headA.next;
        }
        if (headB && headB.next == null) {
            lastHeadB = headB
            headB = originHeadA;
        } else {
            headB = headB.next;
        }
        if (lastHeadA && lastHeadB && lastHeadA != lastHeadB) {
            return null;
        }
    }
    return null;
};
```
## 最长回文子串
[5](https://leetcode.cn/problems/longest-palindromic-substring/)
```js

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if (s.length === 1) return s;
    let maxRes = 0, maxStr = '';
    for (let i = 0; i < s.length; i++) {
        let str1 = palindrome(s, i, i);
        let str2 = palindrome(s, i, i + 1);   
        if (str1.length > maxRes) {
            maxStr = str1;
            maxRes = str1.length;
        }
        if (str2.length > maxRes) {
            maxStr = str2;
            maxRes = str2.length;
        }
    }
    return maxStr;
};
function palindrome(s, l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
        l--;
        r++;
    }
    return s.slice(l + 1, r);
}
```
## 最长公共前缀
[14](https://leetcode.cn/problems/longest-common-prefix/)
```js

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (strs.length === 0) return "";
    let first = strs[0];
    if (first === "") return "";
    let minLen = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < strs.length; i++) {
        const len = twoStrLongestCommonPrefix(first, strs[i]);
        minLen = Math.min(len, minLen);
    }
    return first.slice(0, minLen);
};
function twoStrLongestCommonPrefix (s, t) {
    let i = 0, j = 0;
    let cnt = 0;
    while (i < s.length && j < t.length) {
        if (s[i] === t[j])  {
            cnt++;
        } else {
            return cnt;
        }
        i++;
        j++;
    }
    return cnt;
}
```
## 无重复字符的最长子串
[3](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)
```js

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let window = {};
  let left = 0, right = 0;
  let maxLen = 0, maxStr = '';
  while (right < s.length) {
    let c = s[right];
    right++;
    if (window[c]) window[c]++;
    else window[c] = 1
    while (window[c] > 1) {
      let d = s[left];
      left++;
      window[d]--;
    }
    if (maxLen < right - left) {
      maxLen = right - left;
    }
  }
  return maxLen;
};
```
## 最小覆盖子串
[76](https://leetcode.cn/problems/minimum-window-substring/)
```js

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    let need = {}, window = {};
    for (let c of t) {
        if (!need[c]) need[c] = 1;
        else need[c]++;
    }
    let left = 0, right = 0;
    let valid = 0, len = Object.keys(need).length;
    let minLen = s.length + 1, minStr = '';
    while (right < s.length) {
        const d = s[right];
        right++;
        if (!window[d]) window[d] = 1;
        else window[d]++;
        if (need[d] && need[d] === window[d]) {
            valid++;
        }
        while (valid === len) {
            if (right - left < minLen) {
                minLen = right - left;
                minStr = s.slice(left, right);
            }
            let c = s[left];
            left++;
            window[c]--;
            if (need[c] && window[c] < need[c]) {
                valid--;
            }
        }
    }
    return minStr;
};
```
## 数组问题
俄罗斯套娃信封问题【排序+最长上升子序列】
[354](https://leetcode.cn/problems/russian-doll-envelopes/)
```js

/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function(envelopes) {
  if (envelopes.length === 1) return 1;
    envelopes.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        else return b[1] - a[1];
    });
    let LISArr = [];
    for (let [key, value] of envelopes) {
      LISArr.push(value);
    }
    return LIS(LISArr);
};
function LIS(arr) {
  let dp = [];
  let maxAns = 0;
  for (let i = 0; i < arr.length; i++) {
    dp[i] = 1;
  }
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j >= 0; j--) {
      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
      maxAns = Math.max(maxAns, dp[i]);
    }
  }
  return maxAns;
}
```
## 最长连续递增序列【快慢指针】
[674](https://leetcode.cn/problems/longest-continuous-increasing-subsequence/)
```js

/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function(nums) {
    if (nums.length === 0) return 0;
    const n = nums.length;
    let left = 0, right = 1;
    let globalMaxLen = 1, maxLen = 1;
    while (right < n) {
        if (nums[right] > nums[left]) maxLen++;
        else {
            maxLen = 1;
        }
        left++;
        right++;
        globalMaxLen = Math.max(globalMaxLen, maxLen);
    }
    return globalMaxLen;
};

```
## 最长连续序列 【哈希表
[128](https://leetcode.cn/problems/longest-consecutive-sequence/)
```js

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    if (nums.length === 0) return 0;
    const set = new Set(nums);
    const n = nums.length;
    let globalLongest = 1;
    for (let i = 0; i < n; i++) {
        if (!set.has(nums[i] - 1)) {
            let longest = 1;
            let currentNum = nums[i];
            while (set.has(currentNum + 1)) {
                currentNum += 1;
                longest++;
            }
            globalLongest = Math.max(globalLongest, longest);
        }
    }
    return globalLongest;
};
```
## 【面试真题】盛最多水的容器【哈希表】
[11](https://leetcode.cn/problems/container-with-most-water/)
```js

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let n = height.length;
    let left = 0, right = n - 1;
    let maxOpacity = 0;
    while (left < right) {
        let res = Math.min(height[left], height[right]) * (right - left);
        maxOpacity = Math.max(maxOpacity, res);
        if (height[left] < height[right]) left++
        else right--;
    }
    return maxOpacity;
};
```
## 寻找两个正序数组的中位数【双指针】
[4](https://leetcode.cn/problems/median-of-two-sorted-arrays/)
```js

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let m = nums1.length, n = nums2.length;
    let i = 0, j = 0;
    let newArr = [];
    while (i < m && j < n) {
        if (nums1[i] < nums2[j]) {
            newArr.push(nums1[i++]);
        } else {
            newArr.push(nums2[j++]);
        }
    }
    newArr = newArr.concat(i < m ? nums1.slice(i) : nums2.slice(j));
    const len = newArr.length;
    if (len % 2 === 0) {
        return (newArr[len / 2] + newArr[len / 2 - 1]) / 2;
    } else {
        return newArr[Math.floor(len / 2)];
    }
};

```
## 删除有序数组中的重复项【快慢指针】
[26](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)
```js

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  if (nums.length <= 1) return nums.length;
  let lo = 0, hi = 0;
  while (hi < nums.length) {
    while (nums[lo] === nums[hi] && hi < nums.length) hi++;
    if (nums[lo] !== nums[hi] && hi < nums.length) {
      lo++;
      nums[lo] = nums[hi];
    }
    hi++;
  }
  return lo + 1;
};

```
## 和为K的子数组【哈希表】
[560](https://leetcode.cn/problems/subarray-sum-equals-k/)
```js

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  let cnt = 0;
  let sum0_i = 0, sum0_j = 0;
  let map = new Map();
  map.set(0, 1);
  for (let i = 0; i <= nums.length; i++) {
    sum0_i += nums[i];
    sum0_j = sum0_i - k;
    if (map.has(sum0_j)) {
      cnt += map.get(sum0_j);
    }
    let sumCnt = map.get(sum0_i) || 0;
    map.set(sum0_i, sumCnt + 1);
  }
  return cnt;
};
```
## 接雨水
[42](https://leetcode.cn/problems/trapping-rain-water/)
```js

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let l_max = [], r_max = [];
    let len = height.length;
    let maxCapacity = 0;
    for (let i = 0; i < len; i++) {
        l_max[i] = height[i];
        r_max[i] = height[i];
    }
    for (let i = 1; i < len; i++) {
        l_max[i] = Math.max(l_max[i - 1], height[i]);
    }
    for (let j = len - 2; j >= 0; j--) {
        r_max[j] = Math.max(r_max[j + 1], height[j]);
    }
    for (let i = 0; i < len; i++) {
        maxCapacity += Math.min(l_max[i], r_max[i]) - height[i];
    }
    return maxCapacity;
};
```
## 跳跃游戏【贪心算法】【系列】
[55](https://leetcode.cn/problems/jump-game/)
```js

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let faster = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        faster = Math.max(faster, i + nums[i]);
        if (faster <= i) return false;
    }
    return faster >= nums.length - 1;
};
```
[45](https://leetcode.cn/problems/jump-game-ii/)
## 二叉树
## 二叉树的最近公共祖先【二叉树】
[236](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)
```js

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
let visited;let parent;
var lowestCommonAncestor = function(root, p, q) {
    visited = new Set();
    parent = new Map();
    dfs(root);
    while (p != null) {
        visited.add(p.val);
        p = parent.get(p.val);
    }
    while (q != null) {
        if (visited.has(q.val)) {
            return q;
        }
        q = parent.get(q.val);
    }
    return null;
};
function dfs(root) {
    if (root.left != null) {
        parent.set(root.left.val, root);
        dfs(root.left);
    }
    if (root.right != null) {
        parent.set(root.right.val, root);
        dfs(root.right);
    }
}
```
## 二叉搜索树中的搜索
[700](https://leetcode.cn/problems/search-in-a-binary-search-tree/)
```js

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function(root, val) {
    if (root == null) return null;
    if (root.val === val) return root;
    if (root.val > val) {
        return searchBST(root.left, val);
    } else if (root.val < val) {
        return searchBST(root.right, val);
    }
};
```
## 删除二叉搜索树中的节点【二叉树]
[450](https://leetcode.cn/problems/delete-node-in-a-bst/)
```js

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function(root, key) {
    if (root == null) return null;
    if (root.val === key) {
        if (root.left == null && root.right == null) return null;
        if (root.left == null) return root.right;
        if (root.right == null) return root.left;
        if (root.left != null && root.right != null)  {
            let target = getMinTreeMaxNode(root.right);
            root.val = target.val;
            root.right = deleteNode(root.right, target.val);
        }
    }
    if (root.val < key) {
        root.right = deleteNode(root.right, key);
    } else if (root.val > key) {
        root.left = deleteNode(root.left, key);
    }
    return root;
};
function getMinTreeMaxNode(root) {
    if (root.left == null) return root;
    return getMinTreeMaxNode(root.left);
}
```
## 完全二叉树的节点个数【二叉树】
[222](https://leetcode.cn/problems/count-complete-tree-nodes/)
```js

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function(root) {
    if (root == null) return 0;
    let l = root, r = root;
    let lh = 0, rh = 0;
    while (l != null) {
      l = l.left;
      lh++;
    }
    while (r != null) {
      r = r.right;
      rh++;
    }
    if (lh === rh) {
      return Math.pow(2, lh) - 1;
    }
    return 1 + countNodes(root.left) + countNodes(root.right);
};
```
## 二叉树的锯齿形层序遍历【二叉树】
[103](https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/)
```js

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
let res;
var zigzagLevelOrder = function(root) {
    if (root == null) return [];
    res = [];
    BFS(root, true);
    return res;
};
function BFS(root, inOrder) {
    let arr = [];
    let resItem = [];
    let node;
    let stack1 = new Stack();
    let stack2 = new Stack();
    // 判断交换时机
    let flag;
    stack1.push(root);
    res.push([root.val]);
    inOrder = !inOrder;
    while (!stack1.isEmpty() || !stack2.isEmpty()) {
        if (stack1.isEmpty()) {
            flag = 'stack1';
        } else if (stack2.isEmpty()) {
            flag = 'stack2';
        }
        // 决定取那个栈里面的元素
        if (flag === 'stack2' && !stack1.isEmpty()) node = stack1.pop();
        else if (flag === 'stack1' && !stack2.isEmpty()) node = stack2.pop();
        if (inOrder) {
            if (node.left) {
                if (flag === 'stack1') {
                    stack1.push(node.left);
                } else {
                    stack2.push(node.left);
                }
                resItem.push(node.left.val);
            }
            if (node.right) {
                if (flag === 'stack1') {
                    stack1.push(node.right);
                } else {
                    stack2.push(node.right);
                }
                resItem.push(node.right.val);
            }
        } else {
            if (node.right) {
                if (flag === 'stack1') {
                    stack1.push(node.right);
                } else {
                    stack2.push(node.right);
                }
                resItem.push(node.right.val);
            }
            if (node.left) {
                if (flag === 'stack1') {
                    stack1.push(node.left);
                } else {
                    stack2.push(node.left);
                }
                resItem.push(node.left.val);
            }
        }
        // 判断下次翻转的时机
        if ((flag === 'stack2' && stack1.isEmpty()) || (flag === 'stack1' && stack2.isEmpty())) {
            inOrder = !inOrder;
            // 需要翻转了，就加一轮值
            if (resItem.length > 0) {
                res.push(resItem);
            }   
            resItem = [];
        }
    }
}
class Stack {
    constructor() {
        this.count = 0;
        this.items = [];
    }
    push(element) {
        this.items[this.count] = element;
        this.count++;
    }
    pop() {
        if (this.isEmpty()) return undefined;
        const element = this.items[this.count - 1];
        delete this.items[this.count - 1];
        this.count--;
        return element;
    }
    size() {
        return this.count;
    }
    isEmpty() {
        return this.size() === 0;
    }
}
```
## 排序算法
## 用最少数量的箭引爆气球【排序算法】
[452](https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/)
```js

/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {
    if (points.length === 0) return 0;
    points.sort((a, b) => a[1] - b[1]);
    let cnt = 1;
    let resArr = [points[0]];
    let curr, last;
    for (let i = 1; i < points.length; i++) {
        curr = points[i];
        last = resArr[resArr.length - 1];
        if (curr[0] > last[1]) {
            resArr.push(curr);
            cnt++;
        }
    }
    return cnt;
};
```
## 合并区间【排序算法+区间问题】
[56](https://leetcode.cn/problems/merge-intervals/)
```js

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if (intervals.length === 0) return [];
    intervals.sort((a, b) => a[0] - b[0]);
    let mergeArr = [intervals[0]];
    let last, curr;
    for (let j = 1; j < intervals.length; j++) {
        last = mergeArr[mergeArr.length - 1];
        curr = intervals[j];
        if (last[1] >= curr[0]) {
            last[1] = Math.max(curr[1], last[1]);
        } else {
            mergeArr.push(curr);
        }
    }
    return mergeArr;
};
```
## 寻找两个正序数组的中位数【二分查找】
[4](https://leetcode.cn/problems/median-of-two-sorted-arrays/)
```js

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let m = nums1.length, n = nums2.length;
    let i = 0, j = 0;
    let newArr = [];
    while (i < m && j < n) {
        if (nums1[i] < nums2[j]) {
            newArr.push(nums1[i++]);
        } else {
            newArr.push(nums2[j++]);
        }
    }
    newArr = newArr.concat(i < m ? nums1.slice(i) : nums2.slice(j));
    const len = newArr.length;
    console.log(newArr)
    if (len % 2 === 0) {
        return (newArr[len / 2] + newArr[len / 2 - 1]) / 2;
    } else {
        return newArr[Math.floor(len / 2)];
    }
};

```
## 判断子序列【二分查找】
[392](https://leetcode.cn/problems/is-subsequence/)
```js

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    let hash = {};
    for (let i = 0; i < t.length; i++) {
        if (!hash[t[i]]) hash[t[i]] = [];
        hash[t[i]].push(i);
    }
    let lastMaxIndex = 0;
    for (let i = 0; i < s.length; i++) {
        if (hash[s[i]]) {
            const index = binarySearch(hash[s[i]], lastMaxIndex);
            if (index === -1) return false;
            lastMaxIndex = hash[s[i]][index] + 1;
        } else return false;
    }
    return true;
};
// abc  awbeabc
function binarySearch(array, targetIndex) {
    let left = 0, right = array.length;
    while (left < right) {
        let mid = left + Math.floor((right - left) / 2);
        if (array[mid] >= targetIndex) {
            right = mid;
        } else if (array[mid] < targetIndex) {
            left = mid + 1;
        }
    }
    if (left >= array.length || array[left] < targetIndex) return -1;
    return left;
}
```
##  在排序数组中查找元素的第一个和最后一个位置【二分搜索】
[34](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)
```js

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    const left = leftBound(nums, target);
    const right = rightBound(nums, target);
    return [left, right];
};
function leftBound(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) {
          right = mid - 1;
        } else if (nums[mid] < target) {
          left = mid + 1;
        } else if (nums[mid] > target) {
          right = mid - 1;
        }
    }
    if (left >= nums.length || nums[left] !== target) {
        return -1;
    }
    return left;
}
function rightBound(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) {
            left = mid + 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
        }
    }
    if (right < 0 || nums[right] !== target) {
        return -1;
    }
    return right;
}
```
## 动态规划
## 最长递增子序列【动态规划】
[300](https://leetcode.cn/problems/longest-increasing-subsequence/)
```js

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    let maxLen = 0, n = nums.length;
    let dp = [];
    for (let i = 0; i < n; i++) {
        dp[i] = 1;
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }
    return maxLen;
};

```
## 【面试真题】 零钱兑换【动态规划】
[322](https://leetcode.cn/problems/coin-change/)
```js

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  if (amount === 0) return 0;
  let dp = [];
  for (let i = 0; i <= amount; i++) {
    dp[i] = amount + 1;
  }
  dp[0] = 0;
  for (let i = 0; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (i >= coins[j]) {
        dp[i] = Math.min(dp[i - coins[j]] + 1, dp[i])
      }
    }
  }
  return dp[amount] === amount + 1 ? -1 : dp[amount];
};

[1, 2, 5]
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]


```
## 最长公共子序列【动态规划】
[1143](https://leetcode.cn/problems/longest-common-subsequence/)
```js

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    let n1 = text1.length, n2 = text2.length;
    let dp = [];
    for (let i = -1; i < n1; i++) {
        dp[i] = [];
        for (let j = -1; j < n2;j++) {
            dp[i][j] = 0;
        }
    }
    for (let i = 0; i < n1; i++) {
        for (let j = 0; j < n2; j++) {
            if (text1[i] === text2[j]) {
                dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - 1] + 1);
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }
    return dp[n1 - 1][n2 - 1];
};
```
## 编辑距离
[72](https://leetcode.cn/problems/edit-distance/)
```js

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
  let len1 = word1.length, len2 = word2.length;
  let dp = [];
  for (let i = 0; i <= len1; i++) {
    dp[i] = [];
    for (let j = 0; j <= len2; j++) {
      dp[i][j] = 0;
      if (i === 0) {
        dp[i][j] = j;
      }
      if (j === 0) {
        dp[i][j] = i;
      }
    }
  }
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1);
      }
    }
  }
  return dp[len1][len2];
};
```
## 【面试真题】最长回文子序列【动态规划】
[516](https://leetcode.cn/problems/longest-palindromic-subsequence/)
```js

/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function(s) {
    let dp = [];
    for (let i = 0; i < s.length; i++) {
        dp[i] = [];
        for (let j = 0; j < s.length; j++) {
            dp[i][j] = 0;
        }
        dp[i][i] = 1;
    }
    for (let i = s.length - 1; i >= 0; i--) {
        for (let j = i + 1; j < s.length; j++) {
            if (s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[0][s.length - 1];
};
```
## 【面试真题】💁 最大子序和【动态规划】
[53](https://leetcode.cn/problems/maximum-subarray/)
```js

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let maxSum = -Infinity;
    let dp = [], n = nums.length;
    for (let i = -1; i < n; i++) {
        dp[i] = 0;
    }
    for (let i = 0; i < n; i++) {
        dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
        maxSum = Math.max(maxSum, dp[i]);
    }
    return maxSum;
};
```
【面试真题】💁 买卖股票的最佳时机【动态规划】

👉 【LeetCode 直通车】：121 买卖股票的最佳时机（简单）【面试真题】
```js
var maxProfit = function(prices) {
  if (prices.length === 0) return 0
  let max = 0, min = prices[0]
  for(let p of prices) {
    min = Math.min(min, p)
    max = Math.max(max, p - min)
  }
  return max
}
```
👉 【LeetCode 直通车】：122 买卖股票的最佳时机 II（简单）
👉 【LeetCode 直通车】：123 买卖股票的最佳时机 III（困难）
👉 【LeetCode 直通车】：188 买卖股票的最佳时机IV（困难）
👉 【LeetCode 直通车】：309 买卖股票的最佳时机含冷冻期（中等）
👉 【LeetCode 直通车】：714 买卖股票的最佳时机含手续费（中等）
```js

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let dp = [];
  for (let i = -1; i < prices.length; i++) {
    dp[i] = []
    for (let j = 0; j <= 1; j++) {
      dp[i][j] = [];
      dp[i][j][0] = 0;
      dp[i][j][1] = 0;
      if (i === -1) {
        dp[i][j][1] = -Infinity;
      }
      if (j === 0) {
        dp[i][j][1] = -Infinity;
      }
      if (j === -1) {
        dp[i][j][1] = -Infinity;
      }
    }
  }
  for (let i = 0; i < prices.length; i++) {
    for (let j = 1; j <= 1; j++) {
      dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i]);
      dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i]);
    }
  }
  return dp[prices.length - 1][1][0];
};

```
## BFS
## 打开转盘锁【BFS】
[752](https://leetcode.cn/problems/open-the-lock/)
```js

/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function(deadends, target) {
  let queue = new Queue();
  let visited = new Set();
  let step = 0;
  queue.push('0000');
  visited.add('0000');
  while (!queue.isEmpty()) {
    let size = queue.size();
    for (let i = 0; i < size; i++) {
      let str = queue.pop();
      if (deadends.includes(str)) continue;
      if (target === str) {
        return step;
      }
      for (let j = 0; j < 4; j++) {
        let plusStr = plusOne(str, j);
        let minusStr = minusOne(str, j);
        if (!visited.has(plusStr)) {
          queue.push(plusStr);
          visited.add(plusStr)
        }
        if (!visited.has(minusStr)) {
          queue.push(minusStr);
          visited.add(minusStr)
        }
      }
    }
    step++;
  }
  return -1;
};
function plusOne(str, index) {
  let strArr = str.split('');
  if (strArr[index] === '9') {
    strArr[index] = '0'
  } else {
    strArr[index] = (Number(strArr[index]) + 1).toString()
  }
  return strArr.join('');
}
function minusOne(str, index) {
  let strArr = str.split('');
  if (strArr[index] === '0') {
    strArr[index] = '9'
  } else {
    strArr[index] = (Number(strArr[index]) - 1).toString()
  }
  return strArr.join('');
}
class Queue {
  constructor() {
    this.items = [];
    this.count = 0;
    this.lowerCount = 0;
  }
  push(elem) {
    this.items[this.count++] = elem;
  }
  pop() {
    if (this.isEmpty()) {
      return;
    }
    const elem = this.items[this.lowerCount];
    delete this.items[this.lowerCount];
    this.lowerCount++;
    return elem;
  }
  isEmpty() {
    if (this.size() === 0) return true;
    return false;
  }
  size() {
    return this.count - this.lowerCount;
  }
}
```
## 二叉树的最小深度
[111](https://leetcode.cn/problems/minimum-depth-of-binary-tree/)
```js

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
  if (root == null) return 0;
  let depth = 1;
  let queue = new Queue();
  queue.push(root);
  while (!queue.isEmpty()) {
    let size = queue.size();
    for (let i = 0; i < size; i++) {
      const node = queue.pop();
      if (node.left == null && node.right == null) return depth;
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    depth++;
  }
  return depth;
};
class Queue {
  constructor() {
    this.items = [];
    this.count = 0;
    this.lowerCount = 0;
  }
  push(elem) {
    this.items[this.count++] = elem;
  }
  pop() {
    if (this.isEmpty()) {
      return;
    }
    const elem = this.items[this.lowerCount];
    delete this.items[this.lowerCount];
    this.lowerCount++;
    return elem;
  }
  isEmpty() {
    if (this.size() === 0) return true;
    return false;
  }
  size() {
    return this.count - this.lowerCount;
  }
}
```
## 栈
## 最小栈
[155](https://leetcode.cn/problems/min-stack/)
```js

/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = [];
    this.minArr = [];
    this.count = 0;
    this.min = Number.MAX_SAFE_INTEGER;
};
/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.min = Math.min(this.min, x);
    this.minArr[this.count] = this.min;
    this.stack[this.count] = x;
    this.count++;
};
/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    const element = this.stack[this.count - 1];
    if (this.count - 2 >= 0) this.min = this.minArr[this.count - 2];
    else  this.min = Number.MAX_SAFE_INTEGER;
    delete this.stack[this.count - 1];
    delete this.minArr[this.count - 1];
    this.count--;
    return element;
};
/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    if (this.count >= 1) {
        return this.stack[this.count - 1];
    }
    return null;
};
/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    const element = this.minArr[this.count - 1];
    return element;
};
/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

```
## 下一个更大元素
[496](https://leetcode.cn/problems/next-greater-element-i/)
```js

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
    const map = new Map();
    const stack = [];
    for (let i = nums2.length - 1; i >= 0; --i) {
        const num = nums2[i];
        while (stack.length && num >= stack[stack.length - 1]) {
            stack.pop();
        }
        map.set(num, stack.length ? stack[stack.length - 1] : -1);
        stack.push(num);
    }
    const res = new Array(nums1.length).fill(0).map((_, i) => map.get(nums1[i]));
    return res;
};  


class Stack {
    constructor() {
        this.count = 0;
        this.items = [];
    }
    top() {
        if (this.isEmpty()) return undefined;
        return this.items[this.count - 1];
    }
    push(element) {
        this.items[this.count] = element;
        this.count++;
    }
    pop() {
        if (this.isEmpty()) return undefined;
        const element = this.items[this.count - 1];
        delete this.items[this.count - 1];
        this.count--;
        return element;
    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return this.count;
    }
}
```
## 有效的括号
[20](https://leetcode.cn/problems/valid-parentheses/)
```js

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if (s.length === 0) {
        return true;
    }
    if (s.length % 2 !== 0) {
        return false;
    }
    let map = {
        ')': '(',
        ']': '[',
        '}': '{',
    };
    let left = ['(', '[', '{'];
    let right = [')', ']', '}'];
    let stack = new Stack();
    for (let i = 0; i < s.length; i++) {
        if (!right.includes(s[i])) {
            stack.push(s[i]);
        } else {
            const matchStr = map[s[i]];
            while (!stack.isEmpty()) {
                const element = stack.pop();
                if (left.includes(element) && matchStr !== element)  return false;
                if (element === matchStr) break;
            }
        }
    }
    return stack.isEmpty();
};
class Stack {
    constructor() {
        this.count = 0;
        this.items = [];
    }
    push(element) {
        this.items[this.count] = element;
        this.count++;
    }
    pop() {
        if (this.isEmpty()) return undefined;
        const element = this.items[this.count - 1];
        delete this.items[this.count - 1];
        this.count--;
        return element;
    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return this.count;
    }
}
```
## 简化路径
[71](https://leetcode.cn/problems/simplify-path/)
```js

/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
    let newPath = path.split('/');
    newPath = newPath.filter(item => item !== "");
    const stack = new Stack();
    for (let s of newPath) {
        if (s === '..') stack.pop();
        else if (s !== '.') stack.push(s);
    }
    if (stack.isEmpty()) return '/';
    let str = '';
    while (!stack.isEmpty()) {
        const element = stack.pop();
        str = '/' + element + str;
    }
    return str;
};
function handleBack(stack, tag, num) {
    if (!stack.isEmpty()) return num;
    const element = stack.pop();
    if (element === '..') return handleBack(stack, tag, num + 1);
    else {
        stack.push(element);
        return num;
    }
}
class Stack {
    constructor() {
        this.count = 0;
        this.items = [];
    }
    push(element) {
        this.items[this.count] = element;
        this.count++;
    }
    pop() {
        if (this.isEmpty()) return undefined;
        const element = this.items[this.count - 1];
        delete this.items[this.count - 1];
        this.count--;
        return element;
    }
    size() {
        return this.count;
    }
    isEmpty() {
        return this.size() === 0;
    }
}

```
## DFS
## 岛屿的最大面积
[695](https://leetcode.cn/problems/max-area-of-island/)
```js

/**
 * @param {number[][]} grid
 * @return {number}
 */
let maxX, maxY;let visited;let globalMaxArea;
var maxAreaOfIsland = function(grid) {
    visited = new Set();
    maxX = grid.length;
    maxY = grid[0].length;
    globalMaxArea = 0;
    for (let i = 0; i < maxX; i++) {
        for (let j = 0; j < maxY; j++) {
            if (grid[i][j] === 1) {
                visited.add(`(${i}, ${j})`);
                globalMaxArea = Math.max(globalMaxArea, dfs(grid, i, j));
            }
            visited.clear();
        }
    }
    return globalMaxArea;
};
function dfs(grid, x, y) {
    let res = 1;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (Math.abs(i) === Math.abs(j)) continue;
            const newX = x + i;
            const newY = y + j;
            if (newX >= maxX || newX < 0 || newY >= maxY || newY < 0) continue;
            if (visited.has(`(${newX}, ${newY})`)) continue;
            visited.add(`(${newX}, ${newY})`);
            const areaCnt = grid[newX][newY]
            if (areaCnt === 1) {
                const cnt = dfs(grid, newX, newY);
                res += cnt;
            } 
        }
    }
    return res;
}
```
## 相同的树
[100](https://leetcode.cn/problems/same-tree/)
```js

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if (p == null && q == null) return true;
    if (p == null || q == null) return false;
    if (p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

```
## 回溯算法
## N皇后
[51](https://leetcode.cn/problems/n-queens/)
```js

/**
 * @param {number} n
 * @return {string[][]}
 */
let result = [];
var solveNQueens = function(n) {
    result = [];
    let board = [];
    for (let i = 0; i < n; i++) {
      board[i] = [];
      for (let j = 0; j < n; j++) {
        board[i][j] = '.'
      }
    }
    backtrack(0, board, n);
    return result;
};
function deepClone(board) {
  let res = [];
  for (let i = 0; i < board.length; i++) {
    res.push(board[i].join(''));
  }
  return res;
}
function backtrack(row, board, n) {
    if (row === n) {
      result.push(deepClone(board));
      return;
    }
    for (let j = 0; j < n; j++) {
        if (checkInValid(board, row, j, n)) continue;
        board[row][j] = 'Q';
        backtrack(row + 1, board, n);
        board[row][j] = '.';
      }
}
function checkInValid(board, row, column, n) {
  // 行
  for (let i = 0; i < n; i++) {
    if (board[i][column] === 'Q') return true;
  }
  for (let i = row - 1, j = column + 1; i >= 0 && j < n; i--, j++) {
    if (board[i][j] === 'Q') return true;
  }
  for (let i = row - 1, j = column - 1; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 'Q') return true;
  }
  return false;
}
```
## 全排列
[46](https://leetcode.cn/problems/permutations/)
```js

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let results = [];var permute = function(nums) {
    results = [];
    backtrack(nums, []);
    return results;
};
function backtrack(nums, track) {
    if (nums.length === track.length) {
        results.push(track.slice());
        return;
    }
    for (let i = 0; i < nums.length; i++) {
        if (track.includes(nums[i])) continue;
        track.push(nums[i]);
        backtrack(nums, track);
        track.pop();
    }
}
```
## 括号生成
[22](https://leetcode.cn/problems/generate-parentheses/)
```js

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    let validRes = [];
    backtrack(n * 2, validRes, '');
    return validRes;
};
function backtrack(len, validRes, bracket) {
    if (bracket.length === len) {
        if (isValidCombination(bracket)) {
            validRes.push(bracket);
        }
        return;
    }
    for (let str of ['(', ')']) {
        bracket += str;
        backtrack(len, validRes, bracket);
        bracket = bracket.slice(0, bracket.length - 1);
    }
}
function isValidCombination(bracket) {
    let stack = new Stack();
    for (let i = 0; i < bracket.length; i++) {
        const str = bracket[i];
        if (str === '(') {
            stack.push(str);
        } else if (str === ')') {
            const top = stack.pop();
            if (top !== '(') return false;
        }
    }
    return stack.isEmpty();
}
class Stack {
    constructor() {
        this.count = 0;
        this.items = [];
    }
    push(element) {
        this.items[this.count] = element;
        this.count++;
    }
    pop() {
        if (this.isEmpty()) return;
        const element = this.items[this.count - 1];
        delete this.items[this.count - 1];
        this.count--;
        return element;
    }
    size() {
        return this.count;
    }
    isEmpty() {
        return this.size() === 0;
    }
}
```
## 复原IP地址
[93](https://leetcode.cn/problems/restore-ip-addresses/)
```js

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    if (s.length > 12) return [];
    let res = [];
    const track = [];
    backtrack(s, track, res);
    return res;
};
function backtrack(s, track, res) {
    if (track.length === 4 && s.length === 0) {
        res.push(track.join('.'));
        return;
    }
    let len = s.length >= 3 ? 3 : s.length;
    for (let i = 0; i < len; i++) {
        const c = s.slice(0, i + 1);
        if (parseInt(c) > 255) continue;
        if (i >= 1 &&  parseInt(c) < parseInt((1 + '0'.repeat(i)))) continue;
        track.push(c);
        backtrack(s.slice(i + 1), track, res);
        track.pop();
    }
}
```
## 子集
[78](https://leetcode.cn/problems/subsets/)
```js

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    if (nums.length === 0) return [[]];
    let resArr = [];
    backtrack(nums, 0, [], resArr);
    return resArr;
};
function backtrack(nums, index, subArr, resArr) {
    if (Array.isArray(subArr)) {
        resArr.push(subArr.slice());
    }
    if (index === nums.length) {
        return;
    } 
    for (let i = index; i < nums.length; i++) {
        subArr.push(nums[i]);
        backtrack(nums, i + 1, subArr, resArr);
        subArr.pop(nums[i]);
    }
}
```