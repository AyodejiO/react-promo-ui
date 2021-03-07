export default function guest ({ next, to, store }) {
  console.log(store.getters['Auth/isAuthenticated'])
  if (store.getters['Auth/isAuthenticated']) {
    return next({ name: 'promo.list' })
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
