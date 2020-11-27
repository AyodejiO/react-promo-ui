<template>
  <b-form class="p-4 my-3"  ref="newTrackForm" @submit.prevent="uploadNewFeedback">
    <b-alert v-if="message" show variant="danger"><a href="#" class="alert-link">{{ message }}</a></b-alert>
    <h4 class="my-2">Feedback</h4>
    <!-- <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone> -->
    <b-form-group label="Campaign Rating">
      <b-form-rating v-model="feedback.rating" variant="primary"></b-form-rating>
      <span class="text-danger" v-if="errors.rating">
        {{ errors.rating[0] }}
      </span>
    </b-form-group>
    <b-form-group label="Favourite Track">
      <b-form-select v-model="feedback.track_id" :options="tracks" value-field="id" text-field="title"></b-form-select>
      <span class="text-danger" v-if="errors.track_id">
        {{ errors.track_id[0] }}
      </span>
    </b-form-group>
    <b-form-group>
      <b-form-textarea id="remark" v-model="feedback.remark" rows="3" max-rows="4" placeholder="Final remark..." required trim></b-form-textarea>
      <span class="text-danger" v-if="errors.remark">
        {{ errors.remark[0] }}
      </span>
    </b-form-group>
    <div class="mt-3">
      <b-button type="submit" size="sm" class="mr-2" variant="primary">Submit</b-button>
      <b-button type="reset" size="sm" class="mr-2" variant="danger" @click="onReset">Reset</b-button>
    </div>
  </b-form>
</template>
<script>
import Feedback from '../../../../Model/Feedback'
import { mapActions } from 'vuex'
export default {
  name: 'NewFeedback',
  props: ['tracks'],
  data () {
    return {
      feedback: new Feedback(),
      errors: [],
      message: null
    }
  },
  methods: {
    ...mapActions({
      postFeedback: 'Tracks/UPLOAD_TRACK'
    }),
    uploadNewFeedback () {
      this.postFeedback({ feedback: this.feedback, campaign: this.campaign.slug })
        .then(() => {
          this.onReset()
          this.$bvToast.toast(`Feedback added successfully.`, {
            title: 'Success',
            variant: 'success',
            autoHideDelay: 5000,
            appendToast: true
          })
        })
        .catch(error => {
          this.errors = error.response.data.errors
          this.message = error.response.data.message
        })
    },
    onReset: function () {
      this.feedback = new Feedback()
      this.$refs.newTrackForm.reset()
    }
  }
}
</script>
