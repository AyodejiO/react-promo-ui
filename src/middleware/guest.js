export default function guest ({ next, to, store }) {
  if (store.getters['Auth/isAuthenticated']) {
    return next({ name: 'promo.list' })
  }
  return next()
}
