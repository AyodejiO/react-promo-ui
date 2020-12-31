<template>
  <div>
    <div class="d-block">
      <b-button variant="primary" class="float-right mb-3" @click="createPDF">
        <i class="fas fa-file-pdf"> &nbsp; Export Result</i>
      </b-button>
    </div>
    <div>
      <b-row class="w-100" ref="stats">
        <b-col md="12">
          <CampaignStats />
        </b-col>
      </b-row>
      <b-row class="w-100" ref="pies">
        <b-col md="6">
          <TracksPie />
        </b-col>
        <b-col md="6">
          <CampaignRating v-if="feedbacks.length > 0" />
        </b-col>
      </b-row>
      <b-row md="12" ref="maps">
        <b-col>
          <FeedbacksMap />
        </b-col>
      </b-row>
      <b-row class="w-100" ref="table">
        <b-col md="12">
          <feedbacks></feedbacks>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import JSPDF from 'jspdf'
// eslint-disable-next-line no-unused-vars
import html2canvas from 'html2canvas'
import { mapActions, mapGetters } from 'vuex'
import Feedbacks from './Feedbacks'
import CampaignRating from './CampaignRating'
import CampaignStats from './CampaignStats'
import FeedbacksMap from './FeedbacksMap'
import TracksPie from './TracksPie'

export default {
  name: 'Analytics',
  components: { CampaignRating, CampaignStats, Feedbacks, FeedbacksMap, TracksPie },
  computed: {
    ...mapGetters({
      campaign: 'Campaigns/campaign',
      feedbacks: 'Feedbacks/feedbacks'
    })
  },
  methods: {
    ...mapActions({
      getFeedbacks: 'Feedbacks/GET_FEEDBACKS'
    }),
    createPDF () {
      var doc = new JSPDF('portrait', 'mm', 'a4')
      const refs = Object.values(this.$refs) || []
      refs.forEach(ref => html2canvas(ref)
        .then(canvas => {
          const img = canvas.toDataURL('image/jpeg', 1.0)
          console.log(img)
          doc.addImage(img, 'JPEG', 5, 5, 200)
          doc.save(this.campaign.title + '.pdf')
        })
      )

      // setTimeout(doc.save(this.campaign.title + '.pdf'), 15000)
      // doc.save(this.campaign.title + '.pdf')
      /** WITH CSS */
      // var canvasElement = document.createElement('canvas')
      // html2canvas(this.$refs.content).then(canvas => {
      //   console.log(canvas)
      //   // doc.save('sample.pdf')
      //   doc.html(canvas, {
      //     callback: () => {
      //       doc.save()
      //     },
      //     x: 5,
      //     y: 15,
      //     filename: this.campaign.title + '.pdf'
      //   })
      //   // const img = canvas.toDataURL('image/jpeg', 1.0)
      //   // console.log(img)
      //   // doc.addImage(img, 'JPEG', 5, 5, 200, 300)
      //   // doc.save(this.campaign.title + '.pdf')
      // })
    },
    downloadWithCSS () {
      // const doc = new JSPDF()
      // /** WITH CSS */
      // var canvasElement = document.createElement('canvas')
      // html2canvas(this.$refs.content, { canvas: canvasElement
      // }).then(function (canvas) {
      //   const img = canvas.toDataURL('image/jpeg', 0.8)
      //   doc.addImage(img, 'JPEG', 20, 20)
      //   doc.save('sample.pdf')
      // })
    }
  },
  mounted () {
    this.getFeedbacks(this.campaign.slug)
    console.log(this.$refs)
  }
}
</script>
