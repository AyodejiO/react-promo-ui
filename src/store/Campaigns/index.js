/* eslint-disable promise/param-names */
import {
  GET_CAMPAIGNS,
  SET_CAMPAIGNS,
  UPDATE_CAMPAIGNS,
  CAMPAIGN_REQUEST,
  CAMPAIGN_SUCCESS,
  REFRESH_USER,
  CAMPAIGN_ERROR,
  NEW_CAMPAIGN
} from './constants'
import apiClient from '../../Utils/api'

const state = {
  status: '',
  campaigns: [],
  loading: false,
  hasLoadedOnce: false
}

const getters = {
  // isAuthenticated: state => !!state.token,
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
  [NEW_CAMPAIGN]: ({ commit }, campaign) => {
    return new Promise((resolve, reject) => {
      commit(CAMPAIGN_REQUEST)
      apiClient.get('sanctum/csrf-cookie').then(response => {
        apiClient.post('api/campaigns', campaign).then(response => {
          commit(CAMPAIGN_SUCCESS)
          commit(UPDATE_CAMPAIGNS, response.data)
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
  [SET_CAMPAIGNS]: (state, data) => {
    state.campaigns = data
  },
  [UPDATE_CAMPAIGNS]: (state, data) => {
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
