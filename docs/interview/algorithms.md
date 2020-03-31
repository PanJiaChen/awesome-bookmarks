# 算法

现在大部分大厂面试的时候都喜欢问一些算法题，之前我也觉得这没啥意义，很多工程师在工作中其实用不到啥高深的算法。但随着工作经验的丰富和做了这么多年面试官后，我对这个问题的看法发生了改变。面试算法题的确是一个比较高效和简单筛选面试者的方法。算法题很大程度上能反应出面试者的基本素质，和一个罗辑思维能力。这些东西也都不是一时半会能提升的，或者说像背面试题一样死记硬背就行的。

所以如果你想面一些大厂或者说提高一下自己的话，非常建议刷一下算法，这里简单来说一下我刷题的策略吧。

我前前后后大概准备了两个月(没刷太多题，因为上班也挺忙的)，而且强度也不高，大概每天刷个两三道，而且中间还停了一段时间，反正最后大概 LeetCode 也就刷了 60 多道典型题，不过我个人认为，纯为了应付面试或者入门的话，这些题量已经够用了，完全掌握这几十道典型题，已经能让你的思维方式产生一些变化了。

这里我建议没有算法基础入门的小朋友，在第一篇刷题的时候如果没有任何思路，可以直接看答案。刚开始啥都做不出来，这是一个正常的想象，我在刷算法的时候也会经常怀疑自己的智商，遇到不会知识点或者算法，一个一个攻克就可以了。

说一些刷题的小策略吧，刷题肯定是用 [LeetCode](https://leetcode.com/) 来刷的，这里不建议使用中文版，因为用的人不多，所以解法或者相关的讨论都没有英文来得多。其次，也不建议按照它的 id 顺序来刷，没有太大的意义，很容易劝退。建议在 [Problems](https://leetcode.com/problemset/all/) 通过筛选 Lists 为`Top 100 Liked Questions`或者`Top Interview Questions`来刷更加的高效。或者说按照类型来刷，这周就刷动态规划，下周刷二叉树这样也是可以的。在第一遍做的时候不求做出最优解，就算是暴力破解也可以，做出来就行了。做出来之后一定要去 `Discuss` 里面看看，社区那些大佬们是用什么思路来做的(大部分用的语言都是 Java，不过也不难看懂，多看看就会了)，之后自己再用 js 重写一遍。第一遍刷题一般都会比较慢，半小时乃至一个小时做一道题都是很正常的。 所以非常建议二刷，当你做了差不多做了二三十道题之后，一定要回来重新再做一遍。你会发现你大部分其实还是做不出来的，不要气馁，这是一个必经的过程。所以我建议，刷算法一定不能急，两三个月是一个正常的复习周期。当你正真攻克之后，回头再看就没这么难了。其实算法一共就那几种类型，大部分题目都是在一些典型题上的变形而已。

这里推荐几个好用的开源东西吧：

[leetcode 题解](https://github.com/azl397985856/leetcode)，用 js 刷 LeetCode 题的解法题集，相当不错。我觉得很多小伙伴完全可以按照它的题目顺序来刷(它基本就是常见的 100 道面试算法题的顺序)，它基本每道题都有详细的解法，会告诉你这道题是什么类型的，考察点或者难点是什么，更重要的是它用的是 js，看起来相对简单一点。**总之强推！！**

[LeetCodeAnimation](https://github.com/MisterBooo/LeetCodeAnimation)(用动画的形式呈现解 LeetCode 题目的思路），这个库最大的优点是它每道题都用动画的方式会告诉你一遍解法，能更好的帮助你理解这个算法，不过它基本都是用 java 解题的，对于一些小伙伴看起来可能会稍微吃力点。

js 刷 LeetCode 的时候，做一些链表或者树相关题目的时候会比较麻烦，因为你首先要构造一个链表或者树，这里推荐阅读 [用 JavaScript 刷 LeetCode 的正确姿势](https://juejin.im/post/5d0d9d4d6fb9a07ece67d8dd)，先学会如何构造一个链表或者树之后，再来刷题会更加的得心应手。

[fucking-algorithm](https://github.com/labuladong/fucking-algorithm)，手把手撕 LeetCode 题目，扒各种算法套路的裤子，不仅 how，还有 why，还挺不错的

[算法图解](https://book.douban.com/subject/26979890/) 这本书非常适合算法入门，浅显易懂，能让你对算法有一个大概的认识。

**最后**在正式刷算法题前，你需要先完全吃透几种排序算法！！！很多朋友连最基本的排序算法都不会，就开始刷题，完全是错误的。而且排序算法本身也不是很简单，就比如最简单的冒泡算法，其实也有很多的优化方案，也不是很容易能写出来的。更不要说什么希尔排序或者堆排序了，90%的人是讲不清楚它的原理的。而且很多公司会要求当场手写某几个算法，所以你一定要将这几个算法了然于心。就拿我举个例子，我大概也前前后后花了一周的时间，看了很多遍，才能正真的把主要的 7 种排序理解。能够在 30 分钟内，一口气手写出这 7 种主要算法。所以一定要吃透了这几种基本排序，再来刷题！！！
推荐看[优雅的 JavaScript 排序算法](https://github.com/RayJune/Elegant-JavaScript-Sorting-Algorithms)

### 典型题目

这些题目主要是自己的一些积累吧，不具有代表性，大家看看就好了。

面试算法题集:

- 合并两个有序链表 剑指 offer 原题
- 合并多个有序链表 上一题的分治做法
- 输出链表倒数第 K 个数 剑指 offer 原题
- 堆排序算法
- 快速排序
- 输出数组和为 N 的数 剑指 offer 原题
- 数组最大 K 个数 剑指 offer 原题 可以考虑下海量数据场景 分治 合并 大小顶堆
- {[()]} 输入是否合法 你做过的
- 二分查找 基本题
- 二维数组查找（剑指 offer 原题）
- 用数组实现一个栈 蜻蜓 fm 考的 考虑下数组扩容的问题
- 反转链表 剑指 offer 原题
- 从尾到头打印链表 剑指 offer 原题
- 在 o(1)时间内删除链表节点
- 删除链表的重复节点

树我没被问过 但是按照拉丝的说法
前中后 三种遍历以及非递归写法
二叉树查找 k 的位置
二叉树深度 二叉树广度
判断是否平衡二叉树

如何在很大数量级的数据中（比如 1 个亿）筛选出前 10 万个最大值？
https://www.zhihu.com/question/28874340

## 典型题目

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

### 判断一个字符串是不是回文字符串 （LeetCode #125）

```js
function isPalindrome(str) {
  str = str.replace(/\W/g, '').toLowerCase()
  return (
    str ==
    str
      .split('')
      .reverse()
      .join('')
  )
}
```

### 数组全排列 （LeetCode #46）

```js
function backtrack(list, tempList, nums) {
  if (tempList.length === nums.length) return list.push([...tempList])
  for (let i = 0; i < nums.length; i++) {
    if (tempList.includes(nums[i])) continue
    tempList.push(nums[i])
    backtrack(list, tempList, nums)
    tempList.pop()
  }
}
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  const list = []
  backtrack(list, [], nums)
  return list
}
```

### 爬楼梯问题 （LeetCode #70） 金典 dp 问题

```js
var climbStairs = function(n) {
  if (n <= 2) return n
  const dp = []
  dp[1] = 1
  dp[2] = 2
  for (let index = 3; index <= n; index++) {
    dp[index] = dp[index - 1] + dp[index - 2]
  }
  return dp[n]
}
```

### 单词拆分 （LeetCode #139）

```js
var wordBreak = function(s, wordDict) {
  const dp = Array(s.length + 1)
  dp[0] = true
  for (let i = 0; i < s.length + 1; i++) {
    for (let word of wordDict) {
      if (dp[i - word.length] && word.length <= i) {
        if (s.substring(i - word.length, i) === word) {
          dp[i] = true
        }
      }
    }
  }

  return dp[s.length] || false
}

console.log(wordBreak('leetcode', ['leet', 'code'])) // true
console.log(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])) // false
```

### 最长前缀 （LeetCode #14）

```js
var longestCommonPrefix = function(strs) {
  if (strs.length === 0) return ''
  if (strs.length === 1) return strs[0]
  let base = strs.shift()

  for (let i = 0; i < strs.length; i++) {
    const cur = strs[i]
    let find = false
    while (base.length && !find) {
      if (cur.indexOf(base) === 0) {
        find = true
      } else {
        base = base.substring(0, base.length - 1)
      }
    }
  }
  return base
}
```

### 无重复字符的最长子串 （LeetCode #3）

// "abcabcbb" abc
// "pwwkew" wke

```js
var lengthOfLongestSubstring = function(strs) {
  if (strs.length <= 1) {
    return strs.length
  }
  let max = 1

  let hashMap = strs.substring(0, 1)
  for (let i = 1; i < strs.length; i++) {
    const cur = strs[i]
    const index = hashMap.indexOf(cur)
    hashMap = hashMap + cur
    if (index >= 0) {
      hashMap = hashMap.substring(index + 1)
    } else {
      max = Math.max(max, hashMap.length)
    }
  }
  return max
}
```

### Maximum Swap （LeetCode #670）

Input: 2736
Output: 7236
Explanation: Swap the number 2 and the number 7.

```js
var maximumSwap = function(num) {
  const arr = (num + '').split('').reduce((acc, cur) => {
    acc.push(+cur)
    return acc
  }, [])
  for (let i = 0; i < arr.length; i++) {
    const rest = arr.slice(i + 1)
    const max = Math.max(...rest)
    if (max > arr[i]) {
      const index = arr.lastIndexOf(max)
      ;[arr[i], arr[index]] = [arr[index], arr[i]]
      break
    }
  }
  return arr.join('')
}
```
