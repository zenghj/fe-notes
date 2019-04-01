const toggle = document.getElementById('toggle')
const loadings = document.getElementsByClassName('loading')
// let isRuning = true
// const STATUS = {
//   running: 'running',
//   paused: 'paused'
// }

toggle.addEventListener('click', function(e) {
  // isRuning = !isRuning
  // const status = isRuning ? STATUS.running : STATUS.paused
  ;[].forEach.call(loadings, loading => {
    loading.classList.toggle('pause')
  })
})
