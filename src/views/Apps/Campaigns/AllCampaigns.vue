<template>
    <b-row>
      <b-col sm="12">
        <b-row class=" m-0 p-0">
          <b-col lg="12">
            <tab-content id="pills-tabContent-2">
              <tab-content-item :active="true" id="profile-feed" aria-labelled-by="pills-feed-tab">
                <NewCampaign @addCampaign="addCampaign"></NewCampaign>
                <div v-for="campaign in campaigns" :key="campaign.id">
                  <campaign :campaign="campaign"></campaign>
                </div>
                <b-skeleton-wrapper :loading="loading">
                  <template #loading>
                    <b-card>
                      <b-row class="p-4">
                        <b-col md="3" class="text-center">
                          <b-skeleton-img class="mb-3" aspect="16:9"></b-skeleton-img>
                          <b-skeleton width="100%" class="mt-2"></b-skeleton>
                        </b-col>
                        <b-col>
                          <b-skeleton width="100%"></b-skeleton>
                          <b-skeleton width="100%"></b-skeleton>
                          <b-skeleton width="80%"></b-skeleton>
                          <b-skeleton width="80%"></b-skeleton>
                          <b-skeleton width="70%"></b-skeleton>
                          <b-skeleton width="55%"></b-skeleton>
                        </b-col>
                      </b-row>
                    </b-card>
                  </template>
                </b-skeleton-wrapper>
                <infinite-loading @infinite="infiniteHandler" spinner="wave-dots"></infinite-loading>
              </tab-content-item>
            </tab-content>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
</template>
<script>
import { socialvue } from '../../../config/pluginInit'
import Campaign from './Components/Campaign'
import NewCampaign from './Components/NewCampaign'
import InfiniteLoading from 'vue-infinite-loading'
// import IqCard from '../../../components/socialvue/cards/iq-card'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AllCampaigns',
  components: { InfiniteLoading, NewCampaign, Campaign },
  mounted () {
    socialvue.index()
    this.getCampaigns()
    // this.scroll()
  },
  computed: {
    ...mapGetters({
      campaigns: 'Campaigns/campaigns',
      loading: 'Campaigns/loading'
    })
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions({
      getCampaigns: 'Campaigns/GET_CAMPAIGNS'
    }),
    addCampaign (post) {
      this.socialPosts.unshift(post)
    },
    scroll () {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
        if (bottomOfWindow) {
          this.getCampaigns()
        }
      }
    },
    infiniteHandler ($state) {
      this.getCampaigns()
    }
  }
}
</script>
