export default function authenticated ({ next, to, store }) {
  if (!store.getters['Auth/isAuthenticated']) {
    return next({ name: 'auth1.sign-in', query: { redirect_to: to.fullPath } })
  }
  return next()
  // store.dispatch('User/getUser')
  //   .then(() => {
  //     next()
  //   })
  //   .catch(() => {
  //     next({ name: 'auth1.sign-in', query: { redirect_to: to.fullPath } })
  //   })
}
