<template>
  <b-row>
    <b-col md="4" class="mb-3">
      <b-card bg-variant="info" title="Feedbacks">
        <h3>{{feedbacks.length}}</h3>
      </b-card>
    </b-col>
    <b-col md="4" class="mb-3">
      <b-card bg-variant="info" title="Tracks">
        <h3>{{tracks.length}}</h3>
      </b-card>
    </b-col>
    <b-col md="4" class="mb-3">
      <b-card bg-variant="info" title="Average Rating">
        <h3>{{ totalFeedbacks > 0 ? Math.round(totalRating/totalFeedbacks) : 0 }} <small>/ 5</small></h3>
      </b-card>
    </b-col>
    <b-col md="4" class="mb-3">
      <b-card bg-variant="info" title="Total Downloads">
        <h3>{{ campaign.downloads_count }}</h3>
      </b-card>
    </b-col>
    <b-col md="4" class="mb-3">
      <b-card bg-variant="info" title="Total Streams">
        <h3>{{campaign.streams_count}}</h3>
      </b-card>
    </b-col>
    <b-col md="4" class="mb-3">
      <b-card bg-variant="info" title="Streams per Track">
        <h3>{{tracks.length}}</h3>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CampaignStats',
  computed: {
    ...mapGetters({
      campaign: 'Campaigns/campaign',
      feedbacks: 'Feedbacks/feedbacks',
      totalFeedbacks: 'Feedbacks/totalFeedbacks',
      totalRating: 'Feedbacks/totalRating',
      tracks: 'Tracks/tracks'
    })
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
