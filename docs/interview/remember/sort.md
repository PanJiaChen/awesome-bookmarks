https://github.com/RayJune/Elegant-JavaScript-Sorting-Algorithms

### test cases

- [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24]
- [2, 1, 3, 4, 5, 6, 7]

### 冒泡排序

```js
function swap(arr, indexA, indexB) {
  ;[arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]]
}

function bubbleSort(arr) {
  let i = arr.length - 1
  let count = 0
  while (i > 0) {
    let pos = 0

    for (let j = 0; j < i; j++) {
      count++
      if (arr[j] > arr[j + 1]) {
        pos = j
        swap(arr, j, j + 1)
      }
    }
    i = pos
  }
  console.log(count)
  return arr
}
```

冒泡排序优化

双向冒泡

```js
function bubbleSort(arr) {
  let start = 0
  let end = arr.length - 1
  let count = 0
  while (start < end) {
    let endPos = 0
    let startPos = 0

    for (let i = start; i < end; i++) {
      count++
      if (arr[i] > arr[i + 1]) {
        endPos = i
        swap(arr, i, i + 1)
      }
    }
    end = endPos
    for (let i = end; i > start; i--) {
      count++
      if (arr[i - 1] > arr[i]) {
        startPos = i
        swap(arr, i - 1, i)
      }
    }
    start = startPos
  }
  console.log(count++)
  return arr
}
```

### 选择排序

```js
function selectionSort(arr) {
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    let minIndex = i

    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    if (i !== minIndex) {
      swap(arr, i, minIndex)
    }
  }

  return arr
}
```

### 插入排序

```js
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let pointer = i - 1
    const temp = arr[i]

    while (arr[pointer] > temp) {
      count++
      arr[pointer + 1] = arr[pointer]
      pointer--
    }
    arr[pointer + 1] = temp
  }
  return arr
}
```

### 希尔排序

```js
function shellSort(arr) {
  const len = arr.length
  let gap = Math.floor(len / 2)

  while (gap > 0) {
    for (let i = gap; i < arr.length; i++) {
      let pre = i - gap
      const temp = arr[i]
      while (arr[pre] > temp) {
        count++
        arr[pre + gap] = arr[pre]
        pre = pre - gap
      }
      arr[pre + gap] = temp
    }
    gap = Math.floor(gap / 2)
  }
  return arr
}
```

### 归并排序

```js
const mergeSort = function(arr) {
  if (arr.length < 2) return arr
  const mid = Math.floor(arr.length / 2)
  const left = arr.splice(0, mid) //用 array.splice 取代 array.slice，减少一半的空间消耗。
  const right = arr
  return mergeFn(mergeSort(left), mergeSort(right))
}

const mergeFn = function(left, right) {
  const result = []
  while (left.length > 0 && right.length > 0) {
    count++
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  return [...result, ...left, ...right]
}
```

### 快速排序

```js
function quickSort(arr) {
  if (arr.length < 2) {
    return arr
  }
  const pivot = arr[0]
  const left = []
  const right = []

  for (let i = 1; i < arr.length; i++) {
    count++
    const cur = arr[i]
    if (cur <= pivot) {
      left.push(cur)
    } else {
      right.push(cur)
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)]
}
```

### 综述

![](https://raw.githubusercontent.com/KimlPan/cdn/master/img/20180912224019565.png)
