function binarySearch(key, list) {
  var low = 0;
  var high = list.length - 1;
  while(low <= high) {
    var mid = Math.floor((low + high) / 2)
    if (list[mid] === key) return mid
    if (list[mid] > key) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }
  return undefined;
}

console.log(binarySearch(2, [1,2,3,4]))
console.log(binarySearch(10, [1,2,3,4]))