/* eslint-disable promise/param-names */
import {
  GET_CIRCLES,
  SET_CIRCLES,
  UPDATE_CIRCLES,
  CIRCLES_REQUEST,
  CIRCLES_SUCCESS,
  REFRESH_CIRCLE,
  CIRCLES_ERROR
} from './constants'
import apiClient from '../../Utils/api'

const state = {
  status: '',
  circles: [],
  loading: false,
  hasLoadedOnce: false
}

const getters = {
  // isAuthenticated: state => !!state.token,
  invitees: state => state.invitees
  // authStatus: state => state.status
}

const actions = {
  [GET_CIRCLES]: ({ commit }, type) => {
    return new Promise((resolve, reject) => {
      commit(CIRCLES_REQUEST)
      apiClient.get('api/circles')
        .then(response => {
          commit(CIRCLES_SUCCESS)
          commit(SET_CIRCLES, response.data)
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
  },
  [REFRESH_CIRCLE]: (state, circle) => {
    state.circle = circle
  },
  [CIRCLES_SUCCESS]: (state) => {
    state.status = 'success'
    state.loading = false
    state.hasLoadedOnce = true
  },
  [SET_CIRCLES]: (state, data) => {
    state.circles = data
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
