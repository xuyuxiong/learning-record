# 算法
[](https://juejin.cn/post/6844904061947346957)
[瓶子君](https://github.com/sisterAn/JavaScript-Algorithms)
## 求平均时间
```js
const arr = ["8:01", "9:30", "11:50"]

let res = 0
arr.forEach(it => {
  res += new Date('2000/01/01' + it).getTime()
})
const a = new Date(res / arr.length)
console.log(`${a.getHours()}:${a.getMinutes()}`)
```

## 给定一个二叉树和一个数字 n，判断二叉树中是否有一个路径上的数字之和等于给定的数字 n
```js
function hasPathSum(root, sum) {
  if (!root) {
    return false;
  }
  if (!root.left && !root.right) {
    return sum === root.val;
  }
  return (
    hasPathSum(root.left, sum - root.val) ||
    hasPathSum(root.right, sum - root.val)
  );
}
```
## 编写函数convert(money) ，传入金额，将金额转换为千分位表示法。ex:-87654.3 => -87,654.3
```ts
function convert(money: number): string {
  let result: string[] = []; // 用于存放整数部分
  let negativeFlag: string = ""; // 是否要负号
  let tail: string = ""; // 用于存放小数点后面部分
  let arr: string[] = [...String(money)];

  // 判断是否是负数
  if (arr[0] === "-") {
    negativeFlag = "-";
    arr.shift();
  }

  // 判断是否存在小数点
  const dotIndex: number = arr.indexOf(".");
  if (dotIndex !== -1) {
    tail = arr.splice(dotIndex, arr.length - dotIndex).join("");
  }

  // 处理整数部分加上千分位
  const reverseArray: string[] = arr.reverse();
  for (let i = 0; i < reverseArray.length; i++) {
    if ((i + 1) % 3 === 0 && i + 1 < reverseArray.length) {
      result[i] = "," + reverseArray[i];
    } else {
      result[i] = reverseArray[i];
    }
  }
  return negativeFlag + result.reverse().join("") + tail;
}
```
从根节点到叶节点的路径数字之和
```js
var sumNumbers = function(root) {
  return dfs(root, 0)
}
const dfs = (root, preSum) => {
  if (root === null) {
    return 0
  }
  const sum = prevSum * 10 + root.val;
  if (root.left == null  && root.right == null) {
    return sum
  } else {
    return dfs(root.left, sum) + dfs(root.right, sum)
  }
}
```

## 11盛水最多的容器
```js
/**
 * @param {nubmer[]} height
 * @return {number}
 */
let maxArea = function(height) {
  let left = 0, right = height.length - 1, max = 0;
  while (left < right) {
    let currentValue = (right - left ) * Math.min(height[left], height[right])
    max = Math.max(max, currentValue)
    if (height(left) < height(right)) {
      left ++
    } else {
      right --
    }
  }
  return max
}
```
## 岛屿数量
```js
var numIslands = function(grid) {
  let count = 0;
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j ++) {
      if (grid[i][j] === '1') {
        count += 1
        turnZero(i, j, grid)
      }
    }
  }
  return count
};

function turnZero(i, j , grid) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[i].length || grid[i][j] === '0') return;
    grid[i][j] = '0'
    turnZero(i, j - 1, grid)
    turnZero(i -1, j, grid)
    turnZero(i, j + 1, grid)
    turnZero(i + 1, j, grid)
}
```
## 46全排列
```js
function permute(nums) {
  let result = []
  const map = new Map()
  let backtracking = (path = []) => {
    if (path.length === nums.length) {
      result.push([...path])
      return
    }
    for(let i = 0;i < nums.length; i++) {
      if (map.has(nums[i])) continue;
      map.set(nums[i], true)
      path.push(nums[i])
      backtracking(path)
      path.pop()
      map.delete(nums[i], false)
    }
  }
  backtracking()
  return result;
}
```
## 509斐波那契数列
```js
var fibonacci = function() {
  let memo = [0, 1]
  let fib = function(n) {
    if (memo[n] === undefined) {
      memo[n] = fib(n-2) + fib(n-1)
    }
    return memo[n]
  }
  return fib;
}()
```
## 121买卖股票的最佳时机
```js
var maxProfit = function(prices) {
  if (prices.length === 0) return 0;
  let min = prices[0], max = 0;
  for(let p of prices) {
      min = Math.min(p, min)
      max = Math.max(max, p - min)
  }
  return max
};
```
## 122买卖股票的最佳时机2
```js
var maxProfit = function(prices) {
    let ans = 0;
    for(let i = 1, len = prices.length; i < len; i++){
        ans += Math.max(0, prices[i] - prices[i - 1]);
    }
    return ans;
};

```
## 70爬楼梯
```js
var climbStairs = function(n) {
  let p = 0, q = 0, r = 1;
  for(let i = 1; i <= n; i++) {
      p = q;
      q = r;
      r = q + p;
  }
  return r;
};
```
## 746使用最小花费爬楼梯
```js
var minCostClimbingStairs = function(cost) {
    
    let len = cost.length;
    let arr = [];
    arr[0] = cost[0];
    arr[1] = cost[1];

    for(let i = 2; i < len; i++) {
        arr[i] = Math.min(arr[i-1] , arr[i-2]) + cost[i]
    }

    return Math.min(arr[len-1], arr[len-2]);
};

```
## 实现一个函数, fetchWithRetry 会自动重试3次，任意一次成功直接返回

## 64个运动员, 8个跑道, 如果要选出前四名, 至少跑几次?

## 93复原ip地址
```js
var restoreIpAddresses = function(s) {
    const res = [], path = [];
    backtracking(0, 0)
    return res;
    function backtracking(i) {
        const len = path.length;
        if(len > 4) return;
        if(len === 4 && i === s.length) {
            res.push(path.join("."));
            return;
        }
        for(let j = i; j < s.length; j++) {
            const str = s.slice(i, j + 1);
            if(str.length > 3 || +str > 255) break;
            if(str.length > 1 && str[0] === "0") break;
            path.push(str);
            backtracking(j + 1);
            path.pop()
        }
    }
};
```
## 手机号3-3-4分割
```js

// 适合纯11位手机
const splitMobile = (mobile, format = '-') => {
  return String(mobile).replace(/(?=(\d{4})+$)/g, format)
}
// 适合11位以内的分割
const splitMobile2 = (mobile, format = '-') => {
  return String(mobile).replace(/(?<=(\d{3}))/, format).replace(/(?<=([\d\-]{8}))/, format)
}

console.log(splitMobile(18379802267)) // 183-7980-2267
console.log(splitMobile2(18379876545)) // 183-7987-6545
```
## 千分位格式化数字
```js
// 将123456789变成123,456,789 且要支持小数

// 金额转千分位
const formatPrice = (number) => {
  number = '' + number

  const [ integer, decimal = '' ] = number.split('.')

  return integer.replace(/\B(?=(\d{3})+$)/g, ',') + (decimal ? '.' + decimal : '')
}

console.log(formatPrice(123456789.3343)) // 123,456,789.3343

```
## 字符串转为驼峰
```js

const camelCase = (string) => {
  const camelCaseRegex = /[-_\s]+(.)?/g

  return string.replace(camelCaseRegex, (match, char) => {
    return char ? char.toUpperCase() : ''
  })
}

// 测试
console.log(camelCase('foo Bar')) // fooBar 
console.log(camelCase('foo-bar--')) // fooBar 
console.log(camelCase('foo_bar__')) // fooBar
```
## 实现一个链表结构
```js
// 模拟链表结构 增删改查
class Node {
  constructor(element, next) {
    this.element = element
    this.next = next;
  }
}
class LinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }
  add(index, element) {
    if (arguments.length === 1) {
      // 向末尾添加
      element = index
      index = this.size
    }
    if (index < 0 || index > this.size) {
      throw new Error('添加的索引不正常')
    }
    if (index === 0) {
      // 直接找到头部 把头部改掉
      let head = this.head;
      this.head = new Node(element, head)
    } else {
      // 获取当前头指针
      let current = this.head
      // 找到前一个
      for(let i = 0; i < index - 1; i++) { 
        current = current.next
      }
      current.next = new Node(element, current.next)
    }
    this.size ++
  }
  remove(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('删除的索引错误')
    }
    this.size --
    if (index === 0) {
      let head = this.head;
      this.head = this.head.next
      return head;
    } else {
      let current = this.head;
      for(let i = 0; i < index - 1; i++) {
        current = current.next;
      }
      let returnVal = current.next
      current.next = current.next.next
      return returnVal
    }
  }
  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('查找的索引不正确')
    }
    let current = this.head;
    for(let i = 0; i < index; i++) {
      current = current.next
    }
    return current;
  }
}
var ll = new LinkedList()
ll.add(0, 100)
ll.add(0, 200)
ll.add(1, 500)
ll.add(300)
ll.remove(0)
```
## 两数相加
```js
var addTwoNumbers = function(l1, l2) {
  let head = null, tail = null, carry = 0;
  while(l1 || l2) {
    const n1 = l1 ? l1.val : 0;
    const n2 = l2 ? l2.val : 0;
    const sum = n1 + n2 + carry;
    if (!head) {
      head = tail = new ListNode(sum % 10);
    } else {
      tail.next = new ListNode(sum % 10);
      tail = tail.next;
    }
    carry = Math.floor(sum / 10);
    if (l1) {
      l1 = l1.next;
    }
    if (l2) {
      l2 = l2.next;
    }
  }
  if (carry > 0) {
    tail.next = new ListNode(carry);
  }
  return head;
};
```
[排序策略](https://mp.weixin.qq.com/s/N_6vAyZYdD41yoe7-KYfnw)
反转链表206

数组去重
将奇数排在前面，偶数排在后面。要求时间复杂度O(n)。空间复杂度O(1)（不能用splice）
数组转树结构
解析出URL中所有的部分
实现一个compare函数，比较两个对象是否相同
螺旋矩阵
大数相加
找出出现次数最多的英语单词
节点倒序（将ul.id=list，将ul节点下的10000个li节点倒序。考虑性能。）
实现一个函数计算 "1+12-31+100-93"
判断链表是否有环

爬楼梯
删除单向链表中的某个节点
柯里化
中划线转大写
千位分割
使用es5实现es6的let关键字

leetcode
两数之和 三数之和
300
239
LRU

