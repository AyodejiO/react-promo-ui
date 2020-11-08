<template>
  <div>
    <ModifyCampaign v-if="campaign" :campaign="campaign"></ModifyCampaign>
    <iq-card v-if="campaign">
      <template v-slot:headerTitle >
        <h4 class="card-title">Tracks</h4>
      </template>
      <upload-tracks :campaign="campaign"></upload-tracks>
      <div v-for="track in campaign.tracks" :key="track.id">
        <track :campaign="campaign" :track="track" />
      </div>
    </iq-card>
  </div>
</template>
<script>
import { socialvue } from '../../../config/pluginInit'
import Campaign from './Components/Campaign'
import UploadTracks from './Components/UploadTracks'
import Track from './Components/Track'
import ModifyCampaign from './Components/ModifyCampaign'
import IqCard from '../../../components/socialvue/cards/iq-card'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'EditCampaign',
  // eslint-disable-next-line vue/no-unused-components
  components: { IqCard, ModifyCampaign, Campaign, Track, UploadTracks },
  mounted () {
    socialvue.index()
    this.getCampaign()
  },
  computed: {
    ...mapGetters({
      campaign: 'Campaigns/campaign'
    })
  },
  data () {
    return {
      twitterFeed: [
        {
          image: require('../../../assets/images/page-img/42.jpg'),
          name: 'UI/Ux Designer',
          description: 'Creativity Design'
        },
        {
          image: require('../../../assets/images/page-img/43.jpg'),
          name: 'Marketing',
          description: 'Accounting'
        },
        {
          image: require('../../../assets/images/page-img/44.jpg'),
          name: 'Web Developer',
          description: 'uniq Concept'
        },
        {
          image: require('../../../assets/images/page-img/45.jpg'),
          name: 'Latest News',
          description: 'Line information'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      getSingleCampaign: 'Campaigns/SINGLE_CAMPAIGN'
    }),
    getCampaign () {
      this.getSingleCampaign(this.$route.params.campaign)
    }
  }
}
</script>
