/**
 * https://www.zhihu.com/question/23995189
 * 
 * https://www.geeksforgeeks.org/dynamic-programming/
 * 
 * 动态规划实例
 * 
 */

/**
 * 
 * @param {number} n 
 */
function dpFib(n) {
  dpFib[0] = dpFib[1] = 1
  for (var i = 2; i <= n; i++) {
     dpFib[i] = dpFib[i - 1] + dpFib[i - 2]
  }
  return dpFib[n]
}



 /**
背包问题：
我们有n种物品，物品j的重量为wj，价格为pj。
我们假定所有物品的重量和价格都是非负的。背包所能承受的最大重量为W。

如果限定每种物品只能选择0个或1个，则问题称为0-1背包问题 。
如果限定物品j最多只能选择bj个，则问题称为有界背包问题。
如果不限定每种物品的数量，则问题称为无界背包问题。
  */

/**
 * 1. 有N件物品和一个容量为V的背包。第i件物品的重量是w[i]，价值是v[i]
 * 求解将哪些物品装入背包可使这些物品的重量总和不超过背包容量，且价值总和最大
 */
/**
 * 0-1背包问题
 * 每件物品只能选择0个或1个 
 * @param {*} maxV 总容量
 * @param {*} things [[price, wight]]
 * 
 * 对于第i个物品，只存在选或者不选
 * 选，如果wightI > W 则依然不能选 m(i) = m(i-1, W)，如果wightI < W 则 m(i) = m(i-1, W - m(i))
 * 不选，m(i) = m(i-1, W)
 * i = 0 m(i) = 0
 * W = 0 m(i) = 0
 */
function getBags01(maxV, things, start, end) {
  if (maxV <= 0) return 0
  for (let i = end; i >= start; i--) {
    const [priceI, wightI] = things[i]
    if (wightI > maxV) {
      return getBags01(maxV, things, start, end - 1)
    } else {
      return Math.max(getBags01(maxV, things, start, end - 1), getBags01(maxV - wightI, things, start, end - 1) + priceI)
    }
  }
  return 0
}

const testCases = [{
  list: [
    [3000, 4],
    [2000, 3],
    [1500, 1]
  ],
  maxV: 4,
  bagIndexs: [1, 2],
  result: 3500
}, {
  list: [
    [3000, 4],
    [2000, 3],
    [1500, 1],
    [2000, 1]
  ],
  maxV: 4,
  bagIndexs: [1, 3],
  result: 4000
}]

;(function() {
  testCases.forEach((test, i) => {
    let result = getBags01(test.maxV, test.list, 0, test.list.length - 1)
    if (result !== test.result) {
      console.log('getBags01 DP fail', i, test, '\nyour result', result)
    } else {
      console.log('getBags01 DP success', i)
    }
  })

})()