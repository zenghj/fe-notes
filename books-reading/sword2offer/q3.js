function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]; 
}
function duplicateEle(arr) {
  if (!arr || arr.length <= 0) return false;
  const len = arr.length;
  for(let i = 0; i < len; i++) {
    // let valI = arr[i];
    // if (valI === i) continue;
    // if (valI === arr[valI]) return valI;
    // swap(arr, i, valI);
    while(arr[i] !== i) {
      if (arr[i] === arr[arr[i]]) {
        return arr[i];
      }
      swap(arr, i, arr[i]);
    }
  }
  return false;
}

console.log(duplicateEle([2, 3, 1, 0, 2, 5, 3]) === 2);