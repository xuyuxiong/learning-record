# 前端学算法

## 列表
列表是一组有序的数据。每个列表中的数据项称为元素。
### 实现
```js
function list() {
  this.listSize = 0;
  this.pos = 0;
  this.dataStore = []
  this.clear = clear;
  this.find = find;
  this.toString = toString;
  this.insert = insert;
  this.append = append;
  this.remove = remove;
  this.front = front;
  this.end = end;
  this.prev = prev;
  this.next = next;
  this.length = length;
  this.currPos = currPos;
  this.moveTo = moveTo;
  this.getElement = getElement;
  this.length = length;
  this.contains = contains; 
}

function append(element) {
  this.dataStore[this.listSize++] = element;
}

function find(element) {
  for(var i = 0; i < this.dataStore.length; ++i) {
    if (this.dataStore[i] === element) {
      return i;
    }
  }
  return -1;
}

function remove(element) {
  var foundAt = this.find(element)
  if (foundAt > -1) {
    this.dataStore.splice(foundAt, 1)
    -- this.listSize;
    return true;
  }
  return false;
}

function length() {
  return this.listSize;
}

function toString() {
  return this.dataStore;
}

function insert(element, after) {
  var insertPos = this.find(after)
  if (insertPos > -1) {
    this.dataStore.splice(insertPos + 1, 0, element)
    ++ this.listSize;
    return true;
  }
  return false;
}

function clear() {
  delete this.dataStore;
  this.dataStore = []
  this.listSize = this.pos = 0;
}

function contains(element) {
  for(var i = 0; i < this.dataSore.length; ++ i) {
    if (this.dataStore[i] === element) {
      return true;
    }
  }
  return false;
}

function front() {
  this.pos = 0;
}

function end() {
  this.pos = this.listSize - 1;
}

function prev() {
  if (this.pos > 0) {
    -- this.pos;
  }
}

function next() {
  if (this.pos < this.liseSize - 1) {
    ++ this.pos;
  }
}

function currPos() {
  return this.pos;
}

function moveTo(position) {
  this.pos = position;
}

function getElement() {
  return this.dataStore[this.pos]
}
```
## 栈
```js
function Stack() {
  this.dataStore = []
  this.top = 0;
  this.push = push;
  this.pop = pop;
  this.peek = peek;
}

function push(element) {
  this.dataStore[this.top ++] = element;
}

function pop() {
  return this.dataStore[--this.top]
}

function peek() {
  return this.dataStore[this.top - 1]
}

function length() {
  return this.top
}

function clear() {
  this.top = 0
}
```
判断给定字符串是否是回文
```js
function isPalindrome(word) {
  var s = new Stack()
  for(var i = 0; i < word.length; ++i) {
    s.push(word[i])
  }
  var rword = ''
  while(s.length() > 0) {
    rword += s.pop()
  }
  if (word == rword) {
    return true;
  }
  return false
}
```
使用栈模拟递归过程
```js
function fact(n) {
  var s = new Stack()
  while(n > 1) {
    s.push(n --)
  }
  var product = 1;
  while(s.length() > 0) {
    product *= s.pop()
  }
  return product;
}
```
## 队列
```js
function Queue() {
  this.dataStore = []
  this.enqueue = enqueue;
  this.dequeue = dequeue;
  this.front = front;
  this.back = back
  this.toString = toString;
  this.empty = empty
}

function enqueue(element) {
  this.dataStore.push(element)
}

function dequeue() {
  return this.dataStore.shift()
}

function front() { 
  return this.dataStore[0]
}

function back() {
  return this.dataStore[this.dataStore.length - 1]
}

function toString() {
  var retStr = ''
  for(var i = 0; i < this.dataStore.length; ++i) {
    retStr += this.dataStore[i] + '\n'
  }
  return retStr;
}

function empty() {
  if (this.dataStore.length == 0) {
    return true;
  }
  return false;
}
```
基数排序
```js
var queues = []
for(var i = 0; i < 10; i++) {
  queues[i] = new Queue()
}
function distribute(nums, queues, n, digit){
  for(var i = 0; i < n; ++ i) {
    if (digit == 1) {
      queues[nums[i]%10].enqueue(nums[i])
    } else {
      queues[Math.floor(nums[i] / 10)].enqueue(nums[i])
    }
  }
}
function collect(queues, nums) {
  var i = 0;
  for(var digit = 0; digit < 10; digit ++) {
    while(!queues[digit].empty()) {
      nums[i++] = queue[digit].dequeue()
    }
  }
}
```
优先队列
```js
function dequeue() {
  var priority = this.dataStore[0].code;
  for(var i = 1; i < this.dataStore.length; ++i) {
    if (this.dataStore[i].code < priority) {
      priority = i
    }
  }
  return this.dataStore.splice(priority, 1)
}
```
## 链表
链表是由一组节点组成的集合。每个节点都是用一个对象的引用指向它的后继。指向另一个节点的引用叫做链。Node类用来表示节点，LinkedList类提供了插入节点、显示列表元素的方法，以及其它一些辅助方法。
```js
function Node(element) {
  this.element = element;
  this.next = null;
}
function LList() {
  this.head = new Node('head')
  this.find = find;
  this.insert = insert;
  this.remove = remove
  this.display = display;
}

function find(item) {
  var currNode = this.head;
  while(currNode.element != item) {
    currNode = currNode.next;
  }
  return currNode;
}

function insert(newElement, item) {
  var newNode = new Node(newElement)
  var current = this.find(item)
  newNode.next = current.next;
  current.next = newNode
}

function findPrevious(item) {
  var currNode = this.head;
  while(!(currNode.next == null) && (currNode.next.element != item)) {
    currNode = currNode.next;
  }
  return currNode;
}

function remove(item) {
  var prevNode = this.findPrevious(item)
  if (!(prevNode.next == null)) {
    prevNode.next = prevNode.next.next
  }
}

function display() {
  var currNode = this.head;
  while(!(currNode.next == null)) {
    print(currNode.next.element)
    currNode = currNode.next;
  }
}
```
双向链表
```js
function Node(element) {
  this.element = element;
  this.next = null;
  this.previous = null;
}

function insert(newElement, item) {
  var newNode = new Node(newElement)
  var current = this.find(item)
  newNode.next = current.next;
  newNode.previous = current;
  current.next = newNode;
}
function remove(item) {
  var currNode = this.find(item)
  if (!(currNode.next == null)) {
    currNode.previous.next = currNode.next;
    currNode.next.previous = currNode.previous
    currNode.next = null
    currNode.previous = null;
  }
}
function findLast() {
  var currNode = this.head;
  while(!(currNode.next == null)) {
    currNode = currNode.next;
  }
  return currNode
}
```
## 字典
```js
function Dictionary() {
  this.add = add;
  this.datastore = new Array()
  this.find = find;
  this.remove = remove
  this.count = count
  this.showAll = showAll
}

function add(key, value) {
  this.datastore[key] = value
}

function find(key) {
  return this.datastore[key]
}

function remove(key) {
  delete this.datastore[key]
}

function count() {
  var n = 0;
  for(var key in Object.keys(this.datastore)) {
    ++n
  }
  return n;
}

function showAll() {
  for(var key in Object.keys(this.datastore)) {
    print(key + '->' + this.datastore[key])
  }
}
```

## 散列
散列是一种常用的数据存储技术，散列后的数据可以快速的插入或取用。散列使用的数据结构叫做散列表。在散列表上插入、删除和取用数据都非常快，对于查找操作来说却效率低下。散列函数会将每个键值映射为一个唯一的数组索引
```js
function HashTable() {
  this.table = new Array(137)
  this.simpleHash = simpleHash;
  this.betterHash = betterHash;
  this.showDistro = showDistro
  this.put = put
}

function simpleHash(data) {
  var total = 0;
  for(var i = 0; i < data.length; i++) {
    total += data.charCodeAt(i)
  }
  return total % this.table.length;
}

function showDistro() {
  var n = 0;
  for(var i = 0; i < this.table.length; i ++) {
    if (this.table[i] != undefined) {
      print(i + ': ' + this.table[i])
    }
  }
}

function betterHash(string) {
  const H = 37
  var total = 0;
  for(var i = 0; i < string.length; i++) {
    total += H * total + string.charCodeAt(i)
  }
  total = total % this.table.length;
  if (total < 0) {
    total += this.table.length - 1;
  }
  return parseInt(total)
}

function put(data) {
  var pos = this.betterHash(data)
  this.table[pos] = data;
}
```
碰撞处理：开链法、线性探测法
```js
function put(key, data) {
  var pos = this.betterHash(key)
  var index = 0;
  if (this.table[pos][index] == undefined) {
    this.table[pos][index] = data
  } else {
    while(this.table[pos][index] != undefined) {
      ++index
    }
    this.table[pos][index] = data
  }
}

function get(key) {
  var index = 0;
  var pos = this.betterHash(key)
  while((this.table[pos][index] != undefined) && (this.table[pos][index]) != key) {
    index += 1
  }
  if (this.table[pos][index] == key) {
    return this.table[pos][index]
  } else {
    return undefined
  }
}
```
线性探测法
在HashTable的构造函数中加入下面一行代码
this.values = []
```js
function put(key, data) {
  var pos = this.betterHash[key]
  if (this.table[pos] == undefined) {
    this.table[pos] = key
    this.values[pos] = data;
  } else {
    while(this.table[pos] != undefined) {
      pos ++
    }
    this.table[pos] = key;
    this.values[pos] = data
  }
}

function get(key) {
  var hash = -1;
  hash = this.betterHash(key)
  if (hash > -1) {
    for(var i = hash; this.table[hash] != undefined; i++) {
      if (this.table[kash] == key) {
        return this.values[hash]
      }
    }
  }
}
```
## 集合
```js
function Set() {
  this.dataStore = []
  this.add = add;
  this.remove = remove
  this.size = size;
  this.union = union
  this.intersect = intersect
  this.subset = subset;
  this.difference = difference
  this.show = show
}

function add(data) {
  if (this.dataStore.indexof(data) < 0) {
    this.dataStore.push(data)
    return true
  } else {
    return false
  }
}

function remove(data) {
  var pos = this.dataStore.indexOf(data)
  if (pos > -1) {
    this.dataStore.splice(pos, 1)
    return true;
  } else {
    return false
  }
}

function show() {
  return this.dataStore;
}

function contains(data) {
  if (this.dataStore.indexOf(data) > -1) {
    return true
  } else {
    return false
  }
}

function union(set) {
  var tempSet = new Set()
  for(var i = 0; i < this.dataStore.length; i++) {
    tempSet.add(this.dataStore[i])
  }
  for(var i = 0; i < set.dataStore.length; i++) {
    if (!tempSet.contains(set.dataStore[i])) {
      tempSet.dataStore.push(set.dataStore[i])
    }
  }
  return tempSet;
}

function intersect(set) {
  var tempSet = new Set()
  for(var i = 0; i < this.dataStore.length; i ++) {
    if (set.contains(this.dataStore[i])) {
      tempSet.add(this.dataStore[i])
    }
  }
  return tempSet;
}
```
## 二叉树和二叉查找树
```js
function Node(data, left, right) {
  this.data = data
  this.left = left;
  this.right = right;
  this.show = show
}

function show() {
  return this.data
}

function BST() {
  this.root = null;
  this.insert = insert;
  this.inOrder = inOrder
}

function insert(data) {
  var n = new Node(data, null, null)
  if (this.root == null) {
    this.root = n
  } else {
    var current = this.root
    var parent
    while(true) {
      parent = current;
      if (data < current.data) {
        current = current.left
        if (current == null) {
          parent.left = n;
          break;
        }
      } else {
        current = current.right;
        if (current == null) {
          parent.right = n;
          break;
        }
      }
    }
  }
}
// 中序遍历
function inOrder(node) {
  if (node != null) {
    inOrder(node.left)
    putstr(node.show() + ' ')
    inOrder(node.right)
  }
}
// 先序遍历
function preOrder(node) {
  if (node != null) {
    putstr(node.show() + ' ')
    preOrder(node.left)
    preOrder(node.right)
  }
}
// 后序遍历
function postOrder(node) {
  if (node != null) {
    postOrder(node.left)
    postOrder(node.right)
    putstr(node.show() + ' ')
  }
}
```
在二叉树上查找，三种查找类型
```js
// 查找最大值
function getMax() {
  var current = this.root;
  while(!(current.right == null)) {
    current = current.right;
  }
  return current.data;
}
// 查找最小值
function getMin() {
  var current = this.root
  while(!(current.left == null)) {
    current = current.left
  }
  return currrent.data
}
// 查找给定值
function find(data) {
  var current = this.root;
  while(current != null) {
    if (current.data === data) {
      return current;
    } else if (data < current.data) {
      current = current.left;
    } else {
      current = current.right;
    }
  }
  return null
}
```
从二叉树上删除节点
从BST上删除节点的操作最复杂，其复杂程度取决于删除哪个节点，如果没有子节点的节点就非常简单，如果节点有一个子节点，就有点复杂，删除包含两个子节点的节点最复杂。
```js
function remove(data) {
  root = removeNode(this.root, data)
}

function removeNode(node, data) {
  if (node == null) {
    return null;
  }
  if (data = node.data) {
    if (node.left == null && node.right == null) {
      return null
    }
    if (node.left == null) {
      return node.right;
    }
    if (node.right == null) {
      return node.left
    }
    var tempNode = getSmallest(node.right)
    node.data = tempNode.data
    node.right = removeNode(node.right, tempNode.data)
    return node;
  } else if (data < node.data) {
    node.left = removeNode(node.left, data)
    return node;
  } else {
    node.right = removeNode(node.right, data)
    return node;
  }
}
```
## 图和图算法
图由边的集合及顶点的集合组成
表示图的边的方法称为邻接表或者邻接数组。这种方法将边存储为由顶点的相邻顶点列表构成的数组，并以此顶点作为作为索引。
另一种表示图边的方法被称为邻接矩阵，它是一个二维数组，其中的元素表示两个顶点间是否有一条边。
```js
function Graph(v) {
  this.vertices = v;
  this.edges = 0
  this.adj = []
  this.marked = []
  for(var i = 0; i < this.vertices; i ++) {
    this.adj[i] = []
    this.adj[i].push('')
  }
  this.addEdge = addEdge;
  this.dfs = dfs
  this.bfs = bfs
  this.toString = toString;
}

function addEdge(v, w) {
  this.adj[v].push(w)
  this.adj[w].push(v)
  this.edges++;
}

function dfs(v) {
  this.marked[v] = true;
  if (this.adj[v] != undefined) {
    print('visited vertext: ' + v)
  }
  for(var w in this.adj[v]) {
    if (!this.marked[w]) {
      this.dfs[w]
    }
  }
}

function bfs(s) {
  var queue = []
  this.marked[s] = true;
  queue.push(s)
  while(queue.length > 0) {
    var v = queue.shift()
    if (v == undefined) {
      print('visited vertext: ' + v)
    }
    for(var w in this.adj[v]) {
      if (!this.marked[w]) {
        this.edgeTo[w] = v
        this.marked[w] = true;
        queue.push(w)
      }
    }
  }
}
```
广度优先搜索对应的最短路径
需要一个数组来保存从一个顶点到下一个顶点的所有边，这个数组命名为edgeTo
pathTo()创建了一个栈，用来存储与指定顶点有共同边的所有顶点
```js
function pathTo(v) {
  var source = 0;
  if (!this.hasPathTo(v)) {
    return undefined;
  }
  var path = []
  for(var i = v; i != source; i = this.edgeTo[i]) {
    path.push(i)
  }
  path.push(s)
  return path;
}
function hashPathTo(v) {
  return this.marked[v]
}
```
拓扑排序会对有向图的所有顶点进行排序，使有向边从前面的顶点指向后面的顶点。拓扑排序算法拆分为两个函数。第一个函数topSort(),会设置排序进程并调用一个辅助函数topSortHelper() 然后显示排序好的顶点列表
```js
function topSort() {
  var stack = []
  var visited = []
  for(var i = 0; i < this.vertices; i++) {
    visited[i] = false
  }
  for(var i = 0; i < this.vertices; i++) {
    if (visited[i] == false) {
      this.topSortHelper(i, visited, stack)
    }
  }
  for(var i = 0; i < stack.length; i ++) {
    if (stack[i] !== undefined && stack[i] != false) {
      print(this.vertexList[stack[i]])
    }
  }
}
function topSortHelper(v, visited, stack) {
  visited[v] = true;
  for(var w in this.adj[v]) {
    if (!visited[w]) {
      this.topSortHelper(visited[w], visited, stack)
    }
  }
  stack.push(v)
}
```
## 排序算法
```js
// 冒泡排序
function bubbleSort(arr) {
  var len = arr.length;
  for (var i = len; i >= 2; --i) {
    for (var j = 0; j < i - 1; ++ j) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  return arr
}
// 选择排序
function selectionSort(arr) {
  for(var i = 0; i < arr.length - 2; ++ i) {
    for(var j = i + 1; j < arr.length; j ++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
  }
  return arr
}
// 插入排序
function insertionSort(arr) {
  var i, j;
  for(i = 1; i < arr.length; i++) {
    j = i
    while(j > 0 && arr[j - 1] > arr[j]) {
      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
      j--
    }
  }
  return arr
}
// 希尔排序
function shellSort(arr) {
  let len = arr.length;
  // gap 即为增量
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      let j = i;
      let current = arr[i];
      while(j - gap >= 0 && current < arr[j - gap]) {
        arr[j] = arr[j - gap];
        j = j - gap;
      }
      arr[j] = current;
    }
  }
}
 
// 归并排序
function mergeSort(arr) {
  if (arr.length <= 1) return arr
  const midIdx = Math.floor(arr.length / 2)
  return merge(mergeSort(arr.slice(0, midIdx)), mergeSort(arr.slice(midIndx)))
}

function merge(leftArr, rightArr) {
  let temp = []
  while(leftArr.length > 0 && rightArr.length > 0) {
    if (leftArr[0] < rightArr[0]) {
      temp.push(leftArr.shift())
    } else {
      temp.push(rightArr.shift())
    }
  }
  return temp.concat(leftArr).concat(rightArr)
}
// 快速排序
function qSort(arr) {
  if (arr.length == 0) {
    return []
  }
  var left = []
  var right = []
  var pivot = arr[0]
  for(var i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return qSort(left).concat(pivot, qSort(right))
}
```
## 检索算法
```js
// 查找最小值
function findMin(arr) {
  var min = arr[0]
  for(var i = 0; i < arr.length; i ++) {
    if (arr[i] < min) {
      min = arr[i]
    }
  }
  return min;
}

// 查找最大值
function findMax(arr) {
  var max = arr[0]
  for(var i = 0; i < arr.length; i ++) {
    if (arr[i] > max) {
      max = arr[i]
    }
  }
  return max;
}

// 二分查找
function binSearch(arr, data) {
  var upperBound = arr.length - 1
  var lowerBound = 0
  while(lowerBound <= upperBound) {
    var mid = Math.floor((upperBound + lowerBound) / 2)
    if (arr[mid] < data) {
      lowerBound = mid + 1
    } else if (arr[mid] > data) {
      upperBound = mid - 1
    } else {
      return mid
    }
  }
  return -1
}
```


## 高级算法
### 动态规划
使用递归去解决问题虽然简洁，但效率不高。许多使用递归去解决的编程问题可以重写为使用动态规划的技巧去解决。动态规划方案通常会使用一个数组来建立一张表，用于存放被分解成众多子问题的解。当算法执行完毕，最终的解将会在这个表中很明显的地方被找到。
```js
// 这个函数的问题在于它的执行效率非常低
function recurFib(n) {
  if (n < 2) {
    return n;
  }
  return recurFib(n - 1) + recurFib(n - 2)
}
// 动态规划
function dynFib(n) {
  var val = []
  for(var i = 0; i <= n; ++ i) {
    val[i] = 0;
  }
  if (n === 1 || n === 2) {
    return 1;
  }
  val[1] = 1
  val[2] = 2;
  for(var i = 3; i<= n; i++) {
    val[i] = val[i - 1] + val[i - 2]
  }
  return val[n - 1]
}
```
寻找最长公共子串
```js
function lcs(word1, word2) {
  var max = 0;
  var index = 0;
  var lcsarr = new Array(word1.length)
  for (let i = 0; i <= word1.length; ++i) {
    lcsarr[i] = new Array(word2.length);
    for (var j = 0; j <= word2.length; ++j) {
      lcsarr[i][j] = 0
    }
  }
  for (let i = 0; i < word1.length; ++i) {
    for (let j = 0; j < word2.length; ++j) {
      if (i == 0 ||
        j == 0) {
        lcsarr[i][j] = 0
      } else {
        if (word1[i - 1] == word2[j - 1]) {
          lcsarr[i][j] = lcsarr[i - 1][j - 1] + 1
        } else {
          lcsarr[i][j] = 0
        }
      }
      if (max < lcsarr[i][j]) {
        max = lcsarr[i][j];
        index = i
      }
    }
  }
  var str = ''
  if (max == 0) {
    return ''
  } else {
    for (let i = index - max; i < max; ++i) {
      str += word2[i]
    }
    return str
  }
}
```
背包问题
```js
// 递归解决
function max(a, b) {
  return a > b ? a : b
}
function knapsack(capacity, size, value, n) {
  if (n == 0 || capacity == 0) {
    return 0
  }
  if (size[n - 1] > capacity) {
    return knapsack(capacity, size, value, n - 1)
  } else {
    return max(value[n - 1] + knapsack(capacity - size[n - 1], size, value, n - 1), knapsack(capacity, size, value, n - 1))
  }
}
// 动态规划
function dKnapsack(capacity, size, value, n) {
  var K = []
  for (var i = 0; i <= n; i++) {
    K[i] = []
  }
  console.log(K)
  for (var i = 0; i <= n; i++) {
    for (var w = 0; w <= capacity; w++) {
      if (i == 0 || w == 0) {
        K[i][w] = 0
      } else if (size[i - 1] <= w) {
        K[i][w] = max(value[i - 1] + K[i - 1][w - size[i - 1]], K[i - 1][w])
      } else {
        K[i][w] = K[i - 1][w]
      }
    }
  }
  return K[n][capacity]
}
```
### 贪心算法
找零问题的贪心算法解法
```js
function makeChange(origAmt, coins) {
  var remainAmt = 0;
  if (origAmt % .25 < origAmt) {
    coins[3] = parseInt(origAmt / .25)
    remainAmt = origAmt % .25
    origAmt = remainAmt
  }
  if (origAmt % .1 < origAmt) {
    coins[2] = parseInt(origAmt / .1)
    remainAmt = origAmt % .1
    origAmt = remainAmt
  }
  if (origAmt % .1 < origAmt) {
    coins[1] = parseInt(origAmt / .05)
    remainAmt = origAmt % .05
    origAmt = remainAmt
  }
  coints[0] = parseInt(origAmt / .01)
}
```
部分背包问题
```js
function ksack(values, weights, capacity) {
  let load = 0,
    i = 0,
    w = 0
  while (load < capacity && i < 4) {
    if (weights[i] <= (capacity - load)) {
      w += values[i];
      load += weights[i]
    } else {
      var r = (capacity - load) / wegiths[i];
      w += r * values[i];
      load += weights[i]
    }
    ++i
  }
  return w
}
```