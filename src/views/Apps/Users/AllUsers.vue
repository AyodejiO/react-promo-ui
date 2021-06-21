<template>
<b-container fluid>
    <div>
      <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">{{ title }}s</h4>
          </template>
          <template v-slot:headerAction>
            <b-button variant="primary" size="sm" v-b-modal.invite-modal>Invite User</b-button>
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
        <div v-for="(item,index) in users" :key="index" class="col-md-4">
          <iq-card body-class="profile-page p-0">
            <template v-slot:body>
              <div class="profile-header-image">
                <div class="cover-container">
                  <!-- <img :src="item.backgroudimg" alt="profile-bg" class="rounded img-fluid w-100"> -->
                </div>
                <div class="profile-info p-4">
                  <div class="user-detail">
                    <div class="d-flex flex-wrap justify-content-between align-items-start">
                      <div class="profile-detail d-flex">
                        <div class="profile-img pr-4">
                          <!-- <img :src="item.userimg" alt="profile-img" class="avatar-130 img-fluid" /> -->
                        </div>
                        <div class="user-data-block">
                          <h4 class="">{{item.name}}</h4>
                          <h6>{{item.type}}</h6>
                          <p>{{item.text}}</p>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary">Following</button>
                    </div>
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
    </div>
</b-container>
</template>
<script>
import { socialvue } from '../../../config/pluginInit'
import InviteUser from './Components/InviteUser'
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'AllUsers',
  components: { InviteUser },
  data () {
    return {
      // title: _.capitalize(this.$route.params.type || 'All User'),
      navs: [
        {
          name: 'All Users',
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
      users: 'Users/users'
    }),
    title: function () {
      return _.capitalize(this.$route.params.type || 'All User')
    }
  },
  methods: {
    ...mapActions({
      getAllUser: 'Users/GET_USERS'
    }),
    getUsers: function (type) {
      this.getAllUser(type)
      // .then(() => {
      // })
      // .catch(error => {
      //   this.errors = error.response.data.errors
      //   this.message = error.response.data.message
      // })
    },
    activeLink (nav) {
      return this.$route.params.type === nav.link.params.type
    }
  },
  mounted () {
    socialvue.index()
    let type = this.$route.params.type || null
    this.getUsers(type)
    // .then(response => {
    //   // this.types = response.data
    // })
    // .catch(error => {
    //   this.errors = error.response.data.errors
    // })
  },
  beforeRouteUpdate (to, from, next) {
    this.getUsers(to.params.type)
    next()
  }
}

</script>
