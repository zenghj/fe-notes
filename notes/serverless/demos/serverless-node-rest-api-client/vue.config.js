// const __DEV__ = process.env.NODE_ENV === 'development'
// const __STAGING__ = process.env.MODE === 'staging'
// const __ONLINE__ = process.env.MODE === 'online'

module.exports = {
  devServer: {
    proxy: {
      '/development': {
        // target: 'http://10.38.164.175:3389/mock'
        // target: 'http://api.puri.sharetrend.net'
        target: 'https://3vi1tb3uxj.execute-api.eu-west-1.amazonaws.com'
      }
    }
  }
}
