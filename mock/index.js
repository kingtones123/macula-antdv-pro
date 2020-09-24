const user = require('./services/user.js')
const message = require('./services/message.js')

module.exports = {
  ...user,
  ...message,
}
