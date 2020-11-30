<template>
  <div>
    <ModifyCampaign v-if="campaign" :campaign="campaign" @published="redirect"></ModifyCampaign>
    <b-card v-if="campaign" class="p-0">
      <b-card-header class="w-100">
        <div class="row">
          <div class="col-6">
            <h4 class="card-title line-height-4">Tracks</h4>
          </div>
          <div class="col-6" v-if="playingTrackId">
            <b-button class="float-right" variant="link" @click.prevent="stopPlayback">
              <i class="far fa-stop-circle fa-2x"></i>
            </b-button>
          </div>
        </div>
      </b-card-header>
      <new-track class="my-2" :campaign="campaign"></new-track>
      <b-list-group flush>
        <edit-track v-for="track in tracks" :key="track.id" @playtrack="playTrack" :campaign="campaign" :track="track" :isPlaying="isPlaying(track.id)" />
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
// eslint-disable-next-line no-unused-vars
import { Howl, Howler } from 'howler'

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
    }),
    getTrackUrl () {
      return process.env.VUE_APP_API_BASE_URL + 'api/tracks/' + this.playingTrackId
    }
  },
  data () {
    return {
      playingTrackId: null,
      howler: null
    }
  },
  methods: {
    ...mapActions({
      getSingleCampaign: 'Campaigns/SINGLE_CAMPAIGN'
    }),
    isPlaying (trackId) {
      return this.playingTrackId === trackId
    },
    redirect () {
      this.$router.push({ name: 'campaigns.single', params: { campaign: this.campaign.slug } })
    },
    getCampaign () {
      this.getSingleCampaign(this.$route.params.campaign)
        .then(() => {
          if (this.campaign && this.campaign.status !== 'draft') {
            this.redirect()
          }
        })
    },
    playTrack (trackId) {
      this.playingTrackId = trackId
      // this.howler.src = process.env.VUE_APP_API_BASE_URL + 'api/tracks/' + trackId // this.getTrackUrl
      this.howler = new Howl({
        src: process.env.VUE_APP_API_BASE_URL + 'api/tracks/' + trackId,
        format: ['mp3', 'webm'],
        xhr: {
          method: 'GET',
          withCredentials: true
        },
        autoplay: true,
        onend: () => {
          this.playingTrackId = null
        }
      })

      // this.howler.play()
      // this.howler.play()
    },
    stopPlayback () {
      Howler.stop()
      this.playingTrackId = null
    }
  }
}
</script>
