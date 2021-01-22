/**
 *
 * 1. 回文字符串
 * https://medium.freecodecamp.org/two-ways-to-check-for-palindromes-in-javascript-64fea8191fd7
 * A palindrome is a word or sentence that’s spelled the same way both forward and backward, ignoring punctuation, case, and spacing
 *
 * Note. You’ll need to remove all non-alphanumeric characters (punctuation, spaces and symbols) and turn everything lower case in order to check for palindromes.
 */
// function isPalindrome(str) {
//   if(typeof str !== 'string') {
//     return false;
//   }

//   return str.split('').reverse().join('') === str;
// }
function isPalindrome(str) {
  if (typeof str !== 'string') {
    return false;
  }
  let _str = str;

  const reg = /[^A-Za-z0-9]/g;
  _str = _str.toLowerCase().replace(reg, '');
  return _str.split('').reverse().join('') === _str;
}

function isPalindrome2($str) {
  if (typeof $str !== 'string') {
    return false;
  }

  const reg = /[^A-Za-z0-9]/g;
  let str = $str.toLowerCase().replace(reg, '');
  const len = str.length;

  if (len === 1) {
    return true;
  }

  const mid = len / 2;
  for (let i = 0; i < mid; i++) {
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
  }
  return true;
}

let palindromeStrs = [
  '1',
  'ee',
  'lol',
  'noon',
  'level',
  'race car',
  'A man, a plan, a canal. Panama',
  '0_0 (: /- :) 0–0'
];

let notPalindromeStrs = ['1 eye for of 1 eye.', 'xo'];

console.log('=========== true')
palindromeStrs.forEach(str => {
  console.log(`"${str}" is palindrome: ${isPalindrome(str)}/${isPalindrome2(str)}`)
})
console.log('=========== false')
notPalindromeStrs.forEach(str => {
  console.log(`"${str}" is not palindrome: ${isPalindrome(str)}/${isPalindrome2(str)}`)
})