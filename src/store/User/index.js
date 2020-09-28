/* eslint-disable promise/param-names */
import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR
} from './constants'
import apiClient from '../../Utils/api'

const state = {
  status: '',
  user: null,
  loading: false,
  hasLoadedOnce: false
}

const getters = {
  // isAuthenticated: state => !!state.token,
  user: state => state.user
  // authStatus: state => state.status
}

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      commit(USER_REQUEST)
      apiClient.get('api/user').then(response => {
        apiClient.post('login').then(response => {
          // /* eslint-disable no-console */
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
  state,
  getters,
  actions,
  mutations
}
