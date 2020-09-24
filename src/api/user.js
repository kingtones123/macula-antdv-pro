import { getAction, deleteAction, putAction, postAction, httpAction } from '@/api/manage'

const getUserInfo = (params) => getAction('/user/info', params)
const getSmsCaptcha = (params) => getAction('message/sms', params)

// const editGroup = (id, params) => postAction(`/group/${id}`, params)
const getUserNav = (params) => getAction('/user/nav', params)
const login = (params) => postAction('/login', params)
const logout = (params) => postAction('/logout', params)

export {
  getUserInfo,
  getUserNav,
  getSmsCaptcha,
  login,
  logout,
}
