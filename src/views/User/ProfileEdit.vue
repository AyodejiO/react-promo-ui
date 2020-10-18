<template>
  <div>
    <b-alert :show="user.needs_reset" variant=" " class="text-white font-weight-bold bg-danger">
      <div class="iq-alert-text">Please change your password to proceed!</div>
    </b-alert>
    <div class="row">
      <div class="col-lg-12">
        <div class="iq-card">
          <div class="iq-card-body p-0">
            <div class="iq-edit-list">
              <ul class="iq-edit-profile d-flex nav nav-pills">
                <li class="col-md-3 p-0">
                  <a class="nav-link" data-toggle="pill" href="#personal-information" v-bind:class="{ 'active': !user.needs_reset, 'disabled': user.needs_reset }">
                    Personal Information
                  </a>
                </li>
                <li class="col-md-3 p-0">
                  <a class="nav-link" data-toggle="pill" href="#chang-pwd" v-bind:class="{ 'active': user.needs_reset }">
                    Change Password
                  </a>
                </li>
                <li class="col-md-3 p-0">
                  <a class="nav-link" data-toggle="pill" href="#emailandsms" v-bind:class="{ 'disabled': user.needs_reset }">
                    Email and SMS
                  </a>
                </li>
                <li class="col-md-3 p-0">
                  <a class="nav-link" data-toggle="pill" href="#manage-contact" v-bind:class="{ 'disabled': user.needs_reset }">
                    Manage Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="iq-edit-list-data">
          <div class="tab-content">
            <div class="tab-pane fade show" id="personal-information" role="tabpanel" v-bind:class="{ 'active': !user.needs_reset }">
              <div class="iq-card">
                <div class="iq-card-header d-flex justify-content-between">
                  <div class="iq-header-title">
                    <h4 class="card-title">Personal Information</h4>
                  </div>
                </div>
                <div class="iq-card-body">
                  <form>
                    <!-- <div class="form-group row align-items-center">
                      <div class="col-md-12">
                        <div class="profile-img-edit">
                          <img class="profile-pic" src="../../assets/images/user/11.png" alt="profile-pic">
                          <div class="p-image">
                            <i class="ri-pencil-line upload-button"></i>
                            <input class="file-upload" type="file" accept="image/*"/>
                          </div>
                        </div>
                      </div>
                    </div> -->
                    <div class=" row align-items-center">
                      <div class="form-group col-sm-6">
                        <label for="fname">First Name:</label>
                        <input type="text" class="form-control" id="fname" v-model='user.name'>
                      </div>
                      <div class="form-group col-sm-6">
                        <label for="email">Email:</label>
                        <input type="text" class="form-control" id="email" v-model='user.email'>
                      </div>
                      <div class="form-group col-sm-6" v-if="user.type  == 'DJ'">
                        <label for="stage_name">Stage Name:</label>
                        <input type="text" class="form-control" id="stage_name" v-model='user.stage_name' value="Bni@01">
                      </div>
                      <div class="form-group col-sm-6">
                        <label for="cname">City:</label>
                        <input type="text" class="form-control" id="cname" value="Atlanta">
                      </div>
                      <div class="form-group col-sm-6">
                        <label>Country:</label>
                        <select class="form-control" id="exampleFormControlSelect3">
                          <option>Caneda</option>
                          <option>Noida</option>
                          <option selected="">USA</option>
                          <option>India</option>
                          <option>Africa</option>
                        </select>
                      </div>
                      <div class="form-group col-sm-6">
                        <label>State:</label>
                        <select class="form-control" id="exampleFormControlSelect4">
                          <option>California</option>
                          <option>Florida</option>
                          <option selected="">Georgia</option>
                          <option>Connecticut</option>
                          <option>Louisiana</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary mr-2">Submit</button>
                    <button type="reset" class="btn iq-bg-danger">Cancel</button>
                  </form>
                </div>
              </div>
            </div>
            <div class="tab-pane fade show" id="chang-pwd" role="tabpanel" v-bind:class="{ 'active': user.needs_reset }">
              <div class="iq-card">
                <div class="iq-card-header d-flex justify-content-between">
                  <div class="iq-header-title">
                    <h4 class="card-title">Change Password</h4>
                  </div>
                </div>
                <div class="iq-card-body">
                  <form @submit.prevent="changePassword">
                    <div class="form-group">
                      <label for="cpass">Current Password:</label>
                      <a href="javascripe:void();" class="float-right">Forgot Password</a>
                      <input type="Password" class="form-control" v-model='password.old_pwd' id="cpass" value="">
                      <span class="text-danger" v-if="errors.old_pwd">
                        {{ errors.old_pwd[0] }}
                      </span>
                    </div>
                    <div class="form-group">
                      <label for="npass">New Password:</label>
                      <input type="Password" class="form-control" v-model='password.new_pwd' id="npass" value="">
                      <span class="text-danger" v-if="errors.new_pwd">
                        {{ errors.new_pwd[0] }}
                      </span>
                    </div>
                    <div class="form-group">
                      <label for="vpass">Verify Password:</label>
                      <input type="Password" class="form-control" v-model='password.new_pwd_confirmation' id="vpass" value="">
                    </div>
                    <button type="submit" class="btn btn-primary mr-2">Submit</button>
                    <button type="reset" class="btn iq-bg-danger">Cancel</button>
                  </form>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="emailandsms" role="tabpanel">
              <div class="iq-card">
                <div class="iq-card-header d-flex justify-content-between">
                  <div class="iq-header-title">
                    <h4 class="card-title">Email and SMS</h4>
                  </div>
                </div>
                <div class="iq-card-body">
                  <form>
                    <div class="form-group row align-items-center">
                      <label class="col-md-3" for="emailnotification">Email Notification:</label>
                      <div class="col-md-9 custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="emailnotification" checked="">
                        <label class="custom-control-label" for="emailnotification"></label>
                      </div>
                    </div>
                    <div class="form-group row align-items-center">
                      <label class="col-md-3" for="smsnotification">SMS Notification:</label>
                      <div class="col-md-9 custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="smsnotification" checked="">
                        <label class="custom-control-label" for="smsnotification"></label>
                      </div>
                    </div>
                    <div class="form-group row align-items-center">
                      <label class="col-md-3" for="npass">When To Email</label>
                      <div class="col-md-9">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="email01">
                          <label class="custom-control-label" for="email01">You have new notifications.</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="email02">
                          <label class="custom-control-label" for="email02">You're sent a direct message</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="email03" checked="">
                          <label class="custom-control-label" for="email03">Someone adds you as a connection</label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row align-items-center">
                      <label class="col-md-3" for="npass">When To Escalate Emails</label>
                      <div class="col-md-9">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="email04">
                          <label class="custom-control-label" for="email04"> Upon new order.</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="email05">
                          <label class="custom-control-label" for="email05"> New membership approval</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="email06" checked="">
                          <label class="custom-control-label" for="email06"> Member registration</label>
                        </div>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary mr-2">Submit</button>
                    <button type="reset" class="btn iq-bg-danger">Cancel</button>
                  </form>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="manage-contact" role="tabpanel">
              <div class="iq-card">
                <div class="iq-card-header d-flex justify-content-between">
                  <div class="iq-header-title">
                    <h4 class="card-title">Manage Contact</h4>
                  </div>
                </div>
                <div class="iq-card-body">
                  <form>
                    <div class="form-group">
                      <label for="cno">Contact Number:</label>
                      <input type="text" class="form-control" id="cno" value="001 2536 123 458">
                    </div>
                    <div class="form-group">
                      <label for="email">Email:</label>
                      <input type="text" class="form-control" id="email" value="Bnijone@demo.com">
                    </div>
                    <div class="form-group">
                      <label for="url">Url:</label>
                      <input type="text" class="form-control" id="url" value="https://getbootstrap.com">
                    </div>
                    <button type="submit" class="btn btn-primary mr-2">Submit</button>
                    <button type="reset" class="btn iq-bg-danger">Cancel</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { socialvue } from '../../config/pluginInit'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ProfileEdit',
  mounted () {
    socialvue.index()
  },
  computed: {
    ...mapGetters({
      bookmark: 'Setting/bookmarkState',
      user: 'User/user'
    })
  },
  data () {
    return {
      user2: {
        fname: '',
        lname: '',
        name: '',
        username: '',
        email: '',
        password: '',
        address1: '',
        address2: '',
        company_name: '',
        profile_image: require('../../assets/images/user/user-11.png'),
        mobile_no: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        role: '',
        gender: '',
        dob: '',
        url: ''
      },
      errors: [],
      password: {
        old_pwd: '',
        new_pwd: '',
        new_pwd_confirmation: ''
      },
      countries: [
        { value: 'Canada', text: 'Canada' },
        { value: 'Niada', text: 'Niada' },
        { value: 'USA', text: 'USA' },
        { value: 'India', text: 'India' },
        { value: 'Africa', text: 'Africa' }
      ],
      states: [
        { value: 'California', text: 'California' },
        { value: 'Florida', text: 'Florida' },
        { value: 'Georgia', text: 'Georgia' },
        { value: 'Connecticut', text: 'Connecticut' },
        { value: 'Louisiana', text: 'Louisiana' }
      ]
    }
  },
  methods: {
    ...mapActions({
      signUp: 'Auth/SIGN_UP',
      changeUserPwd: 'User/CHANGE_PASSWORD'
    }),
    onSubmit () {
      this.user.name = this.user.fname + ' ' + this.user.lname
      this.$router.replace('/user/user-list')
    },
    changePassword: function () {
      // eslint-disable-next-line camelcase
      const { old_pwd, new_pwd, new_pwd_confirmation } = this.password
      // console.log({ old_pwd, new_pwd, new_pwd_confirmation })
      this.changeUserPwd({ old_pwd, new_pwd, new_pwd_confirmation })
        .then(() => {
          this.$router.push({ name: 'promo.list' })
        })
        .catch(error => {
          this.errors = error.response.data.errors
          // this.message = error.response.data.message
        })
    },
    previewImage: function (event) {
      const input = event.target

      if (input.files && input.files[0]) {
        const reader = new FileReader()

        reader.onload = (e) => {
          this.user.profile_image = e.target.result
        }

        reader.readAsDataURL(input.files[0])
      }
    }
  }
}
</script>
