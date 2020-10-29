/* eslint-disable promise/param-names */
import {
  GET_INVITED_USERS,
  SET_INVITED_USERS,
  UPDATE_INVITED_USERS,
  USERS_REQUEST,
  USERS_SUCCESS,
  REFRESH_USER,
  USERS_ERROR,
  INVITE_USER
} from './constants'
import apiClient from '../../Utils/api'

const state = {
  status: '',
  invitees: [],
  loading: false,
  hasLoadedOnce: false
}

const getters = {
  // isAuthenticated: state => !!state.token,
  invitees: state => state.invitees
  // authStatus: state => state.status
}

const actions = {
  [GET_INVITED_USERS]: ({ commit }, type) => {
    return new Promise((resolve, reject) => {
      commit(USERS_REQUEST)
      apiClient.get('api/users/invitees')
        .then(response => {
          commit(USERS_SUCCESS)
          commit(SET_INVITED_USERS, response.data)
          resolve(response)
        }).catch(error => {
          commit(USERS_ERROR, error)
          reject(error)
        })
    })
  },
  [INVITE_USER]: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      commit(USERS_REQUEST)
      apiClient.post('api/users/invite', user).then(response => {
        // localStorage.setItem('user', JSON.stringify(response.data))
        commit(USERS_SUCCESS)
        commit(UPDATE_INVITED_USERS, response.data)
        resolve(response)
      }).catch(error => {
        commit(USERS_ERROR, error)
        reject(error)
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
  [USERS_SUCCESS]: (state) => {
    state.status = 'success'
    state.loading = false
    state.hasLoadedOnce = true
  },
  [SET_INVITED_USERS]: (state, data) => {
    state.invitees = data
  },
  [UPDATE_INVITED_USERS]: (state, data) => {
    state.invitees.push(data)
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
