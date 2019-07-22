## 算法

### 输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。(leetCode 相似题 #7)

```js
function reverseInt(number) {
  if (!isInt(number)) {
    throw new Error('number must be a int')
  }

  if (number === 0) {
    return 0
  }

  const flag = number < 0 ? '-' : ''

  let num = Math.abs(number)

  while (num % 10 === 0) {
    num = num / 10
  }

  let result = ''
  while (num >= 10) {
    const temp = num % 10
    result += temp
    num = parseInt(num / 10)
  }
  return flag + result + num
}
```

有一些边界需要考虑，比如正负数，最后一位 0

### topK

常见题

https://www.zhihu.com/question/28874340

### dfs bfs

```js
const root = [
  {
    id: '1',
    children: [
      {
        id: '1-1',
        children: [
          {
            id: '1-1-1'
          },
          {
            id: '1-1-2'
          }
        ]
      },
      {
        id: '1-2',
        children: [
          {
            id: '1-2-1'
          },
          {
            id: '1-2-2'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    children: [
      {
        id: '2-1',
        children: [
          {
            id: '2-1-1'
          },
          {
            id: '2-1-2'
          }
        ]
      },
      {
        id: '2-2',
        children: [
          {
            id: '2-2-1'
          },
          {
            id: '2-2-2'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    children: [
      {
        id: '3-1',
        children: [
          {
            id: '3-1-1'
          },
          {
            id: '3-1-2'
          }
        ]
      },
      {
        id: '3-2',
        children: [
          {
            id: '3-2-1'
          },
          {
            id: '3-2-2'
          }
        ]
      }
    ]
  }
]
```

### 两数之和（必回简单题 LeetCode #1）

给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。

你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。

示例：

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

```js
var twoSum = function(nums, target) {
  const numsMap = {}
  for (let i = 0; i < nums.length; i++) {
    const cur = nums[i]
    if (numsMap[cur] !== undefined) {
      return [numsMap[cur], i]
    } else {
      const rest = target - cur
      numsMap[rest] = i
    }
  }
}
```

### 判断一定范围内有多少质数 （leetCode #204）

```js
function countPrimes(k) {
  let count = 0
  const hashMap = {}
  for (let i = 2; i < k; i++) {
    if (!hashMap[i]) {
      count++
      for (let j = 2; i * j < k; j++) {
        hashMap[i * j] = true
      }
    }
  }
  return count
}
```

优化：

```js
var countPrimes = function(n) {
  const arr = new Array(n + 1).fill(true)
  let count = 0

  for (let i = 2; i < n; i++) {
    if (arr[i]) {
      // 如果i是质数
      for (let j = i + i; j < n; j = j + i) {
        arr[j] = false // i的n倍数肯定不是质数
      }
      count++
    }
  }
  return count
}
```

### 二分查找(必会)

```js
const binarySearch = function(arr, target) {
  let start = 0
  let end = arr.length - 1

  while (start <= end) {
    const mid = Math.floor((start + end) / 2)
    const cur = arr[mid]

    if (cur === target) {
      return mid
    }

    if (cur < target) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
  return false
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(binarySearch(arr, 6))
```

### 有效的括号数 (leetCode #20)

Input: "()[]{}"
Output: true
Example 3:

Input: "(]"
Output: false

```js
var isValid = function(s) {
  const hashMap = {
    ']': '[',
    '}': '{',
    ')': '('
  }

  const stacks = []

  for (let i = 0; i < s.length; i++) {
    const cur = s[i]
    if (!hashMap[cur]) {
      stacks.push(cur)
    } else {
      const pop = stacks.pop()
      if (pop !== hashMap[cur]) {
        return false
      }
    }
  }

  return stacks.length === 0
}
```

### 无重复字符的最长子串 （leetCode #3）

```js
var lengthOfLongestSubstring = function(s) {
  if (s.length <= 1) return s.length
  let longest = 0
  let longestS = s[0]
  for (let index = 1; index < s.length; index++) {
    const cur = s[index]

    const hasRepeat = longestS.indexOf(cur)
    if (hasRepeat >= 0) {
      longest = Math.max(longest, longestS.length)
      longestS = (longestS + cur).slice(hasRepeat + 1)
    } else {
      longestS += cur
    }
  }
  return Math.max(longest, longestS.length)
}
```

### container-with-most-water （leetCode #11）

```js
var maxArea = function(height) {
  let max = 0
  let start = 0
  let end = height.length - 1
  while (start < end) {
    const h = Math.min(height[start], height[end])
    const w = end - start
    const area = h * w
    max = Math.max(max, area)
    if (height[start] >= height[end]) {
      end--
    } else {
      start++
    }
  }
  return max
}
```

### 罗马数字转化 （LeetCode #13）

```js
var romanToInt = function(s) {
  var map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  }

  var sum = 0
  for (var i = 0; i < s.length; i++) {
    var v1 = map[s[i]]
    var v2 = map[s[i + 1]]
    if (v2 > v1) {
      sum = sum + v2 - v1
      i++
    } else {
      sum = sum + v1
    }
  }
  return sum
}
```

### 大数相加

如何实现两个非常大的数字(已经超出了 Number 范围)的加法运算。

注意由于这两个已经超过了 Number 范围，因此不能用 Number 存，这里我们选择使用字符串存储。

```js
function bigNumberSum(a, b) {
  // 123456789
  // 000009876

  // padding
  let cur = 0
  while (cur < a.length || cur < b.length) {
    if (!a[cur]) {
      a = '0' + a
    } else if (!b[cur]) {
      b = '0' + b
    }
    cur++
  }

  let curried = 0
  const res = []

  for (let i = a.length - 1; i > -1; i--) {
    const sum = curried + +a[i] + +b[i]
    if (sum > 9) {
      curried = 1
    } else {
      curried = 0
    }
    res[i] = sum % 10
  }
  if (curried === 1) {
    res.unshift(1)
  }

  return res.join('')
}
```

### 实现加法 （LeetCode #371）

实现两个数字相加的功能，要求不能使用编程语言现有的四则运算。

```js
var getSum = function(a, b) {
  while (b != 0) {
    const s = a ^ b
    b = (a & b) << 1
    a = s
  }
  return a
}
```

### 还原二叉树--已知先序中序或者后序中序

https://www.jianshu.com/p/2943a21d2a99
