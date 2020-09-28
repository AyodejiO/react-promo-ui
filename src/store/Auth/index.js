/* eslint-disable promise/param-names */
import {
  SIGN_IN,
  SIGN_UP,
  AUTH_ERROR,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from './constants'
import {
  USER_REQUEST
} from '../User/constants'
import apiClient from '../../Utils/api'

const state = {
  isAuthenticated: localStorage.getItem('auth'),
  status: '',
  hasLoadedOnce: false
}

const getters = {
  isAuthenticated: state => !!state.isAuthenticated,
  authStatus: state => state.status
}

const actions = {
  [SIGN_IN]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      apiClient.get('sanctum/csrf-cookie').then(response => {
        apiClient.post('login', user).then(response => {
          // /* eslint-disable no-console */
          localStorage.setItem('auth', true)
          commit(AUTH_SUCCESS, response)
          dispatch(USER_REQUEST)
          resolve(response)
        }).catch(error => {
          commit(AUTH_ERROR, error)
          reject(error)
        }) // credentials didn't match
      })
    })
  },
  [SIGN_UP]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      apiClient.get('sanctum/csrf-cookie').then(response => {
        apiClient.post('register', user).then(response => {
          // /* eslint-disable no-console */
          localStorage.setItem('auth', true)
          commit(AUTH_SUCCESS, response)
          dispatch(USER_REQUEST)
          resolve(response)
        }).catch(error => {
          commit(AUTH_ERROR, error)
          reject(error)
        }) // credentials didn't match
      })
    })
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      apiClient.get('sanctum/csrf-cookie').then(response => {
        apiClient.post('logout').then(response => {
          // /* eslint-disable no-console */
          localStorage.removeItem('auth')
          commit(AUTH_LOGOUT)
          resolve(response)
        }).catch(error => {
          commit(AUTH_ERROR, error)
          reject(error)
        }) // credentials didn't match
      })
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state) => {
    state.status = 'success'
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: state => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: state => {
    state.isAuthenticated = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
