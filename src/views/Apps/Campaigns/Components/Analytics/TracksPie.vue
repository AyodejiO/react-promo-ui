<template>
  <b-card>
    <b-card-header>Streams per Track / Favorite Tracks <i class="far fa-heart"></i></b-card-header>
    <b-card-body class="text-center">
      <div class="w-100" ref="chartdiv" style="min-height: 450px;"></div>
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
  name: 'TracksPie',
  computed: {
    ...mapGetters({
      tracks: 'Tracks/tracks'
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
      faveSeries: null,
      streamSeries: null
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
    this.chart.data = this.tracks
    this.chart.minHeight = 450
    // this.chart.responsive.enabled = true
    this.faveSeries = this.chart.series.push(new am4charts.PieSeries())

    this.faveSeries.dataFields.value = 'feedbacks_count'
    this.faveSeries.dataFields.category = 'title'
    this.faveSeries.labels.template.maxWidth = 80
    this.faveSeries.labels.template.fontSize = 11
    this.faveSeries.labels.template.text = '{category}'
    this.faveSeries.alignLabels = false
    this.faveSeries.labels.template.wrap = true

    this.faveSeries.labels.template.disabled = true
    this.faveSeries.ticks.template.disabled = true

    this.faveSeries.slices.template.stroke = am4core.color('#4a2abb')
    this.faveSeries.slices.template.strokeWidth = 2
    this.faveSeries.slices.template.strokeOpacity = 1
    this.faveSeries.slices.template.tooltipText = '{value.percent}% favourited {category}'
    // this.pieSeries.labels.template.disabled = true

    this.streamSeries = this.chart.series.push(new am4charts.PieSeries())

    this.streamSeries.dataFields.value = 'streams_count'
    this.streamSeries.dataFields.category = 'title'
    this.streamSeries.labels.template.maxWidth = 80
    this.streamSeries.labels.template.fontSize = 11
    this.streamSeries.labels.template.text = '{category}'
    this.streamSeries.alignLabels = false
    this.streamSeries.labels.template.wrap = true

    this.streamSeries.slices.template.stroke = am4core.color('#235789')
    this.streamSeries.slices.template.strokeWidth = 2
    this.streamSeries.slices.template.strokeOpacity = 1
    this.streamSeries.slices.template.tooltipText = '{value.percent}% streamed {category}'

    this.chart.innerRadius = am4core.percent(30)

    this.chart.logo.disabled = true
    this.chart.legend = new am4charts.Legend()
  }
}
</script>
