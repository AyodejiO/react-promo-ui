<template>
  <b-row class="p">
    <b-col sm="12" md="4" class="text-center">
      <img :src="campaign.artwork" width="200" height="200" class="align-middle" alt="Campaign Artwork">
    </b-col>
    <b-col>
      <b-row>
        <b-col sm="12" md="12">
          <b-list-group flush v-for="track in tracks" :key="track.id">
            <music-track
              @playtrack="playTrack"
              :campaign="campaign"
              :track="track"
              :isPlaying="isPlaying(track.id)"
              active="playingTrackId === track.id"
            >
            </music-track>
          </b-list-group>
        </b-col>
        <b-col sm="12" md="12">
            <div class="mt-2" id="waveform"></div>
            <div v-if="wavesurfer" class="media-controls text-center mt-3">
              <b-button-group size="lg">
                <b-button variant="primary" disabled>
                  {{ minutes }} : {{ seconds }}
                </b-button>
                <b-button variant="primary" @click="play"><i class="mr-0 fas fa-backward fa-1x"></i></b-button>
                <b-button variant="primary" @click="play">
                  <i v-if="!wavesurfer.isPlaying()" class="mr-0 far fa-play-circle fa-2x"></i>
                  <i v-if="wavesurfer.isPlaying()" class="mr-0 far fa-pause-circle fa-2x"></i>
                </b-button>
                <b-button variant="primary" @click="play"><i class="mr-0 fas fa-forward fa-1x"></i></b-button>
                <b-button variant="primary" @click="wavesurfer.toggleMute()">
                  <i v-if="!wavesurfer.getMute()" class="mr-0 fas fa-volume-up fa-1x"></i>
                  <i v-if="wavesurfer.getMute()" class="mr-0 fas fa-volume-mute fa-1x"></i>
                </b-button>
              </b-button-group>
            </div>
          <!-- <vue-wave-surfer :src="file" :options="options"></vue-wave-surfer> -->
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
// import Campaign from '../../../../Model/Campaign'
import { mapActions } from 'vuex'
import MusicTrack from './MusicTrack'
import WaveSurfer from 'wavesurfer.js'
import VueWaveSurfer from 'vue-wave-surfer'
// eslint-disable-next-line no-unused-vars
import { Howl, Howler } from 'howler'

export default {
  name: 'MusicPlayer',
  // eslint-disable-next-line vue/no-unused-components
  components: { MusicTrack, VueWaveSurfer },
  props: [ 'campaign', 'tracks' ],
  data () {
    return {
      // campaign: new Campaign(),
      init: true,
      playingTrackId: null,
      playingTrackDuration: 0,
      options: {},
      errors: [],
      message: null,
      timer: null,
      trackTime: '0:00',
      wavesurfer: null
    }
  },
  computed: {
    minutes () {
      const minutes = Math.floor(this.playingTrackDuration / 60)
      return this.padTime(minutes)
    },
    seconds () {
      const seconds = this.playingTrackDuration - (this.minutes * 60)
      return this.padTime(seconds)
    }
  },
  mounted () {
    if (this.tracks.length > 0) {
      this.playingTrackId = this.tracks[0].id
      this.$nextTick(function () {
        this.wavesurfer = WaveSurfer.create({
          container: '#waveform',
          waveColor: '#866df5',
          progressColor: 'blue',
          fillParent: true,
          responsive: true,
          xhr: {
            method: 'GET',
            cache: 'default',
            mode: 'cors',
            credentials: 'include'
          }
        })
        this.wavesurfer.load(process.env.VUE_APP_API_BASE_URL + 'api/tracks/' + this.tracks[0].id)
        this.wavesurfer.on('finish', () => {
          this.playingTrackId = null
          this.stopTimer()
        })
        this.wavesurfer.on('audioprocess', () => {
          if (this.wavesurfer.isPlaying()) {
            this.trackTime = this.wavesurfer.getDuration() - this.wavesurfer.getCurrentTime()
          }
        })
        this.wavesurfer.on('pause', () => {
          this.stopTimer()
          this.playingTrackDuration = Math.round(this.wavesurfer.getDuration() - this.wavesurfer.getCurrentTime())
        })
        this.wavesurfer.on('play', () => {
          this.startTimer()
        })
        this.wavesurfer.on('ready', () => {
          this.playingTrackDuration = Math.round(this.wavesurfer.getDuration() - this.wavesurfer.getCurrentTime())
          if (!this.init) this.wavesurfer.play()
          this.init = false
        })
      })
    }
  },
  methods: {
    ...mapActions({
      postCampaign: 'Tracks/UPLOAD_TRACK'
    }),
    isPlaying (trackId) {
      if (!this.wavesurfer) return false
      return this.playingTrackId === trackId && this.wavesurfer.isPlaying()
    },
    play (e) {
      e.preventDefault()
      this.wavesurfer.playPause()
    },
    backward (e) {
      e.preventDefault()
      this.wavesurfer.playPause()
    },
    forward (e) {
      e.preventDefault()
      this.wavesurfer.playPause()
    },
    async playTrack (trackId) {
      this.playingTrackId = trackId
      await this.wavesurfer.load(process.env.VUE_APP_API_BASE_URL + 'api/tracks/' + trackId)
    },
    async loadNextTrack (trackId) {
      this.playingTrackId = trackId
      await this.wavesurfer.load(process.env.VUE_APP_API_BASE_URL + 'api/tracks/' + trackId)
    },
    countdown () {
      this.playingTrackDuration--
    },
    padTime (time) {
      return (time < 10 ? '0' : '') + time
    },
    startTimer () {
      this.timer = setInterval(() => this.countdown(), 1000)
    },
    stopTimer () {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>
