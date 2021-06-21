import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './Auth'
import Users from './Users'
import Invites from './Invites'
import Campaigns from './Campaigns'
import Circle from './Circle'
import Feedbacks from './Feedbacks'
import Tracks from './Tracks'
import Tags from './Tags'
import Setting from './Setting/index'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Auth,
    Setting,
    Users,
    Campaigns,
    Circle,
    Tracks,
    Feedbacks,
    Invites,
    Tags
  },
  state: {
    // token: localStorage.getItem('user-token') || '',
    // status: ''
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    // isAuthenticated: state => !!state.token,
    // authStatus: state => state.status,
  },
  strict: debug
})
