/* eslint-disable promise/param-names */
import {
  GET_USERS,
  SET_USERS,
  SET_TYPES,
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
  message: null,
  users: [],
  requests_count: 0,
  errors: [],
  types: [
    { id: null, name: 'Please select an option' }
  ],
  invited_users: [],
  loading: false,
  hasLoadedOnce: false
}

const getters = {
  users: state => state.users,
  errors: state => state.errors,
  message: state => state.message,
  types: state => state.types,
  requests_count: state => state.requests_count
}

const actions = {
  [GET_USERS]: ({ commit }, type = null) => {
    return new Promise((resolve, reject) => {
      commit(USERS_REQUEST)
      apiClient.get('api/users', {
        params: {
          type: type
        }
      }).then(response => {
        commit(USERS_SUCCESS)
        commit(SET_USERS, response.data)
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
          commit(USERS_SUCCESS)
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
        commit(USERS_SUCCESS)
        resolve(response)
      }).catch(error => {
        commit(USERS_ERROR, error)
        reject(error)
      })
    })
  },
  [USER_TYPES]: ({ commit }) => {
    if (state.types.length === 1) {
      return new Promise((resolve, reject) => {
        commit(USERS_REQUEST)
        apiClient.get('sanctum/csrf-cookie').then(() => {
          apiClient.get('api/usertypes').then(response => {
            commit(USERS_SUCCESS)
            commit(SET_TYPES, response.data)
            resolve(response)
          }).catch(error => {
            commit(USERS_ERROR, error)
            reject(error)
          })
        })
      })
    }
  }
}

const mutations = {
  [USERS_REQUEST]: state => {
    state.loading = true
  },
  [REFRESH_USER]: (state, user) => {
    state.user = user
  },
  [USERS_SUCCESS]: (state) => {
    state.status = 'success'
    state.loading = false
    state.hasLoadedOnce = true
  },
  [SET_USERS]: (state, data) => {
    state.users = data.users
    state.requests_count = data.requests_count
  },
  [SET_TYPES]: (state, types) => {
    state.types = state.types.concat(types)
  },
  [USERS_ERROR]: (state, error) => {
    state.errors = error.response.data.errors
    state.message = error.response.data.message
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
