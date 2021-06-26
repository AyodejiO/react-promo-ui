<template>
<b-container fluid>
    <div>
      <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">{{ title }}s</h4>
          </template>
          <template v-slot:headerAction>
            <b-button variant="primary" size="sm" v-b-modal.invite-modal>Invite User</b-button>
            <b-button variant="primary" size="sm" v-b-modal.request-modal class="ml-2">
              Requests
              <b-badge variant="light">9 <span class="sr-only">pending requests</span></b-badge>
            </b-button>
          </template>
          <div class="p-2">
            <ul class="nav nav-pills">
              <li class="nav-item" v-for="(nav, index) in navs" :key="index">
                <router-link :to="nav.link" :class="`nav-link ${activeLink(nav)? 'active' : ''}`">
                  <span>{{ nav.name }}</span>
                </router-link>
              </li>
            </ul>
          </div>
      </iq-card>
      <!-- <div class="iq-card mb-2 p-3">
        <div class="row">
          <div class="col">

          </div>
          <div class="col"><h3>{{ title }}s</h3></div>
        </div>
      </div> -->
      <div class="row">
        <div v-for="(user,index) in users" :key="index" class="col-md-4">
          <iq-card body-class="profile-page p-0">
            <template v-slot:body>
              <div class="profile-header-image">
                <div class="cover-container">
                  <!-- <img :src="user.backgroudimg" alt="profile-bg" class="rounded img-fluid w-100"> -->
                </div>
                <div class="profile-info px-4 py-3">
                  <div class="user-detail">
                    <div class="d-flex flex-wrap justify-content-between align-users-start">
                      <div class="profile-detail d-flex">
                        <div class="profile-img mt-0 pr-3">
                          <img :src="defaultImg" alt="profile-img" class="avatar-50 img-fluid" />
                        </div>
                        <div class="user-data-block">
                          <h4 class="">{{user.name}}</h4>
                          <h6>{{user.type}}</h6>
                          <p class="muted small">{{user.text}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="">
                    <b-button class="mr-1" size="sm" block variant="warning" :disabled="user.id === requestUser" v-if="user.in_circle" @click="unfriendUser(user.id)"><i class="ri-indeterminate-circle-line"></i> Remove from Circle</b-button>
                    <b-button class="mr-1" size="sm" block disabled variant="info" v-if="user.has_pending_request"><i class="ri-checkbox-blank-circle-line"></i> Request Pending</b-button>
                    <b-button class="mr-1" size="sm" block variant="primary" :disabled="user.id === requestUser" v-if="!user.in_circle && !user.has_pending_request" @click="befriendUser(user.id)"><i class="ri-add-circle-line"></i> Add to Circle</b-button>
                    <!-- <b-button class="mr-1" size="sm" v-if="!user.is_blocked">Block</b-button> -->
                  </div>
                </div>
              </div>
            </template>
          </iq-card>
        </div>
      </div>

      <b-modal id="invite-modal" centered scrollable ok-disabled modal-cancel="Close" size="lg" title="Invite New User">
        <template v-slot:modal-footer>
          <b-button @click="$bvModal.hide('invite-modal')">Close</b-button>
        </template>
        <invite-user></invite-user>
      </b-modal>

      <b-modal id="request-modal" centered scrollable ok-disabled modal-cancel="Close" size="lg" title="Circle Requests">
        <template v-slot:modal-footer>
          <b-button @click="$bvModal.hide('request-modal')">Close</b-button>
        </template>
        <circle-request></circle-request>
      </b-modal>
    </div>
</b-container>
</template>
<script>
import { socialvue } from '../../../config/pluginInit'
import InviteUser from './Components/InviteUser'
import CircleRequest from './Components/CircleRequest'
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'AllUsers',
  components: { CircleRequest, InviteUser },
  data () {
    return {
      defaultImg: require('assets/images/user.png'),
      navs: [
        {
          name: 'Users',
          link: {
            name: 'users.all',
            params: {
              type: undefined
            }
          }
        },
        {
          name: 'Labels',
          link: {
            name: 'users.all',
            params: {
              type: 'label'
            }
          }
        },
        {
          name: 'DJs',
          link: {
            name: 'users.all',
            params: {
              type: 'dj'
            }
          }
        },
        {
          name: 'Radios',
          link: {
            name: 'users.all',
            params: {
              type: 'radio'
            }
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      bookmark: 'Setting/bookmarkState',
      requestUser: 'Circle/user',
      users: 'Users/users'
    }),
    title: function () {
      return _.capitalize(this.$route.params.type || 'User')
    }
  },
  methods: {
    ...mapActions({
      getAllUser: 'Users/GET_USERS',
      addUserToCircle: 'Circle/ADD_USER_TO_CIRCLE',
      removeUserFromCircle: 'Circle/REMOVE_USER_FROM_CIRCLE'
    }),
    getUsers: function (type) {
      this.getAllUser(type)
    },
    befriendUser: function (user) {
      this.addUserToCircle(user)
    },
    unfriendUser: function (user) {
      this.removeUserFromCircle(user)
    },
    activeLink (nav) {
      return this.$route.params.type === nav.link.params.type
    }
  },
  mounted () {
    socialvue.index()
    let type = this.$route.params.type || null
    this.getUsers(type)
  },
  beforeRouteUpdate (to, from, next) {
    this.getUsers(to.params.type)
    next()
  }
}

</script>
