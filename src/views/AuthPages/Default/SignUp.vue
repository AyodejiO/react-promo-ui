/* eslint-disable no-unreachable */
<template>
  <div>
    <h1 class="mb-0">Sign Up</h1>
    <p v-if="message" class="text-danger my-2">{{ message }}</p>
    <!-- <p>Enter your email address and password to access admin panel.</p> -->
    <form class="mt-4" @submit.prevent="createUser">
      <div class="form-group">
        <label for="exampleInputEmail1">Your Full Name</label>
        <input type="text" v-model="name" class="form-control mb-0" id="exampleInputEmail1" placeholder="Your Full Name" required>
        <span class="text-danger" v-if="errors.name">
          {{ errors.name[0] }}
        </span>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail2">Email address</label>
        <input type="email" v-model="email" class="form-control mb-0" id="exampleInputEmail2" placeholder="Enter email" required>
        <span class="text-danger" v-if="errors.email">
          {{ errors.email[0] }}
        </span>
      </div>
      <!-- <div class="form-group">
        <label for="user_type">User Type</label>
        <select class="form-control mb-0" v-model="user_type" name="user_type" id="user_type" required>
          <option value="">Select Type</option>
          <option v-for="type in types"  :value="type.id" :key="type.id">
            {{ type.name }}
          </option>
        </select>
        <span class="text-danger" v-if="errors.user_type">
          {{ errors.user_type[0] }}
        </span>
      </div> -->
      <div class="form-group" v-if="user_type == 1">
        <label for="user_type">Stage Name</label>
        <input type="stage_name" v-model="stage_name" class="form-control mb-0" id="exampleInputStageName2" placeholder="Enter stage_name" required>
        <span class="text-danger" v-if="errors.stage_name">
          {{ errors.stage_name[0] }}
        </span>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" v-model="password" class="form-control mb-0" id="exampleInputPassword1" placeholder="Password" required>
        <span class="text-danger" v-if="errors.password">
          {{ errors.password[0] }}
        </span>
      </div>
      <div class="d-inline-block w-100">
        <div class="custom-control custom-checkbox d-inline-block mt-2 pt-1">
          <input type="checkbox" v-model="tac" name="tac" class="custom-control-input" id="customCheck1" required>
          <label class="custom-control-label" for="customCheck1">I accept <a href="#">Terms and Conditions</a></label>
          <span class="text-danger" v-if="errors.tac">
          {{ errors.tac[0] }}
        </span>
        </div>
        <button type="submit" class="btn btn-primary float-right">Sign Up</button>
      </div>
      <div class="sign-info">
        <span class="dark-color d-inline-block line-height-2">Already Have Account ? <router-link :to="{ name: 'auth1.sign-in'}">Log In</router-link></span>
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
  name: 'SignUp',
  data: () => ({
    name: '',
    email: '',
    user_type: '',
    stage_name: null,
    password: '',
    types: [],
    tac: false,
    errors: [],
    message: null
  }),
  methods: {
    ...mapActions({
      signUp: 'Auth/SIGN_UP',
      getUserTypes: 'User/USER_TYPES'
    }),
    createUser: function () {
      // eslint-disable-next-line camelcase
      const { name, email, user_type, stage_name, tac, password } = this
      this.signUp({ name, email, user_type, stage_name, tac, password })
        .then(() => {
          this.$router.push({ name: 'social.list' })
        })
        .catch(error => {
          this.errors = error.response.data.errors
          this.message = error.response.data.message
        })
    }
  },
  mounted () {
    // this.getUserTypes()
    //   .then(response => {
    //     this.types = response.data
    //   })
    //   .catch(error => {
    //     this.errors = error.response.data.errors
    //   })
  }
}
</script>
