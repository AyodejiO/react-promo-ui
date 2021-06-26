export default {
  methods: {
    userTypes: function () {
      return {
        DJ: 'DJ',
        Label: 'Label',
        Radio: 'Radio'
      }
    },
    isAuthorizedUser: function (authorizedRoles, user) {
      if (!user) return null
      const userRole = user.type
      return authorizedRoles.includes(userRole)
    }
  }
}
