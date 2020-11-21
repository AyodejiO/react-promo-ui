/* eslint-disable promise/param-names */
import {
  GET_TRACKS,
  SINGLE_TRACK,
  MODIFY_TRACK,
  MODIFY_TRACKS,
  SET_TRACKS,
  TRACK_REQUEST,
  TRACK_SUCCESS,
  REFRESH_USER,
  TRACK_ERROR,
  REMOVE_TRACK,
  DELETE_TRACK,
  UPLOAD_TRACK
} from './constants'
import apiClient from '../../Utils/api'

const state = {
  status: '',
  tracks: [],
  track: null,
  loading: false,
  hasLoadedOnce: false
}

const getters = {
  // isAuthenticated: state => !!state.token,
  track: state => state.track,
  tracks: state => state.tracks
  // authStatus: state => state.status
}

const actions = {
  [GET_TRACKS]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(TRACK_REQUEST)
      apiClient.get('api/tracks')
        .then(response => {
          commit(TRACK_SUCCESS)
          commit(SET_TRACKS, response.data)
          resolve(response)
        }).catch(error => {
          commit(TRACK_ERROR, error)
          reject(error)
        })
    })
  },
  [SINGLE_TRACK]: ({ commit }, slug) => {
    return new Promise((resolve, reject) => {
      commit(TRACK_REQUEST)
      apiClient.get(`api/tracks/${slug}`)
        .then(response => {
          commit(TRACK_SUCCESS)
          commit(MODIFY_TRACK, response.data)
          resolve(response)
        }).catch(error => {
          commit(TRACK_ERROR, error)
          reject(error)
        })
    })
  },
  [UPLOAD_TRACK]: ({ commit }, { track, campaign }) => {
    return new Promise((resolve, reject) => {
      commit(TRACK_REQUEST)
      apiClient.get('sanctum/csrf-cookie').then(response => {
        apiClient.post(`api/campaigns/${campaign}/tracks`, track).then(response => {
          commit(TRACK_SUCCESS)
          commit(MODIFY_TRACKS, response.data)
          resolve(response)
        }).catch(error => {
          commit(TRACK_ERROR, error)
          reject(error)
        })
      })
    })
  },
  [DELETE_TRACK]: ({ commit }, track) => {
    return new Promise((resolve, reject) => {
      commit(TRACK_REQUEST)
      apiClient.get('sanctum/csrf-cookie').then(response => {
        apiClient.delete(`api/tracks/${track}`).then(response => {
          commit(TRACK_SUCCESS)
          commit(REMOVE_TRACK, track)
          resolve(response)
        }).catch(error => {
          commit(TRACK_ERROR, error)
          reject(error)
        })
      })
    })
  }
}

const mutations = {
  [TRACK_REQUEST]: state => {
    state.loading = true
  },
  [REFRESH_USER]: (state, user) => {
    state.user = user
  },
  [TRACK_SUCCESS]: (state) => {
    state.status = 'success'
    state.loading = false
    state.hasLoadedOnce = true
  },
  [MODIFY_TRACK]: (state, data) => {
    state.track = data
  },
  [SET_TRACKS]: (state, data) => {
    state.tracks = data || []
  },
  [MODIFY_TRACKS]: (state, data) => {
    state.tracks.unshift(data)
  },
  [REMOVE_TRACK]: (state, id) => {
    state.tracks = state.tracks.filter((track) => track.id !== id)
  },
  [TRACK_ERROR]: state => {
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
