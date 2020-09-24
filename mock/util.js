module.exports = {
  builder: function (data, message, code = 0, headers = {}) {
    const responseBody = {
      message: '',
      result: data,
      code: 0,
    }
    if (message !== undefined && message !== null) {
      responseBody.message = message
    }
    if (code !== undefined && code !== 0) {
      responseBody.code = code
      responseBody._status = code
    }
    if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
      responseBody._headers = headers
    }
    return responseBody
  },

  getQueryParameters: function (options) {
    const url = options.url
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') + '"}')
  },

  getBody: function (options) {
    return options.body && JSON.parse(options.body)
  },
}
