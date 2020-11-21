/* eslint-disable promise/param-names */
import {
  GET_CAMPAIGNS,
  SINGLE_CAMPAIGN,
  UPDATE_CAMPAIGN,
  MODIFY_CAMPAIGN,
  MODIFY_CAMPAIGNS,
  SET_CAMPAIGNS,
  CAMPAIGN_REQUEST,
  CAMPAIGN_SUCCESS,
  PUBLISH_CAMPAIGN,
  REFRESH_USER,
  CAMPAIGN_ERROR,
  DELETE_CAMPAIGN,
  CREATE_CAMPAIGN
} from './constants'
import apiClient from '../../Utils/api'

const state = {
  status: '',
  campaigns: [],
  campaign: null,
  loading: false,
  hasLoadedOnce: false
}

const getters = {
  // isAuthenticated: state => !!state.token,
  campaign: state => state.campaign,
  campaigns: state => state.campaigns
  // authStatus: state => state.status
}

const actions = {
  [GET_CAMPAIGNS]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(CAMPAIGN_REQUEST)
      apiClient.get('api/campaigns')
        .then(response => {
          commit(CAMPAIGN_SUCCESS)
          commit(SET_CAMPAIGNS, response.data)
          resolve(response)
        }).catch(error => {
          commit(CAMPAIGN_ERROR, error)
          reject(error)
        })
    })
  },
  [SINGLE_CAMPAIGN]: ({ commit, dispatch }, slug) => {
    return new Promise((resolve, reject) => {
      commit(CAMPAIGN_REQUEST)
      apiClient.get(`api/campaigns/${slug}`)
        .then(response => {
          commit(CAMPAIGN_SUCCESS)
          commit(MODIFY_CAMPAIGN, response.data)
          commit('Tracks/SET_TRACKS', response.data.tracks, { root: true })
          resolve(response)
        }).catch(error => {
          commit(CAMPAIGN_ERROR, error)
          reject(error)
        })
    })
  },
  [CREATE_CAMPAIGN]: ({ commit }, campaign) => {
    return new Promise((resolve, reject) => {
      commit(CAMPAIGN_REQUEST)
      apiClient.get('sanctum/csrf-cookie').then(response => {
        apiClient.post('api/campaigns', campaign).then(response => {
          commit(CAMPAIGN_SUCCESS)
          commit(MODIFY_CAMPAIGNS, response.data)
          resolve(response)
        }).catch(error => {
          commit(CAMPAIGN_ERROR, error)
          reject(error)
        })
      })
    })
  },
  [UPDATE_CAMPAIGN]: ({ commit }, { slug, campaign }) => {
    return new Promise((resolve, reject) => {
      commit(CAMPAIGN_REQUEST)
      apiClient.get('sanctum/csrf-cookie').then(response => {
        apiClient.put(`api/campaigns/${slug}`, campaign).then(response => {
          commit(CAMPAIGN_SUCCESS)
          commit(MODIFY_CAMPAIGN, response.data)
          resolve(response)
        }).catch(error => {
          commit(CAMPAIGN_ERROR, error)
          reject(error)
        })
      })
    })
  },
  [PUBLISH_CAMPAIGN]: ({ commit }, slug) => {
    return new Promise((resolve, reject) => {
      commit(CAMPAIGN_REQUEST)
      apiClient.get('sanctum/csrf-cookie').then(response => {
        apiClient.post(`api/campaigns/${slug}/publish`).then(response => {
          commit(CAMPAIGN_SUCCESS)
          commit(MODIFY_CAMPAIGN, response.data)
          resolve(response)
        }).catch(error => {
          commit(CAMPAIGN_ERROR, error)
          reject(error)
        })
      })
    })
  },
  [DELETE_CAMPAIGN]: ({ commit }, slug) => {
    return new Promise((resolve, reject) => {
      commit(CAMPAIGN_REQUEST)
      apiClient.get('sanctum/csrf-cookie').then(response => {
        apiClient.delete(`api/campaigns/${slug}`).then(response => {
          commit(CAMPAIGN_SUCCESS)
          commit(MODIFY_CAMPAIGN, response.data)
          resolve(response)
        }).catch(error => {
          commit(CAMPAIGN_ERROR, error)
          reject(error)
        })
      })
    })
  }
}

const mutations = {
  [CAMPAIGN_REQUEST]: state => {
    state.loading = true
  },
  [REFRESH_USER]: (state, user) => {
    state.user = user
  },
  [CAMPAIGN_SUCCESS]: (state) => {
    state.status = 'success'
    state.loading = false
    state.hasLoadedOnce = true
  },
  [MODIFY_CAMPAIGN]: (state, data) => {
    state.campaign = data
  },
  [SET_CAMPAIGNS]: (state, data) => {
    state.campaigns = data
  },
  [MODIFY_CAMPAIGNS]: (state, data) => {
    state.campaigns.unshift(data)
  },
  [CAMPAIGN_ERROR]: state => {
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
