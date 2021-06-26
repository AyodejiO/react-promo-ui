/* eslint-disable promise/param-names */
import {
  SIGN_IN,
  SIGN_UP,
  AUTH_ERROR,
  AUTH_REQUEST,
  AUTH_USER_SUCCESS,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_USER,
  CHANGE_PASSWORD
} from './constants'
import apiClient from '@/Utils/api'

const state = {
  isAuthenticated: Boolean(localStorage.getItem('auth')) || false,
  status: '',
  user: null,
  loading: false,
  hasLoadedOnce: false
}

const getters = {
  isAuthenticated: state => !!state.isAuthenticated,
  authStatus: state => state.status,
  user: state => state.user
}

const actions = {
  [AUTH_USER]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      apiClient.get('api/users/me').then(response => {
        commit(AUTH_USER_SUCCESS, response.data)
        resolve(response)
      }).catch(error => {
        dispatch('Auth/AUTH_LOGOUT', null, { root: true })
        commit(AUTH_ERROR, error)
        reject(error)
      })
    })
  },
  [SIGN_IN]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      apiClient.get('sanctum/csrf-cookie').then(response => {
        apiClient.post('login', user).then(response => {
          localStorage.setItem('auth', true)
          commit(AUTH_SUCCESS, response)
          dispatch('Auth/AUTH_USER', null, { root: true })
          resolve(response)
        }).catch(error => {
          commit(AUTH_ERROR, error)
          reject(error)
        })
      })
    })
  },
  [SIGN_UP]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      apiClient.get('sanctum/csrf-cookie').then(response => {
        apiClient.post('register', user).then(response => {
          localStorage.setItem('auth', true)
          commit(AUTH_SUCCESS, response)
          dispatch('User/AUTH_USER', null, { root: true })
          resolve(response)
        }).catch(error => {
          commit(AUTH_ERROR, error)
          reject(error)
        })
      })
    })
  },
  [CHANGE_PASSWORD]: ({ commit }, password) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      apiClient.get('sanctum/csrf-cookie').then(response => {
        apiClient.post('api/users/change-password', password).then(response => {
          commit(AUTH_USER_SUCCESS, response.data.data)
          resolve(response)
        }).catch(error => {
          commit(AUTH_ERROR, error)
          reject(error)
        })
      })
    })
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      apiClient.get('sanctum/csrf-cookie').then(response => {
        apiClient.post('logout').then(response => {
          localStorage.setItem('auth', false)
          commit(AUTH_LOGOUT)
          resolve(response)
        }).catch(error => {
          commit(AUTH_ERROR, error)
          reject(error)
        })
      })
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = 'loading'
    state.loading = true
  },
  [AUTH_SUCCESS]: state => {
    state.isAuthenticated = true
    state.status = 'success'
    state.hasLoadedOnce = true
    state.loading = false
  },
  [AUTH_ERROR]: state => {
    state.status = 'error'
    state.loading = false
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: state => {
    state.isAuthenticated = false
    state.loading = false
  },
  [AUTH_USER_SUCCESS]: (state, data) => {
    state.status = 'success'
    state.loading = false
    state.hasLoadedOnce = true
    state.user = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
