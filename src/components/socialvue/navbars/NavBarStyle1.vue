<template>
  <!-- TOP Nav Bar -->
    <div class="iq-top-navbar">
      <div class="iq-navbar-custom">
        <nav class="navbar navbar-expand-lg navbar-light p-0">
            <div class="iq-navbar-logo d-flex justify-content-between">
              <a href="#">
                <img :src="logo" class="img-fluid" alt="logo">
                <!-- <span>SocialV</span> -->
              </a>
              <div class="iq-menu-bt align-self-center">
                <div class="wrapper-menu" @click="miniSidebar">
                    <div class="main-circle"><i class="ri-menu-line"></i></div>
                </div>
              </div>
            </div>
            <div class="iq-search-bar">
              <form action="#" class="searchbox">
                  <input type="text" class="text search-input" placeholder="Type here to search...">
                  <a class="search-link" href="#"><i class="ri-search-line"></i></a>
              </form>
            </div>
            <b-navbar-toggle target="nav-collapse" class="mr-2">
              <i class="ri-menu-3-line"></i>
            </b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <ul class="navbar-nav ml-auto navbar-list">
                  <li>
                    <a href="#" class="iq-waves-effect d-flex align-items-center">
                        <img :src="defaultImg" class="img-fluid rounded-circle mr-3" alt="user">
                        <div class="caption">
                          <h6 class="mb-0 line-height">{{ user != null? user.username : '' }}</h6>
                          <small class="mb-0 line-height">{{ user != null? `${user.type} Account` : '' }}</small>
                        </div>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="search-toggle iq-waves-effect" href="#"><i class="ri-group-line"></i></a>
                    <div class="iq-sub-dropdown iq-sub-dropdown-large">
                        <div class="iq-card shadow-none m-0">
                          <div class="iq-card-body p-0 ">
                              <div class="bg-primary p-3">
                                <h5 class="mb-0 text-white">Circle Request<small class="badge  badge-light float-right pt-1">{{requests.length}}</small></h5>
                              </div>
                              <div class="iq-friend-request" v-for="(request,index) in requests" :key="index">
                                <div class="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between" >
                                    <div class="d-flex align-items-center">
                                      <!-- <div class="">
                                          <img class="avatar-40 rounded" :src="item.img" alt="">
                                      </div> -->
                                      <div class="media-body ml-3">
                                          <h6 class="mb-0 ">{{request.name}}</h6>
                                          <p class="mb-0">{{request.request_date}}</p>
                                      </div>
                                    </div>
                                    <div class="d-flex align-items-center">
                                      <b-button class="mr-3" size="sm" rounded :disabled="loading && requestUser == request.id" variant="primary" @click="acceptRequest(request.id)">Accept</b-button>
                                      <b-button class="mr-3" size="sm" rounded :disabled="loading && requestUser == request.id" variant="warning" @click="declineRequest(request.id)">Decline</b-button>
                                      <!-- <a href="#" class="mr-3 btn btn-primary rounded" :disabled="loading && requestUser == request.id" variant="primary" @click="acceptRequest(request.id)">Confirm</a>
                                      <a href="#" class="mr-3 btn btn-secondary rounded" :disabled="loading && requestUser == request.id" variant="warning" @click="declineRequest(request.id)">Delete Request</a> -->
                                    </div>
                                </div>
                              </div>
                              <div class="text-center">
                                <a href="#" class="mr-3 btn text-primary">View More Request</a>
                              </div>
                          </div>
                        </div>
                    </div>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="search-toggle iq-waves-effect">
                      <lottie :option="require('assets/images/small/lottie-bell')" id="lottie-beil" />
                        <span class="bg-danger dots"></span>
                    </a>
                    <div class="iq-sub-dropdown">
                        <div class="iq-card shadow-none m-0">
                          <div class="iq-card-body p-0 ">
                              <div class="bg-primary p-3">
                                <h5 class="mb-0 text-white">Notifications<small class="badge  badge-light float-right pt-1">{{notifs.length}}</small></h5>
                              </div>
                              <a href="#" class="iq-sub-card" v-for="(notif, index) in notifs" :key="index">
                                <div class="media align-items-center">
                                    <!-- <div class="">
                                      <img class="avatar-40 rounded" src="../../../assets/images/user/01.jpg" alt="">
                                    </div> -->
                                    <div class="media-body ml-3">
                                      <h6 class="mb-0 ">{{notif.data.title}}</h6>
                                      <small class="float-right font-size-12">{{notif.data.message}}</small>
                                      <p class="mb-0">95 MB</p>
                                    </div>
                                </div>
                              </a>
                          </div>
                        </div>
                    </div>
                  </li>
                  <li class="nav-item dropdown">
                    <a href="#" class="search-toggle iq-waves-effect">
                      <lottie :option="require('assets/images/small/lottie-mail')" id="lottie-mail" />
                        <span class="bg-primary count-mail"></span>
                    </a>
                    <div class="iq-sub-dropdown">
                        <div class="iq-card shadow-none m-0">
                          <div class="iq-card-body p-0 ">
                              <div class="bg-primary p-3">
                                <h5 class="mb-0 text-white">All Messages<small class="badge  badge-light float-right pt-1">5</small></h5>
                              </div>
                              <a href="#" class="iq-sub-card" >
                                <div class="media align-items-center">
                                    <div class="">
                                      <img class="avatar-40 rounded" src="../../../assets/images/user/01.jpg" alt="">
                                    </div>
                                    <div class="media-body ml-3">
                                      <h6 class="mb-0 ">Bni Emma Watson</h6>
                                      <small class="float-left font-size-12">13 Jun</small>
                                    </div>
                                </div>
                              </a>
                              <a href="#" class="iq-sub-card" >
                                <div class="media align-items-center">
                                    <div class="">
                                      <img class="avatar-40 rounded" src="../../../assets/images/user/02.jpg" alt="">
                                    </div>
                                    <div class="media-body ml-3">
                                      <h6 class="mb-0 ">Lorem Ipsum Watson</h6>
                                      <small class="float-left font-size-12">20 Apr</small>
                                    </div>
                                </div>
                              </a>
                              <a href="#" class="iq-sub-card" >
                                <div class="media align-items-center">
                                    <div class="">
                                      <img class="avatar-40 rounded" src="../../../assets/images/user/03.jpg" alt="">
                                    </div>
                                    <div class="media-body ml-3">
                                      <h6 class="mb-0 ">Why do we use it?</h6>
                                      <small class="float-left font-size-12">30 Jun</small>
                                    </div>
                                </div>
                              </a>
                              <a href="#" class="iq-sub-card" >
                                <div class="media align-items-center">
                                    <div class="">
                                      <img class="avatar-40 rounded" src="../../../assets/images/user/04.jpg" alt="">
                                    </div>
                                    <div class="media-body ml-3">
                                      <h6 class="mb-0 ">Variations Passages</h6>
                                      <small class="float-left font-size-12">12 Sep</small>
                                    </div>
                                </div>
                              </a>
                              <a href="#" class="iq-sub-card" >
                                <div class="media align-items-center">
                                    <div class="">
                                      <img class="avatar-40 rounded" src="../../../assets/images/user/05.jpg" alt="">
                                    </div>
                                    <div class="media-body ml-3">
                                      <h6 class="mb-0 ">Lorem Ipsum generators</h6>
                                      <small class="float-left font-size-12">5 Dec</small>
                                    </div>
                                </div>
                              </a>
                          </div>
                        </div>
                    </div>
                  </li>
              </ul>
              <ul class="navbar-list">
                  <li>
                    <a href="#" class="search-toggle iq-waves-effect d-flex align-items-center">
                    <i class="ri-arrow-down-s-fill"></i>
                    </a>
                    <div class="iq-sub-dropdown iq-user-dropdown">
                        <div class="iq-card shadow-none m-0">
                          <div class="iq-card-body p-0 ">
                              <div class="bg-primary p-3 line-height">
                                <h5 class="mb-0 text-white line-height">Hello {{ user != null? user.username : '' }}</h5>
                                <span class="text-white font-size-12">Available</span>
                              </div>
                              <router-link to="/" class="iq-sub-card iq-bg-primary-hover">
                                <div class="media align-items-center">
                                    <div class="rounded iq-card-icon iq-bg-primary">
                                      <i class="ri-file-user-line"></i>
                                    </div>
                                    <div class="media-body ml-3">
                                      <h6 class="mb-0 ">My Profile</h6>
                                      <p class="mb-0 font-size-12">View personal profile details.</p>
                                    </div>
                                </div>
                              </router-link>
                              <router-link to="/user/profile-edit"  class="iq-sub-card iq-bg-warning-hover">
                                <div class="media align-items-center">
                                    <div class="rounded iq-card-icon iq-bg-warning">
                                      <i class="ri-profile-line"></i>
                                    </div>
                                    <div class="media-body ml-3">
                                      <h6 class="mb-0 ">Edit Profile</h6>
                                      <p class="mb-0 font-size-12">Modify your personal details.</p>
                                    </div>
                                </div>
                              </router-link>
                              <router-link to="/account-setting" class="iq-sub-card iq-bg-info-hover">
                                <div class="media align-items-center">
                                    <div class="rounded iq-card-icon iq-bg-info">
                                      <i class="ri-account-box-line"></i>
                                    </div>
                                    <div class="media-body ml-3">
                                      <h6 class="mb-0 ">Account settings</h6>
                                      <p class="mb-0 font-size-12">Manage your account parameters.</p>
                                    </div>
                                </div>
                              </router-link>
                              <div class="d-inline-block w-100 text-center p-3">
                                <button class="bg-primary iq-sign-btn" @click.prevent="logout" role="button">Sign out<i class="ri-login-box-line ml-2"></i></button>
                              </div>
                          </div>
                        </div>
                    </div>
                  </li>
              </ul>
            </b-collapse>
        </nav>
      </div>
    </div>
  <!-- TOP Nav Bar END -->
</template>
<script>
import SideBarItems from '../../../FackApi/json/SideBar'
import { mapActions, mapGetters } from 'vuex'
import Lottie from '../../../components/socialvue/lottie/Lottie'

export default {
  name: 'NavBarStyle1',
  props: {
    homeURL: { type: Object, default: () => ({ name: 'layout1.dashboard' }) },
    title: { type: String, default: 'Dashboard' },
    logo: { type: String, default: require('assets/images/logo.png') },
    defaultImg: { type: String, default: require('assets/images/user.png') },
    horizontal: { type: Boolean, default: false },
    items: { type: Array }
  },
  mounted () {
    document.addEventListener('click', this.closeSearch, true)
    this.getNotifs()
    this.getCircleRequests()
  },
  components: {
    Lottie
  },
  computed: {
    ...mapGetters({
      bookmark: 'Setting/bookmarkState',
      user: 'Auth/user',
      notifs: 'Auth/notifs',
      loading: 'Circle/loading',
      message: 'Circle/message',
      requestUser: 'Circle/user',
      requests: 'Circle/requests'
    })
  },
  data () {
    return {
      sidebar: SideBarItems,
      globalSearch: '',
      showSearch: false,
      showMenu: false
    }
  },
  methods: {
    ...mapActions({
      getRequests: 'Circle/GET_REQUESTS',
      acceptUserRequest: 'Circle/ACCEPT_USER_REQUEST',
      declineUserRequest: 'Circle/DECLINE_USER_REQUEST',
      getNotifs: 'Auth/GET_NOTIFS',
      signOut: 'Auth/AUTH_LOGOUT'
    }),
    getCircleRequests: function () {
      this.getRequests()
    },
    acceptRequest: function (user) {
      this.acceptUserRequest(user)
        .then(() => {
          this.$bvToast.toast('Request Accepted', {
            title: `Success`,
            variant: 'success',
            autoHideDelay: 5000,
            appendToast: true
          })
        })
        .catch(() => {
          this.$bvToast.toast(this.message, {
            title: `Error`,
            variant: 'error',
            autoHideDelay: 5000,
            appendToast: true
          })
        })
    },
    declineRequest: function (user) {
      this.declineUserRequest(user)
        .then(() => {
          this.$bvToast.toast('Request Declined', {
            title: `Success`,
            variant: 'success',
            autoHideDelay: 5000,
            appendToast: true
          })
        })
        .catch(() => {
          this.$bvToast.toast(this.message, {
            title: `Error`,
            variant: 'error',
            autoHideDelay: 5000,
            appendToast: true
          })
        })
    },
    miniSidebar () {
      this.$emit('toggle')
    },
    openSearch () {
      this.showSearch = true
      this.showMenu = 'iq-show'
      this.globalSearch = ''
    },
    closeSearch (event) {
      let classList = event.target.classList
      if (!classList.contains('searchbox') && !classList.contains('search-input')) {
        this.removeClass()
      }
    },
    removeClass () {
      this.showSearch = false
      this.showMenu = ''
      this.globalSearch = ''
    },
    logout: function () {
      this.signOut()
        .then(() => {
          this.$router.push({ name: 'auth1.sign-in' })
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          // this.errors = error.response.data.errors
        })
    }
  }
}
</script>
