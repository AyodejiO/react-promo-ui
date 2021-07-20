<template>
  <div>
    <div v-if="campaign">
      <b-alert v-if="campaign.feedback === null" show dismissible variant="primary">
        You need to leave a feedback to download these tracks
      </b-alert>
      <div v-if="campaign.feedback !== null" class="p-2 px-4 bg-info">
        <h4 class="my-2">
          Download Tracks
          <b-button variant="primary" size="sm" class="float-right px-5 ml-2" @click="download('mp3')">MP3s</b-button>
          <b-button variant="primary" size="sm" class="float-right px-5 ml-2" @click="download('wav')">WAVs</b-button>
        </h4>
      </div>
      <new-feedback :campaign="campaign" :disabled="campaign.feedback !== null" :tracks="tracks" />
    </div>
    <div v-else>
    </div>
  </div>
</template>
<script>
import NewFeedback from './NewFeedback'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Download',
  components: { NewFeedback },
  data () {
    return {
      errors: [],
      loading: false,
      message: null
    }
  },
  computed: {
    ...mapGetters({
      campaign: 'Campaigns/campaign',
      tracks: 'Tracks/tracks'
    })
  },
  methods: {
    ...mapActions({
      downloadTracks: 'Campaigns/DOWNLOAD_TRACKS'
    }),
    download (ext) {
      this.errors = []
      this.message = null
      this.loading = true
      this.downloadTracks({ campaign: this.campaign.slug, ext: ext })
        .then(() => {
          this.loading = false
          // this.$bvToast.toast(`Feedback saved successfully.`, {
          //   title: 'Success',
          //   variant: 'success',
          //   autoHideDelay: 5000,
          //   appendToast: true
          // })
        })
        .catch(error => {
          this.loading = false
          this.errors = error.response.data.errors
          this.message = error.response.data.message
        })
    },
    onReset: function () {
      this.$refs.newTrackForm.reset()
    }
  }
}
</script>
