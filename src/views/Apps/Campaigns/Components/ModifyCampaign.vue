<template>
  <div >
    <iq-card  id="campaign-modal-data" body-class="iq-card iq-card-block iq-card-stretch iq-card-height" >
      <template v-slot:headerTitle >
        <h4 class="card-title">Edit Campaign</h4>
      </template>
      <div class="iq-card-body">
        <div class="d-flex align-items-center">
            <form class="w-100" ref="newCampaignForm" @submit.prevent="modifyCampaign">
              <div class="row">
                <div class="col-md-3 text-center mb-sm-3">
                  <!-- <img class="avatar-60 rounded-circle" src="../../../../assets/images/user/user-01.jpg"> -->
                  <placeholder @click.native="openDialog" :url="campaign.artwork" width="200" height="200" text="Add Album Art" textcolor="ffffff" bgcolor="a09e9e"></placeholder>
                  <span class="text-danger" v-if="errors.artwork">
                    {{ errors.artwork[0] }}
                  </span>
                </div>
                <div class="campaign-text col-md-9" >
                  <b-alert v-if="message" show variant="danger"><a href="#" class="alert-link">{{ message }}</a></b-alert>
                  <input type="file" accept="image/*" placeholder="Album Art" ref="art" @change="onFileChange" class="rounded form-control d-none" style="border:none;" />
                  <b-form-group
                  >
                    <!-- <b-form-input id="input-1" v-model="name" :state="state" trim></b-form-input> -->
                    <input type="text" placeholder="Campaign Title" class="rounded form-control" v-model="campaign.title" style="border:none;" required />
                    <span class="text-danger" v-if="errors.title">
                      {{ errors.title[0] }}
                    </span>
                  </b-form-group>
                  <b-form-group>
                    <b-form-textarea
                      id="textarea"
                      v-model="campaign.content"
                      class="border-0"
                      placeholder="Write something about this campaign..."
                      rows="2"
                      no-resize
                      max-rows="3"
                      required
                    ></b-form-textarea>
                    <span class="text-danger" v-if="errors.content">
                      {{ errors.content[0] }}
                    </span>
                  </b-form-group>
                  <b-form-group>
                    <b-form-tags v-model="campaign.tags" :tag-validator="tagValidator" add-on-change no-outer-focus class="mb-2 border-0" required>
                      <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                        <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                          <li v-for="tag in tags" :key="tag" class="list-inline-item">
                            <b-form-tag
                              @remove="removeTag(tag)"
                              :title="tag"
                              :disabled="disabled"
                              variant="info"
                            >{{ tag }}</b-form-tag>
                          </li>
                        </ul>
                        <b-form-select
                          v-bind="inputAttrs"
                          v-on="inputHandlers"
                          value-field="slug"
                          text-field="name"
                          :disabled="disabled || availableOptions.length === 0"
                          :options="availableOptions"
                        >
                          <template #first>
                            <!-- This is required to prevent bugs with Safari -->
                            <option disabled value="">Assign tag(s)...</option>
                          </template>
                        </b-form-select>
                      </template>
                    </b-form-tags>
                    <span class="text-danger" v-if="errors.tags">
                      {{ errors.tags[0] }}
                    </span>
                  </b-form-group>
                  <div>
                    Visibility:
                    <b-form-radio-group
                      id="radio-group-1"
                      v-model="campaign.visibility"
                      :options="options"
                      buttons
                      name="radios-btn-default"
                      class="ml-2"
                      required
                    ></b-form-radio-group>
                    <span class="text-danger" v-if="errors.visibility">
                      {{ errors.visibility[0] }}
                    </span>
                  </div>
                </div>
              </div>
              <hr />
                <ul class="campaign-opt-block d-flex align-items-center list-inline m-0 p-0">
                    <li><b-btn variant="primary" type="submit" class="ml-2 px-5">Modify</b-btn></li>
                    <li>
                      <b-dropdown id="dropdown-1" text="Other Action" class="m-md-2">
                        <!-- <b-dropdown-item @click="onReset">Clear Form</b-dropdown-item> -->
                        <b-dropdown-item @click.prevent="publish"><i class="fas fa-rocket mr-1" aria-hidden="true"></i>  Publish Campaign</b-dropdown-item>
                        <!-- <b-dropdown-divider></b-dropdown-divider> -->
                        <b-dropdown-item @click.prevent="forceDelete"><i class="far fa-trash-alt mr-1" aria-hidden="true"></i>  Delete Campaign</b-dropdown-item>
                      </b-dropdown>
                    </li>
                </ul>
            </form>
        </div>
      </div>
    </iq-card>
  </div>
</template>
<script>
import Campaign from '../../../../Model/Campaign'
import Placeholder from '../../../../components/socialvue/others/Placeholder'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ModifyCampaign',
  components: { Placeholder },
  props: ['campaign'],
  data () {
    return {
      formData: new FormData(),
      // tags: ['Deep House', 'Tech House'],
      options: ['public', 'circle'],
      errors: [],
      message: null
    }
  },
  computed: {
    ...mapGetters({
      tags: 'Tags/tags'
    }),
    availableOptions () {
      return this.tags.filter(opt => this.campaign.tags.indexOf(opt) === -1)
    },
    url () {
      return this.campaign.artwork || null
    }
  },
  methods: {
    ...mapActions({
      getTags: 'Tags/GET_TAGS',
      createCampaign: 'Campaigns/UPDATE_CAMPAIGN',
      deleteCampaign: 'Campaigns/DELETE_CAMPAIGN',
      publishCampaign: 'Campaigns/PUBLISH_CAMPAIGN'
    }),
    tagValidator (tag) {
      return tag.length >= 1
    },
    modifyCampaign () {
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
    publish: function () {
      this.publishCampaign(this.campaign.slug)
        .then(() => {
          this.$bvToast.toast(`Campaign successfully activated.`, {
            title: 'Success',
            variant: 'success',
            autoHideDelay: 5000,
            appendToast: true
          })
          this.$emit('published')
        })
        .catch(() => {
          this.$bvToast.toast(`Something awful happened`, {
            title: 'Error',
            variant: 'danger',
            autoHideDelay: 5000,
            appendToast: true
          })
        })
    },
    forceDelete: function () {
      this.deleteCampaign(this.campaign.slug)
        .then(() => {
          this.$bvToast.toast(`Campaign successfully deleted.`, {
            title: 'Success',
            variant: 'success',
            autoHideDelay: 5000,
            appendToast: true
          })
          this.$router.push({ name: 'promo.list' })
        })
        .catch(() => {
          this.$bvToast.toast(`Something awful happened`, {
            title: 'Error',
            variant: 'danger',
            autoHideDelay: 5000,
            appendToast: true
          })
        })
    },
    openDialog: function () {
      this.$refs.art.click()
    },
    onReset: function () {
      this.campaign = new Campaign()
      this.$refs.newCampaignForm.reset()
      // this.campaign.artwork = null
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
  }
}
</script>
