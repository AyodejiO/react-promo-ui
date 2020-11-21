<template>
  <b-form class="border rounded p-4 my-3"  ref="newTrackForm" @submit.prevent="uploadNewTrack">
    <b-alert v-if="message" show variant="danger"><a href="#" class="alert-link">{{ message }}</a></b-alert>
    <h4 class="my-2">Upload New Track</h4>
    <!-- <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone> -->
    <b-form-group>
      <b-form-input id="title" v-model="track.title" placeholder="Enter Track title..." required trim></b-form-input>
      <span class="text-danger" v-if="errors.title">
        {{ errors.title[0] }}
      </span>
    </b-form-group>
    <div class="row">
      <div class="col">
        <b-form-group description="This is required for online play">
          <b-form-file
            v-model="track.mp3"
            required
            accept="audio/mpeg,audio/mpeg3,audio/x-mpeg-3"
            :state="Boolean(track.mp3)"
            placeholder="Upload track MP3..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
          <span class="text-danger" v-if="errors.mp3">
            {{ errors.mp3[0] }}
          </span>
        </b-form-group>
      </div>
      <div class="col">
        <b-form-group description="This is required for downloads">
          <b-form-file
            v-model="track.wav"
            required
            accept="audio/wav,audio/x-wav"
            :state="Boolean(track.wav)"
            placeholder="Upload track WAV..."
            drop-placeholder="Drop file here..."
            description="Let us know your name."
          ></b-form-file>
          <span class="text-danger" v-if="errors.wav">
            {{ errors.wav[0] }}
          </span>
        </b-form-group>
      </div>
    </div>
    <div class="mt-3">
      <b-button type="submit" size="sm" class="mr-2" variant="primary">Submit</b-button>
      <b-button type="reset" size="sm" class="mr-2" variant="danger" @click="onReset">Reset</b-button>
    </div>
  </b-form>
</template>
<script>
import Track from '../../../../Model/Track'
import { mapActions } from 'vuex'
export default {
  name: 'NewTrack',
  props: ['campaign'],
  data () {
    return {
      track: new Track(),
      formData: new FormData(),
      errors: [],
      message: null
    }
  },
  methods: {
    ...mapActions({
      uploadTrack: 'Tracks/UPLOAD_TRACK'
    }),
    uploadNewTrack () {
      this.formData = new FormData()
      this.formData.append('title', this.track.title)
      this.formData.append('mp3', this.track.mp3)
      this.formData.append('wav', this.track.wav)

      this.uploadTrack({ track: this.formData, campaign: this.campaign.slug })
        .then(() => {
          this.onReset()
        })
        .catch(error => {
          this.errors = error.response.data.errors
          this.message = error.response.data.message
        })
    },
    onReset: function () {
      this.track = new Track()
      this.$refs.newTrackForm.reset()
    },
    onFileChange: function (e) {
      const file = e.target.files[0]
      this.url = URL.createObjectURL(file)
      this.formData.append('artwork', file)
    },
    previewImage: function (event) {
      const files = event.target.files
      Object.keys(files).forEach(i => {
        const file = files[i]
        const reader = new FileReader()
        reader.onload = (e) => {
          this.campaign.images.push(e.target.result)
        }
        reader.readAsDataURL(file)
      })
    }
  }
}
</script>
