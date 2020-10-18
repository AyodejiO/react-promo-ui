/* eslint-disable promise/param-names */
import {
  AUTH_USER,
  USER_REQUEST,
  USER_SUCCESS,
  USER_TYPES,
  CHANGE_PASSWORD,
  REFRESH_USER,
  USER_ERROR
} from './constants'
import apiClient from '../../Utils/api'

const state = {
  status: '',
  user: JSON.parse(localStorage.getItem('user')),
  loading: false,
  hasLoadedOnce: false
}

const getters = {
  // isAuthenticated: state => !!state.token,
  user: state => state.user
  // authStatus: state => state.status
}

const actions = {
  [AUTH_USER]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(USER_REQUEST)
      apiClient.get('api/users/me').then(response => {
        localStorage.setItem('user', JSON.stringify(response.data))
        commit(USER_SUCCESS, response)
        resolve(response)
      }).catch(error => {
        commit(USER_ERROR, error)
        reject(error)
      })
    })
  },
  [USER_TYPES]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(USER_REQUEST)
      apiClient.get('sanctum/csrf-cookie').then(response => {
        apiClient.get('api/usertypes').then(response => {
          commit(USER_SUCCESS, response)
          resolve(response)
        }).catch(error => {
          commit(USER_ERROR, error)
          reject(error)
        }) // credentials didn't match
      })
    })
  },
  [CHANGE_PASSWORD]: ({ commit }, password) => {
    return new Promise((resolve, reject) => {
      commit(USER_REQUEST)
      apiClient.get('sanctum/csrf-cookie').then(response => {
        apiClient.post('api/users/change-password', password).then(response => {
          localStorage.setItem('user', JSON.stringify(response.data))
          commit(USER_SUCCESS)
          commit(USER_SUCCESS, response)
          resolve(response)
        }).catch(error => {
          commit(USER_ERROR, error)
          reject(error)
        }) // credentials didn't match
      })
    })
  }
}

const mutations = {
  [USER_REQUEST]: state => {
    state.loading = true
  },
  [REFRESH_USER]: (state, user) => {
    state.user = user
  },
  [USER_SUCCESS]: state => {
    state.status = 'success'
    state.loading = false
    state.hasLoadedOnce = true
  },
  [USER_ERROR]: state => {
    state.status = 'error'
    state.loading = false
    state.hasLoadedOnce = true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
