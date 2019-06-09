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
  let count = 0
  for (let i = 1, len = arr.length; i < len; i++) {
    const temp = arr[i]
    let preIndex = i - 1

    while (arr[preIndex] > temp) {
      count++
      arr[preIndex + 1] = arr[preIndex]
      preIndex -= 1
    }
    arr[preIndex + 1] = temp
  }
  console.log(count)
  return arr
}
```
