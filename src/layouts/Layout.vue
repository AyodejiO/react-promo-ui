<template>
  <div>
    <Loader />
    <div class="wrapper">
      <!-- Sidebar  -->
      <SideBarStyle1 :items="verticalMenu" :logo="logo" @toggle="sidebarMini" />
      <!-- TOP Nav Bar -->
      <NavBarStyle1 title="Dashboard" :homeURL="{ name: 'dashboard1.home' }" @toggle="sidebarMini" :logo="logo">
      </NavBarStyle1>

        <div  v-if ="
        (this.$route.name == 'promo.friend-list' ||
         this.$route.name == 'promo.group' ||
         this.$route.name == 'promo.profile-image'  ||
         this.$route.name == 'promo.profile-video' ||
          this.$route.name == 'promo.profile-event' ||
          this.$route.name == 'promo.birthday' ||
          this.$route.name == 'promo.weather' ||
          this.$route.name == 'promo.music' ||
          this.$route.name == 'app.calendar'
          )
        " class="header-for-bg"

        >
          <div class="background-header position-relative">
            <img :src="$route.meta.img" class="img-fluid w-100" alt="header-bg">
            <div class="title-on-header">
              <div class="data-block">
                <h2>{{$route.meta.name}}</h2>
              </div>
            </div>
          </div>
        </div>
      <!-- TOP Nav Bar END -->
      <div id="content-page" class="content-page">
        <div class="container">
        <transition name="router-anim" :enter-active-class="`animated ${animated.enter}`" mode="out-in"
                    :leave-active-class="`animated ${animated.exit}`">
          <router-view/>
        </transition>
        </div>
      </div>
    </div>
    <FooterStyle1>
      <template v-slot:left>
        <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
        <li class="list-inline-item"><a href="#">Terms of Use</a></li>
      </template>
      <template v-slot:right>
        Copyright {{year}} <a href="#">React Promo</a> All Rights Reserved.
      </template>
    </FooterStyle1>
  </div>
</template>
<script>
import Loader from '../components/socialvue/loader/Loader'
import SideBarStyle1 from '../components/socialvue/sidebars/SideBarStyle1'
import NavBarStyle1 from '../components/socialvue/navbars/NavBarStyle1'
import SideBarItems from '../FackApi/json/SideBar'
import profile from '../assets/images/user/user-1.jpeg'
import loader from '../assets/images/logo.png'
import FooterStyle1 from '../components/socialvue/footer/FooterStyle1'
import { socialvue } from '../config/pluginInit'
import { Users } from '../FackApi/api/chat'
import { mapActions } from 'vuex'
export default {
  name: 'Layout1',
  components: {
    Loader,
    SideBarStyle1,
    NavBarStyle1,
    FooterStyle1
  },
  mounted () {
    this.logo = loader
    this.getAuthUser()
      .then(response => {
        if (response.data.needs_reset) {
          this.$router.push({ name: 'user.edit' })
        }
      })
      .catch(() => {
        this.logout()
          .then(() => this.$router.push({ name: 'auth1.sign-in' }))
      })
  },
  computed: {
    currentRouteName () {
      return this.$route.name
    }
  },
  watch: {
  },
  // sidebarTicket
  data () {
    return {
      animated: { enter: 'zoomIn', exit: 'zoomOut' },
      animateClass: [
        { value: { enter: 'zoomIn', exit: 'zoomOut' }, text: 'Zoom' },
        { value: { enter: 'fadeInUp', exit: 'fadeOutDown' }, text: 'Fade' },
        { value: { enter: 'slideInLeft', exit: 'slideOutRight' }, text: 'Slide' },
        { value: { enter: 'rotateInDownLeft', exit: 'rotateOutDownLeft' }, text: 'Roll' }
      ],
      verticalMenu: SideBarItems,
      userProfile: profile,
      logo: loader,
      usersList: Users,
      message: [
        { image: require('../assets/images/user/user-01.jpg'), name: 'Nik Emma Watson', date: '13 jan' },
        { image: require('../assets/images/user/user-02.jpg'), name: 'Greta Life', date: '14 Jun' },
        { image: require('../assets/images/user/user-03.jpg'), name: 'Barb Ackue', date: '16 Aug' },
        { image: require('../assets/images/user/user-04.jpg'), name: 'Anna Sthesia', date: '21 Sept' },
        { image: require('../assets/images/user/user-05.jpg'), name: 'Bob Frapples', date: '29 Sept' }
      ],
      notification: [
        { image: require('../assets/images/user/user-01.jpg'), name: 'Nik Emma Watson', date: '23 hour ago', description: 'Enjoy smart access to videos, games' },
        { image: require('../assets/images/user/user-02.jpg'), name: 'Greta Life', date: '14 hour ago', description: 'Google Chromecast: Enjoy a world of entertainment' },
        { image: require('../assets/images/user/user-03.jpg'), name: 'Barb Ackue', date: '16 hour ago', description: 'Dell Inspiron Laptop: Get speed and performance from' },
        { image: require('../assets/images/user/user-04.jpg'), name: 'Anna Sthesia', date: '21 hour ago', description: 'Deliver your favorite playlist anywhere in your home ' },
        { image: require('../assets/images/user/user-05.jpg'), name: 'Bob Frapples', date: '11 hour ago', description: 'MacBook Air features up to 8GB of memory, a fifth-generation' }
      ],
      year: new Date().getFullYear()
    }
  },
  methods: {
    sidebarMini () {
      socialvue.triggerSet()
    },
    logout () {
      localStorage.removeItem('user')
      localStorage.removeItem('auth')
      this.$router.push({ name: 'auth1.sign-in' })
    },
    langChange (lang) {
      this.langChangeState(lang)
      this.$i18n.locale = lang.value
      document.getElementsByClassName('iq-show')[0].classList.remove('iq-show')
    },
    ...mapActions({
      langChangeState: 'Setting/setLangAction',
      getAuthUser: 'Auth/AUTH_USER',
      logout: 'Auth/AUTH_LOGOUT'
    })
  }
}
</script>
<style>
  @import url("../assets/css/custom.css");
  @import url("../assets/css/PriceSlider.css");
</style>
