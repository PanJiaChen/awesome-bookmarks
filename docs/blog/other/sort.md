https://github.com/RayJune/Elegant-JavaScript-Sorting-Algorithms

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
