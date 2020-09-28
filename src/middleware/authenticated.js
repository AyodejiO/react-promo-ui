import store from '../store'

export const ifAuthenticated = (to, from, next) => {
  store.dispatch('User/getUser')
    .then(() => {
      next()
    })
    .catch(() => {
      next({ name: 'auth1.sign-in', query: { redirect_to: to.fullPath } })
    })
}
