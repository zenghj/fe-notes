const selectionSort = require('./selection_sort')
const arr = [334, 16, 33, 1, 4, 10, 9,3,1, 55, 66, 88, 100];
console.log(JSON.stringify(selectionSort([...arr])) === JSON.stringify([...arr].sort((a, b) => a - b)));