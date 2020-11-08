<template>
  <div >
    <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
  </div>
</template>
<script>
import Campaign from '../../../../Model/Campaign'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { mapActions, mapGetters } from 'vuex'
import apiClient from '../../../../Utils/api'
export default {
  name: 'UploadTracks',
  components: { vueDropzone: vue2Dropzone },
  props: ['campaign'],
  data () {
    return {
      errors: [],
      message: null
    }
  },
  computed: {
    ...mapGetters({
      tags: 'Tags/tags'
    }),
    dropzoneOptions () {
      return {
        // url: 'https://httpbin.org/post',
        url: apiClient.defaults.baseURL + 'api/campaigns/' + this.campaign.slug + '/tracks',
        paramName: 'tracks',
        thumbnailWidth: 150,
        withCredentials: true,
        uploadMultiple: false,
        maxFilesize: 3.0,
        acceptedFiles: 'audio/mpeg',
        headers: { 'My-Awesome-Header': 'header value' }
      }
    }
  },
  methods: {
    ...mapActions({
      getTags: 'Tags/GET_TAGS',
      createCampaign: 'Campaigns/NEW_CAMPAIGN'
    }),
    tagValidator (tag) {
      return tag.length >= 1
    },
    addNewCampaign () {
      // for (var key in this.campaign) {
      //   this.formData.append(key, this.campaign[key])
      // }
      this.formData.append('title', this.campaign['title'])
      this.formData.append('content', this.campaign['content'])
      this.formData.append('visibility', this.campaign['visibility'])
      this.formData.append('tags', this.campaign['tags'])
      this.createCampaign(this.formData)
        .then(() => {
          this.campaign = new Campaign()
          this.$refs.newCampaignForm.reset()
          this.url = null
        })
        .catch(error => {
          this.errors = error.response.data.errors
          this.message = error.response.data.message
        })
      // this.campaign = new Campaign()
      // this.$bvModal.hide('modal1')
    },
    openDialog: function () {
      this.$refs.art.click()
    },
    onReset: function () {
      this.campaign = new Campaign()
      this.$refs.newCampaignForm.reset()
      this.url = null
    },
    onFileChange: function (e) {
      const file = e.target.files[0]
      this.url = URL.createObjectURL(file)
      this.formData.append('artwork', file)
    },
    resetCampaign () {
      this.campaign = new Campaign()
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
  },
  mounted () {
    this.getTags()
    console.log(apiClient.defaults.baseURL)
    this.dropzoneOptions.url = process.env.VUE_APP_API_BASE_URL + 'api/campaigns/' + this.campaign.slug + '/tracks '
  }
}
</script>
