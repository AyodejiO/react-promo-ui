<template>
    <b-row>
      <b-col sm="12">
        <b-row class=" m-0 p-0" v-if="campaign">
          <b-col lg="12">
            <iq-card>
              <b-tabs pills card>
                <b-tab active>
                  <template #title>
                    <i class="far fa-play-circle fa-2x mr-1 align-bottom"></i> <strong>Campaign</strong>
                  </template>
                  <div class="p-2 py-4" v-if="campaign">
                    <music-player :tracks="tracks" :campaign="campaign"></music-player>
                  </div>
                </b-tab>
                <b-tab v-if="user && user.type == 'Label'">
                  <template #title>
                    <i class="fas fa-chart-pie fa-2x mr-1 align-bottom"></i> <strong>Analytics</strong>
                  </template>
                  <div class="p-2">
                    <analytics></analytics>
                  </div>
                </b-tab>
                <b-tab v-if="user && user.type != 'Label'">
                  <template #title>
                    <i class="fas fa-download fa-2x mr-1 align-bottom"></i> <strong>Download</strong>
                  </template>
                  <div class="p-2">
                    <download />
                  </div>
                </b-tab>
              </b-tabs>
            </iq-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
</template>
<script>
import { socialvue } from 'config/pluginInit'
// import Campaign from './Components/Campaign'
import Download from './Components/Download'
import IqCard from 'components/socialvue/cards/iq-card'
import { mapActions, mapGetters } from 'vuex'
import MusicPlayer from './Components/MusicPlayer'
import Analytics from './Components/Analytics/Index'

export default {
  name: 'SingleCampaign',
  // eslint-disable-next-line vue/no-unused-components
  components: { Analytics, IqCard, Download, MusicPlayer },
  mounted () {
    socialvue.index()
    this.getCampaign()
  },
  computed: {
    ...mapGetters({
      user: 'Auth/user',
      campaign: 'Campaigns/campaign',
      tracks: 'Tracks/tracks'
    })
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions({
      getSingleCampaign: 'Campaigns/SINGLE_CAMPAIGN'
    }),
    redirect () {
      this.$router.push({ name: 'campaigns.edit', params: { campaign: this.campaign.slug } })
    },
    getCampaign () {
      this.getSingleCampaign(this.$route.params.campaign)
        .then(() => {
          if (this.campaign && this.campaign.status !== 'active') {
            this.redirect()
          }
        })
    }
  }
}
</script>
