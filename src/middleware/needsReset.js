export default function needsReset ({ next, to, store }) {
  const user = store.getters['User/user']
  if (user && user.needs_reset) {
    return next({ name: 'user.edit', query: { redirect_to: to.fullPath } })
  }
  return next()
}
