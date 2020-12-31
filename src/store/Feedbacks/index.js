/* eslint-disable promise/param-names */
import {
  GET_FEEDBACKS,
  SINGLE_FEEDBACK,
  MODIFY_FEEDBACK,
  MODIFY_FEEDBACKS,
  SET_FEEDBACKS,
  FEEDBACK_REQUEST,
  FEEDBACK_SUCCESS,
  REFRESH_USER,
  FEEDBACK_ERROR,
  REMOVE_FEEDBACK,
  DELETE_FEEDBACK,
  NEW_FEEDBACK
} from './constants'
import apiClient from '../../Utils/api'

const state = {
  status: '',
  totalRating: 0,
  feedbacks: [],
  feedbacksStat: [],
  feedback: null,
  loading: false,
  hasLoadedOnce: false
}

const getters = {
  // isAuthenticated: state => !!state.token,
  feedback: state => state.feedback,
  feedbacks: state => state.feedbacks,
  feedbacksStat: state => state.feedbacksStat,
  totalFeedbacks: state => state.feedbacks.length,
  totalRating: state => state.totalRating
  // authStatus: state => state.status
}

const actions = {
  [GET_FEEDBACKS]: ({ commit }, campaign) => {
    return new Promise((resolve, reject) => {
      commit(FEEDBACK_REQUEST)
      apiClient.get(`api/campaigns/${campaign}/feedbacks`)
        .then(response => {
          commit(FEEDBACK_SUCCESS)
          commit(SET_FEEDBACKS, response.data)
          resolve(response)
        }).catch(error => {
          commit(FEEDBACK_ERROR, error)
          reject(error)
        })
    })
  },
  [SINGLE_FEEDBACK]: ({ commit }, slug) => {
    return new Promise((resolve, reject) => {
      commit(FEEDBACK_REQUEST)
      apiClient.get(`api/feedbacks/${slug}`)
        .then(response => {
          commit(FEEDBACK_SUCCESS)
          commit(MODIFY_FEEDBACK, response.data)
          resolve(response)
        }).catch(error => {
          commit(FEEDBACK_ERROR, error)
          reject(error)
        })
    })
  },
  [NEW_FEEDBACK]: ({ commit }, { feedback, campaign }) => {
    return new Promise((resolve, reject) => {
      commit(FEEDBACK_REQUEST)
      apiClient.get('sanctum/csrf-cookie').then(response => {
        apiClient.post(`api/campaigns/${campaign}/feedbacks`, feedback).then(response => {
          commit(FEEDBACK_SUCCESS)
          commit(MODIFY_FEEDBACK, response.data)
          resolve(response)
        }).catch(error => {
          commit(FEEDBACK_ERROR, error)
          reject(error)
        })
      })
    })
  },
  [DELETE_FEEDBACK]: ({ commit }, feedback) => {
    return new Promise((resolve, reject) => {
      commit(FEEDBACK_REQUEST)
      apiClient.get('sanctum/csrf-cookie').then(response => {
        apiClient.delete(`api/feedbacks/${feedback}`).then(response => {
          commit(FEEDBACK_SUCCESS)
          commit(REMOVE_FEEDBACK, feedback)
          resolve(response)
        }).catch(error => {
          commit(FEEDBACK_ERROR, error)
          reject(error)
        })
      })
    })
  }
}

const mutations = {
  [FEEDBACK_REQUEST]: state => {
    state.loading = true
  },
  [REFRESH_USER]: (state, user) => {
    state.user = user
  },
  [FEEDBACK_SUCCESS]: (state) => {
    state.status = 'success'
    state.loading = false
    state.hasLoadedOnce = true
  },
  [MODIFY_FEEDBACK]: (state, data) => {
    state.feedback = data
  },
  [SET_FEEDBACKS]: (state, data) => {
    state.feedbacks = data || []
    state.feedbacksStat = state.feedbacks.reduce((arr, obj) => {
      let index = arr.findIndex(x => x.rating === obj.rating)
      if (index > -1) {
        arr[index].count++
      } else {
        arr.push({
          rating: obj.rating,
          count: 1
        })
      }
      return arr
    }, [])

    state.totalRating = state.feedbacks.reduce((total, obj) => {
      total += obj.rating
      return total
    }, 0)
  },
  [MODIFY_FEEDBACKS]: (state, data) => {
    state.feedbacks.unshift(data)
  },
  [REMOVE_FEEDBACK]: (state, id) => {
    state.feedbacks = state.feedbacks.filter((feedback) => feedback.id !== id)
  },
  [FEEDBACK_ERROR]: state => {
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
