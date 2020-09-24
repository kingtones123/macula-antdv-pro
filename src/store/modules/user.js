import storage from 'store'
import * as userService from '@/api/user'
import { generatorMenus } from '@/router/generator-menus'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    info: {},
    menus: [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        userService.login(userInfo).then(response => {
          console.log('res:', response)
          const { token } = response.result
          storage.set(ACCESS_TOKEN, token)
          commit('SET_TOKEN', token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        userService.getUserInfo().then(response => {
          commit('SET_INFO', response.result)
          commit('SET_NAME', { name: response.result.name, welcome: '' })
          commit('SET_AVATAR', response.result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GenerateMenus ({ commit }) {
      return new Promise(resolve => {
        generatorMenus().then(menus => {
          commit('SET_MENUS', menus)
          resolve()
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        userService.logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          storage.remove(ACCESS_TOKEN)
        })
      })
    },

  },
}

export default user
