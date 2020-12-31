<template>
  <b-card>
    <b-card-header>Campaign Rating <i class="far fa-star"></i></b-card-header>
    <b-card-body class="text-center">
      <div class="w-100" ref="chartdiv" style="min-height: 330px;"></div>
    </b-card-body>
  </b-card>
</template>
<script>
import { mapGetters } from 'vuex'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themesAnimated)

export default {
  name: 'CampaignRating',
  computed: {
    ...mapGetters({
      feedbacksStat: 'Feedbacks/feedbacksStat'
    })
  },
  beforeDestroy () {
    if (this.chart) {
      this.chart.dispose()
    }
  },
  data () {
    return {
      chart: null,
      pieSeries: null
    }
  },
  methods: {
    toggleSlice (item) {
      var slice = this.pieSeries.dataItems.getIndex(item)
      if (slice.visible) {
        slice.hide()
      } else {
        slice.show()
      }
    },
    hoverSlice (item) {
      var slice = this.pieSeries.slices.getIndex(item)
      slice.isHover = true
    },
    blurSlice (item) {
      var slice = this.pieSeries.slices.getIndex(item)
      slice.isHover = false
    }
  },
  mounted () {
    this.chart = am4core.create(this.$refs.chartdiv, am4charts.PieChart)
    this.chart.data = this.feedbacksStat
    this.chart.minHeight = 330
    // this.chart.responsive.enabled = true
    this.pieSeries = this.chart.series.push(new am4charts.PieSeries())

    this.pieSeries.dataFields.value = 'rating'
    this.pieSeries.dataFields.category = 'rating'
    this.pieSeries.labels.template.maxWidth = 80
    this.pieSeries.labels.template.fontSize = 11
    this.pieSeries.labels.template.text = '{category}'
    this.pieSeries.alignLabels = false
    this.pieSeries.labels.template.wrap = true

    this.pieSeries.slices.template.stroke = am4core.color('#4a2abb')
    this.pieSeries.slices.template.strokeWidth = 2
    this.pieSeries.slices.template.strokeOpacity = 1
    // this.pieSeries.labels.template.disabled = true

    this.chart.radius = am4core.percent(95)
    this.chart.innerRadius = am4core.percent(40)

    this.chart.logo.disabled = true
    this.chart.legend = new am4charts.Legend()
  }
}
</script>
