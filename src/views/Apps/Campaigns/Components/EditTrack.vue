<template>
  <b-list-group-item class="flex-column align-items-start">
    <b-media>
        <template #aside>
          <b-button variant="link" v-if="!isPlaying" @click.prevent="playTrack(track.id)">
            <i class="far fa-play-circle fa-4x"></i>
          </b-button>
          <i  v-if="isPlaying" class="fas fa-compact-disc fa-4x text-success mr-2 fa-spin"></i>
        </template>
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ track.title }}</h5>
          <small>
            <b-button variant="danger" size="sm" @click.prevent="deleteTrack"><i class="far fa-trash-alt" aria-hidden="true"></i> Delete</b-button>
          </small>
        </div>

        <p class="mb-1">
          <b-badge variant="info" class="mr-2">MP3</b-badge>
          <b-badge variant="info" class="mr-2">WAV</b-badge>
        </p>
    </b-media>
  </b-list-group-item>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'EditTrack',
  props: [
    'track',
    'isPlaying'
  ],
  data () {
    return {
      commentMessage: ''
    }
  },
  methods: {
    ...mapActions({
      forceDeleteTrack: 'Tracks/DELETE_TRACK'
    }),
    deleteTrack () {
      this.forceDeleteTrack(this.track.id)
        .then(() => {
          this.$bvToast.toast(`Track deleted successfully.`, {
            title: 'Success',
            variant: 'success',
            autoHideDelay: 5000,
            appendToast: true
          })
        })
    }
  }
}
</script>

<style>
  .dropdown-item{
    color: #212529 !important;
  }
  .dropdown-menu .dropdown-item:focus, .dropdown-menu .dropdown-item:hover{
    background: transparent;
    color: var(--iq-primary) !important;
  }
</style>
