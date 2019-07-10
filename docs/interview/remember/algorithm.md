## 算法

### 输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。

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
const data = [
  {
    id: '1',
    name: 'test1',
    children: [
      {
        id: '11',
        name: 'test11',
        children: [
          {
            id: '111',
            name: 'test111'
          },
          {
            id: '112',
            name: 'test112'
          }
        ]
      },
      {
        id: '12',
        name: 'test12',
        children: [
          {
            id: '121',
            name: 'test121'
          },
          {
            id: '122',
            name: 'test122'
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
  let arr = [],
    count = 0
  for (let i = 0; i < n + 1; i++) {
    arr[i] = true // 标记初始化
  }
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
