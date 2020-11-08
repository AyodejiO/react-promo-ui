import Vue from 'vue'
import VueRouter from 'vue-router'

/* Layouts */
const Layout = () => import('../layouts/Layout')
const Default = () => import('../layouts/BlankLayout')
const AuthLayout = () => import('../layouts/AuthLayouts/AuthLayout')

/* User routes */
const AllUsers = () => import('../views/PromoMain/Users/AllUsers')
const InviteUser = () => import('../views/PromoMain/Users/InviteUser')

/* all routes */
const SocialProfile = () => import('../views/PromoMain/Profile/Profile')
const ProfileImage = () => import('../views/PromoMain/Profile/ProfileImage')
const ProfileVideo = () => import('../views/PromoMain/Profile/ProfileVideo')
const ProfileEvent = () => import('../views/PromoMain/Profile/ProfileEvent')
const FriendList = () => import('../views/PromoMain/Friends/FriendList')
const File = () => import('../views/PromoMain/File/File')
const Group = () => import('../views/PromoMain/Group/Group')
const Birthday = () => import('../views/PromoMain/Bithdate/Bithdate')
const Music = () => import('../views/PromoMain/Music/Music')
const Notification = () => import('../views/PromoMain/Notifications/Notification')
const Weather = () => import('../views/PromoMain/Weather/Weather')
const FriendRequest = () => import('../views/PromoMain/Friends/FriendRequest')
/* UIElements View */
const UiAlerts = () => import('../views/core/UiAlerts.vue')
const UiButtons = () => import('../views/core/UiButtons.vue')
const UiBadges = () => import('../views/core/UiBadges.vue')
const UiBreadcrumb = () => import('../views/core/UiBreadcrumb.vue')
const UiColors = () => import('../views/core/UiColors.vue')
const UiTypography = () => import('../views/core/UiTypography.vue')
const UiCards = () => import('../views/core/UiCards.vue')
const UiCarousel = () => import('../views/core/UiCarousel.vue')
const UiEmbedVideo = () => import('../views/core/UiEmbedVideo.vue')
const UiGrid = () => import('../views/core/UiGrid.vue')
const UiModal = () => import('../views/core/UiModal.vue')
const UiListGroup = () => import('../views/core/UiListGroup.vue')
const UiImages = () => import('../views/core/UiImages.vue')
const UiMediaObject = () => import('../views/core/UiMediaObject.vue')
const UiTooltips = () => import('../views/core/UiTooltips.vue')
const UiPopovers = () => import('../views/core/UiPopovers.vue')
const UiNotifications = () => import('../views/core/UiNotifications.vue')
const UiTabs = () => import('../views/core/UiTabs.vue')
const UiPagination = () => import('../views/core/UiPagination.vue')
const UiProgressBars = () => import('../views/core/UiProgressBars.vue')
/* Authentic View */
const SignIn = () => import('../views/AuthPages/Default/SignIn')
const SignUp = () => import('../views/AuthPages/Default/SignUp')
const RecoverPassword1 = () => import('../views/AuthPages/Default/RecoverPassword1')
const LockScreen1 = () => import('../views/AuthPages/Default/LockScreen1')
const ConfirmMail1 = () => import('../views/AuthPages/Default/ConfirmMail1')
/* Extra Pages */
const ErrorPage = () => import('../views/Pages/ErrorPage')
const ComingSoon = () => import('../views/Pages/ComingSoon')
const Maintenance = () => import('../views/Pages/Maintenance')
const TimeLine = () => import('../views/Pages/TimeLines')
const Pricing = () => import('../views/Pages/Pricing')
const Pricing1 = () => import('../views/Pages/Pricing1')
const BlankPage = () => import('../views/Pages/BlankPage')
const FAQ = () => import('../views/Pages/FAQ')
const Invoice = () => import('../views/Pages/Invoice')
/* Apps Views */
const EmailListing = () => import('../views/Apps/Email/EmailListing')
const EmailCompose = () => import('../views/Apps/Email/EmailCompose')
const Calendar = () => import('../views/Apps/Calendar/Calendar')
/* Icon Views */
const IconDripicons = () => import('../views/Icons/IconDripicons')
const IconFontawesome5 = () => import('../views/Icons/IconFontawesome5')
const IconLineAwesome = () => import('../views/Icons/IconLineAwesome')
const IconRemixicon = () => import('../views/Icons/IconRemixicon')
const IconUnicons = () => import('../views/Icons/IconUnicons')
/* Tables Views */
const TablesBasic = () => import('../views/Tables/TablesBasic')
const EditableTable = () => import('../views/Tables/EditableTable')
/* Form View */
const FormLayout = () => import('../views/Forms/FormLayout')
const FormValidates = () => import('../views/Forms/FormValidates')
const FormSwitches = () => import('../views/Forms/FormSwitches')
const FormRadios = () => import('../views/Forms/FormRadios')
const FormCheckboxes = () => import('../views/Forms/FormCheckboxes')
/* User View */
const Profile = () => import('../views/User/Profile')
const ProfileEdit = () => import('../views/User/ProfileEdit')
const AddUser = () => import('../views/User/AddUser')
const AllCampaigns = () => import('../views/Apps/Campaigns/AllCampaigns')
const EditCampaign = () => import('../views/Apps/Campaigns/EditCampaign')
const SingleCampaign = () => import('../views/Apps/Campaigns/SingleCampaign')
/* Todo */
const TodoListing = () => import('../views/Apps/Todo/TodoListing')
const ChatIndex = () => import('../views/Apps/Chat/Index')
const AccountSettings = () => import('../views/User/AccountSetting')
Vue.use(VueRouter)
const childRoutes = (prop, mode) => [
  {
    path: '/',
    name: prop + '.list',
    meta: { auth: true, reset: true, name: 'Social App' },
    component: AllCampaigns
  },
  {
    path: '/profile',
    name: prop + '.profile',
    meta: { auth: true, reset: true, name: 'Profile' },
    component: SocialProfile
  },
  {
    path: 'friend-list',
    name: prop + '.friend-list',
    meta: { auth: true, reset: true, name: 'Friend List', img: require('../assets/images/page-img/profile-bg3.jpg') },
    component: FriendList
  },
  {
    path: 'group',
    name: prop + '.group',
    meta: { auth: true, reset: true, name: 'Group', img: require('../assets/images/page-img/profile-bg7.jpg') },
    component: Group
  },
  {
    path: 'profile-image',
    name: prop + '.profile-image',
    meta: { auth: true, reset: true, name: 'Your Photos', img: require('../assets/images/page-img/profile-bg5.jpg') },
    component: ProfileImage
  },
  {
    path: 'profile-video',
    name: prop + '.profile-video',
    meta: { auth: true, reset: true, name: 'Profile Video', img: require('../assets/images/page-img/profile-bg9.jpg') },
    component: ProfileVideo
  },
  {
    path: 'profile-event',
    name: prop + '.profile-event',
    meta: { auth: true, reset: true, name: 'Your Event', img: require('../assets/images/page-img/profile-bg6.jpg') },
    component: ProfileEvent
  },
  {
    path: 'notification',
    name: prop + '.notification',
    meta: { auth: true, reset: true, name: 'Notification' },
    component: Notification
  },
  {
    path: 'file',
    name: prop + '.file',
    meta: { auth: true, reset: true, name: 'File' },
    component: File
  },
  {
    path: 'friend-request',
    name: prop + '.friend-request',
    meta: { auth: true, reset: true, name: 'Friend Request' },
    component: FriendRequest
  },
  {
    path: 'birthday',
    name: prop + '.birthday',
    meta: { auth: true, reset: true, name: 'Birthday', img: require('../assets/images/page-img/profile-bg4.jpg') },
    component: Birthday
  },
  {
    path: 'weather',
    name: prop + '.weather',
    meta: { auth: true, reset: true, name: 'Weather', img: require('../assets/images/page-img/profile-bg2.jpg') },
    component: Weather
  },
  {
    path: 'music',
    name: prop + '.music',
    meta: { auth: true, reset: true, name: 'Music', img: require('../assets/images/page-img/profile-bg8.jpg') },
    component: Music
  },
  {
    path: '/account-setting',
    name: 'accountSetting',
    meta: { auth: true, reset: true, name: 'AccountSettings' },
    component: AccountSettings
  }
]

const coreChildRoute = (prop, mode) => [
  {
    path: 'ui-colors',
    name: prop + '.color',
    meta: { auth: true, reset: true, name: 'Colors' },
    component: UiColors
  },
  {
    path: 'ui-typography',
    name: prop + '.typography',
    meta: { auth: true, reset: true, name: 'Typography' },
    component: UiTypography
  },
  {
    path: 'ui-alerts',
    name: prop + '.alert',
    meta: { auth: true, reset: true, name: 'Alert' },
    component: UiAlerts
  },
  {
    path: 'ui-buttons',
    name: prop + '.button',
    meta: { auth: true, reset: true, name: 'Button' },
    component: UiButtons
  },
  {
    path: 'ui-breadcrumb',
    name: prop + '.breadcrumb',
    meta: { auth: true, reset: true, name: 'Breadcrumb' },
    component: UiBreadcrumb
  },
  {
    path: 'ui-badges',
    name: prop + '.badges',
    meta: { auth: true, reset: true, name: 'Badges' },
    component: UiBadges
  },
  {
    path: 'ui-cards',
    name: prop + '.cards',
    meta: { auth: true, reset: true, name: 'Card' },
    component: UiCards
  },
  {
    path: 'ui-carousel',
    name: prop + '.carousel',
    meta: { auth: true, reset: true, name: 'Carousel' },
    component: UiCarousel
  },
  {
    path: 'ui-grid',
    name: prop + '.grid',
    meta: { auth: true, reset: true, name: 'Grid' },
    component: UiGrid
  },
  {
    path: 'ui-embed-video',
    name: prop + '.embed-video',
    meta: { auth: true, reset: true, name: 'Embed Video' },
    component: UiEmbedVideo
  },
  {
    path: 'ui-modal',
    name: prop + '.modal',
    meta: { auth: true, reset: true, name: 'Model' },
    component: UiModal
  },
  {
    path: 'ui-listgroup',
    name: prop + '.listgroup',
    meta: { auth: true, reset: true, name: 'List Group' },
    component: UiListGroup
  },
  {
    path: 'ui-images',
    name: prop + '.images',
    meta: { auth: true, reset: true, name: 'Image' },
    component: UiImages
  },
  {
    path: 'ui-media-object',
    name: prop + '.media-object',
    meta: { auth: true, reset: true, name: 'Media Object' },
    component: UiMediaObject
  },
  {
    path: 'ui-pagination',
    name: prop + '.pagination',
    meta: { auth: true, reset: true, name: 'Paginations' },
    component: UiPagination
  },
  {
    path: 'ui-progressbars',
    name: prop + '.progressbars',
    meta: { auth: true, reset: true, name: 'Progressbar' },
    component: UiProgressBars
  },
  {
    path: 'ui-tooltips',
    name: prop + '.tooltips',
    meta: { auth: true, reset: true, name: 'Tooltip' },
    component: UiTooltips
  },
  {
    path: 'ui-popovers',
    name: prop + '.popovers',
    meta: { auth: true, reset: true, name: 'Popover' },
    component: UiPopovers
  },
  {
    path: 'ui-notifications',
    name: prop + '.notifications',
    meta: { auth: true, reset: true, name: 'Notification' },
    component: UiNotifications
  },
  {
    path: 'ui-tabs',
    name: prop + '.tabs',
    meta: { auth: true, reset: true, name: 'Tabs' },
    component: UiTabs
  }
]
const formChildRoute = (prop, mode = false) => [
  {
    path: 'form-layout',
    name: prop + '.layout',
    meta: { auth: true, reset: true, name: 'Layout' },
    component: FormLayout
  },
  {
    path: 'form-validate',
    name: prop + '.validate',
    meta: { auth: true, reset: true, name: 'Validate' },
    component: FormValidates
  },
  {
    path: 'form-switches',
    name: prop + '.switch',
    meta: { auth: true, reset: true, name: 'Switch' },
    component: FormSwitches
  },
  {
    path: 'form-radios',
    name: prop + '.radio',
    meta: { auth: true, reset: true, name: 'Radio' },
    component: FormRadios
  },
  {
    path: 'form-checkboxes',
    name: prop + '.checkbox',
    meta: { auth: true, reset: true, name: 'Checkbox' },
    component: FormCheckboxes
  }
]

const tableChildRoute = (prop, mode = false) => [
  {
    path: 'tables-basic',
    name: prop + '.basic',
    meta: { auth: true, reset: true, name: 'Basic' },
    component: TablesBasic
  },
  {
    path: 'editable',
    name: prop + '.editable',
    meta: { auth: true, reset: true, name: 'Editable' },
    component: EditableTable
  }
]

const iconChildRoute = (prop, mode = false) => [
  {
    path: 'dripicons',
    name: prop + '.dripicons',
    meta: { auth: true, reset: true, name: 'Dripicons' },
    component: IconDripicons
  },
  {
    path: 'fontawesome-5',
    name: prop + '.fontawesome-5',
    meta: { auth: true, reset: true, name: 'Font Awsome' },
    component: IconFontawesome5
  },
  {
    path: 'lineawesome',
    name: prop + '.lineawesome',
    meta: { auth: true, reset: true, name: 'Line Awsome' },
    component: IconLineAwesome
  },
  {
    path: 'remixicon',
    name: prop + '.remixicon',
    meta: { auth: true, reset: true, name: 'Remixicon' },
    component: IconRemixicon
  },
  {
    path: 'unicons',
    name: prop + '.unicons',
    meta: { auth: true, reset: true, name: 'Unicon' },
    component: IconUnicons
  }
]

const appChildRoute = (prop, mode = false) => [
  {
    path: 'calendar',
    name: prop + '.calendar',
    meta: { auth: true, reset: true, name: 'Calendar', img: require('../assets/images/page-img/profile-bg6.jpg') },
    component: Calendar
  },
  {
    path: 'chat',
    name: prop + '.chat',
    meta: { auth: true, reset: true, name: 'Chat' },
    component: ChatIndex
  },
  {
    path: 'todo',
    name: prop + '.todo',
    meta: { auth: true, reset: true, name: 'Todo' },
    component: TodoListing
  },
  {
    path: 'email',
    name: prop + '.email',
    meta: { auth: true, reset: true, name: 'Email' },
    component: EmailListing
  },
  {
    path: 'email-compose',
    name: prop + '.email.compose',
    meta: { auth: true, reset: true, name: 'New Email' },
    component: EmailCompose
  }
]

const authChildRoutes = (prop, mode = false) => [
  {
    path: 'sign-in',
    name: prop + '.sign-in',
    meta: { auth: false },
    component: SignIn
  },
  {
    path: 'sign-up',
    name: prop + '.sign-up',
    meta: { auth: false },
    component: SignUp
  },
  {
    path: 'password-reset1',
    name: prop + '.password-reset1',
    meta: { auth: false },
    component: RecoverPassword1
  },
  {
    path: 'lock-screen1',
    name: prop + '.lock-screen1',
    meta: { auth: false },
    component: LockScreen1
  },
  {
    path: 'confirm-mail1',
    name: prop + '.confirm-mail1',
    meta: { auth: true, reset: true },
    component: ConfirmMail1
  }
]
const defaultlayout = (prop, mode = false) => [
  {
    path: 'timeline',
    name: prop + '.timeline',
    meta: { auth: true, reset: true, name: 'Timeline' },
    component: TimeLine
  },
  {
    path: 'invoice',
    name: prop + '.invoice',
    meta: { auth: true, reset: true, name: 'Invoice' },
    component: Invoice
  },
  {
    path: 'blank-page',
    name: prop + '.blank-page',
    meta: { auth: true, reset: true, name: 'Blank Page' },
    component: BlankPage
  },
  {
    path: 'pricing',
    name: prop + '.pricing',
    meta: { auth: true, reset: true, name: 'Pricing' },
    component: Pricing
  },
  {
    path: 'pricing-1',
    name: prop + '.pricing1',
    meta: { auth: true, reset: true, name: 'Pricing 1' },
    component: Pricing1
  },
  {
    path: 'faq',
    name: prop + '.faq',
    meta: { auth: true, reset: true, name: 'Faq' },
    component: FAQ
  }
]
// const usersChildRoutes = (prop, mode = false) => [
//   {
//     path: ':type',
//     name: prop + '.all',
//     meta: { auth: true, reset: true, name: 'AllUsers' },
//     component: AllUsers
//   }
// ]
const pagesChildRoutes = (prop, mode = false) => [
  {
    path: 'error/:code',
    name: prop + '.error',
    meta: { auth: true, reset: true },
    component: ErrorPage
  },
  {
    path: 'coming-soon',
    name: prop + '.coming-soon',
    meta: { auth: true, reset: true },
    component: ComingSoon
  },
  {
    path: 'maintenance',
    name: prop + '.maintenance',
    meta: { auth: true, reset: true },
    component: Maintenance
  }
]
const userChildRoute = (prop, mode = false) => [
  {
    path: 'profile',
    name: prop + '.profile',
    meta: { auth: true, reset: true, name: 'Profile' },
    component: Profile
  },
  {
    path: 'profile-edit',
    name: prop + '.edit',
    meta: { auth: true, reset: false, name: 'Edit Profile' },
    component: ProfileEdit
  },
  {
    path: 'add-user',
    name: prop + '.add',
    meta: { auth: true, reset: true, name: 'Add Profile' },
    component: AddUser
  }
]
const usersChildRoute = (prop, mode = false) => [
  {
    path: 'invite',
    name: prop + '.invite',
    meta: { auth: true, reset: false, name: 'Edit Profile' },
    component: InviteUser
  },
  {
    path: ':type?',
    name: prop + '.all',
    meta: { auth: true, reset: true, name: 'Users' },
    component: AllUsers
  }
]
const campaignsChildRoute = (prop, mode = false) => [
  {
    path: 'edit/:campaign',
    name: prop + '.edit',
    meta: { auth: true, reset: false, name: 'Edit Profile' },
    component: EditCampaign
  },
  {
    path: ':campaign',
    name: prop + '.single',
    meta: { auth: true, reset: true, name: 'Users' },
    component: SingleCampaign
  }
]
const routes = [
  {
    path: '/',
    // name: 'promo',
    component: Layout,
    children: childRoutes('promo')
  },
  {
    path: '/campaigns',
    name: 'campaigns',
    component: Layout,
    children: campaignsChildRoute('campaigns')
  },
  // {
  //   path: '/users',
  //   name: 'users',
  //   component: Layout,
  //   meta: { auth: true, reset: true },
  //   children: usersChildRoutes('users')
  // },
  {
    path: '/core',
    name: 'core',
    component: Layout,
    meta: { auth: true, reset: true },
    children: coreChildRoute('core')
  },
  {
    path: '/table',
    name: 'table',
    component: Layout,
    meta: { auth: true, reset: true },
    children: tableChildRoute('table')
  },
  {
    path: '/icon',
    name: 'icon',
    component: Layout,
    meta: { auth: true, reset: true },
    children: iconChildRoute('icon')
  },
  {
    path: '/auth',
    name: 'auth1',
    component: AuthLayout,
    meta: { auth: true, reset: true },
    children: authChildRoutes('auth1')
  },
  {
    path: '/pages',
    name: 'pages',
    component: Default,
    meta: { auth: true, reset: true },
    children: pagesChildRoutes('default')
  },
  {
    path: '/extra-pages',
    name: 'extra-pages',
    component: Layout,
    meta: { auth: true, reset: true },
    children: defaultlayout('extra-pages')
  },
  {
    path: '/app',
    name: 'app',
    component: Layout,
    meta: { auth: true, reset: true },
    children: appChildRoute('app')
  },
  {
    path: '/user',
    name: 'user',
    component: Layout,
    meta: { auth: true, reset: true },
    children: userChildRoute('user')
  },
  {
    path: '/users',
    name: 'users',
    component: Layout,
    meta: { auth: true, reset: true },
    children: usersChildRoute('users')
  },
  {
    path: '/form',
    name: 'form',
    component: Layout,
    meta: { auth: true, reset: true },
    children: formChildRoute('form')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

function isLoggedIn () {
  return Boolean(localStorage.getItem('auth'))
}

function getCurrentUser () {
  return JSON.parse(localStorage.getItem('user')) || {}
}

router.beforeEach((to, from, next) => {
  const { auth, reset, authorize, roles } = to.meta
  let user = getCurrentUser()

  if (auth) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        name: 'auth1.sign-in',
        query: { redirect: to.fullPath }
      })
    }

    if (user.needs_reset && reset) {
      next({
        name: 'user.edit',
        query: { redirect: to.fullPath }
      })
    }

    if (authorize) {
      // eslint-disable-next-line eqeqeq
      if (!user || !roles.include(user.type) || roles !== '*') {
        next({
          name: 'auth1.sign-in',
          query: { redirect: to.fullPath }
        })
      }
    }
  }

  next() // make sure to always call next()!
})

export default router
