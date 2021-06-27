<template>
 <b-row>
     <b-col sm="12">
       <b-alert variant="primary" :show="!loading && requests.length === 0">No pending requests</b-alert>
        <iq-card v-if="loading && requests.length === 0">
          <template v-slot:body>
            <ul class="request-list list-inline m-0 p-0">
                <li class="d-flex align-items-center p-2">
                    <div class="media-support-info ml-3 mr-3">
                        <b-skeleton></b-skeleton>
                        <b-skeleton></b-skeleton>
                        <b-skeleton></b-skeleton>
                    </div>
                    <div class="d-flex align-items-center">
                      <b-skeleton class="mr-3" type="button"></b-skeleton>
                      <b-skeleton class="mr-3" type="button"></b-skeleton>
                    </div>
                </li>
                <li class="d-flex align-items-center p-2">
                    <div class="media-support-info ml-3 mr-3">
                        <b-skeleton></b-skeleton>
                        <b-skeleton></b-skeleton>
                        <b-skeleton></b-skeleton>
                    </div>
                    <div class="d-flex align-items-center">
                      <b-skeleton class="mr-3" type="button"></b-skeleton>
                      <b-skeleton class="mr-3" type="button"></b-skeleton>
                    </div>
                </li>
            </ul>
          </template>
        </iq-card>
        <iq-card v-if="!loading && requests.length > 0">
          <template v-slot:body>
            <ul class="request-list list-inline m-0 p-0">
                <li class="d-flex align-items-center" v-for="(request, index1) in requests" :key="index1">
                    <div class="media-support-info ml-3">
                        <h6>{{request.name}}</h6>
                        <p class="mb-0">{{request.type}}</p>
                        <small>requested <i>{{request.request_date}}</i></small>
                    </div>
                    <div class="d-flex align-items-center">
                      <b-button class="mr-3" size="sm" rounded :disabled="loading && requestUser == request.id" variant="primary" @click="acceptRequest(request.id)">Accept</b-button>
                      <b-button class="mr-3" size="sm" rounded :disabled="loading && requestUser == request.id" variant="warning" @click="declineRequest(request.id)">Decline</b-button>
                    </div>
                </li>
                <!-- <li v-if = "(item.title == 'Friend Request')" class="d-block text-center">
                    <a href="#" class="mr-3 btn">View More Request</a>
                </li> -->
            </ul>
          </template>
        </iq-card>
     </b-col>
 </b-row>
</template>
<script>
import { socialvue } from 'config/pluginInit'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CircleRequest',
  mounted () {
    socialvue.index()
    this.getCircleRequests()
  },
  computed: {
    ...mapGetters({
      loading: 'Circle/loading',
      message: 'Circle/message',
      requestUser: 'Circle/user',
      requests: 'Circle/requests'
    })
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions({
      getRequests: 'Circle/GET_REQUESTS',
      acceptUserRequest: 'Circle/ACCEPT_USER_REQUEST',
      declineUserRequest: 'Circle/DECLINE_USER_REQUEST'
    }),
    getCircleRequests: function (type) {
      this.getRequests(type)
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
    }
  }
}
</script>
