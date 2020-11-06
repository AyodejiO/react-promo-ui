/* eslint-disable promise/param-names */
import {
  GET_TAGS,
  TAG_REQUEST,
  TAG_SUCCESS,
  REFRESH_TAG,
  TAG_ERROR
} from './constants'
import apiClient from '../../Utils/api'

const state = {
  status: '',
  tags: [],
  loading: false,
  hasLoadedOnce: false
}

const getters = {
  // isAuthenticated: state => !!state.token,
  tags: state => state.tags
  // authStatus: state => state.status
}

const actions = {
  [GET_TAGS]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(TAG_REQUEST)
      apiClient.get('api/tags').then(response => {
        commit(TAG_SUCCESS, response.data)
        resolve(response)
      }).catch(error => {
        commit(TAG_ERROR, error)
        reject(error)
      })
    })
  }
}

const mutations = {
  [TAG_REQUEST]: state => {
    state.loading = true
  },
  [REFRESH_TAG]: (state, tags) => {
    state.tags = tags
  },
  [TAG_SUCCESS]: (state, tags) => {
    state.status = 'success'
    state.loading = false
    state.hasLoadedOnce = true
    state.hasLoadedOnce = true
    state.tags = tags
  },
  [TAG_ERROR]: state => {
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
