import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './Auth'
import Setting from './Setting/index'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Auth,
    Setting
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
