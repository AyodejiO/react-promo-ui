<template>
  <b-card>
    <b-card-header>Favorite Tracks <i class="far fa-heart"></i></b-card-header>
    <b-card-body class="text-center">
      <div class="w-100" ref="chartdiv" style="min-height: 250px;"></div>
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
  name: 'TracksStreamPie',
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
      pieSeries: null
    }
  },
  methods: {
  },
  mounted () {
    this.chart = am4core.create(this.$refs.chartdiv, am4charts.PieChart)
    this.chart.data = this.tracks
    this.chart.minHeight = 250
    // this.chart.responsive.enabled = true
    this.pieSeries = this.chart.series.push(new am4charts.PieSeries())

    this.pieSeries.dataFields.value = 'feedbacks_count'
    this.pieSeries.dataFields.category = 'title'
    this.pieSeries.labels.template.maxWidth = 80
    this.pieSeries.labels.template.fontSize = 11
    this.pieSeries.labels.template.text = '{category}'
    this.pieSeries.alignLabels = false
    this.pieSeries.labels.template.wrap = true
    // this.pieSeries.labels.template.disabled = true

    this.chart.radius = am4core.percent(95)

    this.chart.logo.disabled = true
    // this.chart.legend = new am4charts.Legend()
  }
}
</script>
