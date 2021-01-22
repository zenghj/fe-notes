function selectionSort(arr) {
  function findSmallest(arr) {
    let smallest = arr[0];
    let smallestIndex = 0;
    let len = arr.length;
    for(var i = 1; i < len; i++) {
      if (smallest > arr[i]) {
        smallest = arr[i];
        smallestIndex = i;
      }
    }
    arr.splice(smallestIndex, 1);
    return [smallest, arr];
  }
  let tmp = findSmallest(arr);
  let sortedArr = [tmp[0]];
  while(tmp[1].length) {
    tmp = findSmallest(tmp[1]);
    sortedArr.push(tmp[0]);
  }
  return sortedArr;
}

module.exports = selectionSort