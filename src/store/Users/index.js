/* eslint-disable promise/param-names */
import {
  GET_USERS,
  GET_INVITED_USERS,
  USERS_REQUEST,
  USERS_SUCCESS,
  REFRESH_USER,
  USERS_ERROR,
  USER_TYPES,
  INVITE_USER
} from './constants'
import apiClient from '../../Utils/api'

const state = {
  status: '',
  users: [],
  invited_users: [],
  loading: false,
  hasLoadedOnce: false
}

const getters = {
  // isAuthenticated: state => !!state.token,
  users: state => state.users
  // authStatus: state => state.status
}

const actions = {
  [GET_USERS]: ({ commit }, type) => {
    return new Promise((resolve, reject) => {
      commit(USERS_REQUEST)
      apiClient.get('api/users', {
        params: {
          type: type
        }
      }).then(response => {
        commit(USERS_SUCCESS, response.data)
        resolve(response)
      }).catch(error => {
        commit(USERS_ERROR, error)
        reject(error)
      })
    })
  },
  [GET_INVITED_USERS]: ({ commit }, type) => {
    return new Promise((resolve, reject) => {
      commit(USERS_REQUEST)
      apiClient.get('api/users/invitees')
        .then(response => {
          commit(USERS_SUCCESS, response.data)
          resolve(response)
        }).catch(error => {
          commit(USERS_ERROR, error)
          reject(error)
        })
    })
  },
  [INVITE_USER]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(USERS_REQUEST)
      apiClient.get('api/users/invite').then(response => {
        // localStorage.setItem('user', JSON.stringify(response.data))
        commit(USERS_SUCCESS, response)
        resolve(response)
      }).catch(error => {
        commit(USERS_ERROR, error)
        reject(error)
      })
    })
  },
  [USER_TYPES]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(USERS_REQUEST)
      apiClient.get('sanctum/csrf-cookie').then(() => {
        apiClient.get('api/usertypes').then(response => {
          commit(USERS_SUCCESS, response)
          resolve(response)
        }).catch(error => {
          commit(USERS_ERROR, error)
          reject(error)
        })
      })
    })
  }
}

const mutations = {
  [USERS_REQUEST]: state => {
    state.loading = true
  },
  [REFRESH_USER]: (state, user) => {
    state.user = user
  },
  [USERS_SUCCESS]: (state, data) => {
    state.status = 'success'
    state.loading = false
    state.hasLoadedOnce = true
    state.users = data
  },
  [USERS_ERROR]: state => {
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
