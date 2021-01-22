function binarySearch(arr, item) {
  if (!Array.isArray(arr)) return null;
  let low = 0;
  let high = arr.length - 1;
  let mid;
  while(low <= high) {
    mid = Math.floor((high + low)/2);
    let guess = arr[mid];
    if (guess === item) {
      return mid;
    } else if (guess > item) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return null;
}
module.exports = binarySearch;