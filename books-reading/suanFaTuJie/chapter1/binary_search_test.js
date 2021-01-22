const binarySearch = require('./binary_search')

const arr = [1, 4, 10, 16, 33, 55, 66, 88, 100];
console.log(binarySearch(arr, 55) === arr.indexOf(55));
console.log(binarySearch(arr, 34) === null);