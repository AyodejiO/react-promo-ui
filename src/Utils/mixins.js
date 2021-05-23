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
      console.log(authorizedRoles)
      console.log(userRole)
      return authorizedRoles.includes(userRole)
    }
  }
}
