<template>
  <b-row class="p">
    <b-col sm="12" md="4" class="text-center">
      <img :src="campaign.artwork" class="align-middle" alt="Campaign Artwork">
    </b-col>
    <b-col>
      <b-list-group flush v-for="track in tracks" :key="track.id">
        <music-track @playtrack="playTrack" :campaign="campaign" :track="track" :isPlaying="isPlaying(track.id)"></music-track>
      </b-list-group>
    </b-col>
    <b-col md="12" sm="12" lg="12">
      <div class="mt-2" id="waveform"></div>
    </b-col>
  </b-row>
</template>
<script>
// import Campaign from '../../../../Model/Campaign'
import { mapActions } from 'vuex'
import MusicTrack from './MusicTrack'
import WaveSurfer from 'wavesurfer'
// eslint-disable-next-line no-unused-vars
import { Howl, Howler } from 'howler'

export default {
  name: 'MusicPlayer',
  components: { MusicTrack },
  props: [ 'campaign', 'tracks' ],
  data () {
    return {
      // campaign: new Campaign(),
      errors: [],
      message: null,
      wavesurfer: null
    }
  },
  mounted () {
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple',
      mediaControls: true,
      responsive: true,
      xhr: {
        method: 'GET',
        credentials: 'same-origin',
        withCredentials: true
      }
    })
  },
  methods: {
    ...mapActions({
      postCampaign: 'Tracks/UPLOAD_TRACK'
    }),
    isPlaying (trackId) {
      return this.playingTrackId === trackId
    },
    playTrack (trackId) {
      this.playingTrackId = trackId
      // this.howler.src = process.env.VUE_APP_API_BASE_URL + 'api/tracks/' + trackId // this.getTrackUrl
      this.wavesurfer.load(process.env.VUE_APP_API_BASE_URL + 'api/tracks/' + trackId)
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
    }
  }
}
</script>
