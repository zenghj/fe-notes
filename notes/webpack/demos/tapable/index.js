const {
  SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
} = require('tapable')

const asyncSeriesHook = new AsyncSeriesHook(['time'])

asyncSeriesHook.tapPromise('tapPromise', (time) => {
  console.log('tapPromise')
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('tapPromise resolve')
      resolve(true)
    }, 3000)
  })
})

asyncSeriesHook.tap('tap', (time) => {
  console.log('tap')
})

asyncSeriesHook.callAsync()
/* output
tapPromise
tapPromise resolve
tap
*/