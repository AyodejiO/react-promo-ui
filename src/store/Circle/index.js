/* eslint-disable promise/param-names */
import {
  SET_USER,
  SET_CIRCLES,
  SET_CIRCLES_REQUESTS,
  GET_CIRCLES,
  GET_REQUESTS,
  UPDATE_CIRCLES,
  CIRCLES_REQUEST,
  CIRCLES_SUCCESS,
  REFRESH_CIRCLE,
  CIRCLES_ERROR,
  ADD_USER_TO_CIRCLE,
  ACCEPT_USER_REQUEST,
  DECLINE_USER_REQUEST,
  REMOVE_USER_FROM_CIRCLE
} from './constants'
import apiClient from '../../Utils/api'

const state = {
  status: '',
  circles: [],
  requests: [],
  user: null,
  loading: false,
  hasLoadedOnce: false
}

const getters = {
  user: state => state.user,
  circles: state => state.circles,
  requests: state => state.requests
}

const actions = {
  [GET_CIRCLES]: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      commit(CIRCLES_REQUEST)
      apiClient.get(`api/circles`)
        .then(response => {
          commit(CIRCLES_SUCCESS)
          commit(SET_CIRCLES, response.data)
          resolve(response)
        }).catch(error => {
          commit(CIRCLES_ERROR, error)
          reject(error)
        })
    })
  },
  [GET_REQUESTS]: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      commit(CIRCLES_REQUEST)
      apiClient.get(`api/circles/requests`)
        .then(response => {
          commit(CIRCLES_SUCCESS)
          commit(SET_CIRCLES_REQUESTS, response.data)
          resolve(response)
        }).catch(error => {
          commit(CIRCLES_ERROR, error)
          reject(error)
        })
    })
  },
  [ADD_USER_TO_CIRCLE]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(CIRCLES_REQUEST)
      apiClient.post(`api/circles/add/${user}`)
        .then(response => {
          commit(CIRCLES_SUCCESS)
          dispatch('Users/GET_USERS', null, { root: true })
          resolve(response)
        }).catch(error => {
          commit(CIRCLES_ERROR, error)
          reject(error)
        })
    })
  },
  [ACCEPT_USER_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(CIRCLES_REQUEST)
      apiClient.post(`api/circles/accept/${user}`)
        .then(response => {
          commit(CIRCLES_SUCCESS)
          dispatch('Users/GET_USERS', null, { root: true })
          resolve(response)
        }).catch(error => {
          commit(CIRCLES_ERROR, error)
          reject(error)
        })
    })
  },
  [DECLINE_USER_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(CIRCLES_REQUEST)
      apiClient.post(`api/circles/decline/${user}`)
        .then(response => {
          commit(CIRCLES_SUCCESS)
          dispatch('Users/GET_USERS', null, { root: true })
          resolve(response)
        }).catch(error => {
          commit(CIRCLES_ERROR, error)
          reject(error)
        })
    })
  },
  [REMOVE_USER_FROM_CIRCLE]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(CIRCLES_REQUEST)
      apiClient.post(`api/circles/remove/${user}`)
        .then(response => {
          commit(CIRCLES_SUCCESS)
          dispatch('Users/GET_USERS', null, { root: true })
          resolve(response)
        }).catch(error => {
          commit(CIRCLES_ERROR, error)
          reject(error)
        })
    })
  }
}

const mutations = {
  [CIRCLES_REQUEST]: state => {
    state.loading = true
    state.status = 'loading...'
  },
  [REFRESH_CIRCLE]: (state, circle) => {
    state.circle = circle
  },
  [CIRCLES_SUCCESS]: (state) => {
    state.user = null
    state.status = 'success'
    state.loading = false
    state.hasLoadedOnce = true
  },
  [SET_USER]: (state, user) => {
    state.user = user
  },
  [SET_CIRCLES]: (state, data) => {
    state.circles = data
  },
  [SET_CIRCLES_REQUESTS]: (state, data) => {
    state.requests = data
  },
  [UPDATE_CIRCLES]: (state, data) => {
    state.circles.push(data)
  },
  [CIRCLES_ERROR]: state => {
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
