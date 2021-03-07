/* eslint-disable promise/param-names */
import {
  SIGN_IN,
  SIGN_UP,
  AUTH_ERROR,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from './constants'
import apiClient from '@/Utils/api'

const state = {
  isAuthenticated: Boolean(localStorage.getItem('auth')) || false,
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
  },
  [AUTH_SUCCESS]: state => {
    state.isAuthenticated = true
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
