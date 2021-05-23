<template>
  <div>
    <h1 class="mb-0">Sign in</h1>
    <p v-if="message" class="text-danger my-2">{{ message }}</p>
    <form class="mt-4" @submit.prevent="login">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" v-model="email" class="form-control mb-0" id="exampleInputEmail1" placeholder="Enter email">
        <span class="text-danger" v-if="errors.email">
          {{ errors.email[0] }}
        </span>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <router-link :to="{ name: 'auth1.password-reset1' }" class="float-right">Forgot password?</router-link>
        <input type="password" v-model="password" class="form-control mb-0" id="exampleInputPassword1" placeholder="Password">
        <span class="text-danger" v-if="errors.password">
          {{ errors.password[0] }}
        </span>
      </div>
      <div class="d-inline-block w-100">
        <div class="custom-control custom-checkbox d-inline-block mt-2 pt-1">
          <input type="checkbox" class="custom-control-input" id="customCheck1" v-model="remember">
          <label class="custom-control-label" for="customCheck1">Remember Me</label>
        </div>
        <button type="submit" class="btn btn-primary float-right">Sign in</button>
      </div>
      <div class="sign-info">
        <span class="dark-color d-inline-block line-height-2">Don't have an account? <router-link :to="{ name: 'auth1.sign-up'}">Sign up</router-link></span>
        <ul class="iq-social-media">
          <li><a href="#"><i class="ri-facebook-box-line"></i></a></li>
          <li><a href="#"><i class="ri-twitter-line"></i></a></li>
          <li><a href="#"><i class="ri-instagram-line"></i></a></li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignIn',
  data: () => ({
    email: '',
    password: '',
    remember: true,
    errors: [],
    message: null
  }),
  mounted () {
  },
  methods: {
    ...mapActions({
      signIn: 'Auth/SIGN_IN'
    }),
    login: function () {
      this.setErrorsAndMessage([], null)
      const { email, password, remember } = this
      this.signIn({ email, password, remember })
        .then(() => {
          this.$router.push({ name: 'promo.list' })
        })
        .catch(error => {
          this.setErrorsAndMessage(error.response.data.errors, error.response.data.message)
        })
    },
    setErrorsAndMessage: function (errors, message) {
      this.errors = errors
      this.message = message
    }
  }
}
</script>
