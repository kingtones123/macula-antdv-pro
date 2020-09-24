import request from '@/utils/request'

// post
export function postAction (url, parameter) {
  return request({
    url: url,
    method: 'post',
    data: parameter,
  })
}

export function postFormAction (url, parameter) {
  return request({
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8;',
    },
    data: parameter,
  })
}

// get
export function getAction (url, parameter) {
  return request({
    url: url,
    method: 'get',
    params: parameter,
  })
}

// put
export function putAction (url, parameter) {
  return request({
    url: url,
    method: 'put',
    data: parameter,
  })
}

// deleteAction
export function deleteAction (url, parameter) {
  return request({
    url: url,
    method: 'delete',
    data: parameter,
  })
}

// post method= {post | put}
export function httpAction (url, parameter, method) {
  return request({
    url: url,
    method: method,
    data: parameter,
  })
}

/**
 * 下载文件 用于excel导出
 * @param url
 * @param parameter
 * @returns {*}
 */
export function downFile (url, parameter) {
  return request({
    url: url,
    params: parameter,
    method: 'get',
    responseType: 'blob',
  })
}
