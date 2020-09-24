const Mock = require('mockjs')
const util = require('../util')

module.exports = {
  'POST /api/message/sms': (req, res) => {
    res.send(util.builder({ captcha: Mock.mock('@integer(10000, 99999)') }))
  },
}
