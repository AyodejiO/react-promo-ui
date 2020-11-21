<template>
  <div>
    <ModifyCampaign v-if="campaign" :campaign="campaign"></ModifyCampaign>
    <b-card v-if="campaign" class="p-0">
      <b-card-header class="w-100">
        <div class="row">
          <div class="col-6">
            <h4 class="card-title line-height-4">Tracks</h4>
          </div>
          <div class="col-6">
            <b-button class="float-right" variant="link">
              <i class="far fa-pause-circle fa-2x"></i>
            </b-button>
          </div>
        </div>
      </b-card-header>
      <new-track class="my-2" :campaign="campaign"></new-track>
      <b-list-group flush v-for="track in tracks" :key="track.id">
        <edit-track :campaign="campaign" :track="track" />
      </b-list-group>
    </b-card>
  </div>
</template>
<script>

import { socialvue } from '../../../config/pluginInit'
import Campaign from './Components/Campaign'
import NewTrack from './Components/NewTrack'
import EditTrack from './Components/EditTrack'
import ModifyCampaign from './Components/ModifyCampaign'
import IqCard from '../../../components/socialvue/cards/iq-card'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'EditCampaign',
  // eslint-disable-next-line vue/no-unused-components
  components: { IqCard, ModifyCampaign, Campaign, EditTrack, NewTrack },
  mounted () {
    socialvue.index()
    this.getCampaign()
  },
  computed: {
    ...mapGetters({
      campaign: 'Campaigns/campaign',
      tracks: 'Tracks/tracks'
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
