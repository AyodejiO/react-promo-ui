<template>
    <div>
      <iq-card class="bg-none">
          <b-collapse id="invite-form" class="mb-2" visible="visible">
            <p v-if="message" class="text-danger p-2 p-md-4 mb-0">{{ message }}</p>
            <b-form class="p-2 p-md-4" @submit.prevent="invite">
              <b-row>
                <b-col>
                  <b-form-group
                    id="name-fieldset"
                    label="Name"
                    label-for="name"
                  >
                    <b-form-input id="name" v-model="user.name" trim required></b-form-input>
                    <span class="text-danger" v-if="errors.name">
                      {{ errors.name[0] }}
                    </span>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    id="email-fieldset"
                    label="Email"
                    label-for="email"
                  >
                    <b-form-input id="email" v-model="user.email" trim required></b-form-input>
                    <span class="text-danger" v-if="errors.email">
                      {{ errors.email[0] }}
                    </span>
                  </b-form-group>
                </b-col>
                <div class="w-100"></div>
                <b-col>
                  <b-form-group
                    id="type-fieldset"
                    label="Type"
                    label-for="type"
                  >
                    <b-form-select
                      plain id="type"
                      value-field="id"
                      text-field="name"
                      v-model="user.type"
                      :options="types"
                      class="form-select"
                      required
                    >
                    </b-form-select>
                    <span class="text-danger" v-if="errors.type">
                      {{ errors.type[0] }}
                    </span>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    id="stage_name-fieldset"
                    label="Stage Name"
                    label-for="stage_name"
                    description="This is only needed for DJs"
                  >
                    <b-form-input id="stage_name" v-model="user.stage_name" trim></b-form-input>
                    <span class="text-danger" v-if="errors.stage_name">
                      {{ errors.stage_name[0] }}
                    </span>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-button type="submit" variant="primary">Invite</b-button>
            </b-form>
          </b-collapse>
      </iq-card>
      <!-- <div class="iq-card mb-2 p-3">
        <div class="row">
          <div class="col">

          </div>
          <div class="col"><h3>{{ title }}s</h3></div>
        </div>
      </div> -->
      <iq-card>
        <template v-slot:headerTitle>
            <h4 class="card-title">Invited Users</h4>
        </template>
      </iq-card>
      <div class="row">
        <div v-for="(item,index) in invitees" :key="index" class="col-md-6">
          <iq-card body-class="profile-page p-0">
            <template v-slot:body>
              <div class="profile-header-image">
                <div class="cover-container">
                  <!-- <img :src="item.backgroudimg" alt="profile-bg" class="rounded img-fluid w-100"> -->
                </div>
                <div class="profile-info px-4 py-4">
                  <div class="user-detail">
                    <div class="d-flex flex-wrap justify-content-between align-items-start">
                      <div class="profile-detail d-flex">
                        <div class="user-data-block">
                          <h4 class="">{{item.invitee.name}}</h4>
                          <h6><a :href="`mailto:${item.invitee.email}`" class="text-primary">{{ item.invitee.email }}</a></h6>
                          <h6>{{item.invitee.type}}</h6>
                          <p>{{item.text}}</p>
                        </div>
                        <p class="float-right"><b-badge>{{item.invitee.last_active? 'Active' : 'Inactive'}}</b-badge></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </iq-card>
        </div>
      </div>
    </div>
</template>
<script>
import { socialvue } from 'config/pluginInit'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'InviteUser',
  data () {
    return {
      // title: _.capitalize(this.$route.params.type || 'All User'),
      user: {
        type: null
      },
      visible: true,
      errors: [],
      types: [
        { id: null, name: 'Please select an option' }
      ],
      message: null
    }
  },
  computed: {
    ...mapGetters({
      // bookmark: 'Setting/bookmarkState',
      invitees: 'Invites/invitees'
    })
  },
  methods: {
    ...mapActions({
      getInvitedUsers: 'Invites/GET_INVITED_USERS',
      inviteUser: 'Invites/INVITE_USER',
      getUserTypes: 'Users/USER_TYPES'
    }),
    invite: function () {
      this.inviteUser(this.user)
        .then(() => {
          this.user = {
            type: null
          }
          this.$bvToast.toast(`Invitation sent successfully`, {
            title: 'Success',
            variant: 'success',
            autoHideDelay: 5000,
            appendToast: true
          })
        })
        .catch(error => {
          this.errors = error.response.data.errors
          this.message = error.response.data.message
        })
    }
  },
  mounted () {
    socialvue.index()
    this.getInvitedUsers()
    this.getUserTypes()
      .then(response => {
        this.types = this.types.concat(response.data)
      })
      .catch(error => {
        this.errors = error.response.data.errors
        this.message = error.response.data.message
      })
  }
}

</script>
