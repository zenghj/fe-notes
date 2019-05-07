const jwt = require('jsonwebtoken')
const config = require('./config.js')
const users = require('./users.mock')
async function tradeTokenForUser(token) {
  // Here, use the `token` argument, check it's validity, and return
  // the user only if the token is valid.
  // You can also use external auth libraries, such as jsaccounts / passport, and
  // trigger it's logic from here.
  let user = null
  try {
    
    user = jwt.verify(token.split(' ')[1], config.SECRET_KEY)
  } catch (err) {
    console.error(err)
    user = null
  }
  return user
}

module.exports = {
  tradeTokenForUser
}
